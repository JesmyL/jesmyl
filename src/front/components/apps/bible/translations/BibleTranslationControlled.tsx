import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { bibleIDB } from '$bible/_db/bibleIDB';
import { useBibleSlideSyncInkrementer } from '$bible/hooks/slide-sync';
import { useLoadBibleChaptersCombine } from '$bible/hooks/texts';
import { bibleSokiInvocatorBaseClient } from '$bible/invoctors/invocator';
import { BibleModulesTranslations } from '$bible/translates/Translations';
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
  useLoadBibleChaptersCombine();
  const inkSync = useBibleSlideSyncInkrementer();

  useEffect(() => inkSync(1), [inkSync]);

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
          <BibleModulesTranslations />
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

bibleSokiInvocatorBaseClient.$$register();
