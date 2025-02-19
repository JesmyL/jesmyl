import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.9598 10.9707C22.0134 11.8009 22.0134 12.6607 21.9598 13.4909C21.6856 17.7332 18.3536 21.1125 14.1706 21.3905C12.7435 21.4854 11.2536 21.4852 9.8294 21.3905C9.33896 21.3579 8.8044 21.2409 8.34401 21.0513C7.83177 20.8403 7.5756 20.7348 7.44544 20.7508C7.31527 20.7668 7.1264 20.9061 6.74868 21.1846C6.08268 21.6757 5.24367 22.0285 3.99943 21.9982C3.37026 21.9829 3.05568 21.9752 2.91484 21.7351C2.77401 21.495 2.94941 21.1626 3.30021 20.4978C3.78674 19.5758 4.09501 18.5203 3.62791 17.6746C2.82343 16.4666 2.1401 15.036 2.04024 13.4909C1.98659 12.6607 1.98659 11.8009 2.04024 10.9707C2.31441 6.72838 5.64639 3.34913 9.8294 3.07107C11.0318 2.99114 11.2812 2.97856 12.5 3.03368',
  d2: 'M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z',
  d3: 'M15.5879 3.5578C14.4203 3.16603 13.3185 3.02415 12.5 3.03368C11.2812 2.97856 11.0318 2.99114 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05567 21.9752 3.37025 21.9829 3.99941 21.9982C5.24365 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.57559 20.7348 7.83173 20.8403 8.3439 21.0512C8.80429 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0134 12.6607 22.0134 11.8009 21.9598 10.9707C21.7424 9.83744 21.3894 8.85603 20.9409 8.00834C20.3104 8.62202 19.4494 9 18.5 9C16.567 9 15 7.433 15 5.5C15 4.78147 15.2165 4.1135 15.5879 3.5578Z',
  d4: 'M9.77965 2.32273C10.9991 2.24167 11.2793 2.22788 12.5218 2.2839C12.9512 2.28946 13.166 2.29224 13.2543 2.41486L13.2609 2.4243C13.3445 2.55022 13.2651 2.76947 13.1064 3.20796C12.8758 3.84536 12.75 4.53299 12.75 5.25C12.75 8.56371 15.4363 11.25 18.75 11.25C19.95 11.25 21.0676 10.8977 22.0053 10.291C22.3357 10.0772 22.5009 9.97029 22.6053 10.0271C22.7098 10.0839 22.7098 10.27 22.7098 10.6421V10.9468C22.7639 11.8016 22.7634 12.685 22.7082 13.5392C22.4103 18.149 18.787 21.8353 14.2204 22.1389C12.7601 22.2359 11.2369 22.2357 9.77965 22.1389C9.21472 22.1013 8.59978 21.9677 8.05839 21.7448L7.93811 21.6953C7.7944 21.6362 7.72254 21.6067 7.63749 21.6023C7.58316 21.5994 7.51656 21.6077 7.46455 21.6236C7.38314 21.6486 7.32003 21.6952 7.1938 21.7883C6.40136 22.3726 5.40092 22.7825 3.98117 22.748L3.93544 22.7469C3.66155 22.7403 3.36961 22.7334 3.13152 22.6873C2.84475 22.6318 2.48996 22.4931 2.26791 22.1145C2.02623 21.7025 2.12313 21.2858 2.21688 21.0234C2.30536 20.7757 2.45874 20.4852 2.61542 20.1885L2.6369 20.1478C3.10323 19.2641 3.23314 18.5419 2.98381 18.0604C2.15148 16.804 1.40272 15.2556 1.2918 13.5392C1.23607 12.6768 1.23607 11.7848 1.2918 10.9224C1.58972 6.31257 5.213 2.62629 9.77965 2.32273Z',
  d5: 'M14.75 5.25C14.75 3.04086 16.5409 1.25 18.75 1.25C20.9591 1.25 22.75 3.04086 22.75 5.25C22.75 7.45914 20.9591 9.25 18.75 9.25C16.5409 9.25 14.75 7.45914 14.75 5.25Z',
  d6: 'M22.0012 5.98539C22.0012 7.90929 20.4342 9.46891 18.5012 9.46891C16.5682 9.46891 15.0012 7.90929 15.0012 5.98539C15.0012 4.06149 16.5682 2.50187 18.5012 2.50187C20.4342 2.50187 22.0012 4.06149 22.0012 5.98539Z',
  d7: 'M22.0013 10.5124V12.929C22.0013 17.3534 18.4102 20.9401 13.9803 20.9401H10.0261C8.77189 20.9401 7.42972 20.5752 6.37241 20.0625L2.13311 21.4924C2.05167 21.5206 1.97485 21.4399 2.00731 21.3601L3.51613 17.6099C2.63916 16.3256 2.00518 14.6008 2.00518 12.929V10.6016C2.00518 6.17717 5.59629 2.59049 10.0261 2.59049H12.6845',
  d8: 'M14.25 5.5C14.25 3.15279 16.1528 1.25 18.5 1.25C20.8472 1.25 22.75 3.15279 22.75 5.5C22.75 7.84721 20.8472 9.75 18.5 9.75C16.1528 9.75 14.25 7.84721 14.25 5.5Z',
  d9: 'M22.7499 12.2077V12.2077V12.2156V12.2157C22.7499 12.8705 22.7499 13.3217 22.7278 13.6405C22.4082 18.2443 18.7443 21.9082 14.1405 22.2278C13.8204 22.25 13.4486 22.25 12.7895 22.25H11.2105C10.5514 22.25 10.1796 22.25 9.85949 22.2278C8.63831 22.143 7.48219 21.8226 6.43709 21.3113L2.25865 22.7112C1.98141 22.804 1.67546 22.7273 1.47482 22.5146C1.27419 22.3019 1.21546 21.992 1.32436 21.7207L2.77921 18.0954C1.92471 16.8022 1.38603 15.2804 1.2722 13.6405C1.24999 13.3204 1.24999 12.8696 1.25 12.2105V12.2105C1.24999 11.5514 1.24999 11.1796 1.2722 10.8595C1.59176 6.25571 5.25571 2.59176 9.85949 2.2722C10.1796 2.24999 10.5514 2.24999 11.2105 2.25H11.2105H12.7701H12.7701C13.193 2.24999 13.5006 2.24999 13.752 2.25572C13.1198 3.17916 12.75 4.29639 12.75 5.5C12.75 8.67564 15.3244 11.25 18.5 11.25C20.0789 11.25 21.5092 10.6136 22.5483 9.58335C22.6335 9.98724 22.6925 10.4009 22.7235 10.8226C22.7476 11.1508 22.7484 11.5321 22.7499 12.2077Z',
};

export const IconNotificationBubbleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-stroke-rounded IconNotificationBubbleStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBubbleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-duotone-rounded IconNotificationBubbleDuotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBubbleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-twotone-rounded IconNotificationBubbleTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBubbleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-solid-rounded IconNotificationBubbleSolidRounded"
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

export const IconNotificationBubbleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-bulk-rounded IconNotificationBubbleBulkRounded"
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

export const IconNotificationBubbleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-stroke-sharp IconNotificationBubbleStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotificationBubbleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-bubble-solid-sharp IconNotificationBubbleSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationBubble: TheIconSelfPack = {
  name: 'NotificationBubble',
  StrokeRounded: IconNotificationBubbleStrokeRounded,
  DuotoneRounded: IconNotificationBubbleDuotoneRounded,
  TwotoneRounded: IconNotificationBubbleTwotoneRounded,
  SolidRounded: IconNotificationBubbleSolidRounded,
  BulkRounded: IconNotificationBubbleBulkRounded,
  StrokeSharp: IconNotificationBubbleStrokeSharp,
  SolidSharp: IconNotificationBubbleSolidSharp,
};