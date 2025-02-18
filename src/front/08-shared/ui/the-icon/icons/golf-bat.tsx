import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.47095 17.263L12 20.9742C11.6197 21.3637 11.255 21.7646 10.7178 21.9214C10.4486 22 10.1597 22 9.58202 22H6.64577C5.12431 22 3.69593 21.514 3.15891 19.9348C2.65447 18.4514 3.35188 15.9891 5.23816 16C5.93452 16.0041 6.44666 16.4237 7.47095 17.263Z',
  d2: 'M12 21L16.5 10',
  d3: 'M17.6206 3.42288L16.1333 9.00001C16.0557 9.29111 16.1934 9.59668 16.4628 9.73142C16.7642 9.8821 17.1308 9.77111 17.298 9.47856L20.1617 4.46705C20.5954 3.70809 20.2263 2.7421 19.397 2.46568C18.6397 2.21323 17.8263 2.65152 17.6206 3.42288Z',
  d4: 'M17.6201 3.42329L16.1328 9.00041C16.0552 9.29152 16.1929 9.59709 16.4623 9.73182C16.7637 9.88251 17.1303 9.77151 17.2975 9.47897L20.1612 4.46745C20.5949 3.7085 20.2258 2.74251 19.3965 2.46608C18.6392 2.21363 17.8258 2.65192 17.6201 3.42329Z',
  d5: 'M2.94218 16.9092C3.36515 15.9347 4.23087 15.0431 5.57066 15.0508C6.09297 15.0539 6.52837 15.2202 6.9517 15.4797C7.339 15.7171 7.75708 16.0597 8.23832 16.4541L12.8035 20.1949C12.9661 20.3281 13.0653 20.5235 13.077 20.7334C13.0886 20.9434 13.0117 21.1485 12.8648 21.299C12.5293 21.6468 11.9601 22.2366 11.2561 22.4422C10.8817 22.5515 10.4899 22.5512 9.99653 22.5508L6.97392 22.5508C6.14316 22.5508 5.27407 22.4196 4.51581 22.0261C3.73634 21.6215 3.11013 20.9567 2.777 19.9771C2.46016 19.0453 2.52674 17.8663 2.94218 16.9092Z',
  d6: 'M17.2267 8.88367C17.7333 9.10351 17.9659 9.69244 17.746 10.1991L13.0758 20.9623C12.856 21.4689 12.2671 21.7014 11.7604 21.4816C11.2538 21.2618 11.0213 20.6728 11.2411 20.1662L15.9113 9.40299C16.1311 8.89634 16.7201 8.66384 17.2267 8.88367Z',
  d7: 'M17.2235 3.03108C17.5406 1.84207 18.7944 1.16647 19.9618 1.55561C21.2401 1.9817 21.809 3.47071 21.1405 4.64059L18.2767 9.65211C17.9121 10.2903 17.1124 10.5324 16.455 10.2037C15.8672 9.90977 15.5669 9.2432 15.7363 8.6082L17.2235 3.03108Z',
  d8: 'M12 21.5002H7.14577C5.62431 21.5002 4.19593 21.0142 3.65891 19.435C3.15447 17.9517 3.85188 15.4894 5.73816 15.5003C9 15.5003 12 21.5002 12 21.5002Z',
  d9: 'M16.3198 10.9182L17.0808 11.1859L20.328 4.76069C20.7524 3.92099 20.359 2.88026 19.5035 2.57932C18.7302 2.3073 17.896 2.75794 17.6528 3.57897L15.5588 10.6505L16.3198 10.9182ZM16.3198 10.9182L12 21.5',
  d10: 'M19.7529 1.87243C18.5438 1.44713 17.2896 2.16647 16.9342 3.36663L14.3932 10.9168L15.1232 11.2057L11.7257 19.5282C11.4349 19.0718 11.0845 18.558 10.6866 18.0425C10.0863 17.2647 9.35956 16.4588 8.54718 15.8412C7.74153 15.2287 6.78515 14.7514 5.74097 14.7508C4.40242 14.744 3.53741 15.6352 3.11467 16.6092C2.69923 17.5663 2.63264 18.7453 2.94948 19.677C3.28261 20.6566 3.90882 21.3214 4.6883 21.726C5.44655 22.1196 6.31565 22.2507 7.14641 22.2507H12.7842L16.9835 11.9419L17.6662 12.2121L20.9979 5.09959C21.612 3.88439 21.0651 2.33403 19.7529 1.87243Z',
};

export const IconGolfBatStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-stroke-rounded IconGolfBatStrokeRounded"
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

export const IconGolfBatDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-duotone-rounded IconGolfBatDuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGolfBatTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-twotone-rounded IconGolfBatTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.5" 
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

export const IconGolfBatSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-solid-rounded IconGolfBatSolidRounded"
    >
      <path 
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGolfBatBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-bulk-rounded IconGolfBatBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGolfBatStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-stroke-sharp IconGolfBatStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGolfBatSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="golf-bat-solid-sharp IconGolfBatSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGolfBat: TheIconSelfPack = {
  name: 'GolfBat',
  StrokeRounded: IconGolfBatStrokeRounded,
  DuotoneRounded: IconGolfBatDuotoneRounded,
  TwotoneRounded: IconGolfBatTwotoneRounded,
  SolidRounded: IconGolfBatSolidRounded,
  BulkRounded: IconGolfBatBulkRounded,
  StrokeSharp: IconGolfBatStrokeSharp,
  SolidSharp: IconGolfBatSolidSharp,
};