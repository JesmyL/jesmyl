import { CmBroadcast } from '$cm/entities/broadcast';
import {
  CmComCurrentComPackContext,
  CmComListContextValue,
  CmComOpenComLinkRendererContext,
  CmComOpenLinkRenderer,
  CmComOpenRouteProps,
  useCmCom,
} from '$cm/entities/com';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { TheCmComComposition } from '$cm/widgets/com';
import { FileRoutesByPath, Link, useSearch } from '@tanstack/react-router';
import { JSX, useEffect } from 'react';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => JSX.Element;
  useComListPack: () => CmComListContextValue;
  BroadcastComponent?: () => JSX.Element;
}

export const makeCmComNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const ComRouteComponent = () => {
    const { comw, tran } = useSearch({ from: props.path }) as CmComOpenRouteProps;
    const com = useCmCom(comw);
    const comList = props.useComListPack();

    useEffect(() => {
      if (comw) cmComLastOpenComwAtom.set(comw);
    }, [comw]);

    return (
      <CmComOpenComLinkRendererContext value={goToComLinkRenderer}>
        <CmComCurrentComPackContext value={comList}>
          {tran ? (
            props.BroadcastComponent ? (
              <props.BroadcastComponent />
            ) : (
              <CmBroadcast />
            )
          ) : com || comw !== undefined ? (
            <TheCmComComposition />
          ) : (
            <props.RouteComponent />
          )}
        </CmComCurrentComPackContext>
      </CmComOpenComLinkRendererContext>
    );
  };

  return {
    ComRouteComponent,
    component: ComRouteComponent,
    validateSearch: (search: PRecord<string, unknown>): CmComOpenRouteProps => {
      return {
        comw: +search.comw! || undefined,
        tran: search.tran != null ? '-!-' : undefined,
      };
    },
  };
};

const goToComLinkRenderer: CmComOpenLinkRenderer = ({ linkRef, children, search }) => {
  return (
    <Link
      ref={linkRef}
      to="."
      search={prev => ({ ...(prev as object), ...(search as object) })}
    >
      {children}
    </Link>
  );
};
