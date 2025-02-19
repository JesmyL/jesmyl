import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.2532 19.9167C19.8129 18.2147 21.5 15.3044 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C11.2744 2.5 10.5678 2.58134 9.88889 2.73541M17.2532 19.9167V17M17.2532 19.9167H20.5M6.72222 4.09975C4.17625 5.80396 2.5 8.70623 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C12.7256 21.5 13.4322 21.4187 14.1111 21.2646M6.72222 4.09975V7M6.72222 4.09975H3.5',
  d2: 'M12 16C13.933 16 15.5 14.433 15.5 12.5C15.5 10 12 7 12 7C12 7 8.5 10 8.5 12.5C8.5 14.433 10.067 16 12 16Z',
  d3: 'M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM15.5 12.5C15.5 14.433 13.933 16 12 16C10.067 16 8.5 14.433 8.5 12.5C8.5 10 12 7 12 7C12 7 15.5 10 15.5 12.5Z',
  d4: 'M12 3.5C11.3494 3.5 10.717 3.57292 10.1102 3.71062C9.57158 3.83283 9.03589 3.49529 8.91368 2.95669C8.79147 2.4181 9.12901 1.88241 9.6676 1.7602C10.4187 1.58977 11.1995 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 14.6497 21.5181 17.0699 19.9 18.9167H20.5C21.0523 18.9167 21.5 19.3644 21.5 19.9167C21.5 20.469 21.0523 20.9167 20.5 20.9167H17.2532C16.7009 20.9167 16.2532 20.469 16.2532 19.9167V17C16.2532 16.4477 16.7009 16 17.2532 16C17.8055 16 18.2532 16.4477 18.2532 17V17.7576C19.6489 16.2427 20.5 14.2206 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2.5 4.09975C2.5 3.54746 2.94772 3.09975 3.5 3.09975H6.72222C7.27451 3.09975 7.72222 3.54746 7.72222 4.09975V7C7.72222 7.55228 7.27451 8 6.72222 8C6.16994 8 5.72222 7.55228 5.72222 7V6.26917C4.34108 7.7811 3.5 9.79244 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C12.6506 20.5 13.283 20.4271 13.8898 20.2894C14.4284 20.1672 14.9641 20.5047 15.0863 21.0433C15.2085 21.5819 14.871 22.1176 14.3324 22.2398C13.5813 22.4102 12.8005 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 9.35812 2.47614 6.94444 4.08565 5.09975H3.5C2.94772 5.09975 2.5 4.65203 2.5 4.09975Z',
  d5: 'M11.5119 6.43056C11.7928 6.18981 12.2072 6.18981 12.4881 6.43056L12.4943 6.43619C12.6017 6.53375 12.9029 6.80722 13.0708 6.97113C13.4124 7.3046 13.8696 7.77796 14.3289 8.33572C14.7864 8.89125 15.2584 9.54542 15.6189 10.2407C15.9761 10.9295 16.25 11.7084 16.25 12.5C16.25 14.8472 14.3472 16.75 12 16.75C9.65279 16.75 7.75 14.8472 7.75 12.5C7.75 11.7084 8.02392 10.9295 8.38106 10.2407C8.74157 9.54542 9.21355 8.89125 9.67105 8.33572C10.1304 7.77796 10.5876 7.3046 10.9292 6.97113C11.0971 6.80724 11.3982 6.53382 11.5057 6.43623L11.5119 6.43056Z',
  d6: 'M17.2532 17V19.9167H20.5M6.72222 7V4.09975H3.5M9.88889 2.73541C10.5678 2.58134 11.2744 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 15.0381 20.0739 17.7431 17.8546 19.4821M14.1111 21.2646C13.4322 21.4187 12.7256 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 8.90507 3.97997 6.15581 6.27081 4.42132',
  d7: 'M12 3.5C11.3494 3.5 10.717 3.57292 10.1102 3.71062L9.6676 1.7602C10.4187 1.58977 11.1995 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 14.6497 21.5181 17.0699 19.9 18.9167H21.5V20.9167H16.2532V16H18.2532V17.7576C19.6489 16.2427 20.5 14.2206 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z',
  d8: 'M7.72222 8H5.72222V6.26917C4.34108 7.7811 3.5 9.79244 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C12.6506 20.5 13.283 20.4271 13.8898 20.2894L14.3324 22.2398C13.5813 22.4102 12.8005 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 9.35812 2.47614 6.94444 4.08565 5.09975H2.5V3.09975H7.72222V8Z',
  d9: 'M12 5.68292C12.1035 5.77691 13.0718 6.62271 13.2454 6.79224C13.5915 7.13009 14.0553 7.6102 14.5219 8.17679C14.9861 8.74042 15.4696 9.40952 15.8409 10.1256C16.2077 10.833 16.5 11.6529 16.5 12.5C16.5 14.9853 14.4853 17 12 17C9.51472 17 7.5 14.9853 7.5 12.5C7.5 11.6529 7.79231 10.833 8.15912 10.1256C8.53043 9.40952 9.0139 8.74042 9.47807 8.17679C9.94468 7.6102 10.4085 7.13009 10.7546 6.79224C10.9282 6.62271 11.8965 5.77691 12 5.68292Z',
};

export const IconWaterEnergyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-stroke-rounded IconWaterEnergyStrokeRounded"
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

export const IconWaterEnergyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-duotone-rounded IconWaterEnergyDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
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

export const IconWaterEnergyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-twotone-rounded IconWaterEnergyTwotoneRounded"
    >
      <path 
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

export const IconWaterEnergySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-solid-rounded IconWaterEnergySolidRounded"
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

export const IconWaterEnergyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-bulk-rounded IconWaterEnergyBulkRounded"
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

export const IconWaterEnergyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-stroke-sharp IconWaterEnergyStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterEnergySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-energy-solid-sharp IconWaterEnergySolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWaterEnergy: TheIconSelfPack = {
  name: 'WaterEnergy',
  StrokeRounded: IconWaterEnergyStrokeRounded,
  DuotoneRounded: IconWaterEnergyDuotoneRounded,
  TwotoneRounded: IconWaterEnergyTwotoneRounded,
  SolidRounded: IconWaterEnergySolidRounded,
  BulkRounded: IconWaterEnergyBulkRounded,
  StrokeSharp: IconWaterEnergyStrokeSharp,
  SolidSharp: IconWaterEnergySolidSharp,
};