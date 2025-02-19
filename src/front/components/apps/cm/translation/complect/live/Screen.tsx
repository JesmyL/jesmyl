import { useEffect, useState } from 'react';
import { addEventListenerPipe, hookEffectPipe } from '../../../../../../shared/lib/hookEffectPipe';
import { useCcom } from '../../../col/com/useCcom';
import { CmLiveTranslationList } from './List';
import { CmLiveTranslationSlide } from './Slide';
import { CmSchWTranslationLiveDataValue } from './model';

export const CmLiveTranslationScreen = (props: CmSchWTranslationLiveDataValue) => {
  const com = useCcom(props.comw);
  const [subUpdates, setSubUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setSubUpdates(++i)))
      .effect();
  }, []);

  const texts = com?.getOrderedTexts(true, props.config.pushKind);
  const text = props.texti == null || texts == null ? props.text : texts[props.texti] || props.text;
  const nextText = props.texti == null || texts == null ? props.text : texts[props.texti + 1] || props.nextText;

  return window.innerWidth > window.innerHeight ? (
    <CmLiveTranslationSlide
      subUpdates={subUpdates}
      text={text}
      nextText={nextText}
      config={props.config}
    />
  ) : (
    <CmLiveTranslationList
      {...props}
      com={com}
      text={text}
      nextText={nextText}
    />
  );
};
