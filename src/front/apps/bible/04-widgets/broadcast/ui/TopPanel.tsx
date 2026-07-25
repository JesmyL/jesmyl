import { translateBase } from '#basis/locale';
import { BroadcastSlidePreview } from '#features/broadcast/controls/Preview';
import { useBibleBroadcastUpdateCurrentConfig } from '$bible/entities/broadcast';
import { BibleBroadcastList } from '$bible/entities/broadcast-list';
import styled from '@emotion/styled';
import { JSX, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const BibleBroadcastControlledTopPanel = function TopPanel(): JSX.Element {
  const [isPreview, setIsPreview] = useState(true);
  const updateConfig = useBibleBroadcastUpdateCurrentConfig();

  return (
    <StyledTopPanel>
      <div className="flex column">
        <div
          className="flex gap-2 mb-2"
          onClick={() => setIsPreview(is => !is)}
        >
          <div className={twMerge('pointer', isPreview && 'text-x7')}>{translateBase(it => it.preview)}</div>
          {' / '}
          <div className={twMerge('pointer', !isPreview && 'text-x7')}>{translateBase(it => it.slide)}</div>
        </div>
        <BroadcastSlidePreview
          isPreview={isPreview}
          onBgFileIdChange={box => updateConfig({ bgFileId: box.id, withBg: true })}
        />
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
