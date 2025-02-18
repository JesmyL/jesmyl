import { QrCodeFullScreen } from '#entities/qr-code/QrCodeFullScreen';
import { cmAppActions } from '../../../../../07-basis/lib/consts/cm/link-actions';
import { Com } from '../../col/com/Com';

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
