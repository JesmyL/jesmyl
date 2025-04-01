import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 14H6C3.518 14 3 14.518 3 17V19C3 21.482 3.518 22 6 22H18C20.482 22 21 21.482 21 19V17C21 14.518 20.482 14 18 14Z',
  d2: 'M7 18H8',
  d3: 'M16 18H17',
  d4: 'M6 7V6C6 4.11438 6 3.17157 6.58579 2.58579C7.17157 2 8.11438 2 10 2H14C15.8856 2 16.8284 2 17.4142 2.58579C18 3.17157 18 4.11438 18 6V7C18 8.88562 18 9.82843 17.4142 10.4142C16.8284 11 15.8856 11 14 11H10C8.11438 11 7.17157 11 6.58579 10.4142C6 9.82843 6 8.88562 6 7Z',
  d5: 'M10.5 11L10 14M13.5 11L14 14',
  d6: 'M12 14V22',
  d7: 'M10.65 13.25C10.9328 13.25 11.0743 13.25 11.1621 13.3379C11.25 13.4257 11.25 13.5672 11.25 13.85L11.25 22.15C11.25 22.4328 11.25 22.5743 11.1621 22.6621C11.0743 22.75 10.9328 22.75 10.65 22.75H6C5.36327 22.75 4.80098 22.7178 4.32323 22.6128C3.83699 22.506 3.39172 22.3139 3.03892 21.9611C2.68612 21.6083 2.49401 21.163 2.38719 20.6768C2.28223 20.199 2.25 19.6367 2.25 19L2.25 17C2.25 16.3633 2.28223 15.801 2.38719 15.3232C2.49401 14.837 2.68612 14.3917 3.03892 14.0389C3.39172 13.6861 3.83699 13.494 4.32323 13.3872C4.80098 13.2822 5.36327 13.25 6 13.25L10.65 13.25ZM12.75 13.85C12.75 13.5672 12.75 13.4257 12.8379 13.3379C12.9257 13.25 13.0672 13.25 13.35 13.25H18C18.6367 13.25 19.199 13.2822 19.6768 13.3872C20.163 13.494 20.6083 13.6861 20.9611 14.0389C21.3139 14.3917 21.506 14.837 21.6128 15.3232C21.7178 15.801 21.75 16.3633 21.75 17V19C21.75 19.6367 21.7178 20.199 21.6128 20.6768C21.506 21.163 21.3139 21.6083 20.9611 21.9611C20.6083 22.3139 20.163 22.506 19.6768 22.6128C19.199 22.7178 18.6367 22.75 18 22.75L13.35 22.75C13.0672 22.75 12.9257 22.75 12.8379 22.6621C12.75 22.5743 12.75 22.4328 12.75 22.15L12.75 13.85ZM6.25 18C6.25 17.5858 6.58579 17.25 7 17.25H8C8.41421 17.25 8.75 17.5858 8.75 18C8.75 18.4142 8.41421 18.75 8 18.75H7C6.58579 18.75 6.25 18.4142 6.25 18ZM16 17.25C15.5858 17.25 15.25 17.5858 15.25 18C15.25 18.4142 15.5858 18.75 16 18.75H17C17.4142 18.75 17.75 18.4142 17.75 18C17.75 17.5858 17.4142 17.25 17 17.25H16Z',
  d8: 'M14.052 1.25C14.9505 1.24997 15.6997 1.24995 16.2945 1.32991C16.9223 1.41432 17.4891 1.59999 17.9445 2.05546C18.4 2.51093 18.5857 3.07773 18.6701 3.70552C18.7501 4.3003 18.75 5.04951 18.75 5.94798V5.94801V7.052V7.05203C18.75 7.9505 18.7501 8.69971 18.6701 9.29448C18.5857 9.92228 18.4 10.4891 17.9445 10.9445C17.4891 11.4 16.9223 11.5857 16.2945 11.6701C15.6997 11.7501 14.9505 11.75 14.052 11.75H14.052H9.94801H9.94798C9.04951 11.75 8.3003 11.7501 7.70552 11.6701C7.07773 11.5857 6.51093 11.4 6.05546 10.9445C5.59999 10.4891 5.41432 9.92228 5.32991 9.29448C5.24995 8.69971 5.24997 7.9505 5.25 7.05203V7.052V5.948V5.94797C5.24997 5.0495 5.24995 4.3003 5.32991 3.70552C5.41432 3.07773 5.59999 2.51093 6.05546 2.05546C6.51093 1.59999 7.07773 1.41432 7.70552 1.32991C8.3003 1.24995 9.0495 1.24997 9.94797 1.25H9.948H14.052H14.052Z',
  d9: 'M9.76021 10.8767C9.82048 10.5151 10.1334 10.25 10.5 10.25H13.5C13.8666 10.25 14.1795 10.5151 14.2398 10.8767L14.7398 13.8767C14.776 14.0942 14.7148 14.3166 14.5723 14.4848C14.4298 14.653 14.2205 14.75 14 14.75H10C9.77954 14.75 9.57024 14.653 9.42774 14.4848C9.28524 14.3166 9.22397 14.0942 9.26021 13.8767L9.76021 10.8767Z',
  d10: 'M9.61468 11.7498C9.72339 11.7499 9.83449 11.7499 9.94798 11.7499H14.052C14.1655 11.7499 14.2766 11.7499 14.3853 11.7498L14.7398 13.8766C14.776 14.0941 14.7148 14.3165 14.5723 14.4847C14.4298 14.6529 14.2205 14.7499 14 14.7499H10C9.77954 14.7499 9.57024 14.6529 9.42774 14.4847C9.28524 14.3165 9.22397 14.0941 9.26021 13.8766L9.61468 11.7498Z',
  d11: 'M6.5 18H8.5',
  d12: 'M15.5 18H17.5',
  d13: 'M18 2H6V11H18V2Z',
  d14: 'M21 14H3V22H21V14Z',
  d15: 'M10.5 11V14M13.5 11V14',
  d16: 'M11.25 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22V14C2.25 13.5858 2.58579 13.25 3 13.25H11.25V22.75ZM8.5 18.75H6.5V17.25H8.5V18.75Z',
  d17: 'M12.75 13.25V22.75H21C21.4142 22.75 21.75 22.4142 21.75 22V14C21.75 13.5858 21.4142 13.25 21 13.25H12.75ZM15.5 18.75H17.5V17.25H15.5V18.75Z',
  d18: 'M5.25 2C5.25 1.58579 5.58579 1.25 6 1.25H18C18.4142 1.25 18.75 1.58579 18.75 2V11C18.75 11.4142 18.4142 11.75 18 11.75H6C5.58579 11.75 5.25 11.4142 5.25 11V2Z',
  d19: 'M9.75 11C9.75 10.5858 10.0858 10.25 10.5 10.25H13.5C13.9142 10.25 14.25 10.5858 14.25 11V14C14.25 14.4142 13.9142 14.75 13.5 14.75H10.5C10.0858 14.75 9.75 14.4142 9.75 14V11Z',
};

export const IconTelevisionTableStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-stroke-rounded IconTelevisionTableStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTelevisionTableDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-duotone-rounded IconTelevisionTableDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTelevisionTableTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-twotone-rounded IconTelevisionTableTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTelevisionTableSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-solid-rounded IconTelevisionTableSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTelevisionTableBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-bulk-rounded IconTelevisionTableBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconTelevisionTableStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-stroke-sharp IconTelevisionTableStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTelevisionTableSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="television-table-solid-sharp IconTelevisionTableSolidSharp"
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
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTelevisionTable: TheIconSelfPack = {
  name: 'TelevisionTable',
  StrokeRounded: IconTelevisionTableStrokeRounded,
  DuotoneRounded: IconTelevisionTableDuotoneRounded,
  TwotoneRounded: IconTelevisionTableTwotoneRounded,
  SolidRounded: IconTelevisionTableSolidRounded,
  BulkRounded: IconTelevisionTableBulkRounded,
  StrokeSharp: IconTelevisionTableStrokeSharp,
  SolidSharp: IconTelevisionTableSolidSharp,
};