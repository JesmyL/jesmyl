import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 6L3 6',
  d2: 'M13 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V12',
  d3: 'M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22',
  d4: 'M20.9986 13.0104C20.6582 13.8464 19.09 15.5021 15.502 15.5021C15.2005 15.5021 14.4099 15.8053 14.4508 17.4483C14.4675 18.9333 13.9262 21.8711 11.6555 21.9978C11.2055 22 10.7164 22 10.1818 22C8.38275 22 7.48321 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818L4 7C4 6.07069 4 5.60603 4.07686 5.21964C4.39249 3.63287 5.63288 2.39248 7.21964 2.07686C7.60604 2 8.07069 2 9 2L13.2727 2C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29753 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 12.2452 21 12.6414 20.9986 13.0104Z',
  d5: 'M17.1885 1.35273C16.2062 1.24997 14.9734 1.24999 13.4323 1.25H12.6023C12.0625 1.25 11.625 1.68755 11.625 2.22729C11.625 2.76703 12.0625 3.20457 12.6023 3.20457H13.3774C14.986 3.20457 16.1172 3.20582 16.9866 3.29677C17.8405 3.3861 18.3244 3.55286 18.6823 3.8059C18.9237 3.97665 19.1361 4.17774 19.3139 4.4021C19.5695 4.72459 19.7389 5.15738 19.8311 5.94417C19.9261 6.75393 19.9276 7.81126 19.9276 9.33471L19.9277 12.2349C19.9277 12.5019 19.9276 13.1405 19.647 13.6126C19.474 13.9036 19.2526 14.1467 19.0252 14.2706C18.6586 14.4701 18.2385 14.5834 17.7918 14.5834L16.7514 14.5469C16.3713 14.5391 15.9278 14.5511 15.4996 14.6658C14.6657 14.8892 14.0143 15.5406 13.7908 16.3746C13.6761 16.8028 13.6641 17.2463 13.672 17.6264L13.7085 18.6668C13.7085 19.1345 13.5841 19.5416 13.3667 19.92C13.24 20.1406 13.0193 20.3425 12.7145 20.5198C12.2524 20.7887 11.699 20.7912 11.3608 20.7927C11.0227 20.7942 10.6659 20.7954 10.3678 20.7954C8.53372 20.7954 7.86659 20.7815 7.36323 20.6041C6.4906 20.2966 5.8249 19.655 5.51481 18.8696C5.43717 18.673 5.38233 18.4146 5.35289 17.9666C5.32288 17.51 5.32239 16.927 5.32239 16.0868V11.9737C5.32239 11.4359 4.88645 11 4.34869 11C3.81094 11 3.375 11.4359 3.375 11.9737V16.1199C3.37499 16.9191 3.37499 17.5666 3.40973 18.0952C3.44552 18.6399 3.52113 19.1255 3.7044 19.5897C4.23321 20.929 5.34164 21.9633 6.7182 22.4483C7.577 22.7509 9.04908 22.7505 10.6041 22.7499C13.4437 22.7503 15.1304 22.7505 16.5128 22.2634C18.7328 21.4812 20.5065 19.8185 21.3499 17.6824C21.631 16.9705 21.7556 16.2058 21.8158 15.2889C21.875 14.3882 21.875 13.2756 21.875 11.8573V9.2738C21.875 7.82571 21.875 6.65306 21.7652 5.71573C21.651 4.74233 21.4078 3.90445 20.838 3.18539C20.5428 2.8129 20.1942 2.48412 19.8039 2.20807C19.0591 1.68141 18.1979 1.45832 17.1885 1.35273Z',
  d6: 'M12.125 6C12.125 6.55228 11.6773 7 11.125 7L3.125 7C2.57271 7 2.125 6.55228 2.125 6C2.125 5.44771 2.57271 5 3.125 5L11.125 5C11.6773 5 12.125 5.44772 12.125 6Z',
  d7: 'M11 6H3',
  d8: 'M12.9985 1.99976L20.99 1.99989C20.9955 1.99989 21 2.00436 21 2.00989V14.9999L14 21.9999H4.01C4.00448 21.9999 4 21.9954 4 21.9899V9.02457M20.4665 14.9999H14V21.4412',
  d9: 'M3.25 4.94995L11.25 4.94995L11.25 6.94995L3.25 6.94995L3.25 4.94995Z',
  d10: 'M3.25 21.7727C3.25 22.3125 3.68593 22.75 4.22368 22.75H14.3638L21.75 15.3366V2.22727C21.75 1.68754 21.3141 1.25 20.7763 1.25H12.9869V3.2045H19.8027V13.9545H12.9869L12.9869 20.7954H5.19747V8.99996H3.25V21.7727Z',
};

export const IconFileMinusStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-stroke-rounded IconFileMinusStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-duotone-rounded IconFileMinusDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-twotone-rounded IconFileMinusTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-solid-rounded IconFileMinusSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-bulk-rounded IconFileMinusBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-stroke-sharp IconFileMinusStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileMinusSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-minus-solid-sharp IconFileMinusSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFileMinus: TheIconSelfPack = {
  name: 'FileMinus',
  StrokeRounded: IconFileMinusStrokeRounded,
  DuotoneRounded: IconFileMinusDuotoneRounded,
  TwotoneRounded: IconFileMinusTwotoneRounded,
  SolidRounded: IconFileMinusSolidRounded,
  BulkRounded: IconFileMinusBulkRounded,
  StrokeSharp: IconFileMinusStrokeSharp,
  SolidSharp: IconFileMinusSolidSharp,
};