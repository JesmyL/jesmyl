import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 2V10M22 6L14 6',
  d2: 'M1.25 6C1.25 3.37665 3.37665 1.25 6 1.25C8.62335 1.25 10.75 3.37665 10.75 6C10.75 8.62335 8.62335 10.75 6 10.75C3.37665 10.75 1.25 8.62335 1.25 6Z',
  d3: 'M1.25 18C1.25 15.3766 3.37665 13.25 6 13.25C8.62335 13.25 10.75 15.3766 10.75 18C10.75 20.6234 8.62335 22.75 6 22.75C3.37665 22.75 1.25 20.6234 1.25 18Z',
  d4: 'M13.25 18C13.25 15.3766 15.3766 13.25 18 13.25C20.6234 13.25 22.75 15.3766 22.75 18C22.75 20.6234 20.6234 22.75 18 22.75C15.3766 22.75 13.25 20.6234 13.25 18Z',
  d5: 'M17.75 1.75C18.3023 1.75 18.75 2.19772 18.75 2.75V5.25L21.25 5.25C21.8023 5.25 22.25 5.69772 22.25 6.25C22.25 6.80228 21.8023 7.25 21.25 7.25H18.75V9.75C18.75 10.3023 18.3023 10.75 17.75 10.75C17.1977 10.75 16.75 10.3023 16.75 9.75V7.25H14.25C13.6977 7.25 13.25 6.80228 13.25 6.25C13.25 5.69771 13.6977 5.25 14.25 5.25L16.75 5.25V2.75C16.75 2.19772 17.1977 1.75 17.75 1.75Z',
  d6: 'M1.25 6.25C1.25 3.48858 3.48858 1.25 6.25 1.25C9.01142 1.25 11.25 3.48858 11.25 6.25C11.25 9.01142 9.01142 11.25 6.25 11.25C3.48858 11.25 1.25 9.01142 1.25 6.25Z',
  d7: 'M12.75 17.75C12.75 14.9886 14.9886 12.75 17.75 12.75C20.5114 12.75 22.75 14.9886 22.75 17.75C22.75 20.5114 20.5114 22.75 17.75 22.75C14.9886 22.75 12.75 20.5114 12.75 17.75Z',
  d8: 'M1.25 17.75C1.25 14.9886 3.48858 12.75 6.25 12.75C9.01142 12.75 11.25 14.9886 11.25 17.75C11.25 20.5114 9.01142 22.75 6.25 22.75C3.48858 22.75 1.25 20.5114 1.25 17.75Z',
  d9: 'M17 5V2H19V5L22 5V7H19V10H17V7H14V5L17 5Z',
};

export const IconDashboardCircleAddStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-stroke-rounded IconDashboardCircleAddStrokeRounded"
    >
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

export const IconDashboardCircleAddDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-duotone-rounded IconDashboardCircleAddDuotoneRounded"
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

export const IconDashboardCircleAddTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-twotone-rounded IconDashboardCircleAddTwotoneRounded"
    >
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

export const IconDashboardCircleAddSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-solid-rounded IconDashboardCircleAddSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleAddBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-bulk-rounded IconDashboardCircleAddBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleAddStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-stroke-sharp IconDashboardCircleAddStrokeSharp"
    >
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
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleAddSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-add-solid-sharp IconDashboardCircleAddSolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDashboardCircleAdd: TheIconSelfPack = {
  name: 'DashboardCircleAdd',
  StrokeRounded: IconDashboardCircleAddStrokeRounded,
  DuotoneRounded: IconDashboardCircleAddDuotoneRounded,
  TwotoneRounded: IconDashboardCircleAddTwotoneRounded,
  SolidRounded: IconDashboardCircleAddSolidRounded,
  BulkRounded: IconDashboardCircleAddBulkRounded,
  StrokeSharp: IconDashboardCircleAddStrokeSharp,
  SolidSharp: IconDashboardCircleAddSolidSharp,
};