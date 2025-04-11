import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 7C8.68629 7 6 9.68629 6 13L18 13C18 9.68629 15.3137 7 12 7Z',
  d2: 'M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13',
  d3: 'M5 13H19',
  d4: 'M12 7V2',
  d5: 'M12.0002 20V22M15 19L17 20.4999M9 19L7 20.5',
  d6: 'M12 16C10.3431 16 9 14.6569 9 13H15C15 14.6569 13.6569 16 12 16Z',
  d7: 'M12 20V22',
  d8: 'M12 16.9999C9.79086 16.9999 8 15.209 8 12.9999H10C10 14.1044 10.8954 14.9999 12 14.9999C13.1046 14.9999 14 14.1044 14 12.9999H16C16 15.209 14.2091 16.9999 12 16.9999Z',
  d9: 'M5 12.0001C4.44772 12.0001 4 12.4478 4 13.0001C4 13.5524 4.44772 14.0001 5 14.0001H19C19.5523 14.0001 20 13.5524 20 13.0001C20 12.4478 19.5523 12.0001 19 12.0001H18.9291C18.4439 8.60783 15.5265 6.00012 12 6.00012C8.47353 6.00012 5.55612 8.60783 5.07089 12.0001H5Z',
  d10: 'M12 0.999878C12.5523 0.999878 13 1.44759 13 1.99988V6.99988C13 7.55216 12.5523 7.99988 12 7.99988C11.4477 7.99988 11 7.55216 11 6.99988V1.99988C11 1.44759 11.4477 0.999878 12 0.999878Z',
  d11: 'M9.80006 18.4001C10.1314 18.8419 10.0419 19.4687 9.60006 19.8001L7.60006 21.3001C7.15823 21.6314 6.53143 21.5419 6.20006 21.1001C5.86869 20.6582 5.95823 20.0314 6.40006 19.7001L8.40006 18.2001C8.84189 17.8687 9.46869 17.9582 9.80006 18.4001ZM14.2 18.4001C14.5314 17.9582 15.1582 17.8687 15.6 18.2L17.6 19.6999C18.0419 20.0313 18.1314 20.6581 17.8001 21.0999C17.4687 21.5417 16.8419 21.6313 16.4001 21.3L14.4001 19.8001C13.9582 19.4687 13.8687 18.8419 14.2 18.4001ZM12.0003 19.0001C12.5525 19.0001 13.0003 19.4478 13.0003 20.0001V22.0001C13.0003 22.5523 12.5525 23.0001 12.0003 23.0001C11.448 23.0001 11.0003 22.5523 11.0003 22.0001V20.0001C11.0003 19.4478 11.448 19.0001 12.0003 19.0001Z',
  d12: 'M8.125 14C8.56913 15.7251 10.1352 16.9998 11.9989 16.9998C13.8627 16.9998 15.4287 15.7251 15.8728 14H13.7312C13.3854 14.5977 12.7391 14.9998 11.9989 14.9998C11.2587 14.9998 10.6125 14.5977 10.2666 14H8.125Z',
  d13: 'M11 6.07101V1.99988C11 1.44759 11.4477 0.999878 12 0.999878C12.5523 0.999878 13 1.44759 13 1.99988V6.07101C12.6734 6.02429 12.3395 6.00012 12 6.00012C11.6605 6.00012 11.3266 6.02429 11 6.07101Z',
  d14: 'M12 8C8.68629 8 6 10.6863 6 14L18 14C18 10.6863 15.3137 8 12 8Z',
  d15: 'M9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14',
  d16: 'M4 14H20',
  d17: 'M12 8V2',
  d18: 'M12 18C9.79086 18 8 16.2091 8 14H10C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14H16C16 16.2091 14.2091 18 12 18Z',
  d19: 'M4 15H20V13H18.6764C18.1932 9.74629 15.3881 7.25 12 7.25C8.61186 7.25 5.80676 9.74629 5.32356 13H4V15Z',
  d20: 'M13 2V8H11V2H13Z',
  d21: 'M16.3999 21.2999L14.3999 19.8L15.5999 18.2L17.5999 19.6998L16.3999 21.2999ZM6.3999 19.7L8.3999 18.2L9.5999 19.8L7.5999 21.3L6.3999 19.7ZM11.0001 22V20H13.0001V22H11.0001Z',
};

export const IconLamp01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 StrokeRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 TwotoneRounded"
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
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 BulkRounded"
    >
      <path 
        d={d.d9}
        i-c="f o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr o7"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 StrokeSharp"
    >
      <path 
        d={d.d14}
        i-c="s sj sw"
      />
      <path 
        d={d.d15}
        i-c="s sj sw"
      />
      <path 
        d={d.d16}
        i-c="s sj sw"
      />
      <path 
        d={d.d17}
        i-c="s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconLamp01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Lamp01 SolidSharp"
    >
      <path 
        d={d.d18}
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="f"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLamp01: TheIconSelfPack = [
  'Lamp01',
  IconLamp01StrokeRounded,
  IconLamp01DuotoneRounded,
  IconLamp01TwotoneRounded,
  IconLamp01SolidRounded,
  IconLamp01BulkRounded,
  IconLamp01StrokeSharp,
  IconLamp01SolidSharp,
];