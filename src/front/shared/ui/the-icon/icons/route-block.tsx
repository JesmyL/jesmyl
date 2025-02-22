import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2L21 8M21 2L15 8',
  d2: 'M12 5H8.5C6.567 5 5 6.567 5 8.5C5 10.433 6.567 12 8.5 12H15.5C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19H12',
  d3: 'M14.5246 1.52459C14.8907 1.15847 15.4843 1.15847 15.8504 1.52459L18 3.67418L20.1496 1.52459C20.5157 1.15847 21.1093 1.15847 21.4754 1.52459C21.8415 1.8907 21.8415 2.4843 21.4754 2.85041L19.3258 5L21.4754 7.14959C21.8415 7.5157 21.8415 8.1093 21.4754 8.47541C21.1093 8.84153 20.5157 8.84153 20.1496 8.47541L18 6.32582L15.8504 8.47541C15.4843 8.84153 14.8907 8.84153 14.5246 8.47541C14.1585 8.1093 14.1585 7.5157 14.5246 7.14959L16.6742 5L14.5246 2.85041C14.1585 2.4843 14.1585 1.8907 14.5246 1.52459Z',
  d4: 'M2.25 19C2.25 16.9289 3.92893 15.25 6 15.25C8.07107 15.25 9.75 16.9289 9.75 19C9.75 21.0711 8.07107 22.75 6 22.75C3.92893 22.75 2.25 21.0711 2.25 19Z',
  d5: 'M4 8.5C4 6.01472 6.01472 4 8.5 4H12C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6H8.5C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11H15.5C17.9853 11 20 13.0147 20 15.5C20 17.9853 17.9853 20 15.5 20H12C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18H15.5C16.8807 18 18 16.8807 18 15.5C18 14.1193 16.8807 13 15.5 13H8.5C6.01472 13 4 10.9853 4 8.5Z',
  d6: 'M16.5694 5L14.25 2.68058L15.6806 1.25L18 3.56942L20.3194 1.25L21.75 2.68058L19.4306 5L21.75 7.31942L20.3194 8.75L18 6.43058L15.6806 8.75L14.25 7.31942L16.5694 5Z',
  d7: 'M4.00098 8.5C4.00098 6.01472 6.0157 4 8.50098 4H12.001V6H8.50098C7.12026 6 6.00098 7.11929 6.00098 8.5C6.00098 9.88071 7.12026 11 8.50098 11H15.501C17.9863 11 20.001 13.0147 20.001 15.5C20.001 17.9853 17.9863 20 15.501 20H12.001V18H15.501C16.8817 18 18.001 16.8807 18.001 15.5C18.001 14.1193 16.8817 13 15.501 13H8.50098C6.0157 13 4.00098 10.9853 4.00098 8.5Z',
};

export const IconRouteBlockStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-stroke-rounded IconRouteBlockStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6" 
        cy="19" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRouteBlockDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-duotone-rounded IconRouteBlockDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6" 
        cy="19" 
        r="3" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6" 
        cy="19" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRouteBlockTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-twotone-rounded IconRouteBlockTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        cx="6" 
        cy="19" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRouteBlockSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-solid-rounded IconRouteBlockSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRouteBlockBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-bulk-rounded IconRouteBlockBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconRouteBlockStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-stroke-sharp IconRouteBlockStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="6" 
        cy="19" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRouteBlockSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="route-block-solid-sharp IconRouteBlockSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRouteBlock: TheIconSelfPack = {
  name: 'RouteBlock',
  StrokeRounded: IconRouteBlockStrokeRounded,
  DuotoneRounded: IconRouteBlockDuotoneRounded,
  TwotoneRounded: IconRouteBlockTwotoneRounded,
  SolidRounded: IconRouteBlockSolidRounded,
  BulkRounded: IconRouteBlockBulkRounded,
  StrokeSharp: IconRouteBlockStrokeSharp,
  SolidSharp: IconRouteBlockSolidSharp,
};