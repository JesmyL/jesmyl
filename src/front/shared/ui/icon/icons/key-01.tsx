import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z',
  d2: 'M17.5 6.5L16.5 7.5',
  d3: 'M15.5 1.75C11.7721 1.75 8.75 4.77208 8.75 8.5C8.75 9.30306 8.89055 10.0746 9.14879 10.7906L1.96967 17.9697C1.82902 18.1103 1.75 18.3011 1.75 18.5V21.5C1.75 21.9142 2.08579 22.25 2.5 22.25H5.5C5.91421 22.25 6.25 21.9142 6.25 21.5V19.75H8C8.41421 19.75 8.75 19.4142 8.75 19V17.25H10.5C10.6989 17.25 10.8897 17.171 11.0303 17.0303L13.2094 14.8512C13.9254 15.1094 14.6969 15.25 15.5 15.25C19.2279 15.25 22.25 12.2279 22.25 8.5C22.25 4.77208 19.2279 1.75 15.5 1.75ZM18.0303 7.03033C18.3232 6.73744 18.3232 6.26256 18.0303 5.96967C17.7374 5.67678 17.2626 5.67678 16.9697 5.96967L15.9697 6.96967C15.6768 7.26256 15.6768 7.73744 15.9697 8.03033C16.2626 8.32322 16.7374 8.32322 17.0303 8.03033L18.0303 7.03033Z',
  d4: 'M8.75 8.5C8.75 4.77208 11.7721 1.75 15.5 1.75C19.2279 1.75 22.25 4.77208 22.25 8.5C22.25 12.2279 19.2279 15.25 15.5 15.25C14.6969 15.25 13.9254 15.1094 13.2094 14.8512L11.0303 17.0303C10.8897 17.171 10.6989 17.25 10.5 17.25H8.75V19C8.75 19.4142 8.41421 19.75 8 19.75H6.25V21.5C6.25 21.9142 5.91421 22.25 5.5 22.25H2.5C2.08579 22.25 1.75 21.9142 1.75 21.5V18.5C1.75 18.3011 1.82902 18.1103 1.96967 17.9697L9.14879 10.7906C8.89055 10.0746 8.75 9.30306 8.75 8.5Z',
  d5: 'M18.0303 5.96967C18.3232 6.26256 18.3232 6.73744 18.0303 7.03033L17.0303 8.03033C16.7374 8.32322 16.2626 8.32322 15.9697 8.03033C15.6768 7.73744 15.6768 7.26256 15.9697 6.96967L16.9697 5.96967C17.2626 5.67678 17.7374 5.67678 18.0303 5.96967Z',
  d6: 'M15.5 1.75C11.7721 1.75 8.75 4.77208 8.75 8.5C8.75 9.30306 8.89055 10.0746 9.14879 10.7906L1.75 18.1893V22.25H6.25V19.75H8.75V17.25H10.8107L13.2094 14.8512C13.9254 15.1094 14.6969 15.25 15.5 15.25C19.2279 15.25 22.25 12.2279 22.25 8.5C22.25 4.77208 19.2279 1.75 15.5 1.75ZM16.5001 8.56077L18.5608 6.50011L17.5001 5.43945L15.4395 7.50011L16.5001 8.56077Z',
};

export const IconKey01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-stroke-rounded IconKey01StrokeRounded"
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

export const IconKey01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-duotone-rounded IconKey01DuotoneRounded"
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

export const IconKey01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-twotone-rounded IconKey01TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconKey01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-solid-rounded IconKey01SolidRounded"
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

export const IconKey01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-bulk-rounded IconKey01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKey01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-stroke-sharp IconKey01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconKey01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-01-solid-sharp IconKey01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKey01: TheIconSelfPack = {
  name: 'Key01',
  StrokeRounded: IconKey01StrokeRounded,
  DuotoneRounded: IconKey01DuotoneRounded,
  TwotoneRounded: IconKey01TwotoneRounded,
  SolidRounded: IconKey01SolidRounded,
  BulkRounded: IconKey01BulkRounded,
  StrokeSharp: IconKey01StrokeSharp,
  SolidSharp: IconKey01SolidSharp,
};