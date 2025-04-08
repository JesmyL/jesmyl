import { atom } from '#shared/lib/atom';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/app-actions/cm-app-actions';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useComNumbers } from '$cm/basis/lib/useComNumbers';
import { CmComWid } from 'shared/api';
import { ComTool } from '../ComTool';

const isOpenQrAtom = atom(false);

export const QrComShareComTool = () => {
  const ccom = useCcom();
  const comw = ccom?.wid ?? CmComWid.def;
  const comNumber = useComNumbers(comw)[comw];

  if (!ccom) return;
  const link = cmAppActions.makeLink({ comw: ccom?.wid });

  return (
    <>
      <ComTool
        title="Поделиться по QR"
        icon="QrCode"
        onClick={isOpenQrAtom.toggle}
      />

      <QrCodeFullScreen
        openAtom={isOpenQrAtom}
        text={link}
        copyText={`${link} - ${comNumber == null ? '' : `${comNumber}. `}${ccom.name}`}
      />
    </>
  );
};
