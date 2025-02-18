import { cmAppActions } from '#basis/lib/consts/cm/link-actions';
import { QrCodeFullScreen } from '#entities/qr-code/QrCodeFullScreen';
import { useState } from 'react';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../useMigratableComTools';

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
        />
      )}
      <ComTool
        title="Поделиться по QR"
        icon="QrCode"
        onClick={event => {
          event.stopPropagation();
          setIsOpenQr(true);
        }}
      />
    </>
  );
};
