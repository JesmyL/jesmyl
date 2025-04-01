import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 6V19M5.00018 9.87917V18.9079M2 11.6296V17.1574',
  d2: 'M17.4776 10.6001C17.485 10.6 17.4925 10.6 17.5 10.6C19.9853 10.6 22 12.4804 22 14.8C22 17.1196 19.9853 19 17.5 19H14M17.4776 10.6001C17.4924 10.4463 17.5 10.2907 17.5 10.1333C17.5 7.29827 15.0376 5 12 5H11V19M17.4776 10.6001C17.3753 11.6589 16.9286 12.625 16.2428 13.4',
  d3: 'M17.5 10.1333C17.5 7.29827 15.0376 5 12 5C11.4477 5 11 5.44772 11 6V19H14H17.5C19.9853 19 22 17.1196 22 14.8C22 12.4804 19.9853 10.6 17.5 10.6L17.4776 10.6001C17.4924 10.4463 17.5 10.2907 17.5 10.1333Z',
  d4: 'M17.4776 10.6001C17.485 10.6 17.4925 10.6 17.5 10.6C19.9853 10.6 22 12.4804 22 14.8C22 17.1196 19.9853 19 17.5 19H14M17.4776 10.6001C17.4924 10.4463 17.5 10.2907 17.5 10.1333C17.5 7.29827 15.0376 5 12 5V5C11.4477 5 11 5.44772 11 6V19M17.4776 10.6001C17.3753 11.6589 16.9286 12.625 16.2428 13.4',
  d5: 'M10.25 6C10.25 5.0335 11.0335 4.25 12 4.25C15.3215 4.25 18.1146 6.71493 18.2452 9.89994C20.7562 10.2389 22.75 12.2646 22.75 14.8C22.75 17.5817 20.3499 19.75 17.5 19.75H11C10.5858 19.75 10.25 19.4142 10.25 19V6Z',
  d6: 'M8 5.25C8.41421 5.25 8.75 5.58579 8.75 6V19C8.75 19.4142 8.41421 19.75 8 19.75C7.58579 19.75 7.25 19.4142 7.25 19V6C7.25 5.58579 7.58579 5.25 8 5.25ZM5.00018 9.12917C5.4144 9.12917 5.75018 9.46496 5.75018 9.87917V18.9079C5.75018 19.3221 5.4144 19.6579 5.00018 19.6579C4.58597 19.6579 4.25018 19.3221 4.25018 18.9079V9.87917C4.25018 9.46496 4.58597 9.12917 5.00018 9.12917ZM2 10.8796C2.41421 10.8796 2.75 11.2154 2.75 11.6296V17.1574C2.75 17.5716 2.41421 17.9074 2 17.9074C1.58579 17.9074 1.25 17.5716 1.25 17.1574V11.6296C1.25 11.2154 1.58579 10.8796 2 10.8796Z',
  d7: 'M8.00702 6.08984V18.9998M5.00345 9.94214V18.9083M1.99951 11.6804V17.17',
  d8: 'M11.051 18.9807L10.9868 5.04191C14.6407 4.61733 18.1314 7.47956 17.5021 10.8801M17.5021 10.8801C17.3487 11.7091 16.9505 12.5701 16.25 13.4233M17.5021 10.8801C18.5478 10.4599 21.2755 11.1174 21.8895 13.9446C22.5827 17.1361 19.8862 18.9807 17.7836 18.9807H14.0533',
  d9: 'M7.25 19.75V6H8.75V19.75H7.25Z',
  d10: 'M4.25018 19.6579V9.87917H5.75018V19.6579H4.25018Z',
  d11: 'M1.25 17.9074V11.6296H2.75V17.9074H1.25Z',
  d12: 'M12 4.25C15.3215 4.25 18.1146 6.71493 18.2452 9.89994C20.7562 10.2389 22.75 12.2646 22.75 14.8C22.75 17.5817 20.3499 19.75 17.5 19.75H10.25V4.25H12Z',
};

export const IconSoundcloudStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-stroke-rounded IconSoundcloudStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSoundcloudDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-duotone-rounded IconSoundcloudDuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSoundcloudTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-twotone-rounded IconSoundcloudTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
    </TheIconWrapper>
  );
};

export const IconSoundcloudSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-solid-rounded IconSoundcloudSolidRounded"
    >
      <path 
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

export const IconSoundcloudBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-bulk-rounded IconSoundcloudBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSoundcloudStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-stroke-sharp IconSoundcloudStrokeSharp"
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

export const IconSoundcloudSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soundcloud-solid-sharp IconSoundcloudSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSoundcloud: TheIconSelfPack = {
  name: 'Soundcloud',
  StrokeRounded: IconSoundcloudStrokeRounded,
  DuotoneRounded: IconSoundcloudDuotoneRounded,
  TwotoneRounded: IconSoundcloudTwotoneRounded,
  SolidRounded: IconSoundcloudSolidRounded,
  BulkRounded: IconSoundcloudBulkRounded,
  StrokeSharp: IconSoundcloudStrokeSharp,
  SolidSharp: IconSoundcloudSolidSharp,
};