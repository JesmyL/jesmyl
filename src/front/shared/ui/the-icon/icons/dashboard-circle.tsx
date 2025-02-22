import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M1.25 6C1.25 3.37665 3.37665 1.25 6 1.25C8.62335 1.25 10.75 3.37665 10.75 6C10.75 8.62335 8.62335 10.75 6 10.75C3.37665 10.75 1.25 8.62335 1.25 6Z',
  d2: 'M1.25 18C1.25 15.3766 3.37665 13.25 6 13.25C8.62335 13.25 10.75 15.3766 10.75 18C10.75 20.6234 8.62335 22.75 6 22.75C3.37665 22.75 1.25 20.6234 1.25 18Z',
  d3: 'M13.25 18C13.25 15.3766 15.3766 13.25 18 13.25C20.6234 13.25 22.75 15.3766 22.75 18C22.75 20.6234 20.6234 22.75 18 22.75C15.3766 22.75 13.25 20.6234 13.25 18Z',
  d4: 'M13.25 6C13.25 3.37665 15.3766 1.25 18 1.25C20.6234 1.25 22.75 3.37665 22.75 6C22.75 8.62335 20.6234 10.75 18 10.75C15.3766 10.75 13.25 8.62335 13.25 6Z',
  d5: 'M12.75 6.25C12.75 3.48858 14.9886 1.25 17.75 1.25C20.5114 1.25 22.75 3.48858 22.75 6.25C22.75 9.01142 20.5114 11.25 17.75 11.25C14.9886 11.25 12.75 9.01142 12.75 6.25Z',
  d6: 'M1.25 6.25C1.25 3.48858 3.48858 1.25 6.25 1.25C9.01142 1.25 11.25 3.48858 11.25 6.25C11.25 9.01142 9.01142 11.25 6.25 11.25C3.48858 11.25 1.25 9.01142 1.25 6.25Z',
  d7: 'M12.75 17.75C12.75 14.9886 14.9886 12.75 17.75 12.75C20.5114 12.75 22.75 14.9886 22.75 17.75C22.75 20.5114 20.5114 22.75 17.75 22.75C14.9886 22.75 12.75 20.5114 12.75 17.75Z',
  d8: 'M1.25 17.75C1.25 14.9886 3.48858 12.75 6.25 12.75C9.01142 12.75 11.25 14.9886 11.25 17.75C11.25 20.5114 9.01142 22.75 6.25 22.75C3.48858 22.75 1.25 20.5114 1.25 17.75Z',
};

export const IconDashboardCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-stroke-rounded IconDashboardCircleStrokeRounded"
    >
      <circle 
        cx="17.75" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-duotone-rounded IconDashboardCircleDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17.75" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-twotone-rounded IconDashboardCircleTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.75" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-solid-rounded IconDashboardCircleSolidRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconDashboardCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-bulk-rounded IconDashboardCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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

export const IconDashboardCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-stroke-sharp IconDashboardCircleStrokeSharp"
    >
      <circle 
        cx="17.75" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="6.25" 
        cy="17.75" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconDashboardCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-solid-sharp IconDashboardCircleSolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDashboardCircle: TheIconSelfPack = {
  name: 'DashboardCircle',
  StrokeRounded: IconDashboardCircleStrokeRounded,
  DuotoneRounded: IconDashboardCircleDuotoneRounded,
  TwotoneRounded: IconDashboardCircleTwotoneRounded,
  SolidRounded: IconDashboardCircleSolidRounded,
  BulkRounded: IconDashboardCircleBulkRounded,
  StrokeSharp: IconDashboardCircleStrokeSharp,
  SolidSharp: IconDashboardCircleSolidSharp,
};