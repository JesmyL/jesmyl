import { useInitSoki } from '#basis/lib/hooks/+app/useInitSoki';
import { bibleIDB } from '#basis/lib/idb/bible';
import { ScreenTranslationControlPanel } from '#entities/translation/ControllPanel';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useBibleSlideSyncInkrementer } from '../../components/apps/bible/hooks/slide-sync';
import { useLoadBibleChaptersCombine } from '../../components/apps/bible/hooks/texts';
import { BibleModulesTranslations } from '../../components/apps/bible/translates/Translations';
import { BibleTranslationControlledBottomPanel } from '../../components/apps/bible/translations/BottomPanel';
import { BibleSearchPanel } from '../../components/apps/bible/translations/search/Panel';
import { BibleTranslationControlledTopPanel } from '../../components/apps/bible/translations/TopPanel';

interface Props {
  head: ReactNode;
  headTitle: ReactNode;
}

export const BibleTranslationPage = ({ head, headTitle }: Props): JSX.Element => {
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
    <PhaseContainerConfigurer
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
