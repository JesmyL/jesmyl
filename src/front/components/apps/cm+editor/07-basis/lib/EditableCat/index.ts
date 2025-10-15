import { CmCat } from '$cm/entities/cat/lib/Cat';
import { IExportableCat } from 'shared/api';
import { EditableCom } from '../EditableCom';

export class EditableCat extends CmCat {
  initialName: string;

  constructor(
    top: IExportableCat,
    public coms: EditableCom[],
  ) {
    super(top, coms);
    this.initialName = this.name;
  }
}
