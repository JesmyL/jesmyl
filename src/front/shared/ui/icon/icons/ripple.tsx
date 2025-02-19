import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2C6.47716 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z',
  d2: 'M6.5 13.5C6.5 15.1569 7.84315 16.5 9.5 16.5C10.5435 16.5 11.4625 15.9672 12 15.1589C12.5375 15.9672 13.4565 16.5 14.5 16.5C16.1569 16.5 17.5 15.1569 17.5 13.5C17.5 11.9523 16.328 10.6784 14.8232 10.5172C14.9376 10.1996 15 9.85707 15 9.5C15 7.84314 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84314 9 9.5C9 9.85707 9.06238 10.1996 9.17684 10.5172C7.67196 10.6784 6.5 11.9523 6.5 13.5Z',
  d3: 'M2 12C2 6.47715 6.47716 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.5 16.5C7.84315 16.5 6.5 15.1569 6.5 13.5C6.5 11.9523 7.67196 10.6784 9.17684 10.5172C9.06238 10.1996 9 9.85707 9 9.5C9 7.84314 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84314 15 9.5C15 9.85707 14.9376 10.1996 14.8232 10.5172C16.328 10.6784 17.5 11.9523 17.5 13.5C17.5 15.1569 16.1569 16.5 14.5 16.5C13.4565 16.5 12.5375 15.9672 12 15.1589C11.4625 15.9672 10.5435 16.5 9.5 16.5Z',
  d4: 'M12 1.25C6.06294 1.25 1.25 6.06293 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 5.75C9.92893 5.75 8.25 7.42893 8.25 9.5C8.25 9.6535 8.25926 9.80503 8.27728 9.95403C6.80636 10.4612 5.75 11.8569 5.75 13.5C5.75 15.5711 7.42893 17.25 9.5 17.25C10.4608 17.25 11.337 16.8883 12 16.295C12.663 16.8883 13.5392 17.25 14.5 17.25C16.5711 17.25 18.25 15.5711 18.25 13.5C18.25 11.8569 17.1936 10.4612 15.7227 9.95403C15.7407 9.80504 15.75 9.6535 15.75 9.5C15.75 7.42893 14.0711 5.75 12 5.75Z',
  d5: 'M1.25 12C1.25 6.06293 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M8.25 9.5C8.25 7.42893 9.92893 5.75 12 5.75C14.0711 5.75 15.75 7.42893 15.75 9.5C15.75 9.6535 15.7407 9.80504 15.7227 9.95403C17.1936 10.4612 18.25 11.8569 18.25 13.5C18.25 15.5711 16.5711 17.25 14.5 17.25C13.5392 17.25 12.663 16.8883 12 16.295C11.337 16.8883 10.4608 17.25 9.5 17.25C7.42893 17.25 5.75 15.5711 5.75 13.5C5.75 11.8569 6.80636 10.4612 8.27728 9.95403C8.25926 9.80504 8.25 9.6535 8.25 9.5Z',
  d7: 'M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06293 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06293 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75ZM12 5.75C9.92893 5.75 8.25 7.42893 8.25 9.5C8.25 9.6535 8.25926 9.80503 8.27728 9.95403C6.80636 10.4612 5.75 11.8569 5.75 13.5C5.75 15.5711 7.42893 17.25 9.5 17.25C10.4608 17.25 11.337 16.8883 12 16.295C12.663 16.8883 13.5392 17.25 14.5 17.25C16.5711 17.25 18.25 15.5711 18.25 13.5C18.25 11.8569 17.1936 10.4612 15.7227 9.95403C15.7407 9.80504 15.75 9.6535 15.75 9.5C15.75 7.42893 14.0711 5.75 12 5.75Z',
};

export const IconRippleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-stroke-rounded IconRippleStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconRippleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-duotone-rounded IconRippleDuotoneRounded"
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

export const IconRippleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-twotone-rounded IconRippleTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconRippleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-solid-rounded IconRippleSolidRounded"
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

export const IconRippleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-bulk-rounded IconRippleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRippleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-stroke-sharp IconRippleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRippleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ripple-solid-sharp IconRippleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRipple: TheIconSelfPack = {
  name: 'Ripple',
  StrokeRounded: IconRippleStrokeRounded,
  DuotoneRounded: IconRippleDuotoneRounded,
  TwotoneRounded: IconRippleTwotoneRounded,
  SolidRounded: IconRippleSolidRounded,
  BulkRounded: IconRippleBulkRounded,
  StrokeSharp: IconRippleStrokeSharp,
  SolidSharp: IconRippleSolidSharp,
};