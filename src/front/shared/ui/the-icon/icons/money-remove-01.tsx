import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12V15',
  d2: 'M15 18.5H22',
  d3: 'M5.5 12H5.49102',
  d4: 'M18.5 12H18.491',
  d5: 'M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z',
  d6: 'M3.0528 5.5129C2 6.69377 2 8.46252 2 12C2 15.5375 2 17.3062 3.0528 18.4871C3.22119 18.676 3.40678 18.8506 3.60746 19.0091C4.86213 20 6.74142 20 10.5 20H13.5C17.2586 20 19.1379 20 20.3925 19.0091C20.5932 18.8506 20.7788 18.676 20.9472 18.4871C22 17.3062 22 15.5375 22 12C22 8.46252 22 6.69377 20.9472 5.5129C20.7788 5.32403 20.5932 5.14935 20.3925 4.99087C19.1379 4 17.2586 4 13.5 4H10.5C6.74142 4 4.86213 4 3.60746 4.99087C3.40678 5.14935 3.22119 5.32403 3.0528 5.5129ZM12.051 14.5C13.4317 14.5 14.551 13.3807 14.551 12C14.551 10.6193 13.4317 9.5 12.051 9.5C10.6703 9.5 9.55099 10.6193 9.55099 12C9.55099 13.3807 10.6703 14.5 12.051 14.5Z',
  d7: 'M22 12C22 8.46252 22 6.69377 20.9472 5.5129C20.7788 5.32403 20.5932 5.14935 20.3925 4.99087C19.1379 4 17.2586 4 13.5 4H10.5C6.74142 4 4.86213 4 3.60746 4.99087C3.40678 5.14935 3.22119 5.32403 3.0528 5.5129C2 6.69377 2 8.46252 2 12C2 15.5375 2 17.3062 3.0528 18.4871C3.22119 18.676 3.40678 18.8506 3.60746 19.0091C4.86213 20 6.74142 20 10.5 20H12',
  d8: 'M13.4225 3.25C15.2616 3.24999 16.7058 3.24998 17.8444 3.3786C19.0066 3.50988 19.949 3.78362 20.7324 4.40229C20.9669 4.58749 21.1843 4.79205 21.382 5.0138C22.0482 5.76101 22.3457 6.66669 22.4874 7.77785C22.625 8.85727 22.625 10.2232 22.625 11.9473V12.0528C22.625 13.3875 22.625 14.5076 22.5611 15.4463C22.5443 15.6944 22.5358 15.8184 22.4724 15.8935C22.455 15.9141 22.4424 15.9259 22.4207 15.9419C22.3415 16 22.186 16 21.875 16H14.875C13.4943 16 12.375 17.1193 12.375 18.5C12.375 18.564 12.3774 18.6275 12.3821 18.6903V18.6903V18.6903C12.4759 19.9355 12.5227 20.558 12.4337 20.654C12.3447 20.75 11.9551 20.75 11.176 20.75L10.3275 20.75C8.48845 20.75 7.04417 20.75 5.90558 20.6214C4.74342 20.4901 3.801 20.2164 3.01763 19.5977C2.78311 19.4125 2.56568 19.2079 2.36798 18.9862C1.70181 18.239 1.40432 17.3333 1.26263 16.2222C1.12498 15.1427 1.12499 13.7768 1.125 12.0528V12.0527V11.9473V11.9472C1.12499 10.2232 1.12498 8.85727 1.26263 7.77785C1.40432 6.66669 1.70181 5.76101 2.36798 5.0138C2.56568 4.79205 2.78311 4.58749 3.01763 4.40229C3.801 3.78362 4.74342 3.50988 5.90558 3.3786C7.04417 3.24998 8.48845 3.24999 10.3275 3.25H13.4225ZM11.875 15C13.5319 15 14.875 13.6569 14.875 12C14.875 10.3431 13.5319 9 11.875 9C10.2181 9 8.875 10.3431 8.875 12C8.875 13.6569 10.2181 15 11.875 15ZM6.37617 12C6.37617 11.4477 5.92845 11 5.37617 11H5.36719C4.8149 11 4.36719 11.4477 4.36719 12C4.36719 12.5523 4.8149 13 5.36719 13H5.37617C5.92845 13 6.37617 12.5523 6.37617 12Z',
  d9: 'M13.875 18.5C13.875 17.9477 14.3227 17.5 14.875 17.5H21.875C22.4273 17.5 22.875 17.9477 22.875 18.5C22.875 19.0523 22.4273 19.5 21.875 19.5H14.875C14.3227 19.5 13.875 19.0523 13.875 18.5Z',
  d10: 'M13.4225 3.25C15.2616 3.24999 16.7058 3.24998 17.8444 3.3786C19.0066 3.50988 19.949 3.78362 20.7324 4.40229C20.9669 4.58749 21.1843 4.79205 21.382 5.0138C22.0482 5.76101 22.3457 6.66669 22.4874 7.77785C22.625 8.85727 22.625 10.2232 22.625 11.9473V12.0528C22.625 13.3875 22.625 14.5076 22.5611 15.4463C22.5443 15.6944 22.5358 15.8184 22.4724 15.8935C22.455 15.9141 22.4424 15.9259 22.4207 15.9419C22.3415 16 22.186 16 21.875 16H14.875C13.4943 16 12.375 17.1193 12.375 18.5C12.375 18.564 12.3774 18.6275 12.3821 18.6903C12.4759 19.9354 12.5227 20.558 12.4337 20.654C12.3447 20.75 11.9551 20.75 11.176 20.75L10.3275 20.75C8.48845 20.75 7.04417 20.75 5.90558 20.6214C4.74342 20.4901 3.801 20.2164 3.01763 19.5977C2.78311 19.4125 2.56568 19.2079 2.36798 18.9862C1.70181 18.239 1.40432 17.3333 1.26263 16.2222C1.12498 15.1427 1.12499 13.7767 1.125 12.0527V11.9473C1.12499 10.2233 1.12498 8.85727 1.26263 7.77785C1.40432 6.66669 1.70181 5.76101 2.36798 5.0138C2.56568 4.79205 2.78311 4.58749 3.01763 4.40229C3.801 3.78362 4.74342 3.50988 5.90558 3.3786C7.04417 3.24998 8.48845 3.24999 10.3275 3.25H13.4225Z',
  d11: 'M11.875 15C13.5319 15 14.875 13.6569 14.875 12C14.875 10.3431 13.5319 9 11.875 9C10.2181 9 8.875 10.3431 8.875 12C8.875 13.6569 10.2181 15 11.875 15Z',
  d12: 'M5.37617 11C5.92845 11 6.37617 11.4477 6.37617 12C6.37617 12.5523 5.92845 13 5.37617 13H5.36719C4.8149 13 4.36719 12.5523 4.36719 12C4.36719 11.4477 4.8149 11 5.36719 11H5.37617Z',
  d13: 'M22 12V4H2V20H12',
  d14: 'M2 3.25C1.58579 3.25 1.25 3.58579 1.25 4V20C1.25 20.4142 1.58579 20.75 2 20.75H14.25V16.75H22.75V4C22.75 3.58579 22.4142 3.25 22 3.25H2ZM8.80078 12C8.80078 10.2051 10.2559 8.75 12.0508 8.75C13.8457 8.75 15.3008 10.2051 15.3008 12C15.3008 13.7949 13.8457 15.25 12.0508 15.25C10.2559 15.25 8.80078 13.7949 8.80078 12ZM3.5 12.75H6.5V11.25H3.5L3.5 12.75Z',
  d15: 'M15.75 20.25V18.25H22.75V20.25H15.75Z',
};

export const IconMoneyRemove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-stroke-rounded IconMoneyRemove01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-duotone-rounded IconMoneyRemove01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-twotone-rounded IconMoneyRemove01TwotoneRounded"
    >
      <path 
        d={d.d7} 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-solid-rounded IconMoneyRemove01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-bulk-rounded IconMoneyRemove01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-stroke-sharp IconMoneyRemove01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyRemove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-remove-01-solid-sharp IconMoneyRemove01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoneyRemove01: TheIconSelfPack = {
  name: 'MoneyRemove01',
  StrokeRounded: IconMoneyRemove01StrokeRounded,
  DuotoneRounded: IconMoneyRemove01DuotoneRounded,
  TwotoneRounded: IconMoneyRemove01TwotoneRounded,
  SolidRounded: IconMoneyRemove01SolidRounded,
  BulkRounded: IconMoneyRemove01BulkRounded,
  StrokeSharp: IconMoneyRemove01StrokeSharp,
  SolidSharp: IconMoneyRemove01SolidSharp,
};