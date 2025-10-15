import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { CmCat } from '$cm/ext';
import { IExportableCat } from 'shared/api';

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
