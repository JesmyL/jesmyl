import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C15.866 22 19 18.8659 19 15C19 12.5994 18.2288 8.16743 17.6442 5.15254C17.3548 3.66024 17.2101 2.91408 16.6559 2.45704C16.1018 2 15.3282 2 13.7811 2H10.2189C8.6718 2 7.89823 2 7.34406 2.45704C6.78988 2.91408 6.64519 3.66023 6.35582 5.15254C5.7712 8.16743 5 12.5994 5 15C5 18.8659 8.13399 22 12 22Z',
  d2: 'M16 15C16 17.2091 14.2091 19 12 19C9.79085 19 8 17.2091 8 15C8 12.7909 9.79085 11 12 11C14.2091 11 16 12.7909 16 15Z',
  d3: 'M12 5V6',
  d4: 'M19 15C19 18.8659 15.866 22 12 22C8.13399 22 5 18.8659 5 15C5 12.5994 5.7712 8.16743 6.35582 5.15254C6.64519 3.66023 6.78988 2.91408 7.34406 2.45704C7.89823 2 8.6718 2 10.2189 2H13.7811C15.3282 2 16.1018 2 16.6559 2.45704C17.2101 2.91408 17.3548 3.66024 17.6442 5.15254C18.2288 8.16743 19 12.5994 19 15ZM12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79085 11 8 12.7909 8 15C8 17.2091 9.79085 19 12 19Z',
  d5: 'M13.8273 1.25C14.5614 1.24997 15.1812 1.24995 15.6841 1.31295C16.2197 1.38005 16.7067 1.52676 17.1331 1.87843C17.5577 2.22858 17.7944 2.67352 17.9618 3.18206C18.1184 3.65779 18.2433 4.30247 18.3805 5.00977C18.9615 8.00641 19.75 12.5134 19.75 15C19.75 19.2801 16.2802 22.75 12 22.75C7.71977 22.75 4.25 19.2801 4.25 15C4.25 12.5134 5.03845 8.00641 5.61953 5.00977C5.75666 4.30247 5.88164 3.65779 6.03824 3.18206C6.20565 2.67351 6.4423 2.22858 6.86687 1.87843C7.29329 1.52676 7.78028 1.38005 8.31591 1.31295C8.8188 1.24995 9.43855 1.24997 10.1727 1.25H10.1728L13.8272 1.25H13.8273ZM12 11.75C10.2051 11.75 8.75 13.2051 8.75 15C8.75 16.7949 10.2051 18.25 12 18.25C13.7949 18.25 15.25 16.7949 15.25 15C15.25 13.2051 13.7949 11.75 12 11.75ZM7.25 15C7.25 12.3766 9.37664 10.25 12 10.25C14.6234 10.25 16.75 12.3766 16.75 15C16.75 17.6233 14.6234 19.75 12 19.75C9.37663 19.75 7.25 17.6233 7.25 15ZM12.75 5C12.75 4.58579 12.4142 4.25 12 4.25C11.5858 4.25 11.25 4.58579 11.25 5V6C11.25 6.41421 11.5858 6.75 12 6.75C12.4142 6.75 12.75 6.41421 12.75 6V5Z',
  d6: 'M13.8273 1.25C14.5614 1.24997 15.1812 1.24995 15.6841 1.31295C16.2197 1.38005 16.7067 1.52676 17.1331 1.87843C17.5577 2.22858 17.7944 2.67352 17.9618 3.18206C18.1184 3.65779 18.2433 4.30246 18.3805 5.00977C18.9615 8.00641 19.75 12.5134 19.75 15C19.75 19.2801 16.2802 22.75 12 22.75C7.71977 22.75 4.25 19.2801 4.25 15C4.25 12.5134 5.03845 8.00641 5.61953 5.00977C5.75666 4.30247 5.88164 3.65779 6.03824 3.18206C6.20565 2.67351 6.4423 2.22858 6.86687 1.87843C7.29329 1.52676 7.78028 1.38005 8.31591 1.31295C8.8188 1.24995 9.43855 1.24997 10.1727 1.25H10.1728H13.8272H13.8273Z',
  d7: 'M12 11.75C10.2051 11.75 8.75 13.2051 8.75 15C8.75 16.7949 10.2051 18.25 12 18.25C13.7949 18.25 15.25 16.7949 15.25 15C15.25 13.2051 13.7949 11.75 12 11.75ZM7.25 15C7.25 12.3766 9.37664 10.25 12 10.25C14.6234 10.25 16.75 12.3766 16.75 15C16.75 17.6233 14.6234 19.75 12 19.75C9.37663 19.75 7.25 17.6233 7.25 15Z',
  d8: 'M12 4.25C12.4142 4.25 12.75 4.58579 12.75 5V6C12.75 6.41421 12.4142 6.75 12 6.75C11.5858 6.75 11.25 6.41421 11.25 6V5C11.25 4.58579 11.5858 4.25 12 4.25Z',
  d9: 'M12 22C15.866 22 19 18.8659 19 15C19 11.1341 17 2 17 2H7C7 2 5 11.1341 5 15C5 18.8659 8.13399 22 12 22Z',
  d10: 'M17.6035 1.25C17.6035 1.25 17.9531 2.87687 18.0473 3.33733C18.2356 4.25797 18.4868 5.5264 18.738 6.91692C19.2363 9.67395 19.75 12.9891 19.75 15C19.75 19.2801 16.2802 22.75 12 22.75C7.71977 22.75 4.25 19.2801 4.25 15C4.25 12.9891 4.76372 9.67395 5.26195 6.91692C5.51325 5.5264 5.76441 4.25797 5.95271 3.33733C6.04689 2.87687 6.39645 1.25 6.39645 1.25L17.6035 1.25ZM12 11.75C10.2051 11.75 8.75 13.2051 8.75 15C8.75 16.7949 10.2051 18.25 12 18.25C13.7949 18.25 15.25 16.7949 15.25 15C15.25 13.2051 13.7949 11.75 12 11.75ZM7.25 15C7.25 12.3766 9.37664 10.25 12 10.25C14.6234 10.25 16.75 12.3766 16.75 15C16.75 17.6233 14.6234 19.75 12 19.75C9.37663 19.75 7.25 17.6233 7.25 15ZM12.75 6.75L12.75 4.25H11.25L11.25 6.75H12.75Z',
};

export const IconKeyGeneratorFobStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob StrokeRounded"
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

export const IconKeyGeneratorFobDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o4"
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
    </TheIconWrapper>
  );
};

export const IconKeyGeneratorFobTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconKeyGeneratorFobSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconKeyGeneratorFobBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
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

export const IconKeyGeneratorFobStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s ss sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconKeyGeneratorFobSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyGeneratorFob SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKeyGeneratorFob: TheIconSelfPack = [
  'KeyGeneratorFob',
  IconKeyGeneratorFobStrokeRounded,
  IconKeyGeneratorFobDuotoneRounded,
  IconKeyGeneratorFobTwotoneRounded,
  IconKeyGeneratorFobSolidRounded,
  IconKeyGeneratorFobBulkRounded,
  IconKeyGeneratorFobStrokeSharp,
  IconKeyGeneratorFobSolidSharp,
];