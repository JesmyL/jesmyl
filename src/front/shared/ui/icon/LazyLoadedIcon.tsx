import { HTMLAttributes } from 'react';
import { theIconKnownPack } from './pack';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & { icon: TheIconKnownName; kind?: TheIconNameKind };

export default function TheIconLazy({ icon, kind, ...props }: LazyIconProps) {
  const pack = theIconKnownPack[icon];
  if (pack === undefined) return null;

  const Icon = pack[kind ?? 'StrokeRounded'];

  return <Icon {...props} />;
}
