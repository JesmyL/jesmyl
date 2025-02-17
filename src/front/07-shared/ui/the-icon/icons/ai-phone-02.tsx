import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.25 6.75L18 9L16 9M19.5 6.75C19.5 7.16421 19.8358 7.5 20.25 7.5C20.6642 7.5 21 7.16421 21 6.75C21 6.33579 20.6642 6 20.25 6C19.8358 6 19.5 6.33579 19.5 6.75Z',
  d2: 'M20.25 17.25L18 15L16 15M19.5 17.25C19.5 16.8358 19.8358 16.5 20.25 16.5C20.6642 16.5 21 16.8358 21 17.25C21 17.6642 20.6642 18 20.25 18C19.8358 18 19.5 17.6642 19.5 17.25Z',
  d3: 'M20.25 12L12 12M19.5 12C19.5 12.4142 19.8358 12.75 20.25 12.75C20.6642 12.75 21 12.4142 21 12C21 11.5858 20.6642 11.25 20.25 11.25C19.8358 11.25 19.5 11.5858 19.5 12Z',
  d4: 'M9.5 19H9.50898',
  d5: 'M16 6C15.9194 4.58055 15.6981 3.67665 15.091 3.02513C14.1357 2 12.5981 2 9.52312 2C6.44809 2 4.91058 2 3.95529 3.02513C3 4.05025 3 5.70017 3 9V15C3 18.2998 3 19.9497 3.95529 20.9749C4.91058 22 6.44809 22 9.52312 22C12.5981 22 14.1357 22 15.091 20.9749C15.6981 20.3233 15.9194 19.4194 16 18',
  d6: 'M3 8.99919V14.9996C3 18.2996 3 19.9496 3.9519 20.9748C4.9038 22 6.43588 22 9.5 22C12.5641 22 14.0962 22 15.0481 20.9748C16 19.9496 16 18.2996 16 14.9996V8C16 5.17157 16 3.75736 15.1213 2.87868C14.2426 2 12.8284 2 10 2H8.57143C6.11592 2.0104 4.80236 2.10801 3.9519 3.02395C3 4.04914 3 5.69916 3 8.99919Z',
  d7: 'M18.75 6.75C18.75 5.92157 19.4216 5.25 20.25 5.25C21.0784 5.25 21.75 5.92157 21.75 6.75C21.75 7.57843 21.0784 8.25 20.25 8.25C20.1156 8.25 19.9854 8.23233 19.8615 8.19919L18.5303 9.53033C18.3897 9.67098 18.1989 9.75 18 9.75L16 9.75C15.5858 9.75 15.25 9.41421 15.25 9C15.25 8.58579 15.5858 8.25 16 8.25L17.6893 8.25L18.8008 7.13853C18.7677 7.01461 18.75 6.88437 18.75 6.75Z',
  d8: 'M15.25 15C15.25 14.5858 15.5858 14.25 16 14.25L18 14.25C18.1989 14.25 18.3897 14.329 18.5303 14.4697L19.8615 15.8008C19.9854 15.7677 20.1156 15.75 20.25 15.75C21.0784 15.75 21.75 16.4216 21.75 17.25C21.75 18.0784 21.0784 18.75 20.25 18.75C19.4216 18.75 18.75 18.0784 18.75 17.25C18.75 17.1156 18.7677 16.9854 18.8008 16.8615L17.6893 15.75L16 15.75C15.5858 15.75 15.25 15.4142 15.25 15Z',
  d9: 'M18.9507 11.25C19.21 10.8016 19.6948 10.5 20.25 10.5C21.0784 10.5 21.75 11.1716 21.75 12C21.75 12.8284 21.0784 13.5 20.25 13.5C19.6948 13.5 19.21 13.1984 18.9507 12.75L12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25L18.9507 11.25Z',
  d10: 'M13.209 1.38583C12.2673 1.24996 11.0695 1.24998 9.58197 1.25H9.58196C8.09443 1.24998 6.77894 1.24996 5.83721 1.38583C4.85577 1.52743 4.04413 1.82967 3.4066 2.51382C2.77606 3.19045 2.50391 4.03925 2.37523 5.06631C2.24997 6.06606 2.24999 7.34213 2.25 8.94758V8.94759V15.0524V15.0524C2.24999 16.6579 2.24997 17.9339 2.37523 18.9337C2.50391 19.9608 2.77606 20.8095 3.4066 21.4862C4.04413 22.1703 4.85577 22.4726 5.83721 22.6142C6.77893 22.75 7.97674 22.75 9.46423 22.75H9.46426H9.46428H9.58194H9.58197H9.58199C11.0695 22.75 12.2673 22.75 13.209 22.6142C14.1905 22.4726 15.0021 22.1703 15.6396 21.4862C16.4385 20.629 16.6666 19.4888 16.7488 18.0425L16.75 18.0213V17.25H16C14.7574 17.25 13.75 16.2426 13.75 15C13.75 14.737 13.7951 14.4846 13.878 14.25H12C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75H13.878C13.7951 9.51542 13.75 9.26298 13.75 9C13.75 7.75736 14.7574 6.75 16 6.75H16.75V5.97871L16.7488 5.95746C16.6666 4.51125 16.4385 3.37103 15.6396 2.51382C15.0021 1.82967 14.1905 1.52743 13.209 1.38583ZM9.5 18C8.94772 18 8.5 18.4477 8.5 19C8.5 19.5523 8.94772 20 9.5 20H9.50898C10.0613 20 10.509 19.5523 10.509 19C10.509 18.4477 10.0613 18 9.50898 18H9.5Z',
  d11: 'M9.58197 1.25C11.0695 1.24998 12.2673 1.24996 13.209 1.38583C14.1905 1.52743 15.0021 1.82967 15.6396 2.51382C16.4385 3.37103 16.6666 4.51125 16.7488 5.95746L16.75 5.97871V6.75H16C14.7574 6.75 13.75 7.75736 13.75 9C13.75 9.26298 13.7951 9.51542 13.878 9.75H12C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25H13.878C13.7951 14.4846 13.75 14.737 13.75 15C13.75 16.2426 14.7574 17.25 16 17.25H16.75V18.0213L16.7488 18.0425C16.6666 19.4888 16.4385 20.629 15.6396 21.4862C15.0021 22.1703 14.1905 22.4726 13.209 22.6142C12.2673 22.75 11.0695 22.75 9.58197 22.75H9.58194H9.46428H9.46426C7.97675 22.75 6.77893 22.75 5.83721 22.6142C4.85577 22.4726 4.04413 22.1703 3.4066 21.4862C2.77606 20.8095 2.50391 19.9608 2.37523 18.9337C2.24997 17.9339 2.24999 16.6579 2.25 15.0524V15.0524V8.94759V8.94758C2.24999 7.34213 2.24997 6.06606 2.37523 5.06631C2.50391 4.03925 2.77606 3.19045 3.4066 2.51382C4.04413 1.82967 4.85577 1.52743 5.83721 1.38583C6.77894 1.24996 8.09443 1.24998 9.58196 1.25H9.58197Z',
  d12: 'M8.5 19C8.5 18.4477 8.94772 18 9.5 18H9.50898C10.0613 18 10.509 18.4477 10.509 19C10.509 19.5523 10.0613 20 9.50898 20H9.5C8.94772 20 8.5 19.5523 8.5 19Z',
  d13: 'M16 18V22H3V2H16V6',
  d14: 'M20.25 6.75L18 9L15 9M19.5 6.75C19.5 7.16421 19.8358 7.5 20.25 7.5C20.6642 7.5 21 7.16421 21 6.75C21 6.33579 20.6642 6 20.25 6C19.8358 6 19.5 6.33579 19.5 6.75Z',
  d15: 'M20.25 17.25L18 15L15 15M19.5 17.25C19.5 16.8358 19.8358 16.5 20.25 16.5C20.6642 16.5 21 16.8358 21 17.25C21 17.6642 20.6642 18 20.25 18C19.8358 18 19.5 17.6642 19.5 17.25Z',
  d16: 'M18.75 6.75C18.75 5.92157 19.4216 5.25 20.25 5.25C21.0784 5.25 21.75 5.92157 21.75 6.75C21.75 7.57843 21.0784 8.25 20.25 8.25C20.1156 8.25 19.9854 8.23233 19.8615 8.19919L18.5303 9.53033C18.3897 9.67098 18.1989 9.75 18 9.75L15 9.75L15 8.25L17.6893 8.25L18.8008 7.13853C18.7677 7.01461 18.75 6.88437 18.75 6.75Z',
  d17: 'M15 14.25L18 14.25C18.1989 14.25 18.3897 14.329 18.5303 14.4697L19.8615 15.8008C19.9854 15.7677 20.1156 15.75 20.25 15.75C21.0784 15.75 21.75 16.4216 21.75 17.25C21.75 18.0784 21.0784 18.75 20.25 18.75C19.4216 18.75 18.75 18.0784 18.75 17.25C18.75 17.1156 18.7677 16.9854 18.8008 16.8615L17.6893 15.75L15 15.75L15 14.25Z',
  d18: 'M18.9507 11.25C19.21 10.8016 19.6948 10.5 20.25 10.5C21.0784 10.5 21.75 11.1716 21.75 12C21.75 12.8284 21.0784 13.5 20.25 13.5C19.6948 13.5 19.21 13.1984 18.9507 12.75L12 12.75L12 11.25L18.9507 11.25Z',
  d19: 'M16.75 1.25V6.75H13.5V9.75H10.5V14.25H13.5V17.25H16.75V22.7502H2.25V1.25022L16.75 1.25ZM10.509 18H8.5V20H10.509V18Z',
};

export const IconAiPhone02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-stroke-rounded IconAiPhone02StrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-duotone-rounded IconAiPhone02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-twotone-rounded IconAiPhone02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-solid-rounded IconAiPhone02SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-bulk-rounded IconAiPhone02BulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-stroke-sharp IconAiPhone02StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiPhone02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-phone-02-solid-sharp IconAiPhone02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAiPhone02: TheIconSelfPack = {
  name: 'AiPhone02',
  StrokeRounded: IconAiPhone02StrokeRounded,
  DuotoneRounded: IconAiPhone02DuotoneRounded,
  TwotoneRounded: IconAiPhone02TwotoneRounded,
  SolidRounded: IconAiPhone02SolidRounded,
  BulkRounded: IconAiPhone02BulkRounded,
  StrokeSharp: IconAiPhone02StrokeSharp,
  SolidSharp: IconAiPhone02SolidSharp,
};