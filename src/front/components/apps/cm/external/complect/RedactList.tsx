import { useState } from 'react';
import { CmComBindAttach, CmComWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { IconArrangeStrokeRounded } from '../../../../../complect/the-icon/icons/arrange';
import { IconCalendar03StrokeRounded } from '../../../../../complect/the-icon/icons/calendar-03';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { CmComListSearchFilterInput } from '../../complect/ComListSearchFilterInput';
import { EditableCom } from '../../editor/col/compositions/com/EditableCom';
import MeetingsInner from '../../lists/meetings/MeetingsInner';
import { useMeetings } from '../../lists/meetings/useMeetings';
import CmExternalComListAttRedactListOrder from './RedactListOrder';

interface Props {
  value: CmComBindAttach;
  scope: string;
  setComw: (comw: CmComWid) => void;
  setIsOpenComposition: (isOpen: boolean) => void;
}

export default function CmExternalComListAttRedactList({
  value,
  scope,
  setComw: setCcomw,
  setIsOpenComposition,
}: Props) {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isMeetingBinderOpen, setIsMeetingBinderOpen] = useState(false);
  const { meetings } = useMeetings();
  const currentEvent = value.eventw == null ? null : meetings?.stack?.find(event => event.w === value.eventw!);
  const [coms, setComs] = useState<Com[]>([]);

  return (
    <>
      <div className="flex column full-height">
        <div className="flex around full-width margin-big-gap-v">
          <IconButton
            Icon={IconCalendar03StrokeRounded}
            postfix={
              <div className="flex column">
                <div>Событие</div>
                {<div className="fade-07">{currentEvent?.n}</div>}
              </div>
            }
            onClick={() => setIsMeetingBinderOpen(true)}
          />
          <IconButton
            Icon={IconArrangeStrokeRounded}
            postfix="Порядок песен"
            disabled={!value.comws || value.comws.length < 2}
            onClick={() => setIsOrderOpen(true)}
          />
        </div>

        <CmComListSearchFilterInput
          Constructor={EditableCom}
          onSearch={setComs}
        />
        <div className="margin-gap-t full-height full-width over-y-auto">
          <ComFaceList
            list={coms}
            importantOnClick={com => {
              setCcomw(com.wid);
              setIsOpenComposition(true);
            }}
            // comDescription={com => {
            //   return value.comws?.includes(com.wid) ? (
            //     <StrongEvaButton
            //       fieldName="listKey"
            //       fieldKey="comws"
            //       fieldValue={['.', '===', com.wid]}
            //       cud="D"
            //       Icon={IconMinusSignSquareStrokeRounded}
            //       className="color--ko"
            //     />
            //   ) : (
            //     <StrongEvaButton
            //       scope={scope}
            //       fieldName="listKey"
            //       fieldKey="comws"
            //       fieldValue={com.wid}
            //       cud="C"
            //       Icon={IconPlusSignCircleStrokeRounded}
            //     />
            //   );
            // }}
          />
        </div>
      </div>

      {isMeetingBinderOpen && meetings && (
        <FullContent onClose={setIsMeetingBinderOpen}>
          <MeetingsInner
            meetings={meetings}
            onEventClick={emptyFunc}
            // asEventBox={event =>
            //   value.eventw === event.wid ? (
            //     <StrongEvaButton
            //       scope={scope}
            //       fieldName="singleKey"
            //       fieldKey="eventw"
            //       cud="D"
            //       Icon={IconCheckmarkSquare02StrokeRounded}
            //     />
            //   ) : (
            //     <StrongEvaButton
            //       scope={scope}
            //       fieldName="singleKey"
            //       fieldKey="eventw"
            //       fieldValue={event.wid}
            //       cud="U"
            //       Icon={IconSquareStrokeRounded}
            //     />
            //   )
            // }
          />
        </FullContent>
      )}

      {isOrderOpen && (
        <FullContent onClose={setIsOrderOpen}>
          <CmExternalComListAttRedactListOrder
            scope={scope}
            value={value}
            setCcomw={setCcomw}
          />
        </FullContent>
      )}
    </>
  );
}
