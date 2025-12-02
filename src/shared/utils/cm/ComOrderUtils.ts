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

      mylib
        .keys(repeats)
        .sort((a, b) => {
          let acount = 0,
            bcount = 0;
          const [abeg = '', aend = ''] = a.split('-');
          const [, abegWord] = abeg.split(':');
          const [aendLine, aendWord] = aend.split(':');

          const [bbeg = '', bend = ''] = b.split('-');
          const [, bbegWord] = bbeg.split(':');
          const [bendLine, bendWord] = bend.split(':');

          if (abegWord) acount++;
          if (aendWord) acount++;
          if (aendLine) acount++;

          if (bbegWord) bcount++;
          if (bendWord) bcount++;
          if (bendLine) bcount++;

          return acount - bcount;
        })
        .forEach(key => {
          if (key === '.') return;

          const pushRep = (linei: number, wordi: number, fix = 1) => {
            const tr = (poss[linei] = mylib.typ({}, poss[linei]));
            const td = (tr[wordi] = mylib.typ([], tr[wordi]));
            td.push(fix * repeats[key]);
          };

          if (key.match(makeRegExp('/[a-z]$/i'))) {
            const [linei, wordi] = key.split(makeRegExp('/[:a-z]/i'));
            pushRep(+linei, +wordi, -1);
            return;
          }

          if (key.startsWith('~') || key.match(makeRegExp('/^[a-z]/i'))) {
            const [, linei, wordi] = key.split(makeRegExp('/[~:a-z]/i'));
            pushRep(+linei, +wordi);
            return;
          }

          const [beg = '', end = ''] = key.split('-');
          const [begLine, begWord = -1] = beg.split(':');
          const [endSplitLine, endWord = -2] = end.split(':');
          const endLine = endSplitLine || begLine;

          if (begLine) pushRep(+begLine, +begWord);
          if (endLine) pushRep(+endLine, +endWord, -1);
        });

      const repld = text
        .split(makeRegExp('/\\n+/'))
        .map((line, linei) => {
          const words = line.split(makeRegExp('/ +/'));

          const repldLine = words
            .map((word, wordi) => {
              const counts = poss[linei]?.[wordi] ?? [];

              return counts.length === 0
                ? word
                : counts.reduce(
                    (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                    word,
                  );
            })
            .join(' ');

          const counts = poss[linei]?.[-1]?.concat(poss[linei][-2] ?? []) ?? [];

          return counts.length > 0
            ? counts.reduce(
                (prev, count) => this._insertRepeats(prev, Math.abs(count), count > 0, count < 0),
                repldLine,
              )
            : repldLine;
        })
        .join('\n');

      return mylib.isNum(repeats['.']) ? this._insertRepeats(repld, repeats['.'], true, true) : repld;
    }
  }
}
