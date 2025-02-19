import { LazyIcon } from '#shared/ui/icon';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useCurrentTranslationConfigiSet, useScreenTranslationConfigsValue } from '../../atoms';
import { useAddScreenTranslationConfig, useScreenTranslationCurrentConfigi } from '../../hooks/configs';
import { useWatchScreenTranslations } from '../../hooks/watch-translation';
import { useScreenTranslationWindows } from '../../hooks/windows';
import { useUpdateScreenTranslationConfig } from '../../hooks/with-config';
import { ScreenTranslationConfig } from '../../model';
import { ScreenTranslationsFace } from './Face';
import { useScreenTranslationFaceLineListeners } from './hooks/listeners';
import { useScreenTranslationPutOnFaceClose } from './hooks/put-on-face-close';

interface Props<Config> {
  updateConfig: (config: Config | null, configi: number) => void;
}

export const ScreenTranslationsFaceLine = <Config,>(props: Props<Config>) => {
  const configs: ScreenTranslationConfig[] = useScreenTranslationConfigsValue();
  const windows = useScreenTranslationWindows();
  const updateConfig = useUpdateScreenTranslationConfig();
  const setCurrentConfigi = useCurrentTranslationConfigiSet();
  const addConfig = useAddScreenTranslationConfig();

  const currentConfigi = useScreenTranslationCurrentConfigi();
  const watchTranslation = useWatchScreenTranslations();

  useScreenTranslationFaceLineListeners(configs, currentConfigi, setCurrentConfigi, updateConfig, windows);

  const putOnFaceClose = useScreenTranslationPutOnFaceClose(
    configs,
    currentConfigi,
    setCurrentConfigi,
    windows,
    props.updateConfig,
  );

  const putOnFaceClick = useCallback(
    (configi: number) => {
      return () => {
        if (windows.length && windows[configi] == null) {
          watchTranslation();
          return;
        }

        setCurrentConfigi(configi);
      };
    },
    [setCurrentConfigi, watchTranslation, windows],
  );

  const onAdd = useCallback(() => setCurrentConfigi(addConfig()), [addConfig, setCurrentConfigi]);

  return (
    <div className="margin-big-gap-t">
      <ConfigLine className="margin-gap-b no-scrollbar children-middle">
        {configs.map((config, configi, configa) => {
          return (
            <ScreenTranslationsFace
              key={configi}
              configi={configi}
              config={config}
              className={
                windows[configi] === null
                  ? ' bgcolor--ko '
                  : currentConfigi === configi
                    ? ' bgcolor--7 '
                    : ' bgcolor--3 '
              }
              putOnClick={putOnFaceClick}
              putOnClose={configa.length - 1 === configi ? putOnFaceClose : undefined}
            />
          );
        })}
        <LazyIcon
          icon="PlusSign"
          className="margin-gap-l"
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
