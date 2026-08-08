import { IExportableCat, IExportableCom } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';

export class CmEditorCat extends CmCat {
  initialName: string;

  constructor(
    top: IExportableCat,
    public coms: IExportableCom[],
  ) {
    super(top, coms);
    this.initialName = this.name;
  }
}
