import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 12L12 6L16 12M8 12L12 18L16 12M8 12L12 13.5L16 12',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8 12L12 6L16 12L12 18L8 12Z',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.0001 5.25C12.2509 5.25 12.4851 5.37533 12.6242 5.58397L16.322 11.1307L12.0004 12.7023L7.67839 11.1306L11.3761 5.58397C11.5152 5.37533 11.7494 5.25 12.0001 5.25ZM12.2567 14.2052L16.4474 12.6812L12.6242 18.416C12.4851 18.6247 12.2509 18.75 12.0001 18.75C11.7494 18.75 11.5152 18.6247 11.3761 18.416L7.55273 12.681L11.744 14.2052C11.9096 14.2654 12.0911 14.2654 12.2567 14.2052Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M12.6242 5.58397C12.4851 5.37533 12.2509 5.25 12.0001 5.25C11.7494 5.25 11.5152 5.37533 11.3761 5.58397L7.67839 11.1306L12.0004 12.7023L16.322 11.1307L12.6242 5.58397Z',
  d6: 'M16.4474 12.6812L12.2567 14.2052C12.0911 14.2654 11.9096 14.2654 11.744 14.2052L7.55273 12.681L11.3761 18.416C11.5152 18.6247 11.7494 18.75 12.0001 18.75C12.2509 18.75 12.4851 18.6247 12.6242 18.416L16.4474 12.6812Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.0002 5.25C12.2509 5.25 12.4851 5.37533 12.6242 5.58397L16.322 11.1307L12.0004 12.7022L7.67842 11.1305L11.3761 5.58397C11.5152 5.37533 11.7494 5.25 12.0002 5.25ZM12.2567 14.205L16.4475 12.6811L12.6242 18.416C12.4851 18.6247 12.2509 18.75 12.0002 18.75C11.7494 18.75 11.5152 18.6247 11.3761 18.416L7.55273 12.6809L11.7441 14.205C11.9096 14.2653 12.0911 14.2653 12.2567 14.205Z',
};

export const IconEthereumEllipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-stroke-rounded IconEthereumEllipseStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-duotone-rounded IconEthereumEllipseDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-twotone-rounded IconEthereumEllipseTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-solid-rounded IconEthereumEllipseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-bulk-rounded IconEthereumEllipseBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-stroke-sharp IconEthereumEllipseStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconEthereumEllipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ethereum-ellipse-solid-sharp IconEthereumEllipseSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEthereumEllipse: TheIconSelfPack = {
  name: 'EthereumEllipse',
  StrokeRounded: IconEthereumEllipseStrokeRounded,
  DuotoneRounded: IconEthereumEllipseDuotoneRounded,
  TwotoneRounded: IconEthereumEllipseTwotoneRounded,
  SolidRounded: IconEthereumEllipseSolidRounded,
  BulkRounded: IconEthereumEllipseBulkRounded,
  StrokeSharp: IconEthereumEllipseStrokeSharp,
  SolidSharp: IconEthereumEllipseSolidSharp,
};