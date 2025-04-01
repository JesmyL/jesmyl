import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 21C4.5 18 5.5 14 5.5 8H12.5C12.5 14 13.5 18 15 21',
  d2: 'M12 4.26495C13.1704 2.62795 14.6678 2.62795 15.8382 4.26495C16.5439 5.26947 17.4561 5.23227 18.179 4.22775C19.3322 2.59075 20.8296 2.59075 22 4.22775',
  d3: 'M12.8496 12.0713H16.4036C16.5444 13.9094 16.3899 17.1164 19.6951 20.82',
  d4: 'M2 21H21',
  d5: 'M3 21C4.5 18 5.5 14 5.5 8H12.5C12.5 14 13.5 18 15 21H3Z',
  d6: 'M12.957 12.0117H16.511C16.6518 13.8498 16.684 17.6118 19.9755 20.9796',
  d7: 'M1.5 20.75C1.5 20.1977 1.94772 19.75 2.5 19.75H21.5C22.0523 19.75 22.5 20.1977 22.5 20.75C22.5 21.3023 22.0523 21.75 21.5 21.75H2.5C1.94772 21.75 1.5 21.3023 1.5 20.75Z',
  d8: 'M5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 13.9149 14.7353 17.7936 16.1708 20.6646C16.2871 20.8971 16.2746 21.1732 16.138 21.3943C16.0013 21.6154 15.7599 21.75 15.5 21.75H3.5C3.24007 21.75 2.99867 21.6154 2.86201 21.3943C2.72536 21.1732 2.71293 20.8971 2.82918 20.6646C4.26469 17.7936 5.25 13.9149 5.25 8Z',
  d9: 'M12.5 10.75H17C17.5523 10.75 18 11.1977 18 11.75C18 15.4818 19.3925 18.2283 21.2071 20.0429C21.5976 20.4334 21.5976 21.0666 21.2071 21.4571C20.8166 21.8476 20.1834 21.8476 19.7929 21.4571C17.7815 19.4457 16.2596 16.5294 16.03 12.75H12.5V10.75Z',
  d10: 'M19.583 2.25C20.6931 2.25 21.6254 2.93381 22.3134 3.89615C22.6346 4.34542 22.5308 4.97001 22.0816 5.29122C21.6323 5.61243 21.0077 5.50862 20.6865 5.05935C20.2041 4.38469 19.8025 4.25 19.583 4.25C19.3658 4.25 18.9694 4.38226 18.4965 5.05365L18.4907 5.06189L18.4906 5.06186C18.0335 5.69706 17.3696 6.23017 16.525 6.24948C15.663 6.26919 14.9834 5.74789 14.5226 5.09363C14.0416 4.42203 13.6408 4.2872 13.4191 4.2872C13.197 4.2872 12.7954 4.42242 12.3134 5.09655C11.9922 5.54582 11.3676 5.64963 10.9184 5.32842C10.4691 5.00721 10.3653 4.38261 10.6865 3.93334C11.3749 2.97047 12.3072 2.2872 13.4191 2.2872C14.5309 2.2872 15.4632 2.97047 16.1516 3.93334L16.1565 3.94009L16.1564 3.94011C16.3318 4.18969 16.4474 4.24013 16.4804 4.24909C16.5085 4.2422 16.6496 4.19495 16.8648 3.89715C17.5447 2.93401 18.4725 2.25 19.583 2.25ZM16.4901 4.25077C16.4901 4.25095 16.4881 4.25088 16.4842 4.25002C16.4882 4.25016 16.4901 4.25059 16.4901 4.25077Z',
  d11: 'M13.8262 10.75C13.8671 11.4486 13.9237 12.1145 13.9948 12.75H16.0291C16.2586 16.5294 17.7805 19.4457 19.7919 21.4571C20.1825 21.8476 20.8156 21.8476 21.2062 21.4571C21.5967 21.0666 21.5967 20.4334 21.2062 20.0429C19.3916 18.2283 17.9991 15.4818 17.9991 11.75C17.9991 11.1977 17.5513 10.75 16.9991 10.75H13.8262Z',
  d12: 'M1 21H22',
  d13: 'M20 21C18 19 16.5 16 16.5 12H12',
  d14: 'M19.7696 2.25C20.8797 2.25 21.812 2.93381 22.5 3.89615L20.873 5.05935C20.3907 4.38469 19.989 4.25 19.7696 4.25C19.5523 4.25 19.156 4.38226 18.683 5.05365L18.6772 5.06189L18.6772 5.06186C18.2201 5.69706 17.5562 6.23017 16.7115 6.24948C15.8495 6.26919 15.17 5.74789 14.7092 5.09363C14.2281 4.42203 13.8274 4.2872 13.6056 4.2872C13.3836 4.2872 12.982 4.42242 12.5 5.09655L10.873 3.93334C11.5615 2.97047 12.4938 2.2872 13.6056 2.2872C14.7175 2.2872 15.6498 2.97047 16.3382 3.93334L16.343 3.94009L16.343 3.94011C16.5183 4.18969 16.634 4.24013 16.667 4.24909C16.6951 4.2422 16.8362 4.19495 17.0513 3.89715C17.7312 2.93401 18.659 2.25 19.7696 2.25ZM16.6767 4.25077C16.6766 4.25095 16.6746 4.25088 16.6707 4.25002C16.6747 4.25016 16.6767 4.25059 16.6767 4.25077Z',
  d15: 'M22.5 21.75H1.5V19.75H22.5V21.75Z',
  d16: 'M13.75 7.25V8C13.75 13.9149 14.7354 17.7936 16.1709 20.6646H2.82922C4.26474 17.7936 5.25004 13.9149 5.25004 8V7.25H13.75Z',
  d17: 'M12.3241 11.0366H17.8241V12.0366C17.8241 15.7684 19.2166 18.5149 21.0312 20.3295L19.617 21.7437C17.6056 19.7323 16.0837 16.8161 15.8541 13.0366H12.3241V11.0366Z',
};

export const IconFactory01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-stroke-rounded IconFactory01StrokeRounded"
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

export const IconFactory01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-duotone-rounded IconFactory01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFactory01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-twotone-rounded IconFactory01TwotoneRounded"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFactory01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-solid-rounded IconFactory01SolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFactory01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-bulk-rounded IconFactory01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
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

export const IconFactory01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-stroke-sharp IconFactory01StrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
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

export const IconFactory01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="factory-01-solid-sharp IconFactory01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFactory01: TheIconSelfPack = {
  name: 'Factory01',
  StrokeRounded: IconFactory01StrokeRounded,
  DuotoneRounded: IconFactory01DuotoneRounded,
  TwotoneRounded: IconFactory01TwotoneRounded,
  SolidRounded: IconFactory01SolidRounded,
  BulkRounded: IconFactory01BulkRounded,
  StrokeSharp: IconFactory01StrokeSharp,
  SolidSharp: IconFactory01SolidSharp,
};