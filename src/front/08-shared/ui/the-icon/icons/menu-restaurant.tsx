import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 17.9998V9.99976C20 8.11414 20 7.17133 19.4142 6.58554C18.8284 5.99976 17.8856 5.99976 16 5.99976H4V17.9998C4 19.8854 4 20.8282 4.58579 21.414C5.17157 21.9998 6.11438 21.9998 8 21.9998H16C17.8856 21.9998 18.8284 21.9998 19.4142 21.414C20 20.8282 20 19.8854 20 17.9998Z',
  d2: 'M12 10.9998C13.6569 10.9998 15 12.3429 15 13.9998M12 10.9998C10.3431 10.9998 9 12.3429 9 13.9998M12 10.9998V9.99976M15 13.9998H9M15 13.9998H16M9 13.9998H8',
  d3: 'M8 17.9998H16',
  d4: 'M4 5.99976L11.3846 2.90562C13.0337 2.21467 13.8582 1.8692 14.5149 2.04518C14.9408 2.1593 15.3173 2.41168 15.5859 2.76312C16 3.30508 16 4.2033 16 5.99976',
  d5: 'M4 5.99976L11.3846 2.90562C13.0337 2.21467 13.8582 1.8692 14.5149 2.04518C14.9408 2.1593 15.3173 2.41168 15.5859 2.76312C16 3.30508 16 4.2033 16 5.99976H4Z',
  d6: 'M15 13.9998C15 12.3429 13.6569 10.9998 12 10.9998C10.3431 10.9998 9 12.3429 9 13.9998H15Z',
  d7: 'M19.9445 6.05521C19.4891 5.59974 18.9223 5.41407 18.2945 5.32967C17.6997 5.2497 16.9505 5.24972 16.052 5.24975H16.052L4 5.24975C3.58579 5.24975 3.25 5.58554 3.25 5.99975L3.25 18.0518V18.0518C3.24997 18.9503 3.24995 19.6995 3.32991 20.2942C3.41432 20.922 3.59999 21.4888 4.05546 21.9443C4.51093 22.3998 5.07773 22.5854 5.70552 22.6698C6.30031 22.7498 7.04953 22.7498 7.94801 22.7498H16.052C16.9505 22.7498 17.6997 22.7498 18.2945 22.6698C18.9223 22.5854 19.4891 22.3998 19.9445 21.9443C20.4 21.4888 20.5857 20.922 20.6701 20.2942C20.7501 19.6995 20.75 18.9502 20.75 18.0517V9.94776C20.75 9.04928 20.7501 8.30006 20.6701 7.70528C20.5857 7.07748 20.4 6.51068 19.9445 6.05521ZM8 17.2498C7.58579 17.2498 7.25 17.5855 7.25 17.9998C7.25 18.414 7.58579 18.7498 8 18.7498H16C16.4142 18.7498 16.75 18.414 16.75 17.9998C16.75 17.5855 16.4142 17.2498 16 17.2498H8ZM12.75 9.99975C12.75 9.58554 12.4142 9.24975 12 9.24975C11.5858 9.24975 11.25 9.58554 11.25 9.99975V10.3248C9.78065 10.623 8.62328 11.7804 8.32501 13.2498H8C7.58579 13.2498 7.25 13.5855 7.25 13.9998C7.25 14.414 7.58579 14.7498 8 14.7498L16 14.7498C16.4142 14.7498 16.75 14.414 16.75 13.9998C16.75 13.5855 16.4142 13.2498 16 13.2498H15.675C15.3767 11.7804 14.2193 10.623 12.75 10.3248V9.99975Z',
  d8: 'M6.8324 3.99928L16.7089 3.99927C16.7046 3.94338 16.6998 3.88887 16.6944 3.83575C16.6378 3.27023 16.515 2.74329 16.1817 2.30723C15.813 1.82465 15.2954 1.47735 14.709 1.32023C14.1782 1.17799 13.6449 1.2672 13.1031 1.4324C12.5723 1.59425 11.9249 1.86551 11.1325 2.19753L6.8324 3.99928Z',
  d9: 'M18.2945 5.32967C18.9223 5.41407 19.4891 5.59974 19.9445 6.05521C20.4 6.51068 20.5857 7.07748 20.6701 7.70528C20.7501 8.30006 20.75 9.04928 20.75 9.94776V18.0518C20.75 18.9502 20.7501 19.6995 20.6701 20.2942C20.5857 20.922 20.4 21.4888 19.9445 21.9443C19.4891 22.3998 18.9223 22.5854 18.2945 22.6698C17.6997 22.7498 16.9505 22.7498 16.052 22.7498H7.94801C7.04953 22.7498 6.30031 22.7498 5.70552 22.6698C5.07773 22.5854 4.51093 22.3998 4.05546 21.9443C3.59999 21.4888 3.41432 20.922 3.32991 20.2942C3.24995 19.6995 3.24997 18.9503 3.25 18.0518V18.0518L3.25 5.99976C3.25 5.58554 3.58579 5.24976 4 5.24976L16.052 5.24976H16.052C16.9505 5.24973 17.6997 5.2497 18.2945 5.32967Z',
  d10: 'M12 9.24976C12.4142 9.24976 12.75 9.58554 12.75 9.99976V10.3248C14.2193 10.623 15.3767 11.7804 15.675 13.2498H16C16.4142 13.2498 16.75 13.5855 16.75 13.9998C16.75 14.414 16.4142 14.7498 16 14.7498H8C7.58579 14.7498 7.25 14.414 7.25 13.9998C7.25 13.5855 7.58579 13.2498 8 13.2498H8.32501C8.62328 11.7804 9.78065 10.623 11.25 10.3248V9.99976C11.25 9.58554 11.5858 9.24976 12 9.24976Z',
  d11: 'M7.25 17.9998C7.25 17.5855 7.58579 17.2498 8 17.2498H16C16.4142 17.2498 16.75 17.5855 16.75 17.9998C16.75 18.414 16.4142 18.7498 16 18.7498H8C7.58579 18.7498 7.25 18.414 7.25 17.9998Z',
  d12: 'M4 5.99976V21.9998H20V5.99976H16M4 5.99976H16M4 5.99976L15.9058 1.99976H16V5.99976',
  d13: 'M3.25 5.24976L20.75 5.24976L20.75 22.7498L3.25 22.7498L3.25 5.24976ZM12.75 10.3248C14.2193 10.623 15.3767 11.7804 15.675 13.2498H16.75V14.7498L7.25 14.7498V13.2498H8.32501C8.62328 11.7804 9.78065 10.623 11.25 10.3248V9.24976H12.75V10.3248ZM16.75 17.2498H7.25V18.7498H16.75V17.2498Z',
  d14: 'M7.59851 3.99927L15.7837 1.24927H16.7506V3.99927H7.59851Z',
};

export const IconMenuRestaurantStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-stroke-rounded IconMenuRestaurantStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-duotone-rounded IconMenuRestaurantDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-twotone-rounded IconMenuRestaurantTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-solid-rounded IconMenuRestaurantSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-bulk-rounded IconMenuRestaurantBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-stroke-sharp IconMenuRestaurantStrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconMenuRestaurantSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="menu-restaurant-solid-sharp IconMenuRestaurantSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMenuRestaurant: TheIconSelfPack = {
  name: 'MenuRestaurant',
  StrokeRounded: IconMenuRestaurantStrokeRounded,
  DuotoneRounded: IconMenuRestaurantDuotoneRounded,
  TwotoneRounded: IconMenuRestaurantTwotoneRounded,
  SolidRounded: IconMenuRestaurantSolidRounded,
  BulkRounded: IconMenuRestaurantBulkRounded,
  StrokeSharp: IconMenuRestaurantStrokeSharp,
  SolidSharp: IconMenuRestaurantSolidSharp,
};