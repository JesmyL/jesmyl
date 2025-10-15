import {
  CmComCurrentComPackContext,
  CmComCurrentContext,
  CmComListContextValue,
  CmComOpenComLinkRendererContext,
  CmComOpenLinkRenderer,
  CmComOpenRouteProps,
  useCmCom,
} from '$cm/entities/com';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { CmTranslation } from '$cm/entities/translation';
import { TheCmComComposition } from '$cm/widgets/com';
import { FileRoutesByPath, Link, useSearch } from '@tanstack/react-router';
import { JSX, useEffect } from 'react';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => JSX.Element;
  useComListPack: () => CmComListContextValue;
  TranslationComponent?: () => JSX.Element;
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
          <CmComCurrentContext value={com}>
            {tran ? (
              props.TranslationComponent ? (
                <props.TranslationComponent />
              ) : (
                <CmTranslation />
              )
            ) : com || comw !== undefined ? (
              <TheCmComComposition />
            ) : (
              <props.RouteComponent />
            )}
          </CmComCurrentContext>
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
