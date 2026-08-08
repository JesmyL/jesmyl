import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { WithHook } from '#shared/ui/WithHook';
import { cmComCommentCurrentComw2OpenAltiDictAtom } from '$cm/entities/com-comment';
import { CmComOrderList } from '$cm/entities/com-order';
import { TheCmComWithComments } from '$cm/widgets/com';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { IExportableCom } from 'shared/api';
import { useCmCom } from '../lib/com-selections';
import { cmComChordHardLevelAtom, cmComSpeedRollKfAtom } from '../state/atoms';
import { CmComNumber } from './ComNumber';

export function CmComFullscreenExpandList({ icoms }: { icoms: IExportableCom[] }) {
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);

  return (
    <ExpandContent className="com-expand-content h-full">
      <RolledContent speedKfAtom={cmComSpeedRollKfAtom}>
        <div className="inner-content">
          {icoms?.map(icom => {
            return (
              <WithHook
                key={icom.w}
                hook={useCmCom}
                args={[icom.w]}
              >
                {com =>
                  com && (
                    <>
                      <div className="com-number">#{<CmComNumber comw={icom.w} />}</div>
                      <div className="uppercase">{altCommentKeys[icom.w] ?? altCommentKeys.lasti}</div>
                      <TheCmComWithComments com={com}>
                        <CmComOrderList
                          com={com}
                          fontSize={-1}
                          chordVisibleVariant={2}
                          isMiniAnchor={false}
                          chordHardLevel={chordHardLevel}
                        />
                      </TheCmComWithComments>
                    </>
                  )
                }
              </WithHook>
            );
          })}
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
