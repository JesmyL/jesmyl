import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 17.5H2',
  d2: 'M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21',
  d3: 'M11 12V10.2134C11 9.83272 10.9428 9.70541 10.6497 9.55538C10.0395 9.24292 9.29865 9 8.5 9C7.70135 9 6.96055 9.24292 6.35025 9.55538C6.05721 9.70541 6 9.83272 6 10.2134L6 12',
  d4: 'M18 12V10.2134C18 9.83272 17.9428 9.70541 17.6497 9.55538C17.0395 9.24292 16.2987 9 15.5 9C14.7013 9 13.9605 9.24292 13.3503 9.55538C13.0572 9.70541 13 9.83272 13 10.2134L13 12',
  d5: 'M21 12V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12',
  d6: 'M18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V17.4932H22V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12Z',
  d7: 'M12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12H6V10.2134C6 9.83272 6.05721 9.70541 6.35025 9.55538C6.96055 9.24292 7.70135 9 8.5 9C9.29865 9 10.0395 9.24292 10.6497 9.55538C10.9428 9.70541 11 9.83272 11 10.2134V12H13V10.2134C13 9.83272 13.0572 9.70541 13.3503 9.55538C13.9606 9.24292 14.7013 9 15.5 9C16.2987 9 17.0394 9.24292 17.6497 9.55538C17.9428 9.70541 18 9.83272 18 10.2134V12H21V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3Z',
  d8: 'M22 21V17.4932M2 21V17.4932M22 17.4932V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V17.4932M22 17.4932H2',
  d9: 'M12 3C9.10067 3 6.41314 3.79978 4.20558 5.16283C3.65804 5.50091 3.38427 5.66995 3.19213 5.99653C3 6.32311 3 6.66893 3 7.36057V12H21V7.36057C21 6.66893 21 6.32311 20.8079 5.99653C20.6157 5.66995 20.342 5.50091 19.7944 5.16283C17.5869 3.79978 14.8993 3 12 3Z',
  d10: 'M22.75 17.4932V20.749C22.75 21.3013 22.3023 21.749 21.75 21.749C21.1977 21.749 20.75 21.3013 20.75 20.749V18.2432L3.25 18.2432L3.25 20.749C3.25 21.3013 2.80229 21.749 2.25 21.749C1.69772 21.749 1.25 21.3013 1.25 20.749L1.25 17.2422C1.25 17.2414 1.25 17.2406 1.25 17.2398L1.25 15.948V15.948V15.9479C1.24997 15.0495 1.24995 14.3003 1.32991 13.7055C1.41432 13.0777 1.59999 12.5109 2.05546 12.0554C2.51093 11.6 3.07773 11.4143 3.70552 11.3299C4.3003 11.2499 5.04951 11.25 5.94797 11.25H5.948L18.052 11.25H18.052C18.9505 11.25 19.6997 11.2499 20.2945 11.3299C20.9223 11.4143 21.4891 11.6 21.9445 12.0554C22.4 12.5109 22.5857 13.0777 22.6701 13.7055C22.7501 14.3003 22.75 15.0495 22.75 15.948V17.2422V17.4932Z',
  d11: 'M12 4.15909C9.35272 4.15909 6.91011 4.87401 4.91309 6.08126C4.62971 6.25257 4.48172 6.34352 4.37606 6.42411C4.29454 6.48628 4.2719 6.51766 4.25313 6.54889C4.25287 6.54934 4.25259 6.5498 4.25229 6.55028C4.24506 6.56216 4.22976 6.5873 4.21777 6.6918C4.20184 6.8306 4.20045 7.01659 4.20045 7.36691V11.7955C4.20045 12.3226 3.76395 12.75 3.22551 12.75C2.68706 12.75 2.25056 12.3226 2.25056 11.7955V7.36691C2.25056 7.32711 2.25042 7.28702 2.25028 7.24667C2.24842 6.70826 2.24639 6.12359 2.57252 5.58084C2.88547 5.06003 3.35046 4.78051 3.79845 4.51121C3.82862 4.49307 3.85871 4.47498 3.88868 4.45687C6.19615 3.06193 8.99392 2.25 12 2.25C15.0061 2.25 17.8039 3.06193 20.1113 4.45687C20.1413 4.47498 20.1714 4.49307 20.2016 4.51121C20.6495 4.78051 21.1145 5.06003 21.4275 5.58084C21.7536 6.12359 21.7516 6.70827 21.7497 7.24667C21.7496 7.28702 21.7494 7.32711 21.7494 7.36691V11.7955C21.7494 12.3226 21.3129 12.75 20.7745 12.75C20.236 12.75 19.7995 12.3226 19.7995 11.7955V7.36691C19.7995 7.01659 19.7982 6.8306 19.7822 6.6918C19.7702 6.5873 19.7549 6.56216 19.7477 6.55027L19.7469 6.54889C19.7281 6.51766 19.7055 6.48628 19.6239 6.42411C19.5183 6.34352 19.3703 6.25257 19.0869 6.08126C17.0899 4.87401 14.6473 4.15909 12 4.15909Z',
  d12: 'M6.00846 8.88779C6.69241 8.53761 7.551 8.25 8.5 8.25C9.449 8.25 10.3076 8.53762 10.9915 8.88779C11.1861 8.9874 11.4418 9.14672 11.6005 9.45247C11.7426 9.72642 11.75 10.0177 11.75 10.2134V12.75H5.25V10.2134C5.25 10.0177 5.25737 9.72642 5.39951 9.45247C5.55816 9.14672 5.81389 8.9874 6.00846 8.88779Z',
  d13: 'M13.0085 8.88779C13.6924 8.53761 14.551 8.25 15.5 8.25C16.449 8.25 17.3076 8.53762 17.9915 8.88779C18.1861 8.9874 18.4418 9.14672 18.6005 9.45247C18.7426 9.72642 18.75 10.0177 18.75 10.2134V12.75H12.25V10.2134C12.25 10.0177 12.2574 9.72642 12.3995 9.45247C12.5582 9.14672 12.8139 8.9874 13.0085 8.88779Z',
  d14: 'M18.052 11.25C18.9505 11.25 19.6997 11.2499 20.2945 11.3299C20.9223 11.4143 21.4891 11.6 21.9445 12.0555C22.4 12.5109 22.5857 13.0777 22.6701 13.7055C22.7501 14.3003 22.75 15.0495 22.75 15.948V17.4932C22.75 17.9074 22.4142 18.2432 22 18.2432H2C1.58579 18.2432 1.25 17.9074 1.25 17.4932L1.25 15.948V15.948C1.24997 15.0495 1.24995 14.3003 1.32991 13.7055C1.41432 13.0777 1.59999 12.5109 2.05546 12.0555C2.51093 11.6 3.07773 11.4143 3.70552 11.3299C4.3003 11.2499 5.04951 11.25 5.94797 11.25H5.948H18.052H18.052Z',
  d15: 'M20.75 18.2422H22C22.4142 18.2422 22.75 17.9064 22.75 17.4922V20.749C22.75 21.3013 22.3023 21.749 21.75 21.749C21.1977 21.749 20.75 21.3013 20.75 20.749V18.2422Z',
  d16: 'M3.25 18.2422V20.749C3.25 21.3013 2.80228 21.749 2.25 21.749C1.69772 21.749 1.25 21.3013 1.25 20.749V17.2422L1.25 17.4922C1.25 17.9064 1.58579 18.2422 2 18.2422H3.25Z',
  d17: 'M18.75 11.2516C18.5284 11.25 18.2957 11.25 18.052 11.25H12.25V10.2134C12.25 10.0177 12.2574 9.72642 12.3995 9.45247C12.5582 9.14672 12.8139 8.9874 13.0085 8.88779C13.6924 8.53761 14.551 8.25 15.5 8.25C16.449 8.25 17.3076 8.53762 17.9915 8.88779C18.1861 8.9874 18.4418 9.14672 18.6005 9.45247C18.7426 9.72642 18.75 10.0177 18.75 10.2134V11.2516Z',
  d18: 'M5.25 11.2516C5.47161 11.25 5.7043 11.25 5.94797 11.25H11.75V10.2134C11.75 10.0177 11.7426 9.72642 11.6005 9.45247C11.4418 9.14672 11.1861 8.9874 10.9915 8.88779C10.3076 8.53762 9.449 8.25 8.5 8.25C7.551 8.25 6.69241 8.53762 6.00846 8.88779C5.81389 8.9874 5.55816 9.14672 5.39951 9.45247C5.25737 9.72642 5.25 10.0177 5.25 10.2134V11.2516Z',
  d19: 'M2.25422 11.8787C2.67166 11.5497 3.16608 11.4024 3.70552 11.3299C3.8601 11.3091 4.0251 11.2938 4.20045 11.2824V7.36691C4.20045 7.01659 4.20184 6.8306 4.21777 6.6918C4.22976 6.5873 4.24506 6.56216 4.25229 6.55028L4.25313 6.54889C4.2719 6.51766 4.29454 6.48628 4.37606 6.42411C4.48172 6.34352 4.62971 6.25257 4.91309 6.08126C6.91011 4.87401 9.35272 4.15909 12 4.15909C14.6473 4.15909 17.0899 4.874 19.0869 6.08126C19.3703 6.25257 19.5183 6.34352 19.6239 6.42411C19.7055 6.48628 19.7281 6.51766 19.7469 6.54889L19.7477 6.55027C19.7549 6.56216 19.7702 6.5873 19.7822 6.6918C19.7982 6.8306 19.7995 7.01659 19.7995 7.36691V11.2824C19.9749 11.2938 20.1399 11.3091 20.2945 11.3299C20.8339 11.4024 21.3283 11.5497 21.7458 11.8787C21.7482 11.8513 21.7494 11.8235 21.7494 11.7955V7.36691L21.7497 7.24667C21.7516 6.70827 21.7536 6.12359 21.4275 5.58084C21.1145 5.06003 20.6495 4.78051 20.2016 4.51121L20.1113 4.45687C17.8039 3.06193 15.0061 2.25 12 2.25C8.99392 2.25 6.19615 3.06193 3.88868 4.45687L3.79845 4.51121C3.35046 4.78051 2.88547 5.06003 2.57252 5.58084C2.24639 6.12359 2.24842 6.70826 2.25028 7.24667L2.25056 7.36691V11.7955C2.25056 11.8235 2.2518 11.8513 2.25422 11.8787Z',
  d20: 'M22 21V12H2V21',
  d21: 'M17 12V9.5H13.5V12',
  d22: 'M10.5 12V9.5H7V12',
  d23: 'M20 12V6C17.7342 4.10935 14.9758 3 12 3C9.0242 3 6.26579 4.10935 4 6V12',
  d24: 'M2.22727 11.5C1.68754 11.5 1.25 11.9477 1.25 12.5V21.5H3.20455V18.25H20.7955V21.5H22.75V12.5C22.75 11.9477 22.3125 11.5 21.7727 11.5H17.75V9.75C17.75 9.33579 17.4142 9 17 9H13.5C13.0858 9 12.75 9.33579 12.75 9.75V11.5H11.25V9.75C11.25 9.33579 10.9142 9 10.5 9H7C6.58579 9 6.25 9.33579 6.25 9.75V11.5H2.22727Z',
  d25: 'M5.19444 6.97848V12.5H3.25V6.03202L3.59934 5.73219C5.95837 3.70749 8.85609 2.5 12 2.5C15.1439 2.5 18.0416 3.70749 20.4007 5.73219L20.75 6.03202V12.5H18.8056V6.97848C16.8302 5.40064 14.4937 4.5 12 4.5C9.50627 4.5 7.16976 5.40064 5.19444 6.97848Z',
};

export const IconBedDoubleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-stroke-rounded IconBedDoubleStrokeRounded"
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

export const IconBedDoubleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-duotone-rounded IconBedDoubleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
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
      />
    </TheIconWrapper>
  );
};

export const IconBedDoubleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-twotone-rounded IconBedDoubleTwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBedDoubleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-solid-rounded IconBedDoubleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedDoubleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-bulk-rounded IconBedDoubleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedDoubleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-stroke-sharp IconBedDoubleStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBedDoubleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bed-double-solid-sharp IconBedDoubleSolidSharp"
    >
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBedDouble: TheIconSelfPack = {
  name: 'BedDouble',
  StrokeRounded: IconBedDoubleStrokeRounded,
  DuotoneRounded: IconBedDoubleDuotoneRounded,
  TwotoneRounded: IconBedDoubleTwotoneRounded,
  SolidRounded: IconBedDoubleSolidRounded,
  BulkRounded: IconBedDoubleBulkRounded,
  StrokeSharp: IconBedDoubleStrokeSharp,
  SolidSharp: IconBedDoubleSolidSharp,
};