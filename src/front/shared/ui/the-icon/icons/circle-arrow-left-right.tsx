import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.5 9.3L15.5 9.3M8.5 9.3C8.5 8.59598 10.25 7.5 10.25 7.5M8.5 9.3C8.5 10.004 10.25 11.1 10.25 11.1M15.5 14.7H8.5M15.5 14.7C15.5 13.996 13.75 12.9 13.75 12.9M15.5 14.7C15.5 15.404 13.75 16.5 13.75 16.5',
  d2: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12ZM8.0249 14.225C7.59688 14.225 7.2499 14.572 7.2499 15C7.2499 15.428 7.59688 15.775 8.0249 15.775L13.75 15.775L13.75 16.7399C13.7486 16.8791 13.7832 17.0203 13.8575 17.1469C14.064 17.4991 14.499 17.6057 14.8287 17.3851L15.1046 17.189C15.2641 17.0708 15.4802 16.9033 15.6992 16.7098C15.9142 16.5198 16.1527 16.2868 16.3435 16.0362C16.5105 15.8168 16.75 15.4466 16.75 15C16.75 14.5535 16.5105 14.1833 16.3435 13.9639C16.1527 13.7133 15.9142 13.4803 15.6992 13.2903C15.4802 13.0967 15.2641 12.9292 15.1046 12.8111L14.8286 12.6148C14.4988 12.3943 14.064 12.501 13.8575 12.8531C13.7846 12.9775 13.7499 13.1158 13.75 13.2525L13.75 14.225L8.0249 14.225ZM15.9749 8.22498C16.4029 8.22498 16.7499 8.57196 16.7499 8.99998C16.7499 9.428 16.4029 9.77498 15.9749 9.77498L10.2498 9.77498L10.2498 10.7399C10.2512 10.8791 10.2166 11.0203 10.1423 11.1469C9.93576 11.4991 9.50082 11.6057 9.17106 11.3851L8.8952 11.189C8.73566 11.0708 8.51963 10.9033 8.30063 10.7098C8.08558 10.5198 7.84712 10.2868 7.65629 10.0362C7.48929 9.81682 7.2498 9.44657 7.2498 9.00004C7.2498 8.55352 7.48929 8.18327 7.65629 7.96393C7.84712 7.71332 8.08558 7.48029 8.30063 7.29027C8.51963 7.09674 8.73566 6.92924 8.8952 6.81111L9.17124 6.61483C9.50101 6.39427 9.93576 6.50097 10.1423 6.85315C10.2152 6.9775 10.2499 7.11585 10.2498 7.25251L10.2498 8.22498L15.9749 8.22498Z',
  d3: 'M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75Z',
  d4: 'M16.7499 8.99998C16.7499 8.57196 16.4029 8.22498 15.9749 8.22498L10.2498 8.22498L10.2498 7.25251C10.2499 7.11585 10.2152 6.9775 10.1423 6.85315C9.93576 6.50097 9.50101 6.39427 9.17124 6.61483L8.8952 6.81111C8.73566 6.92924 8.51963 7.09674 8.30063 7.29027C8.08558 7.48029 7.84712 7.71332 7.65629 7.96393C7.48929 8.18327 7.2498 8.55352 7.2498 9.00004C7.2498 9.44657 7.48929 9.81682 7.65629 10.0362C7.84712 10.2868 8.08558 10.5198 8.30063 10.7098C8.51963 10.9033 8.73566 11.0708 8.8952 11.189L9.17106 11.3851C9.50082 11.6057 9.93576 11.4991 10.1423 11.1469C10.2166 11.0203 10.2512 10.8791 10.2498 10.7399L10.2498 9.77498L15.9749 9.77498C16.4029 9.77498 16.7499 9.428 16.7499 8.99998Z',
  d5: 'M7.2499 15C7.2499 14.572 7.59688 14.225 8.0249 14.225L13.75 14.225L13.75 13.2525C13.7499 13.1158 13.7846 12.9775 13.8575 12.8531C14.064 12.501 14.4988 12.3943 14.8286 12.6148L15.1046 12.8111C15.2641 12.9292 15.4802 13.0967 15.6992 13.2903C15.9142 13.4803 16.1527 13.7133 16.3435 13.9639C16.5105 14.1833 16.75 14.5535 16.75 15C16.75 15.4466 16.5105 15.8168 16.3435 16.0362C16.1527 16.2868 15.9142 16.5198 15.6992 16.7098C15.4802 16.9033 15.2641 17.0708 15.1046 17.189L14.8287 17.3851C14.499 17.6057 14.064 17.4991 13.8575 17.1469C13.7832 17.0203 13.7486 16.8791 13.75 16.7399L13.75 15.775L8.0249 15.775C7.59688 15.775 7.2499 15.428 7.2499 15Z',
  d6: 'M16 9L8.33688 9M8 15L15.6318 15M14 17L16 15L14 13M10 11L8 9L10 7',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11.0304 7.53033L9.96978 6.46967L7.43945 9L9.96978 11.5303L11.0304 10.4697L10.3108 9.75H15.5001V8.25L10.3108 8.25L11.0304 7.53033ZM12.9697 13.5302L13.69 14.2508H8.50011V15.7508H13.689L12.9699 16.4696L14.0303 17.5304L16.5608 15.001L14.0305 12.4698L12.9697 13.5302Z',
};

export const IconCircleArrowLeftRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-stroke-rounded IconCircleArrowLeftRightStrokeRounded"
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

export const IconCircleArrowLeftRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-duotone-rounded IconCircleArrowLeftRightDuotoneRounded"
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

export const IconCircleArrowLeftRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-twotone-rounded IconCircleArrowLeftRightTwotoneRounded"
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

export const IconCircleArrowLeftRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-solid-rounded IconCircleArrowLeftRightSolidRounded"
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

export const IconCircleArrowLeftRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-bulk-rounded IconCircleArrowLeftRightBulkRounded"
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

export const IconCircleArrowLeftRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-stroke-sharp IconCircleArrowLeftRightStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowLeftRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-left-right-solid-sharp IconCircleArrowLeftRightSolidSharp"
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

export const iconPackOfCircleArrowLeftRight: TheIconSelfPack = {
  name: 'CircleArrowLeftRight',
  StrokeRounded: IconCircleArrowLeftRightStrokeRounded,
  DuotoneRounded: IconCircleArrowLeftRightDuotoneRounded,
  TwotoneRounded: IconCircleArrowLeftRightTwotoneRounded,
  SolidRounded: IconCircleArrowLeftRightSolidRounded,
  BulkRounded: IconCircleArrowLeftRightBulkRounded,
  StrokeSharp: IconCircleArrowLeftRightStrokeSharp,
  SolidSharp: IconCircleArrowLeftRightSolidSharp,
};