import { renderHook } from '@testing-library/react';
import { configureAtomaric } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

const { useAudioTrackMarksMock } = vi.hoisted(() => ({ useAudioTrackMarksMock: vi.fn() }));

vi.mock('../state', () => ({ cmIDB: { useAudioTrackMarks: useAudioTrackMarksMock } }));

vi.mock('$cm/entities/broadcast', async () => {
  const { atom } = await import('atomaric');
  return { cmBroadcastCurrentNameSpaceiAtom: atom(0, 'broadcast:nameSpacei') };
});

import { cmBroadcastCurrentNameSpaceiAtom } from '$cm/entities/broadcast';
import { CmCom } from 'shared/const/cm/Com';
import { CmComOrders } from 'shared/const/cm/Com/parents/20-Orders';
import {
  CmComLineiZero,
  CmComMod,
  CmComNewlinerRepeatiZero,
  CmComNewlinerSamei,
  CmComNewlinerStrConfig,
  CmComOrderWid,
  CmComWid,
  Langi,
  parseCmAudioTail,
} from 'shared/api';
import { Bool } from 'shared/enums';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { TextCase } from 'shared/model/common';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { makeCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { makeCmComOrderRepeatedText } from 'shared/utils/cm/order';
import { useCmComAudioMarkSlides } from './useCmComAudioMarkSlides';

const localeStub = {
  [DynLocaleKey.CmComKind]: {
    [CmComBlockKindKey.Enter]: 'Вступление',
    [CmComBlockKindKey.One]: 'Куплет',
    [CmComBlockKindKey.Final]: 'Финал',
  },
} as LocaleDynamic<Langi>;

CmComOrders.getLangLocales = () => localeStub;

const comw = 1700000000001 as CmComWid;
const enterOrdw = 11 as CmComOrderWid;
const verseOrdw = 22 as CmComOrderWid;
const finalOrdw = 33 as CmComOrderWid;

const com = new CmCom(
  {
    w: comw,
    m: CmComMod.def,
    n: 'Тестовая композиция',
    l: Langi.Ru,
    t: ['Раз два три четыре'],
    c: [],
    o: [
      { w: enterOrdw, k: CmComBlockKindKey.Enter },
      { w: verseOrdw, k: CmComBlockKindKey.One, t: 0 },
      { w: finalOrdw, k: CmComBlockKindKey.Final },
    ],
    nl: [{ [verseOrdw]: '2' as CmComNewlinerStrConfig.whole }, { [verseOrdw]: '-23' as CmComNewlinerStrConfig.whole }],
  },
  null,
  null,
  Bool.False,
);

const src = parseCmAudioTail('a1b2c3d4e5f6');
if (!src) throw 'Не удалось распарсить хвост тестового аудио';

const verseSelector = makeCmBroadcastMonolineSlideOrdLineId(verseOrdw, CmComLineiZero, null, null);
const enteredSelector = makeCmBroadcastMonolineSlideOrdLineId(enterOrdw, CmComLineiZero, null, null);
const foreignVerseSelector = makeCmBroadcastMonolineSlideOrdLineId(
  verseOrdw,
  CmComLineiZero,
  CmComNewlinerRepeatiZero,
  1 as CmComNewlinerSamei,
);

const markPack = {
  [src]: {
    0: '',
    1000: 'Моя метка',
    2000: verseSelector,
    3000: foreignVerseSelector,
    4000: '-',
    5000: enteredSelector,
    6000: enteredSelector,
    7000: '',
  },
};

const mergedEnteredText = makeCmComOrderRepeatedText('Вступление', 2);
const mergedEnteredFadeText = makeCmComOrderRepeatedText('Вступление', 2, 1);

describe('useCmComAudioMarkSlides', () => {
  beforeEach(() => {
    cmBroadcastCurrentNameSpaceiAtom.set(0);
    useAudioTrackMarksMock.mockReset().mockReturnValue({ comw, marks: markPack, m: 0 });
  });

  const takeSlides = (nameSpaceiVariants?: number[]) =>
    renderHook(() => useCmComAudioMarkSlides(com, src, TextCase.AsIs, nameSpaceiVariants)).result.current;

  it('skips foreign razbivka marks and forms slides of the current namespace', () => {
    const { audioSlides, markTimes } = takeSlides();

    expect(markTimes).toEqual([0, 1000, 2000, 5000, 6000, 7000]);
    expect(audioSlides.map(({ text }) => text)).toEqual(
      ['Вступление', 'Моя метка', 'Раз\nдва три четыре', mergedEnteredText, mergedEnteredFadeText, 'Финал'],
    );
    expect(audioSlides.map(({ isChorded }) => isChorded)).toEqual([true, false, false, true, true, true]);
    expect(audioSlides.map(({ time }) => time)).toEqual(markTimes);
    expect(markTimes).not.toContain(3000);
    expect(audioSlides.some(({ text }) => text.includes('#'))).toBe(false);
    expect(audioSlides.at(2)?.slide?.id).toBe('w22l0');
  });

  it('resolves foreign razbivka marks when nameSpaceiVariants include their namespace', () => {
    const { audioSlides, markTimes } = takeSlides([1, 0]);

    expect(markTimes).toEqual([0, 1000, 2000, 3000, 5000, 6000, 7000]);
    expect(audioSlides.map(({ text }) => text)).toEqual(
      ['Вступление', 'Моя метка', 'Раз', 'два\nтри четыре', mergedEnteredText, mergedEnteredFadeText, 'Финал'],
    );
    expect(audioSlides.map(({ isChorded }) => isChorded)).toEqual([true, false, false, false, true, true, true]);
    expect(audioSlides.map(({ time }) => time)).toEqual(markTimes);
    expect(audioSlides.at(2)?.slide?.id).toBe('w22l0');
    expect(audioSlides.at(3)?.slide?.id).toBe('w22l0s1');
  });

  it('takes the namespace from the broadcast atom when no variants passed', () => {
    cmBroadcastCurrentNameSpaceiAtom.set(1);
    const { audioSlides, markTimes } = takeSlides();

    expect(markTimes).toEqual([0, 1000, 2000, 3000, 5000, 6000, 7000]);
    expect(audioSlides.map(({ text }) => text)).toEqual(
      ['Вступление', 'Моя метка', 'Раз', 'два\nтри четыре', mergedEnteredText, mergedEnteredFadeText, 'Финал'],
    );
    expect(audioSlides.map(({ time }) => time)).toEqual(markTimes);
  });
});
