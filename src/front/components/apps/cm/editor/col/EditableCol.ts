import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'shared/utils';
import { BaseNamed, BaseNamedExportables } from '../../basis/lib/BaseNamed';
import { eeStorage } from '../../basis/lib/ee-storage/EeStorage';
import { IEditableCol } from '../../cols/Cols.model';
import { CorrectsBox } from '../corrects-box/CorrectsBox';
import { ICorrect } from '../corrects-box/CorrectsBox.model';
import { correctNotSlavicNameReg_i } from '../Editor.complect';

export class EditableCol<Col extends BaseNamedExportables> extends BaseNamed<Col> {
  incorrectName = false;

  static nameCorrects<Coln extends keyof IEditableCol>(
    name = this.name,
    coln: Coln,
    onIncorrectsFix?: (correct: string) => void,
    uniq?: string,
    isSetAllText?: boolean,
  ) {
    const minLen = 3;
    const msg = (msg?: string) =>
      msg && `"${name}" - не корректное имя для ${coln === 'cat' ? 'категории' : 'песни'}. ${msg}`;
    const ret = (err?: string, onFix?: () => void) =>
      this.textCorrects(name, isSetAllText).merge({
        errors: err ? [{ message: err, onFix, uniq }] : null,
      });

    if (!mylib.isStr(name)) return ret(msg('Не верный формат'));
    if (name === '?' && coln === 'com') return ret('');
    if (name === '') return ret(msg('Пустое имя'));

    const incorrects = name.match(correctNotSlavicNameReg_i);
    if (incorrects)
      return ret(
        msg(`Недопустимые символы${incorrects[0] === name ? '' : ' в конце'} (${incorrects[0]})`),
        () => onIncorrectsFix && onIncorrectsFix(name.slice(0, -incorrects[0].length)),
      );

    if (name.length < minLen) return ret(msg(`Минимальное количество символов - ${minLen}`));
    // if (colLists.find(col => col.name === name && this.wid !== col.wid)) return ret(`именем "${name}" уже названа одна из ${coln === 'cat' ? 'категорий' : 'песен'}`);

    return ret('');
  }

  prepareName(name: string) {
    return mylib.isStr(name) ? name.replace(correctNotSlavicNameReg_i, '') : name;
  }

  static textCorrects(text: string | nil, isSetAllText = false) {
    if (typeof text !== 'string') return new CorrectsBox().setIncorrectType('[got not string]');
    const errors: ICorrect[] = [];
    const warnings: ICorrect[] = [];
    const unknowns: ICorrect[] = [];

    text.split(makeRegExp('/[^а-яёіґїє]/i')).forEach(realWord => {
      if (!realWord.match(makeRegExp('/[её]/i')) || realWord.match(makeRegExp('/[іґїє]/i'))) return;
      const lower = realWord.toLowerCase();
      const word = lower.replace(makeRegExp('/ё/g'), 'е');
      const parts = lower.split(makeRegExp('/[а-дж-я]*([её])/')).filter(p => p);

      if (eeStorage.get(word) == null) {
        unknowns.push({
          message:
            `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, ` +
            `правильность написания букв ё/е, встречающихся в нём${isSetAllText ? `.\n\nУпоминание:\n${text}` : ''}`,
          code: 2,
        });
        return;
      }

      [eeStorage.get(word)].flat().forEach((type, typei, typea) => {
        const isE = parts[typei] === 'е';
        const info = (code: number) => ({
          code,
          message: `${['Не верно', 'Возможно не верно'][code]} указана ${
            typea.length > 1 ? `${typei + 1}-я из букв ё/е` : `буква ${parts[typei]}`
          } в слове '${realWord}'${isSetAllText ? `.\n\nУпоминание:\n${text}` : ''}`,
          word: realWord,
          letter: parts[typei],
          pos: typei,
          alt: isE ? 'ё' : 'е',
        });

        if (type === 0) {
          if (isE) warnings.push(info(1));
        } else {
          if (isE) {
            if (type === 2) errors.push(info(0));
          } else if (type === 1) errors.push(info(0));
        }
      });
    });

    return new CorrectsBox(errors, warnings, unknowns);
  }
}
