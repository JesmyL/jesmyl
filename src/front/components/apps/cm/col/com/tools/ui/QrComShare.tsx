import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '@cm/app-actions/cm-app-actions';
import { useState } from 'react';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../lib/useMigratableComTools';

export const QrComShare = () => {
  const ccom = useComToolsCcomContext();
  const [isOpenQr, setIsOpenQr] = useState(false);

  if (!ccom) return;
  const link = cmAppActions.makeLink({ comw: ccom?.wid });

  return (
    <>
      {isOpenQr && (
        <QrCodeFullScreen
          onClose={setIsOpenQr}
          text={link}
          copyText={`${link} - ${ccom.name}`}
          isAsRootAnchor
        />
      )}
      <ComTool
        title="Поделиться по QR"
        icon="QrCode"
        onClick={() => setIsOpenQr(true)}
      />
    </>
  );
};
