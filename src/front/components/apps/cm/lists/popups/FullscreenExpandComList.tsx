import styled from 'styled-components';
import { cmIDB } from '../../_db/cm-idb';
import { RollControled } from '../../base/RolledContent';
import { Com } from '../../col/com/Com';
import { CmComNumber } from '../../col/com/complect/ComNumber';
import { ComOrders } from '../../col/com/orders/ComOrders';

export function FullscreenExpandComList({ coms }: { coms: Com[] }) {
  const fontSize = cmIDB.useValue.comFontSize();

  return (
    <ExpandContent className="com-expand-content full-height">
      <RollControled>
        <div className="inner-content">
          {coms?.map(com => (
            <div key={com.wid}>
              <div className="com-number">#{<CmComNumber comw={com.wid} />}</div>
              <ComOrders
                com={com}
                fontSize={fontSize}
                chordVisibleVariant={2}
                isMiniAnchor={false}
              />
            </div>
          ))}
        </div>
      </RollControled>
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
