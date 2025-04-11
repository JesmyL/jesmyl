import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12',
  d2: 'M14.25 5C14.25 2.92893 15.9289 1.25 18 1.25C20.0711 1.25 21.75 2.92893 21.75 5C21.75 7.07107 20.0711 8.75 18 8.75C15.9289 8.75 14.25 7.07107 14.25 5Z',
  d3: 'M2.25 19C2.25 16.9289 3.92893 15.25 6 15.25C8.07107 15.25 9.75 16.9289 9.75 19C9.75 21.0711 8.07107 22.75 6 22.75C3.92893 22.75 2.25 21.0711 2.25 19Z',
  d4: 'M4 8.5C4 6.01472 6.01472 4 8.5 4H12C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6H8.5C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11H15.5C17.9853 11 20 13.0147 20 15.5C20 17.9853 17.9853 20 15.5 20H12C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18H15.5C16.8807 18 18 16.8807 18 15.5C18 14.1193 16.8807 13 15.5 13H8.5C6.01472 13 4 10.9853 4 8.5Z',
  d5: 'M4 8.5C4 6.01472 6.01472 4 8.5 4H12V6H8.5C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11H15.5C17.9853 11 20 13.0147 20 15.5C20 17.9853 17.9853 20 15.5 20H12V18H15.5C16.8807 18 18 16.8807 18 15.5C18 14.1193 16.8807 13 15.5 13H8.5C6.01472 13 4 10.9853 4 8.5Z',
};

export const IconRoute01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 StrokeRounded"
    >
      <circle 
        cx="18"
        cy="5"
        r="3"
        i-c="s sj sr sw"
      />
      <circle 
        cx="6"
        cy="19"
        r="3"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 DuotoneRounded"
    >
      <circle 
        cx="18"
        cy="5"
        r="3"
        i-c="f o7"
      />
      <circle 
        cx="18"
        cy="5"
        r="3"
        i-c="s sj sr sw"
      />
      <circle 
        cx="6"
        cy="19"
        r="3"
        i-c="f o7"
      />
      <circle 
        cx="6"
        cy="19"
        r="3"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 TwotoneRounded"
    >
      <circle 
        cx="18"
        cy="5"
        r="3"
        i-c="o7 s sj sr sw"
      />
      <circle 
        cx="6"
        cy="19"
        r="3"
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 StrokeSharp"
    >
      <circle 
        cx="18"
        cy="5"
        r="3"
        i-c="s sj sw"
      />
      <circle 
        cx="6"
        cy="19"
        r="3"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRoute01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Route01 SolidSharp"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRoute01: TheIconSelfPack = [
  'Route01',
  IconRoute01StrokeRounded,
  IconRoute01DuotoneRounded,
  IconRoute01TwotoneRounded,
  IconRoute01SolidRounded,
  IconRoute01BulkRounded,
  IconRoute01StrokeSharp,
  IconRoute01SolidSharp,
];