import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 9V6.5C15 4.01472 12.9853 2 10.5 2C8.01472 2 6 4.01472 6 6.5V9.5',
  d2: 'M16.5 16.6667V18M16.5 18V19.3333M16.5 18H17.8333M16.5 18H15.1667M20.5 18C20.5 20.2091 18.7091 22 16.5 22C14.2909 22 12.5 20.2091 12.5 18C12.5 15.7909 14.2909 14 16.5 14C18.7091 14 20.5 15.7909 20.5 18Z',
  d3: 'M10.9635 21.9824C10.7992 21.9941 10.6333 22 10.466 22C6.61877 22 3.5 18.866 3.5 15C3.5 11.134 6.61877 8 10.466 8C12.8331 8 15 9 16 11',
  d4: 'M17.4442 14.1121C17.1415 14.0388 16.8253 14 16.5 14C14.2909 14 12.5 15.7909 12.5 18C12.5 19.2434 13.0674 20.3544 13.9573 21.088C12.9374 21.6685 11.7574 22 10.5 22C6.63401 22 3.5 18.866 3.5 15C3.5 11.134 6.63401 8 10.5 8C14.0652 8 17.0079 10.6653 17.4442 14.1121Z',
  d5: 'M10.5 7.25C6.21979 7.25 2.75 10.7198 2.75 15C2.75 19.2802 6.21979 22.75 10.5 22.75C10.7047 22.75 10.9075 22.7421 11.1082 22.7265C11.5679 22.6908 11.7977 22.673 11.8711 22.5121C11.9445 22.3512 11.7876 22.1393 11.4739 21.7155C10.7048 20.6769 10.25 19.3916 10.25 18C10.25 14.5482 13.0482 11.75 16.5 11.75C16.9868 11.75 17.2301 11.75 17.3191 11.6155C17.328 11.6021 17.3354 11.5886 17.3421 11.574C17.4087 11.4271 17.2956 11.2468 17.0693 10.8863C15.6986 8.70207 13.2689 7.25 10.5 7.25Z',
  d6: 'M16.5 13.25C13.8766 13.25 11.75 15.3766 11.75 18C11.75 20.6234 13.8766 22.75 16.5 22.75C19.1234 22.75 21.25 20.6234 21.25 18C21.25 15.3766 19.1234 13.25 16.5 13.25ZM17.2513 16.6641C17.2513 16.2498 16.9155 15.9141 16.5013 15.9141C16.0871 15.9141 15.7513 16.2498 15.7513 16.6641V17.2474H15.168C14.7538 17.2474 14.418 17.5832 14.418 17.9974C14.418 18.4116 14.7538 18.7474 15.168 18.7474H15.7513V19.3307C15.7513 19.7449 16.0871 20.0807 16.5013 20.0807C16.9155 20.0807 17.2513 19.7449 17.2513 19.3307V18.7474H17.8346C18.2488 18.7474 18.5846 18.4116 18.5846 17.9974C18.5846 17.5832 18.2488 17.2474 17.8346 17.2474H17.2513V16.6641Z',
  d7: 'M5 6.75C5 3.71243 7.46243 1.25 10.5 1.25C13.5376 1.25 16 3.71243 16 6.75V9.75C16 10.3023 15.5523 10.75 15 10.75C14.4477 10.75 14 10.3023 14 9.75V6.75C14 4.817 12.433 3.25 10.5 3.25C8.567 3.25 7 4.817 7 6.75V9.75C7 10.3023 6.55228 10.75 6 10.75C5.44772 10.75 5 10.3023 5 9.75V6.75Z',
  d8: 'M10.5 1.25C7.46243 1.25 5 3.71243 5 6.75V9.53992C5.58168 8.95401 6.25634 8.46054 7 8.08347V6.75C7 4.817 8.567 3.25 10.5 3.25C12.433 3.25 14 4.817 14 6.75V8.08347C14.7437 8.46054 15.4183 8.95401 16 9.53992V6.75C16 3.71243 13.5376 1.25 10.5 1.25Z',
  d9: 'M15 9.5V6.5C15 4.01472 12.9853 2 10.5 2C8.01472 2 6 4.01472 6 6.5V9.5',
  d10: 'M16.5 16V18M16.5 18V20M16.5 18H18.5M16.5 18H14.5M20.5 18C20.5 20.2091 18.7091 22 16.5 22C14.2909 22 12.5 20.2091 12.5 18C12.5 15.7909 14.2909 14 16.5 14C18.7091 14 20.5 15.7909 20.5 18Z',
  d11: 'M16.5 13.25C13.8766 13.25 11.75 15.3766 11.75 18C11.75 20.6234 13.8766 22.75 16.5 22.75C19.1234 22.75 21.25 20.6234 21.25 18C21.25 15.3766 19.1234 13.25 16.5 13.25ZM15.75 16V17.25H14.5V18.75H15.75V20H17.25V18.75H18.5V17.25H17.25V16H15.75Z',
  d12: 'M5 6.75C5 3.71243 7.46243 1.25 10.5 1.25C13.5376 1.25 16 3.71243 16 6.75V9.75H14V6.75C14 4.817 12.433 3.25 10.5 3.25C8.567 3.25 7 4.817 7 6.75V9.75H5V6.75Z',
  d13: 'M10.5 7.25C6.21979 7.25 2.75 10.7198 2.75 15C2.75 19.2802 6.21979 22.75 10.5 22.75C11.0923 22.75 11.6691 22.6836 12.2233 22.5577C11.0087 21.4175 10.25 19.7974 10.25 18C10.25 14.5482 13.0482 11.75 16.5 11.75C16.8683 11.75 17.2291 11.7819 17.5799 11.843C16.3712 9.13631 13.6559 7.25 10.5 7.25Z',
};

export const IconCircleLockAdd02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-stroke-rounded IconCircleLockAdd02StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-duotone-rounded IconCircleLockAdd02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-twotone-rounded IconCircleLockAdd02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-solid-rounded IconCircleLockAdd02SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-bulk-rounded IconCircleLockAdd02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-stroke-sharp IconCircleLockAdd02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleLockAdd02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-lock-add-02-solid-sharp IconCircleLockAdd02SolidSharp"
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleLockAdd02: TheIconSelfPack = {
  name: 'CircleLockAdd02',
  StrokeRounded: IconCircleLockAdd02StrokeRounded,
  DuotoneRounded: IconCircleLockAdd02DuotoneRounded,
  TwotoneRounded: IconCircleLockAdd02TwotoneRounded,
  SolidRounded: IconCircleLockAdd02SolidRounded,
  BulkRounded: IconCircleLockAdd02BulkRounded,
  StrokeSharp: IconCircleLockAdd02StrokeSharp,
  SolidSharp: IconCircleLockAdd02SolidSharp,
};