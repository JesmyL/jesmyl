import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.5 2.00146V8.00146M18.5 2.00146C17.7998 2.00146 16.4915 3.99576 16 4.50146M18.5 2.00146C19.2002 2.00146 20.5085 3.99576 21 4.50146',
  d2: 'M15.3917 21.9975C15.34 20.0835 15.4689 19.853 15.6056 19.4272C15.7424 19.0015 16.6987 17.466 17.0371 16.369C18.1318 12.8197 17.1115 12.0648 15.7512 11.0583C14.2426 9.94208 11.3973 9.37679 9.98622 9.49918V3.74572C9.98622 2.78239 9.2053 2.00146 8.24197 2.00146C7.27865 2.00146 6.49772 2.78239 6.49772 3.74572V9.96558M6.49823 21.9983V20.9849C6.43377 20.0405 5.49578 18.923 4.32721 17.3162C3.12558 15.5755 2.86737 14.6968 3.0564 13.8843C3.15377 13.469 3.40643 12.7827 4.64696 11.6099L6.49772 9.96558M6.49772 14.0318V9.96558',
  d3: 'M16.4983 17.6892C17.2055 16.2125 18.1731 13.3226 16.8209 11.9618C14.6893 9.81667 11.7081 9.42404 9.99986 9.5V3.75C9.99986 2.7835 9.21635 2 8.24986 2C7.28336 2 6.49986 2.7835 6.49986 3.75V10.0001C6.47655 10.0177 3.62164 12.1753 3.12367 13.6086C2.67793 14.8916 3.53229 16.0336 4.17457 17.0914C4.6719 17.9105 6.5 19.9316 6.5 21.0049V22H15.3917V20.382C15.3917 19.4564 16.1158 18.488 16.4983 17.6892Z',
  d4: 'M18.5 2V8M18.5 2C17.7998 2 16.4915 3.9943 16 4.5M18.5 2C19.2002 2 20.5085 3.9943 21 4.5',
  d5: 'M15.3922 21.998C15.3405 20.084 15.4694 19.8535 15.6061 19.4277C15.7429 19.002 16.6992 17.4665 17.0376 16.3695C18.1323 12.8202 17.112 12.0653 15.7517 11.0588C14.2431 9.94257 11.3978 9.37728 9.98671 9.49967V3.74621C9.98671 2.78288 9.20579 2.00195 8.24246 2.00195C7.27914 2.00195 6.49821 2.78288 6.49821 3.74621V9.96607M6.49821 9.96607L4.64745 11.6104C3.40692 12.7832 3.15426 13.4695 3.05689 13.8848C2.86786 14.6973 3.12607 15.576 4.3277 17.3167C5.49627 18.9235 6.43426 20.041 6.49872 20.9854V21.9988M6.49821 9.96607V14.0323',
  d6: 'M15.3912 21.9975C15.3395 20.0835 15.4684 19.853 15.6051 19.4272C15.7419 19.0015 16.6982 17.466 17.0366 16.369C18.1313 12.8197 17.111 12.0648 15.7507 11.0583C14.2421 9.94208 11.3968 9.37679 9.98573 9.49918V3.74572C9.98573 2.78239 9.20481 2.00146 8.24148 2.00146C7.27816 2.00146 6.49723 2.78239 6.49723 3.74572V9.96558M6.49723 9.96558L4.64647 11.6099C3.40594 12.7827 3.15328 13.469 3.05591 13.8843C2.86688 14.6968 3.12509 15.5755 4.32672 17.3162C5.49529 18.923 6.43328 20.0405 6.49774 20.9849V21.9983M6.49723 9.96558V14.0318',
  d7: 'M4.4805 10.723C4.98068 10.2601 5.45642 9.86839 5.74999 9.6343V3.75C5.74999 2.36929 6.86928 1.25 8.24999 1.25C9.6307 1.25 10.75 2.36929 10.75 3.75V8.74751C12.6139 8.81064 15.319 9.38616 17.3531 11.4332C18.289 12.3751 18.3444 13.7529 18.1737 14.8931C17.9975 16.0699 17.5471 17.2359 17.1749 18.0131C17.0673 18.2378 16.5923 19.1093 16.4725 19.3235C16.2561 19.7563 16.1419 20.1001 16.1419 20.382V20.382C16.1419 20.6473 16.1419 20.918 16.1248 21.1214C16.1063 21.3409 16.064 21.5809 15.9397 21.8165C15.7752 22.1284 15.5203 22.3833 15.2083 22.5479C14.9727 22.6721 14.7328 22.7145 14.5133 22.7329C14.3098 22.75 14.0662 22.75 13.8009 22.75H7.49523C6.53144 22.75 5.75013 21.9687 5.75013 21.0049C5.75013 20.919 5.70361 20.7219 5.53784 20.395C5.3821 20.088 5.16113 19.7424 4.90946 19.3828C4.68559 19.063 4.44944 18.7488 4.22727 18.4532L4.22721 18.4531C3.99315 18.1414 3.49831 17.428 3.35072 17.185C3.08233 16.7547 2.76332 16.2433 2.54778 15.7201C2.26704 15.0386 2.11239 14.2344 2.41534 13.3624C2.58511 12.8738 2.92741 12.3863 3.28287 11.9613C3.64883 11.5239 4.0781 11.0953 4.4805 10.723Z',
  d8: 'M19.5059 8.25C19.5059 8.80228 19.0581 9.25 18.5059 9.25C17.9536 9.25 17.5059 8.80228 17.5059 8.25L17.5059 5.74996L16.9116 5.74998C16.736 5.75011 16.5203 5.75026 16.3439 5.72819L16.3405 5.72777C16.2141 5.712 15.638 5.64017 15.3637 5.07457C15.0887 4.50775 15.3907 4.00761 15.456 3.8994L15.7951 3.43092C16.0897 3.05509 16.4954 2.54063 16.8759 2.14962C17.0657 1.95451 17.283 1.75328 17.5139 1.59443C17.7191 1.45323 18.0693 1.24996 18.5 1.24996C18.9307 1.24996 19.2809 1.45323 19.4861 1.59443C19.717 1.75328 19.9343 1.95451 20.1241 2.14962C20.5046 2.54063 20.9102 3.05508 21.2049 3.43091L21.544 3.89941C21.6093 4.00761 21.9113 4.50775 21.6363 5.07457C21.362 5.64017 20.7859 5.71201 20.6595 5.72777L20.6561 5.72819C20.4797 5.75026 20.264 5.75011 20.0884 5.74998L19.5059 5.74996L19.5059 8.25Z',
  d9: 'M15.3917 22V20C15.3917 20 16.1158 18.488 16.4983 17.6892C17.2055 16.2125 18.1731 13.3226 16.8209 11.9618C14.6893 9.81667 11.7081 9.42404 9.99986 9.5V3.75C9.99986 2.7835 9.21635 2 8.24986 2C7.28336 2 6.49986 2.7835 6.49986 3.75L6.49986 14M6.5 22L6.5 20.5C6.5 20.5 4.6719 17.9105 4.17457 17.0914C3.53229 16.0336 2.67793 14.8916 3.12367 13.6086C3.62368 12.1694 6.5 10 6.5 10',
  d10: 'M18.5 8L18.5 2.90673M16 4.5L18.5 2L21 4.5',
  d11: 'M6.00013 20.7375L5.84259 20.5131C5.66289 20.2568 5.41797 19.9062 5.15732 19.5298C4.64248 18.7863 4.04651 17.9136 3.78363 17.4807C3.72705 17.3875 3.66538 17.2886 3.60079 17.1851L3.60072 17.185C3.33233 16.7547 3.01332 16.2433 2.79778 15.7201C2.51704 15.0386 2.36239 14.2344 2.66534 13.3624C2.83576 12.8719 3.18012 12.3824 3.53741 11.9559C3.90532 11.5168 4.33673 11.0868 4.74046 10.7138C5.14591 10.3391 5.53363 10.0124 5.81941 9.77981C5.88517 9.72627 5.9457 9.67759 5.99999 9.6343L5.99999 3.75C5.99999 2.36929 7.11928 1.25 8.49999 1.25C9.8807 1.25 11 2.36929 11 3.75L11 8.74751C12.8639 8.81064 15.569 9.38616 17.6031 11.4332C18.539 12.3751 18.5944 13.7529 18.4237 14.8931C18.2475 16.0699 17.7971 17.2359 17.4249 18.0131L16.3919 20.1703V22.75H6.00013L6.00013 20.7375Z',
  d12: 'M18.293 1.25L21.5002 4.45711L20.0859 5.87132L19.293 5.07843L19.293 8.66421H17.293L17.293 5.07843L16.5002 5.87132L15.0859 4.45711L18.293 1.25Z',
};

export const IconSwipeUp02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-stroke-rounded IconSwipeUp02StrokeRounded"
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

export const IconSwipeUp02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-duotone-rounded IconSwipeUp02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSwipeUp02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-twotone-rounded IconSwipeUp02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSwipeUp02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-solid-rounded IconSwipeUp02SolidRounded"
    >
      <path 
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

export const IconSwipeUp02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-bulk-rounded IconSwipeUp02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconSwipeUp02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-stroke-sharp IconSwipeUp02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSwipeUp02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="swipe-up-02-solid-sharp IconSwipeUp02SolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSwipeUp02: TheIconSelfPack = {
  name: 'SwipeUp02',
  StrokeRounded: IconSwipeUp02StrokeRounded,
  DuotoneRounded: IconSwipeUp02DuotoneRounded,
  TwotoneRounded: IconSwipeUp02TwotoneRounded,
  SolidRounded: IconSwipeUp02SolidRounded,
  BulkRounded: IconSwipeUp02BulkRounded,
  StrokeSharp: IconSwipeUp02StrokeSharp,
  SolidSharp: IconSwipeUp02SolidSharp,
};