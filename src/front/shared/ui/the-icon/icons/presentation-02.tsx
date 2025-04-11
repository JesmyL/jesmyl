import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 17H21V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H9C6.17157 2 4.75736 2 3.87868 2.87868C3 3.75736 3 5.17157 3 8V17Z',
  d2: 'M2 17H22',
  d3: 'M7 22L12.0001 19L17 22',
  d4: 'M12 17.1973V21.9999',
  d5: 'M12 17V22',
  d6: 'M7 22L12.0001 19L17 22M12 17V22',
  d7: 'M2.25 17.5H21.75V7.6C21.75 4.48873 21.75 2.9331 20.7981 1.96655C19.8462 1 18.3141 1 15.25 1H8.75C5.68587 1 4.15381 1 3.2019 1.96655C2.25 2.9331 2.25 4.48873 2.25 7.6V17.5Z',
  d8: 'M1 17C1 16.4477 1.44772 16 2 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H2C1.44772 18 1 17.5523 1 17Z',
  d9: 'M11 22L11 17L13 17L13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22Z',
  d10: 'M11.4855 18.1425C11.8022 17.9525 12.1978 17.9525 12.5145 18.1425L17.5144 21.1425C17.988 21.4267 18.1415 22.0409 17.8574 22.5145C17.5732 22.9881 16.959 23.1416 16.4854 22.8575L12 20.1662L7.5144 22.8575C7.04082 23.1416 6.42656 22.9881 6.14241 22.5145C5.85827 22.0409 6.01183 21.4266 6.48542 21.1425L11.4855 18.1425Z',
  d11: 'M3.5 16V2H20.5V16H3.5Z',
  d12: 'M2 16H22',
  d13: 'M12 16L12 22',
  d14: 'M11 20.4104V22.5H13V20.4103L16.4737 22.5001L17.5 20.7851L13 18.0779V16.5H11V18.078L6.5 20.7851L7.52628 22.5001L11 20.4104Z',
  d15: 'M3.5 1.5H20.5C20.6989 1.5 20.8897 1.57902 21.0303 1.71967C21.171 1.86032 21.25 2.05109 21.25 2.25V16.25C21.25 16.6642 20.9142 17 20.5 17H3.5C3.08579 17 2.75 16.6642 2.75 16.25V2.25C2.75 1.83579 3.08579 1.5 3.5 1.5Z',
  d16: 'M22 17.25H2V15.25H22V17.25Z',
};

export const IconPresentation02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
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
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 DuotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconPresentation02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Presentation02 SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="f"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentation02: TheIconSelfPack = [
  'Presentation02',
  IconPresentation02StrokeRounded,
  IconPresentation02DuotoneRounded,
  IconPresentation02TwotoneRounded,
  IconPresentation02SolidRounded,
  IconPresentation02BulkRounded,
  IconPresentation02StrokeSharp,
  IconPresentation02SolidSharp,
];