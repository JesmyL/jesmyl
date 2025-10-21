import { BibleBroadcastScreenConfigurations } from '$bible/widgets/broadcast';
import { JSX, memo } from 'react';
import styled from 'styled-components';
import { BibleBroadcastHistoryArchive } from '../../broadcast-history/ui/HistoryArchive';
import { BibleBroadcastPlanArchive } from '../../broadcast-plan/ui/PlanArchive';

export const BibleBroadcastControlledBottomPanel = memo(function BibleBroadcastControlledBottomPanel(): JSX.Element {
  return (
    <BottomGrid className="mt-5">
      <div grid-configs="">
        <BibleBroadcastScreenConfigurations />
      </div>
      <div grid-history="">
        <BibleBroadcastHistoryArchive />
      </div>
      <div grid-plan="">
        <div>
          <BibleBroadcastPlanArchive />
        </div>
      </div>
    </BottomGrid>
  );
});

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
