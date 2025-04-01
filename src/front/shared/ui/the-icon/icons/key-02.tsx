import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.4998 13.5C15.1242 14.1962 15.9365 14.5443 16.7554 14.4351C16.8478 14.4227 16.9396 14.4061 17.0305 14.3852C17.8357 14.2003 18.4742 13.5894 19.7513 12.3676L19.9012 12.2242C20.8695 11.2559 21.3537 10.7717 21.4713 9.78342C21.5889 8.79514 21.3365 8.38218 20.8317 7.55626C20.3833 6.82247 19.7571 5.98593 18.8855 5.11433C18.0139 4.24272 17.1773 3.61654 16.4435 3.16808C15.6176 2.66332 15.2047 2.41094 14.2164 2.52851C13.2281 2.64609 12.7439 3.13027 11.7756 4.09863L11.6322 4.24843C10.4105 5.52557 9.7996 6.16413 9.61466 6.96941C9.59382 7.0602 9.57721 7.1519 9.56489 7.24423C9.45564 8.06322 9.80375 8.87548 10.5 10.5',
  d2: 'M10.5002 10.4994L2.50021 18.5V21.5H5.50021V19.5H7.50021V17.5H9.50021L13.5002 13.5',
  d3: 'M17.0002 7L16.0002 8',
  d4: 'M18.8857 5.11433C18.0141 4.24272 17.1775 3.61654 16.4438 3.16808C15.6178 2.66332 15.2049 2.41094 14.2166 2.52851C13.2283 2.64609 12.7441 3.13027 11.7758 4.09863L11.6325 4.24843C10.4107 5.52557 9.79982 6.16413 9.61489 6.96941C9.59404 7.0602 9.57743 7.1519 9.56511 7.24423C9.45586 8.06322 9.80398 8.87548 10.5002 10.5L2.50043 18.5006V21.5006H5.50043V19.5006H7.50043V17.5006H9.50043L13.5 13.5C15.1245 14.1962 15.9367 14.5443 16.7556 14.4351C16.8481 14.4227 16.9398 14.4061 17.0307 14.3852C17.8359 14.2003 18.4745 13.5894 19.7515 12.3676L19.9014 12.2242C20.8698 11.2559 21.3539 10.7717 21.4715 9.78342C21.5891 8.79514 21.3367 8.38218 20.8319 7.55626C20.3835 6.82247 19.7573 5.98593 18.8857 5.11433Z',
  d5: 'M13.4998 13.5C15.1243 14.1962 15.9365 14.5443 16.7554 14.4351C16.8478 14.4227 16.9396 14.4061 17.0305 14.3852C17.8357 14.2003 18.4742 13.5894 19.7513 12.3676L19.9012 12.2242C20.8695 11.2559 21.3537 10.7717 21.4713 9.78342C21.5889 8.79514 21.3365 8.38218 20.8317 7.55626C20.3833 6.82247 19.7571 5.98593 18.8855 5.11433C18.0139 4.24272 17.1773 3.61654 16.4435 3.16808C15.6176 2.66332 15.2047 2.41094 14.2164 2.52851C13.2281 2.64609 12.7439 3.13027 11.7756 4.09863L11.6323 4.24843C10.4105 5.52557 9.79961 6.16413 9.61467 6.96941C9.59382 7.0602 9.57721 7.1519 9.5649 7.24423C9.45565 8.06322 9.80376 8.87548 10.5 10.5',
  d6: 'M16.8346 2.52812L16.7936 2.50301C16.4148 2.27139 16.0415 2.04308 15.6309 1.90436C15.1722 1.7494 14.7057 1.715 14.1278 1.78375C12.8796 1.93223 12.2229 2.5896 11.324 3.48945C11.2994 3.51521 11.2744 3.54125 11.2493 3.56752C10.6741 4.16864 9.9809 4.89304 9.64396 5.3237C9.27717 5.79251 9.00964 6.25315 8.8837 6.80153C8.85764 6.915 8.83688 7.02964 8.82148 7.14505C8.74709 7.70276 8.83607 8.22797 9.01513 8.79564C9.15409 9.23617 9.3597 9.73809 9.6109 10.3284L1.96988 17.9697C1.82923 18.1103 1.75021 18.3011 1.75021 18.5V21.5C1.75021 21.9142 2.086 22.25 2.50021 22.25H5.50021C5.91443 22.25 6.25021 21.9142 6.25021 21.5V19.7493H8.00085C8.41506 19.7493 8.75085 19.4136 8.75085 18.9993V17.2493H10.5008C10.6998 17.2493 10.8906 17.1703 11.0312 17.0296L13.6714 14.3891C14.2617 14.6403 14.7636 14.8459 15.2041 14.9848C15.7717 15.1639 16.2969 15.2528 16.8546 15.1785C16.9701 15.1631 17.0848 15.1423 17.1984 15.1162C17.7467 14.9902 18.2074 14.7227 18.6761 14.3559C19.1068 14.0189 19.8314 13.3255 20.4325 12.7503C20.4587 12.7252 20.4846 12.7004 20.5103 12.6758C21.4102 11.7768 22.0676 11.1201 22.216 9.87201C22.2848 9.29409 22.2504 8.82756 22.0954 8.36889C21.9567 7.9583 21.7284 7.58497 21.4968 7.20622L21.4717 7.16514C20.9932 6.38223 20.3305 5.49869 19.4158 4.58398C18.5011 3.66927 17.6176 3.00659 16.8346 2.52812ZM17.5305 7.53033C17.8234 7.23744 17.8234 6.76256 17.5305 6.46967C17.2376 6.17678 16.7628 6.17678 16.4699 6.46967L15.4699 7.46967C15.177 7.76256 15.177 8.23744 15.4699 8.53033C15.7628 8.82322 16.2377 8.82322 16.5305 8.53033L17.5305 7.53033Z',
  d7: 'M16.7936 2.50301L16.8346 2.52812C17.6176 3.00659 18.5011 3.66927 19.4158 4.58398C20.3305 5.49869 20.9932 6.38223 21.4717 7.16514L21.4968 7.20622C21.7284 7.58497 21.9567 7.9583 22.0954 8.36889C22.2504 8.82756 22.2848 9.29409 22.216 9.87201C22.0676 11.1201 21.4102 11.7768 20.5103 12.6758C19.8951 13.2644 19.1256 14.0042 18.6761 14.3559C18.2074 14.7227 17.7467 14.9902 17.1984 15.1162C17.0848 15.1423 16.9701 15.1631 16.8546 15.1785C16.2969 15.2528 15.7717 15.1639 15.2041 14.9848C14.7636 14.8459 14.2617 14.6403 13.6714 14.3891L11.0312 17.0296C10.8906 17.1703 10.6998 17.2493 10.5008 17.2493H8.75085V18.9993C8.75085 19.4136 8.41506 19.7493 8.00085 19.7493H6.25021V21.5C6.25021 21.9142 5.91443 22.25 5.50021 22.25H2.50021C2.086 22.25 1.75021 21.9142 1.75021 21.5V18.5C1.75021 18.3011 1.82923 18.1103 1.96988 17.9697L9.6109 10.3284C9.3597 9.73809 9.15409 9.23617 9.01513 8.79564C8.83607 8.22797 8.74709 7.70276 8.82148 7.14505C8.83688 7.02964 8.85764 6.915 8.8837 6.80153C9.00964 6.25315 9.27717 5.79251 9.64396 5.3237C9.99563 4.87421 10.7354 4.10475 11.324 3.48945C12.2229 2.5896 12.8796 1.93223 14.1278 1.78375C14.7057 1.715 15.1722 1.7494 15.6309 1.90436C16.0415 2.04308 16.4148 2.27139 16.7936 2.50301Z',
  d8: 'M17.5305 6.46967C17.8234 6.76256 17.8234 7.23744 17.5305 7.53033L16.5305 8.53033C16.2377 8.82322 15.7628 8.82322 15.4699 8.53033C15.177 8.23744 15.177 7.76256 15.4699 7.46967L16.4699 6.46967C16.7628 6.17678 17.2377 6.17678 17.5305 6.46967Z',
  d9: 'M18.6579 5.34211C16.1316 2.81579 13.9211 2.5 13.9211 2.5L9 7.42105C9 7.42105 9.19076 8.75641 10.4619 10.5375L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.4622 13.5378C15.2435 14.8091 16.5789 15 16.5789 15L21.5 10.0789C21.5 10.0789 21.1842 7.86842 18.6579 5.34211Z',
  d10: 'M16.5 7.5L15.5 8.5',
  d11: 'M13.8142 1.78388C13.7228 1.76767 13.6523 1.75517 13.6286 1.75024L8.18927 7.18956C8.19239 7.20577 8.20273 7.26901 8.21616 7.35115C8.24591 7.53312 8.29083 7.80781 8.306 7.86931C8.35003 8.04783 8.42164 8.29714 8.53515 8.60292C8.71909 9.09838 9.01276 9.74129 9.47651 10.4706L1.74905 18.1986V22.2502H6.23909V19.7558H8.73355V17.2613H10.7896L13.5285 14.5225C14.2578 14.9863 14.9008 15.2801 15.3963 15.464C15.7021 15.5776 15.9514 15.6492 16.1299 15.6933C16.1914 15.7084 16.4662 15.7534 16.6481 15.7832C16.7303 15.7966 16.7935 15.8069 16.8097 15.8101L22.2491 10.3707C22.2441 10.347 22.2316 10.2765 22.2154 10.185C22.1761 9.96361 22.1151 9.61957 22.0873 9.52035C22.0088 9.23997 21.8779 8.84919 21.6639 8.37857C21.2355 7.43598 20.4767 6.17865 19.1487 4.85063C17.8206 3.52262 16.5633 2.7638 15.6207 2.33535C15.1501 2.12143 14.7593 1.99048 14.4789 1.91197C14.3797 1.88419 14.0356 1.82316 13.8142 1.78388ZM15.4992 9.56102L17.5598 7.50036L16.4992 6.4397L14.4385 8.50036L15.4992 9.56102Z',
};

export const IconKey02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-stroke-rounded IconKey02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconKey02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-duotone-rounded IconKey02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconKey02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-twotone-rounded IconKey02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKey02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-solid-rounded IconKey02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconKey02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-bulk-rounded IconKey02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconKey02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-stroke-sharp IconKey02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconKey02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="key-02-solid-sharp IconKey02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKey02: TheIconSelfPack = {
  name: 'Key02',
  StrokeRounded: IconKey02StrokeRounded,
  DuotoneRounded: IconKey02DuotoneRounded,
  TwotoneRounded: IconKey02TwotoneRounded,
  SolidRounded: IconKey02SolidRounded,
  BulkRounded: IconKey02BulkRounded,
  StrokeSharp: IconKey02StrokeSharp,
  SolidSharp: IconKey02SolidSharp,
};