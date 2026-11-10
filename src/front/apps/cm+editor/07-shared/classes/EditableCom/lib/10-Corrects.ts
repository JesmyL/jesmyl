import { makeRegExp } from 'regexpert';
import { ruLowerLettersStr, slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { EditableComBase } from './0-Base';

export class EditableComCorrects extends EditableComBase {
  static takeCorrectName(text: string) {
    let name = '';

    text.split(makeRegExp('/\\n\\s*\\n/')).find(block => {
      return block.split('\n').find(line => {
        const lowerLine = line.toLowerCase().replace(makeRegExp(`/^[^${ruLowerLettersStr}]+/g`), '');
        if (this.takeStyleByTitle(lowerLine)) return false;

        if (makeRegExp('/^[^a-z\\d#]+$/i').exec(lowerLine)) {
          name = line;
          return true;
        }
        return false;
      });
    });

    // Срезаем хвостовые не-славянские символы, но не съедаем завершающее « — » — теперь оно допустимо в названии кома
    return name.replace(makeRegExp(`/(?:( — )|[^${slavicLowerLettersStr}!])+$/i`), '$1');
  }
}
