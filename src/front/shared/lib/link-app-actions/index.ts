import { useNavigate, UseNavigateResult } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useCallback, useEffect } from 'react';
import { SokiAppName } from 'shared/api';
import { useActualRef } from '../hooks/useActualRef';
import { MyLib } from '../my-lib';

type ActionFor = SokiAppName | `*/${string}`;

export type LinkActionEvent<Props extends Record<string, unknown> = Record<string, unknown>> = {
  props: Props;
  navigateFromRoot: UseNavigateResult<string>;
};

const registededPathsMap = new Map<string, string>();

const searchParamName = 'appAction';
const actionAtom = atom<LinkActionEvent | null>(null);

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

  useOnAction = (cb: (props: LinkActionEvent<Props>) => boolean) => {
    const props = useAtomValue(actionAtom);
    const cbActualRef = useActualRef(cb);

    useEffect(() => {
      if (props === null) return;

      if (cbActualRef.current(props as never)) actionAtom.reset();
    }, [cbActualRef, props]);
  };

  makeLink(props: Props) {
    const url = new URL(window.location.origin);
    url.searchParams.set(searchParamName, this.actionFor);
    MyLib.keys(props).forEach(key => url.searchParams.set(key, JSON.stringify(props[key])));
    return url.toString();
  }

  register() {}

  static useOnHrefData = () => {
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

          actionAtom.set({ props, navigateFromRoot: navigate });

          if (actionFor.startsWith('*/'))
            setTimeout(() => navigate({ to: registededPathsMap.get(actionFor) ?? '/' }), 200);
          else navigate({ to: `/${actionFor}/i` });
        } catch (error) {
          console.error(error);
        }
      },
      [navigate],
    );
  };
}
