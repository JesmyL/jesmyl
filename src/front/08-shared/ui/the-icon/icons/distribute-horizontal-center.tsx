import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 5L7 2M7 19L7 22',
  d2: 'M17 8.00232C17.8439 8.00232 18.8179 7.91895 19.299 8.75232C19.5 9.10039 19.5 9.5677 19.5 10.5023V13.5023C19.5 14.4369 19.5 14.9042 19.299 15.2523C18.8179 16.0857 17.8439 16.0023 17 16.0023C16.1561 16.0023 15.1821 16.0857 14.701 15.2523C14.5 14.9042 14.5 14.4369 14.5 13.5023L14.5 10.5023C14.5 9.5677 14.5 9.10039 14.701 8.75232C15.1821 7.91895 16.1561 8.00232 17 8.00232Z',
  d3: 'M7 5.00232C7.84389 5.00232 8.81789 4.91895 9.29904 5.75232C9.5 6.10039 9.5 6.5677 9.5 7.50232L9.5 16.5023C9.5 17.4369 9.5 17.9042 9.29904 18.2523C8.81789 19.0857 7.84389 19.0023 7 19.0023C6.15611 19.0023 5.18211 19.0857 4.70096 18.2523C4.5 17.9042 4.5 17.4369 4.5 16.5023L4.5 7.50232C4.5 6.5677 4.5 6.10039 4.70096 5.75232C5.18211 4.91895 6.15611 5.00232 7 5.00232Z',
  d4: 'M17 8V2M17 16V22',
  d5: 'M7 1C7.55229 1 8 1.44772 8 2L8 5C8 5.55228 7.55229 6 7 6C6.44772 6 6 5.55228 6 5L6 2C6 1.44772 6.44772 1 7 1ZM7 18C7.55228 18 8 18.4477 8 19V22C8 22.5523 7.55228 23 7 23C6.44772 23 6 22.5523 6 22L6 19C6 18.4477 6.44772 18 7 18Z',
  d6: 'M16.8168 7.2515C16.882 7.25214 16.9434 7.25275 17 7.25275C17.0566 7.25275 17.118 7.25214 17.1832 7.2515C17.5393 7.24799 18.0083 7.24336 18.4352 7.33032C18.9884 7.44299 19.5708 7.72349 19.9486 8.37775C20.1259 8.68496 20.192 9.01092 20.2218 9.3401C20.25 9.65139 20.25 10.0307 20.25 10.4705V13.535C20.25 13.9748 20.25 14.3541 20.2218 14.6654C20.192 14.9946 20.1259 15.3205 19.9486 15.6278C19.5708 16.282 18.9884 16.5625 18.4352 16.6752C18.0083 16.7621 17.5393 16.7575 17.1832 16.754H17.1831C17.118 16.7534 17.0566 16.7528 17 16.7528C16.9434 16.7528 16.882 16.7534 16.8169 16.754H16.8168C16.4607 16.7575 15.9917 16.7621 15.5648 16.6752C15.0116 16.5625 14.4292 16.282 14.0514 15.6278C13.8741 15.3205 13.808 14.9946 13.7782 14.6654C13.75 14.3541 13.75 13.9748 13.75 13.535V13.535V10.4705V10.4705C13.75 10.0307 13.75 9.65138 13.7782 9.3401C13.808 9.01092 13.8741 8.68496 14.0514 8.37775C14.4292 7.72349 15.0116 7.44299 15.5648 7.33032C15.9917 7.24336 16.4607 7.24799 16.8168 7.2515Z',
  d7: 'M6.81682 4.2515C6.88198 4.25214 6.94336 4.25275 7 4.25275C7.05665 4.25275 7.11802 4.25214 7.18318 4.2515C7.53925 4.24799 8.00827 4.24336 8.43523 4.33032C8.98843 4.44299 9.57082 4.72349 9.94856 5.37775C10.1259 5.68496 10.192 6.01092 10.2218 6.3401C10.25 6.65139 10.25 7.03074 10.25 7.47052L10.25 16.535C10.25 16.9748 10.25 17.3541 10.2218 17.6654C10.192 17.9946 10.1259 18.3205 9.94856 18.6278C9.57082 19.282 8.98843 19.5625 8.43523 19.6752C8.00827 19.7621 7.53925 19.7575 7.18318 19.754H7.18314C7.118 19.7534 7.05663 19.7528 7 19.7528C6.94337 19.7528 6.88201 19.7534 6.81686 19.754H6.81682C6.46075 19.7575 5.99173 19.7621 5.56477 19.6752C5.01158 19.5625 4.42918 19.282 4.05144 18.6278C3.87408 18.3205 3.80802 17.9946 3.77818 17.6654C3.74997 17.3541 3.74998 16.9748 3.75 16.535V16.535V7.47053V7.47047C3.74998 7.03071 3.74997 6.65138 3.77818 6.3401C3.80802 6.01092 3.87408 5.68496 4.05145 5.37775C4.42918 4.72349 5.01158 4.44299 5.56477 4.33032C5.99173 4.24336 6.46075 4.24799 6.81682 4.2515Z',
  d8: 'M17 1C17.5523 1 18 1.44772 18 2V8C18 8.55228 17.5523 9 17 9C16.4477 9 16 8.55228 16 8V2C16 1.44772 16.4477 1 17 1ZM17 15C17.5523 15 18 15.4477 18 16V22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22V16C16 15.4477 16.4477 15 17 15Z',
  d9: 'M18 2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V7.27003C16.2919 7.2459 16.5794 7.24873 16.8168 7.25107C16.882 7.25172 16.9434 7.25232 17 7.25232C17.0566 7.25232 17.118 7.25172 17.1832 7.25107C17.4206 7.24873 17.7081 7.2459 18 7.27003V2Z',
  d10: 'M16 16.7346C16.2919 16.7587 16.5794 16.7559 16.8168 16.7536C16.8819 16.7529 16.9434 16.7523 17 16.7523C17.0566 16.7523 17.118 16.7529 17.1831 16.7536C17.4205 16.7559 17.7081 16.7587 18 16.7346V22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22V16.7346Z',
  d11: 'M8 2C8 1.44772 7.55229 1 7 1C6.44772 1 6 1.44772 6 2V4.27003C6.29185 4.2459 6.57944 4.24873 6.81682 4.25107C6.88198 4.25172 6.94336 4.25232 7 4.25232C7.05665 4.25232 7.11802 4.25172 7.18318 4.25107C7.42057 4.24873 7.70815 4.2459 8 4.27003L8 2Z',
  d12: 'M6 19.7346C6.29185 19.7587 6.57944 19.7559 6.81682 19.7536L6.81786 19.7536C6.88263 19.7529 6.94366 19.7523 7 19.7523C7.05635 19.7523 7.11737 19.7529 7.18215 19.7536L7.18318 19.7536C7.42057 19.7559 7.70815 19.7587 8 19.7346V22C8 22.5523 7.55228 23 7 23C6.44772 23 6 22.5523 6 22V19.7346Z',
  d13: 'M19.5 16.0023V8.00232H14.5V16.0023H19.5Z',
  d14: 'M9.5 19.0023V5.00232H4.5V19.0023H9.5Z',
  d15: 'M8 2L8 5H6L6 2H8ZM6 22L6 19H8V22H6Z',
  d16: 'M13.75 8.00232C13.75 7.58811 14.0858 7.25232 14.5 7.25232H19.5C19.9142 7.25232 20.25 7.58811 20.25 8.00232V16.0023C20.25 16.4165 19.9142 16.7523 19.5 16.7523H14.5C14.0858 16.7523 13.75 16.4165 13.75 16.0023V8.00232Z',
  d17: 'M3.75 5.00232C3.75 4.58811 4.08579 4.25232 4.5 4.25232H9.5C9.91421 4.25232 10.25 4.58811 10.25 5.00232V19.0023C10.25 19.4165 9.91421 19.7523 9.5 19.7523H4.5C4.08579 19.7523 3.75 19.4165 3.75 19.0023V5.00232Z',
  d18: 'M18 2V8H16V2H18ZM16 22V16H18V22H16Z',
};

export const IconDistributeHorizontalCenterStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-stroke-rounded IconDistributeHorizontalCenterStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-duotone-rounded IconDistributeHorizontalCenterDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-twotone-rounded IconDistributeHorizontalCenterTwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-solid-rounded IconDistributeHorizontalCenterSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-bulk-rounded IconDistributeHorizontalCenterBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-stroke-sharp IconDistributeHorizontalCenterStrokeSharp"
    >
      <path 
        d={d.d1} 
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDistributeHorizontalCenterSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="distribute-horizontal-center-solid-sharp IconDistributeHorizontalCenterSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfDistributeHorizontalCenter: TheIconSelfPack = {
  name: 'DistributeHorizontalCenter',
  StrokeRounded: IconDistributeHorizontalCenterStrokeRounded,
  DuotoneRounded: IconDistributeHorizontalCenterDuotoneRounded,
  TwotoneRounded: IconDistributeHorizontalCenterTwotoneRounded,
  SolidRounded: IconDistributeHorizontalCenterSolidRounded,
  BulkRounded: IconDistributeHorizontalCenterBulkRounded,
  StrokeSharp: IconDistributeHorizontalCenterStrokeSharp,
  SolidSharp: IconDistributeHorizontalCenterSolidSharp,
};