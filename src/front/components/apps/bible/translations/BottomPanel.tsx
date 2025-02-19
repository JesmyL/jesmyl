import { memo } from 'react';
import styled from 'styled-components';
import { BibleTranslateScreenConfigurations } from './ScreenConfigurations';
import { BibleTranslationHistoryArchive } from './archive/history/HistoryArchive';
import { BibleTranslationPlanArchive } from './archive/plan/PlanArchive';

export const BibleTranslationControlledBottomPanel = memo(
  function BibleTranslationControlledBottomPanel(): JSX.Element {
    return (
      <BottomGrid className="margin-big-gap-t">
        <div grid-configs="">
          <BibleTranslateScreenConfigurations />
        </div>
        <div grid-history="">
          <BibleTranslationHistoryArchive />
        </div>
        <div grid-plan="">
          <div>
            <BibleTranslationPlanArchive />
          </div>
        </div>
      </BottomGrid>
    );
  },
);

const BottomGrid = styled.div`
  display: grid;
  grid-template-areas: 'configs history plan';
  grid-template-columns: 40% 1fr 1fr;
  grid-template-rows: 400px;
  grid-gap: 10px;
  overflow: hidden;

  .archive-title {
    position: sticky;
    top: 0;
  }

  [grid-configs] {
    grid-area: configs;
    overflow-x: hidden;
    overflow-y: auto;
  }

  [grid-history] {
    grid-area: history;
    overflow-x: hidden;
    overflow-y: auto;
  }

  [grid-plan] {
    grid-area: plan;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;
