import { mylib } from '#shared/lib/my-lib';
import { HTMLAttributes, useState } from 'react';

export const EllipsisText = ({
  text,
  maxLength = 30,
  cantExtend,
  ...attrs
}: {
  text: [string | nil, string | nil, string | nil] | string | nil;
  maxLength?: number;
  cantExtend?: boolean;
} & HTMLAttributes<HTMLSpanElement>) => {
  const [isNeedTrim, setIsNeedTrim] = useState(true);
  const [prefix, textValue, postfix] = Array.isArray(text) ? text : [null, text, null];

  return (
    <span
      {...attrs}
      onClick={() => cantExtend || setIsNeedTrim(it => !it)}
    >
      {prefix}
      {isNeedTrim ? mylib.ellipsisText(textValue, maxLength) : textValue}
      {postfix}
    </span>
  );
};
