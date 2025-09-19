import React from 'react';

/**
 * нужен для избежания дополнительных констант в компоненте,
 * и для избежания использования тернарных операторов
 */
export const ConditionalRender = <Value, TrustValue extends Value = NonNullable<Value>>({
  render,
  value,
  checkValue,
  else: elseRender,
}: {
  value: Value;
  checkValue?: ((value: Value) => value is TrustValue) | ((value: Value) => boolean);
  render: (value: TrustValue) => React.ReactNode;
  else?: ((value: Exclude<Value, TrustValue>) => React.ReactNode) | React.ReactNode;
}) => {
  return (checkValue ?? checkOnNullable)(value)
    ? render(value as never)
    : typeof elseRender === 'function'
      ? elseRender(value as never)
      : elseRender;
};

const checkOnNullable = <It,>(it: It) => it != null;
