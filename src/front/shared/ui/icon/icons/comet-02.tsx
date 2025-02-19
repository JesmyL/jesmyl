import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2L13.999 3.00098M9 8L12 5',
  d2: 'M21.4142 10.5858C22.1953 11.3668 22.1953 12.6332 21.4142 13.4142C20.6332 14.1953 19.3668 14.1953 18.5858 13.4142C17.8047 12.6332 17.8047 11.3668 18.5858 10.5858C19.3668 9.80474 20.6332 9.80474 21.4142 10.5858Z',
  d3: 'M2.12137 16.1631L3.0226 13.3169C3.24284 12.6213 3.74644 12.0437 4.41629 11.7182L5.50816 11.1877C6.36203 10.7728 7.40065 11.0667 7.89181 11.8622L8.91348 13.5168C9.16562 13.9252 9.29169 14.1294 9.45347 14.2345C9.68102 14.3823 9.96665 14.4167 10.2241 14.3272C10.4072 14.2636 10.5803 14.0954 10.9264 13.7591C11.7417 12.9669 13.0989 13.0975 13.7384 14.0296L14.5397 15.1976C14.9857 15.8476 15.1154 16.6552 14.8945 17.4063L14.6604 18.2027C14.4494 18.9204 13.938 19.5191 13.251 19.853L9.41063 21.7189C8.50271 22.16 7.41823 22.0773 6.59222 21.504L3.14778 19.1132C2.18792 18.447 1.77447 17.2586 2.12137 16.1631Z',
  d4: 'M22 2L14 10',
  d5: 'M18.0555 10.0555C19.1294 8.98151 20.8706 8.98151 21.9445 10.0555C23.0185 11.1294 23.0185 12.8706 21.9445 13.9445C20.8706 15.0185 19.1294 15.0185 18.0555 13.9445C16.9815 12.8706 16.9815 11.1294 18.0555 10.0555Z',
  d6: 'M5.1806 10.5149C6.3723 9.93587 7.83186 10.339 8.53016 11.4699L9.55183 13.1246C9.68376 13.3383 9.76191 13.4639 9.82547 13.5519C9.8559 13.5933 9.93972 13.6554 10.0316 13.5733C10.1155 13.5026 10.223 13.3988 10.404 13.223C11.5489 12.1104 13.4517 12.2875 14.3571 13.6071L15.1584 14.7751C15.7309 15.6096 15.8993 16.6504 15.6143 17.6197L15.3801 18.416C15.1081 19.3412 14.4514 20.1054 13.5789 20.5293L9.73859 22.3952C8.588 22.9543 7.21459 22.8506 6.16476 22.1219L2.72032 19.7311C1.49663 18.8817 0.958113 17.3547 1.40655 15.9385L2.30778 13.0923C2.59159 12.196 3.23811 11.4587 4.08873 11.0454L5.1806 10.5149Z',
  d7: 'M15.7003 1.52822C16.0778 1.89918 16.0778 2.50063 15.7003 2.87159L14.7327 3.82243C14.3552 4.19339 13.7431 4.19339 13.3656 3.82243C12.9881 3.45147 12.9881 2.85002 13.3656 2.47906L14.3332 1.52822C14.7107 1.15726 15.3228 1.15726 15.7003 1.52822ZM22.4669 1.52915C22.8444 1.90011 22.8444 2.50156 22.4669 2.87252L14.7334 10.4718C14.3559 10.8427 13.7438 10.8427 13.3663 10.4718C12.9888 10.1008 12.9888 9.49937 13.3663 9.12841L21.0998 1.52915C21.4773 1.15819 22.0894 1.15819 22.4669 1.52915ZM12.8003 4.37794C13.1778 4.7489 13.1778 5.35035 12.8003 5.72131L9.90023 8.57104C9.52272 8.942 8.91065 8.942 8.53313 8.57104C8.15562 8.20007 8.15562 7.59863 8.53313 7.22766L11.4332 4.37794C11.8107 4.00698 12.4228 4.00698 12.8003 4.37794Z',
  d8: 'M15 2L13.5 3.5M9 8L12 5',
  d9: 'M2 17.9998L3.5 12.4998L7 11L10 14.4998L12.5 12.4998L15 16.9998L14 19.4998L7.5 21.9998L2 17.9998Z',
  d10: 'M6.70463 10.3107C7.00592 10.1816 7.35615 10.2631 7.56947 10.5119L10.0976 13.4613L12.0315 11.9142C12.2039 11.7763 12.4284 11.7213 12.645 11.764C12.8616 11.8067 13.0484 11.9426 13.1557 12.1356L15.6557 16.6356C15.7652 16.8328 15.7802 17.0689 15.6964 17.2784L14.6964 19.7784C14.6189 19.9722 14.4641 20.1249 14.2693 20.1999L7.76928 22.6999C7.53196 22.7911 7.26455 22.756 7.05891 22.6064L1.55891 18.6064C1.30691 18.4231 1.19448 18.1031 1.27647 17.8025L2.77647 12.3025C2.83667 12.0818 2.99433 11.9006 3.20463 11.8105L6.70463 10.3107Z',
  d11: 'M15.6644 2.66421L14.1644 4.16421L12.7502 2.75L14.2502 1.25L15.6644 2.66421ZM13.25 9.25098L21.25 1.25098L22.6642 2.66519L14.6642 10.6652L13.25 9.25098ZM12.6644 5.66421L9.66444 8.66421L8.25023 7.25L11.2502 4.25L12.6644 5.66421Z',
};

export const IconComet02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-stroke-rounded IconComet02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComet02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-duotone-rounded IconComet02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComet02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-twotone-rounded IconComet02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComet02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-solid-rounded IconComet02SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconComet02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-bulk-rounded IconComet02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconComet02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-stroke-sharp IconComet02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconComet02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comet-02-solid-sharp IconComet02SolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfComet02: TheIconSelfPack = {
  name: 'Comet02',
  StrokeRounded: IconComet02StrokeRounded,
  DuotoneRounded: IconComet02DuotoneRounded,
  TwotoneRounded: IconComet02TwotoneRounded,
  SolidRounded: IconComet02SolidRounded,
  BulkRounded: IconComet02BulkRounded,
  StrokeSharp: IconComet02StrokeSharp,
  SolidSharp: IconComet02SolidSharp,
};