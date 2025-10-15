import { contextCreator } from '#shared/lib/contextCreator';
import { retNull } from 'shared/utils';
import { CmMeetingToEventLinkRender } from '../model/meetings';

export const [CmMeetingLinkToEvent, useCmMeetingLinkToEvent] = contextCreator<CmMeetingToEventLinkRender>(retNull);
