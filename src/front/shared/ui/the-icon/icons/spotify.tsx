import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 12.0685C8.59944 11.6998 9.77639 11.5 11 11.5C13.0238 11.5 14.9199 12.0465 16.5488 13M18 10C16.1509 8.7383 13.9122 8 11.5 8C9.90307 8 8.38216 8.32358 7 8.90839M15.129 16C13.8927 15.3609 12.4894 15 11.0018 15C10.1819 15 9.38762 15.1096 8.63281 15.315',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.29245 9.59911C8.58373 9.05275 10.0054 8.75 11.5002 8.75C13.7571 8.75 15.8493 9.44029 17.5775 10.6195C17.9196 10.853 18.3863 10.7649 18.6197 10.4227C18.8532 10.0806 18.7651 9.61394 18.4229 9.38048C16.453 8.03631 14.0676 7.25 11.5002 7.25C9.80114 7.25 8.18097 7.59442 6.70794 8.21768C6.32647 8.37908 6.14807 8.81917 6.30948 9.20064C6.47088 9.58212 6.91097 9.76051 7.29245 9.59911ZM7.73868 12.7796C8.76224 12.4363 9.85869 12.25 11.0002 12.25C12.8872 12.25 14.653 12.7592 16.1701 13.6473C16.5276 13.8565 16.987 13.7364 17.1963 13.3789C17.4055 13.0214 17.2853 12.562 16.9279 12.3527C15.1871 11.3338 13.1607 10.75 11.0002 10.75C9.69447 10.75 8.43703 10.9633 7.26171 11.3574C6.869 11.4892 6.65741 11.9143 6.78912 12.307C6.92083 12.6997 7.34596 12.9113 7.73868 12.7796ZM8.82994 16.0387C9.52115 15.8506 10.2492 15.75 11.002 15.75C12.367 15.75 13.6525 16.0809 14.7847 16.6662C15.1527 16.8565 15.6052 16.7124 15.7954 16.3444C15.9856 15.9765 15.8415 15.524 15.4736 15.3338C14.1334 14.6409 12.6122 14.25 11.002 14.25C10.115 14.25 9.25447 14.3686 8.43607 14.5913C8.0364 14.7001 7.80056 15.1123 7.90932 15.512C8.01809 15.9116 8.43026 16.1475 8.82994 16.0387Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M11.5002 8.75C10.0054 8.75 8.58373 9.05275 7.29245 9.59911C6.91097 9.76051 6.47088 9.58212 6.30948 9.20064C6.14807 8.81917 6.32647 8.37908 6.70794 8.21768C8.18097 7.59442 9.80114 7.25 11.5002 7.25C14.0676 7.25 16.453 8.03632 18.4229 9.38048C18.7651 9.61394 18.8532 10.0806 18.6197 10.4227C18.3863 10.7649 17.9196 10.853 17.5775 10.6195C15.8493 9.44029 13.7571 8.75 11.5002 8.75ZM11.0002 12.25C9.85869 12.25 8.76224 12.4363 7.73868 12.7796C7.34596 12.9113 6.92083 12.6997 6.78912 12.307C6.65741 11.9143 6.869 11.4892 7.26171 11.3574C8.43703 10.9633 9.69447 10.75 11.0002 10.75C13.1607 10.75 15.1871 11.3338 16.9279 12.3527C17.2853 12.562 17.4055 13.0214 17.1963 13.3789C16.987 13.7364 16.5276 13.8565 16.1701 13.6473C14.653 12.7592 12.8872 12.25 11.0002 12.25ZM11.002 15.75C10.2492 15.75 9.52115 15.8506 8.82994 16.0387C8.43026 16.1475 8.01809 15.9116 7.90932 15.512C7.80056 15.1123 8.0364 14.7001 8.43607 14.5913C9.25448 14.3686 10.115 14.25 11.002 14.25C12.6122 14.25 14.1334 14.6409 15.4736 15.3338C15.8415 15.524 15.9856 15.9765 15.7954 16.3444C15.6052 16.7124 15.1527 16.8565 14.7847 16.6662C13.6525 16.0809 12.367 15.75 11.002 15.75Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.29153 9.59911C8.58282 9.05275 10.0045 8.75 11.4993 8.75C13.7562 8.75 15.8483 9.44029 17.5766 10.6195L18.422 9.38048C16.4521 8.03631 14.0667 7.25 11.4993 7.25C9.80022 7.25 8.18006 7.59442 6.70703 8.21768L7.29153 9.59911ZM7.73776 12.7796C8.76133 12.4363 9.85778 12.25 10.9993 12.25C12.8863 12.25 14.6521 12.7592 16.1692 13.6473L16.927 12.3527C15.1862 11.3338 13.1598 10.75 10.9993 10.75C9.69356 10.75 8.43612 10.9633 7.2608 11.3574L7.73776 12.7796ZM8.82903 16.0387C9.52024 15.8506 10.2483 15.75 11.001 15.75C12.366 15.75 13.6516 16.0809 14.7838 16.6662L15.4727 15.3338C14.1325 14.6409 12.6113 14.25 11.001 14.25C10.114 14.25 9.25356 14.3686 8.43516 14.5913L8.82903 16.0387Z',
};

export const IconSpotifyStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifyDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifyTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifyBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifyStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconSpotifySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Spotify SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSpotify: TheIconSelfPack = [
  'Spotify',
  IconSpotifyStrokeRounded,
  IconSpotifyDuotoneRounded,
  IconSpotifyTwotoneRounded,
  IconSpotifySolidRounded,
  IconSpotifyBulkRounded,
  IconSpotifyStrokeSharp,
  IconSpotifySolidSharp,
];