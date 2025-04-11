import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9959 12H12.0049',
  d2: 'M11.9842 16H11.9932',
  d3: 'M11.9998 8H12.0088',
  d4: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d5: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM11.9961 10.75C11.3057 10.75 10.7461 11.3096 10.7461 12C10.7461 12.6904 11.3057 13.25 11.9961 13.25H12.0051C12.6954 13.25 13.2551 12.6904 13.2551 12C13.2551 11.3096 12.6954 10.75 12.0051 10.75H11.9961ZM10.7344 16C10.7344 15.3096 11.294 14.75 11.9844 14.75H11.9934C12.6837 14.75 13.2434 15.3096 13.2434 16C13.2434 16.6904 12.6837 17.25 11.9934 17.25H11.9844C11.294 17.25 10.7344 16.6904 10.7344 16ZM12 6.75C11.3096 6.75 10.75 7.30964 10.75 8C10.75 8.69036 11.3096 9.25 12 9.25H12.009C12.6993 9.25 13.259 8.69036 13.259 8C13.259 7.30964 12.6993 6.75 12.009 6.75H12Z',
  d6: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d7: 'M10.7461 12C10.7461 11.3096 11.3057 10.75 11.9961 10.75H12.0051C12.6954 10.75 13.2551 11.3096 13.2551 12C13.2551 12.6904 12.6954 13.25 12.0051 13.25H11.9961C11.3057 13.25 10.7461 12.6904 10.7461 12Z',
  d8: 'M10.7344 16C10.7344 15.3096 11.294 14.75 11.9844 14.75H11.9934C12.6837 14.75 13.2434 15.3096 13.2434 16C13.2434 16.6904 12.6837 17.25 11.9934 17.25H11.9844C11.294 17.25 10.7344 16.6904 10.7344 16Z',
  d9: 'M10.75 8C10.75 7.30964 11.3096 6.75 12 6.75H12.009C12.6993 6.75 13.259 7.30964 13.259 8C13.259 8.69036 12.6993 9.25 12.009 9.25H12C11.3096 9.25 10.75 8.69036 10.75 8Z',
  d10: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM13.25 8.25684V5.75H10.75L10.75 8.25684H13.25ZM13.25 10.7427V13.2495H10.75V10.7427H13.25ZM13.25 15.7432V18.25H10.75V15.7432H13.25Z',
};

export const IconMoreVerticalCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoreVerticalCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoreVerticalCircle02 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoreVerticalCircle02: TheIconSelfPack = [
  'MoreVerticalCircle02',
  IconMoreVerticalCircle02StrokeRounded,
  IconMoreVerticalCircle02DuotoneRounded,
  IconMoreVerticalCircle02TwotoneRounded,
  IconMoreVerticalCircle02SolidRounded,
  IconMoreVerticalCircle02BulkRounded,
  IconMoreVerticalCircle02StrokeSharp,
  IconMoreVerticalCircle02SolidSharp,
];