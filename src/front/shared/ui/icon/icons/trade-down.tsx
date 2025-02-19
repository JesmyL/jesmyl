import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 11V16H15',
  d2: 'M20 16L15 11C14.1174 10.1174 13.6762 9.67615 13.1346 9.62737C13.045 9.6193 12.955 9.6193 12.8654 9.62737C12.3238 9.67615 11.8826 10.1174 11 11C10.1174 11.8826 9.67615 12.3238 9.13457 12.3726C9.04504 12.3807 8.95496 12.3807 8.86543 12.3726C8.32385 12.3238 7.88256 11.8826 7 11L4 8',
  d3: 'M14 16C14 16.5523 14.4477 17 15 17H20C20.5523 17 21 16.5523 21 16V11C21 10.4477 20.5523 10 20 10C19.4477 10 19 10.4477 19 11V15H15C14.4477 15 14 15.4477 14 16Z',
  d4: 'M20.7071 16.7071C21.0976 16.3166 21.0976 15.6834 20.7071 15.2929L15.6688 10.2546C15.2605 9.84617 14.8934 9.47901 14.5576 9.21495C14.1934 8.92859 13.7659 8.68019 13.2243 8.6314C13.0751 8.61796 12.9249 8.61796 12.7757 8.6314C12.2341 8.68019 11.8066 8.92859 11.4424 9.21495C11.1066 9.47902 10.7395 9.84619 10.3312 10.2546C9.87234 10.7134 9.55169 11.0317 9.32128 11.2129C9.06256 11.4394 8.78511 11.3073 8.67872 11.2129C8.44831 11.0317 8.16593 10.7517 7.70711 10.2929L4.70711 7.29289C4.31658 6.90237 3.68342 6.90237 3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L6.33116 11.7454C6.73952 12.1538 7.10664 12.521 7.44245 12.7851C7.8066 13.0714 8.23411 13.3198 8.77572 13.3686C8.92494 13.382 9.07506 13.382 9.22428 13.3686C9.76589 13.3198 10.1934 13.0714 10.5576 12.7851C10.8934 12.521 11.2605 12.1538 11.6688 11.7454C12.1277 11.2866 12.4483 10.9683 12.6787 10.7871C12.7902 10.6975 13.0748 10.5721 13.3213 10.7871C13.5517 10.9683 13.8341 11.2483 14.2929 11.7071L19.2929 16.7071C19.6834 17.0976 20.3166 17.0976 20.7071 16.7071Z',
  d5: 'M19.5 15.5L13 9L9 13L4 8',
  d6: 'M21 10V17H14V15H19V10H21Z',
  d7: 'M4.41373 6.99951L8.99997 11.5858L13 7.58575L20.9142 15.5L19.5 16.9142L13 10.4142L8.99997 14.4142L2.99951 8.41373L4.41373 6.99951Z',
};

export const IconTradeDownStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-stroke-rounded IconTradeDownStrokeRounded"
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

export const IconTradeDownDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-duotone-rounded IconTradeDownDuotoneRounded"
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

export const IconTradeDownTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-twotone-rounded IconTradeDownTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconTradeDownSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-solid-rounded IconTradeDownSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeDownBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-bulk-rounded IconTradeDownBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeDownStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-stroke-sharp IconTradeDownStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconTradeDownSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trade-down-solid-sharp IconTradeDownSolidSharp"
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

export const iconPackOfTradeDown: TheIconSelfPack = {
  name: 'TradeDown',
  StrokeRounded: IconTradeDownStrokeRounded,
  DuotoneRounded: IconTradeDownDuotoneRounded,
  TwotoneRounded: IconTradeDownTwotoneRounded,
  SolidRounded: IconTradeDownSolidRounded,
  BulkRounded: IconTradeDownBulkRounded,
  StrokeSharp: IconTradeDownStrokeSharp,
  SolidSharp: IconTradeDownSolidSharp,
};