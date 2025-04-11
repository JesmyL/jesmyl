import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22V9',
  d2: 'M15 17H16C18.7614 17 21 14.7614 21 12C21 9.5807 19.2818 7.56271 16.999 7.09982C16.999 4.3384 15 2 12 2C9 2 7.00097 4.3384 7.00097 7.09982C4.71825 7.56271 3 9.5807 3 12C3 14.7614 5.23858 17 8 17H9',
  d3: 'M12 15L14.5 12.5',
  d4: 'M12 13L9.5 10.5',
  d5: 'M10 22H14',
  d6: 'M12 2C9 2 7.00097 4.3384 7.00097 7.09982C4.71825 7.56271 3 9.5807 3 12C3 14.7614 5.23858 17 8 17H16C18.7614 17 21 14.7614 21 12C21 9.5807 19.2817 7.56271 16.999 7.09982C16.999 4.3384 15 2 12 2Z',
  d7: 'M12 1.25C8.76146 1.25 6.5449 3.63576 6.27807 6.51249C3.94371 7.2444 2.25 9.42369 2.25 12C2.25 15.1756 4.82436 17.75 8 17.75H11.25V13.3107L8.96967 11.0303C8.67678 10.7374 8.67678 10.2626 8.96967 9.96967C9.26256 9.67678 9.73744 9.67678 10.0303 9.96967L11.25 11.1893V9C11.25 8.58579 11.5858 8.25 12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.1893L13.9697 11.9697C14.2626 11.6768 14.7374 11.6768 15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L12.75 15.3107V17.75H16C19.1756 17.75 21.75 15.1756 21.75 12C21.75 9.42369 20.0563 7.2444 17.7219 6.51249C17.4551 3.63576 15.2385 1.25 12 1.25Z',
  d8: 'M11.25 17.75V21.25H10C9.58579 21.25 9.25 21.5858 9.25 22C9.25 22.4142 9.58579 22.75 10 22.75H14C14.4142 22.75 14.75 22.4142 14.75 22C14.75 21.5858 14.4142 21.25 14 21.25H12.75V17.75H11.25Z',
  d9: 'M6.27807 6.51249C6.5449 3.63576 8.76146 1.25 12 1.25C15.2385 1.25 17.4551 3.63576 17.7219 6.51249C20.0563 7.2444 21.75 9.42369 21.75 12C21.75 15.1756 19.1756 17.75 16 17.75H8C4.82436 17.75 2.25 15.1756 2.25 12C2.25 9.42369 3.94371 7.2444 6.27807 6.51249Z',
  d10: 'M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.1893L13.9697 11.9697C14.2626 11.6768 14.7374 11.6768 15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L12.75 15.3107V21.25H14C14.4142 21.25 14.75 21.5858 14.75 22C14.75 22.4142 14.4142 22.75 14 22.75H10C9.58579 22.75 9.25 22.4142 9.25 22C9.25 21.5858 9.58579 21.25 10 21.25H11.25V13.3107L8.96967 11.0303C8.67678 10.7374 8.67678 10.2626 8.96967 9.96967C9.26256 9.67678 9.73744 9.67678 10.0303 9.96967L11.25 11.1893V9C11.25 8.58579 11.5858 8.25 12 8.25Z',
  d11: 'M10 22H12M12 22H14M12 22V15M12 15L14.5 12.5M12 15V13M12 13V9M12 13L9.5 10.5',
  d12: 'M11.2501 17.75V21.25H9.25012V22.75H14.7501V21.25H12.7501V17.75H11.2501Z',
  d13: 'M12 1.25C8.76146 1.25 6.5449 3.63576 6.27807 6.51249C3.94371 7.2444 2.25 9.42369 2.25 12C2.25 15.1756 4.82436 17.75 8 17.75H11.2501V13.3107L8.43945 10.5L9.50011 9.43934L11.2501 11.1893V8.25H12.7501V13.1893L14.5001 11.4393L15.5608 12.5L12.7501 15.3107V17.75H16C19.1756 17.75 21.75 15.1756 21.75 12C21.75 9.42369 20.0563 7.2444 17.7219 6.51249C17.4551 3.63576 15.2385 1.25 12 1.25Z',
};

export const IconTree02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTree02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 DuotoneRounded"
    >
      <path 
        d={d.d6}
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
    </TheIconWrapper>
  );
};

export const IconTree02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 TwotoneRounded"
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

export const IconTree02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 SolidRounded"
    >
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

export const IconTree02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 BulkRounded"
    >
      <path 
        d={d.d9}
        i-c="f o7"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTree02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 StrokeSharp"
    >
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d11}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconTree02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Tree02 SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTree02: TheIconSelfPack = [
  'Tree02',
  IconTree02StrokeRounded,
  IconTree02DuotoneRounded,
  IconTree02TwotoneRounded,
  IconTree02SolidRounded,
  IconTree02BulkRounded,
  IconTree02StrokeSharp,
  IconTree02SolidSharp,
];