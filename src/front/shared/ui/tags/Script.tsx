import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { DOMAttributes, useEffect } from 'react';

type Props = DOMAttributes<unknown> & {
  src: string;
  async?: boolean;
};

export const Script = ({ src, ...props }: Props) => {
  const propRef = useActualRef(props);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    const props = propRef.current;

    mylib.keys(props).forEach(key => {
      if (mylib.isBool(props[key])) script[key as never] = props[key] as never;
      else if (mylib.isFunc(props[key])) script[key.toLowerCase() as never] = props[key] as never;
      else if (mylib.isStr(props[key])) script.setAttribute(key, props[key] as never);
    });

    return () => script.remove();
  }, [propRef, src]);

  return <></>;
};
