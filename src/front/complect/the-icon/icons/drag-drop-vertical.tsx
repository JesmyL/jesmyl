import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16',
  d2: 'M6 6C6 4.89543 6.89543 4 8 4H8.00635C9.11092 4 10.0063 4.89543 10.0063 6C10.0063 7.10457 9.11092 8 8.00635 8H8C6.89543 8 6 7.10457 6 6ZM13.9937 6C13.9937 4.89543 14.8891 4 15.9937 4H16C17.1046 4 18 4.89543 18 6C18 7.10457 17.1046 8 16 8H15.9937C14.8891 8 13.9937 7.10457 13.9937 6ZM6 12C6 10.8954 6.89543 10 8 10H8.00635C9.11092 10 10.0063 10.8954 10.0063 12C10.0063 13.1046 9.11092 14 8.00635 14H8C6.89543 14 6 13.1046 6 12ZM13.9937 12C13.9937 10.8954 14.8891 10 15.9937 10H16C17.1046 10 18 10.8954 18 12C18 13.1046 17.1046 14 16 14H15.9937C14.8891 14 13.9937 13.1046 13.9937 12ZM6 18C6 16.8954 6.89543 16 8 16H8.00635C9.11092 16 10.0063 16.8954 10.0063 18C10.0063 19.1046 9.11092 20 8.00635 20H8C6.89543 20 6 19.1046 6 18ZM13.9937 18C13.9937 16.8954 14.8891 16 15.9937 16H16C17.1046 16 18 16.8954 18 18C18 19.1046 17.1046 20 16 20H15.9937C14.8891 20 13.9937 19.1046 13.9937 18Z',
  d3: 'M13.9937 6C13.9937 4.89543 14.8891 4 15.9937 4H16C17.1046 4 18 4.89543 18 6C18 7.10457 17.1046 8 16 8H15.9937C14.8891 8 13.9937 7.10457 13.9937 6ZM6 12C6 10.8954 6.89543 10 8 10H8.00635C9.11092 10 10.0063 10.8954 10.0063 12C10.0063 13.1046 9.11092 14 8.00635 14H8C6.89543 14 6 13.1046 6 12ZM13.9937 18C13.9937 16.8954 14.8891 16 15.9937 16H16C17.1046 16 18 16.8954 18 18C18 19.1046 17.1046 20 16 20H15.9937C14.8891 20 13.9937 19.1046 13.9937 18Z',
  d4: 'M6 6C6 4.89543 6.89543 4 8 4H8.00635C9.11092 4 10.0063 4.89543 10.0063 6C10.0063 7.10457 9.11092 8 8.00635 8H8C6.89543 8 6 7.10457 6 6ZM13.9937 12C13.9937 10.8954 14.8891 10 15.9937 10H16C17.1046 10 18 10.8954 18 12C18 13.1046 17.1046 14 16 14H15.9937C14.8891 14 13.9937 13.1046 13.9937 12ZM6 18C6 16.8954 6.89543 16 8 16H8.00635C9.11092 16 10.0063 16.8954 10.0063 18C10.0063 19.1046 9.11092 20 8.00635 20H8C6.89543 20 6 19.1046 6 18Z',
  d5: 'M6.25 4.25H9.75635V7.75H6.25V4.25ZM14.2437 4.25H17.75V7.75H14.2437V4.25ZM6.25 10.25H9.75635V13.75H6.25V10.25ZM14.2437 10.25H17.75V13.75H14.2437V10.25ZM6.25 16.25H9.75635V19.75H6.25V16.25ZM14.2437 16.25H17.75V19.75H14.2437V16.25Z',
};

export const IconDragDropVerticalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-stroke-rounded IconDragDropVerticalStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDragDropVerticalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-duotone-rounded IconDragDropVerticalDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconDragDropVerticalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-twotone-rounded IconDragDropVerticalTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDragDropVerticalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-solid-rounded IconDragDropVerticalSolidRounded"
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

export const IconDragDropVerticalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-bulk-rounded IconDragDropVerticalBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconDragDropVerticalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-stroke-sharp IconDragDropVerticalStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDragDropVerticalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-vertical-solid-sharp IconDragDropVerticalSolidSharp"
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

export const iconPackOfDragDropVertical: TheIconSelfPack = {
  name: 'DragDropVertical',
  StrokeRounded: IconDragDropVerticalStrokeRounded,
  DuotoneRounded: IconDragDropVerticalDuotoneRounded,
  TwotoneRounded: IconDragDropVerticalTwotoneRounded,
  SolidRounded: IconDragDropVerticalSolidRounded,
  BulkRounded: IconDragDropVerticalBulkRounded,
  StrokeSharp: IconDragDropVerticalStrokeSharp,
  SolidSharp: IconDragDropVerticalSolidSharp,
};