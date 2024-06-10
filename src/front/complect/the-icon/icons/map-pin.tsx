import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 9.00195C4.82497 9.01507 3.64706 9.11956 2.87868 9.95197C2 10.9039 2 12.4359 2 15.5001C2 18.5642 2 20.0963 2.87868 21.0482C3.75736 22.0001 5.17157 22.0001 8 22.0001H16C18.8284 22.0001 20.2426 22.0001 21.1213 21.0482C22 20.0963 22 18.5642 22 15.5001C22 12.4359 22 10.9039 21.1213 9.95197C20.3529 9.11956 19.175 9.01507 17 9.00195',
  d2: 'M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6',
  d3: 'M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11',
  d4: 'M8 22.0001H16H16C18.8284 22.0001 20.2426 22.0001 21.1213 21.0482C22 20.0963 22 18.5642 22 15.5001C22 12.4359 22 10.9039 21.1213 9.95197C20.3529 9.11956 19.175 9.01507 17 9.00195H7C4.82497 9.01507 3.64706 9.11956 2.87868 9.95197C2 10.9039 2 12.4359 2 15.5001C2 18.5642 2 20.0963 2.87868 21.0482C3.75736 22.0001 5.17157 22.0001 7.99999 22.0001H8Z',
  d5: 'M9.41213 8.33787C9.5 8.42574 9.5 8.56716 9.5 8.85V9.99805C9.5 11.3788 10.6193 12.498 12 12.498C13.3807 12.498 14.5 11.3788 14.5 9.99805V8.85C14.5 8.56716 14.5 8.42574 14.5879 8.33787C14.6757 8.25 14.8172 8.25 15.1 8.25H16.0588H16.0588C17.423 8.24998 18.5289 8.24996 19.3999 8.37682C20.3115 8.5096 21.0736 8.79452 21.6724 9.4432C22.2633 10.0833 22.5156 10.8837 22.6345 11.8415C22.75 12.7727 22.75 13.9601 22.75 15.4484V15.5497C22.75 17.038 22.75 18.2253 22.6345 19.1566C22.5156 20.1144 22.2633 20.9147 21.6724 21.5549C21.0736 22.2035 20.3115 22.4885 19.3999 22.6212C18.5289 22.7481 17.423 22.7481 16.0587 22.7481H7.94126C6.577 22.7481 5.47112 22.7481 4.60009 22.6212C3.68845 22.4885 2.92636 22.2035 2.32758 21.5549C1.73668 20.9147 1.48441 20.1144 1.36555 19.1566C1.24997 18.2253 1.24998 17.0379 1.25 15.5497V15.4484C1.24998 13.9601 1.24997 12.7727 1.36555 11.8415C1.48441 10.8837 1.73668 10.0833 2.32758 9.4432C2.92636 8.79452 3.68845 8.5096 4.60009 8.37682C5.47111 8.24996 6.577 8.24998 7.94124 8.25H7.94126H8.9C9.18284 8.25 9.32426 8.25 9.41213 8.33787ZM6.50403 11.1364C6.02698 10.8581 5.41466 11.0192 5.13638 11.4963C4.8581 11.9733 5.01924 12.5857 5.49629 12.8639L8.60656 14.6783L5.44868 16.766C4.98797 17.0706 4.8614 17.6909 5.16598 18.1516C5.47056 18.6124 6.09094 18.7389 6.55165 18.4343L10.5332 15.8021L17.4963 19.8639C17.9733 20.1422 18.5857 19.9811 18.8639 19.504C19.1422 19.027 18.9811 18.4147 18.504 18.1364L15.6878 16.4936L18.5549 14.5822C19.0144 14.2759 19.1386 13.655 18.8322 13.1955C18.5259 12.7359 17.905 12.6118 17.4455 12.9181L13.7648 15.3719L6.50403 11.1364Z',
  d6: 'M12 1.25C10.4812 1.25 9.25 2.48122 9.25 4C9.25 5.09333 9.88804 6.03765 10.8121 6.4809C10.9235 6.53435 11 6.64387 11 6.76744V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10V6.76744C13 6.64387 13.0765 6.53435 13.1879 6.4809C14.112 6.03765 14.75 5.09333 14.75 4C14.75 2.48122 13.5188 1.25 12 1.25Z',
  d7: 'M9.5 8.85C9.5 8.56716 9.5 8.42574 9.41213 8.33787C9.32426 8.25 9.18284 8.25 8.9 8.25H7.94126C6.57702 8.24998 5.47112 8.24996 4.60009 8.37682C3.68845 8.5096 2.92636 8.79452 2.32758 9.4432C1.73668 10.0833 1.48442 10.8837 1.36555 11.8415C1.24997 12.7727 1.24999 13.9601 1.25 15.4484V15.5497C1.24999 17.0379 1.24997 18.2253 1.36555 19.1566C1.48442 20.1144 1.73668 20.9147 2.32758 21.5549C2.92636 22.2035 3.68845 22.4885 4.60009 22.6212C5.47112 22.7481 6.577 22.7481 7.94126 22.7481H16.0587C17.423 22.7481 18.5289 22.7481 19.3999 22.6212C20.3115 22.4885 21.0736 22.2035 21.6724 21.5549C22.2633 20.9147 22.5156 20.1144 22.6345 19.1566C22.75 18.2253 22.75 17.038 22.75 15.5497V15.4484C22.75 13.9601 22.75 12.7727 22.6345 11.8415C22.5156 10.8837 22.2633 10.0833 21.6724 9.4432C21.0736 8.79452 20.3115 8.5096 19.3999 8.37682C18.5289 8.24996 17.423 8.24998 16.0588 8.25H15.1C14.8172 8.25 14.6757 8.25 14.5879 8.33787C14.5 8.42574 14.5 8.56716 14.5 8.85V9.99805C14.5 11.3788 13.3807 12.498 12 12.498C10.6193 12.498 9.5 11.3788 9.5 9.99805V8.85Z',
  d8: 'M5.13638 11.4963C5.41466 11.0192 6.02698 10.8581 6.50403 11.1364L13.7648 15.3719L17.4455 12.9181C17.905 12.6118 18.5259 12.7359 18.8322 13.1955C19.1386 13.655 19.0144 14.2759 18.5549 14.5822L15.6878 16.4936L18.504 18.1364C18.9811 18.4147 19.1422 19.027 18.8639 19.504C18.5857 19.9811 17.9733 20.1422 17.4963 19.8639L10.5332 15.8021L6.55165 18.4343C6.09094 18.7389 5.47056 18.6124 5.16598 18.1516C4.8614 17.6909 4.98797 17.0706 5.44868 16.766L8.60656 14.6783L5.49629 12.8639C5.01924 12.5857 4.8581 11.9733 5.13638 11.4963Z',
  d9: 'M17 9H22V22H2V9H7',
  d10: 'M2 9.25H9.5V12.5H14.5V9.25H22C22.4142 9.25 22.75 9.58579 22.75 10V22C22.75 22.4142 22.4142 22.75 22 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22V10C1.25 9.58579 1.58579 9.25 2 9.25ZM5.49684 13.8638L8.60711 15.6781L5.44922 17.7658L6.55219 19.4342L10.5337 16.802L17.4968 20.8638L18.5046 19.1362L15.6883 17.4934L18.5554 15.5821L17.446 13.918L13.7654 16.3717L6.50458 12.1362L5.49684 13.8638Z',
  d11: 'M13 6.04198C13.883 5.6562 14.5 4.77516 14.5 3.75C14.5 2.36929 13.3807 1.25 12 1.25C10.6193 1.25 9.5 2.36929 9.5 3.75C9.5 4.77516 10.117 5.6562 11 6.04198V11H13V6.04198Z',
};

export const IconMapPinStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-stroke-rounded IconMapPinStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMapPinDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-duotone-rounded IconMapPinDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMapPinTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-twotone-rounded IconMapPinTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapPinSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-solid-rounded IconMapPinSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconMapPinBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-bulk-rounded IconMapPinBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMapPinStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-stroke-sharp IconMapPinStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapPinSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pin-solid-sharp IconMapPinSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMapPin: TheIconSelfPack = {
  name: 'MapPin',
  StrokeRounded: IconMapPinStrokeRounded,
  DuotoneRounded: IconMapPinDuotoneRounded,
  TwotoneRounded: IconMapPinTwotoneRounded,
  SolidRounded: IconMapPinSolidRounded,
  BulkRounded: IconMapPinBulkRounded,
  StrokeSharp: IconMapPinStrokeSharp,
  SolidSharp: IconMapPinSolidSharp,
};