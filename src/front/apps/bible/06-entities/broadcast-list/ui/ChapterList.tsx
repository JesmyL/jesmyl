import { bibleAddressWithForceJoinReset, takeBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { takeBibleTranslateBookSizesAtom } from '$bible/shared/lib/takeBibleTranslateBookSizesAtom';
import { bibleBookiAtom, bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { checkIsNil } from 'shared/utils/checkIs';
import { arrayByLength } from 'shared/utils/object.utils';
import { twJoin } from 'tailwind-merge';
import { bibleBroadcastListSetSingleAddress } from '../lib/hooks';
import { useBibleBroadcastListFaceClickListener } from '../lib/useBibleListFaceClickListener';

const faceClassName = 'bible-list-chapter-face';

export function BibleBroadcastListChapters() {
  const showTranslates = useBibleShowTranslatesValue();
  const currentBooki = useAtomValue(bibleBookiAtom);
  const sizes = useAtomValue(takeBibleTranslateBookSizesAtom(showTranslates[0]));

  const listRef = useBibleBroadcastListFaceClickListener('data-chapteri', faceClassName, (chapteri, event) => {
    if (event.ctrlKey) {
      if (checkIsNil(bibleJoinAddressAtom.get()[0])) {
        const [booki, chapteri, versei] = takeBibleSimpleCheckedSingleAddress(null, null, null, null);
        bibleJoinAddressAtom.set([{ [booki]: { [chapteri]: [versei] } }]);
      }
    } else bibleAddressWithForceJoinReset(null, chapteri);
    bibleBroadcastListSetSingleAddress(null, chapteri);
  });

  return (
    <div
      ref={listRef}
      className="w-[2.5em] min-w-[2.5em] overflow-y-auto overflow-x-hidden"
      title="Ctrl - добавить из главы"
    >
      {arrayByLength(sizes[currentBooki]?.length ?? 20, chapteri => {
        return (
          <div
            key={chapteri}
            data-chapteri={chapteri}
            className={twJoin('bible-list-face pointer', faceClassName)}
          >
            {chapteri + 1}
          </div>
        );
      })}
    </div>
  );
}
