import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { FileInput } from '#shared/ui/FileInput';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { Atom } from 'atomaric';
import { BarcodeDetector } from 'barcode-detector/ponyfill';
import { useEffect, useRef, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { FullContent } from '../fullscreen-content/FullContent';

type Props = OmitOwn<Parameters<typeof Scanner>[0], 'onScan'> & {
  facingMode?: 'user' | 'environment';
  onReadData: (firstText: string, resultx: IDetectedBarcode[]) => void;
  openAtom: Atom<boolean>;
};

const qrRepeatReadDelay = 1500;
const qrPreferredVideoSize = { ideal: 1280 } as const;

export const QrReader = ({ facingMode = 'environment', onReadData, openAtom, ...props }: Props) => {
  const [isCameraFailed, setIsCameraFailed] = useState(false);
  const lastReadRef = useRef<{ value: string; at: number } | nil>(null);
  const isCameraUnavailable = !window.isSecureContext || navigator.mediaDevices?.getUserMedia == null;

  const readData = (value: string, resultx: IDetectedBarcode[]) => {
    const now = Date.now();
    const lastRead = lastReadRef.current;
    if (lastRead?.value === value && now - lastRead.at < qrRepeatReadDelay) return;

    lastReadRef.current = { value, at: now };
    onReadData(value, resultx);
  };

  const readPhoto = async ([file]: File[]) => {
    if (file == null) return;

    try {
      const detector = new BarcodeDetector({ formats: props.formats ?? ['qr_code'] });
      const image = await createImageBitmap(file);

      try {
        const codes = await detector.detect(image);
        const firstCode = codes[0];
        if (firstCode != null) readData(firstCode.rawValue, codes);
      } finally {
        image.close();
      }
    } catch (_e) {
      //
    }
  };

  useEffect(() => () => openAtom.reset(), [openAtom]);

  return (
    <FullContent
      openAtom={openAtom}
      containerClassName="p-0"
      className="z-80"
      closable
    >
      <div className="bg-x1 flex center full-size">
        {isCameraUnavailable || isCameraFailed ? (
          <FileInput
            accept="image/*"
            capture="environment"
            onFilesSelect={readPhoto}
            renderTrigger={({ fileInputRef }) => (
              <Button
                icon="Camera01"
                aria-label={translateBase(BaseLocaleKey.ReadQR)}
                onClick={() => fileInputRef.current?.click()}
              />
            )}
          />
        ) : (
          <Scanner
            sound={false}
            {...props}
            onScan={result => {
              const firstResult = result[0];
              if (firstResult == null) return;

              readData(firstResult.rawValue, result);
            }}
            onError={error => {
              setIsCameraFailed(true);
              props.onError?.(error);
            }}
            constraints={{
              width: { ideal: qrPreferredVideoSize.ideal },
              height: { ideal: 720 },
              ...props.constraints,
              facingMode: { ideal: facingMode },
            }}
          />
        )}
      </div>
    </FullContent>
  );
};
