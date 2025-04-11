import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 7H10.5C8.61438 7 7.67157 7 7.08579 7.58579C6.5 8.17157 6.5 9.11438 6.5 11V11.5C6.5 13.3856 6.5 14.3284 7.08579 14.9142C7.67157 15.5 8.61438 15.5 10.5 15.5H13.5C15.3856 15.5 16.3284 15.5 16.9142 14.9142C17.5 14.3284 17.5 13.3856 17.5 11.5V11C17.5 9.11438 17.5 8.17157 16.9142 7.58579C16.3284 7 15.3856 7 13.5 7Z',
  d2: 'M9 7V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V7',
  d3: 'M13.5 19L10.5 22M10.5 19L13.5 22',
  d4: 'M21 19L18 22M18 19L21 22',
  d5: 'M6 19L3 22M3 19L6 22',
  d6: 'M10.4342 6L10.5 6L13.5658 6C14.4523 5.99995 15.2161 5.99991 15.8278 6.08215C16.4833 6.17028 17.1117 6.36902 17.6213 6.87868C18.131 7.38835 18.3297 8.0167 18.4179 8.67221C18.5001 9.28387 18.5001 10.0477 18.5 10.9342V11.5658C18.5001 12.4523 18.5001 13.2161 18.4179 13.8278C18.3297 14.4833 18.131 15.1117 17.6213 15.6213C17.1117 16.131 16.4833 16.3297 15.8278 16.4179C15.2161 16.5001 14.4523 16.5001 13.5658 16.5H10.4342C9.54769 16.5001 8.78387 16.5001 8.17221 16.4179C7.5167 16.3297 6.88835 16.131 6.37868 15.6213C5.86902 15.1117 5.67028 14.4833 5.58215 13.8278C5.49991 13.2161 5.49995 12.4523 5.5 11.5658L5.5 11.5V11L5.5 10.9342C5.49995 10.0477 5.49991 9.28387 5.58215 8.67221C5.67028 8.0167 5.86902 7.38835 6.37868 6.87868C6.88835 6.36902 7.5167 6.17028 8.17221 6.08215C8.78387 5.99991 9.54769 5.99995 10.4342 6Z',
  d7: 'M12 3C10.8954 3 10 3.89543 10 5V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V5C14 3.89543 13.1046 3 12 3Z',
  d8: 'M9.79289 18.2929C10.1834 17.9024 10.8166 17.9024 11.2071 18.2929L12 19.0858L12.7929 18.2929C13.1834 17.9024 13.8166 17.9024 14.2071 18.2929C14.5976 18.6834 14.5976 19.3166 14.2071 19.7071L13.4142 20.5L14.2071 21.2929C14.5976 21.6834 14.5976 22.3166 14.2071 22.7071C13.8166 23.0976 13.1834 23.0976 12.7929 22.7071L12 21.9142L11.2071 22.7071C10.8166 23.0976 10.1834 23.0976 9.79289 22.7071C9.40237 22.3166 9.40237 21.6834 9.79289 21.2929L10.5858 20.5L9.79289 19.7071C9.40237 19.3166 9.40237 18.6834 9.79289 18.2929Z',
  d9: 'M17.2929 18.2929C17.6834 17.9024 18.3166 17.9024 18.7071 18.2929L19.5 19.0858L20.2929 18.2929C20.6834 17.9024 21.3166 17.9024 21.7071 18.2929C22.0976 18.6834 22.0976 19.3166 21.7071 19.7071L20.9142 20.5L21.7071 21.2929C22.0976 21.6834 22.0976 22.3166 21.7071 22.7071C21.3166 23.0976 20.6834 23.0976 20.2929 22.7071L19.5 21.9142L18.7071 22.7071C18.3166 23.0976 17.6834 23.0976 17.2929 22.7071C16.9024 22.3166 16.9024 21.6834 17.2929 21.2929L18.0858 20.5L17.2929 19.7071C16.9024 19.3166 16.9024 18.6834 17.2929 18.2929Z',
  d10: 'M2.29289 18.2929C2.68342 17.9024 3.31658 17.9024 3.70711 18.2929L4.5 19.0858L5.29289 18.2929C5.68342 17.9024 6.31658 17.9024 6.70711 18.2929C7.09763 18.6834 7.09763 19.3166 6.70711 19.7071L5.91421 20.5L6.70711 21.2929C7.09763 21.6834 7.09763 22.3166 6.70711 22.7071C6.31658 23.0976 5.68342 23.0976 5.29289 22.7071L4.5 21.9142L3.70711 22.7071C3.31658 23.0976 2.68342 23.0976 2.29289 22.7071C1.90237 22.3166 1.90237 21.6834 2.29289 21.2929L3.08579 20.5L2.29289 19.7071C1.90237 19.3166 1.90237 18.6834 2.29289 18.2929Z',
  d11: 'M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5V6.00036C14.7034 6.00224 15.3184 6.01366 15.8278 6.08215C15.8854 6.08989 15.9429 6.0985 16 6.10809V5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5V6.10809C8.05715 6.0985 8.11458 6.08989 8.17221 6.08215C8.68162 6.01366 9.29656 6.00224 10 6.00036V5Z',
  d12: 'M17.5 7H6.5V15.5H17.5V7Z',
  d13: 'M5.5 6H18.5V16H5.5V6Z',
  d14: 'M12 3C10.8954 3 10 3.89543 10 5V8H8V5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V8H14V5C14 3.89543 13.1046 3 12 3Z',
  d15: 'M10.5002 17.1719L12.0002 18.6719L13.5002 17.1719L14.9144 18.5861L13.4144 20.0861L14.9144 21.5861L13.5002 23.0003L12.0002 21.5003L10.5002 23.0003L9.08594 21.5861L10.5859 20.0861L9.08594 18.5861L10.5002 17.1719Z',
  d16: 'M17.5861 17.1719L19.0861 18.6719L20.5861 17.1719L22.0003 18.5861L20.5003 20.0861L22.0003 21.5861L20.5861 23.0003L19.0861 21.5003L17.5861 23.0003L16.1719 21.5861L17.6719 20.0861L16.1719 18.5861L17.5861 17.1719Z',
  d17: 'M3.41421 17.1719L4.91421 18.6719L6.41421 17.1719L7.82843 18.5861L6.32843 20.0861L7.82843 21.5861L6.41421 23.0003L4.91421 21.5003L3.41421 23.0003L2 21.5861L3.5 20.0861L2 18.5861L3.41421 17.1719Z',
};

export const IconLoginMethodStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod StrokeRounded"
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
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod DuotoneRounded"
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
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod TwotoneRounded"
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
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod StrokeSharp"
    >
      <path 
        d={d.d12}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s ss sw"
      />
      <path 
        d={d.d3}
        i-c="s ss sw"
      />
      <path 
        d={d.d4}
        i-c="s ss sw"
      />
      <path 
        d={d.d5}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconLoginMethodSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="LoginMethod SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
      <path 
        d={d.d17}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLoginMethod: TheIconSelfPack = [
  'LoginMethod',
  IconLoginMethodStrokeRounded,
  IconLoginMethodDuotoneRounded,
  IconLoginMethodTwotoneRounded,
  IconLoginMethodSolidRounded,
  IconLoginMethodBulkRounded,
  IconLoginMethodStrokeSharp,
  IconLoginMethodSolidSharp,
];