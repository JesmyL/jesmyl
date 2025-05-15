import { theIconKnownPack } from './pack';

export const theIconNamePostfixList = {
  StrokeRounded: 1,
  DuotoneRounded: 2,
  TwotoneRounded: 3,
  SolidRounded: 4,
  BulkRounded: 5,
  StrokeSharp: 6,
  SolidSharp: 7,
} as const;

export const takeIconFromKnownPack = (icon: TheIconKnownName, kind: TheIconNameKind = 'StrokeRounded') => {
  return theIconKnownPack[icon]?.[theIconNamePostfixList[kind]];
};
