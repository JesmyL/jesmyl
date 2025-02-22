import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.001 8V8.00635M12.001 8V8.00635M6.00098 8L6.00098 8.00635M18.001 15.9937V16M12.001 15.9937V16M6.00098 15.9937L6.00098 16',
  d2: 'M18 6C19.1046 6 20 6.89543 20 8L20 8.00635C20 9.11092 19.1046 10.0063 18 10.0063C16.8954 10.0063 16 9.11092 16 8.00635L16 8C16 6.89543 16.8954 6 18 6ZM18 13.9937C19.1046 13.9937 20 14.8891 20 15.9937L20 16C20 17.1046 19.1046 18 18 18C16.8954 18 16 17.1046 16 16L16 15.9937C16 14.8891 16.8954 13.9937 18 13.9937ZM12 6C13.1046 6 14 6.89543 14 8L14 8.00635C14 9.11092 13.1046 10.0063 12 10.0063C10.8954 10.0063 10 9.11092 10 8.00635L10 8C10 6.89543 10.8954 6 12 6ZM12 13.9937C13.1046 13.9937 14 14.8891 14 15.9937L14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16L10 15.9937C10 14.8891 10.8954 13.9937 12 13.9937ZM6 6C7.10457 6 8 6.89543 8 8L8 8.00635C8 9.11092 7.10457 10.0063 6 10.0063C4.89543 10.0063 4 9.11091 4 8.00635L4 8C4 6.89543 4.89543 6 6 6ZM6 13.9937C7.10457 13.9937 8 14.8891 8 15.9937L8 16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16L4 15.9937C4 14.8891 4.89543 13.9937 6 13.9937Z',
  d3: 'M18 13.9937C19.1046 13.9937 20 14.8891 20 15.9937L20 16C20 17.1046 19.1046 18 18 18C16.8954 18 16 17.1046 16 16L16 15.9937C16 14.8891 16.8954 13.9937 18 13.9937ZM12 6C13.1046 6 14 6.89543 14 8L14 8.00635C14 9.11092 13.1046 10.0063 12 10.0063C10.8954 10.0063 10 9.11092 10 8.00635L10 8C10 6.89543 10.8954 6 12 6ZM6 13.9937C7.10457 13.9937 8 14.8891 8 15.9937L8 16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16L4 15.9937C4 14.8891 4.89543 13.9937 6 13.9937Z',
  d4: 'M18 6C19.1046 6 20 6.89543 20 8L20 8.00635C20 9.11092 19.1046 10.0063 18 10.0063C16.8954 10.0063 16 9.11092 16 8.00635L16 8C16 6.89543 16.8954 6 18 6ZM12 13.9937C13.1046 13.9937 14 14.8891 14 15.9937L14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16L10 15.9937C10 14.8891 10.8954 13.9937 12 13.9937ZM6 6C7.10457 6 8 6.89543 8 8L8 8.00635C8 9.11092 7.10457 10.0063 6 10.0063C4.89543 10.0063 4 9.11091 4 8.00635L4 8C4 6.89543 4.89543 6 6 6Z',
  d5: 'M7.75098 6.25V9.75635L4.25098 9.75635L4.25098 6.25L7.75098 6.25ZM13.751 6.25V9.75635H10.251V6.25H13.751ZM19.751 6.25V9.75635H16.251V6.25H19.751ZM7.75098 14.2437L7.75098 17.75H4.25098L4.25098 14.2437H7.75098ZM13.751 14.2437V17.75H10.251V14.2437H13.751ZM19.751 14.2437V17.75H16.251V14.2437H19.751Z',
};

export const IconDragDropHorizontalStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-stroke-rounded IconDragDropHorizontalStrokeRounded"
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

export const IconDragDropHorizontalDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-duotone-rounded IconDragDropHorizontalDuotoneRounded"
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

export const IconDragDropHorizontalTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-twotone-rounded IconDragDropHorizontalTwotoneRounded"
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

export const IconDragDropHorizontalSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-solid-rounded IconDragDropHorizontalSolidRounded"
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

export const IconDragDropHorizontalBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-bulk-rounded IconDragDropHorizontalBulkRounded"
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

export const IconDragDropHorizontalStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-stroke-sharp IconDragDropHorizontalStrokeSharp"
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

export const IconDragDropHorizontalSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-horizontal-solid-sharp IconDragDropHorizontalSolidSharp"
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

export const iconPackOfDragDropHorizontal: TheIconSelfPack = {
  name: 'DragDropHorizontal',
  StrokeRounded: IconDragDropHorizontalStrokeRounded,
  DuotoneRounded: IconDragDropHorizontalDuotoneRounded,
  TwotoneRounded: IconDragDropHorizontalTwotoneRounded,
  SolidRounded: IconDragDropHorizontalSolidRounded,
  BulkRounded: IconDragDropHorizontalBulkRounded,
  StrokeSharp: IconDragDropHorizontalStrokeSharp,
  SolidSharp: IconDragDropHorizontalSolidSharp,
};