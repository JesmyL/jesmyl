import { TranslationSlidePreview } from '#features/translations/ui/Preview';
import { useState } from 'react';
import styled from 'styled-components';
import { BibleLists } from './lists/Lists';

export const BibleTranslationControlledTopPanel = function TopPanel(): JSX.Element {
  const [isPreview, setIsPreview] = useState(true);

  return (
    <StyledTopPanel>
      <div className="flex column">
        <div
          className="flex flex-gap margin-gap-b"
          onClick={() => setIsPreview(is => !is)}
        >
          <div className={'pointer ' + (isPreview ? 'color--7' : '')}>Предпросмотр</div>
          {' / '}
          <div className={'pointer ' + (isPreview ? '' : 'color--7')}>Слайд</div>
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
