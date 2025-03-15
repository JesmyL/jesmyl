import { contextCreator } from '#shared/lib/contextCreator';
import { CmMeetingToEventLinkRender } from '$cm/basis/model/meetings';
import { retNull } from 'shared/utils';

export const [CmMeetingLinkToEvent, useCmMeetingLinkToEvent] = contextCreator<CmMeetingToEventLinkRender>(retNull);
