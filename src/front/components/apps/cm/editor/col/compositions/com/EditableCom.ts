import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator-editor.methods';
import { mylib } from 'front/utils';
import { makeRegExp } from 'shared/utils';
import { chordDiezEquivalent, gSimpleBemoleChordReg } from '../../../../col/com/Com.complect';
import { IExportableOrderMe } from '../../../../col/com/order/Order.model';
import { EditableOrder } from '../complect/orders/EditableOrder';
import { EditableComCutBlock } from './complect/40-CutBlock';

export class EditableCom extends EditableComCutBlock {
  orderConstructor(me: IExportableOrderMe) {
    return new EditableOrder(me, this);
  }

  get name() {
    return this.col?.getBasic('n') || '';
  }
  set name(value) {
    this.col.setExportable('n', value);
  }

  scope(action?: string, uniq?: string | number) {
    return [this.wid, '.', mylib.typ('[action]', action), ':', [].concat(mylib.def(uniq, ['[uniq]'])).join(',')].join(
      '',
    );
  }

  switchLang() {
    const prev = this.langi;
    const value = (this.langi = this.langi ? 0 : 1);

    this.exec({
      action: 'comSetLangi',
      prev,
      method: 'set',
      value,
      uniq: this.wid,
      args: {
        value,
      },
    });
  }

  comeBack() {
    this.col.comeBackCol('com');
  }

  replaceBemoles(coli: number) {
    if (this.chords === undefined) return;

    const col = this.chords[coli];
    if (!col) return;

    const val = col.replace(gSimpleBemoleChordReg, chord => chordDiezEquivalent[chord] || chord);

    cmComClientInvocatorMethods.changeChordBlock(null, coli, this.wid, val);
  }

  setTransPosition(value: number | und) {
    this.exec({
      prev: this.transPosition,
      value,
      method: 'set',
      action: 'comSetTransPosition',
      args: {
        value,
      },
    });

    this.transPosition = value;

    this.resetChordLabels();
  }

  getRegionNextLetter() {
    const chars = this.orders
      ?.map(ord => Object.keys(ord.repeats || {}).map(key => (key.match(makeRegExp('/[a-z]/i')) || [])[0]))
      .flat()
      .filter(s => s)
      .map(letter => letter?.charCodeAt(0));

    const next =
      chars &&
      '.'
        .repeat(26)
        .split('')
        .map((_, ci) => 97 + ci)
        .find(num => chars.indexOf(num) < 0);

    return next && String.fromCharCode(next);
  }

  setTranslationPushKind(value: number) {
    this.exec({
      action: 'comSetTranslationPushKind',
      method: 'set',
      prev: this.translationPushKind,
      value,
      args: { value },
    });

    this.translationPushKind = value;
  }

  setAudio(val: string) {
    const prev = this.audio.trim();
    const value = val.trim().replace(makeRegExp('/\\n{2,}/'), '\n');
    this.exec({
      action: 'comSetAudio',
      method: 'set',
      prev,
      value,
      args: {
        prev,
        value,
        comw: this.wid,
        name: this.name,
      },
    });
  }
}
