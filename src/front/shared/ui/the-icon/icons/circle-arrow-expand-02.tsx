import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.0633 16.0634C16.5806 15.5461 16.4946 13.3483 16.4946 13.3483M16.0633 16.0634C15.546 16.5808 13.3483 16.4946 13.3483 16.4946M16.0633 16.0634L13 13M7.93655 7.93661C8.45388 7.41928 10.6516 7.50537 10.6516 7.50537M7.93655 7.93661C7.41923 8.45394 7.50538 10.6516 7.50538 10.6516M7.93655 7.93661L11 11',
  d2: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM10.0899 6.55196C10.5036 6.53024 10.8565 6.84796 10.8782 7.2616C10.8898 7.48255 10.8046 7.68618 10.6596 7.83126L9.95249 8.53836L11.5 10.0858C11.8905 10.4764 11.8905 11.1095 11.5 11.5001C11.1094 11.8906 10.4763 11.8906 10.0858 11.5001L8.53828 9.95258L7.83088 10.66C7.68582 10.8048 7.48232 10.8899 7.26151 10.8783C6.84787 10.8566 6.53015 10.5037 6.55187 10.09C6.55622 10.0073 6.54953 9.84737 6.53555 9.58823L6.53248 9.53159C6.52017 9.30472 6.5055 9.0342 6.50119 8.76598C6.49658 8.47871 6.50298 8.16199 6.54465 7.8765C6.57991 7.635 6.66212 7.23254 6.94729 6.94738C7.23245 6.66221 7.63491 6.58 7.87641 6.54474C8.1619 6.50307 8.47863 6.49667 8.76589 6.50128C9.03409 6.50558 9.30458 6.52026 9.53143 6.53257L9.58813 6.53564C9.84728 6.54962 10.0072 6.55631 10.0899 6.55196ZM13.91 17.448C13.4963 17.4698 13.1434 17.152 13.1217 16.7384C13.1101 16.5176 13.1952 16.3141 13.34 16.169L14.0474 15.4616L12.5 13.9142C12.1094 13.5237 12.1094 12.8905 12.5 12.5C12.8905 12.1094 13.5237 12.1094 13.9142 12.5L15.4616 14.0474L16.1687 13.3403C16.3138 13.1953 16.5174 13.1101 16.7384 13.1217C17.152 13.1434 17.4698 13.4963 17.448 13.91C17.4437 13.9927 17.4504 14.1526 17.4644 14.4118L17.4674 14.4684L17.4674 14.4685C17.4797 14.6953 17.4944 14.9658 17.4987 15.234C17.5033 15.5213 17.4969 15.838 17.4553 16.1235C17.42 16.365 17.3378 16.7675 17.0526 17.0526C16.7675 17.3378 16.365 17.42 16.1235 17.4553C15.838 17.4969 15.5213 17.5033 15.234 17.4987C14.9658 17.4944 14.6954 17.4797 14.4685 17.4674L14.4684 17.4674L14.4118 17.4644C14.1526 17.4504 13.9927 17.4437 13.91 17.448Z',
  d3: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12Z',
  d4: 'M13.1217 16.7384C13.1434 17.152 13.4963 17.4698 13.91 17.448C13.9927 17.4437 14.1526 17.4504 14.4118 17.4644L14.4684 17.4674C14.6953 17.4797 14.9658 17.4944 15.234 17.4987C15.5213 17.5033 15.838 17.4969 16.1235 17.4553C16.365 17.42 16.7675 17.3378 17.0526 17.0526C17.3378 16.7675 17.42 16.365 17.4553 16.1235C17.4969 15.838 17.5033 15.5213 17.4987 15.234C17.4944 14.9658 17.4797 14.6953 17.4674 14.4684L17.4644 14.4118C17.4504 14.1526 17.4437 13.9927 17.448 13.91C17.4698 13.4963 17.152 13.1434 16.7384 13.1217C16.5174 13.1101 16.3138 13.1953 16.1687 13.3403L15.4616 14.0474L13.9142 12.5C13.5237 12.1094 12.8905 12.1094 12.5 12.5C12.1094 12.8905 12.1094 13.5237 12.5 13.9142L14.0474 15.4616L13.34 16.169C13.1952 16.3141 13.1101 16.5176 13.1217 16.7384Z',
  d5: 'M10.8782 7.2616C10.8565 6.84796 10.5036 6.53024 10.0899 6.55196C10.0072 6.55631 9.84728 6.54962 9.58813 6.53564L9.53143 6.53257C9.30458 6.52026 9.03409 6.50558 8.76589 6.50128C8.47863 6.49667 8.1619 6.50307 7.87641 6.54474C7.63491 6.58 7.23245 6.66221 6.94729 6.94738C6.66212 7.23254 6.57991 7.635 6.54465 7.8765C6.50298 8.16199 6.49658 8.47871 6.50119 8.76598C6.5055 9.0342 6.52017 9.30472 6.53248 9.53159L6.53555 9.58823C6.54953 9.84737 6.55622 10.0073 6.55187 10.09C6.53015 10.5037 6.84787 10.8566 7.26151 10.8783C7.48232 10.8899 7.68582 10.8048 7.83088 10.66L8.53828 9.95258L10.0858 11.5001C10.4763 11.8906 11.1094 11.8906 11.5 11.5001C11.8905 11.1095 11.8905 10.4764 11.5 10.0858L9.95249 8.53836L10.6596 7.83126C10.8046 7.68618 10.8898 7.48255 10.8782 7.2616Z',
  d6: 'M11.5 7.5L7.5 7.50002V11.5M12.5 16.5L16.5 16.5V12.5M10.9998 10.9998L7.65865 7.65867M12.9547 12.9547L16.3197 16.3197',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75L12 7.25L7.25 7.25002V12H8.75V9.81067L10.9697 12.0303L12.0303 10.9697L9.81066 8.75001L12 8.75ZM11.9697 13.0303L14.1893 15.25L12 15.25L12 16.75L16.75 16.75V12H15.25V14.1893L13.0303 11.9697L11.9697 13.0303Z',
};

export const IconCircleArrowExpand02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-stroke-rounded IconCircleArrowExpand02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowExpand02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-duotone-rounded IconCircleArrowExpand02DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowExpand02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-twotone-rounded IconCircleArrowExpand02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconCircleArrowExpand02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-solid-rounded IconCircleArrowExpand02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowExpand02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-bulk-rounded IconCircleArrowExpand02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconCircleArrowExpand02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-stroke-sharp IconCircleArrowExpand02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowExpand02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-expand-02-solid-sharp IconCircleArrowExpand02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowExpand02: TheIconSelfPack = {
  name: 'CircleArrowExpand02',
  StrokeRounded: IconCircleArrowExpand02StrokeRounded,
  DuotoneRounded: IconCircleArrowExpand02DuotoneRounded,
  TwotoneRounded: IconCircleArrowExpand02TwotoneRounded,
  SolidRounded: IconCircleArrowExpand02SolidRounded,
  BulkRounded: IconCircleArrowExpand02BulkRounded,
  StrokeSharp: IconCircleArrowExpand02StrokeSharp,
  SolidSharp: IconCircleArrowExpand02SolidSharp,
};