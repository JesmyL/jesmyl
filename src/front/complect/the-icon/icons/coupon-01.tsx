import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.8738 21.5123L8.84345 20.3072C8.32816 20.0014 8.07051 19.8484 7.78457 19.8396C7.47557 19.83 7.21336 19.9767 6.65655 20.3072C6.03294 20.6774 4.79293 21.697 3.99083 21.2108C3.5 20.9132 3.5 20.1574 3.5 18.6457V8C3.5 5.17157 3.5 3.75736 4.37868 2.87868C5.25736 2 6.67157 2 9.5 2H14.5C17.3284 2 18.7426 2 19.6213 2.87868C20.5 3.75736 20.5 5.17157 20.5 8V18.6457C20.5 20.1574 20.5 20.9132 20.0092 21.2108C19.2071 21.697 17.9671 20.6774 17.3434 20.3072C16.8282 20.0014 16.5705 19.8484 16.2846 19.8396C15.9756 19.83 15.7134 19.9767 15.1566 20.3072L13.1262 21.5123C12.5786 21.8374 12.3047 21.9999 12 21.9999C11.6953 21.9999 11.4214 21.8374 10.8738 21.5123Z',
  d2: 'M15 8L9 14',
  d3: 'M15 14H14.991M9.00897 8H9',
  d4: 'M12 22.7499C11.701 22.7499 11.4452 22.6665 11.2121 22.5583C10.4412 22.1745 9.48926 21.6264 8.78073 21.2059C8.27366 20.9049 8.02012 20.7544 7.75033 20.7521C7.48055 20.7498 7.22934 20.8931 6.72693 21.1797L5.72195 21.753C5.21874 22.0008 4.3685 22.3168 3.60204 21.8521C3.06862 21.5288 2.8921 20.985 2.81942 20.4932C2.74991 20.0229 2.74995 19.4098 2.75 18.7033L2.75 7.94513C2.74998 6.57754 2.74997 5.47522 2.86653 4.60825C2.98754 3.70814 3.24644 2.95027 3.84836 2.34835C4.45027 1.74644 5.20815 1.48754 6.10825 1.36653C6.97521 1.24997 8.07755 1.24998 9.44512 1.25H9.44513H14.5549H14.5549C15.9225 1.24998 17.0248 1.24997 17.8917 1.36653C18.7919 1.48754 19.5497 1.74644 20.1516 2.34835C20.7536 2.95027 21.0125 3.70814 21.1335 4.60825C21.25 5.47522 21.25 6.57754 21.25 7.94513L21.25 18.7033C21.25 19.4098 21.2501 20.0229 21.1806 20.4932C21.1079 20.985 20.9314 21.5288 20.398 21.8521C19.6315 22.3168 18.7813 22.0008 18.2781 21.753L17.2731 21.1797C16.7707 20.8931 16.5195 20.7498 16.2497 20.7521C15.9799 20.7544 15.7263 20.9049 15.2193 21.2059C14.5107 21.6264 13.5588 22.1745 12.7879 22.5583C12.5548 22.6665 12.299 22.7499 12 22.7499ZM8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071ZM9.00897 7H9C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9H9.00897C9.56125 9 10.009 8.55228 10.009 8C10.009 7.44772 9.56125 7 9.00897 7ZM14.991 13C14.4387 13 13.991 13.4477 13.991 14C13.991 14.5523 14.4387 15 14.991 15H15C15.5523 15 16 14.5523 16 14C16 13.4477 15.5523 13 15 13H14.991Z',
  d5: 'M12 22.7499C11.701 22.7499 11.4452 22.6665 11.2121 22.5583C10.4412 22.1745 9.48926 21.6264 8.78073 21.2059C8.27366 20.9049 8.02012 20.7544 7.75033 20.7521C7.48055 20.7498 7.22934 20.8931 6.72693 21.1797L5.72195 21.753C5.21874 22.0008 4.3685 22.3168 3.60204 21.8521C3.06862 21.5288 2.8921 20.985 2.81942 20.4932C2.74991 20.0229 2.74995 19.4098 2.75 18.7033L2.75 7.94513C2.74998 6.57754 2.74997 5.47522 2.86653 4.60825C2.98754 3.70814 3.24644 2.95027 3.84836 2.34835C4.45027 1.74644 5.20815 1.48754 6.10825 1.36653C6.97521 1.24997 8.07755 1.24998 9.44512 1.25H9.44513H14.5549H14.5549C15.9225 1.24998 17.0248 1.24997 17.8917 1.36653C18.7919 1.48754 19.5497 1.74644 20.1516 2.34835C20.7536 2.95027 21.0125 3.70814 21.1335 4.60825C21.25 5.47522 21.25 6.57754 21.25 7.94513L21.25 18.7033C21.25 19.4098 21.2501 20.0229 21.1806 20.4932C21.1079 20.985 20.9314 21.5288 20.398 21.8521C19.6315 22.3168 18.7813 22.0008 18.2781 21.753L17.2731 21.1797C16.7707 20.8931 16.5195 20.7498 16.2497 20.7521C15.9799 20.7544 15.7263 20.9049 15.2193 21.2059C14.5107 21.6264 13.5588 22.1745 12.7879 22.5583C12.5548 22.6665 12.299 22.7499 12 22.7499Z',
  d6: 'M8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071Z',
  d7: 'M8 8C8 7.44772 8.44772 7 9 7H9.00897C9.56125 7 10.009 7.44772 10.009 8C10.009 8.55228 9.56125 9 9.00897 9H9C8.44772 9 8 8.55228 8 8ZM13.991 14C13.991 13.4477 14.4387 13 14.991 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H14.991C14.4387 15 13.991 14.5523 13.991 14Z',
  d8: 'M14.9688 8L8.96875 14',
  d9: 'M14.9688 14H14.9598M8.97772 8H8.96875',
  d10: 'M20.4026 2H3.59787C3.54274 2 3.49805 2.0447 3.49805 2.09985L3.49821 21.41C3.49821 21.4846 3.57698 21.5328 3.6434 21.4989L7.50758 19.527L11.9053 21.9748C11.9657 22.0085 12.0393 22.0084 12.0997 21.9746L16.4794 19.527L20.3574 21.4981C20.4238 21.5318 20.5024 21.4836 20.5024 21.409V2.09985C20.5024 2.04471 20.4577 2 20.4026 2Z',
  d11: 'M3.5 1.25C3.30108 1.25 3.1103 1.32902 2.96965 1.46969C2.829 1.61035 2.74999 1.80113 2.75 2.00005L2.75139 21.5124C2.7514 21.7726 2.88636 22.0143 3.10794 22.1508C3.32952 22.2874 3.60605 22.2993 3.83854 22.1823L7.48267 20.3483L11.6358 22.6556C11.8623 22.7815 12.1377 22.7815 12.3642 22.6556L16.5174 20.3483L20.1629 22.1823C20.3954 22.2993 20.672 22.2873 20.8935 22.1508C21.1151 22.0142 21.25 21.7726 21.25 21.5123V2C21.25 1.58579 20.9142 1.25 20.5 1.25H3.5ZM14.5856 7L8 13.5856L9.41421 14.9998L15.9998 8.41421L14.5856 7ZM10.009 7H8V9H10.009V7ZM16 13H13.991V15H16V13Z',
};

export const IconCoupon01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-stroke-rounded IconCoupon01StrokeRounded"
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

export const IconCoupon01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-duotone-rounded IconCoupon01DuotoneRounded"
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

export const IconCoupon01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-twotone-rounded IconCoupon01TwotoneRounded"
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

export const IconCoupon01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-solid-rounded IconCoupon01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoupon01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-bulk-rounded IconCoupon01BulkRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoupon01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-stroke-sharp IconCoupon01StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
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

export const IconCoupon01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-01-solid-sharp IconCoupon01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCoupon01: TheIconSelfPack = {
  name: 'Coupon01',
  StrokeRounded: IconCoupon01StrokeRounded,
  DuotoneRounded: IconCoupon01DuotoneRounded,
  TwotoneRounded: IconCoupon01TwotoneRounded,
  SolidRounded: IconCoupon01SolidRounded,
  BulkRounded: IconCoupon01BulkRounded,
  StrokeSharp: IconCoupon01StrokeSharp,
  SolidSharp: IconCoupon01SolidSharp,
};