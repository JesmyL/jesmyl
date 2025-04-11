import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 6L13 6',
  d2: 'M3 12L13 12',
  d3: 'M3 18L13 18',
  d4: 'M18 15H19.5C19.7788 15 19.9182 15 20.0341 15.0231C20.5101 15.1177 20.8823 15.4899 20.9769 15.9659C21 16.0818 21 16.2212 21 16.5C21 16.7788 21 16.9182 20.9769 17.0341C20.8823 17.5101 20.5101 17.8823 20.0341 17.9769C19.9182 18 19.7788 18 19.5 18C19.2212 18 19.0818 18 18.9659 18.0231C18.4899 18.1177 18.1177 18.4899 18.0231 18.9659C18 19.0818 18 19.2212 18 19.5V20.4C18 20.6828 18 20.8243 18.0879 20.9121C18.1757 21 18.3172 21 18.6 21H21',
  d5: 'M18 3H19.2C19.3657 3 19.5 3.13431 19.5 3.3V9M19.5 9H18M19.5 9H21',
  d6: 'M14 6C14 5.44772 13.5523 5 13 5L3 5C2.44771 5 2 5.44772 2 6C2 6.55229 2.44771 7 3 7L13 7C13.5523 7 14 6.55228 14 6Z',
  d7: 'M14 12C14 11.4477 13.5523 11 13 11L3 11C2.44771 11 2 11.4477 2 12C2 12.5523 2.44771 13 3 13L13 13C13.5523 13 14 12.5523 14 12Z',
  d8: 'M14 18C14 17.4477 13.5523 17 13 17L3 17C2.44771 17 2 17.4477 2 18C2 18.5523 2.44771 19 3 19L13 19C13.5523 19 14 18.5523 14 18Z',
  d9: 'M19.7941 16.0024C19.7309 16.0003 19.6463 16.0001 19.5001 16.0001H18.0001C17.4479 16.0001 17.0001 15.5524 17.0001 15.0001C17.0001 14.4479 17.4479 14.0001 18.0001 14.0001H19.5001L19.5593 14.0001C19.775 13.9997 20.0125 13.9993 20.2293 14.0424C21.1021 14.216 21.7843 14.8982 21.9579 15.7709C22.001 15.9878 22.0006 16.2253 22.0002 16.441L22.0001 16.5001L22.0002 16.5593C22.0006 16.775 22.001 17.0125 21.9579 17.2293C21.7843 18.1021 21.1021 18.7843 20.2293 18.9579C20.0125 19.001 19.775 19.0006 19.5593 19.0002L19.5001 19.0001C19.354 19.0001 19.2693 19.0003 19.2062 19.0024C19.1772 19.0034 19.1615 19.0047 19.1552 19.0052C19.0807 19.0224 19.0224 19.0807 19.0052 19.1552C19.0047 19.1615 19.0034 19.1772 19.0024 19.2062C19.0003 19.2693 19.0001 19.354 19.0001 19.5001V20.0001H21.0001C21.5524 20.0001 22.0001 20.4479 22.0001 21.0001C22.0001 21.5524 21.5524 22.0001 21.0001 22.0001H18.6001L18.5726 22.0002H18.5726C18.4584 22.0003 18.2888 22.0006 18.1377 21.9802C17.9451 21.9543 17.6416 21.8801 17.3809 21.6194C17.1202 21.3587 17.0459 21.0552 17.02 20.8626C16.9997 20.7114 17 20.5419 17.0001 20.4277L17.0001 20.4001V19.5001L17.0001 19.441L17.0001 19.441C16.9997 19.2253 16.9993 18.9878 17.0424 18.7709C17.216 17.8982 17.8982 17.216 18.7709 17.0424C18.9878 16.9993 19.2253 16.9997 19.441 17.0001H19.441L19.5001 17.0001C19.6463 17.0001 19.7309 17 19.7941 16.9978C19.8231 16.9968 19.8387 16.9956 19.845 16.995C19.9196 16.9779 19.9779 16.9196 19.995 16.845C19.9956 16.8387 19.9968 16.8231 19.9978 16.7941C20 16.7309 20.0001 16.6463 20.0001 16.5001C20.0001 16.354 20 16.2693 19.9978 16.2062C19.9968 16.1772 19.9956 16.1615 19.995 16.1552C19.9779 16.0807 19.9196 16.0224 19.845 16.0052L19.7941 16.0024Z',
  d10: 'M17 3C17 2.44772 17.4477 2 18 2H19.2C19.918 2 20.5 2.58203 20.5 3.3V8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H18C17.4477 10 17 9.55228 17 9C17 8.44772 17.4477 8 18 8H18.5V4H18C17.4477 4 17 3.55228 17 3Z',
  d11: 'M13.5 6L3.5 6',
  d12: 'M13.5 12L3.5 12',
  d13: 'M13.5 18L3.5 18',
  d14: 'M17.5 15H20.5V18H17.5003V21H20.5',
  d15: 'M17.5 3H19V9M17.5 9H19M19 9H20.5',
  d16: 'M3 5.25L13 5.25V7.25L3 7.25V5.25Z',
  d17: 'M3 11.25L13 11.25V13.25L3 13.25V11.25Z',
  d18: 'M3 17.25L13 17.25V19.25L3 19.25V17.25Z',
  d19: 'M16.5 14H20.25C20.6642 14 21 14.3358 21 14.75V17.75C21 18.1642 20.6642 18.5 20.25 18.5H18.0003V20H21V21.5H17.2503C16.8361 21.5 16.5003 21.1642 16.5003 20.75V17.75C16.5003 17.3358 16.8361 17 17.2503 17H19.5V15.5H16.5V14Z',
  d20: 'M17.75 4H17V2.5H18.5C18.9142 2.5 19.25 2.83579 19.25 3.25V8.5H20V10H17V8.5H17.75V4Z',
};

export const IconRightToLeftListNumberStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber StrokeRounded"
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
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber SolidRounded"
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
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber StrokeSharp"
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
        d={d.d14}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconRightToLeftListNumberSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RightToLeftListNumber SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfRightToLeftListNumber: TheIconSelfPack = [
  'RightToLeftListNumber',
  IconRightToLeftListNumberStrokeRounded,
  IconRightToLeftListNumberDuotoneRounded,
  IconRightToLeftListNumberTwotoneRounded,
  IconRightToLeftListNumberSolidRounded,
  IconRightToLeftListNumberBulkRounded,
  IconRightToLeftListNumberStrokeSharp,
  IconRightToLeftListNumberSolidSharp,
];