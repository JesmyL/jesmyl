import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { isMobileDevice } from '#shared/lib/device-differences';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmComLocalListToolsPopup } from '$cm/entities/com';
import { useAuth, useUserInfoDict } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { lazy, Suspense, useState } from 'react';
import {
  checkIsCanRedactScheduleComsList,
  CmComWid,
  IScheduleWidget,
  ScheduleWidgetDayEventMi,
  ScheduleWidgetDayi,
} from 'shared/api';
import { itNIt } from 'shared/utils';

const CmEditorMeetingEventEdits = lazy(() =>
  import('$cm+editor/entities/meeting-event/ui/EventEdits').then(m => ({ default: m.CmEditorMeetingEventEdits })),
);

export const CmMeetingControls = ({
  sch,
  eventMi,
  dayi,
  comws,
}: {
  sch: IScheduleWidget;
  eventMi: ScheduleWidgetDayEventMi;
  dayi: ScheduleWidgetDayi;
  comws: CmComWid[];
}) => {
  const auth = useAuth();
  const { byLogin } = useUserInfoDict();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanReadHistory = checkAccess('cm', 'EVENT', 'R');
  const myUserId = auth.login ? byLogin.get(auth.login)?.id : null;
  const isCanRedactComsList = myUserId != null && checkIsCanRedactScheduleComsList(sch, myUserId, dayi, eventMi);
  const isCanRedactEventComs = checkAccess('cm', 'EVENT', 'U') || isCanRedactComsList;
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {isMobileDevice || !auth.login || (
        <Link
          to="."
          search={prev => ({
            ...(prev as object),
            comw: comws[0],
            eventMi,
            dayi,
            tran: '-!-',
          })}
        >
          <TheIconButton icon="Computer" />
        </Link>
      )}

      <TheIconButton
        icon="MoreVerticalCircle01"
        onClick={() => setIsToolsOpen(itNIt)}
      />

      {isToolsOpen && (
        <BottomPopup onClose={setIsToolsOpen}>
          <CmComLocalListToolsPopup comws={comws}>
            {isCanRedactEventComs && (
              <Suspense>
                <CmEditorMeetingEventEdits
                  comws={comws}
                  dayi={dayi}
                  eventMi={eventMi}
                  schw={sch.w}
                  isCanReadHistory={isCanReadHistory}
                />
              </Suspense>
            )}
          </CmComLocalListToolsPopup>
        </BottomPopup>
      )}
    </div>
  );
};
