import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10 8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4C7.88562 4 8.82843 4 9.41421 4.58579C10 5.17157 10 6.11438 10 8Z',
  d2: 'M10 7L10 11.4821C10 15.4547 7.48429 18.8237 4 20',
  d3: 'M22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8Z',
  d4: 'M22 7L22 11.4821C22 15.4547 19.4843 18.8237 16 20',
  d5: 'M22 7V11.4821C22 15.4547 19.4843 18.8237 16 20M18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4Z',
  d6: 'M5.94797 12.75C5.0495 12.75 4.30029 12.7501 3.70552 12.6701C3.07772 12.5857 2.51092 12.4 2.05545 11.9445C1.59998 11.4891 1.41431 10.9223 1.32991 10.2945C1.24994 9.6997 1.24997 8.95049 1.25 8.05202L1.25 8.05199L1.25 7.948L1.25 7.94797C1.24997 7.0495 1.24994 6.30029 1.32991 5.70552C1.41431 5.07772 1.59998 4.51092 2.05546 4.05545C2.51093 3.59998 3.07772 3.41431 3.70552 3.32991C4.30029 3.24994 5.04951 3.24997 5.94797 3.25L5.948 3.25L6.05199 3.25L6.05202 3.25C6.95049 3.24997 7.6997 3.24994 8.29448 3.32991C8.92227 3.41431 9.48907 3.59998 9.94454 4.05545C10.4 4.51092 10.5857 5.07772 10.6701 5.70552C10.7501 6.30029 10.75 7.0495 10.75 7.94797L10.75 7.948L10.75 8.052L10.75 8.05203C10.75 8.95049 10.7501 9.6997 10.6701 10.2945C10.5857 10.9223 10.4 11.4891 9.94454 11.9445C9.48907 12.4 8.92227 12.5857 8.29448 12.6701C7.6997 12.7501 6.95049 12.75 6.05203 12.75L6.052 12.75L5.948 12.75L5.94797 12.75Z',
  d7: 'M2.79529 20.0473C2.63097 19.52 2.9252 18.9593 3.45247 18.795C6.56014 17.8265 8.75 15.0747 8.75 11.8871L8.75 7.74973C8.75 7.19745 9.19772 6.74973 9.75 6.74973C10.3023 6.74973 10.75 7.19745 10.75 7.74973L10.75 11.8871C10.75 16.0334 7.90844 19.5012 4.04753 20.7044C3.52025 20.8688 2.95961 20.5745 2.79529 20.0473Z',
  d8: 'M17.948 12.75C17.0495 12.75 16.3003 12.7501 15.7055 12.6701C15.0777 12.5857 14.5109 12.4 14.0555 11.9445C13.6 11.4891 13.4143 10.9223 13.3299 10.2945C13.2499 9.6997 13.25 8.95049 13.25 8.05202L13.25 8.05199L13.25 7.948L13.25 7.94797C13.25 7.0495 13.2499 6.30029 13.3299 5.70552C13.4143 5.07772 13.6 4.51092 14.0555 4.05545C14.5109 3.59998 15.0777 3.41431 15.7055 3.32991C16.3003 3.24994 17.0495 3.24997 17.948 3.25L17.948 3.25L18.052 3.25L18.052 3.25C18.9505 3.24997 19.6997 3.24994 20.2945 3.32991C20.9223 3.41431 21.4891 3.59998 21.9445 4.05545C22.4 4.51092 22.5857 5.07772 22.6701 5.70552C22.7501 6.30029 22.75 7.0495 22.75 7.94797L22.75 7.948L22.75 8.052L22.75 8.05203C22.75 8.95049 22.7501 9.6997 22.6701 10.2945C22.5857 10.9223 22.4 11.4891 21.9445 11.9445C21.4891 12.4 20.9223 12.5857 20.2945 12.6701C19.6997 12.7501 18.9505 12.75 18.052 12.75L18.052 12.75L17.948 12.75L17.948 12.75Z',
  d9: 'M14.7953 20.0473C14.631 19.52 14.9252 18.9593 15.4525 18.795C18.5601 17.8265 20.75 15.0747 20.75 11.8871L20.75 7.74973C20.75 7.19745 21.1977 6.74973 21.75 6.74973C22.3023 6.74973 22.75 7.19745 22.75 7.74973L22.75 11.8871C22.75 16.0334 19.9084 19.5012 16.0475 20.7044C15.5203 20.8688 14.9596 20.5745 14.7953 20.0473Z',
  d10: 'M5.94797 12.75C5.0495 12.75 4.30029 12.7501 3.70552 12.6701C3.07772 12.5857 2.51092 12.4 2.05545 11.9445C1.59998 11.4891 1.41431 10.9223 1.32991 10.2945C1.24994 9.6997 1.24997 8.95049 1.25 8.05202V8.05199V7.948V7.94797C1.24997 7.0495 1.24994 6.30029 1.32991 5.70552C1.41431 5.07772 1.59998 4.51092 2.05545 4.05545C2.51092 3.59998 3.07772 3.41431 3.70552 3.32991C4.30029 3.24994 5.0495 3.24997 5.94797 3.25H5.948H6.05199H6.05202C6.95049 3.24997 7.6997 3.24994 8.29448 3.32991C8.92227 3.41431 9.48907 3.59998 9.94454 4.05545C10.4 4.51092 10.5857 5.07772 10.6701 5.70552C10.7501 6.30029 10.75 7.0495 10.75 7.94797V7.948V8.052V8.05203C10.75 8.95049 10.7501 9.6997 10.6701 10.2945C10.5857 10.9223 10.4 11.4891 9.94454 11.9445C9.48907 12.4 8.92227 12.5857 8.29448 12.6701C7.6997 12.7501 6.95049 12.75 6.05203 12.75H6.052H5.948H5.94797Z',
  d11: 'M17.948 12.75C17.0495 12.75 16.3003 12.7501 15.7055 12.6701C15.0777 12.5857 14.5109 12.4 14.0555 11.9445C13.6 11.4891 13.4143 10.9223 13.3299 10.2945C13.2499 9.6997 13.25 8.95049 13.25 8.05202V8.05199V7.948V7.94797C13.25 7.0495 13.2499 6.30029 13.3299 5.70552C13.4143 5.07772 13.6 4.51092 14.0555 4.05545C14.5109 3.59998 15.0777 3.41431 15.7055 3.32991C16.3003 3.24994 17.0495 3.24997 17.948 3.25H17.948H18.052H18.052C18.9505 3.24997 19.6997 3.24994 20.2945 3.32991C20.9223 3.41431 21.4891 3.59998 21.9445 4.05545C22.4 4.51092 22.5857 5.07772 22.6701 5.70552C22.7501 6.30029 22.75 7.0495 22.75 7.94797V7.948V8.052V8.05203C22.75 8.95049 22.7501 9.6997 22.6701 10.2945C22.5857 10.9223 22.4 11.4891 21.9445 11.9445C21.4891 12.4 20.9223 12.5857 20.2945 12.6701C19.6997 12.7501 18.9505 12.75 18.052 12.75H18.052H17.948H17.948Z',
  d12: 'M3.45247 18.795C2.9252 18.9593 2.63097 19.52 2.79529 20.0473C2.95961 20.5745 3.52025 20.8688 4.04753 20.7044C7.90844 19.5012 10.75 16.0334 10.75 11.8871V8.13896C10.7499 8.99887 10.7475 9.71889 10.6701 10.2944C10.5857 10.9221 10.4 11.4889 9.94454 11.9444C9.59292 12.296 9.17495 12.4869 8.71378 12.5944C8.41729 15.4763 6.32771 17.899 3.45247 18.795Z',
  d13: 'M10.75 7.74182C10.75 7.78118 10.75 7.82083 10.75 7.86079V7.74973C10.75 7.74709 10.75 7.74446 10.75 7.74182Z',
  d14: 'M15.4525 18.795C14.9252 18.9593 14.631 19.52 14.7953 20.0473C14.9596 20.5745 15.5203 20.8688 16.0475 20.7044C19.9084 19.5012 22.75 16.0334 22.75 11.8871V8.13896C22.7499 8.99887 22.7475 9.71889 22.6701 10.2944C22.5857 10.9221 22.4 11.4889 21.9445 11.9444C21.5929 12.296 21.1749 12.4869 20.7138 12.5944C20.4173 15.4763 18.3277 17.899 15.4525 18.795Z',
  d15: 'M22.75 7.74182C22.75 7.78118 22.75 7.82083 22.75 7.86079V7.74973C22.75 7.74709 22.75 7.74446 22.75 7.74182Z',
  d16: 'M14 4V12H22V4H14Z',
  d17: 'M22 12V14C22 17.3137 19.3137 20 16 20',
  d18: 'M2 4V12H10V4H2Z',
  d19: 'M10 12V14C10 17.3137 7.31371 20 4 20',
  d20: 'M20.75 13.75C20.75 16.5114 18.5114 18.75 15.75 18.75V20.75C19.616 20.75 22.75 17.616 22.75 13.75V3.25H13.25V12.75H20.75V13.75Z',
  d21: 'M8.75 13.75C8.75 16.5114 6.51142 18.75 3.75 18.75V20.75C7.61599 20.75 10.75 17.616 10.75 13.75V3.25H1.25V12.75H8.75V13.75Z',
};

export const IconQuoteDownStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-stroke-rounded IconQuoteDownStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconQuoteDownDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-duotone-rounded IconQuoteDownDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconQuoteDownTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-twotone-rounded IconQuoteDownTwotoneRounded"
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

export const IconQuoteDownSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-solid-rounded IconQuoteDownSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const IconQuoteDownBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-bulk-rounded IconQuoteDownBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuoteDownStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-stroke-sharp IconQuoteDownStrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuoteDownSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quote-down-solid-sharp IconQuoteDownSolidSharp"
    >
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfQuoteDown: TheIconSelfPack = {
  name: 'QuoteDown',
  StrokeRounded: IconQuoteDownStrokeRounded,
  DuotoneRounded: IconQuoteDownDuotoneRounded,
  TwotoneRounded: IconQuoteDownTwotoneRounded,
  SolidRounded: IconQuoteDownSolidRounded,
  BulkRounded: IconQuoteDownBulkRounded,
  StrokeSharp: IconQuoteDownStrokeSharp,
  SolidSharp: IconQuoteDownSolidSharp,
};