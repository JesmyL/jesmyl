import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';

import { useAppNameContext } from '#basis/lib/contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { makeCmEventNestedRoute } from '$cm/basis/lib/cmEventNestedRouteMaker';
import { useMeetingComFaceList } from '$cm/lists/meetings/useMeetingComFaceList';
import { Link, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  CmComBindAttach,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetUserRoleRight,
  scheduleWidgetUserRights,
} from 'shared/api';
import { CmExternalComListAtt } from './ui/CmExternalComListAtt';

export const cmOwnAppAtts: ScheduleWidgetAppAtts<'cm', CmComBindAttach> = {
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
    ExtRoute: props => route && <route.ComRouteComponent />,
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
  const { coms } = useMeetingComFaceList({ dayi, eventMi, schw: +schw! });

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
