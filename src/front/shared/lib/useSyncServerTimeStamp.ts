import { soki } from '#shared/soki';
import { serverSuccessCheckTSDeltaTimeAtom, serverTimeStampDeltaAtom } from '#shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

export const useSyncServerTimeStamp = () => {
  const tsDelta = useAtomValue(serverTimeStampDeltaAtom);

  useEffect(() => {
    if (tsDelta.isFinal || Date.now() - serverSuccessCheckTSDeltaTimeAtom.get() < 2 * 24 * 60 * 60 * 1000) return;

    (async () => {
      try {
        const arr = [];
        const pingsCount = 7;

        for (let i = 0; i < pingsCount; i++) arr.push(await soki.ping(2000));

        serverTimeStampDeltaAtom.set({
          delta: Math.floor(
            arr.reduce((sum, { finish, start, ts }) => sum + (ts - (start + (finish - start))), 0) / pingsCount,
          ),
          isFinal: false,
        });

        serverSuccessCheckTSDeltaTimeAtom.set(Date.now());
      } catch (_e) {
        //
      }
    })();
  }, [tsDelta.isFinal]);
};
