import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 2C6 3.80215 7.74439 3.5 9.00657 3.5C11.0476 3.5 11.9337 3.87677 12 6',
  d2: 'M12 22C17.2 22 18.5 18.392 18.5 14C18.5 9.60799 17.2 6 12 6C6.79994 6 5.5 9.60797 5.5 14C5.5 18.392 6.79994 22 12 22Z',
  d3: 'M12 9V11',
  d4: 'M6 1.25C6.41421 1.25 6.75 1.58579 6.75 2C6.75 2.32899 6.82789 2.46462 6.87391 2.52115C6.92282 2.58123 7.01466 2.64847 7.21333 2.69856C7.41864 2.75033 7.68052 2.76921 8.00394 2.76905C8.16246 2.76897 8.32397 2.76454 8.4939 2.75976L8.50622 2.75941C8.6686 2.75484 8.84046 2.75 9.00657 2.75C10.015 2.75 10.9851 2.82822 11.6906 3.35135C12.457 3.91966 12.7143 4.84306 12.7496 5.9766C12.7626 6.39061 12.4374 6.73671 12.0234 6.74963C11.6094 6.76256 11.2633 6.43741 11.2504 6.0234C11.2195 5.03371 11.0006 4.70711 10.7971 4.55623C10.5327 4.36016 10.0392 4.25 9.00657 4.25C8.86178 4.25 8.70801 4.25433 8.53763 4.25912L8.5361 4.25917C8.36904 4.26387 8.18719 4.26896 8.00468 4.26905C7.64604 4.26923 7.23517 4.25101 6.84661 4.15305C6.4514 4.0534 6.02826 3.85829 5.71066 3.46817C5.39016 3.07449 5.25 2.57208 5.25 2C5.25 1.58579 5.58579 1.25 6 1.25Z',
  d5: 'M12 5.25C9.20275 5.25 7.31874 6.23621 6.17746 7.93469C5.07617 9.57364 4.75 11.758 4.75 14C4.75 16.242 5.07617 18.4264 6.17746 20.0653C7.31874 21.7638 9.20274 22.75 12 22.75C14.7972 22.75 16.6812 21.7638 17.8225 20.0653C18.9238 18.4264 19.25 16.2419 19.25 14C19.25 11.7581 18.9238 9.57365 17.8225 7.93469C16.6812 6.23622 14.7972 5.25 12 5.25ZM13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V9Z',
  d6: 'M6.17746 7.93469C7.31874 6.23621 9.20275 5.25 12 5.25C14.7972 5.25 16.6812 6.23622 17.8225 7.93469C18.9238 9.57365 19.25 11.7581 19.25 14C19.25 16.2419 18.9238 18.4264 17.8225 20.0653C16.6812 21.7638 14.7972 22.75 12 22.75C9.20274 22.75 7.31874 21.7638 6.17746 20.0653C5.07617 18.4264 4.75 16.242 4.75 14C4.75 11.758 5.07617 9.57364 6.17746 7.93469Z',
  d7: 'M12 8C12.5523 8 13 8.44772 13 9V11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11V9C11 8.44772 11.4477 8 12 8Z',
  d8: 'M6 2V3.5H12V6',
  d9: 'M12 8V11',
  d10: 'M5.25 3.5V1.25H6.75V2.75H12C12.4142 2.75 12.75 3.08579 12.75 3.5V6H11.25V4.25H6C5.58579 4.25 5.25 3.91421 5.25 3.5Z',
  d11: 'M12 5.25C9.20275 5.25 7.31874 6.23621 6.17746 7.93469C5.07617 9.57364 4.75 11.758 4.75 14C4.75 16.242 5.07617 18.4264 6.17746 20.0653C7.31874 21.7638 9.20274 22.75 12 22.75C14.7972 22.75 16.6812 21.7638 17.8225 20.0653C18.9238 18.4264 19.25 16.2419 19.25 14C19.25 11.7581 18.9238 9.57365 17.8225 7.93469C16.6812 6.23622 14.7972 5.25 12 5.25ZM11 8V11H13V8H11Z',
};

export const IconMouse15StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouse15SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Mouse15 SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMouse15: TheIconSelfPack = [
  'Mouse15',
  IconMouse15StrokeRounded,
  IconMouse15DuotoneRounded,
  IconMouse15TwotoneRounded,
  IconMouse15SolidRounded,
  IconMouse15BulkRounded,
  IconMouse15StrokeSharp,
  IconMouse15SolidSharp,
];