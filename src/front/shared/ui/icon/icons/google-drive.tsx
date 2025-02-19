import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.0165 19.4118L21.4236 16.8293C21.811 16.1181 22.0048 15.7625 21.9999 15.3776C21.995 14.9927 21.7923 14.642 21.3869 13.9404L15.9448 4.52296C15.5155 3.78003 15.3009 3.40856 14.9431 3.20428C14.5852 3 14.1493 3 13.2773 3H10.7227C9.85074 3 9.41475 3 9.05694 3.20428C8.69913 3.40856 8.48447 3.78003 8.05515 4.52296L2.61306 13.9404C2.20767 14.642 2.00497 14.9927 2.00009 15.3776C1.99521 15.7625 2.18895 16.1181 2.57643 16.8293L3.98351 19.4118C4.40512 20.1856 4.61592 20.5725 4.97988 20.7862C5.34384 21 5.7918 21 6.68772 21H17.3123C18.2082 21 18.6562 21 19.0201 20.7862C19.3841 20.5725 19.5949 20.1856 20.0165 19.4118Z',
  d2: 'M9 4L16 15',
  d3: 'M5.5 20.5L12 9',
  d4: 'M21 15H9',
  d5: 'M15.4106 14.0737L9.31268 4.49135C9.1574 4.24734 9.07976 4.12534 9.03988 3.98839C9 3.85144 9 3.70682 9 3.4176V3H15L22 15H17.0979C16.561 15 16.2925 15 16.0677 14.8766C15.843 14.7532 15.6988 14.5267 15.4106 14.0737Z',
  d6: 'M6.86294 17.8064L12 9L8.5 3.5L2 15L3.34653 17.6931C4.07538 19.1508 4.4398 19.8796 5.03549 19.8988C5.63117 19.918 6.04176 19.2141 6.86294 17.8064Z',
  d7: 'M9 4L16 15M12 9L5.5 20.5M21 15H9',
  d8: 'M13.644 2.00154C14.3465 2.00151 15.116 1.95985 15.7478 2.3115C16.0669 2.48914 16.2954 2.72875 16.4938 2.99755L21.51 11.5027C21.9026 12.1684 22.0989 12.5013 21.9504 12.7506C21.8019 13 21.4073 13 20.6182 13H15.3222C14.7703 13 14.4944 13 14.2633 12.8767C14.0323 12.7533 13.8841 12.5269 13.5877 12.0742L8.12359 3.72641C7.94035 3.44647 7.96262 3.08337 8.17876 2.8267C8.34851 2.62513 8.54292 2.44932 8.79051 2.3115C9.4223 1.95983 10.1918 2.00151 10.8944 2.00154H13.644Z',
  d9: 'M5.65883 21.6065C5.48823 21.9181 5.13317 22.0684 4.7999 21.9702C4.29856 21.8224 3.91049 21.4787 3.6223 21.0444C3.44947 20.784 3.27561 20.4544 3.07874 20.0812L1.63967 17.3534C1.45893 17.0109 1.29873 16.7073 1.18814 16.4392C0.929892 15.8133 0.93749 15.1901 1.21103 14.5709C1.32814 14.3058 1.49573 14.0063 1.68483 13.6684L5.96872 6.01234C6.34394 5.34176 6.53155 5.00647 6.82027 5.00009C7.109 4.99372 7.31087 5.32041 7.71461 5.97379L10.5277 10.5262C10.8375 11.0276 10.9924 11.2783 10.9997 11.5588C11.0071 11.8393 10.8654 12.098 10.5822 12.6152L5.65883 21.6065Z',
  d10: 'M22.204 15C22.5212 15 22.8027 15.1932 22.9026 15.4794C23.0686 15.9543 23.0126 16.4362 22.8092 16.8901C22.7006 17.1322 22.5434 17.4065 22.3661 17.716L20.9538 20.1806C20.7607 20.5177 20.59 20.8155 20.4205 21.0508C19.7517 21.9785 18.7383 22 17.7019 22L9.28978 22C8.55348 22 8.18534 22 8.04648 21.751C7.90763 21.5019 8.09028 21.1692 8.45558 20.5039L10.924 16.0077C11.194 15.516 11.329 15.2702 11.5526 15.1351C11.7763 15 12.0483 15 12.5924 15H22.204Z',
  d11: 'M8.99963 3.98682L15.9943 14.984',
  d12: 'M5.505 20.4878L12.005 8.98779',
  d13: 'M21.005 14.9878H9.005',
  d14: 'M22.0005 14.9916L15.0253 2.99756H8.99621C8.99265 2.99756 8.98936 2.99945 8.98757 3.00253L1.99817 15.0134L4.99952 20.9969C5.00122 21.0003 5.00467 21.0024 5.00845 21.0024H19.0102L22.0008 15.001C22.0023 14.998 22.0022 14.9945 22.0005 14.9916Z',
  d15: 'M8.30016 2.9884L1.24902 14.9725L4.27144 20.9656L11.5417 8.62167C11.5527 8.60299 11.5644 8.58496 11.5767 8.56759L8.30016 2.9884Z',
  d16: 'M9.61724 2.25L15.6554 2.25004L22.7158 14.2499H16.6645L9.61724 2.25Z',
  d17: 'M22.749 15.7499H16.2441C16.2349 15.75 16.2257 15.75 16.2165 15.7499H9.16908C9.14489 15.7499 9.12096 15.7487 9.09734 15.7465L5.56147 21.75H19.723L22.749 15.7499Z',
  d18: 'M9.97884 14.2499L12.4498 10.0544L14.9137 14.2499H9.97884Z',
};

export const IconGoogleDriveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-stroke-rounded IconGoogleDriveStrokeRounded"
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

export const IconGoogleDriveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-duotone-rounded IconGoogleDriveDuotoneRounded"
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

export const IconGoogleDriveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-twotone-rounded IconGoogleDriveTwotoneRounded"
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
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleDriveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-solid-rounded IconGoogleDriveSolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleDriveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-bulk-rounded IconGoogleDriveBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleDriveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-stroke-sharp IconGoogleDriveStrokeSharp"
    >
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
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGoogleDriveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="google-drive-solid-sharp IconGoogleDriveSolidSharp"
    >
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGoogleDrive: TheIconSelfPack = {
  name: 'GoogleDrive',
  StrokeRounded: IconGoogleDriveStrokeRounded,
  DuotoneRounded: IconGoogleDriveDuotoneRounded,
  TwotoneRounded: IconGoogleDriveTwotoneRounded,
  SolidRounded: IconGoogleDriveSolidRounded,
  BulkRounded: IconGoogleDriveBulkRounded,
  StrokeSharp: IconGoogleDriveStrokeSharp,
  SolidSharp: IconGoogleDriveSolidSharp,
};