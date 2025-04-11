import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.05 22C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.4267 5.62803 21.4957 7.63364 21.4997 11.5V13',
  d2: 'M21 18.5L13 18.5M21 18.5C21 19.2002 19.0057 20.5085 18.5 21M21 18.5C21 17.7998 19.0057 16.4915 18.5 16',
  d3: 'M18 2V4M6 2V4',
  d4: 'M3 8H21',
  d5: 'M21.5 12.7568V12.2432C21.5 10.5138 21.5 9.12764 21.4217 8H2.57828C2.5 9.12764 2.5 10.5138 2.5 12.2432V12.7568C2.5 17.1141 2.5 19.2927 3.75212 20.6464C5.00424 22 7.01949 22 11.05 22H12.95C16.9805 22 18.9958 22 20.2479 20.6464C21.5 19.2927 21.5 17.1141 21.5 12.7568Z',
  d6: 'M13 19.2559C12.4477 19.2559 12 18.8081 12 18.2559C12 17.7036 12.4477 17.2559 13 17.2559L17.5 17.2559L17.5 16.6616C17.4999 16.486 17.4997 16.2703 17.5218 16.0939L17.5222 16.0905C17.538 15.9641 17.6098 15.388 18.1754 15.1137C18.7422 14.8387 19.2424 15.1407 19.3506 15.206L19.819 15.5451C20.1949 15.8397 20.7093 16.2454 21.1003 16.6259C21.2954 16.8157 21.4967 17.033 21.6555 17.2639C21.7967 17.4691 22 17.8193 22 18.25C22 18.6807 21.7967 19.0309 21.6555 19.2361C21.4967 19.467 21.2954 19.6843 21.1003 19.8741C20.7093 20.2546 20.1949 20.6602 19.8191 20.9549L19.3506 21.294C19.2424 21.3593 18.7422 21.6613 18.1754 21.3863C17.6098 21.112 17.538 20.5359 17.5222 20.4095L17.5218 20.4061C17.4997 20.2297 17.4999 20.014 17.5 19.8384L17.5 19.2559H13Z',
  d7: 'M13.0288 2H10.9712C9.02294 1.99997 7.45141 1.99994 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H11.05C11.6023 23 12.05 22.5523 12.05 22C12.05 21.4477 11.6023 21 11.05 21C9.00425 21 7.57858 20.9975 6.503 20.8412C5.4647 20.6903 4.89956 20.4142 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 11.1847 3.50042 10.2746 3.51713 9.48363C3.52283 9.2139 3.74413 9 4.01391 9H19.986C20.2558 9 20.4771 9.21402 20.4828 9.48374C20.4955 10.0821 20.499 10.7502 20.4997 11.501V13C20.4997 13.5523 20.9475 14 21.4997 14C22.052 14 22.4997 13.5523 22.4997 13V11.499C22.4977 9.58334 22.4813 8.04001 22.3041 6.81198C22.1236 5.56147 21.7617 4.51759 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 1.99994 14.9771 1.99997 13.0288 2Z',
  d8: 'M7 2C7 1.44772 6.55228 1 6 1C5.44772 1 5 1.44772 5 2V2.44885C5.38032 2.32821 5.78554 2.24208 6.21533 2.17961C6.46328 2.14357 6.72472 2.11476 7 2.09173V2Z',
  d9: 'M19 2.44885C18.6197 2.32821 18.2145 2.24208 17.7847 2.17961C17.5367 2.14357 17.2753 2.11476 17 2.09173V2C17 1.44772 17.4477 1 18 1C18.5523 1 19 1.44772 19 2V2.44885Z',
  d10: 'M18 22L21 19L18 16M20.4982 19L13 19',
  d11: 'M17.5 2V6M6.5 2V6',
  d12: 'M21 14V4H3V22H11',
  d13: 'M3 9H21',
  d14: 'M18.043 15.0859L16.6288 16.5002L17.9217 17.793L12.3359 17.793V19.793L17.9217 19.793L16.6288 21.0859L18.043 22.5002L21.7502 18.793L18.043 15.0859Z',
  d15: 'M16.5 1.5V3H7.5V1.5H5.5V3H3C2.58579 3 2.25 3.33579 2.25 3.75V21.525C2.25 22.0635 2.68652 22.5 3.225 22.5H11V20.55H4.2V9.5H19.8V14.025H21.75V3.75C21.75 3.33579 21.4142 3 21 3H18.5V1.5H16.5Z',
};

export const IconCalendarCheckOut01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 DuotoneRounded"
    >
      <path 
        d={d.d5}
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
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCalendarCheckOut01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CalendarCheckOut01 SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCalendarCheckOut01: TheIconSelfPack = [
  'CalendarCheckOut01',
  IconCalendarCheckOut01StrokeRounded,
  IconCalendarCheckOut01DuotoneRounded,
  IconCalendarCheckOut01TwotoneRounded,
  IconCalendarCheckOut01SolidRounded,
  IconCalendarCheckOut01BulkRounded,
  IconCalendarCheckOut01StrokeSharp,
  IconCalendarCheckOut01SolidSharp,
];