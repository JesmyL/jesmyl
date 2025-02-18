import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 3H21',
  d2: 'M3 15H9',
  d3: 'M3 21H9',
  d4: 'M3 9H16.5C18.9853 9 21 11.0147 21 13.5C21 15.9853 18.9853 18 16.5 18H12M12 18C12 17.1597 14.3932 15.5898 15 15M12 18C12 18.8403 14.3932 20.4102 15 21',
  d5: 'M15 15C14.3932 15.5898 12 17.1597 12 18C12 18.8403 14.3932 20.4102 15 21V15Z',
  d6: 'M2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H3C2.44772 4 2 3.55228 2 3Z',
  d7: 'M2 15C2 14.4477 2.44772 14 3 14H9C9.55228 14 10 14.4477 10 15C10 15.5523 9.55228 16 9 16H3C2.44772 16 2 15.5523 2 15Z',
  d8: 'M2 21C2 20.4477 2.44772 20 3 20H9C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22H3C2.44772 22 2 21.5523 2 21Z',
  d9: 'M2 9C2 8.44772 2.44772 8 3 8H16.5C19.5376 8 22 10.4624 22 13.5C22 16.5376 19.5376 19 16.5 19L16 19.0006V21.0012C15.9997 21.252 15.9057 21.5029 15.7171 21.697C15.3321 22.093 14.699 22.102 14.303 21.7171C14.1982 21.6152 13.913 21.3877 13.5855 21.1304L13.5854 21.1303C13.295 20.9024 12.9528 20.6338 12.626 20.3569C12.276 20.0603 11.909 19.7255 11.6221 19.3887C11.4783 19.2199 11.3344 19.0272 11.2223 18.8178C11.1145 18.6164 11 18.3327 11 18C11 17.6673 11.1145 17.3836 11.2223 17.1822C11.3344 16.9728 11.4783 16.7801 11.6221 16.6113C11.909 16.2745 12.276 15.9397 12.626 15.6431C12.9528 15.3662 13.2951 15.0975 13.5855 14.8696C13.913 14.6124 14.1982 14.3848 14.303 14.2829C14.699 13.898 15.3321 13.907 15.7171 14.303C15.9063 14.4977 16.0003 14.7496 16 15.0011V17H16.5C18.433 17 20 15.433 20 13.5C20 11.567 18.433 10 16.5 10H3C2.44772 10 2 9.55228 2 9Z',
  d10: 'M3.00781 3H21.1949',
  d11: 'M3.00781 15H9.07018',
  d12: 'M3.00781 21H9.07018',
  d13: 'M2.23438 8.98476H16.1738C18.1085 8.87645 20.8717 9.97435 21.2113 13.1107C21.4876 15.6625 19.3367 17.8178 16.9422 17.9991H12.699M15.1178 15.0162L12.1247 17.9991L15.1178 20.9902',
  d14: 'M2 2H22V4H2V2Z',
  d15: 'M2 14H10V16H2V14Z',
  d16: 'M2 20H10V22H2V20Z',
  d17: 'M2 8H16.5C19.5376 8 22 10.4624 22 13.5C22 16.5376 19.5376 19 16.5 19H14.4142L15.7071 20.2929L14.2929 21.7071L10.5858 18L14.2929 14.2929L15.7071 15.7071L14.4142 17H16.5C18.433 17 20 15.433 20 13.5C20 11.567 18.433 10 16.5 10H2V8Z',
};

export const IconTextWrapStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-stroke-rounded IconTextWrapStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-duotone-rounded IconTextWrapDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-twotone-rounded IconTextWrapTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-solid-rounded IconTextWrapSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-bulk-rounded IconTextWrapBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-stroke-sharp IconTextWrapStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextWrapSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-wrap-solid-sharp IconTextWrapSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextWrap: TheIconSelfPack = {
  name: 'TextWrap',
  StrokeRounded: IconTextWrapStrokeRounded,
  DuotoneRounded: IconTextWrapDuotoneRounded,
  TwotoneRounded: IconTextWrapTwotoneRounded,
  SolidRounded: IconTextWrapSolidRounded,
  BulkRounded: IconTextWrapBulkRounded,
  StrokeSharp: IconTextWrapStrokeSharp,
  SolidSharp: IconTextWrapSolidSharp,
};