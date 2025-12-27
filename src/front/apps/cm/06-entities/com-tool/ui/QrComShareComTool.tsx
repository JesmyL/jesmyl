import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { useCmComCurrent } from '$cm/entities/com';
import { cmAppActions } from '$cm/shared/const';
import { useComNumber } from '$cm/shared/lib';
import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { CmComTool } from '../ComTool';

const isOpenQrAtom = atom(false);

export const CmComToolQrComShare = () => {
  const ccom = useCmComCurrent();
  const comw = ccom?.wid ?? CmComWid.def;
  const comNumber = useComNumber(comw);

  if (!ccom) return;
  const link = cmAppActions.makeLink({ comw: ccom?.wid });

  return (
    <>
      <CmComTool
        title="Поделиться по QR"
        icon="QrCode"
        onClick={isOpenQrAtom.do.toggle}
      />

      <QrCodeFullScreen
        openAtom={isOpenQrAtom}
        text={link}
        copyText={`${link} - ${comNumber == null ? '' : `${comNumber}. `}${ccom.name}`}
      />
    </>
  );
};
