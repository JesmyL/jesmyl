import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z',
  d2: 'M9 10.5C9 9.67157 9.67157 9 10.5 9H13.5C14.3284 9 15 9.67157 15 10.5V13.5C15 14.3284 14.3284 15 13.5 15H10.5C9.67157 15 9 14.3284 9 13.5V10.5Z',
  d3: 'M9 12H2',
  d4: 'M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.5 9C9.67157 9 9 9.67157 9 10.5V13.5C9 14.3284 9.67157 15 10.5 15H13.5C14.3284 15 15 14.3284 15 13.5V10.5C15 9.67157 14.3284 9 13.5 9H10.5Z',
  d5: 'M9 12H2M10.5 15H13.5C14.3284 15 15 14.3284 15 13.5V10.5C15 9.67157 14.3284 9 13.5 9H10.5C9.67157 9 9 9.67157 9 10.5V13.5C9 14.3284 9.67157 15 10.5 15Z',
  d6: 'M11.977 22.75C17.9268 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9268 1.25 11.977 1.25C6.36514 1.25 1.75549 5.53178 1.25 11H8.21898V10.5C8.21898 9.25736 9.22849 8.25 10.4738 8.25H13.4802C14.7255 8.25 15.735 9.25736 15.735 10.5V13.5C15.735 14.7426 14.7255 15.75 13.4802 15.75H10.4738C9.22849 15.75 8.21898 14.7426 8.21898 13.5V13H1.25C1.75549 18.4682 6.36514 22.75 11.977 22.75Z',
  d7: 'M22.7499 12C22.7499 17.9371 17.9369 22.75 11.9999 22.75C6.06284 22.75 1.2499 17.9371 1.2499 12C1.2499 6.06294 6.06284 1.25 11.9999 1.25C17.9369 1.25 22.7499 6.06294 22.7499 12Z',
  d8: 'M1.29577 11H8.2499V10.5C8.2499 9.25736 9.25725 8.25 10.4999 8.25H13.4999C14.7425 8.25 15.7499 9.25736 15.7499 10.5V13.5C15.7499 14.7426 14.7425 15.75 13.4999 15.75H10.4999C9.25725 15.75 8.2499 14.7426 8.2499 13.5V13H1.29577C1.2654 12.6707 1.24988 12.3372 1.24988 12C1.24988 11.6628 1.2654 11.3293 1.29577 11Z',
  d9: 'M15 9H9V15H15V9Z',
  d10: 'M11.977 22.75C17.9268 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9268 1.25 11.977 1.25C6.36514 1.25 1.75549 5.53178 1.25 11H8.21898V9C8.21898 8.58579 8.55548 8.25 8.97058 8.25H14.9834C15.3985 8.25 15.735 8.58579 15.735 9V15C15.735 15.4142 15.3985 15.75 14.9834 15.75H8.97058C8.55548 15.75 8.21898 15.4142 8.21898 15V13H1.25C1.75549 18.4682 6.36514 22.75 11.977 22.75Z',
};

export const IconUberStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-stroke-rounded IconUberStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconUberDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-duotone-rounded IconUberDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUberTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-twotone-rounded IconUberTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUberSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-solid-rounded IconUberSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUberBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-bulk-rounded IconUberBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUberStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-stroke-sharp IconUberStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconUberSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uber-solid-sharp IconUberSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUber: TheIconSelfPack = {
  name: 'Uber',
  StrokeRounded: IconUberStrokeRounded,
  DuotoneRounded: IconUberDuotoneRounded,
  TwotoneRounded: IconUberTwotoneRounded,
  SolidRounded: IconUberSolidRounded,
  BulkRounded: IconUberBulkRounded,
  StrokeSharp: IconUberStrokeSharp,
  SolidSharp: IconUberSolidSharp,
};