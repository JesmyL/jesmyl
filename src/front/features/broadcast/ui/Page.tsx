import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { useEffect, useState } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { itInvokeIt } from 'shared/utils';

export const PresentationPage = () => {
  const [liveData, setLiveData] = useState<IndexSchWBroadcastLiveDataValue>({ fio: '' });

  useEffect(() => {
    let clears: (() => void)[] = [];

    (async () => {
      const list = await navigator.presentation?.receiver?.connectionList;
      clears = list.connections.map(connection => {
        connection.onmessage = e => setLiveData(JSON.parse(e.data));
        connection.send('');

        return () => (connection.onmessage = null);
      });
    })();

    return () => clears.forEach(itInvokeIt);
  }, []);

  return (
    <div
      className="absolute w-full h-full bg-black"
      onClick={() => document.body.requestFullscreen()}
    >
      {liveData.cm != null ? (
        <CmBroadcastLiveScreen
          {...liveData.cm}
          isForceSlideMode
        />
      ) : (
        liveData.bible != null && <BibleBroadcastSlide {...liveData.bible} />
      )}
    </div>
  );
};
