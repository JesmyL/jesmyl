import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 21C15.7497 21 17.6246 21 18.9389 20.0451C19.3634 19.7367 19.7367 19.3634 20.0451 18.9389C21 17.6246 21 15.7497 21 12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95492C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95492 5.06107C3 6.3754 3 8.25027 3 12C3 15.7497 3 17.6246 3.95491 18.9389C4.26331 19.3634 4.6366 19.7367 5.06107 20.0451C6.3754 21 8.25027 21 12 21Z',
  d2: 'M12 12V12.01',
  d3: 'M16 8V8.01',
  d4: 'M8 16V16.01',
  d5: 'M8 8V8.01',
  d6: 'M16 16V16.01',
  d7: 'M16.4635 2.37373C15.3214 2.24999 13.8818 2.24999 12.0452 2.25C10.2087 2.24999 8.67861 2.24999 7.53648 2.37373C6.37094 2.50001 5.42656 2.76232 4.62024 3.34815C4.13209 3.70281 3.70281 4.13209 3.34815 4.62024C2.76232 5.42656 2.50001 6.37094 2.37373 7.53648C2.24999 8.67861 2.24999 10.2087 2.25 12.0453C2.24999 13.8818 2.24999 15.3214 2.37373 16.4635C2.50001 17.6291 2.76232 18.5734 3.34815 19.3798C3.70281 19.8679 4.13209 20.2972 4.62024 20.6518C5.42656 21.2377 6.37094 21.5 7.53648 21.6263C8.6786 21.75 10.2087 21.75 12.0452 21.75H12.0453H12.0453C13.8818 21.75 15.3214 21.75 16.4635 21.6263C17.6291 21.5 18.5734 21.2377 19.3798 20.6518C19.8679 20.2972 20.2972 19.8679 20.6518 19.3798C21.2377 18.5734 21.5 17.6291 21.6263 16.4635C21.75 15.3214 21.75 13.8818 21.75 12.0453V12.0453V12.0452C21.75 10.2087 21.75 8.6786 21.6263 7.53648C21.5 6.37094 21.2377 5.42656 20.6518 4.62024C20.2972 4.13209 19.8679 3.70281 19.3798 3.34815C18.5734 2.76232 17.6291 2.50001 16.4635 2.37373ZM13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12V12.01C10.5 12.8384 11.1716 13.51 12 13.51C12.8284 13.51 13.5 12.8384 13.5 12.01V12ZM16 6.5C16.8284 6.5 17.5 7.17157 17.5 8V8.01C17.5 8.83843 16.8284 9.51 16 9.51C15.1716 9.51 14.5 8.83843 14.5 8.01V8C14.5 7.17157 15.1716 6.5 16 6.5ZM9.5 16C9.5 15.1716 8.82843 14.5 8 14.5C7.17157 14.5 6.5 15.1716 6.5 16V16.01C6.5 16.8384 7.17157 17.51 8 17.51C8.82843 17.51 9.5 16.8384 9.5 16.01V16ZM8 6.5C8.82843 6.5 9.5 7.17157 9.5 8V8.01C9.5 8.83843 8.82843 9.51 8 9.51C7.17157 9.51 6.5 8.83843 6.5 8.01V8C6.5 7.17157 7.17157 6.5 8 6.5ZM17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16V16.01C14.5 16.8384 15.1716 17.51 16 17.51C16.8284 17.51 17.5 16.8384 17.5 16.01V16Z',
  d8: 'M12.0452 2.25C13.8818 2.24999 15.3214 2.24999 16.4635 2.37373C17.6291 2.50001 18.5734 2.76232 19.3798 3.34815C19.8679 3.70281 20.2972 4.13209 20.6518 4.62024C21.2377 5.42656 21.5 6.37094 21.6263 7.53648C21.75 8.6786 21.75 10.2087 21.75 12.0452V12.0453V12.0453C21.75 13.8818 21.75 15.3214 21.6263 16.4635C21.5 17.6291 21.2377 18.5734 20.6518 19.3798C20.2972 19.8679 19.8679 20.2972 19.3798 20.6518C18.5734 21.2377 17.6291 21.5 16.4635 21.6263C15.3214 21.75 13.8818 21.75 12.0453 21.75H12.0453H12.0452C10.2087 21.75 8.6786 21.75 7.53648 21.6263C6.37094 21.5 5.42656 21.2377 4.62023 20.6518C4.13209 20.2972 3.70281 19.8679 3.34815 19.3798C2.76232 18.5734 2.50001 17.6291 2.37373 16.4635C2.24999 15.3214 2.24999 13.8818 2.25 12.0453C2.24999 10.2087 2.24999 8.67861 2.37373 7.53648C2.50001 6.37094 2.76232 5.42656 3.34815 4.62023C3.70281 4.13209 4.13209 3.70281 4.62024 3.34815C5.42656 2.76232 6.37094 2.50001 7.53648 2.37373C8.67861 2.24999 10.2087 2.24999 12.0452 2.25Z',
  d9: 'M12 10.5C12.8284 10.5 13.5 11.1716 13.5 12V12.01C13.5 12.8384 12.8284 13.51 12 13.51C11.1716 13.51 10.5 12.8384 10.5 12.01V12C10.5 11.1716 11.1716 10.5 12 10.5Z',
  d10: 'M16 6.5C16.8284 6.5 17.5 7.17157 17.5 8V8.01C17.5 8.83843 16.8284 9.51 16 9.51C15.1716 9.51 14.5 8.83843 14.5 8.01V8C14.5 7.17157 15.1716 6.5 16 6.5Z',
  d11: 'M8 14.5C8.82843 14.5 9.5 15.1716 9.5 16V16.01C9.5 16.8384 8.82843 17.51 8 17.51C7.17157 17.51 6.5 16.8384 6.5 16.01V16C6.5 15.1716 7.17157 14.5 8 14.5Z',
  d12: 'M8 6.5C8.82843 6.5 9.5 7.17157 9.5 8V8.01C9.5 8.83843 8.82843 9.51 8 9.51C7.17157 9.51 6.5 8.83843 6.5 8.01V8C6.5 7.17157 7.17157 6.5 8 6.5Z',
  d13: 'M16 14.5C16.8284 14.5 17.5 15.1716 17.5 16V16.01C17.5 16.8384 16.8284 17.51 16 17.51C15.1716 17.51 14.5 16.8384 14.5 16.01V16C14.5 15.1716 15.1716 14.5 16 14.5Z',
  d14: 'M21 3H3V21H21V3Z',
  d15: 'M21.75 2.25L2.25 2.25L2.25 21.75L21.75 21.75L21.75 2.25ZM13.5 13.51L13.5 10.5L10.5 10.5L10.5 13.51L13.5 13.51ZM17.5 6.5V9.51H14.5V6.5L17.5 6.5ZM9.5 17.51V14.5H6.5L6.5 17.51H9.5ZM9.5 6.5L9.5 9.51L6.5 9.51L6.5 6.5L9.5 6.5ZM17.5 17.51V14.5H14.5V17.51H17.5Z',
};

export const IconDiceFaces05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 StrokeSharp"
    >
      <path 
        d={d.d2}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d5}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d6}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d14}
        i-c="s ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DiceFaces05 SolidSharp"
    >
      <path 
        d={d.d15}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDiceFaces05: TheIconSelfPack = [
  'DiceFaces05',
  IconDiceFaces05StrokeRounded,
  IconDiceFaces05DuotoneRounded,
  IconDiceFaces05TwotoneRounded,
  IconDiceFaces05SolidRounded,
  IconDiceFaces05BulkRounded,
  IconDiceFaces05StrokeSharp,
  IconDiceFaces05SolidSharp,
];