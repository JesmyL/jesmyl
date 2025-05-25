import { HTMLAttributes } from 'react';
import { makeStameskaIconSvgProps, StameskaIconKind, StameskaIconName } from 'stameska-icon';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  icon: StameskaIconName;
  kind?: StameskaIconKind;
  withoutAnimation?: boolean;
};

export default function TheIconLazy({ icon, kind, withoutAnimation, className, children, ...props }: LazyIconProps) {
  return (
    <svg
      {...makeStameskaIconSvgProps(icon, kind, className, withoutAnimation)}
      {...props}
    />
  );
}
