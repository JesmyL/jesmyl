import { mylib } from '#shared/lib/my-lib';
import { IExportableKindProp } from './BlockKind.model';
import { comBlockKindsConfig } from './comBlockKinds.config';
import { KindBlock } from './KindBlock';

export class BlockKind {
  kinds: KindBlock[];
  levelSorted: KindBlock[][];
  forChordedBlock: KindBlock[];

  constructor(styles: IExportableKindProp[]) {
    this.kinds = styles.map(st => new KindBlock(st));

    const levelStyles: Record<number, KindBlock[]> = {};
    this.kinds
      .filter(style => style.group !== undefined)
      .forEach(style => {
        if (levelStyles[style.group!] === undefined) levelStyles[style.group!] = [];
        levelStyles[style.group!].push(style);
      });

    this.levelSorted = Object.values(levelStyles).sort((a, b) => (a[0]?.group || 0) - (b[0]?.group || 0));
    this.forChordedBlock = this.kinds
      .filter(style => style.forChordedBlock)
      .sort((a, b) => a.forChordedBlock! - b.forChordedBlock!);
  }

  getNextLevelSortedStyle(style: KindBlock | number) {
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

export const comBlockKinds = new BlockKind(comBlockKindsConfig);
