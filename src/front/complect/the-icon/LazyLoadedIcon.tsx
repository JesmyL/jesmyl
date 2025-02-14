import { HTMLAttributes } from 'react';
import { IconNamePostfix, TheIconSelfPack } from './model';
import { theIconKnownPack } from './pack';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & { name: KnownIconName; postfix?: IconNamePostfix };

export default function TheIconLazy(props: LazyIconProps) {
  const pack = theIconKnownPack[props.name];
  if (pack === undefined) return null;

  const Icon = pack[props.postfix ?? 'StrokeRounded'];

  return <Icon {...props} />;
}

export const theIconFromPack = (name: KnownIconName): TheIconSelfPack | und => theIconKnownPack[name];
