import { makeRegExp } from 'regexp-master';
import { EeStorePack } from 'shared/api';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';
import { smylib, SMyLib } from '../SMyLib';
import { itTrim } from '../utils';

export class CmComUtils {
  static doubleQuotesStr = '«»„„“”«»“' as const;
  static singleQuotesStr = '’`‘’' as const;
  static replacableAvailableCharsStr = '…' as const;
  static ruUaSingLettersStr = 'уеыаоэяиёюіїє ' as const;
  static ruDifferentLowerLettersStr = 'ъыэё' as const;
  static uaDifferentLowerLettersStr = 'іґїє' as const;
  static slavicLowerLettersStr = `а-яё${this.uaDifferentLowerLettersStr}` as const;
  static chordLikeStr = '([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?))' as const;
  static displayableTextBlockSingleWritedSymbolsStr = `(),":;'?` as const;
  static displayableTextBlockSymbolsStr = `-.!\\s${this.displayableTextBlockSingleWritedSymbolsStr}` as const;
  static displayableTextBlockCharsStr = `${this.displayableTextBlockSymbolsStr}${this.slavicLowerLettersStr}`;

  static textedChordReg = makeRegExp(
    `/^\\.*-?${this.chordLikeStr}(/${this.chordLikeStr})?((\\.+|-|\\.+-)${this.chordLikeStr}(/${this.chordLikeStr})?)*$/`,
  );
  static correctChordNameReg = makeRegExp(`/^${this.chordLikeStr}(/${this.chordLikeStr})?$/`);
  static checkIsChordLineReg = makeRegExp('/^[-+A-Ha-z# /\\d]+$/');
  static correctNotSlavicNameReg_i = makeRegExp(`/([^${this.slavicLowerLettersStr} !?]+\\s*)+$/i`);

  static ruUaReg_i = makeRegExp(`/[${this.ruUaSingLettersStr}]/i`);
  static simpleHashChordReg_g = makeRegExp('/[ACDEFGH]#?/g');
  static simpleBemoleChordReg_g = makeRegExp('/[A-H]b?/g');
  static simpleHashedEachLetterChordReg_g = makeRegExp('/[A-H]#/g');

