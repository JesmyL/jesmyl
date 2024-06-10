import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M8 14.0844L9.31716 15.9429C9.60777 16.3529 9.75307 16.5579 9.87654 16.4857C10 16.4136 10 16.1237 10 15.5438L10 7.5',
  d3: 'M16 9.91559L14.6828 8.05715C14.3922 7.64711 14.2469 7.4421 14.1235 7.51425C14 7.58641 14 7.87635 14 8.45623L14 16.5',
  d4: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM7.56632 13.4725C7.22838 13.712 7.14858 14.1802 7.3881 14.5181L8.72892 16.4099C8.85272 16.5848 8.98858 16.7767 9.11366 16.9094C9.17824 16.978 9.3013 17.0994 9.47831 17.1766C9.70317 17.2746 9.99062 17.2878 10.255 17.1333C10.4874 16.9974 10.5979 16.7926 10.6503 16.6526C10.7011 16.5169 10.7207 16.3813 10.7308 16.2799C10.7501 16.0879 10.75 15.8382 10.75 15.5786V15.5786L10.75 7.5C10.75 7.08579 10.4142 6.75 10 6.75C9.58579 6.75 9.25 7.08579 9.25 7.5L9.25 13.3344H8.00006C7.84987 13.3342 7.69818 13.3791 7.56632 13.4725ZM14 17.25C14.4142 17.25 14.75 16.9142 14.75 16.5V10.6656H16.0001C16.1502 10.6658 16.3019 10.6209 16.4337 10.5275C16.7716 10.288 16.8514 9.81985 16.6119 9.48191L15.2711 7.59004L15.2711 7.59002L15.271 7.58999L15.271 7.58997C15.1472 7.41514 15.0114 7.22329 14.8863 7.09056C14.8218 7.02202 14.6987 6.90055 14.5217 6.82342C14.2968 6.72544 14.0094 6.71223 13.745 6.86673C13.5126 7.00256 13.4021 7.2074 13.3497 7.34744C13.2989 7.48307 13.2793 7.61875 13.2692 7.72005C13.2499 7.91212 13.25 8.16181 13.25 8.42138V8.4214L13.25 16.5C13.25 16.9142 13.5858 17.25 14 17.25Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d6: 'M14.7499 16.5C14.7499 16.9142 14.4142 17.25 13.9999 17.25C13.5857 17.25 13.2499 16.9142 13.2499 16.5L13.2499 8.4214C13.2499 8.16182 13.2499 7.91213 13.2691 7.72005C13.2793 7.61875 13.2988 7.48307 13.3496 7.34744C13.402 7.2074 13.5125 7.00256 13.745 6.86673C14.0093 6.71223 14.2968 6.72544 14.5216 6.82342C14.6986 6.90055 14.8217 7.02202 14.8863 7.09056C15.0114 7.22331 15.1472 7.41519 15.271 7.59004L16.6118 9.48191C16.8514 9.81985 16.7716 10.288 16.4336 10.5275C16.3018 10.6209 16.1502 10.6658 16 10.6656L14.7499 10.6656L14.7499 16.5Z',
  d7: 'M7.38804 14.5181C7.14852 14.1802 7.22832 13.712 7.56626 13.4725C7.69812 13.3791 7.84981 13.3342 8 13.3344L9.24994 13.3344L9.24994 7.5C9.24994 7.08579 9.58573 6.75 9.99994 6.75C10.4142 6.75 10.7499 7.08579 10.7499 7.5L10.7499 15.5786L10.7499 15.5786C10.75 15.8382 10.75 16.0879 10.7308 16.2799C10.7206 16.3813 10.701 16.5169 10.6503 16.6526C10.5979 16.7926 10.4873 16.9974 10.2549 17.1333C9.99056 17.2878 9.70311 17.2746 9.47824 17.1766C9.30124 17.0994 9.17818 16.978 9.11359 16.9094C8.98852 16.7767 8.85266 16.5848 8.72886 16.4099L7.38804 14.5181Z',
  d8: 'M20.999 3V21H2.99902V3H20.999Z',
  d9: 'M16.499 9.50009L13.999 7.50009L13.999 16.5002M7.49902 14.5001L9.99902 16.5001L9.99902 7.5',
  d10: 'M2.99902 2.25C2.58481 2.25 2.24902 2.58579 2.24902 3V21C2.24902 21.4142 2.58481 21.75 2.99902 21.75H20.999C21.4132 21.75 21.749 21.4142 21.749 21V3C21.749 2.58579 21.4132 2.25 20.999 2.25H2.99902ZM14.4673 6.91448C14.2422 6.73438 13.9338 6.69926 13.6739 6.82415C13.4141 6.94904 13.2488 7.21183 13.2488 7.50013V16.5002H14.7488V9.0606L16.0303 10.0858L16.9673 8.91448L14.4673 6.91448ZM10.7488 16.5001V7.50004H9.2488L9.24879 14.9397L7.96732 13.9145L7.03027 15.0858L9.53027 17.0858C9.7554 17.2659 10.0638 17.301 10.3237 17.1761C10.5835 17.0512 10.7488 16.7884 10.7488 16.5001Z',
};

export const IconSquareArrowDataTransferVerticalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-stroke-rounded IconSquareArrowDataTransferVerticalStrokeRounded"
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

export const IconSquareArrowDataTransferVerticalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-duotone-rounded IconSquareArrowDataTransferVerticalDuotoneRounded"
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

export const IconSquareArrowDataTransferVerticalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-twotone-rounded IconSquareArrowDataTransferVerticalTwotoneRounded"
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

export const IconSquareArrowDataTransferVerticalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-solid-rounded IconSquareArrowDataTransferVerticalSolidRounded"
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

export const IconSquareArrowDataTransferVerticalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-bulk-rounded IconSquareArrowDataTransferVerticalBulkRounded"
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

export const IconSquareArrowDataTransferVerticalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-stroke-sharp IconSquareArrowDataTransferVerticalStrokeSharp"
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

export const IconSquareArrowDataTransferVerticalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-data-transfer-vertical-solid-sharp IconSquareArrowDataTransferVerticalSolidSharp"
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

export const iconPackOfSquareArrowDataTransferVertical: TheIconSelfPack = {
  name: 'SquareArrowDataTransferVertical',
  StrokeRounded: IconSquareArrowDataTransferVerticalStrokeRounded,
  DuotoneRounded: IconSquareArrowDataTransferVerticalDuotoneRounded,
  TwotoneRounded: IconSquareArrowDataTransferVerticalTwotoneRounded,
  SolidRounded: IconSquareArrowDataTransferVerticalSolidRounded,
  BulkRounded: IconSquareArrowDataTransferVerticalBulkRounded,
  StrokeSharp: IconSquareArrowDataTransferVerticalStrokeSharp,
  SolidSharp: IconSquareArrowDataTransferVerticalSolidSharp,
};