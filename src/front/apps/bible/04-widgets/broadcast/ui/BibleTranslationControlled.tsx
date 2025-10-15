import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BibleBroadcastControlledBottomPanel } from '$bible/entities/broadcast';
import { BibleBroadcastSearchPanel } from '$bible/entities/broadcast-search';
import { BibleTranslateModulesControl } from '$bible/entities/translate';
import { useBiblePrintShowSlideAddressCode } from '$bible/shared/hooks/slide-sync';
import { bibleVerseiAtom } from '$bible/shared/state/atoms';
import { JSX, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { ScreenTranslationControlPanel } from '../../../../../features/broadcast/controls/ControllPanel';
import { BibleBroadcastControlledTopPanel } from './TopPanel';

interface Props {
  head: ReactNode;
  headTitle: ReactNode;
}

export default function BibleTranslationControlled({ head, headTitle }: Props): JSX.Element {
  const printShowAddress = useBiblePrintShowSlideAddressCode();

  useEffect(() => {
    printShowAddress();
  }, [printShowAddress]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          switch (event.code) {
            case 'F2':
            case 'F3':
            case 'F4':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
              event.preventDefault();
              return;
          }
        }),
      )
      .effect();
  }, []);

  return (
    <PageContainerConfigurer
      className=""
      headTitle={headTitle ?? 'Библия'}
      head={head}
      // withoutBackButton
      // withoutBackSwipe
      content={
        <Container>
          <BibleBroadcastControlledTopPanel />
          <BibleTranslateModulesControl />
          <ScreenTranslationControlPanel
            onPrev={() => bibleVerseiAtom.set(v => v - 1)}
            onNext={() => bibleVerseiAtom.set(v => v + 1)}
          />
          <BibleBroadcastSearchPanel />
          <BibleBroadcastControlledBottomPanel />
        </Container>
      }
    />
  );
}

const Container = styled.div`
  --size: 50vmin;
  --max-size: 300px;
  --min-size: 200px;
`;
