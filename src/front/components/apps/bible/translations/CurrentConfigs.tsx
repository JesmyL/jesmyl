import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useDebounceAction } from '#shared/lib/hooks/useDebounceAction';
import { BackgroundConfigurator } from '#shared/ui/configurators/Background';
import { ColorConfigurator } from '#shared/ui/configurators/Color';
import { DisplayConfigurator } from '#shared/ui/configurators/Display';
import { FontFamilyConfigurator } from '#shared/ui/configurators/FontFamily';
import { FontStyleConfigurator } from '#shared/ui/configurators/FontStyle';
import { FontWeightConfigurator } from '#shared/ui/configurators/FontWeight/ui';
import { OpacityConfigurator } from '#shared/ui/configurators/Opacity';
import { ScreenTranslateConfigurationTextAlign } from '#shared/ui/configurators/TextAlign';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { useCallback } from 'react';
import { ScreenTranslateConfigurationNameChanger } from '../../../../features/translations/complect/NameChanger';
import { useUpdateBibleCurrentTranslationConfig } from './hooks/update-config';
import { BibleTranslationScreenConfig } from './model';

interface Props {
  currentConfig: BibleTranslationScreenConfig;
}

export function BibleTranslateCurrentScreenConfigurations({ currentConfig }: Props) {
  const updateConfig = useUpdateBibleCurrentTranslationConfig();
  const update = useDebounceAction(updateConfig);
  const configRef = useActualRef(currentConfig);

  const putUpdateConfigInner = useCallback(
    <Area extends 'address' | 'insertedtext' | 'textinbrackets' | 'godswords'>(area: Area) =>
      (configInner: Partial<BibleTranslationScreenConfig[Area]>) => {
        update({ ...configRef.current, [area]: { ...configRef.current[area], ...configInner } });
      },
    [configRef, update],
  );

  return (
    <>
      <ScreenTranslateConfigurationNameChanger />
      <ColorConfigurator
        config={currentConfig}
        updateConfig={update}
      />
      <FontStyleConfigurator
        config={currentConfig}
        updateConfig={updateConfig}
      />
      <FontWeightConfigurator
        config={currentConfig}
        updateConfig={updateConfig}
      />
      <ScreenTranslateConfigurationTextAlign
        config={currentConfig}
        updateConfig={updateConfig}
      />
      <FontFamilyConfigurator
        config={currentConfig}
        updateConfig={updateConfig}
      />
      <BackgroundConfigurator
        config={currentConfig}
        updateConfig={update}
      />
      {currentConfig.insertedtext && (
        <ExpandableContent title="Вставка">
          <div className="ml-2">
            <ColorConfigurator
              config={currentConfig.insertedtext}
              updateConfig={putUpdateConfigInner('insertedtext')}
            />
            <FontStyleConfigurator
              config={currentConfig.insertedtext}
              updateConfig={putUpdateConfigInner('insertedtext')}
            />
            <OpacityConfigurator
              config={currentConfig.insertedtext}
              updateConfig={putUpdateConfigInner('insertedtext')}
            />
            <DisplayConfigurator
              config={currentConfig.insertedtext}
              updateConfig={putUpdateConfigInner('insertedtext')}
            />
          </div>
        </ExpandableContent>
      )}
      {currentConfig.textinbrackets && (
        <ExpandableContent title="Текст в [скобках]">
          <div className="ml-2">
            <ColorConfigurator
              config={currentConfig.textinbrackets}
              updateConfig={putUpdateConfigInner('textinbrackets')}
            />
            <FontStyleConfigurator
              config={currentConfig.textinbrackets}
              updateConfig={putUpdateConfigInner('textinbrackets')}
            />
            <OpacityConfigurator
              config={currentConfig.textinbrackets}
              updateConfig={putUpdateConfigInner('textinbrackets')}
            />
            <DisplayConfigurator
              config={currentConfig.textinbrackets}
              updateConfig={putUpdateConfigInner('textinbrackets')}
            />
          </div>
        </ExpandableContent>
      )}
      {currentConfig.godswords && (
        <ExpandableContent title="Слова Христа">
          <div className="ml-2">
            <ColorConfigurator
              config={currentConfig.godswords}
              updateConfig={putUpdateConfigInner('godswords')}
            />
            <FontStyleConfigurator
              config={currentConfig.godswords}
              updateConfig={putUpdateConfigInner('godswords')}
            />
            <OpacityConfigurator
              config={currentConfig.godswords}
              updateConfig={putUpdateConfigInner('godswords')}
            />
          </div>
        </ExpandableContent>
      )}
      <ExpandableContent title="Ссылка">
        <div className="ml-2">
          <ColorConfigurator
            config={currentConfig.address}
            updateConfig={putUpdateConfigInner('address')}
          />
          <FontStyleConfigurator
            config={currentConfig.address}
            updateConfig={putUpdateConfigInner('address')}
          />
          <BackgroundConfigurator
            config={currentConfig.address}
            updateConfig={putUpdateConfigInner('address')}
          />
          <ScreenTranslateConfigurationTextAlign
            config={currentConfig.address}
            updateConfig={putUpdateConfigInner('address')}
          />
          <FontFamilyConfigurator
            config={currentConfig.address}
            updateConfig={putUpdateConfigInner('address')}
          />
        </div>
      </ExpandableContent>
    </>
  );
}
