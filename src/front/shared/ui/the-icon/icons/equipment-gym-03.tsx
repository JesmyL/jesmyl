import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 3V8M6 3V8',
  d2: 'M20.5 4V5.5M20.5 5.5V7M20.5 5.5H22M3.5 4V5.5M3.5 5.5V7M3.5 5.5H2',
  d3: 'M18 5.5L6 5.5',
  d4: 'M7.27653 19H16.7235C17.961 19 18.5797 19 18.8356 18.6974C19.4163 18.0107 18.3038 17.1031 17.8979 16.6456C17.4405 16.1302 17.1059 16 16.4299 16H7.57013C6.89408 16 6.55953 16.1302 6.10214 16.6456C5.69617 17.1031 4.58375 18.0107 5.16444 18.6974C5.42026 19 6.03902 19 7.27653 19Z',
  d5: 'M9 8V16M15 8V16',
  d6: 'M16 19V21M8 19V21',
  d7: 'M3.5 3C4.05228 3 4.5 3.44772 4.5 4V7C4.5 7.55228 4.05228 8 3.5 8C2.94772 8 2.5 7.55228 2.5 7V6.5H2C1.44772 6.5 1 6.05228 1 5.5C1 4.94772 1.44772 4.5 2 4.5H2.5V4C2.5 3.44772 2.94772 3 3.5 3ZM20.5 3C21.0523 3 21.5 3.44772 21.5 4V4.5H22C22.5523 4.5 23 4.94772 23 5.5C23 6.05228 22.5523 6.5 22 6.5H21.5V7C21.5 7.55228 21.0523 8 20.5 8C19.9477 8 19.5 7.55228 19.5 7V4C19.5 3.44772 19.9477 3 20.5 3Z',
  d8: 'M6.5 2C7.05228 2 7.5 2.44772 7.5 3V4.5H16.5V3C16.5 2.44772 16.9477 2 17.5 2C18.0523 2 18.5 2.44772 18.5 3V8C18.5 8.55228 18.0523 9 17.5 9C16.9477 9 16.5 8.55228 16.5 8V6.5H7.5V8C7.5 8.55228 7.05228 9 6.5 9C5.94772 9 5.5 8.55228 5.5 8V3C5.5 2.44772 5.94772 2 6.5 2Z',
  d9: 'M9.5 7.5C10.0523 7.5 10.5 7.94772 10.5 8.5V16C10.5 16.5523 10.0523 17 9.5 17C8.94772 17 8.5 16.5523 8.5 16V8.5C8.5 7.94772 8.94772 7.5 9.5 7.5ZM14.5 7.5C15.0523 7.5 15.5 7.94772 15.5 8.5V16C15.5 16.5523 15.0523 17 14.5 17C13.9477 17 13.5 16.5523 13.5 16V8.5C13.5 7.94772 13.9477 7.5 14.5 7.5Z',
  d10: 'M8 18C8.55228 18 9 18.4477 9 19V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V19C7 18.4477 7.44772 18 8 18ZM16 18C16.5523 18 17 18.4477 17 19V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V19C15 18.4477 15.4477 18 16 18Z',
  d11: 'M6.45762 15.4406C6.81967 15.2848 7.19078 15.25 7.57013 15.25H16.4299C16.8092 15.25 17.1803 15.2848 17.5424 15.4406C17.9085 15.5982 18.1926 15.8478 18.4588 16.1478C18.6188 16.3161 19.1916 16.9252 19.3532 17.1584C19.51 17.3847 19.6786 17.6869 19.7324 18.0377C19.7919 18.4249 19.7035 18.8325 19.4083 19.1817C19.0808 19.5689 18.6004 19.6666 18.2302 19.7076C17.8473 19.7501 17.3486 19.75 16.7675 19.75H16.7675H7.23248H7.23247C6.65138 19.75 6.15274 19.7501 5.76976 19.7076C5.39961 19.6666 4.91916 19.5689 4.59172 19.1817C4.29647 18.8325 4.20814 18.4249 4.26756 18.0377C4.32139 17.6869 4.49001 17.3847 4.64677 17.1584C4.80838 16.9252 5.38116 16.3161 5.54119 16.1478C5.80742 15.8478 6.09148 15.5982 6.45762 15.4406Z',
  d12: 'M6.45762 15.4406C6.81966 15.2848 7.19078 15.25 7.57012 15.25H16.4299C16.8092 15.25 17.1803 15.2848 17.5424 15.4406C17.9085 15.5982 18.1926 15.8478 18.4588 16.1478C18.6188 16.3161 19.1916 16.9252 19.3532 17.1584C19.51 17.3847 19.6786 17.6869 19.7324 18.0377C19.7919 18.4249 19.7035 18.8325 19.4083 19.1817C19.0808 19.5689 18.6004 19.6666 18.2302 19.7076C17.8473 19.7501 17.3486 19.75 16.7675 19.75H16.7675H7.23248H7.23246C6.65138 19.75 6.15274 19.7501 5.76976 19.7076C5.39961 19.6666 4.91916 19.5689 4.59172 19.1817C4.29647 18.8325 4.20814 18.4249 4.26756 18.0377C4.32139 17.6869 4.49 17.3847 4.64677 17.1584C4.80837 16.9252 5.38116 16.3161 5.54119 16.1478C5.80742 15.8478 6.09148 15.5982 6.45762 15.4406Z',
  d13: 'M18 3V9M6 3V9M20.5 4V6M20.5 6V8M20.5 6H22M3.5 4V6M3.5 6V8M3.5 6H2M18 6H6',
  d14: 'M5 18H18.9995L16.9999 14H6.99995L5 18Z',
  d15: 'M9 8V14M15 8V14',
  d16: 'M16 18V21M8 18V21',
  d17: 'M6.75 6.75V9H5.25V3H6.75V5.25H17.25V3H18.75V9H17.25V6.75H6.75ZM2.75 5.25V4H4.25V8H2.75V6.75H2V5.25H2.75ZM19.75 4H21.25V5.25H22V6.75H21.25V8H19.75V4Z',
  d18: 'M6.32913 13.6646C6.45617 13.4105 6.71587 13.25 6.99995 13.25H16.9999C17.2841 13.25 17.5438 13.4105 17.6708 13.6646L19.6704 17.6646C19.7866 17.8971 19.7741 18.1732 19.6375 18.3943C19.5008 18.6154 19.2594 18.75 18.9995 18.75H5C4.74007 18.75 4.49867 18.6154 4.36201 18.3943C4.22536 18.1732 4.21293 17.8971 4.32918 17.6646L6.32913 13.6646Z',
  d19: 'M8.25 14V8H9.75V14H8.25ZM14.25 14V8H15.75V14H14.25Z',
  d20: 'M7.25 21V18H8.75V21H7.25ZM15.25 21V18H16.75V21H15.25Z',
};

export const IconEquipmentGym03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 StrokeRounded"
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

export const IconEquipmentGym03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 DuotoneRounded"
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
        i-c="f o7"
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

export const IconEquipmentGym03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 TwotoneRounded"
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
        i-c="o7 s sj sr sw"
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
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentGym03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 SolidRounded"
    >
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
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentGym03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 BulkRounded"
    >
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentGym03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 StrokeSharp"
    >
      <path 
        d={d.d13}
        i-c="s sj sw"
      />
      <path 
        d={d.d14}
        i-c="s sj sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
      <path 
        d={d.d16}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentGym03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EquipmentGym03 SolidSharp"
    >
      <path 
        d={d.d17}
        i-c="c f fr"
      />
      <path 
        d={d.d18}
        i-c="f"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEquipmentGym03: TheIconSelfPack = [
  'EquipmentGym03',
  IconEquipmentGym03StrokeRounded,
  IconEquipmentGym03DuotoneRounded,
  IconEquipmentGym03TwotoneRounded,
  IconEquipmentGym03SolidRounded,
  IconEquipmentGym03BulkRounded,
  IconEquipmentGym03StrokeSharp,
  IconEquipmentGym03SolidSharp,
];