import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { IExportableCat } from 'shared/api';
import { CmCat } from 'shared/const/cm/Cat';

export class CmEditorCat extends CmCat {
  initialName: string;

  constructor(
    top: IExportableCat,
    public coms: EditableCom[],
  ) {
    super(top, coms);
    this.initialName = this.name;
  }
}
