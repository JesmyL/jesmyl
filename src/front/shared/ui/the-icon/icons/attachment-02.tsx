import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 8.00049V6.00049C8 3.79135 9.79086 2.00049 12 2.00049C14.2091 2.00049 16 3.79135 16 6.00049V18.0005C16 20.2096 14.2091 22.0005 12 22.0005C9.79086 22.0005 8 20.2096 8 18.0005V13.5005C8 12.1198 9.11929 11.0005 10.5 11.0005C11.8807 11.0005 13 12.1198 13 13.5005V16.0005',
  d2: 'M16 18V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V18C8 20.2091 9.79086 22 12 22C14.2091 22 16 20.2091 16 18Z',
  d3: 'M8 8V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V13.5C8 12.1193 9.11929 11 10.5 11C11.8807 11 13 12.1193 13 13.5V16',
  d4: 'M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V13.5C8 12.1193 9.11929 11 10.5 11C11.8807 11 13 12.1193 13 13.5V16',
  d5: 'M12 3C10.3431 3 9 4.34315 9 6V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V18C17 20.7614 14.7614 23 12 23C9.23858 23 7 20.7614 7 18V13.5C7 11.567 8.567 10 10.5 10C12.433 10 14 11.567 14 13.5V16C14 16.5523 13.5523 17 13 17C12.4477 17 12 16.5523 12 16V13.5C12 12.6716 11.3284 12 10.5 12C9.67157 12 9 12.6716 9 13.5V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V6C15 4.34315 13.6569 3 12 3Z',
  d6: 'M12 3C10.3431 3 9 4.34315 9 6V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V18C17 20.7614 14.7614 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C13.6569 21 15 19.6569 15 18V6C15 4.34315 13.6569 3 12 3Z',
  d7: 'M10.5 12C9.67157 12 9 12.6716 9 13.5V18C9 19.6569 10.3431 21 12 21C12.5523 21 13 21.4477 13 22C13 22.5523 12.5523 23 12 23C9.23858 23 7 20.7614 7 18V13.5C7 11.567 8.567 10 10.5 10C12.433 10 14 11.567 14 13.5V16C14 16.5523 13.5523 17 13 17C12.4477 17 12 16.5523 12 16V13.5C12 12.6716 11.3284 12 10.5 12Z',
  d8: 'M12 3.5C10.3431 3.5 9 4.84315 9 6.5V7.5H7V6.5C7 3.73858 9.23858 1.5 12 1.5C14.7614 1.5 17 3.73858 17 6.5V17.5C17 20.2614 14.7614 22.5 12 22.5C9.23858 22.5 7 20.2614 7 17.5V13C7 11.067 8.567 9.5 10.5 9.5C12.433 9.5 14 11.067 14 13V15.5H12V13C12 12.1716 11.3284 11.5 10.5 11.5C9.67157 11.5 9 12.1716 9 13V17.5C9 19.1569 10.3431 20.5 12 20.5C13.6569 20.5 15 19.1569 15 17.5V6.5C15 4.84315 13.6569 3.5 12 3.5Z',
};

export const IconAttachment02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 TwotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconAttachment02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Attachment02 SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAttachment02: TheIconSelfPack = [
  'Attachment02',
  IconAttachment02StrokeRounded,
  IconAttachment02DuotoneRounded,
  IconAttachment02TwotoneRounded,
  IconAttachment02SolidRounded,
  IconAttachment02BulkRounded,
  IconAttachment02StrokeSharp,
  IconAttachment02SolidSharp,
];