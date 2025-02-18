import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.22687 9.22687L15 15M9.22687 9.22687C9.73219 8.72156 12.1154 9.21665 12.8351 9.22687M9.22687 9.22687C8.72156 9.73219 9.21665 12.1154 9.22687 12.8351',
  d2: 'M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25ZM15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L11.0236 12.4378L10.909 12.5523C10.7037 12.7578 10.4865 12.9751 10.2945 13.126C10.1546 13.2361 9.63816 13.6397 8.99535 13.4213C8.35203 13.2028 8.21219 12.5751 8.17478 12.4053C8.12328 12.1714 8.09524 11.8704 8.06872 11.5857L8.06872 11.5857L8.06416 11.5368C8.02223 11.0883 7.9852 10.5671 8.00593 10.1024C8.01628 9.87025 8.04227 9.6158 8.10425 9.37332C8.16171 9.14853 8.27815 8.81922 8.54869 8.54869C8.81922 8.27815 9.14853 8.16171 9.37332 8.10425C9.6158 8.04226 9.87025 8.01628 10.1024 8.00593C10.5671 7.9852 11.0883 8.02223 11.5368 8.06416L11.5857 8.06872L11.5857 8.06872C11.8704 8.09524 12.1714 8.12328 12.4053 8.17478C12.5751 8.21219 13.2028 8.35203 13.4213 8.99535C13.6397 9.63816 13.2361 10.1546 13.126 10.2945C12.9751 10.4865 12.7577 10.7037 12.5523 10.909L12.4378 11.0236L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071Z',
  d3: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12Z',
  d4: 'M14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.4378 11.0236L12.5523 10.909C12.7577 10.7037 12.9751 10.4865 13.126 10.2945C13.2361 10.1546 13.6397 9.63816 13.4213 8.99535C13.2028 8.35203 12.5751 8.21219 12.4053 8.17478C12.1714 8.12327 11.8704 8.09524 11.5857 8.06872L11.5368 8.06416C11.0883 8.02223 10.5671 7.9852 10.1024 8.00593C9.87025 8.01628 9.6158 8.04227 9.37332 8.10425C9.14853 8.16171 8.81922 8.27815 8.54869 8.54869C8.27815 8.81922 8.16171 9.14853 8.10425 9.37332C8.04227 9.6158 8.01628 9.87025 8.00593 10.1023C7.9852 10.5671 8.02223 11.0883 8.06416 11.5368L8.06872 11.5857C8.09524 11.8704 8.12328 12.1714 8.17478 12.4053C8.21219 12.5751 8.35203 13.2028 8.99535 13.4213C9.63816 13.6397 10.1546 13.2361 10.2945 13.126C10.4865 12.9751 10.7037 12.7578 10.909 12.5523L11.0236 12.4378L14.2929 15.7071Z',
  d5: 'M15 15L9.25981 9.25981M14 9L9 9V14',
  d6: 'M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12ZM14.1103 9.85938H10.921L15.6406 14.579L14.58 15.6397L9.86029 10.92V14.1094H8.36029V8.35938H14.1103V9.85938Z',
};

export const IconCircleArrowUpLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-stroke-rounded IconCircleArrowUpLeftStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-duotone-rounded IconCircleArrowUpLeftDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-twotone-rounded IconCircleArrowUpLeftTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-solid-rounded IconCircleArrowUpLeftSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-bulk-rounded IconCircleArrowUpLeftBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-stroke-sharp IconCircleArrowUpLeftStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-arrow-up-left-solid-sharp IconCircleArrowUpLeftSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowUpLeft: TheIconSelfPack = {
  name: 'CircleArrowUpLeft',
  StrokeRounded: IconCircleArrowUpLeftStrokeRounded,
  DuotoneRounded: IconCircleArrowUpLeftDuotoneRounded,
  TwotoneRounded: IconCircleArrowUpLeftTwotoneRounded,
  SolidRounded: IconCircleArrowUpLeftSolidRounded,
  BulkRounded: IconCircleArrowUpLeftBulkRounded,
  StrokeSharp: IconCircleArrowUpLeftStrokeSharp,
  SolidSharp: IconCircleArrowUpLeftSolidSharp,
};