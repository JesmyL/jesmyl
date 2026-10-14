import { ElectronWorkDirFile } from 'shared/api/tsjrpc.electtron/basic';

/** dataTransfer key carrying a WorkDir preview dragged from the WorkDir tab onto a broadcast target. */
export const workDirBgDragMime = 'application/x-jesmyl-workdir-bg';

/** Marker payload telling the drop target to remove its background — a real file payload is always JSON with a path. */
export const workDirNoBgDragValue = 'no-bg';

/** `types` is an array-like that may not expose `.includes` in every engine, so read it as a plain array first. */
export const dataTransferHasFiles = (dataTransfer: DataTransfer) =>
  Array.from(dataTransfer.types).includes('Files');

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
  if (!raw) return undefined;
  if (raw === workDirNoBgDragValue) return workDirNoBgDragValue;

  try {
    const file = JSON.parse(raw) as ElectronWorkDirFile;
    return file?.path ? file : undefined;
  } catch {
    return undefined;
  }
};
