import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.00781 4.99961C4.59743 4.39305 6.16671 2.00098 7.00666 2.00098C7.84661 2.00098 9.41589 4.39305 10.0055 4.99961M7.00666 2.84956V22',
  d2: 'M19.0023 13.9951C19.6088 14.5846 22.0011 16.1538 22.0011 16.9938C22.0011 17.8337 19.6088 19.4029 19.0023 19.9924M21.1906 16.994H1.99805',
  d3: 'M7.14194 22.0007V2.00195M2.00195 16.9735H21.861',
  d4: 'M4.15918 4.994C4.74377 4.38817 6.29968 1.99902 7.13247 1.99902C7.96526 1.99902 9.52117 4.38817 10.1058 4.994',
  d5: 'M19.0254 13.9785C19.6268 14.5673 21.9987 16.1346 21.9987 16.9735C21.9987 17.8124 19.6268 19.3797 19.0254 19.9685',
  d6: 'M2 16.9659H22M22 16.9659C22 16.13 19.6068 14.5682 19 13.9814M22 16.9659C22 17.8018 19.6068 19.3636 19 19.9504',
  d7: 'M6.99978 21.9769L6.9997 2.0226M6.9997 2.0226C6.15942 2.01674 4.57281 4.38655 3.97877 4.98609M6.9997 2.0226C7.83998 2.02845 9.39309 4.42012 9.97863 5.02787',
  d8: 'M19.6477 13.3372C19.3507 13.0485 18.8759 13.0552 18.5872 13.3523C18.4431 13.5005 18.3726 13.693 18.3751 13.8846V15.875H2.125C1.57272 15.875 1.125 16.3227 1.125 16.875C1.125 17.4273 1.57272 17.875 2.125 17.875L18.3751 17.875V19.8654C18.3726 20.057 18.4431 20.2495 18.5872 20.3977C18.8759 20.6948 19.3507 20.7015 19.6477 20.4128C19.7643 20.2995 21.0144 19.2949 21.3374 19.0411C21.6842 18.7473 22.039 18.4228 22.3126 18.1016C22.4496 17.9407 22.5816 17.763 22.6823 17.5748C22.7797 17.3926 22.875 17.1508 22.875 16.875C22.875 16.5992 22.7797 16.3574 22.6823 16.1752C22.5816 15.987 22.4496 15.8093 22.3126 15.6484C22.039 15.3272 21.6842 15.0027 21.3374 14.7089C21.0144 14.4551 19.7643 13.4505 19.6477 13.3372Z',
  d9: 'M3.58719 4.35226C3.29849 4.64928 3.30523 5.12411 3.60226 5.41281C3.7505 5.5569 3.94303 5.6274 4.13461 5.62494L6.125 5.62494L6.125 21.875C6.125 22.4273 6.57271 22.875 7.125 22.875C7.67728 22.875 8.125 22.4273 8.125 21.875L8.125 5.62494L10.1154 5.62494C10.307 5.6274 10.4995 5.5569 10.6477 5.41281C10.9448 5.12411 10.9515 4.64928 10.6628 4.35226C10.5495 4.23571 9.54485 2.98562 9.29112 2.66258C8.99731 2.31584 8.67283 1.96103 8.35159 1.68744C8.19067 1.55038 8.01298 1.41843 7.82484 1.31775C7.64265 1.22025 7.40079 1.125 7.125 1.125C6.84921 1.125 6.60735 1.22025 6.42516 1.31775C6.23702 1.41843 6.05933 1.55038 5.8984 1.68744C5.57717 1.96103 5.25269 2.31584 4.95888 2.66258C4.70515 2.98562 3.70047 4.23571 3.58719 4.35226Z',
  d10: 'M4 5L7 2L10 5',
  d11: 'M19 14L22 17L19 20',
  d12: 'M1.99902 16.9897H7.0082M7.0082 16.9897H21.6357M7.0082 16.9897V21.9951M7.0082 16.9897V2.37012',
  d13: 'M10.2072 5.20711L6.50007 1.5L2.79297 5.20711L4.20718 6.62132L5.5 5.3285L5.5 22.5H7.5L7.5 5.32835L8.79297 6.62132L10.2072 5.20711Z',
  d14: 'M18.7929 13.793L17.3787 15.2072L18.6715 16.5L1.5 16.5V18.5L18.6716 18.5L17.3787 19.793L18.7929 21.2072L22.5 17.5001L18.7929 13.793Z',
};

export const IconCoordinate01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-stroke-rounded IconCoordinate01StrokeRounded"
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

export const IconCoordinate01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-duotone-rounded IconCoordinate01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-twotone-rounded IconCoordinate01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-solid-rounded IconCoordinate01SolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-bulk-rounded IconCoordinate01BulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-stroke-sharp IconCoordinate01StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoordinate01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coordinate-01-solid-sharp IconCoordinate01SolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCoordinate01: TheIconSelfPack = {
  name: 'Coordinate01',
  StrokeRounded: IconCoordinate01StrokeRounded,
  DuotoneRounded: IconCoordinate01DuotoneRounded,
  TwotoneRounded: IconCoordinate01TwotoneRounded,
  SolidRounded: IconCoordinate01SolidRounded,
  BulkRounded: IconCoordinate01BulkRounded,
  StrokeSharp: IconCoordinate01StrokeSharp,
  SolidSharp: IconCoordinate01SolidSharp,
};