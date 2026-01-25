import { cmIDB } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { atom } from 'atomaric';
import { CmComWid, MigratableComToolName, SokiAuthLogin } from 'shared/api';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';

export const cmComChordHardLevelAtom = atom<1 | 2 | 3>(2, 'cm:chord-hard-level');
export const cmComIsComMiniAnchorAtom = atom(false, 'cm:is-com-mini-anchor');
export const cmComIsShowCatBindsInCompositionAtom = atom(false);
export const cmComShareComCommentPropsAtom = atom<{ login: SokiAuthLogin; comw: CmComWid } | null>(null);

export const cmComChordVisibleVariantAtom = atom(ChordVisibleVariant.Maximal, 'cm:chordVisibleVariant');

export const cmComFavoriteComsAtom = atom<CmComWid[]>([], 'cm:favoriteComs');
export const cmComTopToolsAtom = atom<MigratableComToolName[]>(
  ['mark-com', 'fullscreen-mode', 'chords-variant'],
  'cm:comTopTools',
);

export const cmComFontSizeAtom = atom(14, 'cm:comFontSize');
export const cmComSpeedRollKfAtom = atom(10, 'cm:speedRollKf');
export const cmComIsAudioPlayerHiddenAtom = atom(false, 'cm:isAudioPlayerHidden');
export const cmComLaterComwListAtom = atom<CmComWid[]>([], 'cm:laterComwList');
export const cmComSelectedComwsAtom = atom<CmComWid[]>([], 'cm:selectedComws');
export const cmComLastOpenComwAtom = atom<CmComWid | und>(undefined, 'cm:lastOpenComw');

export const cmComWidNumberDictAtom = atom<PRecord<CmComWid, number>>({});

cmIDB.tb.coms
  .toCollection()
  .keys()
  .then(keys => {
    const comwNumberDict: PRecord<CmComWid, number> = {};
    const numberComwDict: PRecord<number, CmComWid> = {};

    keys.forEach((key, keyi) => {
      const comNumber = takeCorrectComNumber(keyi + 1);
      comwNumberDict[key as CmComWid] = comNumber;
      numberComwDict[comNumber] = key as CmComWid;
    });

    cmComWidNumberDictAtom.set(comwNumberDict);
  });
