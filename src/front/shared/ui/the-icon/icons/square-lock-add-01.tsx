import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.0658 22C9.43835 22 8.11054 21.966 6.6557 21.9009C4.92675 21.8235 3.50598 20.515 3.27504 18.8447C3.12431 17.7547 3 16.6376 3 15.5C3 14.3624 3.12431 13.2453 3.27504 12.1553C3.50598 10.485 4.92675 9.17649 6.6557 9.09909C8.11054 9.03397 9.5884 9 11.2159 9C12.8433 9 14.3212 9.03397 15.776 9.09909C17.2713 9.16603 18.536 10.1538 19 11.5',
  d2: 'M6.5 9V6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5V9',
  d3: 'M17 22L17 14M13 18H21',
  d4: 'M3.26781 18.8447C3.49269 20.515 4.87613 21.8235 6.55966 21.9009C7.97627 21.966 9.4153 22 11 22C12.5847 22 14.0237 21.966 15.4403 21.9009C17.1239 21.8235 18.5073 20.515 18.7322 18.8447C18.879 17.7547 19 16.6376 19 15.5C19 14.3624 18.879 13.2453 18.7322 12.1553C18.5073 10.485 17.1239 9.17649 15.4403 9.09909C14.0237 9.03397 12.5847 9 11 9C9.4153 9 7.97627 9.03397 6.55966 9.09909C4.87613 9.17649 3.49269 10.485 3.26781 12.1553C3.12104 13.2453 3 14.3624 3 15.5C3 16.6376 3.12104 17.7547 3.26781 18.8447Z',
  d5: 'M10.5 3.25C8.567 3.25 7 4.817 7 6.75V9.25C7 9.80228 6.55228 10.25 6 10.25C5.44772 10.25 5 9.80228 5 9.25V6.75C5 3.71243 7.46243 1.25 10.5 1.25C13.5376 1.25 16 3.71243 16 6.75V9.25C16 9.80228 15.5523 10.25 15 10.25C14.4477 10.25 14 9.80228 14 9.25V6.75C14 4.817 12.433 3.25 10.5 3.25Z',
  d6: 'M10.5 8.25C8.90416 8.25 7.45364 8.28422 6.02522 8.34988C3.96716 8.4445 2.29609 10.0382 2.02452 12.0552C1.87636 13.1556 1.75 14.3118 1.75 15.5C1.75 16.6882 1.87636 17.8444 2.02452 18.9448C2.29609 20.9618 3.96716 22.5555 6.02522 22.6501C7.45364 22.7158 8.90416 22.75 10.5 22.75C11.7656 22.75 12.9398 22.7285 14.084 22.6868C14.4313 22.6742 14.605 22.6679 14.6896 22.577C14.7742 22.4862 14.7666 22.2704 14.7515 21.8388C14.7505 21.8093 14.75 21.7797 14.75 21.75V20.85C14.75 20.5672 14.75 20.4257 14.6621 20.3379C14.5743 20.25 14.4328 20.25 14.15 20.25H13.25C11.8693 20.25 10.75 19.1307 10.75 17.75C10.75 16.3693 11.8693 15.25 13.25 15.25H14.15C14.4328 15.25 14.5743 15.25 14.6621 15.1621C14.75 15.0743 14.75 14.9328 14.75 14.65V13.75C14.75 12.3693 15.8693 11.25 17.25 11.25C17.2869 11.25 17.3236 11.2508 17.3601 11.2524C18.1825 11.288 18.5936 11.3058 18.6844 11.147C18.7751 10.9882 18.6233 10.7544 18.3196 10.2866C17.5966 9.17282 16.3753 8.41427 14.9748 8.34989C13.5464 8.28422 12.0958 8.25 10.5 8.25Z',
  d7: 'M17.25 12.75C17.8023 12.75 18.25 13.1977 18.25 13.75L18.25 16.75H21.25C21.8023 16.75 22.25 17.1977 22.25 17.75C22.25 18.3023 21.8023 18.75 21.25 18.75H18.25L18.25 21.75C18.25 22.3023 17.8023 22.75 17.25 22.75C16.6977 22.75 16.25 22.3023 16.25 21.75L16.25 18.75H13.25C12.6977 18.75 12.25 18.3023 12.25 17.75C12.25 17.1977 12.6977 16.75 13.25 16.75H16.25L16.25 13.75C16.25 13.1977 16.6977 12.75 17.25 12.75Z',
  d8: 'M7 6.75C7 4.817 8.567 3.25 10.5 3.25C12.433 3.25 14 4.817 14 6.75V8.31016C14.327 8.32177 14.6515 8.33502 14.9748 8.34988C15.3298 8.3662 15.6732 8.42712 16 8.52712V6.75C16 3.71243 13.5376 1.25 10.5 1.25C7.46243 1.25 5 3.71243 5 6.75V8.52712C5.32676 8.42712 5.67023 8.3662 6.02522 8.34988C6.34854 8.33502 6.67299 8.32177 7 8.31016V6.75Z',
  d9: 'M16.9701 22V14M12.9785 18H20.9616',
  d10: 'M15.5047 9.00683V6.53084C15.5047 3.96508 13.5543 1.99902 11.114 1.99902C8.67365 1.99902 6.53134 3.96508 6.53134 6.53084L6.41138 9.00683M19.0014 12.0082V9.00683H2.96387L2.96507 22.0007H10.9954',
  d11: 'M11 3.25C9.067 3.25 7.5 4.817 7.5 6.75V9.25H5.5V6.75C5.5 3.71243 7.96243 1.25 11 1.25C14.0376 1.25 16.5 3.71243 16.5 6.75V9.25H14.5V6.75C14.5 4.817 12.933 3.25 11 3.25Z',
  d12: 'M18.75 19.75L18.75 22.75H16.75L16.75 19.75H13.75V17.75H16.75L16.75 14.75H18.75L18.75 17.75H21.75V19.75H18.75Z',
  d13: 'M19.75 8.25H2.25V22.75H15.25V21.25H12.25V16.25H15.25L15.25 13.25H19.75V8.25Z',
};

export const IconSquareLockAdd01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-stroke-rounded IconSquareLockAdd01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-duotone-rounded IconSquareLockAdd01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-twotone-rounded IconSquareLockAdd01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-solid-rounded IconSquareLockAdd01SolidRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-bulk-rounded IconSquareLockAdd01BulkRounded"
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-stroke-sharp IconSquareLockAdd01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareLockAdd01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-lock-add-01-solid-sharp IconSquareLockAdd01SolidSharp"
    >
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareLockAdd01: TheIconSelfPack = {
  name: 'SquareLockAdd01',
  StrokeRounded: IconSquareLockAdd01StrokeRounded,
  DuotoneRounded: IconSquareLockAdd01DuotoneRounded,
  TwotoneRounded: IconSquareLockAdd01TwotoneRounded,
  SolidRounded: IconSquareLockAdd01SolidRounded,
  BulkRounded: IconSquareLockAdd01BulkRounded,
  StrokeSharp: IconSquareLockAdd01StrokeSharp,
  SolidSharp: IconSquareLockAdd01SolidSharp,
};