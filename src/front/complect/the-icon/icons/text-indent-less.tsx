import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M4 4.5H9',
  d2: 'M6 9.5H9',
  d3: 'M4 14.5H9',
  d4: 'M6 19.5H9',
  d5: 'M13 3V21',
  d6: 'M20 8.5L18.4578 9.74227C17.1526 10.7937 16.5 11.3193 16.5 12C16.5 12.6807 17.1526 13.2063 18.4578 14.2577L20 15.5',
  d7: 'M18.4578 9.74227L20 8.5V15.5L18.4578 14.2577C17.1526 13.2063 16.5 12.6807 16.5 12C16.5 11.3193 17.1526 10.7937 18.4578 9.74227Z',
  d8: 'M10 4.5C10 3.94772 9.55228 3.5 9 3.5H4C3.44772 3.5 3 3.94772 3 4.5C3 5.05228 3.44772 5.5 4 5.5H9C9.55228 5.5 10 5.05228 10 4.5Z',
  d9: 'M10 9.5C10 8.94772 9.55228 8.5 9 8.5H6C5.44772 8.5 5 8.94772 5 9.5C5 10.0523 5.44772 10.5 6 10.5H9C9.55228 10.5 10 10.0523 10 9.5Z',
  d10: 'M10 14.5C10 13.9477 9.55228 13.5 9 13.5H4C3.44772 13.5 3 13.9477 3 14.5C3 15.0523 3.44772 15.5 4 15.5H9C9.55228 15.5 10 15.0523 10 14.5Z',
  d11: 'M10 19.5C10 18.9477 9.55228 18.5 9 18.5H6C5.44772 18.5 5 18.9477 5 19.5C5 20.0523 5.44772 20.5 6 20.5H9C9.55228 20.5 10 20.0523 10 19.5Z',
  d12: 'M13 2C12.4477 2 12 2.44772 12 3V21C12 21.5523 12.4477 22 13 22C13.5523 22 14 21.5523 14 21V3C14 2.44772 13.5523 2 13 2Z',
  d13: 'M20.7787 7.87272C20.4323 7.44262 19.8027 7.37481 19.3726 7.72127L17.8305 8.96354C17.2236 9.45232 16.6347 9.92663 16.26 10.3261C15.8596 10.7531 15.5 11.29 15.5 12C15.5 12.7101 15.8596 13.247 16.26 13.674C16.6347 14.0734 17.1703 14.5048 17.7772 14.9936L19.3726 16.2788C19.8027 16.6253 20.4323 16.5575 20.7787 16.1274C20.9278 15.9424 21.0001 15.7205 21 15.5001V8.49935C21 8.27917 20.9276 8.05753 20.7787 7.87272Z',
  d14: 'M20 8.5L16.5 12L20 15.5',
  d15: 'M8.5 5.5H3.5V3.5H8.5V5.5Z',
  d16: 'M8.5 10.5H5.5V8.5H8.5V10.5Z',
  d17: 'M8.5 15.5H3.5V13.5H8.5V15.5Z',
  d18: 'M8.5 20.5H5.5V18.5H8.5V20.5Z',
  d19: 'M11.5 21V3H13.5V21H11.5Z',
  d20: 'M19.0858 7.79297L20.5 9.20718L17.7071 12.0001L20.5 14.793L19.0858 16.2072L14.8787 12.0001L19.0858 7.79297Z',
} as const;

export const IconTextIndentLessStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-stroke-rounded IconTextIndentLessStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTextIndentLessDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-duotone-rounded IconTextIndentLessDuotoneRounded"
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

export const IconTextIndentLessTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-twotone-rounded IconTextIndentLessTwotoneRounded"
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

export const IconTextIndentLessSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-solid-rounded IconTextIndentLessSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentLessBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-bulk-rounded IconTextIndentLessBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentLessStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-stroke-sharp IconTextIndentLessStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextIndentLessSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="text-indent-less-solid-sharp IconTextIndentLessSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextIndentLess: TheIconSelfPack = {
  name: 'TextIndentLess',
  StrokeRounded: IconTextIndentLessStrokeRounded,
  DuotoneRounded: IconTextIndentLessDuotoneRounded,
  TwotoneRounded: IconTextIndentLessTwotoneRounded,
  SolidRounded: IconTextIndentLessSolidRounded,
  BulkRounded: IconTextIndentLessBulkRounded,
  StrokeSharp: IconTextIndentLessStrokeSharp,
  SolidSharp: IconTextIndentLessSolidSharp,
};