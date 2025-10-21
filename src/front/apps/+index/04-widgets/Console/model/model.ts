import { JSX } from 'react';

export type IndexConsoleCoderResultComponent<Value> = (props: {
  value: Value;
  name?: string | number;
  scope: string;
  isObjectParent?: true;
}) => JSX.Element;
