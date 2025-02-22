import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z',
  d2: 'M4 10V18.5M8 10V18.5',
  d3: 'M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11',
  d4: 'M21.5 14.5L14.5 21.5',
  d5: 'M2 21.5C2 19.8431 3.34315 18.5 5 18.5H11V22H2.5C2.22386 22 2 21.7761 2 21.5Z',
  d6: 'M8 18.5V10H4V18.5H8Z',
  d7: 'M9.8595 1.76207C10.6009 1.43823 11.2709 1.25 11.9999 1.25C12.7289 1.25 13.3989 1.43823 14.1403 1.76206C14.8593 2.07612 15.6931 2.54014 16.7419 3.12379L20.884 5.42893C21.4604 5.74971 21.9428 6.15261 22.2742 6.69585C22.6073 7.24181 22.7499 7.86731 22.7499 8.56907C22.7504 8.82453 22.7509 9.14972 22.6894 9.38151C22.5344 9.9648 22.1651 10.3408 21.7129 10.5422C21.3055 10.7238 20.8629 10.75 20.5306 10.75H3.4692C3.13696 10.75 2.69436 10.7238 2.28695 10.5422C1.8347 10.3408 1.46544 9.9648 1.31048 9.38151C1.2489 9.14972 1.24945 8.82452 1.24992 8.56907C1.24992 7.86731 1.39257 7.24181 1.72562 6.69585C2.05702 6.15261 2.53942 5.74971 3.11584 5.42893L7.25799 3.12378L7.258 3.12377C8.30672 2.54014 9.1405 2.07612 9.8595 1.76207Z',
  d8: 'M1.25 21.5C1.25 19.4289 2.92893 17.75 5 17.75H11C11.4142 17.75 11.75 18.0858 11.75 18.5V22C11.75 22.4142 11.4142 22.75 11 22.75H2.5C1.80964 22.75 1.25 22.1904 1.25 21.5Z',
  d9: 'M13.7929 22.2071C13.4024 21.8166 13.4024 21.1834 13.7929 20.7929L20.7929 13.7929C21.1834 13.4024 21.8166 13.4024 22.2071 13.7929C22.5976 14.1834 22.5976 14.8166 22.2071 15.2071L15.2071 22.2071C14.8166 22.5976 14.1834 22.5976 13.7929 22.2071Z',
  d10: 'M13.5 15C13.5 14.1716 14.1716 13.5 15 13.5C15.8284 13.5 16.5 14.1716 16.5 15C16.5 15.8284 15.8284 16.5 15 16.5C14.1716 16.5 13.5 15.8284 13.5 15Z',
  d11: 'M19.5 21C19.5 20.1716 20.1716 19.5 21 19.5C21.8284 19.5 22.5 20.1716 22.5 21C22.5 21.8284 21.8284 22.5 21 22.5C20.1716 22.5 19.5 21.8284 19.5 21Z',
  d12: 'M3.24976 17.0825V11.7461L8.74976 11.7497V16.7498H4.99976C4.38175 16.7498 3.79132 16.8678 3.24976 17.0825Z',
  d13: 'M4 10.0054V18.5004M8 10.0054V18.5004',
  d14: 'M10.9997 18.5005H2.00028L2 21.9984H10.9997',
  d15: 'M21.5 14.5029L14.5 21.4988',
  d16: 'M15.25 16.0012C15.6642 16.0012 16 15.6658 16 15.2521C16 14.8383 15.6642 14.5029 15.25 14.5029C14.8358 14.5029 14.5 14.8383 14.5 15.2521C14.5 15.6658 14.8358 16.0012 15.25 16.0012Z',
  d17: 'M20.75 21.4978C21.1642 21.4978 21.5 21.1624 21.5 20.7486C21.5 20.3349 21.1642 19.9995 20.75 19.9995C20.3358 19.9995 20 20.3349 20 20.7486C20 21.1624 20.3358 21.4978 20.75 21.4978Z',
  d18: 'M2.00551 7.0115L11.9844 2.00253C11.9872 2.00111 11.9906 2.00111 11.9934 2.00252L21.9945 7.0115C21.9979 7.01319 22 7.01665 22 7.02043V10.0056H2V7.02042C2 7.01664 2.00213 7.01319 2.00551 7.0115Z',
  d19: 'M11.6646 1.32918C11.8757 1.22361 12.1243 1.22361 12.3354 1.32918L22.3354 6.32918C22.5895 6.45622 22.75 6.71592 22.75 7V9.75H1.25V7C1.25 6.71592 1.4105 6.45622 1.66459 6.32918L11.6646 1.32918Z',
  d20: 'M1.25 19.5C1.25 19.0858 1.58579 18.75 2 18.75H11L10.9997 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22V19.5Z',
  d21: 'M8.75 11.25H3.25V17.25H8.75V11.25Z',
  d22: 'M13.7928 20.7928L20.7928 13.7928L22.207 15.207L15.207 22.207L13.7928 20.7928Z',
  d23: 'M13.75 15.25C13.75 14.4216 14.4216 13.75 15.25 13.75C16.0784 13.75 16.75 14.4216 16.75 15.25C16.75 16.0784 16.0784 16.75 15.25 16.75C14.4216 16.75 13.75 16.0784 13.75 15.25Z',
  d24: 'M19.25 20.75C19.25 19.9216 19.9216 19.25 20.75 19.25C21.5784 19.25 22.25 19.9216 22.25 20.75C22.25 21.5784 21.5784 22.25 20.75 22.25C19.9216 22.25 19.25 21.5784 19.25 20.75Z',
};

export const IconTaxesStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-stroke-rounded IconTaxesStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <circle 
        cx="15.25" 
        cy="15.25" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20.75" 
        cy="20.75" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconTaxesDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-duotone-rounded IconTaxesDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
      <circle 
        cx="15.25" 
        cy="15.25" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20.75" 
        cy="20.75" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconTaxesTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-twotone-rounded IconTaxesTwotoneRounded"
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
      />
      <path 
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
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="15.25" 
        cy="15.25" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="20.75" 
        cy="20.75" 
        r="0.75" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconTaxesSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-solid-rounded IconTaxesSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconTaxesBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-bulk-rounded IconTaxesBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconTaxesStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-stroke-sharp IconTaxesStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaxesSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="taxes-solid-sharp IconTaxesSolidSharp"
    >
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaxes: TheIconSelfPack = {
  name: 'Taxes',
  StrokeRounded: IconTaxesStrokeRounded,
  DuotoneRounded: IconTaxesDuotoneRounded,
  TwotoneRounded: IconTaxesTwotoneRounded,
  SolidRounded: IconTaxesSolidRounded,
  BulkRounded: IconTaxesBulkRounded,
  StrokeSharp: IconTaxesStrokeSharp,
  SolidSharp: IconTaxesSolidSharp,
};