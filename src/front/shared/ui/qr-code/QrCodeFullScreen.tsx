import { Atom } from 'atomaric';
import { CopyTextButton } from '../CopyTextButton';
import { FullContent } from '../fullscreen-content/FullContent';
import { QRCode } from './QRCode';

interface Props {
  text: string;
  openAtom: Atom<boolean>;
  copyText?: string;
}

export const QrCodeFullScreen = ({ text, copyText, openAtom }: Props) => {
  return (
    <FullContent
      closable
      openAtom={openAtom}
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
