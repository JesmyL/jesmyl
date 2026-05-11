import { mylib } from '#shared/lib/my-lib';
import { CmCom } from '$cm/ext';
import { makeRegExp } from 'regexpert';
import { IExportableCom, IExportableComInterpretation } from 'shared/api';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';

export class EditableComBase extends CmCom {
  initial: CmCom;

  constructor(top: IExportableCom, intp: IExportableComInterpretation | nil) {
    super(mylib.clone(top), intp);

    this.initial = new CmCom(mylib.clone(top), intp);
  }

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return comBlockKinds?.kinds.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }
}
