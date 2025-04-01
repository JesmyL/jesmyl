import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z',
  d2: 'M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21',
  d3: 'M3.92773 9.27683C3.92777 4.84138 7.54406 1.24986 11.9999 1.24986C16.4557 1.24986 20.072 4.84141 20.072 9.27689C20.0721 10.3086 20.1415 11.0872 20.6172 11.7871C20.7983 12.0496 21.1412 12.4935 21.3695 12.8504C21.6254 13.2502 21.8753 13.7323 21.9612 14.294C22.2415 16.1268 20.9493 17.3135 19.6624 17.8452C15.1297 19.7181 8.87004 19.7181 4.33734 17.8452C3.05043 17.3135 1.75824 16.1268 2.03855 14.294C2.12447 13.7323 2.3744 13.2502 2.63021 12.8504C2.85861 12.4934 3.20156 12.0495 3.38259 11.7871C3.85826 11.0872 3.92764 10.3085 3.92773 9.27683Z',
  d4: 'M14.7775 21.9509C13.9741 22.4562 13.0186 22.7476 11.9983 22.7476C10.9781 22.7476 10.0226 22.4562 9.21922 21.9509C8.50617 21.5025 8.14965 21.2783 8.27441 20.9056C8.39918 20.5329 8.89114 20.5746 9.87506 20.6581C11.2822 20.7774 12.7144 20.7774 14.1216 20.6581C15.1055 20.5746 15.5975 20.5329 15.7223 20.9056C15.847 21.2783 15.4905 21.5025 14.7775 21.9509Z',
  d5: 'M8.99884 20.9989C9.79497 21.6201 10.8463 21.9978 11.9988 21.9978C13.1513 21.9978 14.2027 21.6201 14.9988 20.9989',
  d6: 'M19.5368 12.4032V9.49425C19.5368 5.35652 16.1786 2.00223 12.036 2.00223C7.89335 2.00223 4.5351 5.35652 4.5351 9.49425V12.4032L2.53991 15.8465C2.51692 15.8862 2.52217 15.9349 2.55557 15.9664C5.45834 18.698 15.0948 21.1249 21.4333 15.9459C21.4707 15.9153 21.481 15.8618 21.4573 15.8197L19.5368 12.4032Z',
  d7: 'M3.91455 9.5C3.91455 4.94365 7.53467 1.25 12.0003 1.25C16.4659 1.25 20.0861 4.94365 20.0861 9.5V12.3008L22.2503 16.1652L21.7904 16.5687C19.5556 18.5294 15.971 19.75 12.0003 19.75C8.02958 19.75 4.44502 18.5294 2.21018 16.5687L1.75031 16.1652L3.91455 12.3008V9.5Z',
  d8: 'M9.46169 20.4089C10.1229 20.9254 11.0109 21.25 12 21.25C12.9891 21.25 13.8771 20.9254 14.5383 20.4089L15.4617 21.5911C14.5307 22.3183 13.316 22.75 12 22.75C10.6841 22.75 9.46936 22.3183 8.53833 21.5911L9.46169 20.4089Z',
};

export const IconNotification03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-stroke-rounded IconNotification03StrokeRounded"
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

export const IconNotification03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-duotone-rounded IconNotification03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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

export const IconNotification03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-twotone-rounded IconNotification03TwotoneRounded"
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

export const IconNotification03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-solid-rounded IconNotification03SolidRounded"
    >
      <path 
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

export const IconNotification03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-bulk-rounded IconNotification03BulkRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-stroke-sharp IconNotification03StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotification03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="notification-03-solid-sharp IconNotification03SolidSharp"
    >
      <path 
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

export const iconPackOfNotification03: TheIconSelfPack = {
  name: 'Notification03',
  StrokeRounded: IconNotification03StrokeRounded,
  DuotoneRounded: IconNotification03DuotoneRounded,
  TwotoneRounded: IconNotification03TwotoneRounded,
  SolidRounded: IconNotification03SolidRounded,
  BulkRounded: IconNotification03BulkRounded,
  StrokeSharp: IconNotification03StrokeSharp,
  SolidSharp: IconNotification03SolidSharp,
};