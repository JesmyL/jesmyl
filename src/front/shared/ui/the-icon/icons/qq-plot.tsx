import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3',
  d2: 'M4.5 19.5L21 3',
  d3: 'M15 4H15.009',
  d4: 'M8 3H8.00898',
  d5: 'M8 9H8.00898',
  d6: 'M20 11H20.009',
  d7: 'M13 17H13.009',
  d8: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.15226 17.9529 4.19301 18.1629 4.24151 18.3444L20.2929 2.29302C20.6834 1.90249 21.3166 1.90249 21.7071 2.29302C22.0976 2.68354 22.0976 3.31671 21.7071 3.70723L5.6558 19.7585C5.83729 19.807 6.0472 19.8478 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d9: 'M13.5 4C13.5 3.17157 14.1716 2.5 15 2.5H15.009C15.8374 2.5 16.509 3.17157 16.509 4C16.509 4.82843 15.8374 5.5 15.009 5.5H15C14.1716 5.5 13.5 4.82843 13.5 4Z',
  d10: 'M6.5 3C6.5 2.17157 7.17157 1.5 8 1.5H8.00898C8.83741 1.5 9.50898 2.17157 9.50898 3C9.50898 3.82843 8.83741 4.5 8.00898 4.5H8C7.17157 4.5 6.5 3.82843 6.5 3Z',
  d11: 'M6.5 9C6.5 8.17157 7.17157 7.5 8 7.5H8.00898C8.83741 7.5 9.50898 8.17157 9.50898 9C9.50898 9.82843 8.83741 10.5 8.00898 10.5H8C7.17157 10.5 6.5 9.82843 6.5 9Z',
  d12: 'M18.5 11C18.5 10.1716 19.1716 9.5 20 9.5H20.009C20.8374 9.5 21.509 10.1716 21.509 11C21.509 11.8284 20.8374 12.5 20.009 12.5H20C19.1716 12.5 18.5 11.8284 18.5 11Z',
  d13: 'M11.5 17C11.5 16.1716 12.1716 15.5 13 15.5H13.009C13.8374 15.5 14.509 16.1716 14.509 17C14.509 17.8284 13.8374 18.5 13.009 18.5H13C12.1716 18.5 11.5 17.8284 11.5 17Z',
  d14: 'M3 2C3.55229 2 4 2.44772 4 3V14C4 15.6782 4.00213 16.8362 4.11923 17.7072C4.23246 18.5494 4.43644 18.972 4.73223 19.2678C5.02803 19.5636 5.45059 19.7675 6.2928 19.8808C7.16378 19.9979 8.32182 20 10 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H9.928C8.33933 22 7.04616 22.0001 6.0263 21.8629C4.96232 21.7199 4.04735 21.4113 3.31802 20.682C2.58869 19.9526 2.28011 19.0377 2.13706 17.9737C1.99994 16.9538 1.99997 15.6607 2 14.072L2 3C2 2.44772 2.44772 2 3 2Z',
  d15: 'M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L5.20711 20.2071C4.81658 20.5976 4.18342 20.5976 3.79289 20.2071C3.40237 19.8166 3.40237 19.1834 3.79289 18.7929L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289Z',
  d16: 'M21 21H3V3',
  d17: 'M3.5 20.4999L21 3',
  d18: 'M4.49857 20V3H2.49951V21C2.49951 21.5523 2.94702 22 3.49904 22H21.4905V20H4.49857Z',
  d19: 'M21.4904 4.41424L4.70553 21.207L3.29199 19.7928L20.0769 3.00002L21.4904 4.41424Z',
  d20: 'M14.4939 3H16.5029V5H14.4939V3Z',
  d21: 'M7.49707 2H9.50605V4H7.49707V2Z',
  d22: 'M7.49707 8H9.50605V10H7.49707V8Z',
  d23: 'M19.4915 10H21.5004V12H19.4915V10Z',
  d24: 'M12.4949 16H14.5039V18H12.4949V16Z',
};

export const IconQqPlotStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
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
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
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
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
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
        d={d.d6}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot BulkRounded"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d10}
        i-c="c f fr o7"
      />
      <path 
        d={d.d11}
        i-c="c f fr o7"
      />
      <path 
        d={d.d12}
        i-c="c f fr o7"
      />
      <path 
        d={d.d13}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot StrokeSharp"
    >
      <path 
        d={d.d16}
        i-c="s sj sw"
      />
      <path 
        d={d.d17}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d4}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d5}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d6}
        i-c="s sj ss sw"
      />
      <path 
        d={d.d7}
        i-c="s sj ss sw"
      />
    </TheIconWrapper>
  );
};

export const IconQqPlotSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="QqPlot SolidSharp"
    >
      <path 
        d={d.d18}
        i-c="c f fr"
      />
      <path 
        d={d.d19}
        i-c="c f fr"
      />
      <path 
        d={d.d20}
        i-c="c f fr"
      />
      <path 
        d={d.d21}
        i-c="c f fr"
      />
      <path 
        d={d.d22}
        i-c="c f fr"
      />
      <path 
        d={d.d23}
        i-c="c f fr"
      />
      <path 
        d={d.d24}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfQqPlot: TheIconSelfPack = [
  'QqPlot',
  IconQqPlotStrokeRounded,
  IconQqPlotDuotoneRounded,
  IconQqPlotTwotoneRounded,
  IconQqPlotSolidRounded,
  IconQqPlotBulkRounded,
  IconQqPlotStrokeSharp,
  IconQqPlotSolidSharp,
];