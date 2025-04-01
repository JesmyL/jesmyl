import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162',
  d2: 'M19.7208 13.5442L10.4558 4.27922C8.75022 2.57359 5.98485 2.57359 4.27922 4.27922C2.57359 5.98485 2.57359 8.75022 4.27922 10.4558L13.5442 19.7208C15.2498 21.4264 18.0152 21.4264 19.7208 19.7208C21.4264 18.0152 21.4264 15.2498 19.7208 13.5442Z',
  d3: 'M19.72 13.5445C21.4256 15.2502 21.4256 18.0155 19.72 19.7212C18.0144 21.4268 15.249 21.4268 13.5434 19.7212L10.069 16.2468C9.00303 15.1808 9.00303 13.4524 10.069 12.3864C11.1351 11.3204 12.8634 11.3204 13.9294 12.3864L15.8596 14.3166',
  d4: 'M9.74874 4.98633C8.43363 3.67122 6.30143 3.67122 4.98633 4.98633C3.67122 6.30143 3.67122 8.43363 4.98633 9.74874L6.53048 11.2929C6.92101 11.6834 6.92101 12.3166 6.53048 12.7071C6.13996 13.0976 5.50679 13.0976 5.11627 12.7071L3.57211 11.163C1.47596 9.0668 1.47596 5.66827 3.57211 3.57211C5.66827 1.47596 9.0668 1.47596 11.163 3.57211L20.4279 12.837C22.524 14.9332 22.524 18.3317 20.4279 20.4279C18.3317 22.524 14.9332 22.524 12.837 20.4279L9.3627 16.9535C7.90616 15.497 7.90616 13.1355 9.3627 11.6789C10.8192 10.2224 13.1808 10.2224 14.6373 11.6789L16.5675 13.6091C16.958 13.9997 16.958 14.6328 16.5675 15.0233C16.177 15.4139 15.5438 15.4139 15.1533 15.0233L13.2231 13.0931C12.5476 12.4177 11.4524 12.4177 10.7769 13.0931C10.1014 13.7686 10.1014 14.8638 10.7769 15.5393L14.2513 19.0137C15.5664 20.3288 17.6986 20.3288 19.0137 19.0137C20.3288 17.6986 20.3288 15.5664 19.0137 14.2513L9.74874 4.98633Z',
  d5: 'M15.8596 14.3156L13.9294 12.3855C12.8634 11.3194 11.1351 11.3194 10.069 12.3855C9.00303 13.4515 9.00303 15.1798 10.069 16.2458L13.5434 19.7202C15.249 21.4258 18.0144 21.4258 19.72 19.7202',
  d6: 'M13.2223 13.0926C12.5468 12.4171 11.4516 12.4171 10.7762 13.0926C10.1007 13.768 10.1007 14.8632 10.7762 15.5387L14.2505 19.0131C15.5656 20.3282 17.6978 20.3282 19.0129 19.0131C19.4034 18.6226 20.0366 18.6226 20.4271 19.0131C20.8176 19.4036 20.8176 20.0368 20.4271 20.4273C18.331 22.5234 14.9324 22.5234 12.8363 20.4273L9.36194 16.9529C7.9054 15.4964 7.9054 13.1349 9.36194 11.6783C10.8185 10.2218 13.18 10.2218 14.6365 11.6783L16.5667 13.6085C16.9573 13.9991 16.9573 14.6322 16.5667 15.0228C16.1762 15.4133 15.543 15.4133 15.1525 15.0228L13.2223 13.0926Z',
  d7: 'M9.74874 4.98633C8.43363 3.67122 6.30143 3.67122 4.98633 4.98633C3.67122 6.30143 3.67122 8.43363 4.98633 9.74874L6.53048 11.2929C6.92101 11.6834 6.92101 12.3166 6.53048 12.7071C6.13996 13.0976 5.50679 13.0976 5.11627 12.7071L3.57211 11.163C1.47596 9.0668 1.47596 5.66827 3.57211 3.57211C5.66827 1.47596 9.0668 1.47596 11.163 3.57211L20.4279 12.837C22.524 14.9332 22.524 18.3317 20.4279 20.4279C20.0374 20.8184 19.4042 20.8184 19.0137 20.4279C18.6231 20.0374 18.6231 19.4042 19.0137 19.0137C20.3288 17.6986 20.3288 15.5664 19.0137 14.2513L9.74874 4.98633Z',
  d8: 'M9.74874 4.98633C8.43363 3.67122 6.30143 3.67122 4.98633 4.98633C3.67122 6.30143 3.67122 8.43363 4.98633 9.74874L6.53048 11.2929L5.11627 12.7071L3.57211 11.163C1.47596 9.0668 1.47596 5.66827 3.57211 3.57211C5.66827 1.47596 9.0668 1.47596 11.163 3.57211L20.4279 12.837C22.524 14.9332 22.524 18.3317 20.4279 20.4279C18.3317 22.524 14.9332 22.524 12.837 20.4279L9.3627 16.9535C7.90616 15.497 7.90616 13.1355 9.3627 11.6789C10.8192 10.2224 13.1808 10.2224 14.6373 11.6789L16.5675 13.6091L15.1533 15.0233L13.2231 13.0931C12.5476 12.4177 11.4524 12.4177 10.7769 13.0931C10.1014 13.7686 10.1014 14.8638 10.7769 15.5393L14.2513 19.0137C15.5664 20.3288 17.6986 20.3288 19.0137 19.0137C20.3288 17.6986 20.3288 15.5664 19.0137 14.2513L9.74874 4.98633Z',
};

export const IconAttachment01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-stroke-rounded IconAttachment01StrokeRounded"
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

export const IconAttachment01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-duotone-rounded IconAttachment01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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

export const IconAttachment01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-twotone-rounded IconAttachment01TwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAttachment01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-solid-rounded IconAttachment01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAttachment01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-bulk-rounded IconAttachment01BulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconAttachment01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-stroke-sharp IconAttachment01StrokeSharp"
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

export const IconAttachment01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="attachment-01-solid-sharp IconAttachment01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAttachment01: TheIconSelfPack = {
  name: 'Attachment01',
  StrokeRounded: IconAttachment01StrokeRounded,
  DuotoneRounded: IconAttachment01DuotoneRounded,
  TwotoneRounded: IconAttachment01TwotoneRounded,
  SolidRounded: IconAttachment01SolidRounded,
  BulkRounded: IconAttachment01BulkRounded,
  StrokeSharp: IconAttachment01StrokeSharp,
  SolidSharp: IconAttachment01SolidSharp,
};