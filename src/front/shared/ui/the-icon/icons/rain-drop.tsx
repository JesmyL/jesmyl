import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z',
  d2: 'M12 22C6.71878 22 3.5 17.7804 3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.2766 2.32407 11.1383 2 12 2',
  d3: 'M9.07766 2.42838C10.7321 0.857205 13.2679 0.857205 14.9223 2.42838C16.2023 3.64397 17.7707 5.31956 19.0237 7.24155C20.2711 9.15491 21.25 11.3797 21.25 13.678C21.25 18.1459 17.7426 22.75 12 22.75C6.25744 22.75 2.75 18.1459 2.75 13.678C2.75 11.3797 3.72892 9.1549 4.97628 7.24155C6.22927 5.31956 7.79766 3.64397 9.07766 2.42838Z',
  d4: 'M20.5 13.5C20.5 18.1944 16.6944 22 12 22C7.30558 22 3.5 18.1944 3.5 13.5C3.5 7 12 2 12 2C12 2 20.5 7 20.5 13.5Z',
  d5: 'M12 1.25C12.2416 1.40445 13.3549 2.09508 13.7646 2.3867C14.5828 2.96899 15.6761 3.81609 16.7724 4.8742C18.9337 6.96036 21.25 10.0049 21.25 13.5514C21.25 18.6316 17.1086 22.75 12 22.75C6.89137 22.75 2.75 18.6316 2.75 13.5514C2.75 10.0049 5.06626 6.96036 7.22764 4.8742C8.32391 3.81609 9.41722 2.96899 10.2354 2.3867C10.6451 2.09508 11.7584 1.40445 12 1.25Z',
};

export const IconRainDropStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop StrokeSharp"
    >
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRainDropSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RainDrop SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRainDrop: TheIconSelfPack = [
  'RainDrop',
  IconRainDropStrokeRounded,
  IconRainDropDuotoneRounded,
  IconRainDropTwotoneRounded,
  IconRainDropSolidRounded,
  IconRainDropBulkRounded,
  IconRainDropStrokeSharp,
  IconRainDropSolidSharp,
];