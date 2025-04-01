import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z',
  d2: 'M15 2.5L15 21.5',
  d3: 'M3.88734 3.89515C2.49609 5.28639 2.49609 7.52557 2.4961 12.0039C2.4961 16.4823 2.4961 18.7214 3.88734 20.1127C5.27858 21.5039 7.51775 21.5039 11.9961 21.5039L14.9961 21.5039L14.9961 2.52665C14.1252 2.50391 13.1328 2.50391 11.9961 2.50391C7.51775 2.50391 5.27858 2.50391 3.88734 3.89515Z',
  d4: 'M1.5 11.9255V12.0745C1.49998 14.2504 1.49996 15.9852 1.68282 17.3453C1.87164 18.7497 2.27175 19.9035 3.18414 20.8159C4.09653 21.7283 5.25033 22.1284 6.65471 22.3172C8.01485 22.5 9.74957 22.5 11.9255 22.5H12.0745C12.3957 22.5 12.7073 22.5 13.0095 22.4994C13.475 22.4985 13.7078 22.4981 13.8539 22.3517C14 22.2053 14 21.9715 14 21.5038V2.49623C14 2.02855 14 1.79471 13.8539 1.64832C13.7078 1.50193 13.475 1.50148 13.0095 1.50058C12.7073 1.49999 12.3957 1.5 12.0744 1.5L11.9256 1.5C9.74959 1.49998 8.01485 1.49996 6.65471 1.68282C5.25033 1.87164 4.09653 2.27175 3.18414 3.18414C2.27175 4.09653 1.87164 5.25033 1.68282 6.65471C1.49996 8.01485 1.49998 9.74957 1.5 11.9255ZM17.0536 1.64699C16.5734 1.59326 16.3334 1.5664 16.1667 1.71547C16 1.86454 16 2.11596 16 2.61881V21.3812C16 21.884 16 22.1355 16.1667 22.2845C16.3334 22.4336 16.5734 22.4067 17.0536 22.353C17.1527 22.3419 17.2499 22.33 17.3453 22.3172C18.7497 22.1284 19.9035 21.7283 20.8159 20.8159C21.7283 19.9035 22.1284 18.7497 22.3172 17.3453C22.5 15.9851 22.5 14.2504 22.5 12.0744V11.9256C22.5 9.74959 22.5 8.01485 22.3172 6.65471C22.1284 5.25033 21.7283 4.09653 20.8159 3.18414C19.9035 2.27175 18.7497 1.87164 17.3453 1.68282C17.2499 1.67 17.1527 1.65807 17.0536 1.64699Z',
  d5: 'M1.5 11.9255V12.0745C1.49998 14.2504 1.49996 15.9852 1.68282 17.3453C1.87164 18.7497 2.27175 19.9035 3.18414 20.8159C4.09653 21.7283 5.25033 22.1284 6.65471 22.3172C8.01485 22.5 9.74957 22.5 11.9255 22.5H12.0745C12.3957 22.5 12.7073 22.5 13.0095 22.4994C13.475 22.4985 13.7078 22.4981 13.8539 22.3517C14 22.2053 14 21.9715 14 21.5038V2.49623C14 2.02855 14 1.79471 13.8539 1.64832C13.7078 1.50193 13.475 1.50148 13.0095 1.50058C12.7073 1.49999 12.3957 1.5 12.0744 1.5L11.9256 1.5C9.74959 1.49998 8.01485 1.49996 6.65471 1.68282C5.25033 1.87164 4.09653 2.27175 3.18414 3.18414C2.27175 4.09653 1.87164 5.25033 1.68282 6.65471C1.49996 8.01485 1.49998 9.74957 1.5 11.9255Z',
  d6: 'M17.0536 1.6481C16.5734 1.59437 16.3334 1.56751 16.1667 1.71658C16 1.86565 16 2.11708 16 2.61992V21.3823C16 21.8852 16 22.1366 16.1667 22.2856C16.3334 22.4347 16.5734 22.4079 17.0536 22.3541C17.1527 22.343 17.2499 22.3311 17.3453 22.3183C18.7497 22.1295 19.9035 21.7294 20.8159 20.817C21.7283 19.9046 22.1284 18.7508 22.3172 17.3464C22.5 15.9863 22.5 14.2515 22.5 12.0755V11.9267C22.5 9.7507 22.5 8.01597 22.3172 6.65583C22.1284 5.25145 21.7283 4.09764 20.8159 3.18525C19.9035 2.27286 18.7497 1.87275 17.3453 1.68394C17.2499 1.67111 17.1527 1.65919 17.0536 1.6481Z',
  d7: 'M3 21H21V3H3V21Z',
  d8: 'M15 3V21',
  d9: 'M16.0029 2.25H21.0029C21.4171 2.25 21.7529 2.58579 21.7529 3V21C21.7529 21.4142 21.4171 21.75 21.0029 21.75H16.0029L16.0029 2.25Z',
  d10: 'M14.0029 21.75H3.00293C2.58872 21.75 2.25293 21.4142 2.25293 21V3C2.25293 2.58579 2.58872 2.25 3.00293 2.25H14.0029L14.0029 21.75Z',
};

export const IconLayoutRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-stroke-rounded IconLayoutRightStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-duotone-rounded IconLayoutRightDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-twotone-rounded IconLayoutRightTwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-solid-rounded IconLayoutRightSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-bulk-rounded IconLayoutRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-stroke-sharp IconLayoutRightStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLayoutRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="layout-right-solid-sharp IconLayoutRightSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayoutRight: TheIconSelfPack = {
  name: 'LayoutRight',
  StrokeRounded: IconLayoutRightStrokeRounded,
  DuotoneRounded: IconLayoutRightDuotoneRounded,
  TwotoneRounded: IconLayoutRightTwotoneRounded,
  SolidRounded: IconLayoutRightSolidRounded,
  BulkRounded: IconLayoutRightBulkRounded,
  StrokeSharp: IconLayoutRightStrokeSharp,
  SolidSharp: IconLayoutRightSolidSharp,
};