import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import {
  ChordVisibleVariant,
  CmCom,
  CmComOrder,
  CmComOrderLine,
  makeCmComAudioMarkTitleAsLineSelector,
  TheCmComOrderSolid,
} from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';

interface Props {
  com: CmCom;
  ord: CmComOrder;
  selector: CmComAudioMarkSelector | nil;
  time: CmComAudioMarkPackTime;
  src: HttpLink;
}

export const CmEditorComAudioSolidOrdTextController = ({ com, ord, selector, src, time }: Props) => {
  const marksEditPack = useAtomValue(cmComEditorAudioMarksEditPacksAtom)[src]?.[com.wid];

  return (
    <TheCmComOrderSolid
      chordVisibleVariant={ChordVisibleVariant.None}
      com={com}
      ord={ord}
      ordi={0}
      asHeaderComponent={() => null}
      asLineComponent={
        mylib.isStr(selector)
          ? props => {
              const lineSelector = makeCmComAudioMarkTitleAsLineSelector(props.solidTextLinei);

              return (
                <div className={twMerge('flex gap-3 my-2', selector === lineSelector ? 'text-x7' : '')}>
                  <Button
                    icon="PinLocation01"
                    isLoading={marksEditPack?.[time] === lineSelector}
                    disabled={selector === lineSelector}
                    onClick={() => cmComEditorAudioMarksEditPacksAtom.do.renameMark(com.wid, src, time, lineSelector)}
                  />
                  <CmComOrderLine {...props} />
                </div>
              );
            }
          : undefined
      }
    />
  );
};
