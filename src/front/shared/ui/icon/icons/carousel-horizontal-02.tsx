import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 4H11C8.64298 4 7.46447 4 6.73223 4.73223C6 5.46447 6 6.64298 6 9V15C6 17.357 6 18.5355 6.73223 19.2678C7.46447 20 8.64298 20 11 20H13C15.357 20 16.5355 20 17.2678 19.2678C18 18.5355 18 17.357 18 15V9C18 6.64298 18 5.46447 17.2678 4.73223C16.5355 4 15.357 4 13 4Z',
  d2: 'M2 17.5C2.82843 17.5 3.5 16.8284 3.5 16V8C3.5 7.17157 2.82843 6.5 2 6.5',
  d3: 'M22 17.5C21.1716 17.5 20.5 16.8284 20.5 16V8C20.5 7.17157 21.1716 6.5 22 6.5',
  d4: 'M13.0537 3.25C14.1865 3.24998 15.1123 3.24996 15.8431 3.34822C16.6071 3.45093 17.2694 3.67321 17.7981 4.2019C18.3268 4.7306 18.5491 5.39294 18.6518 6.15689C18.75 6.88775 18.75 7.81348 18.75 8.94631V15.0537C18.75 16.1865 18.75 17.1123 18.6518 17.8431C18.5491 18.6071 18.3268 19.2694 17.7981 19.7981C17.2694 20.3268 16.6071 20.5491 15.8431 20.6518C15.1123 20.75 14.1865 20.75 13.0537 20.75H13.0537H10.9463H10.9463C9.81347 20.75 8.88774 20.75 8.15689 20.6518C7.39294 20.5491 6.7306 20.3268 6.2019 19.7981C5.67321 19.2694 5.45093 18.6071 5.34822 17.8431C5.24996 17.1123 5.24998 16.1865 5.25 15.0537V15.0537V8.94631V8.94629C5.24998 7.81346 5.24996 6.88774 5.34822 6.15689C5.45093 5.39294 5.67321 4.7306 6.2019 4.2019C6.7306 3.67321 7.39293 3.45093 8.15689 3.34822C8.88774 3.24996 9.81346 3.24998 10.9463 3.25H10.9463H13.0537H13.0537Z',
  d5: 'M1.25 6.5C1.25 6.08579 1.58579 5.75 2 5.75C3.24264 5.75 4.25 6.75736 4.25 8V16C4.25 17.2426 3.24264 18.25 2 18.25C1.58579 18.25 1.25 17.9142 1.25 17.5C1.25 17.0858 1.58579 16.75 2 16.75C2.41421 16.75 2.75 16.4142 2.75 16V8C2.75 7.58579 2.41421 7.25 2 7.25C1.58579 7.25 1.25 6.91421 1.25 6.5Z',
  d6: 'M19.75 8C19.75 6.75736 20.7574 5.75 22 5.75C22.4142 5.75 22.75 6.08579 22.75 6.5C22.75 6.91421 22.4142 7.25 22 7.25C21.5858 7.25 21.25 7.58579 21.25 8V16C21.25 16.4142 21.5858 16.75 22 16.75C22.4142 16.75 22.75 17.0858 22.75 17.5C22.75 17.9142 22.4142 18.25 22 18.25C20.7574 18.25 19.75 17.2426 19.75 16V8Z',
  d7: 'M18 4H6V20H18V4Z',
  d8: 'M22 6.5H20.5V17.5H22',
  d9: 'M2 6.5H3.5V17.5H2',
  d10: 'M5.25 3.25H18.75V20.75H5.25V3.25Z',
  d11: 'M19.75 5.75H22.75V7.25H21.25V16.75H22.75V18.25H19.75V5.75Z',
  d12: 'M1.25 5.75H4.25V18.25H1.25V16.75H2.75V7.25H1.25V5.75Z',
};

export const IconCarouselHorizontal02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-stroke-rounded IconCarouselHorizontal02StrokeRounded"
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

export const IconCarouselHorizontal02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-duotone-rounded IconCarouselHorizontal02DuotoneRounded"
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

export const IconCarouselHorizontal02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-twotone-rounded IconCarouselHorizontal02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCarouselHorizontal02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-solid-rounded IconCarouselHorizontal02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCarouselHorizontal02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-bulk-rounded IconCarouselHorizontal02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCarouselHorizontal02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-stroke-sharp IconCarouselHorizontal02StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconCarouselHorizontal02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="carousel-horizontal-02-solid-sharp IconCarouselHorizontal02SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const iconPackOfCarouselHorizontal02: TheIconSelfPack = {
  name: 'CarouselHorizontal02',
  StrokeRounded: IconCarouselHorizontal02StrokeRounded,
  DuotoneRounded: IconCarouselHorizontal02DuotoneRounded,
  TwotoneRounded: IconCarouselHorizontal02TwotoneRounded,
  SolidRounded: IconCarouselHorizontal02SolidRounded,
  BulkRounded: IconCarouselHorizontal02BulkRounded,
  StrokeSharp: IconCarouselHorizontal02StrokeSharp,
  SolidSharp: IconCarouselHorizontal02SolidSharp,
};