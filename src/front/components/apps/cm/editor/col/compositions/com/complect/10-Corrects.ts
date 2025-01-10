import { mylib } from 'front/utils';
import { makeRegExp } from 'shared/utils';
import { CorrectsBox } from '../../../../corrects-box/CorrectsBox';
import { correctNotSlavicNameReg_i, textedChordReg } from '../../../../Editor.complect';
import { EditableComBase } from './0-Base';

export class EditableComCorrects extends EditableComBase {
  corrects: Record<string, CorrectsBox | nil> = {};

  prepareCorrectTextLine(line: string) {
    return line
      .replace(makeRegExp('/(\\s*)[«„]\\s*/g'), (_: string, pre: string) => `${pre ? ' ' : ''}"`)
      .replace(makeRegExp('/\\s*[»“](\\s*)/g'), (_: string, post: string) => `"${post ? ' ' : ''}`)
      .replace(
        makeRegExp('/(\\s*)[—–](\\s*)/g'),
        (_: string, pre: string, post: string) => `${pre && post ? ' ' : ''}-${pre && post ? ' ' : ''}`,
      )
      .replace(makeRegExp('/\\s*([,.;!?:])\\s*([^"])/g'), '$1 $2');
  }

  correctName(name: string) {
    return name.replace(correctNotSlavicNameReg_i, '');
  }

  takeCorrectName(text: string) {
    let name = '';

    text.split(makeRegExp('/\\n\\s*\\n/')).find(block => {
      return block.split('\n').find(line => {
        const lowerLine = line.toLowerCase().replace(makeRegExp('/^[^а-яё]+/g'), '');
        if (this.takeStyleByTitle(lowerLine)) return false;

        if (makeRegExp('/^[^a-zA-Z\\d#]+$/').exec(lowerLine)) {
          name = line;
          return true;
        }
        return false;
      });
    });

    return name.replace(makeRegExp('/[^а-я!]+$/i'), '');
  }

  setBlockCorrects(coln: 'texts' | 'chords', coli: number, val: string, isSetAllText?: boolean) {
    const corrects = this.chordsBlockIncorrectMessage(val);
    this.corrects[`${coln}-block-${coli}`] = corrects;
    return corrects;
  }

  textBlockIncorrectMessages(text: string | und, texti?: number, isSetAllText?: boolean) {
    const ret = (err: string | null) => new CorrectsBox(err ? [{ message: err, code: 0 }] : null);

    let mistakes = '';

    const textWithIncorrects = (text || '').replace(makeRegExp('/[^-ієїа-яё().,":;!?\\s\']+/gi'), all => {
      mistakes += all;
      return `[${all}]`;
    });

    if (textWithIncorrects !== text)
      return ret(`Присутствуют недопустимые символы: ${mistakes}\n\n${textWithIncorrects}\n\n`);

    const { level } = this.bracketsTransformed(text);

    if (level) {
      const pre = level < 0 ? 'открывающ' : 'закрывающ';
      const text = mylib.declension(Math.abs(level), `${pre}уюся кавычку`, `${pre}ихся кавычки`, `${pre}ихся кавычек`);

      return ret(
        `В тексте присутствует непарное количество ковычек.\nНеобходимо добавить ${Math.abs(level)} ${text}\n\n`,
      );
    }

    return this.col.textCorrects(text, isSetAllText);
  }

  chordsBlockIncorrectMessage(value: string | und) {
    const incorrectChords: string[] = [];
    const textWithIncorrects = (value || '')
      .trim()
      .split(makeRegExp('/([\\n\\s ]+)/'))
      .map(chord => {
        if (chord.trim() && !chord.match(textedChordReg)) {
          incorrectChords.push(chord);
          return `[${chord}]`;
        }
        return chord;
      })
      .join('');
    const few = incorrectChords.length > 1;

    if (!incorrectChords.length) return new CorrectsBox();

    return new CorrectsBox([
      {
        message:
          `Аккорд${few ? 'ы' : ''} "${incorrectChords.join('; ')}" не верно написан${few ? 'ы' : ''}:\n\n` +
          `${textWithIncorrects}\n\n`,
        code: 0,
      },
    ]);
  }
}
