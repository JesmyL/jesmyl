import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 8H20',
  d2: 'M17.5 6V11',
  d3: 'M2 6V21',
  d4: 'M2 20C2 13.3726 7.37258 8 14 8',
  d5: 'M18.5 16.5L17.5 16V14',
  d6: 'M2 8H14.1716M20 8H14.1716M2 6V20.1038M2 21V20.1038M14.1716 8H14C7.37258 8 2 13.3726 2 20V20.1038',
  d7: 'M14 8C7.37258 8 2 13.3726 2 20V8H14Z',
  d8: 'M15.25 4.5C15.25 3.25736 16.2574 2.25 17.5 2.25C18.7426 2.25 19.75 3.25736 19.75 4.5C19.75 5.74264 18.7426 6.75 17.5 6.75C16.2574 6.75 15.25 5.74264 15.25 4.5Z',
  d9: 'M17.5 5C18.0523 5 18.5 5.44772 18.5 6V11C18.5 11.5523 18.0523 12 17.5 12C16.9477 12 16.5 11.5523 16.5 11V6C16.5 5.44772 16.9477 5 17.5 5Z',
  d10: 'M2 5C2.55228 5 3 5.44772 3 6V7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H14C7.92487 9 3 13.9249 3 20V21C3 21.5523 2.55228 22 2 22C1.44772 22 1 21.5523 1 21V6C1 5.44772 1.44772 5 2 5Z',
  d11: 'M17.5 10.25C14.6005 10.25 12.25 12.6005 12.25 15.5C12.25 18.3995 14.6005 20.75 17.5 20.75C20.3995 20.75 22.75 18.3995 22.75 15.5C22.75 12.6005 20.3995 10.25 17.5 10.25ZM16.7498 14C16.7498 13.5858 17.0856 13.25 17.4998 13.25C17.914 13.25 18.2498 13.5858 18.2498 14V15.5365L18.8352 15.8292C19.2057 16.0144 19.3559 16.4649 19.1707 16.8354C18.9854 17.2059 18.5349 17.3561 18.1644 17.1708L17.1644 16.6708C16.9103 16.5438 16.7498 16.2841 16.7498 16V14Z',
  d12: 'M12.25 15.5C12.25 12.6005 14.6005 10.25 17.5 10.25C20.3995 10.25 22.75 12.6005 22.75 15.5C22.75 18.3995 20.3995 20.75 17.5 20.75C14.6005 20.75 12.25 18.3995 12.25 15.5Z',
  d13: 'M17.4998 13.25C17.0856 13.25 16.7498 13.5858 16.7498 14V16C16.7498 16.2841 16.9103 16.5438 17.1644 16.6708L18.1644 17.1708C18.5349 17.3561 18.9854 17.2059 19.1707 16.8354C19.3559 16.4649 19.2057 16.0144 18.8352 15.8292L18.2498 15.5365V14C18.2498 13.5858 17.914 13.25 17.4998 13.25Z',
  d14: 'M17.5 10.2495C17.158 10.2495 16.8237 10.2822 16.5 10.3446V6.51562C16.8012 6.66533 17.1408 6.74951 17.5 6.74951C17.8592 6.74951 18.1988 6.66533 18.5 6.51562V10.3446C18.1763 10.2822 17.842 10.2495 17.5 10.2495Z',
  d15: 'M2 8H21',
  d16: 'M2 5V21',
  d17: 'M17.5 4.25C17.0858 4.25 16.75 4.58579 16.75 5C16.75 5.41421 17.0858 5.75 17.5 5.75C17.9142 5.75 18.25 5.41421 18.25 5C18.25 4.58579 17.9142 4.25 17.5 4.25ZM15.25 5C15.25 3.75736 16.2574 2.75 17.5 2.75C18.7426 2.75 19.75 3.75736 19.75 5C19.75 6.24264 18.7426 7.25 17.5 7.25C16.2574 7.25 15.25 6.24264 15.25 5Z',
  d18: 'M1.25 5.25H2.75V7.5H16.75V6.25H18.25V7.5H21V9H18.25V11.25H16.75V9H14C7.7868 9 2.75 14.0368 2.75 20.25V21.25H1.25V5.25Z',
  d19: 'M17.5 10.75C14.6005 10.75 12.25 13.1005 12.25 16C12.25 18.8995 14.6005 21.25 17.5 21.25C20.3995 21.25 22.75 18.8995 22.75 16C22.75 13.1005 20.3995 10.75 17.5 10.75ZM18.25 16.0365V13.75H16.75V16.9635L18.8354 18.0062L19.5062 16.6646L18.25 16.0365Z',
};

export const IconHangingClockStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-stroke-rounded IconHangingClockStrokeRounded"
    >
      <circle 
        cx="17.5" 
        cy="4.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.5" 
        cy="15.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
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

export const IconHangingClockDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-duotone-rounded IconHangingClockDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.5" 
        cy="4.5" 
        r="1.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17.5" 
        cy="15.5" 
        r="4.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="17.5" 
        cy="4.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.5" 
        cy="15.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
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

export const IconHangingClockTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-twotone-rounded IconHangingClockTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
      />
      <circle 
        cx="17.5" 
        cy="4.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="17.5" 
        cy="15.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="bevel" 
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

export const IconHangingClockSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-solid-rounded IconHangingClockSolidRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
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

export const IconHangingClockBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-bulk-rounded IconHangingClockBulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHangingClockStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-stroke-sharp IconHangingClockStrokeSharp"
    >
      <circle 
        cx="17.5" 
        cy="4.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="17.5" 
        cy="15.5" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconHangingClockSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hanging-clock-solid-sharp IconHangingClockSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfHangingClock: TheIconSelfPack = {
  name: 'HangingClock',
  StrokeRounded: IconHangingClockStrokeRounded,
  DuotoneRounded: IconHangingClockDuotoneRounded,
  TwotoneRounded: IconHangingClockTwotoneRounded,
  SolidRounded: IconHangingClockSolidRounded,
  BulkRounded: IconHangingClockBulkRounded,
  StrokeSharp: IconHangingClockStrokeSharp,
  SolidSharp: IconHangingClockSolidSharp,
};