import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator';
import { mylib } from 'front/utils';
import { IExportableOrder, IExportableOrderFieldValues, InheritancableOrder, OrderRepeats } from 'shared/api';
import { FreeExecDict, FreeExecDictUniq } from '../../../../../../../../complect/exer/Exer.model';
import { cmExer } from '../../../../../CmExer';
import { Order } from '../../../../../col/com/order/Order';
import { EditableOrderRegion, IExportableOrderMe } from '../../../../../col/com/order/Order.model';
import { EditableCom } from '../../com/EditableCom';

export class EditableOrder extends Order {
  _regions?: EditableOrderRegion<EditableOrder>[];
  com: EditableCom;

  constructor(me: IExportableOrderMe, com: EditableCom) {
    super(me, com);
    this.com = com;
  }

  get antiIsVisible() {
    return this.isVisible ? 0 : 1;
  }

  comOrders() {
    return this.com.orders;
  }

  get regions(): EditableOrderRegion<EditableOrder>[] | und {
    if (this._regions === undefined) this.setRegions();

    return this._regions;
  }

  setField<K extends keyof IExportableOrder>(
    fieldn: keyof IExportableOrder,
    value: IExportableOrder[K],
    args?: Record<string, any>,
    onFinish?: () => void,
    refresh = true,
    onSet?: () => void | null,
  ) {
    const setExec = (action: string, additionalArgs: {}, onSet?: () => void) => {
      this.exec({
        prev: (
          {
            s: this.type,
            c: this.chordsi,
            t: this.texti,
            o: this.isOpened,
            r: this.repeats,
            v: this.isVisible ? 1 : 0,
            e: this.isEmptyHeader,
          } as never
        )[fieldn],
        value,
        uniq: this.me.viewIndex,
        method: 'set',
        action,
        onSet,
        args: mylib.overlap({ fieldn }, args, additionalArgs),
      });
    };

    if (this.me.isAnchorInherit) {
      const wid = this.me.leadOrd?.wid;

      setExec('setAnchorInheritValue', { inhIndex: this.me.anchorInheritIndex, wid, value }, onSet);
    } else {
      const action = (
        {
          s: 'comSetOrderType',
          c: 'comSetOrderStringBlock',
          t: 'comSetOrderStringBlock',
          o: 'comSetOrderOpenedBlock',
          r: 'comSetOrderRepeatBlock',
          v: 'comSetOrderVisibleSign',
          e: 'comSetOrderEmptiedVal',
        } as Record<keyof Partial<IExportableOrder>, string>
      )[fieldn];

      setExec(action, { value: value ?? null }, onSet);
    }

    if (this.me.source) {
      const inhFieldn = fieldn as keyof InheritancableOrder;

      if (this.me.isAnchorInherit) {
        const src = this.me.leadOrd?.me.source;
        if (src && !src.top.inh) src.top.inh = {} as never;
        const inh = src?.top.inh;

        if (inh && this.me.anchorInheritIndex != null) {
          if (!inh[inhFieldn]) inh[inhFieldn] = {};
          const inhScope = inh[inhFieldn];
          if (inhScope) inhScope[this.me.anchorInheritIndex] = value as never;
        }
      } else this.me.source.top[inhFieldn] = value as never;
      this.setExportable(inhFieldn, value as never);
    }

    if (refresh) {
      this.com.afterOrderChange();
      onFinish?.();
    }
  }

  setRepeats(_val?: OrderRepeats | null) {}

  get fieldValues() {
    return this.getBasicOr('f', {});
  }
  set fieldValues(val) {
    this.setExportable('f', val);
  }

  setFieldValue<Key extends keyof IExportableOrderFieldValues>(fieldn: Key, value: IExportableOrderFieldValues[Key]) {
    this.exec({
      prev: this.fieldValues[fieldn],
      value,
      method: 'set',
      action: 'comSetOrderFieldValue',
      args: {
        value,
        fieldn,
      },
    });

    this.fieldValues[fieldn] = value;
  }

