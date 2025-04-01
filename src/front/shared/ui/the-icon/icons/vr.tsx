import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 3H17C18.8692 3 19.8038 3 20.5 3.40192C20.9561 3.66523 21.3348 4.04394 21.5981 4.5C22 5.19615 22 6.13077 22 8C22 9.86923 22 10.8038 21.5981 11.5C21.3348 11.9561 20.9561 12.3348 20.5 12.5981C19.8038 13 18.8692 13 17 13H16.6063C15.9194 13 15.5759 13 15.2546 12.9286C14.8244 12.8331 14.4206 12.6439 14.0718 12.3746C13.8112 12.1734 13.5913 11.9096 13.1516 11.3819C12.8012 10.9614 12.626 10.7512 12.4249 10.6568C12.1557 10.5305 11.8443 10.5305 11.5751 10.6568C11.374 10.7512 11.1988 10.9614 10.8484 11.3819C10.4087 11.9096 10.1888 12.1734 9.92823 12.3746C9.57943 12.6439 9.17559 12.8331 8.74542 12.9286C8.42406 13 8.08061 13 7.39369 13H7C5.13077 13 4.19615 13 3.5 12.5981C3.04394 12.3348 2.66523 11.9561 2.40192 11.5C2 10.8038 2 9.86923 2 8C2 6.13077 2 5.19615 2.40192 4.5C2.66523 4.04394 3.04394 3.66523 3.5 3.40192C4.19615 3 5.13077 3 7 3Z',
  d2: 'M5 6H7',
  d3: 'M12.1006 19L10.0803 17M12.1006 19L10.0803 21M12.1006 19C7.05072 19 2.8089 17 2 15M15.1311 18.7711C18.6024 18.2314 21.2663 16.7892 22 15',
  d4: 'M19.2576 2.3033C18.6693 2.24998 17.94 2.24999 17.0358 2.25H6.96421H6.9642C6.05996 2.24999 5.33069 2.24998 4.7424 2.3033C4.13605 2.35826 3.60625 2.47455 3.125 2.75241C2.55493 3.08154 2.08154 3.55493 1.75241 4.125C1.47455 4.60625 1.35826 5.13605 1.3033 5.7424C1.24998 6.33069 1.24999 7.13155 1.25 8.03579V8.0358C1.24999 8.94004 1.24998 9.66931 1.3033 10.2576C1.35826 10.8639 1.47456 11.3937 1.75241 11.875C2.08154 12.4451 2.55493 12.9185 3.125 13.2476C3.60625 13.5254 4.13605 13.6417 4.7424 13.6967C5.3307 13.75 6.05998 13.75 6.96423 13.75L7.47414 13.75H7.47416C8.08367 13.7502 8.50505 13.7503 8.90805 13.6608C9.44577 13.5413 9.95057 13.3049 10.3866 12.9683C10.7133 12.716 10.983 12.3922 11.3731 11.9238C11.5554 11.7051 11.7182 11.5104 11.8076 11.4177C11.8631 11.3449 12.0176 11.2429 12.1924 11.4177C12.2818 11.5104 12.4446 11.7051 12.6269 11.9238C13.017 12.3922 13.2867 12.716 13.6134 12.9683C14.0494 13.3049 14.5542 13.5413 15.0919 13.6608C15.495 13.7503 15.9163 13.7502 16.5258 13.75H16.5259L17.0358 13.75C17.94 13.75 18.6693 13.75 19.2576 13.6967C19.8639 13.6417 20.3937 13.5254 20.875 13.2476C21.4451 12.9185 21.9185 12.4451 22.2476 11.875C22.5254 11.3938 22.6417 10.8639 22.6967 10.2576C22.75 9.66932 22.75 8.94005 22.75 8.03582C22.75 7.13159 22.75 6.33069 22.6967 5.7424C22.6417 5.13605 22.5254 4.60625 22.2476 4.125C21.9185 3.55493 21.4451 3.08154 20.875 2.75241C20.3937 2.47455 19.8639 2.35826 19.2576 2.3033ZM5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H7C7.55228 7 8 6.55228 8 6C8 5.44772 7.55228 5 7 5H5Z',
  d5: 'M1.62532 13.8232C2.13731 13.6161 2.72023 13.8633 2.92731 14.3753C3.04207 14.6591 3.31942 15.0293 3.83145 15.4359C4.33452 15.8353 5.01412 16.2297 5.84613 16.5777C6.77838 16.9677 7.87603 17.2888 9.08313 17.4957V16.8217C9.06339 16.5442 9.15885 16.26 9.36993 16.0467C9.75848 15.6542 10.3916 15.651 10.7841 16.0396L12.8044 18.0396C12.9941 18.2274 13.1009 18.4833 13.1009 18.7503C13.1009 19.0172 12.9941 19.2731 12.8044 19.4609L10.7841 21.4609C10.3916 21.8495 9.75848 21.8463 9.36993 21.4538C9.19502 21.2771 9.0995 21.0517 9.08313 20.8217V19.5218C7.60099 19.2947 6.23958 18.9103 5.07427 18.4228C4.11348 18.0209 3.26534 17.5402 2.58775 17.0022C1.91913 16.4712 1.36291 15.8415 1.07322 15.1252C0.866141 14.6132 1.11332 14.0303 1.62532 13.8232Z',
  d6: 'M22.3797 13.825C22.8907 14.0346 23.135 14.6187 22.9255 15.1297C22.4376 16.3194 21.3689 17.2726 20.0722 17.9817C18.7583 18.7003 17.1088 19.2259 15.2849 19.5095C14.7392 19.5943 14.228 19.2207 14.1432 18.675C14.0583 18.1293 14.432 17.6181 14.9777 17.5332C16.6252 17.2771 18.0433 16.8118 19.1126 16.227C20.1991 15.6328 20.8292 14.9703 21.075 14.3708C21.2846 13.8598 21.8687 13.6155 22.3797 13.825Z',
  d7: 'M17.0358 2.25C17.94 2.24999 18.6693 2.24998 19.2576 2.3033C19.8639 2.35826 20.3937 2.47455 20.875 2.75241C21.4451 3.08154 21.9185 3.55493 22.2476 4.125C22.5254 4.60625 22.6417 5.13605 22.6967 5.7424C22.75 6.33069 22.75 7.13159 22.75 8.03582C22.75 8.94005 22.75 9.66932 22.6967 10.2576C22.6417 10.8639 22.5254 11.3938 22.2476 11.875C21.9185 12.4451 21.4451 12.9185 20.875 13.2476C20.3937 13.5254 19.8639 13.6417 19.2576 13.6967C18.6693 13.75 17.94 13.75 17.0358 13.75L16.5259 13.75H16.5258C15.9163 13.7502 15.495 13.7503 15.0919 13.6608C14.5542 13.5413 14.0494 13.3049 13.6134 12.9683C13.2867 12.716 13.017 12.3922 12.6269 11.9238C12.4446 11.7051 12.2818 11.5104 12.1924 11.4177C12.0176 11.2429 11.8631 11.3449 11.8076 11.4177C11.7182 11.5104 11.5554 11.7051 11.3731 11.9238C10.983 12.3922 10.7133 12.716 10.3866 12.9683C9.95057 13.3049 9.44577 13.5413 8.90805 13.6608C8.50505 13.7503 8.08367 13.7502 7.47416 13.75H7.47414L6.96423 13.75C6.05998 13.75 5.3307 13.75 4.7424 13.6967C4.13605 13.6417 3.60625 13.5254 3.125 13.2476C2.55493 12.9185 2.08154 12.4451 1.75241 11.875C1.47455 11.3937 1.35826 10.8639 1.3033 10.2576C1.24998 9.66931 1.24999 8.94004 1.25 8.0358V8.03579C1.24999 7.13155 1.24998 6.33069 1.3033 5.7424C1.35826 5.13605 1.47455 4.60625 1.75241 4.125C2.08154 3.55493 2.55493 3.08154 3.125 2.75241C3.60625 2.47455 4.13605 2.35826 4.7424 2.3033C5.33069 2.24998 6.05996 2.24999 6.9642 2.25H6.96421H17.0358Z',
  d8: 'M4 6C4 5.44772 4.44772 5 5 5H7C7.55228 5 8 5.44772 8 6C8 6.55228 7.55228 7 7 7H5C4.44772 7 4 6.55228 4 6Z',
  d9: 'M22 3H2V13H9L12 10L15 13H22V3Z',
  d10: 'M5 6H8',
  d11: 'M10.0803 17L12.1006 19L10.0803 21M15.1311 18.7711C18.6024 18.2314 21.2663 16.7892 22 15M2 15C2.77711 16.9214 6.72254 18.8428 11.509 18.9909',
  d12: 'M2 2.24988C1.58579 2.24988 1.25 2.58566 1.25 2.99988V12.9999C1.25 13.4141 1.58579 13.7499 2 13.7499H9C9.19891 13.7499 9.38968 13.6709 9.53033 13.5302L12 11.0605L14.4697 13.5302C14.6103 13.6709 14.8011 13.7499 15 13.7499H22C22.4142 13.7499 22.75 13.4141 22.75 12.9999V2.99988C22.75 2.58566 22.4142 2.24988 22 2.24988H2ZM5 6.74988H8V5.24988H5V6.74988Z',
  d13: 'M19.2322 16.9132C20.345 16.3046 21.03 15.6057 21.3061 14.9325L22.6939 15.5016C22.2362 16.6176 21.2224 17.5344 19.952 18.2292C18.6686 18.9311 17.0481 19.4491 15.2462 19.7293L15.0158 18.2471C16.6853 17.9875 18.1324 17.5146 19.2322 16.9132ZM5.74936 17.2752C6.98549 17.7923 8.50193 18.1887 10.1745 18.3657L9.55266 17.7501L10.608 16.6841L13.1666 19.2171L10.608 21.7501L9.55266 20.6841L10.3546 19.8902C8.41152 19.7185 6.63174 19.2703 5.17046 18.659C4.22577 18.2638 3.39869 17.7939 2.74292 17.2732C2.09388 16.7578 1.57251 16.1605 1.30469 15.4983L2.69526 14.9359C2.83188 15.2737 3.14409 15.6763 3.6757 16.0985C4.20058 16.5152 4.90125 16.9204 5.74936 17.2752Z',
};

export const IconVrStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-stroke-rounded IconVrStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVrDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-duotone-rounded IconVrDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVrTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-twotone-rounded IconVrTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
    </TheIconWrapper>
  );
};

export const IconVrSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-solid-rounded IconVrSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconVrBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-bulk-rounded IconVrBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconVrStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-stroke-sharp IconVrStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconVrSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="vr-solid-sharp IconVrSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfVr: TheIconSelfPack = {
  name: 'Vr',
  StrokeRounded: IconVrStrokeRounded,
  DuotoneRounded: IconVrDuotoneRounded,
  TwotoneRounded: IconVrTwotoneRounded,
  SolidRounded: IconVrSolidRounded,
  BulkRounded: IconVrBulkRounded,
  StrokeSharp: IconVrStrokeSharp,
  SolidSharp: IconVrSolidSharp,
};