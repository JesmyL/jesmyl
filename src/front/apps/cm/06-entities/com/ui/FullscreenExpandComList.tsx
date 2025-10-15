import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { CmComOrderList } from '$cm/entities/com-order';
import { useAtomValue } from 'atomaric';
import styled from 'styled-components';
import { CmCom } from '../lib/Com';
import { cmComFontSizeAtom, cmComSpeedRollKfAtom } from '../state/atoms';
import { CmComNumber } from './ComNumber';

export function CmComFullscreenExpandList({ coms }: { coms: CmCom[] }) {
  const fontSize = useAtomValue(cmComFontSizeAtom);

  return (
    <ExpandContent className="com-expand-content h-full">
      <RolledContent speedKfAtom={cmComSpeedRollKfAtom}>
        <div className="inner-content">
          {coms?.map(com => (
            <div key={com.wid}>
              <div className="com-number">#{<CmComNumber comw={com.wid} />}</div>
              <CmComOrderList
                com={com}
                fontSize={fontSize}
                chordVisibleVariant={2}
                isMiniAnchor={false}
              />
            </div>
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
