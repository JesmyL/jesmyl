import { BackgroundNameType } from '#shared/ui/configurators/selectors/BackgroundSelector';
import { takeInteractiveFileBackground } from '#shared/ui/configurators/utils/take-interactive-file-background';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

const style: CSSProperties = {
  position: 'absolute',
  objectFit: 'cover',
};

export const useSetBroadcastScreenInteractiveBackground = (currentBackground: BackgroundNameType | und) => {
  const [background, setBackground] = useState<ReactNode | null>(null);

  useEffect(() => {
    if (currentBackground === undefined) {
      setBackground(null);
      return;
    }

    takeInteractiveFileBackground(
      currentBackground,
      (type, src) => {
        if (type === 'video') {
          setBackground(
            <video
              autoPlay
              muted
              loop
              src={src}
              className="full-size pointers-none"
              style={style}
            />,
          );
          return;
        }

        if (type === 'image') {
          setBackground(
            <img
              alt=""
              src={src}
              className="full-size pointers-none"
              style={style}
            />,
          );
          return;
        }
      },
      () => setBackground(null),
    );
  }, [currentBackground, setBackground]);

  return background;
};
