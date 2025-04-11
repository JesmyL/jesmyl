import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H13.5M10.5 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H10.5',
  d2: 'M9 12H15',
  d3: 'M13.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H13.5H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H13.5Z',
  d4: 'M7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H7C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H7ZM13 7C13 6.44772 13.4477 6 14 6H17C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8H14C13.4477 8 13 7.55228 13 7Z',
  d5: 'M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z',
  d6: 'M8 12H16',
  d7: 'M7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H10.5V18H7C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6H10.5V8H7ZM17 8H13.5V6H17C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H13.5V16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8Z',
  d8: 'M16 13H8V11H16V13Z',
};

export const IconLink05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLink05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconLink05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconLink05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Link05 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLink05: TheIconSelfPack = [
  'Link05',
  IconLink05StrokeRounded,
  IconLink05DuotoneRounded,
  IconLink05TwotoneRounded,
  IconLink05SolidRounded,
  IconLink05BulkRounded,
  IconLink05StrokeSharp,
  IconLink05SolidSharp,
];