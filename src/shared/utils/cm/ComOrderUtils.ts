import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { OrderRepeats } from 'shared/api';

export class CmComOrderUtils {
  private static _insertRepeats(
    txt: string,
    repeatsCount: number,
    insetrStartRepeatSign: boolean,
    insetrFinishRepeatSign: boolean,
  ) {
    return `${!insetrStartRepeatSign || repeatsCount < 1 ? '' : `${'/'.repeat(repeatsCount)}&nbsp;`}${txt || ''}${
      !insetrFinishRepeatSign || repeatsCount < 2 ? '' : `&nbsp;${'\\'.repeat(repeatsCount)}`
    }`;
  }

  static makeRepeatedText(text: string, repeats: OrderRepeats | nil = null) {
    if (!repeats) return text;

    if (mylib.isNum(repeats)) return this._insertRepeats(text, repeats, true, true);
    else {
      const poss: PRecord<number, PRecord<number, number[]>> = {};
      const parts: PRecord<string, number> = {};
      const sortedKeys = mylib
        .keys(repeats)
        .sort((a, b) => calculateRepeatKeyWeight(parts, a) - calculateRepeatKeyWeight(parts, b));

      for (const key of sortedKeys) {
        if (key === '.') continue;

        const pushRep = (linei: number, wordi: number, fix = 1) => {
          ((poss[linei] ??= {})[wordi] ??= []).push(fix * repeats[key]);
        };

        if (key.match(makeRegExp('/[a-z]$/i'))) {
          const [linei, wordi] = key.split(makeRegExp('/[:a-z]/i'));
          pushRep(+linei, +wordi, -1);
          continue;
        }

        if (key.startsWith('~') || key.match(makeRegExp('/^[a-z]/i'))) {
          const [, linei, wordi] = key.split(makeRegExp('/[~:a-z]/i'));
          pushRep(+linei, +wordi);
          continue;
        }

        const limits = key.split('-');
        const [begLine, begWord = -1] = limits[0].split(':');
        const [endSplitLine, endWord = -1] = (limits[1] ?? '').split(':');
        const endLine = endSplitLine || begLine;

        if (begLine) pushRep(+begLine, +begWord);
        if (endLine) pushRep(+endLine, +endWord, -1);
      }

      const repld: string[] = [];
      const lines = text.split(makeRegExp('/\\n+/'));

      for (let linei = 0; linei < lines.length; linei++) {
        const words = lines[linei].split(makeRegExp('/ +/'));

        const repldLine: string[] = [];

        for (let wordi = 0; wordi < words.length; wordi++) {
          const counts = poss[linei]?.[wordi] ?? [];

          repldLine.push(
            counts.length === 0
              ? words[wordi]
              : counts.reduceRight(
                  (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                  words[wordi],
                ),
          );
        }

        const counts = poss[linei]?.[-1];

        repld.push(
          counts !== undefined && counts.length > 0
            ? counts.reduceRight(
                (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                repldLine.join(' '),
              )
            : repldLine.join(' '),
        );
      }

      return mylib.isNum(repeats['.'])
        ? this._insertRepeats(repld.join('\n'), repeats['.'], true, true)
        : repld.join('\n');
    }
  }
}

const split = (str: string | nil, by: string): (string | nil)[] | nil => str?.split(by);

const calculateRepeatKeyWeight = (parts: PRecord<string, number>, key: string) => {
  if (parts[key] != null) return parts[key];

  const keyLimits = split(key, '-');
  const begDigits = split(keyLimits?.[0], ':');
  const endDigits = split(keyLimits?.[1], ':');

  return (parts[key] =
    (endDigits?.[0] ? 1 : 0) + (endDigits?.[1] ? 1 : 0) + (begDigits?.[0] ? 1 : 0) + (begDigits?.[1] ? 1 : 0));
};
