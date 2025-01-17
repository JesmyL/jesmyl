import { ScheduleWidgetAppAtts } from 'front/complect/schedule-widget/ScheduleWidget.model';
import React, { Suspense } from 'react';
import { Link, Route } from 'react-router-dom';
import { CmComBindAttach, scheduleWidgetUserRights, ScheduleWidgetUserRoleRight } from 'shared/api';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconLinkSquare01SolidRounded } from '../../../../complect/the-icon/icons/link-square-01';
import CmExternalComListAtt from './complect/CmExternalComListAtt';

const TgDayEventComList = React.lazy(() => import('./complect/TgDayEventComList'));

export const cmOwnAppAtts: ScheduleWidgetAppAtts<'cm', CmComBindAttach> = {
  '[cm]:coms': {
    icon: 'Playlist02',
    title: 'Песни',
    description: 'Список известных песен',
    initVal: {},
    R: ScheduleWidgetUserRoleRight.Free,
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    result: (value, scope, isRedact, switchIsRedact) => {
      const { dayi, eventMi, attKey } = scope;
      const [, , attMi] = attKey.split(':');
      const listPath = `${dayi}/${eventMi}/${attMi || '-'}/com-list`;

      return (
        <>
          <Link to={listPath}>
            <IconButton
              Icon={IconLinkSquare01SolidRounded}
              postfix="Открыть список"
              className="margin-big-gap"
            />
          </Link>
          <CmExternalComListAtt
            switchIsRedact={switchIsRedact}
            isRedact={isRedact}
            value={value}
            listPath={listPath}
          />
        </>
      );
    },
    routes: (
      <>
        <Route
          path=":dayi/:eventMi/:attMi/com-list/*"
          element={
            <Suspense>
              <TgDayEventComList />
            </Suspense>
          }
        />
      </>
    ),
  },
};
