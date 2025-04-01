import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.5 14.5C4.5 10.3579 7.85787 7 12 7C16.1421 7 19.5 10.3579 19.5 14.5C19.5 18.6421 16.1421 22 12 22C7.85787 22 4.5 18.6421 4.5 14.5Z',
  d2: 'M9 14.5C9 12.8431 10.2952 11.5 11.8929 11.5H12.1071C13.7048 11.5 15 12.8431 15 14.5C15 16.1569 13.7048 17.5 12.1071 17.5H11.8929C10.2952 17.5 9 16.1569 9 14.5Z',
  d3: 'M13.5596 2L10.999 7M17.9995 2L15.1776 7.60217',
  d4: 'M10.4399 2L12 4.59405M6 2L8.82144 7.5',
  d5: 'M12 7C7.85786 7 4.5 10.3579 4.5 14.5C4.5 18.6421 7.85786 22 12 22C16.1421 22 19.5 18.6421 19.5 14.5C19.5 10.3579 16.1421 7 12 7ZM11.8929 11.5C10.2952 11.5 9 12.8431 9 14.5C9 16.1569 10.2952 17.5 11.8929 17.5H12.1071C13.7048 17.5 15 16.1569 15 14.5C15 12.8431 13.7048 11.5 12.1071 11.5H11.8929Z',
  d6: 'M15.178 7.60217L18 2M13.5601 2L10.9995 7M8.82144 7.5L6 2M10.4399 2L12 4.59405',
  d7: 'M12 6.25C7.44365 6.25 3.75 9.94365 3.75 14.5C3.75 19.0563 7.44365 22.75 12 22.75C16.5563 22.75 20.25 19.0563 20.25 14.5C20.25 9.94365 16.5563 6.25 12 6.25ZM11.8929 10.75C9.85549 10.75 8.25 12.4549 8.25 14.5C8.25 16.5451 9.85549 18.25 11.8929 18.25H12.1071C14.1445 18.25 15.75 16.5451 15.75 14.5C15.75 12.4549 14.1445 10.75 12.1071 10.75H11.8929Z',
  d8: 'M18.4501 1.35712C18.9433 1.60558 19.1418 2.20685 18.8933 2.70009L16.0713 8.30226C15.8229 8.7955 15.2216 8.99393 14.7284 8.74547C14.2351 8.49702 14.0367 7.89575 14.2852 7.40251L17.1071 1.80034C17.3556 1.3071 17.9568 1.10867 18.4501 1.35712ZM14.0161 1.36014C14.5077 1.61189 14.7021 2.21446 14.4503 2.70604L11.8898 7.70604C11.638 8.19761 11.0354 8.39203 10.5439 8.14029C10.0523 7.88855 9.85788 7.28597 10.1096 6.7944L10.9818 5.09124L9.58319 2.76559C9.29855 2.29231 9.45149 1.67789 9.92477 1.39325C10.3981 1.10862 11.0125 1.26155 11.2971 1.73484L12.0552 2.99534L12.6702 1.7944C12.9219 1.30282 13.5245 1.1084 14.0161 1.36014ZM5.54378 1.36046C6.03517 1.10838 6.63788 1.30238 6.88997 1.79378L9.71141 7.29378C9.96349 7.78518 9.76949 8.38789 9.27809 8.63997C8.78669 8.89206 8.18398 8.69805 7.9319 8.20665L5.11045 2.70665C4.85837 2.21525 5.05238 1.61254 5.54378 1.36046Z',
  d9: 'M3.75 14.5C3.75 9.94365 7.44365 6.25 12 6.25C16.5563 6.25 20.25 9.94365 20.25 14.5C20.25 19.0563 16.5563 22.75 12 22.75C7.44365 22.75 3.75 19.0563 3.75 14.5Z',
  d10: 'M8.25 14.5C8.25 12.4549 9.85549 10.75 11.8929 10.75H12.1071C14.1445 10.75 15.75 12.4549 15.75 14.5C15.75 16.5451 14.1445 18.25 12.1071 18.25H11.8929C9.85549 18.25 8.25 16.5451 8.25 14.5Z',
  d11: 'M18.8933 2.70009C19.1418 2.20685 18.9433 1.60558 18.4501 1.35712C17.9568 1.10867 17.3556 1.3071 17.1071 1.80034L14.6472 6.68386C15.2867 6.9004 15.8911 7.19323 16.4495 7.55153L18.8933 2.70009Z',
  d12: 'M7.58465 7.52974L5.11045 2.70665C4.85837 2.21525 5.05238 1.61254 5.54378 1.36046C6.03517 1.10838 6.63788 1.30238 6.88997 1.79378L9.39181 6.67077C8.75085 6.8842 8.14485 7.17413 7.58465 7.52974Z',
  d13: 'M10.2985 6.42567L10.9818 5.09124L9.58319 2.76559C9.29855 2.29231 9.45149 1.67789 9.92477 1.39325C10.3981 1.10862 11.0125 1.26155 11.2971 1.73484L12.0552 2.99534L12.6702 1.7944C12.9219 1.30282 13.5245 1.1084 14.0161 1.36014C14.5077 1.61189 14.7021 2.21446 14.4503 2.70604L12.6235 6.27321C12.4177 6.25783 12.2098 6.25 12 6.25C11.4167 6.25 10.8475 6.31054 10.2985 6.42567Z',
  d14: 'M10.9817 4.6064L9.58308 2.28076L11.297 1.25L12.0551 2.5105L12.6701 1.30956L14.4502 2.2212L11.6396 7.47126L9.85945 6.55962L10.9817 4.6064ZM6.88986 1.30894L9.71131 6.80894L7.93179 7.72181L5.11035 2.22181L6.88986 1.30894ZM18.8932 2.21525L16.0712 7.81742L14.2851 6.91767L17.107 1.3155L18.8932 2.21525Z',
};

export const IconMedal06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-stroke-rounded IconMedal06StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMedal06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-duotone-rounded IconMedal06DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMedal06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-twotone-rounded IconMedal06TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMedal06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-solid-rounded IconMedal06SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconMedal06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-bulk-rounded IconMedal06BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMedal06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-stroke-sharp IconMedal06StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMedal06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medal-06-solid-sharp IconMedal06SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMedal06: TheIconSelfPack = {
  name: 'Medal06',
  StrokeRounded: IconMedal06StrokeRounded,
  DuotoneRounded: IconMedal06DuotoneRounded,
  TwotoneRounded: IconMedal06TwotoneRounded,
  SolidRounded: IconMedal06SolidRounded,
  BulkRounded: IconMedal06BulkRounded,
  StrokeSharp: IconMedal06StrokeSharp,
  SolidSharp: IconMedal06SolidSharp,
};