import { IExportableCat } from 'shared/api';
import { Cat } from '../../../col/cat/Cat';
import { EditableCom } from '../compositions/com/EditableCom';

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
