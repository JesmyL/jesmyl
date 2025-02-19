import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.5 7H9.5C6.21252 7 4.56878 7 3.46243 7.90796C3.25989 8.07418 3.07418 8.25989 2.90796 8.46243C2 9.56878 2 11.2125 2 14.5C2 17.7875 2 19.4312 2.90796 20.5376C3.07418 20.7401 3.25989 20.9258 3.46243 21.092C4.56878 22 6.21252 22 9.5 22H14.5C17.7875 22 19.4312 22 20.5376 21.092C20.7401 20.9258 20.9258 20.7401 21.092 20.5376C22 19.4312 22 17.7875 22 14.5C22 11.2125 22 9.56878 21.092 8.46243C20.9258 8.25989 20.7401 8.07418 20.5376 7.90796C19.4312 7 17.7875 7 14.5 7Z',
  d2: 'M12 7V5C12 4.44772 12.4477 4 13 4C13.5523 4 14 3.55228 14 3V2',
  d3: 'M7 12L8 12',
  d4: 'M11.5 12L12.5 12',
  d5: 'M16 12L17 12',
  d6: 'M7 17L17 17',
  d7: 'M9.45109 6.25H14.5489C16.1512 6.24999 17.4205 6.24998 18.4248 6.36868C19.4557 6.49054 20.3044 6.74638 21.0134 7.3282C21.2539 7.52558 21.4744 7.74612 21.6718 7.98663C22.2536 8.69558 22.5095 9.54428 22.6313 10.5753C22.75 11.5794 22.75 12.8488 22.75 14.451V14.4511V14.549V14.5491C22.75 16.1513 22.75 17.4206 22.6313 18.4248C22.5095 19.4557 22.2536 20.3044 21.6718 21.0134C21.4744 21.2539 21.2539 21.4744 21.0134 21.6718C20.3044 22.2536 19.4557 22.5095 18.4248 22.6313C17.4206 22.75 16.1511 22.75 14.5489 22.75H14.5489H9.45099H9.45097C7.84877 22.75 6.57944 22.75 5.57525 22.6313C4.54428 22.5095 3.69558 22.2536 2.98663 21.6718C2.74612 21.4744 2.52558 21.2539 2.3282 21.0134C1.74638 20.3044 1.49055 19.4557 1.36868 18.4248C1.24998 17.4205 1.24999 16.1512 1.25 14.5489V14.5489V14.4511V14.4511C1.24999 12.8488 1.24998 11.5795 1.36868 10.5753C1.49055 9.54428 1.74638 8.69558 2.3282 7.98663C2.52558 7.74612 2.74612 7.52558 2.98663 7.3282C3.69558 6.74638 4.54428 6.49054 5.57525 6.36868C6.57947 6.24998 7.84883 6.24999 9.45109 6.25ZM6 12C6 11.4477 6.44772 11 7 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H7C6.44771 13 6 12.5523 6 12ZM10.5 12C10.5 11.4477 10.9477 11 11.5 11H12.5C13.0523 11 13.5 11.4477 13.5 12C13.5 12.5523 13.0523 13 12.5 13H11.5C10.9477 13 10.5 12.5523 10.5 12ZM16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H16ZM6 17C6 16.4477 6.44772 16 7 16L17 16C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18L7 18C6.44771 18 6 17.5523 6 17Z',
  d8: 'M15 2C15 1.44772 14.5523 1 14 1C13.4477 1 13 1.44772 13 2V2.9C13 2.95523 12.9552 2.99974 12.9 3.00246C11.8419 3.05455 11 3.92896 11 5V6.25H13V5.1C13 5.04477 13.0448 5.00026 13.1 4.99754C14.1581 4.94545 15 4.07104 15 3V2Z',
  d9: 'M14.5489 6.25H9.45109C7.84883 6.24999 6.57947 6.24998 5.57525 6.36868C4.54428 6.49054 3.69558 6.74638 2.98663 7.3282C2.74612 7.52558 2.52558 7.74612 2.3282 7.98663C1.74638 8.69558 1.49055 9.54428 1.36868 10.5753C1.24998 11.5795 1.24999 12.8488 1.25 14.4511V14.5489C1.24999 16.1512 1.24998 17.4205 1.36868 18.4248C1.49055 19.4557 1.74638 20.3044 2.3282 21.0134C2.52558 21.2539 2.74612 21.4744 2.98663 21.6718C3.69558 22.2536 4.54428 22.5095 5.57525 22.6313C6.57945 22.75 7.84878 22.75 9.45099 22.75H14.5489C16.1511 22.75 17.4206 22.75 18.4248 22.6313C19.4557 22.5095 20.3044 22.2536 21.0134 21.6718C21.2539 21.4744 21.4744 21.2539 21.6718 21.0134C22.2536 20.3044 22.5095 19.4557 22.6313 18.4248C22.75 17.4206 22.75 16.1512 22.75 14.549V14.4511C22.75 12.8489 22.75 11.5794 22.6313 10.5753C22.5095 9.54428 22.2536 8.69558 21.6718 7.98663C21.4744 7.74612 21.2539 7.52558 21.0134 7.3282C20.3044 6.74638 19.4557 6.49054 18.4248 6.36868C17.4205 6.24998 16.1512 6.24999 14.5489 6.25Z',
  d10: 'M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13L8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11H7ZM11.5 11C10.9477 11 10.5 11.4477 10.5 12C10.5 12.5523 10.9477 13 11.5 13L12.5 13C13.0523 13 13.5 12.5523 13.5 12C13.5 11.4477 13.0523 11 12.5 11H11.5ZM15 12C15 11.4477 15.4477 11 16 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H16C15.4477 13 15 12.5523 15 12ZM7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18L17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16L7 16Z',
  d11: 'M22 8H2V22H22V8Z',
  d12: 'M12 8V5H14V2',
  d13: 'M6 12.5L8 12.5M11 12.5H13M16 12.5L18 12.5M6 17.5L18 17.5',
  d14: 'M15 5.75H13V6.75H22C22.4142 6.75 22.75 7.08579 22.75 7.5V21.5C22.75 21.9142 22.4142 22.25 22 22.25H2C1.58579 22.25 1.25 21.9142 1.25 21.5V7.5C1.25 7.08579 1.58579 6.75 2 6.75H11V3.75H13V1.75H15V5.75ZM11 13H13V11H11V13ZM16 13H18V11H16V13ZM6 13H8V11H6V13ZM6 18H18V16L6 16V18Z',
};

export const IconKeyboardStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-stroke-rounded IconKeyboardStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyboardDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-duotone-rounded IconKeyboardDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyboardTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-twotone-rounded IconKeyboardTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconKeyboardSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-solid-rounded IconKeyboardSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconKeyboardBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-bulk-rounded IconKeyboardBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
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

export const IconKeyboardStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-stroke-sharp IconKeyboardStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyboardSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyboard-solid-sharp IconKeyboardSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKeyboard: TheIconSelfPack = {
  name: 'Keyboard',
  StrokeRounded: IconKeyboardStrokeRounded,
  DuotoneRounded: IconKeyboardDuotoneRounded,
  TwotoneRounded: IconKeyboardTwotoneRounded,
  SolidRounded: IconKeyboardSolidRounded,
  BulkRounded: IconKeyboardBulkRounded,
  StrokeSharp: IconKeyboardStrokeSharp,
  SolidSharp: IconKeyboardSolidSharp,
};