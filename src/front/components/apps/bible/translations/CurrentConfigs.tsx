import { useCallback } from 'react';
import { ScreenTranslateConfigurationNameChanger } from '../../+complect/translations/complect/NameChanger';
import { BackgroundConfigurator } from '../../../../complect/configurators/Background';
import { ColorConfigurator } from '../../../../complect/configurators/Color';
import { DisplayConfigurator } from '../../../../complect/configurators/Display';
import { FontFamilyConfigurator } from '../../../../complect/configurators/FontFamily';
import { FontStyleConfigurator } from '../../../../complect/configurators/FontStyle';
import { FontWeightConfigurator } from '../../../../complect/configurators/FontWeight';
import { OpacityConfigurator } from '../../../../complect/configurators/Opacity';
import { ScreenTranslateConfigurationTextAlign } from '../../../../complect/configurators/TextAlign';
import { ExpandableContent } from '../../../../complect/expand/ExpandableContent';
import { useActualRef } from '../../../../complect/useActualRef';
import { useDebounceAction } from '../../../../complect/useDebounceAction';
import { useUpdateBibleCurrentTranslationConfig } from './hooks/update-config';
import { BibleTranslationScreenConfig } from './model';

interface Props {
  currentConfig: BibleTranslationScreenConfig;
}

export default function BibleTranslateCurrentScreenConfigurations({ currentConfig }: Props) {
  const updateConfig = useUpdateBibleCurrentTranslationConfig();
  const update = useDebounceAction(updateConfig);
  const configRef = useActualRef(currentConfig);

  const putUpdateConfigInner = useCallback(
    <Area extends 'address' | 'insertedtext' | 'textinbrackets'>(area: Area) =>
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
          <div className="margin-gap-l">
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
          <div className="margin-gap-l">
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
      <ExpandableContent title="Ссылка">
        <div className="margin-gap-l">
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
