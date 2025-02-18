import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.49902 17.5008L10.5 13.5M13.5 10.5L17.5 6.5',
  d2: 'M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z',
  d3: 'M21 5C21 6.10457 20.1046 7 19 7C17.8954 7 17 6.10457 17 5C17 3.89543 17.8954 3 19 3C20.1046 3 21 3.89543 21 5Z',
  d4: 'M7 19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19C3 17.8954 3.89543 17 5 17C6.10457 17 7 17.8954 7 19Z',
  d5: 'M6.5 17.5008L10.501 13.5M13.501 10.5L17.501 6.5',
  d6: 'M18.2081 5.79289C18.5986 6.18342 18.5986 6.81658 18.2081 7.20711L14.2081 11.2071C13.8176 11.5976 13.1844 11.5976 12.7939 11.2071C12.4033 10.8166 12.4033 10.1834 12.7939 9.79289L16.7939 5.79289C17.1844 5.40237 17.8176 5.40237 18.2081 5.79289ZM11.2081 12.7929C11.5986 13.1834 11.5986 13.8166 11.2081 14.2071L7.20709 18.2079C6.81656 18.5985 6.1834 18.5984 5.79288 18.2079C5.40236 17.8174 5.40237 17.1842 5.79291 16.7937L9.79388 12.7929C10.1844 12.4024 10.8176 12.4024 11.2081 12.7929Z',
  d7: 'M9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z',
  d8: 'M16.25 5C16.25 3.48122 17.4812 2.25 19 2.25C20.5188 2.25 21.75 3.48122 21.75 5C21.75 6.51878 20.5188 7.75 19 7.75C17.4812 7.75 16.25 6.51878 16.25 5Z',
  d9: 'M2.25 19C2.25 17.4812 3.48122 16.25 5 16.25C6.51878 16.25 7.75 17.4812 7.75 19C7.75 20.5188 6.51878 21.75 5 21.75C3.48122 21.75 2.25 20.5188 2.25 19Z',
  d10: 'M16.4817 6.10547C16.7586 6.736 17.2654 7.24274 17.8959 7.51968L14.5198 10.8958C14.2428 10.2653 13.7361 9.75852 13.1056 9.48157L16.4817 6.10547Z',
  d11: 'M9.48167 13.1055L6.10547 16.4815C6.73601 16.7584 7.24277 17.2652 7.51974 17.8957L10.8959 14.5197C10.2653 14.2427 9.75861 13.736 9.48167 13.1055Z',
  d12: 'M18.2062 7.20718L14.2062 11.2072L12.792 9.79297L16.792 5.79297L18.2062 7.20718ZM11.2062 14.2072L7.2052 18.208L5.79102 16.7938L9.79199 12.793L11.2062 14.2072Z',
};

export const IconStraightEdgeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-stroke-rounded IconStraightEdgeStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconStraightEdgeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-duotone-rounded IconStraightEdgeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
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
    </TheIconWrapper>
  );
};

export const IconStraightEdgeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-twotone-rounded IconStraightEdgeTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
    </TheIconWrapper>
  );
};

export const IconStraightEdgeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-solid-rounded IconStraightEdgeSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconStraightEdgeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-bulk-rounded IconStraightEdgeBulkRounded"
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
        opacity="var(--icon-opacity)" 
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

export const IconStraightEdgeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-stroke-sharp IconStraightEdgeStrokeSharp"
    >
      <path 
        d={d.d5} 
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
    </TheIconWrapper>
  );
};

export const IconStraightEdgeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="straight-edge-solid-sharp IconStraightEdgeSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
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
    </TheIconWrapper>
  );
};

export const iconPackOfStraightEdge: TheIconSelfPack = {
  name: 'StraightEdge',
  StrokeRounded: IconStraightEdgeStrokeRounded,
  DuotoneRounded: IconStraightEdgeDuotoneRounded,
  TwotoneRounded: IconStraightEdgeTwotoneRounded,
  SolidRounded: IconStraightEdgeSolidRounded,
  BulkRounded: IconStraightEdgeBulkRounded,
  StrokeSharp: IconStraightEdgeStrokeSharp,
  SolidSharp: IconStraightEdgeSolidSharp,
};