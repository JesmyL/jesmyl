import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 15.5C13.5 14.5572 13.5 14.0858 13.7929 13.7929C14.0858 13.5 14.5572 13.5 15.5 13.5H20C20.9428 13.5 21.4142 13.5 21.7071 13.7929C22 14.0858 22 14.5572 22 15.5V20C22 20.9428 22 21.4142 21.7071 21.7071C21.4142 22 20.9428 22 20 22H15.5C14.5572 22 14.0858 22 13.7929 21.7071C13.5 21.4142 13.5 20.9428 13.5 20V15.5Z',
  d2: 'M2 4C2 3.05719 2 2.58579 2.29289 2.29289C2.58579 2 3.05719 2 4 2H8.5C9.44281 2 9.91421 2 10.2071 2.29289C10.5 2.58579 10.5 3.05719 10.5 4V8.5C10.5 9.44281 10.5 9.91421 10.2071 10.2071C9.91421 10.5 9.44281 10.5 8.5 10.5H4C3.05719 10.5 2.58579 10.5 2.29289 10.2071C2 9.91421 2 9.44281 2 8.5V4Z',
  d3: 'M2 15.5C2 14.5572 2 14.0858 2.29289 13.7929C2.58579 13.5 3.05719 13.5 4 13.5H8.5C9.44281 13.5 9.91421 13.5 10.2071 13.7929C10.5 14.0858 10.5 14.5572 10.5 15.5V20C10.5 20.9428 10.5 21.4142 10.2071 21.7071C9.91421 22 9.44281 22 8.5 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20V15.5Z',
  d4: 'M13.5 4C13.5 3.05719 13.5 2.58579 13.7929 2.29289C14.0858 2 14.5572 2 15.5 2H20C20.9428 2 21.4142 2 21.7071 2.29289C22 2.58579 22 3.05719 22 4V8.5C22 9.44281 22 9.91421 21.7071 10.2071C21.4142 10.5 20.9428 10.5 20 10.5H15.5C14.5572 10.5 14.0858 10.5 13.7929 10.2071C13.5 9.91421 13.5 9.44281 13.5 8.5V4Z',
  d5: 'M15.4553 12.75L15.5 12.75H20L20.0448 12.75C20.4776 12.75 20.8744 12.7499 21.1972 12.7933C21.5527 12.8411 21.9284 12.9535 22.2374 13.2626C22.5465 13.5716 22.6589 13.9473 22.7067 14.3028C22.7501 14.6256 22.7501 15.0224 22.75 15.4553V15.4553L22.75 15.5V20L22.75 20.0448V20.0448C22.7501 20.4776 22.7501 20.8744 22.7067 21.1972C22.6589 21.5527 22.5465 21.9284 22.2374 22.2374C21.9284 22.5465 21.5527 22.6589 21.1972 22.7067C20.8744 22.7501 20.4776 22.7501 20.0448 22.75H20.0448L20 22.75H15.5L15.4553 22.75H15.4553C15.0224 22.7501 14.6256 22.7501 14.3028 22.7067C13.9473 22.6589 13.5716 22.5465 13.2626 22.2374C12.9535 21.9284 12.8411 21.5527 12.7933 21.1972C12.7499 20.8744 12.75 20.4776 12.75 20.0448L12.75 20V15.5L12.75 15.4553C12.75 15.0224 12.7499 14.6256 12.7933 14.3028C12.8411 13.9473 12.9535 13.5716 13.2626 13.2626C13.5716 12.9535 13.9473 12.8411 14.3028 12.7933C14.6256 12.7499 15.0224 12.75 15.4553 12.75Z',
  d6: 'M3.95526 1.25L4.00001 1.25001H8.50001L8.54475 1.25C8.97757 1.24995 9.3744 1.24991 9.69721 1.29331C10.0527 1.3411 10.4284 1.45355 10.7374 1.76257C11.0465 2.07159 11.1589 2.44732 11.2067 2.8028C11.2501 3.12561 11.2501 3.52244 11.25 3.95525V3.95526L11.25 4.00001V8.50001L11.25 8.54475V8.54476C11.2501 8.97758 11.2501 9.3744 11.2067 9.69721C11.1589 10.0527 11.0465 10.4284 10.7374 10.7374C10.4284 11.0465 10.0527 11.1589 9.69721 11.2067C9.3744 11.2501 8.97758 11.2501 8.54476 11.25H8.54475L8.50001 11.25H4.00001L3.95526 11.25H3.95525C3.52244 11.2501 3.12561 11.2501 2.8028 11.2067C2.44732 11.1589 2.07159 11.0465 1.76257 10.7374C1.45355 10.4284 1.3411 10.0527 1.29331 9.69721C1.24991 9.3744 1.24995 8.97757 1.25 8.54475L1.25001 8.50001V4.00001L1.25 3.95526C1.24995 3.52244 1.24991 3.12561 1.29331 2.8028C1.3411 2.44732 1.45355 2.07159 1.76257 1.76257C2.07159 1.45355 2.44732 1.3411 2.8028 1.29331C3.12561 1.24991 3.52244 1.24995 3.95526 1.25Z',
  d7: 'M3.95526 12.75L4.00001 12.75H8.50001L8.54475 12.75C8.97757 12.75 9.3744 12.7499 9.69721 12.7933C10.0527 12.8411 10.4284 12.9535 10.7374 13.2626C11.0465 13.5716 11.1589 13.9473 11.2067 14.3028C11.2501 14.6256 11.2501 15.0224 11.25 15.4553V15.4553L11.25 15.5V20L11.25 20.0448V20.0448C11.2501 20.4776 11.2501 20.8744 11.2067 21.1972C11.1589 21.5527 11.0465 21.9284 10.7374 22.2374C10.4284 22.5465 10.0527 22.6589 9.69721 22.7067C9.3744 22.7501 8.97758 22.7501 8.54476 22.75H8.54475L8.50001 22.75H4.00001L3.95526 22.75H3.95525C3.52244 22.7501 3.12561 22.7501 2.8028 22.7067C2.44732 22.6589 2.07159 22.5465 1.76257 22.2374C1.45355 21.9284 1.3411 21.5527 1.29331 21.1972C1.24991 20.8744 1.24995 20.4776 1.25 20.0448L1.25001 20V15.5L1.25 15.4553C1.24995 15.0224 1.24991 14.6256 1.29331 14.3028C1.3411 13.9473 1.45355 13.5716 1.76257 13.2626C2.07159 12.9535 2.44732 12.8411 2.8028 12.7933C3.12561 12.7499 3.52244 12.75 3.95526 12.75Z',
  d8: 'M15.4553 1.25L15.5 1.25001H20L20.0448 1.25C20.4776 1.24995 20.8744 1.24991 21.1972 1.29331C21.5527 1.3411 21.9284 1.45355 22.2374 1.76257C22.5465 2.07159 22.6589 2.44732 22.7067 2.8028C22.7501 3.12561 22.7501 3.52244 22.75 3.95525V3.95526L22.75 4.00001V8.50001L22.75 8.54475V8.54476C22.7501 8.97758 22.7501 9.3744 22.7067 9.69721C22.6589 10.0527 22.5465 10.4284 22.2374 10.7374C21.9284 11.0465 21.5527 11.1589 21.1972 11.2067C20.8744 11.2501 20.4776 11.2501 20.0448 11.25H20.0448L20 11.25H15.5L15.4553 11.25H15.4553C15.0224 11.2501 14.6256 11.2501 14.3028 11.2067C13.9473 11.1589 13.5716 11.0465 13.2626 10.7374C12.9535 10.4284 12.8411 10.0527 12.7933 9.69721C12.7499 9.3744 12.75 8.97757 12.75 8.54475L12.75 8.50001V4.00001L12.75 3.95526C12.75 3.52244 12.7499 3.12561 12.7933 2.8028C12.8411 2.44732 12.9535 2.07159 13.2626 1.76257C13.5716 1.45355 13.9473 1.3411 14.3028 1.29331C14.6256 1.24991 15.0224 1.24995 15.4553 1.25Z',
  d9: 'M22 13.5H13.5V22H22V13.5Z',
  d10: 'M10.5 2H2V10.5H10.5V2Z',
  d11: 'M10.5 13.5H2V22H10.5V13.5Z',
  d12: 'M21.9991 2H13.4991V10.5H22L21.9991 2Z',
  d13: 'M12.9697 12.9697C13.1103 12.829 13.3011 12.75 13.5 12.75H22C22.4142 12.75 22.75 13.0858 22.75 13.5V22C22.75 22.4142 22.4142 22.75 22 22.75H13.5C13.0858 22.75 12.75 22.4142 12.75 22V13.5C12.75 13.3011 12.829 13.1103 12.9697 12.9697Z',
  d14: 'M1.46967 1.46967C1.61032 1.32902 1.80109 1.25 2 1.25H10.5C10.9142 1.25 11.25 1.58579 11.25 2V10.5C11.25 10.9142 10.9142 11.25 10.5 11.25H2C1.58579 11.25 1.25 10.9142 1.25 10.5V2C1.25 1.80109 1.32902 1.61032 1.46967 1.46967Z',
  d15: 'M1.46967 12.9697C1.61032 12.829 1.80109 12.75 2 12.75H10.5C10.9142 12.75 11.25 13.0858 11.25 13.5V22C11.25 22.4142 10.9142 22.75 10.5 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22V13.5C1.25 13.3011 1.32902 13.1103 1.46967 12.9697Z',
  d16: 'M12.7491 2C12.7491 1.58579 13.0849 1.25 13.4991 1.25H21.9991C22.4133 1.25 22.749 1.58574 22.7491 1.99992L22.75 10.4999C22.75 10.6988 22.671 10.8896 22.5304 11.0303C22.3897 11.171 22.1989 11.25 22 11.25H13.4991C13.0849 11.25 12.7491 10.9142 12.7491 10.5V2Z',
};

export const IconMicrosoftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-stroke-rounded IconMicrosoftStrokeRounded"
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

export const IconMicrosoftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-duotone-rounded IconMicrosoftDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconMicrosoftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-twotone-rounded IconMicrosoftTwotoneRounded"
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
        opacity="0.3" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicrosoftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-solid-rounded IconMicrosoftSolidRounded"
    >
      <path 
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMicrosoftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-bulk-rounded IconMicrosoftBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMicrosoftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-stroke-sharp IconMicrosoftStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicrosoftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="microsoft-solid-sharp IconMicrosoftSolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMicrosoft: TheIconSelfPack = {
  name: 'Microsoft',
  StrokeRounded: IconMicrosoftStrokeRounded,
  DuotoneRounded: IconMicrosoftDuotoneRounded,
  TwotoneRounded: IconMicrosoftTwotoneRounded,
  SolidRounded: IconMicrosoftSolidRounded,
  BulkRounded: IconMicrosoftBulkRounded,
  StrokeSharp: IconMicrosoftStrokeSharp,
  SolidSharp: IconMicrosoftSolidSharp,
};