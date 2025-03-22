import { mylib } from '#shared/lib/my-lib';
import { textedChordReg } from '$cm+editor/basis/lib/utils';
import { ICorrect, ICorrects } from '$cm+editor/basis/model/Corrects';
import { makeRegExp } from 'shared/utils';
import { cmEditorIDB } from '../../cmEditorIDB';
import { EditableComBase } from './0-Base';

export class EditableComCorrects extends EditableComBase {
  static takeCorrectName(text: string) {
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

  static textBlockIncorrectMessages(text: string | und, isSetAllText?: boolean) {
    const ret = (message: string | null): ICorrects => ({ errors: message ? [{ message }] : undefined });

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

    return EditableComCorrects.textCorrects(text, isSetAllText);
  }

  static chordsBlockIncorrectMessage(value: string | und): ICorrects {
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

    if (!incorrectChords.length) return {};

    return {
      errors: [
        {
          message:
            `Аккорд${few ? 'ы' : ''} "${incorrectChords.join('; ')}" не верно написан${few ? 'ы' : ''}:\n\n` +
            `${textWithIncorrects}\n\n`,
        },
      ],
    };
  }

  static textCorrects(text: string | nil, isSetAllText = false): ICorrects {
    if (typeof text !== 'string') return {};
    const errors: ICorrect[] = [];
    const warnings: ICorrect[] = [];
    const unknowns: ICorrect[] = [];

    text.split(makeRegExp('/[^а-яёіґїє]/i')).forEach(async realWord => {
      if (!realWord.match(makeRegExp('/[её]/i')) || realWord.match(makeRegExp('/[іґїє]/i'))) return;
      const lower = realWord.toLowerCase();
      const word = lower.replace(makeRegExp('/ё/g'), 'е');
      const parts = lower.split(makeRegExp('/[а-дж-я]*([её])/')).filter(p => p);
      const eeStore = await cmEditorIDB.get.eeStore();

      if (eeStore[word] == null) {
        unknowns.push({
          message:
            `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, ` +
            `правильность написания букв ё/е, встречающихся в нём${isSetAllText ? `.\n\nУпоминание:\n${text}` : ''}`,
        });
        return;
      }

      [eeStore[word]].flat().forEach((type, typei, typea) => {
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

    return { errors, warnings, unknowns };
  }
}
