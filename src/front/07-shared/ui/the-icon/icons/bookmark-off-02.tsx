import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 19.9429C19.9381 20.9761 19.7617 21.5725 19.259 21.8481C17.7592 22.6701 14.946 19.9276 13.61 19.1019C12.8352 18.623 12.4478 18.3836 12.0167 18.3836C11.5856 18.3836 11.1982 18.623 10.4234 19.1019C9.08741 19.9276 6.27421 22.6701 4.77446 21.8481C4 21.4236 4 20.2377 4 17.866V9.35632C4 7.18055 4 5.63815 4.23168 4.5',
  d2: 'M20 16V9.70753C20 6.07416 20 4.25748 18.8284 3.12874C17.6569 2 15.7712 2 12 2C9.39647 2 7.69163 2 6.5 2.37139',
  d3: 'M2 2L22 22',
  d4: 'M4 17.866V9.35632C4 7.18055 4 5.63815 4.23168 4.5L20 19.9429C19.9381 20.9761 19.7617 21.5725 19.259 21.8481C17.7592 22.6701 14.946 19.9276 13.61 19.1019C12.8352 18.623 12.4478 18.3836 12.0167 18.3836C11.5856 18.3836 11.1982 18.623 10.4234 19.1019C9.08741 19.9276 6.27421 22.6701 4.77446 21.8481C4 21.4236 4 20.2377 4 17.866Z',
  d5: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d6: 'M12.0546 1.25C13.8939 1.24999 15.348 1.24998 16.4854 1.39731C17.6529 1.54853 18.5995 1.86672 19.3488 2.58863C20.102 3.31431 20.4376 4.23743 20.5964 5.37525C20.75 6.4765 20.75 7.88207 20.75 9.64945V15.7659C20.75 16.3824 20.75 16.6906 20.5648 16.7673C20.3796 16.8441 20.1617 16.6261 19.7257 16.1902L6.0821 2.54654C5.81507 2.27951 5.68155 2.14599 5.72165 1.98199C5.76175 1.81799 5.92711 1.76578 6.25784 1.66136C6.64463 1.53924 7.06309 1.45579 7.51458 1.39731C8.652 1.24998 10.1061 1.24999 11.9454 1.25H12.0546Z',
  d7: 'M20.6447 20.7405C20.5356 21.4495 20.2814 22.1395 19.5804 22.5139C18.9553 22.8477 18.2676 22.7798 17.6846 22.6028C17.0949 22.4238 16.4955 22.0989 15.9467 21.7521C15.3926 21.402 14.7938 20.9618 14.3215 20.6127C13.8587 20.2706 13.4869 19.9958 13.2031 19.8249C12.8035 19.5843 12.5513 19.4335 12.3467 19.3371C12.158 19.2482 12.0663 19.234 12 19.234C11.9337 19.234 11.842 19.2482 11.6533 19.3371C11.4488 19.4335 11.1965 19.5843 10.7969 19.8249C10.5131 19.9958 10.1414 20.2706 9.67854 20.6127C9.2062 20.9618 8.60739 21.402 8.05335 21.7521C7.50454 22.0989 6.90514 22.4238 6.31544 22.6028C5.7324 22.7798 5.04476 22.8477 4.41958 22.5139C3.71857 22.1395 3.46438 21.4495 3.35533 20.7405C3.24993 20.0553 3.24996 19.1434 3.25 18.0459L3.25001 9.64943C3.24999 7.88206 3.24997 6.4765 3.40365 5.37525C3.43882 5.12323 3.48266 4.88174 3.53779 4.6506C3.62489 4.28545 3.66844 4.10287 3.83778 4.05498C4.00712 4.00709 4.15019 4.15016 4.43635 4.43632L20.5971 20.5971C20.6348 20.6347 20.6528 20.6879 20.6447 20.7405Z',
  d8: 'M20.6447 20.7415C20.5356 21.4505 20.2814 22.1405 19.5804 22.5149C18.9553 22.8487 18.2676 22.7808 17.6846 22.6038C17.0949 22.4248 16.4955 22.0999 15.9467 21.7531C15.3926 21.403 14.7938 20.9628 14.3215 20.6137C13.8587 20.2716 13.4869 19.9968 13.2031 19.8259C12.8035 19.5853 12.5513 19.4345 12.3467 19.3381C12.158 19.2492 12.0663 19.235 12 19.235C11.9337 19.235 11.842 19.2492 11.6533 19.3381C11.4488 19.4345 11.1965 19.5853 10.7969 19.8259C10.5131 19.9968 10.1414 20.2716 9.67854 20.6137C9.2062 20.9628 8.60739 21.403 8.05335 21.7531C7.50454 22.0999 6.90514 22.4248 6.31544 22.6038C5.7324 22.7808 5.04476 22.8487 4.41958 22.5149C3.71857 22.1405 3.46438 21.4505 3.35533 20.7415C3.24993 20.0563 3.24996 19.1444 3.25 18.0469L3.25001 9.65043C3.24999 7.88306 3.24997 6.4775 3.40365 5.37625C3.43882 5.12423 3.48266 4.88274 3.53779 4.6516C3.62489 4.28645 3.66844 4.10387 3.83778 4.05598C4.00712 4.00809 4.15019 4.15116 4.43635 4.43732L20.5971 20.5981C20.6348 20.6357 20.6528 20.6889 20.6447 20.7415Z',
  d9: 'M12.0548 1.25C13.8941 1.24999 15.3482 1.24998 16.4856 1.39731C17.6531 1.54853 18.5997 1.86672 19.349 2.58863C20.1022 3.31431 20.4378 4.23743 20.5966 5.37525C20.7502 6.4765 20.7502 7.88207 20.7502 9.64945V15.7659C20.7502 16.3824 20.7502 16.6906 20.565 16.7673C20.3798 16.8441 20.1619 16.6261 19.7259 16.1902L6.0823 2.54654C5.81527 2.27951 5.68176 2.14599 5.72185 1.98199C5.76195 1.81799 5.92731 1.76578 6.25804 1.66136C6.64483 1.53924 7.06329 1.45579 7.51478 1.39731C8.6522 1.24998 10.1063 1.24999 11.9456 1.25H12.0548Z',
  d10: 'M20 20V22L12 18L4 22V4M20 16.8186V2.01C20 2.00448 19.9955 2 19.99 2H5.17704',
  d11: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d12: 'M20 1.25C20.4142 1.25 20.75 1.58579 20.75 2V17.2145L4.78553 1.25H20Z',
  d13: 'M20.75 22.75L12 18.375L3.25 22.75V3.25L20.75 20.75V22.75Z',
};

export const IconBookmarkOff02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-stroke-rounded IconBookmarkOff02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-duotone-rounded IconBookmarkOff02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-twotone-rounded IconBookmarkOff02TwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-solid-rounded IconBookmarkOff02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-bulk-rounded IconBookmarkOff02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-stroke-sharp IconBookmarkOff02StrokeSharp"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBookmarkOff02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bookmark-off-02-solid-sharp IconBookmarkOff02SolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfBookmarkOff02: TheIconSelfPack = {
  name: 'BookmarkOff02',
  StrokeRounded: IconBookmarkOff02StrokeRounded,
  DuotoneRounded: IconBookmarkOff02DuotoneRounded,
  TwotoneRounded: IconBookmarkOff02TwotoneRounded,
  SolidRounded: IconBookmarkOff02SolidRounded,
  BulkRounded: IconBookmarkOff02BulkRounded,
  StrokeSharp: IconBookmarkOff02StrokeSharp,
  SolidSharp: IconBookmarkOff02SolidSharp,
};