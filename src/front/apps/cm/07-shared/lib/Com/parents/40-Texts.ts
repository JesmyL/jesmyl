import { CmComChords } from './30-Chords';

export class CmComTexts extends CmComChords {
  takeSolidTextLines = () => {
    const blockLines: string[][] = [];

    this.orders?.forEach(ord => {
      const previ = blockLines.length - 1;

      if (ord.me.isInherit) {
        blockLines[previ] = blockLines[previ].concat(ord.repeatedText().split('\n'));
        return;
      }

      if (ord.isRealText()) {
        blockLines.push(ord.repeatedText().split('\n'));
      }
    });

    return blockLines;
  };
}
