import { FunctionComponent, HTMLAttributes } from 'react';
import { knownIconNames } from 'shared/values';
import { theIconNamePostfixList } from './utils';

type Icon = FunctionComponent<HTMLAttributes<HTMLOrSVGElement>>;
export type TheIconSelfPack = [string, Icon, Icon, Icon, Icon, Icon, Icon, Icon];

export type TheIconProps = HTMLAttributes<HTMLOrSVGElement> & { withoutAnimation?: boolean };

declare global {
  type TheIconNameKind = keyof typeof theIconNamePostfixList;
  type TheIconKnownName = (typeof knownIconNames)[number];
}
