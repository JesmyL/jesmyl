import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 13L6 6',
  d2: 'M15.541 17.9172L14.2992 17.8043C12.2873 17.6214 11.2814 17.53 11.0447 16.8761C10.8079 16.2223 11.5222 15.508 12.9507 14.0795L14.0795 12.9507C15.508 11.5222 16.2223 10.8079 16.8761 11.0447C17.53 11.2814 17.6214 12.2873 17.8043 14.2992L17.9172 15.541C18.0273 16.7523 18.0824 17.358 17.7202 17.7202C17.358 18.0824 16.7523 18.0273 15.541 17.9172Z',
  d3: 'M5.41789 6.83211C5.02737 6.44158 5.02737 5.80842 5.41789 5.41789C5.80842 5.02737 6.44158 5.02737 6.83211 5.41789L13.8175 12.4033C14.4507 11.7702 14.9859 11.2407 15.4448 10.8982C15.9277 10.5379 16.553 10.2108 17.2566 10.4655C17.9601 10.7203 18.2311 11.3718 18.3713 11.9578C18.5115 12.5435 18.5841 13.3423 18.6707 14.2956L18.7939 15.65C18.845 16.212 18.8905 16.7114 18.87 17.1133C18.8478 17.548 18.7443 18.0079 18.3757 18.3766C18.007 18.7453 17.5471 18.8488 17.1123 18.8709C16.7104 18.8914 16.211 18.846 15.649 18.7948L14.2947 18.6717C13.3414 18.5851 12.5426 18.5125 11.9568 18.3723C11.3709 18.2321 10.7193 17.9611 10.4646 17.2575C10.2098 16.5539 10.5369 15.9286 10.8973 15.4458C11.2399 14.9867 11.7698 14.4511 12.4033 13.8175L5.41789 6.83211Z',
  d4: 'M5.41789 5.41789C5.02737 5.80842 5.02737 6.44158 5.41789 6.83211L12.4179 13.8321C12.8084 14.2226 13.4416 14.2226 13.8321 13.8321C14.2226 13.4416 14.2226 12.8084 13.8321 12.4179L6.83211 5.41789C6.44158 5.02737 5.80842 5.02737 5.41789 5.41789Z',
  d5: 'M12.5016 13.7192C11.8247 14.396 11.2575 14.9631 10.8973 15.4458C10.5369 15.9286 10.2098 16.5539 10.4646 17.2575C10.7193 17.9611 11.3709 18.2321 11.9568 18.3723C12.5426 18.5125 13.3414 18.5851 14.2947 18.6717L15.649 18.7948C16.211 18.846 16.7104 18.8914 17.1123 18.8709C17.5471 18.8488 18.007 18.7453 18.3757 18.3766C18.7443 18.0079 18.8478 17.548 18.87 17.1133C18.8905 16.7114 18.845 16.212 18.7939 15.65L18.6707 14.2956L18.6707 14.2956C18.5841 13.3423 18.5115 12.5435 18.3713 11.9578C18.2311 11.3718 17.9601 10.7203 17.2566 10.4655C16.553 10.2108 15.9277 10.5379 15.4448 10.8982C14.9621 11.2585 14.395 11.8257 13.7182 12.5026L12.5016 13.7191L12.5016 13.7192Z',
  d6: 'M14.4625 14.4639L6 6M17.2904 11.636L17.9975 18L11.634 17.2924L17.2904 11.636Z',
  d7: 'M17.8685 10.0903L19.0028 19L10.0903 17.8685L13.2723 14.6865L5 6.41421L6.41421 5L14.6865 13.2723L17.8685 10.0903Z',
};

export const IconArrowDownRight02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 StrokeSharp"
    >
      <path 
        d={d.d6}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowDownRight02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowDownRight02 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDownRight02: TheIconSelfPack = [
  'ArrowDownRight02',
  IconArrowDownRight02StrokeRounded,
  IconArrowDownRight02DuotoneRounded,
  IconArrowDownRight02TwotoneRounded,
  IconArrowDownRight02SolidRounded,
  IconArrowDownRight02BulkRounded,
  IconArrowDownRight02StrokeSharp,
  IconArrowDownRight02SolidSharp,
];