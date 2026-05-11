import { useAtomValue } from 'atomaric';
import React, { Suspense } from 'react';
import { metronomeIsOpenAtom } from '../lib/atoms';

const LazyMetronome = React.lazy(() => import('./LazyMetronome'));

export const Metronome = () => {
  const isOpen = useAtomValue(metronomeIsOpenAtom);

  return (
    isOpen != null && (
      <Suspense>
        <LazyMetronome />
      </Suspense>
    )
  );
};
