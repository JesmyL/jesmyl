import { mylib } from '#shared/lib/my-lib';
import { blockStyles } from '$cm/col/com/block-styles/BlockStyles';
import { Com } from '$cm/col/com/Com';
import { IExportableCom } from 'shared/api';
import { makeRegExp } from 'shared/utils';

export class EditableComBase extends Com {
  initial: Com;

  constructor(top: IExportableCom) {
    super(mylib.clone(top));

    this.initial = new Com(mylib.clone(top));
  }

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return blockStyles?.styles.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }
}
