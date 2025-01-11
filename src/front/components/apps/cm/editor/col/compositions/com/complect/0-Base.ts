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

  constructor(top: IExportableCom) {
    super(mylib.clone(top));

    this.col = new EditableCol(top);
    this.initialName = this.name;
    this.initial = new Com(mylib.clone(top));
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

  static takeStyleByTitle(text: string) {
    if (!text) return;
    const preparedText = text.toLowerCase().replace(makeRegExp('/[^а-я]/g'), '').trim();
    return blockStyles?.styles.find(style => style.tags?.some(tag => preparedText.startsWith(tag)));
  }

  remove(isRemoved = true) {
    this.col.removeCol('com', isRemoved);
  }
}
