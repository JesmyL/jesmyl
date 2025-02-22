import { useActualRef } from '#shared/lib/hooks/useActualRef';
import QrScanner from 'qr-scanner';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FullContent } from '../fullscreen-content/FullContent';

interface Props {
  facingMode?: 'user' | 'environment';
  onReadData: (result: QrScanner.ScanResult) => void;
  onClose: (isOpen: false) => void;
}

export const QrReader = ({ facingMode = 'environment', onReadData, onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onReadDataRef = useActualRef(onReadData);

  useEffect(() => {
    if (videoRef.current === null) return;

    const qrScanner = new QrScanner(videoRef.current, onReadDataRef.current, {
      preferredCamera: facingMode,
    });
    qrScanner.start();

    qrScanner.setInversionMode('both');

    return () => {
      qrScanner.pause();
    };
  }, [facingMode, onReadDataRef]);

  return (
    <FullContent
      onClose={onClose}
      className=" "
      closable
    >
      <div className="bgcolor--1 flex center full-size">
        <StyledVideo ref={videoRef} />
      </div>
    </FullContent>
  );
};

const StyledVideo = styled.video`
  height: 100vmax;
`;
