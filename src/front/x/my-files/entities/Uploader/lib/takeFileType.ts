import { objectValues } from 'shared/utils/object.utils';
import { takeFileExtension } from 'shared/utils/string.utils';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';
import { MyFileType } from 'x/my-files/shared/model/enums';

/** Browsers report `.otf` as `application/vnd.ms-opentype` or an empty type, so the filename extension is the reliable fallback. */
export const takeFileType = ({ type, name }: File) => {
  const subType = type.split('/')[1];

  return (
    objectValues(myFilesConfig).find(({ ext }) => ext.has(subType) || ext.has(takeFileExtension(name)))?.type ??
    MyFileType.Other
  );
};
