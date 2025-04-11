import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 4C16 4 13.9792 8.0416 12 12C10.0208 15.9584 8 20 3 20',
  d2: 'M10 20H12M15 20L17 20M17 20C17 21.1046 17.8954 22 19 22C20.1046 22 21 21.1046 21 20C21 18.8954 20.1046 18 19 18C17.8954 18 17 18.8954 17 20Z',
  d3: 'M12 4H14M7 4L9 4M7 4C7 5.10457 6.10457 6 5 6C3.89543 6 3 5.10457 3 4C3 2.89543 3.89543 2 5 2C6.10457 2 7 2.89543 7 4Z',
  d4: 'M21 20C21 21.1046 20.1046 22 19 22C17.8954 22 17 21.1046 17 20C17 18.8954 17.8954 18 19 18C20.1046 18 21 18.8954 21 20Z',
  d5: 'M7 4C7 5.10457 6.10457 6 5 6C3.89543 6 3 5.10457 3 4C3 2.89543 3.89543 2 5 2C6.10457 2 7 2.89543 7 4Z',
  d6: 'M16.1049 7.19075C14.8393 8.57354 13.8991 10.4379 12.8944 12.4472L12.8604 12.5152C11.8952 14.4459 10.8428 16.5509 9.37048 18.1595C7.83446 19.8378 5.82344 21 3 21C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19C5.17656 19 6.67594 18.1414 7.89512 16.8093C9.16069 15.4265 10.1009 13.5621 11.1056 11.5528L11.1396 11.4848C12.1048 9.55415 13.1572 7.44915 14.6295 5.84045C16.1655 4.16216 18.1766 3 21 3C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5C18.8234 5 17.3241 5.85865 16.1049 7.19075Z',
  d7: 'M16.1707 19C16.5825 17.8348 17.6938 17 19 17C20.6569 17 22 18.3431 22 20C22 21.6569 20.6569 23 19 23C17.6938 23 16.5825 22.1652 16.1707 21L15 21C14.4477 21 14 20.5523 14 20C14 19.4477 14.4477 19 15 19H16.1707Z',
  d8: 'M9 20C9 19.4477 9.44772 19 10 19H12C12.5523 19 13 19.4477 13 20C13 20.5523 12.5523 21 12 21H10C9.44772 21 9 20.5523 9 20Z',
  d9: 'M2 4C2 2.34315 3.34315 1 5 1C6.30622 1 7.41746 1.83481 7.82929 3L9 3C9.55228 3 10 3.44772 10 4C10 4.55228 9.55228 5 9 5L7.82929 5C7.41746 6.16519 6.30622 7 5 7C3.34315 7 2 5.65685 2 4Z',
  d10: 'M11 4C11 3.44772 11.4477 3 12 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H12C11.4477 5 11 4.55228 11 4Z',
  d11: 'M16.1049 7.19075C14.8393 8.57354 13.8991 10.4379 12.8944 12.4472L12.8604 12.5152C11.8952 14.4459 10.8428 16.5509 9.37048 18.1595C7.83446 19.8378 5.82344 21 3 21V19C5.17656 19 6.67594 18.1414 7.89512 16.8093C9.16069 15.4265 10.1009 13.5621 11.1056 11.5528L11.1396 11.4848C12.1048 9.55415 13.1572 7.44915 14.6295 5.84045C16.1655 4.16216 18.1766 3 21 3V5C18.8234 5 17.3241 5.85865 16.1049 7.19075Z',
  d12: 'M16.1707 19C16.5825 17.8348 17.6938 17 19 17C20.6569 17 22 18.3431 22 20C22 21.6569 20.6569 23 19 23C17.6938 23 16.5825 22.1652 16.1707 21L14 21V19H16.1707Z',
  d13: 'M12 21H10V19H12V21Z',
  d14: 'M2 4C2 2.34315 3.34315 1 5 1C6.30622 1 7.41746 1.83481 7.82929 3L10 3V5L7.82929 5C7.41746 6.16519 6.30622 7 5 7C3.34315 7 2 5.65685 2 4Z',
  d15: 'M14 5H12V3H14V5Z',
};

export const IconEaseCurveControlPointsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints DuotoneRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      </g>
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <g    i-c="o7">
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      </g>
      <g    i-c="o7">
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconEaseCurveControlPointsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="EaseCurveControlPoints SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEaseCurveControlPoints: TheIconSelfPack = [
  'EaseCurveControlPoints',
  IconEaseCurveControlPointsStrokeRounded,
  IconEaseCurveControlPointsDuotoneRounded,
  IconEaseCurveControlPointsTwotoneRounded,
  IconEaseCurveControlPointsSolidRounded,
  IconEaseCurveControlPointsBulkRounded,
  IconEaseCurveControlPointsStrokeSharp,
  IconEaseCurveControlPointsSolidSharp,
];