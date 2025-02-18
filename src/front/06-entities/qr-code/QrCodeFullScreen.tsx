import { FullScreenContent } from '#shared/ui/fullscreen-content';
import CopyTextButton from 'front/08-shared/ui/CopyTextButton';
import QRCode from './QRCode';

interface Props {
  text: string;
  onClose: (isOpen: false) => void;
  copyText?: string;
}

export const QrCodeFullScreen = ({ text, onClose, copyText }: Props) => {
  return (
    <FullScreenContent
      onClose={onClose}
      closable
      containerClassName="flex center column flex-gap full-size"
    >
      <QRCode
        text={text}
        className="full-width full-max-height"
      />
      <CopyTextButton text={copyText ?? text} />
    </FullScreenContent>
  );
};
