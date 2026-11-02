import { translateBase } from '#basis/locale';
import { Button, Skeleton } from '#shared/components';
import { electronWorkDirAtom, electronWorkDirSubPathAtom } from '#shared/state/electron.atoms';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { electronAppName } from 'electron-app/src/lib';
import { DragEvent, useEffect, useState } from 'react';
import { ElectronWorkDirFile } from 'shared/api/tsjrpc.electtron/basic';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { objectValues } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { twJoin } from 'tailwind-merge';
import { addFileToMyFiles, MyFilesFontFamilySelector, MyFileType } from 'x/my-files';
import {
  createWorkDirFolder,
  ensureWorkDirFolders,
  isDroppedFontFile,
  saveDroppedWorkDirFiles,
  selectWorkDir,
  watchWorkDir,
  workDirPresetFolders,
} from '../lib/electronWorkDir';
import { useWorkDirFileSrc } from '../lib/useWorkDirFileSrc';
import { useWorkDirPack } from '../lib/useWorkDirPack';
import {
  markFileDragOver,
  putWorkDirBgToDataTransfer,
  putWorkDirNoBgToDataTransfer,
  takeWorkDirBgFromDataTransfer,
} from '../lib/workDirDrag';
import { ElectronWorkDirProps } from '../model';

export const ElectronWorkDir = ({
  onApplyBg,
  bgFilePath,
  fontFileId,
  onApplyFont,
  PptxPreview,
  onPptxOpen,
}: ElectronWorkDirProps) => {
  const workDir = useAtomValue(electronWorkDirAtom);

  if (!workDir) return <WorkDirPicker />;

  return (
    <WorkDirBrowser
      key={workDir}
      dirPath={workDir}
      bgFilePath={bgFilePath}
      onApplyBg={onApplyBg}
      fontFileId={fontFileId}
      onApplyFont={onApplyFont}
      PptxPreview={PptxPreview}
      onPptxOpen={onPptxOpen}
    />
  );
};

const makeSubPath = (base: string, child: string) => (base ? `${base}/${child}` : child);

const pathSeparatorsRegExp = /[/\\]+/;

/** Last path segment, slash- or backslash-separated — `path` is not available in the renderer. */
const takePathBaseName = (fullPath: string) => fullPath.split(pathSeparatorsRegExp).pop() ?? '';

const workDirPickTitle = () => translateBase(BaseLocaleKey.WorkingDirectoryPickFolder, { a: electronAppName });

const makeFolderOption = (folder: string): DropdownItem<string> => ({
  id: folder,
  title: (
    <>
      <LazyIcon icon="Folder01" />
      {folder}
    </>
  ),
});

/**
 * Picks a directory and establishes it as the WorkDir: uses the chosen folder when it is already named
 * `electronAppName`, otherwise creates `<chosen>/electronAppName` inside it, ensures the preset folders
 * and switches the app to it (watching is handled by the browser view).
 */
const establishWorkDir = async () => {
  const chosenDir = await selectWorkDir();
  if (!chosenDir) return;

  const workDir =
    takePathBaseName(chosenDir) === electronAppName ? chosenDir : await createWorkDirFolder(chosenDir, electronAppName);

  if (!workDir) return;

  await ensureWorkDirFolders(workDir, objectValues(workDirPresetFolders));
  // A new root invalidates the previously browsed subfolder — drop it before the browser remounts on the new `key={workDir}`.
  electronWorkDirSubPathAtom.set('');
  electronWorkDirAtom.set(workDir);
};

const WorkDirPicker = () => (
  <div className="full-size flex gap-3 items-center justify-center">
    {translateBase(BaseLocaleKey.WorkingDirectoryNotSelected)}
    <Button
      icon="FolderOpen"
      title={workDirPickTitle()}
      onClick={establishWorkDir}
    />
  </div>
);

