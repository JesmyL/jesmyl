import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 4L8.66943 10.0405C6.44352 11.6545 6.44353 12.3455 8.66943 13.9595L17 20',
  d2: 'M17 4L8.66943 10.0405C7.55648 10.8475 7 11.4238 7 12',
  d3: 'M18.012 3.26631C18.4172 3.8252 18.2927 4.6068 17.7338 5.01205L9.4032 11.0526C8.86388 11.4436 8.53963 11.7232 8.35676 11.9315C8.33392 11.9575 8.31513 11.9804 8.29973 12.0001C8.31513 12.0198 8.33392 12.0426 8.35676 12.0687C8.53963 12.277 8.86388 12.5565 9.4032 12.9476L17.7338 18.9881C18.2927 19.3934 18.4172 20.175 18.012 20.7339C17.6067 21.2928 16.8251 21.4173 16.2662 21.0121L7.93565 14.9715C7.36202 14.5556 6.85156 14.1435 6.47795 13.7179C6.10341 13.2913 5.75 12.7189 5.75 12.0001C5.75 11.2813 6.10341 10.7089 6.47795 10.2823C6.85156 9.85665 7.36202 9.44459 7.93565 9.02865L16.2662 2.98813C16.8251 2.58287 17.6067 2.70742 18.012 3.26631Z',
  d4: 'M17 4L7 12L17 20',
  d5: 'M16.6631 2.99951L18.2249 4.95168L9.75195 11.9998L18.2493 19.0481L16.6875 21.0003L5.75 11.9998L16.6631 2.99951Z',
};

export const IconLessThanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-stroke-rounded IconLessThanStrokeRounded"
    >
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

export const IconLessThanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-duotone-rounded IconLessThanDuotoneRounded"
    >
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

export const IconLessThanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-twotone-rounded IconLessThanTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconLessThanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-solid-rounded IconLessThanSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-bulk-rounded IconLessThanBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-stroke-sharp IconLessThanStrokeSharp"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLessThanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="less-than-solid-sharp IconLessThanSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLessThan: TheIconSelfPack = {
  name: 'LessThan',
  StrokeRounded: IconLessThanStrokeRounded,
  DuotoneRounded: IconLessThanDuotoneRounded,
  TwotoneRounded: IconLessThanTwotoneRounded,
  SolidRounded: IconLessThanSolidRounded,
  BulkRounded: IconLessThanBulkRounded,
  StrokeSharp: IconLessThanStrokeSharp,
  SolidSharp: IconLessThanSolidSharp,
};