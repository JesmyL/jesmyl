import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 13.5C9.99153 14.0057 11.2998 16 12 16M14.5 13.5C14.0085 14.0057 12.7002 16 12 16M12 16V8',
  d2: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM12 7C12.5523 7 13 7.44772 13 8V12.5H13.162C13.4524 12.4999 13.7597 12.4998 14.0022 12.5288C14.179 12.55 14.8295 12.6298 15.1296 13.2387C15.43 13.8481 15.0851 14.3908 14.9914 14.5374C14.8625 14.7392 14.6695 14.9718 14.4869 15.1919L14.4555 15.2297C14.168 15.5765 13.8257 15.9712 13.4824 16.2852C13.311 16.442 13.1127 16.6035 12.8974 16.7312C12.6978 16.8495 12.3826 17 12 17C11.6174 17 11.3022 16.8495 11.1026 16.7312C10.8873 16.6035 10.689 16.442 10.5176 16.2852C10.1743 15.9712 9.83196 15.5765 9.54449 15.2297L9.51315 15.1919L9.51314 15.1919C9.33054 14.9718 9.13753 14.7391 9.00859 14.5374C8.91494 14.3908 8.57002 13.8481 8.87038 13.2387C9.1705 12.6298 9.82103 12.55 9.99783 12.5288C10.2403 12.4998 10.5476 12.4999 10.838 12.5H11V8C11 7.44772 11.4477 7 12 7Z',
  d3: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d4: 'M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12.5H10.838C10.5476 12.4999 10.2403 12.4998 9.99783 12.5288C9.82103 12.55 9.1705 12.6298 8.87038 13.2387C8.57002 13.8481 8.91494 14.3908 9.00859 14.5374C9.13753 14.7392 9.33054 14.9718 9.51315 15.1919L9.54449 15.2297C9.83196 15.5765 10.1743 15.9712 10.5176 16.2852C10.689 16.442 10.8873 16.6035 11.1026 16.7312C11.3022 16.8495 11.6174 17 12 17C12.3826 17 12.6978 16.8495 12.8974 16.7312C13.1127 16.6035 13.311 16.442 13.4824 16.2852C13.8257 15.9712 14.168 15.5765 14.4555 15.2297L14.4869 15.1919C14.6695 14.9718 14.8625 14.7392 14.9914 14.5374C15.0851 14.3908 15.43 13.8481 15.1296 13.2387C14.8295 12.6298 14.179 12.55 14.0022 12.5288C13.7597 12.4998 13.4524 12.4999 13.162 12.5H13V8Z',
  d5: 'M12.0004 8V15.5966M15 13L12.0004 16L9 13',
  d6: 'M1.24902 12C1.24902 6.06294 6.06196 1.25 11.999 1.25C17.9361 1.25 22.749 6.06294 22.749 12C22.749 17.9371 17.9361 22.75 11.999 22.75C6.06196 22.75 1.24902 17.9371 1.24902 12ZM15.5284 12.9999L11.9985 16.5303L8.46777 13L9.52837 11.9392L11.2484 13.6591V7.46961H12.7484V13.6588L14.4677 11.9393L15.5284 12.9999Z',
};

export const IconCircleArrowDown02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-stroke-rounded IconCircleArrowDown02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-duotone-rounded IconCircleArrowDown02DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-twotone-rounded IconCircleArrowDown02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-solid-rounded IconCircleArrowDown02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-bulk-rounded IconCircleArrowDown02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-stroke-sharp IconCircleArrowDown02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDown02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-down-02-solid-sharp IconCircleArrowDown02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowDown02: TheIconSelfPack = {
  name: 'CircleArrowDown02',
  StrokeRounded: IconCircleArrowDown02StrokeRounded,
  DuotoneRounded: IconCircleArrowDown02DuotoneRounded,
  TwotoneRounded: IconCircleArrowDown02TwotoneRounded,
  SolidRounded: IconCircleArrowDown02SolidRounded,
  BulkRounded: IconCircleArrowDown02BulkRounded,
  StrokeSharp: IconCircleArrowDown02StrokeSharp,
  SolidSharp: IconCircleArrowDown02SolidSharp,
};