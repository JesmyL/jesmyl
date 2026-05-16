import { MyFileType } from './enums';

export enum MyFileBoxId {
  def = '',
}

export type MyFileBox = {
  id: MyFileBoxId;
  type: MyFileType;
  file: File;
};
