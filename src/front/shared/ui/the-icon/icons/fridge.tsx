import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14L4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2Z',
  d2: 'M4 10H20',
  d3: 'M8 6H8.00898',
  d4: 'M8 17L8 14',
  d5: 'M20 14V10L4 10V14C4 17.7712 4 19.6569 5.17157 20.8284C6.34315 22 8.22876 22 12 22H12C15.7712 22 17.6569 22 18.8284 20.8284C20 19.6569 20 17.7712 20 14Z',
  d6: 'M12.0564 1.25H11.9436H11.9436C10.1058 1.24999 8.65019 1.24997 7.51098 1.40314C6.33856 1.56076 5.38961 1.89288 4.64125 2.64124C3.89288 3.38961 3.56076 4.33856 3.40314 5.51098C3.28786 6.36839 3.25935 7.40504 3.25231 8.64894C3.25071 8.93169 3.24991 9.07306 3.33788 9.16153C3.42585 9.25 3.56763 9.25 3.8512 9.25H20.1488C20.4324 9.25 20.5742 9.25 20.6621 9.16153C20.7501 9.07306 20.7493 8.9317 20.7477 8.64897C20.7406 7.40507 20.7121 6.36839 20.5969 5.51098C20.4392 4.33856 20.1071 3.38961 19.3588 2.64124C18.6104 1.89288 17.6614 1.56076 16.489 1.40314C15.3498 1.24997 13.8942 1.24999 12.0564 1.25H12.0564ZM20.75 11.35C20.75 11.0672 20.75 10.9257 20.6621 10.8379C20.5743 10.75 20.4328 10.75 20.15 10.75H3.85C3.56716 10.75 3.42574 10.75 3.33787 10.8379C3.25 10.9257 3.25 11.0672 3.25 11.35V14.0564V14.0564C3.24999 15.8942 3.24997 17.3498 3.40314 18.489C3.56076 19.6614 3.89288 20.6104 4.64124 21.3588C5.38961 22.1071 6.33856 22.4392 7.51098 22.5969C8.65018 22.75 10.1058 22.75 11.9435 22.75H12.0564C13.8942 22.75 15.3498 22.75 16.489 22.5969C17.6614 22.4392 18.6104 22.1071 19.3588 21.3588C20.1071 20.6104 20.4392 19.6614 20.5969 18.489C20.75 17.3498 20.75 15.8942 20.75 14.0565V11.35ZM7 6C7 5.44772 7.44772 5 8 5H8.00898C8.56127 5 9.00898 5.44772 9.00898 6C9.00898 6.55229 8.56127 7 8.00898 7H8C7.44772 7 7 6.55229 7 6ZM8 17.75C7.58579 17.75 7.25 17.4142 7.25 17L7.25 14C7.25 13.5858 7.58579 13.25 8 13.25C8.41421 13.25 8.75 13.5858 8.75 14V17C8.75 17.4142 8.41421 17.75 8 17.75Z',
  d7: 'M12.0564 1.25H11.9436H11.9436C10.1058 1.24999 8.65019 1.24997 7.51098 1.40314C6.33856 1.56076 5.38961 1.89288 4.64125 2.64124C3.89288 3.38961 3.56076 4.33856 3.40314 5.51098C3.28786 6.36839 3.25935 7.40504 3.25231 8.64894C3.25071 8.93169 3.24991 9.07306 3.33788 9.16153C3.42585 9.25 3.56763 9.25 3.8512 9.25H20.1488C20.4324 9.25 20.5742 9.25 20.6621 9.16153C20.7501 9.07306 20.7493 8.9317 20.7477 8.64897C20.7406 7.40507 20.7121 6.36839 20.5969 5.51098C20.4392 4.33856 20.1071 3.38961 19.3588 2.64124C18.6104 1.89288 17.6614 1.56076 16.489 1.40314C15.3498 1.24997 13.8942 1.24999 12.0564 1.25H12.0564Z',
  d8: 'M20.75 11.35C20.75 11.0672 20.75 10.9257 20.6621 10.8379C20.5743 10.75 20.4328 10.75 20.15 10.75H3.85C3.56716 10.75 3.42574 10.75 3.33787 10.8379C3.25 10.9257 3.25 11.0672 3.25 11.35V14.0564V14.0564C3.24999 15.8942 3.24997 17.3498 3.40314 18.489C3.56076 19.6614 3.89288 20.6104 4.64124 21.3588C5.38961 22.1071 6.33856 22.4392 7.51098 22.5969C8.65018 22.75 10.1058 22.75 11.9435 22.75H12.0564C13.8942 22.75 15.3498 22.75 16.489 22.5969C17.6614 22.4392 18.6104 22.1071 19.3588 21.3588C20.1071 20.6104 20.4392 19.6614 20.5969 18.489C20.75 17.3498 20.75 15.8942 20.75 14.0565V11.35Z',
  d9: 'M7 6C7 5.44772 7.44772 5 8 5H8.00898C8.56127 5 9.00898 5.44772 9.00898 6C9.00898 6.55229 8.56127 7 8.00898 7H8C7.44772 7 7 6.55229 7 6Z',
  d10: 'M7.25 17C7.25 17.4142 7.58579 17.75 8 17.75C8.41421 17.75 8.75 17.4142 8.75 17V14C8.75 13.5858 8.41421 13.25 8 13.25C7.58579 13.25 7.25 13.5858 7.25 14L7.25 17Z',
  d11: 'M20 2H4V22H20V2Z',
  d12: 'M8 17L8 13',
  d13: 'M4 1.25C3.58579 1.25 3.25 1.58579 3.25 2V9.25H20.75V2C20.75 1.58579 20.4142 1.25 20 1.25H4ZM20.75 10.75H3.25V22C3.25 22.4142 3.58579 22.75 4 22.75H20C20.4142 22.75 20.75 22.4142 20.75 22V10.75ZM7 5H9.00898V7H7V5ZM8.75 17V13H7.25V17H8.75Z',
};

export const IconFridgeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
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

export const IconFridgeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
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

export const IconFridgeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconFridgeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconFridgeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge BulkRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      </g>
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

export const IconFridgeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconFridgeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Fridge SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFridge: TheIconSelfPack = [
  'Fridge',
  IconFridgeStrokeRounded,
  IconFridgeDuotoneRounded,
  IconFridgeTwotoneRounded,
  IconFridgeSolidRounded,
  IconFridgeBulkRounded,
  IconFridgeStrokeSharp,
  IconFridgeSolidSharp,
];