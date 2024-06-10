import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 14V22',
  d2: 'M6 7.96546C7 6.49988 9 5.66919 10.2857 6.12252C11.7609 6.64264 12.0271 8.38068 13.5 8.90686C15 9.44274 15.5 7.46966 18 7.93527',
  d3: 'M12 14C15.3137 14 18 11.3137 18 8C18 7.88062 17.9965 7.76206 17.9896 7.64441L13.5 9L9.5 6L6.02054 7.5C6.00694 7.66487 6 7.83162 6 8C6 11.3137 8.68629 14 12 14Z',
  d4: 'M6 7.9668C7 6.50122 9 5.67054 10.2857 6.12387C11.7609 6.64398 12.0271 8.38202 13.5 8.90821C15 9.44408 15.5 7.471 18 7.93662',
  d5: 'M6 7.96485C7 6.49927 9 5.66858 10.2857 6.12191C11.7609 6.64203 12.0271 8.38007 13.5 8.90625C15 9.44213 15.5 7.46905 18 7.93466',
  d6: 'M12.0312 12.75C12.5835 12.75 13.0312 13.1977 13.0312 13.75V21.75C13.0312 22.3023 12.5835 22.75 12.0312 22.75C11.479 22.75 11.0312 22.3023 11.0312 21.75V13.75C11.0312 13.1977 11.479 12.75 12.0312 12.75Z',
  d7: 'M5.42703 7.5194C5.38314 7.57466 5.29557 7.54107 5.30102 7.47071C5.57099 3.99018 8.48078 1.25 12.0306 1.25C15.3481 1.25 18.1066 3.6433 18.6738 6.79753C18.6908 6.89209 18.6993 6.93937 18.6938 6.98432C18.6765 7.1259 18.5444 7.24506 18.4018 7.24783C18.3218 7.24939 18.2456 7.21248 18.1678 7.198C16.6621 6.91755 15.7206 7.39149 15.0249 7.80121L14.9825 7.82617C14.3039 8.22599 14.134 8.32608 13.7828 8.20063C13.2843 8.02253 12.9723 7.64455 12.5186 7.05503C11.9882 6.36533 11.4112 5.71338 10.5656 5.41525C9.68614 5.10515 8.66188 5.25605 7.77266 5.63428C6.87817 6.01475 6.0163 6.66676 5.42703 7.5194Z',
  d8: 'M18.2211 8.7706C18.4623 8.84004 18.583 8.87476 18.6437 8.97624C18.7045 9.07773 18.6796 9.19341 18.6299 9.42476C17.9759 12.4685 15.2697 14.75 12.0306 14.75C9.03576 14.75 6.49647 12.7996 5.61357 10.0998C5.56903 9.9636 5.54676 9.8955 5.56012 9.82109C5.74039 8.81678 7.49314 7.38323 8.35977 7.0146C9.04198 6.72443 9.66058 6.68665 10.0668 6.82989C10.6413 7.03244 11.0115 7.5558 11.3678 8.01925C11.7802 8.55594 12.3331 9.27557 13.2782 9.61319C14.4198 10.021 15.2502 9.4093 15.7861 9.09371C16.3341 8.77099 16.8862 8.49388 17.8592 8.66646L18.2211 8.7706Z',
  d9: 'M18.2195 8.77175C18.4608 8.84119 18.5814 8.87591 18.6422 8.97739C18.7029 9.07887 18.6781 9.19455 18.6284 9.42591C17.9744 12.4696 15.2681 14.7511 12.029 14.7511C9.03418 14.7511 6.49489 12.8008 5.61199 10.101C5.56745 9.96475 5.54518 9.89664 5.55854 9.82224C5.73881 8.81793 7.49156 7.38437 8.35819 7.01575C9.0404 6.72558 9.659 6.6878 10.0652 6.83104C10.6397 7.03358 11.0099 7.55695 11.3662 8.0204C11.7786 8.55709 12.3315 9.27672 13.2766 9.61434C14.4182 10.0222 15.2487 9.41045 15.7845 9.09486C16.3325 8.77214 16.8846 8.49502 17.8576 8.66761L18.2195 8.77175Z',
  d10: 'M11.25 22.25V14.25H12.75V22.25H11.25Z',
  d11: 'M5.50942 6.63242C6.32151 3.81291 8.92612 1.75 12.0137 1.75C15.4569 1.75 18.2995 4.31538 18.7253 7.63459C17.2657 7.51698 16.3095 7.91347 15.5558 8.27616L15.4319 8.33591C14.6876 8.69522 14.3735 8.84681 13.8326 8.68893C13.1619 8.49313 12.7594 8.08396 12.2167 7.50784L12.186 7.4752C11.6675 6.92437 11.0084 6.22427 9.89604 5.9038C8.89866 5.61647 7.71515 5.7509 6.65686 6.1187C6.26664 6.25432 5.87914 6.42651 5.50942 6.63242Z',
  d12: 'M18.75 9.14401C18.4249 12.5698 15.5331 15.25 12.0137 15.25C8.34369 15.25 5.35605 12.3354 5.25 8.70001C5.75019 8.20043 6.44156 7.7878 7.18332 7.53C8.04827 7.2294 8.87541 7.17516 9.45158 7.34115C10.1225 7.53443 10.5252 7.94182 11.0669 8.5169L11.1019 8.55406C11.6188 9.10327 12.2761 9.80165 13.3828 10.1247C14.5394 10.4623 15.3955 10.0395 16.0646 9.70897C16.1277 9.67778 16.1892 9.64741 16.2492 9.61858C16.8964 9.30711 17.5923 9.01687 18.75 9.14401Z',
};

export const IconLollipopStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-stroke-rounded IconLollipopStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
      />
    </TheIconWrapper>
  );
};

export const IconLollipopDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-duotone-rounded IconLollipopDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
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

export const IconLollipopTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-twotone-rounded IconLollipopTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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

export const IconLollipopSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-solid-rounded IconLollipopSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLollipopBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-bulk-rounded IconLollipopBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLollipopStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-stroke-sharp IconLollipopStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLollipopSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lollipop-solid-sharp IconLollipopSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLollipop: TheIconSelfPack = {
  name: 'Lollipop',
  StrokeRounded: IconLollipopStrokeRounded,
  DuotoneRounded: IconLollipopDuotoneRounded,
  TwotoneRounded: IconLollipopTwotoneRounded,
  SolidRounded: IconLollipopSolidRounded,
  BulkRounded: IconLollipopBulkRounded,
  StrokeSharp: IconLollipopStrokeSharp,
  SolidSharp: IconLollipopSolidSharp,
};