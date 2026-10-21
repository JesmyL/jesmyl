import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { isMobileDevice } from '#shared/lib/device-differences';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmComLocalListToolsPopup } from '$cm/entities/com';
import { useAuth } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { lazy, Suspense, useState } from 'react';
import { CmComWid, ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { itNIt } from 'shared/utils';

const CmEditorMeetingEventEdits = lazy(() =>
  import('$cm+editor/entities/meeting-event/ui/EventEdits').then(m => ({ default: m.CmEditorMeetingEventEdits })),
);

export const CmMeetingControls = ({
  eventMi,
  dayi,
  comws,
  schw,
}: {
  schw: ScheduleWidgetWid;
  eventMi: ScheduleWidgetDayEventMi;
  dayi: ScheduleWidgetDayi;
  comws: CmComWid[];
}) => {
  const auth = useAuth();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanUpdateEvent = checkAccess('cm', 'EVENT', 'U');
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
            {isCanUpdateEvent && (
              <Suspense>
                <CmEditorMeetingEventEdits
                  comws={comws}
                  dayi={dayi}
                  eventMi={eventMi}
                  schw={schw}
                />
              </Suspense>
            )}
          </CmComLocalListToolsPopup>
        </BottomPopup>
      )}
    </div>
  );
};
