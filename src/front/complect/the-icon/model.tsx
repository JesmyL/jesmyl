import { FunctionComponent, HTMLAttributes } from 'react';
import { knownIconNames } from 'shared/values';

export const theIconNamePostfixList = [
  'StrokeRounded',
  'DuotoneRounded',
  'TwotoneRounded',
  'SolidRounded',
  'BulkRounded',
  'StrokeSharp',
  'SolidSharp',
] as const;

export type TheIconSelfPack = Record<TheIconNameKind, FunctionComponent<HTMLAttributes<HTMLOrSVGElement>>> & {
  name: string;
};

export type TheIconProps = HTMLAttributes<HTMLOrSVGElement> & { withoutAnimation?: boolean };

declare global {
  type TheIconNameKind = (typeof theIconNamePostfixList)[number];
  type TheIconKnownName = (typeof knownIconNames)[number];
}
