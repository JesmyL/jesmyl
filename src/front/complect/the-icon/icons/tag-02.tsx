import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.73552 11.6867C1.78253 12.7511 1.76203 14.3569 2.63665 15.4865C4.37226 17.7281 6.2719 19.6277 8.51351 21.3633C9.64313 22.238 11.2489 22.2175 12.3133 21.2645C15.203 18.6771 17.8494 15.9731 20.4033 13.0016C20.6558 12.7078 20.8137 12.3477 20.8492 11.9619C21.0059 10.2561 21.3279 5.34144 19.9932 4.00675C18.6586 2.67207 13.7439 2.99408 12.0381 3.15083C11.6523 3.18627 11.2922 3.34421 10.9984 3.59671C8.02692 6.15064 5.32291 8.797 2.73552 11.6867Z',
  d2: 'M7.5 14.5L9.5 16.5',
  d3: 'M18 6L22 2',
  d4: 'M21.0429 1.54289C21.4334 1.15237 22.0666 1.15237 22.4571 1.54289C22.8476 1.93342 22.8476 2.56658 22.4571 2.95711L21.09 4.32418C21.246 4.66505 21.3585 5.03715 21.443 5.40504C21.6125 6.14286 21.6955 6.9864 21.7298 7.81406C21.7986 9.47191 21.6755 11.1654 21.596 12.0306C21.5457 12.5782 21.3216 13.0837 20.972 13.4904C18.3971 16.4863 15.7279 19.2137 12.8135 21.8232C11.4664 23.0294 9.45598 23.0416 8.05431 21.9564C5.7626 20.182 3.81798 18.2373 2.04358 15.9456C0.958315 14.544 0.970558 12.5335 2.17672 11.1864C4.78621 8.27201 7.51361 5.60281 10.5095 3.02791C10.9163 2.67833 11.4217 2.45428 11.9694 2.40396C12.8346 2.32446 14.528 2.20136 16.1859 2.27014C17.0135 2.30447 17.8571 2.38746 18.5949 2.55692C18.9628 2.64143 19.335 2.75396 19.6758 2.90994L21.0429 1.54289ZM6.79283 13.7929C6.40231 14.1834 6.40231 14.8166 6.79283 15.2071L8.79283 17.2071C9.18336 17.5976 9.81652 17.5976 10.207 17.2071C10.5976 16.8166 10.5976 16.1834 10.207 15.7929L8.20705 13.7929C7.81652 13.4024 7.18336 13.4024 6.79283 13.7929Z',
  d5: 'M16.1859 2.27014C14.5281 2.20136 12.8346 2.32446 11.9694 2.40396C11.4218 2.45428 10.9163 2.67833 10.5096 3.02791C7.51367 5.60281 4.78627 8.27201 2.17677 11.1864C0.970617 12.5335 0.958374 14.544 2.04364 15.9456C3.81804 18.2373 5.76266 20.182 8.05436 21.9564C9.45604 23.0416 11.4665 23.0294 12.8136 21.8232C15.728 19.2137 18.3972 16.4863 20.9721 13.4904C21.3217 13.0837 21.5457 12.5782 21.596 12.0306C21.6755 11.1654 21.7986 9.47191 21.7299 7.81406C21.6955 6.9864 21.6125 6.14286 21.4431 5.40504C21.2793 4.69195 21.0102 3.96305 20.5236 3.47641C20.0369 2.98977 19.308 2.7207 18.595 2.55692C17.8571 2.38746 17.0136 2.30447 16.1859 2.27014Z',
  d6: 'M6.79289 13.7929C6.40237 14.1834 6.40237 14.8166 6.79289 15.2071L8.79289 17.2071C9.18342 17.5976 9.81658 17.5976 10.2071 17.2071C10.5976 16.8166 10.5976 16.1834 10.2071 15.7929L8.20711 13.7929C7.81658 13.4024 7.18342 13.4024 6.79289 13.7929Z',
  d7: 'M22.4571 1.54289C22.0666 1.15237 21.4334 1.15237 21.0429 1.54289L17.0429 5.54289C16.6524 5.93342 16.6524 6.56658 17.0429 6.95711C17.4334 7.34763 18.0666 7.34763 18.4571 6.95711L22.4571 2.95711C22.8476 2.56658 22.8476 1.93342 22.4571 1.54289Z',
  d8: 'M7.9873 14.0151L9.98862 16.0189',
  d9: 'M16.9956 7.0055L22.0002 1.99854',
  d10: 'M11.042 21.9864C11.0224 22.0059 10.9909 22.0059 10.9713 21.9864L2.01474 13.0666C1.99513 13.0471 1.99508 13.0154 2.01463 12.9958L10.9889 4.00049L20.016 4.00049L20.016 13.0329L11.042 21.9864Z',
  d11: 'M21.3358 1.25L16.3358 6.25L17.75 7.66421L22.75 2.66421L21.3358 1.25Z',
  d12: 'M20.75 4C20.75 3.58579 20.4142 3.25 20 3.25H10.6893L1.46967 12.4696C1.32902 12.6103 1.25 12.8011 1.25 13C1.25 13.1989 1.32902 13.3897 1.46967 13.5303L10.4697 22.5303C10.6103 22.671 10.8011 22.75 11 22.75C11.1989 22.75 11.3897 22.671 11.5303 22.5303L20.75 13.3107V4ZM8.70703 13.2928L10.707 15.2928L9.29282 16.7071L7.29282 14.7071L8.70703 13.2928Z',
};

export const IconTag02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-stroke-rounded IconTag02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconTag02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-duotone-rounded IconTag02DuotoneRounded"
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

export const IconTag02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-twotone-rounded IconTag02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconTag02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-solid-rounded IconTag02SolidRounded"
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

export const IconTag02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-bulk-rounded IconTag02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconTag02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-stroke-sharp IconTag02StrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTag02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tag-02-solid-sharp IconTag02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTag02: TheIconSelfPack = {
  name: 'Tag02',
  StrokeRounded: IconTag02StrokeRounded,
  DuotoneRounded: IconTag02DuotoneRounded,
  TwotoneRounded: IconTag02TwotoneRounded,
  SolidRounded: IconTag02SolidRounded,
  BulkRounded: IconTag02BulkRounded,
  StrokeSharp: IconTag02StrokeSharp,
  SolidSharp: IconTag02SolidSharp,
};