import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z',
  d2: 'M4 2.84924C5.10457 1.71692 6.89543 1.71692 8 2.84924L11.5934 6.5329C10.5589 6.70212 9.73787 7.50632 9.54369 8.53222L4 2.84924Z',
  d3: 'M20 15.1508C18.8954 16.2831 17.1046 16.2831 16 15.1508L12.4066 11.4671C13.4411 11.2979 14.2621 10.4937 14.4563 9.46778L20 15.1508Z',
  d4: 'M20 2.84943C18.8954 1.71711 17.1046 1.7171 16 2.84943L12.4068 6.53293C13.4413 6.70221 14.2622 7.50646 14.4563 8.53238L20 2.84943Z',
  d5: 'M4 15.1509C5.10457 16.2833 6.89543 16.2833 8 15.1509L11.5935 11.4671C10.559 11.298 9.73796 10.4938 9.54372 9.46793L4 15.1509Z',
  d6: 'M13.4502 16L13.7702 18.5212C13.9962 20.125 14.1092 20.9269 13.8547 21.4634C13.6001 22 13.1067 22 12.1199 22H11.8801C10.8933 22 10.3999 22 10.1453 21.4634C9.89078 20.9269 10.0038 20.125 10.2298 18.5212L10.5498 16',
  d7: 'M11.8801 22H12.1199C13.1067 22 13.6001 22 13.8547 21.4634C14.1092 20.9269 13.9962 20.125 13.7702 18.5212L13.7702 18.5212L13 12H11L10.2298 18.5212C10.0038 20.125 9.89078 20.9269 10.1453 21.4634C10.3999 22 10.8933 22 11.8801 22Z',
  d8: 'M12 7.25C11.0335 7.25 10.25 8.0335 10.25 9C10.25 9.9665 11.0335 10.75 12 10.75C12.9665 10.75 13.75 9.9665 13.75 9C13.75 8.0335 12.9665 7.25 12 7.25ZM8.75 9C8.75 7.20507 10.2051 5.75 12 5.75C13.7949 5.75 15.25 7.20507 15.25 9C15.25 10.7949 13.7949 12.25 12 12.25C10.2051 12.25 8.75 10.7949 8.75 9Z',
  d9: 'M8.53687 2.32553C7.13797 0.891488 4.86203 0.89149 3.46313 2.32553C3.17896 2.61685 3.17896 3.08164 3.46313 3.37295L8.75612 8.79893C8.85753 7.13738 10.2073 5.81312 11.8795 5.75219L8.53687 2.32553Z',
  d10: 'M12.1206 5.7522C13.7928 5.81321 15.1426 7.13753 15.2439 8.79911L20.5369 3.37314C20.821 3.08182 20.821 2.61703 20.5369 2.32572C19.138 0.891675 16.862 0.891674 15.4631 2.32572L12.1206 5.7522Z',
  d11: 'M15.2439 9.20107C15.1425 10.8626 13.7927 12.1869 12.1205 12.2478L15.4631 15.6745C16.862 17.1085 19.138 17.1085 20.5369 15.6745C20.821 15.3832 20.821 14.9184 20.5369 14.627L15.2439 9.20107Z',
  d12: 'M11.8797 12.2478C10.2075 12.187 8.85763 10.8628 8.75613 9.20124L3.46313 14.6272C3.17896 14.9185 3.17896 15.3833 3.46313 15.6747C4.86203 17.1087 7.13797 17.1087 8.53687 15.6747L11.8797 12.2478Z',
  d13: 'M9.74242 16.5869L9.48226 18.4518C9.37347 19.2237 9.28491 19.8521 9.25848 20.353C9.23173 20.8602 9.25972 21.3463 9.46778 21.7849C9.57349 22.0077 9.72095 22.208 9.92596 22.3667C10.1282 22.5232 10.3495 22.6108 10.5626 22.6621C10.9297 22.7505 11.3791 22.7503 11.814 22.75H12.1862C12.6211 22.7503 13.0705 22.7505 13.4376 22.6621C13.6506 22.6108 13.872 22.5232 14.0742 22.3667C14.2792 22.208 14.4267 22.0077 14.5324 21.7849C14.7404 21.3463 14.7684 20.8602 14.7417 20.353C14.7153 19.8521 14.6267 19.2237 14.5179 18.4518L14.2577 16.5869L12.0001 14.2726L9.74242 16.5869Z',
  d14: 'M8.75 9C8.75 7.20507 10.2051 5.75 12 5.75C13.7949 5.75 15.25 7.20507 15.25 9C15.25 10.7949 13.7949 12.25 12 12.25C10.2051 12.25 8.75 10.7949 8.75 9Z',
  d15: 'M13.4498 16L13.9996 22H10L10.5494 16',
  d16: 'M12.0004 7.25C11.039 7.25 10.2597 8.0335 10.2597 9C10.2597 9.9665 11.039 10.75 12.0004 10.75C12.9618 10.75 13.7412 9.9665 13.7412 9C13.7412 8.0335 12.9618 7.25 12.0004 7.25ZM8.76758 9C8.76758 7.20507 10.215 5.75 12.0004 5.75C13.7859 5.75 15.2333 7.20507 15.2333 9C15.2333 10.7949 13.7859 12.25 12.0004 12.25C10.215 12.25 8.76758 10.7949 8.76758 9Z',
  d17: 'M8.55514 2.32553C7.16363 0.891488 4.89969 0.89149 3.50818 2.32553L3 2.84924L8.77334 8.79904C8.87417 7.13747 10.2168 5.81318 11.8802 5.75219L8.55514 2.32553Z',
  d18: 'M12.12 5.75219C13.7834 5.81316 15.126 7.13744 15.2269 8.799L21 2.84943L20.4918 2.32572C19.1003 0.891675 16.8364 0.891674 15.4449 2.32572L12.12 5.75219Z',
  d19: 'M15.2269 9.20117C15.1259 10.8627 13.7832 12.1869 12.1198 12.2478L15.4449 15.6745C16.8364 17.1085 19.1003 17.1085 20.4918 15.6745L21 15.1508L15.2269 9.20117Z',
  d20: 'M11.8804 12.2478C10.217 12.1869 8.87426 10.8627 8.77335 9.20114L3 15.1509L3.50818 15.6747C4.89969 17.1087 7.16363 17.1087 8.55514 15.6747L11.8804 12.2478Z',
  d21: 'M9.75076 16.5903L9.26772 21.932C9.24874 22.1419 9.31845 22.3501 9.4598 22.5057C9.60115 22.6613 9.80109 22.7499 10.0107 22.7499H13.9892C14.1988 22.7499 14.3988 22.6613 14.5401 22.5057C14.6814 22.3501 14.7512 22.1419 14.7322 21.932L14.2494 16.5907L11.9999 14.2725L9.75076 16.5903Z',
};

export const IconWindPower02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-stroke-rounded IconWindPower02StrokeRounded"
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
        strokeLinejoin="round" 
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

export const IconWindPower02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-duotone-rounded IconWindPower02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
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
        strokeLinejoin="round" 
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

export const IconWindPower02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-twotone-rounded IconWindPower02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
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

export const IconWindPower02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-solid-rounded IconWindPower02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
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

export const IconWindPower02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-bulk-rounded IconWindPower02BulkRounded"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-stroke-sharp IconWindPower02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-02-solid-sharp IconWindPower02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWindPower02: TheIconSelfPack = {
  name: 'WindPower02',
  StrokeRounded: IconWindPower02StrokeRounded,
  DuotoneRounded: IconWindPower02DuotoneRounded,
  TwotoneRounded: IconWindPower02TwotoneRounded,
  SolidRounded: IconWindPower02SolidRounded,
  BulkRounded: IconWindPower02BulkRounded,
  StrokeSharp: IconWindPower02StrokeSharp,
  SolidSharp: IconWindPower02SolidSharp,
};