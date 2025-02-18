import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 4.8H9C10.6569 4.8 12 6.41177 12 8.4C12 10.3882 10.6569 12 9 12M9 12C10.6569 12 12 13.6118 12 15.6C12 17.5882 10.6569 19.2 9 19.2H2M9 12H3M2.83333 4.8V19.2M4.5 3V4.8M8.66667 3V4.8M4.5 19.2V21M8.66667 19.2V21',
  d2: 'M22 12H14.5M22 12C22 12.7002 20.0057 14.0085 19.5 14.5M22 12C22 11.2998 20.0057 9.99153 19.5 9.5',
  d3: 'M9 4.79688H2.83333V19.1969H9C10.6569 19.1969 12 17.5851 12 15.5969C12 13.6086 10.6569 11.9969 9 11.9969C10.6569 11.9969 12 10.3851 12 8.39687C12 6.40865 10.6569 4.79688 9 4.79688Z',
  d4: 'M2 4.7998H9C10.6569 4.7998 12 6.41158 12 8.3998C12 10.388 10.6569 11.9998 9 11.9998M9 11.9998C10.6569 11.9998 12 13.6116 12 15.5998C12 17.588 10.6569 19.1998 9 19.1998H2M9 11.9998H3M2.83333 4.7998V19.1998',
  d5: 'M4.5 3V4.8M8.66667 3V4.8M4.5 19.2V21M8.66667 19.2V21',
  d6: 'M4.5 2C5.05228 2 5.5 2.44772 5.5 3V3.8H7.66667V3C7.66667 2.44772 8.11438 2 8.66667 2C9.21895 2 9.66667 2.44772 9.66667 3V3.8609C11.6718 4.23411 13 6.26643 13 8.4C13 9.78455 12.4407 11.1265 11.5 12C12.4407 12.8735 13 14.2155 13 15.6C13 17.7336 11.6718 19.7659 9.66667 20.1391V21C9.66667 21.5523 9.21895 22 8.66667 22C8.11438 22 7.66667 21.5523 7.66667 21V20.2H5.5V21C5.5 21.5523 5.05228 22 4.5 22C3.94772 22 3.5 21.5523 3.5 21V20.2H2C1.44772 20.2 1 19.7523 1 19.2C1 18.7045 1.36038 18.2932 1.83333 18.2138V5.78617C1.36038 5.70683 1 5.2955 1 4.8C1 4.24772 1.44772 3.8 2 3.8H3.5V3C3.5 2.44772 3.94772 2 4.5 2ZM3.83333 5.8V11H9C9.9416 11 11 10.0144 11 8.4C11 6.7856 9.9416 5.8 9 5.8H3.83333ZM9 13H3.83333V18.2H9C9.9416 18.2 11 17.2144 11 15.6C11 13.9856 9.9416 13 9 13Z',
  d7: 'M15 10.9941C14.4477 10.9941 14 11.4419 14 11.9941C14 12.5464 14.4477 12.9941 15 12.9941L18.5 12.9941L18.5 13.5884C18.4999 13.764 18.4997 13.9797 18.5218 14.1561L18.5222 14.1595C18.538 14.2859 18.6098 14.862 19.1754 15.1363C19.7423 15.4113 20.2424 15.1093 20.3506 15.044L20.3546 15.0416C20.5076 14.9494 20.6785 14.8152 20.8191 14.7049L20.8493 14.6812C21.2252 14.3865 21.7094 14.0046 22.1004 13.6241C22.2955 13.4343 22.4967 13.217 22.6556 12.9861C22.7968 12.7809 23 12.4307 23 12C23 11.5693 22.7968 11.2191 22.6556 11.0139C22.4967 10.783 22.2955 10.5657 22.1004 10.3759C21.7094 9.99545 21.2252 9.61348 20.8493 9.31885L20.8191 9.29512C20.6785 9.18477 20.5077 9.05062 20.3546 8.95841L20.3506 8.95597C20.2424 8.89065 19.7422 8.58872 19.1754 8.86368C18.6098 9.13804 18.538 9.71408 18.5222 9.84053L18.5218 9.84387C18.4997 10.0203 18.4999 10.236 18.5 10.4116L18.5 10.9941L15 10.9941Z',
  d8: 'M1 4.80078C1 4.2485 1.44772 3.80078 2 3.80078H9C11.3721 3.80078 13 6.03873 13 8.40078C13 9.78533 12.4407 11.1272 11.5 12.0008C12.4407 12.8743 13 14.2162 13 15.6008C13 17.9628 11.3721 20.2008 9 20.2008H2C1.44772 20.2008 1 19.7531 1 19.2008C1 18.7053 1.36038 18.294 1.83333 18.2146V5.78695C1.36038 5.70761 1 5.29628 1 4.80078ZM3.83333 5.80078V11.0008H9C9.9416 11.0008 11 10.0152 11 8.40078C11 6.78638 9.9416 5.80078 9 5.80078H3.83333ZM9 13.0008H3.83333V18.2008H9C9.9416 18.2008 11 17.2152 11 15.6008C11 13.9864 9.9416 13.0008 9 13.0008Z',
  d9: 'M5.5 3C5.5 2.44772 5.05228 2 4.5 2C3.94772 2 3.5 2.44772 3.5 3V3.7998H5.5V3Z',
  d10: 'M4.51996 5.7998H4.48004C4.48668 5.79993 4.49333 5.8 4.5 5.8C4.50667 5.8 4.51332 5.79993 4.51996 5.7998Z',
  d11: 'M8.68663 5.7998C8.67999 5.79993 8.67334 5.8 8.66667 5.8C8.66 5.8 8.65334 5.79993 8.6467 5.7998H8.68663Z',
  d12: 'M9.66667 3.86071C9.45194 3.82074 9.22945 3.7998 9 3.7998H7.66667V3C7.66667 2.44772 8.11438 2 8.66667 2C9.21895 2 9.66667 2.44772 9.66667 3V3.86071Z',
  d13: 'M7.66667 20.1998H9C9.22945 20.1998 9.45194 20.1789 9.66667 20.1389V21C9.66667 21.5523 9.21895 22 8.66667 22C8.11438 22 7.66667 21.5523 7.66667 21V20.1998Z',
  d14: 'M3.5 20.1998H5.5V21C5.5 21.5523 5.05228 22 4.5 22C3.94772 22 3.5 21.5523 3.5 21V20.1998Z',
  d15: 'M2 4.8H9.27273C10.779 4.8 12 6.41177 12 8.4C12 10.3882 10.779 12 9.27273 12M9.27273 12C10.779 12 12 13.6118 12 15.6C12 17.5882 10.779 19.2 9.27273 19.2H2M9.27273 12H3.81818M3.66667 4.8V19.2M5.18182 3V4.8M8.9697 3V4.8M5.18182 19.2V21M8.9697 19.2V21',
  d16: 'M14.5 12L22.0291 12M19.5 15L22.5 12L19.5 9',
  d17: 'M3.18182 3.8V3H5.18182V3.8H6.9697V3H8.9697V3.87883C9.79784 4.06926 10.4963 4.58791 10.9983 5.25056C11.6352 6.09126 12 7.20808 12 8.4C12 9.59192 11.6352 10.7087 10.9983 11.5494C10.8776 11.7088 10.7455 11.8599 10.6029 12C10.7455 12.1401 10.8776 12.2912 10.9983 12.4506C11.6352 13.2913 12 14.4081 12 15.6C12 16.7919 11.6352 17.9087 10.9983 18.7494C10.4963 19.4121 9.79784 19.9307 8.9697 20.1212V21H6.9697V20.2H5.18182V21H3.18182V20.2H1V18.2H1.66667V5.8H1V3.8H3.18182ZM3.66667 5.8V11H8.27273C8.64483 11 9.05442 10.8033 9.40411 10.3417C9.75429 9.87949 10 9.1963 10 8.4C10 7.6037 9.75429 6.92051 9.40411 6.45827C9.05442 5.99668 8.64483 5.8 8.27273 5.8H3.66667ZM8.27273 13H3.66667V18.2H8.27273C8.64483 18.2 9.05442 18.0033 9.40411 17.5417C9.75429 17.0795 10 16.3963 10 15.6C10 14.8037 9.75429 14.1205 9.40411 13.6583C9.05442 13.1967 8.64483 13 8.27273 13Z',
  d18: 'M19.1713 11.0001L17.8784 9.70718L19.2926 8.29297L22.9998 12.0001L19.2926 15.7072L17.8784 14.293L19.1713 13.0001L13.5855 13.0001V11.0001L19.1713 11.0001Z',
};

export const IconBitcoinSendStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-stroke-rounded IconBitcoinSendStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSendDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-duotone-rounded IconBitcoinSendDuotoneRounded"
    >
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSendTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-twotone-rounded IconBitcoinSendTwotoneRounded"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSendSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-solid-rounded IconBitcoinSendSolidRounded"
    >
      <path 
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

export const IconBitcoinSendBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-bulk-rounded IconBitcoinSendBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSendStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-stroke-sharp IconBitcoinSendStrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinSendSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-send-solid-sharp IconBitcoinSendSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinSend: TheIconSelfPack = {
  name: 'BitcoinSend',
  StrokeRounded: IconBitcoinSendStrokeRounded,
  DuotoneRounded: IconBitcoinSendDuotoneRounded,
  TwotoneRounded: IconBitcoinSendTwotoneRounded,
  SolidRounded: IconBitcoinSendSolidRounded,
  BulkRounded: IconBitcoinSendBulkRounded,
  StrokeSharp: IconBitcoinSendStrokeSharp,
  SolidSharp: IconBitcoinSendSolidSharp,
};