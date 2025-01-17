import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IconArrowRight01StrokeRounded } from '../../../complect/the-icon/icons/arrow-right-01';
import { IconLeftToRightListBulletStrokeRounded } from '../../../complect/the-icon/icons/left-to-right-list-bullet';
import { IconPlusSignStrokeRounded } from '../../../complect/the-icon/icons/plus-sign';
import useIsExpand from '../../expand/useIsExpand';
import useFullContent from '../../fullscreen-content/useFullContent';
import IconButton from '../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/useScheduleScopePropsContext';
import ScheduleWidgetTeamGames from '../control/games/games/Games';
import ScheduleWidgetRoleList from '../control/roles/RoleList';
import { schSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetListCategory } from './Category';

export default function ScheduleWidgetLists({ scheduleScope }: { scheduleScope: string }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const [listsTitle, isExpand] = useIsExpand(
    true,
    'Списки',
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact && (
        <EvaSendButton
          Icon={IconPlusSignStrokeRounded}
          prefix="список"
          confirm="Создать новый список?"
          onSend={() => schSokiInvocatorClient.createListCategory(null, scheduleScopeProps)}
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
        {rights.isCanRedact && <ScheduleWidgetTeamGames scope={scheduleScope} />}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconLeftToRightListBulletStrokeRounded}
        postfix={
          <>
            Списки <IconArrowRight01StrokeRounded />
          </>
        }
        onClick={() => screen()}
        className="margin-gap-v flex-max"
      />
    </>
  );
}
