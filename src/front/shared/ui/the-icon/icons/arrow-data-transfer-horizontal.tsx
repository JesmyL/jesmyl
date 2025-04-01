import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5',
  d2: 'M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19',
  d3: 'M19 8.00019C19.5523 8.00019 20 8.44791 20 9.00019C20 9.55248 19.5523 10.0002 19 10.0002L6.7395 9.99999C6.26801 10.0001 5.80423 10.0002 5.44568 9.94429C5.10422 9.891 4.39991 9.72174 4.10522 8.93662C3.81502 8.16345 4.19563 7.51278 4.39925 7.21405C4.61518 6.89727 4.94149 6.53733 5.27604 6.1683L5.27605 6.16829L5.92887 5.44786C6.27177 5.06928 6.60453 4.7019 6.89751 4.45822C7.16831 4.23298 7.78044 3.79078 8.51516 4.1146C9.24988 4.43843 9.40097 5.217 9.44863 5.5826C9.5002 5.97814 9.5001 6.49214 9.49999 7.0218L9.49998 8.00019H19Z',
  d4: 'M4.99999 15.9998C4.4477 15.9998 3.99999 15.5521 3.99999 14.9998C3.99999 14.4475 4.4477 13.9998 4.99999 13.9998L17.2605 14C17.732 13.9999 18.1958 13.9998 18.5543 14.0557C18.8958 14.109 19.6001 14.2783 19.8948 15.0634C20.185 15.8365 19.8044 16.4872 19.6008 16.7859C19.3848 17.1027 19.0585 17.4627 18.724 17.8317L18.724 17.8317L18.0711 18.5521C17.7282 18.9307 17.3955 19.2981 17.1025 19.5418C16.8317 19.767 16.2196 20.2092 15.4848 19.8854C14.7501 19.5616 14.599 18.783 14.5514 18.4174C14.4998 18.0219 14.4999 17.5079 14.5 16.9782L14.5 15.9998H4.99999Z',
  d5: 'M19.0003 9H5L8 5',
  d6: 'M4.9997 15H19L16 19',
  d7: 'M7.00001 8.03571L8.80001 5.67857L7.20001 4.5L4.20001 8.42857C3.97274 8.72618 3.93619 9.12435 4.10558 9.45708C4.27497 9.78982 4.62123 10 5.00001 10H19.0003V8.03571H7.00001Z',
  d8: 'M17.0003 15.9643L15.2003 18.3214L16.8003 19.5L19.8003 15.5714C20.0276 15.2738 20.0641 14.8756 19.8947 14.5429C19.7253 14.2102 19.3791 14 19.0003 14H5V15.9643H17.0003Z',
};

export const IconArrowDataTransferHorizontalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-stroke-rounded IconArrowDataTransferHorizontalStrokeRounded"
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

export const IconArrowDataTransferHorizontalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-duotone-rounded IconArrowDataTransferHorizontalDuotoneRounded"
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

export const IconArrowDataTransferHorizontalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-twotone-rounded IconArrowDataTransferHorizontalTwotoneRounded"
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

export const IconArrowDataTransferHorizontalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-solid-rounded IconArrowDataTransferHorizontalSolidRounded"
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

export const IconArrowDataTransferHorizontalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-bulk-rounded IconArrowDataTransferHorizontalBulkRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDataTransferHorizontalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-stroke-sharp IconArrowDataTransferHorizontalStrokeSharp"
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

export const IconArrowDataTransferHorizontalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-data-transfer-horizontal-solid-sharp IconArrowDataTransferHorizontalSolidSharp"
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

export const iconPackOfArrowDataTransferHorizontal: TheIconSelfPack = {
  name: 'ArrowDataTransferHorizontal',
  StrokeRounded: IconArrowDataTransferHorizontalStrokeRounded,
  DuotoneRounded: IconArrowDataTransferHorizontalDuotoneRounded,
  TwotoneRounded: IconArrowDataTransferHorizontalTwotoneRounded,
  SolidRounded: IconArrowDataTransferHorizontalSolidRounded,
  BulkRounded: IconArrowDataTransferHorizontalBulkRounded,
  StrokeSharp: IconArrowDataTransferHorizontalStrokeSharp,
  SolidSharp: IconArrowDataTransferHorizontalSolidSharp,
};