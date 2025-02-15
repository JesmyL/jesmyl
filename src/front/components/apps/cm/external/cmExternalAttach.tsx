import { ScheduleWidgetAppAtts } from 'front/complect/schedule-widget/ScheduleWidget.model';
import { useEffect } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import { CmComBindAttach, scheduleWidgetUserRights, ScheduleWidgetUserRoleRight } from 'shared/api';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconLinkSquare01SolidRounded } from '../../../../complect/the-icon/icons/link-square-01';
import TheMeetingsEvent from '../lists/meetings/TheMeetingsEvent';
import CmExternalComListAtt from './complect/CmExternalComListAtt';

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
              Icon={IconLinkSquare01SolidRounded}
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

const RedactButtonDetector = ({ isRedact, to }: { isRedact: boolean; to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRedact) return;
    navigate(to);
  }, [isRedact, navigate, to]);

  return <></>;
};
