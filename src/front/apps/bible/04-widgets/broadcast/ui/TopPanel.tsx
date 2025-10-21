import { BroadcastSlidePreview } from '#features/broadcast/controls/Preview';
import { BibleBroadcastList } from '$bible/entities/broadcast-list';
import { JSX, useState } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export const BibleBroadcastControlledTopPanel = function TopPanel(): JSX.Element {
  const [isPreview, setIsPreview] = useState(true);

  return (
    <StyledTopPanel>
      <div className="flex column">
        <div
          className="flex gap-2 mb-2"
          onClick={() => setIsPreview(is => !is)}
        >
          <div className={twMerge('pointer', isPreview && 'text-x7')}>Предпросмотр</div>
          {' / '}
          <div className={twMerge('pointer', !isPreview && 'text-x7')}>Слайд</div>
        </div>
        <BroadcastSlidePreview isPreview={isPreview} />
      </div>
      <BibleBroadcastList />
    </StyledTopPanel>
  );
};

const StyledTopPanel = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 320px;
`;
