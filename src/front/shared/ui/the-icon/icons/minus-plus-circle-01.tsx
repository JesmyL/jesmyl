import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 16.5V10.1364M15.5 13.3182H8.5M15.5 7.5H8.5',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V14.8182H8.5C7.94772 14.8182 7.5 14.3705 7.5 13.8182C7.5 13.2659 7.94772 12.8182 8.5 12.8182H11V10.6364C11 10.0841 11.4477 9.63636 12 9.63636C12.5523 9.63636 13 10.0841 13 10.6364V12.8182H15.5C16.0523 12.8182 16.5 13.2659 16.5 13.8182C16.5 14.3705 16.0523 14.8182 15.5 14.8182H13V17ZM8.5 8C7.94772 8 7.5 7.55229 7.5 7C7.5 6.44772 7.94772 6 8.5 6H15.5C16.0523 6 16.5 6.44772 16.5 7C16.5 7.55229 16.0523 8 15.5 8H8.5Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12 18C12.5523 18 13 17.5523 13 17V14.8182H15.5C16.0523 14.8182 16.5 14.3705 16.5 13.8182C16.5 13.2659 16.0523 12.8182 15.5 12.8182H13V10.6364C13 10.0841 12.5523 9.63636 12 9.63636C11.4477 9.63636 11 10.0841 11 10.6364V12.8182H8.5C7.94772 12.8182 7.5 13.2659 7.5 13.8182C7.5 14.3705 7.94772 14.8182 8.5 14.8182H11V17C11 17.5523 11.4477 18 12 18ZM7.5 7C7.5 7.55229 7.94772 8 8.5 8H15.5C16.0523 8 16.5 7.55229 16.5 7C16.5 6.44772 16.0523 6 15.5 6H8.5C7.94772 6 7.5 6.44772 7.5 7Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11 17V14.8182H8.5V12.8182H11V10.6364H13V12.8182H15.5V14.8182H13V17H11ZM15.5 7V9H8.5V7H15.5Z',
};

export const IconMinusPlusCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-stroke-rounded IconMinusPlusCircle01StrokeRounded"
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

export const IconMinusPlusCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-duotone-rounded IconMinusPlusCircle01DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlusCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-twotone-rounded IconMinusPlusCircle01TwotoneRounded"
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

export const IconMinusPlusCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-solid-rounded IconMinusPlusCircle01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlusCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-bulk-rounded IconMinusPlusCircle01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMinusPlusCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-stroke-sharp IconMinusPlusCircle01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconMinusPlusCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="minus-plus-circle-01-solid-sharp IconMinusPlusCircle01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMinusPlusCircle01: TheIconSelfPack = {
  name: 'MinusPlusCircle01',
  StrokeRounded: IconMinusPlusCircle01StrokeRounded,
  DuotoneRounded: IconMinusPlusCircle01DuotoneRounded,
  TwotoneRounded: IconMinusPlusCircle01TwotoneRounded,
  SolidRounded: IconMinusPlusCircle01SolidRounded,
  BulkRounded: IconMinusPlusCircle01BulkRounded,
  StrokeSharp: IconMinusPlusCircle01StrokeSharp,
  SolidSharp: IconMinusPlusCircle01SolidSharp,
};