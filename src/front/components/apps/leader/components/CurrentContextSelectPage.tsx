import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { IconCalendar01StrokeRounded } from '../../../../complect/the-icon/icons/calendar-01';
import PhaseLeaderContainer from '../phase-container/PhaseLeaderContainer';
import useLeaderNav from '../useLeaderNav';
import { LeaderContextImportable } from './contexts/Contexts.model';
import useLeaderContext from './contexts/useContexts';

export function CurrentContextSelectPage() {
  const { contexts } = useLeaderContext();

  return <>{!contexts?.list?.length || <CurrentContextSelectPageInner list={contexts.list} />}</>;
}
export function CurrentContextSelectPageInner({ list }: { list: LeaderContextImportable[] }) {
  const { setAppRouteData, nav } = useLeaderNav();

  return (
    <PhaseLeaderContainer
      className="CurrentContextSelectPage"
      withoutBackButton
      headTitle="Выбор контекста"
      content={list.map(context => {
        if (!nav.nav.useIsCanRead?.(context?.w) || !context?.w) return null;
        return (
          <BrutalItem
            key={context.w}
            title={context.name}
            icon={<IconCalendar01StrokeRounded />}
            onClick={() => setAppRouteData({ contextw: context.w })}
          />
        );
      })}
    />
  );
}
