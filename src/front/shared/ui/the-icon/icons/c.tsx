import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M8.73244 10C8.38663 9.4022 7.74028 9 7 9C5.89543 9 5 9.89543 5 11V13C5 14.1046 5.89543 15 7 15C7.74028 15 8.38663 14.5978 8.73244 14',
  d3: 'M12 10.5V13.5M10.5 12H13.5',
  d4: 'M17.5 10.5V13.5M16 12H19',
  d5: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM7 8.25C5.48122 8.25 4.25 9.48122 4.25 11V13C4.25 14.5188 5.48122 15.75 7 15.75C8.01883 15.75 8.90728 15.1956 9.38164 14.3755C9.58905 14.017 9.46653 13.5582 9.10798 13.3508C8.74943 13.1434 8.29064 13.2659 8.08323 13.6245C7.86597 14 7.46173 14.25 7 14.25C6.30964 14.25 5.75 13.6904 5.75 13V11C5.75 10.3096 6.30964 9.75 7 9.75C7.46173 9.75 7.86597 9.99996 8.08323 10.3755C8.29064 10.7341 8.74943 10.8566 9.10798 10.6492C9.46653 10.4418 9.58905 9.983 9.38164 9.62446C8.90728 8.80444 8.01883 8.25 7 8.25ZM12 9.75C12.4142 9.75 12.75 10.0858 12.75 10.5V11.25H13.5C13.9142 11.25 14.25 11.5858 14.25 12C14.25 12.4142 13.9142 12.75 13.5 12.75H12.75V13.5C12.75 13.9142 12.4142 14.25 12 14.25C11.5858 14.25 11.25 13.9142 11.25 13.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H11.25V10.5C11.25 10.0858 11.5858 9.75 12 9.75ZM18.25 10.5C18.25 10.0858 17.9142 9.75 17.5 9.75C17.0858 9.75 16.75 10.0858 16.75 10.5V11.25H16C15.5858 11.25 15.25 11.5858 15.25 12C15.25 12.4142 15.5858 12.75 16 12.75H16.75V13.5C16.75 13.9142 17.0858 14.25 17.5 14.25C17.9142 14.25 18.25 13.9142 18.25 13.5V12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H18.25V10.5Z',
  d6: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d7: 'M4.25 11C4.25 9.48122 5.48122 8.25 7 8.25C8.01883 8.25 8.90728 8.80444 9.38164 9.62446C9.58905 9.983 9.46653 10.4418 9.10798 10.6492C8.74943 10.8566 8.29064 10.7341 8.08323 10.3755C7.86597 9.99996 7.46173 9.75 7 9.75C6.30964 9.75 5.75 10.3096 5.75 11V13C5.75 13.6904 6.30964 14.25 7 14.25C7.46173 14.25 7.86597 14 8.08323 13.6245C8.29064 13.2659 8.74943 13.1434 9.10798 13.3508C9.46653 13.5582 9.58905 14.017 9.38164 14.3755C8.90728 15.1956 8.01883 15.75 7 15.75C5.48122 15.75 4.25 14.5188 4.25 13V11Z',
  d8: 'M12 9.75C12.4142 9.75 12.75 10.0858 12.75 10.5V11.25H13.5C13.9142 11.25 14.25 11.5858 14.25 12C14.25 12.4142 13.9142 12.75 13.5 12.75H12.75V13.5C12.75 13.9142 12.4142 14.25 12 14.25C11.5858 14.25 11.25 13.9142 11.25 13.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H11.25V10.5C11.25 10.0858 11.5858 9.75 12 9.75Z',
  d9: 'M17.5 9.75C17.9142 9.75 18.25 10.0858 18.25 10.5V11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H18.25V13.5C18.25 13.9142 17.9142 14.25 17.5 14.25C17.0858 14.25 16.75 13.9142 16.75 13.5V12.75H16C15.5858 12.75 15.25 12.4142 15.25 12C15.25 11.5858 15.5858 11.25 16 11.25H16.75V10.5C16.75 10.0858 17.0858 9.75 17.5 9.75Z',
  d10: 'M22 21V3H2V21L22 21Z',
  d11: 'M9 10.5V9.00002L5.5 9.00026V15.0001H9V13.5001',
  d12: 'M12.5 10V14M10.5 12H14.5',
  d13: 'M17.5 10V14M15.5 12H19.5',
  d14: 'M2 2.25C1.58579 2.25 1.25 2.58579 1.25 3V21C1.25 21.4142 1.58579 21.75 2 21.75L22 21.75C22.1989 21.75 22.3897 21.671 22.5303 21.5303C22.671 21.3897 22.75 21.1989 22.75 21V3C22.75 2.58579 22.4142 2.25 22 2.25H2ZM8.99995 8.25L5.49995 8.25024C5.08575 8.25027 4.75 8.58605 4.75 9.00024V15.0001C4.75 15.4143 5.08579 15.7501 5.5 15.7501H9C9.41421 15.7501 9.75 15.4143 9.75 15.0001V13.5001H8.25V14.2501H6.25V9.75019L8.25 9.75005V10.5H9.75V9C9.75 8.80108 9.67097 8.61031 9.53031 8.46965C9.38965 8.329 9.19887 8.24999 8.99995 8.25ZM11.75 11.25V10H13.25V11.25H14.5V12.75H13.25V14H11.75V12.75H10.5V11.25H11.75ZM16.75 10V11.25H15.5V12.75H16.75V14H18.25V12.75H19.5V11.25H18.25V10H16.75Z',
};

export const IconCStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-stroke-rounded IconCStrokeRounded"
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

export const IconCDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-duotone-rounded IconCDuotoneRounded"
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

export const IconCTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-twotone-rounded IconCTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-solid-rounded IconCSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-bulk-rounded IconCBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-stroke-sharp IconCStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
    </TheIconWrapper>
  );
};

export const IconCSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="c-solid-sharp IconCSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfC: TheIconSelfPack = {
  name: 'C',
  StrokeRounded: IconCStrokeRounded,
  DuotoneRounded: IconCDuotoneRounded,
  TwotoneRounded: IconCTwotoneRounded,
  SolidRounded: IconCSolidRounded,
  BulkRounded: IconCBulkRounded,
  StrokeSharp: IconCStrokeSharp,
  SolidSharp: IconCSolidSharp,
};