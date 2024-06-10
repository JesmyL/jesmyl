import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M14.7731 14.7731L9 9M14.7731 14.7731C14.2678 15.2784 11.8846 14.7834 11.1649 14.7731M14.7731 14.7731C15.2784 14.2678 14.7834 11.8846 14.7731 11.1649',
  d3: 'M17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H11.9428C9.75212 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.7521 1.74999 11.9428 1.75H11.9428H12.0572H12.0572C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12.9764 11.5622L13.091 11.4477C13.2963 11.2422 13.5135 11.0249 13.7055 10.874C13.8454 10.7639 14.3618 10.3603 15.0046 10.5787C15.648 10.7972 15.7878 11.4249 15.8252 11.5947C15.8767 11.8286 15.9048 12.1296 15.9313 12.4143L15.9313 12.4143L15.9358 12.4632C15.9778 12.9117 16.0148 13.4329 15.9941 13.8976C15.9837 14.1298 15.9577 14.3842 15.8958 14.6267C15.8383 14.8515 15.7218 15.1808 15.4513 15.4513C15.1808 15.7218 14.8515 15.8383 14.6267 15.8958C14.3842 15.9577 14.1298 15.9837 13.8976 15.9941C13.4329 16.0148 12.9117 15.9778 12.4632 15.9358L12.4143 15.9313L12.4143 15.9313C12.1296 15.9048 11.8286 15.8767 11.5947 15.8252C11.4249 15.7878 10.7972 15.648 10.5787 15.0046C10.3603 14.3618 10.7639 13.8454 10.874 13.7055C11.0249 13.5135 11.2423 13.2963 11.4477 13.091L11.5622 12.9764L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z',
  d4: 'M12.0572 22.25C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H12.0572H11.9428H11.9428C9.7521 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.75212 22.25 11.9428 22.25H12.0572Z',
  d5: 'M9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L11.5622 12.9764L11.4477 13.091C11.2423 13.2963 11.0249 13.5135 10.874 13.7055C10.7639 13.8454 10.3603 14.3618 10.5787 15.0046C10.7972 15.648 11.4249 15.7878 11.5947 15.8252C11.8286 15.8767 12.1296 15.9048 12.4143 15.9313L12.4632 15.9358C12.9117 15.9778 13.4329 16.0148 13.8976 15.9941C14.1298 15.9837 14.3842 15.9577 14.6267 15.8958C14.8515 15.8383 15.1808 15.7218 15.4513 15.4513C15.7218 15.1808 15.8383 14.8515 15.8958 14.6267C15.9577 14.3842 15.9837 14.1298 15.9941 13.8977C16.0148 13.4329 15.9778 12.9117 15.9358 12.4632L15.9313 12.4143C15.9048 12.1296 15.8767 11.8286 15.8252 11.5947C15.7878 11.4249 15.648 10.7972 15.0046 10.5787C14.3618 10.3603 13.8454 10.7639 13.7055 10.874C13.5135 11.0249 13.2963 11.2422 13.091 11.4477L12.9764 11.5622L9.70711 8.29289Z',
  d6: 'M9 9L14.7016 14.7016M10 15H15V10',
  d7: 'M21 3V21H3V3H21Z',
  d8: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM14.2491 10.0001V13.1894L9.52941 8.46973L8.46875 9.53039L13.1884 14.2501L9.99908 14.2501V15.7501L15.7491 15.7501V10.0001H14.2491Z',
};

export const IconSquareArrowDownRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-stroke-rounded IconSquareArrowDownRightStrokeRounded"
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

export const IconSquareArrowDownRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-duotone-rounded IconSquareArrowDownRightDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSquareArrowDownRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-twotone-rounded IconSquareArrowDownRightTwotoneRounded"
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

export const IconSquareArrowDownRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-solid-rounded IconSquareArrowDownRightSolidRounded"
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

export const IconSquareArrowDownRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-bulk-rounded IconSquareArrowDownRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSquareArrowDownRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-stroke-sharp IconSquareArrowDownRightStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareArrowDownRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-arrow-down-right-solid-sharp IconSquareArrowDownRightSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareArrowDownRight: TheIconSelfPack = {
  name: 'SquareArrowDownRight',
  StrokeRounded: IconSquareArrowDownRightStrokeRounded,
  DuotoneRounded: IconSquareArrowDownRightDuotoneRounded,
  TwotoneRounded: IconSquareArrowDownRightTwotoneRounded,
  SolidRounded: IconSquareArrowDownRightSolidRounded,
  BulkRounded: IconSquareArrowDownRightBulkRounded,
  StrokeSharp: IconSquareArrowDownRightStrokeSharp,
  SolidSharp: IconSquareArrowDownRightSolidSharp,
};