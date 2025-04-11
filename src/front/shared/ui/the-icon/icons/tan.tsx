import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.5 17L9.7 13M14.5 17L13.3 13M9.7 13L11.5 7L13.3 13M9.7 13H13.3',
  d2: 'M22 7V17L17 7V17',
  d3: 'M2 7H4.5M7 7H4.5M4.5 17V7',
  d4: 'M11.5003 6C11.9419 6 12.3312 6.28967 12.4581 6.71265L15.4581 16.7127C15.6168 17.2416 15.3166 17.7991 14.7876 17.9578C14.2586 18.1165 13.7011 17.8163 13.5424 17.2873L12.5562 14H10.4443L9.45809 17.2873C9.29939 17.8163 8.74191 18.1165 8.21292 17.9578C7.68392 17.7991 7.38374 17.2416 7.54244 16.7127L10.5424 6.71265C10.6693 6.28967 11.0587 6 11.5003 6ZM11.0443 12H11.9562L11.5003 10.4801L11.0443 12Z',
  d5: 'M16.7702 6.02685C17.2216 5.92029 17.687 6.13807 17.8944 6.55288L21 12.764V7.0001C21 6.44781 21.4477 6.0001 22 6.0001C22.5523 6.0001 23 6.44781 23 7.0001V17.0001C23 17.4639 22.6811 17.8668 22.2298 17.9733C21.7784 18.0799 21.313 17.8621 21.1056 17.4473L18 11.2362V17.0001C18 17.5524 17.5523 18.0001 17 18.0001C16.4477 18.0001 16 17.5524 16 17.0001V7.0001C16 6.53632 16.3189 6.1334 16.7702 6.02685Z',
  d6: 'M1 7C1 6.44772 1.44772 6 2 6H7C7.55228 6 8 6.44772 8 7C8 7.55228 7.55228 8 7 8H5.5V17C5.5 17.5523 5.05228 18 4.5 18C3.94772 18 3.5 17.5523 3.5 17V8H2C1.44772 8 1 7.55228 1 7Z',
  d7: 'M7.5 17.5L10.5 7H11.5L14.5 17.5M9 13.5H13',
  d8: 'M22 6.5V17L17 7V17.5',
  d9: 'M2 7H4.5M7 7H4.5M4.5 17.5V7',
  d10: 'M9.7455 6H12.2541L15.4621 17.4506L13.5391 18L12.6026 14.5H9.39697L8.46211 18L6.53906 17.4506L9.7455 6ZM9.96839 12.5H12.0312L10.9998 8.89006L9.96839 12.5Z',
  d11: 'M16.7702 6.02685C17.2216 5.92029 17.687 6.13807 17.8944 6.55288L21 12.764V6.5001H23V17.0001C23 17.4639 22.6811 17.8668 22.2298 17.9733C21.7784 18.0799 21.313 17.8621 21.1056 17.4473L18 11.2362V17.9733H16V7.0001C16 6.53632 16.3189 6.1334 16.7702 6.02685Z',
  d12: 'M3.5 8H2V6H7V8H5.5V18H3.5V8Z',
};

export const IconTanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconTanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tan SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTan: TheIconSelfPack = [
  'Tan',
  IconTanStrokeRounded,
  IconTanDuotoneRounded,
  IconTanTwotoneRounded,
  IconTanSolidRounded,
  IconTanBulkRounded,
  IconTanStrokeSharp,
  IconTanSolidSharp,
];