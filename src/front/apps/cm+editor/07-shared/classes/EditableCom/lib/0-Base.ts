import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { IExportableCom } from 'shared/api';
import { comBlockStyles } from 'shared/values/cm/block-styles/BlockStyles';

export class EditableComBase extends CmCom {
  initial: CmCom;

  constructor(top: IExportableCom) {
    super(mylib.clone(top));

    this.initial = new CmCom(mylib.clone(top));
  }

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return comBlockStyles?.styles.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }
}
