import { escapeRegExpNames, makeNamedRegExp, makeRegExp } from 'regexpert';
import { EeStorePack } from 'shared/api';
import { IIncorrect, IIncorrects } from 'shared/model/cm/Incorrects';
import { smylib, SMyLib } from '../SMyLib';
import { itTrim } from '../utils';

const hardModificators = `(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))` as const;
const lightModificators = `(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))`;
const chordLeadLetter = `[ACDFG]#?|[EH]`;
const chordLikeStr = `(?<simpleChord>(?:${chordLeadLetter})m?7?)${lightModificators}${hardModificators}?` as const;
const chordInterpretedLikeStr =
  `(?<simpleChord>(?:${chordLeadLetter}|B)m?7?)${lightModificators}${hardModificators}?` as const;

export class CmComUtils {
  static doubleQuotesStr = '«»„„“”«»“' as const;
  static singleQuotesStr = '’`‘’' as const;
  static replacableAvailableCharsStr = '…' as const;
  static ruUaSingLettersStr = 'уеыаоэяиёюіїє ' as const;
  static ruDifferentLowerLettersStr = 'ъыэё' as const;
  static uaDifferentLowerLettersStr = 'іґїє' as const;
  static slavicLowerLettersStr = `а-яё${this.uaDifferentLowerLettersStr}` as const;
  static chordLikeStr = chordLikeStr;
  static displayableTextBlockSingleWritedSymbolsStr = `(),":;'?` as const;
  static displayableTextBlockSymbolsStr = `-.!\\s${this.displayableTextBlockSingleWritedSymbolsStr}` as const;
  static displayableTextBlockCharsStr = `${this.displayableTextBlockSymbolsStr}${this.slavicLowerLettersStr}` as const;

  static textedChordRegs = makeNamedRegExp(
    // regexpert:
    // stringify $0 U23
    `/^\\|?\\.*-?${chordLikeStr}(?<bassChord>/${
      //
      escapeRegExpNames(chordLikeStr, '_bass')
    })?(?<repeats>(?:(?:\\.+|-|\\.+-)${
      //
      escapeRegExpNames(chordLikeStr, '_lastRepeat')
    }(?:/${
      //
      escapeRegExpNames(chordLikeStr, `_lastRepeatBass`)
    })?)*)\\|?$/`,
  );
  static correctChordRegs = makeNamedRegExp(
    // regexpert:
    // stringify $0
    `/^${chordLikeStr}(?:/${escapeRegExpNames(chordLikeStr, '_bass')})?$/`,
  );
  static chordInterpretedRegs = makeNamedRegExp(
    // regexpert:
    // stringify $0
    `/^${chordInterpretedLikeStr}(?:/${escapeRegExpNames(chordInterpretedLikeStr, '_bass')})?$/`,
  );
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

  static takeCorrectComNumber = (comIndex: number) => (comIndex > 403 || comIndex > 665 ? comIndex + 1 : comIndex);

  static takeCorrectComIndex = (comPosition: number) =>
    comPosition > 403 || comPosition > 665 ? comPosition - 1 : comPosition;

  static trimTextLines = (text: string) => text.trim().split(makeRegExp('/\n/')).map(itTrim).join('\n');

  static transformToClearText = (text: string) => {
    return this.trimTextLines(text)
      .replace(makeRegExp(`/[${this.doubleQuotesStr}]/g`), '"')
      .replace(makeRegExp(`/[${this.singleQuotesStr}]/g`), "'")
      .replace(makeRegExp(`/ ([,.!?:])/g`), '$1')
      .replace(makeRegExp(`/ -+ |-+ | -+/g`), '- ')
      .replace(makeRegExp(`/…|\\.{4,}/g`), '...')
      .replace(makeRegExp(`/([^.]|^)\\.{2}([^.]|$)/g`), '$1.$2')
      .replace(makeRegExp(`/([${this.displayableTextBlockSingleWritedSymbolsStr} ])\\1+/g`), '$1')
      .replace(makeRegExp(`/([,.;:!?)](?!["'.]))([^\\s])/g`), '$1 $2');
  };

  static transformToDisplayedText = (() => {
    let level = 0;
    const dashReplacer: (...args: string[]) => string = (_, $1, $2) => ($2 ? ' —\n' : $1 || ' —&nbsp;');

    const replaceNestedBrackets = (all: string, index: number, text: string) => {
      const pre = text[index - 1];
      const isOpen = !pre || pre.match(makeRegExp(`/\\s/`));

      const brLevel = level - (isOpen ? 0 : 1);
      level -= (isOpen ? -1 : 1) * all.length;

      return all
        .split('')
        .map((_, bri) => this.openAndClosedQuotes[brLevel - (isOpen ? -bri : bri)]?.[isOpen ? 0 : 1] ?? '`')
        .join('');
    };

    return (text = '') => {
      level = 0;

      const str = text
        .replace(makeRegExp(`/[^${this.displayableTextBlockCharsStr}]+/gi`), '')
        .replace(makeRegExp(`/"+/g`), replaceNestedBrackets)
        .replace(makeRegExp(`/((?=\\S)-+(?=\\S))|( ?-+\n)|( ?-+ ?)/g`), dashReplacer);

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
        if (chord.trim() && !chord.match(this.textedChordRegs.regExp)) {
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
