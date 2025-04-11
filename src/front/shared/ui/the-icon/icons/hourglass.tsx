import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 2V5C19 8.86599 15.866 12 12 12M5 2V5C5 8.86599 8.13401 12 12 12M12 12C15.866 12 19 15.134 19 19V22M12 12C8.13401 12 5 15.134 5 19V22',
  d2: 'M4 2H20M20 22H4',
  d3: 'M5 19V22L19 22V19C19 15.134 15.866 12 12 12C8.13401 12 5 15.134 5 19Z',
  d4: 'M19 2V5C19 8.86599 15.866 12 12 12C8.13401 12 5 8.86599 5 5V2',
  d5: 'M19 22V19C19 15.134 15.866 12 12 12C8.13401 12 5 15.134 5 19V22',
  d6: 'M6.1875 2.25V5.11364C6.1875 8.27672 8.78984 10.8409 12 10.8409C15.2102 10.8409 17.8125 8.27672 17.8125 5.11364V2.25H19.75V5.11364C19.75 9.33108 16.2802 12.75 12 12.75C7.71979 12.75 4.25 9.33108 4.25 5.11364V2.25H6.1875Z',
  d7: 'M4.25 21.75H19.75V18.8864C19.75 14.6689 16.2802 11.25 12 11.25C7.71979 11.25 4.25 14.6689 4.25 18.8864V21.75Z',
  d8: 'M3 2C3 1.44772 3.44772 1 4 1H20C20.5523 1 21 1.44772 21 2C21 2.55228 20.5523 3 20 3H4C3.44772 3 3 2.55228 3 2ZM3 22C3 21.4477 3.44772 21 4 21H20C20.5523 21 21 21.4477 21 22C21 22.5523 20.5523 23 20 23H4C3.44772 23 3 22.5523 3 22Z',
  d9: 'M3 2H21M21 22H3',
  d10: 'M6.1875 2.25V5.175C6.1875 8.40587 8.78984 11.025 12 11.025C15.2102 11.025 17.8125 8.40587 17.8125 5.175V2.25H19.75V5.175C19.75 8.11173 18.1374 10.6694 15.7549 12C18.1374 13.3306 19.75 15.8883 19.75 18.825V21.75L4.25 21.75V18.825C4.25 15.8883 5.86256 13.3306 8.24512 12C5.86256 10.6694 4.25 8.11173 4.25 5.175V2.25H6.1875Z',
  d11: 'M3 1H21V3H3V1ZM3 21H21V23H3V21Z',
};

export const IconHourglassStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass StrokeRounded"
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

export const IconHourglassDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass DuotoneRounded"
    >
      <path 
        d={d.d3}
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

export const IconHourglassTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass TwotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconHourglassSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Hourglass SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHourglass: TheIconSelfPack = [
  'Hourglass',
  IconHourglassStrokeRounded,
  IconHourglassDuotoneRounded,
  IconHourglassTwotoneRounded,
  IconHourglassSolidRounded,
  IconHourglassBulkRounded,
  IconHourglassStrokeSharp,
  IconHourglassSolidSharp,
];