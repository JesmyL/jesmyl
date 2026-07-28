import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { DOMAttributes, useEffect } from 'react';
import { checkIsBoolean, checkIsFunction, checkIsString } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

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

    objectKeys(props).forEach(key => {
      if (checkIsBoolean(props[key])) script[key as never] = props[key] as never;
      else if (checkIsFunction(props[key])) script[key.toLowerCase() as never] = props[key] as never;
      else if (checkIsString(props[key])) script.setAttribute(key, props[key] as never);
    });

    return () => script.remove();
  }, [propRef, src]);

  return <></>;
};
