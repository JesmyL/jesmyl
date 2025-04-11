import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 9V6M18.5 18.5L15 16M5.5 18.5L9 16',
  d2: 'M7.25 13.75C7.25 11.1266 9.37665 9 12 9C14.6234 9 16.75 11.1266 16.75 13.75C16.75 16.3734 14.6234 18.5 12 18.5C9.37665 18.5 7.25 16.3734 7.25 13.75Z',
  d3: 'M9.25 4C9.25 2.48122 10.4812 1.25 12 1.25C13.5188 1.25 14.75 2.48122 14.75 4C14.75 5.51878 13.5188 6.75 12 6.75C10.4812 6.75 9.25 5.51878 9.25 4Z',
  d4: 'M1.25 20C1.25 18.4812 2.48122 17.25 4 17.25C5.51878 17.25 6.75 18.4812 6.75 20C6.75 21.5188 5.51878 22.75 4 22.75C2.48122 22.75 1.25 21.5188 1.25 20Z',
  d5: 'M17.25 20C17.25 18.4812 18.4812 17.25 20 17.25C21.5188 17.25 22.75 18.4812 22.75 20C22.75 21.5188 21.5188 22.75 20 22.75C18.4812 22.75 17.25 21.5188 17.25 20Z',
  d6: 'M12.0001 5C12.5524 5 13.0001 5.44772 13.0001 6V10C13.0001 10.5523 12.5524 11 12.0001 11C11.4478 11 11.0001 10.5523 11.0001 10V6C11.0001 5.44772 11.4478 5 12.0001 5ZM9.81381 15.4188C10.1348 15.8682 10.0307 16.4927 9.58132 16.8137L6.08132 19.3137C5.6319 19.6347 5.00735 19.5307 4.68634 19.0812C4.36534 18.6318 4.46943 18.0073 4.91884 17.6863L8.41884 15.1863C8.86825 14.8653 9.4928 14.9693 9.81381 15.4188ZM14.1863 15.4188C14.5074 14.9693 15.1319 14.8653 15.5813 15.1863L19.0813 17.6863C19.5307 18.0073 19.6348 18.6318 19.3138 19.0812C18.9928 19.5307 18.3683 19.6347 17.9188 19.3137L14.4188 16.8137C13.9694 16.4927 13.8653 15.8682 14.1863 15.4188Z',
  d7: 'M8.87044 17.3223C8.36696 16.8807 7.95764 16.3344 7.6765 15.7173L5.16797 17.5091C5.79626 17.8039 6.29477 18.3295 6.55439 18.9766L8.87044 17.3223Z',
  d8: 'M16.3259 15.7173C16.0448 16.3344 15.6355 16.8807 15.132 17.3223L17.4479 18.9765C17.7075 18.3294 18.206 17.8039 18.8343 17.5091L16.3259 15.7173Z',
  d9: 'M11.0012 9.10546C11.3236 9.03637 11.6582 9 12.0012 9C12.3443 9 12.6788 9.03636 13.0012 9.10544V6.5625C12.6912 6.68356 12.3539 6.75 12.0011 6.75C11.6483 6.75 11.3111 6.68358 11.0012 6.56256V9.10546Z',
  d10: 'M7.25 13C7.25 10.3766 9.37665 8.25 12 8.25C14.6234 8.25 16.75 10.3766 16.75 13C16.75 15.6234 14.6234 17.75 12 17.75C9.37665 17.75 7.25 15.6234 7.25 13Z',
  d11: 'M13.0002 6V9H11.0002V6H13.0002ZM9.58142 16.8137L6.08142 19.3137L4.91895 17.6863L8.41895 15.1863L9.58142 16.8137ZM15.5814 15.1863L19.0814 17.6863L17.9189 19.3137L14.4189 16.8137L15.5814 15.1863Z',
};

export const IconMoleculesStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules StrokeRounded"
    >
      <circle 
        cx="12"
        cy="13"
        r="4"
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="4"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="4"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="20"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoleculesDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="13"
        r="4"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="13"
        r="4"
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="4"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="4"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="20"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoleculesTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="13"
        r="4"
        i-c="s sj sr sw"
      />
      <circle 
        cx="12"
        cy="4"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="4"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <circle 
        cx="20"
        cy="20"
        r="2"
        i-c="s sj sr sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoleculesSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMoleculesBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <g    i-c="o7">
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconMoleculesStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules StrokeSharp"
    >
      <circle 
        cx="12"
        cy="13"
        r="4"
        i-c="s sj sw"
      />
      <circle 
        cx="12"
        cy="4"
        r="2"
        i-c="s sj sw"
      />
      <circle 
        cx="4"
        cy="20"
        r="2"
        i-c="s sj sw"
      />
      <circle 
        cx="20"
        cy="20"
        r="2"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconMoleculesSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Molecules SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMolecules: TheIconSelfPack = [
  'Molecules',
  IconMoleculesStrokeRounded,
  IconMoleculesDuotoneRounded,
  IconMoleculesTwotoneRounded,
  IconMoleculesSolidRounded,
  IconMoleculesBulkRounded,
  IconMoleculesStrokeSharp,
  IconMoleculesSolidSharp,
];