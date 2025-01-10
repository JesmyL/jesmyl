import { mylib } from 'front/utils';
import { IExportableCat } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { FreeExecDict } from '../../../../../../complect/exer/Exer.model';
import { Cat } from '../../../col/cat/Cat';
import { CatTracker, ComWrap } from '../../../col/cat/Cat.model';
import { Com } from '../../../col/com/Com';
import { CorrectsBox } from '../../corrects-box/CorrectsBox';
import { EditableCom } from '../compositions/com/EditableCom';
import { EditableCol } from '../EditableCol';

export class EditableCat extends Cat {
  corrects: Record<string, CorrectsBox | nil> = {};
  topComs: EditableCom[];
  initialName: string;
  term: string = '';
  wraps: ComWrap<EditableCom>[] = [];
  col: EditableCol<IExportableCat>;

  initial: Cat;

  constructor(
    top: IExportableCat,
    public coms: EditableCom[],
  ) {
    super(top, coms);
    this.col = new EditableCol(top);
    this.topComs = coms;
    this.initialName = this.name;

    this.initial = new Cat(mylib.clone(top), this.coms);
  }

  exec<Value>(bag: FreeExecDict<Value>) {
    this.col.execCol(bag, 'cat');
  }

  rename(name: string, exec: <Val>(val?: Val) => Val | nil) {
    this.col.renameCol(name, 'cat', (correct: string) => exec(this.rename(correct, exec)));
  }

  clearStack(isNeedClear: boolean) {
    const value = isNeedClear ? [] : this.stack.slice(0);

    this.exec({
      action: 'catClearStack',
      method: 'set',
      anti: ({ action }) => {
        if (action === 'catClearStack' && !isNeedClear) return strategy => strategy.RememberNew;
      },
    });

    this.stack = value;
  }

  remove(isRemoved = true) {
    this.col.removeCol('cat', isRemoved);
  }

  comeBack() {
    this.col.comeBackCol('cat');
  }

  setKind({ title, id }: CatTracker, onSet?: () => void) {
    this.exec({
      action: 'catSetKind',
      method: 'set',
      value: id,
      prev: this.kind,
      args: {
        value: id,
        kindn: title,
      },
    });
    this.kind = id;

    this.coms = [];
    setTimeout(() => {
      onSet && onSet();
    });
    this.col.corrects.catSetKind = null;
  }

  toggleComExistence(com: Com | nil, exec?: <Val>(v?: Val) => Val | nil) {
    if (!com) return;
    const index = this.stack.indexOf(com.wid);

    if (index < 0) {
      this.exec({
        action: 'catBindCom',
        method: 'push',
        args: {
          comw: com.wid,
          value: com.wid,
          comn: com.name,
        },
        anti: ({ action, args }) => {
          if (action === 'catUnbindCom' && args && args.comw === com.wid && args.catw === this.wid)
            return strategy => strategy.RemoveNew;
        },
      });
      this.stack.push(com.wid);
    } else {
      this.exec({
        action: 'catUnbindCom',
        method: 'remove',
        args: {
          comw: com.wid,
          comn: com.name,
        },
        anti: ({ action, args }) => {
          if (action === 'catBindCom' && args && args.comw === com.wid && args.catw === this.wid)
            return strategy => strategy.RemoveNew;
        },
      });
      this.stack.splice(index, 1);
    }
    exec?.();
  }

  removeNativeNumber(com: Com, exec?: <Val>(v?: Val) => Val | nil) {
    delete this.corrects[`setCatNativeNum:${com.wid}`];

    let dict = this.dict;
    if (dict == null) {
      dict = this.dict = {};
    }
    const prev = this.initial.dict?.[com.wid];
    delete dict[com.wid];
    this.exec({
      action: 'deleteCatNativeNum',
      method: 'delete',
      uniq: com.wid,
      prev,
      args: {
        catn: this.name,
        name: com.name,
        catw: com.wid,
      },
      anti: [
        ({ action, args }) => {
          if (action === 'setCatNativeNum' && (args ? args.catw === com.wid && args.comw === this.wid : false))
            return strategy => (null == prev ? strategy.RemoveNew : strategy.RememberNew);
        },
      ],
    });
    exec?.();
  }

  setNativeNumber(com: Com, numberStr: string) {
    const value = parseInt(numberStr);
    const corrects = (this.corrects[`setCatNativeNum:${com.wid}`] = new CorrectsBox(
      numberStr.match(makeRegExp('/^0|\\D|^$/'))
        ? [
            {
              message: 'Некорректное значение номера',
            },
          ]
        : null,
    ));
    let dict = this.dict;
    if (dict == null) {
      dict = this.dict = {};
    }
    dict[com.wid] = value;
    this.dict = dict;

    this.exec({
      action: 'setCatNativeNum',
      prev: this.initial.dict?.[com.wid],
      method: 'set',
      value,
      uniq: com.wid,
      anti: ({ action, args }) => {
        if (action === 'deleteCatNativeNum' && (args ? args.catw === com.wid && args.comw === this.wid : false))
          return strategy => strategy.RememberNew;
      },
      args: {
        catn: this.name,
        name: com.name,
        value,
        comw: com.wid,
      },
      corrects,
    });
    return numberStr;
  }
}
