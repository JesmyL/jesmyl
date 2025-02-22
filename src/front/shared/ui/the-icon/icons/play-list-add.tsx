import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 7H21',
  d2: 'M16.5 2L13.5 7',
  d3: 'M9.5 2L6.5 7',
  d4: 'M11.5 21C7.02166 21 4.78249 21 3.39124 19.6088C2 18.2175 2 15.9783 2 11.5C2 7.02166 2 4.78249 3.39124 3.39124C4.78249 2 7.02166 2 11.5 2C15.9783 2 18.2175 2 19.6088 3.39124C21 4.78249 21 7.02166 21 11.5',
  d5: 'M14 18H22M18 22L18 14',
  d6: 'M2.09793 7C2 8.18354 2 9.6509 2 11.5C2 15.9783 2 18.2175 3.39124 19.6088C4.78249 21 7.02166 21 11.5 21C15.9783 21 18.2175 21 19.6088 19.6088C21 18.2175 21 15.9783 21 11.5C21 9.6509 21 8.18354 20.9021 7H2.09793Z',
  d7: 'M11.1525 1.31827C11.2667 1.25339 11.4052 1.253 11.6823 1.25222L11.8881 1.25161C12.8696 1.24865 13.8524 1.24568 14.833 1.28283C15.2678 1.29931 15.4853 1.30755 15.5666 1.45848C15.648 1.60941 15.5338 1.79812 15.3055 2.17554L12.9793 6.02089C12.8368 6.25655 12.7655 6.37438 12.6512 6.43884C12.5368 6.50329 12.3991 6.50329 12.1237 6.50329H8.67267C8.35945 6.50329 8.20283 6.50329 8.14539 6.40183C8.08794 6.30037 8.16852 6.16608 8.32967 5.89749L10.825 1.73861C10.9672 1.50163 11.0383 1.38314 11.1525 1.31827Z',
  d8: 'M8.5907 1.37407C8.53003 1.27195 8.37165 1.27784 8.0549 1.28961C7.36371 1.31529 6.7436 1.3591 6.18802 1.43379C4.81137 1.61888 3.71911 2.00591 2.86091 2.86411C1.99797 3.72705 1.62446 4.88277 1.44949 6.06051C1.41938 6.26319 1.40433 6.36453 1.46417 6.43391C1.524 6.50329 1.62901 6.50329 1.83901 6.50329H5.09742C5.37539 6.50329 5.51438 6.50329 5.6294 6.43782C5.74441 6.37235 5.81537 6.25284 5.95728 6.01381L8.40681 1.8881C8.56985 1.61349 8.65137 1.47619 8.5907 1.37407Z',
  d9: 'M18.6711 1.89702C18.3653 1.77117 18.2124 1.70825 18.0375 1.7651C17.8627 1.82196 17.7656 1.97977 17.5714 2.29539L15.357 5.89365C15.191 6.16349 15.108 6.29841 15.1652 6.40085C15.2224 6.50329 15.3809 6.50329 15.6977 6.50329H21.161C21.371 6.50329 21.476 6.50329 21.5358 6.43391C21.5957 6.36453 21.5806 6.26319 21.5505 6.06051C21.3756 4.88277 21.002 3.72705 20.1391 2.86411C19.7103 2.43532 19.2231 2.12415 18.6711 1.89702Z',
  d10: 'M21.6183 8.61872C21.7352 8.73416 21.7374 8.917 21.7419 9.2827C21.75 9.94706 21.75 10.6667 21.75 11.4458V11.5604C21.75 12.8104 21.75 13.9074 21.7165 14.8686C21.7102 15.048 21.7071 15.1377 21.6489 15.1939C21.5908 15.25 21.5003 15.25 21.3192 15.25H21.25C20.7786 15.25 20.5429 15.25 20.3964 15.1036C20.25 14.9571 20.25 14.7214 20.25 14.25V13.75C20.25 12.3693 19.1307 11.25 17.75 11.25C16.3693 11.25 15.25 12.3693 15.25 13.75V14.85C15.25 15.0386 15.25 15.1328 15.1914 15.1914C15.1328 15.25 15.0386 15.25 14.85 15.25H13.75C12.3693 15.25 11.25 16.3693 11.25 17.75C11.25 19.1307 12.3693 20.25 13.75 20.25H14.25C14.7214 20.25 14.9571 20.25 15.1036 20.3964C15.25 20.5429 15.25 20.7786 15.25 21.25V21.3223C15.25 21.5034 15.25 21.5939 15.1939 21.652C15.1377 21.7101 15.0481 21.7133 14.8687 21.7195C13.9067 21.7532 12.8086 21.7532 11.5572 21.7532H11.4428C9.2521 21.7532 7.53144 21.7532 6.18802 21.5726C4.81137 21.3875 3.71911 21.0005 2.86091 20.1423C2.00272 19.2841 1.61568 18.1918 1.43059 16.8152C1.24998 15.4718 1.24999 13.7511 1.25 11.5604V11.446C1.25 10.6669 1.24999 9.94711 1.25811 9.2827C1.26259 8.917 1.26482 8.73416 1.38167 8.61872C1.49853 8.50329 1.68305 8.50329 2.0521 8.50329H20.9479C21.3169 8.50329 21.5015 8.50329 21.6183 8.61872Z',
  d11: 'M17.75 12.75C18.3023 12.75 18.75 13.1977 18.75 13.75V16.75H21.75C22.3023 16.75 22.75 17.1977 22.75 17.75C22.75 18.3023 22.3023 18.75 21.75 18.75H18.75V21.75C18.75 22.3023 18.3023 22.75 17.75 22.75C17.1977 22.75 16.75 22.3023 16.75 21.75V18.75H13.75C13.1977 18.75 12.75 18.3023 12.75 17.75C12.75 17.1977 13.1977 16.75 13.75 16.75H16.75V13.75C16.75 13.1977 17.1977 12.75 17.75 12.75Z',
  d12: 'M2 6H20',
  d13: 'M16 2L13 6',
  d14: 'M9 2L6 6',
  d15: 'M20 12V2H2V20H12',
  d16: 'M8.2331 1.75H2.5C2.08579 1.75 1.75 2.08579 1.75 2.5V5.75H6.05309L8.2331 1.75Z',
  d17: 'M7.76139 5.75H13.0531L15.2331 1.75H9.94141L7.76139 5.75Z',
  d18: 'M16.9414 1.75L14.7614 5.75H21.25V2.5C21.25 2.08579 20.9142 1.75 20.5 1.75H16.9414Z',
  d19: 'M1.75 7.25H21.25V12.75H15.75V15.75H12.75V21.25H2.5C2.08579 21.25 1.75 20.9142 1.75 20.5V7.25Z',
  d20: 'M19.25 19.25V22.25H17.25V19.25H14.25V17.25H17.25V14.25H19.25V17.25H22.25V19.25H19.25Z',
};

export const IconPlayListAddStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-stroke-rounded IconPlayListAddStrokeRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-duotone-rounded IconPlayListAddDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-twotone-rounded IconPlayListAddTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-solid-rounded IconPlayListAddSolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-bulk-rounded IconPlayListAddBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-stroke-sharp IconPlayListAddStrokeSharp"
    >
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
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPlayListAddSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="play-list-add-solid-sharp IconPlayListAddSolidSharp"
    >
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPlayListAdd: TheIconSelfPack = {
  name: 'PlayListAdd',
  StrokeRounded: IconPlayListAddStrokeRounded,
  DuotoneRounded: IconPlayListAddDuotoneRounded,
  TwotoneRounded: IconPlayListAddTwotoneRounded,
  SolidRounded: IconPlayListAddSolidRounded,
  BulkRounded: IconPlayListAddBulkRounded,
  StrokeSharp: IconPlayListAddStrokeSharp,
  SolidSharp: IconPlayListAddSolidSharp,
};