import { mylib } from 'front/utils';
import SourceBased from '../../../../../../07-shared/lib/SourceBased';
import * as styles from '../../../resources/block-styles.json';
import { IExportableSetts } from './BlockStyles.model';
import { StyleBlock } from './StyleBlock';

export class BlockStyles extends SourceBased<IExportableSetts> {
  styles: StyleBlock[];
  levelSorted: StyleBlock[][];
  forChordedBlock: StyleBlock[];

  constructor(top: IExportableSetts) {
    super(top);
    this.styles = mylib.typ([], top.styles).map(st => new StyleBlock(st));

    const levelStyles: Record<number, StyleBlock[]> = {};
    this.styles
      .filter(style => style.group !== undefined)
      .forEach(style => {
        if (levelStyles[style.group!] === undefined) levelStyles[style.group!] = [];
        levelStyles[style.group!].push(style);
      });

    this.levelSorted = Object.values(levelStyles).sort((a, b) => (a[0]?.group || 0) - (b[0]?.group || 0));
    this.forChordedBlock = this.styles
      .filter(style => style.forChordedBlock)
      .sort((a, b) => a.forChordedBlock! - b.forChordedBlock!);
  }

  getNextLevelSortedStyle(style: StyleBlock | number) {
    const styles = mylib.isNum(style)
      ? this.levelSorted[style]
      : this.levelSorted.find(styles => styles.includes(style));

    if (styles) {
      const stylei = mylib.isNum(style) ? 0 : styles.indexOf(style);
      if (stylei < 0) return null;
      else return styles[stylei > styles.length - 2 ? 0 : stylei + 1];
    }

    return null;
  }
}

export let blockStyles: BlockStyles | nil = new BlockStyles(styles);
