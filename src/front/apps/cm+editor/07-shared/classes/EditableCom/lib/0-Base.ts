import { makeRegExp } from 'regexpert';
import { IExportableComInterpretation, IFixedCom } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';

export class EditableComBase extends CmCom {
  fix: IFixedCom | nil;
  intp: IExportableComInterpretation | nil;

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return comBlockKinds?.kinds.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }
}
