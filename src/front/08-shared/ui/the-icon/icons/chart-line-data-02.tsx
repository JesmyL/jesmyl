import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.4341 14.2963L18 9M9.58251 11.5684L13.2038 14.2963M3 19L7.58957 11.8792',
  d2: 'M20 21H9C5.70017 21 4.05025 21 3.02513 19.9749C2 18.9497 2 17.2998 2 14V3',
  d3: 'M10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5Z',
  d4: 'M16 15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5C13 14.6716 13.6716 14 14.5 14C15.3284 14 16 14.6716 16 15.5Z',
  d5: 'M20 7.5C20 8.32843 19.3284 9 18.5 9C17.6716 9 17 8.32843 17 7.5C17 6.67157 17.6716 6 18.5 6C19.3284 6 20 6.67157 20 7.5Z',
  d6: 'M2 2C2.55229 2 3 2.44772 3 3V14C3 15.2974 3.00127 16.284 3.05596 17.0673L6.40711 11.8679C6.14969 11.4749 6 11.0049 6 10.5C6 9.11929 7.11929 8 8.5 8C9.88071 8 11 9.11929 11 10.5C11 10.7756 10.9554 11.0407 10.8731 11.2886L13.4506 13.2302C13.7697 13.0825 14.1252 13 14.5 13C14.6476 13 14.7922 13.0128 14.9328 13.0373L16.7504 9.28574C16.2873 8.83198 16 8.19954 16 7.5C16 6.11929 17.1193 5 18.5 5C19.8807 5 21 6.11929 21 7.5C21 8.83769 19.9494 9.93 18.6283 9.99677L16.6111 14.1603C16.8574 14.5475 17 15.0071 17 15.5C17 16.8807 15.8807 18 14.5 18C13.1193 18 12 16.8807 12 15.5C12 15.2321 12.0422 14.974 12.1202 14.732L9.52816 12.7795C9.21455 12.9211 8.86649 13 8.5 13C8.35673 13 8.21627 12.9879 8.07958 12.9648L3.91542 19.4256C4.20266 19.6374 4.60969 19.7889 5.2928 19.8808C6.16378 19.9979 7.32182 20 9 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H8.928C7.33933 22 6.04616 22.0001 5.0263 21.8629C3.96232 21.7199 3.04735 21.4113 2.31802 20.682C1.58869 19.9526 1.28011 19.0377 1.13706 17.9737C0.999945 16.9539 0.99997 15.6607 1 14.0721V14.072V3C1 2.44772 1.44772 2 2 2Z',
  d7: 'M16 7.5C16 6.11929 17.1193 5 18.5 5C19.8807 5 21 6.11929 21 7.5C21 8.75069 20.0816 9.78688 18.8824 9.97094C18.8797 9.97592 18.877 9.98088 18.8743 9.98583L16.5809 14.1139C16.8457 14.5106 17 14.9873 17 15.5C17 16.8807 15.8807 18 14.5 18C13.1193 18 12 16.8807 12 15.5C12 15.2768 12.0292 15.0605 12.0841 14.8546L9.42844 12.8219C9.1414 12.9368 8.82808 13 8.5 13C8.35334 13 8.20962 12.9874 8.06989 12.9631L3.8413 19.5409C3.54265 20.0055 2.92393 20.14 2.45936 19.8414C1.99479 19.5427 1.86029 18.924 2.15894 18.4594L6.40168 11.8596C6.14759 11.4683 6 11.0014 6 10.5C6 9.11929 7.11929 8 8.5 8C9.88071 8 11 9.11929 11 10.5C11 10.811 10.9432 11.1087 10.8395 11.3833L13.3304 13.2899C13.6794 13.1048 14.0774 13 14.5 13C14.6343 13 14.7661 13.0106 14.8946 13.031L16.9001 9.4211C16.35 8.96251 16 8.27214 16 7.5ZM18.5 6.75C18.0858 6.75 17.75 7.08579 17.75 7.5C17.75 7.91421 18.0858 8.25 18.5 8.25C18.9142 8.25 19.25 7.91421 19.25 7.5C19.25 7.08579 18.9142 6.75 18.5 6.75ZM8.5 9.75C8.08579 9.75 7.75 10.0858 7.75 10.5C7.75 10.9142 8.08579 11.25 8.5 11.25C8.91421 11.25 9.25 10.9142 9.25 10.5C9.25 10.0858 8.91421 9.75 8.5 9.75ZM13.75 15.5C13.75 15.0858 14.0858 14.75 14.5 14.75C14.9142 14.75 15.25 15.0858 15.25 15.5C15.25 15.9142 14.9142 16.25 14.5 16.25C14.0858 16.25 13.75 15.9142 13.75 15.5Z',
  d8: 'M2 2C2.55229 2 3 2.44772 3 3V14C3 15.6782 3.00213 16.8362 3.11923 17.7072C3.23246 18.5494 3.43644 18.972 3.73223 19.2678C4.02803 19.5636 4.45059 19.7675 5.2928 19.8808C6.16378 19.9979 7.32182 20 9 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H8.928C7.33933 22 6.04616 22.0001 5.0263 21.8629C3.96232 21.7199 3.04735 21.4113 2.31802 20.682C1.58869 19.9526 1.28011 19.0377 1.13706 17.9737C0.999945 16.9538 0.99997 15.6607 1 14.072L1 3C1 2.44772 1.44772 2 2 2Z',
  d9: 'M15.4341 14.2963L18 9M9.58251 11.5684L13.2038 14.2963M2.5 20.5L7.58957 11.8792',
  d10: 'M20 21H2V3',
  d11: 'M7 10C7 8.61929 8.11929 7.5 9.5 7.5C10.8807 7.5 12 8.61929 12 10C12 11.3807 10.8807 12.5 9.5 12.5C8.11929 12.5 7 11.3807 7 10Z',
  d12: 'M13 15C13 13.6193 14.1193 12.5 15.5 12.5C16.8807 12.5 18 13.6193 18 15C18 16.3807 16.8807 17.5 15.5 17.5C14.1193 17.5 13 16.3807 13 15Z',
  d13: 'M17 7C17 5.61929 18.1193 4.5 19.5 4.5C20.8807 4.5 22 5.61929 22 7C22 8.38071 20.8807 9.5 19.5 9.5C18.1193 9.5 17 8.38071 17 7Z',
  d14: 'M4.95646 19.5H21V21.5H3C2.44772 21.5 2 21.0523 2 20.5V2.5H4V17.1861L7.72845 10.8708L9.4507 11.8876L4.95646 19.5ZM19.8999 8.936L17.334 14.2323L15.5341 13.3603L18.1001 8.064L19.8999 8.936ZM13.6021 14.595L9.98084 11.8672L11.1842 10.2697L14.8055 12.9975L13.6021 14.595Z',
};

