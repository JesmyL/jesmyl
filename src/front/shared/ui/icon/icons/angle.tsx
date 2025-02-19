import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22V2M12 2L22 17M12 2L2 17',
  d2: 'M16 8C14.8554 9.2634 13.4798 10 12 10C10.5202 10 9.14458 9.2634 8 8',
  d3: 'M12 14C9.78035 14 7.71687 13.2634 6 12',
  d4: 'M12 10C13.4798 10 14.8554 9.2634 16 8L12 2L8 8C9.14458 9.2634 10.5202 10 12 10Z',
  d5: 'M12 14C9.83829 14 7.82471 13.3014 6.13515 12.0979C6.08987 12.0656 6.04482 12.033 6 12',
  d6: 'M12.0001 1.25C12.3269 1.25 12.632 1.4133 12.8132 1.68518L22.586 16.3443C22.8854 16.7934 22.764 17.4001 22.3149 17.6995C21.8658 17.9989 21.2591 17.8775 20.9597 17.4285L15.6075 9.40011C14.8153 10.0339 13.9302 10.4759 12.9774 10.6576V21.7727C12.9774 22.3125 12.5398 22.75 12.0001 22.75C11.4604 22.75 11.0228 22.3125 11.0228 21.7727V14.9565C9.15422 14.7892 7.41119 14.147 5.89552 13.146L3.04052 17.4285C2.74113 17.8775 2.13437 17.9989 1.68528 17.6995C1.2362 17.4001 1.11485 16.7934 1.41424 16.3443L11.187 1.68518C11.3682 1.4133 11.6733 1.25 12.0001 1.25ZM8.39268 9.40021C9.18486 10.034 10.07 10.476 11.0228 10.6576V12.9466C9.56947 12.7869 8.20695 12.2742 7.00493 11.4818L8.39268 9.40021Z',
  d7: 'M12 1.25C12.3268 1.25 12.6319 1.4133 12.8131 1.68518L22.5858 16.3443C22.8852 16.7934 22.7638 17.4001 22.3147 17.6995C21.8656 17.9989 21.2589 17.8775 20.9595 17.4285L12.9773 5.45499V21.7727C12.9773 22.3125 12.5397 22.75 12 22.75C11.4603 22.75 11.0227 22.3125 11.0227 21.7727V5.45499L3.0405 17.4285C2.74111 17.8775 2.13436 17.9989 1.68528 17.6995C1.2362 17.4001 1.11485 16.7934 1.41423 16.3443L11.1869 1.68518C11.3681 1.4133 11.6732 1.25 12 1.25Z',
  d8: 'M12 22V2.93583M22 17L12 2L2 17',
  d9: 'M23 17.4453L12 1L1 17.4453L2.6641 18.5547L8.31192 10.335C9.11828 10.9985 10.0234 11.4625 11 11.653V23H13V11.6527C13.9764 11.4619 14.8814 10.9977 15.6875 10.3341L21.3359 18.5547L23 17.4453Z',
  d10: 'M6.59262 12.1943C8.14918 13.3398 10.0073 13.9998 11.9999 13.9998V15.9998C9.55322 15.9998 7.28441 15.1866 5.40723 13.8052L6.59262 12.1943Z',
};

export const IconAngleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-stroke-rounded IconAngleStrokeRounded"
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

export const IconAngleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-duotone-rounded IconAngleDuotoneRounded"
    >
      <path 
        opacity="0.5" 
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
        d={d.d2} 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAngleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-twotone-rounded IconAngleTwotoneRounded"
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

export const IconAngleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-solid-rounded IconAngleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAngleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-bulk-rounded IconAngleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconAngleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-stroke-sharp IconAngleStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
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

export const IconAngleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="angle-solid-sharp IconAngleSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAngle: TheIconSelfPack = {
  name: 'Angle',
  StrokeRounded: IconAngleStrokeRounded,
  DuotoneRounded: IconAngleDuotoneRounded,
  TwotoneRounded: IconAngleTwotoneRounded,
  SolidRounded: IconAngleSolidRounded,
  BulkRounded: IconAngleBulkRounded,
  StrokeSharp: IconAngleStrokeSharp,
  SolidSharp: IconAngleSolidSharp,
};