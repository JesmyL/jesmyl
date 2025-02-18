import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.09102 8.54478C4.69578 6.36211 4.99816 5.27077 5.90007 4.63538C6.80198 4 8.04873 4 10.5422 4H14.5661C18.4865 4 20.4468 4 21.4452 5.15376C22.4435 6.30753 21.9681 8.02342 21.0173 11.4552L19.909 15.4552C19.3042 17.6379 19.0018 18.7292 18.0999 19.3646C17.198 20 15.9513 20 13.4578 20H9.43393C5.51345 20 3.55321 20 2.55483 18.8462C1.55645 17.6925 2.03188 15.9766 2.98273 12.5448L4.09102 8.54478Z',
  d2: 'M4.09102 8.54478C4.69578 6.36211 4.99816 5.27077 5.90007 4.63538C6.80198 4 8.04873 4 10.5422 4H14.5661C18.4865 4 20.4468 4 21.4452 5.15376C22.4436 6.30753 21.9681 8.02342 21.0173 11.4552L19.909 15.4552C19.3042 17.6379 19.0018 18.7292 18.0999 19.3646C17.198 20 15.9513 20 13.4578 20H9.43393C5.51345 20 3.55321 20 2.55483 18.8462C1.55645 17.6925 2.03188 15.9766 2.98273 12.5448L4.09102 8.54478Z',
  d3: 'M11.4459 20H9.43393C5.51345 20 3.55321 20 2.55483 18.8462C1.55645 17.6925 2.03188 15.9766 2.98273 12.5448L4.09102 8.54478C4.69578 6.36211 4.99816 5.27077 5.90007 4.63538C6.80198 4 8.04873 4 10.5422 4H13',
  d4: 'M14.6231 3.25C16.5348 3.24999 18.0448 3.24997 19.1983 3.40053C20.3721 3.55375 21.3343 3.87973 22.0121 4.663C22.7052 5.46402 22.8317 6.43003 22.7073 7.5342C22.5877 8.59575 22.218 9.92972 21.758 11.5897L20.6182 15.7035L20.6182 15.7036C20.3272 16.7541 20.0895 17.6118 19.8066 18.2819C19.5093 18.9861 19.1349 19.5528 18.5317 19.9777C17.9356 20.3977 17.2568 20.5798 16.4559 20.6663C15.6795 20.75 14.7109 20.75 13.5009 20.75H13.5009H9.3765C7.46477 20.75 5.95478 20.75 4.80132 20.5995C3.62746 20.4463 2.66527 20.1203 1.98748 19.337C1.29434 18.536 1.16792 17.57 1.29233 16.4658C1.41193 15.4043 1.78156 14.0703 2.24153 12.4103L3.38134 8.29656C3.6724 7.246 3.91005 6.3882 4.19298 5.71812C4.49032 5.01388 4.86473 4.4472 5.46793 4.02226C6.06402 3.60231 6.7428 3.42016 7.54364 3.33375C8.32007 3.24998 9.28871 3.24999 10.4987 3.25H14.6231Z',
  d5: 'M9.3765 20.75C7.46477 20.75 5.95478 20.75 4.80132 20.5995C3.62746 20.4463 2.66527 20.1203 1.98748 19.337C1.29434 18.536 1.16792 17.57 1.29233 16.4658C1.41193 15.4043 1.78156 14.0703 2.24153 12.4103L3.38134 8.29656C3.6724 7.246 3.91005 6.3882 4.19298 5.71812C4.49032 5.01388 4.86473 4.4472 5.46793 4.02226C6.06402 3.60231 6.7428 3.42016 7.54364 3.33375C8.32007 3.24998 9.28871 3.24999 10.4987 3.25H14.6231L9.3765 20.75Z',
  d6: 'M14.6216 3.25C16.5333 3.24999 18.0433 3.24997 19.1968 3.40053C20.3706 3.55375 21.3328 3.87973 22.0106 4.663C22.7037 5.46402 22.8302 6.43003 22.7058 7.5342C22.5862 8.59575 22.2165 9.92972 21.7565 11.5897L20.6167 15.7035L20.6167 15.7036C20.3257 16.7541 20.088 17.6118 19.8051 18.2819C19.5078 18.9861 19.1334 19.5528 18.5302 19.9777C17.9341 20.3977 17.2553 20.5798 16.4544 20.6663C15.678 20.75 14.7094 20.75 13.4994 20.75H13.4994H9.375L14.6216 3.25H14.6216Z',
  d7: 'M2 20L6 4H22L18 20H2Z',
  d8: 'M5.2724 3.8181C5.35587 3.48422 5.65586 3.25 6.00001 3.25H22C22.231 3.25 22.449 3.3564 22.5912 3.53844C22.7333 3.72048 22.7836 3.95785 22.7276 4.1819L18.7276 20.1819C18.6441 20.5158 18.3442 20.75 18 20.75H2.00001C1.76906 20.75 1.55098 20.6436 1.40885 20.4616C1.26672 20.2795 1.21639 20.0422 1.2724 19.8181L5.2724 3.8181Z',
};

export const IconParallelogramStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-stroke-rounded IconParallelogramStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParallelogramDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-duotone-rounded IconParallelogramDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParallelogramTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-twotone-rounded IconParallelogramTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconParallelogramSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-solid-rounded IconParallelogramSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParallelogramBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-bulk-rounded IconParallelogramBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconParallelogramStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-stroke-sharp IconParallelogramStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParallelogramSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parallelogram-solid-sharp IconParallelogramSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfParallelogram: TheIconSelfPack = {
  name: 'Parallelogram',
  StrokeRounded: IconParallelogramStrokeRounded,
  DuotoneRounded: IconParallelogramDuotoneRounded,
  TwotoneRounded: IconParallelogramTwotoneRounded,
  SolidRounded: IconParallelogramSolidRounded,
  BulkRounded: IconParallelogramBulkRounded,
  StrokeSharp: IconParallelogramStrokeSharp,
  SolidSharp: IconParallelogramSolidSharp,
};