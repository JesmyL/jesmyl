import { ReactNode, useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { BackgroundNameType } from '../../../../../complect/configurators/selectors/BackgroundSelector';
import { takeInteractiveFileBackground } from '../../../../../complect/configurators/utils/take-interactive-file-background';

const style: CSSProperties = {
  position: 'absolute',
  objectFit: 'cover',
};

export const useSetScreenTranslationInteractiveBackground = (currentBackground: BackgroundNameType | und) => {
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
