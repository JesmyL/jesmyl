import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 8.93333C20 14 14.4615 18 12 18C9.53846 18 4 14 4 8.93333C4 5.10416 7.58172 2 12 2C16.4183 2 20 5.10416 20 8.93333Z',
  d2: 'M15 8.93333C15 14 12.9231 18 12 18C11.0769 18 9 14 9 8.93333C9 5.10416 10.3431 2 12 2C13.6569 2 15 5.10416 15 8.93333Z',
  d3: 'M9 20C9 19.535 9 19.3025 9.05111 19.1118C9.18981 18.5941 9.59413 18.1898 10.1118 18.0511C10.3025 18 10.535 18 11 18H13C13.465 18 13.6975 18 13.8882 18.0511C14.4059 18.1898 14.8102 18.5941 14.9489 19.1118C15 19.3025 15 19.535 15 20C15 20.465 15 20.6975 14.9489 20.8882C14.8102 21.4059 14.4059 21.8102 13.8882 21.9489C13.6975 22 13.465 22 13 22H11C10.535 22 10.3025 22 10.1118 21.9489C9.59413 21.8102 9.18981 21.4059 9.05111 20.8882C9 20.6975 9 20.465 9 20Z',
  d4: 'M12 18C14.4615 18 20 14 20 8.93333C20 5.10416 16.4183 2 12 2C7.58172 2 4 5.10416 4 8.93333C4 14 9.53846 18 12 18ZM12 18C11.0769 18 9 14 9 8.93333C9 5.10416 10.3431 2 12 2C13.6569 2 15 5.10416 15 8.93333C15 14 12.9231 18 12 18Z',
  d5: 'M12 1.25C7.27186 1.25 3.25 4.59278 3.25 8.93333C3.25 11.742 4.77859 14.1908 6.55608 15.9063C7.45103 16.7701 8.43163 17.4711 9.36301 17.9599C10.2776 18.4399 11.2111 18.75 12 18.75C12.7889 18.75 13.7224 18.4399 14.637 17.9599C15.5684 17.4711 16.549 16.7701 17.4439 15.9063C19.2214 14.1908 20.75 11.742 20.75 8.93333C20.75 4.59278 16.7281 1.25 12 1.25ZM12 18C12.9231 18 15 14 15 8.93333C15 5.10416 13.6569 2 12 2C10.3431 2 9 5.10416 9 8.93333C9 14 11.0769 18 12 18Z',
  d6: 'M10.9162 17.2501L11.0001 17.2501H13.0001L13.084 17.2501C13.4648 17.2497 13.7933 17.2493 14.0825 17.3268C14.8589 17.5348 15.4654 18.1413 15.6734 18.9178C15.7509 19.2069 15.7506 19.5354 15.7502 19.9162L15.7501 20.0001L15.7502 20.084C15.7506 20.4648 15.7509 20.7933 15.6734 21.0825C15.4654 21.8589 14.8589 22.4654 14.0825 22.6734C13.7933 22.7509 13.4648 22.7506 13.084 22.7502L13.0001 22.7501H11.0001L10.9162 22.7502C10.5354 22.7506 10.2069 22.7509 9.91777 22.6734C9.14132 22.4654 8.53483 21.8589 8.32678 21.0825C8.24931 20.7933 8.24965 20.4648 8.25006 20.084L8.25012 20.0001L8.25006 19.9162C8.24965 19.5354 8.24931 19.2069 8.32678 18.9178C8.53483 18.1413 9.14132 17.5348 9.91777 17.3268C10.2069 17.2493 10.5354 17.2497 10.9162 17.2501Z',
  d7: 'M3.25 8.93333C3.25 4.59278 7.27186 1.25 12 1.25C16.7281 1.25 20.75 4.59278 20.75 8.93333C20.75 11.742 19.2214 14.1908 17.4439 15.9063C16.549 16.7701 15.5684 17.4711 14.637 17.9599C13.7224 18.4399 12.7889 18.75 12 18.75C11.2111 18.75 10.2776 18.4399 9.36301 17.9599C8.43163 17.4711 7.45103 16.7701 6.55608 15.9063C4.77859 14.1908 3.25 11.742 3.25 8.93333Z',
  d8: 'M15 18H9V22H15V18Z',
  d9: 'M12 1.25C7.27186 1.25 3.25 4.59278 3.25 8.93333C3.25 11.742 4.77859 14.1908 6.55608 15.9063C7.45103 16.7701 8.43163 17.4711 9.36301 17.9599C10.2776 18.4399 11.2111 18.75 12 18.75C12.7889 18.75 13.7224 18.4399 14.637 17.9599C15.5684 17.4711 16.549 16.7701 17.4439 15.9063C19.2214 14.1908 20.75 11.742 20.75 8.93333C20.75 4.59278 16.7281 1.25 12 1.25ZM12 17.082C12.9231 17.082 15 13.541 15 9.05573C15 5.66594 13.6569 2.91797 12 2.91797C10.3431 2.91797 9 5.66594 9 9.05573C9 13.541 11.0769 17.082 12 17.082Z',
  d10: 'M8.25 18C8.25 17.5858 8.58579 17.25 9 17.25H15C15.4142 17.25 15.75 17.5858 15.75 18V22C15.75 22.4142 15.4142 22.75 15 22.75H9C8.58579 22.75 8.25 22.4142 8.25 22V18Z',
};

export const IconHotAirBalloonStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="c f fr"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon StrokeSharp"
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
        d={d.d8}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHotAirBalloonSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HotAirBalloon SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHotAirBalloon: TheIconSelfPack = [
  'HotAirBalloon',
  IconHotAirBalloonStrokeRounded,
  IconHotAirBalloonDuotoneRounded,
  IconHotAirBalloonTwotoneRounded,
  IconHotAirBalloonSolidRounded,
  IconHotAirBalloonBulkRounded,
  IconHotAirBalloonStrokeSharp,
  IconHotAirBalloonSolidSharp,
];