import CopyTextButton from '../CopyTextButton';
import { FullContent } from '../fullscreen-content/FullContent';
import QRCode from './QRCode';

export const QrCodeFullScreen = ({ text, onClose }: { text: string; onClose: (isOpen: false) => void }) => {
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
      <CopyTextButton text={text} />
    </FullContent>
  );
};
