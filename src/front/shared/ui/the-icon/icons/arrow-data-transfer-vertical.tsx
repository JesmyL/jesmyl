import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 19L15 6.65856C15 5.65277 15 5.14987 15.3087 5.02472C15.6173 4.89956 15.9806 5.25517 16.7071 5.96637L19 8.21091',
  d2: 'M9 5L9 17.3414C9 18.3472 9 18.8501 8.69134 18.9753C8.38268 19.1004 8.01942 18.7448 7.29289 18.0336L5 15.7891',
  d3: 'M15.9998 19C15.9998 19.5523 15.5521 20 14.9998 20C14.4475 20 13.9998 19.5523 13.9998 19L14 6.7395C13.9999 6.26801 13.9998 5.80423 14.0557 5.44568C14.109 5.10422 14.2783 4.39991 15.0634 4.10522C15.8365 3.81502 16.4872 4.19563 16.7859 4.39925C17.1027 4.61518 17.4627 4.94149 17.8317 5.27604L17.8317 5.27605L18.5521 5.92887C18.9307 6.27177 19.2981 6.60453 19.5418 6.89751C19.767 7.16831 20.2092 7.78044 19.8854 8.51516C19.5616 9.24988 18.783 9.40097 18.4174 9.44863C18.0219 9.5002 17.5079 9.5001 16.9782 9.49999L15.9998 9.49998L15.9998 19Z',
  d4: 'M8.00019 4.99999C8.00019 4.4477 8.44791 3.99999 9.00019 3.99999C9.55248 3.99999 10.0002 4.4477 10.0002 4.99999L9.99999 17.2605C10.0001 17.732 10.0002 18.1958 9.94429 18.5543C9.891 18.8958 9.72174 19.6001 8.93662 19.8948C8.16345 20.185 7.51278 19.8044 7.21405 19.6008C6.89727 19.3848 6.53733 19.0585 6.1683 18.724L6.16829 18.724L5.44786 18.0711C5.06928 17.7282 4.7019 17.3955 4.45822 17.1025C4.23298 16.8317 3.79078 16.2196 4.1146 15.4848C4.43843 14.7501 5.217 14.599 5.5826 14.5514C5.97814 14.4998 6.49214 14.4999 7.0218 14.5L8.00019 14.5L8.00019 4.99999Z',
  d5: 'M15 19.0003L15 5L19 8',
  d6: 'M9 4.99951L9 18.9998L5 15.9998',
  d7: 'M15.9643 7.00001L18.3214 8.80001L19.5 7.20001L15.5714 4.20001C15.2738 3.97274 14.8757 3.93619 14.5429 4.10558C14.2102 4.27497 14 4.62123 14 5.00001L14 19.0003H15.9643L15.9643 7.00001Z',
  d8: 'M8.03571 17.0003L5.67857 15.2003L4.5 16.8003L8.42857 19.8003C8.72618 20.0276 9.12435 20.0641 9.45708 19.8947C9.78982 19.7253 10 19.3791 10 19.0003L10 5L8.03571 5L8.03571 17.0003Z',
};

export const IconArrowDataTransferVerticalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-stroke-rounded IconArrowDataTransferVerticalStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferVerticalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-duotone-rounded IconArrowDataTransferVerticalDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferVerticalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-twotone-rounded IconArrowDataTransferVerticalTwotoneRounded"
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

export const IconArrowDataTransferVerticalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-solid-rounded IconArrowDataTransferVerticalSolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferVerticalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-bulk-rounded IconArrowDataTransferVerticalBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferVerticalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-stroke-sharp IconArrowDataTransferVerticalStrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferVerticalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-vertical-solid-sharp IconArrowDataTransferVerticalSolidSharp"
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

export const iconPackOfArrowDataTransferVertical: TheIconSelfPack = {
  name: 'ArrowDataTransferVertical',
  StrokeRounded: IconArrowDataTransferVerticalStrokeRounded,
  DuotoneRounded: IconArrowDataTransferVerticalDuotoneRounded,
  TwotoneRounded: IconArrowDataTransferVerticalTwotoneRounded,
  SolidRounded: IconArrowDataTransferVerticalSolidRounded,
  BulkRounded: IconArrowDataTransferVerticalBulkRounded,
  StrokeSharp: IconArrowDataTransferVerticalStrokeSharp,
  SolidSharp: IconArrowDataTransferVerticalSolidSharp,
};