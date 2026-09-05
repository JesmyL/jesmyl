import {
  bibleBroadcastListSetSingleAddress,
  useBibleBroadcastListFaceClickListener,
} from '$bible/entities/broadcast-list';
import {
  takeJoinedAddressMaxValues,
  useBibleAddressBooki,
  useBibleAddressChapteri,
  useBibleAddressVersei,
} from '$bible/shared/hooks';
import { BibleBroadcastAddress, BibleBroadcastJoinAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastCurrentListLengthAtom,
  bibleBroadcastCurrentSelectedIndexAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '$bible/shared/state';
import { bibleJoinAddressAtom, biblePlanCurrentItemiAtom } from '$bible/shared/state/atoms';
import { itNumSort } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { forEachObjectEntries, objectLength } from 'shared/utils/object.utils';
import { bibleBroadcastArchiveStopClassName } from '../const/common';

const modifyKeyPrefix = 'Shift';
const modifyKey: `${Lowercase<typeof modifyKeyPrefix>}Key` = 'shiftKey';
const deleteKeyPrefix = 'Alt';
const deleteKey: `${Lowercase<typeof deleteKeyPrefix>}Key` = 'altKey';

export const useBibleBroadcastArchiveListFaceClickListener = (
  scope: BibleBroadcastKeyListenScope,
  list: nil | BibleBroadcastAddress[],
) => {
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const currentVersei = useBibleAddressVersei();
  const defaultJoin: BibleBroadcastJoinAddress = { [currentBooki]: { [currentChapteri]: [currentVersei] } };

  const listRef = useBibleBroadcastListFaceClickListener(
    'data-archive-itemi',
    bibleBroadcastArchiveStopClassName,
    (itemi, event) => {
      const item = list?.[itemi];
      if (!item) return;

      bibleBroadcastKeyListenScopeAtom.set(scope);
      bibleBroadcastCurrentListLengthAtom.set(() => list.length);
      biblePlanCurrentItemiAtom.set(itemi);
      bibleBroadcastCurrentSelectedIndexAtom.set(itemi);

      if (checkIsArray(item)) {
        bibleBroadcastListSetSingleAddress(...item);

        if (event[modifyKey]) {
          bibleJoinAddressAtom.do.update(draft => {
            const [booki, chapteri, versei] = item;
            const verses = (((draft[0] ??= defaultJoin)[booki] ??= {})[chapteri] ??= []);

            draft[0][booki][chapteri] = event[deleteKey]
              ? verses.filter(it => it !== versei)
              : Array.from(new Set(verses.concat(versei))).sort(itNumSort);
          });
        } else bibleJoinAddressAtom.reset();
      } else {
        bibleBroadcastListSetSingleAddress(...takeJoinedAddressMaxValues(item));

        if (event[modifyKey]) {
          bibleJoinAddressAtom.do.update(draft => {
            forEachObjectEntries(item, (booki, chapter) => {
              forEachObjectEntries(chapter, (chapteri, addVerses) => {
                if (!addVerses) return;

                const verses = (((draft[0] ??= defaultJoin)[booki] ??= {})[chapteri] ??= []);

                if (event[deleteKey]) {
                  const addsSet = new Set(addVerses);
                  const newVerses = (draft[0][booki][chapteri] = verses.filter(it => !addsSet.has(it)));

                  if (!newVerses.length) delete draft[0][booki][chapteri];
                  if (!objectLength(draft[0][booki])) delete draft[0][booki];
                } else {
                  draft[0][booki][chapteri] = Array.from(new Set(verses.concat(addVerses))).sort(itNumSort);
                }
              });
            });
          });
        } else bibleJoinAddressAtom.set([item]);
      }
    },
  );

  return { modifyKeyPrefix, listRef, deleteKeyPrefix };
};
