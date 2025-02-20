import { useInitSoki } from '#basis/lib/+hooks/useInitSoki';
import { ScreenTranslationControlPanel } from '#features/translations/ui/ControllPanel';
import { PageContainer } from '#shared/ui/PageContainer';
import { bibleIDB } from '@bible/shared/lib/bibleIDB';
import { BibleModulesTranslations } from '@bible/translates/Translations';
import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useBibleSlideSyncInkrementer } from '../shared/translations/hooks/slide-sync';
import { BibleTranslationControlledBottomPanel } from './BottomPanel';
import { useLoadBibleChaptersCombine } from './hooks/texts';
import { BibleSearchPanel } from './search/Panel';
import { BibleTranslationControlledTopPanel } from './TopPanel';

interface Props {
  head: ReactNode;
  headTitle: ReactNode;
}

export const BibleTranslationControlled = ({ head, headTitle }: Props): JSX.Element => {
  useLoadBibleChaptersCombine();
  const inkSync = useBibleSlideSyncInkrementer();
  useInitSoki('bible');

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
    <PageContainer
      className=""
      headTitle={headTitle ?? 'Библия'}
      head={head}
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
};

const Container = styled.div`
  --size: 50vmin;
  --max-size: 300px;
  --min-size: 200px;
`;
