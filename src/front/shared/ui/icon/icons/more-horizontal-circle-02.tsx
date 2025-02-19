import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9959 12H12.0049',
  d2: 'M15.9998 12H16.0088',
  d3: 'M7.99981 12H8.00879',
  d4: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d5: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM11.9961 10.75C11.3057 10.75 10.7461 11.3096 10.7461 12C10.7461 12.6904 11.3057 13.25 11.9961 13.25H12.0051C12.6954 13.25 13.2551 12.6904 13.2551 12C13.2551 11.3096 12.6954 10.75 12.0051 10.75H11.9961ZM14.75 12C14.75 11.3096 15.3096 10.75 16 10.75H16.009C16.6993 10.75 17.259 11.3096 17.259 12C17.259 12.6904 16.6993 13.25 16.009 13.25H16C15.3096 13.25 14.75 12.6904 14.75 12ZM8 10.75C7.30964 10.75 6.75 11.3096 6.75 12C6.75 12.6904 7.30964 13.25 8 13.25H8.00898C8.69934 13.25 9.25898 12.6904 9.25898 12C9.25898 11.3096 8.69934 10.75 8.00898 10.75H8Z',
  d6: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d7: 'M10.7461 12C10.7461 11.3096 11.3057 10.75 11.9961 10.75H12.0051C12.6954 10.75 13.2551 11.3096 13.2551 12C13.2551 12.6904 12.6954 13.25 12.0051 13.25H11.9961C11.3057 13.25 10.7461 12.6904 10.7461 12Z',
  d8: 'M14.75 12C14.75 11.3096 15.3096 10.75 16 10.75H16.009C16.6993 10.75 17.259 11.3096 17.259 12C17.259 12.6904 16.6993 13.25 16.009 13.25H16C15.3096 13.25 14.75 12.6904 14.75 12Z',
  d9: 'M6.75 12C6.75 11.3096 7.30964 10.75 8 10.75H8.00898C8.69934 10.75 9.25898 11.3096 9.25898 12C9.25898 12.6904 8.69934 13.25 8.00898 13.25H8C7.30964 13.25 6.75 12.6904 6.75 12Z',
  d10: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM8.25684 10.75H5.75V13.25H8.25684V10.75ZM10.7427 10.75H13.2495V13.25H10.7427V10.75ZM15.7432 10.75H18.25V13.25H15.7432V10.75Z',
};

export const IconMoreHorizontalCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-stroke-rounded IconMoreHorizontalCircle02StrokeRounded"
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
      <path 
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
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-duotone-rounded IconMoreHorizontalCircle02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-twotone-rounded IconMoreHorizontalCircle02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-solid-rounded IconMoreHorizontalCircle02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-bulk-rounded IconMoreHorizontalCircle02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-stroke-sharp IconMoreHorizontalCircle02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoreHorizontalCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="more-horizontal-circle-02-solid-sharp IconMoreHorizontalCircle02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoreHorizontalCircle02: TheIconSelfPack = {
  name: 'MoreHorizontalCircle02',
  StrokeRounded: IconMoreHorizontalCircle02StrokeRounded,
  DuotoneRounded: IconMoreHorizontalCircle02DuotoneRounded,
  TwotoneRounded: IconMoreHorizontalCircle02TwotoneRounded,
  SolidRounded: IconMoreHorizontalCircle02SolidRounded,
  BulkRounded: IconMoreHorizontalCircle02BulkRounded,
  StrokeSharp: IconMoreHorizontalCircle02StrokeSharp,
  SolidSharp: IconMoreHorizontalCircle02SolidSharp,
};