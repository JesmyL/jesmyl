import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 3.99316L20 20.0139',
  d2: 'M12.0094 7.97988C12.0094 6.85164 11.8211 4.37383 12.4988 3.62166C13.3394 2.88749 16.666 5.7015 18.2835 7.05527C17.4525 7.90748 17.0866 8.7261 14.6659 10.5224',
  d3: 'M17.5002 17.5094C14.6596 19.5714 13.4835 20.7984 12.6288 20.4349C12.5439 20.3988 12.4741 20.3347 12.427 20.2553C11.9013 19.3692 12.0095 17.0485 12.0095 15.9707V11.9932L4.97754 16.7062',
  d4: 'M12 17.3313V12.0029L17.4996 17.497L15.3882 19.0365C13.9098 20.1525 13.1706 20.7105 12.5853 20.4159C12 20.1213 12 19.1913 12 17.3313Z',
  d5: 'M4 4.01074L20 19.9935',
  d6: 'M11.9762 7.97457C11.9762 6.84755 11.7879 4.3724 12.4656 3.62104C13.3062 2.88766 16.6328 5.69864 18.2503 7.05096C17.4193 7.90225 17.0534 8.71999 14.6327 10.5144',
  d7: 'M17.4999 17.5132C14.6593 19.573 13.4832 20.7987 12.6285 20.4355C12.5436 20.3995 12.4738 20.3355 12.4267 20.2561C11.901 19.371 12.0092 17.0528 12.0092 15.9762V12.0029L5.0166 16.9835',
  d8: 'M4 4.01123L20 19.9965',
  d9: 'M11.9762 7.97478C11.9762 6.84758 11.7879 4.37205 12.4656 3.62057C13.2273 2.95594 16.03 5.20185 17.753 6.63565C18.0217 6.85922 18.043 7.26597 17.8163 7.53197C17.2105 8.24265 16.6005 9.05606 14.6327 10.515',
  d10: 'M17.4026 17.5393C14.5619 19.5995 13.4945 20.7984 12.6398 20.4352C12.5549 20.3991 12.4006 20.3638 12.2941 20.1844C11.8464 19.2751 12.0205 17.0519 12.0205 15.9751V12.0479L4.9502 17.0476',
  d11: 'M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z',
  d12: 'M16.1182 4.1011C16.4049 4.30499 16.6954 4.51163 16.9841 4.71692C17.487 5.0745 17.9498 5.40355 18.2777 5.71621C18.6309 6.0531 19 6.52976 19 7.19999C19 7.64811 18.7462 8.03992 18.4766 8.37764C18.2493 8.66239 17.9503 8.97703 17.6349 9.28464C17.0005 9.90333 16.2204 10.5699 15.6087 11.0392C15.1706 11.3754 14.5428 11.2927 14.2066 10.8545C13.8704 10.4163 13.9531 9.7886 14.3913 9.45241C14.9442 9.02817 15.6641 8.41302 16.2386 7.85281C16.4488 7.64778 16.6293 7.46007 16.771 7.29908C16.8402 7.2205 16.8325 7.10188 16.7521 7.03473C16.5389 6.85649 16.2295 6.63445 15.7704 6.30798L15.0204 5.77457C14.2082 5.19689 13.6884 4.83027 13.297 4.62857C13.1363 4.54573 13.0951 4.49974 13.066 4.6879C13.0029 5.09541 13 5.69976 13 6.66658V7.33365C13 7.88593 12.5523 8.33365 12 8.33365C11.4477 8.33365 11 7.88593 11 7.33365V6.66658C11 5.7714 10.9971 4.97926 11.0895 4.38205C11.183 3.77816 11.4231 3.04039 12.1935 2.67514C12.9423 2.3201 13.6681 2.56982 14.2132 2.85076C14.7478 3.12627 15.3855 3.57986 16.1182 4.1011Z',
  d13: 'M12.4581 11.1108C12.7911 11.2822 13.0005 11.6254 13.0005 12V17.3341C13.0005 18.2989 13.0031 18.9087 13.0632 19.3216C13.0787 19.4281 13.0764 19.4363 13.1721 19.3839C13.753 19.0658 14.2695 18.6267 14.7992 18.2333L16.9105 16.6923C17.3566 16.3667 17.9822 16.4644 18.3078 16.9104C18.6334 17.3565 18.5357 17.9821 18.0896 18.3077L15.985 19.8439C15.3868 20.296 14.7924 20.7769 14.1326 21.1382C13.6165 21.4208 12.8886 21.6943 12.1359 21.3151C11.3863 20.9375 11.1689 20.1925 11.0841 19.6099C10.9979 19.0181 11.0005 18.2314 11.0005 17.3341V13.9431L5.58129 17.8138C5.13187 18.1347 4.50733 18.0306 4.18633 17.5812C3.86533 17.1318 3.96944 16.5073 4.41886 16.1863L11.4193 11.1863C11.7241 10.9685 12.125 10.9394 12.4581 11.1108Z',
  d14: 'M4 3.98926L20 20.0003',
  d15: 'M6.00195 16.9986L12.002 11.9951L12.0034 20.501L17.502 17.2906',
  d16: 'M12.021 7.84147L11.9522 3.60088C11.9509 3.52273 12.0356 3.47336 12.1029 3.51304L17.9179 6.94222C17.9777 6.97747 17.9843 7.06146 17.9308 7.10564L14.289 10.1102',
  d17: 'M20.3358 21.75L2.25 3.66421L3.66421 2.25L21.75 20.3358L20.3358 21.75Z',
  d18: 'M11.5019 2.63283C11.8124 2.4545 12.1945 2.45581 12.5038 2.63627L18.5025 6.13624C18.7841 6.30056 18.9679 6.59186 18.995 6.91678C19.0222 7.24171 18.8892 7.55946 18.6387 7.76819L14.6942 11.1602L13.2745 9.74049L16.2626 7.14488L12.9999 5.24123V9.46588L10.9999 7.46588V3.5C10.9999 3.14192 11.1913 2.81117 11.5019 2.63283Z',
  d19: 'M12.4237 11.0944C12.775 11.2589 12.9995 11.6118 12.9996 11.9998L13.0007 18.7589L16.9956 16.428L18.0035 18.1555L12.5049 21.3637C12.1957 21.5442 11.8135 21.5455 11.503 21.3672C11.1925 21.1889 11.001 20.8582 11.001 20.5002L10.9999 14.1347L6.63974 17.7682L5.35938 16.2318L11.3594 11.2318C11.6575 10.9834 12.0723 10.9298 12.4237 11.0944Z',
};

export const IconBluetoothNotConnectedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-stroke-rounded IconBluetoothNotConnectedStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-duotone-rounded IconBluetoothNotConnectedDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-twotone-rounded IconBluetoothNotConnectedTwotoneRounded"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-solid-rounded IconBluetoothNotConnectedSolidRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-bulk-rounded IconBluetoothNotConnectedBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-stroke-sharp IconBluetoothNotConnectedStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBluetoothNotConnectedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bluetooth-not-connected-solid-sharp IconBluetoothNotConnectedSolidSharp"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBluetoothNotConnected: TheIconSelfPack = {
  name: 'BluetoothNotConnected',
  StrokeRounded: IconBluetoothNotConnectedStrokeRounded,
  DuotoneRounded: IconBluetoothNotConnectedDuotoneRounded,
  TwotoneRounded: IconBluetoothNotConnectedTwotoneRounded,
  SolidRounded: IconBluetoothNotConnectedSolidRounded,
  BulkRounded: IconBluetoothNotConnectedBulkRounded,
  StrokeSharp: IconBluetoothNotConnectedStrokeSharp,
  SolidSharp: IconBluetoothNotConnectedSolidSharp,
};