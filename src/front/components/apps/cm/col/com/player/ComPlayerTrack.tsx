import { useEffect, useState } from 'react';
import './ComPlayer.scss';

const calcCurrentTime = (duration: number, offsetX: number, offsetWidth: number) => {
  return duration * (offsetX / offsetWidth);
};

export function ComPlayerTrack({ player }: { player: HTMLAudioElement }) {
  const [progressWidth, setProgressWidth] = useState('0');
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const onTimeUpdate = () => {
      setTime(
        Math.floor(player.currentTime / 60)
          .toFixed(0)
          .padStart(2, '0') +
          ':' +
          Math.floor(player.currentTime % 60)
            .toFixed(0)
            .padStart(2, '0'),
      );
      setProgressWidth(`${((player.currentTime / player.duration) * 100).toFixed(2)}%`);
    };

    player.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      player.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [player]);

  return (
    <>
      <div
        className="player-track pointer"
        style={{ '--track-progress-width': progressWidth } as never}
        onClick={event => {
          player.currentTime = calcCurrentTime(
            player.duration,
            event.nativeEvent.offsetX,
            event.currentTarget.offsetWidth,
          );
        }}
      />
      {time}
    </>
  );
}
