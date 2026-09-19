import { BroadcastScreen } from '#features/broadcast/BroadcastScreen';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { StyledBroadcastScreenProportioned } from '#shared/style/StyledBroadcastScreenProportioned';
import { FullContent } from '../fullscreen-content/FullContent';
import { TheIconButton } from '../the-icon/TheIconButton';
import { WithAtom } from '../WithAtom';

export const ScreensConfigurator = ({ title = 'Окошки', isButtonOnly }: { title?: string; isButtonOnly?: boolean }) => {
  const currentConfig = useScreenBroadcastCurrentConfig();

  if (!currentConfig) return;

  const button = (
    <WithAtom init={false}>
      {isSettingsOpenAtom => (
        <>
          <TheIconButton
            icon="Copy02"
            onClick={isSettingsOpenAtom.do.toggle}
          />

          <FullContent openAtom={isSettingsOpenAtom}>
            {isOpen =>
              isOpen && (
                <div className="flex center h-full items-center">
                  <StyledBroadcastScreenProportioned $proportion={currentConfig.proportion}>
                    <BroadcastScreen
                      isTech
                      win={window}
                      isPreview={false}
                    />
                  </StyledBroadcastScreenProportioned>
                </div>
              )
            }
          </FullContent>
        </>
      )}
    </WithAtom>
  );

  return isButtonOnly ? (
    button
  ) : (
    <div className="flex gap-2 flex-max my-2">
      {title}
      {button}
    </div>
  );
};
