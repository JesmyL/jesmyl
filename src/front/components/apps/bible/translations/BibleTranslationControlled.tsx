import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { ScreenTranslationControlPanel } from '../../+complect/translations/controls/ControllPanel';
import { useInitSoki } from '../../../../app/useInitSoki';
import { PageContainer } from '../../../../shared/ui/PageContainer';
import { bibleIDB } from '../_db/bibleIDB';
import { useBibleSlideSyncInkrementer } from '../hooks/slide-sync';
import { useLoadBibleChaptersCombine } from '../hooks/texts';
import { BibleModulesTranslations } from '../translates/Translations';
import { BibleTranslationControlledBottomPanel } from './BottomPanel';
import { BibleTranslationControlledTopPanel } from './TopPanel';
import { BibleSearchPanel } from './search/Panel';

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
