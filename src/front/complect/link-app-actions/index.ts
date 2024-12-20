import { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SokiAppName } from 'shared/api';
import { atom, useAtomValue } from '../atoms';
import { MyLib } from '../my-lib';
import { useActualRef } from '../useActualRef';

export type LinkActionEvent<Props extends Record<string, unknown> = Record<string, unknown>> = {
  appName: SokiAppName;
  props: Props;
  navigate: NavigateFunction;
};

const searchParamName = 'appAction';
const actonAtom = atom<LinkActionEvent | null>(null);

const useOnAction = (cb: (props: unknown) => void) => {
  const props = useAtomValue(actonAtom);
  const cbActualRef = useActualRef(cb);

  useEffect(() => {
    if (props === null) return;

    cbActualRef.current(props as never);
  }, [cbActualRef, props]);
};

export class LinkAppActionFabric<Props extends Record<string, unknown> = Record<string, unknown>> {
  constructor(private appName: SokiAppName) {}

  useOnAction = useOnAction as (cb: (props: LinkActionEvent<Props>) => void) => void;

  makeLink(props: Props) {
    const url = new URL(window.location.origin);
    url.searchParams.set(searchParamName, this.appName);
    MyLib.keys(props).forEach(key => url.searchParams.set(key, JSON.stringify(props[key])));
    return url.toString();
  }

  static onHrefData(navigate: NavigateFunction, href: string) {
    try {
      const url = new URL(href);
      const appName = url.searchParams.get(searchParamName) as SokiAppName | '';

      if (!appName) return;

      url.searchParams.delete(searchParamName);
      const props: Record<string, unknown> = {};

      Array.from(url.searchParams.entries()).forEach(([key, value]) => (props[key] = JSON.parse(value)));

      navigate(`/${appName}/i`);
      actonAtom.set({ appName, props, navigate });
    } catch (error) {}
  }
}
