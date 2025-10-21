import { useAppNameContext } from '#basis/state/contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import { makeCmEventNestedRoute } from '$cm/shared/lib';
import { Link, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  CmComBindAttach,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetUserRoleRight,
  scheduleWidgetUserRights,
} from 'shared/api';
import { useCmMeetingComFaceList } from '../meeting/lib/useMeetingComFaceList';
import { CmExternalComListAtt } from './ui/CmExternalComListAtt';

export const cmExternalOwnAppAtts: ScheduleWidgetAppAtts<'cm', CmComBindAttach> = {
  '[cm]:coms': {
    icon: 'Playlist02',
    title: 'Песни',
    description: 'Список известных песен',
    initVal: {},
    R: ScheduleWidgetUserRoleRight.Free,
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    useActionPanelNode,
    result: (_value, scopeProps, _isRedact, _switchIsRedact) => {
      return (
        <>
          <CmExternalComListAtt scopeProps={scopeProps} />
        </>
      );
    },
    ExtRoute: _props => route && <route.ComRouteComponent />,
  },
};

const path = '/!other/$appName/schs/';

const route = makeCmEventNestedRoute({
  path,
  RouteComponent: () => <>Ошибка 6517923985</>,
  useComListPack,
});

function useComListPack() {
  const { dayi, eventMi, schw } = useSearch({ from: path });
  const { coms } = useCmMeetingComFaceList({ dayi, eventMi, schw: +schw! });

  return useMemo(() => ({ list: coms }), [coms]);
}

function useActionPanelNode(
  scopeProps: ScheduleDayEventAttachmentScopeProps,
  _editIconNode: React.ReactNode,
  isCanRedact: boolean,
) {
  const appName = useAppNameContext();

  return (
    <Link
      to="/!other/$appName/schs"
      params={{ appName }}
      search={{
        dayi: scopeProps.dayi,
        eventMi: scopeProps.eventMi,
        attKey: '[cm]:coms',
        schw: scopeProps.schw,
      }}
    >
      {isCanRedact ? <LazyIcon icon="Edit02" /> : <LazyIcon icon="LinkSquare01" />}
    </Link>
  );
}
