import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9Z',
  d2: 'M9.5 12.5C9.5 14.5 8 20 7 22',
  d3: 'M14.5 12.5C14.5 14.5 16 20 17 22',
  d4: 'M12 5L12 2',
  d5: 'M9 16H15',
  d6: 'M10.5 13C10.5 15 9 20 8 22',
  d7: 'M13.5 13C13.5 15 15 20 16 22',
  d8: 'M7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9Z',
  d9: 'M12 1C12.5523 1 13 1.44772 13 2V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V2C11 1.44772 11.4477 1 12 1ZM9.99997 12C10.5523 12 11 12.4477 11 13C11 13.7663 10.8177 14.8481 10.5492 16H13.4508C13.1822 14.8481 13 13.7663 13 13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13C15 13.6432 15.1946 14.7402 15.5083 16C16.0568 16.0045 16.5 16.4505 16.5 17C16.5 17.3612 16.3085 17.6777 16.0214 17.8534C16.4754 19.3514 16.9911 20.7463 17.3944 21.5528C17.6414 22.0468 17.4412 22.6474 16.9472 22.8944C16.4532 23.1414 15.8525 22.9412 15.6055 22.4472C15.0877 21.4114 14.4742 19.6996 13.9785 18H10.0215C9.52572 19.6996 8.9123 21.4114 8.3944 22.4472C8.14741 22.9412 7.54674 23.1414 7.05276 22.8944C6.55878 22.6474 6.35856 22.0468 6.60555 21.5528C7.00881 20.7463 7.52454 19.3514 7.97852 17.8534C7.69149 17.6777 7.49997 17.3612 7.49997 17C7.49997 16.4505 7.94318 16.0045 8.49162 16C8.8053 14.7402 8.99997 13.6432 8.99997 13C8.99997 12.4477 9.44769 12 9.99997 12Z',
  d10: 'M8 16H16',
  d11: 'M7.24976 8.75C7.24976 6.12665 9.3764 4 11.9998 4C14.6231 4 16.7498 6.12665 16.7498 8.75C16.7498 11.3734 14.6231 13.5 11.9998 13.5C9.3764 13.5 7.24976 11.3734 7.24976 8.75Z',
  d12: 'M8.5579 17.0281C9.05839 15.2764 9.39443 13.4374 9.39443 12.5924H11.3944C11.3944 13.7474 10.9805 15.8292 10.481 17.5775C9.97459 19.3497 9.32964 21.1684 8.78885 22.25L7 21.3556C7.45921 20.4372 8.06426 18.7558 8.5579 17.0281Z',
  d13: 'M15.4421 17.0279C14.9416 15.2763 14.6056 13.4373 14.6056 12.5923H12.6056C12.6056 13.7473 13.0195 15.8291 13.519 17.5774C14.0254 19.3496 14.6704 21.1683 15.2111 22.2499L17 21.3555C16.5408 20.437 15.9357 18.7557 15.4421 17.0279Z',
  d14: 'M12.9998 1.75L12.9998 4.75L10.9998 4.75L10.9998 1.75L12.9998 1.75Z',
  d15: 'M15.9998 16.75H7.99976V14.75H15.9998V16.75Z',
};

export const IconBerlinTowerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower StrokeRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconBerlinTowerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower DuotoneRounded"
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
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
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
    </TheIconWrapper>
  );
};

export const IconBerlinTowerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
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

export const IconBerlinTowerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconBerlinTowerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconBerlinTowerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconBerlinTowerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="BerlinTower SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="f"
      />
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

export const iconPackOfBerlinTower: TheIconSelfPack = [
  'BerlinTower',
  IconBerlinTowerStrokeRounded,
  IconBerlinTowerDuotoneRounded,
  IconBerlinTowerTwotoneRounded,
  IconBerlinTowerSolidRounded,
  IconBerlinTowerBulkRounded,
  IconBerlinTowerStrokeSharp,
  IconBerlinTowerSolidSharp,
];