import { DragEvent } from 'react';
import { ElectronWorkDirFile, ElectronWorkDirFileKind } from 'shared/api/tsjrpc.electtron/basic';
import { checkIsNumber, checkIsObject, checkIsString } from 'shared/utils/checkIs';

/** Trusted kinds of dropped WorkDir files — a payload outside this map is treated as corrupted. */
const workDirFileKinds: Record<string, ElectronWorkDirFileKind> = {
  image: 'image',
  video: 'video',
  audio: 'audio',
  pptx: 'pptx',
};

/** Parses an untrusted JSON payload into a WorkDir file — nil when any required field is missing or malformed. */
const takeWorkDirFile = (raw: unknown): ElectronWorkDirFile | nil => {
  if (!checkIsObject(raw)) return null;

  const { name, path, kind, size } = raw;

  if (!checkIsString(name) || !checkIsString(path) || !checkIsString(kind) || !checkIsNumber(size)) return null;
  if (!Object.hasOwn(workDirFileKinds, kind)) return null;

  return { name, path, kind: workDirFileKinds[kind], size };
};

/** dataTransfer key carrying a WorkDir preview dragged from the WorkDir tab onto a broadcast target. */
export const workDirBgDragMime = 'application/x-jesmyl-workdir-bg';

/** Marker payload telling the drop target to remove its background — a real file payload is always JSON with a path. */
export const workDirNoBgDragValue = 'no-bg';

/** `types` is an array-like that may not expose `.includes` in every engine, so read it as a plain array first. */
export const dataTransferHasFiles = (dataTransfer: DataTransfer) =>
  Array.from(dataTransfer.types).includes('Files');

/** Cancels the dragover so the browser accepts the drop; reports whether the drag carries files. */
export const markFileDragOver = (event: DragEvent<HTMLElement>) => {
  event.preventDefault();

  return dataTransferHasFiles(event.dataTransfer);
};

/** Puts the dragged WorkDir file identity on the dataTransfer — the file path is applied as the background on drop. */
export const putWorkDirBgToDataTransfer = (dataTransfer: DataTransfer, file: ElectronWorkDirFile) => {
  dataTransfer.effectAllowed = 'copy';
  dataTransfer.setData(workDirBgDragMime, JSON.stringify(file));
};

/** Puts the no-background marker on the dataTransfer — dropping it clears the target background. */
export const putWorkDirNoBgToDataTransfer = (dataTransfer: DataTransfer) => {
  dataTransfer.effectAllowed = 'copy';
  dataTransfer.setData(workDirBgDragMime, workDirNoBgDragValue);
};

/** Parses the dragged WorkDir payload — a file, the no-bg marker, or nil when the drag carries neither (an unrelated drag). */
export const takeWorkDirBgFromDataTransfer = (
  dataTransfer: DataTransfer,
): ElectronWorkDirFile | typeof workDirNoBgDragValue | nil => {
  const raw = dataTransfer.getData(workDirBgDragMime);
  if (!raw) return null;
  if (raw === workDirNoBgDragValue) return workDirNoBgDragValue;

  try {
    return takeWorkDirFile(JSON.parse(raw));
  } catch {
    return null;
  }
};
