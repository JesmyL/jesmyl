import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 6.00013L14 6',
  d2: 'M1.25009 5.99985C1.25009 3.37649 3.37674 1.24985 6.00009 1.24985C8.62344 1.24985 10.7501 3.37649 10.7501 5.99985C10.7501 8.6232 8.62344 10.7498 6.00009 10.7498C3.37674 10.7498 1.25009 8.6232 1.25009 5.99985Z',
  d3: 'M1.25009 17.9998C1.25009 15.3765 3.37674 13.2498 6.00009 13.2498C8.62344 13.2498 10.7501 15.3765 10.7501 17.9998C10.7501 20.6232 8.62344 22.7498 6.00009 22.7498C3.37674 22.7498 1.25009 20.6232 1.25009 17.9998Z',
  d4: 'M13.2501 17.9998C13.2501 15.3765 15.3767 13.2498 18.0001 13.2498C20.6234 13.2498 22.7501 15.3765 22.7501 17.9998C22.7501 20.6232 20.6234 22.7498 18.0001 22.7498C15.3767 22.7498 13.2501 20.6232 13.2501 17.9998Z',
  d5: 'M14.2501 5.24985H21.2501C21.8024 5.24985 22.2501 5.69756 22.2501 6.24985C22.2501 6.80213 21.8024 7.24985 21.2501 7.24985L14.2501 7.24985C13.6978 7.24985 13.2501 6.80213 13.2501 6.24985C13.2501 5.69756 13.6978 5.24985 14.2501 5.24985Z',
  d6: 'M1.25 6.25C1.25 3.48858 3.48858 1.25 6.25 1.25C9.01142 1.25 11.25 3.48858 11.25 6.25C11.25 9.01142 9.01142 11.25 6.25 11.25C3.48858 11.25 1.25 9.01142 1.25 6.25Z',
  d7: 'M12.75 17.75C12.75 14.9886 14.9886 12.75 17.75 12.75C20.5114 12.75 22.75 14.9886 22.75 17.75C22.75 20.5114 20.5114 22.75 17.75 22.75C14.9886 22.75 12.75 20.5114 12.75 17.75Z',
  d8: 'M1.25 17.75C1.25 14.9886 3.48858 12.75 6.25 12.75C9.01142 12.75 11.25 14.9886 11.25 17.75C11.25 20.5114 9.01142 22.75 6.25 22.75C3.48858 22.75 1.25 20.5114 1.25 17.75Z',
  d9: 'M14 5L22 5.00013L22 7.00013L14 7L14 5Z',
};

export const IconDashboardCircleRemoveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-stroke-rounded IconDashboardCircleRemoveStrokeRounded"
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

export const IconDashboardCircleRemoveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-duotone-rounded IconDashboardCircleRemoveDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6.25" 
        cy="6.25" 
        r="4.25" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.75" 
        cy="17.75" 
        r="4.25" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17.75" 
        cy="17.75" 
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

export const IconDashboardCircleRemoveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-twotone-rounded IconDashboardCircleRemoveTwotoneRounded"
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

export const IconDashboardCircleRemoveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-solid-rounded IconDashboardCircleRemoveSolidRounded"
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
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleRemoveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-bulk-rounded IconDashboardCircleRemoveBulkRounded"
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
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleRemoveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-stroke-sharp IconDashboardCircleRemoveStrokeSharp"
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

export const IconDashboardCircleRemoveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-remove-solid-sharp IconDashboardCircleRemoveSolidSharp"
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

export const iconPackOfDashboardCircleRemove: TheIconSelfPack = {
  name: 'DashboardCircleRemove',
  StrokeRounded: IconDashboardCircleRemoveStrokeRounded,
  DuotoneRounded: IconDashboardCircleRemoveDuotoneRounded,
  TwotoneRounded: IconDashboardCircleRemoveTwotoneRounded,
  SolidRounded: IconDashboardCircleRemoveSolidRounded,
  BulkRounded: IconDashboardCircleRemoveBulkRounded,
  StrokeSharp: IconDashboardCircleRemoveStrokeSharp,
  SolidSharp: IconDashboardCircleRemoveSolidSharp,
};