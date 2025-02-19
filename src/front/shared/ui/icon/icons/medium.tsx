import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M1.25 12C1.25 9.10051 3.60051 6.75 6.5 6.75C9.3995 6.75 11.75 9.10051 11.75 12C11.75 14.8995 9.3995 17.25 6.5 17.25C3.60051 17.25 1.25 14.8995 1.25 12Z',
  d2: 'M13.0766 8.45379C13.5877 7.53379 14.4136 6.75 15.5 6.75C16.5864 6.75 17.4123 7.53379 17.9234 8.45379C18.4486 9.39919 18.75 10.6544 18.75 12C18.75 13.3456 18.4486 14.6008 17.9234 15.5462C17.4123 16.4662 16.5864 17.25 15.5 17.25C14.4136 17.25 13.5877 16.4662 13.0766 15.5462C12.5514 14.6008 12.25 13.3456 12.25 12C12.25 10.6544 12.5514 9.39919 13.0766 8.45379Z',
  d3: 'M20.2904 7.0397C20.4461 6.89634 20.6865 6.75 21 6.75C21.3135 6.75 21.5539 6.89634 21.7096 7.0397C21.8612 7.17937 21.9715 7.34929 22.0532 7.5048C22.2174 7.81737 22.3426 8.2204 22.4392 8.65532C22.6352 9.53733 22.75 10.7195 22.75 12C22.75 13.2805 22.6352 14.4627 22.4392 15.3447C22.3426 15.7796 22.2174 16.1826 22.0532 16.4952C21.9715 16.6507 21.8612 16.8206 21.7096 16.9603C21.5539 17.1037 21.3135 17.25 21 17.25C20.6865 17.25 20.4461 17.1037 20.2904 16.9603C20.1388 16.8206 20.0285 16.6507 19.9468 16.4952C19.7826 16.1826 19.6574 15.7796 19.5608 15.3447C19.3648 14.4627 19.25 13.2805 19.25 12C19.25 10.7195 19.3648 9.53733 19.5608 8.65532C19.6574 8.2204 19.7826 7.81737 19.9468 7.5048C20.0285 7.34929 20.1388 7.17937 20.2904 7.0397Z',
};

export const IconMediumStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-stroke-rounded IconMediumStrokeRounded"
    >
      <circle 
        cx="6.5" 
        cy="12" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <ellipse 
        cx="15.5" 
        cy="12" 
        rx="2.5" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <ellipse 
        cx="21" 
        cy="12" 
        rx="1" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
    </TheIconWrapper>
  );
};

export const IconMediumDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-duotone-rounded IconMediumDuotoneRounded"
    >
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="21" 
        cy="12" 
        rx="1" 
        ry="4.5" 
        fill="var(--icon-fill)"></ellipse>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="6.5" 
        cy="12" 
        r="4.5" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="6.5" 
        cy="12" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <ellipse 
        cx="15.5" 
        cy="12" 
        rx="2.5" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <ellipse 
        cx="21" 
        cy="12" 
        rx="1" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
    </TheIconWrapper>
  );
};

export const IconMediumTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-twotone-rounded IconMediumTwotoneRounded"
    >
      <circle 
        cx="6.5" 
        cy="12" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <ellipse 
        cx="15.5" 
        cy="12" 
        rx="2.5" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="21" 
        cy="12" 
        rx="1" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
    </TheIconWrapper>
  );
};

export const IconMediumSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-solid-rounded IconMediumSolidRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMediumBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-bulk-rounded IconMediumBulkRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMediumStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-stroke-sharp IconMediumStrokeSharp"
    >
      <circle 
        cx="6.5" 
        cy="12" 
        r="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <ellipse 
        cx="15.5" 
        cy="12" 
        rx="2.5" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <ellipse 
        cx="21" 
        cy="12" 
        rx="1" 
        ry="4.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
    </TheIconWrapper>
  );
};

export const IconMediumSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="medium-solid-sharp IconMediumSolidSharp"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMedium: TheIconSelfPack = {
  name: 'Medium',
  StrokeRounded: IconMediumStrokeRounded,
  DuotoneRounded: IconMediumDuotoneRounded,
  TwotoneRounded: IconMediumTwotoneRounded,
  SolidRounded: IconMediumSolidRounded,
  BulkRounded: IconMediumBulkRounded,
  StrokeSharp: IconMediumStrokeSharp,
  SolidSharp: IconMediumSolidSharp,
};