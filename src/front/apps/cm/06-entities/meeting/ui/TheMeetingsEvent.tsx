import { isMobileDevice } from '#shared/lib/device-differences';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetWatchLiveTranslationButton } from '#widgets/schedule/live-translations/WatchLiveButton';
import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { CmMeetingEventEdits } from '$cm+editor/entities/meetings/EventEdits';
import { useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { useAuth } from '$index/atoms';
import { indexIDB } from '$index/db/index-idb';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCmMeetingComFaceList } from '../lib/useMeetingComFaceList';

type Props = Required<ScheduleDayEventPathProps>;

export const CmMeetingEvent = ({ dayi, eventMi, schw }: Props) => {
  const { comFaceListNode, coms, packComws } = useCmMeetingComFaceList({ schw, dayi, eventMi });
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const auth = useAuth();
  const linkToCom = useCmComOpenComLinkRendererContext();
  const checkAccess = useCheckUserAccessRightsInScope();

  if (schedule == null) return;

  const typei = schedule.days[dayi].list.find(event => event.mi === eventMi)?.type ?? -1;

  return (
    <PageContainerConfigurer
      className="meeting-container"
      headTitle={`${schedule.title} - ${schedule.types[typei]?.title ?? ''}`}
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
            <ScheduleWidgetWatchLiveTranslationButton schw={schedule.w} />
          ) : auth.level ? (
            linkToCom({
              children: <TheIconButton icon="Computer" />,
              search: {
                comw: coms[0]?.wid,
                tran: '-!-',
              },
            })
          ) : null}
          {checkAccess('cm', 'EVENT', 'U') && (
            <CmMeetingEventEdits
              packComws={packComws}
              dayi={dayi}
              eventMi={eventMi}
              schw={schw}
            />
          )}
        </div>
      }
      content={comFaceListNode}
    />
  );
};
