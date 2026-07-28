import { objectValues } from 'shared/utils/object.utils';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';
import { MyFileType } from 'x/my-files/shared/model/enums';

export const takeFileType = (fullFileType: string) =>
  objectValues(myFilesConfig).find(({ ext }) => ext.has(fullFileType.split('/')[1]))?.type ?? MyFileType.Other;
