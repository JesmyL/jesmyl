import { MyLib } from '#shared/lib/my-lib';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { itNNull } from 'shared/utils';

export const useSearches = <Params extends Record<string, string | und>>() => {
  const [searchParams, set] = useSearchParams();

  return [
    useMemo(() => {
      const params: Record<string, string> = {};
      const keys = Array.from(searchParams.keys());

      for (const paramKey of keys) {
        const param = searchParams.get(paramKey);
        if (param == null) continue;

        params[paramKey] = decodeURIComponent(param);
      }

      return params;
    }, [searchParams]),
    set,
    useCallback((params: Partial<Params>) => {
      return MyLib.keys(params)
        .map(key =>
          params[key as never] == null
            ? null
            : `${encodeURIComponent(key as never)}=${encodeURIComponent(params[key as never] as never)}`,
        )
        .filter(itNNull)
        .join('&');
    }, []),
  ] as never as [
    Partial<Params>,
    (nextInit: Partial<Params> | ((set: Partial<Params>) => Partial<Params>)) => void,
    (params: Partial<Params>) => string,
  ];
};
