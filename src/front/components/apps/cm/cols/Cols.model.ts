import { Cat } from '@cm/col/cat/Cat';
import { Com } from '@cm/col/com/Com';
import { EditableCat } from '@cm/editor/col/categories/EditableCat';
import { EditableCom } from '@cm/editor/col/compositions/com/EditableCom';
import { IExportableCat, IExportableCom } from 'shared/api';

export interface ICols {
  coms: Com[];
  cats: Cat[];
}

export interface ICol {
  com: Com;
  cat: Cat;
}

export interface IExportableCol {
  com: IExportableCom;
  cat: IExportableCat;
}

export interface IEditableCol {
  com: EditableCom;
  cat: EditableCat;
}
