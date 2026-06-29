import { makeRegExp } from 'regexpert';
import { IExportableOrder } from 'shared/api';
import { enRuLetterVisualEquivalentLazy } from 'shared/const/letter-eqs';
import { checkIsNil, checkIsNotNil, checkIsString } from 'shared/utils/checkIs';
import {
  checkIsChordLineReg,
  cmComLanguages,
  ruDifferentLowerLettersStr,
  slavicLowerLettersStr,
} from 'shared/utils/cm/com/const';
import { objectLength } from 'shared/utils/object.utils';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';
import { KindBlock } from 'shared/values/cm/block-kinds/KindBlock';
import { EditableComBlocks } from './30-Blocks';

export class EditableComParseBlocks extends EditableComBlocks {
  static async parseBlocksFromClipboard(value: string, cb?: (blocks: string[]) => boolean) {
    const blocks: string[] = value.trim().split(makeRegExp('/\\n\\s*\\n/'));

    if ((cb && cb(blocks)) !== false) this.parseBlocks(blocks);
  }

  static parseBlocks(blocks: string[] | string) {
    type Unit = {
      kind?: KindBlock;
      chords?: string;
      text?: string;
      chordLinesCount?: number;
      texti?: number;
      chordsi?: number;
      cleanText?: string;
      firstLineSlogs?: number;
    };

    const units: Unit[] = [];
    let languagei: number | und;
    let wid = 0;
    const errors: string[] = [];
    const slogUnits: Record<number, Unit[]> = {};
    const inheritStyle = comBlockKinds?.kinds.find(({ isInherit }) => isInherit);

    (checkIsString(blocks) ? blocks.split(makeRegExp('/\\n+\\s*\\n+/')) : blocks).forEach(block => {
      if (!block) return;
      const unit: Unit = {};
      const textLines: string[] = [];
      const chordLines: string[] = [];
      units.push(unit);

      block.split('\n').forEach((line, linei) => {
        const freeLine = line.replace(makeRegExp('/\\s+/g'), ' ').trim();

        if (checkIsNotNil(languagei)) {
          cmComLanguages.forEach((_, langi) => {
            if (freeLine.match(makeRegExp(`/[${ruDifferentLowerLettersStr}]/`))) {
              if (checkIsNotNil(languagei) && languagei !== langi) {
                languagei = undefined;
                errors.push('Не удалось определить язык песни');
              } else languagei = langi;
            }
          });
        }

        if (linei === 0) {
          unit.kind = this.takeStyleByTitle(freeLine);
          if (unit.kind) return;
        }

        if (freeLine.match(checkIsChordLineReg)) {
          chordLines.push(freeLine);
        } else {
          if (textLines.length === 0) {
            const letters = freeLine.match(makeRegExp('/[аеёиоуэыяюaeouiіїє]/gi'));
            const slogs = letters?.length;
            if (slogs !== undefined) {
              if (slogUnits[slogs] === undefined) slogUnits[slogs] = [];
              unit.firstLineSlogs = slogs;
              slogUnits[slogs].push(unit);
            }
          }
          textLines.push(freeLine);
        }
      });

      const unitTextLines: string[][] = [];
      const chordLinesCount = (unit.chordLinesCount = chordLines.length);
      let chords: string | und;

      const pushTextLines = (chordLinesCount: number) => {
        for (let i = 0; i < chordLinesCount; i++) {
          const lines = textLines.slice(i * chordLinesCount, (i + 1) * chordLinesCount);
          if (lines.length) unitTextLines.push(lines);
        }
      };

      if (chordLinesCount === 0) {
        if (unit.kind) {
          const sameUnit = units.find(u => unit.kind === u.kind && unit !== u);

          if (sameUnit) {
            if (sameUnit.chordLinesCount) pushTextLines(sameUnit.chordLinesCount);
            chords = sameUnit.chords;
          }
        }
      } else {
        const textLinesCount = textLines.length;
        chords = chordLines.join('\n');

        if (chordLinesCount < textLinesCount) {
          const partsCount = textLinesCount / chordLinesCount;
          if (partsCount !== Math.trunc(partsCount)) unitTextLines.push(textLines);
          else pushTextLines(chordLinesCount);
        } else unitTextLines.push(textLines);
      }

      unitTextLines.forEach((lines, linesi) => {
        const currUnit = linesi === 0 ? unit : {};

        currUnit.chords = chords;
        currUnit.text = lines.join('\n');
        currUnit.cleanText = currUnit.text.replace(makeRegExp(`/[^${slavicLowerLettersStr} \\n]/gi`), '');

        if (linesi > 0) {
          currUnit.kind = inheritStyle;
          units.push(currUnit);
        }
      });
    });

    const texts: string[] = [];
    const chords: string[] = [];
    const unitSlogGroups = Object.values(slogUnits).sort((a, b) => b.length - a.length);

    const orders: IExportableOrder[] = [];

    units.forEach((unit, uniti) => {
      if (checkIsNil(unit.kind) && comBlockKinds) {
        if (!unit.text) {
          if (uniti === 0) unit.kind = comBlockKinds.forChordedBlock[0];
          else unit.kind = comBlockKinds.forChordedBlock[1];
        }
        const prevUnit = units[uniti - 1];
        if (prevUnit?.kind && prevUnit.text && unit.firstLineSlogs === prevUnit.firstLineSlogs) {
          const style = comBlockKinds.getNextLevelSortedStyle(prevUnit.kind);
          if (style) unit.kind = style;
        } else {
          const uniti = unitSlogGroups.findIndex(units => units.includes(unit));
          if (uniti > -1) {
            const style = comBlockKinds.getNextLevelSortedStyle(uniti);
            if (style) unit.kind = style;
          }
        }
      }

      if (unit.text) {
        let texti: number;
        const sameTextUnit = units.find(u => u.cleanText === unit.cleanText && checkIsNotNil(u.texti));

        if (checkIsNotNil(sameTextUnit?.texti)) texti = sameTextUnit.texti;
        else texti = texts.push(unit.text) - 1;

        unit.texti = texti;
      }

      if (unit.chords) {
        let chordsi: number;
        const sameChordsUnit = units.find(u => u.chords === unit.chords && checkIsNotNil(u.chordsi));

        if (checkIsNotNil(sameChordsUnit?.chordsi)) chordsi = sameChordsUnit.chordsi;
        else chordsi = chords.push(unit.chords) - 1;

        unit.chordsi = chordsi;
      }

      const ord: IExportableOrder = { w: wid++ };

      const similarOrd = orders.find(ord => ord.c === unit.chordsi && ord.t === unit.texti && ord.k === unit.kind?.key);
      if (similarOrd) {
        ord.a = similarOrd.w;
      } else {
        if (checkIsNotNil(unit.chordsi)) ord.c = unit.chordsi;
        if (checkIsNotNil(unit.texti)) ord.t = unit.texti;
        if (checkIsNotNil(unit.kind)) ord.k = unit.kind.key;
      }

      orders.push(ord);
    });

    return {
      com: {
        l: languagei || undefined,
        c: objectLength(chords) ? chords : [''],
        t: objectLength(texts) ? texts.map(text => enRuLetterVisualEquivalentLazy().repl(text)) : [''],
        o: orders.filter(ord => checkIsNotNil(ord.t) || checkIsNotNil(ord.c) || checkIsNotNil(ord.a)),
      },
      errors,
    };
  }
}
