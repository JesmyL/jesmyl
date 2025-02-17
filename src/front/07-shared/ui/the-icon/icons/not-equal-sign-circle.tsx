import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 9.77778H17M7 14.2222H17M8.66667 17L15.3333 7',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM16.1654 7.55468C16.4717 7.09516 16.3476 6.47429 15.888 6.16793C15.4285 5.86158 14.8076 5.98576 14.5013 6.44528L12.9463 8.77776H7C6.44772 8.77776 6 9.22548 6 9.77776C6 10.33 6.44772 10.7778 7 10.7778H11.613L9.98334 13.2222H7C6.44772 13.2222 6 13.6699 6 14.2222C6 14.7745 6.44772 15.2222 7 15.2222H8.65L7.83462 16.4453C7.52826 16.9048 7.65244 17.5257 8.11197 17.832C8.5715 18.1384 9.19236 18.0142 9.49872 17.5547L11.0537 15.2222H17C17.5523 15.2222 18 14.7745 18 14.2222C18 13.6699 17.5523 13.2222 17 13.2222H12.387L14.0167 10.7778H17C17.5523 10.7778 18 10.33 18 9.77776C18 9.22548 17.5523 8.77776 17 8.77776H15.35L16.1654 7.55468Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M15.888 6.16806C16.3476 6.47441 16.4717 7.09528 16.1654 7.55481L15.35 8.77788H17C17.5523 8.77788 18 9.2256 18 9.77788C18 10.3302 17.5523 10.7779 17 10.7779H14.0167L12.387 13.2223H17C17.5523 13.2223 18 13.67 18 14.2223C18 14.7746 17.5523 15.2223 17 15.2223H11.0537L9.49872 17.5548C9.19236 18.0143 8.5715 18.1385 8.11197 17.8322C7.65244 17.5258 7.52826 16.9049 7.83462 16.4454L8.65 15.2223H7C6.44772 15.2223 6 14.7746 6 14.2223C6 13.67 6.44772 13.2223 7 13.2223H9.98334L11.613 10.7779H7C6.44772 10.7779 6 10.3302 6 9.77788C6 9.2256 6.44772 8.77788 7 8.77788H12.9463L14.5013 6.44541C14.8076 5.98588 15.4285 5.8617 15.888 6.16806Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.49872 17.5547L11.0537 15.2222H17V13.2222H12.387L14.0167 10.7778H17V8.77779H15.35L16.1654 7.55471L14.5013 6.44531L12.9463 8.77779H7V10.7778H11.613L9.98334 13.2222H7V15.2222H8.65L7.83462 16.4453L9.49872 17.5547Z',
};

export const IconNotEqualSignCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-stroke-rounded IconNotEqualSignCircleStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-duotone-rounded IconNotEqualSignCircleDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-twotone-rounded IconNotEqualSignCircleTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-solid-rounded IconNotEqualSignCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-bulk-rounded IconNotEqualSignCircleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-stroke-sharp IconNotEqualSignCircleStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNotEqualSignCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="not-equal-sign-circle-solid-sharp IconNotEqualSignCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNotEqualSignCircle: TheIconSelfPack = {
  name: 'NotEqualSignCircle',
  StrokeRounded: IconNotEqualSignCircleStrokeRounded,
  DuotoneRounded: IconNotEqualSignCircleDuotoneRounded,
  TwotoneRounded: IconNotEqualSignCircleTwotoneRounded,
  SolidRounded: IconNotEqualSignCircleSolidRounded,
  BulkRounded: IconNotEqualSignCircleBulkRounded,
  StrokeSharp: IconNotEqualSignCircleStrokeSharp,
  SolidSharp: IconNotEqualSignCircleSolidSharp,
};