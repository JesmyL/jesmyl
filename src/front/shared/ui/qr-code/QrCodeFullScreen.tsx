import { CopyTextButton } from '../CopyTextButton';
import { FullContent } from '../fullscreen-content/FullContent';
import { QRCode } from './QRCode';

interface Props {
  text: string;
  onClose: (isOpen: false) => void;
  copyText?: string;
}

export const QrCodeFullScreen = ({ text, onClose, copyText }: Props) => {
  return (
    <FullContent
      onClose={onClose}
      closable
      containerClassName="flex center column flex-gap full-size"
    >
      <QRCode
        text={text}
        className="full-width full-max-height"
      />
      <CopyTextButton text={copyText ?? text} />
    </FullContent>
  );
};
