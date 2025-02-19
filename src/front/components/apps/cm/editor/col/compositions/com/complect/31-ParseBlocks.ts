import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'shared/utils';
import { blockStyles } from '../../../../../col/com/block-styles/BlockStyles';
import { StyleBlock } from '../../../../../col/com/block-styles/StyleBlock';
import { INewExportableOrder } from '../../../../../col/com/order/Order.model';
import {
  checkIsChordLineReg,
  ruDifferentLowerLettersStr,
  slavicLowerLettersStr,
  uaDifferentLowerLettersStr,
} from '../../../../Editor.complect';
import { EditableComBlocks } from './30-Blocks';

const freeSlavicLineReg_gi = makeRegExp(`/[^${slavicLowerLettersStr} ]/gi`);
const ruDifferentReg = makeRegExp(`/[${ruDifferentLowerLettersStr}]/`);
const uaDifferentReg = makeRegExp(`/[${uaDifferentLowerLettersStr}]/`);

export class EditableComParseBlocks extends EditableComBlocks {
  static async parseBlocksFromClipboard(value: string, cb?: (blocks: string[]) => boolean) {
    const blocks: string[] = value.trim().split(makeRegExp('/\\n\\s*\\n/'));

    if ((cb && cb(blocks)) !== false) this.parseBlocks(blocks);
  }

  static parseBlocks(blocks: string[] | string) {
    type Unit = {
      style?: StyleBlock;
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
    const setLanguagei = (reg: RegExp, text: string, langi: number) => {
      if (text.match(reg)) {
        if (languagei !== undefined && languagei !== langi) {
          languagei = undefined;
          errors.push('Не удалось определить язык песни');
        } else languagei = langi;
      }
    };
    const inheritStyle = blockStyles?.styles.find(({ isInherit }) => isInherit);

    (typeof blocks === 'string' ? blocks.split(makeRegExp('/\\n+\\s*\\n+/')) : blocks).forEach(block => {
      if (!block) return;
      const unit: Unit = {};
      const textLines: string[] = [];
      const chordLines: string[] = [];
      units.push(unit);

      block.split('\n').forEach((line, linei) => {
        const freeLine = line.replace(makeRegExp('/\\s+/g'), ' ').trim();

        if (languagei !== null) {
          setLanguagei(ruDifferentReg, freeLine, 0);
          setLanguagei(uaDifferentReg, freeLine, 1);
        }

        if (linei === 0) {
          unit.style = this.takeStyleByTitle(freeLine);
          if (unit.style) return;
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
          const lines = textLines; //.slice(i * chordLinesCount, (i + 1) * chordLinesCount);
          if (lines.length) unitTextLines.push(lines);
        }
      };

      if (chordLinesCount === 0) {
        const unitStyle = unit.style;
        if (unitStyle) {
          const sameUnit = units.find(({ style }) => unitStyle === style);

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

        currUnit.text = lines.join('\n');
        currUnit.chords = chords;
        currUnit.cleanText = lines.map(line => line.replace(freeSlavicLineReg_gi, '')).join('\n');

        if (linesi > 0) {
          currUnit.style = inheritStyle;
          units.push(currUnit);
        }
      });
    });

    const texts: string[] = [];
    const chords: string[] = [];
    const unitSlogGroups = Object.values(slogUnits).sort((a, b) => b.length - a.length);

    const orders: INewExportableOrder[] = [];

    units.forEach((unit, uniti) => {
      if (unit.style === undefined && blockStyles) {
        if (!unit.text) {
          if (uniti === 0) unit.style = blockStyles.forChordedBlock[0];
          else unit.style = blockStyles.forChordedBlock[1];
        }
        const prevUnit = units[uniti - 1];
        if (prevUnit?.style && prevUnit.text && unit.firstLineSlogs === prevUnit.firstLineSlogs) {
          const style = blockStyles.getNextLevelSortedStyle(prevUnit.style);
          if (style) unit.style = style;
        } else {
          const uniti = unitSlogGroups.findIndex(units => units.includes(unit));
          if (uniti !== undefined) {
            const style = blockStyles.getNextLevelSortedStyle(uniti);
            if (style) unit.style = style;
          }
        }
      }

      if (unit.text) {
        let texti: number;
        const sameTextUnit = units.find(u => u.cleanText === unit.cleanText && u.texti !== undefined);

        if (sameTextUnit?.texti !== undefined) texti = sameTextUnit.texti;
        else texti = texts.push(unit.text) - 1;

        unit.texti = texti;
      }

      if (unit.chords) {
        let chordsi: number;
        const sameChordsUnit = units.find(u => u.chords === unit.chords && u.chordsi !== undefined);

        if (sameChordsUnit?.chordsi !== undefined) chordsi = sameChordsUnit.chordsi;
        else chordsi = chords.push(unit.chords) - 1;

        unit.chordsi = chordsi;
      }

      const ord: INewExportableOrder = { w: wid++ };

      const similarOrd = orders.find(
        ord => ord.c === unit.chordsi && ord.t === unit.texti && ord.s === unit.style?.key,
      );
      if (similarOrd) {
        ord.a = similarOrd.w;
      } else {
        if (unit.chordsi !== undefined) ord.c = unit.chordsi;
        if (unit.texti !== undefined) ord.t = unit.texti;
        if (unit.style !== undefined) ord.s = unit.style.key;
      }

      orders.push(ord);
    });

    return {
      com: {
        l: languagei,
        c: chords.length ? chords : [''],
        t: texts.length ? texts : [''],
        o: orders.filter(ord => mylib.keys(ord).length),
      },
      errors,
    };
  }
}
