import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 16.584C10.6125 16.8516 11.2889 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12V20.6622C4.01099 18.9331 2 15.7014 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C11.3151 22 10.6462 21.9311 10 21.8',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z',
  d3: 'M7 20.6622C4.01099 18.9331 2 15.7014 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C11.3151 22 10.6462 21.9311 10 21.8',
  d4: 'M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C11.7415 15.75 11.4904 15.724 11.2487 15.675C10.5721 15.5376 9.91232 15.9748 9.77498 16.6513C9.63765 17.3279 10.0748 17.9877 10.7513 18.125C11.1558 18.2071 11.5736 18.25 12 18.25C15.4518 18.25 18.25 15.4518 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75C8.54822 5.75 5.75 8.54822 5.75 12L5.75 20.7474C3.02551 18.7973 1.25 15.606 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.6802 22.75 9.41588 22.5121 8.24767 22.077C8.24922 22.0515 8.25 22.0258 8.25 22V12Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d6: 'M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C11.7415 15.75 11.4904 15.724 11.2487 15.675C10.5721 15.5376 9.91232 15.9748 9.77498 16.6513C9.63765 17.3279 10.0748 17.9877 10.7513 18.125C11.1558 18.2071 11.5736 18.25 12 18.25C15.4518 18.25 18.25 15.4518 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75C8.54822 5.75 5.75 8.54822 5.75 12V20.7474C6.51401 21.2943 7.35264 21.7435 8.24767 22.077C8.24922 22.0515 8.25 22.0258 8.25 22V12Z',
  d7: 'M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C11.4293 16 10.889 15.8811 10.4004 15.6676V17.7841C10.9103 17.9249 11.447 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12V20.9211C3.13463 18.9902 1.25 15.7152 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.5863 22.75 9.2364 22.4771 8 21.9812V12Z',
};

export const IconPlaxoStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlaxoDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlaxoTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlaxoSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconPlaxoBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo BulkRounded"
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

export const IconPlaxoStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconPlaxoSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Plaxo SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlaxo: TheIconSelfPack = [
  'Plaxo',
  IconPlaxoStrokeRounded,
  IconPlaxoDuotoneRounded,
  IconPlaxoTwotoneRounded,
  IconPlaxoSolidRounded,
  IconPlaxoBulkRounded,
  IconPlaxoStrokeSharp,
  IconPlaxoSolidSharp,
];