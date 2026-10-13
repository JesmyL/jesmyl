import { ElectronWorkDirFile } from 'shared/api/tsjrpc.electtron/basic';

/** dataTransfer key carrying a WorkDir preview dragged from the WorkDir tab onto a broadcast target. */
export const workDirBgDragMime = 'application/x-jesmyl-workdir-bg';

/** `types` is an array-like that may not expose `.includes` in every engine, so read it as a plain array first. */
export const dataTransferHasFiles = (dataTransfer: DataTransfer) =>
  Array.from(dataTransfer.types).includes('Files');

/** Puts the dragged WorkDir file identity on the dataTransfer — the MyFiles box id is resolved only on drop. */
export const putWorkDirBgToDataTransfer = (dataTransfer: DataTransfer, file: ElectronWorkDirFile) => {
  dataTransfer.effectAllowed = 'copy';
  dataTransfer.setData(workDirBgDragMime, JSON.stringify(file));
};

/** Parses the dragged WorkDir file, or nil when the drag carries none (an unrelated drag). */
export const takeWorkDirBgFromDataTransfer = (dataTransfer: DataTransfer): ElectronWorkDirFile | nil => {
  const raw = dataTransfer.getData(workDirBgDragMime);
  if (!raw) return undefined;

  try {
    const file = JSON.parse(raw) as ElectronWorkDirFile;
    return file?.path ? file : undefined;
  } catch {
    return undefined;
  }
};
