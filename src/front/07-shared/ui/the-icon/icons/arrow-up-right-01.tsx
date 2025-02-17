import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 7L6 18',
  d2: 'M11 6.13151C11 6.13151 16.6335 5.65662 17.4885 6.51153C18.3434 7.36645 17.8684 13 17.8684 13',
  d3: 'M11.0523 6.06958C11.8995 6.05914 16.9863 5.78975 17.5801 6.38666M17.5801 6.38666C18.1738 6.98356 17.9684 12.16 17.9547 13.0084M17.5801 6.38666L6 18',
  d4: 'M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z',
  d5: 'M17.2444 5.28982C17.5251 5.37173 17.9065 5.51534 18.1956 5.80444C18.4847 6.09355 18.6284 6.47497 18.7103 6.75566C18.8008 7.06599 18.8606 7.41701 18.9018 7.77008C18.9846 8.4788 19.0051 9.31068 18.9991 10.0842C18.993 10.8637 18.9594 11.6122 18.9277 12.1639C18.9118 12.4403 18.8962 12.6688 18.8846 12.8288C18.8788 12.908 18.8686 13.0376 18.8651 13.0822L18.865 13.0834C18.8186 13.6338 18.3348 14.0429 17.7845 13.9965C17.2342 13.9501 16.8257 13.4664 16.872 12.9161C16.8751 12.8765 16.8844 12.7595 16.8899 12.6838C16.9009 12.5323 16.9157 12.314 16.931 12.0489C16.9616 11.5176 16.9934 10.8042 16.9991 10.0685C17.0049 9.32682 16.984 8.59001 16.9153 8.002C16.8808 7.7067 16.8116 7.39695 16.7645 7.23556C16.6031 7.18846 16.2934 7.11924 15.9981 7.08476C15.41 7.01611 14.6732 6.99512 13.9315 7.00092C13.1958 7.00668 12.4825 7.03846 11.9511 7.06904C11.686 7.0843 11.4677 7.09917 11.3163 7.11017C11.2406 7.11567 11.124 7.12485 11.0844 7.12797C10.5341 7.17431 10.05 6.76584 10.0036 6.21554C9.9572 5.6652 10.3657 5.18146 10.9161 5.13507L10.9183 5.13489C10.9639 5.1313 11.0926 5.12115 11.1713 5.11543C11.3313 5.1038 11.5598 5.08825 11.8362 5.07234C12.3878 5.0406 13.1363 5.00709 13.9159 5.00099C14.6894 4.99493 15.5213 5.01551 16.23 5.09826C16.5831 5.13948 16.9341 5.19925 17.2444 5.28982Z',
  d6: 'M11.0053 6L18 6.00024L18 12.962M6 18L17.7111 6.28912',
  d7: 'M15.586 7H11.0001V5H19.0001V13H17.0001V8.41432L6.41421 19.0002L5 17.586L15.586 7Z',
};

export const IconArrowUpRight01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-stroke-rounded IconArrowUpRight01StrokeRounded"
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

export const IconArrowUpRight01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-duotone-rounded IconArrowUpRight01DuotoneRounded"
    >
      <path 
        opacity="0.5" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUpRight01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-twotone-rounded IconArrowUpRight01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconArrowUpRight01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-solid-rounded IconArrowUpRight01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconArrowUpRight01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-bulk-rounded IconArrowUpRight01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconArrowUpRight01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-stroke-sharp IconArrowUpRight01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUpRight01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-right-01-solid-sharp IconArrowUpRight01SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUpRight01: TheIconSelfPack = {
  name: 'ArrowUpRight01',
  StrokeRounded: IconArrowUpRight01StrokeRounded,
  DuotoneRounded: IconArrowUpRight01DuotoneRounded,
  TwotoneRounded: IconArrowUpRight01TwotoneRounded,
  SolidRounded: IconArrowUpRight01SolidRounded,
  BulkRounded: IconArrowUpRight01BulkRounded,
  StrokeSharp: IconArrowUpRight01StrokeSharp,
  SolidSharp: IconArrowUpRight01SolidSharp,
};