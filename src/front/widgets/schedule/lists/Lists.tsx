import { translateBase } from '#basis/locale';
import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useFullContent } from '#shared/ui/fullscreen-content/useFullContent';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import styled from '@emotion/styled';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetTeamGames } from '../control/games/games/Games';
import { ScheduleWidgetRoleList } from '../control/roles/RoleList';
import { schListsTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetListCategory } from './Category';

export function ScheduleWidgetLists() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const [listsTitle, isExpand] = useIsExpand(
    true,
    translateBase(BaseLocaleKey.Lists),
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact && (
        <TheIconSendButton
          icon="PlusSign"
          prefix={translateBase(BaseLocaleKey.ScheduleListLower)}
          confirm={translateBase(BaseLocaleKey.ScheduleAddListConfirm)}
          onSend={() => schListsTsjrpcClient.createCategory({ props: scheduleScopeProps })}
        />
      ),
  );

  const [modalNode, screen] = useFullContent(() => {
    return (
      <StyledListsBoard>
        <div className="flex items-center gap-3 mb-5">
          <span className="grid place-items-center size-12 rounded-2xl bg-x4/20 text-xOK ring-1 ring-xOK/30">
            <LazyIcon
              icon="LeftToRightListBullet"
              className="text-2xl"
            />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[0.65rem] uppercase tracking-[0.22em] text-x7">
              {translateBase(BaseLocaleKey.ScheduleList)}
            </span>
            <h3 className="text-xl font-black tracking-tight leading-tight">{listsTitle}</h3>
          </div>
          <span className="ml-auto text-sm tabular-nums text-x7">{rights.schedule.lists.cats.length}</span>
        </div>

        {isExpand &&
          rights.schedule.lists.cats.map((cat, cati) => {
            return (
              <ScheduleWidgetListCategory
                key={cati}
                cat={cat}
                cati={cati}
              />
            );
          })}

        {rights.isCanRedact && (
          <div className="mt-7 pt-5 border-t border-x4/30">
            <ScheduleWidgetRoleList />
            <ScheduleWidgetTeamGames />
          </div>
        )}
      </StyledListsBoard>
    );
  });

  return (
    <>
      {modalNode}
      <TheIconButton
        icon="LeftToRightListBullet"
        postfix={
          <>
            {translateBase(BaseLocaleKey.Lists)} <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={() => screen()}
        className="my-2 flex-max"
      />
    </>
  );
}

const StyledListsBoard = styled.div`
  min-height: 100%;
  padding: 1rem 1rem 5rem;
  background:
    radial-gradient(120% 60% at 6% -8%, color-mix(in oklab, var(--color--4) 30%, transparent), transparent 62%),
    linear-gradient(180deg, var(--color--1), var(--color--2) 55%, var(--color--1));

  @keyframes sch-lists-rise {
    from {
      opacity: 0;
      transform: translateY(9px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sch-lists-card {
    animation: sch-lists-rise 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .sch-lists-card {
      animation: none;
    }
  }
`;
