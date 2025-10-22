import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { Atom } from 'atomaric';
import { FullContent } from '../fullscreen-content/FullContent';

interface Props {
  facingMode?: 'user' | 'environment';
  onReadData: (firstText: string, resultx: IDetectedBarcode[]) => void;
  openAtom: Atom<boolean>;
}

export const QrReader = ({ facingMode = 'environment', onReadData, openAtom }: Props) => {
  return (
    <FullContent
      openAtom={openAtom}
      className=" "
      closable
    >
      <div className="bg-x1 flex center full-size">
        <Scanner
          constraints={{ facingMode }}
          sound={false}
          onScan={result => {
            if (result?.[0] == null) return;
            onReadData(result[0].rawValue, result);
          }}
        />
      </div>
    </FullContent>
  );
};
