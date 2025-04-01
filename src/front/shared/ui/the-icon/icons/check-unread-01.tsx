import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 14.5C5 14.5 7 15 8.5 18C8.5 18 10.1618 15.2596 12.4759 12.4759M19 7C17.4539 7.57366 15.8473 8.86531 14.3695 10.3695',
  d2: 'M5 5L19 19',
  d3: 'M19.9378 6.65241C20.1299 7.1702 19.8659 7.7457 19.3481 7.93782C18.1272 8.3908 16.7789 9.40431 15.4392 10.7151C15.0444 11.1013 14.4113 11.0944 14.025 10.6996C13.6388 10.3048 13.6457 9.67169 14.0405 9.28547C15.4481 7.90835 17.0374 6.66193 18.6524 6.06272C19.1702 5.87061 19.7457 6.13462 19.9378 6.65241Z',
  d4: 'M13.1154 11.7071C13.5401 12.0602 13.5982 12.6907 13.2451 13.1154C12.1143 14.4758 11.1396 15.8296 10.4465 16.8456C10.1005 17.3528 9.826 17.7739 9.63872 18.067C9.5451 18.2135 9.47335 18.328 9.42545 18.405C9.40149 18.4436 9.38351 18.4727 9.37173 18.4919L9.35876 18.5131L9.3553 18.5188C9.16647 18.8301 8.8233 19.0143 8.45951 18.9994C8.09567 18.9846 7.76866 18.7732 7.60581 18.4475C6.92848 17.0928 6.15935 16.3411 5.59956 15.934C5.31727 15.7287 5.08223 15.6067 4.93004 15.5391C4.85386 15.5052 4.77388 15.477 4.74357 15.4668C4.2162 15.3269 3.89733 14.7888 4.03009 14.2577C4.16404 13.7219 4.70698 13.3962 5.24277 13.5301C5.3923 13.5675 5.60755 13.6516 5.74231 13.7115C6.01199 13.8313 6.37071 14.0218 6.77591 14.3165C7.31867 14.7113 7.93487 15.2857 8.52893 16.1112C8.61223 15.9868 8.70078 15.8557 8.7943 15.7186C9.51065 14.6685 10.5239 13.2603 11.7071 11.8369C12.0602 11.4122 12.6906 11.3541 13.1154 11.7071Z',
  d5: 'M4.29314 4.29289C4.68366 3.90237 5.31683 3.90237 5.70735 4.29289L19.7074 18.2929C20.0979 18.6834 20.0979 19.3166 19.7074 19.7071C19.3168 20.0976 18.6837 20.0976 18.2931 19.7071L4.29314 5.70711C3.90261 5.31658 3.90261 4.68342 4.29314 4.29289Z',
  d6: 'M5 14.5C5 14.5 7 15 8.5 18C8.5 18 10.1157 15.3357 12.3792 12.5926M19 7C17.4539 7.57366 15.8473 8.86531 14.3695 10.3695',
  d7: 'M18.8476 7.63323C17.6268 8.08621 16.2785 9.09972 14.9387 10.4105L14.2239 11.1098L12.8253 9.6802L13.5401 8.98088C14.9477 7.60376 16.537 6.35734 18.1519 5.75813L18.8476 5.5L19.5 7.39118L18.8476 7.63323Z',
  d8: 'M13.2868 11.9585L12.6503 12.7298C11.5438 14.0708 10.5926 15.3963 9.9172 16.3885C9.57999 16.8838 9.03761 17.733 8.85536 18.0185L8.85481 18.0194L7.91551 19.5004L7.10536 17.948C6.42803 16.5933 5.6589 15.8416 5.09912 15.4345C4.81682 15.2292 4.25725 14.9737 3.76613 14.8481L3.5 14.7816L4.01472 12.8487L4.25725 12.9094C4.25725 12.9094 5.1071 13.1521 5.24186 13.212C5.51154 13.3318 5.87026 13.5224 6.27546 13.817C6.81823 14.2118 7.43442 14.7862 8.02848 15.6117C8.10284 15.5007 8.18139 15.3843 8.26393 15.263C8.96221 14.2373 9.95067 12.8591 11.1077 11.4569L11.7441 10.6856L13.2868 11.9585Z',
  d9: 'M19.0859 20.5002L20.5002 19.0859L4.91421 3.5L3.5 4.91421L19.0859 20.5002Z',
};

export const IconCheckUnread01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-stroke-rounded IconCheckUnread01StrokeRounded"
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

export const IconCheckUnread01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-duotone-rounded IconCheckUnread01DuotoneRounded"
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

export const IconCheckUnread01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-twotone-rounded IconCheckUnread01TwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-solid-rounded IconCheckUnread01SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconCheckUnread01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-bulk-rounded IconCheckUnread01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-stroke-sharp IconCheckUnread01StrokeSharp"
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

export const IconCheckUnread01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-01-solid-sharp IconCheckUnread01SolidSharp"
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

export const iconPackOfCheckUnread01: TheIconSelfPack = {
  name: 'CheckUnread01',
  StrokeRounded: IconCheckUnread01StrokeRounded,
  DuotoneRounded: IconCheckUnread01DuotoneRounded,
  TwotoneRounded: IconCheckUnread01TwotoneRounded,
  SolidRounded: IconCheckUnread01SolidRounded,
  BulkRounded: IconCheckUnread01BulkRounded,
  StrokeSharp: IconCheckUnread01StrokeSharp,
  SolidSharp: IconCheckUnread01SolidSharp,
};