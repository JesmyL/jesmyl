import { usePinchValue } from '#shared/lib/usePinchValue';
import { useAtomValue } from 'atomaric';
import { useRef } from 'react';
import { cmComFontSizeAtom } from '../state/atoms';

export const useCmComPinchFontSize = () => {
  const fontSizeReal = useAtomValue(cmComFontSizeAtom);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const fontSize = usePinchValue(screenRef, fontSizeReal, cmComFontSizeAtom.set);

  return { fontSize: Math.abs(fontSize), ref: screenRef, auto: fontSize < 0 };
};
