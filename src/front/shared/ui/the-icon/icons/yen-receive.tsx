import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 3.5C2.36667 5.03909 3.98 8.53704 7.5 10.216M7.5 10.216C11.02 8.53704 12.6333 5.03909 13 3.5M7.5 10.216V20.5',
  d2: 'M5 13.5H10',
  d3: 'M5 17.5H10',
  d4: 'M14.5 13H22M14.5 13C14.5 13.7002 16.4943 15.0085 17 15.5M14.5 13C14.5 12.2998 16.4943 10.9915 17 10.5',
  d5: 'M2.76848 2.52745C3.30573 2.39946 3.84501 2.73123 3.973 3.26848C4.28086 4.56071 5.63676 7.51432 8.50023 9.09259C11.3637 7.51432 12.7196 4.56071 13.0275 3.26848C13.1554 2.73123 13.6947 2.39946 14.232 2.52745C14.7692 2.65544 15.101 3.19473 14.973 3.73198C14.5832 5.36817 12.9845 8.88944 9.50023 10.8252V20.5002C9.50023 21.0525 9.05251 21.5002 8.50023 21.5002C7.94794 21.5002 7.50023 21.0525 7.50023 20.5002V10.8252C4.016 8.88944 2.41725 5.36817 2.02745 3.73198C1.89946 3.19473 2.23123 2.65544 2.76848 2.52745Z',
  d6: 'M5 13.5C5 12.9477 5.44772 12.5 6 12.5H11C11.5523 12.5 12 12.9477 12 13.5C12 14.0523 11.5523 14.5 11 14.5H6C5.44772 14.5 5 14.0523 5 13.5Z',
  d7: 'M5 17.5C5 16.9477 5.44772 16.5 6 16.5H11C11.5523 16.5 12 16.9477 12 17.5C12 18.0523 11.5523 18.5 11 18.5H6C5.44772 18.5 5 18.0523 5 17.5Z',
  d8: 'M23 14.5059C23.5523 14.5059 24 14.0581 24 13.5059C24 12.9536 23.5523 12.5059 23 12.5059L19.5 12.5059L19.5 11.9116C19.5001 11.736 19.5003 11.5203 19.4782 11.3439L19.4778 11.3405C19.462 11.2141 19.3902 10.638 18.8246 10.3637C18.2577 10.0887 17.7576 10.3907 17.6494 10.456L17.6454 10.4584C17.4924 10.5506 17.3215 10.6848 17.1809 10.7951L17.1507 10.8188C16.7748 11.1135 16.2906 11.4954 15.8996 11.8759C15.7045 12.0657 15.5033 12.283 15.3444 12.5139C15.2032 12.7191 15 13.0693 15 13.5C15 13.9307 15.2032 14.2809 15.3444 14.4861C15.5033 14.717 15.7045 14.9343 15.8996 15.1241C16.2906 15.5046 16.7748 15.8865 17.1507 16.1812L17.1809 16.2049C17.3215 16.3152 17.4923 16.4494 17.6454 16.5416L17.6494 16.544C17.7576 16.6093 18.2578 16.9113 18.8246 16.6363C19.3902 16.362 19.462 15.7859 19.4778 15.6595L19.4782 15.6561C19.5003 15.4797 19.5001 15.264 19.5 15.0884L19.5 14.5059L23 14.5059Z',
  d9: 'M2 3.5L7.5 10.216M7.5 10.216L13 3.5M7.5 10.216V20.5',
  d10: 'M3 13H12',
  d11: 'M3 17H12',
  d12: 'M22 13H14.9427M17 15.5L14.5 13L17 10.5',
  d13: 'M6.77367 10.9569L1.5 4.51717L3.04734 3.25L7.77367 9.02132L12.5 3.25L14.0473 4.51717L8.77367 10.9569V20.75H6.77367V10.9569Z',
  d14: 'M12.2734 14.3835H3.27344V12.3835H12.2734V14.3835Z',
  d15: 'M12.2734 18.3835H3.27344V16.3835H12.2734V18.3835Z',
  d16: 'M17.414 14.3836L18.2069 15.1765L16.7926 16.5907L13.5855 13.3836L16.7926 10.1765L18.2069 11.5907L17.414 12.3836H22.4998V14.3836H17.414Z',
};

export const IconYenReceiveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconYenReceiveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="YenReceive SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfYenReceive: TheIconSelfPack = [
  'YenReceive',
  IconYenReceiveStrokeRounded,
  IconYenReceiveDuotoneRounded,
  IconYenReceiveTwotoneRounded,
  IconYenReceiveSolidRounded,
  IconYenReceiveBulkRounded,
  IconYenReceiveStrokeSharp,
  IconYenReceiveSolidSharp,
];