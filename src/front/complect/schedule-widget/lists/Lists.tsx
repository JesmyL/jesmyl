import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import useIsExpand from '../../expand/useIsExpand';
import useFullContent from '../../fullscreen-content/useFullContent';
import IconButton from '../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import ScheduleWidgetTeamGames from '../control/games/games/Games';
import ScheduleWidgetRoleList from '../control/roles/RoleList';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetListCategory } from './Category';

export default function ScheduleWidgetLists() {
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
          onSend={() => schListsSokiInvocatorClient.createCategory(null, scheduleScopeProps)}
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
      <IconButton
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
