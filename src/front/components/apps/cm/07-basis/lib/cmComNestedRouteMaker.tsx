import { TheComposition } from '$cm/col/com/TheComposition';
import { CmTranslations } from '$cm/translation/Translation';
import { FileRoutesByPath, Link, useSearch } from '@tanstack/react-router';
import { JSX, useEffect } from 'react';
import { CmComOpenRouteProps, CmOpenComLinkRenderer } from '../model/com';
import { CmCurrentComContext, useCom } from './com-selections';
import {
  CmComListContextValue,
  CmCurrentComPackContext,
  CmOpenComLinkRendererContext,
} from './contexts/current-com-list';
import { cmLastOpenComwAtom } from './store/atoms';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => JSX.Element;
  useComListPack: () => CmComListContextValue;
  TranslationComponent?: () => JSX.Element;
}

export const makeCmComNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const ComRouteComponent = () => {
    const { comw, tran } = useSearch({ from: props.path }) as CmComOpenRouteProps;
    const com = useCom(comw);
    const comList = props.useComListPack();

    useEffect(() => {
      if (comw) cmLastOpenComwAtom.set(comw);
    }, [comw]);

    return (
      <CmOpenComLinkRendererContext.Provider value={goToComLinkRenderer}>
        <CmCurrentComPackContext.Provider value={comList}>
          <CmCurrentComContext.Provider value={com}>
            {tran ? (
              props.TranslationComponent ? (
                <props.TranslationComponent />
              ) : (
                <CmTranslations />
              )
            ) : com || comw !== undefined ? (
              <TheComposition />
            ) : (
              <props.RouteComponent />
            )}
          </CmCurrentComContext.Provider>
        </CmCurrentComPackContext.Provider>
      </CmOpenComLinkRendererContext.Provider>
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

const goToComLinkRenderer: CmOpenComLinkRenderer = ({ linkRef, children, search }) => {
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
