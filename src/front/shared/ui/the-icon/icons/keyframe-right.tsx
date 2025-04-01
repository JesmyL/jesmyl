import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.00253 13.3091C4.33418 12.7049 4 12.4029 4 12C4 11.5971 4.33418 11.2951 5.00253 10.6909L6.64627 9.20515C7.53512 8.40172 7.97954 8 8.5 8C9.02046 8 9.46488 8.40172 10.3537 9.20515L11.9975 10.6909C12.6658 11.2951 13 11.5971 13 12C13 12.4029 12.6658 12.7049 11.9975 13.3091L10.3537 14.7948C9.46488 15.5983 9.02046 16 8.5 16C7.97954 16 7.53512 15.5983 6.64627 14.7948L5.00253 13.3091Z',
  d2: 'M16 12H20M20 21L20 3',
  d3: 'M7.13826 7.48175C7.50895 7.22257 7.95138 7 8.5 7C9.04862 7 9.49106 7.22256 9.86174 7.48175C10.201 7.71893 10.5742 8.05636 10.9829 8.42592L11.0243 8.4633L12.668 9.94909L12.7096 9.98669C13.0075 10.2558 13.3051 10.5246 13.519 10.7824C13.7652 11.0792 14 11.4755 14 12C14 12.5245 13.7652 12.9208 13.519 13.2176C13.3051 13.4754 13.0075 13.7442 12.7096 14.0133L12.668 14.0509L11.0243 15.5367L10.9829 15.5741C10.5742 15.9436 10.201 16.2811 9.86174 16.5183C9.49105 16.7774 9.04862 17 8.5 17C7.95138 17 7.50894 16.7774 7.13826 16.5183C6.79904 16.2811 6.42584 15.9437 6.01709 15.5741L6.01708 15.5741L5.97571 15.5367L4.33197 14.0509L4.29035 14.0133C3.9925 13.7442 3.6949 13.4754 3.48103 13.2176C3.23478 12.9208 3 12.5245 3 12C3 11.4755 3.23478 11.0792 3.48103 10.7824C3.6949 10.5246 3.9925 10.2558 4.29035 9.98669L4.29035 9.98669L4.33197 9.94909L5.97571 8.4633L6.01706 8.42592C6.42582 8.05636 6.79904 7.71893 7.13826 7.48175Z',
  d4: 'M20 2C20.5523 2 21 2.44772 21 3L21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21L19 13H16C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11H19L19 3C19 2.44772 19.4477 2 20 2Z',
  d5: 'M8.5 8L4 12L8.5 16L13 12L8.5 8Z',
  d6: 'M8.6289 6.99658L14.2578 12L8.6289 17.0035L3 12L8.6289 6.99658Z',
  d7: 'M21 3L21 21H19L19 13H16V11H19L19 3H21Z',
};

export const IconKeyframeRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-stroke-rounded IconKeyframeRightStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconKeyframeRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-duotone-rounded IconKeyframeRightDuotoneRounded"
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

export const IconKeyframeRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-twotone-rounded IconKeyframeRightTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconKeyframeRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-solid-rounded IconKeyframeRightSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-bulk-rounded IconKeyframeRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-stroke-sharp IconKeyframeRightStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-right-solid-sharp IconKeyframeRightSolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKeyframeRight: TheIconSelfPack = {
  name: 'KeyframeRight',
  StrokeRounded: IconKeyframeRightStrokeRounded,
  DuotoneRounded: IconKeyframeRightDuotoneRounded,
  TwotoneRounded: IconKeyframeRightTwotoneRounded,
  SolidRounded: IconKeyframeRightSolidRounded,
  BulkRounded: IconKeyframeRightBulkRounded,
  StrokeSharp: IconKeyframeRightStrokeSharp,
  SolidSharp: IconKeyframeRightSolidSharp,
};