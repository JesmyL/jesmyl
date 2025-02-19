import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 22V2',
  d2: 'M22 22V2',
  d3: 'M7 18L10.6534 7.48635C10.9447 6.81279 11.4878 5.99657 11.9467 6.00001C12.6263 6.00511 12.9827 6.70758 13.3774 7.48635C13.7721 8.26513 17 18 17 18M9.01312 12.9912L14.8945 12.9293',
  d4: 'M2.35059 22V2',
  d5: 'M22.3506 22V2',
  d6: 'M12.3505 6C13.2603 6 13.82 7.64226 14.9395 10.9268L15.6462 13H9.05469L9.76135 10.9268C10.8809 7.64226 11.4406 6 12.3505 6Z',
  d7: 'M7.35059 18.0001L11.004 7.48647C11.2953 6.81291 11.8384 5.99669 12.2973 6.00013C12.9769 6.00523 13.3333 6.7077 13.728 7.48647C14.1227 8.26525 17.3506 18.0001 17.3506 18.0001M9.36371 12.9913L15.2451 12.9294',
  d8: 'M2 23C1.44772 23 1 22.5523 1 22L1 2C1 1.44772 1.44772 1 2 1C2.55229 1 3 1.44772 3 2L3 22C3 22.5523 2.55228 23 2 23Z',
  d9: 'M22 23C21.4477 23 21 22.5523 21 22L21 2C21 1.44772 21.4477 1 22 1C22.5523 1 23 1.44772 23 2L23 22C23 22.5523 22.5523 23 22 23Z',
  d10: 'M11.6861 7.66395C11.3246 8.41805 10.9268 9.57964 10.3577 11.2494L10.1019 12H13.8987L13.6428 11.2494C13.0737 9.57964 12.6759 8.41805 12.3144 7.66395C12.1867 7.39742 12.0817 7.22211 12.0003 7.1103C11.9189 7.22211 11.8139 7.39742 11.6861 7.66395ZM14.5804 14L16.0537 18.3226C16.2319 18.8454 16.8001 19.1247 17.3229 18.9465C17.8456 18.7683 18.125 18.2001 17.9468 17.6774L15.5115 10.5325C14.9724 8.95086 14.5373 7.67442 14.1179 6.79944C13.905 6.35534 13.6598 5.93398 13.3511 5.61386C13.0229 5.27345 12.573 5 12.0003 5C11.4275 5 10.9776 5.27345 10.6494 5.61386C10.3408 5.93398 10.0955 6.35534 9.88262 6.79944C9.4632 7.67442 9.02815 8.95085 8.48908 10.5325L6.05374 17.6774C5.87556 18.2001 6.1549 18.7683 6.67765 18.9465C7.2004 19.1247 7.76862 18.8454 7.9468 18.3226L9.42016 14H14.5804Z',
  d11: 'M15.0389 13.0102L11.9725 5.53467L8.95244 13.0102M15.0389 13.0102L16.9849 17.9824M15.0389 13.0102H8.95244M6.9873 17.9824L8.95244 13.0102',
  d12: 'M3 2L3 22L1 22L1 2L3 2Z',
  d13: 'M23 2L23 22L21 22L21 2L23 2Z',
  d14: 'M10.8068 5H13.1928L17.9361 17.6489L16.0635 18.3511L14.4318 14H9.56781L7.93613 18.3511L6.06348 17.6489L10.8068 5ZM10.3178 12H13.6818L11.9998 7.51467L10.3178 12Z',
};

export const IconLetterSpacingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-stroke-rounded IconLetterSpacingStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconLetterSpacingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-duotone-rounded IconLetterSpacingDuotoneRounded"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLetterSpacingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-twotone-rounded IconLetterSpacingTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconLetterSpacingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-solid-rounded IconLetterSpacingSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconLetterSpacingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-bulk-rounded IconLetterSpacingBulkRounded"
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLetterSpacingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-stroke-sharp IconLetterSpacingStrokeSharp"
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
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="bevel" 
      />
    </TheIconWrapper>
  );
};

export const IconLetterSpacingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="letter-spacing-solid-sharp IconLetterSpacingSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const iconPackOfLetterSpacing: TheIconSelfPack = {
  name: 'LetterSpacing',
  StrokeRounded: IconLetterSpacingStrokeRounded,
  DuotoneRounded: IconLetterSpacingDuotoneRounded,
  TwotoneRounded: IconLetterSpacingTwotoneRounded,
  SolidRounded: IconLetterSpacingSolidRounded,
  BulkRounded: IconLetterSpacingBulkRounded,
  StrokeSharp: IconLetterSpacingStrokeSharp,
  SolidSharp: IconLetterSpacingSolidSharp,
};