import { translateBase } from '#basis/locale';
import { Button, Skeleton } from '#shared/components';
import { electronWorkDirAtom, electronWorkDirSubPathAtom } from '#shared/state/electron.atoms';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { DragEvent, useEffect, useState } from 'react';
import { ElectronWorkDirFile, electronWorkDirFileMaxBytes } from 'shared/api/tsjrpc.electtron/basic';
import { electronAppName } from 'shared/const/electron';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { objectValues } from 'shared/utils/object.utils';
import { twJoin } from 'tailwind-merge';
import {
  createWorkDirFolder,
  ensureWorkDirFolders,
  saveDroppedWorkDirFiles,
  selectWorkDir,
  watchWorkDir,
  workDirPresetFolders,
} from '../lib/electronWorkDir';
import { useWorkDirFileSrc } from '../lib/useWorkDirFileSrc';
import { useWorkDirPack } from '../lib/useWorkDirPack';
import {
  dataTransferHasFiles,
  putWorkDirBgToDataTransfer,
  putWorkDirNoBgToDataTransfer,
  takeWorkDirBgFromDataTransfer,
} from '../lib/workDirDrag';
import { ElectronWorkDirProps } from '../model';

export const ElectronWorkDir = ({ onApplyBg, bgFilePath }: ElectronWorkDirProps) => {
  const workDir = useAtomValue(electronWorkDirAtom);

  if (!workDir) return <WorkDirPicker />;

  return (
    <WorkDirBrowser
      key={workDir}
      dirPath={workDir}
      bgFilePath={bgFilePath}
      onApplyBg={onApplyBg}
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

const WorkDirBrowser = ({ dirPath, bgFilePath, onApplyBg }: ElectronWorkDirProps & { dirPath: string }) => {
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
    const targetDirPath = await saveDroppedWorkDirFiles(dirPath, dropped);
    setRefreshi(it => it + 1);

    // Follow a homogeneous drop into its single preset folder; a mixed drop stays put.
    if (targetDirPath) electronWorkDirSubPathAtom.set(targetDirPath.slice(dirPath.length + 1));
  };

  const markFileDragOver = (event: DragEvent<HTMLDivElement>) => {
    // Cancel every file dragover, otherwise the browser rejects the drop.
    event.preventDefault();
    if (dataTransferHasFiles(event.dataTransfer)) setIsFileDropTarget(true);
  };

  // Root-level folders of the workDir only — the JESMYL_PRO sentinel is never browsable.
  const folderOptions = (pack?.folders ?? []).filter(folder => folder !== electronAppName).map(makeFolderOption);

  return (
    <div className="full-size flex flex-col">
      <div className="flex gap-1 p-1 shrink-0">
        <div className="flex-1 min-w-0">
          <Dropdown
            id={subPath}
            items={folderOptions}
            onSelectId={electronWorkDirSubPathAtom.set}
          />
        </div>

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
        onDragEnter={markFileDragOver}
        onDragOver={markFileDragOver}
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
          void acceptDroppedFiles(Array.from(dataTransfer.files));
        }}
      >
        <WorkDirNoBgTile
          isNoBgApplied={!bgFilePath}
          onApplyBg={onApplyBg}
        />
        {currentPack?.files.map(file => (
          <WorkDirFileTile
            key={file.path}
            file={file}
            bgFilePath={bgFilePath}
            onApplyBg={onApplyBg}
          />
        ))}
      </div>
    </div>
  );
};

const OversizedFilePreview = ({ file }: { file: ElectronWorkDirFile }) => (
  <Button
    asSpan
    icon="File02"
    withoutAnimation
    title={file.name}
  />
);

const renderPreview = (file: ElectronWorkDirFile, src: string | nil) => {
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

const workDirTileClass = 'aspect-square flex flex-col gap-1 bg-x2 border border-x5 rounded p-1';

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
}: {
  file: ElectronWorkDirFile;
  bgFilePath?: string;
  onApplyBg?: (filePath: string) => void;
}) => {
  const isAudio = file.kind === 'audio';
  const isOversized = file.size > electronWorkDirFileMaxBytes;
  const isBgUsable = !isAudio && !isOversized && onApplyBg != null;
  const isBgApplied = file.path === bgFilePath;
  const src = useWorkDirFileSrc(isAudio || isOversized ? '' : file.path);

  const applyBg = () => onApplyBg?.(file.path);

  return (
    <div
      className={twJoin(workDirTileClass, isBgApplied && 'ring-2 ring-x7', isBgUsable && 'pointer')}
      onClick={isBgUsable ? applyBg : undefined}
    >
      <div
        className="relative flex-1 min-h-0 flex center overflow-hidden rounded"
        draggable={isBgUsable}
        onDragStart={isBgUsable ? event => putWorkDirBgToDataTransfer(event.dataTransfer, file) : undefined}
      >
        {isOversized ? <OversizedFilePreview file={file} /> : renderPreview(file, src)}
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
