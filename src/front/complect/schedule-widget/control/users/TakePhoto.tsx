import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { defaultPreventer } from 'front/complect/utils/utils';
import { indexIDB } from 'front/components/index/db/index-idb';
import { useEffect, useRef, useState } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import { isNIs } from 'shared/utils';
import styled from 'styled-components';
import IconButton from '../../../the-icon/IconButton';
import { getScheduleWidgetUserPhotoStorageKey } from '../../storage';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetUserPhoto from './UserPhoto';

interface Props {
  user: IScheduleWidgetUser;
}

export default function ScheduleWidgetUserTakePhoto({ user }: Props) {
  const [isFullNodeOpen, setIsFullNodeOpen] = useState(false);

  return (
    <>
      {isFullNodeOpen && (
        <FullContent onClose={setIsFullNodeOpen}>
          <Camera
            close={() => setIsFullNodeOpen(false)}
            user={user}
          />
        </FullContent>
      )}
      <LazyIcon
        className="pointer"
        icon="Camera01"
        onClick={event => {
          event.stopPropagation();
          setIsFullNodeOpen(true);
        }}
      />
    </>
  );
}

const widthProportion = 200;
const heightProportion = 300;

function Camera({ close, user }: Props & { close: () => void }) {
  const rights = useScheduleWidgetRightsContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [src, setSrc] = useState('');
  const [, setRefresh] = useState(false);

  useEffect(() => {
    if (videoRef.current === null || videoWrapperRef.current === null || canvasRef.current === null) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let stream: MediaStream;

    (async () => {
      const size = (num: number) => ({ exact: num, ideal: num, max: num, min: num });
      const height = window.innerHeight / 2;

      try {
        stream = await navigator.mediaDevices?.getUserMedia({
          video: {
            facingMode: 'environment', // || 'user'
            width: size(Math.floor(height * (widthProportion / heightProportion))),
            height: size(Math.floor(height)),
            autoGainControl: false,
          },
          audio: false,
        });
        video.srcObject = stream;
        setStream(stream);
        await video.play();

        setTimeout(() => {
          if (!videoWrapperRef.current) return;

          canvas.width = Math.floor(videoWrapperRef.current.clientWidth);
          canvas.height = Math.floor(videoWrapperRef.current.clientHeight);
        });
      } catch (error) {
        console.error(error);
        setRefresh(isNIs);
        setError('Ошибка');
      }
    })();

    return () => {
      stream?.getTracks().forEach(track => {
        track.enabled = false;
        track.stop();
        stream.removeTrack(track);
      });
    };
  }, []);

  return (
    <>
      <div className="full-size flex column around">
        {error && <div className="color--ko">{error}</div>}
        <div>{user.fio}</div>
        <canvas
          ref={canvasRef}
          hidden
        />
        <div className="flex flex-gap column center">
          {src ? (
            <StyledImg
              src={src}
              alt=""
            />
          ) : (
            <ScheduleWidgetUserPhoto user={user} />
          )}
          <StyledVideoWrapper ref={videoWrapperRef}>
            <StyledVideo
              ref={videoRef}
              onPlay={defaultPreventer}
            />
          </StyledVideoWrapper>
        </div>
        <div className="flex half-width between">
          <StyledActionButton
            icon="CheckmarkBadge01"
            disabled={!src}
            onClick={async () => {
              stream?.getTracks().forEach(track => track.stop());
              indexIDB.db.schedulePhotos.put({ key: getScheduleWidgetUserPhotoStorageKey(user, rights.schedule), src });
              close();
            }}
          />
          <StyledActionButton
            icon="Camera01"
            onClick={() => {
              if (videoRef.current === null || canvasRef.current === null || videoWrapperRef.current === null) return;
              const video = videoRef.current;
              const videoWrapper = videoWrapperRef.current;
              const canvas = canvasRef.current;

              const context = canvas.getContext('2d');

              if (context === null) return;
              const videoWidth = videoWrapper.clientWidth;
              const videoHeight = videoWrapper.clientHeight;

              context.drawImage(video, 0, 0, videoWidth, videoHeight);

              const isLandscape = videoWidth > videoHeight;

              const width = isLandscape ? videoHeight * (widthProportion / heightProportion) : videoWidth;
              const height = isLandscape ? videoHeight : videoWidth * (heightProportion / widthProportion);

              const imageData = context.getImageData(
                (videoWidth - width) / 2,
                0,
                videoWrapper.clientWidth,
                videoWrapper.clientHeight,
              );

              const newCan = document.createElement('canvas');
              newCan.width = width;
              newCan.height = height;
              const newCtx = newCan.getContext('2d');

              if (newCtx === null) return;

              newCtx.putImageData(imageData, 0, 0);

              const src = newCan.toDataURL('image/jpeg');

              setSrc(src);
            }}
          />
        </div>
      </div>
    </>
  );
}

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const StyledVideo = styled.video`
  max-height: 40dvh;
`;

const StyledActionButton = styled(IconButton)`
  --icon-scale: 3;
`;

const StyledVideoWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;

  &:before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: -5px;
    border: 5px var(--color--7) solid;
    height: 100%;
    aspect-ratio: ${widthProportion / heightProportion};
  }
`;
