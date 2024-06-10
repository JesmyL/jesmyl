import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.8785 3L10.2827 3C7.32099 3 5.84015 3 4.92007 3.87868C4 4.75736 4 6.17157 4 9L4.10619 15L15.8785 15C18.1016 15 19.2131 15 19.6847 14.4255C19.8152 14.2666 19.9108 14.0841 19.9656 13.889C20.1639 13.184 19.497 12.3348 18.1631 10.6364L18.1631 10.6364C17.6083 9.92985 17.3309 9.57659 17.2814 9.1751C17.2671 9.05877 17.2671 8.94123 17.2814 8.8249C17.3309 8.42341 17.6083 8.07015 18.1631 7.36364L18.1631 7.36364C19.497 5.66521 20.1639 4.816 19.9656 4.11098C19.9108 3.91591 19.8152 3.73342 19.6847 3.57447C19.2131 3 18.1016 3 15.8785 3L15.8785 3Z',
  d2: 'M4 21L4 8',
  d3: 'M3.25 20.75C3.25 21.3023 3.69772 21.75 4.25 21.75C4.80229 21.75 5.25 21.3023 5.25 20.75L5.25 16.05C5.25 15.8843 5.38432 15.75 5.55 15.75L15.929 15.75C16.9976 15.75 17.8671 15.75 18.5254 15.6731C19.1789 15.5968 19.8334 15.4265 20.2644 14.9014C20.4597 14.6636 20.6043 14.3885 20.6876 14.092C20.8752 13.4248 20.613 12.7991 20.2815 12.2484C19.9486 11.6956 19.3919 10.9867 18.7531 10.1733C18.4666 9.80843 18.2854 9.57646 18.1648 9.3876C18.0517 9.21053 18.0316 9.1304 18.0258 9.08349C18.019 9.028 18.019 8.972 18.0258 8.91651C18.0316 8.8696 18.0517 8.78947 18.1648 8.6124C18.2854 8.42354 18.4665 8.19169 18.753 7.82686C19.3919 7.01337 19.9486 6.30448 20.2815 5.75161C20.613 5.20093 20.8752 4.57516 20.6876 3.90796C20.6043 3.61154 20.4597 3.33643 20.2644 3.09857C19.8334 2.57354 19.1789 2.40321 18.5254 2.32687C17.867 2.24997 16.9976 2.24998 15.9289 2.25H10.2297C8.79382 2.24998 7.64349 2.24997 6.74026 2.36594C5.80776 2.48567 5.02581 2.74063 4.40209 3.33629C3.77351 3.93659 3.49997 4.69704 3.37233 5.60363C3.2911 6.18067 3.2638 6.86128 3.25463 7.65317L3.25 20.75Z',
  d4: 'M3.25 20.7511C3.25 21.3034 3.69772 21.7511 4.25 21.7511C4.80229 21.7511 5.25 21.3034 5.25 20.7511L5.25 16.0511V2.76172C4.94104 2.90565 4.65822 3.0928 4.40209 3.33741C3.77351 3.93771 3.49997 4.69816 3.37233 5.60475C3.2911 6.18179 3.2638 6.8624 3.25463 7.65429L3.25 20.7511Z',
  d5: 'M4 21V8',
  d6: 'M19.9806 2.99902H4.00805C4.00252 2.99902 3.99805 3.0035 3.99805 3.00902L3.99813 14.9877C3.99813 14.9932 4.00261 14.9977 4.00813 14.9977H19.975C19.983 14.9977 19.9878 14.9888 19.9833 14.9822L15.9846 8.99775L19.9889 3.01459C19.9934 3.00794 19.9886 2.99902 19.9806 2.99902Z',
  d7: 'M4.00422 2.75012C3.59002 2.75012 3.25424 3.08589 3.25423 3.5001L3.25391 21.25H5.25391L5.25391 16.2501H20C20.2766 16.2501 20.5307 16.0979 20.6613 15.854C20.7918 15.6101 20.7775 15.3142 20.624 15.0841L16.9014 9.50006L20.624 3.91602C20.7775 3.68588 20.7918 3.38997 20.6613 3.1461C20.5307 2.90223 20.2766 2.75 20 2.75L4.00422 2.75012Z',
};

export const IconFlag03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-stroke-rounded IconFlag03StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFlag03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-duotone-rounded IconFlag03DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFlag03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-twotone-rounded IconFlag03TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFlag03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-solid-rounded IconFlag03SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlag03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-bulk-rounded IconFlag03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlag03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-stroke-sharp IconFlag03StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlag03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flag-03-solid-sharp IconFlag03SolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFlag03: TheIconSelfPack = {
  name: 'Flag03',
  StrokeRounded: IconFlag03StrokeRounded,
  DuotoneRounded: IconFlag03DuotoneRounded,
  TwotoneRounded: IconFlag03TwotoneRounded,
  SolidRounded: IconFlag03SolidRounded,
  BulkRounded: IconFlag03BulkRounded,
  StrokeSharp: IconFlag03StrokeSharp,
  SolidSharp: IconFlag03SolidSharp,
};