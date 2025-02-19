import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { IconButton, LazyIcon } from '#shared/ui/icon';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { useState } from 'react';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { ScheduleWidgetTeamGames } from '../control/games/games/Games';
import { ScheduleWidgetRoleList } from '../control/roles/RoleList';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetListCategory } from './Category';

export const ScheduleWidgetLists = () => {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const [isOpenFull, setIsOpenFull] = useState<unknown>(false);

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

  return (
    <>
      <IconButton
        icon="LeftToRightListBullet"
        postfix={
          <>
            Списки <LazyIcon icon="ArrowRight01" />
          </>
        }
        onClick={setIsOpenFull}
        className="margin-gap-v flex-max"
      />
      {isOpenFull && (
        <FullContent onClose={setIsOpenFull}>
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
        </FullContent>
      )}
    </>
  );
};
