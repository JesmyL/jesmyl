import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.5 21L6.5 11.5C6.5 8.46243 8.96243 6 12 6C15.0376 6 17.5 8.46243 17.5 11.5L17.5 21',
  d2: 'M3 13V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V13',
  d3: 'M14.5 11.5C14.5 10.1193 13.3807 9 12 9C10.6193 9 9.5 10.1193 9.5 11.5V12.75C9.5 13.4404 10.0596 14 10.75 14H13.25C13.9404 14 14.5 13.4404 14.5 12.75V11.5Z',
  d4: 'M6.5 11.5V21H17.5V11.5C17.5 8.46243 15.0376 6 12 6C8.96243 6 6.5 8.46243 6.5 11.5ZM12 9C13.3807 9 14.5 10.1193 14.5 11.5V12.75C14.5 13.4404 13.9404 14 13.25 14H10.75C10.0596 14 9.5 13.4404 9.5 12.75V11.5C9.5 10.1193 10.6193 9 12 9Z',
  d5: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12V13C2 13.5523 2.44772 14 3 14C3.55228 14 4 13.5523 4 13V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V13C20 13.5523 20.4477 14 21 14C21.5523 14 22 13.5523 22 13V12Z',
  d6: 'M12 5.24999C8.54823 5.24999 5.75001 8.04821 5.75001 11.5L5.75 19.0447C5.74995 19.4776 5.74991 19.8744 5.79331 20.1972C5.8411 20.5527 5.95355 20.9284 6.26257 21.2374C6.57159 21.5465 6.94732 21.6589 7.3028 21.7067C7.62561 21.7501 8.02244 21.75 8.45525 21.75L8.45526 21.75H15.5448L15.5448 21.75C15.9776 21.75 16.3744 21.7501 16.6972 21.7067C17.0527 21.6589 17.4284 21.5465 17.7374 21.2374C18.0465 20.9284 18.1589 20.5527 18.2067 20.1972C18.2501 19.8744 18.2501 19.4776 18.25 19.0448V19.0447V19.0447L18.25 11.5C18.25 8.04821 15.4518 5.24999 12 5.24999ZM12 8.24999C13.7949 8.24999 15.25 9.70507 15.25 11.5V12.75C15.25 13.8546 14.3546 14.75 13.25 14.75H10.75C9.64543 14.75 8.75 13.8546 8.75 12.75L8.75 11.5C8.75 9.70507 10.2051 8.24999 12 8.24999Z',
  d7: 'M5.75001 11.5C5.75001 8.04822 8.54823 5.25 12 5.25C15.4518 5.25 18.25 8.04822 18.25 11.5L18.25 19.0447V19.0448C18.2501 19.4776 18.2501 19.8744 18.2067 20.1972C18.1589 20.5527 18.0465 20.9284 17.7374 21.2374C17.4284 21.5465 17.0527 21.6589 16.6972 21.7067C16.3744 21.7501 15.9776 21.7501 15.5448 21.75H8.45526C8.02245 21.7501 7.62561 21.7501 7.3028 21.7067C6.94732 21.6589 6.57159 21.5465 6.26257 21.2374C5.95355 20.9284 5.8411 20.5527 5.79331 20.1972C5.74991 19.8744 5.74995 19.4776 5.75 19.0447L5.75001 11.5Z',
  d8: 'M15.25 11.5C15.25 9.70507 13.7949 8.25 12 8.25C10.2051 8.25 8.75 9.70507 8.75 11.5V12.75C8.75 13.8546 9.64543 14.75 10.75 14.75H13.25C14.3546 14.75 15.25 13.8546 15.25 12.75V11.5Z',
  d9: 'M9.5 14V11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5V14H9.5Z',
  d10: 'M22 12.25C22 6.72715 17.5228 2.25 12 2.25C6.47715 2.25 2 6.72715 2 12.25V13.25H4V12.25C4 7.83172 7.58172 4.25 12 4.25C16.4183 4.25 20 7.83172 20 12.25V13.25H22V12.25Z',
  d11: 'M12 5.5C15.4518 5.5 18.25 8.29822 18.25 11.75V21.75H5.75V11.75C5.75 8.29822 8.54822 5.5 12 5.5ZM12 8.5C13.7949 8.5 15.25 9.95507 15.25 11.75V15H8.75V11.75C8.75 9.95507 10.2051 8.5 12 8.5Z',
};

export const IconTouch10StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-stroke-rounded IconTouch10StrokeRounded"
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

export const IconTouch10DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-duotone-rounded IconTouch10DuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
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

export const IconTouch10TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-twotone-rounded IconTouch10TwotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTouch10SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-solid-rounded IconTouch10SolidRounded"
    >
      <path 
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

export const IconTouch10BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-bulk-rounded IconTouch10BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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

export const IconTouch10StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-stroke-sharp IconTouch10StrokeSharp"
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
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTouch10SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="touch-10-solid-sharp IconTouch10SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTouch10: TheIconSelfPack = {
  name: 'Touch10',
  StrokeRounded: IconTouch10StrokeRounded,
  DuotoneRounded: IconTouch10DuotoneRounded,
  TwotoneRounded: IconTouch10TwotoneRounded,
  SolidRounded: IconTouch10SolidRounded,
  BulkRounded: IconTouch10BulkRounded,
  StrokeSharp: IconTouch10StrokeSharp,
  SolidSharp: IconTouch10SolidSharp,
};