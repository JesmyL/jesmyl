import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2V22',
  d2: 'M22 12L2 12',
  d3: 'M8 18.5C8 19.8807 6.88071 21 5.5 21C4.11929 21 3 19.8807 3 18.5C3 17.1193 4.11929 16 5.5 16C6.88071 16 8 17.1193 8 18.5Z',
  d4: 'M16 3L21 8M21 3L16 8',
  d5: 'M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z',
  d6: 'M5.5 17C4.67157 17 4 17.6716 4 18.5C4 19.3284 4.67157 20 5.5 20C6.32843 20 7 19.3284 7 18.5C7 17.6716 6.32843 17 5.5 17ZM2 18.5C2 16.567 3.567 15 5.5 15C7.433 15 9 16.567 9 18.5C9 20.433 7.433 22 5.5 22C3.567 22 2 20.433 2 18.5Z',
  d7: 'M15.2929 2.29289C15.6834 1.90237 16.3166 1.90237 16.7071 2.29289L18.5 4.08579L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L19.9142 5.5L21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711C21.3166 9.09763 20.6834 9.09763 20.2929 8.70711L18.5 6.91421L16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289L17.0858 5.5L15.2929 3.70711C14.9024 3.31658 14.9024 2.68342 15.2929 2.29289Z',
  d8: 'M11 22V2H13V22H11Z',
  d9: 'M2 11L22 11L22 13L2 13L2 11Z',
  d10: 'M18.5 4.08586L20.2929 2.29297L21.7071 3.70718L19.9142 5.50008L21.7071 7.29297L20.2929 8.70718L18.5 6.91429L16.7071 8.70718L15.2929 7.29297L17.0858 5.50008L15.2929 3.70718L16.7071 2.29297L18.5 4.08586Z',
};

export const IconTicTacToeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe StrokeRounded"
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
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe DuotoneRounded"
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
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe TwotoneRounded"
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
        i-c="o7 s sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconTicTacToeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TicTacToe SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTicTacToe: TheIconSelfPack = [
  'TicTacToe',
  IconTicTacToeStrokeRounded,
  IconTicTacToeDuotoneRounded,
  IconTicTacToeTwotoneRounded,
  IconTicTacToeSolidRounded,
  IconTicTacToeBulkRounded,
  IconTicTacToeStrokeSharp,
  IconTicTacToeSolidSharp,
];