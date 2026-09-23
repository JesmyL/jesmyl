import { makeRegExp } from 'regexpert';
import { IExportableComInterpretation, IFixedCom } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';

export class EditableComBase extends CmCom {
  constructor(...args: ConstructorParameters<typeof CmCom>) {
    super(...args);
    this.chords = this.top.c;

    if (this.isHardChords && this.top.c1) {
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

  fix: IFixedCom | nil;
  intp: IExportableComInterpretation | nil;

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
