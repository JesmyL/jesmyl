import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 7.41601L13.5 7.41601M13.5 7.41601L19.75 7.41601C20.7165 7.41601 21.5 8.19951 21.5 9.16601C21.5 10.1325 20.7165 10.916 19.75 10.916L14.5 10.916L14.0224 13.993C13.7331 15.9216 13.5885 16.886 13.1816 17.5652C12.5094 18.6872 11.5 19.5 10.0264 19.5C9 19.5 8.3114 19.2463 6.46127 18.6296C5.28733 18.2383 4.70036 18.0426 4.23571 17.7236C3.47073 17.1983 2.91219 16.4233 2.65576 15.5315C2.5 14.9898 2.5 14.3711 2.5 13.1336L2.5 11.7287C2.5 9.94422 2.5 9.05198 2.83495 8.28584C2.98627 7.9397 3.18587 7.61674 3.42779 7.32659C3.96326 6.68438 4.7613 6.28535 6.35738 5.48731C7.65171 4.84015 8.29887 4.51657 8.96984 4.50082C9.27244 4.49372 9.57436 4.53246 9.86537 4.61571C10.5106 4.80031 11.0552 5.27678 12.1442 6.2297L13.5 7.41601Z',
  d2: 'M19.75 7.41601L13.5 7.41601L12.1442 6.2297C11.0552 5.27678 10.5106 4.80031 9.86537 4.61571C9.57436 4.53246 9.27244 4.49372 8.96984 4.50082C8.29887 4.51657 7.65171 4.84015 6.35738 5.48731C4.7613 6.28535 3.96326 6.68438 3.42779 7.32659C3.18587 7.61674 2.98627 7.9397 2.83495 8.28584C2.5 9.05198 2.5 9.94422 2.5 11.7287L2.5 13.1336C2.5 14.3711 2.5 14.9898 2.65576 15.5315C2.91219 16.4233 3.47073 17.1983 4.23571 17.7236C4.70036 18.0426 5.28733 18.2383 6.46127 18.6296C8.3114 19.2463 9 19.5 10.0264 19.5C11.5 19.5 12.5094 18.6872 13.1816 17.5652C13.5885 16.886 13.7331 15.9216 14.0224 13.993L14.5 10.916L19.75 10.916C20.7165 10.916 21.5 10.1325 21.5 9.16601C21.5 8.19951 20.7165 7.41601 19.75 7.41601Z',
  d3: 'M2.5 10.916L2.5 13.1336C2.5 14.3711 2.5 14.9898 2.65576 15.5315C2.9122 16.4233 3.47073 17.1983 4.23571 17.7236C4.70036 18.0426 5.28733 18.2383 6.46127 18.6296C8.3114 19.2463 9 19.5 10.0264 19.5C11.5 19.5 12.5094 18.6872 13.1816 17.5652C13.5885 16.886 13.7331 15.9216 14.0224 13.993L14.5 10.916L19.75 10.916C20.7165 10.916 21.5 10.1325 21.5 9.16601C21.5 9.11002 21.4974 9.05464 21.4922 9',
  d4: 'M13.7819 6.66601L19.7501 6.66601C21.1308 6.66601 22.2501 7.78529 22.2501 9.16601C22.2501 10.5467 21.1308 11.666 19.7501 11.666H15.1426L14.7642 14.1043L14.7636 14.108L14.7602 14.1306C14.6189 15.0726 14.5075 15.8158 14.3791 16.4068C14.2486 17.0075 14.0893 17.5095 13.825 17.9506C13.0597 19.2281 11.8368 20.25 10.0265 20.25C8.9395 20.25 8.15547 19.9875 6.61765 19.4727C5.55532 19.1188 4.36419 18.7216 3.81122 18.3418C2.90281 17.718 2.23955 16.7978 1.93503 15.7388C1.74967 15.0941 1.7498 12.6741 1.75003 11.5544C1.74954 9.93866 1.74923 8.89712 2.14782 7.9854C2.32752 7.57436 2.56454 7.19085 2.85182 6.8463C3.48904 6.08206 4.42076 5.61655 5.86616 4.8944C6.48994 4.5825 7.18176 4.23662 7.61775 4.06139C8.07134 3.87909 8.49402 3.76179 8.95232 3.75103C9.33056 3.74216 9.70797 3.79057 10.0717 3.89464C10.5125 4.02073 10.8918 4.24093 11.2847 4.53182C11.6624 4.81144 12.0901 5.18574 12.615 5.645L13.7819 6.66601Z',
  d5: 'M8.96984 7.41601L13.5 7.41601M13.5 7.41601L19.75 7.41601C20.7165 7.41601 21.5 8.19951 21.5 9.16601C21.5 10.1325 20.7165 10.916 19.75 10.916H14.5V16.5C14.5 18.1569 13.1569 19.5 11.5 19.5H5.5C3.84315 19.5 2.5 18.1569 2.5 16.5L2.5 8L6.35738 5.48731C7.68485 4.61571 8.29887 4.51657 8.96984 4.50083C9.27244 4.49373 9.57437 4.53246 9.86537 4.61571C10.5106 4.80031 11.0552 5.27679 12.1442 6.2297L13.5 7.41601Z',
  d6: 'M12.6149 5.64494L12.6149 5.64496L13.7818 6.66601L19.75 6.66601C21.1307 6.66601 22.25 7.78529 22.25 9.16601C22.25 10.5467 21.1307 11.666 19.75 11.666H15.25V16.5C15.25 18.5711 13.5711 20.25 11.5 20.25H5.5C3.42893 20.25 1.75 18.5711 1.75 16.5V7.59346L5.94691 4.85961C6.63997 4.40464 7.18466 4.1258 7.67062 3.96228C8.17094 3.79394 8.57409 3.75991 8.95225 3.75103C9.33049 3.74216 9.7079 3.79057 10.0717 3.89464C10.5124 4.02073 10.8918 4.24093 11.2847 4.53183C11.6623 4.81143 12.09 5.18571 12.6149 5.64494Z',
};

export const IconHandPointingRight02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-stroke-rounded IconHandPointingRight02StrokeRounded"
    >
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

export const IconHandPointingRight02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-duotone-rounded IconHandPointingRight02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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

export const IconHandPointingRight02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-twotone-rounded IconHandPointingRight02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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

export const IconHandPointingRight02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-solid-rounded IconHandPointingRight02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandPointingRight02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-bulk-rounded IconHandPointingRight02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandPointingRight02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-stroke-sharp IconHandPointingRight02StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandPointingRight02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-pointing-right-02-solid-sharp IconHandPointingRight02SolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHandPointingRight02: TheIconSelfPack = {
  name: 'HandPointingRight02',
  StrokeRounded: IconHandPointingRight02StrokeRounded,
  DuotoneRounded: IconHandPointingRight02DuotoneRounded,
  TwotoneRounded: IconHandPointingRight02TwotoneRounded,
  SolidRounded: IconHandPointingRight02SolidRounded,
  BulkRounded: IconHandPointingRight02BulkRounded,
  StrokeSharp: IconHandPointingRight02StrokeSharp,
  SolidSharp: IconHandPointingRight02SolidSharp,
};