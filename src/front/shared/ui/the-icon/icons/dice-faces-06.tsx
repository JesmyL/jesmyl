import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 21C15.7497 21 17.6246 21 18.9389 20.0451C19.3634 19.7367 19.7367 19.3634 20.0451 18.9389C21 17.6246 21 15.7497 21 12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95492C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95492 5.06107C3 6.3754 3 8.25027 3 12C3 15.7497 3 17.6246 3.95491 18.9389C4.26331 19.3634 4.6366 19.7367 5.06107 20.0451C6.3754 21 8.25027 21 12 21Z',
  d2: 'M9 12V12.01',
  d3: 'M15 7V7.01',
  d4: 'M9 17V17.01',
  d5: 'M9 7V7.01',
  d6: 'M15 17V17.01',
  d7: 'M15 12V12.01',
  d8: 'M12.0452 2.25C13.8818 2.24999 15.3214 2.24999 16.4635 2.37373C17.6291 2.50001 18.5734 2.76232 19.3798 3.34815C19.8679 3.70281 20.2972 4.13209 20.6518 4.62024C21.2377 5.42656 21.5 6.37094 21.6263 7.53648C21.75 8.6786 21.75 10.2087 21.75 12.0452V12.0453V12.0453C21.75 13.8818 21.75 15.3214 21.6263 16.4635C21.5 17.6291 21.2377 18.5734 20.6518 19.3798C20.2972 19.8679 19.8679 20.2972 19.3798 20.6518C18.5734 21.2377 17.6291 21.5 16.4635 21.6263C15.3214 21.75 13.8818 21.75 12.0453 21.75H12.0453H12.0452C10.2087 21.75 8.6786 21.75 7.53648 21.6263C6.37094 21.5 5.42656 21.2377 4.62024 20.6518C4.13209 20.2972 3.70281 19.8679 3.34815 19.3798C2.76232 18.5734 2.50001 17.6291 2.37373 16.4635C2.24999 15.3214 2.24999 13.8818 2.25 12.0453C2.24999 10.2087 2.24999 8.67861 2.37373 7.53648C2.50001 6.37094 2.76232 5.42656 3.34815 4.62024C3.70281 4.13209 4.13209 3.70281 4.62024 3.34815C5.42656 2.76232 6.37094 2.50001 7.53648 2.37373C8.67861 2.24999 10.2087 2.24999 12.0452 2.25ZM9 10.5C9.82843 10.5 10.5 11.1716 10.5 12V12.01C10.5 12.8384 9.82843 13.51 9 13.51C8.17157 13.51 7.5 12.8384 7.5 12.01V12C7.5 11.1716 8.17157 10.5 9 10.5ZM16.5 7C16.5 6.17157 15.8284 5.5 15 5.5C14.1716 5.5 13.5 6.17157 13.5 7V7.01C13.5 7.83843 14.1716 8.51 15 8.51C15.8284 8.51 16.5 7.83843 16.5 7.01V7ZM9 15.5C9.82843 15.5 10.5 16.1716 10.5 17V17.01C10.5 17.8384 9.82843 18.51 9 18.51C8.17157 18.51 7.5 17.8384 7.5 17.01V17C7.5 16.1716 8.17157 15.5 9 15.5ZM10.5 7C10.5 6.17157 9.82843 5.5 9 5.5C8.17157 5.5 7.5 6.17157 7.5 7V7.01C7.5 7.83843 8.17157 8.51 9 8.51C9.82843 8.51 10.5 7.83843 10.5 7.01V7ZM15 15.5C15.8284 15.5 16.5 16.1716 16.5 17V17.01C16.5 17.8384 15.8284 18.51 15 18.51C14.1716 18.51 13.5 17.8384 13.5 17.01V17C13.5 16.1716 14.1716 15.5 15 15.5ZM16.5 12C16.5 11.1716 15.8284 10.5 15 10.5C14.1716 10.5 13.5 11.1716 13.5 12V12.01C13.5 12.8384 14.1716 13.51 15 13.51C15.8284 13.51 16.5 12.8384 16.5 12.01V12Z',
  d9: 'M12.0452 2.25C13.8818 2.24999 15.3214 2.24999 16.4635 2.37373C17.6291 2.50001 18.5734 2.76232 19.3798 3.34815C19.8679 3.70281 20.2972 4.13209 20.6518 4.62024C21.2377 5.42656 21.5 6.37094 21.6263 7.53648C21.75 8.6786 21.75 10.2087 21.75 12.0452V12.0453V12.0453C21.75 13.8818 21.75 15.3214 21.6263 16.4635C21.5 17.6291 21.2377 18.5734 20.6518 19.3798C20.2972 19.8679 19.8679 20.2972 19.3798 20.6518C18.5734 21.2377 17.6291 21.5 16.4635 21.6263C15.3214 21.75 13.8818 21.75 12.0453 21.75H12.0453H12.0452C10.2087 21.75 8.6786 21.75 7.53648 21.6263C6.37094 21.5 5.42656 21.2377 4.62023 20.6518C4.13209 20.2972 3.70281 19.8679 3.34815 19.3798C2.76232 18.5734 2.50001 17.6291 2.37373 16.4635C2.24999 15.3214 2.24999 13.8818 2.25 12.0453C2.24999 10.2087 2.24999 8.67861 2.37373 7.53648C2.50001 6.37094 2.76232 5.42656 3.34815 4.62023C3.70281 4.13209 4.13209 3.70281 4.62024 3.34815C5.42656 2.76232 6.37094 2.50001 7.53648 2.37373C8.67861 2.24999 10.2087 2.24999 12.0452 2.25Z',
  d10: 'M9 10.5C9.82843 10.5 10.5 11.1716 10.5 12V12.01C10.5 12.8384 9.82843 13.51 9 13.51C8.17157 13.51 7.5 12.8384 7.5 12.01V12C7.5 11.1716 8.17157 10.5 9 10.5Z',
  d11: 'M15 5.5C15.8284 5.5 16.5 6.17157 16.5 7V7.01C16.5 7.83843 15.8284 8.51 15 8.51C14.1716 8.51 13.5 7.83843 13.5 7.01V7C13.5 6.17157 14.1716 5.5 15 5.5Z',
  d12: 'M9 15.5C9.82843 15.5 10.5 16.1716 10.5 17V17.01C10.5 17.8384 9.82843 18.51 9 18.51C8.17157 18.51 7.5 17.8384 7.5 17.01V17C7.5 16.1716 8.17157 15.5 9 15.5Z',
  d13: 'M9 5.5C9.82843 5.5 10.5 6.17157 10.5 7V7.01C10.5 7.83843 9.82843 8.51 9 8.51C8.17157 8.51 7.5 7.83843 7.5 7.01V7C7.5 6.17157 8.17157 5.5 9 5.5Z',
  d14: 'M15 15.5C15.8284 15.5 16.5 16.1716 16.5 17V17.01C16.5 17.8384 15.8284 18.51 15 18.51C14.1716 18.51 13.5 17.8384 13.5 17.01V17C13.5 16.1716 14.1716 15.5 15 15.5Z',
  d15: 'M15 10.5C15.8284 10.5 16.5 11.1716 16.5 12V12.01C16.5 12.8384 15.8284 13.51 15 13.51C14.1716 13.51 13.5 12.8384 13.5 12.01V12C13.5 11.1716 14.1716 10.5 15 10.5Z',
  d16: 'M21 3H3V21H21V3Z',
  d17: 'M2.25 2.25L21.75 2.25L21.75 21.75L2.25 21.75L2.25 2.25ZM10.5 10.5L10.5 13.51H7.5L7.5 10.5H10.5ZM16.5 8.51V5.5L13.5 5.5L13.5 8.51H16.5ZM10.5 15.5V18.51L7.5 18.51V15.5H10.5ZM10.5 8.51L10.5 5.5H7.5L7.5 8.51L10.5 8.51ZM16.5 15.5V18.51H13.5V15.5H16.5ZM16.5 13.51L16.5 10.5H13.5L13.5 13.51H16.5Z',
};

export const IconDiceFaces06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-stroke-rounded IconDiceFaces06StrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconDiceFaces06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-duotone-rounded IconDiceFaces06DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconDiceFaces06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-twotone-rounded IconDiceFaces06TwotoneRounded"
    >
      <path 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-solid-rounded IconDiceFaces06SolidRounded"
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

export const IconDiceFaces06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-bulk-rounded IconDiceFaces06BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-stroke-sharp IconDiceFaces06StrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiceFaces06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dice-faces-06-solid-sharp IconDiceFaces06SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDiceFaces06: TheIconSelfPack = {
  name: 'DiceFaces06',
  StrokeRounded: IconDiceFaces06StrokeRounded,
  DuotoneRounded: IconDiceFaces06DuotoneRounded,
  TwotoneRounded: IconDiceFaces06TwotoneRounded,
  SolidRounded: IconDiceFaces06SolidRounded,
  BulkRounded: IconDiceFaces06BulkRounded,
  StrokeSharp: IconDiceFaces06StrokeSharp,
  SolidSharp: IconDiceFaces06SolidSharp,
};