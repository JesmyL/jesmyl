import { useEffect } from 'react';
import { LinkAppActionFabric } from '.';

export const AppActionHrefNaver = ({ href }: { href: string }) => {
  const onHrefData = LinkAppActionFabric.useOnHrefData();

  useEffect(() => {
    onHrefData(href);
  }, [href, onHrefData]);

  return null;
};
