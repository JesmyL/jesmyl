import { CSSProperties } from 'react';

const style: CSSProperties = {
  position: 'absolute',
  objectFit: 'cover',
};

/** Full-size cover background shared by MyFiles- and WorkDir-backed broadcast backgrounds. */
export const BackgroundMediaNode = ({ src, isVideo }: { src: string; isVideo: boolean }) =>
  isVideo ? (
    <video
      autoPlay
      muted
      loop
      src={src}
      className="full-size pointers-none"
      style={style}
    />
  ) : (
    <img
      alt=""
      src={src}
      className="full-size pointers-none"
      style={style}
    />
  );
