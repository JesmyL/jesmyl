import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.91412 5.99584C9.31163 3.33195 10.5104 2 12 2C13.4896 2 14.6884 3.33195 17.0859 5.99584L17.4037 6.34903C19.8012 9.01292 21 10.3449 21 12C21 13.6551 19.8012 14.9871 17.4037 17.651L17.0859 18.0042C14.6884 20.6681 13.4896 22 12 22C10.5104 22 9.31163 20.6681 6.91412 18.0042L6.59626 17.651C4.19875 14.9871 3 13.6551 3 12C3 10.3449 4.19875 9.01292 6.59626 6.34903L6.91412 5.99584Z',
  d2: 'M12 22C10.5104 22 9.31163 20.6681 6.91412 18.0042L6.59626 17.651C4.19875 14.9871 3 13.6551 3 12C3 10.3449 4.19875 9.01292 6.59626 6.34903L6.91412 5.99584C9.31163 3.33195 10.5104 2 12 2',
  d3: 'M9.31253 2.42687C10.1593 1.70902 10.9998 1.25 12 1.25C13.0002 1.25 13.8407 1.70902 14.6875 2.42687L20.7192 9.12825C21.3667 10.0712 21.75 10.9657 21.75 12C21.75 13.0343 21.3667 13.9288 20.7192 14.8718L14.6875 21.5731C13.8407 22.291 13.0002 22.75 12 22.75C10.9998 22.75 10.1593 22.291 9.31253 21.5731L3.2808 14.8718C2.63331 13.9288 2.25 13.0343 2.25 12C2.25 10.9657 2.63331 10.0712 3.2808 9.12825L9.31253 2.42687Z',
  d4: 'M20.7192 9.12998C21.3667 10.0729 21.75 10.9674 21.75 12.0017C21.75 13.036 21.3667 13.9306 20.7192 14.8735L14.6875 21.5749C13.8407 22.2927 13.0002 22.7517 12 22.7517C10.9998 22.7517 10.1593 22.2927 9.31253 21.5749L6 17.8946L17.8985 5.99609L20.7192 9.12998Z',
  d5: 'M21 12L12 2L3 12L12 22L21 12Z',
  d6: 'M12 1.25C12.2126 1.25 12.4152 1.34024 12.5575 1.49828L21.5575 11.4983C21.8142 11.7835 21.8142 12.2165 21.5575 12.5017L12.5575 22.5017C12.4152 22.6598 12.2126 22.75 12 22.75C11.7874 22.75 11.5848 22.6598 11.4425 22.5017L2.44253 12.5017C2.18582 12.2165 2.18582 11.7835 2.44253 11.4983L11.4425 1.49828C11.5848 1.34024 11.7874 1.25 12 1.25Z',
};

export const IconRhombusStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRhombusSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Rhombus SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRhombus: TheIconSelfPack = [
  'Rhombus',
  IconRhombusStrokeRounded,
  IconRhombusDuotoneRounded,
  IconRhombusTwotoneRounded,
  IconRhombusSolidRounded,
  IconRhombusBulkRounded,
  IconRhombusStrokeSharp,
  IconRhombusSolidSharp,
];