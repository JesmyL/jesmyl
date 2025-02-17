import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 17.5227 17.5229 22 12 22C6.47713 22 2 17.5227 2 12C2 6.47713 6.47713 2 12 2C17.5229 2 22 6.47713 22 12Z',
  d2: 'M16.5 12C16.5 14.4852 14.4853 16.5 12 16.5C9.51471 16.5 7.5 14.4852 7.5 12C7.5 9.51471 9.51471 7.5 12 7.5C14.4853 7.5 16.5 9.51471 16.5 12Z',
  d3: 'M12 2V22',
  d4: 'M12 16.5C14.4853 16.5 16.5 14.4852 16.5 12C16.5 9.51471 14.4853 7.5 12 7.5V16.5Z',
  d5: 'M12 2C6.47713 2 2 6.47713 2 12C2 17.5227 6.47713 22 12 22V16.5C9.51471 16.5 7.5 14.4852 7.5 12C7.5 9.51471 9.51471 7.5 12 7.5V2Z',
  d6: 'M12 2V22M16.5 12C16.5 14.4852 14.4853 16.5 12 16.5C9.51471 16.5 7.5 14.4852 7.5 12C7.5 9.51471 9.51471 7.5 12 7.5C14.4853 7.5 16.5 9.51471 16.5 12Z',
  d7: 'M12 17C14.7614 17 17 14.7613 17 12C17 9.23857 14.7614 7 12 7V17Z',
  d8: 'M1.25 12C1.25 6.06292 6.06292 1.25 12 1.25C17.9371 1.25 22.75 6.06292 22.75 12C22.75 17.9369 17.9371 22.75 12 22.75C6.06291 22.75 1.25 17.9369 1.25 12ZM12 20.796C16.8576 20.796 20.7955 16.858 20.7955 12.0005C20.7955 7.14292 16.8576 3.20508 12 3.20508L12 7C9.23857 7 7 9.23857 7 12C7 14.7613 9.23857 17 12 17L12 20.796Z',
  d9: 'M1.25 12C1.25 6.06292 6.06292 1.25 12 1.25V7C9.23857 7 7 9.23857 7 12C7 14.7613 9.23857 17 12 17V22.75C6.06291 22.75 1.25 17.9369 1.25 12Z',
  d10: 'M12 1.25C17.9371 1.25 22.75 6.06292 22.75 12C22.75 17.9369 17.9371 22.75 12 22.75V20.796C16.8576 20.796 20.7955 16.858 20.7955 12.0005C20.7955 7.14292 16.8576 3.20508 12 3.20508V1.25Z',
};

export const IconDarkModeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-stroke-rounded IconDarkModeStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-duotone-rounded IconDarkModeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-twotone-rounded IconDarkModeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-solid-rounded IconDarkModeSolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-bulk-rounded IconDarkModeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-stroke-sharp IconDarkModeStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconDarkModeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dark-mode-solid-sharp IconDarkModeSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDarkMode: TheIconSelfPack = {
  name: 'DarkMode',
  StrokeRounded: IconDarkModeStrokeRounded,
  DuotoneRounded: IconDarkModeDuotoneRounded,
  TwotoneRounded: IconDarkModeTwotoneRounded,
  SolidRounded: IconDarkModeSolidRounded,
  BulkRounded: IconDarkModeBulkRounded,
  StrokeSharp: IconDarkModeStrokeSharp,
  SolidSharp: IconDarkModeSolidSharp,
};