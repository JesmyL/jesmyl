import { IconButton } from '#shared/ui/the-icon/IconButton';
import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import { TheMeetingsEvent } from '@cm/lists/meetings/TheMeetingsEvent';
import { Link, Route } from 'react-router-dom';
import { CmComBindAttach, ScheduleWidgetUserRoleRight, scheduleWidgetUserRights } from 'shared/api';
import { CmExternalComListAtt } from './ui/CmExternalComListAtt';
import { RedactButtonDetector } from './ui/RedactButtonDetector';

export const cmOwnAppAtts: ScheduleWidgetAppAtts<'cm', CmComBindAttach> = {
  '[cm]:coms': {
    icon: 'Playlist02',
    title: 'Песни',
    description: 'Список известных песен',
    initVal: {},
    R: ScheduleWidgetUserRoleRight.Free,
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    result: (_value, scopeProps, isRedact, _switchIsRedact) => {
      const { dayi, eventMi } = scopeProps;
      const listPath = `${dayi}/${eventMi}/-/com-list`;

      return (
        <>
          <RedactButtonDetector
            isRedact={isRedact}
            to={listPath}
          />
          <Link to={listPath}>
            <IconButton
              icon="LinkSquare01"
              postfix="Открыть список"
              className="margin-big-gap"
            />
          </Link>
          <CmExternalComListAtt
            scopeProps={scopeProps}
            listPath={listPath}
          />
        </>
      );
    },
    routes: (
      <>
        <Route
          path=":dayi/:eventMi/:attMi/com-list/*"
          element={<TheMeetingsEvent />}
        />
      </>
    ),
  },
};
