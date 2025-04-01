import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useFullContent } from '#shared/ui/fullscreen-content/useFullContent';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { ScheduleWidgetTeamGames } from '../control/games/games/Games';
import { ScheduleWidgetRoleList } from '../control/roles/RoleList';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetListCategory } from './Category';

export function ScheduleWidgetLists() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const [listsTitle, isExpand] = useIsExpand(
    true,
    'Списки',
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact && (
        <TheIconSendButton
          icon="PlusSign"
          prefix="список"
          confirm="Создать новый список?"
          onSend={() => schListsSokiInvocatorClient.createCategory({ props: scheduleScopeProps })}
        />
      ),
  );

  const [modalNode, screen] = useFullContent(() => {
    return (
      <>
        <h3 className="flex flex-gap">{listsTitle}</h3>
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
        {rights.isCanRedact && <ScheduleWidgetRoleList />}
        {rights.isCanRedact && <ScheduleWidgetTeamGames />}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <TheIconButton
        icon="LeftToRightListBullet"
        postfix={
          <>
            Списки <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={() => screen()}
        className="margin-gap-v flex-max"
      />
    </>
  );
}
