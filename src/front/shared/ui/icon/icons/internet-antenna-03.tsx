import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 18.001C2.74418 16.3295 2 14.2516 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.2516 21.2558 16.3295 20 18.001',
  d2: 'M7.52779 16C6.57771 14.9385 6 13.5367 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 13.5367 17.4223 14.9385 16.4722 16',
  d3: 'M12 12V22M9 22H15',
  d4: 'M18.001 12.0005C18.001 15.3145 15.3145 18.001 12.0005 18.001C8.68651 18.001 6 15.3145 6 12.0005C6 8.68651 8.68651 6 12.0005 6C15.3145 6 18.001 8.68651 18.001 12.0005Z',
  d5: 'M12 3C7.02944 3 3 7.02944 3 12C3 14.0276 3.66932 15.8961 4.79949 17.4003C5.13124 17.8418 5.04222 18.4687 4.60067 18.8005C4.15913 19.1322 3.53225 19.0432 3.20051 18.6017C1.81903 16.7629 1 14.4757 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 14.4757 22.181 16.7629 20.7995 18.6017C20.4678 19.0432 19.8409 19.1322 19.3993 18.8005C18.9578 18.4687 18.8688 17.8418 19.2005 17.4003C20.3307 15.8961 21 14.0276 21 12C21 7.02944 16.9706 3 12 3Z',
  d6: 'M12 7C9.23858 7 7 9.23858 7 12C7 13.2812 7.48059 14.4478 8.27292 15.3331C8.64125 15.7446 8.60623 16.3768 8.1947 16.7451C7.78317 17.1135 7.15098 17.0784 6.78265 16.6669C5.67482 15.4291 5 13.7922 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 13.7922 18.3252 15.4291 17.2173 16.6669C16.849 17.0784 16.2168 17.1135 15.8053 16.7451C15.3938 16.3768 15.3588 15.7446 15.7271 15.3331C16.5194 14.4478 17 13.2812 17 12C17 9.23858 14.7614 7 12 7Z',
  d7: 'M12 11C12.5523 11 13 11.4477 13 12V21H15C15.5523 21 16 21.4477 16 22C16 22.5523 15.5523 23 15 23H9C8.44772 23 8 22.5523 8 22C8 21.4477 8.44772 21 9 21H11V12C11 11.4477 11.4477 11 12 11Z',
  d8: 'M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.9761 20.3643 15.8009 19.2858 17.2848L20.8746 18.4998C22.2104 16.6787 23 14.4302 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 14.4302 1.78926 16.6789 3.12504 18.5L4.71413 17.2848C3.6357 15.8009 3 13.976 3 12Z',
  d9: 'M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 13.0615 16.6701 14.0442 16.1064 14.8535L17.6963 16.0693C18.5165 14.9227 19 13.5169 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 13.5169 5.48345 14.9226 6.30371 16.0692L7.89352 14.8535C7.32984 14.0442 7 13.0614 7 12Z',
  d10: 'M11 21V12H13V21H15V23H9V21H11Z',
};

export const IconInternetAntenna03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-stroke-rounded IconInternetAntenna03StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInternetAntenna03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-duotone-rounded IconInternetAntenna03DuotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInternetAntenna03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-twotone-rounded IconInternetAntenna03TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInternetAntenna03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-solid-rounded IconInternetAntenna03SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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

export const IconInternetAntenna03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-bulk-rounded IconInternetAntenna03BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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

export const IconInternetAntenna03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-stroke-sharp IconInternetAntenna03StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconInternetAntenna03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="internet-antenna-03-solid-sharp IconInternetAntenna03SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInternetAntenna03: TheIconSelfPack = {
  name: 'InternetAntenna03',
  StrokeRounded: IconInternetAntenna03StrokeRounded,
  DuotoneRounded: IconInternetAntenna03DuotoneRounded,
  TwotoneRounded: IconInternetAntenna03TwotoneRounded,
  SolidRounded: IconInternetAntenna03SolidRounded,
  BulkRounded: IconInternetAntenna03BulkRounded,
  StrokeSharp: IconInternetAntenna03StrokeSharp,
  SolidSharp: IconInternetAntenna03SolidSharp,
};