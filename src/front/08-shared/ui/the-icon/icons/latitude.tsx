import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d2: 'M22 12L2 12',
  d3: 'M20 7L4 7',
  d4: 'M20 17L4 17',
  d5: 'M22 12C22 10.1786 21.513 8.47087 20.6622 7H3.33784C2.48698 8.47087 2 10.1786 2 12C2 13.8214 2.48697 15.5291 3.33783 17H20.6622C21.513 15.5291 22 13.8214 22 12Z',
  d6: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17C5.06687 19.989 8.29859 22 12 22C15.7014 22 18.9331 19.989 20.6622 17C21.513 15.5291 22 13.8214 22 12Z',
  d7: 'M1.86783 13C1.55669 13 1.40113 13 1.31132 13.1049C1.22152 13.2097 1.24453 13.3576 1.29054 13.6533C1.39626 14.3327 1.5661 14.991 1.79373 15.6221C1.85838 15.8014 1.89071 15.891 1.96831 15.9455C2.04591 16 2.14487 16 2.34279 16H21.6575C21.8555 16 21.9544 16 22.032 15.9455C22.1096 15.891 22.1419 15.8014 22.2066 15.6221C22.4342 14.991 22.6041 14.3327 22.7098 13.6533C22.7558 13.3576 22.7788 13.2097 22.689 13.1049C22.5992 13 22.4436 13 22.1325 13H1.86783ZM22.1325 11C22.4436 11 22.5992 11 22.689 10.8951C22.7788 10.7903 22.7558 10.6424 22.7098 10.3467C22.6041 9.66734 22.4342 9.00897 22.2066 8.37786C22.1419 8.19863 22.1096 8.10901 22.032 8.0545C21.9544 8 21.8555 8 21.6575 8H2.34279C2.14487 8 2.04591 8 1.96831 8.0545C1.89071 8.10901 1.85838 8.19863 1.79373 8.37786C1.5661 9.00897 1.39626 9.66735 1.29054 10.3467C1.24453 10.6424 1.22152 10.7903 1.31132 10.8951C1.40113 11 1.55669 11 1.86783 11H22.1325ZM3.69155 5.09792C3.37903 5.46772 3.22277 5.65261 3.3034 5.82631C3.38402 6 3.63596 6 4.13983 6H19.8605C20.3644 6 20.6163 6 20.6969 5.82631C20.7776 5.65261 20.6213 5.46772 20.3088 5.09792C18.3209 2.74565 15.3366 1.25 12.0002 1.25C8.66374 1.25 5.67947 2.74565 3.69155 5.09792ZM20.3088 18.9021C20.6213 18.5323 20.7776 18.3474 20.6969 18.1737C20.6163 18 20.3644 18 19.8605 18H4.13983C3.63596 18 3.38402 18 3.3034 18.1737C3.22277 18.3474 3.37903 18.5323 3.69155 18.9021C5.67947 21.2544 8.66374 22.75 12.0002 22.75C15.3366 22.75 18.3209 21.2544 20.3088 18.9021Z',
  d8: 'M1.86783 13C1.55669 13 1.40113 13 1.31132 13.1049C1.22152 13.2097 1.24453 13.3576 1.29054 13.6533C1.39626 14.3327 1.5661 14.991 1.79373 15.6221C1.85838 15.8014 1.89071 15.891 1.96831 15.9455C2.04591 16 2.14487 16 2.3428 16H21.6575C21.8555 16 21.9544 16 22.032 15.9455C22.1096 15.891 22.1419 15.8014 22.2066 15.6221C22.4342 14.991 22.6041 14.3327 22.7098 13.6533C22.7558 13.3576 22.7788 13.2097 22.689 13.1049C22.5992 13 22.4436 13 22.1325 13H1.86783Z',
  d9: 'M22.1325 11C22.4436 11 22.5992 11 22.689 10.8951C22.7788 10.7903 22.7558 10.6424 22.7098 10.3467C22.6041 9.66734 22.4342 9.00897 22.2066 8.37786C22.1419 8.19863 22.1096 8.10901 22.032 8.0545C21.9544 8 21.8555 8 21.6575 8H2.34279C2.14487 8 2.04591 8 1.96831 8.0545C1.89071 8.10901 1.85838 8.19863 1.79373 8.37786C1.5661 9.00897 1.39626 9.66735 1.29054 10.3467C1.24453 10.6424 1.22152 10.7903 1.31132 10.8951C1.40113 11 1.55669 11 1.86783 11H22.1325Z',
  d10: 'M3.69155 5.09792C3.37903 5.46772 3.22277 5.65261 3.3034 5.82631C3.38402 6 3.63596 6 4.13983 6H19.8605C20.3644 6 20.6163 6 20.6969 5.82631C20.7776 5.65261 20.6213 5.46772 20.3088 5.09792C18.3209 2.74565 15.3366 1.25 12.0002 1.25C8.66374 1.25 5.67947 2.74565 3.69155 5.09792Z',
  d11: 'M20.3088 18.9021C20.6213 18.5323 20.7776 18.3474 20.6969 18.1737C20.6163 18 20.3644 18 19.8605 18H4.13983C3.63596 18 3.38402 18 3.3034 18.1737C3.22277 18.3474 3.37903 18.5323 3.69155 18.9021C5.67947 21.2544 8.66374 22.75 12.0002 22.75C15.3366 22.75 18.3209 21.2544 20.3088 18.9021Z',
  d12: 'M21 7L3 7',
  d13: 'M21 17L3 17',
  d14: 'M1.25 13C1.38279 14.4334 1.79823 15.7854 2.44029 17H21.5597C22.2018 15.7854 22.6172 14.4334 22.75 13H1.25Z',
  d15: 'M22.75 11C22.6172 9.56655 22.2018 8.21463 21.5597 7H2.44029C1.79823 8.21463 1.38279 9.56655 1.25 11H22.75Z',
  d16: 'M3.80618 5H20.1938C18.2138 2.70422 15.2775 1.25 12 1.25C8.72253 1.25 5.78616 2.70422 3.80618 5Z',
  d17: 'M20.1938 19H3.80618C5.78616 21.2958 8.72253 22.75 12 22.75C15.2775 22.75 18.2138 21.2958 20.1938 19Z',
};

export const IconLatitudeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-stroke-rounded IconLatitudeStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLatitudeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-duotone-rounded IconLatitudeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLatitudeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-twotone-rounded IconLatitudeTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLatitudeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-solid-rounded IconLatitudeSolidRounded"
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

export const IconLatitudeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-bulk-rounded IconLatitudeBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconLatitudeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-stroke-sharp IconLatitudeStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLatitudeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="latitude-solid-sharp IconLatitudeSolidSharp"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLatitude: TheIconSelfPack = {
  name: 'Latitude',
  StrokeRounded: IconLatitudeStrokeRounded,
  DuotoneRounded: IconLatitudeDuotoneRounded,
  TwotoneRounded: IconLatitudeTwotoneRounded,
  SolidRounded: IconLatitudeSolidRounded,
  BulkRounded: IconLatitudeBulkRounded,
  StrokeSharp: IconLatitudeStrokeSharp,
  SolidSharp: IconLatitudeSolidSharp,
};