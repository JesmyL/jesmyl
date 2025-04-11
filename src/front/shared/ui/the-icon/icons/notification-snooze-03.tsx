import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 11.8453C20.0629 11.9628 20.134 12.0791 20.2144 12.194C20.6932 12.8701 21.3394 13.5625 21.4701 14.394C21.6827 15.7471 20.732 16.6862 19.5679 17.1542C15.1052 18.9486 8.89481 18.9486 4.43205 17.1542C3.268 16.6862 2.31727 15.7471 2.52992 14.394C2.66061 13.5625 3.30684 12.8701 3.78561 12.194C4.41272 11.2975 4.47503 10.3197 4.47513 9.27941C4.47513 5.2591 7.84413 2 12 2C12.5136 2 13.0153 2.04979 13.5 2.14464',
  d2: 'M16.016 3H19.6884C20.4611 3 20.8474 3 20.9503 3.24011C21.0532 3.48023 20.7903 3.76827 20.2646 4.34436L16.8469 7.65564C16.3212 8.23173 15.9131 8.51977 16.016 8.75989C16.1189 9 16.6504 9 17.423 9H21',
  d3: 'M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21',
  d4: 'M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z',
  d5: 'M14.7776 21.955C13.9742 22.4602 13.0187 22.7516 11.9985 22.7516C10.9782 22.7516 10.0227 22.4602 9.21934 21.955C8.5063 21.5066 8.14977 21.2824 8.27454 20.9096C8.3993 20.5369 8.89126 20.5786 9.87518 20.6621C11.2824 20.7815 12.7146 20.7815 14.1217 20.6621C15.1057 20.5786 15.5976 20.5369 15.7224 20.9096C15.8472 21.2824 15.4906 21.5066 14.7776 21.955Z',
  d6: 'M14.7145 5.49966C15.0338 5.18212 15.1935 5.02335 15.1844 4.88704C15.1753 4.75072 14.9521 4.58117 14.5057 4.24205C13.8429 3.73855 13.4692 2.91974 13.5217 2.08985C13.5447 1.72533 13.5562 1.54307 13.4799 1.45135C13.4037 1.35962 13.2627 1.34264 12.9809 1.30868C12.6594 1.26994 12.332 1.25 12 1.25C7.54419 1.25 3.92789 4.84151 3.92786 9.27697C3.92776 10.3519 3.76863 11.2643 3.13289 12.1345C2.96634 12.3625 2.77527 12.624 2.63033 12.8505C2.37452 13.2503 2.12459 13.7324 2.03868 14.2942C1.75836 16.127 3.05056 17.3136 4.33746 17.8454C8.87016 19.7182 15.1298 19.7182 19.6625 17.8454C20.9494 17.3136 22.2416 16.127 21.9613 14.2942C21.8754 13.7324 21.6255 13.2503 21.3697 12.8505C21.0787 12.3958 20.7183 11.9855 20.4651 11.5069C20.2488 11.0979 20.1406 10.8935 20.0215 10.8218C19.9025 10.7501 19.7268 10.7501 19.3754 10.7501L17.3382 10.7501C16.6006 10.7505 15.8469 10.7389 15.1603 10.4353C14.7414 10.2501 14.0791 9.83573 13.7187 8.99475C13.332 8.09243 13.5313 7.26645 13.7567 6.7749C13.98 6.28809 14.3323 5.87981 14.7145 5.49966Z',
  d7: 'M19.1831 3.25003H16.0162C15.4639 3.25003 15.0162 2.80232 15.0162 2.25003C15.0162 1.69775 15.4639 1.25003 16.0162 1.25003L19.7458 1.25002C20.0812 1.24988 20.4352 1.24974 20.7149 1.29049C20.9866 1.33008 21.5982 1.46287 21.8697 2.09624C22.1375 2.72134 21.8231 3.25428 21.6698 3.47931C21.5102 3.71356 21.2707 3.97589 21.0416 4.22669L21.0416 4.22669L17.9288 7.25003H21.0002C21.5525 7.25003 22.0002 7.69775 22.0002 8.25003C22.0002 8.80232 21.5525 9.25003 21.0002 9.25003L17.378 9.25004H17.378C17.0296 9.25011 16.6505 9.25019 16.3457 9.21243C16.1853 9.19257 15.9734 9.15483 15.7665 9.06333C15.5513 8.9682 15.2561 8.77495 15.0971 8.40383C14.9278 8.00883 15.0092 7.64123 15.1197 7.40019C15.2163 7.18959 15.3572 7.02204 15.4489 6.919C15.5402 6.81641 15.6487 6.70678 15.7451 6.60945L15.7451 6.60945L19.1831 3.25003Z',
  d8: 'M8.99878 20.999C9.79491 21.6209 10.8463 21.999 11.9988 21.999C13.1513 21.999 14.2027 21.6209 14.9988 20.999',
  d9: 'M15.4988 3.99902H20.9988V4.49902L15.9988 9.49902V9.99902H21.4988',
  d10: 'M14.4919 2.41224C13.7223 2.14574 12.8958 2.00098 12.0354 2.00098C7.8928 2.00098 4.53455 5.35724 4.53455 9.49739V12.408L2.53932 15.8534C2.51635 15.8931 2.5216 15.9418 2.55498 15.9733C5.45746 18.7063 15.0927 21.1345 21.4312 15.9541C21.4693 15.9229 21.4792 15.8682 21.4541 15.8259L19.5022 12.5343',
  d11: 'M8.96041 20.4089C9.62165 20.9254 10.5096 21.25 11.4987 21.25C12.4878 21.25 13.3758 20.9254 14.037 20.4089L14.9604 21.5911C14.0294 22.3183 12.8147 22.75 11.4987 22.75C10.1828 22.75 8.96808 22.3183 8.03705 21.5911L8.96041 20.4089Z',
  d12: 'M19.8357 5H16.2499V3H22.7499V4.91421L18.6642 9H22.2499V11H15.7499V9.08579L19.8357 5Z',
  d13: 'M11.4998 1.25C7.03415 1.25 3.41403 4.94365 3.41403 9.5V12.3008L1.24979 16.1652L1.70966 16.5687C3.9445 18.5294 7.52907 19.75 11.4998 19.75C15.4705 19.75 19.0551 18.5294 21.2899 16.5687L21.7498 16.1652L19.6971 12.5H14.2498V8.46447L16.2143 6.5H14.7498V1.94349C13.7552 1.49754 12.6558 1.25 11.4998 1.25Z',
};

export const IconNotificationSnooze03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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

export const IconNotificationSnooze03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
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

export const IconNotificationSnooze03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationSnooze03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationSnooze03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationSnooze03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotificationSnooze03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="NotificationSnooze03 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotificationSnooze03: TheIconSelfPack = [
  'NotificationSnooze03',
  IconNotificationSnooze03StrokeRounded,
  IconNotificationSnooze03DuotoneRounded,
  IconNotificationSnooze03TwotoneRounded,
  IconNotificationSnooze03SolidRounded,
  IconNotificationSnooze03BulkRounded,
  IconNotificationSnooze03StrokeSharp,
  IconNotificationSnooze03SolidSharp,
];