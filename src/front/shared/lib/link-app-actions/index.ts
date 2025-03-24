import { useNavigate, UseNavigateResult } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { SokiAppName } from 'shared/api';
import { atom, useAtomValue } from '../atom';
import { useActualRef } from '../hooks/useActualRef';
import { MyLib } from '../my-lib';

type ActionFor = SokiAppName | `*/${string}`;

export type LinkActionEvent<Props extends Record<string, unknown> = Record<string, unknown>> = {
  props: Props;
  navigateFromRoot: UseNavigateResult<string>;
};

const registededPathsMap = new Map<string, string>();

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

const useOnHrefData = () => {
  const navigate = useNavigate();

  return useCallback(
    (href: string) => {
      try {
        const url = new URL(href);
        const actionFor = url.searchParams.get(searchParamName) as ActionFor | '';

        if (!actionFor) return;

        url.searchParams.delete(searchParamName);
        const props: Record<string, unknown> = {};

        Array.from(url.searchParams.entries()).forEach(([key, value]) => (props[key] = JSON.parse(value)));

        actonAtom.set({ props, navigateFromRoot: navigate });

        if (actionFor.startsWith('*/')) setTimeout(navigate, 200, registededPathsMap.get(actionFor) ?? '/');
        else navigate({ to: `/${actionFor}/i` });
      } catch (error) {
        console.error(error);
      }
    },
    [navigate],
  );
};

export class LinkAppActionFabric<Props extends Record<string, unknown> = Record<string, unknown>> {
  constructor(
    private actionFor: ActionFor,
    path?: `/${string}`,
  ) {
    if (!actionFor.startsWith('*/')) return;
    if (path === undefined) throw new Error(`${actionFor} action does not have path parameter`);
    if (registededPathsMap.has(actionFor)) throw new Error(`the action for ${actionFor} was registered`);

    registededPathsMap.set(actionFor, path);
  }

  useOnAction = useOnAction as (cb: (props: LinkActionEvent<Props>) => void) => void;

  makeLink(props: Props) {
    const url = new URL(window.location.origin);
    url.searchParams.set(searchParamName, this.actionFor);
    MyLib.keys(props).forEach(key => url.searchParams.set(key, JSON.stringify(props[key])));
    return url.toString();
  }

  register() {}

  static useOnHrefData = useOnHrefData;
}
