import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 13H20',
  d2: 'M4 19H20',
  d3: 'M4 6.927C6.66667 3.9281 9.33333 4.80578 12 7C14.6667 9.19422 17.3333 10.0719 20 7.073',
  d4: 'M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z',
  d5: 'M3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z',
  d6: 'M7.91124 6.01226C6.96629 5.92804 5.92409 6.26822 4.7473 7.59162C4.38031 8.00434 3.74823 8.0414 3.33551 7.67441C2.92279 7.30742 2.88573 6.67534 3.25272 6.26262C4.7426 4.58713 6.36706 3.8667 8.08879 4.02015C9.72713 4.16618 11.2543 5.0915 12.6354 6.22793C13.9209 7.28572 15.0605 7.89635 16.0888 7.988C17.0337 8.07222 18.0759 7.73204 19.2527 6.40863C19.6197 5.99592 20.2518 5.95885 20.6645 6.32584C21.0772 6.69284 21.1143 7.32492 20.7473 7.73763C19.2574 9.41313 17.633 10.1336 15.9112 9.9801C14.2729 9.83408 12.7457 8.90875 11.3646 7.77232C10.0791 6.71453 8.93956 6.10391 7.91124 6.01226Z',
  d7: 'M2.75 14C2.75 13.3096 3.30964 12.75 4 12.75H20C20.6904 12.75 21.25 13.3096 21.25 14C21.25 14.6904 20.6904 15.25 20 15.25H4C3.30964 15.25 2.75 14.6904 2.75 14Z',
  d8: 'M2.75 19C2.75 18.3096 3.30964 17.75 4 17.75H20C20.6904 17.75 21.25 18.3096 21.25 19C21.25 19.6904 20.6904 20.25 20 20.25H4C3.30964 20.25 2.75 19.6904 2.75 19Z',
  d9: 'M7.88904 6.26131C7.0412 6.18574 6.07178 6.47839 4.93412 7.75778C4.47538 8.27368 3.68528 8.32001 3.16939 7.86127C2.65349 7.40253 2.60716 6.61243 3.0659 6.09653C4.59491 4.37703 6.29216 3.60907 8.11098 3.77118C9.82558 3.92399 11.4012 4.88866 12.7942 6.03492C14.0678 7.08288 15.1589 7.65416 16.111 7.73902C16.9588 7.81459 17.9282 7.52194 19.0659 6.24254C19.5246 5.72665 20.3147 5.68032 20.8306 6.13906C21.3465 6.5978 21.3929 7.3879 20.9341 7.90379C19.4051 9.62329 17.7079 10.3913 15.889 10.2291C14.1744 10.0763 12.5988 9.11167 11.2058 7.96541C9.93218 6.91745 8.84112 6.34616 7.88904 6.26131Z',
  d10: 'M19.999 14H3.99902V12H19.999V14Z',
  d11: 'M19.999 20H3.99902V18H19.999V20Z',
  d12: 'M7.91047 6.01226C6.96552 5.92804 5.92332 6.26822 4.74653 7.59162L3.5 5.99377C4.92154 4.51023 6.46137 3.87518 8.08802 4.02015C9.72636 4.16618 11.2535 5.0915 12.6346 6.22793C13.9202 7.28572 15.0597 7.89635 16.088 7.988C17.033 8.07222 18.0752 7.73204 19.252 6.40863L20.5 8V8.0049C19.078 9.48958 17.5377 10.1251 15.9105 9.9801C14.2721 9.83408 12.745 8.90875 11.3639 7.77232C10.0783 6.71453 8.93879 6.10391 7.91047 6.01226Z',
};

export const IconCongruentToStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCongruentToDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCongruentToTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCongruentToSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCongruentToBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo BulkRounded"
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
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconCongruentToStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconCongruentToSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CongruentTo SolidSharp"
    >
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
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCongruentTo: TheIconSelfPack = [
  'CongruentTo',
  IconCongruentToStrokeRounded,
  IconCongruentToDuotoneRounded,
  IconCongruentToTwotoneRounded,
  IconCongruentToSolidRounded,
  IconCongruentToBulkRounded,
  IconCongruentToStrokeSharp,
  IconCongruentToSolidSharp,
];