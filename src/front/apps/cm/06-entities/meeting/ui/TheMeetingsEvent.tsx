import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { isMobileDevice } from '#shared/lib/device-differences';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetWatchLiveBroadcastButton } from '#widgets/schedule/live-broadcast/WatchLiveButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { CmEditorMeetingEventEdits } from '$cm+editor/ext';
import { CmComLocalListToolsPopup, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { indexIDB, useAuth } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { useCmMeetingComFaceList } from '../lib/useMeetingComFaceList';

type Props = Required<ScheduleDayEventPathProps>;

export const CmMeetingEvent = ({ dayi, eventMi, schw }: Props) => {
  const { comFaceListNode, coms, packComws } = useCmMeetingComFaceList({ schw, dayi, eventMi });
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const auth = useAuth();
  const linkToCom = useCmComOpenComLinkRendererContext();
  const checkAccess = useCheckUserAccessRightsInScope();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  if (schedule == null) return;

  const typei = schedule.days[dayi].list.find(event => event.mi === eventMi)?.type ?? -1;

  return (
    <PageContainerConfigurer
      className="meeting-container"
      headTitle={`${schedule.title} - ${schedule.types[typei]?.title ?? ''}`}
      onMoreClick={setIsToolsOpen}
      backButtonRender={(linkRef, children) => (
        <Link
          ref={linkRef}
          to="."
          search={prev => ({
            ...prev,
            dayi: undefined,
            eventMi: undefined,
            attKey: undefined,
          })}
        >
          {children}
        </Link>
      )}
      head={
        <div className="flex gap-3 pr-3">
          {isMobileDevice ? (
            <ScheduleWidgetWatchLiveBroadcastButton schw={schedule.w} />
          ) : auth.login ? (
            linkToCom({
              children: <TheIconButton icon="Computer" />,
              search: {
                comw: coms[0]?.wid,
                tran: '-!-',
              },
            })
          ) : null}
        </div>
      }
      content={
        <>
          {comFaceListNode}
          {isToolsOpen && (
            <BottomPopup onClose={setIsToolsOpen}>
              <CmComLocalListToolsPopup coms={coms}>
                {checkAccess('cm', 'EVENT', 'U') && (
                  <CmEditorMeetingEventEdits
                    packComws={packComws}
                    dayi={dayi}
                    eventMi={eventMi}
                    schw={schw}
                  />
                )}
              </CmComLocalListToolsPopup>
            </BottomPopup>
          )}
        </>
      }
    />
  );
};
