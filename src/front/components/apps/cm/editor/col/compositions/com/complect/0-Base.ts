import { mylib } from 'front/utils';
import { IExportableCom } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { FreeExecDict } from '../../../../../../../../complect/exer/Exer.model';
import { blockStyles } from '../../../../../col/com/block-styles/BlockStyles';
import { Com } from '../../../../../col/com/Com';
import { EditableCol } from '../../../EditableCol';

export class EditableComBase extends Com {
  col: EditableCol<IExportableCom>;
  initialName: string;
  initial: Com;

  constructor(top: IExportableCom, index: number) {
    super(mylib.clone(top), index);

    this.col = new EditableCol(top);
    this.initialName = this.name;
    this.initial = new Com(mylib.clone(top), index);
  }

  create() {
    this.col.execCol(
      {
        action: 'comAdd',
        method: 'set',
        prev: NaN,
        args: {
          comw: this.wid,
          value: this.toCreateDict(),
        },
      },
      'com',
    );

    return this;
  }

  rename(name: string, onCorrecting?: ((val?: string) => any | nil | void) | nil, isSetAllText?: boolean) {
    this.col.renameCol(
      name,
      'com',
      (correct: string) => {
        this.rename(correct, onCorrecting);
        onCorrecting?.(correct);
      },
      isSetAllText,
    );
  }

  exec<Value>(bag: FreeExecDict<Value>) {
    this.col.execCol(bag, 'com');
  }

  toCreateDict() {
    return {
      ...this.top,
      ...this.basics,
      ...this.col.toDict(),
      n: this.name,
      c: this.chords,
      t: this.texts,
      o: this.ords.map(topOrd => {
        const ord = mylib.clone(topOrd.top);

        if (!ord.p?.length) delete ord.p;

        return ord;
      }),
    };
  }

  takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return blockStyles?.styles.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }

  remove(isRemoved = true) {
    this.col.removeCol('com', isRemoved);
  }
}
