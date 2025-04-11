import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C18 22 19.5 17.49 19.5 12C19.5 6.50998 18 2 12 2C5.99993 2 4.5 6.50996 4.5 12C4.5 17.49 5.99993 22 12 22Z',
  d2: 'M12 9V6',
  d3: 'M12 1.25C8.77681 1.25 6.64252 2.48241 5.36262 4.54591C4.12483 6.54151 3.75 9.21526 3.75 12C3.75 14.7847 4.12483 17.4585 5.36262 19.4541C6.64252 21.5176 8.7768 22.75 12 22.75C15.2231 22.75 17.3574 21.5176 18.6373 19.4541C19.8751 17.4585 20.25 14.7847 20.25 12C20.25 9.21527 19.8751 6.54152 18.6373 4.54592C17.3574 2.48242 15.2231 1.25 12 1.25ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9V6Z',
  d4: 'M5.36262 4.54591C6.64252 2.48241 8.77681 1.25 12 1.25C15.2231 1.25 17.3574 2.48242 18.6373 4.54592C19.8751 6.54152 20.25 9.21527 20.25 12C20.25 14.7847 19.8751 17.4585 18.6373 19.4541C17.3574 21.5176 15.2231 22.75 12 22.75C8.7768 22.75 6.64252 21.5176 5.36262 19.4541C4.12483 17.4585 3.75 14.7847 3.75 12C3.75 9.21526 4.12483 6.54151 5.36262 4.54591Z',
  d5: 'M12 5C12.5523 5 13 5.44772 13 6V9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9V6C11 5.44772 11.4477 5 12 5Z',
  d6: 'M12 9V5',
  d7: 'M12 1.25C8.77681 1.25 6.64252 2.48241 5.36262 4.54591C4.12483 6.54151 3.75 9.21526 3.75 12C3.75 14.7847 4.12483 17.4585 5.36262 19.4541C6.64252 21.5176 8.7768 22.75 12 22.75C15.2231 22.75 17.3574 21.5176 18.6373 19.4541C19.8751 17.4585 20.25 14.7847 20.25 12C20.25 9.21527 19.8751 6.54152 18.6373 4.54592C17.3574 2.48242 15.2231 1.25 12 1.25ZM13 9V5H11V9H13Z',
};

export const IconMouse09StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse09SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse09 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMouse09: TheIconSelfPack = [
  'Mouse09',
  IconMouse09StrokeRounded,
  IconMouse09DuotoneRounded,
  IconMouse09TwotoneRounded,
  IconMouse09SolidRounded,
  IconMouse09BulkRounded,
  IconMouse09StrokeSharp,
  IconMouse09SolidSharp,
];