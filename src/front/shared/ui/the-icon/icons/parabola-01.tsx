import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 3C21 11.2843 16.9706 18 12 18C7.02944 18 3 11.2843 3 3',
  d2: 'M3 21H4.05882M15.7059 21H16.7647M19.9412 21H21M7.23529 21H8.29412M11.4706 21H12.5294',
  d3: 'M12 18C16.9706 18 21 11.2843 21 3H3C3 11.2843 7.02944 18 12 18Z',
  d4: 'M3 2C3.55228 2 4 2.44772 4 3C4 6.99205 4.97293 10.5578 6.49353 13.0921C8.02608 15.6464 10.004 17 12 17C13.996 17 15.9739 15.6464 17.5065 13.0921C19.0271 10.5578 20 6.99205 20 3C20 2.44772 20.4477 2 21 2C21.5523 2 22 2.44772 22 3C22 7.29222 20.9582 11.2265 19.2215 14.1211C17.4966 16.9958 14.9745 19 12 19C9.02546 19 6.50336 16.9958 4.77855 14.1211C3.04179 11.2265 2 7.29222 2 3C2 2.44772 2.44772 2 3 2Z',
  d5: 'M2 21C2 20.4477 2.44772 20 3 20H4.05882C4.61111 20 5.05882 20.4477 5.05882 21C5.05882 21.5523 4.61111 22 4.05882 22H3C2.44772 22 2 21.5523 2 21ZM6.23529 21C6.23529 20.4477 6.68301 20 7.23529 20H8.29412C8.8464 20 9.29412 20.4477 9.29412 21C9.29412 21.5523 8.8464 22 8.29412 22H7.23529C6.68301 22 6.23529 21.5523 6.23529 21ZM10.4706 21C10.4706 20.4477 10.9183 20 11.4706 20H12.5294C13.0817 20 13.5294 20.4477 13.5294 21C13.5294 21.5523 13.0817 22 12.5294 22H11.4706C10.9183 22 10.4706 21.5523 10.4706 21ZM14.7059 21C14.7059 20.4477 15.1536 20 15.7059 20H16.7647C17.317 20 17.7647 20.4477 17.7647 21C17.7647 21.5523 17.317 22 16.7647 22H15.7059C15.1536 22 14.7059 21.5523 14.7059 21ZM18.9412 21C18.9412 20.4477 19.3889 20 19.9412 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H19.9412C19.3889 22 18.9412 21.5523 18.9412 21Z',
  d6: 'M3 21H5M15 21H17M19 21H21M7 21H9M11 21H13',
  d7: 'M6.49353 12.5921C8.02608 15.1464 10.004 16.5 12 16.5C13.996 16.5 15.9739 15.1464 17.5065 12.5921C19.0271 10.0578 20 6.49206 20 2.5H22C22 6.79222 20.9582 10.7265 19.2215 13.6211C17.4966 16.4958 14.9745 18.5 12 18.5C9.02546 18.5 6.50336 16.4958 4.77855 13.6211C3.04179 10.7265 2 6.79222 2 2.5H4C4 6.49206 4.97293 10.0578 6.49353 12.5921Z',
  d8: 'M5 21.5H3V19.5H5V21.5ZM9 21.5H7V19.5H9V21.5ZM13 21.5H11V19.5H13V21.5ZM17 21.5H15V19.5H17V21.5ZM21 21.5H19V19.5H21V21.5Z',
};

export const IconParabola01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-stroke-rounded IconParabola01StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParabola01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-duotone-rounded IconParabola01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParabola01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-twotone-rounded IconParabola01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconParabola01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-solid-rounded IconParabola01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParabola01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-bulk-rounded IconParabola01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconParabola01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-stroke-sharp IconParabola01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconParabola01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="parabola-01-solid-sharp IconParabola01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfParabola01: TheIconSelfPack = {
  name: 'Parabola01',
  StrokeRounded: IconParabola01StrokeRounded,
  DuotoneRounded: IconParabola01DuotoneRounded,
  TwotoneRounded: IconParabola01TwotoneRounded,
  SolidRounded: IconParabola01SolidRounded,
  BulkRounded: IconParabola01BulkRounded,
  StrokeSharp: IconParabola01StrokeSharp,
  SolidSharp: IconParabola01SolidSharp,
};