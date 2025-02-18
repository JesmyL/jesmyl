import { mylib } from 'front/utils';
import { DOMAttributes, useEffect } from 'react';
import { useActualRef } from '../../lib/hooks/useActualRef';

type Props = DOMAttributes<any> & {
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
