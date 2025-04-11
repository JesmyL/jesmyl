import { HTMLAttributes } from 'react';
import { takeIconFromKnownPack } from './utils';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  icon: TheIconKnownName;
  kind?: TheIconNameKind;
  withoutAnimation?: boolean;
};

export default function TheIconLazy({ icon, kind, ...props }: LazyIconProps) {
  const Icon = takeIconFromKnownPack(icon, kind);
  if (Icon === undefined) return null;

  return <Icon {...props} />;
}
