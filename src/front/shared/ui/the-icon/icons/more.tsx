import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z',
  d2: 'M22 17.5C22 19.433 20.433 21 18.5 21C16.567 21 15 19.433 15 17.5C15 15.567 16.567 14 18.5 14C20.433 14 22 15.567 22 17.5Z',
  d3: 'M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C7.433 14 9 15.567 9 17.5Z',
  d4: 'M12 4.13889C10.696 4.13889 9.63889 5.19599 9.63889 6.5C9.63889 7.80401 10.696 8.86111 12 8.86111C13.304 8.86111 14.3611 7.80401 14.3611 6.5C14.3611 5.19599 13.304 4.13889 12 4.13889ZM7.75 6.5C7.75 4.15279 9.65279 2.25 12 2.25C14.3472 2.25 16.25 4.15279 16.25 6.5C16.25 8.84721 14.3472 10.75 12 10.75C9.65279 10.75 7.75 8.84721 7.75 6.5Z',
  d5: 'M14.25 17.5C14.25 15.1528 16.1528 13.25 18.5 13.25C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5Z',
  d6: 'M1.25 17.5C1.25 15.1528 3.15279 13.25 5.5 13.25C7.84721 13.25 9.75 15.1528 9.75 17.5C9.75 19.8472 7.84721 21.75 5.5 21.75C3.15279 21.75 1.25 19.8472 1.25 17.5Z',
  d7: 'M2 14H9V21H2V14Z',
  d8: 'M15 14H22V21H15V14Z',
  d9: 'M8.5 3H15.5V10H8.5V3Z',
  d10: 'M7.75 3.19444C7.75 2.67284 8.17284 2.25 8.69444 2.25H15.3056C15.8272 2.25 16.25 2.67284 16.25 3.19444V9.80556C16.25 10.3272 15.8272 10.75 15.3056 10.75H8.69444C8.17284 10.75 7.75 10.3272 7.75 9.80556V3.19444ZM9.63889 4.13889V8.86111H14.3611V4.13889H9.63889Z',
  d11: 'M1.25 14C1.25 13.5858 1.58579 13.25 2 13.25H9C9.41421 13.25 9.75 13.5858 9.75 14V21C9.75 21.4142 9.41421 21.75 9 21.75H2C1.58579 21.75 1.25 21.4142 1.25 21V14Z',
  d12: 'M14.25 14C14.25 13.5858 14.5858 13.25 15 13.25H22C22.4142 13.25 22.75 13.5858 22.75 14V21C22.75 21.4142 22.4142 21.75 22 21.75H15C14.5858 21.75 14.25 21.4142 14.25 21V14Z',
};

export const IconMoreStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconMoreBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconMoreStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="More SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMore: TheIconSelfPack = [
  'More',
  IconMoreStrokeRounded,
  IconMoreDuotoneRounded,
  IconMoreTwotoneRounded,
  IconMoreSolidRounded,
  IconMoreBulkRounded,
  IconMoreStrokeSharp,
  IconMoreSolidSharp,
];