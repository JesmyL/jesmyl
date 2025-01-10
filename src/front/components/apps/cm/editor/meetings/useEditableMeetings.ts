import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IExportableMeetings } from '../../../../../../shared/api/complect/apps/cm/complect/Meetings';
import { useAtomValue } from '../../../../../complect/atoms';
import { cmMeetingsAtom } from '../../molecules';
import { useEditableComs } from '../col/useEditableCols';
import { EditableMeetings } from './EditableMeetings';

let localMeetings: EditableMeetings | nil;
let localIMeetings: IExportableMeetings | nil;

export function useEditableMeetings() {
  const imeetings = useAtomValue(cmMeetingsAtom);
  const navigate = useNavigate();

  const eventw = +useParams().eventw!;
  const coms = useEditableComs();
  const meetings: EditableMeetings | nil = useMemo(() => {
    if (!coms) return;
    if (localIMeetings && localIMeetings === imeetings) return localMeetings;

    localMeetings = new EditableMeetings(coms, imeetings);
    localIMeetings = imeetings;
    return localMeetings;
  }, [coms, imeetings]);

  return {
    meetings,
    currentEvent: meetings?.events?.find(meeting => meeting.wid === eventw),
    goToEvent: useCallback((eventw: number) => navigate(`/cm/edit/events/${eventw}`), [navigate]),
  };
}
