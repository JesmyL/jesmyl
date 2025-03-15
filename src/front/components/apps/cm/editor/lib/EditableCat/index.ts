import { Cat } from '$cm/col/cat/Cat';
import { IExportableCat } from 'shared/api';
import { EditableCom } from '../EditableCom';

export class EditableCat extends Cat {
  initialName: string;

  constructor(
    top: IExportableCat,
    public coms: EditableCom[],
  ) {
    super(top, coms);
    this.initialName = this.name;
  }
}
