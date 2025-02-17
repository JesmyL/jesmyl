import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 3C5.46667 4.73148 7.52 8.66667 12 10.5556M12 10.5556C16.48 8.66667 18.5333 4.73148 19 3M12 10.5556V21',
  d2: 'M6.16602 13H17.8327',
  d3: 'M6.16602 17H17.8327',
  d4: 'M4.74002 2.0347C5.27327 1.89098 5.82207 2.20676 5.9658 2.74002C6.35967 4.20142 8.13904 7.66238 12.0002 9.462C15.8615 7.66238 17.6408 4.20142 18.0347 2.74002C18.1784 2.20676 18.7272 1.89098 19.2605 2.0347C19.7937 2.17843 20.1095 2.72723 19.9658 3.26048C19.4621 5.12948 17.4066 9.08009 13.0002 11.2014V12.0002H17.8336C18.3859 12.0002 18.8336 12.448 18.8336 13.0002C18.8336 13.5525 18.3859 14.0002 17.8336 14.0002H13.0002V16.0002H17.8336C18.3859 16.0002 18.8336 16.448 18.8336 17.0002C18.8336 17.5525 18.3859 18.0002 17.8336 18.0002H13.0002V21.0002C13.0002 21.5525 12.5525 22.0002 12.0002 22.0002C11.448 22.0002 11.0002 21.5525 11.0002 21.0002V18.0002H6.16692C5.61463 18.0002 5.16692 17.5525 5.16692 17.0002C5.16692 16.448 5.61463 16.0002 6.16692 16.0002H11.0002V14.0002H6.16692C5.61463 14.0002 5.16692 13.5525 5.16692 13.0002C5.16692 12.448 5.61463 12.0002 6.16692 12.0002H11.0002V11.2014C6.59386 9.08009 4.53843 5.12948 4.0347 3.26048C3.89098 2.72723 4.20676 2.17843 4.74002 2.0347Z',
  d5: 'M4.74002 2.0347C5.27327 1.89098 5.82207 2.20676 5.9658 2.74002C6.35967 4.20142 8.13904 7.66238 12.0002 9.462C15.8615 7.66238 17.6408 4.20142 18.0347 2.74002C18.1784 2.20676 18.7272 1.89098 19.2605 2.0347C19.7937 2.17843 20.1095 2.72723 19.9658 3.26048C19.4621 5.12948 17.4066 9.08009 13.0002 11.2014V21.0002C13.0002 21.5525 12.5525 22.0002 12.0002 22.0002C11.448 22.0002 11.0002 21.5525 11.0002 21.0002V11.2014C6.59386 9.08009 4.53843 5.12948 4.0347 3.26048C3.89098 2.72723 4.20676 2.17843 4.74002 2.0347Z',
  d6: 'M5.16797 13C5.16797 12.4477 5.61568 12 6.16797 12H17.8346C18.3869 12 18.8346 12.4477 18.8346 13C18.8346 13.5523 18.3869 14 17.8346 14H6.16797C5.61568 14 5.16797 13.5523 5.16797 13Z',
  d7: 'M5.16797 17C5.16797 16.4477 5.61568 16 6.16797 16H17.8346C18.3869 16 18.8346 16.4477 18.8346 17C18.8346 17.5523 18.3869 18 17.8346 18H6.16797C5.61568 18 5.16797 17.5523 5.16797 17Z',
  d8: 'M5 3L12 10.5556M12 10.5556L19 3M12 10.5556V21',
  d9: 'M11.0001 11.3945L3.99927 3.85926L5.46639 2.50001L12.0001 9.53103L18.5338 2.5L20.0009 3.85925L13.0001 11.3945V21.5H11.0001V11.3945Z',
  d10: 'M17.8327 14.4468H6.16602V12.4468H17.8327V14.4468Z',
  d11: 'M17.8327 18.4468H6.16602V16.4468H17.8327V18.4468Z',
};

export const IconYenStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-stroke-rounded IconYenStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconYenDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-duotone-rounded IconYenDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconYenTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-twotone-rounded IconYenTwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconYenSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-solid-rounded IconYenSolidRounded"
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

export const IconYenBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-bulk-rounded IconYenBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconYenStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-stroke-sharp IconYenStrokeSharp"
    >
      <path 
        d={d.d8} 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconYenSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="yen-solid-sharp IconYenSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfYen: TheIconSelfPack = {
  name: 'Yen',
  StrokeRounded: IconYenStrokeRounded,
  DuotoneRounded: IconYenDuotoneRounded,
  TwotoneRounded: IconYenTwotoneRounded,
  SolidRounded: IconYenSolidRounded,
  BulkRounded: IconYenBulkRounded,
  StrokeSharp: IconYenStrokeSharp,
  SolidSharp: IconYenSolidSharp,
};