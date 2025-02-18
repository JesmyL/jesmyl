import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 10H13',
  d2: 'M5 14H13',
  d3: 'M19 17.6076C17.8693 19.6404 15.812 21 13.4615 21C9.89293 21 7 17.866 7 14V10C7 6.13401 9.89293 3 13.4615 3C15.812 3 17.8693 4.35958 19 6.39241',
  d4: 'M6.05828 9C6.5142 5.11119 9.59331 2 13.4615 2C16.2164 2 18.5879 3.59423 19.8739 5.90634C20.1424 6.38899 19.9687 6.99788 19.4861 7.26633C19.0034 7.53478 18.3945 7.36114 18.1261 6.87849C17.1507 5.12493 15.4076 4 13.4615 4C10.8158 4 8.51234 6.10969 8.0747 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H8V13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H8.0747C8.51234 17.8903 10.8158 20 13.4615 20C15.4076 20 17.1507 18.8751 18.1261 17.1215C18.3945 16.6389 19.0034 16.4652 19.4861 16.7337C19.9687 17.0021 20.1424 17.611 19.8739 18.0937C18.5879 20.4058 16.2164 22 13.4615 22C9.59331 22 6.5142 18.8888 6.05828 15H5C4.44772 15 4 14.5523 4 14C4 13.4477 4.44772 13 5 13H6V11H5C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H6.05828Z',
  d5: 'M4 10C4 9.44772 4.44772 9 5 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H5C4.44772 11 4 10.5523 4 10Z',
  d6: 'M4 14C4 13.4477 4.44772 13 5 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H5C4.44772 15 4 14.5523 4 14Z',
  d7: 'M6 10C6 5.65859 9.26679 2 13.4615 2C16.2164 2 18.5879 3.59423 19.8739 5.90634C20.1424 6.38899 19.9687 6.99788 19.4861 7.26633C19.0034 7.53478 18.3945 7.36114 18.1261 6.87849C17.1507 5.12493 15.4076 4 13.4615 4C10.5191 4 8 6.60942 8 10V14C8 17.3906 10.5191 20 13.4615 20C15.4076 20 17.1507 18.8751 18.1261 17.1215C18.3945 16.6389 19.0034 16.4652 19.4861 16.7337C19.9687 17.0021 20.1424 17.611 19.8739 18.0937C18.5879 20.4058 16.2164 22 13.4615 22C9.26679 22 6 18.3414 6 14V10Z',
  d8: 'M12.5002 11H4.50024V9H12.5002V11Z',
  d9: 'M12.5002 15H4.50024V13H12.5002V15Z',
  d10: 'M5.62573 10C5.62573 5.65859 8.89252 2 13.0873 2C15.8422 2 18.2136 3.59423 19.4996 5.90634L17.7518 6.87849C16.7765 5.12493 15.0333 4 13.0873 4C10.1448 4 7.62573 6.60942 7.62573 10V14C7.62573 17.3906 10.1448 20 13.0873 20C15.0333 20 16.7765 18.8751 17.7518 17.1215L19.4996 18.0937C18.2136 20.4058 15.8422 22 13.0873 22C8.89252 22 5.62573 18.3414 5.62573 14V10Z',
};

export const IconEuroStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-stroke-rounded IconEuroStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconEuroDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-duotone-rounded IconEuroDuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-twotone-rounded IconEuroTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconEuroSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-solid-rounded IconEuroSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEuroBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-bulk-rounded IconEuroBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconEuroStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-stroke-sharp IconEuroStrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconEuroSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="euro-solid-sharp IconEuroSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfEuro: TheIconSelfPack = {
  name: 'Euro',
  StrokeRounded: IconEuroStrokeRounded,
  DuotoneRounded: IconEuroDuotoneRounded,
  TwotoneRounded: IconEuroTwotoneRounded,
  SolidRounded: IconEuroSolidRounded,
  BulkRounded: IconEuroBulkRounded,
  StrokeSharp: IconEuroStrokeSharp,
  SolidSharp: IconEuroSolidSharp,
};