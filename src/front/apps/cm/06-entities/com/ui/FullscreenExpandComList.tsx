import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { cmComCommentCurrentOpenedAltKeyAtom } from '$cm/entities/com-comment';
import { CmComOrderList } from '$cm/entities/com-order';
import { TheCmComWithComments } from '$cm/widgets/com';
import { useAtomValue } from 'atomaric';
import React from 'react';
import styled from 'styled-components';
import { CmCom } from '../lib/Com';
import { cmComSpeedRollKfAtom } from '../state/atoms';
import { CmComNumber } from './ComNumber';

export function CmComFullscreenExpandList({ coms }: { coms: CmCom[] }) {
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);

  return (
    <ExpandContent className="com-expand-content h-full">
      <RolledContent speedKfAtom={cmComSpeedRollKfAtom}>
        <div className="inner-content">
          {coms?.map(com => (
            <React.Fragment key={com.wid}>
              <div className="com-number">#{<CmComNumber comw={com.wid} />}</div>
              <div className="uppercase">{altCommentKeys[com.wid] ?? altCommentKeys.last}</div>
              <TheCmComWithComments com={com}>
                <CmComOrderList
                  com={com}
                  fontSize={-1}
                  chordVisibleVariant={2}
                  isMiniAnchor={false}
                />
              </TheCmComWithComments>
            </React.Fragment>
          ))}
        </div>
      </RolledContent>
    </ExpandContent>
  );
}

const ExpandContent = styled.div`
  overflow: auto;

  .inner-content {
    padding-top: 50vh;
  }

  .com-number {
    text-align: center;
  }

  .com-ord-list {
    width: 100%;
  }

  :not(:last-child) .com-ord-list {
    border-bottom: 2px var(--text-color) dashed;
  }
`;
