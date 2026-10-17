/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazyEnvJson } from 'back/envJson';
import nodeID3 from 'node-id3';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Readable, pipeline } from 'node:stream';
import { checkIsEndsWith } from 'shared/utils/checkIs';

interface DownloadOptions {
  removeTags?: boolean;
  title?: string;
  artist?: string;
}

const id3v1 = { signature: 'TAG', size: 128 } as const;

const extAliases: Record<string, string> = { mpeg: 'mp3', mpga: 'mp3' };

const cleanText = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/^([\w.-]+\.[a-z]{2,4}\s*[-–—:]*\s*)|(\s*[-–—:]*\s*[\w.-]+\.[a-z]{2,4})$/gi, '').trim();
};

export const downloadFileMd5Rename = async (
  saveDir: `${string}/`,
  url: string,
  options: DownloadOptions = { removeTags: true },
): Promise<string> => {
  const { removeTags = true, title, artist } = options;
  const { hostRootDir } = lazyEnvJson();

  const baseDir = path.resolve(hostRootDir, saveDir);

  const cleanDir = checkIsEndsWith(saveDir, '/') ? saveDir.slice(0, -1) : saveDir;
  const tempDir = path.resolve(hostRootDir, `${cleanDir}-tmp`);

  const tempFileName = `download_${crypto.randomUUID()}.tmp`;
  const tempPath = path.join(tempDir, tempFileName);

  let fileStream: fs.WriteStream | null = null;

  try {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Тело ответа пустое или отсутствует.');
    }

    let ext = path.extname(new URL(url).pathname).replace('.', '');
    if (!ext) {
      const contentType = response.headers.get('content-type') || '';
      ext = contentType.split('/')?.[1] || 'bin';
      ext = ext.split(';', 1)[0].trim();
    }
    ext = extAliases[ext.toLowerCase()] ?? ext;

    const isMp3Tagged = ext.toLowerCase() === 'mp3' && removeTags;

    fileStream = fs.createWriteStream(tempPath);
    const nodeReadable = Readable.fromWeb(response.body as any);
    for await (const chunk of nodeReadable) {
      fileStream.write(Buffer.from(chunk));
    }

    await new Promise<void>(resolve => {
      if (fileStream) fileStream.end(resolve);
      else resolve();
    });
    fileStream = null;

    let targetArtist = artist;
    let targetTitle = title;

    if (isMp3Tagged) {
      const currentTags = nodeID3.read(tempPath);

      if (!targetArtist) targetArtist = cleanText(currentTags.artist);
      if (!targetTitle) targetTitle = cleanText(currentTags.title);

      const stripResult = nodeID3.removeTags(tempPath);
      if (stripResult !== true) throw new Error(`ID3v2 strip failed: ${stripResult}`);

      // nodeID3 снимает только ID3v2 — обрезаем хвостовой ID3v1 (128 байт) до подсчета MD5
      const fileHandle = await fs.promises.open(tempPath, 'r+');
      try {
        const { size } = await fileHandle.stat();
        if (size > id3v1.size) {
          const tail = Buffer.alloc(id3v1.size);
          await fileHandle.read(tail, 0, id3v1.size, size - id3v1.size);
          if (tail.toString('latin1', 0, id3v1.signature.length) === id3v1.signature) {
            await fileHandle.truncate(size - id3v1.size);
          }
        }
      } finally {
        await fileHandle.close();
      }
    }

    // Потоковый подсчет MD5 (не забивает память)
    const fileMd5 = await new Promise<string>((resolve, reject) => {
      const hash = crypto.createHash('md5');
      const readStream = fs.createReadStream(tempPath);

      pipeline(readStream, hash, err => {
        if (err) reject(err);
        else resolve(hash.digest('hex'));
      });
    });

    if (isMp3Tagged) {
      const newTags: nodeID3.Tags = {};
      if (targetArtist) newTags.artist = targetArtist;
      if (targetTitle) newTags.title = targetTitle;

      if (Object.keys(newTags).length > 0) {
        const writeResult = nodeID3.write(newTags, tempPath);
        if (writeResult instanceof Error) throw writeResult;
      }
    }

    const finalFileName = `${fileMd5}.${ext}`;
    const finalPath = path.join(baseDir, finalFileName);

    if (fs.existsSync(finalPath)) {
      fs.unlinkSync(tempPath);
    } else {
      fs.renameSync(tempPath, finalPath);
    }

    return finalFileName;
  } catch (error) {
    if (fileStream) fileStream.destroy();
    fs.rmSync(tempPath, { force: true });

    if (error instanceof Error) {
      throw new Error(`[downloadFileMd5Rename] ${error.message}`);
    }
    throw error;
  }
};
