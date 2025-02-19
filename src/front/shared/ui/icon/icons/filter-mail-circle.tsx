import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d2: 'M9 12L15.0001 12',
  d3: 'M10 15.5H14',
  d4: 'M8 8.5H16',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12ZM9 11C8.44772 11 8 11.4477 7.99999 12C7.99999 12.5523 8.4477 13 8.99999 13L15.0001 13C15.5523 13.0001 16.0001 12.5523 16.0001 12.0001C16.0001 11.4478 15.5524 11.0001 15.0001 11L9 11ZM9 15.5C9 14.9477 9.44771 14.5 10 14.5H14C14.5523 14.5 15 14.9477 15 15.5C15 16.0523 14.5523 16.5 14 16.5H10C9.44771 16.5 9 16.0523 9 15.5ZM8 7.5C7.44772 7.5 7 7.94772 7 8.5C7 9.05228 7.44772 9.5 8 9.5H16C16.5523 9.5 17 9.05228 17 8.5C17 7.94772 16.5523 7.5 16 7.5H8Z',
  d6: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
  d7: 'M7.99999 12C8 11.4477 8.44772 11 9 11L15.0001 11C15.5524 11.0001 16.0001 11.4478 16.0001 12.0001C16.0001 12.5523 15.5523 13.0001 15.0001 13L8.99999 13C8.4477 13 7.99999 12.5523 7.99999 12Z',
  d8: 'M9 15.5C9 14.9477 9.44772 14.5 10 14.5H14C14.5523 14.5 15 14.9477 15 15.5C15 16.0523 14.5523 16.5 14 16.5H10C9.44772 16.5 9 16.0523 9 15.5Z',
  d9: 'M7 8.5C7 7.94772 7.44772 7.5 8 7.5H16C16.5523 7.5 17 7.94772 17 8.5C17 9.05228 16.5523 9.5 16 9.5H8C7.44772 9.5 7 9.05228 7 8.5Z',
  d10: 'M8 12.5L15.9999 12.5',
  d11: 'M10 16H14',
  d12: 'M7 9H17',
  d13: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM8.00001 13.5L15.9999 13.5L15.9999 11.5L8 11.5L8.00001 13.5ZM10 17V15H14V17H10ZM7 10H17V8H7V10Z',
};

export const IconFilterMailCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-stroke-rounded IconFilterMailCircleStrokeRounded"
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

export const IconFilterMailCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-duotone-rounded IconFilterMailCircleDuotoneRounded"
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

export const IconFilterMailCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-twotone-rounded IconFilterMailCircleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFilterMailCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-solid-rounded IconFilterMailCircleSolidRounded"
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

export const IconFilterMailCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-bulk-rounded IconFilterMailCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFilterMailCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-stroke-sharp IconFilterMailCircleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFilterMailCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-circle-solid-sharp IconFilterMailCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFilterMailCircle: TheIconSelfPack = {
  name: 'FilterMailCircle',
  StrokeRounded: IconFilterMailCircleStrokeRounded,
  DuotoneRounded: IconFilterMailCircleDuotoneRounded,
  TwotoneRounded: IconFilterMailCircleTwotoneRounded,
  SolidRounded: IconFilterMailCircleSolidRounded,
  BulkRounded: IconFilterMailCircleBulkRounded,
  StrokeSharp: IconFilterMailCircleStrokeSharp,
  SolidSharp: IconFilterMailCircleSolidSharp,
};