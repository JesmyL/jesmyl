import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 22H22',
  d2: 'M15 22V16.2727C15 14.4653 13.6569 13 12 13C10.3431 13 9 14.4653 9 16.2727V22',
  d3: 'M17 10L20 10',
  d4: 'M4 10L7 10',
  d5: 'M11.5 10L12.5 10',
  d6: 'M4 22L4 6H20L20 22',
  d7: 'M5 6V5C5 3.58579 5 2.87868 5.43934 2.43934C5.87868 2 6.58579 2 8 2H16C17.4142 2 18.1213 2 18.5607 2.43934C19 2.87868 19 3.58579 19 5L19 6',
  d8: 'M3 6H21',
  d9: 'M4 22V6H20L20 22H15V16.2727C15 14.4653 13.6569 13 12 13C10.3431 13 9 14.4653 9 16.2727V22H4Z',
  d10: 'M1.25 21.75C1.25 21.1977 1.68754 20.75 2.22727 20.75H21.7727C22.3125 20.75 22.75 21.1977 22.75 21.75C22.75 22.3023 22.3125 22.75 21.7727 22.75H2.22727C1.68754 22.75 1.25 22.3023 1.25 21.75Z',
  d11: 'M3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7L21 7C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H20.499C20.496 4.43949 20.4839 3.82563 20.4362 3.47085C20.3663 2.95149 20.2042 2.41868 19.7678 1.98224C19.3313 1.5458 18.7985 1.38367 18.2792 1.31384C17.8034 1.24989 17.2157 1.24994 16.5616 1.25L7.43839 1.25C6.78427 1.24994 6.19655 1.24989 5.72084 1.31384C5.20149 1.38367 4.66867 1.5458 4.23223 1.98224C3.79579 2.41868 3.63366 2.95149 3.56383 3.47085C3.51614 3.82563 3.50404 4.43949 3.501 5H3ZM5.501 5C5.50362 4.46379 5.51301 3.98275 5.546 3.73735C5.58457 3.4505 5.63942 3.40261 5.64592 3.39693L5.64692 3.39593C5.6526 3.38942 5.70049 3.33457 5.98734 3.29601C6.31369 3.25213 6.76462 3.25001 7.5 3.25001L16.5 3.25001C17.2354 3.25001 17.6863 3.25213 18.0127 3.29601C18.2995 3.33457 18.3474 3.38942 18.3531 3.39593L18.3541 3.39692C18.3606 3.40261 18.4154 3.4505 18.454 3.73735C18.4853 3.97025 18.498 4.46721 18.5026 5L5.501 5Z',
  d12: 'M4 5.25C3.80109 5.25 3.61032 5.32902 3.46967 5.46967C3.32902 5.61032 3.25 5.80109 3.25 6L3.25 8.4C3.25 8.68284 3.25 8.82426 3.33787 8.91213C3.42574 9 3.56716 9 3.85 9H5C5.55228 9 6 9.44772 6 10C6 10.5523 5.55228 11 5 11H3.85C3.56716 11 3.42574 11 3.33787 11.0879C3.25 11.1757 3.25 11.3172 3.25 11.6L3.25 22C3.25 22.4142 3.58579 22.75 4 22.75L20 22.75C20.1989 22.75 20.3897 22.671 20.5303 22.5303C20.671 22.3897 20.75 22.1989 20.75 22L20.75 11.6C20.75 11.3172 20.75 11.1757 20.6621 11.0879C20.5743 11 20.4328 11 20.15 11H19C18.4477 11 18 10.5523 18 10C18 9.44771 18.4477 9 19 9H20.15C20.4328 9 20.5743 9 20.6621 8.91213C20.75 8.82426 20.75 8.68284 20.75 8.4L20.75 6C20.75 5.58579 20.4142 5.25 20 5.25L4 5.25ZM12 15C10.9756 15 10 15.9338 10 17.2727V22H8V17.2727C8 14.9967 9.71073 13 12 13C14.2893 13 16 14.9967 16 17.2727V22H14V17.2727C14 15.9338 13.0244 15 12 15ZM11.5 9C10.9477 9 10.5 9.44771 10.5 10C10.5 10.5523 10.9477 11 11.5 11H12.5C13.0523 11 13.5 10.5523 13.5 10C13.5 9.44772 13.0523 9 12.5 9H11.5Z',
  d13: 'M4 5.25C3.80109 5.25 3.61032 5.32902 3.46967 5.46967C3.32902 5.61032 3.25 5.80109 3.25 6C3.25 11.3333 3.25 16.6667 3.25 22C3.25 22.4142 3.58579 22.75 4 22.75H20C20.1989 22.75 20.3897 22.671 20.5303 22.5303C20.671 22.3897 20.75 22.1989 20.75 22C20.75 16.6667 20.75 11.3333 20.75 6C20.75 5.58579 20.4142 5.25 20 5.25H4Z',
  d14: 'M20.75 11V9H19.0002C18.4479 9 18.0002 9.44771 18.0002 10C18.0002 10.5523 18.4479 11 19.0002 11H20.75Z',
  d15: 'M3.25 11V9H5.00022C5.55251 9 6.00022 9.44772 6.00022 10C6.00022 10.5523 5.5525 11 5.00022 11H3.25Z',
  d16: 'M12 15C10.9756 15 10 15.9338 10 17.2727V22H8V17.2727C8 14.9967 9.71073 13 12 13C14.2893 13 16 14.9967 16 17.2727V22H14V17.2727C14 15.9338 13.0244 15 12 15Z',
  d17: 'M10.5 10C10.5 9.44772 10.9477 9 11.5 9L12.5 9C13.0523 9 13.5 9.44772 13.5 10C13.5 10.5523 13.0523 11 12.5 11L11.5 11C10.9477 11 10.5 10.5523 10.5 10Z',
  d18: 'M15 22V15H9V22',
  d19: 'M16 10L20 10',
  d20: 'M4 10L8 10',
  d21: 'M10.5 10L13.5 10',
  d22: 'M5 6V2H19V6',
  d23: 'M2 6H22',
  d24: 'M22 22.75H2V20.75H22V22.75Z',
  d25: 'M4.25 1.25H19.75V6H17.8125V3.15H6.1875V6H4.25V1.25Z',
  d26: 'M22 7H2V5H22V7Z',
  d27: 'M3.46967 5.46967C3.61032 5.32902 3.80109 5.25 4 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6V9.25H17V10.75H20.75L20.75 22H3.25V10.75H7V9.25H3.25V6C3.25 5.80109 3.32902 5.61032 3.46967 5.46967ZM8.25 15C8.25 14.5858 8.58579 14.25 9 14.25H15C15.4142 14.25 15.75 14.5858 15.75 15V22H14.25V15.75H9.75V22H8.25V15ZM13.5 10.75H10.5L10.5 9.25H13.5V10.75Z',
};

export const IconIndiaGateStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-stroke-rounded IconIndiaGateStrokeRounded"
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-duotone-rounded IconIndiaGateDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-twotone-rounded IconIndiaGateTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-solid-rounded IconIndiaGateSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-bulk-rounded IconIndiaGateBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-stroke-sharp IconIndiaGateStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
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
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconIndiaGateSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="india-gate-solid-sharp IconIndiaGateSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfIndiaGate: TheIconSelfPack = {
  name: 'IndiaGate',
  StrokeRounded: IconIndiaGateStrokeRounded,
  DuotoneRounded: IconIndiaGateDuotoneRounded,
  TwotoneRounded: IconIndiaGateTwotoneRounded,
  SolidRounded: IconIndiaGateSolidRounded,
  BulkRounded: IconIndiaGateBulkRounded,
  StrokeSharp: IconIndiaGateStrokeSharp,
  SolidSharp: IconIndiaGateSolidSharp,
};