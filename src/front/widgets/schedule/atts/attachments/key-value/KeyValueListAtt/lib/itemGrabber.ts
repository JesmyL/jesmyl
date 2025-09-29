import { makeElementGrabber } from '#shared/ui/ElementGrabber';
import { atom } from 'atomaric';

export const ScheduleWidgetKeyValueItemGrabber = makeElementGrabber(atom<number | null>(null));
