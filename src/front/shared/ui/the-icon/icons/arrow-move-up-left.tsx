import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 21V18.9231C20 16.9221 20 15.9217 19.8547 15.0846C19.0547 10.4765 15.0934 6.86243 10.0426 6.13259C9.12509 6 7.19318 6 5 6',
  d2: 'M7 3C6.39316 3.58984 4 5.15973 4 6C4 6.84027 6.39316 8.41016 7 9',
  d3: 'M20 21V18.9231C20 16.9221 20 15.9217 19.8547 15.0846C19.0547 10.4765 15.0934 6.86243 10.0426 6.13259C9.12509 6 7.19318 6 5 6M7 3C6.39316 3.58984 4 5.15973 4 6C4 6.84027 6.39316 8.41016 7 9',
  d4: 'M20 22C20.5523 22 21 21.5523 21 21L21 18.7957C21.0001 16.9155 21.0001 15.8363 20.8399 14.9135C19.9572 9.82886 15.6121 5.927 10.1857 5.14287C9.67764 5.06946 8.91037 5.03375 7.99997 5.01639C7.99958 4.50287 7.99543 4.02991 7.95605 3.66125C7.92065 3.3298 7.8117 2.49957 7.12434 2.13765C6.44192 1.77835 5.83032 2.21463 5.58587 2.402C5.28839 2.63002 4.93593 2.98013 4.55929 3.35427L4.51352 3.39974C4.18398 3.72699 3.84245 4.0945 3.57595 4.46605C3.44219 4.65253 3.30836 4.86598 3.20433 5.09883C3.10358 5.32435 3 5.63611 3 6C3 6.36389 3.10358 6.67565 3.20433 6.90117C3.30836 7.13402 3.44219 7.34747 3.57594 7.53395C3.84245 7.90549 4.18398 8.27301 4.51351 8.60026L4.55928 8.64572C4.93593 9.01987 5.28838 9.36998 5.58587 9.598C5.83032 9.78537 6.44192 10.2217 7.12434 9.86235C7.8117 9.50044 7.92065 8.6702 7.95605 8.33875C7.99458 7.97803 7.99939 7.51747 7.99994 7.01675C8.83226 7.03252 9.48977 7.06308 9.89963 7.12231C14.5748 7.79787 18.1522 11.1241 18.8694 15.2556C18.9963 15.9865 19 16.8804 19 18.9231V21C19 21.5523 19.4477 22 20 22Z',
  d5: 'M20.0001 22C20.5523 22 21.0001 21.5523 21.0001 21L21.0001 18.7957C21.0001 16.9155 21.0002 15.8363 20.84 14.9135C19.9573 9.82886 15.6122 5.927 10.1857 5.14287C9.6777 5.06946 8.91043 5.03375 8.00003 5.01639L8 7.01675C8.83232 7.03252 9.48983 7.06308 9.89968 7.12231C14.5748 7.79787 18.1522 11.1241 18.8695 15.2556C18.9963 15.9865 19.0001 16.8804 19.0001 18.9231V21C19.0001 21.5523 19.4478 22 20.0001 22Z',
  d6: 'M5.58587 9.598C5.83032 9.78537 6.44192 10.2217 7.12434 9.86235C7.8117 9.50044 7.92065 8.6702 7.95605 8.33875C7.99458 7.97803 7.99942 5.51711 7.99997 5.01639C7.99958 4.50287 7.99543 4.02991 7.95605 3.66125C7.92065 3.3298 7.8117 2.49956 7.12434 2.13765C6.44192 1.77835 5.83032 2.21463 5.58587 2.402C5.28839 2.63002 4.93593 2.98013 4.55929 3.35427L4.51352 3.39974C4.18398 3.72699 3.84245 4.0945 3.57595 4.46605C3.44219 4.65253 3.30836 4.86598 3.20433 5.09883C3.10358 5.32435 3 5.63611 3 6C3 6.36389 3.10358 6.67565 3.20433 6.90117C3.30836 7.13402 3.44219 7.34747 3.57594 7.53395C3.84245 7.90549 4.18398 8.27301 4.51351 8.60026L4.55928 8.64572C4.93593 9.01987 5.28838 9.36998 5.58587 9.598Z',
  d7: 'M8.98267 10.941L5 6.97047L8.98267 3M19 21V7.08982C19 7.03447 18.955 6.97047 18.8995 6.97047H5.28991',
  d8: 'M7.82834 6.70724L10.1213 4.41419L8.70709 3L4 7.70723L8.7071 12.4143L10.1213 11.0001L7.82844 8.70724L18 8.70736L17.9999 21.0001H19.9999L20 7.70737C20 7.15508 19.5523 6.70737 19 6.70737L7.82834 6.70724Z',
};

export const IconArrowMoveUpLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveUpLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ArrowMoveUpLeft SolidSharp"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowMoveUpLeft: TheIconSelfPack = [
  'ArrowMoveUpLeft',
  IconArrowMoveUpLeftStrokeRounded,
  IconArrowMoveUpLeftDuotoneRounded,
  IconArrowMoveUpLeftTwotoneRounded,
  IconArrowMoveUpLeftSolidRounded,
  IconArrowMoveUpLeftBulkRounded,
  IconArrowMoveUpLeftStrokeSharp,
  IconArrowMoveUpLeftSolidSharp,
];