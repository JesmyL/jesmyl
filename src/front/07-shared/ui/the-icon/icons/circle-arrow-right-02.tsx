import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 12L8 12M16 12C16 12.7002 14.0057 14.0085 13.5 14.5M16 12C16 11.2998 14.0057 9.99153 13.5 9.5',
  d2: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12ZM7 12C7 12.5523 7.44772 13 8 13L12.5 13L12.5 13.162C12.4999 13.4524 12.4998 13.7597 12.5288 14.0022C12.55 14.179 12.6298 14.8295 13.2387 15.1296C13.8481 15.43 14.3908 15.0851 14.5374 14.9914C14.7391 14.8625 14.9718 14.6695 15.1919 14.4869L15.2297 14.4555C15.5765 14.168 15.9712 13.8257 16.2852 13.4824C16.442 13.311 16.6035 13.1127 16.7312 12.8974C16.8495 12.6978 17 12.3826 17 12C17 11.6174 16.8495 11.3022 16.7312 11.1026C16.6035 10.8873 16.442 10.689 16.2852 10.5176C15.9712 10.1743 15.5765 9.83196 15.2297 9.54449L15.1919 9.51315L15.1919 9.51314C14.9718 9.33054 14.7391 9.13753 14.5374 9.00859C14.3908 8.91494 13.8481 8.57002 13.2387 8.87038C12.6298 9.1705 12.55 9.82103 12.5288 9.99783C12.4998 10.2403 12.4999 10.5476 12.5 10.838L12.5 11L8 11C7.44772 11 7 11.4477 7 12Z',
  d3: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25Z',
  d4: 'M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11L12.5 11L12.5 10.838C12.4999 10.5476 12.4998 10.2403 12.5288 9.99783C12.55 9.82103 12.6298 9.1705 13.2387 8.87038C13.8481 8.57002 14.3908 8.91494 14.5374 9.00859C14.7392 9.13753 14.9718 9.33054 15.1919 9.51315L15.2297 9.54449C15.5765 9.83196 15.9712 10.1743 16.2852 10.5176C16.442 10.689 16.6035 10.8873 16.7312 11.1026C16.8495 11.3022 17 11.6174 17 12C17 12.3826 16.8495 12.6978 16.7312 12.8974C16.6035 13.1127 16.442 13.311 16.2852 13.4824C15.9712 13.8257 15.5765 14.168 15.2297 14.4555L15.1919 14.4869C14.9718 14.6695 14.7391 14.8625 14.5374 14.9914C14.3908 15.0851 13.8481 15.43 13.2387 15.1296C12.6298 14.8295 12.55 14.179 12.5288 14.0022C12.4998 13.7597 12.4999 13.4524 12.5 13.162L12.5 13L8 13Z',
  d5: 'M8 12.0004L15.5523 12.0004M13 15L16 12.0004L13 9',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.9999 15.5294L16.5303 11.9995L13 8.46875L11.9392 9.52934L13.6591 11.2494H7.46961V12.7494H13.6588L11.9393 14.4687L12.9999 15.5294Z',
};

export const IconCircleArrowRight02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-stroke-rounded IconCircleArrowRight02StrokeRounded"
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

export const IconCircleArrowRight02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-duotone-rounded IconCircleArrowRight02DuotoneRounded"
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

export const IconCircleArrowRight02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-twotone-rounded IconCircleArrowRight02TwotoneRounded"
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

export const IconCircleArrowRight02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-solid-rounded IconCircleArrowRight02SolidRounded"
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

export const IconCircleArrowRight02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-bulk-rounded IconCircleArrowRight02BulkRounded"
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

export const IconCircleArrowRight02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-stroke-sharp IconCircleArrowRight02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowRight02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-right-02-solid-sharp IconCircleArrowRight02SolidSharp"
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

export const iconPackOfCircleArrowRight02: TheIconSelfPack = {
  name: 'CircleArrowRight02',
  StrokeRounded: IconCircleArrowRight02StrokeRounded,
  DuotoneRounded: IconCircleArrowRight02DuotoneRounded,
  TwotoneRounded: IconCircleArrowRight02TwotoneRounded,
  SolidRounded: IconCircleArrowRight02SolidRounded,
  BulkRounded: IconCircleArrowRight02BulkRounded,
  StrokeSharp: IconCircleArrowRight02StrokeSharp,
  SolidSharp: IconCircleArrowRight02SolidSharp,
};