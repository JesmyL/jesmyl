import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z',
  d2: 'M10 4.11735C10 4.11735 5.24049 3.69033 4.46539 4.46542C3.6903 5.2405 4.11739 10 4.11739 10',
  d3: 'M14 19.8826C14 19.8826 18.7595 20.3097 19.5346 19.5346C20.3097 18.7595 19.8826 14 19.8826 14',
  d4: 'M12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z',
  d5: 'M20.7469 19.2603C20.6678 19.5413 20.5254 19.9323 20.2288 20.2289C19.9322 20.5255 19.5412 20.6678 19.2602 20.7469C18.9481 20.8347 18.5975 20.8901 18.2498 20.9266C17.5517 20.9999 16.7459 21.0086 16.0314 20.9941L15.967 20.9928L15.9669 20.9928C15.5634 20.9848 15.1482 20.9765 14.8223 20.9187C14.476 20.8572 13.8666 20.6767 13.6013 20.0172C13.3329 19.3503 13.66 18.7925 13.8652 18.513C14.0631 18.2434 14.3613 17.9455 14.6544 17.6526L14.7 17.607L17.607 14.7L17.6526 14.6544C17.9455 14.3613 18.2435 14.0631 18.5131 13.8652C18.7926 13.66 19.3503 13.3329 20.0173 13.6013C20.6768 13.8667 20.8573 14.476 20.9187 14.8223C20.9765 15.1482 20.9848 15.5634 20.9928 15.967L20.9941 16.0315C21.0086 16.746 20.9999 17.5518 20.9266 18.2499C20.8901 18.5975 20.8347 18.9481 20.7469 19.2603Z',
  d6: 'M3.25315 4.73973C3.33222 4.45873 3.47456 4.06775 3.77116 3.77115C4.06776 3.47454 4.45875 3.3322 4.73975 3.25312C5.05189 3.16528 5.40252 3.10989 5.75018 3.0734C6.44828 3.00012 7.25407 2.99138 7.96858 3.00588L8.03305 3.00718L8.03306 3.00718C8.43659 3.01522 8.85181 3.0235 9.17771 3.08132C9.52399 3.14275 10.1334 3.32327 10.3987 3.98279C10.6671 4.64971 10.34 5.20746 10.1348 5.48697C9.93688 5.75657 9.6387 6.05455 9.34563 6.34742L9.30002 6.39301L6.39299 9.30002L6.34739 9.34564C6.05451 9.63871 5.75653 9.93689 5.48693 10.1348C5.20742 10.34 4.64966 10.6671 3.98274 10.3987C3.32322 10.1333 3.14271 9.52397 3.08128 9.17768C3.02347 8.85178 3.0152 8.43656 3.00716 8.03302L3.00587 7.96854C2.99138 7.25403 3.00012 6.44824 3.07341 5.75015C3.10991 5.40249 3.1653 5.05186 3.25315 4.73973Z',
  d7: 'M14 10V14H10V10H14Z',
  d8: 'M13 19L19 19L19 13',
  d9: 'M11 5L5 5L5 11',
  d10: 'M15 9V15H9V9H15Z',
  d11: 'M21 14L21 21L14 21V19L19 19L19 14H21Z',
  d12: 'M3 3L10 3V5L5 5L5 10H3L3 3Z',
};

export const IconDiagonalScrollPoint02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-stroke-rounded IconDiagonalScrollPoint02StrokeRounded"
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

export const IconDiagonalScrollPoint02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-duotone-rounded IconDiagonalScrollPoint02DuotoneRounded"
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

export const IconDiagonalScrollPoint02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-twotone-rounded IconDiagonalScrollPoint02TwotoneRounded"
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

export const IconDiagonalScrollPoint02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-solid-rounded IconDiagonalScrollPoint02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiagonalScrollPoint02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-bulk-rounded IconDiagonalScrollPoint02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiagonalScrollPoint02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-stroke-sharp IconDiagonalScrollPoint02StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiagonalScrollPoint02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diagonal-scroll-point-02-solid-sharp IconDiagonalScrollPoint02SolidSharp"
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

export const iconPackOfDiagonalScrollPoint02: TheIconSelfPack = {
  name: 'DiagonalScrollPoint02',
  StrokeRounded: IconDiagonalScrollPoint02StrokeRounded,
  DuotoneRounded: IconDiagonalScrollPoint02DuotoneRounded,
  TwotoneRounded: IconDiagonalScrollPoint02TwotoneRounded,
  SolidRounded: IconDiagonalScrollPoint02SolidRounded,
  BulkRounded: IconDiagonalScrollPoint02BulkRounded,
  StrokeSharp: IconDiagonalScrollPoint02StrokeSharp,
  SolidSharp: IconDiagonalScrollPoint02SolidSharp,
};