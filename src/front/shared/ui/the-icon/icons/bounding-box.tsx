import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 4H10M4 10V6M12 6V10M6 12H10M14 12H18M20 14V18M12 14V18M14 20H18',
  d2: 'M10 4H6C5.6 5.6 4.5 6 4 6V10C4.5 10 5.6 10.4 6 12H10C10 11.3333 10.4 10 12 10V6C10.4 6 10 4.66667 10 4Z',
  d3: 'M18 12H14C13.6 14 12.5 14.1667 12 14V18C12.6667 18 14 18.4 14 20H18C18 19.3333 18.4 18 20 18V14C18.4 14 18 12.6667 18 12Z',
  d4: 'M5 4C5 3.44772 5.44772 3 6 3H10C10.5523 3 11 3.44772 11 4C11 4.55228 10.5523 5 10 5H6C5.44772 5 5 4.55228 5 4ZM4 5C4.55228 5 5 5.44772 5 6V10C5 10.5523 4.55228 11 4 11C3.44772 11 3 10.5523 3 10V6C3 5.44772 3.44772 5 4 5ZM12 5C12.5523 5 13 5.44772 13 6V10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10V6C11 5.44772 11.4477 5 12 5ZM5 12C5 11.4477 5.44772 11 6 11H10C10.5523 11 11 11.4477 11 12C11 12.5523 10.5523 13 10 13H6C5.44772 13 5 12.5523 5 12ZM13 12C13 11.4477 13.4477 11 14 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H14C13.4477 13 13 12.5523 13 12ZM12 13C12.5523 13 13 13.4477 13 14V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V14C11 13.4477 11.4477 13 12 13ZM20 13C20.5523 13 21 13.4477 21 14V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13ZM13 20C13 19.4477 13.4477 19 14 19H18C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21H14C13.4477 21 13 20.5523 13 20Z',
  d5: 'M1.25 4C1.25 2.48122 2.48122 1.25 4 1.25C5.51878 1.25 6.75 2.48122 6.75 4C6.75 5.51878 5.51878 6.75 4 6.75C2.48122 6.75 1.25 5.51878 1.25 4Z',
  d6: 'M1.25 12C1.25 10.4812 2.48122 9.25 4 9.25C5.51878 9.25 6.75 10.4812 6.75 12C6.75 13.5188 5.51878 14.75 4 14.75C2.48122 14.75 1.25 13.5188 1.25 12Z',
  d7: 'M9.25 4C9.25 2.48122 10.4812 1.25 12 1.25C13.5188 1.25 14.75 2.48122 14.75 4C14.75 5.51878 13.5188 6.75 12 6.75C10.4812 6.75 9.25 5.51878 9.25 4Z',
  d8: 'M9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z',
  d9: 'M17.25 12C17.25 10.4812 18.4812 9.25 20 9.25C21.5188 9.25 22.75 10.4812 22.75 12C22.75 13.5188 21.5188 14.75 20 14.75C18.4812 14.75 17.25 13.5188 17.25 12Z',
  d10: 'M9.25 20C9.25 18.4812 10.4812 17.25 12 17.25C13.5188 17.25 14.75 18.4812 14.75 20C14.75 21.5188 13.5188 22.75 12 22.75C10.4812 22.75 9.25 21.5188 9.25 20Z',
  d11: 'M17.25 20C17.25 18.4812 18.4812 17.25 20 17.25C21.5188 17.25 22.75 18.4812 22.75 20C22.75 21.5188 21.5188 22.75 20 22.75C18.4812 22.75 17.25 21.5188 17.25 20Z',
  d12: 'M6 2H2V6H6V2Z',
  d13: 'M14 2H10V6H14V2Z',
  d14: 'M6 10H2V14H6V10Z',
  d15: 'M14 10H10V14H14V10Z',
  d16: 'M14 18H10V22H14V18Z',
  d17: 'M22 18H18V22H22V18Z',
  d18: 'M22 10H18V14H22V10Z',
  d19: 'M1.25 1.25H6.75V6.75H1.25V1.25Z',
  d20: 'M9.25 1.25H14.75V6.75H9.25V1.25Z',
  d21: 'M1.25 9.25H6.75V14.75H1.25V9.25Z',
  d22: 'M9.25 9.25H14.75V14.75H9.25V9.25Z',
  d23: 'M9.25 17.25H14.75V22.75H9.25V17.25Z',
  d24: 'M17.25 17.25H22.75V22.75H17.25V17.25Z',
  d25: 'M17.25 9.25H22.75V14.75H17.25V9.25Z',
  d26: 'M10 5H6V3H10V5ZM5 6V10H3V6H5ZM11 10V6H13V10H11ZM10 13H6V11H10V13ZM18 13H14V11H18V13ZM11 18V14H13V18H11ZM19 18V14H21V18H19ZM18 21H14V19H18V21Z',
};

export const IconBoundingBoxStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-stroke-rounded IconBoundingBoxStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="4" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="4" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconBoundingBoxDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-duotone-rounded IconBoundingBoxDuotoneRounded"
    >
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
      </g>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="4" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="4" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconBoundingBoxTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-twotone-rounded IconBoundingBoxTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="4" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="4" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="4" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="12" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconBoundingBoxSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-solid-rounded IconBoundingBoxSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconBoundingBoxBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-bulk-rounded IconBoundingBoxBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconBoundingBoxStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-stroke-sharp IconBoundingBoxStrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBoundingBoxSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bounding-box-solid-sharp IconBoundingBoxSolidSharp"
    >
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
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBoundingBox: TheIconSelfPack = {
  name: 'BoundingBox',
  StrokeRounded: IconBoundingBoxStrokeRounded,
  DuotoneRounded: IconBoundingBoxDuotoneRounded,
  TwotoneRounded: IconBoundingBoxTwotoneRounded,
  SolidRounded: IconBoundingBoxSolidRounded,
  BulkRounded: IconBoundingBoxBulkRounded,
  StrokeSharp: IconBoundingBoxStrokeSharp,
  SolidSharp: IconBoundingBoxSolidSharp,
};