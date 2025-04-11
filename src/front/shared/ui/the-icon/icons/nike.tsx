import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.50294 16.2667C-0.781018 19.7417 1.80815 9.89584 5.43252 7C4.45502 9.66667 3.97993 14.0077 10.5 11.5L22 7C22 7 16.7212 12.3998 7.50294 16.2667Z',
  d2: 'M22 7L10.5 11.5C3.97993 14.0077 4.45502 9.66667 5.43252 7C2.34626 9.46589 0.0106368 16.9712 4.5 16.9999',
  d3: 'M22.5342 7.52643L22.5303 7.53046L22.5224 7.53746C21.8611 8.12397 19.9053 9.85846 18.655 10.7857C16.1453 12.647 12.4688 14.9969 7.793 16.9584C5.66724 17.8501 3.99043 18.0014 2.81139 17.3481C1.58452 16.6683 1.21675 15.3123 1.25231 14.0021C1.28844 12.671 1.73294 11.1711 2.38803 9.8293C3.04239 8.48903 3.94509 7.22847 4.9643 6.41414C5.22713 6.20413 5.59765 6.19485 5.87068 6.39142C6.14371 6.588 6.25243 6.94233 6.13664 7.2582C5.90596 7.8875 5.71229 8.5972 5.64065 9.26129C5.5674 9.9404 5.6316 10.4817 5.82017 10.8448C5.98046 11.1533 6.26919 11.4135 6.9035 11.4846C7.58659 11.5611 8.64672 11.4091 10.2287 10.8008L10.2307 10.8001L21.7267 6.30164C22.0558 6.17285 22.4302 6.29133 22.6253 6.58602C22.8204 6.88071 22.7833 7.27164 22.5363 7.52437L22.5342 7.52643Z',
  d4: 'M2.81139 17.348C1.58452 16.6682 1.21675 15.3122 1.25231 14.0021C1.28844 12.671 1.73294 11.171 2.38803 9.82922C3.04239 8.48895 3.94509 7.2284 4.9643 6.41406C5.22713 6.20406 5.59765 6.19477 5.87068 6.39135C6.14371 6.58792 6.25243 6.94225 6.13664 7.25813C5.90596 7.88742 5.71229 8.59712 5.64065 9.26121C5.5674 9.94032 5.6316 10.4817 5.82017 10.8447C5.98046 11.1533 6.26919 11.4134 6.9035 11.4845C7.58659 11.561 8.64672 11.409 10.2287 10.8008C10.2287 10.8008 4.9643 16.9583 2.81139 17.348Z',
};

export const IconNikeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNikeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNikeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNikeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNikeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNikeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNikeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Nike SolidSharp"
    >
      <path 
        d={d.d1}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNike: TheIconSelfPack = [
  'Nike',
  IconNikeStrokeRounded,
  IconNikeDuotoneRounded,
  IconNikeTwotoneRounded,
  IconNikeSolidRounded,
  IconNikeBulkRounded,
  IconNikeStrokeSharp,
  IconNikeSolidSharp,
];