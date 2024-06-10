import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2V6M8 4L8 6M16 4V6',
  d2: 'M19 6.5C19.7745 6.66593 20.3588 6.94287 20.8284 7.40508C22 8.55821 22 10.4141 22 14.126C22 17.8378 22 19.6938 20.8284 20.8469C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8469C2 19.6938 2 17.8378 2 14.126C2 10.4141 2 8.55821 3.17157 7.40508C3.64118 6.94287 4.2255 6.66593 5 6.5',
  d3: 'M18.5 14H18.491',
  d4: 'M5.50996 14H5.50098',
  d5: 'M14.5 14C14.5 15.3807 13.3807 16.5 12 16.5C10.6193 16.5 9.5 15.3807 9.5 14C9.5 12.6193 10.6193 11.5 12 11.5C13.3807 11.5 14.5 12.6193 14.5 14Z',
  d6: 'M3.0528 7.5129C2 8.69377 2 10.4625 2 14C2 17.5375 2 19.3062 3.0528 20.4871C3.22119 20.676 3.40678 20.8506 3.60746 21.0091C4.86213 22 6.74142 22 10.5 22H13.5C17.2586 22 19.1379 22 20.3925 21.0091C20.5932 20.8506 20.7788 20.676 20.9472 20.4871C22 19.3062 22 17.5375 22 14C22 10.4625 22 8.69377 20.9472 7.5129C20.7788 7.32403 20.5932 7.14935 20.3925 6.99087C19.1379 6 17.2586 6 13.5 6H10.5C6.74142 6 4.86213 6 3.60746 6.99087C3.40678 7.14935 3.22119 7.32403 3.0528 7.5129ZM12 16.5C13.3807 16.5 14.5 15.3807 14.5 14C14.5 12.6193 13.3807 11.5 12 11.5C10.6193 11.5 9.5 12.6193 9.5 14C9.5 15.3807 10.6193 16.5 12 16.5Z',
  d7: 'M12 1.125C12.5523 1.125 13 1.57272 13 2.125V6.125C13 6.67728 12.5523 7.125 12 7.125C11.4477 7.125 11 6.67728 11 6.125V2.125C11 1.57272 11.4477 1.125 12 1.125ZM8 3.125C8.55228 3.125 9 3.57272 9 4.125V6.125C9 6.67728 8.55228 7.125 8 7.125C7.44772 7.125 7 6.67728 7 6.125L7 4.125C7 3.57272 7.44772 3.125 8 3.125ZM16 3.125C16.5523 3.125 17 3.57272 17 4.125V6.125C17 6.67728 16.5523 7.125 16 7.125C15.4477 7.125 15 6.67728 15 6.125V4.125C15 3.57272 15.4477 3.125 16 3.125Z',
  d8: 'M5.49999 6.12564C5.5 6.12637 5.5 6.12518 5.5 6.12459V6.12463C5.5 7.50535 6.61929 8.62463 8 8.62463C8.5308 8.62463 9.02296 8.45921 9.42774 8.17711C9.74643 7.95501 9.90578 7.84396 10 7.84396C10.0942 7.84396 10.2536 7.95501 10.5723 8.17711C10.977 8.45921 11.4692 8.62463 12 8.62463C12.5308 8.62463 13.023 8.45921 13.4277 8.17711L13.4278 8.1771C13.7464 7.95501 13.9058 7.84396 14 7.84396C14.0942 7.84396 14.2536 7.95501 14.5723 8.17711C14.977 8.45921 15.4692 8.62463 16 8.62463C17.3807 8.62463 18.5 7.50535 18.5 6.12463C18.5 6.1232 18.5 6.12679 18.5 6.12564C18.5014 5.94599 18.6711 5.8029 18.8484 5.83187C18.8492 5.832 18.8432 5.83098 18.8413 5.83065L18.8419 5.83075C19.8508 6.00358 20.6828 6.33406 21.3545 6.99519C22.105 7.73383 22.4385 8.67167 22.5967 9.82913C22.75 10.952 22.75 12.386 22.75 14.1934V14.3078C22.75 16.1152 22.75 17.5492 22.5967 18.6721C22.4385 19.8295 22.105 20.7674 21.3545 21.506C20.6057 22.243 19.6578 22.5691 18.4875 22.724C17.349 22.8747 15.8941 22.8746 14.0557 22.8746H9.94433C8.10592 22.8746 6.65096 22.8747 5.51253 22.724C4.34225 22.5691 3.39427 22.243 2.64547 21.506C1.89501 20.7674 1.56146 19.8295 1.40335 18.6721C1.24997 17.5492 1.24998 16.1152 1.25 14.3078V14.3077V14.1935V14.1934C1.24998 12.386 1.24997 10.952 1.40335 9.82913C1.56146 8.67167 1.89501 7.73383 2.64547 6.99519C3.31717 6.33406 4.14915 6.00358 5.15809 5.83075L5.15882 5.83063C5.15703 5.83094 5.15081 5.832 5.15162 5.83187C5.32893 5.8029 5.49861 5.94599 5.49999 6.12564ZM18.5 13.25C19.0523 13.25 19.5 13.6977 19.5 14.25C19.5 14.8023 19.0523 15.25 18.5 15.25H18.491C17.9387 15.25 17.491 14.8023 17.491 14.25C17.491 13.6977 17.9387 13.25 18.491 13.25H18.5ZM6.50977 14.25C6.50977 13.6977 6.06205 13.25 5.50977 13.25H5.50078C4.9485 13.25 4.50078 13.6977 4.50078 14.25C4.50078 14.8023 4.9485 15.25 5.50078 15.25H5.50977C6.06205 15.25 6.50977 14.8023 6.50977 14.25ZM12 11C10.2051 11 8.75 12.4551 8.75 14.25C8.75 16.0449 10.2051 17.5 12 17.5C13.7949 17.5 15.25 16.0449 15.25 14.25C15.25 12.4551 13.7949 11 12 11Z',
  d9: 'M5.5 6.12463C5.5 6.1232 5.5 6.12679 5.49999 6.12564C5.49861 5.94599 5.32893 5.8029 5.15162 5.83187C5.15049 5.83205 5.16316 5.82988 5.15809 5.83075C4.14915 6.00358 3.31717 6.33406 2.64547 6.99519C1.89501 7.73383 1.56146 8.67167 1.40335 9.82913C1.24997 10.952 1.24998 12.386 1.25 14.1935V14.3077C1.24998 16.1152 1.24997 17.5492 1.40335 18.6721C1.56146 19.8295 1.89501 20.7674 2.64547 21.506C3.39427 22.243 4.34225 22.5691 5.51253 22.724C6.65096 22.8747 8.10592 22.8746 9.94433 22.8746H14.0557C15.8941 22.8746 17.349 22.8747 18.4875 22.724C19.6578 22.5691 20.6057 22.243 21.3545 21.506C22.105 20.7674 22.4385 19.8295 22.5967 18.6721C22.75 17.5492 22.75 16.1152 22.75 14.3078V14.1934C22.75 12.386 22.75 10.952 22.5967 9.82913C22.4385 8.67167 22.105 7.73383 21.3545 6.99519C20.6828 6.33406 19.8508 6.00358 18.8419 5.83075C18.8368 5.82988 18.8495 5.83205 18.8484 5.83187C18.6711 5.8029 18.5014 5.94599 18.5 6.12564C18.5 6.12679 18.5 6.1232 18.5 6.12463C18.5 7.50535 17.3807 8.62463 16 8.62463C15.4692 8.62463 14.977 8.45921 14.5723 8.17711C14.2536 7.95501 14.0942 7.84396 14 7.84396C13.9058 7.84396 13.7464 7.95501 13.4277 8.17711C13.023 8.45921 12.5308 8.62463 12 8.62463C11.4692 8.62463 10.977 8.45921 10.5723 8.17711C10.2536 7.95501 10.0942 7.84396 10 7.84396C9.90578 7.84396 9.74643 7.95501 9.42774 8.17711C9.02296 8.45921 8.5308 8.62463 8 8.62463C6.61929 8.62463 5.5 7.50535 5.5 6.12463Z',
  d10: 'M19.5 14.25C19.5 13.6977 19.0523 13.25 18.5 13.25H18.491C17.9387 13.25 17.491 13.6977 17.491 14.25C17.491 14.8023 17.9387 15.25 18.491 15.25H18.5C19.0523 15.25 19.5 14.8023 19.5 14.25Z',
  d11: 'M6.50977 14.25C6.50977 13.6977 6.06205 13.25 5.50977 13.25H5.50078C4.9485 13.25 4.50078 13.6977 4.50078 14.25C4.50078 14.8023 4.9485 15.25 5.50078 15.25H5.50977C6.06205 15.25 6.50977 14.8023 6.50977 14.25Z',
  d12: 'M8.75 14.25C8.75 12.4551 10.2051 11 12 11C13.7949 11 15.25 12.4551 15.25 14.25C15.25 16.0449 13.7949 17.5 12 17.5C10.2051 17.5 8.75 16.0449 8.75 14.25Z',
  d13: 'M12 2V7M8 4L8 7M16 4V7',
  d14: 'M19 6H22V22H2V6H5',
  d15: 'M5.75 5.25H2C1.58579 5.25 1.25 5.58579 1.25 6V22C1.25 22.4142 1.58579 22.75 2 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22V6C22.75 5.58579 22.4142 5.25 22 5.25H18.25V7.5H5.75V5.25ZM8.79883 14C8.79883 12.2051 10.2539 10.75 12.0488 10.75C13.8438 10.75 15.2988 12.2051 15.2988 14C15.2988 15.7949 13.8438 17.25 12.0488 17.25C10.2539 17.25 8.79883 15.7949 8.79883 14ZM4 13H6V15H4V13ZM18 13H20V15H18V13Z',
  d16: 'M11 6.25V1.25H13V6.25H11ZM7 6.25L7 3.25H9V6.25H7ZM15 6.25V3.25H17V6.25H15Z',
};

export const IconMoneyReceiveFlow01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-stroke-rounded IconMoneyReceiveFlow01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-duotone-rounded IconMoneyReceiveFlow01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
      />
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-twotone-rounded IconMoneyReceiveFlow01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-solid-rounded IconMoneyReceiveFlow01SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-bulk-rounded IconMoneyReceiveFlow01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-stroke-sharp IconMoneyReceiveFlow01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMoneyReceiveFlow01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="money-receive-flow-01-solid-sharp IconMoneyReceiveFlow01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoneyReceiveFlow01: TheIconSelfPack = {
  name: 'MoneyReceiveFlow01',
  StrokeRounded: IconMoneyReceiveFlow01StrokeRounded,
  DuotoneRounded: IconMoneyReceiveFlow01DuotoneRounded,
  TwotoneRounded: IconMoneyReceiveFlow01TwotoneRounded,
  SolidRounded: IconMoneyReceiveFlow01SolidRounded,
  BulkRounded: IconMoneyReceiveFlow01BulkRounded,
  StrokeSharp: IconMoneyReceiveFlow01StrokeSharp,
  SolidSharp: IconMoneyReceiveFlow01SolidSharp,
};