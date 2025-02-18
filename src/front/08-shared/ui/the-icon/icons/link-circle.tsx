import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.0012 12C21.0012 16.9708 16.9711 21.0004 11.9996 21.0004C7.0282 21.0004 2.99805 16.9708 2.99805 12C2.99805 7.02924 7.0282 2.99963 11.9996 2.99963',
  d2: 'M20.5537 3.4689L14.9902 9.01014M20.5537 3.4689C20.0585 2.97374 16.7223 3.0199 16.0171 3.02992M20.5537 3.4689C21.049 3.96406 21.0028 7.29968 20.9928 8.00486',
  d3: 'M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z',
  d4: 'M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3',
  d5: 'M20.5547 3.44473L14.9912 8.98597M20.5547 3.44473C20.0595 2.94957 16.7233 2.99573 16.0181 3.00575M20.5547 3.44473C21.05 3.93989 21.0038 7.27551 20.9938 7.98069',
  d6: 'M20.998 12C20.998 16.9706 16.9686 21 11.998 21C7.02749 21 2.99805 16.9706 2.99805 12C2.99805 7.02944 7.02749 3 11.998 3',
  d7: 'M20.5576 3.45181L14.9941 8.99305M20.5576 3.45181C20.0624 2.95665 16.7262 3.00281 16.021 3.01283M20.5576 3.45181C21.0529 3.94697 21.0067 7.28259 20.9967 7.98777',
  d8: 'M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4Z',
  d9: 'M16.6278 2.05969C17.5062 2.00814 19.2561 1.93287 20.3023 2.11815C20.7322 2.19428 21.1066 2.40101 21.3861 2.69873L21.3948 2.70812C21.6424 2.97543 21.8141 3.31484 21.882 3.69821C22.067 4.74418 21.9919 6.49371 21.9404 7.37214C21.8724 8.53179 20.4836 9.007 19.698 8.22141L18.4671 6.99058L15.7317 9.70515C15.3334 10.1004 14.6901 10.098 14.2948 9.69967C13.8996 9.30138 13.902 8.65808 14.3003 8.26282L17.0302 5.55371L15.7786 4.3021C14.9931 3.51657 15.4682 2.12775 16.6278 2.05969Z',
  d10: 'M21 3H21.75V2.25H21V3ZM20.4697 2.46967L14.4697 8.46967L15.5303 9.53033L21.5303 3.53033L20.4697 2.46967ZM21 2.25H15V3.75H21V2.25ZM21.75 9V3H20.25V9H21.75Z',
  d11: 'M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12H22C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2V4Z',
  d12: 'M15.0001 2H22.0001V9H20.0001V5.41421L15.7072 9.70711L14.293 8.29289L18.5859 4H15.0001V2Z',
};

export const IconLinkCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-stroke-rounded IconLinkCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinkCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-duotone-rounded IconLinkCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinkCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-twotone-rounded IconLinkCircleTwotoneRounded"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinkCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-solid-rounded IconLinkCircleSolidRounded"
    >
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

export const IconLinkCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-bulk-rounded IconLinkCircleBulkRounded"
    >
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

export const IconLinkCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-stroke-sharp IconLinkCircleStrokeSharp"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLinkCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="link-circle-solid-sharp IconLinkCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLinkCircle: TheIconSelfPack = {
  name: 'LinkCircle',
  StrokeRounded: IconLinkCircleStrokeRounded,
  DuotoneRounded: IconLinkCircleDuotoneRounded,
  TwotoneRounded: IconLinkCircleTwotoneRounded,
  SolidRounded: IconLinkCircleSolidRounded,
  BulkRounded: IconLinkCircleBulkRounded,
  StrokeSharp: IconLinkCircleStrokeSharp,
  SolidSharp: IconLinkCircleSolidSharp,
};