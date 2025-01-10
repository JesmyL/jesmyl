import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from '../../../../../complect/atoms';
import { useComs } from '../../cols/useCols';
import { cmMeetingsAtom } from '../../molecules';
import { Meetings } from './Meetings';
import { MeetingsEvent } from './MeetingsEvent';

export function useMeetings(): {
  meetings: Meetings | undefined;
  currentEvent: MeetingsEvent | undefined;
} {
  const imeetings = useAtomValue(cmMeetingsAtom);
  const eventw = +useParams().eventw!;
  const coms = useComs();
  const meetings = useMemo(() => coms && new Meetings(imeetings, coms), [coms, imeetings]);

  return {
    meetings,
    currentEvent: meetings?.events?.find(meeting => meeting.wid === eventw),
  };
}
