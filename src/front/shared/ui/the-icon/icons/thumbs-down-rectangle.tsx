import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M12.6525 14.7136L12.475 14.1571C12.3295 13.701 12.2567 13.473 12.3127 13.293C12.3579 13.1473 12.4573 13.0217 12.5927 12.9391C12.76 12.8369 13.0131 12.8369 13.5194 12.8369H13.7887C15.5021 12.8369 16.3588 12.8369 16.7634 12.3447C16.8097 12.2884 16.8508 12.2286 16.8864 12.1659C17.1977 11.6168 16.8438 10.8773 16.136 9.39811C15.4865 8.04072 15.1617 7.36203 14.5587 6.96255C14.5003 6.92387 14.4403 6.8874 14.3789 6.8532C13.744 6.5 12.9574 6.5 11.3843 6.5H11.0431C9.13715 6.5 8.18419 6.5 7.59209 7.05681C7 7.61363 7 8.50981 7 10.3022V10.9321C7 11.8741 7 12.345 7.17223 12.7761C7.34445 13.2071 7.67424 13.5616 8.3338 14.2705L11.0614 17.202C11.1298 17.2755 11.164 17.3123 11.1942 17.3377C11.4757 17.5755 11.9102 17.5488 12.1563 17.2785C12.1826 17.2495 12.2115 17.2089 12.2691 17.1276C12.3592 17.0004 12.4043 16.9369 12.4436 16.8739C12.7952 16.31 12.9016 15.6401 12.7405 15.0042C12.7225 14.9332 12.6992 14.8599 12.6525 14.7136Z',
  d3: 'M3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.89124ZM12.475 14.1571L12.6525 14.7136C12.6992 14.8598 12.7225 14.9332 12.7405 15.0042C12.9016 15.6401 12.7952 16.31 12.4436 16.8739C12.4043 16.9369 12.3592 17.0004 12.2691 17.1275C12.2115 17.2088 12.1826 17.2495 12.1563 17.2785C11.9102 17.5488 11.4757 17.5755 11.1942 17.3377C11.164 17.3123 11.1298 17.2755 11.0614 17.202L8.3338 14.2705C7.67424 13.5616 7.34445 13.2071 7.17223 12.7761C7 12.345 7 11.8741 7 10.9321V10.3022C7 8.50981 7 7.61363 7.59209 7.05681C8.18419 6.5 9.13715 6.5 11.0431 6.5H11.3843C12.9574 6.5 13.744 6.5 14.3789 6.8532C14.4403 6.8874 14.5003 6.92387 14.5587 6.96255C15.1617 7.36203 15.4865 8.04072 16.136 9.39811C16.8438 10.8773 17.1977 11.6168 16.8864 12.1659C16.8508 12.2286 16.8097 12.2884 16.7634 12.3447C16.3588 12.8369 15.5021 12.8369 13.7887 12.8369H13.5194C13.0131 12.8369 12.76 12.8369 12.5927 12.9391C12.4573 13.0217 12.3579 13.1473 12.3127 13.293C12.2567 13.473 12.3295 13.701 12.475 14.1571Z',
  d4: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM12.475 14.1571L12.6525 14.7136L12.6525 14.7137C12.6992 14.86 12.7225 14.9332 12.7405 15.0042C12.9016 15.6401 12.7952 16.31 12.4436 16.8739C12.4043 16.9369 12.3592 17.0004 12.2691 17.1275L12.2691 17.1276C12.2115 17.2089 12.1826 17.2495 12.1563 17.2785C11.9102 17.5488 11.4757 17.5755 11.1942 17.3377C11.164 17.3123 11.1298 17.2755 11.0614 17.202L8.3338 14.2705L8.33379 14.2704C7.67423 13.5616 7.34445 13.2071 7.17223 12.7761C7 12.345 7 11.8741 7 10.9321V10.3022C7 8.50981 7 7.61363 7.59209 7.05681C8.18419 6.5 9.13715 6.5 11.0431 6.5H11.3843C12.9574 6.5 13.744 6.5 14.3789 6.8532C14.4403 6.8874 14.5003 6.92387 14.5587 6.96255C15.1617 7.36203 15.4865 8.04072 16.136 9.39811C16.8438 10.8773 17.1977 11.6168 16.8864 12.1659C16.8508 12.2286 16.8097 12.2884 16.7634 12.3447C16.3588 12.8369 15.5021 12.8369 13.7887 12.8369H13.5194C13.0131 12.8369 12.76 12.8369 12.5927 12.9391C12.4573 13.0217 12.3579 13.1473 12.3127 13.293C12.2567 13.473 12.3295 13.701 12.475 14.1571Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d6: 'M3.00011 3L3 20.9996L21 21V3H3.00011Z',
  d7: 'M7 13L11.5 17.5L13 15.5L12 13H17L15 6.5H7V13Z',
  d8: 'M3.00011 2.25C2.5859 2.25 2.25011 2.58578 2.25011 3L2.25 20.9996C2.25 21.4138 2.58578 21.7496 2.99998 21.7496L21 21.75C21.1989 21.75 21.3897 21.671 21.5303 21.5303C21.671 21.3897 21.75 21.1989 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H3.00011ZM11.5 17.5L7 13V6.5H15L17 13H12L13 15.5L11.5 17.5Z',
};

export const IconThumbsDownRectangleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-stroke-rounded IconThumbsDownRectangleStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownRectangleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-duotone-rounded IconThumbsDownRectangleDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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

export const IconThumbsDownRectangleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-twotone-rounded IconThumbsDownRectangleTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconThumbsDownRectangleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-solid-rounded IconThumbsDownRectangleSolidRounded"
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

export const IconThumbsDownRectangleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-bulk-rounded IconThumbsDownRectangleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownRectangleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-stroke-sharp IconThumbsDownRectangleStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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

export const IconThumbsDownRectangleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-rectangle-solid-sharp IconThumbsDownRectangleSolidSharp"
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

export const iconPackOfThumbsDownRectangle: TheIconSelfPack = {
  name: 'ThumbsDownRectangle',
  StrokeRounded: IconThumbsDownRectangleStrokeRounded,
  DuotoneRounded: IconThumbsDownRectangleDuotoneRounded,
  TwotoneRounded: IconThumbsDownRectangleTwotoneRounded,
  SolidRounded: IconThumbsDownRectangleSolidRounded,
  BulkRounded: IconThumbsDownRectangleBulkRounded,
  StrokeSharp: IconThumbsDownRectangleStrokeSharp,
  SolidSharp: IconThumbsDownRectangleSolidSharp,
};