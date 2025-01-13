import { useEffect } from 'react';
import { useExerExec } from '../../../../../../../../complect/exer/hooks/useExer';
import IconButton from '../../../../../../../../complect/the-icon/IconButton';
import { IconScissor01StrokeRounded } from '../../../../../../../../complect/the-icon/icons/scissor-01';
import { ChordVisibleVariant } from '../../../../../Cm.model';
import TheOrder from '../../../../../col/com/order/TheOrder';
import { EditableCom } from '../../com/EditableCom';

export const CutTextRedactor = ({ ccom, texti, text }: { ccom: EditableCom; texti: number; text: string }) => {
  const preparedCutBlock = ccom.prepareCutBlock(texti);
  const exec = useExerExec();

  useEffect(() => {
    setTimeout(exec, 500);
  }, [exec, text]);

  return (
    preparedCutBlock && (
      <>
        <IconButton
          Icon={IconScissor01StrokeRounded}
          disabled={preparedCutBlock.disabled}
          disabledReason={() => preparedCutBlock.disabledReason}
          className="color--ok margin-gap"
          onClick={() => exec(ccom.cutBlock(texti, preparedCutBlock.ords))}
          postfix="Разделить текст"
        />
        {preparedCutBlock.ords.map((ord, ordi) => (
          <TheOrder
            key={ordi}
            com={ccom}
            isHideRepeats
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            orderUnit={ord}
            orderUniti={ordi}
          />
        ))}
      </>
    )
  );
};