const WorkDirBrowser = ({
  dirPath,
  bgFilePath,
  onApplyBg,
  fontFileId,
  onApplyFont,
  PptxPreview,
  onPptxOpen,
}: ElectronWorkDirProps & { dirPath: string }) => {
  const subPath = useAtomValue(electronWorkDirSubPathAtom);
  const [refreshi, setRefreshi] = useState(0);
  const [isFileDropTarget, setIsFileDropTarget] = useState(false);
  const pack = useWorkDirPack(dirPath, refreshi);
  const currentDirPath = subPath ? makeSubPath(dirPath, subPath) : dirPath;
  const currentPack = useWorkDirPack(currentDirPath, refreshi);

  useEffect(() => {
    void watchWorkDir(dirPath);
  }, [dirPath]);

  // Keep the user's chosen root folder; only correct it when that folder is gone — or none exist at all.
  useEffect(() => {
    if (!pack) return;

    const folders = pack.folders.filter(folder => folder !== electronAppName);
    const nextSubPath = folders.includes(subPath) ? subPath : (folders[0] ?? '');
    if (nextSubPath !== subPath) electronWorkDirSubPathAtom.set(nextSubPath);
  }, [pack, subPath]);

  const acceptDroppedFiles = async (dropped: File[]) => {
    const workDirFiles: File[] = [];
    const fontFiles: File[] = [];

    for (const file of dropped) (isDroppedFontFile(file) ? fontFiles : workDirFiles).push(file);

    // A failed font must not cancel saving the media files of the same drop.
    const fontSaves = await Promise.allSettled(fontFiles.map(file => addFileToMyFiles(file, MyFileType.Font)));

    for (const fontSave of fontSaves) if (fontSave.status === 'fulfilled') onApplyFont?.(fontSave.value);

    const targetDirPath = workDirFiles.length ? await saveDroppedWorkDirFiles(dirPath, workDirFiles) : null;
    setRefreshi(it => it + 1);

    // Follow a homogeneous drop into its single preset folder; a mixed drop stays put.
    if (targetDirPath) electronWorkDirSubPathAtom.set(targetDirPath.slice(dirPath.length + 1));

    const failedFontSave = fontSaves.find(fontSave => fontSave.status === 'rejected');
    if (failedFontSave) throw failedFontSave.reason;
  };

  const markDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (markFileDragOver(event)) setIsFileDropTarget(true);
  };

  // Root-level folders of the workDir only — the JESMYL_PRO sentinel is never browsable.
  const folderOptions = (pack?.folders ?? []).filter(folder => folder !== electronAppName).map(makeFolderOption);

  return (
    <div className="full-size flex flex-col custom-align-items">
      <div className="flex gap-1 p-1 shrink-0">
        <div className="flex-1 min-w-0">
          <Dropdown
            id={subPath}
            items={folderOptions}
            onSelectId={electronWorkDirSubPathAtom.set}
          />
        </div>

        {!onApplyFont || (
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs">{translateBase(BaseLocaleKey.Font)}</span>
            <MyFilesFontFamilySelector
              fileId={fontFileId}
              onSelect={onApplyFont}
            />
          </div>
        )}

        <Button
          icon="FolderOpen"
          title={workDirPickTitle()}
          onClick={establishWorkDir}
        />
      </div>

      <div
        className={twJoin(
          'flex-1 overflow-auto p-1 grid [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] gap-1 content-start',
          isFileDropTarget && 'outline-2 outline-x3 -outline-offset-2',
        )}
        onDragEnter={markDragOver}
        onDragOver={markDragOver}
        onDragLeave={event => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;

          setIsFileDropTarget(false);
        }}
        onDrop={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsFileDropTarget(false);

          // Internal WorkDir drags carry our own mime — never treat them as file uploads.
          const { dataTransfer } = event;
          if (takeWorkDirBgFromDataTransfer(dataTransfer) || !dataTransfer.files.length) return;

          // Snapshot the FileList synchronously — it is neutered once the drop handler returns.
          acceptDroppedFiles(Array.from(dataTransfer.files)).catch(error => toast(`${error}`, makeToastKOMoodConfig()));
        }}
      >
        {!onApplyBg || (
          <WorkDirNoBgTile
            isNoBgApplied={!bgFilePath}
            onApplyBg={onApplyBg}
          />
        )}
        {currentPack?.files.map(file => (
          <WorkDirFileTile
            key={file.path}
            file={file}
            bgFilePath={bgFilePath}
            onApplyBg={onApplyBg}
            onPptxOpen={onPptxOpen}
            PptxPreview={PptxPreview}
          />
        ))}
      </div>
    </div>
  );
};

