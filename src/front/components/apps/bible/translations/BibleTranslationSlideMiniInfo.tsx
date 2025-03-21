import { JSX } from 'react';

interface Props {
  addressText: string;
}

export function BibleTranslationSlideMiniInfo({ addressText }: Props): JSX.Element {
  return <span>{addressText}</span>;
}
