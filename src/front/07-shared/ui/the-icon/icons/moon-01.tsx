import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.0985 7.84477C20.458 8.55417 19.5311 9 18.5 9C16.567 9 15 7.433 15 5.5C15 4.46895 15.4458 3.54203 16.1552 2.90149M21.0985 7.84477C21.6774 9.11025 22 10.5174 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4826 2 14.8898 2.32262 16.1552 2.90149M21.0985 7.84477C20.0998 5.66155 18.3384 3.90018 16.1552 2.90149',
  d2: 'M10 8H10.0064',
  d3: 'M7 14H7.00635',
  d4: 'M16 16C16 17.1046 15.1046 18 14 18C12.8954 18 12 17.1046 12 16C12 14.8954 12.8954 14 14 14C15.1046 14 16 14.8954 16 16Z',
  d5: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.4826 2 14.8898 2.32262 16.1552 2.90149C15.4458 3.54203 15 4.4698 15 5.50085C15 7.43385 16.567 9.00085 18.5 9.00085C19.5311 9.00085 20.458 8.55417 21.0985 7.84477C21.6774 9.11025 22 10.5174 22 12ZM14 18C15.1046 18 16 17.1046 16 16C16 14.8954 15.1046 14 14 14C12.8954 14 12 14.8954 12 16C12 17.1046 12.8954 18 14 18Z',
  d6: 'M16.6783 3.43926L17.3888 2.69628C19.0333 3.65069 20.4011 5.02832 21.3436 6.68053L20.581 7.29832L20.5418 7.34169C20.0375 7.90024 19.3101 8.24953 18.5 8.24953C16.9812 8.24953 15.75 7.01832 15.75 5.49953C15.75 4.68947 16.0993 3.96202 16.6578 3.45769L16.6783 3.43926ZM22.75 12C22.75 10.6148 22.4876 9.28927 22.0094 8.07162L21.6138 8.39208C20.8387 9.22611 19.73 9.74953 18.5 9.74953C16.1528 9.74953 14.25 7.84674 14.25 5.49953C14.25 4.25787 14.7834 3.13979 15.6313 2.36376L15.9717 2.00774C14.7422 1.51865 13.4017 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12ZM10 7C9.44771 7 9 7.44772 9 8C9 8.55228 9.44771 9 10 9H10.0064C10.5586 9 11.0064 8.55228 11.0064 8C11.0064 7.44772 10.5586 7 10.0064 7H10ZM6 14C6 13.4477 6.44772 13 7 13H7.00635C7.55864 13 8.00635 13.4477 8.00635 14C8.00635 14.5523 7.55864 15 7.00635 15H7C6.44772 15 6 14.5523 6 14ZM12.75 16C12.75 15.3096 13.3096 14.75 14 14.75C14.6904 14.75 15.25 15.3096 15.25 16C15.25 16.6904 14.6904 17.25 14 17.25C13.3096 17.25 12.75 16.6904 12.75 16ZM14 13.25C12.4812 13.25 11.25 14.4812 11.25 16C11.25 17.5188 12.4812 18.75 14 18.75C15.5188 18.75 16.75 17.5188 16.75 16C16.75 14.4812 15.5188 13.25 14 13.25Z',
  d7: 'M17.3891 2.69645L16.6783 3.43975L16.6578 3.45818C16.0993 3.96251 15.75 4.68996 15.75 5.50002C15.75 7.01881 16.9812 8.25002 18.5 8.25002C19.3101 8.25002 20.0375 7.90073 20.5418 7.34217L20.581 7.29881L21.3438 6.68087C20.4013 5.02861 19.0335 3.65092 17.3891 2.69645Z',
  d8: 'M22.0095 8.07199C22.4877 9.28953 22.75 10.6149 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C13.4018 1.25 14.7425 1.51869 15.9721 2.00788L15.6313 2.36425C14.7834 3.14028 14.25 4.25836 14.25 5.50002C14.25 7.84723 16.1528 9.75002 18.5 9.75002C19.73 9.75002 20.8387 9.22659 21.6138 8.39257L22.0095 8.07199Z',
  d9: 'M17.3891 2.69531L16.6783 3.4386L16.6578 3.45703C16.0993 3.96137 15.75 4.68882 15.75 5.49888C15.75 7.01766 16.9812 8.24888 18.5 8.24888C19.3101 8.24888 20.0375 7.89958 20.5418 7.34103L20.581 7.29767L21.3438 6.67972C20.4013 5.02747 19.0335 3.64978 17.3891 2.69531Z',
  d10: 'M9 8C9 7.44772 9.44772 7 10 7H10.0064C10.5586 7 11.0064 7.44772 11.0064 8C11.0064 8.55228 10.5586 9 10.0064 9H10C9.44772 9 9 8.55228 9 8Z',
  d11: 'M6 14C6 13.4477 6.44772 13 7 13H7.00635C7.55864 13 8.00635 13.4477 8.00635 14C8.00635 14.5523 7.55864 15 7.00635 15H7C6.44772 15 6 14.5523 6 14Z',
  d12: 'M14 14.75C13.3096 14.75 12.75 15.3096 12.75 16C12.75 16.6904 13.3096 17.25 14 17.25C14.6904 17.25 15.25 16.6904 15.25 16C15.25 15.3096 14.6904 14.75 14 14.75ZM11.25 16C11.25 14.4812 12.4812 13.25 14 13.25C15.5188 13.25 16.75 14.4812 16.75 16C16.75 17.5188 15.5188 18.75 14 18.75C12.4812 18.75 11.25 17.5188 11.25 16Z',
  d13: 'M19 9.75C20.2219 9.75 21.336 9.28865 22.1776 8.53064C22.5488 9.61975 22.75 10.787 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C13.213 1.25 14.3802 1.45119 15.4694 1.82235C14.7114 2.66402 14.25 3.77813 14.25 5C14.25 7.62335 16.3766 9.75 19 9.75ZM16.9672 2.46408C18.9184 3.4824 20.5176 5.08158 21.5359 7.03282C20.9403 7.77492 20.0256 8.25 19 8.25C17.2051 8.25 15.75 6.79493 15.75 5C15.75 3.97438 16.2251 3.05972 16.9672 2.46408ZM10 7C9.44771 7 9 7.44772 9 8C9 8.55228 9.44771 9 10 9H10.0064C10.5586 9 11.0064 8.55228 11.0064 8C11.0064 7.44772 10.5586 7 10.0064 7H10ZM6 14C6 13.4477 6.44772 13 7 13H7.00635C7.55864 13 8.00635 13.4477 8.00635 14C8.00635 14.5523 7.55864 15 7.00635 15H7C6.44772 15 6 14.5523 6 14ZM12.75 16C12.75 15.3096 13.3096 14.75 14 14.75C14.6904 14.75 15.25 15.3096 15.25 16C15.25 16.6904 14.6904 17.25 14 17.25C13.3096 17.25 12.75 16.6904 12.75 16ZM14 13.25C12.4812 13.25 11.25 14.4812 11.25 16C11.25 17.5188 12.4812 18.75 14 18.75C15.5188 18.75 16.75 17.5188 16.75 16C16.75 14.4812 15.5188 13.25 14 13.25Z',
};

export const IconMoon01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-stroke-rounded IconMoon01StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoon01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-duotone-rounded IconMoon01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoon01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-twotone-rounded IconMoon01TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoon01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-solid-rounded IconMoon01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMoon01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-bulk-rounded IconMoon01BulkRounded"
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
      </g>
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

export const IconMoon01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-stroke-sharp IconMoon01StrokeSharp"
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

export const IconMoon01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="moon-01-solid-sharp IconMoon01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoon01: TheIconSelfPack = {
  name: 'Moon01',
  StrokeRounded: IconMoon01StrokeRounded,
  DuotoneRounded: IconMoon01DuotoneRounded,
  TwotoneRounded: IconMoon01TwotoneRounded,
  SolidRounded: IconMoon01SolidRounded,
  BulkRounded: IconMoon01BulkRounded,
  StrokeSharp: IconMoon01StrokeSharp,
  SolidSharp: IconMoon01SolidSharp,
};