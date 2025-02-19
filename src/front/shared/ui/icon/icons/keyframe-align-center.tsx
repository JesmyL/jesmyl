import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.8546 8.89114C11.3832 8.29705 11.6475 8 12 8C12.3525 8 12.6168 8.29705 13.1454 8.89114L14.4455 10.3522C15.1485 11.1423 15.5 11.5374 15.5 12C15.5 12.4626 15.1485 12.8577 14.4455 13.6478L13.1454 15.1089C12.6168 15.703 12.3525 16 12 16C11.6475 16 11.3832 15.703 10.8546 15.1089L9.55451 13.6478C8.8515 12.8577 8.5 12.4626 8.5 12C8.5 11.5374 8.8515 11.1423 9.55451 10.3522L10.8546 8.89114Z',
  d2: 'M5 12L2 12',
  d3: 'M22 12L19 12',
  d4: 'M12 19L12 22',
  d5: 'M12 2L12 5',
  d6: 'M10.8489 7.45815C11.1193 7.2302 11.4956 7 12 7C12.5044 7 12.8807 7.2302 13.1511 7.45815C13.3835 7.65403 13.624 7.9245 13.857 8.18647L13.8925 8.2264L15.1926 9.6875L15.2281 9.72745C15.549 10.0879 15.8485 10.4245 16.0601 10.732C16.2937 11.0713 16.5 11.4848 16.5 12C16.5 12.5152 16.2937 12.9287 16.0601 13.268C15.8485 13.5755 15.549 13.9121 15.2281 14.2725L15.1926 14.3125L13.8925 15.7736L13.857 15.8135C13.624 16.0755 13.3835 16.346 13.1511 16.5418C12.8807 16.7698 12.5044 17 12 17C11.4956 17 11.1193 16.7698 10.8489 16.5418C10.6165 16.346 10.376 16.0755 10.143 15.8135L10.1075 15.7736L8.80743 14.3125L8.77188 14.2725L8.77187 14.2725C8.45104 13.9121 8.1515 13.5755 7.93988 13.268C7.70631 12.9287 7.5 12.5152 7.5 12C7.5 11.4848 7.70631 11.0713 7.93988 10.732C8.1515 10.4245 8.45104 10.0879 8.77188 9.72745L8.80743 9.6875L10.1075 8.22641L10.143 8.18648L10.143 8.18647C10.376 7.9245 10.6165 7.65403 10.8489 7.45815Z',
  d7: 'M1 12C1 11.4477 1.44772 11 2 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H2C1.44772 13 1 12.5523 1 12Z',
  d8: 'M18 12C18 11.4477 18.4477 11 19 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H19C18.4477 13 18 12.5523 18 12Z',
  d9: 'M12 18C12.5523 18 13 18.4477 13 19L13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22L11 19C11 18.4477 11.4477 18 12 18Z',
  d10: 'M12 1C12.5523 1 13 1.44772 13 2L13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5L11 2C11 1.44772 11.4477 1 12 1Z',
  d11: 'M15.5 12L12 8L8.5 12L12 16L15.5 12Z',
  d12: 'M12.0005 6.86084L16.4971 11.9998L12.0005 17.1387L7.50391 11.9998L12.0005 6.86084Z',
  d13: 'M2 11H5V13H2V11Z',
  d14: 'M19 11H22V13H19V11Z',
  d15: 'M11 22L11 19L13 19L13 22L11 22Z',
  d16: 'M11 5L11 2L13 2L13 5L11 5Z',
};

export const IconKeyframeAlignCenterStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-stroke-rounded IconKeyframeAlignCenterStrokeRounded"
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

export const IconKeyframeAlignCenterDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-duotone-rounded IconKeyframeAlignCenterDuotoneRounded"
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

export const IconKeyframeAlignCenterTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-twotone-rounded IconKeyframeAlignCenterTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconKeyframeAlignCenterSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-solid-rounded IconKeyframeAlignCenterSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconKeyframeAlignCenterBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-bulk-rounded IconKeyframeAlignCenterBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconKeyframeAlignCenterStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-stroke-sharp IconKeyframeAlignCenterStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeAlignCenterSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="keyframe-align-center-solid-sharp IconKeyframeAlignCenterSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfKeyframeAlignCenter: TheIconSelfPack = {
  name: 'KeyframeAlignCenter',
  StrokeRounded: IconKeyframeAlignCenterStrokeRounded,
  DuotoneRounded: IconKeyframeAlignCenterDuotoneRounded,
  TwotoneRounded: IconKeyframeAlignCenterTwotoneRounded,
  SolidRounded: IconKeyframeAlignCenterSolidRounded,
  BulkRounded: IconKeyframeAlignCenterBulkRounded,
  StrokeSharp: IconKeyframeAlignCenterStrokeSharp,
  SolidSharp: IconKeyframeAlignCenterSolidSharp,
};