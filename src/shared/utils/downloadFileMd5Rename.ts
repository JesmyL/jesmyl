/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazyEnvJson } from 'back/envJson';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { checkIsEndsWith } from 'shared/utils/checkIs';

export const downloadFileMd5Rename = async (saveDir: `${string}/`, url: string): Promise<string> => {
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

    fileStream = fs.createWriteStream(tempPath);
    const hash = crypto.createHash('md5');

    const nodeReadable = Readable.fromWeb(response.body as any);
    for await (const chunk of nodeReadable) {
      const buffer = Buffer.from(chunk);
      fileStream.write(buffer);
      hash.update(buffer);
    }

    await new Promise<void>(resolve => {
      if (fileStream) fileStream.end(resolve);
      else resolve();
    });
    fileStream = null;

    const fileMd5 = hash.digest('hex');
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
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

    if (error instanceof Error) {
      throw new Error(`[downloadFileMd5Rename] ${error.message}`);
    }
    throw error;
  }
};
