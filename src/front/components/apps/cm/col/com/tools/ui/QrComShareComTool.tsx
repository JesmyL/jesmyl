import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/app-actions/cm-app-actions';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useComNumbers } from '$cm/basis/lib/useComNumbers';
import { useState } from 'react';
import { CmComWid } from 'shared/api';
import { itNIt } from 'shared/utils';
import { ComTool } from '../ComTool';

export const QrComShareComTool = () => {
  const ccom = useCcom();
  const [isOpenQr, setIsOpenQr] = useState(false);
  const comw = ccom?.wid ?? CmComWid.def;
  const comNumber = useComNumbers(comw)[comw];

  if (!ccom) return;
  const link = cmAppActions.makeLink({ comw: ccom?.wid });

  return (
    <>
      <ComTool
        title="Поделиться по QR"
        icon="QrCode"
        onClick={() => setIsOpenQr(itNIt)}
      />
      {isOpenQr && (
        <QrCodeFullScreen
          onClose={setIsOpenQr}
          text={link}
          copyText={`${link} - ${comNumber == null ? '' : `${comNumber}. `}${ccom.name}`}
        />
      )}
    </>
  );
};
