import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { Atom } from 'atomaric';
import { FullContent } from '../fullscreen-content/FullContent';

type Props = OmitOwn<Parameters<typeof Scanner>[0], 'onScan'> & {
  facingMode?: 'user' | 'environment';
  onReadData: (firstText: string, resultx: IDetectedBarcode[]) => void;
  openAtom: Atom<boolean>;
};

export const QrReader = ({ facingMode = 'environment', onReadData, openAtom, ...props }: Props) => {
  return (
    <FullContent
      openAtom={openAtom}
      containerClassName="p-0"
      closable
    >
      <div className="bg-x1 flex center full-size">
        <Scanner
          sound={false}
          onScan={result => {
            if (result?.[0] == null) return;
            onReadData(result[0].rawValue, result);
          }}
          {...props}
          constraints={{ ...props.constraints, facingMode }}
        />
      </div>
    </FullContent>
  );
};
