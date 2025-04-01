import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.44828 3.5H6M20 3.5H11.5M11.5 2V5M7.44828 2V5M9.5 1V6',
  d2: 'M4 9H16',
  d3: 'M13.6 9L13.8963 9.36014C14.938 10.626 15.4588 11.259 15.7294 12.0089C16 12.7589 16 13.5695 16 15.1906V18.3333C16 20.5332 16 21.6332 15.2971 22.3166C14.5941 23 13.4627 23 11.2 23H8.8C6.53726 23 5.40589 23 4.70294 22.3166C4 21.6332 4 20.5332 4 18.3333V15.1906C4 13.5695 4 12.7589 4.27058 12.0089C4.54117 11.259 5.062 10.626 6.10366 9.36014L6.4 9',
  d4: 'M8 15V18',
  d5: 'M4 15H16',
  d6: 'M11.2 23H8.8C6.53726 23 5.40589 23 4.70294 22.3166C4 21.6332 4 20.5332 4 18.3333V15.1906L4.00002 15H16L16 15.1906V18.3333C16 20.5332 16 21.6332 15.2971 22.3166C14.5941 23 13.4627 23 11.2 23Z',
  d7: 'M8.44828 3.5H7M21 3.5H12.5M12.5 2V5M8.44828 2V5M10.5 1V6',
  d8: 'M10.5 1V6',
  d9: 'M3 9H15',
  d10: 'M12.6 9L12.8963 9.36014C13.938 10.626 14.4588 11.259 14.7294 12.0089C15 12.7589 15 13.5695 15 15.1906V18.3333C15 20.5332 15 21.6332 14.2971 22.3166C13.5941 23 12.4627 23 10.2 23H7.8C5.53726 23 4.40589 23 3.70294 22.3166C3 21.6332 3 20.5332 3 18.3333V15.1906C3 13.5695 3 12.7589 3.27058 12.0089C3.54117 11.259 4.062 10.626 5.10366 9.36014L5.4 9',
  d11: 'M7 15V18',
  d12: 'M3 15H15',
  d13: 'M9.5 0.25C9.91421 0.25 10.25 0.585786 10.25 1V6C10.25 6.41421 9.91421 6.75 9.5 6.75C9.08579 6.75 8.75 6.41421 8.75 6V1C8.75 0.585786 9.08579 0.25 9.5 0.25ZM7.44828 1.25C7.86249 1.25 8.19828 1.58579 8.19828 2V5C8.19828 5.41421 7.86249 5.75 7.44828 5.75C7.03406 5.75 6.69828 5.41421 6.69828 5V4.25H6C5.58579 4.25 5.25 3.91421 5.25 3.5C5.25 3.08579 5.58579 2.75 6 2.75H6.69828V2C6.69828 1.58579 7.03406 1.25 7.44828 1.25ZM11.5 1.25C11.9142 1.25 12.25 1.58579 12.25 2V2.75H20C20.4142 2.75 20.75 3.08579 20.75 3.5C20.75 3.91421 20.4142 4.25 20 4.25H12.25V5C12.25 5.41421 11.9142 5.75 11.5 5.75C11.0858 5.75 10.75 5.41421 10.75 5V2C10.75 1.58579 11.0858 1.25 11.5 1.25Z',
  d14: 'M3.25 9C3.25 8.58579 3.58579 8.25 4 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H4C3.58579 9.75 3.25 9.41421 3.25 9Z',
  d15: 'M6.97917 9.47657C7.24237 9.15672 7.19643 8.68407 6.87658 8.42088C6.55674 8.15769 6.08409 8.20362 5.8209 8.52347L5.43503 8.99238C4.47911 10.1536 3.8802 10.8812 3.56514 11.7544C3.24954 12.6291 3.24972 13.5639 3.25002 15.0511L3.25004 18.3878C3.25001 19.4414 3.24998 20.3095 3.34497 20.9964C3.44489 21.7189 3.66243 22.351 4.18017 22.8543C4.69496 23.3548 5.33644 23.5625 6.06938 23.6583C6.77166 23.7501 7.66089 23.75 8.74788 23.75H11.2522C12.3392 23.75 13.2284 23.7501 13.9307 23.6583C14.6636 23.5625 15.3051 23.3548 15.8199 22.8543C16.3376 22.351 16.5552 21.7189 16.6551 20.9964C16.7501 20.3095 16.7501 19.4414 16.75 18.3878L16.7501 15.0511C16.7503 13.5639 16.7505 12.6291 16.4349 11.7544C16.1199 10.8812 15.521 10.1536 14.565 8.99238L14.1792 8.52347C13.916 8.20362 13.4433 8.15769 13.1235 8.42088C12.8036 8.68407 12.7577 9.15672 13.0209 9.47657L13.3172 9.83671C14.3923 11.1433 14.8076 11.6638 15.024 12.2635C15.1559 12.6291 15.211 13.0161 15.2339 13.6438C15.2442 13.9256 15.2493 14.0665 15.1609 14.1582C15.0724 14.25 14.9284 14.25 14.6405 14.25H9.35C9.06716 14.25 8.92574 14.25 8.83787 14.3379C8.75 14.4258 8.75 14.5672 8.75 14.85V18C8.75 18.4142 8.41421 18.75 8 18.75C7.58579 18.75 7.25 18.4142 7.25 18V14.85C7.25 14.5672 7.25 14.4258 7.16213 14.3379C7.07426 14.25 6.93284 14.25 6.65 14.25H5.35955C5.07165 14.25 4.9277 14.25 4.83922 14.1582C4.75074 14.0665 4.75588 13.9256 4.76617 13.6438C4.78909 13.0161 4.84421 12.6291 4.9761 12.2635C5.19248 11.6638 5.60772 11.1433 6.68283 9.83671L6.97917 9.47657Z',
  d16: 'M8 5H6M20 5H12M12 3.2V6.8M8 3.2V6.8M10 2V8',
  d17: 'M4 10H16',
  d18: 'M13.5 10L16 13.5V22H4V13.5L6.5 10',
  d19: 'M8 15V19',
  d20: 'M9.75 7.75V1.75H11.25V7.75H9.75ZM7.75 4V2.95H9.25V6.55H7.75V5.5H6.5V4H7.75ZM11.75 6.55V2.95H13.25V4H20.25V5.5H13.25V6.55H11.75Z',
  d21: 'M16.5 10.25H4.5V8.75H16.5V10.25Z',
  d22: 'M5.25 13.2402L7.6103 9.93582L6.3897 9.06396L3.8897 12.564C3.79884 12.6912 3.75 12.8436 3.75 12.9999V21.4999C3.75 21.9141 4.08579 22.2499 4.5 22.2499H16.5C16.9142 22.2499 17.25 21.9141 17.25 21.4999V12.9999C17.25 12.8436 17.2012 12.6912 17.1103 12.564L14.6103 9.06396L13.3897 9.93582L15.75 13.2402V13.75H9.25V18.5H7.75V13.75H5.25V13.2402Z',
};

export const IconHoney02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-stroke-rounded IconHoney02StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconHoney02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-duotone-rounded IconHoney02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconHoney02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-twotone-rounded IconHoney02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHoney02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-solid-rounded IconHoney02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHoney02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-bulk-rounded IconHoney02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconHoney02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-stroke-sharp IconHoney02StrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHoney02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="honey-02-solid-sharp IconHoney02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHoney02: TheIconSelfPack = {
  name: 'Honey02',
  StrokeRounded: IconHoney02StrokeRounded,
  DuotoneRounded: IconHoney02DuotoneRounded,
  TwotoneRounded: IconHoney02TwotoneRounded,
  SolidRounded: IconHoney02SolidRounded,
  BulkRounded: IconHoney02BulkRounded,
  StrokeSharp: IconHoney02StrokeSharp,
  SolidSharp: IconHoney02SolidSharp,
};