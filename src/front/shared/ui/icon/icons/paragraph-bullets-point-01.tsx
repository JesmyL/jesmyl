import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.51256 9.48744C4.02513 10 4.85008 10 6.5 10C8.14992 10 8.97487 10 9.48744 9.48744C10 8.97487 10 8.14992 10 6.5C10 4.85008 10 4.02513 9.48744 3.51256C8.97487 3 8.14992 3 6.5 3C4.85008 3 4.02513 3 3.51256 3.51256C3 4.02513 3 4.85008 3 6.5C3 8.14992 3 8.97487 3.51256 9.48744Z',
  d2: 'M3.51256 20.4874C4.02513 21 4.85008 21 6.5 21C8.14992 21 8.97487 21 9.48744 20.4874C10 19.9749 10 19.1499 10 17.5C10 15.8501 10 15.0251 9.48744 14.5126C8.97487 14 8.14992 14 6.5 14C4.85008 14 4.02513 14 3.51256 14.5126C3 15.0251 3 15.8501 3 17.5C3 19.1499 3 19.9749 3.51256 20.4874Z',
  d3: 'M15 4H21',
  d4: 'M15 15H21',
  d5: 'M15 9H21',
  d6: 'M15 20H21',
  d7: 'M6.44916 2.25L6.5 2.25L6.55085 2.25H6.55089C7.33242 2.24997 7.99342 2.24994 8.52016 2.32076C9.07988 2.39601 9.59891 2.56338 10.0178 2.98224C10.4366 3.40109 10.604 3.92013 10.6792 4.47984C10.7501 5.00659 10.75 5.66759 10.75 6.44912V6.44916V6.55084V6.55088C10.75 7.33241 10.7501 7.99342 10.6792 8.52016C10.604 9.07988 10.4366 9.59891 10.0178 10.0178C9.59891 10.4366 9.07988 10.604 8.52016 10.6792C7.99342 10.7501 7.33241 10.75 6.55088 10.75H6.55084H6.44916H6.44912C5.66759 10.75 5.00659 10.7501 4.47984 10.6792C3.92013 10.604 3.40109 10.4366 2.98224 10.0178C2.56338 9.59891 2.39601 9.07988 2.32076 8.52016C2.24994 7.99342 2.24997 7.33242 2.25 6.55089V6.55085L2.25 6.5L2.25 6.44916V6.44912C2.24997 5.66759 2.24994 5.00659 2.32076 4.47984C2.39601 3.92013 2.56338 3.40109 2.98224 2.98224C3.40109 2.56338 3.92013 2.39601 4.47984 2.32076C5.00659 2.24994 5.66759 2.24997 6.44912 2.25H6.44916Z',
  d8: 'M6.44916 13.25L6.5 13.25L6.55085 13.25H6.55089C7.33242 13.25 7.99342 13.2499 8.52016 13.3208C9.07988 13.396 9.59891 13.5634 10.0178 13.9822C10.4366 14.4011 10.604 14.9201 10.6792 15.4798C10.7501 16.0066 10.75 16.6676 10.75 17.4491V17.4492V17.5508V17.5509C10.75 18.3324 10.7501 18.9934 10.6792 19.5202C10.604 20.0799 10.4366 20.5989 10.0178 21.0178C9.59891 21.4366 9.07988 21.604 8.52016 21.6792C7.99342 21.7501 7.33241 21.75 6.55088 21.75H6.55084H6.44916H6.44912C5.66759 21.75 5.00659 21.7501 4.47984 21.6792C3.92013 21.604 3.40109 21.4366 2.98224 21.0178C2.56338 20.5989 2.39601 20.0799 2.32076 19.5202C2.24994 18.9934 2.24997 18.3324 2.25 17.5509V17.5508L2.25 17.5L2.25 17.4492V17.4491C2.24997 16.6676 2.24994 16.0066 2.32076 15.4798C2.39601 14.9201 2.56338 14.4011 2.98224 13.9822C3.40109 13.5634 3.92013 13.396 4.47984 13.3208C5.00659 13.2499 5.66759 13.25 6.44912 13.25H6.44916Z',
  d9: 'M13.75 4C13.75 3.44772 14.1977 3 14.75 3H20.75C21.3023 3 21.75 3.44772 21.75 4C21.75 4.55228 21.3023 5 20.75 5H14.75C14.1977 5 13.75 4.55228 13.75 4ZM13.75 9C13.75 8.44772 14.1977 8 14.75 8H20.75C21.3023 8 21.75 8.44772 21.75 9C21.75 9.55228 21.3023 10 20.75 10H14.75C14.1977 10 13.75 9.55228 13.75 9ZM13.75 15C13.75 14.4477 14.1977 14 14.75 14H20.75C21.3023 14 21.75 14.4477 21.75 15C21.75 15.5523 21.3023 16 20.75 16H14.75C14.1977 16 13.75 15.5523 13.75 15ZM13.75 20C13.75 19.4477 14.1977 19 14.75 19H20.75C21.3023 19 21.75 19.4477 21.75 20C21.75 20.5523 21.3023 21 20.75 21H14.75C14.1977 21 13.75 20.5523 13.75 20Z',
  d10: 'M10 3H3V10H10V3Z',
  d11: 'M10 14H3V21H10V14Z',
  d12: 'M14 4L21 4',
  d13: 'M14 15L21 15',
  d14: 'M14 9H21',
  d15: 'M14 20H21',
  d16: 'M21 5L14 5V3L21 3V5Z',
  d17: 'M21 16L14 16V14L21 14V16Z',
  d18: 'M21 10H14V8H21V10Z',
  d19: 'M21 21H14V19H21V21Z',
};

export const IconParagraphBulletsPoint01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-stroke-rounded IconParagraphBulletsPoint01StrokeRounded"
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

export const IconParagraphBulletsPoint01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-duotone-rounded IconParagraphBulletsPoint01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
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

export const IconParagraphBulletsPoint01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-twotone-rounded IconParagraphBulletsPoint01TwotoneRounded"
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

export const IconParagraphBulletsPoint01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-solid-rounded IconParagraphBulletsPoint01SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-bulk-rounded IconParagraphBulletsPoint01BulkRounded"
    >
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParagraphBulletsPoint01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-stroke-sharp IconParagraphBulletsPoint01StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconParagraphBulletsPoint01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="paragraph-bullets-point-01-solid-sharp IconParagraphBulletsPoint01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
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
    </TheIconWrapper>
  );
};

export const iconPackOfParagraphBulletsPoint01: TheIconSelfPack = {
  name: 'ParagraphBulletsPoint01',
  StrokeRounded: IconParagraphBulletsPoint01StrokeRounded,
  DuotoneRounded: IconParagraphBulletsPoint01DuotoneRounded,
  TwotoneRounded: IconParagraphBulletsPoint01TwotoneRounded,
  SolidRounded: IconParagraphBulletsPoint01SolidRounded,
  BulkRounded: IconParagraphBulletsPoint01BulkRounded,
  StrokeSharp: IconParagraphBulletsPoint01StrokeSharp,
  SolidSharp: IconParagraphBulletsPoint01SolidSharp,
};