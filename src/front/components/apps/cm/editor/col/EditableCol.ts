import { mylib } from 'front/utils';
import { makeRegExp } from 'shared/utils';
import { ExecArgs, FreeExecDict } from '../../../../../complect/exer/Exer.model';
import { BaseNamed, BaseNamedExportables } from '../../base/BaseNamed';
import { eeStorage } from '../../base/ee-storage/EeStorage';
import { cmExer } from '../../CmExer';
import { IEditableCol, IExportableCol } from '../../cols/Cols.model';
import { CorrectsBox } from '../corrects-box/CorrectsBox';
import { ICorrect } from '../corrects-box/CorrectsBox.model';
import { correctNotSlavicNameReg_i } from '../Editor.complect';

export class EditableCol<Col extends BaseNamedExportables> extends BaseNamed<Col> {
  removed = false;
  incorrectName = false;
  corrects: Record<string, CorrectsBox | nil> = {};

  renameCol<Coln extends keyof IExportableCol>(
    name: string,
    coln: Coln,
    onFix?: (correct: string) => void,
    isSetAllText?: boolean,
  ) {
    const action = `${coln}Rename`;
    const prev = this.name;
    const corrects = this.nameCorrects(name, coln, onFix, `${action}:${this.wid}`, isSetAllText);

    this.name = name;

    const exec = this.execCol(
      {
        action,
        prev,
        method: 'set',
        value: name,
        args: { value: name },
        corrects,
      },
      coln,
    );

    this.corrects.name = exec?.corrects ?? corrects;
  }

  removeCol<Coln extends keyof IExportableCol>(coln: Coln, isRemoved = true) {
    this.execCol(
      {
        action: `${coln}Del`,
        method: 'remove',
      },
      coln,
    );
    return (this.removed = isRemoved);
  }

  comeBackCol<Coln extends keyof IExportableCol>(coln: Coln) {
    this.execCol(
      {
        action: `${coln}ComeBack`,
        method: 'set',
        anti: ({ action, args }) => {
          if (action === `${coln}Del` && args?.[`${coln}w`] === this.wid) return strategy => strategy.RemoveNew;
        },
      },
      coln,
    );

    this.removed = false;
  }

  execCol<Value, Coln extends keyof IExportableCol>(bag: FreeExecDict<Value>, coln: Coln) {
    return cmExer.set<Value>({
      ...bag,
      scope: this.scope(bag.action, bag.uniq),
      args: {
        prev: bag.prev,
        name: this.name,
        ...bag.args,
        [`${coln}w`]: this.wid,
      },
      generalId: this.wid,
    });
  }

  scope(action?: string, uniq?: number | string | (number | string)[]) {
    return [this.wid, '.', mylib.typ('[no-action]', action), ':', [mylib.def(uniq, '[no-uniq]')].flat().join(',')].join(
      '',
    );
  }

  setFieldCol<Fieldn extends keyof Col, Coln extends keyof IExportableCol>(
    fieldn: Fieldn,
    value: Col[Fieldn],
    actions: Record<Fieldn, string>,
    coln: Coln,
    defVal?: Col[Fieldn],
  ) {
    this.execCol(
      {
        prev: mylib.def(this.getBasic(fieldn), defVal),
        value,
        method: 'set',
        action: actions[fieldn],
        args: {
          n: this.name,
          value,
        } as ExecArgs<Col[Fieldn]>,
      },
      coln,
    );

    this.setExportable(fieldn, value);

    return this;
  }

  nameCorrects<Coln extends keyof IEditableCol>(
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
      this.textCorrects(name, undefined, isSetAllText).merge({
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

  textCorrects(text: string | nil, correctsScope?: string, isSetAllText = false) {
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
          message: `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, правильность написания букв ё/е, встречающихся в нём${
            isSetAllText ? `.\n\nУпоминание:\n${text}` : ''
          }`,
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

    const corrects = new CorrectsBox(errors, warnings, unknowns);
    if (correctsScope) this.corrects[correctsScope] = corrects;
    return corrects;
  }
}
