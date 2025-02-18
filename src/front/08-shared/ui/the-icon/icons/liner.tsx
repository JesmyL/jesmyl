import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 20L21 4',
  d2: 'M3 20L12 12',
  d3: 'M21.7474 3.33565C22.1143 3.74843 22.0772 4.3805 21.6644 4.74742L3.66437 20.7474C3.25159 21.1143 2.61952 21.0772 2.2526 20.6644C1.88568 20.2516 1.92286 19.6195 2.33565 19.2526L20.3356 3.2526C20.7484 2.88568 21.3805 2.92286 21.7474 3.33565Z',
  d4: 'M12.7474 11.3356C13.1143 11.7484 13.0772 12.3805 12.6644 12.7474L3.66437 20.7474C3.25159 21.1143 2.61952 21.0772 2.2526 20.6644C1.88568 20.2516 1.92286 19.6195 2.33565 19.2526L11.3356 11.2526C11.7484 10.8857 12.3805 10.9229 12.7474 11.3356Z',
  d5: 'M3.41421 21.9999L22 3.41421L20.5858 2L2 20.5857L3.41421 21.9999Z',
};

export const IconLinerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-stroke-rounded IconLinerStrokeRounded"
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

export const IconLinerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-duotone-rounded IconLinerDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-twotone-rounded IconLinerTwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-solid-rounded IconLinerSolidRounded"
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

export const IconLinerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-bulk-rounded IconLinerBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLinerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-stroke-sharp IconLinerStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLinerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="liner-solid-sharp IconLinerSolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLiner: TheIconSelfPack = {
  name: 'Liner',
  StrokeRounded: IconLinerStrokeRounded,
  DuotoneRounded: IconLinerDuotoneRounded,
  TwotoneRounded: IconLinerTwotoneRounded,
  SolidRounded: IconLinerSolidRounded,
  BulkRounded: IconLinerBulkRounded,
  StrokeSharp: IconLinerStrokeSharp,
  SolidSharp: IconLinerSolidSharp,
};