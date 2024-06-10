import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M9.91559 8L8.05715 9.31716C7.64711 9.60777 7.4421 9.75307 7.51425 9.87654C7.58641 10 7.87635 10 8.45623 10H16.5',
  d3: 'M14.0844 16L15.9428 14.6828C16.3529 14.3922 16.5579 14.2469 16.4857 14.1235C16.4136 14 16.1237 14 15.5438 14H7.5',
  d4: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM17.25 10.0001C17.25 9.58585 16.9142 9.25006 16.5 9.25006H10.6656V8C10.6658 7.84985 10.6209 7.69821 10.5275 7.56638C10.288 7.22844 9.81985 7.14865 9.48191 7.38816L7.59004 8.729C7.41519 8.85279 7.22331 8.98864 7.09056 9.11372C7.02202 9.1783 6.90055 9.30136 6.82342 9.47837C6.72544 9.70323 6.71223 9.99068 6.86673 10.255C7.00256 10.4875 7.2074 10.598 7.34744 10.6504C7.48307 10.7012 7.61875 10.7207 7.72005 10.7309C7.91212 10.7501 8.16181 10.7501 8.42138 10.7501H8.4214L16.5 10.7501C16.9142 10.7501 17.25 10.4143 17.25 10.0001ZM13.4725 16.4337C13.712 16.7717 14.1802 16.8515 14.5181 16.612L16.4099 15.2711C16.5848 15.1473 16.7767 15.0115 16.9094 14.8864C16.978 14.8218 17.0994 14.6988 17.1766 14.5218C17.2746 14.2969 17.2878 14.0094 17.1333 13.7451C16.9974 13.5127 16.7926 13.4021 16.6526 13.3497C16.5169 13.299 16.3813 13.2794 16.2799 13.2692C16.0879 13.25 15.8382 13.25 15.5786 13.2501H15.5786L7.5 13.2501C7.08579 13.2501 6.75 13.5858 6.75 14.0001C6.75 14.4143 7.08579 14.7501 7.5 14.7501H13.3344V16C13.3342 16.1502 13.3791 16.3019 13.4725 16.4337Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d6: 'M16.5 9.25006C16.9142 9.25006 17.25 9.58585 17.25 10.0001C17.25 10.4143 16.9142 10.7501 16.5 10.7501L8.4214 10.7501C8.16182 10.7501 7.91213 10.7501 7.72005 10.7309C7.61875 10.7207 7.48307 10.7012 7.34744 10.6504C7.2074 10.598 7.00256 10.4875 6.86673 10.255C6.71223 9.99068 6.72544 9.70323 6.82342 9.47837C6.90055 9.30136 7.02202 9.1783 7.09056 9.11372C7.22331 8.98864 7.41519 8.85279 7.59004 8.729L9.48191 7.38816C9.81985 7.14865 10.288 7.22844 10.5275 7.56638C10.6209 7.69821 10.6658 7.84985 10.6656 8V9.25006H16.5Z',
  d7: 'M14.5181 16.612C14.1802 16.8515 13.712 16.7717 13.4725 16.4337C13.3791 16.3019 13.3342 16.1502 13.3344 16V14.7501H7.5C7.08579 14.7501 6.75 14.4143 6.75 14.0001C6.75 13.5858 7.08579 13.2501 7.5 13.2501L15.5786 13.2501H15.5786C15.8382 13.25 16.0879 13.25 16.2799 13.2692C16.3813 13.2794 16.5169 13.299 16.6526 13.3497C16.7926 13.4021 16.9974 13.5127 17.1333 13.7451C17.2878 14.0094 17.2746 14.2969 17.1766 14.5218C17.0994 14.6988 16.978 14.8218 16.9094 14.8864C16.7767 15.0115 16.5848 15.1473 16.4099 15.2711L14.5181 16.612Z',
  d8: 'M21 3V21H3V3H21Z',
  d9: 'M9.49813 7.5L7.49813 10H16.4982M14.4981 16.5L16.4981 14H7.49805',
  d10: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM8.9124 7.03149L6.9124 9.53149C6.7323 9.75662 6.69719 10.0651 6.82208 10.3249C6.94697 10.5848 7.20975 10.75 7.49805 10.75H16.4981V9.25002H9.05852L10.0837 7.96854L8.9124 7.03149ZM16.4981 13.25H7.49797V14.75H14.9376L13.9124 16.0315L15.0837 16.9685L17.0837 14.4685C17.2638 14.2434 17.2989 13.935 17.174 13.6751C17.0491 13.4153 16.7864 13.25 16.4981 13.25Z',
};

export const IconSquareArrowDataTransferHorizontalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-stroke-rounded IconSquareArrowDataTransferHorizontalStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-duotone-rounded IconSquareArrowDataTransferHorizontalDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-twotone-rounded IconSquareArrowDataTransferHorizontalTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-solid-rounded IconSquareArrowDataTransferHorizontalSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-bulk-rounded IconSquareArrowDataTransferHorizontalBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-stroke-sharp IconSquareArrowDataTransferHorizontalStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowDataTransferHorizontalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-horizontal-solid-sharp IconSquareArrowDataTransferHorizontalSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareArrowDataTransferHorizontal: TheIconSelfPack = {
  name: 'SquareArrowDataTransferHorizontal',
  StrokeRounded: IconSquareArrowDataTransferHorizontalStrokeRounded,
  DuotoneRounded: IconSquareArrowDataTransferHorizontalDuotoneRounded,
  TwotoneRounded: IconSquareArrowDataTransferHorizontalTwotoneRounded,
  SolidRounded: IconSquareArrowDataTransferHorizontalSolidRounded,
  BulkRounded: IconSquareArrowDataTransferHorizontalBulkRounded,
  StrokeSharp: IconSquareArrowDataTransferHorizontalStrokeSharp,
  SolidSharp: IconSquareArrowDataTransferHorizontalSolidSharp,
};