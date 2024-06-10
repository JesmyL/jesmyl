import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 11V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V11M8 8H16',
  d2: 'M12.5 13H11.5C10.5572 13 10.0858 13 9.79289 13.2929C9.5 13.5858 9.5 14.0572 9.5 15V16C9.5 16.9428 9.5 17.4142 9.79289 17.7071C10.0858 18 10.5572 18 11.5 18H12.5C13.4428 18 13.9142 18 14.2071 17.7071C14.5 17.4142 14.5 16.9428 14.5 16V15C14.5 14.0572 14.5 13.5858 14.2071 13.2929C13.9142 13 13.4428 13 12.5 13Z',
  d3: 'M20.0302 6.5C21.8897 7.89188 20.9043 11 18.5243 11C15.7119 11 16.015 7.9346 16.015 6C16.015 3.79086 14.2174 2 12 2C9.7826 2 7.98504 3.79086 7.98504 6C7.98504 7.9346 8.28808 11 5.47569 11C3.09553 11 2.11029 7.89156 3.97008 6.49982',
  d4: 'M19 16V11.4757C19 11.213 18.787 11 18.5243 11C16.5837 11 16.1264 9.54045 16.0294 8H7.97058C7.87357 9.54045 7.41632 11 5.47569 11C5.21298 11 5 11.213 5 11.4757V16C5 18.8284 5 20.2426 5.87868 21.1213C6.75736 22 8.17157 22 11 22H13C15.8284 22 17.2426 22 18.1213 21.1213C19 20.2426 19 18.8284 19 16ZM11.5 13H12.5C13.4428 13 13.9142 13 14.2071 13.2929C14.5 13.5858 14.5 14.0572 14.5 15V16C14.5 16.9428 14.5 17.4142 14.2071 17.7071C13.9142 18 13.4428 18 12.5 18H11.5C10.5572 18 10.0858 18 9.79289 17.7071C9.5 17.4142 9.5 16.9428 9.5 16V15C9.5 14.0572 9.5 13.5858 9.79289 13.2929C10.0858 13 10.5572 13 11.5 13Z',
  d5: 'M7.97058 7.25C7.57467 7.25 7.24695 7.55773 7.22206 7.95286C7.17558 8.691 7.04572 9.27602 6.78911 9.66367C6.5735 9.98937 6.22186 10.25 5.4757 10.25C5.35579 10.25 5.24339 10.2391 5.13831 10.2194C4.91901 10.1783 4.69277 10.2369 4.52106 10.3794C4.34935 10.5219 4.25 10.7334 4.25 10.9566L4.25 16.0549V16.0549V16.0549C4.24998 17.4225 4.24996 18.5248 4.36652 19.3918C4.48754 20.2919 4.74643 21.0497 5.34835 21.6517C5.95027 22.2536 6.70814 22.5125 7.60825 22.6335C8.47521 22.75 9.57752 22.75 10.9451 22.75H10.9451H10.9451H13.0549H13.0549H13.0549C14.4225 22.75 15.5248 22.75 16.3918 22.6335C17.2919 22.5125 18.0497 22.2536 18.6517 21.6516C19.2536 21.0497 19.5125 20.2919 19.6335 19.3918C19.75 18.5248 19.75 17.4225 19.75 16.0549V16.0549V16.0549V10.9565C19.75 10.7334 19.6507 10.5219 19.4789 10.3794C19.3072 10.2369 19.081 10.1783 18.8617 10.2194C18.7566 10.2391 18.6442 10.25 18.5243 10.25C17.7781 10.25 17.4265 9.98937 17.2109 9.66367C16.9543 9.27602 16.8244 8.691 16.7779 7.95286C16.7531 7.55773 16.4253 7.25 16.0294 7.25L7.97058 7.25ZM11.4 12.5L12.6 12.5C13.7314 12.5 14.2971 12.5 14.6485 12.8515C15 13.2029 15 13.7686 15 14.9L15 16.1C15 17.2314 15 17.7971 14.6485 18.1485C14.2971 18.5 13.7314 18.5 12.6 18.5H11.4C10.2686 18.5 9.70294 18.5 9.35147 18.1485C9 17.7971 9 17.2314 9 16.1V14.9C9 13.7686 9 13.2029 9.35147 12.8515C9.70294 12.5 10.2686 12.5 11.4 12.5Z',
  d6: 'M12 3.15909C10.373 3.15909 9.06035 4.44454 9.06035 6.02273C9.06035 6.15496 9.06255 6.302 9.06492 6.46033C9.07721 7.28316 9.09407 8.41113 8.83077 9.35345C8.66554 9.94479 8.36871 10.5629 7.81576 11.0313C7.24789 11.5123 6.5112 11.75 5.63867 11.75C2.3605 11.75 1.0385 7.60228 3.58649 5.73558C4.01763 5.41972 4.62868 5.50583 4.95131 5.92791C5.27394 6.35 5.18598 6.94822 4.75485 7.26407C3.67617 8.05433 4.27541 9.84091 5.63867 9.84091C6.1372 9.84091 6.39188 9.71288 6.53983 9.58755C6.7027 9.44959 6.84617 9.22074 6.94983 8.84973C7.13278 8.19498 7.12387 7.40817 7.11452 6.5817C7.11242 6.39701 7.11031 6.21034 7.11031 6.02273C7.11031 3.38347 9.30293 1.25 12 1.25C14.6971 1.25 16.8897 3.38347 16.8897 6.02273C16.8897 6.21034 16.8876 6.39701 16.8855 6.5817C16.8761 7.40817 16.8672 8.19498 17.0502 8.84973C17.1538 9.22074 17.2973 9.44959 17.4602 9.58755C17.6081 9.71288 17.8628 9.84091 18.3613 9.84091C19.7245 9.84091 20.3238 8.05451 19.2453 7.26418C18.8142 6.94827 18.7263 6.35004 19.049 5.928C19.3717 5.50595 19.9827 5.41991 20.4138 5.73582C22.9614 7.6027 21.6393 11.75 18.3613 11.75C17.4888 11.75 16.7521 11.5123 16.1842 11.0313C15.6313 10.5629 15.3345 9.94479 15.1692 9.35345C14.9059 8.41113 14.9228 7.28316 14.9351 6.46033C14.9374 6.302 14.9396 6.15496 14.9396 6.02273C14.9396 4.44454 13.627 3.15909 12 3.15909Z',
  d7: 'M7.22206 7.95286C7.24695 7.55773 7.57467 7.25 7.97058 7.25H16.0294C16.4253 7.25 16.753 7.55773 16.7779 7.95286C16.8244 8.691 16.9543 9.27602 17.2109 9.66367C17.4265 9.98937 17.7781 10.25 18.5243 10.25C18.6442 10.25 18.7566 10.2391 18.8617 10.2194C19.081 10.1783 19.3072 10.2369 19.4789 10.3794C19.6507 10.5219 19.75 10.7334 19.75 10.9565V16.0549V16.0549C19.75 17.4225 19.75 18.5248 19.6335 19.3918C19.5125 20.2919 19.2536 21.0497 18.6517 21.6517C18.0497 22.2536 17.2919 22.5125 16.3918 22.6335C15.5248 22.75 14.4225 22.75 13.0549 22.75H13.0549H10.9451H10.9451C9.57754 22.75 8.47522 22.75 7.60825 22.6335C6.70814 22.5125 5.95027 22.2536 5.34835 21.6517C4.74643 21.0497 4.48754 20.2919 4.36652 19.3918C4.24996 18.5248 4.24998 17.4225 4.25 16.0549V16.0549V10.9566C4.25 10.7334 4.34935 10.5219 4.52106 10.3794C4.69277 10.2369 4.919 10.1783 5.13831 10.2194C5.24339 10.2391 5.35579 10.25 5.47569 10.25C6.22186 10.25 6.5735 9.98937 6.78911 9.66367C7.04572 9.27602 7.17558 8.691 7.22206 7.95286Z',
  d8: 'M12.6 12.5H11.4C10.2686 12.5 9.70294 12.5 9.35147 12.8515C9 13.2029 9 13.7686 9 14.9V16.1C9 17.2314 9 17.7971 9.35147 18.1485C9.70294 18.5 10.2686 18.5 11.4 18.5H12.6C13.7314 18.5 14.2971 18.5 14.6485 18.1485C15 17.7971 15 17.2314 15 16.1V14.9C15 13.7686 15 13.2029 14.6485 12.8515C14.2971 12.5 13.7314 12.5 12.6 12.5Z',
  d9: 'M19 11V22H5V11M8 8H16',
  d10: 'M14.5 13H9.5V18H14.5V13Z',
  d11: 'M14.9303 7.25L9.06974 7.25C9.07252 6.9688 9.06852 6.70146 9.06492 6.46033C9.06255 6.302 9.06035 6.15496 9.06035 6.02273C9.06035 4.44454 10.373 3.15909 12 3.15909C13.627 3.15909 14.9396 4.44454 14.9396 6.02273C14.9396 6.15496 14.9374 6.302 14.9351 6.46033C14.9315 6.70146 14.9275 6.9688 14.9303 7.25ZM19.75 11.4696C21.9585 10.5071 22.5625 7.31037 20.4138 5.73582L19.2453 7.26418C20.3238 8.05451 19.7245 9.84091 18.3613 9.84091C17.8628 9.84091 17.6081 9.71288 17.4602 9.58755C17.2973 9.44959 17.1538 9.22073 17.0502 8.84972C16.8672 8.19498 16.8761 7.40817 16.8855 6.5817C16.8876 6.39701 16.8897 6.21034 16.8897 6.02273C16.8897 3.38347 14.6971 1.25 12 1.25C9.30293 1.25 7.11031 3.38347 7.11031 6.02273C7.11031 6.21034 7.11242 6.39701 7.11452 6.5817C7.12387 7.40817 7.13278 8.19498 6.94983 8.84973C6.84617 9.22074 6.7027 9.44959 6.53983 9.58755C6.39188 9.71288 6.1372 9.84091 5.63867 9.84091C4.27541 9.84091 3.67617 8.05433 4.75485 7.26407L3.58649 5.73558C1.43747 7.30999 2.04138 10.507 4.25 11.4696L4.25 22C4.25 22.4142 4.58579 22.75 5 22.75L19 22.75C19.4142 22.75 19.75 22.4142 19.75 22V11.4696ZM15 13L9 13V19H15L15 13Z',
};

export const IconApronStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-stroke-rounded IconApronStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconApronDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-duotone-rounded IconApronDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconApronTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-twotone-rounded IconApronTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconApronSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-solid-rounded IconApronSolidRounded"
    >
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

export const IconApronBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-bulk-rounded IconApronBulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconApronStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-stroke-sharp IconApronStrokeSharp"
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

export const IconApronSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="apron-solid-sharp IconApronSolidSharp"
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

export const iconPackOfApron: TheIconSelfPack = {
  name: 'Apron',
  StrokeRounded: IconApronStrokeRounded,
  DuotoneRounded: IconApronDuotoneRounded,
  TwotoneRounded: IconApronTwotoneRounded,
  SolidRounded: IconApronSolidRounded,
  BulkRounded: IconApronBulkRounded,
  StrokeSharp: IconApronStrokeSharp,
  SolidSharp: IconApronSolidSharp,
};