  scope(action: string, uniq?: FreeExecDictUniq, wid?: number | null) {
    return [
      this.com.scope(),
      '->',
      mylib.def(wid, this.wid),
      '.',
      mylib.typ('[action]', action),
      ':',
      ([] as (string | number)[]).concat(mylib.def(uniq, '[uniq]') || []).join(','),
    ].join('');
  }

  isWithHead() {
    return (
      !this.me.isInherit &&
      !this.me.isAnchorInheritPlus &&
      (this.texti != null || this.chordsi != null) &&
      !this.isEmptyHeader
    );
  }

  exec<Value>(bag: FreeExecDict<Value>) {
    const { scope, args: { wid } = {} } = bag;

    cmExer.set({
      ...bag,
      scope: this.scope(bag.action, bag.uniq, wid),
      args: {
        ordw: mylib.def(wid, this.wid),
        comw: this.com.wid,
        name: this.com.name,
        blockn: this.me.header(null, true),
        isAnchor: this.isAnchor,
        ...bag.args,
      },
      generalId: this.com.wid,
      ...(scope ? { scope } : null),
    });
  }

  isInheritValue<Key extends keyof InheritancableOrder>(key: Key) {
    return this.me.isAnchorInherit
      ? this.me.anchorInheritIndex != null &&
          this.me.leadOrd?.me.source?.top.inh?.[key]?.[this.me.anchorInheritIndex] == null
      : this.me.isAnchor && this.me.source?.top[key] == null;
  }

  async setChordPosition(linei: number, pos: number) {
    const prev = [...(this.positions?.[linei] || [])].sort((a: number, b: number) => a - b);
    const line = this.positions?.[linei] || [];
    const posi = line.indexOf(pos);
    const textLines = (this.text || '').split('\n');
    const textLine = textLines[linei];
    const lineSplitted = textLine.split('');
    const vowels = this.com.getVowelPositions(textLine);

    posi < 0 ? line.push(pos) : line.splice(posi, 1);

    const positions = line.sort((a, b) => a - b);
    if (this.positions) this.positions[linei] = positions;

    positions.forEach(pos => {
      const vowel = lineSplitted[vowels[pos]];

      if (vowel && vowel.length === 1) lineSplitted[vowels[pos]] = `[${vowel}]`;
    });

    prev.concat(positions).forEach((pos: number) => {
      const vowel = lineSplitted[vowels[pos]];
      if (!vowel || vowel.length !== 1) return;

      const inPos = positions.indexOf(pos) > -1;
      const inPrev = prev.indexOf(pos) > -1;
      const [lbr, rbr] = inPos && inPrev ? ['[', ']'] : !inPrev && inPos ? ['{', '}'] : ['<', '>'];

      lineSplitted[vowels[pos]] = lbr + vowel + rbr;
    });

    const preInPos = line.indexOf(-1) > -1;
    const preInPrev = prev.indexOf(-1) > -1;
    const postInPos = line.indexOf(-2) > -1;
    const postInPrev = prev.indexOf(-2) > -1;
    const preLabel =
      preInPos && preInPrev ? ['●'] : preInPos && !preInPrev ? ['★'] : !preInPos && preInPrev ? ['☆'] : [];
    const postLabel =
      postInPos && postInPrev ? ['●'] : postInPos && !postInPrev ? ['★'] : !postInPos && postInPrev ? ['☆'] : [];

    const lineChangesText = preLabel.concat(lineSplitted).concat(postLabel).join('');

    return cmComOrderClientInvocatorMethods.setPositionsLine(
      null,
      this.com.wid,
      this.me.header(),
      this.getTargetFirst('w'),
      linei,
      line,
      lineChangesText,
    );
  }

  cutChordPositions(line: string, linei: number) {
    const letters = this.com.getVowelPositions(line);

    this.positions?.[linei]?.reduceRight((stub, pos) => {
      if (pos > letters.length - 1) {
        this.setChordPosition(linei, pos);
      }
      return stub;
    }, 0);
  }

  removeInheritance<Key extends keyof IExportableOrder>(key: Key) {
    this.setField(key, null);
  }
}
