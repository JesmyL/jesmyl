import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.9975 10.6909C19.6658 11.2951 20 11.5971 20 12C20 12.4029 19.6658 12.7049 18.9975 13.3091L17.3537 14.7948C16.4649 15.5983 16.0205 16 15.5 16C14.9795 16 14.5351 15.5983 13.6463 14.7948L12.0025 13.3091C11.3342 12.7049 11 12.4029 11 12C11 11.5971 11.3342 11.2951 12.0025 10.6909L13.6463 9.20516C14.5351 8.40172 14.9795 8 15.5 8C16.0205 8 16.4649 8.40172 17.3537 9.20515L18.9975 10.6909Z',
  d2: 'M8 12H4M4 3L4 21',
  d3: 'M14.1383 7.48175C14.5089 7.22257 14.9514 7 15.5 7C16.0486 7 16.4911 7.22257 16.8617 7.48175C17.201 7.71893 17.5742 8.05636 17.9829 8.42592L18.0243 8.4633L19.668 9.94909L19.7096 9.98669C20.0075 10.2558 20.3051 10.5246 20.519 10.7824C20.7652 11.0792 21 11.4755 21 12C21 12.5245 20.7652 12.9208 20.519 13.2176C20.3051 13.4754 20.0075 13.7442 19.7096 14.0133L19.668 14.0509L18.0243 15.5367L17.983 15.5741C17.5742 15.9436 17.201 16.2811 16.8617 16.5183C16.4911 16.7774 16.0486 17 15.5 17C14.9514 17 14.5089 16.7774 14.1383 16.5183C13.799 16.2811 13.4258 15.9436 13.0171 15.5741L12.9757 15.5367L11.332 14.0509L11.2904 14.0133C10.9925 13.7442 10.6949 13.4754 10.481 13.2176C10.2348 12.9208 10 12.5245 10 12C10 11.4755 10.2348 11.0792 10.481 10.7824C10.6949 10.5246 10.9925 10.2558 11.2904 9.98669L11.332 9.94909L12.9757 8.4633L13.0171 8.42592L13.0171 8.42592C13.4258 8.05636 13.799 7.71893 14.1383 7.48175Z',
  d4: 'M4 2C4.55229 2 5 2.44772 5 3L5 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H5L5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21L3 12.0009C3 12.0006 3 12.0003 3 12C3 11.9997 3 11.9994 3 11.9991L3 3C3 2.44772 3.44772 2 4 2Z',
  d5: 'M15.5 8L20 12L15.5 16L11 12L15.5 8Z',
  d6: 'M8 12H4M4 12V21M4 12L4 3',
  d7: 'M15.3711 6.99658L21 12L15.3711 17.0035L9.74219 12L15.3711 6.99658Z',
  d8: 'M5 11L5 3H3L3 21H5V13H8V11H5Z',
};

export const IconKeyframeLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-stroke-rounded IconKeyframeLeftStrokeRounded"
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

export const IconKeyframeLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-duotone-rounded IconKeyframeLeftDuotoneRounded"
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

export const IconKeyframeLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-twotone-rounded IconKeyframeLeftTwotoneRounded"
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

export const IconKeyframeLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-solid-rounded IconKeyframeLeftSolidRounded"
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

export const IconKeyframeLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-bulk-rounded IconKeyframeLeftBulkRounded"
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

export const IconKeyframeLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-stroke-sharp IconKeyframeLeftStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-left-solid-sharp IconKeyframeLeftSolidSharp"
    >
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

export const iconPackOfKeyframeLeft: TheIconSelfPack = {
  name: 'KeyframeLeft',
  StrokeRounded: IconKeyframeLeftStrokeRounded,
  DuotoneRounded: IconKeyframeLeftDuotoneRounded,
  TwotoneRounded: IconKeyframeLeftTwotoneRounded,
  SolidRounded: IconKeyframeLeftSolidRounded,
  BulkRounded: IconKeyframeLeftBulkRounded,
  StrokeSharp: IconKeyframeLeftStrokeSharp,
  SolidSharp: IconKeyframeLeftSolidSharp,
};