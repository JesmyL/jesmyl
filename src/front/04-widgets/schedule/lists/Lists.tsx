import { schListsSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { FullScreenContent } from '#shared/ui/fullscreen-content';
import useIsExpand from 'front/08-shared/ui/expand/useIsExpand';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import ScheduleWidgetTeamGames from '../control/games/games/Games';
import ScheduleWidgetRoleList from '../control/roles/RoleList';
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
  const [isOpenList, setIsOpenList] = useState<unknown>(false);

  return (
    <>
      <IconButton
        icon="LeftToRightListBullet"
        postfix={
          <>
            Списки <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={setIsOpenList}
        className="margin-gap-v flex-max"
      />

      {isOpenList && (
        <FullScreenContent onClose={setIsOpenList}>
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
        </FullScreenContent>
      )}
    </>
  );
}
