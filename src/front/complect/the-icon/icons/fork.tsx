import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 5L15.5 8.5M13.5 6.5L17.5 10.5',
  d2: 'M22 6.68722L17.7971 10.8898C16.9852 11.7016 15.8891 12.1657 14.741 12.1836L14.3982 12.1889C13.7949 12.1983 13.2213 12.4527 12.8093 12.8935L4.77175 21.4921C4.15326 22.1537 3.10957 22.1713 2.46911 21.5309C1.82872 20.8906 1.84625 19.8471 2.50778 19.2287L11.106 11.1901C11.5467 10.7781 11.8009 10.2047 11.8103 9.60146L11.8157 9.25855C11.8335 8.11046 12.2976 7.01438 13.1096 6.20246L17.3124 2',
  d3: 'M15.5 8.50067L13.1096 6.20312C12.2976 7.01505 11.8335 8.11112 11.8157 9.25922L11.8103 9.60213C11.8009 10.2053 11.5467 10.7788 11.106 11.1908L2.50778 19.2293C1.84625 19.8478 1.82872 20.8913 2.46911 21.5316C3.10957 22.172 4.15326 22.1544 4.77175 21.4927L12.8093 12.8941C13.2213 12.4533 13.7949 12.199 14.3982 12.1896L14.741 12.1843C15.8891 12.1663 16.9852 11.7023 17.7971 10.8904L15.5 8.50067Z',
  d4: 'M19 5L15.5 8.5',
  d5: 'M13.5 6.5L17.5 10.5',
  d6: 'M17.5195 1.79293C17.91 2.18348 17.91 2.81664 17.5195 3.20715L15.5352 5.1912C15.2784 5.44793 15.2784 5.86419 15.5351 6.12093C15.7919 6.37767 16.2081 6.37767 16.4649 6.12093L18.7929 3.79289C19.1834 3.40237 19.8166 3.40237 20.2071 3.79289C20.5976 4.18342 20.5976 4.81658 20.2071 5.20711L17.8789 7.53536C17.6222 7.79197 17.6222 8.20803 17.8789 8.46464C18.1355 8.72125 18.5515 8.72126 18.8081 8.46467L20.7929 6.48007C21.1835 6.08957 21.8166 6.08961 22.2071 6.48015C22.5976 6.8707 22.5976 7.50386 22.2071 7.89437L19.0042 11.0969C18.0085 12.0925 16.6644 12.6615 15.2566 12.6835L14.9138 12.6888C14.5819 12.694 14.2664 12.8339 14.0398 13.0763L6.00229 21.6749C4.99765 22.7497 3.30237 22.7783 2.26203 21.7381C1.22177 20.6979 1.25025 19.0028 2.32485 17.9982L10.9231 9.95965C11.1655 9.73304 11.3053 9.41764 11.3104 9.08591L11.3158 8.743C11.3377 7.33508 11.9068 5.99097 12.9025 4.99532L16.1053 1.79285C16.4959 1.40235 17.129 1.40239 17.5195 1.79293Z',
  d7: 'M17.5195 1.79293C17.91 2.18348 17.91 2.81664 17.5195 3.20715L15.5352 5.1912C15.2784 5.44793 15.2784 5.86419 15.5351 6.12093C15.7919 6.37767 16.2081 6.37767 16.4649 6.12093L18.7929 3.79289C19.1834 3.40237 19.8166 3.40237 20.2071 3.79289C20.5976 4.18342 20.5976 4.81658 20.2071 5.20711L17.8789 7.53536C17.6222 7.79197 17.6222 8.20803 17.8789 8.46464C18.1355 8.72125 18.5515 8.72126 18.8081 8.46467L20.7929 6.48007C21.1835 6.08957 21.8166 6.08961 22.2071 6.48015C22.5976 6.8707 22.5976 7.50386 22.2071 7.89437L19.0042 11.0969C18.0085 12.0925 16.6644 12.6615 15.2566 12.6835C14.8027 12.6905 14.374 12.7189 14.0398 13.0763L6.00229 21.6749C4.99765 22.7497 3.30237 22.7783 2.26203 21.7381C1.22177 20.6979 1.25025 19.0028 2.32485 17.9982L10.9231 9.95965C11.2805 9.62551 11.3087 9.19687 11.3158 8.743C11.3377 7.33508 11.9068 5.99097 12.9025 4.99532L16.1053 1.79285C16.4959 1.40235 17.129 1.40239 17.5195 1.79293Z',
  d8: 'M17.5203 1.79293C17.9108 2.18348 17.9107 2.81664 17.5202 3.20715L15.5359 5.1912C15.2792 5.44793 15.2792 5.86419 15.5359 6.12093C15.7926 6.37767 16.2089 6.37767 16.4656 6.12093L18.7936 3.79289C19.1842 3.40237 19.8173 3.40237 20.2079 3.79289C20.5984 4.18342 20.5984 4.81658 20.2079 5.20711L17.8796 7.53536C17.623 7.79197 17.623 8.20803 17.8796 8.46464C18.1362 8.72125 18.5523 8.72126 18.8089 8.46467L20.7937 6.48007C21.1842 6.08957 21.8174 6.08961 22.2079 6.48015C22.5984 6.8707 22.5984 7.50386 22.2078 7.89437L19.0049 11.0969C18.0093 12.0925 16.6652 12.6615 15.2573 12.6835C14.8034 12.6905 14.3747 12.7189 14.0406 13.0763L10.9238 9.95965C11.2812 9.62551 11.3095 9.19687 11.3165 8.743C11.3384 7.33508 11.9075 5.99097 12.9032 4.99532L16.1061 1.79285C16.4966 1.40235 17.1298 1.40239 17.5203 1.79293Z',
  d9: 'M19.5 4.5L15.5 8.5M13.5 6.5L17.5 10.5',
  d10: 'M22 6.68722L17.7971 10.8898C16.9852 11.7016 15.8891 12.1657 14.741 12.1836H13.5L4.77175 21.4921C4.15326 22.1537 3.10957 22.1713 2.46911 21.5309C1.82872 20.8906 1.84625 19.8471 2.50778 19.2287L11.8157 10.5V9.25855C11.8335 8.11046 12.2976 7.01438 13.1096 6.20246L17.3124 2',
  d11: 'M18.1052 2.65079L14.5397 6.12743L15.4981 7.08586L18.791 3.79297L20.2052 5.20718L16.9123 8.50008L17.826 9.4137L21.3474 5.89252L22.7481 7.2933L18.5853 11.4558C17.5991 12.4419 16.2679 13.0054 14.8734 13.0272L14.858 13.0273H14.0579L5.70739 21.9329C4.71231 22.9972 3.03315 23.0257 2.00281 21.9954C0.972679 20.9654 1.00067 19.287 2.0644 18.2918L10.9701 9.60807V9.13972L10.9702 9.12432C10.9919 7.72982 11.5556 6.39853 12.5418 5.41238L16.7045 1.25L18.1052 2.65079Z',
};

export const IconForkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-stroke-rounded IconForkStrokeRounded"
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

export const IconForkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-duotone-rounded IconForkDuotoneRounded"
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

export const IconForkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-twotone-rounded IconForkTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconForkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-solid-rounded IconForkSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-bulk-rounded IconForkBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconForkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-stroke-sharp IconForkStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconForkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fork-solid-sharp IconForkSolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFork: TheIconSelfPack = {
  name: 'Fork',
  StrokeRounded: IconForkStrokeRounded,
  DuotoneRounded: IconForkDuotoneRounded,
  TwotoneRounded: IconForkTwotoneRounded,
  SolidRounded: IconForkSolidRounded,
  BulkRounded: IconForkBulkRounded,
  StrokeSharp: IconForkStrokeSharp,
  SolidSharp: IconForkSolidSharp,
};