  static simpleHashChords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];
  static cleanChords = ['A', 'C', 'D', 'E', 'F', 'G', 'H'];

  static openAndClosedQuotes = [
    ['«', '»'],
    ['„', '“'],
    ['"', '"'],
    ["'", "'"],
  ];

  static chordBemoleEquivalent: Record<string, string> = {
    'A#': 'B',
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
  };

  static cmComLanguages = ['русский', 'украинский'];

  static chordDiezEquivalent = SMyLib.entries(this.chordBemoleEquivalent).reduce(
    (acc, [key, val]) => ({ ...acc, [val]: key }),
    {
      Bb: 'A#',
      Hb: 'A#',
    } as Record<string, string>,
  );

  private static clearTextLineForLengthCompute = (line: string) =>
    line.replace(makeRegExp(`/[^${this.slavicLowerLettersStr} ]+/gi`), '');

  static takeTextLineOverLengthIndex = (text: string, maxLength: number) => {
    const lines = text.split(makeRegExp(`/\n/`));
    return lines.findIndex(line => this.clearTextLineForLengthCompute(line).length > maxLength);
  };

  static textLinesLengthIncorrects = (text: string, maxLength: number): IIncorrects | und => {
    const linei = this.takeTextLineOverLengthIndex(text, maxLength);

    if (linei > -1) {
      const line = this.clearTextLineForLengthCompute(text.split(makeRegExp(`/\n/`))[linei]);
      return {
        errors: [
          {
            message: `Строка ${linei + 1} слишком длинная:\n${line.slice(0, maxLength)}/---/${line.slice(maxLength)}`,
          },
        ],
      };
    }
  };

  static takeCorrectComNumber = (comPositionNumber: number) =>
    comPositionNumber > 403 || comPositionNumber > 665 ? comPositionNumber + 1 : comPositionNumber;

  static transformToClearText = (text: string) => {
    return text
      .split(makeRegExp('/\n/'))
      .map(itTrim)
      .join('\n')
      .trim()
      .replace(makeRegExp(`/[${this.doubleQuotesStr}]/g`), '"')
      .replace(makeRegExp(`/[${this.singleQuotesStr}]/g`), "'")
      .replace(makeRegExp(`/ ([,.!?:])/g`), '$1')
      .replace(makeRegExp(`/ -+ |-+ | -+/g`), '- ')
      .replace(makeRegExp(`/…|\\.{4,}/g`), '...')
      .replace(makeRegExp(`/([^.]|^)\\.{2}([^.]|$)/g`), '$1.$2')
      .replace(makeRegExp(`/([${this.displayableTextBlockSingleWritedSymbolsStr} ])\\1+/g`), '$1');
  };

  static transformToDisplayedText = (() => {
    const backBrackets = ['`', '`'];
    const dashReg = makeRegExp(`/((?=\\S)-+(?=\\S))|( ?-+\n)|( ?-+ ?)/g`);
    const dashReplacer: (...args: string[]) => string = (_, $1, $2) => ($2 ? ' —\n' : $1 || ' —&nbsp;');
    const openBracketReg = makeRegExp(`/(\\( ?)?("+)( ?\\)?)/g`);
    const closeBracketReg = makeRegExp(`/\\("+ \\)$|^\\( "+\\)/g`);
    const spacesLikeReg = makeRegExp(`/\\s/`);

    return (text = '') => {
      let level = 0;

      const str = text
        .replace(makeRegExp(`/[^${this.displayableTextBlockCharsStr}]+/gi`), '')
        .replace(dashReg, dashReplacer)
        .replace(openBracketReg, (_, pref = '', all: string, post = '', index, text) => {
          const pre = text[index - 1];
          const isOpen = !pre || pre.search(spacesLikeReg) + 1;
          const brLevel = level - (isOpen ? 0 : 1);
          level -= (isOpen ? -1 : 1) * all.length;

          return pref[0] === '(' && post.endsWith(')')
            ? ''
            : (pref || '') +
                all
                  .split('')
                  .map(
                    (_, bri) =>
                      (this.openAndClosedQuotes[brLevel - (isOpen ? -bri : bri)] ?? backBrackets)[isOpen ? 0 : 1],
                  )
                  .join('') +
                (post || '');
        })
        .replace(closeBracketReg, '');

      return { text: str, level };
    };
  })();

  static takeTextBlockIncorrects = (text: string | und = '', eeStore: EeStorePack): IIncorrects => {
    let mistakes = '';

    const textWithIncorrects = text.replace(
      makeRegExp(
        `/[^${this.displayableTextBlockCharsStr}${this.doubleQuotesStr}${this.singleQuotesStr}${this.replacableAvailableCharsStr}]+/gi`,
      ),
      all => {
        mistakes += all;
        return `[${all}]`;
      },
    );

    if (textWithIncorrects !== text)
      return { errors: [{ message: `Присутствуют недопустимые символы: ${mistakes}\n\n${textWithIncorrects}\n\n` }] };

    const { level } = this.transformToDisplayedText(text);

    if (level) {
      const pre = level < 0 ? 'открывающ' : 'закрывающ';
      const text = smylib.declension(Math.abs(level), `${pre}уюся кавычку`, `${pre}ихся кавычки`, `${pre}ихся кавычек`);

      return {
        warnings: [
          {
            message: `В тексте присутствует непарное количество ковычек.\nНеобходимо добавить ${Math.abs(level)} ${text}\n\n`,
          },
        ],
      };
    }

    return this.eeTextIncorrects(text, eeStore);
  };

  static eeTextIncorrects = (text: string | nil, eeStore: EeStorePack): IIncorrects => {
    if (typeof text !== 'string') return {};
    const errors: IIncorrect[] = [];
    const warnings: IIncorrect[] = [];
    const unknowns: IIncorrect[] = [];

    text.split(makeRegExp(`/[^${this.slavicLowerLettersStr}]/i`)).forEach(async realWord => {
      if (
        !realWord.match(makeRegExp('/[её]/i')) ||
        realWord.match(makeRegExp(`/[${this.uaDifferentLowerLettersStr}]/i`))
      )
        return;
      const lower = realWord.toLowerCase();
      const word = lower.replace(makeRegExp('/ё/g'), 'е');
      const parts = lower.split(makeRegExp('/[а-дж-я]*([её])/')).filter(p => p);

      if (eeStore[word] == null) {
        unknowns.push({
          message:
            `Слово '${realWord}' ещё не встречалось среди существующих песен. Проверь, пожалуйста, ` +
            `правильность написания букв ё/е, встречающихся в нём.`,
        });
        return;
      }

      [eeStore[word]].flat().forEach((type, typei, typea) => {
        const isE = parts[typei] === 'е';
        const info = (code: 0 | 1) => ({
          message: `${['Не верно', 'Возможно не верно'][code]} указана ${
            typea.length > 1 ? `${typei + 1}-я из букв ё/е` : `буква ${parts[typei]}`
          } в слове '${realWord}'.`,
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
  };

  static chordsBlockIncorrectMessage = (value: string | und): IIncorrects => {
    const incorrectChords: string[] = [];
    const textWithIncorrects = (value || '')
      .trim()
      .split(makeRegExp('/([\\n\\s ]+)/'))
      .map(chord => {
        if (chord.trim() && !chord.match(this.textedChordReg)) {
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
  };
}
