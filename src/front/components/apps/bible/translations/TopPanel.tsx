import { JSX, useState } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { TranslationSlidePreview } from '../../+complect/translations/controls/Preview';
import { BibleLists } from './lists/Lists';

export const BibleTranslationControlledTopPanel = function TopPanel(): JSX.Element {
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
        <TranslationSlidePreview isPreview={isPreview} />
      </div>
      <BibleLists />
    </StyledTopPanel>
  );
};

const StyledTopPanel = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 320px;
`;
