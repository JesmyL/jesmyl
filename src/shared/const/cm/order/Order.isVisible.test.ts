import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { IExportableCom, IExportableComInterpretation, Langi } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrders } from 'shared/const/cm/Com/parents/20-Orders';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { Bool } from 'shared/enums';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { checkIsNil } from 'shared/utils/checkIs';
import { comBlockKinds } from 'shared/values/cm/block-kinds/BlockKind';

const localeStub = {
  [DynLocaleKey.CmComKind]: Object.fromEntries(comBlockKinds.kinds.map(({ key }) => [key, 'Блок'])),
} as LocaleDynamic<Langi>;

CmComOrders.getLangLocales = () => localeStub;

const fileUrl = import.meta.url;
const caseDir = fileURLToPath(new URL('../../../../back/apps/cm/coms/+case', fileUrl));
const coms: CmCom[] = [];
const ords: CmComOrder[] = [];

const inhiOf = (ord: CmComOrder) => ord.me.anchorInheritIndex || 0;
const leadV = (ord: CmComOrder) =>
  ord.me.isAnchorInherit ? ord.me.leadOrd?.me.source?.top._v?.[inhiOf(ord)] : null;
const watchV = (ord: CmComOrder) =>
  ord.me.isAnchorInherit
    ? (ord.me.watchOrd?.me.source?.top._v?.[inhiOf(ord)] ?? ord.me.watchOrd?.top.v)
    : null;
const chainV = (ord: CmComOrder) =>
  ord.com.intp?.o?.[ord.wid]?.v ??
  (ord.me.isAnchorInherit ? null : ord.me.source?.top.v ?? ord.top.v) ??
  leadV(ord) ??
  watchV(ord) ??
  ord.me.targetOrd?.top.v;
const isPlain = (ord: CmComOrder) => !ord.me.isAnchorInherit && ord.wid === ord.top.w;
const freshVisible = (ord: CmComOrder, v: Bool) =>
  new CmCom(ord.com.top, null, { o: { [ord.wid]: { v } } } as IExportableComInterpretation, Bool.False).orders?.find(
    item => item.wid === ord.wid,
  )?.isVisible;

beforeAll(() => {
  for (const file of readdirSync(caseDir).filter(name => name.endsWith('.json'))) {
    try {
      const top = JSON.parse(readFileSync(`${caseDir}/${file}`, 'utf8')) as IExportableCom;
      const com = new CmCom(top, null, null, Bool.False);

      coms.push(com);
      if (com.orders) ords.push(...com.orders);
    } catch (error) {
      throw `${file}: ${String(error)}`;
    }
  }
}, 30_000);

describe('CmComOrder.isVisible', () => {
  it('sweep', () => {
    const buckets: Record<string, number> = {};
    const bump = (name: string, on: boolean) => {
      if (on) buckets[name] = (buckets[name] ?? 0) + 1;
    };

    coms.forEach(com => {
      com.orders?.forEach(ord => {
        const v = chainV(ord);
        const expected = checkIsNil(v) ? !(ord.me.leadOrd && !ord.me.leadOrd.isVisible) : v !== 0;
        const message = `${com.top.n} ord ${ord.wid}`;
        expect(ord.isVisible, message).toBe(expected);

        if (checkIsNil(v)) {
          if (ord.me.leadOrd) expect(ord.isVisible, `${message}: lead-follow`).toBe(ord.me.leadOrd.isVisible);
          else expect(ord.isVisible, `${message}: plain default`).toBe(true);
        }

        const inhi = inhiOf(ord);
        bump('isAnchor', !!ord.me.isAnchor);
        bump('isInherit', !!ord.me.isInherit);
        bump('isAnchorInherit', !!ord.me.isAnchorInherit);
        bump('isAnchorInheritPlus', !!ord.me.isAnchorInheritPlus);
        bump('topV', ord.top.v != null);
        bump('leadV', !!ord.me.isAnchorInherit && ord.me.leadOrd?.me.source?.top._v?.[inhi] != null);
        bump('watchVInhi', !!ord.me.isAnchorInherit && ord.me.watchOrd?.me.source?.top._v?.[inhi] != null);
        bump('watchVTop', !!ord.me.isAnchorInherit && ord.me.watchOrd?.top.v != null);
        bump('targetV', ord.me.targetOrd?.top.v != null);
        bump('plainV0', isPlain(ord) && ord.top.v === 0);
        bump('plainV1', isPlain(ord) && ord.top.v === 1);
        bump('leadFollowDefault', !!ord.me.leadOrd && checkIsNil(v));
        bump('plainDefault', !ord.me.leadOrd && checkIsNil(v));
      });
    });

    const required = [
      'isAnchor',
      'isInherit',
      'isAnchorInherit',
      'topV',
      'leadV',
      'leadFollowDefault',
      'plainDefault',
      'targetV',
      'watchVTop',
      'plainV0',
      'plainV1',
      'isAnchorInheritPlus',
    ];
    const emptyRequired = required.filter(name => !buckets[name]);
    expect(emptyRequired, 'в корпусе пропали варианты: ' + emptyRequired.join(', ')).toEqual([]);
  });

  it('com.intp participates in visibility', () => {
    const allNilOrd = ords.find(ord => isPlain(ord) && checkIsNil(chainV(ord)));
    if (!allNilOrd) throw 'нет ord с полностью пустой цепочкой';

    expect(freshVisible(allNilOrd, Bool.True)).toBe(true);
    expect(freshVisible(allNilOrd, Bool.False)).toBe(false);

    const zeroOrd = ords.find(ord => isPlain(ord) && ord.top.v === 0);
    const oneOrd = ords.find(ord => isPlain(ord) && ord.top.v === 1);
    if (!zeroOrd || !oneOrd) throw 'в корпусе пропали plain v=0/v=1';
    expect(freshVisible(zeroOrd, Bool.True)).toBe(true);
    expect(freshVisible(oneOrd, Bool.False)).toBe(false);
  });
});
