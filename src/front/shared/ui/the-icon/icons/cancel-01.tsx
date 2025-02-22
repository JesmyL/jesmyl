import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999',
  d2: 'M19.0002 4.99994L5.00021 18.9999M5.00021 4.99994L19.0002 18.9999',
  d3: 'M19.0002 4.99994L5.00023 18.9999',
  d4: 'M5.00023 4.99994L19.0002 18.9999',
  d5: 'M19.8841 4.11601C20.3723 4.60417 20.3723 5.39562 19.8841 5.88378L5.8841 19.8838C5.39594 20.3719 4.60449 20.3719 4.11633 19.8838C3.62817 19.3956 3.62817 18.6042 4.11633 18.116L18.1163 4.11601C18.6045 3.62785 19.3959 3.62785 19.8841 4.11601Z',
  d6: 'M4.11633 4.11601C4.60449 3.62785 5.39594 3.62785 5.8841 4.11601L19.8841 18.116C20.3723 18.6042 20.3723 19.3956 19.8841 19.8838C19.3959 20.3719 18.6045 20.3719 18.1163 19.8838L4.11633 5.88378C3.62817 5.39562 3.62817 4.60417 4.11633 4.11601Z',
  d7: 'M19.8841 4.11606C20.3723 4.60421 20.3723 5.39567 19.8841 5.88382L5.88411 19.8838C5.39596 20.372 4.6045 20.372 4.11635 19.8838C3.62819 19.3957 3.62819 18.6042 4.11635 18.1161L18.1163 4.11606C18.6045 3.6279 19.396 3.6279 19.8841 4.11606Z',
  d8: 'M4.11635 4.11606C4.6045 3.6279 5.39596 3.6279 5.88411 4.11606L19.8841 18.1161C20.3723 18.6042 20.3723 19.3957 19.8841 19.8838C19.396 20.372 18.6045 20.372 18.1163 19.8838L4.11635 5.88382C3.62819 5.39567 3.62819 4.60421 4.11635 4.11606Z',
  d9: 'M12 10.2623L18.0123 4.25L19.75 5.98775L13.7377 12L19.75 18.0123L18.0123 19.75L12 13.7377L5.98775 19.75L4.25 18.0123L10.2623 12L4.25 5.98775L5.98775 4.25L12 10.2623Z',
};

export const IconCancel01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-stroke-rounded IconCancel01StrokeRounded"
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

export const IconCancel01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-duotone-rounded IconCancel01DuotoneRounded"
    >
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

export const IconCancel01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-twotone-rounded IconCancel01TwotoneRounded"
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

export const IconCancel01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-solid-rounded IconCancel01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconCancel01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-bulk-rounded IconCancel01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCancel01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-stroke-sharp IconCancel01StrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCancel01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cancel-01-solid-sharp IconCancel01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCancel01: TheIconSelfPack = {
  name: 'Cancel01',
  StrokeRounded: IconCancel01StrokeRounded,
  DuotoneRounded: IconCancel01DuotoneRounded,
  TwotoneRounded: IconCancel01TwotoneRounded,
  SolidRounded: IconCancel01SolidRounded,
  BulkRounded: IconCancel01BulkRounded,
  StrokeSharp: IconCancel01StrokeSharp,
  SolidSharp: IconCancel01SolidSharp,
};