import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 16.5C9.10457 16.5 10 15.8284 10 15C10 14.1716 9.10457 13.5 8 13.5C6.89543 13.5 6 14.1716 6 15C6 15.8284 6.89543 16.5 8 16.5Z',
  d2: 'M21.2722 15.7522C17.6645 15.7468 14.7094 16.3604 11.5 18.5C9.91701 19.5553 8.40491 20.2626 7.10825 20.7239M21.2722 15.7522C21.7415 14.5935 22 13.3269 22 12C22 11.7639 21.9918 11.5298 21.9757 11.2978M21.2722 15.7522C19.7882 19.4158 16.1959 22 12 22C10.2231 22 8.55439 21.5365 7.10825 20.7239M21.9757 11.2978C16.9028 14.2476 14.3349 13.112 9 10C6.5627 8.57824 4.2801 8.55737 2.42713 9.09949M21.9757 11.2978C21.9128 10.39 21.7286 9.51555 21.4394 8.69054M21.4394 8.69054C20.0734 4.7941 16.363 2 12 2C9.46517 2 7.15062 2.94313 5.38812 4.49763M21.4394 8.69054C17.3788 8.69054 17.5 4.77488 12 6C8.4 6.8019 6.25875 5.16588 5.38812 4.49763M5.38812 4.49763C4.01187 5.71147 2.97222 7.29807 2.42713 9.09949M2.42713 9.09949C2.14934 10.0175 2 10.9913 2 12C2 15.7459 4.05965 19.0108 7.10825 20.7239',
  d3: 'M12 2C16.363 2 20.0734 4.7941 21.4394 8.69054C19.6942 8.69054 18.7215 7.96726 17.7429 7.23966C16.4446 6.27433 15.1362 5.30142 12 6C8.4 6.8019 6.25875 5.16588 5.38812 4.49763C7.15062 2.94313 9.46517 2 12 2Z',
  d4: 'M11.5 18.5C14.7094 16.3604 17.6645 15.7468 21.2722 15.7522C21.7415 14.5935 22 13.3269 22 12C22 11.7639 21.9918 11.5298 21.9757 11.2978C16.9028 14.2476 14.3349 13.112 9 10C6.5627 8.57824 4.2801 8.55737 2.42713 9.09949C2.14934 10.0175 2 10.9913 2 12C2 15.7459 4.05965 19.0108 7.10825 20.7239C8.40491 20.2626 9.91701 19.5553 11.5 18.5ZM10 15C10 15.8284 9.10457 16.5 8 16.5C6.89543 16.5 6 15.8284 6 15C6 14.1716 6.89543 13.5 8 13.5C9.10457 13.5 10 14.1716 10 15Z',
  d5: 'M21.2722 15.7522C21.7415 14.5935 22 13.3269 22 12C22 11.7639 21.9918 11.5298 21.9757 11.2978C21.9128 10.39 21.7286 9.51555 21.4394 8.69054C20.0734 4.7941 16.363 2 12 2C9.46517 2 7.15062 2.94313 5.38812 4.49763C4.01187 5.71147 2.97222 7.29807 2.42713 9.09949C2.14934 10.0175 2 10.9913 2 12C2 15.7459 4.05965 19.0108 7.10825 20.7239C8.55439 21.5365 10.2231 22 12 22C16.1959 22 19.7882 19.4158 21.2722 15.7522Z',
  d6: 'M21.2728 15.7526C17.6651 15.7472 14.71 16.3608 11.5006 18.5004C9.91762 19.5557 8.40552 20.263 7.10886 20.7243M21.9763 11.2982C16.9034 14.248 14.3355 13.1125 9.00061 10.0004C6.56331 8.57866 4.28071 8.55778 2.42773 9.09991M21.44 8.69096C17.3794 8.69096 17.5006 4.7753 12.0006 6.00042C8.40061 6.80231 6.25936 5.16629 5.38873 4.49805',
  d7: 'M12 1.25C9.27573 1.25 6.78606 2.26464 4.89196 3.93521C3.41374 5.23898 2.29578 6.94417 1.7093 8.88237C1.41037 9.8703 1.25 10.9173 1.25 12C1.25 16.0281 3.46596 19.5374 6.74067 21.3776C8.29634 22.2518 10.0915 22.75 12 22.75C16.5121 22.75 20.3727 19.9704 21.9673 16.0338C22.4723 14.7869 22.75 13.4247 22.75 12C22.75 11.7467 22.7412 11.4953 22.7239 11.2461C22.6563 10.2707 22.4583 9.33016 22.1471 8.44244C20.6791 4.25505 16.6917 1.25 12 1.25ZM17.0041 8.11554L17.0041 8.11554C17.8448 8.74574 18.8763 9.51891 20.4931 9.70281C20.5874 10.0522 20.6607 10.4103 20.7115 10.7758C18.6376 11.8935 17.1322 12.1671 15.6563 11.936C13.97 11.672 12.1968 10.7392 9.56113 9.20169C7.67597 8.10201 5.85423 7.77137 4.22186 7.89106C4.60005 7.17681 5.07395 6.52055 5.62672 5.93945C6.82743 6.74245 9.0099 7.80413 12.213 7.09064C13.4478 6.81559 14.2951 6.84452 14.927 6.99364C15.5579 7.14252 16.0516 7.42847 16.5752 7.79971C16.7137 7.89788 16.8559 8.00449 17.0041 8.11554ZM15.354 13.867C17.1122 14.1423 18.807 13.849 20.7459 12.9457C20.6813 13.5503 20.5556 14.136 20.3752 14.6968C17.0036 14.7706 14.0941 15.4567 10.9698 17.5395C9.66555 18.409 8.41666 19.0226 7.31799 19.4473C4.84506 17.8889 3.20508 15.1356 3.20508 12.0004C3.20508 11.3014 3.28641 10.6226 3.43981 9.97233C4.91808 9.65757 6.67609 9.78153 8.5763 10.89C11.1543 12.3938 13.2427 13.5365 15.354 13.867Z',
  d8: 'M12 1.25C9.27573 1.25 6.78606 2.26464 4.89196 3.93521C3.41374 5.23898 2.29578 6.94417 1.7093 8.88237C1.41037 9.8703 1.25 10.9173 1.25 12C1.25 16.0281 3.46596 19.5374 6.74067 21.3776C8.29634 22.2518 10.0915 22.75 12 22.75C16.5121 22.75 20.3727 19.9704 21.9673 16.0338C22.4723 14.7869 22.75 13.4247 22.75 12C22.75 11.7467 22.7412 11.4953 22.7239 11.2461C22.6563 10.2707 22.4583 9.33016 22.1471 8.44244C20.6791 4.25505 16.6917 1.25 12 1.25ZM17.0041 8.11555C17.8448 8.74575 18.8763 9.51891 20.4931 9.70281C20.5874 10.0522 20.6607 10.4103 20.7115 10.7758C18.6376 11.8935 17.1322 12.1671 15.6563 11.936C13.97 11.672 12.1968 10.7392 9.56113 9.20169C7.67597 8.10201 5.85423 7.77137 4.22186 7.89106C4.60005 7.17681 5.07395 6.52055 5.62672 5.93945C6.82743 6.74245 9.0099 7.80413 12.213 7.09064C13.4478 6.81559 14.2951 6.84452 14.927 6.99364C15.5579 7.14252 16.0516 7.42847 16.5752 7.79971C16.7137 7.89788 16.8559 8.00449 17.0041 8.11554L17.0041 8.11555ZM15.354 13.867C17.1122 14.1423 18.807 13.849 20.7459 12.9457C20.6813 13.5503 20.5556 14.136 20.3752 14.6968C17.0036 14.7706 14.0941 15.4567 10.9698 17.5395C9.66555 18.409 8.41666 19.0226 7.31799 19.4473C4.84506 17.8889 3.20508 15.1356 3.20508 12.0004C3.20508 11.3014 3.28641 10.6226 3.43981 9.97233C4.91808 9.65757 6.67609 9.78153 8.5763 10.89C11.1543 12.3938 13.2427 13.5365 15.354 13.867Z',
};

export const IconJupiterStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-stroke-rounded IconJupiterStrokeRounded"
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

export const IconJupiterDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-duotone-rounded IconJupiterDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconJupiterTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-twotone-rounded IconJupiterTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconJupiterSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-solid-rounded IconJupiterSolidRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconJupiterBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-bulk-rounded IconJupiterBulkRounded"
    >
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconJupiterStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-stroke-sharp IconJupiterStrokeSharp"
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

export const IconJupiterSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="jupiter-solid-sharp IconJupiterSolidSharp"
    >
      <path 
        d={d.d1} 
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

export const iconPackOfJupiter: TheIconSelfPack = {
  name: 'Jupiter',
  StrokeRounded: IconJupiterStrokeRounded,
  DuotoneRounded: IconJupiterDuotoneRounded,
  TwotoneRounded: IconJupiterTwotoneRounded,
  SolidRounded: IconJupiterSolidRounded,
  BulkRounded: IconJupiterBulkRounded,
  StrokeSharp: IconJupiterStrokeSharp,
  SolidSharp: IconJupiterSolidSharp,
};