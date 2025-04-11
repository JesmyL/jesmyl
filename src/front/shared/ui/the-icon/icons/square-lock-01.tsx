import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z',
  d2: 'M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9',
  d3: 'M11.9961 15.5H12.0051',
  d4: 'M12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V8.31016C9.61773 8.27048 10.7654 8.25 12 8.25C13.2346 8.25 14.3823 8.27048 15.5 8.31016V6.75C15.5 4.817 13.933 3.25 12 3.25ZM6.5 6.75V8.52712C4.93233 9.00686 3.74925 10.3861 3.52452 12.0552C3.37636 13.1556 3.25 14.3118 3.25 15.5C3.25 16.6882 3.37636 17.8444 3.52452 18.9448C3.79609 20.9618 5.46716 22.5555 7.52522 22.6501C8.95364 22.7158 10.4042 22.75 12 22.75C13.5958 22.75 15.0464 22.7158 16.4748 22.6501C18.5328 22.5555 20.2039 20.9618 20.4755 18.9448C20.6236 17.8444 20.75 16.6882 20.75 15.5C20.75 14.3118 20.6236 13.1556 20.4755 12.0552C20.2508 10.3861 19.0677 9.00686 17.5 8.52712V6.75C17.5 3.71243 15.0376 1.25 12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75ZM11.9933 14C11.1686 14 10.5 14.6716 10.5 15.5C10.5 16.3284 11.1686 17 11.9933 17H12.0067C12.8314 17 13.5 16.3284 13.5 15.5C13.5 14.6716 12.8314 14 12.0067 14H11.9933Z',
  d5: 'M7.52522 8.34988C8.95364 8.28422 10.4042 8.25 12 8.25C13.5958 8.25 15.0464 8.28422 16.4748 8.34989C18.5328 8.4445 20.2039 10.0382 20.4755 12.0552C20.6236 13.1556 20.75 14.3118 20.75 15.5C20.75 16.6882 20.6236 17.8444 20.4755 18.9448C20.2039 20.9618 18.5328 22.5555 16.4748 22.6501C15.0464 22.7158 13.5958 22.75 12 22.75C10.4042 22.75 8.95364 22.7158 7.52522 22.6501C5.46716 22.5555 3.79609 20.9618 3.52452 18.9448C3.37636 17.8444 3.25 16.6882 3.25 15.5C3.25 14.3118 3.37636 13.1556 3.52452 12.0552C3.79609 10.0382 5.46716 8.4445 7.52522 8.34988Z',
  d6: 'M10.5 15.5C10.5 14.6716 11.1686 14 11.9933 14H12.0067C12.8314 14 13.5 14.6716 13.5 15.5C13.5 16.3284 12.8314 17 12.0067 17H11.9933C11.1686 17 10.5 16.3284 10.5 15.5Z',
  d7: 'M8.5 6.75C8.5 4.817 10.067 3.25 12 3.25C13.933 3.25 15.5 4.817 15.5 6.75V8.31016C15.827 8.32177 16.1515 8.33502 16.4748 8.34988C16.8298 8.3662 17.1732 8.42712 17.5 8.52712V6.75C17.5 3.71243 15.0376 1.25 12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V8.52712C6.82676 8.42712 7.17023 8.3662 7.52522 8.34988C7.84854 8.33502 8.17299 8.32177 8.5 8.31016V6.75Z',
  d8: 'M11.9579 15.5H11.9669',
  d9: 'M16.4676 9.00683V6.53084C16.4676 3.96508 14.5224 1.99902 12.0885 1.99902C9.65463 1.99902 7.518 3.96508 7.518 6.53084L7.39835 9.00683M3.95996 9.00683H19.9551V22.0007H3.96116L3.95996 9.00683Z',
  d10: 'M12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.25H6.5V6.75C6.5 3.71243 8.96243 1.25 12 1.25C15.0376 1.25 17.5 3.71243 17.5 6.75V9.25H15.5V6.75C15.5 4.817 13.933 3.25 12 3.25Z',
  d11: 'M20.75 8.25H3.25V22.75H20.75V8.25ZM13.5 14H10.5V17H13.5V14Z',
};

export const IconSquareLock01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareLock01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareLock01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
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

export const IconSquareLock01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSquareLock01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconSquareLock01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSquareLock01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SquareLock01 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareLock01: TheIconSelfPack = [
  'SquareLock01',
  IconSquareLock01StrokeRounded,
  IconSquareLock01DuotoneRounded,
  IconSquareLock01TwotoneRounded,
  IconSquareLock01SolidRounded,
  IconSquareLock01BulkRounded,
  IconSquareLock01StrokeSharp,
  IconSquareLock01SolidSharp,
];