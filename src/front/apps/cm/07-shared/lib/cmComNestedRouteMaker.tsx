import { CmBroadcast } from '$cm/entities/broadcast';
import {
  CmComCurrentComPackContext,
  CmComListContextValue,
  CmComOpenComLinkRendererContext,
  CmComOpenLinkRenderer,
  CmComOpenRouteProps,
  CmComWithComListSearchFilterInput,
  CmComWithSearchedWords,
  useCmCom,
} from '$cm/entities/com';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { TheCmComComposition } from '$cm/widgets/com';
import { FileRoutesByPath, Link, useParams, useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { JSX, useEffect } from 'react';
import { CmCatWid } from 'shared/api';
import { CmComInScheduleWid } from '../state/contexts';
import { takeCatTermAtom } from './Cat';
import { CmCom } from './Com';

interface Props<Path extends keyof FileRoutesByPath> {
  path: Path;
  RouteComponent: () => JSX.Element;
  useComListPack: () => CmComListContextValue;
  BroadcastComponent?: () => JSX.Element;
}

export const makeCmComNestedRoute = <Path extends keyof FileRoutesByPath>(props: Props<Path>) => {
  const ComRouteComponent = () => {
    const { comw, tran, schw } = useSearch({ from: props.path }) as CmComOpenRouteProps;
    const { catw } = useParams({ from: props.path }) as { catw?: string };
    const com = useCmCom(comw);
    const comList = props.useComListPack();
    const termAtom = takeCatTermAtom(catw ? +catw : CmCatWid.all);
    const term = useAtomValue(termAtom);

    useEffect(() => {
      if (comw) cmComLastOpenComwAtom.set(comw);
    }, [comw]);

    const render = (node: React.ReactNode) =>
      comw != null && term && !schw ? (
        <CmComWithComListSearchFilterInput
          Constructor={CmCom}
          coms={comList.list}
          termAtom={termAtom}
        >
          {({ searchedComs, wordFounds }) =>
            wordFounds[comw] ? (
              <CmComWithSearchedWords wordFounds={wordFounds[comw]}>
                <CmComCurrentComPackContext value={{ ...comList, list: searchedComs }}>
                  {node}
                </CmComCurrentComPackContext>
              </CmComWithSearchedWords>
            ) : (
              <CmComCurrentComPackContext value={comList}>{node}</CmComCurrentComPackContext>
            )
          }
        </CmComWithComListSearchFilterInput>
      ) : (
        <CmComCurrentComPackContext value={comList}>{node}</CmComCurrentComPackContext>
      );

    return (
      <CmComOpenComLinkRendererContext value={goToComLinkRenderer}>
        <CmComInScheduleWid value={schw}>
          {tran ? (
            props.BroadcastComponent ? (
              render(<props.BroadcastComponent />)
            ) : (
              render(<CmBroadcast />)
            )
          ) : com || comw !== undefined ? (
            render(<TheCmComComposition />)
          ) : (
            <props.RouteComponent />
          )}
        </CmComInScheduleWid>
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
