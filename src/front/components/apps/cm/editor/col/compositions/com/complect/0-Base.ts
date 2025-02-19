import { mylib } from '#shared/lib/my-lib';
import { IExportableCom } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { blockStyles } from '../../../../../col/com/block-styles/BlockStyles';
import { Com } from '../../../../../col/com/Com';
import { EditableCol } from '../../../EditableCol';

export class EditableComBase extends Com {
  col: EditableCol<IExportableCom>;
  initialName: string;
  initial: Com;

  constructor(top: IExportableCom) {
    super(mylib.clone(top));

    this.col = new EditableCol(top);
    this.initialName = this.name;
    this.initial = new Com(mylib.clone(top));
  }

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return blockStyles?.styles.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }
}
