import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 2L12 3.5M12 3.5V5M12 3.5L10.5 2',
  d2: 'M2 14H5L2 17H5',
  d3: 'M19 14L22 17M22 14L19 17',
  d4: 'M12 8V16M12 16L3 22M12 16L21 22',
  d5: 'M9.79289 1.29289C10.1834 0.902369 10.8166 0.902369 11.2071 1.29289L12 2.08579L12.7929 1.29289C13.1834 0.902369 13.8166 0.902369 14.2071 1.29289C14.5976 1.68342 14.5976 2.31658 14.2071 2.70711L13 3.91421V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3.91421L9.79289 2.70711C9.40237 2.31658 9.40237 1.68342 9.79289 1.29289Z',
  d6: 'M2.00003 15C1.44774 15 1.00003 14.5523 1.00003 14C1.00003 13.4477 1.44774 13 2.00003 13H5.00003C5.40449 13 5.76913 13.2436 5.92391 13.6173C6.07869 13.991 5.99313 14.4211 5.70714 14.7071L4.41424 16H5.00003C5.55231 16 6.00003 16.4477 6.00003 17C6.00003 17.5523 5.55231 18 5.00003 18H2.00003C1.59557 18 1.23093 17.7564 1.07615 17.3827C0.921369 17.009 1.00692 16.5789 1.29292 16.2929L2.58582 15H2.00003Z',
  d7: 'M18.2929 13.2929C18.6834 12.9024 19.3166 12.9024 19.7071 13.2929L20.5 14.0858L21.2929 13.2929C21.6834 12.9024 22.3166 12.9024 22.7071 13.2929C23.0976 13.6834 23.0976 14.3166 22.7071 14.7071L21.9142 15.5L22.7071 16.2929C23.0976 16.6834 23.0976 17.3166 22.7071 17.7071C22.3166 18.0976 21.6834 18.0976 21.2929 17.7071L20.5 16.9142L19.7071 17.7071C19.3166 18.0976 18.6834 18.0976 18.2929 17.7071C17.9024 17.3166 17.9024 16.6834 18.2929 16.2929L19.0858 15.5L18.2929 14.7071C17.9024 14.3166 17.9024 13.6834 18.2929 13.2929Z',
  d8: 'M12.0001 7C12.5524 7 13.0001 7.44772 13.0001 8V15.4648L21.5548 21.1679C22.0143 21.4743 22.1385 22.0952 21.8322 22.5547C21.5258 23.0142 20.9049 23.1384 20.4454 22.8321L12.0001 17.2018L3.55481 22.8321C3.09528 23.1384 2.47441 23.0142 2.16806 22.5547C1.8617 22.0952 1.98588 21.4743 2.44541 21.1679L11.0001 15.4648V8C11.0001 7.44772 11.4478 7 12.0001 7Z',
  d9: 'M14 2L12 4M12 4V6.5M12 4L10 2',
  d10: 'M2 13H5.5L2.5 17H6',
  d11: 'M18 13L22 17M22 13L18 17',
  d12: 'M11.8966 2.54289L13.1895 1.25L14.6037 2.66421L12.8966 4.37132V6.45711H10.8966V4.37132L9.18945 2.66421L10.6037 1.25L11.8966 2.54289Z',
  d13: 'M3.0001 13.75H1.5001V11.75H5.0001C5.37888 11.75 5.72514 11.964 5.89453 12.3028C6.06392 12.6416 6.02737 13.047 5.8001 13.35L4.0001 15.75H5.5001V17.75H2.0001C1.62133 17.75 1.27507 17.536 1.10568 17.1972C0.936285 16.8584 0.972841 16.453 1.2001 16.15L3.0001 13.75Z',
  d14: 'M18.8787 14.7499L17.5858 13.457L19 12.0428L20.2929 13.3357L21.5858 12.0428L23 13.457L21.7071 14.7499L23 16.0428L21.5858 17.457L20.2929 16.1641L19 17.457L17.5858 16.0428L18.8787 14.7499Z',
  d15: 'M10.8965 15.3828V7.91797H12.8965V15.3828L21.4512 21.0859L20.3418 22.75L11.8965 17.1198L3.4512 22.75L2.3418 21.0859L10.8965 15.3828Z',
};

export const IconCoordinate02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 SolidRounded"
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
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 BulkRounded"
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
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Coordinate02 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfCoordinate02: TheIconSelfPack = [
  'Coordinate02',
  IconCoordinate02StrokeRounded,
  IconCoordinate02DuotoneRounded,
  IconCoordinate02TwotoneRounded,
  IconCoordinate02SolidRounded,
  IconCoordinate02BulkRounded,
  IconCoordinate02StrokeSharp,
  IconCoordinate02SolidSharp,
];