import { JSX } from 'react';

export type CoderResultComponent<Value> = (props: {
  value: Value;
  name?: string | number;
  scope: string;
  isObjectParent?: true;
}) => JSX.Element;
