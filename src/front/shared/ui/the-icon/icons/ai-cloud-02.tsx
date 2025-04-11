import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.4776 8.00005C17.485 8.00002 17.4925 8 17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.4593 20.7478 16.1262 19 16.7439M17.4776 8.00005C17.4924 7.83536 17.5 7.66856 17.5 7.5C17.5 4.46243 15.0376 2 12 2C9.12324 2 6.76233 4.20862 6.52042 7.0227M17.4776 8.00005C17.3753 9.1345 16.9286 10.1696 16.2428 11M6.52042 7.0227C3.98398 7.26407 2 9.40034 2 12C2 14.0503 3.2341 15.8124 5 16.584M6.52042 7.0227C6.67826 7.00768 6.83823 7 7 7C8.12582 7 9.16474 7.37209 10.0005 8',
  d2: 'M18.25 21.25L16 19L16 17M18.25 20.5C17.8358 20.5 17.5 20.8358 17.5 21.25C17.5 21.6642 17.8358 22 18.25 22C18.6642 22 19 21.6642 19 21.25C19 20.8358 18.6642 20.5 18.25 20.5Z',
  d3: 'M5.75 21.25L8 19L8 17M5.75 20.5C6.16421 20.5 6.5 20.8358 6.5 21.25C6.5 21.6642 6.16421 22 5.75 22C5.33579 22 5 21.6642 5 21.25C5 20.8358 5.33579 20.5 5.75 20.5Z',
  d4: 'M12 21.25L12 17M12 20.5C11.5858 20.5 11.25 20.8358 11.25 21.25C11.25 21.6642 11.5858 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25C12.75 20.8358 12.4142 20.5 12 20.5Z',
  d5: 'M17.5 7.5C17.5 4.46243 15.0376 2 12 2C9.12324 2 6.76233 4.20862 6.52042 7.0227C3.98398 7.26407 2 9.40034 2 12C2 14.0503 3.2341 15.8124 5 16.584L19 16.7439C20.7478 16.1262 22 14.4593 22 12.5C22 10.0147 19.9853 8 17.5 8L17.4776 8.00005C17.4924 7.83536 17.5 7.66856 17.5 7.5Z',
  d6: 'M18.25 19.75C19.0784 19.75 19.75 20.4216 19.75 21.25C19.75 22.0784 19.0784 22.75 18.25 22.75C17.4216 22.75 16.75 22.0784 16.75 21.25C16.75 21.1156 16.7677 20.9854 16.8008 20.8615L15.4697 19.5303C15.329 19.3897 15.25 19.1989 15.25 19L15.25 17C15.25 16.5858 15.5858 16.25 16 16.25C16.4142 16.25 16.75 16.5858 16.75 17L16.75 18.6893L17.8615 19.8008C17.9854 19.7677 18.1156 19.75 18.25 19.75Z',
  d7: 'M8 16.25C8.41421 16.25 8.75 16.5858 8.75 17L8.75 19C8.75 19.1989 8.67098 19.3897 8.53033 19.5303L7.19919 20.8615C7.23233 20.9854 7.25 21.1156 7.25 21.25C7.25 22.0784 6.57843 22.75 5.75 22.75C4.92157 22.75 4.25 22.0784 4.25 21.25C4.25 20.4216 4.92157 19.75 5.75 19.75C5.88437 19.75 6.01461 19.7677 6.13853 19.8008L7.25 18.6893L7.25 17C7.25 16.5858 7.58579 16.25 8 16.25Z',
  d8: 'M12.75 19.9507C13.1984 20.21 13.5 20.6948 13.5 21.25C13.5 22.0784 12.8284 22.75 12 22.75C11.1716 22.75 10.5 22.0784 10.5 21.25C10.5 20.6948 10.8016 20.21 11.25 19.9507L11.25 17C11.25 16.5858 11.5858 16.25 12 16.25C12.4142 16.25 12.75 16.5858 12.75 17L12.75 19.9507Z',
  d9: 'M5.853 6.36454C3.22664 6.89643 1.25 9.21699 1.25 12C1.25 14.7464 3.17541 17.043 5.75 17.6137V17C5.75 15.7574 6.75736 14.75 8 14.75C8.87073 14.75 9.62594 15.2446 10 15.9682C10.3741 15.2446 11.1293 14.75 12 14.75C12.8707 14.75 13.6259 15.2446 14 15.9682C14.3741 15.2446 15.1293 14.75 16 14.75C17.2426 14.75 18.25 15.7574 18.25 17V17.6968C20.7942 17.3329 22.75 15.1449 22.75 12.5C22.75 9.85409 20.7927 7.66534 18.2469 7.30273C18.1428 3.94224 15.3858 1.25 12 1.25C8.93585 1.25 6.38731 3.45456 5.853 6.36454Z',
  d10: 'M18.25 21.25L16 19L16 16M18.25 20.5C17.8358 20.5 17.5 20.8358 17.5 21.25C17.5 21.6642 17.8358 22 18.25 22C18.6642 22 19 21.6642 19 21.25C19 20.8358 18.6642 20.5 18.25 20.5Z',
  d11: 'M5.75 21.25L8 19L8 16M5.75 20.5C6.16421 20.5 6.5 20.8358 6.5 21.25C6.5 21.6642 6.16421 22 5.75 22C5.33579 22 5 21.6642 5 21.25C5 20.8358 5.33579 20.5 5.75 20.5Z',
  d12: 'M12 21.25L12 16M12 20.5C11.5858 20.5 11.25 20.8358 11.25 21.25C11.25 21.6642 11.5858 22 12 22C12.4142 22 12.75 21.6642 12.75 21.25C12.75 20.8358 12.4142 20.5 12 20.5Z',
  d13: 'M18.25 19.75C19.0784 19.75 19.75 20.4216 19.75 21.25C19.75 22.0784 19.0784 22.75 18.25 22.75C17.4216 22.75 16.75 22.0784 16.75 21.25C16.75 21.1156 16.7677 20.9854 16.8008 20.8615L15.25 19.3107L15.25 16L16.75 16L16.75 18.6893L17.8615 19.8008C17.9854 19.7677 18.1156 19.75 18.25 19.75Z',
  d14: 'M8.75 16L8.75 19.3107L7.19919 20.8615C7.23233 20.9854 7.25 21.1156 7.25 21.25C7.25 22.0784 6.57843 22.75 5.75 22.75C4.92157 22.75 4.25 22.0784 4.25 21.25C4.25 20.4216 4.92157 19.75 5.75 19.75C5.88437 19.75 6.01461 19.7677 6.13853 19.8008L7.25 18.6893L7.25 16L8.75 16Z',
  d15: 'M12.75 19.9507C13.1984 20.21 13.5 20.6948 13.5 21.25C13.5 22.0784 12.8284 22.75 12 22.75C11.1716 22.75 10.5 22.0784 10.5 21.25C10.5 20.6948 10.8016 20.21 11.25 19.9507L11.25 16L12.75 16L12.75 19.9507Z',
  d16: 'M5.853 6.36454C3.22664 6.89643 1.25 9.21699 1.25 12C1.25 14.7464 3.17541 17.043 5.75 17.6137L5.75 14.5H18.25V17.6968C20.7942 17.3329 22.75 15.1449 22.75 12.5C22.75 9.85409 20.7927 7.66534 18.2469 7.30273C18.1428 3.94224 15.3858 1.25 12 1.25C8.93585 1.25 6.38731 3.45456 5.853 6.36454Z',
};

export const IconAiCloud02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AiCloud02 SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAiCloud02: TheIconSelfPack = [
  'AiCloud02',
  IconAiCloud02StrokeRounded,
  IconAiCloud02DuotoneRounded,
  IconAiCloud02TwotoneRounded,
  IconAiCloud02SolidRounded,
  IconAiCloud02BulkRounded,
  IconAiCloud02StrokeSharp,
  IconAiCloud02SolidSharp,
];