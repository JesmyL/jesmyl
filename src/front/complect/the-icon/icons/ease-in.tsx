import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 4C21 4 14 20 3 20',
  d2: 'M3 20C7.35604 20 11.0848 17.531 14 14.5',
  d3: 'M20.0838 3.59918L20.0806 3.60659L20.0672 3.6366C20.0549 3.66398 20.0359 3.70593 20.0104 3.76147C19.9592 3.87257 19.8817 4.03798 19.7785 4.24995C19.5722 4.67402 19.2637 5.28358 18.8589 6.01668C18.0482 7.48524 16.8578 9.43764 15.337 11.3844C12.2511 15.3343 8.01081 19 3 19C2.44772 19 2 19.4477 2 20C2 20.5523 2.44772 21 3 21C8.9892 21 13.7489 16.6657 16.913 12.6156C18.5172 10.5624 19.7643 8.51476 20.6098 6.98332C21.0332 6.21642 21.3575 5.57598 21.5769 5.12505C21.6867 4.89952 21.7703 4.72118 21.8271 4.5979C21.8554 4.53626 21.8771 4.48836 21.892 4.45519L21.9092 4.4166L21.914 4.40581L21.9159 4.40152C21.916 4.40114 21.9162 4.40082 21 4L21.9159 4.40152C22.1372 3.89554 21.9068 3.30521 21.4008 3.08384C20.895 2.86253 20.3053 3.09343 20.0838 3.59918Z',
  d4: 'M21.4008 3.08203C21.9068 3.3034 22.1375 3.89303 21.9162 4.39901L21 3.99819C21.9162 4.39901 21.9163 4.39863 21.9162 4.39901L21.914 4.404L21.9092 4.41479L21.892 4.45338C21.8771 4.48655 21.8554 4.53445 21.827 4.59609C21.7703 4.71937 21.6867 4.89771 21.5769 5.12324C21.3575 5.57417 21.0332 6.2146 20.6098 6.98151C19.7643 8.51295 18.5172 10.5605 16.913 12.6138C13.7489 16.6639 8.9892 20.9982 3 20.9982C2.44772 20.9982 2 20.5505 2 19.9982C2 19.4459 2.44772 18.9982 3 18.9982C8.0108 18.9982 12.2511 15.3325 15.337 11.3825C16.8578 9.43583 18.0482 7.48343 18.8589 6.01487C19.2637 5.28177 19.5722 4.67221 19.7785 4.24813C19.8817 4.03617 19.9592 3.87075 20.0104 3.75966C20.0359 3.70412 20.0549 3.66217 20.0672 3.63479L20.0806 3.60478L20.0835 3.59821C20.0835 3.59809 20.0839 3.59715 20.084 3.59704',
  d5: 'M14.6932 13.7793C15.0913 14.1621 15.1036 14.7952 14.7207 15.1932C11.7211 18.312 7.74846 21.0001 3 21.0001C2.44772 21.0001 2 20.5523 2 20.0001C2 19.4478 2.44772 19.0001 3 19.0001C6.96363 19.0001 10.4485 16.75 13.2793 13.8068C13.6621 13.4087 14.2952 13.3964 14.6932 13.7793Z',
  d6: 'M21.25 4.37511C21.25 4.37511 20.7832 5.71637 20.3598 6.48328C19.5143 8.01472 18.2672 10.0623 16.663 12.1156C13.4989 16.1657 8.7392 20.5 2.75 20.5V18.5C7.7608 18.5 12.0011 14.8342 15.087 10.8843C16.6078 8.9376 17.7982 6.9852 18.6089 5.51664C19.0137 4.78354 19.4516 3.5 19.4516 3.5L21.25 4.37511Z',
};

export const IconEaseInStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-stroke-rounded IconEaseInStrokeRounded"
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

export const IconEaseInDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-duotone-rounded IconEaseInDuotoneRounded"
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

export const IconEaseInTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-twotone-rounded IconEaseInTwotoneRounded"
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

export const IconEaseInSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-solid-rounded IconEaseInSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-bulk-rounded IconEaseInBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconEaseInStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-stroke-sharp IconEaseInStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEaseInSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ease-in-solid-sharp IconEaseInSolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEaseIn: TheIconSelfPack = {
  name: 'EaseIn',
  StrokeRounded: IconEaseInStrokeRounded,
  DuotoneRounded: IconEaseInDuotoneRounded,
  TwotoneRounded: IconEaseInTwotoneRounded,
  SolidRounded: IconEaseInSolidRounded,
  BulkRounded: IconEaseInBulkRounded,
  StrokeSharp: IconEaseInStrokeSharp,
  SolidSharp: IconEaseInSolidSharp,
};