import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { useBiblePrintShowSlideAddressCode } from '$bible/basis/lib/hooks/slide-sync';
import { bibleVerseiAtom } from '$bible/basis/lib/store/atoms';
import { BibleModulesTranslationsControl } from '$bible/entities/ModulesTranslationsControl';
import { JSX, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { ScreenTranslationControlPanel } from '../../../../features/translations/controls/ControllPanel';
import { BibleTranslationControlledBottomPanel } from './BottomPanel';
import { BibleTranslationControlledTopPanel } from './TopPanel';
import { BibleSearchPanel } from './search/Panel';

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
          <BibleTranslationControlledTopPanel />
          <BibleModulesTranslationsControl />
          <ScreenTranslationControlPanel
            onPrev={() => bibleVerseiAtom.set(v => v - 1)}
            onNext={() => bibleVerseiAtom.set(v => v + 1)}
          />
          <BibleSearchPanel />
          <BibleTranslationControlledBottomPanel />
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
