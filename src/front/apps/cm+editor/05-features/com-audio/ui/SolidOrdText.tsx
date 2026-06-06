import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import { CmComOrderLine, TheCmComOrderSolid } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { CmComAudioMarkPackTime, CmComAudioMarkSelector, HttpNumLeadLink } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { makeCmComAudioMarkTitleAsLineSelector } from 'shared/const/cm/order/makeCmComAudioMarkTitleBySelector';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { retNull } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

interface Props {
  com: CmCom;
  ord: CmComOrder;
  selector: CmComAudioMarkSelector | nil;
  time: CmComAudioMarkPackTime;
  src: HttpNumLeadLink;
}

export const CmEditorComAudioSolidOrdTextController = ({ com, ord, selector, src, time }: Props) => {
  const marksEditPack = useAtomValue(cmComEditorAudioMarksEditPacksAtom)[src]?.[com.wid];

  return (
    <TheCmComOrderSolid
      chordVisibleVariant={ChordVisibleVariant.None}
      com={com}
      ord={ord}
      ordi={0}
      asHeaderNode={retNull}
      chordHardLevel={3}
      asLineNode={
        mylib.isStr(selector)
          ? props => {
              const lineSelector = makeCmComAudioMarkTitleAsLineSelector(props.solidLinei);

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
