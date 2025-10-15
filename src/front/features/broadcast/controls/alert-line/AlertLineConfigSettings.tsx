import { propagationStopper } from '#shared/lib/event-funcs';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useDebounceAction } from '#shared/lib/hooks/useDebounceAction';
import { mylib } from '#shared/lib/my-lib';
import { BackgroundConfigurator } from '#shared/ui/configurators/Background';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontSizeConfigurator } from '#shared/ui/configurators/FontSize';
import { FontStyleConfigurator } from '#shared/ui/configurators/FontStyle';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight/ui';
import { TextInput } from '#shared/ui/TextInput';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import { complectIDB } from '../../../../components/index/state/complectIDB';
import { AlertLineConfig } from '../../model';

const LazyAlertLineConfigIcon = React.lazy(() => import('./AlertLineConfigIcon'));
const LazyIconConfigurator = React.lazy(() => import('#shared/ui/configurators/Icon'));

export const AlertLineConfigSettingsInner = ({ configId }: { configId: number }) => {
  const config = useLiveQuery(
    () => mylib.isNNlButUnd(configId) && complectIDB.tb.alertLineConfigs.get(configId),
    [configId],
  );

  return (
    config && (
      <AlertLineConfigSettingsInnerWithConfig
        config={config}
        configId={configId}
      />
    )
  );
};

const AlertLineConfigSettingsInnerWithConfig = ({
  config,
  configId,
}: {
  config: AlertLineConfig;
  configId: number;
}) => {
  const update = useDebounceAction((config: Partial<AlertLineConfig>) => {
    complectIDB.tb.alertLineConfigs.update(configId, config);
  });
  const [top, setTop] = useState(config.top);
  const defferredTop = useDeferredValue(top);
  const prevConfigRef = useRef(config);
  prevConfigRef.current = config;

  useEffect(() => {
    update({ ...prevConfigRef.current, top: defferredTop });
  }, [defferredTop, update]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          event.stopPropagation();
          const delta = event.ctrlKey ? 10 : 1;

          if (event.code === 'ArrowUp') setTop(prev => prev - delta);
          if (event.code === 'ArrowDown') setTop(prev => prev + delta);
        }),
      )
      .effect();
  }, []);

  if (config == null) return <div className="text-xKO">Не найдено</div>;

  return (
    <>
      <h2 className="flex gap-2">
        <LazyAlertLineConfigIcon config={config} />
        {config.title}
      </h2>
      <h2>Положение строки - вверх/вниз/+CTRL</h2>
      <div className="flex gap-2 nowrap">
        Нвазвание:
        <TextInput
          value={config.title}
          onInput={title => update({ title })}
        />
      </div>

      <LazyIconConfigurator
        header=""
        icon={config.icon}
        used={[config.icon]}
        onSend={async icon => update({ ...config, icon })}
      />

      <div className="flex gap-2 nowrap">
        Альтернативный текст:
        <TextInput
          value={config.text}
          onInput={text => update({ text })}
        />
      </div>
      <ColorConfigurator
        config={config}
        updateConfig={update}
      />
      <BackgroundConfigurator
        config={config}
        updateConfig={update}
      />
      <FontFamilyConfigurator
        config={config}
        updateConfig={update}
      />
      <FontStyleConfigurator
        config={config}
        updateConfig={update}
      />
      <FontWeightConfigurator
        config={config}
        updateConfig={update}
      />
      <FontSizeConfigurator
        config={config}
        updateConfig={update}
      />
      <div className="flex gap-2 nowrap">
        Время пробега:
        <TextInput
          value={'' + config.speed}
          type="tel"
          onInput={speed => update({ speed: +speed })}
          onKeyDown={propagationStopper}
        />
      </div>
    </>
  );
};
