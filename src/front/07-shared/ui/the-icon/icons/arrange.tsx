import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z',
  d2: 'M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z',
  d3: 'M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513',
  d4: 'M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z',
  d5: 'M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16',
  d6: 'M2.25 4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H6.5C7.74264 2.25 8.75 3.25736 8.75 4.5V6.5C8.75 7.74264 7.74264 8.75 6.5 8.75H4.5C3.25736 8.75 2.25 7.74264 2.25 6.5V4.5Z',
  d7: 'M2.25 17.5C2.25 16.2574 3.25736 15.25 4.5 15.25H6.5C7.74264 15.25 8.75 16.2574 8.75 17.5V19.5C8.75 20.7426 7.74264 21.75 6.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5V17.5Z',
  d8: 'M6.99977 5.5C6.99977 4.94772 7.44749 4.5 7.99977 4.5H15.9998C16.5521 4.5 16.9998 4.94772 16.9998 5.5C16.9998 6.05228 16.5521 6.5 15.9998 6.5H7.99977C7.44749 6.5 6.99977 6.05228 6.99977 5.5ZM17.0304 6.96938C17.4209 7.3599 17.4209 7.99307 17.0304 8.38359L8.35554 17.0584C7.96502 17.449 7.33186 17.449 6.94133 17.0584C6.55081 16.6679 6.55081 16.0348 6.94133 15.6442L15.6162 6.96938C16.0067 6.57886 16.6399 6.57886 17.0304 6.96938ZM6.99977 18.5C6.99977 17.9477 7.44749 17.5 7.99977 17.5H19.9998C20.5521 17.5 20.9998 17.9477 20.9998 18.5C20.9998 19.0523 20.5521 19.5 19.9998 19.5H7.99977C7.44749 19.5 6.99977 19.0523 6.99977 18.5Z',
  d9: 'M15.25 4.5C15.25 3.25736 16.2574 2.25 17.5 2.25H19.5C20.7426 2.25 21.75 3.25736 21.75 4.5V6.5C21.75 7.74264 20.7426 8.75 19.5 8.75H17.5C16.2574 8.75 15.25 7.74264 15.25 6.5V4.5Z',
  d10: 'M17.25 19.4988H8.75V17.4988H17.25V16.7247C17.2499 16.5876 17.2497 16.4117 17.2714 16.2648C17.2947 16.1068 17.3764 15.738 17.7561 15.5373C18.1358 15.3366 18.4866 15.4768 18.6302 15.5465C18.7638 15.6114 18.9091 15.7106 19.0223 15.7879L19.853 16.3542C20.3541 16.6957 20.7911 16.9935 21.0968 17.2667C21.4052 17.5422 21.75 17.9377 21.75 18.4988C21.75 19.0599 21.4052 19.4554 21.0968 19.7309C20.7911 20.0041 20.354 20.3019 19.853 20.6434L19.0223 21.2097C18.9091 21.287 18.7638 21.3862 18.6302 21.451C18.4866 21.5207 18.1358 21.661 17.7561 21.4603C17.3764 21.2596 17.2947 20.8908 17.2714 20.7328C17.2497 20.5859 17.2499 20.41 17.25 20.2729V19.4988Z',
  d11: 'M8.75032 6.5H15.2503V4.5H8.75032V6.5Z',
  d12: 'M15.3675 7.21843C15.5912 7.88305 16.117 8.40886 16.7816 8.63275L8.63308 16.7812C8.40919 16.1167 7.88338 15.5909 7.21875 15.3671L15.3675 7.21843Z',
  d13: 'M8.75032 19.5H20.0001C20.5524 19.5 21.0001 19.0523 21.0001 18.5C21.0001 17.9477 20.5524 17.5 20.0001 17.5H8.75032V19.5Z',
  d14: 'M16 8L16 3L21 3.00326L21 8H16Z',
  d15: 'M3 8L3 3L8 3.00326L8 8H3Z',
  d16: 'M3 21L3 16L8 16.0033L8 21H3Z',
  d17: 'M8.00023 18.5H20.0002M16.0002 5.5H8.00023M16.0002 8L8 16',
  d18: 'M17 21L20 18.5L17 16',
  d19: 'M15.4698 2.4695C15.6106 2.32883 15.8015 2.24987 16.0005 2.25L21.0005 2.25326C21.4145 2.25353 21.75 2.58923 21.75 3.00326L21.75 8C21.75 8.41421 21.4142 8.75 21 8.75H16C15.8011 8.75 15.6103 8.67098 15.4697 8.53033C15.329 8.38968 15.25 8.19891 15.25 8V3C15.25 2.801 15.3291 2.61016 15.4698 2.4695Z',
  d20: 'M2.25 2.24951L8.75 2.25374L8.75 8.75H2.25V2.24951Z',
  d21: 'M2.46984 15.4695C2.6106 15.3288 2.80149 15.2499 3.00049 15.25L8.00049 15.2533C8.41451 15.2535 8.75 15.5892 8.75 16.0033L8.75 21C8.75 21.4142 8.41421 21.75 8 21.75H3C2.80109 21.75 2.61032 21.671 2.46967 21.5303C2.32902 21.3897 2.25 21.1989 2.25 21V16C2.25 15.801 2.32908 15.6102 2.46984 15.4695Z',
  d22: 'M8.00029 6.5H16.0003V4.5H8.00029V6.5Z',
  d23: 'M15.2932 7.29288L7.29297 15.2929L8.70716 16.7071L16.7074 8.70712L15.2932 7.29288Z',
  d24: 'M17.4469 17.5L16.5469 16.7499L17.8272 15.2135L21.7491 18.4817L17.8272 21.7499L16.5469 20.2135L17.4031 19.5H8.00029V17.5H17.4469Z',
};

export const IconArrangeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-stroke-rounded IconArrangeStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconArrangeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-duotone-rounded IconArrangeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconArrangeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-twotone-rounded IconArrangeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconArrangeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-solid-rounded IconArrangeSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrangeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-bulk-rounded IconArrangeBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconArrangeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-stroke-sharp IconArrangeStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrangeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrange-solid-sharp IconArrangeSolidSharp"
    >
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrange: TheIconSelfPack = {
  name: 'Arrange',
  StrokeRounded: IconArrangeStrokeRounded,
  DuotoneRounded: IconArrangeDuotoneRounded,
  TwotoneRounded: IconArrangeTwotoneRounded,
  SolidRounded: IconArrangeSolidRounded,
  BulkRounded: IconArrangeBulkRounded,
  StrokeSharp: IconArrangeStrokeSharp,
  SolidSharp: IconArrangeSolidSharp,
};