import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import md5 from 'md5';
import { MyFileId } from '../model/common';
import { MyFileType } from '../model/enums';
import { myFilesIDB } from '../state/idb';
import { saveFontFile } from './fontStorage';

/** Stores a file in myFiles keyed by its content hash, so re-adding the same file reuses its row. */
export const addFileToMyFiles = async (file: File, type: MyFileType): Promise<MyFileId> => {
  const base64 = await convertFileToBase64(file);
  const id = md5(base64);

  if (!(await myFilesIDB.tb.files.get(id))) await myFilesIDB.tb.files.put({ id, type, file });
  if (type === MyFileType.Font) await saveFontFile(file, id, base64);

  return id;
};
