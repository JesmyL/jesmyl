import { useEffect, useRef, useState } from 'react';

const metric = 'px';

const defaultStep = 3;
const minStep = 1;

export const useBibleBroadcastScreenFontSizeAdapter = (
  content: string,
  subUpdater: string | number,
  isCheckWidthOnly?: boolean,
) => {
  const [isInit, setIsInit] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInit) setTimeout(setIsInit, 100, false);

    if (isInit || !content || contentRef.current === null || wrapperRef.current === null) return;

    const wrapper = wrapperRef.current;
    const container = contentRef.current;
    const conainerStyle = container.style;

    const prevOpacity = conainerStyle.opacity;
    conainerStyle.opacity = '0';

    let fontSize = conainerStyle.fontSize.endsWith(metric) ? parseInt(conainerStyle.fontSize) : 16;
    let step = defaultStep;
    let manipulationsCountLimit = 100000;

    const inc = (param: 'clientHeight' | 'clientWidth') => {
      if (step < 1) return;

      while (wrapper[param] > container[param] && fontSize < 5000) {
        conainerStyle.fontSize = (fontSize += step) + metric;
        if (manipulationsCountLimit-- < 0) return;
      }
    };

    const dec = (param: 'clientHeight' | 'clientWidth') => {
      if (step < 1) return;

      while (wrapper[param] < container[param] && fontSize > 0) {
        conainerStyle.fontSize = (fontSize -= step) + metric;
        if (manipulationsCountLimit-- < 0) return;
      }
    };

    const resizeFont = (isDecFirst: boolean, orientParam: 'clientHeight' | 'clientWidth') => {
      do {
        if (isDecFirst) dec(orientParam);
        else inc(orientParam);

        isDecFirst = !isDecFirst;
        step = Math.floor(step / 2);

        if (manipulationsCountLimit-- < 0) return;
      } while (step > minStep);
    };

    if (isCheckWidthOnly) {
      if (wrapper.clientWidth < container.clientWidth) resizeFont(true, 'clientWidth');
      else resizeFont(false, 'clientWidth');

      step = 1;
      dec('clientWidth');
    } else {
      if (wrapper.clientHeight < container.clientHeight) resizeFont(true, 'clientHeight');
      else resizeFont(false, 'clientHeight');

      step = 1;
      dec('clientHeight');
      dec('clientWidth');
    }

    conainerStyle.opacity = prevOpacity || '1';
  }, [content, isInit, subUpdater, isCheckWidthOnly]);

  return [wrapperRef, contentRef] as const;
};
