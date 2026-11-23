import { Atom } from 'atomaric';
import { CopyTextButton } from '../CopyTextButton';
import { FullContent } from '../fullscreen-content/FullContent';
import { QRCode } from './QRCode';

interface Props {
  text: string;
  openAtom: Atom<boolean>;
  copyText?: string;
  isRenderHere?: boolean;
}

export const QrCodeFullScreen = ({ text, copyText, openAtom, isRenderHere }: Props) => {
  return (
    <FullContent
      closable
      openAtom={openAtom}
      isRenderHere={isRenderHere}
      containerClassName="p-0 flex center column gap-2 full-size"
    >
      <QRCode
        text={text}
        className="w-full max-h-full"
      />
      <CopyTextButton text={copyText ?? text} />
    </FullContent>
  );
};
