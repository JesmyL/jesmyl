import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 3C20 3 13 19 2 19',
  d2: 'M11 19H13M16 19L18 19M18 19C18 20.1046 18.8954 21 20 21C21.1046 21 22 20.1046 22 19C22 17.8954 21.1046 17 20 17C18.8954 17 18 17.8954 18 19Z',
  d3: 'M22 19C22 20.1046 21.1046 21 20 21C18.8954 21 18 20.1046 18 19C18 17.8954 18.8954 17 20 17C21.1046 17 22 17.8954 22 19Z',
  d4: 'M19.0838 2.59918L19.0806 2.60659L19.0672 2.6366C19.0549 2.66398 19.0359 2.70593 19.0104 2.76147C18.9592 2.87257 18.8817 3.03798 18.7785 3.24995C18.5722 3.67402 18.2637 4.28358 17.8589 5.01668C17.0482 6.48524 15.8578 8.43764 14.337 10.3844C11.2511 14.3343 7.01081 18 2 18C1.44772 18 1 18.4477 1 19C1 19.5523 1.44772 20 2 20C7.9892 20 12.7489 15.6657 15.913 11.6156C17.5172 9.56236 18.7643 7.51476 19.6098 5.98332C20.0332 5.21642 20.3575 4.57598 20.5769 4.12505C20.6867 3.89952 20.7703 3.72118 20.8271 3.5979C20.8554 3.53626 20.8771 3.48836 20.892 3.45519L20.9092 3.4166L20.914 3.40581L20.9159 3.40152C20.916 3.40114 20.9162 3.40082 20 3L20.9159 3.40152C21.1372 2.89554 20.9068 2.30521 20.4008 2.08384C19.895 1.86253 19.3053 2.09343 19.0838 2.59918Z',
  d5: 'M17.1707 18C17.5825 16.8348 18.6938 16 20 16C21.6569 16 23 17.3431 23 19C23 20.6569 21.6569 22 20 22C18.6938 22 17.5825 21.1652 17.1707 20L16 20C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18H17.1707Z',
  d6: 'M10 19C10 18.4477 10.4477 18 11 18H13C13.5523 18 14 18.4477 14 19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19Z',
  d7: 'M18.584 2.25L19.5 2.65115C20.4162 3.05197 20.4159 3.05267 20.4159 3.05267L20.414 3.05696L20.4092 3.06775L20.392 3.10635C20.3771 3.13952 20.3554 3.18741 20.327 3.24906C20.2703 3.37234 20.1867 3.55067 20.0769 3.77621C19.8575 4.22713 19.5332 4.86757 19.1098 5.63447C18.2643 7.16591 17.0172 9.51294 15.413 11.5662C12.2489 15.6163 7.4892 19.9506 1.5 19.9506V17.9506C6.5108 17.9506 10.7511 14.2849 13.837 10.3349C15.3578 8.38823 16.5482 6.13639 17.3589 4.66783C17.7637 3.93474 18.0722 3.32517 18.2785 2.9011C18.3817 2.68913 18.584 2.25 18.584 2.25Z',
  d8: 'M16.6707 17.75C17.0825 16.5848 18.1938 15.75 19.5 15.75C21.1569 15.75 22.5 17.0931 22.5 18.75C22.5 20.4069 21.1569 21.75 19.5 21.75C18.1938 21.75 17.0825 20.9152 16.6707 19.75L14.5 19.75V17.75H16.6707Z',
  d9: 'M12.5 19.75H10.5V17.75H12.5V19.75Z',
};

export const IconEaseInControlPointStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-stroke-rounded IconEaseInControlPointStrokeRounded"
    >
      <path 
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

export const IconEaseInControlPointDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-duotone-rounded IconEaseInControlPointDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconEaseInControlPointTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-twotone-rounded IconEaseInControlPointTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInControlPointSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-solid-rounded IconEaseInControlPointSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInControlPointBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-bulk-rounded IconEaseInControlPointBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconEaseInControlPointStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-stroke-sharp IconEaseInControlPointStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInControlPointSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-control-point-solid-sharp IconEaseInControlPointSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEaseInControlPoint: TheIconSelfPack = {
  name: 'EaseInControlPoint',
  StrokeRounded: IconEaseInControlPointStrokeRounded,
  DuotoneRounded: IconEaseInControlPointDuotoneRounded,
  TwotoneRounded: IconEaseInControlPointTwotoneRounded,
  SolidRounded: IconEaseInControlPointSolidRounded,
  BulkRounded: IconEaseInControlPointBulkRounded,
  StrokeSharp: IconEaseInControlPointStrokeSharp,
  SolidSharp: IconEaseInControlPointSolidSharp,
};