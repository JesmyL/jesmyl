import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { useFullContent } from '#shared/ui/fullscreen-content/useFullContent';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
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
    'Списки',
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact && (
        <TheIconSendButton
          icon="PlusSign"
          prefix="список"
          confirm="Создать новый список?"
          onSend={() => schListsTsjrpcClient.createCategory({ props: scheduleScopeProps })}
        />
      ),
  );

  const [modalNode, screen] = useFullContent(() => {
    return (
      <>
        <h3 className="flex gap-2">{listsTitle}</h3>
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
        className="my-2 flex-max"
      />
    </>
  );
}
