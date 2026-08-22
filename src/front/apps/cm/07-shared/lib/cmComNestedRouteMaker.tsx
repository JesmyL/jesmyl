import { metronomeCurrentBpmAtom, metronomeCurrentMeterSizeAtom } from '#widgets/metronome/lib/atoms';
import { CmBroadcast } from '$cm/entities/broadcast';
import {
  CmComCurrentComPackContext,
  cmComLastOpenComwAtom,
  cmComLastOpenSchwAtom,
  CmComOpenRouteProps,
  CmComWithComListSearchFilterInput,
  CmComWithSearchedWords,
  useCmCom,
} from '$cm/entities/com';
import { TheCmComComposition } from '$cm/widgets/com';
import { FileRoutesByPath, useParams, useSearch } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { JSX, useEffect } from 'react';
import { CmCatWid, CmComWid } from 'shared/api';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { takeCatTermAtom } from './Cat';

interface Props<Path extends keyof FileRoutesByPath> {
  isIgnoreSearch?: boolean;
  path: Path;
  RouteComponent: () => JSX.Element;
  useComwList: () => CmComWid[];
  BroadcastComponent?: () => JSX.Element;
}

let emptyTextAtom;

export const makeCmComNestedRoute = <Path extends keyof FileRoutesByPath>({
  RouteComponent,
  path,
  useComwList,
  BroadcastComponent,
  isIgnoreSearch,
}: Props<Path>) => {
  const ComRouteComponent = () => {
    const { comw, tran, schw } = useSearch({ from: path }) as CmComOpenRouteProps;
    const { catw } = useParams({ from: path }) as { catw?: string };
    const com = useCmCom(comw, schw);
    const comws = useComwList();
    const termAtom = isIgnoreSearch ? takeCatTermAtom(catw ? +catw : CmCatWid.all) : (emptyTextAtom ??= atom(''));
    const term = useAtomValue(termAtom);
    const meterSize = com?.meterSize ?? CmComMetricNum.Four;
    const beatsPerMinute = takeCorrectMetronomeBpm(com?.beatsPerMinute);

    useEffect(() => {
      if (comw) cmComLastOpenComwAtom.set(comw);
      if (schw) cmComLastOpenSchwAtom.set(schw);

      metronomeCurrentMeterSizeAtom.set(meterSize);
      metronomeCurrentBpmAtom.set(beatsPerMinute);

      return () => cmComLastOpenSchwAtom.set(null);
    }, [beatsPerMinute, comw, meterSize, schw]);

    const render = (node: React.ReactNode) =>
      comw != null && term && !schw ? (
        <CmComWithComListSearchFilterInput
          comws={comws}
          termAtom={termAtom}
        >
          {({ searchedComs, wordFounds }) => (
            <CmComCurrentComPackContext value={{ comws: searchedComs }}>
              {wordFounds[comw] ? (
                <CmComWithSearchedWords wordFounds={wordFounds[comw]}>{node}</CmComWithSearchedWords>
              ) : (
                node
              )}
            </CmComCurrentComPackContext>
          )}
        </CmComWithComListSearchFilterInput>
      ) : (
        <CmComCurrentComPackContext value={{ comws }}>{node}</CmComCurrentComPackContext>
      );

    return tran ? (
      BroadcastComponent ? (
        render(<BroadcastComponent />)
      ) : (
        render(<CmBroadcast />)
      )
    ) : com || comw != null ? (
      render(<TheCmComComposition />)
    ) : (
      <RouteComponent />
    );
  };

  return {
    ComRouteComponent,
    component: ComRouteComponent,
    validateSearch: (search: PRecord<string, unknown>): CmComOpenRouteProps => ({
      comw: (+search.comw! as CmComWid) || undefined,
      tran: checkIsNotNil(search.tran) ? '-!-' : undefined,
    }),
  };
};
