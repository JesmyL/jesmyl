import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 9.36842C3.5 5.89491 3.5 4.15816 4.52513 3.07908C5.55025 2 7.20017 2 10.5 2H13.5C16.7998 2 18.4497 2 19.4749 3.07908C20.5 4.15816 20.5 5.89491 20.5 9.36842V14.6316C20.5 18.1051 20.5 19.8418 19.4749 20.9209C18.4497 22 16.7998 22 13.5 22H10.5C7.20017 22 5.55025 22 4.52513 20.9209C3.5 19.8418 3.5 18.1051 3.5 14.6316V9.36842Z',
  d2: 'M13.5 11H17',
  d3: 'M7 12C7 12 7.5 12 8 13C8 13 9.58824 10.5 11 10',
  d4: 'M13.5 17H17',
  d5: 'M8 2L8.0822 2.4932C8.28174 3.69044 8.38151 4.28906 8.80113 4.64453C9.22075 5 9.82762 5 11.0414 5H12.9586C14.1724 5 14.7793 5 15.1989 4.64453C15.6185 4.28906 15.7183 3.69044 15.9178 2.4932L16 2',
  d6: 'M8 17H9',
  d7: 'M4.52513 3.07908C3.5 4.15816 3.5 5.89491 3.5 9.36842V14.6316C3.5 18.1051 3.5 19.8418 4.52513 20.9209C5.55025 22 7.20016 22 10.5 22H13.5C16.7998 22 18.4497 22 19.4749 20.9209C20.5 19.8418 20.5 18.1051 20.5 14.6316V9.36842C20.5 5.89491 20.5 4.15816 19.4749 3.07908C18.6968 2.26008 17.5589 2.06268 15.6128 2.01511C15.816 2.07093 15.9544 2.2737 15.9178 2.4932C15.7183 3.69043 15.6185 4.28906 15.1989 4.64453C14.7793 5 14.1724 5 12.9586 5H11.0414C9.82762 5 9.22075 5 8.80113 4.64453C8.38151 4.28906 8.28174 3.69044 8.0822 2.4932C8.04562 2.27369 8.18405 2.07093 8.38721 2.01511C6.44114 2.06268 5.30318 2.26008 4.52513 3.07908Z',
  d8: 'M15.2308 1.92129C15.269 1.61164 15.2881 1.45681 15.1992 1.35564C15.1103 1.25448 14.9552 1.25362 14.6452 1.2519C14.3 1.24999 13.9373 1.25 13.5566 1.25H10.44C10.0603 1.25 9.69849 1.24999 9.35412 1.25189C9.04579 1.25359 8.89163 1.25444 8.80274 1.3549C8.71385 1.45536 8.73189 1.60943 8.76798 1.91759L8.82305 2.38786C8.9243 2.99518 8.99096 3.38484 9.07601 3.67052C9.15593 3.93895 9.22732 4.02428 9.28397 4.07226C9.34061 4.12025 9.43651 4.17665 9.71443 4.21134C10.0131 4.24864 10.4133 4.25 11.0394 4.25H12.9567C13.5828 4.25 13.983 4.24864 14.2817 4.21134C14.5596 4.17665 14.6555 4.12025 14.7121 4.07226C14.7688 4.02428 14.8402 3.93895 14.9201 3.67053C15.0053 3.38447 15.072 2.99418 15.1735 2.38553L15.2308 1.92129Z',
  d9: 'M7.10748 1.40966C7.20683 1.4868 7.22296 1.62456 7.25522 1.90006L7.3351 2.58219L7.33985 2.61071C7.43179 3.16263 7.52429 3.71794 7.63812 4.10029C7.76288 4.51935 7.95118 4.91107 8.31416 5.21856C8.67713 5.52604 9.09447 5.64738 9.52834 5.70155C9.93103 5.75183 10.4259 5.7518 10.9949 5.75177H13.0007C13.5697 5.7518 14.0646 5.75183 14.4673 5.70155C14.9011 5.64738 15.3185 5.52604 15.6815 5.21856C16.0444 4.91107 16.2327 4.51935 16.3575 4.10029C16.4718 3.71642 16.564 3.16261 16.6563 2.60865L16.6563 2.60864L16.6563 2.60861L16.66 2.58688L16.7452 1.89694C16.779 1.62309 16.7959 1.48617 16.8951 1.40968C16.9943 1.33319 17.1256 1.35093 17.3884 1.38642L17.4436 1.39405C18.4871 1.54173 19.3434 1.85554 20.0167 2.56428C20.6848 3.26761 20.976 4.15293 21.1139 5.23259C21.2481 6.28338 21.2481 7.62531 21.248 9.31665V14.6869C21.2481 16.3782 21.2481 17.7202 21.1139 18.7709C20.976 19.8506 20.6848 20.7359 20.0167 21.4392C19.3434 22.148 18.4871 22.4618 17.4436 22.6095C16.4379 22.7518 15.1568 22.7518 13.5564 22.7518H10.4397C8.83933 22.7518 7.55815 22.7518 6.5525 22.6095C5.50898 22.4618 4.65273 22.148 3.97943 21.4392C3.31127 20.7359 3.02013 19.8506 2.88223 18.7709C2.74802 17.7202 2.74803 16.3782 2.74805 14.6869V14.6869V14.6869V9.31663V9.31662V9.31661C2.74803 7.62529 2.74802 6.28337 2.88223 5.23259C3.02013 4.15293 3.31127 3.26761 3.97943 2.56428C4.65273 1.85554 5.50898 1.54173 6.5525 1.39405L6.61187 1.38586C6.87605 1.3503 7.00813 1.33252 7.10748 1.40966ZM12.75 11C12.75 10.5858 13.0858 10.25 13.5 10.25H17C17.4142 10.25 17.75 10.5858 17.75 11C17.75 11.4142 17.4142 11.75 17 11.75H13.5C13.0858 11.75 12.75 11.4142 12.75 11ZM11.2504 10.7072C11.6408 10.5689 11.8453 10.1403 11.707 9.74982C11.5687 9.35937 11.1401 9.15495 10.7496 9.29323C10.2675 9.46399 9.81992 9.78384 9.44115 10.116C9.05461 10.455 8.69626 10.8457 8.39468 11.2073C8.24853 11.3825 8.11354 11.5534 7.99285 11.7119C7.90464 11.6294 7.81624 11.5596 7.72853 11.5012C7.5696 11.3952 7.42054 11.3314 7.29198 11.2947L7.26948 11.2881C7.20749 11.2696 7.12309 11.2445 7 11.2502C6.58579 11.2502 6.25 11.586 6.25 12.0002C6.25 12.3749 6.52481 12.6855 6.88388 12.7413C6.88745 12.7434 6.89166 12.746 6.89648 12.7492C6.95217 12.7864 7.12367 12.9246 7.32918 13.3356C7.45006 13.5774 7.69169 13.7354 7.96165 13.7492C8.23153 13.763 8.48825 13.6302 8.63322 13.4021C8.6761 13.3377 8.80181 13.1492 8.88295 13.0343C9.04576 12.8036 9.276 12.4924 9.5465 12.1681C9.81844 11.8422 10.1219 11.5142 10.4302 11.2438C10.7463 10.9666 11.0266 10.7864 11.2504 10.7072ZM12.75 17C12.75 16.5858 13.0858 16.25 13.5 16.25H17C17.4142 16.25 17.75 16.5858 17.75 17C17.75 17.4142 17.4142 17.75 17 17.75H13.5C13.0858 17.75 12.75 17.4142 12.75 17ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H9C9.55229 18 10 17.5523 10 17C10 16.4477 9.55229 16 9 16H8Z',
  d10: 'M7.10748 1.40966C7.20683 1.4868 7.22296 1.62456 7.25522 1.90006L7.3351 2.58219L7.33985 2.61071C7.43179 3.16263 7.52429 3.71794 7.63812 4.10029C7.76288 4.51935 7.95118 4.91107 8.31415 5.21856C8.67713 5.52604 9.09447 5.64738 9.52834 5.70155C9.93103 5.75183 10.4259 5.7518 10.9949 5.75177H13.0007C13.5697 5.7518 14.0646 5.75183 14.4673 5.70155C14.9011 5.64738 15.3185 5.52604 15.6815 5.21856C16.0444 4.91107 16.2327 4.51935 16.3575 4.10029C16.4718 3.71642 16.564 3.1626 16.6563 2.60864L16.6563 2.60861L16.66 2.58688L16.7452 1.89694C16.779 1.62309 16.7959 1.48617 16.8951 1.40968C16.9943 1.33319 17.1256 1.35093 17.3884 1.38642L17.4436 1.39405C18.4871 1.54173 19.3434 1.85554 20.0167 2.56428C20.6848 3.26761 20.976 4.15293 21.1139 5.23259C21.2481 6.28338 21.2481 7.62531 21.248 9.31665V14.6869C21.2481 16.3782 21.2481 17.7202 21.1139 18.7709C20.976 19.8506 20.6848 20.7359 20.0167 21.4392C19.3434 22.148 18.4871 22.4618 17.4436 22.6095C16.4379 22.7518 15.1568 22.7518 13.5564 22.7518H10.4397C8.83933 22.7518 7.55815 22.7518 6.5525 22.6095C5.50898 22.4618 4.65273 22.148 3.97942 21.4392C3.31127 20.7359 3.02013 19.8506 2.88223 18.7709C2.74802 17.7202 2.74803 16.3782 2.74805 14.6869V14.6869V9.31663V9.31662C2.74803 7.6253 2.74802 6.28337 2.88223 5.23259C3.02013 4.15293 3.31127 3.26761 3.97942 2.56428C4.65273 1.85554 5.50898 1.54173 6.5525 1.39405L6.61187 1.38586C6.87605 1.3503 7.00813 1.33252 7.10748 1.40966Z',
  d11: 'M12.75 11C12.75 10.5858 13.0858 10.25 13.5 10.25L17 10.25C17.4142 10.25 17.75 10.5858 17.75 11C17.75 11.4142 17.4142 11.75 17 11.75L13.5 11.75C13.0858 11.75 12.75 11.4142 12.75 11Z',
  d12: 'M11.707 9.74982C11.8453 10.1403 11.6408 10.5689 11.2504 10.7072C11.0266 10.7864 10.7463 10.9666 10.4302 11.2438C10.1219 11.5142 9.81844 11.8422 9.5465 12.1681C9.276 12.4924 9.04576 12.8036 8.88295 13.0343C8.80181 13.1492 8.6761 13.3377 8.63321 13.4021C8.48825 13.6302 8.23153 13.763 7.96165 13.7492C7.69169 13.7354 7.45006 13.5774 7.32918 13.3356C7.12367 12.9246 6.95217 12.7864 6.89647 12.7492C6.89166 12.746 6.88745 12.7434 6.88388 12.7413C6.52481 12.6855 6.25 12.3749 6.25 12.0002C6.25 11.586 6.58579 11.2502 7 11.2502C7.13867 11.2438 7.22824 11.2765 7.29198 11.2947C7.42054 11.3314 7.5696 11.3952 7.72853 11.5012C7.81624 11.5596 7.90464 11.6294 7.99285 11.7119C8.11354 11.5534 8.24852 11.3825 8.39467 11.2073C8.69626 10.8457 9.05461 10.455 9.44115 10.116C9.81992 9.78384 10.2675 9.46399 10.7496 9.29323C11.1401 9.15495 11.5687 9.35937 11.707 9.74982Z',
  d13: 'M12.75 17C12.75 16.5858 13.0858 16.25 13.5 16.25H17C17.4142 16.25 17.75 16.5858 17.75 17C17.75 17.4142 17.4142 17.75 17 17.75H13.5C13.0858 17.75 12.75 17.4142 12.75 17Z',
  d14: 'M7 17C7 16.4477 7.44772 16 8 16H9C9.55228 16 10 16.4477 10 17C10 17.5523 9.55228 18 9 18H8C7.44772 18 7 17.5523 7 17Z',
  d15: 'M20 22V2H3V22L20 22Z',
  d16: 'M15.5 2H7.5V5H15.5V2Z',
  d17: 'M12.5 11L16.5 11',
  d18: 'M6 10.5L7.5 12L10.5 9',
  d19: 'M12.5 17H16.5',
  d20: 'M7 17H9',
  d21: 'M6.75 1.25043H3C2.58579 1.25043 2.25 1.58621 2.25 2.00043V22.0004C2.25 22.4146 2.58579 22.7504 3 22.7504L20 22.7504C20.1989 22.7504 20.3897 22.6714 20.5303 22.5308C20.671 22.3901 20.75 22.1993 20.75 22.0004V2.00043C20.75 1.58621 20.4142 1.25043 20 1.25043H16.25V4.75043C16.25 5.16464 15.9142 5.50043 15.5 5.50043H7.5C7.08579 5.50043 6.75 5.16464 6.75 4.75043V1.25043ZM16.5 11.7504H12.5V10.2504H16.5V11.7504ZM11.0294 9.53081L9.96875 8.47015L7.49908 10.9398L6.52941 9.97015L5.46875 11.0308L7.49908 13.0611L11.0294 9.53081ZM16.5 17.7504H12.5V16.2504H16.5V17.7504ZM7 18.0004H9V16.0004H7V18.0004Z',
  d22: 'M14.75 1.25043H8.25V4.00043H14.75V1.25043Z',
};

export const IconTaskDaily02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-stroke-rounded IconTaskDaily02StrokeRounded"
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
      />
      <path 
        d={d.d5} 
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

export const IconTaskDaily02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-duotone-rounded IconTaskDaily02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
      />
      <path 
        d={d.d5} 
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

export const IconTaskDaily02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-twotone-rounded IconTaskDaily02TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDaily02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-solid-rounded IconTaskDaily02SolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDaily02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-bulk-rounded IconTaskDaily02BulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDaily02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-stroke-sharp IconTaskDaily02StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDaily02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-daily-02-solid-sharp IconTaskDaily02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskDaily02: TheIconSelfPack = {
  name: 'TaskDaily02',
  StrokeRounded: IconTaskDaily02StrokeRounded,
  DuotoneRounded: IconTaskDaily02DuotoneRounded,
  TwotoneRounded: IconTaskDaily02TwotoneRounded,
  SolidRounded: IconTaskDaily02SolidRounded,
  BulkRounded: IconTaskDaily02BulkRounded,
  StrokeSharp: IconTaskDaily02StrokeSharp,
  SolidSharp: IconTaskDaily02SolidSharp,
};