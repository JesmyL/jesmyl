import { QrCodeFullScreen } from 'front/complect/qr-code/QrCodeFullScreen';
import { IconQrCodeStrokeRounded } from 'front/complect/the-icon/icons/qr-code';
import { cmAppActions } from 'front/components/apps/cm/app-actions/cm-app-actions';
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
        Icon={IconQrCodeStrokeRounded}
        onClick={event => {
          event.stopPropagation();
          setIsOpenQr(true);
        }}
      />
    </>
  );
};