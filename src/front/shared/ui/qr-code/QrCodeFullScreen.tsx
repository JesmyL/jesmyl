import { CopyTextButton } from '../CopyTextButton';
import { FullContent } from '../fullscreen-content/FullContent';
import { QRCode } from './QRCode';

interface Props {
  text: string;
  onClose: (isOpen: false) => void;
  copyText?: string;
  isAsRootAnchor?: boolean;
}

export const QrCodeFullScreen = ({ text, onClose, copyText, isAsRootAnchor }: Props) => {
  const renderNode = () => (
    <>
      <QRCode
        text={text}
        className="full-width full-max-height"
      />
      <CopyTextButton text={copyText ?? text} />
    </>
  );

  return (
    <FullContent
      onClose={onClose}
      closable
      containerClassName="flex center column flex-gap full-size"
      asRootAnchor={isAsRootAnchor ? renderNode : undefined}
    >
      {isAsRootAnchor || renderNode()}
    </FullContent>
  );
};
