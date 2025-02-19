import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.08069 15.2964C3.86241 16.0335 0.668175 17.5386 2.61368 19.422C3.56404 20.342 4.62251 21 5.95325 21H13.5468C14.8775 21 15.936 20.342 16.8863 19.422C18.8318 17.5386 15.6376 16.0335 14.4193 15.2964C11.5625 13.5679 7.93752 13.5679 5.08069 15.2964Z',
  d2: 'M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z',
  d3: 'M17 5L22 5',
  d4: 'M17 8L22 8',
  d5: 'M20 11L22 11',
  d6: 'M4.4426 14.6547C7.53812 12.7818 11.4622 12.7818 14.5577 14.6547C14.6547 14.7134 14.7758 14.7828 14.9137 14.8618C15.5264 15.2128 16.4717 15.7545 17.1183 16.3976C17.5234 16.8005 17.9171 17.3398 17.9888 18.0063C18.0653 18.7171 17.7585 19.3796 17.1581 19.9609C16.1413 20.9452 14.905 21.75 13.2969 21.75H5.70341C4.09536 21.75 2.85901 20.9452 1.84219 19.9609C1.24178 19.3796 0.935065 18.7171 1.01154 18.0063C1.08323 17.3398 1.47697 16.8005 1.88204 16.3976C2.52862 15.7545 3.47396 15.2128 4.08661 14.8618C4.22454 14.7828 4.3456 14.7134 4.4426 14.6547Z',
  d7: 'M4.75024 7C4.75024 4.37665 6.87689 2.25 9.50024 2.25C12.1236 2.25 14.2502 4.37665 14.2502 7C14.2502 9.62335 12.1236 11.75 9.50024 11.75C6.87689 11.75 4.75024 9.62335 4.75024 7Z',
  d8: 'M16 5C16 4.44772 16.4477 4 17 4L22 4C22.5523 4 23 4.44772 23 5C23 5.55229 22.5523 6 22 6L17 6C16.4477 6 16 5.55228 16 5ZM16 8C16 7.44772 16.4477 7 17 7L22 7C22.5523 7 23 7.44772 23 8C23 8.55229 22.5523 9 22 9L17 9C16.4477 9 16 8.55228 16 8ZM19 11C19 10.4477 19.4477 10 20 10H22C22.5523 10 23 10.4477 23 11C23 11.5523 22.5523 12 22 12H20C19.4477 12 19 11.5523 19 11Z',
  d9: 'M2 21H17C17 16.9066 13.6421 13.5882 9.5 13.5882C5.35786 13.5882 2 16.9066 2 21Z',
  d10: 'M13.25 6.70588C13.25 8.75258 11.5711 10.4118 9.5 10.4118C7.42893 10.4118 5.75 8.75258 5.75 6.70588C5.75 4.65918 7.42893 3 9.5 3C11.5711 3 13.25 4.65918 13.25 6.70588Z',
  d11: 'M16 5L22 5M16 8L22 8M19 11H22',
  d12: 'M5.5 6.70588C5.5 4.23662 7.52311 2.25 10 2.25C12.4769 2.25 14.5 4.23662 14.5 6.70588C14.5 9.17514 12.4769 11.1618 10 11.1618C7.52311 11.1618 5.5 9.17514 5.5 6.70588Z',
  d13: 'M1.75 21C1.75 16.484 5.45204 12.8382 10 12.8382C14.548 12.8382 18.25 16.484 18.25 21V21.75H1.75V21Z',
  d14: 'M22.25 6L16.25 6V4L22.25 4V6ZM22.25 9L16.25 9V7L22.25 7V9ZM22.25 12H19.25V10H22.25V12Z',
};

export const IconUserListStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-stroke-rounded IconUserListStrokeRounded"
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

export const IconUserListDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-duotone-rounded IconUserListDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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

export const IconUserListTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-twotone-rounded IconUserListTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserListSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-solid-rounded IconUserListSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserListBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-bulk-rounded IconUserListBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserListStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-stroke-sharp IconUserListStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUserListSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-list-solid-sharp IconUserListSolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUserList: TheIconSelfPack = {
  name: 'UserList',
  StrokeRounded: IconUserListStrokeRounded,
  DuotoneRounded: IconUserListDuotoneRounded,
  TwotoneRounded: IconUserListTwotoneRounded,
  SolidRounded: IconUserListSolidRounded,
  BulkRounded: IconUserListBulkRounded,
  StrokeSharp: IconUserListStrokeSharp,
  SolidSharp: IconUserListSolidSharp,
};