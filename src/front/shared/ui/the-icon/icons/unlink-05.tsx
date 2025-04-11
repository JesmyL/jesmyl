import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H13.5M10.5 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H10.5',
  d2: 'M15.5 21L14 19.5M8.5 21L10 19.5M8.5 3L10 4.5M15.5 3L14 4.5',
  d3: 'M13.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H13.5H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H13.5Z',
  d4: 'M7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H7C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H7ZM13 7C13 6.44772 13.4477 6 14 6H17C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8H14C13.4477 8 13 7.55228 13 7Z',
  d5: 'M16 22L14 19.5M8 22L10 19.5M8 2L10 4.5M16 2L14 4.5',
  d6: 'M7 8.01306C4.79086 8.01306 3 9.80392 3 12.0131C3 14.2222 4.79086 16.0131 7 16.0131H10.5V18.0131H7C3.68629 18.0131 1 15.3268 1 12.0131C1 8.69935 3.68629 6.01306 7 6.01306H10.5V8.01306H7ZM17 8.01306H13.5V6.01306H17C20.3137 6.01306 23 8.69935 23 12.0131C23 15.3268 20.3137 18.0131 17 18.0131H13.5V16.0131H17C19.2091 16.0131 21 14.2222 21 12.0131C21 9.80392 19.2091 8.01306 17 8.01306Z',
  d7: 'M9.21875 4.74714L7.21875 2.24864L8.78049 1L10.7805 3.4985L9.21875 4.74714ZM13.2188 3.4985L15.2188 1L16.7805 2.24864L14.7805 4.74715L13.2188 3.4985ZM10.7805 20.5015L8.78049 23L7.21875 21.7514L9.21875 19.2529L10.7805 20.5015ZM14.7805 19.2529L16.7805 21.7514L15.2188 23L13.2188 20.5015L14.7805 19.2529Z',
};

export const IconUnlink05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconUnlink05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Unlink05 SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUnlink05: TheIconSelfPack = [
  'Unlink05',
  IconUnlink05StrokeRounded,
  IconUnlink05DuotoneRounded,
  IconUnlink05TwotoneRounded,
  IconUnlink05SolidRounded,
  IconUnlink05BulkRounded,
  IconUnlink05StrokeSharp,
  IconUnlink05SolidSharp,
];