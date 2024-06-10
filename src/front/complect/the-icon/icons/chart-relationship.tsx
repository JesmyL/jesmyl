import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 5L18 5',
  d2: 'M10 10L14.5 14.5',
  d3: 'M5 11L5 18',
  d4: 'M18.5 5.5L9.5 5.5C8.94772 5.5 8.5 5.05228 8.5 4.5C8.5 3.94772 8.94772 3.5 9.5 3.5L18.5 3.5C19.0523 3.5 19.5 3.94772 19.5 4.5C19.5 5.05229 19.0523 5.5 18.5 5.5Z',
  d5: 'M7.79289 7.79289C8.18342 7.40237 8.81658 7.40237 9.20711 7.79289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L7.79289 9.20711C7.40237 8.81658 7.40237 8.18342 7.79289 7.79289Z',
  d6: 'M4.5 7.5C5.05228 7.5 5.5 7.94772 5.5 8.5L5.5 19.5C5.5 20.0523 5.05228 20.5 4.5 20.5C3.94771 20.5 3.5 20.0523 3.5 19.5L3.5 8.5C3.5 7.94772 3.94772 7.5 4.5 7.5Z',
  d7: 'M7 20C7 21.3807 5.88071 22.5 4.5 22.5C3.11929 22.5 2 21.3807 2 20C2 18.6193 3.11929 17.5 4.5 17.5C5.88071 17.5 7 18.6193 7 20Z',
  d8: 'M22.5 4.5C22.5 5.88071 21.3807 7 20 7C18.6193 7 17.5 5.88071 17.5 4.5C17.5 3.11929 18.6193 2 20 2C21.3807 2 22.5 3.11929 22.5 4.5Z',
  d9: 'M18 6L11 6V4L18 4V6ZM13.7929 15.2071L9.29289 10.7071L10.7071 9.29289L15.2071 13.7929L13.7929 15.2071ZM4 18L4 11H6L6 18H4Z',
  d10: 'M1.25 6.44444C1.25 3.57563 3.57563 1.25 6.44444 1.25C9.31326 1.25 11.6389 3.57563 11.6389 6.44444C11.6389 9.31326 9.31326 11.6389 6.44444 11.6389C3.57563 11.6389 1.25 9.31326 1.25 6.44444Z',
  d11: 'M2.25 20C2.25 18.4812 3.48122 17.25 5 17.25C6.51878 17.25 7.75 18.4812 7.75 20C7.75 21.5188 6.51878 22.75 5 22.75C3.48122 22.75 2.25 21.5188 2.25 20Z',
  d12: 'M13.25 16C13.25 14.4812 14.4812 13.25 16 13.25C17.5188 13.25 18.75 14.4812 18.75 16C18.75 17.5188 17.5188 18.75 16 18.75C14.4812 18.75 13.25 17.5188 13.25 16Z',
  d13: 'M17.25 5C17.25 3.48122 18.4812 2.25 20 2.25C21.5188 2.25 22.75 3.48122 22.75 5C22.75 6.51878 21.5188 7.75 20 7.75C18.4812 7.75 17.25 6.51878 17.25 5Z',
};

export const IconChartRelationshipStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-stroke-rounded IconChartRelationshipStrokeRounded"
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
      <circle 
        cx="6.44444" 
        cy="6.44444" 
        r="4.44444" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="5" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRelationshipDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-duotone-rounded IconChartRelationshipDuotoneRounded"
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
      <circle 
        cx="6.44444" 
        cy="6.44444" 
        r="4.44444" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.44444" 
        cy="6.44444" 
        r="4.44444" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="5" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRelationshipTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-twotone-rounded IconChartRelationshipTwotoneRounded"
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
      <circle 
        cx="6.44444" 
        cy="6.44444" 
        r="4.44444" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="5" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRelationshipSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-solid-rounded IconChartRelationshipSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="5.94444" 
        cy="5.94444" 
        r="4.44444" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="16" 
        cy="16" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRelationshipBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-bulk-rounded IconChartRelationshipBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="5.94444" 
        cy="5.94444" 
        r="4.44444" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="16" 
        cy="16" 
        r="2.5" 
        fill="var(--icon-fill)"></circle>
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRelationshipStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-stroke-sharp IconChartRelationshipStrokeSharp"
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
      <circle 
        cx="6.44444" 
        cy="6.44444" 
        r="4.44444" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="5" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="5" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconChartRelationshipSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-relationship-solid-sharp IconChartRelationshipSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
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

export const iconPackOfChartRelationship: TheIconSelfPack = {
  name: 'ChartRelationship',
  StrokeRounded: IconChartRelationshipStrokeRounded,
  DuotoneRounded: IconChartRelationshipDuotoneRounded,
  TwotoneRounded: IconChartRelationshipTwotoneRounded,
  SolidRounded: IconChartRelationshipSolidRounded,
  BulkRounded: IconChartRelationshipBulkRounded,
  StrokeSharp: IconChartRelationshipStrokeSharp,
  SolidSharp: IconChartRelationshipSolidSharp,
};