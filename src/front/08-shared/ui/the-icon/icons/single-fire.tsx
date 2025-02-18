import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.2558 8.51453C22.3836 14.4194 19.433 21.5754 12.4376 22C3.44145 22 0.307049 11.3643 7.38031 6.45487C7.38031 14.5 14.1304 7.5 12 2C15 3 17.7939 5.56221 19.2558 8.51453Z',
  d2: 'M12 2C14.1453 7.5 7.40739 14.5 7.40739 6.45487C0.284766 11.3643 3.44104 22 12.5 22',
  d3: 'M11.4584 1.48252C11.6589 1.27222 11.9628 1.19663 12.2385 1.28851C15.4433 2.35677 18.3818 5.06298 19.9247 8.17259C21.5876 11.3185 21.6494 14.8287 20.3221 17.6332C18.985 20.4586 16.2574 22.5196 12.4844 22.7486C12.4692 22.7496 12.4541 22.75 12.4389 22.75C2.70748 22.75 -0.722599 11.167 6.95395 5.83876C7.18325 5.67961 7.48197 5.66096 7.72928 5.79035C7.9766 5.91974 8.1316 6.17577 8.1316 6.45489C8.1316 7.41535 8.23321 8.10264 8.38227 8.57177C8.533 9.04617 8.70996 9.23139 8.81136 9.29721C8.88855 9.34731 8.99146 9.37558 9.17749 9.31635C9.38313 9.25087 9.65515 9.0837 9.95805 8.77853C10.5612 8.17085 11.1464 7.15613 11.4516 5.96206C11.7549 4.77503 11.7665 3.47036 11.3019 2.27092C11.197 1.99999 11.258 1.69282 11.4584 1.48252Z',
  d4: 'M11.4584 1.48252C11.6589 1.27222 11.9628 1.19663 12.2385 1.28851C15.4433 2.35677 18.3818 5.06298 19.9247 8.17259C21.5876 11.3185 21.6494 14.8287 20.3221 17.6332C18.9221 20.5914 15.7626 22.75 12.4389 22.75C2.70748 22.75 -0.722599 11.167 6.95395 5.83876C7.18325 5.67961 7.48197 5.66096 7.72928 5.79035C7.9766 5.91974 8.1316 6.17577 8.1316 6.45489C8.1316 7.41535 8.23321 8.10264 8.38227 8.57177C8.533 9.04617 8.70996 9.23139 8.81136 9.29721C8.88855 9.34731 8.99146 9.37558 9.17749 9.31635C9.38313 9.25087 9.65515 9.0837 9.95805 8.77853C10.5612 8.17085 11.1464 7.15613 11.4516 5.96206C11.7549 4.77503 11.7665 3.47036 11.3019 2.27092C11.197 1.99999 11.258 1.69282 11.4584 1.48252Z',
  d5: 'M6.95395 5.83876C7.18325 5.67961 7.48197 5.66096 7.72928 5.79035C7.9766 5.91974 8.1316 6.17577 8.1316 6.45489C8.1316 7.41535 8.23321 8.10264 8.38227 8.57177C8.533 9.04617 8.70996 9.23139 8.81136 9.29721C8.88855 9.34731 8.99146 9.37558 9.17749 9.31635C9.38313 9.25087 9.65515 9.0837 9.95805 8.77853C10.5612 8.17085 11.1464 7.15613 11.4516 5.96206C11.7549 4.77503 11.7665 3.47036 11.3019 2.27092C11.197 1.99999 11.258 1.69282 11.4584 1.48252C14.001 5 16.001 14 9.17749 22.2684C2.03759 20.0259 0.210733 10.5191 6.95395 5.83876Z',
  d6: 'M4.688 9.24707C2.30313 13.1547 3.62051 18.2981 7.63046 20.7352C11.6404 23.1722 16.8245 21.98 19.2093 18.0724C21.8027 14.2808 20.2249 8.20744 16.8212 5.0805C15.503 3.86906 13.3736 2.1624 12.0132 2.00056C12.0058 1.99968 12.0004 2.00699 12.003 2.01395C13.1692 5.18883 11.7184 8.9209 9.64517 9.9154C9.20064 10.1286 8.65104 10.096 8.29167 9.75889C7.46118 8.97985 7.49377 7.47696 7.44403 6.38488C6.2719 7.21714 5.50841 7.90283 4.688 9.24707Z',
};

export const IconSingleFireStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-stroke-rounded IconSingleFireStrokeRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSingleFireDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-duotone-rounded IconSingleFireDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSingleFireTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-twotone-rounded IconSingleFireTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconSingleFireSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-solid-rounded IconSingleFireSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSingleFireBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-bulk-rounded IconSingleFireBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSingleFireStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-stroke-sharp IconSingleFireStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSingleFireSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="single-fire-solid-sharp IconSingleFireSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSingleFire: TheIconSelfPack = {
  name: 'SingleFire',
  StrokeRounded: IconSingleFireStrokeRounded,
  DuotoneRounded: IconSingleFireDuotoneRounded,
  TwotoneRounded: IconSingleFireTwotoneRounded,
  SolidRounded: IconSingleFireSolidRounded,
  BulkRounded: IconSingleFireBulkRounded,
  StrokeSharp: IconSingleFireStrokeSharp,
  SolidSharp: IconSingleFireSolidSharp,
};