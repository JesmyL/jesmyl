import { ScheduleDayEventPathProps } from '#widgets/schedule/ScheduleWidget.model';
import { CmComWid } from 'shared/api';

export type CmEditorMeetingEventEditProps = Required<ScheduleDayEventPathProps> & { packComws: CmComWid[] };
