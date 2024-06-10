import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 13.0004L16 14.0004C16 15.105 15.1046 16.0004 14 16.0004M14 16.0004L13 16.0004M14 16.0004C14.5523 16.0004 15 16.4481 15 17.0004C15 18.105 14.1046 19.0004 13 19.0004M13 19.0004L12 19.0004M13 19.0004C13.5235 19.0004 13.9217 19.4705 13.8356 19.9868L13.7785 20.3292C13.6178 21.2936 12.7834 22.0004 11.8057 22.0004L10.3332 22C8.15984 22 7.07314 22 6.208 21.6689C5.70614 21.4769 5.06612 20.9703 4.60362 20.5652C4.20359 20.2148 3.69618 20 3.1644 20L1.99983 20M14 13.0002L20.5 13.0002C21.3284 13.0002 22 12.3286 22 11.5002C22 10.6718 21.3284 10.0002 20.5 10.0002L10.5376 10L12.163 8.3797C12.8761 7.66877 12.8111 6.49772 12.0235 5.86965C11.4209 5.38907 10.5685 5.3758 9.95109 5.83738L5.35288 9.43707C4.47312 10.1258 3.11711 10.5 1.99983 10.5',
  d2: 'M22 4.5L16 4.5M22 4.5C22 3.79977 20.0057 2.49153 19.5 2M22 4.5C22 5.20023 20.0057 6.50847 19.5 7',
  d3: 'M16 14.0004L16 13.0002L20.5 13.0002C21.3284 13.0002 22 12.3286 22 11.5002C22 10.6718 21.3284 10.0002 20.5 10.0002L10.5376 10L12.163 8.3797C12.8761 7.66877 12.8111 6.49772 12.0235 5.86965C11.4209 5.38907 10.5685 5.3758 9.95109 5.83738L5.35288 9.43707C4.47312 10.1258 3.11711 10.5 1.99983 10.5L1.99983 20L3.1644 20C3.69618 20 4.20359 20.2148 4.60361 20.5652C5.06612 20.9703 5.70614 21.4769 6.20799 21.6689C7.07313 22 8.15984 22 10.3332 22L11.8057 22.0004C12.7834 22.0004 13.6178 21.2936 13.7785 20.3292L13.8356 19.9868C13.9217 19.4705 13.5235 19.0004 13 19.0004C14.1046 19.0004 15 18.105 15 17.0004C15 16.4481 14.5523 16.0004 14 16.0004C15.1046 16.0004 16 15.105 16 14.0004Z',
  d4: 'M21.4644 9.89194L10.3666 9.89194C10.1971 9.89194 10.0443 9.78738 9.97952 9.62707C9.91477 9.46677 9.95085 9.28233 10.0709 9.15987L11.8863 7.30815C12.5055 6.6765 12.4492 5.63646 11.7651 5.07817C11.5097 4.8698 11.2027 4.76015 10.8929 4.75C10.7464 4.75439 10.6002 4.77191 10.4561 4.80258C10.3462 4.83328 10.2391 4.87725 10.1369 4.93452L4.89077 8.84541C4.58105 9.08787 4.17608 9.29612 3.71972 9.45238L3.69045 9.4624C3.1854 9.63532 2.76611 9.77889 2.45197 9.91329C2.15825 10.039 1.80125 10.2162 1.57621 10.5311C1.36815 10.8223 1.30439 11.1517 1.27672 11.4419C1.25 11.7223 1.25002 12.0704 1.25004 12.4649L1.25002 18.866C1.2499 18.9857 1.24978 19.1101 1.26464 19.2245C1.36701 20.012 1.98691 20.6319 2.77449 20.7343C2.88881 20.7492 3.04487 20.749 3.16461 20.7489C3.49237 20.7489 3.82869 20.8821 4.10966 21.1282C4.56415 21.5263 5.29662 22.122 5.94016 22.3683C6.47307 22.5722 7.04581 22.6624 7.73268 22.706C8.40795 22.7489 9.2427 22.7489 10.3074 22.7489L11.806 22.7493C13.1503 22.7493 14.2975 21.7774 14.5185 20.4514C14.5424 20.3082 14.432 20.1779 14.2868 20.1779H12C11.7686 20.1779 11.5811 19.986 11.5811 19.7493C11.5811 19.5126 11.7686 19.3207 12 19.3207H14.3304C14.4205 19.3207 14.4656 19.3207 14.5093 19.3071C14.5529 19.2935 14.5878 19.2694 14.6575 19.2212C15.2246 18.8288 15.6068 18.4018 15.7066 17.3493C15.7321 17.0802 15.7448 16.9456 15.6556 16.8475C15.5663 16.7494 15.4217 16.7494 15.1325 16.7494H13.1168C12.8855 16.7494 12.698 16.5575 12.698 16.3208C12.698 16.0841 12.8855 15.8923 13.1168 15.8923H15.7373C15.8681 15.8923 15.9335 15.8923 15.9956 15.8621C16.0577 15.8319 16.093 15.7871 16.1635 15.6973C16.531 15.2298 16.7502 14.6402 16.7502 13.9993C16.7446 13.8835 16.7057 13.7051 16.6244 13.5399C16.5822 13.4542 16.5611 13.4113 16.4883 13.366C16.4155 13.3207 16.3482 13.3207 16.2137 13.3207H14.2337C14.0024 13.3207 13.8149 13.1288 13.8149 12.8921C13.8149 12.6554 14.0024 12.4635 14.2337 12.4635H21.4644C22.1745 12.4635 22.7502 11.8879 22.7502 11.1777C22.7502 10.4676 22.1745 9.89194 21.4644 9.89194Z',
  d5: 'M15.75 5.50586C15.1977 5.50586 14.75 5.05814 14.75 4.50586C14.75 3.95357 15.1977 3.50586 15.75 3.50586L18.25 3.50586L18.25 2.9116C18.2499 2.73596 18.2497 2.52031 18.2718 2.34387L18.2722 2.34053C18.288 2.21408 18.3598 1.63804 18.9254 1.36368C19.4923 1.08872 19.9924 1.39065 20.1006 1.45597L20.5691 1.79511C20.9449 2.08975 21.4594 2.49545 21.8504 2.87588C22.0455 3.06571 22.2467 3.28297 22.4056 3.51388C22.5468 3.71914 22.75 4.06933 22.75 4.5C22.75 4.93067 22.5468 5.28086 22.4056 5.48612C22.2467 5.71703 22.0455 5.93429 21.8504 6.12412C21.4594 6.50455 20.9449 6.91025 20.5691 7.20488L20.1006 7.54403C19.9924 7.60935 19.4922 7.91128 18.9254 7.63632C18.3598 7.36196 18.288 6.78592 18.2722 6.65947L18.2718 6.65613C18.2497 6.47969 18.2499 6.26403 18.25 6.0884L18.25 5.50586L15.75 5.50586Z',
  d6: 'M16 4.50098H21.4457M19.5 2.00098L22 4.50098L19.5 7.00098',
  d7: 'M2 10.005L4.00456 10.005L9.87723 5.60215C9.91112 5.57815 9.94444 5.55311 9.97748 5.52757C10.3905 5.20825 10.888 4.95178 11.4066 5.01132C12.2065 5.10315 12.8654 5.69596 12.9773 6.46394C13.043 6.9143 12.9117 7.52583 12.5326 7.9384L10.4078 10.036L12.1312 10.005H20.4343C21.2985 10.005 21.999 10.6794 21.999 11.5114C21.999 12.3433 21.2985 13.0178 20.4343 13.0178H12.0145M15.5114 13.5972L15.4646 14.7074C15.3397 15.5348 14.7658 15.9447 14.0513 15.9837L11.4903 16.0032M14.4964 16.3545V17.4553C14.5276 18.3063 13.8015 19.0246 12.9582 18.9972H10.9827M12.9811 19.6034L12.9582 20.5986C12.9398 21.3994 12.2729 21.9767 11.4409 21.9767L9.0307 21.9991C8.34906 21.9671 7.22355 21.9896 6.41926 21.7481C6.24995 21.6973 6.09428 21.6113 5.94566 21.5156L5.63547 21.3158L5.06417 20.8788L3.99836 20.0034H2.00113',
  d8: 'M12.7242 20.14H10.8861V19.3455H13.1141C13.8216 19.3455 14.3951 18.7611 14.3951 18.0402V16.6782C13.9252 16.735 13.3353 16.735 12.6087 16.735H11.4431V15.9405H12.58C13.3787 15.9405 13.9385 15.9396 14.3615 15.8817C14.7733 15.8253 14.9966 15.7214 15.1568 15.5582C15.317 15.395 15.419 15.1675 15.4743 14.7479C15.5215 14.3906 15.5301 13.9377 15.5317 13.3298H12.0001V12.5353L21.4689 12.5353C22.1764 12.5353 22.75 11.9509 22.75 11.23C22.75 10.5091 22.1764 9.92475 21.4689 9.92475L9.40354 9.92501L12.3593 6.84039C12.9202 6.16421 12.8237 5.14914 12.1434 4.59522C11.5747 4.13213 10.7656 4.13525 10.2004 4.60271L10.1884 4.61262L3.21794 9.92499H1.25017L1.25 20.48H3.21794C3.48802 20.7012 4.90654 21.8791 5.15509 22.0609C5.41707 22.2524 5.60165 22.3671 5.68725 22.4005C6.11696 22.568 6.61647 22.6581 7.32382 22.7038C8.03434 22.7498 8.92779 22.75 10.1433 22.75C10.7606 22.75 11.1932 22.7495 11.5264 22.7137C11.8527 22.6786 12.0385 22.6134 12.178 22.5139C12.3003 22.4266 12.4068 22.3182 12.4924 22.1935C12.5901 22.0514 12.6541 21.8621 12.6885 21.5296C12.7233 21.1937 12.7242 20.7586 12.7242 20.14Z',
  d9: 'M18.9217 5.45711L18.1288 6.25L19.543 7.66421L22.7502 4.45711L19.543 1.25L18.1288 2.66421L18.9217 3.45711L15.3359 3.45711V5.45711L18.9217 5.45711Z',
};

export const IconPointingRight05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-stroke-rounded IconPointingRight05StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingRight05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-duotone-rounded IconPointingRight05DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconPointingRight05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-twotone-rounded IconPointingRight05TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingRight05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-solid-rounded IconPointingRight05SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-bulk-rounded IconPointingRight05BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-stroke-sharp IconPointingRight05StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-05-solid-sharp IconPointingRight05SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPointingRight05: TheIconSelfPack = {
  name: 'PointingRight05',
  StrokeRounded: IconPointingRight05StrokeRounded,
  DuotoneRounded: IconPointingRight05DuotoneRounded,
  TwotoneRounded: IconPointingRight05TwotoneRounded,
  SolidRounded: IconPointingRight05SolidRounded,
  BulkRounded: IconPointingRight05BulkRounded,
  StrokeSharp: IconPointingRight05StrokeSharp,
  SolidSharp: IconPointingRight05SolidSharp,
};