import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2C16.8706 2 21 6.03298 21 10.9258C21 15.8965 16.8033 19.3847 12.927 21.7567C12.6445 21.9162 12.325 22 12 22C11.675 22 11.3555 21.9162 11.073 21.7567C7.2039 19.3616 3 15.9137 3 10.9258C3 6.03298 7.12944 2 12 2Z',
  d2: 'M15.5 11H12M12 11H8.5M12 11V14.5M12 11L12 7.5',
  d3: 'M12 1.25C6.72451 1.25 2.25 5.60954 2.25 10.9258C2.25 13.6482 3.40187 15.9241 5.01689 17.8025C6.62496 19.6728 8.71834 21.1811 10.6782 22.3944L10.6911 22.4024L10.7043 22.4098C11.0996 22.6329 11.546 22.75 12 22.75C12.454 22.75 12.9004 22.6329 13.2957 22.4098L13.3072 22.4033L13.3185 22.3964C15.2855 21.1928 17.3793 19.6796 18.9866 17.8038C20.6003 15.9206 21.75 13.6392 21.75 10.9258C21.75 5.60954 17.2755 1.25 12 1.25ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7L11 10H8C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V12H16C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10H13L13 7Z',
  d4: 'M2.25 10.9258C2.25 5.60954 6.72451 1.25 12 1.25C17.2755 1.25 21.75 5.60954 21.75 10.9258C21.75 13.6392 20.6003 15.9206 18.9866 17.8038C17.3793 19.6796 15.2855 21.1928 13.3185 22.3964L13.3072 22.4033L13.2957 22.4098C12.9004 22.6329 12.454 22.75 12 22.75C11.546 22.75 11.0996 22.6329 10.7043 22.4098L10.6911 22.4024L10.6782 22.3944C8.71834 21.1811 6.62496 19.6728 5.01689 17.8025C3.40187 15.9241 2.25 13.6482 2.25 10.9258Z',
  d5: 'M12 6C12.5523 6 13 6.44772 13 7L13 10H16C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12H13L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15L11 12H8C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10H11L11 7C11 6.44772 11.4477 6 12 6Z',
  d6: 'M12 2C7.58172 2 4 5.61783 4 10.0807C4 12.6325 5 14.6167 7 16.389C8.40971 17.6382 10.9746 20.3179 12 21.9999C13.0773 20.3514 15.5903 17.6382 17 16.389C19 14.6167 20 12.6325 20 10.0807C20 5.61783 16.4183 2 12 2Z',
  d7: 'M16 10H12M12 10H8M12 10V14M12 10L12 6',
  d8: 'M12 1.25C7.16043 1.25 3.25 5.21073 3.25 10.0807C3.25 12.8754 4.36442 15.0556 6.50258 16.9503C7.89367 18.183 10.3925 20.804 11.3596 22.3903C11.4936 22.61 11.7309 22.7457 11.9882 22.7498C12.2456 22.7538 12.487 22.6256 12.6278 22.4101C13.6574 20.8346 16.1198 18.1711 17.4974 16.9503C19.6356 15.0556 20.75 12.8754 20.75 10.0807C20.75 5.21073 16.8396 1.25 12 1.25ZM11 14V11H8V9H11L11 6H13V9H16V11H13V14H11Z',
};

export const IconLocationAdd02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconLocationAdd02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LocationAdd02 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocationAdd02: TheIconSelfPack = [
  'LocationAdd02',
  IconLocationAdd02StrokeRounded,
  IconLocationAdd02DuotoneRounded,
  IconLocationAdd02TwotoneRounded,
  IconLocationAdd02SolidRounded,
  IconLocationAdd02BulkRounded,
  IconLocationAdd02StrokeSharp,
  IconLocationAdd02SolidSharp,
];