import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 6H11.1554C12.0231 6 12.4569 6 12.7534 6.31741C13.0498 6.63483 13.0234 7.02125 12.9707 7.79408C12.7255 11.3825 10.8793 17.0157 5 19',
  d2: 'M16 3V12M16 21V12M16 12H19',
  d3: 'M11.1554 6H5V19C10.8793 17.0157 12.7255 11.3825 12.9707 7.79408C13.0234 7.02125 13.0498 6.63482 12.7534 6.31741C12.4569 6 12.0231 6 11.1554 6Z',
  d4: 'M5 6H11.1554C12.0231 6 12.4569 6 12.7534 6.31741C13.0498 6.63482 13.0234 7.02125 12.9707 7.79408C12.7255 11.3825 10.8793 17.0157 5 19',
  d5: 'M12.0015 7.02576C11.8426 7.0027 11.609 7.00002 11.1556 7.00002H5.00027C4.44799 7.00002 4.00027 6.55231 4.00027 6.00002C4.00027 5.44774 4.44799 5.00002 5.00027 5.00002H11.1556C11.1745 5.00002 11.1934 5.00002 11.2123 5.00001C11.5964 4.99989 11.9908 4.99976 12.3232 5.05168C12.7207 5.11378 13.1376 5.26348 13.4844 5.63485C13.8135 5.98718 13.9472 6.38446 13.9881 6.78306C14.0208 7.10301 13.9956 7.46943 13.9724 7.80687C13.9711 7.82543 13.9699 7.84389 13.9686 7.86226C13.7113 11.6283 11.7587 17.7745 5.32005 19.9475C4.79677 20.1241 4.22939 19.8431 4.05278 19.3198C3.87617 18.7965 4.15721 18.2291 4.68049 18.0525C10.0005 16.257 11.7403 11.1367 11.9733 7.72596C11.9868 7.52796 11.997 7.37681 12.0016 7.24686C12.0051 7.14626 12.0044 7.07605 12.0015 7.02576Z',
  d6: 'M16 2C16.5523 2 17 2.44772 17 3V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H17V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V3C15 2.44772 15.4477 2 16 2Z',
  d7: 'M5 6H12.9527C13.284 9.09524 12.0033 16.6364 5 19',
  d8: 'M12.1619 7H5.07381V5H14.0365L14.1334 5.89355C14.3197 7.612 14.0535 10.4499 12.8089 13.1843C11.5519 15.9459 9.26729 18.6577 5.39761 19.9475L4.75 18.0525C7.97178 16.9787 9.88131 14.7381 10.9617 12.3644C11.8474 10.4185 12.1562 8.42043 12.1619 7Z',
  d9: 'M15.2012 3H17.2263V11H19.2515V13H17.2263V21H15.2012V3Z',
};

export const IconAlphabetKoreanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean StrokeRounded"
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

export const IconAlphabetKoreanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlphabetKoreanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean TwotoneRounded"
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

export const IconAlphabetKoreanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean SolidRounded"
    >
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

export const IconAlphabetKoreanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconAlphabetKoreanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconAlphabetKoreanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="AlphabetKorean SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAlphabetKorean: TheIconSelfPack = [
  'AlphabetKorean',
  IconAlphabetKoreanStrokeRounded,
  IconAlphabetKoreanDuotoneRounded,
  IconAlphabetKoreanTwotoneRounded,
  IconAlphabetKoreanSolidRounded,
  IconAlphabetKoreanBulkRounded,
  IconAlphabetKoreanStrokeSharp,
  IconAlphabetKoreanSolidSharp,
];