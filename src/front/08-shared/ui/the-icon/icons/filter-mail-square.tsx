import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5C21 15.9783 21 18.2175 19.6088 19.6088C18.2175 21 15.9783 21 11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5Z',
  d2: 'M8.5 11.5L14.5001 11.5',
  d3: 'M9.5 15H13.5',
  d4: 'M7.5 8H15.5',
  d5: 'M11.4428 1.25H11.5572H11.5572C13.7479 1.24999 15.4686 1.24998 16.812 1.43059C18.1886 1.61568 19.2809 2.00272 20.1391 2.86091C20.9973 3.71911 21.3843 4.81137 21.5694 6.18802C21.75 7.53144 21.75 9.25214 21.75 11.4428V11.5572C21.75 13.7479 21.75 15.4686 21.5694 16.812C21.3843 18.1886 20.9973 19.2809 20.1391 20.1391C19.2809 20.9973 18.1886 21.3843 16.812 21.5694C15.4686 21.75 13.7479 21.75 11.5572 21.75H11.4428C9.2521 21.75 7.53144 21.75 6.18802 21.5694C4.81137 21.3843 3.71911 20.9973 2.86091 20.1391C2.00272 19.2809 1.61568 18.1886 1.43059 16.812C1.24998 15.4686 1.24999 13.7479 1.25 11.5572V11.5572V11.4428V11.4428C1.24999 9.25211 1.24998 7.53144 1.43059 6.18802C1.61568 4.81137 2.00272 3.71911 2.86091 2.86091C3.71911 2.00272 4.81137 1.61568 6.18802 1.43059C7.53144 1.24998 9.25212 1.24999 11.4428 1.25H11.4428ZM8.5 10.5C7.94772 10.5 7.5 10.9477 7.49999 11.5C7.49999 12.0523 7.9477 12.5 8.49999 12.5L14.5001 12.5C15.0523 12.5001 15.5001 12.0523 15.5001 11.5001C15.5001 10.9478 15.0524 10.5001 14.5001 10.5L8.5 10.5ZM8.5 15C8.5 14.4477 8.94772 14 9.5 14H13.5C14.0523 14 14.5 14.4477 14.5 15C14.5 15.5523 14.0523 16 13.5 16H9.5C8.94772 16 8.5 15.5523 8.5 15ZM7.5 7C6.94772 7 6.5 7.44772 6.5 8C6.5 8.55228 6.94772 9 7.5 9H15.5C16.0523 9 16.5 8.55228 16.5 8C16.5 7.44772 16.0523 7 15.5 7H7.5Z',
  d6: 'M11.5572 1.25H11.4428C9.25212 1.24999 7.53144 1.24998 6.18802 1.43059C4.81137 1.61568 3.71911 2.00272 2.86091 2.86091C2.00272 3.71911 1.61568 4.81137 1.43059 6.18802C1.24998 7.53144 1.24999 9.25212 1.25 11.4428V11.5572C1.24999 13.7479 1.24998 15.4686 1.43059 16.812C1.61568 18.1886 2.00272 19.2809 2.86091 20.1391C3.71911 20.9973 4.81137 21.3843 6.18802 21.5694C7.53144 21.75 9.2521 21.75 11.4428 21.75H11.5572C13.7479 21.75 15.4686 21.75 16.812 21.5694C18.1886 21.3843 19.2809 20.9973 20.1391 20.1391C20.9973 19.2809 21.3843 18.1886 21.5694 16.812C21.75 15.4686 21.75 13.7479 21.75 11.5572V11.4428C21.75 9.25214 21.75 7.53144 21.5694 6.18802C21.3843 4.81137 20.9973 3.71911 20.1391 2.86091C19.2809 2.00272 18.1886 1.61568 16.812 1.43059C15.4686 1.24998 13.7479 1.24999 11.5572 1.25Z',
  d7: 'M7.49999 11.5C7.5 10.9477 7.94772 10.5 8.5 10.5L14.5001 10.5C15.0524 10.5001 15.5001 10.9478 15.5001 11.5001C15.5001 12.0523 15.0523 12.5001 14.5001 12.5L8.49999 12.5C7.9477 12.5 7.49999 12.0523 7.49999 11.5Z',
  d8: 'M8.5 15C8.5 14.4477 8.94772 14 9.5 14H13.5C14.0523 14 14.5 14.4477 14.5 15C14.5 15.5523 14.0523 16 13.5 16H9.5C8.94772 16 8.5 15.5523 8.5 15Z',
  d9: 'M6.5 8C6.5 7.44772 6.94772 7 7.5 7H15.5C16.0523 7 16.5 7.44772 16.5 8C16.5 8.55228 16.0523 9 15.5 9H7.5C6.94772 9 6.5 8.55228 6.5 8Z',
  d10: 'M8 12.0001L15.9999 12M10 15.5H14M7 8.5H17',
  d11: 'M21 3H3V21H21V3Z',
  d12: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3ZM7 9.5H17V7.5H7V9.5ZM8.00001 13.0001L15.9999 13L15.9999 11L7.99999 11.0001L8.00001 13.0001ZM10 16.5H14V14.5H10V16.5Z',
};

export const IconFilterMailSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-stroke-rounded IconFilterMailSquareStrokeRounded"
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

export const IconFilterMailSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-duotone-rounded IconFilterMailSquareDuotoneRounded"
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

export const IconFilterMailSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-twotone-rounded IconFilterMailSquareTwotoneRounded"
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

export const IconFilterMailSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-solid-rounded IconFilterMailSquareSolidRounded"
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

export const IconFilterMailSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-bulk-rounded IconFilterMailSquareBulkRounded"
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

export const IconFilterMailSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-stroke-sharp IconFilterMailSquareStrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconFilterMailSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="filter-mail-square-solid-sharp IconFilterMailSquareSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFilterMailSquare: TheIconSelfPack = {
  name: 'FilterMailSquare',
  StrokeRounded: IconFilterMailSquareStrokeRounded,
  DuotoneRounded: IconFilterMailSquareDuotoneRounded,
  TwotoneRounded: IconFilterMailSquareTwotoneRounded,
  SolidRounded: IconFilterMailSquareSolidRounded,
  BulkRounded: IconFilterMailSquareBulkRounded,
  StrokeSharp: IconFilterMailSquareStrokeSharp,
  SolidSharp: IconFilterMailSquareSolidSharp,
};