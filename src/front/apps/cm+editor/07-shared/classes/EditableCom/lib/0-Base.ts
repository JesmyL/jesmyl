import { makeRegExp } from 'regexpert';
import { CmCom } from 'shared/const/cm/Com';
import { cmComChordsErrorDict, takeChordsErrorDictValue } from 'shared/model/cm/chords';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';

export class EditableComBase extends CmCom {
  constructor(...args: ConstructorParameters<typeof CmCom>) {
    super(...args);
    this.chords = this.top.c;

    if (cmComChordsErrorDict[this.wid] == null)
      cmComChordsErrorDict[this.wid] = takeChordsErrorDictValue(this.top.c, this.top.c1);

    if (cmComChordsErrorDict[this.wid]) this.chords = [];
    else if (this.isHardChords && this.top.c1) {
      const chordHeap = this.top.c.map(chords => chords.split('\n').map(line => line.split(' ')));

      this.chords = this.top.c1.some((chordBlock, chordBlocki) => {
        return chordBlock
          .split('\n')
          .some((line, linei) => line.split(' ').length !== chordHeap[chordBlocki]?.[linei]?.length);
      })
        ? []
        : this.top.c1;
    }
  }

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return comBlockKinds?.kinds.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }

  transposedHardChords = (delta?: number) => {
    return this.transposedBlocks(delta, this.top.c1 ?? this.top.c);
  };

  transposedSimpleChords = (delta?: number) => {
    return this.top.c && this.transposedBlocks(delta, this.top.c);
  };
}
