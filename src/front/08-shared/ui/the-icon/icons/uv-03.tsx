import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13',
  d2: 'M11.9998 4H12.0088',
  d3: 'M18.3671 6.63268L18.3734 6.63903',
  d4: 'M5.63658 6.63978L5.64293 6.63343',
  d5: 'M21.0039 12.9959L21.0039 13.0049',
  d6: 'M3.00391 12.9959L3.00391 13.0049',
  d7: 'M6.5 16V19C6.5 19.9428 6.5 20.4142 6.79289 20.7071C7.08579 21 7.55719 21 8.5 21V21C9.44281 21 9.91421 21 10.2071 20.7071C10.5 20.4142 10.5 19.9428 10.5 19V16',
  d8: 'M13.5 16L15.5 21L17.5 16',
  d9: 'M12 8C9.23858 8 7 10.2386 7 13H17C17 10.2386 14.7614 8 12 8Z',
  d10: 'M5.63658 6.64076L5.64293 6.63441',
  d11: 'M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z',
  d12: 'M13 3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3Z',
  d13: 'M4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12Z',
  d14: 'M22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12Z',
  d15: 'M19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34314C18.6805 6.73367 18.0474 6.73367 17.6569 6.34314C17.2663 5.95262 17.2663 5.31946 17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893Z',
  d16: 'M6.34398 6.34295C5.95345 6.73348 5.32029 6.73348 4.92976 6.34295C4.53924 5.95243 4.53924 5.31927 4.92976 4.92874C5.32029 4.53822 5.95345 4.53822 6.34398 4.92874C6.7345 5.31927 6.7345 5.95243 6.34398 6.34295Z',
  d17: 'M6.50001 15C7.0523 15 7.50001 15.4477 7.50001 16V19C7.50001 19.4997 7.50214 19.7738 7.52771 19.964C7.52804 19.9665 7.52837 19.9689 7.52871 19.9713C7.53108 19.9716 7.53351 19.972 7.53599 19.9723C7.72618 19.9979 8.00034 20 8.50001 20C8.99969 20 9.27385 19.9979 9.46404 19.9723C9.46652 19.972 9.46894 19.9716 9.47132 19.9713C9.47165 19.9689 9.47199 19.9665 9.47232 19.964C9.49789 19.7738 9.50001 19.4997 9.50001 19V16C9.50001 15.4477 9.94773 15 10.5 15C11.0523 15 11.5 15.4477 11.5 16V19C11.5 19.0182 11.5 19.0363 11.5 19.0544C11.5001 19.4785 11.5002 19.8906 11.4545 20.2305C11.403 20.6137 11.2774 21.051 10.9142 21.4142C10.551 21.7774 10.1137 21.903 9.73053 21.9545C9.39062 22.0002 8.97849 22.0001 8.55442 22C8.53631 22 8.51817 22 8.50001 22C8.48186 22 8.46372 22 8.4456 22C8.02153 22.0001 7.60941 22.0002 7.26949 21.9545C6.88629 21.903 6.44902 21.7774 6.0858 21.4142C5.72259 21.051 5.59706 20.6137 5.54554 20.2305C5.49984 19.8906 5.49992 19.4785 5.50001 19.0544C5.50001 19.0363 5.50001 19.0182 5.50001 19V16C5.50001 15.4477 5.94773 15 6.50001 15Z',
  d18: 'M13.1289 15.0718C13.6417 14.8667 14.2236 15.1161 14.4287 15.6289L15.5003 18.3077L16.5718 15.6289C16.7769 15.1161 17.3589 14.8667 17.8717 15.0718C18.3844 15.2769 18.6339 15.8589 18.4287 16.3717L16.4287 21.3717C16.2769 21.7513 15.9092 22.0003 15.5003 22.0003C15.0914 22.0003 14.7237 21.7513 14.5718 21.3717L12.5718 16.3717C12.3667 15.8589 12.6161 15.2769 13.1289 15.0718Z',
  d19: 'M10 21V21.75H10.75V21H10ZM6 21H5.25C5.25 21.4142 5.58579 21.75 6 21.75V21ZM9.25 16V21H10.75V16H9.25ZM10 20.25H6V21.75H10V20.25ZM6.75 21V16H5.25V21H6.75Z',
  d20: 'M13 16L15 21H16L18 16',
  d21: 'M6.24609 13.25V12.5C6.24609 9.32436 8.82046 6.75 11.9961 6.75C15.1717 6.75 17.7461 9.32436 17.7461 12.5V13.25H6.24609Z',
  d22: 'M10.9961 3.5C10.9961 2.94772 11.4438 2.5 11.9961 2.5H12.0051C12.5574 2.5 13.0051 2.94772 13.0051 3.5C13.0051 4.05228 12.5574 4.5 12.0051 4.5H11.9961C11.4438 4.5 10.9961 4.05228 10.9961 3.5Z',
  d23: 'M17.6562 5.42586C18.0467 5.03533 18.6799 5.03533 19.0704 5.42586L19.0767 5.43221C19.4673 5.82273 19.4673 6.4559 19.0767 6.84642C18.6862 7.23695 18.053 7.23695 17.6625 6.84642L17.6562 6.84007C17.2657 6.44955 17.2657 5.81638 17.6562 5.42586Z',
  d24: 'M4.92586 6.84676C4.53533 6.45623 4.53533 5.82307 4.92586 5.43254L4.93221 5.42619C5.32273 5.03567 5.9559 5.03567 6.34642 5.42619C6.73695 5.81671 6.73695 6.44988 6.34642 6.8404L6.34007 6.84676C5.94955 7.23728 5.31638 7.23728 4.92586 6.84676Z',
  d25: 'M21 11.4961C21.5523 11.4961 22 11.9438 22 12.4961L22 12.5051C22 13.0574 21.5523 13.5051 21 13.5051C20.4477 13.5051 20 13.0574 20 12.5051L20 12.4961C20 11.9438 20.4477 11.4961 21 11.4961Z',
  d26: 'M3 11.4961C3.55228 11.4961 4 11.9438 4 12.4961L4 12.5051C4 13.0574 3.55228 13.5051 3 13.5051C2.44772 13.5051 2 13.0574 2 12.5051L2 12.4961C2 11.9438 2.44772 11.4961 3 11.4961Z',
  d27: 'M6.99609 19.5V15.5H4.99609V20.5C4.99609 21.0523 5.44381 21.5 5.99609 21.5H10.9961V15.5H8.99609V19.5H6.99609Z',
  d28: 'M15.4968 19.0577L17.0684 15.1289L18.9253 15.8717L16.6739 21.5003H14.3198L12.0684 15.8717L13.9253 15.1289L15.4968 19.0577Z',
};

export const IconUv03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-stroke-rounded IconUv03StrokeRounded"
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-duotone-rounded IconUv03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
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
      <path 
        d={d.d10} 
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-twotone-rounded IconUv03TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-solid-rounded IconUv03SolidRounded"
    >
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-bulk-rounded IconUv03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-stroke-sharp IconUv03StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUv03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="uv-03-solid-sharp IconUv03SolidSharp"
    >
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUv03: TheIconSelfPack = {
  name: 'Uv03',
  StrokeRounded: IconUv03StrokeRounded,
  DuotoneRounded: IconUv03DuotoneRounded,
  TwotoneRounded: IconUv03TwotoneRounded,
  SolidRounded: IconUv03SolidRounded,
  BulkRounded: IconUv03BulkRounded,
  StrokeSharp: IconUv03StrokeSharp,
  SolidSharp: IconUv03SolidSharp,
};