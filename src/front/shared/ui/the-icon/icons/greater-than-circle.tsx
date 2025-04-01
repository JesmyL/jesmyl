import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 8L13.3322 11.0203C14.2226 11.8273 14.2226 12.1727 13.3322 12.9797L10 16',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM10.6716 7.25907C10.2624 6.88817 9.62997 6.91923 9.25907 7.32844C8.88817 7.73765 8.91923 8.37005 9.32844 8.74095L12.6607 11.7612C12.7698 11.8601 12.8494 11.9384 12.9071 12C12.8494 12.0616 12.7698 12.1399 12.6607 12.2388L9.32844 15.2591C8.91923 15.63 8.88817 16.2624 9.25907 16.6716C9.62997 17.0808 10.2624 17.1118 10.6716 16.7409L14.0038 13.7207C14.2422 13.5047 14.4752 13.2723 14.6514 13.0213C14.8336 12.7619 15 12.4191 15 12C15 11.5809 14.8336 11.2381 14.6514 10.9787C14.4752 10.7278 14.2422 10.4954 14.0038 10.2793L10.6716 7.25907Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M9.25907 7.32844C9.62997 6.91923 10.2624 6.88817 10.6716 7.25907L14.0038 10.2793C14.2422 10.4954 14.4752 10.7278 14.6514 10.9787C14.8336 11.2381 15 11.5809 15 12C15 12.4191 14.8336 12.7619 14.6514 13.0213C14.4752 13.2723 14.2422 13.5047 14.0038 13.7207L10.6716 16.7409C10.2624 17.1118 9.62997 17.0808 9.25907 16.6716C8.88817 16.2624 8.91923 15.63 9.32844 15.2591L12.6607 12.2388C12.7698 12.1399 12.8494 12.0616 12.9071 12C12.8494 11.9384 12.7698 11.8601 12.6607 11.7612L9.32844 8.74095C8.91923 8.37005 8.88817 7.73765 9.25907 7.32844Z',
  d5: 'M9.9998 8L14 12L9.9998 16',
  d6: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.29253 8.70722L10.7067 7.29297L15.4141 12.0001L10.7067 16.7072L9.29253 15.293L12.5856 12.0001L9.29253 8.70722Z',
};

export const IconGreaterThanCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-stroke-rounded IconGreaterThanCircleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGreaterThanCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-duotone-rounded IconGreaterThanCircleDuotoneRounded"
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
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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

export const IconGreaterThanCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-twotone-rounded IconGreaterThanCircleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGreaterThanCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-solid-rounded IconGreaterThanCircleSolidRounded"
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

export const IconGreaterThanCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-bulk-rounded IconGreaterThanCircleBulkRounded"
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

export const IconGreaterThanCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-stroke-sharp IconGreaterThanCircleStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconGreaterThanCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="greater-than-circle-solid-sharp IconGreaterThanCircleSolidSharp"
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

export const iconPackOfGreaterThanCircle: TheIconSelfPack = {
  name: 'GreaterThanCircle',
  StrokeRounded: IconGreaterThanCircleStrokeRounded,
  DuotoneRounded: IconGreaterThanCircleDuotoneRounded,
  TwotoneRounded: IconGreaterThanCircleTwotoneRounded,
  SolidRounded: IconGreaterThanCircleSolidRounded,
  BulkRounded: IconGreaterThanCircleBulkRounded,
  StrokeSharp: IconGreaterThanCircleStrokeSharp,
  SolidSharp: IconGreaterThanCircleSolidSharp,
};