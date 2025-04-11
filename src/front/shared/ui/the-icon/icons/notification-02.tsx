import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z',
  d2: 'M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19',
  d3: 'M3.92786 9.27697C3.92789 4.84151 7.54419 1.25 12 1.25C16.4558 1.25 20.0721 4.84155 20.0721 9.27703C20.0722 10.3088 20.1416 11.0874 20.6173 11.7873C20.6835 11.8832 20.7712 12.0033 20.8671 12.1345L20.8671 12.1345C21.0337 12.3625 21.2247 12.624 21.3697 12.8505C21.6255 13.2503 21.8754 13.7324 21.9613 14.2942C22.2416 16.127 20.9494 17.3136 19.6625 17.8454C15.1298 19.7182 8.87016 19.7182 4.33746 17.8454C3.05056 17.3136 1.75836 16.127 2.03868 14.2942C2.12459 13.7324 2.37452 13.2503 2.63033 12.8505C2.77528 12.624 2.96636 12.3624 3.13291 12.1345L3.13294 12.1344C3.22882 12.0032 3.31657 11.8831 3.38271 11.7872C3.85838 11.0873 3.92776 10.3087 3.92786 9.27697Z',
  d4: 'M7.74341 17.7838C8.27717 17.6419 8.82485 17.9596 8.9667 18.4934C9.30659 19.7724 10.5207 20.7502 12.0002 20.7502C13.4798 20.7502 14.6939 19.7724 15.0338 18.4934C15.1756 17.9596 15.7233 17.6419 16.2571 17.7838C16.7908 17.9256 17.1086 18.4733 16.9667 19.0071C16.3896 21.1786 14.3697 22.7502 12.0002 22.7502C9.63084 22.7502 7.61087 21.1786 7.03379 19.0071C6.89194 18.4733 7.20965 17.9256 7.74341 17.7838Z',
  d5: 'M15.9993 18.0009C15.9993 20.209 14.2084 21.999 11.9993 21.999C9.79019 21.999 7.99933 20.209 7.99933 18.0009',
  d6: 'M19.5373 12.403V9.4938C19.5373 5.35563 16.179 2.00098 12.0364 2.00098C7.89384 2.00098 4.53559 5.35563 4.53559 9.4938V12.403L2.54039 15.8467C2.5174 15.8864 2.52266 15.9352 2.55605 15.9666C5.45881 18.6986 15.0953 21.1257 21.4338 15.9462C21.4712 15.9156 21.4815 15.8621 21.4578 15.82L19.5373 12.403Z',
  d7: 'M3.91342 9.5C3.91342 4.94365 7.53354 1.25 11.9992 1.25C16.4648 1.25 20.0849 4.94365 20.0849 9.5V12.3008L22.2492 16.1652L21.7893 16.5687C19.5545 18.5294 15.9699 19.75 11.9992 19.75C8.02846 19.75 4.44389 18.5294 2.20905 16.5687L1.74918 16.1652L3.91342 12.3008V9.5Z',
  d8: 'M11.9992 21.25C10.2043 21.25 8.74918 19.7949 8.74918 18H7.24918C7.24918 20.6234 9.37582 22.75 11.9992 22.75C14.6225 22.75 16.7492 20.6234 16.7492 18H15.2492C15.2492 19.7949 13.7941 21.25 11.9992 21.25Z',
};

export const IconNotification02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotification02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 DuotoneRounded"
    >
      <path 
        d={d.d1}
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
    </TheIconWrapper>
  );
};

export const IconNotification02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotification02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconNotification02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconNotification02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconNotification02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Notification02 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotification02: TheIconSelfPack = [
  'Notification02',
  IconNotification02StrokeRounded,
  IconNotification02DuotoneRounded,
  IconNotification02TwotoneRounded,
  IconNotification02SolidRounded,
  IconNotification02BulkRounded,
  IconNotification02StrokeSharp,
  IconNotification02SolidSharp,
];