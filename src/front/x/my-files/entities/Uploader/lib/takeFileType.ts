import { mylib } from '#shared/lib/my-lib';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';
import { MyFileType } from 'x/my-files/shared/model/enums';

export const takeFileType = (fullFileType: string) =>
  mylib.values(myFilesConfig).find(({ ext }) => ext.has(fullFileType.split('/')[1]))?.type ?? MyFileType.Other;
