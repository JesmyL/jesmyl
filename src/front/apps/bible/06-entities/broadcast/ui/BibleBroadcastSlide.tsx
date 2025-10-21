import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleBroadcastScreenScreen } from '$bible/entities/broadcast-screen';
import { BibleBroadcastScreenKnownTextsContext } from '$bible/shared/state/KnownTextsContext';
import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { JSX, useEffect, useState } from 'react';
import styled from 'styled-components';

export function BibleBroadcastSlide({
  config,
  text,
  addressText,
}: Required<IndexSchWBroadcastLiveDataValue>['bible']): JSX.Element {
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    let i = 0;

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', () => setUpdates(++i)))
      .effect();
  }, []);

  return (
    <Container className="flex center full-size">
      <BibleBroadcastScreenKnownTextsContext
        text={text}
        addressText={addressText}
      >
        <BibleBroadcastScreenScreen
          isVisible
          bibleConfig={config}
          windowResizeUpdatesNum={updates}
        />
      </BibleBroadcastScreenKnownTextsContext>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  margin: auto;
`;
