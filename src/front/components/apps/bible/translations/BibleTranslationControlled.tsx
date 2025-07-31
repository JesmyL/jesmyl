import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { useBiblePrintShowSlideAddressCode } from '$bible/basis/lib/hooks/slide-sync';
import { BibleModulesTranslationsControl } from '$bible/entities/ModulesTranslationsControl';
import { bibleTsjrpcBaseClient } from '$bible/processes/tsjrpc';
import { JSX, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { ScreenTranslationControlPanel } from '../../+complect/translations/controls/ControllPanel';
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
    return hookEffectLine()
      .addEventListener(window, 'keydown', event => {
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
      })
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
            onPrev={() => bibleIDB.set.versei(v => v - 1)}
            onNext={() => bibleIDB.set.versei(v => v + 1)}
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

bibleTsjrpcBaseClient.$$register();
