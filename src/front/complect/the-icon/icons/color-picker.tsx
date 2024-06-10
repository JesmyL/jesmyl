import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.435 7L7.15915 13.2759M7.15915 13.2759L4.82728 15.6077C3.92569 16.5093 3.47489 16.9601 3.23745 17.5334C3 18.1066 3 18.7441 3 20.0192V21H3.98082C5.25586 21 5.89338 21 6.46663 20.7626C7.03988 20.5251 7.49068 20.0743 8.39227 19.1727L14.2891 13.2759M7.15915 13.2759H14.2891M14.2891 13.2759L17 10.565',
  d2: 'M19.2087 8.38869L20.82 10M19.2087 8.38869L20.0705 7.52682C20.363 7.23431 20.5093 7.08805 20.611 6.94529C21.1297 6.21676 21.1297 5.23953 20.611 4.511C20.5093 4.36824 20.363 4.22198 20.0705 3.92947C19.778 3.63697 19.6318 3.4907 19.489 3.38905C18.7605 2.87032 17.7832 2.87032 17.0547 3.38905C16.912 3.4907 16.7657 3.63695 16.4732 3.92947L15.6113 4.79133M19.2087 8.38869L15.6113 4.79133M14 3.18002L15.6113 4.79133',
  d3: 'M3.98082 20.9995H3V20.0187C3 18.7437 3 18.1061 3.23745 17.5329C3.47489 16.9596 3.92569 16.5089 4.82728 15.6073L7.15915 13.2754H14.2891L8.39227 19.1722C7.49068 20.0738 7.03988 20.5246 6.46663 20.7621C5.89338 20.9995 5.25586 20.9995 3.98082 20.9995Z',
  d4: 'M20.0705 7.52682L19.2087 8.38869L15.6113 4.79133L16.4732 3.92947C16.7657 3.63695 16.912 3.4907 17.0547 3.38905C17.7833 2.87032 18.7605 2.87032 19.489 3.38905C19.6318 3.4907 19.778 3.63697 20.0705 3.92947C20.3631 4.22198 20.5093 4.36824 20.611 4.511C21.1297 5.23953 21.1297 6.21676 20.611 6.94528C20.5093 7.08805 20.3631 7.23431 20.0705 7.52682Z',
  d5: 'M14.0127 7.90374C14.391 7.52543 14.391 6.91205 14.0127 6.53374C13.6344 6.15542 13.021 6.15542 12.6427 6.53374L4.18564 14.9907C3.42743 15.7478 2.85915 16.3152 2.55393 17.0521C2.2487 17.789 2.24929 18.5921 2.25008 19.6636L2.25016 20.7811C2.25016 21.3161 2.68388 21.7498 3.2189 21.7498L4.33645 21.7499C5.40794 21.7507 6.21101 21.7513 6.94789 21.4461C7.68476 21.1409 8.2522 20.5726 9.00929 19.8144L17.4663 11.3573C17.8446 10.979 17.8446 10.3656 17.4663 9.98728C17.0879 9.60896 16.4746 9.60897 16.0963 9.98728L13.7334 12.3501C13.6467 12.4369 13.6033 12.4802 13.5482 12.503C13.4931 12.5259 13.4318 12.5259 13.3091 12.5259H10.8391C10.2226 12.5259 9.91439 12.5259 9.83768 12.3407C9.76097 12.1555 9.97893 11.9375 10.4148 11.5016L14.0127 7.90374Z',
  d6: 'M14.8952 2.53227C14.5188 2.15591 13.9086 2.15591 13.5323 2.53227C13.1559 2.90862 13.1559 3.51882 13.5323 3.89517L20.1048 10.4677C20.4812 10.8441 21.0914 10.8441 21.4677 10.4677C21.8441 10.0914 21.8441 9.48118 21.4677 9.10483L20.5457 8.18279C20.4796 8.11668 20.4804 8.00883 20.5464 7.94263L20.5751 7.91391L20.6184 7.87059C20.858 7.63118 21.0398 7.44959 21.1736 7.26161C21.8522 6.30859 21.8522 5.03021 21.1736 4.07718C21.0398 3.8892 20.858 3.70762 20.6184 3.46822L20.5317 3.38147C20.2923 3.14193 20.1108 2.9602 19.9228 2.82637C18.9698 2.14779 17.6914 2.14779 16.7384 2.82637C16.5504 2.96022 16.3688 3.14194 16.1294 3.38153L16.0861 3.42489L16.0573 3.45356C15.9911 3.51959 15.8833 3.5204 15.8172 3.45429L14.8952 2.53227Z',
  d7: 'M19.0022 9.00247L21.4996 6.5019L17.5037 2.50098L15.0063 5.00155M19.0022 9.00247L20.5006 10.5028M19.0022 9.00247L15.0063 5.00155M15.0063 5.00155L13.5078 3.50121',
  d8: 'M13.4879 6.4834L6.51454 13.4827M6.51454 13.4827L2.5 17.5121V21.499H6.52427L14.5384 13.4827M6.51454 13.4827H14.5384M14.5384 13.4827L17.5156 10.5046',
  d9: 'M12.9697 5.96973L14.0303 7.03039L8.31066 12.7501H14.1893L16.9697 9.96973L18.0303 11.0304L6.81066 22.2501H1.75V17.1894L12.9697 5.96973Z',
  d10: 'M20.0597 8.99999L21.0294 9.96966L19.9688 11.0303L12.9688 4.03032L14.0294 2.96966L14.9991 3.93933L17.25 1.75L22.25 6.75L20.0597 8.99999Z',
};

export const IconColorPickerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-stroke-rounded IconColorPickerStrokeRounded"
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

export const IconColorPickerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-duotone-rounded IconColorPickerDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconColorPickerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-twotone-rounded IconColorPickerTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconColorPickerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-solid-rounded IconColorPickerSolidRounded"
    >
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

export const IconColorPickerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-bulk-rounded IconColorPickerBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconColorPickerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-stroke-sharp IconColorPickerStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconColorPickerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="color-picker-solid-sharp IconColorPickerSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfColorPicker: TheIconSelfPack = {
  name: 'ColorPicker',
  StrokeRounded: IconColorPickerStrokeRounded,
  DuotoneRounded: IconColorPickerDuotoneRounded,
  TwotoneRounded: IconColorPickerTwotoneRounded,
  SolidRounded: IconColorPickerSolidRounded,
  BulkRounded: IconColorPickerBulkRounded,
  StrokeSharp: IconColorPickerStrokeSharp,
  SolidSharp: IconColorPickerSolidSharp,
};