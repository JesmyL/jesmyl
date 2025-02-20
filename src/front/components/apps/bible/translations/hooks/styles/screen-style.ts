import { useScreenTranslationPositionsStyles } from '#features/translations/lib/hooks/position-styles';
import { useScreenTranslationTextStyles } from '#features/translations/lib/hooks/text-styles';
import { MyLib } from '#shared/lib/my-lib';
import { CSSProperties, useMemo } from 'react';
import { verseTranslateTitleCssVariableName } from '../../complect';
import { BibleTranslationScreenConfig } from '../../model';

export const screenGridArea = 'screen-grid-area';

const packInnerStyles = <Config extends Partial<Record<'insertedtext' | 'textinbrackets', {}>>>(
  area: 'insertedtext' | 'textinbrackets',
  currentConfig: Config,
  isVisible: boolean,
) => {
  return MyLib.entries(currentConfig[area] ?? {}).reduce((innerStyles, [key, val]) => {
    if (val == null || (key === 'color' && !isVisible)) return innerStyles;

    innerStyles[('--' + area + '-' + key) as never] = ('' + val) as never;
    return innerStyles;
  }, {});
};

export const useGetBibleScreenTranslationScreenStyle = (
  isVisible: boolean,
  currentConfig: BibleTranslationScreenConfig | und,
) => {
  const positions = useScreenTranslationPositionsStyles(currentConfig?.screen);
  const textStyles = useScreenTranslationTextStyles(currentConfig);

  return useMemo((): CSSProperties => {
    if (currentConfig === undefined)
      return {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        top: '5%',
        left: '5%',
        width: '90%',
        height: '90%',
      };

    return {
      ...positions,
      ...textStyles,
      ...packInnerStyles('insertedtext', currentConfig, isVisible),
      ...packInnerStyles('textinbrackets', currentConfig, isVisible),
      gridArea: screenGridArea,
      textDecoration: 'italic',

      color: isVisible ? currentConfig.color : 'transparent',
      [verseTranslateTitleCssVariableName]: isVisible ? 'grey' : 'transparent',
    } as never;
  }, [currentConfig, isVisible, positions, textStyles]);
};
