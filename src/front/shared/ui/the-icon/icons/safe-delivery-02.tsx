import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2C7.58172 2 4 5.13401 4 9H20C20 5.13401 16.4183 2 12 2Z',
  d2: 'M8 17.3333C8 15.4029 8.34533 15 10 15H14C15.6547 15 16 15.4029 16 17.3333V19.6667C16 21.5971 15.6547 22 14 22H10C8.34533 22 8 21.5971 8 19.6667V17.3333Z',
  d3: 'M12.008 17.5H11.999',
  d4: 'M4 9L12 15L20 9',
  d5: 'M3.24805 9C3.24805 4.62885 7.26276 1.25 11.998 1.25C16.7333 1.25 20.748 4.62885 20.748 9C20.748 9.41421 20.4123 9.75 19.998 9.75H3.99805C3.58383 9.75 3.24805 9.41421 3.24805 9Z',
  d6: 'M9.99805 14.25C9.18778 14.25 8.34692 14.326 7.8081 14.9547C7.54492 15.2617 7.41264 15.6341 7.34081 16.0156C7.26949 16.3943 7.24805 16.837 7.24805 17.3333L7.24805 19.6667C7.24805 20.163 7.26949 20.6057 7.34081 20.9844C7.41264 21.3659 7.54492 21.7383 7.8081 22.0453C8.34692 22.674 9.18778 22.75 9.99805 22.75H13.998C14.8083 22.75 15.6492 22.674 16.188 22.0453C16.4512 21.7383 16.5835 21.3659 16.6553 20.9844C16.7266 20.6057 16.748 20.163 16.748 19.6667V17.3333C16.748 16.837 16.7266 16.3943 16.6553 16.0156C16.5835 15.6341 16.4512 15.2617 16.188 14.9547C15.6492 14.326 14.8083 14.25 13.998 14.25H9.99805ZM12.0055 18.75C12.6917 18.75 13.248 18.1904 13.248 17.5C13.248 16.8096 12.6917 16.25 12.0055 16.25H11.9906C11.3044 16.25 10.748 16.8096 10.748 17.5C10.748 18.1904 11.3044 18.75 11.9906 18.75H12.0055Z',
  d7: 'M3.44548 8.62505C3.76764 8.21084 4.37703 8.1269 4.80658 8.43755L12.001 13.6406L19.1954 8.43755C19.6249 8.1269 20.2343 8.21084 20.5565 8.62505C20.8786 9.03926 20.7916 9.62688 20.362 9.93754L12.5843 15.5625C12.2386 15.8125 11.7633 15.8125 11.4176 15.5625L3.63992 9.93754C3.21037 9.62688 3.12331 9.03926 3.44548 8.62505Z',
  d8: 'M7.8081 14.9547C8.34692 14.326 9.18778 14.25 9.99805 14.25H13.998C14.8083 14.25 15.6492 14.326 16.188 14.9547C16.4512 15.2617 16.5835 15.6341 16.6553 16.0156C16.7266 16.3943 16.748 16.837 16.748 17.3333V19.6667C16.748 20.163 16.7266 20.6057 16.6553 20.9844C16.5835 21.3659 16.4512 21.7383 16.188 22.0453C15.6492 22.674 14.8083 22.75 13.998 22.75H9.99805C9.18778 22.75 8.34692 22.674 7.8081 22.0453C7.54492 21.7383 7.41264 21.3659 7.34081 20.9844C7.26949 20.6057 7.24805 20.163 7.24805 19.6667V17.3333C7.24805 16.837 7.26949 16.3943 7.34081 16.0156C7.41264 15.6341 7.54492 15.2617 7.8081 14.9547Z',
  d9: 'M13.248 17.5C13.248 18.1904 12.6917 18.75 12.0055 18.75H11.9906C11.3044 18.75 10.748 18.1904 10.748 17.5C10.748 16.8096 11.3044 16.25 11.9906 16.25H12.0055C12.6917 16.25 13.248 16.8096 13.248 17.5Z',
  d10: 'M9.61334 14.2594C9.74147 14.2537 9.87014 14.2518 9.99805 14.2518H13.998C14.1278 14.2518 14.2583 14.2538 14.3883 14.2596L20.362 9.93934C20.6496 9.73136 20.7837 9.39924 20.7442 9.07812C20.706 9.45651 20.3865 9.75184 19.998 9.75184H17.3806L12.001 13.6424L6.62138 9.75184H3.99805C3.61847 9.75184 3.30475 9.46986 3.25494 9.10395C3.22557 9.41694 3.36004 9.73693 3.63992 9.93934L9.61334 14.2594Z',
  d11: 'M16 22H8V15H16V22Z',
  d12: 'M12.3468 1.99969C7.32643 1.88965 4.01326 5.25735 4 9.00388L19.8663 8.9795C19.8183 4.87838 16.0976 2.15787 12.3468 1.99969Z',
  d13: 'M4 9.00387L11.868 14.9724C11.9034 14.9993 11.9521 14.9992 11.9875 14.9724L19.8663 8.97949',
  d14: 'M16 14.25H8C7.58579 14.25 7.25 14.5858 7.25 15V22C7.25 22.1989 7.32902 22.3897 7.46967 22.5303C7.61032 22.671 7.80109 22.75 8 22.75H16C16.4142 22.75 16.75 22.4142 16.75 22V15C16.75 14.8011 16.671 14.6103 16.5303 14.4697C16.3897 14.329 16.1989 14.25 16 14.25ZM11.2488 18.25H12.7578V16.75H11.2488V18.25Z',
  d15: 'M4 9H3.25V9.375L3.55 9.6L4 9ZM20 9L20.45 9.6L20.75 9.375V9H20ZM12 15L11.55 15.6C11.8167 15.8 12.1833 15.8 12.45 15.6L12 15ZM4.75 9C4.75 5.63916 7.89873 2.75 12 2.75V1.25C7.26471 1.25 3.25 4.62885 3.25 9H4.75ZM12 2.75C16.1013 2.75 19.25 5.63916 19.25 9H20.75C20.75 4.62885 16.7353 1.25 12 1.25V2.75ZM4 9.75H20V8.25H4V9.75ZM3.55 9.6L11.55 15.6L12.45 14.4L4.45 8.4L3.55 9.6ZM12.45 15.6L20.45 9.6L19.55 8.4L11.55 14.4L12.45 15.6Z',
  d16: 'M12 1.25C7.26471 1.25 3.25 4.62885 3.25 9V9.375L11.55 15.6C11.8167 15.8 12.1833 15.8 12.45 15.6L20.75 9.375V9C20.75 4.62885 16.7353 1.25 12 1.25ZM12 14.0625L6.25 9.75H17.75L12 14.0625Z',
};

export const IconSafeDelivery02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 StrokeRounded"
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

export const IconSafeDelivery02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
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
    </TheIconWrapper>
  );
};

export const IconSafeDelivery02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconSafeDelivery02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
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

export const IconSafeDelivery02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconSafeDelivery02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 StrokeSharp"
    >
      <path 
        d={d.d11}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconSafeDelivery02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SafeDelivery02 SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSafeDelivery02: TheIconSelfPack = [
  'SafeDelivery02',
  IconSafeDelivery02StrokeRounded,
  IconSafeDelivery02DuotoneRounded,
  IconSafeDelivery02TwotoneRounded,
  IconSafeDelivery02SolidRounded,
  IconSafeDelivery02BulkRounded,
  IconSafeDelivery02StrokeSharp,
  IconSafeDelivery02SolidSharp,
];