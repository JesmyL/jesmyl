import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M4 8H20',
  d2: 'M4 16H20',
  d3: 'M2.75 8C2.75 7.30964 3.30964 6.75 4 6.75H20C20.6904 6.75 21.25 7.30964 21.25 8C21.25 8.69036 20.6904 9.25 20 9.25H4C3.30964 9.25 2.75 8.69036 2.75 8Z',
  d4: 'M2.75 16C2.75 15.3096 3.30964 14.75 4 14.75H20C20.6904 14.75 21.25 15.3096 21.25 16C21.25 16.6904 20.6904 17.25 20 17.25H4C3.30964 17.25 2.75 16.6904 2.75 16Z',
  d5: 'M20 9.25H4V6.75H20V9.25Z',
  d6: 'M20 17.25H4V14.75H20V17.25Z',
} as const;

export const IconEqualSignStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-stroke-rounded IconEqualSignStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconEqualSignDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-duotone-rounded IconEqualSignDuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconEqualSignTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-twotone-rounded IconEqualSignTwotoneRounded"
    >
      <path 
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
    </TheIconWrapper>
  );
};

export const IconEqualSignSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-solid-rounded IconEqualSignSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-bulk-rounded IconEqualSignBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEqualSignStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-stroke-sharp IconEqualSignStrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconEqualSignSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="equal-sign-solid-sharp IconEqualSignSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfEqualSign: TheIconSelfPack = {
  name: 'EqualSign',
  StrokeRounded: IconEqualSignStrokeRounded,
  DuotoneRounded: IconEqualSignDuotoneRounded,
  TwotoneRounded: IconEqualSignTwotoneRounded,
  SolidRounded: IconEqualSignSolidRounded,
  BulkRounded: IconEqualSignBulkRounded,
  StrokeSharp: IconEqualSignStrokeSharp,
  SolidSharp: IconEqualSignSolidSharp,
};