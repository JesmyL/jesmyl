import { useCallback } from 'react';
import { ScreenTranslateConfigurationNameChanger } from '../../+complect/translations/complect/NameChanger';
import { BackgroundConfigurator } from '../../../../04-widgets/configurators/Background';
import { ColorConfigurator } from '../../../../04-widgets/configurators/Color';
import { DisplayConfigurator } from '../../../../04-widgets/configurators/Display';
import { FontFamilyConfigurator } from '../../../../04-widgets/configurators/FontFamily';
import { FontStyleConfigurator } from '../../../../04-widgets/configurators/FontStyle';
import { FontWeightConfigurator } from '../../../../04-widgets/configurators/FontWeight';
import { OpacityConfigurator } from '../../../../04-widgets/configurators/Opacity';
import { ScreenTranslateConfigurationTextAlign } from '../../../../04-widgets/configurators/TextAlign';
import { useActualRef } from '../../../../07-shared/hooks/useActualRef';
import { useDebounceAction } from '../../../../07-shared/hooks/useDebounceAction';
import { ExpandableContent } from '../../../../07-shared/ui/expand/ExpandableContent';
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
