import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M18 12H16.2C15.5373 12 15 12.5373 15 13.2V13.8C15 14.4627 15.5373 15 16.2 15H16.8C17.4627 15 18 15.5373 18 16.2V16.8C18 17.4627 17.4627 18 16.8 18H15',
  d3: 'M8.5 12H10.5M12.5 12H10.5M10.5 12V18',
  d4: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.1335 22.25 11.9428 22.25H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V12.0572C1.74999 9.86647 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.86647 1.74999 12.0572 1.75ZM14.25 13.2C14.25 12.123 15.123 11.25 16.2 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H16.2C15.9515 12.75 15.75 12.9515 15.75 13.2V13.8C15.75 14.0485 15.9515 14.25 16.2 14.25H16.8C17.877 14.25 18.75 15.123 18.75 16.2V16.8C18.75 17.877 17.877 18.75 16.8 18.75H15C14.5858 18.75 14.25 18.4142 14.25 18C14.25 17.5858 14.5858 17.25 15 17.25H16.8C17.0485 17.25 17.25 17.0485 17.25 16.8V16.2C17.25 15.9515 17.0485 15.75 16.8 15.75H16.2C15.123 15.75 14.25 14.877 14.25 13.8V13.2ZM8.5 11.25C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75H9.75V18C9.75 18.4142 10.0858 18.75 10.5 18.75C10.9142 18.75 11.25 18.4142 11.25 18V12.75H12.5C12.9142 12.75 13.25 12.4142 13.25 12C13.25 11.5858 12.9142 11.25 12.5 11.25H8.5Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.86646 22.25 12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.1335 22.25 11.9428 22.25H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572C1.74999 9.86647 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.86647 1.74999 12.0572 1.75Z',
  d6: 'M14.25 13.2C14.25 12.123 15.123 11.25 16.2 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H16.2C15.9515 12.75 15.75 12.9515 15.75 13.2V13.8C15.75 14.0485 15.9515 14.25 16.2 14.25H16.8C17.877 14.25 18.75 15.123 18.75 16.2V16.8C18.75 17.877 17.877 18.75 16.8 18.75H15C14.5858 18.75 14.25 18.4142 14.25 18C14.25 17.5858 14.5858 17.25 15 17.25H16.8C17.0485 17.25 17.25 17.0485 17.25 16.8V16.2C17.25 15.9515 17.0485 15.75 16.8 15.75H16.2C15.123 15.75 14.25 14.877 14.25 13.8V13.2Z',
  d7: 'M7.75 12C7.75 11.5858 8.08579 11.25 8.5 11.25H12.5C12.9142 11.25 13.25 11.5858 13.25 12C13.25 12.4142 12.9142 12.75 12.5 12.75H11.25V18C11.25 18.4142 10.9142 18.75 10.5 18.75C10.0858 18.75 9.75 18.4142 9.75 18V12.75H8.5C8.08579 12.75 7.75 12.4142 7.75 12Z',
  d8: 'M21 3H3V21H21V3Z',
  d9: 'M2.25 3C2.25 2.58579 2.58579 2.25 3 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21V3ZM14.25 13.2C14.25 12.123 15.123 11.25 16.2 11.25H18.75V12.75H16.2C15.9515 12.75 15.75 12.9515 15.75 13.2V13.8C15.75 14.0485 15.9515 14.25 16.2 14.25H16.8C17.877 14.25 18.75 15.123 18.75 16.2V16.8C18.75 17.877 17.877 18.75 16.8 18.75H14.25V17.25H16.8C17.0485 17.25 17.25 17.0485 17.25 16.8V16.2C17.25 15.9515 17.0485 15.75 16.8 15.75H16.2C15.123 15.75 14.25 14.877 14.25 13.8V13.2ZM13.25 11.25H7.75V12.75H9.75V18.75H11.25V12.75H13.25V11.25Z',
};

export const IconTypescript01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-stroke-rounded IconTypescript01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconTypescript01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-duotone-rounded IconTypescript01DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconTypescript01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-twotone-rounded IconTypescript01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconTypescript01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-solid-rounded IconTypescript01SolidRounded"
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

export const IconTypescript01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-bulk-rounded IconTypescript01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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

export const IconTypescript01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-stroke-sharp IconTypescript01StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTypescript01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="typescript-01-solid-sharp IconTypescript01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTypescript01: TheIconSelfPack = {
  name: 'Typescript01',
  StrokeRounded: IconTypescript01StrokeRounded,
  DuotoneRounded: IconTypescript01DuotoneRounded,
  TwotoneRounded: IconTypescript01TwotoneRounded,
  SolidRounded: IconTypescript01SolidRounded,
  BulkRounded: IconTypescript01BulkRounded,
  StrokeSharp: IconTypescript01StrokeSharp,
  SolidSharp: IconTypescript01SolidSharp,
};