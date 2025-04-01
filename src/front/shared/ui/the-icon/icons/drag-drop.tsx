import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 6H6.00634M6 12H6.00634M6 18H6.00634M11.9968 6H12.0032M11.9968 12H12.0032M11.9968 18H12.0032M17.9937 6H18M17.9937 12H18M17.9937 18H18',
  d2: 'M4 6C4 4.89543 4.89543 4 6 4H6.00634C7.11091 4 8.00634 4.89543 8.00634 6C8.00634 7.10457 7.11091 8 6.00634 8H6C4.89543 8 4 7.10457 4 6ZM9.99683 6C9.99683 4.89543 10.8923 4 11.9968 4H12.0032C13.1077 4 14.0032 4.89543 14.0032 6C14.0032 7.10457 13.1077 8 12.0032 8H11.9968C10.8923 8 9.99683 7.10457 9.99683 6ZM15.9937 6C15.9937 4.89543 16.8891 4 17.9937 4H18C19.1046 4 20 4.89543 20 6C20 7.10457 19.1046 8 18 8H17.9937C16.8891 8 15.9937 7.10457 15.9937 6ZM4 12C4 10.8954 4.89543 10 6 10H6.00634C7.11091 10 8.00634 10.8954 8.00634 12C8.00634 13.1046 7.11091 14 6.00634 14H6C4.89543 14 4 13.1046 4 12ZM9.99683 12C9.99683 10.8954 10.8923 10 11.9968 10H12.0032C13.1077 10 14.0032 10.8954 14.0032 12C14.0032 13.1046 13.1077 14 12.0032 14H11.9968C10.8923 14 9.99683 13.1046 9.99683 12ZM15.9937 12C15.9937 10.8954 16.8891 10 17.9937 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17.9937C16.8891 14 15.9937 13.1046 15.9937 12ZM4 18C4 16.8954 4.89543 16 6 16H6.00634C7.11091 16 8.00634 16.8954 8.00634 18C8.00634 19.1046 7.11091 20 6.00634 20H6C4.89543 20 4 19.1046 4 18ZM9.99683 18C9.99683 16.8954 10.8923 16 11.9968 16H12.0032C13.1077 16 14.0032 16.8954 14.0032 18C14.0032 19.1046 13.1077 20 12.0032 20H11.9968C10.8923 20 9.99683 19.1046 9.99683 18ZM15.9937 18C15.9937 16.8954 16.8891 16 17.9937 16H18C19.1046 16 20 16.8954 20 18C20 19.1046 19.1046 20 18 20H17.9937C16.8891 20 15.9937 19.1046 15.9937 18Z',
  d3: 'M9.99683 6C9.99683 4.89543 10.8923 4 11.9968 4H12.0032C13.1077 4 14.0032 4.89543 14.0032 6C14.0032 7.10457 13.1077 8 12.0032 8H11.9968C10.8923 8 9.99683 7.10457 9.99683 6ZM4 12C4 10.8954 4.89543 10 6 10H6.00634C7.11091 10 8.00634 10.8954 8.00634 12C8.00634 13.1046 7.11091 14 6.00634 14H6C4.89543 14 4 13.1046 4 12ZM15.9937 12C15.9937 10.8954 16.8891 10 17.9937 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17.9937C16.8891 14 15.9937 13.1046 15.9937 12ZM9.99683 18C9.99683 16.8954 10.8923 16 11.9968 16H12.0032C13.1077 16 14.0032 16.8954 14.0032 18C14.0032 19.1046 13.1077 20 12.0032 20H11.9968C10.8923 20 9.99683 19.1046 9.99683 18Z',
  d4: 'M4 6C4 4.89543 4.89543 4 6 4H6.00634C7.11091 4 8.00634 4.89543 8.00634 6C8.00634 7.10457 7.11091 8 6.00634 8H6C4.89543 8 4 7.10457 4 6ZM15.9937 6C15.9937 4.89543 16.8891 4 17.9937 4H18C19.1046 4 20 4.89543 20 6C20 7.10457 19.1046 8 18 8H17.9937C16.8891 8 15.9937 7.10457 15.9937 6ZM9.99683 12C9.99683 10.8954 10.8923 10 11.9968 10H12.0032C13.1077 10 14.0032 10.8954 14.0032 12C14.0032 13.1046 13.1077 14 12.0032 14H11.9968C10.8923 14 9.99683 13.1046 9.99683 12ZM4 18C4 16.8954 4.89543 16 6 16H6.00634C7.11091 16 8.00634 16.8954 8.00634 18C8.00634 19.1046 7.11091 20 6.00634 20H6C4.89543 20 4 19.1046 4 18ZM15.9937 18C15.9937 16.8954 16.8891 16 17.9937 16H18C19.1046 16 20 16.8954 20 18C20 19.1046 19.1046 20 18 20H17.9937C16.8891 20 15.9937 19.1046 15.9937 18Z',
  d5: 'M4.25 4.25H7.75634V7.75H4.25V4.25ZM10.2468 4.25H13.7532V7.75H10.2468V4.25ZM16.2437 4.25H19.75V7.75H16.2437V4.25ZM4.25 10.25H7.75634V13.75H4.25V10.25ZM10.2468 10.25H13.7532V13.75H10.2468V10.25ZM16.2437 10.25H19.75V13.75H16.2437V10.25ZM4.25 16.25H7.75634V19.75H4.25V16.25ZM10.2468 16.25H13.7532V19.75H10.2468V16.25ZM16.2437 16.25H19.75V19.75H16.2437V16.25Z',
};

export const IconDragDropStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-stroke-rounded IconDragDropStrokeRounded"
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

export const IconDragDropDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-duotone-rounded IconDragDropDuotoneRounded"
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

export const IconDragDropTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-twotone-rounded IconDragDropTwotoneRounded"
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

export const IconDragDropSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-solid-rounded IconDragDropSolidRounded"
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

export const IconDragDropBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-bulk-rounded IconDragDropBulkRounded"
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

export const IconDragDropStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-stroke-sharp IconDragDropStrokeSharp"
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

export const IconDragDropSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="drag-drop-solid-sharp IconDragDropSolidSharp"
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

export const iconPackOfDragDrop: TheIconSelfPack = {
  name: 'DragDrop',
  StrokeRounded: IconDragDropStrokeRounded,
  DuotoneRounded: IconDragDropDuotoneRounded,
  TwotoneRounded: IconDragDropTwotoneRounded,
  SolidRounded: IconDragDropSolidRounded,
  BulkRounded: IconDragDropBulkRounded,
  StrokeSharp: IconDragDropStrokeSharp,
  SolidSharp: IconDragDropSolidSharp,
};