export const IconChartLineData02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-stroke-rounded IconChartLineData02StrokeRounded"
    >
      <circle 
        cx="8.5" 
        cy="10.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="14.5" 
        cy="15.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="18.5" 
        cy="7.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-duotone-rounded IconChartLineData02DuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
      <circle 
        cx="8.5" 
        cy="10.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="14.5" 
        cy="15.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="18.5" 
        cy="7.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-twotone-rounded IconChartLineData02TwotoneRounded"
    >
      <circle 
        cx="8.5" 
        cy="10.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="14.5" 
        cy="15.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="18.5" 
        cy="7.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-solid-rounded IconChartLineData02SolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-bulk-rounded IconChartLineData02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconChartLineData02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-stroke-sharp IconChartLineData02StrokeSharp"
    >
      <circle 
        cx="8.5" 
        cy="10.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="14.5" 
        cy="15.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="18.5" 
        cy="7.5" 
        r="1.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChartLineData02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-line-data-02-solid-sharp IconChartLineData02SolidSharp"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartLineData02: TheIconSelfPack = {
  name: 'ChartLineData02',
  StrokeRounded: IconChartLineData02StrokeRounded,
  DuotoneRounded: IconChartLineData02DuotoneRounded,
  TwotoneRounded: IconChartLineData02TwotoneRounded,
  SolidRounded: IconChartLineData02SolidRounded,
  BulkRounded: IconChartLineData02BulkRounded,
  StrokeSharp: IconChartLineData02StrokeSharp,
  SolidSharp: IconChartLineData02SolidSharp,
};