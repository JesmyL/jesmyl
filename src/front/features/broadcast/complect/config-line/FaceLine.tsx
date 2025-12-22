import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import styled from 'styled-components';
import { currentBroadcastConfigiAtom, useScreenBroadcastConfigsValue } from '../../atoms';
import { useAddScreenBroadcastConfig } from '../../hooks/configs';
import { useWatchScreenBroadcast } from '../../hooks/watch-broadcast';
import { useScreenBroadcastWindows } from '../../hooks/windows';
import { useUpdateScreenBroadcastConfig } from '../../hooks/with-config';
import { ScreenBroadcastConfig } from '../../model';
import { ScreenBroadcastFace } from './Face';
import { useScreenBroadcastFaceLineListeners } from './hooks/listeners';
import { useScreenBroadcastPutOnFaceClose } from './hooks/put-on-face-close';

interface Props<Config> {
  updateConfig: (config: Config | null, configi: number) => void;
}

export const ScreenBroadcastFaceLine = <Config,>(props: Props<Config>) => {
  const configs: ScreenBroadcastConfig[] = useScreenBroadcastConfigsValue();
  const windows = useScreenBroadcastWindows();
  const updateConfig = useUpdateScreenBroadcastConfig();
  const addConfig = useAddScreenBroadcastConfig();

  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const watchBroadcast = useWatchScreenBroadcast();

  useScreenBroadcastFaceLineListeners(configs, currentConfigi, updateConfig, windows);

  const putOnFaceClose = useScreenBroadcastPutOnFaceClose(configs, currentConfigi, windows, props.updateConfig);

  const putOnFaceClick = useCallback(
    (configi: number) => {
      return () => {
        if (windows.length && windows[configi] == null) {
          watchBroadcast();
          return;
        }

        currentBroadcastConfigiAtom.set(configi);
      };
    },
    [watchBroadcast, windows],
  );

  const onAdd = useCallback(() => currentBroadcastConfigiAtom.set(addConfig()), [addConfig]);

  return (
    <div className="mt-5">
      <ConfigLine className="mb-2 no-scrollbar children-middle">
        {configs.map((config, configi, configa) => {
          return (
            <ScreenBroadcastFace
              key={configi}
              configi={configi}
              config={config}
              className={windows[configi] === null ? ' bg-xKO' : currentConfigi === configi ? ' bg-x7' : ' bg-x3'}
              putOnClick={putOnFaceClick}
              putOnClose={configa.length - 1 === configi ? putOnFaceClose : undefined}
            />
          );
        })}
        <LazyIcon
          icon="PlusSign"
          className="ml-2"
          onClick={onAdd}
        />
      </ConfigLine>
    </div>
  );
};

const ConfigLine = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
`;
