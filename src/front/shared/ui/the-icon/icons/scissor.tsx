import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z',
  d2: 'M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z',
  d3: 'M15 8L3 19',
  d4: 'M15.0003 16L11 12',
  d5: 'M3 4.99999L8.5 9.99988',
  d6: 'M15.0003 16L11 12M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z',
  d7: 'M17.75 4.25C16.6454 4.25 15.75 5.14543 15.75 6.25C15.75 7.35457 16.6454 8.25 17.75 8.25C18.8546 8.25 19.75 7.35457 19.75 6.25C19.75 5.14543 18.8546 4.25 17.75 4.25ZM13.75 6.25C13.75 4.04086 15.5409 2.25 17.75 2.25C19.9591 2.25 21.75 4.04086 21.75 6.25C21.75 8.45914 19.9591 10.25 17.75 10.25C15.5409 10.25 13.75 8.45914 13.75 6.25Z',
  d8: 'M17.75 15.75C16.6454 15.75 15.75 16.6454 15.75 17.75C15.75 18.8546 16.6454 19.75 17.75 19.75C18.8546 19.75 19.75 18.8546 19.75 17.75C19.75 16.6454 18.8546 15.75 17.75 15.75ZM13.75 17.75C13.75 15.5409 15.5409 13.75 17.75 13.75C19.9591 13.75 21.75 15.5409 21.75 17.75C21.75 19.9591 19.9591 21.75 17.75 21.75C15.5409 21.75 13.75 19.9591 13.75 17.75Z',
  d9: 'M2.51006 4.32734C2.88156 3.91868 3.51401 3.88856 3.92267 4.26006L9.42267 9.25995C9.83133 9.63145 9.86146 10.2639 9.48995 10.6726C9.11845 11.0812 8.486 11.1113 8.07734 10.7398L2.57734 5.73995C2.16868 5.36845 2.13856 4.736 2.51006 4.32734ZM15.9872 7.32428C16.3604 7.7314 16.3329 8.36397 15.9257 8.73716L12.5217 11.8575L15.9573 15.2929C16.3479 15.6834 16.3479 16.3166 15.9574 16.7071C15.5669 17.0976 14.9337 17.0976 14.5432 16.7071L11.046 13.2102L3.92573 19.7372C3.51861 20.1104 2.88605 20.0829 2.51285 19.6757C2.13966 19.2686 2.16716 18.636 2.57428 18.2629L14.5743 7.26285C14.9814 6.88966 15.614 6.91716 15.9872 7.32428Z',
  d10: 'M2.51006 4.32734C2.88156 3.91868 3.51401 3.88856 3.92267 4.26006L9.42267 9.25995C9.83133 9.63145 9.86146 10.2639 9.48995 10.6726C9.11845 11.0812 8.486 11.1113 8.07734 10.7398L2.57734 5.73995C2.16868 5.36845 2.13856 4.736 2.51006 4.32734Z',
  d11: 'M12.5217 11.8575L15.9573 15.2929C16.3479 15.6834 16.3479 16.3166 15.9574 16.7071C15.5669 17.0976 14.9337 17.0976 14.5432 16.7071L11.046 13.2102L12.5217 11.8575Z',
  d12: 'M15.75 6.25C15.75 5.14543 16.6454 4.25 17.75 4.25C18.8546 4.25 19.75 5.14543 19.75 6.25C19.75 7.35457 18.8546 8.25 17.75 8.25C16.6454 8.25 15.75 7.35457 15.75 6.25ZM17.75 2.25C15.5409 2.25 13.75 4.04086 13.75 6.25C13.75 6.78098 13.8535 7.2878 14.0413 7.7514L2.57428 18.2629C2.16716 18.636 2.13966 19.2686 2.51285 19.6757C2.88604 20.0828 3.51861 20.1104 3.92573 19.7372L15.2406 9.36516C15.9269 9.91864 16.7997 10.25 17.75 10.25C19.9591 10.25 21.75 8.45914 21.75 6.25C21.75 4.04086 19.9591 2.25 17.75 2.25Z',
  d13: 'M17.999 4C16.8945 4 15.999 4.89543 15.999 6C15.999 7.10457 16.8945 8 17.999 8C19.1036 8 19.999 7.10457 19.999 6C19.999 4.89543 19.1036 4 17.999 4ZM13.999 6C13.999 3.79086 15.7899 2 17.999 2C20.2082 2 21.999 3.79086 21.999 6C21.999 8.20914 20.2082 10 17.999 10C15.7899 10 13.999 8.20914 13.999 6Z',
  d14: 'M17.999 16C16.8945 16 15.999 16.8954 15.999 18C15.999 19.1046 16.8945 20 17.999 20C19.1036 20 19.999 19.1046 19.999 18C19.999 16.8954 19.1036 16 17.999 16ZM13.999 18C13.999 15.7909 15.7899 14 17.999 14C20.2082 14 21.999 15.7909 21.999 18C21.999 20.2091 20.2082 22 17.999 22C15.7899 22 13.999 20.2091 13.999 18Z',
  d15: 'M7.82738 10.7399L2.00391 5.73997L3.34924 4.26007L9.17271 9.25996L7.82738 10.7399Z',
  d16: 'M2 18.2629L14.3235 7.26286L15.6749 8.73717L12.271 11.8574L15.7066 15.2929L14.2925 16.7071L10.7953 13.2102L3.35145 19.7372L2 18.2629Z',
};

export const IconScissorStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
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
    </TheIconWrapper>
  );
};

export const IconScissorDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
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
    </TheIconWrapper>
  );
};

export const IconScissorTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconScissorSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconScissorBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconScissorStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconScissorSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Scissor SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="f"
      />
      <path 
        d={d.d16}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfScissor: TheIconSelfPack = [
  'Scissor',
  IconScissorStrokeRounded,
  IconScissorDuotoneRounded,
  IconScissorTwotoneRounded,
  IconScissorSolidRounded,
  IconScissorBulkRounded,
  IconScissorStrokeSharp,
  IconScissorSolidSharp,
];