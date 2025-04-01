import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 14V10C20 6.22876 20 4.34315 18.8973 3.17157C17.7947 2 16.02 2 12.4706 2L11.5294 2C7.98001 2 6.20531 2 5.10266 3.17157C4 4.34315 4 6.22876 4 10L4 14C4 17.7712 4 19.6569 5.10266 20.8284C6.20531 22 7.98001 22 11.5294 22H12.4706C16.02 22 17.7947 22 18.8973 20.8284C20 19.6569 20 17.7712 20 14Z',
  d2: 'M16 18H16.009',
  d3: 'M4 15L20 15',
  d4: 'M8 6L10 6',
  d5: 'M8 9L10 9',
  d6: 'M20 14V10C20 6.22876 20 4.34315 18.8973 3.17157C17.7947 2 16.02 2 12.4706 2H11.5294C7.98001 2 6.20531 2 5.10266 3.17157C4 4.34315 4 6.22876 4 10V14C4 14.3492 4 14.6822 4.00088 15H19.9991C20 14.6822 20 14.3492 20 14Z',
  d7: 'M11.4702 1.25H12.5298H12.5298C14.2542 1.24998 15.6294 1.24997 16.7076 1.40399C17.8245 1.56355 18.7318 1.9014 19.4435 2.65755C20.1491 3.40727 20.4589 4.3523 20.6062 5.51676C20.75 6.65302 20.75 8.10611 20.75 9.94621V9.94625V9.94628V9.94631V9.94635V9.94638V14.0535C20.75 14.162 20.662 14.25 20.5535 14.25H3.44654C3.33799 14.25 3.25 14.162 3.25 14.0535V9.94651V9.94651C3.24999 8.10624 3.24998 6.65309 3.39377 5.51676C3.54112 4.3523 3.85089 3.40727 4.55651 2.65755C5.26818 1.9014 6.17547 1.56354 7.29245 1.40399C8.37064 1.24997 9.74579 1.24998 11.4702 1.25H11.4702ZM20.6564 15.84C20.7446 15.9301 20.7418 16.072 20.736 16.3559C20.7195 17.1646 20.6838 17.8701 20.6062 18.4832C20.4589 19.6477 20.1491 20.5927 19.4435 21.3425C18.7318 22.0986 17.8245 22.4365 16.7076 22.596C15.6294 22.75 14.2542 22.75 12.5298 22.75H11.4703C9.7458 22.75 8.37065 22.75 7.29245 22.596C6.17547 22.4365 5.26818 22.0986 4.55651 21.3424C3.85089 20.5927 3.54112 19.6477 3.39377 18.4832C3.31618 17.8701 3.28046 17.1646 3.26402 16.3559C3.25825 16.072 3.25536 15.9301 3.34358 15.84C3.43181 15.75 3.57489 15.75 3.86105 15.75H20.1389C20.4251 15.75 20.5682 15.75 20.6564 15.84ZM7.25 6C7.25 5.58579 7.58579 5.25 8 5.25L10 5.25C10.4142 5.25 10.75 5.58579 10.75 6C10.75 6.41421 10.4142 6.75 10 6.75L8 6.75C7.58579 6.75 7.25 6.41421 7.25 6ZM8 8.25C7.58579 8.25 7.25 8.58579 7.25 9C7.25 9.41421 7.58579 9.75 8 9.75H10C10.4142 9.75 10.75 9.41421 10.75 9C10.75 8.58579 10.4142 8.25 10 8.25L8 8.25ZM15 19C15 18.4477 15.4477 18 16 18H16.009C16.5613 18 17.009 18.4477 17.009 19C17.009 19.5523 16.5613 20 16.009 20H16C15.4477 20 15 19.5523 15 19Z',
  d8: 'M20.7361 16.3559C20.7419 16.072 20.7448 15.9301 20.6566 15.84C20.5684 15.75 20.4253 15.75 20.1391 15.75H3.86121C3.57504 15.75 3.43196 15.75 3.34374 15.84C3.25551 15.9301 3.2584 16.072 3.26417 16.3559C3.28061 17.1646 3.31633 17.8701 3.39392 18.4832C3.54127 19.6477 3.85104 20.5927 4.55666 21.3424C5.26833 22.0986 6.17563 22.4365 7.2926 22.596C8.37081 22.75 9.74595 22.75 11.4704 22.75H12.5299C14.2544 22.75 15.6295 22.75 16.7077 22.596C17.8247 22.4365 18.732 22.0986 19.4436 21.3425C20.1493 20.5927 20.459 19.6477 20.6064 18.4832C20.684 17.8701 20.7197 17.1646 20.7361 16.3559ZM15.0002 19C15.0002 18.4477 15.4479 18 16.0002 18H16.0091C16.5614 18 17.0091 18.4477 17.0091 19C17.0091 19.5523 16.5614 20 16.0091 20H16.0002C15.4479 20 15.0002 19.5523 15.0002 19Z',
  d9: 'M11.4702 1.25H12.5298H12.5298C14.2542 1.24998 15.6294 1.24997 16.7076 1.40399C17.8245 1.56355 18.7318 1.9014 19.4435 2.65755C20.1491 3.40727 20.4589 4.3523 20.6062 5.51676C20.75 6.65305 20.75 8.10619 20.75 9.94635V9.94638V14.0535C20.75 14.162 20.662 14.25 20.5535 14.25H3.44654C3.33799 14.25 3.25 14.162 3.25 14.0535V9.94651C3.24999 8.10625 3.24998 6.65309 3.39377 5.51676C3.54112 4.3523 3.85089 3.40727 4.55651 2.65755C5.26818 1.9014 6.17547 1.56354 7.29245 1.40399C8.37064 1.24997 9.74579 1.24998 11.4702 1.25H11.4702Z',
  d10: 'M7.25 6C7.25 5.58579 7.58579 5.25 8 5.25L10 5.25C10.4142 5.25 10.75 5.58579 10.75 6C10.75 6.41421 10.4142 6.75 10 6.75L8 6.75C7.58579 6.75 7.25 6.41421 7.25 6ZM8 8.25C7.58579 8.25 7.25 8.58579 7.25 9C7.25 9.41421 7.58579 9.75 8 9.75H10C10.4142 9.75 10.75 9.41421 10.75 9C10.75 8.58579 10.4142 8.25 10 8.25L8 8.25Z',
  d11: 'M20 2H4V22H20V2Z',
  d12: 'M15.9902 18.5H15.9992',
  d13: 'M7 6L11 6',
  d14: 'M7 9L11 9',
  d15: 'M3.25 2C3.25 1.58579 3.58579 1.25 4 1.25H20C20.4142 1.25 20.75 1.58579 20.75 2V14.25L3.25 14.25V2ZM3.25 15.75L20.75 15.75V22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22V15.75ZM16.9973 18.25H14.9883V20.25H16.9973V18.25ZM11 6.75L7 6.75L7 5.25L11 5.25V6.75ZM7 9.75H11V8.25L7 8.25L7 9.75Z',
};

export const IconExternalDriveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-stroke-rounded IconExternalDriveStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconExternalDriveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-duotone-rounded IconExternalDriveDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
    </TheIconWrapper>
  );
};

export const IconExternalDriveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-twotone-rounded IconExternalDriveTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconExternalDriveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-solid-rounded IconExternalDriveSolidRounded"
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

export const IconExternalDriveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-bulk-rounded IconExternalDriveBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconExternalDriveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-stroke-sharp IconExternalDriveStrokeSharp"
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconExternalDriveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="external-drive-solid-sharp IconExternalDriveSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfExternalDrive: TheIconSelfPack = {
  name: 'ExternalDrive',
  StrokeRounded: IconExternalDriveStrokeRounded,
  DuotoneRounded: IconExternalDriveDuotoneRounded,
  TwotoneRounded: IconExternalDriveTwotoneRounded,
  SolidRounded: IconExternalDriveSolidRounded,
  BulkRounded: IconExternalDriveBulkRounded,
  StrokeSharp: IconExternalDriveStrokeSharp,
  SolidSharp: IconExternalDriveSolidSharp,
};