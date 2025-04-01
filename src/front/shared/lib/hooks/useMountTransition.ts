import { useEffect, useState } from 'react';

export function useMountTransition(isMounted: boolean, className: string, unmountDelay: number): [boolean, string] {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeoutId: any;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return [hasTransitionedIn || isMounted, `${className} ${hasTransitionedIn && isMounted ? 'mounted' : ''}`];
}
