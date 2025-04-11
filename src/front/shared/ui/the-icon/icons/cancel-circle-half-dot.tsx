import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47714 18.2728 1.99998 12.75 1.99998',
  d2: 'M5.39856 5.07874C5.53691 4.9321 5.67948 4.78948 5.8261 4.65109M8.69733 2.72938C8.87884 2.64779 9.06313 2.57126 9.25 2.49998M3.48172 7.94191C3.39925 8.12517 3.32195 8.31126 3.25 8.49999',
  d3: 'M15.75 9L12.75 12M12.75 12L9.75 15M12.75 12L15.75 15M12.75 12L9.75 9',
  d4: 'M22.75 12C22.75 6.47714 18.2728 1.99998 12.75 1.99998C7.22715 1.99998 2.75 6.47714 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z',
  d5: 'M5.39856 5.07873C5.5369 4.93208 5.67948 4.78947 5.8261 4.65108M8.69733 2.72936C8.87884 2.64777 9.06313 2.57125 9.25 2.49997M3.25 8.49997C3.32195 8.31124 3.39925 8.12515 3.48172 7.94189M15.75 8.99998L12.75 12M12.75 12L9.75 15M12.75 12L15.75 15M12.75 12L9.75 8.99998',
  d6: 'M11.75 1.99997C11.75 1.44768 12.1977 0.99997 12.75 0.999969C18.8251 0.999969 23.75 5.92484 23.75 12C23.75 18.0751 18.8251 23 12.75 23C6.67487 23 1.75 18.0751 1.75 12C1.75 11.4477 2.19772 11 2.75 11C3.30228 11 3.75 11.4477 3.75 12C3.75 16.9705 7.77944 21 12.75 21C17.7206 21 21.75 16.9705 21.75 12C21.75 7.02941 17.7206 2.99997 12.75 2.99997C12.1977 2.99997 11.75 2.55225 11.75 1.99997ZM10.1843 2.14358C10.3812 2.6596 10.1224 3.23748 9.60639 3.43431C9.43765 3.49867 9.27124 3.56777 9.10731 3.64146C8.60358 3.86788 8.01166 3.64308 7.78524 3.13934C7.55881 2.63561 7.78362 2.04369 8.28735 1.81727C8.48645 1.72777 8.6886 1.64383 8.89361 1.56563C9.40963 1.3688 9.98751 1.62756 10.1843 2.14358ZM6.55331 3.96466C6.9324 4.36629 6.91414 4.99919 6.51252 5.37829C6.37995 5.50342 6.25103 5.63237 6.12594 5.76496C5.74694 6.16668 5.11404 6.18511 4.71232 5.80611C4.3106 5.42712 4.29218 4.79422 4.67117 4.3925C4.82278 4.2318 4.97902 4.07552 5.13968 3.92387C5.54131 3.54477 6.17421 3.56304 6.55331 3.96466ZM3.89211 7.02998C4.39574 7.25663 4.62028 7.84865 4.39363 8.35228C4.31916 8.51777 4.24936 8.68579 4.18441 8.85618C3.98768 9.37224 3.40985 9.63111 2.89379 9.43438C2.37773 9.23765 2.11887 8.65982 2.31559 8.14376C2.39453 7.93669 2.47934 7.73254 2.56981 7.5315C2.79646 7.02787 3.38848 6.80333 3.89211 7.02998Z',
  d7: 'M9.04289 8.29289C9.43342 7.90237 10.0666 7.90237 10.4571 8.29289L12.75 10.5858L15.0429 8.29289C15.4334 7.90237 16.0666 7.90237 16.4571 8.29289C16.8476 8.68342 16.8476 9.31658 16.4571 9.70711L14.1642 12L16.4571 14.2929C16.8476 14.6834 16.8476 15.3166 16.4571 15.7071C16.0666 16.0976 15.4334 16.0976 15.0429 15.7071L12.75 13.4142L10.4571 15.7071C10.0666 16.0976 9.43342 16.0976 9.04289 15.7071C8.65237 15.3166 8.65237 14.6834 9.04289 14.2929L11.3358 12L9.04289 9.70711C8.65237 9.31658 8.65237 8.68342 9.04289 8.29289Z',
  d8: 'M2.75 12C2.75 17.5229 7.22715 22 12.75 22C18.2728 22 22.75 17.5229 22.75 12C22.75 6.47718 18.2728 2.00003 12.75 2.00003',
  d9: 'M12.75 2.00003C7.22715 2.00003 2.75 6.47718 2.75 12',
  d10: 'M16.75 8.00003L12.75 12M12.75 12L8.75 16M12.75 12L16.75 16M12.75 12L8.75 8.00003',
  d11: 'M12.75 3.20454C17.6076 3.20454 21.5455 7.1424 21.5455 12C21.5455 16.8576 17.6076 20.7955 12.75 20.7955C7.89241 20.7955 3.95455 16.8576 3.95455 12C3.95455 11.5307 3.99121 11.0707 4.06166 10.6224L2.13081 10.319C2.04464 10.8673 2 11.4287 2 12C2 17.9371 6.81294 22.75 12.75 22.75C18.6871 22.75 23.5 17.9371 23.5 12C23.5 6.06294 18.6871 1.25 12.75 1.25C12.1788 1.25 11.6173 1.29464 11.069 1.38081L11.3724 3.31166C11.8207 3.24121 12.2807 3.20455 12.75 3.20454Z',
  d12: 'M7.21516 5.16397C7.92644 4.58729 8.72892 4.11975 9.59709 3.78626L8.89622 1.9617C7.83348 2.36992 6.85259 2.94169 5.98422 3.64574L7.21516 5.16397Z',
  d13: 'M4.53626 8.84708C4.86975 7.97891 5.33729 7.17644 5.91397 6.46516L4.39574 5.23422C3.69169 6.10259 3.11992 7.08348 2.7117 8.14622L4.53626 8.84708Z',
  d14: 'M12.75 13.4142L16.0429 16.7071L17.4571 15.2929L14.1642 12L17.4571 8.70711L16.0429 7.29289L12.75 10.5858L9.45712 7.29289L8.04291 8.70711L11.3358 12L8.04291 15.2929L9.45712 16.7071L12.75 13.4142Z',
};

export const IconCancelCircleHalfDotStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s s3 sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCancelCircleHalfDotSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CancelCircleHalfDot SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCancelCircleHalfDot: TheIconSelfPack = [
  'CancelCircleHalfDot',
  IconCancelCircleHalfDotStrokeRounded,
  IconCancelCircleHalfDotDuotoneRounded,
  IconCancelCircleHalfDotTwotoneRounded,
  IconCancelCircleHalfDotSolidRounded,
  IconCancelCircleHalfDotBulkRounded,
  IconCancelCircleHalfDotStrokeSharp,
  IconCancelCircleHalfDotSolidSharp,
];