const renderPreview = (
  file: ElectronWorkDirFile,
  src: string | nil,
  PptxPreview: ElectronWorkDirProps['PptxPreview'],
) => {
  if (file.kind === 'pptx')
    return PptxPreview ? (
      <PptxPreview file={file} />
    ) : (
      <Button
        asSpan
        icon="File02"
        withoutAnimation
        title={file.name}
      />
    );

  if (file.kind === 'audio')
    return (
      <Button
        asSpan
        icon="MusicNote01"
        withoutAnimation
      />
    );
  if (!src) return <Skeleton className="w-full h-full" />;

  const className = 'w-full h-full object-cover';

  if (file.kind === 'video')
    return (
      <video
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
      />
    );

  return (
    <img
      src={src}
      alt=""
      className={className}
    />
  );
};

const workDirTileClass = 'aspect-square flex flex-col gap-1 bg-x2 border border-x5 rounded p-1 custom-align-items';

/** First grid cell — always draggable/clickable: applies the empty path, clearing the broadcast background. */
const WorkDirNoBgTile = ({
  isNoBgApplied,
  onApplyBg,
}: {
  isNoBgApplied: boolean;
  onApplyBg?: (filePath: string) => void;
}) => (
  <div
    className={twJoin(workDirTileClass, isNoBgApplied && 'ring-2 ring-x7', 'pointer')}
    title={translateBase(BaseLocaleKey.WithoutBackground)}
    onClick={() => onApplyBg?.('')}
  >
    <div
      className="flex-1 min-h-0 flex center"
      draggable
      onDragStart={event => putWorkDirNoBgToDataTransfer(event.dataTransfer)}
    >
      <LazyIcon icon="ViewOff" />
    </div>

    <div className="text-xs ellipsis shrink-0">{translateBase(BaseLocaleKey.WithoutBackground)}</div>
  </div>
);

const WorkDirFileTile = ({
  file,
  bgFilePath,
  onApplyBg,
  onPptxOpen,
  PptxPreview,
}: {
  file: ElectronWorkDirFile;
  bgFilePath?: string | nil;
  onApplyBg?: (filePath: string) => void;
  onPptxOpen?: (filePath: string) => void;
  PptxPreview?: ElectronWorkDirProps['PptxPreview'];
}) => {
  const isAudio = file.kind === 'audio';
  const isPptx = file.kind === 'pptx';
  const isBgUsable = !isAudio && !isPptx && onApplyBg != null;
  const isPptxOpenable = isPptx && onPptxOpen != null;
  const isClickable = isBgUsable || isPptxOpenable;
  const isBgApplied = file.path === bgFilePath;
  const src = useWorkDirFileSrc(isAudio || isPptx ? '' : file.path);

  const onClick = isPptx
    ? isPptxOpenable
      ? () => onPptxOpen?.(file.path)
      : undefined
    : isBgUsable
      ? () => onApplyBg?.(file.path)
      : undefined;

  return (
    <div
      className={twJoin(workDirTileClass, isBgApplied && 'ring-2 ring-x7', isClickable && 'pointer')}
      onClick={onClick}
    >
      <div
        className="relative flex-1 min-h-0 flex center overflow-hidden rounded"
        draggable={isBgUsable}
        onDragStart={isBgUsable ? event => putWorkDirBgToDataTransfer(event.dataTransfer, file) : undefined}
      >
        {renderPreview(file, src, PptxPreview)}
        <span className="absolute bottom-0 right-1 text-[10px] text-x7 bg-background/70 rounded px-1">{file.kind}</span>
      </div>

      <div
        className="text-xs ellipsis shrink-0"
        title={file.name}
      >
        {file.name}
      </div>
    </div>
  );
};
