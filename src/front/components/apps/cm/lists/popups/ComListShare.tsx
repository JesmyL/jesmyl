import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/app-actions/cm-app-actions';
import { Com } from '$cm/col/com/Com';

export const ComListQrShare = ({ onClose, coms }: { onClose: (isOpen: false) => void; coms: Com[] }) => {
  const comwListLink = cmAppActions.makeLink({ comws: coms.map(com => com.wid) });

  return (
    <QrCodeFullScreen
      onClose={onClose}
      text={comwListLink}
      copyText={`${comwListLink}\n\n${coms.map(com => com.name).join('\n')}`}
    />
  );
};
