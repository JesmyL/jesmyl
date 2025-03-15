import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/app-actions/cm-app-actions';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useState } from 'react';
import { itNIt } from 'shared/utils';
import { ComTool } from '../ComTool';

export const QrComShareComTool = () => {
  const ccom = useCcom();
  const [isOpenQr, setIsOpenQr] = useState(false);

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
          copyText={`${link} - ${ccom.name}`}
        />
      )}
    </>
  );
};
