import { BibleTranslationScreenKnownTextsContext } from '@bible/texts/AddressContentContext';
import { IndexSchWTranslationLiveDataValue } from '@index/Index.model';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BibleTranslationScreen } from './screen/BibleTranslationScreen';

export function BibleTranslationSlide({
  config,
  text,
  addressText,
}: Required<IndexSchWTranslationLiveDataValue>['bible']): JSX.Element {
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectLine()
      .addEventListener(window, 'resize', () => setUpdates(++i))
      .effect();
  }, []);

  return (
    <Container className="flex center full-size">
      <BibleTranslationScreenKnownTextsContext
        text={text}
        addressText={addressText}
      >
        <BibleTranslationScreen
          isVisible
          bibleConfig={config}
          windowResizeUpdatesNum={updates}
        />
      </BibleTranslationScreenKnownTextsContext>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  margin: auto;
`;
