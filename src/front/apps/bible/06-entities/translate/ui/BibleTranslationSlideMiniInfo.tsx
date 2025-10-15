import { JSX } from 'react';

interface Props {
  addressText: string;
}

export function BibleTranslateSlideMiniInfo({ addressText }: Props): JSX.Element {
  return <span>{addressText}</span>;
}
