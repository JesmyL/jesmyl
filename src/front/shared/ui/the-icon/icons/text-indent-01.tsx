import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 4.5H22',
  d2: 'M12 9.5H19',
  d3: 'M12 14.5H22',
  d4: 'M12 19.5H19',
  d5: 'M1.99805 9L3.06285 7.89844C3.96404 6.96615 4.41463 6.5 4.99805 6.5C5.58146 6.5 6.03206 6.96615 6.93324 7.89844L7.99805 9',
  d6: 'M8 14L6.9352 15.1016C6.03401 16.0339 5.58342 16.5 5 16.5C4.41658 16.5 3.96599 16.0339 3.0648 15.1016L2 14',
  d7: 'M3.06285 7.89844L2.84152 8.12741C2.42511 8.5582 2.2169 8.77359 2.10754 9.04424C1.99817 9.31489 1.99829 9.61447 1.99852 10.2136L1.99953 12.7878C1.99976 13.3862 1.99988 13.6855 2.10923 13.9558C2.21859 14.2261 2.42657 14.4413 2.84253 14.8716L3.0648 15.1016C3.96599 16.0339 4.41658 16.5 5 16.5C5.58342 16.5 6.03401 16.0339 6.9352 15.1016L7.15653 14.8726C7.57294 14.4418 7.78115 14.2264 7.89051 13.9558C7.99988 13.6851 7.99976 13.3855 7.99953 12.7864L7.99852 10.2122C7.99829 9.61376 7.99817 9.31452 7.88881 9.04419C7.77946 8.77386 7.57148 8.55871 7.15552 8.12839L6.93324 7.89844C6.03206 6.96615 5.58146 6.5 4.99805 6.5C4.41463 6.5 3.96404 6.96615 3.06285 7.89844Z',
  d8: 'M10.5 4.5C10.5 3.94772 10.9477 3.5 11.5 3.5H21.5C22.0523 3.5 22.5 3.94772 22.5 4.5C22.5 5.05228 22.0523 5.5 21.5 5.5H11.5C10.9477 5.5 10.5 5.05228 10.5 4.5Z',
  d9: 'M10.5 9.5C10.5 8.94772 10.9477 8.5 11.5 8.5H18.5C19.0523 8.5 19.5 8.94772 19.5 9.5C19.5 10.0523 19.0523 10.5 18.5 10.5H11.5C10.9477 10.5 10.5 10.0523 10.5 9.5Z',
  d10: 'M10.5 14.5C10.5 13.9477 10.9477 13.5 11.5 13.5H21.5C22.0523 13.5 22.5 13.9477 22.5 14.5C22.5 15.0523 22.0523 15.5 21.5 15.5H11.5C10.9477 15.5 10.5 15.0523 10.5 14.5Z',
  d11: 'M10.5 19.5C10.5 18.9477 10.9477 18.5 11.5 18.5H18.5C19.0523 18.5 19.5 18.9477 19.5 19.5C19.5 20.0523 19.0523 20.5 18.5 20.5H11.5C10.9477 20.5 10.5 20.0523 10.5 19.5Z',
  d12: 'M8.23313 13.781C8.58059 14.1648 8.58999 14.7979 8.25412 15.195L7.32242 16.2966C6.9606 16.7245 6.59085 17.1617 6.28119 17.4383C5.93767 17.7451 5.52498 18 5 18C4.47502 18 4.06233 17.7451 3.71881 17.4383C3.40915 17.1617 3.07696 16.7689 2.71515 16.341L1.74588 15.195C1.41001 14.7979 1.41941 14.1648 1.76687 13.781C1.93676 13.5933 2.15601 13.5 2.375 13.5H7.625C7.84399 13.5 8.06324 13.5933 8.23313 13.781Z',
  d13: 'M8.23313 10.219C8.58059 9.83516 8.58999 9.20208 8.25412 8.80499L7.32242 7.70343C6.9606 7.27555 6.59085 6.83828 6.28119 6.5617C5.93767 6.25487 5.52498 6 5 6C4.47502 6 4.06233 6.25487 3.71881 6.5617C3.40915 6.83828 3.07696 7.23112 2.71515 7.659L1.74588 8.80499C1.41001 9.20208 1.41941 9.83516 1.76687 10.219C1.93676 10.4067 2.15601 10.5 2.375 10.5H7.625C7.84399 10.5 8.06324 10.4067 8.23313 10.219Z',
  d14: 'M1.99805 9L4.99805 6.5L7.99805 9',
  d15: 'M8 14L5 16.5L2 14',
  d16: 'M22.252 5.5H12.252V3.5H22.252V5.5Z',
  d17: 'M19.252 10.5H12.252V8.5H19.252V10.5Z',
  d18: 'M22.252 15.5H12.252V13.5H22.252V15.5Z',
  d19: 'M19.252 20.5H12.252V18.5H19.252V20.5Z',
  d20: 'M5.39018 5.19824L9.03037 8.23173L7.75 9.76817L5.39018 7.80166L3.03037 9.76817L1.75 8.23173L5.39018 5.19824Z',
  d21: 'M5.39214 15.1982L3.03232 13.2317L1.75195 14.7681L5.39214 17.8016L9.03232 14.7681L7.75195 13.2317L5.39214 15.1982Z',
};

export const IconTextIndent01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 StrokeRounded"
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 DuotoneRounded"
    >
      <path 
        d={d.d7}
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
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 SolidRounded"
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
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 BulkRounded"
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
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f o7"
      />
      <path 
        d={d.d13}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 StrokeSharp"
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
      <path 
        d={d.d14}
        i-c="s sw"
      />
      <path 
        d={d.d15}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextIndent01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="TextIndent01 SolidSharp"
    >
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextIndent01: TheIconSelfPack = [
  'TextIndent01',
  IconTextIndent01StrokeRounded,
  IconTextIndent01DuotoneRounded,
  IconTextIndent01TwotoneRounded,
  IconTextIndent01SolidRounded,
  IconTextIndent01BulkRounded,
  IconTextIndent01StrokeSharp,
  IconTextIndent01SolidSharp,
];