import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import { makeCmEventNestedRoute } from '$cm/shared/lib';
import { Link, useSearch } from '@tanstack/react-router';
import {
  CmComBindAttach,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetUserRoleRight,
  scheduleWidgetUserRights,
} from 'shared/api';
import { extractNumber, sliceStringIfEndsWith } from 'shared/utils';
import { useCmMeetingComwList } from '../meeting/lib/useCmMeetingComwList';
import { CmExternalComListAtt } from './ui/CmExternalComListAtt';

export const cmExternalOwnAppAtts: ScheduleWidgetAppAtts<'cm', CmComBindAttach> = {
  '[cm]:coms': {
    icon: 'Playlist02',
    title: translateBase(it => it.cm.coms),
    description: translateBase(it => it.cm.com.dsc),
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
  RouteComponent: () => <>Error 6517923985</>,
  useComwListPack,
});

function useComwListPack() {
  const { dayi, eventMi, schw } = useSearch({ from: path });
  return useCmMeetingComwList({ dayi, eventMi, schw: extractNumber(schw!) }).s;
}

function useActionPanelNode(
  scopeProps: ScheduleDayEventAttachmentScopeProps,
  _editIconNode: React.ReactNode,
  isCanRedact: boolean,
) {
  const appName = useAppNameContext();

  return (
    <Link
      to={sliceStringIfEndsWith(path, '/')}
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
