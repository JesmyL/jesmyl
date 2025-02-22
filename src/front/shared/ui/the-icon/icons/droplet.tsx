import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z',
  d2: 'M16 14C16 16.2091 14.2091 18 12 18',
  d3: 'M14.9223 2.42838C13.2679 0.857205 10.7321 0.857205 9.07766 2.42838C7.79766 3.64397 6.22927 5.31956 4.97628 7.24155C3.72892 9.1549 2.75 11.3797 2.75 13.678C2.75 18.1459 6.25744 22.75 12 22.75C17.7426 22.75 21.25 18.1459 21.25 13.678C21.25 11.3797 20.2711 9.15491 19.0237 7.24155C17.7707 5.31956 16.2023 3.64397 14.9223 2.42838ZM15 13.9999C15 15.6568 13.6569 16.9999 12 16.9999C11.4477 16.9999 11 17.4477 11 17.9999C11 18.5522 11.4477 18.9999 12 18.9999C14.7614 18.9999 17 16.7614 17 13.9999C17 13.4477 16.5523 12.9999 16 12.9999C15.4477 12.9999 15 13.4477 15 13.9999Z',
  d4: 'M9.07766 2.42838C10.7321 0.857205 13.2679 0.857205 14.9223 2.42838C16.2023 3.64397 17.7707 5.31956 19.0237 7.24155C20.2711 9.15491 21.25 11.3797 21.25 13.678C21.25 18.1459 17.7426 22.75 12 22.75C6.25744 22.75 2.75 18.1459 2.75 13.678C2.75 11.3797 3.72892 9.1549 4.97628 7.24155C6.22927 5.31956 7.79766 3.64397 9.07766 2.42838Z',
  d5: 'M12 17C13.6569 17 15 15.6569 15 14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14C17 16.7614 14.7614 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z',
  d6: 'M12 2C12 2 3.5 8 3.5 13.678C3.5 17.7804 6.71878 22 12 22C17.2812 22 20.5 17.7804 20.5 13.678C20.5 8 12 2 12 2Z',
  d7: 'M12.2805 1.45738C12.1534 1.36368 12.0537 1.29012 12 1.25C11.9463 1.29012 11.8466 1.36368 11.7195 1.45738C11.2798 1.78158 10.513 2.34693 10.1973 2.60293C9.38451 3.26199 8.29832 4.20251 7.2094 5.32607C6.12279 6.44725 5.01784 7.76667 4.18091 9.18498C3.3469 10.5983 2.75 12.1589 2.75 13.7484C2.75 18.1816 6.25744 22.75 12 22.75C17.7426 22.75 21.25 18.1816 21.25 13.7484C21.25 12.1589 20.6531 10.5983 19.8191 9.18498C18.9822 7.76668 17.8772 6.44725 16.7906 5.32607C15.7017 4.2025 14.6155 3.26199 13.8027 2.60293C13.487 2.34693 12.7202 1.78158 12.2805 1.45738ZM15 14C15 15.6569 13.6569 17 12 17V19C14.7614 19 17 16.7614 17 14H15Z',
};

export const IconDropletStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-stroke-rounded IconDropletStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDropletDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-duotone-rounded IconDropletDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDropletTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-twotone-rounded IconDropletTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconDropletSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-solid-rounded IconDropletSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDropletBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-bulk-rounded IconDropletBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDropletStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-stroke-sharp IconDropletStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDropletSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="droplet-solid-sharp IconDropletSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDroplet: TheIconSelfPack = {
  name: 'Droplet',
  StrokeRounded: IconDropletStrokeRounded,
  DuotoneRounded: IconDropletDuotoneRounded,
  TwotoneRounded: IconDropletTwotoneRounded,
  SolidRounded: IconDropletSolidRounded,
  BulkRounded: IconDropletBulkRounded,
  StrokeSharp: IconDropletStrokeSharp,
  SolidSharp: IconDropletSolidSharp,
};