import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 10.8664C14 11.9719 13.1046 12.868 12 12.868C10.8954 12.868 10 11.9719 10 10.8664C10 9.76091 10.8954 8.86475 12 8.86475C13.1046 8.86475 14 9.76091 14 10.8664Z',
  d2: 'M13.9907 10.6843L20 14.3678C19.1716 15.8036 17.3368 16.2955 15.9019 15.4666L11.7373 12.8487',
  d3: 'M13.484 9.50448L13.484 2.36762C11.8271 2.36758 10.5168 3.71191 10.5168 5.36975C10.5168 5.36975 10.5168 7.88979 10.5168 9.50451',
  d4: 'M10.007 10.6865L4 14.3681C4.82843 15.8039 6.6632 16.2958 8.09808 15.4669L12.2617 12.8502',
  d5: 'M13.4502 16.8694L13.7702 18.8916C13.9962 20.4963 14.1092 21.2987 13.8547 21.8356C13.6001 22.3725 13.1067 22.3726 12.1199 22.3726H11.8801C10.8933 22.3726 10.3999 22.3725 10.1453 21.8356C9.89078 21.2987 10.0038 20.4963 10.2298 18.8916L10.5498 16.8694',
  d6: 'M13.5 2C11.8431 2 10.5 3.34315 10.5 5V9.17755C10.8665 8.76207 11.4028 8.5 12.0004 8.5C12.5975 8.5 13.1335 8.76168 13.5 9.17662V2Z',
  d7: 'M20 14.0006C19.1716 15.4355 17.3368 15.9271 15.9019 15.0987L12 12.6474L8.09808 15.0982C6.6632 15.9266 4.82843 15.435 4 14.0001L10.007 10.3207L11.7373 12.4824L12 12.6474L12.2617 12.483L13.9907 10.3193L20 14.0006Z',
  d8: 'M11.8801 22H12.1199C13.1067 22 13.6001 22 13.8547 21.4634C14.1092 20.9269 13.9962 20.125 13.7702 18.5212L13 12H11L10.2298 18.5212C10.0038 20.125 9.89078 20.9269 10.1453 21.4634C10.3999 22 10.8933 22 11.8801 22Z',
  d9: 'M13.4838 9.17739V2.04053C11.8269 2.04049 10.5166 3.38482 10.5166 5.04266C10.5166 5.04266 10.5166 7.5627 10.5166 9.17742',
  d10: 'M13.9907 10.3188L20 14.0001C19.1716 15.435 17.3368 15.9266 15.9019 15.0982L11.7373 12.4819',
  d11: 'M10.007 10.3208L4 14.0002C4.82843 15.4351 6.6632 15.9267 8.09808 15.0983L12.2617 12.4832',
  d12: 'M13.4502 16.5L13.7702 18.521C13.9962 20.1248 14.1092 20.9267 13.8547 21.4633C13.6001 21.9999 13.1067 21.9999 12.1199 21.9999H11.8801C10.8933 21.9999 10.3999 21.9999 10.1453 21.4633C9.89078 20.9267 10.0038 20.1248 10.2298 18.521L10.5498 16.5',
  d13: 'M14 10.5C14 11.6046 13.1046 12.5 12 12.5C10.8954 12.5 10 11.6046 10 10.5C10 9.39543 10.8954 8.5 12 8.5C13.1046 8.5 14 9.39543 14 10.5Z',
  d14: 'M13.4502 16.4888L13.7702 18.5143C13.9962 20.1217 14.1092 20.9253 13.8547 21.4631C13.6001 22.0009 13.1067 22.0009 12.1199 22.0009H11.8801C10.8933 22.0009 10.3999 22.0009 10.1453 21.4631C9.89078 20.9253 10.0038 20.1217 10.2298 18.5143L10.5498 16.4888',
  d15: 'M13.9907 10.2938L20 13.9833C19.1716 15.4213 17.3368 15.914 15.9019 15.0838L11.7373 12.4617M10.007 10.2959L4 13.9834C4.82843 15.4215 6.6632 15.9142 8.09808 15.084L12.2617 12.4631M13.5586 9.14479L13.4707 1.99908C11.8138 1.99905 10.5079 3.20302 10.5079 4.96847C10.5079 4.96847 10.4917 7.48119 10.4917 9.09948C10.7592 8.79669 11.1819 8.42554 12.0732 8.42554C12.5463 8.42554 13.2655 8.71756 13.5586 9.14479Z',
  d16: 'M14 10.4551C14 11.5597 13.1046 12.4551 12 12.4551C10.8954 12.4551 10 11.5597 10 10.4551C10 9.35057 10.8954 8.45514 12 8.45514C13.1046 8.45514 14 9.35057 14 10.4551Z',
  d17: 'M12 9.25C11.3096 9.25 10.75 9.80964 10.75 10.5C10.75 11.1904 11.3096 11.75 12 11.75C12.6904 11.75 13.25 11.1904 13.25 10.5C13.25 9.80964 12.6904 9.25 12 9.25ZM9.25 10.5C9.25 8.98122 10.4812 7.75 12 7.75C13.5188 7.75 14.75 8.98122 14.75 10.5C14.75 12.0188 13.5188 13.25 12 13.25C10.4812 13.25 9.25 12.0188 9.25 10.5Z',
  d18: 'M9.74986 5C9.74986 2.92893 11.4288 1.25 13.4999 1.25C13.9141 1.25 14.2499 1.58579 14.2499 2V8.91861C13.7522 8.21179 12.9299 7.75 11.9998 7.75C11.0697 7.75 10.2476 8.21166 9.74986 8.91831V5Z',
  d19: 'M9.32486 9.85901L3.60812 13.3607C3.26137 13.5731 3.14703 14.0231 3.35034 14.3752C4.38588 16.1688 6.67934 16.7834 8.47294 15.7478C8.481 15.7432 8.48897 15.7384 8.49686 15.7334L12.0004 13.5328L15.503 15.7332C15.5109 15.7382 15.5189 15.743 15.5269 15.7477C17.3205 16.7832 19.614 16.1687 20.6495 14.3751C20.8528 14.0229 20.7385 13.5729 20.3918 13.3605L14.6744 9.85805C14.7237 10.064 14.7498 10.279 14.7498 10.5C14.7498 12.0188 13.5185 13.25 11.9998 13.25C10.481 13.25 9.24976 12.0188 9.24976 10.5C9.24976 10.2793 9.27575 10.0647 9.32486 9.85901Z',
  d20: 'M9.7214 16.7357L9.48202 18.4516C9.37322 19.2236 9.28466 19.8519 9.25824 20.3528C9.23148 20.86 9.25948 21.3461 9.46753 21.7847C9.57324 22.0075 9.72071 22.2078 9.92572 22.3665C10.1279 22.5231 10.3493 22.6106 10.5623 22.6619C10.9295 22.7503 11.751 22.7501 12.1859 22.7499C12.6208 22.7501 13.0702 22.7503 13.4373 22.6619C13.6504 22.6106 13.8718 22.5231 14.074 22.3665C14.279 22.2078 14.4264 22.0075 14.5321 21.7847C14.7402 21.3461 14.7682 20.86 14.7414 20.3528C14.715 19.8519 14.6265 19.2236 14.5177 18.4517L14.2782 16.7351L12.0005 15.3042L9.7214 16.7357Z',
  d21: 'M9.25 10.5C9.25 8.98122 10.4812 7.75 12 7.75C13.5188 7.75 14.75 8.98122 14.75 10.5C14.75 12.0188 13.5188 13.25 12 13.25C10.4812 13.25 9.25 12.0188 9.25 10.5Z',
  d22: 'M13.9909 10.3188L20.0001 14.0001C19.1717 15.4349 17.3369 15.9266 15.902 15.0981L11.7374 12.4818',
  d23: 'M13.4498 16L13.9996 22H10L10.5494 16',
  d24: 'M11.9995 9.25C11.3103 9.25 10.7516 9.80964 10.7516 10.5C10.7516 11.1904 11.3103 11.75 11.9995 11.75C12.6887 11.75 13.2475 11.1904 13.2475 10.5C13.2475 9.80964 12.6887 9.25 11.9995 9.25ZM9.25409 10.5C9.25409 8.98122 10.4833 7.75 11.9995 7.75C13.5158 7.75 14.745 8.98122 14.745 10.5C14.745 12.0188 13.5158 13.25 11.9995 13.25C10.4833 13.25 9.25409 12.0188 9.25409 10.5Z',
  d25: 'M13.4977 1.25C11.4301 1.25 9.75391 2.92893 9.75391 5V8.91728C10.2508 8.21121 11.0713 7.75 11.9993 7.75C12.9284 7.75 13.7497 8.21224 14.2464 8.91964V1.25H13.4977Z',
  d26: 'M14.6697 9.85841C14.7188 10.0643 14.7448 10.2791 14.7448 10.5C14.7448 12.0188 13.5156 13.25 11.9993 13.25C10.4831 13.25 9.25391 12.0188 9.25391 10.5C9.25391 10.2795 9.27982 10.065 9.32877 9.85949L3 13.7425L3.36477 14.3754C4.39859 16.169 6.68825 16.7835 8.47887 15.7479L8.49094 15.741L12.0001 13.5332L15.5084 15.7408L15.5205 15.7478C17.3111 16.7834 19.6007 16.1688 20.6346 14.3752L20.9993 13.7424L14.6697 9.85841Z',
  d27: 'M9.72853 16.7344L9.2568 21.9321C9.23775 22.1419 9.30772 22.3501 9.44958 22.5057C9.59144 22.6613 9.79211 22.75 10.0025 22.75H13.9955C14.2058 22.75 14.4065 22.6613 14.5484 22.5058C14.6902 22.3502 14.7602 22.142 14.7412 21.9321L14.2695 16.7336L11.9999 15.3054L9.72853 16.7344Z',
};

export const IconWindPower03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-stroke-rounded IconWindPower03StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconWindPower03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-duotone-rounded IconWindPower03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-twotone-rounded IconWindPower03TwotoneRounded"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-solid-rounded IconWindPower03SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconWindPower03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-bulk-rounded IconWindPower03BulkRounded"
    >
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-stroke-sharp IconWindPower03StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWindPower03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wind-power-03-solid-sharp IconWindPower03SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWindPower03: TheIconSelfPack = {
  name: 'WindPower03',
  StrokeRounded: IconWindPower03StrokeRounded,
  DuotoneRounded: IconWindPower03DuotoneRounded,
  TwotoneRounded: IconWindPower03TwotoneRounded,
  SolidRounded: IconWindPower03SolidRounded,
  BulkRounded: IconWindPower03BulkRounded,
  StrokeSharp: IconWindPower03StrokeSharp,
  SolidSharp: IconWindPower03SolidSharp,
};