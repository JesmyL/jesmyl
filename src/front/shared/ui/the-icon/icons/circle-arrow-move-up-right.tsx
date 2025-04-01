import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 16V15.5176C9 14.6212 9 14.173 9.05803 13.798C9.37748 11.7336 10.9593 10.1146 12.9762 9.78761C13.3426 9.72821 14.1242 9.72821 15 9.72821M13.625 8L14.8051 9.23561C15.065 9.50776 15.065 9.94899 14.8051 10.2211L13.625 11.4567',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM14.3482 7.30933C13.9667 6.90994 13.3337 6.89538 12.9343 7.27683C12.7287 7.47326 12.625 7.7364 12.625 8V8.83486C10.2603 9.30187 8.44344 11.2304 8.0698 13.645C7.99982 14.0973 7.99989 14.6171 7.99999 15.4205L8 15.5176V16C8 16.5523 8.44772 17 9 17C9.55229 17 10 16.5523 10 16V15.5176C10 14.5838 10.003 14.2307 10.0463 13.9509C10.2732 12.4842 11.2934 11.3166 12.625 10.8962V11.5C12.6357 11.749 12.7399 11.9942 12.9343 12.1799C13.3337 12.5614 13.9667 12.5468 14.3482 12.1474L15.5282 10.9118C15.842 10.5833 15.9992 10.1575 16 9.73153L16 9.72821L16 9.72498C15.9992 9.29905 15.8419 8.87338 15.5282 8.54495L14.3482 7.30933Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M12.9343 7.27683C13.3337 6.89538 13.9667 6.90994 14.3482 7.30933L15.5283 8.54495C15.8419 8.87338 15.9992 9.29905 16 9.72498L16 9.72821L16 9.73153C15.9992 10.1575 15.842 10.5833 15.5283 10.9118L14.3482 12.1474C13.9667 12.5468 13.3337 12.5614 12.9343 12.1799C12.7399 11.9942 12.6357 11.749 12.625 11.5V10.8962C11.2934 11.3166 10.2732 12.4842 10.0463 13.9509C10.003 14.2307 10 14.5838 10 15.5176V16C10 16.5523 9.5523 17 9.00002 17C8.44773 17 8.00002 16.5523 8.00002 16V15.5176L8.00001 15.4205C7.9999 14.6171 7.99983 14.0973 8.06981 13.645C8.44346 11.2304 10.2603 9.30187 12.625 8.83486V8C12.625 7.7364 12.7287 7.47326 12.9343 7.27683Z',
  d5: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d6: 'M13.5 7L16 9.5L13.5 12',
  d7: 'M16 9.50732H8.10106C8.04603 9.50732 8 9.57318 8 9.62844V17.0058',
  d8: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.4697 8.53033L13.1893 9.25H9C8.58579 9.25 8.25 9.58578 8.25 10V16H9.75V10.75H13.1893L12.4697 11.4697L13.5303 12.5303L16.0607 10L13.5303 7.46967L12.4697 8.53033Z',
};

export const IconCircleArrowMoveUpRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-stroke-rounded IconCircleArrowMoveUpRightStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowMoveUpRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-duotone-rounded IconCircleArrowMoveUpRightDuotoneRounded"
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
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowMoveUpRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-twotone-rounded IconCircleArrowMoveUpRightTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowMoveUpRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-solid-rounded IconCircleArrowMoveUpRightSolidRounded"
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

export const IconCircleArrowMoveUpRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-bulk-rounded IconCircleArrowMoveUpRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowMoveUpRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-stroke-sharp IconCircleArrowMoveUpRightStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowMoveUpRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-move-up-right-solid-sharp IconCircleArrowMoveUpRightSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowMoveUpRight: TheIconSelfPack = {
  name: 'CircleArrowMoveUpRight',
  StrokeRounded: IconCircleArrowMoveUpRightStrokeRounded,
  DuotoneRounded: IconCircleArrowMoveUpRightDuotoneRounded,
  TwotoneRounded: IconCircleArrowMoveUpRightTwotoneRounded,
  SolidRounded: IconCircleArrowMoveUpRightSolidRounded,
  BulkRounded: IconCircleArrowMoveUpRightBulkRounded,
  StrokeSharp: IconCircleArrowMoveUpRightStrokeSharp,
  SolidSharp: IconCircleArrowMoveUpRightSolidSharp,
};