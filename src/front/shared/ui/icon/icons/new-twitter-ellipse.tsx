import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 17L11.1935 12.8065M17 7L12.8065 11.1935M12.8065 11.1935L9.77778 7H7L11.1935 12.8065M12.8065 11.1935L17 17H14.2222L11.1935 12.8065',
  d2: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d3: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM7 7H9.77778L17 17H14.2222L7 7Z',
  d4: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7 6.25C6.71836 6.25 6.46045 6.40779 6.33223 6.65856C6.20401 6.90933 6.22709 7.21079 6.39199 7.43912L10.2116 12.7278L6.46967 16.4697C6.17678 16.7626 6.17678 17.2374 6.46967 17.5303C6.76257 17.8232 7.23744 17.8232 7.53033 17.5303L11.1012 13.9595L13.6142 17.4391C13.7552 17.6344 13.9814 17.75 14.2222 17.75H17C17.2817 17.75 17.5396 17.5922 17.6678 17.3414C17.796 17.0907 17.7729 16.7892 17.608 16.5609L13.7884 11.2722L17.5303 7.53033C17.8232 7.23744 17.8232 6.76256 17.5303 6.46967C17.2374 6.17678 16.7626 6.17678 16.4697 6.46967L12.8988 10.0405L10.3858 6.56088C10.2448 6.36565 10.0186 6.25 9.77778 6.25H7Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M6.33223 6.65856C6.46045 6.40779 6.71836 6.25 7 6.25H9.77778C10.0186 6.25 10.2448 6.36565 10.3858 6.56088L12.8988 10.0405L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L13.7884 11.2722L17.608 16.5609C17.7729 16.7892 17.796 17.0907 17.6678 17.3414C17.5396 17.5922 17.2816 17.75 17 17.75H14.2222C13.9814 17.75 13.7552 17.6344 13.6142 17.4391L11.1012 13.9595L7.53033 17.5303C7.23744 17.8232 6.76257 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L10.2116 12.7278L6.39199 7.43912C6.22709 7.21079 6.20401 6.90933 6.33223 6.65856Z',
  d7: 'M7 17L11.1935 12.8065M17 7L12.8065 11.1935M12.8065 11.1935L9.77778 7H7L11.1935 12.8065M12.8065 11.1935L14.9032 14.0968L17 17H14.2222L11.1935 12.8065',
  d8: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM5.93936 17.0001L7.00002 18.0608L11.1012 13.9596L13.8388 17.7501H18.4668L13.7884 11.2723L18.0607 7.00011L17 5.93945L12.8989 10.0406L10.1613 6.25011H5.5332L10.2116 12.7279L5.93936 17.0001Z',
};

export const IconNewTwitterEllipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-stroke-rounded IconNewTwitterEllipseStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterEllipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-duotone-rounded IconNewTwitterEllipseDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterEllipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-twotone-rounded IconNewTwitterEllipseTwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterEllipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-solid-rounded IconNewTwitterEllipseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterEllipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-bulk-rounded IconNewTwitterEllipseBulkRounded"
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

export const IconNewTwitterEllipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-stroke-sharp IconNewTwitterEllipseStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconNewTwitterEllipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="new-twitter-ellipse-solid-sharp IconNewTwitterEllipseSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNewTwitterEllipse: TheIconSelfPack = {
  name: 'NewTwitterEllipse',
  StrokeRounded: IconNewTwitterEllipseStrokeRounded,
  DuotoneRounded: IconNewTwitterEllipseDuotoneRounded,
  TwotoneRounded: IconNewTwitterEllipseTwotoneRounded,
  SolidRounded: IconNewTwitterEllipseSolidRounded,
  BulkRounded: IconNewTwitterEllipseBulkRounded,
  StrokeSharp: IconNewTwitterEllipseStrokeSharp,
  SolidSharp: IconNewTwitterEllipseSolidSharp,
};