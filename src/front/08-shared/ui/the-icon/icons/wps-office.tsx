import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 14.5L15.5 18.5L22 5.5H15L12 11.5L8.5 18.5L2 5.5H9L10.5 8.5',
  d2: 'M8.5 18.5L2 5.5H9L10.5 8.5L12 11.5L15 5.5H22L15.5 18.5L13.5 14.5L12 11.5L8.5 18.5Z',
  d3: 'M12 11.5L15 5.5H22L15.5 18.5L13.5 14.5',
  d4: 'M12 11.5L8.5 18.5L2 5.5H9L10.5 8.5',
  d5: 'M1.36201 5.1057C1.49867 4.88459 1.74007 4.75 2 4.75H9C9.28408 4.75 9.54378 4.9105 9.67082 5.16459L12 9.82295L14.3292 5.16459C14.4562 4.9105 14.7159 4.75 15 4.75H22C22.2599 4.75 22.5013 4.88459 22.638 5.1057C22.7746 5.32681 22.7871 5.60292 22.6708 5.83541L16.1708 18.8354C16.0438 19.0895 15.7841 19.25 15.5 19.25C15.2159 19.25 14.9562 19.0895 14.8292 18.8354L12 13.1771L9.17082 18.8354C9.04378 19.0895 8.78408 19.25 8.5 19.25C8.21592 19.25 7.95622 19.0895 7.82918 18.8354L1.32918 5.83541C1.21293 5.60292 1.22536 5.32681 1.36201 5.1057Z',
  d6: 'M12 9.82295L14.3292 5.16459C14.4562 4.9105 14.7159 4.75 15 4.75H22C22.2599 4.75 22.5013 4.88459 22.638 5.1057C22.7746 5.32681 22.7871 5.60292 22.6708 5.83541L16.1708 18.8354C16.0438 19.0895 15.7841 19.25 15.5 19.25C15.2159 19.25 14.9562 19.0895 14.8292 18.8354L12 13.1771V9.82295Z',
  d7: 'M1.36201 5.1057C1.49867 4.88459 1.74007 4.75 2 4.75H9C9.28408 4.75 9.54378 4.9105 9.67082 5.16459L12 9.82295V13.1771L9.17082 18.8354C9.04378 19.0895 8.78408 19.25 8.5 19.25C8.21592 19.25 7.95622 19.0895 7.82918 18.8354L1.32918 5.83541C1.21293 5.60292 1.22536 5.32681 1.36201 5.1057Z',
  d8: 'M13.5 14.5L15.5 18.5H16L22 6V5.5H15L12 11.5L8.5 18.5H8L2 6V5.5H9L10.5 8.5',
  d9: 'M1.25 4.75H9.46353L12 9.82295L14.5365 4.75H22.75V6.17068L16.4719 19.25H15.0365L12 13.1771L8.96353 19.25H7.52807L1.25 6.17068V4.75Z',
};

export const IconWpsOfficeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-stroke-rounded IconWpsOfficeStrokeRounded"
    >
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

export const IconWpsOfficeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-duotone-rounded IconWpsOfficeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconWpsOfficeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-twotone-rounded IconWpsOfficeTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconWpsOfficeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-solid-rounded IconWpsOfficeSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWpsOfficeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-bulk-rounded IconWpsOfficeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWpsOfficeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-stroke-sharp IconWpsOfficeStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWpsOfficeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wps-office-solid-sharp IconWpsOfficeSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWpsOffice: TheIconSelfPack = {
  name: 'WpsOffice',
  StrokeRounded: IconWpsOfficeStrokeRounded,
  DuotoneRounded: IconWpsOfficeDuotoneRounded,
  TwotoneRounded: IconWpsOfficeTwotoneRounded,
  SolidRounded: IconWpsOfficeSolidRounded,
  BulkRounded: IconWpsOfficeBulkRounded,
  StrokeSharp: IconWpsOfficeStrokeSharp,
  SolidSharp: IconWpsOfficeSolidSharp,
};