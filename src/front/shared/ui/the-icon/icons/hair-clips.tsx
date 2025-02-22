import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.34857 12.3315C8.34842 14.3854 12.5556 16.0303 10.9976 17.9999C9.49206 19.3878 7.84607 15.6201 4.5 15.5',
  d2: 'M22 4.43903C16.6511 2.83733 13.1197 5.85076 11.0697 9.71325C8.66575 14.2427 5.84955 15.3123 2 16',
  d3: 'M5 20C7 20 8 18 8 18M10.7143 15.2941C12.8448 12.2758 15.2857 10 21 10',
  d4: 'M10.9976 17.9964C12.5556 16.0269 8.34842 14.382 9.34857 12.3281L4.5 15.4966C7.84607 15.6167 9.49206 19.3844 10.9976 17.9964Z',
  d5: 'M9.34857 12.3281C8.34842 14.382 12.5556 16.0269 10.9976 17.9964C9.49206 19.3844 7.84607 15.6167 4.5 15.4966',
  d6: 'M9.34857 12.332C8.34842 14.3859 12.5556 16.0308 10.9976 18.0004C9.49206 19.3883 7.84607 15.6206 4.5 15.5005',
  d7: 'M15.7951 5.89463C14.2048 6.806 12.924 8.35278 11.9532 10.182C11.3473 11.3235 10.7071 12.2732 10.0216 13.0663C10.057 13.1864 10.1141 13.321 10.1973 13.4748C10.2784 13.6247 10.3728 13.7733 10.478 13.9259C11.4366 12.6742 12.5384 11.5263 14.002 10.6557C15.7797 9.59838 18.0044 9 21 9C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11C18.2813 11 16.4285 11.5395 15.0245 12.3747C13.6806 13.174 12.6693 14.2896 11.6854 15.6546C11.8171 15.8916 11.9304 16.1416 12.0044 16.4005C12.1966 17.073 12.12 17.7904 11.5863 18.4651C11.562 18.4959 11.5352 18.5247 11.5064 18.5513C11.226 18.8098 10.9011 18.9772 10.5371 19.0326C10.1826 19.0865 9.84729 19.0258 9.55119 18.9227C9.30872 18.8382 9.06447 18.7143 8.82397 18.571C8.76292 18.677 8.68804 18.8037 8.64455 18.8672C8.49245 19.0954 8.26432 19.3999 7.95711 19.7071C7.34811 20.3161 6.35876 21 5 21C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19C5.64124 19 6.15189 18.6839 6.54289 18.2929C6.73568 18.1001 6.88255 17.9046 6.98045 17.7578C7.02884 17.6852 7.06371 17.6268 7.08488 17.5898C7.09543 17.5713 7.10245 17.5584 7.10593 17.5519C7.1273 17.5092 7.15131 17.4687 7.17766 17.4306C6.49009 16.9545 5.78132 16.5283 4.99545 16.3209C4.09304 16.6069 3.15217 16.81 2.17604 16.9843C1.63236 17.0815 1.11288 16.7195 1.01576 16.1758C0.918627 15.6321 1.28063 15.1126 1.8243 15.0155C3.71396 14.6779 5.22909 14.2649 6.55085 13.4469C7.85511 12.6397 9.04891 11.3879 10.1866 9.24439C11.2657 7.2111 12.7756 5.31992 14.8007 4.15938C16.8583 2.9802 19.3634 2.60554 22.287 3.48099C22.8161 3.63942 23.1166 4.19675 22.9581 4.72582C22.7997 5.2549 22.2424 5.55536 21.7133 5.39694C19.288 4.67069 17.3529 5.0019 15.7951 5.89463Z',
  d8: 'M15.0245 12.3747C13.6104 13.2158 12.5644 14.4072 11.5313 15.8708C11.2128 16.322 10.5888 16.4296 10.1376 16.1111C9.6864 15.7926 9.57882 15.1686 9.89732 14.7174C10.9947 13.1628 12.2345 11.7071 14.002 10.6557C15.7797 9.59838 18.0044 9 21 9C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11C18.2813 11 16.4285 11.5395 15.0245 12.3747Z',
  d9: 'M8.44721 17.1056C8.94119 17.3526 9.14142 17.9532 8.89443 18.4472C8.83749 18.5488 8.7078 18.7749 8.64455 18.8672C8.49245 19.0954 8.26432 19.3999 7.95711 19.7071C7.34811 20.3161 6.35876 21 5 21C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19C5.64124 19 6.15189 18.6839 6.54289 18.2929C6.73568 18.1001 6.88255 17.9046 6.98045 17.7578C7.02884 17.6852 7.06371 17.6268 7.08488 17.5898C7.09543 17.5713 7.10245 17.5584 7.10593 17.5519C7.35313 17.0584 7.95346 16.8587 8.44721 17.1056Z',
  d10: 'M11.9532 10.182C12.924 8.35278 14.2048 6.806 15.7951 5.89463C17.3529 5.0019 19.288 4.67069 21.7133 5.39694C22.2424 5.55536 22.7997 5.2549 22.9581 4.72582C23.1166 4.19675 22.8161 3.63942 22.287 3.48099C19.3634 2.60554 16.8583 2.9802 14.8007 4.15938C12.7756 5.31992 11.2657 7.2111 10.1866 9.24439C9.04891 11.3879 7.85511 12.6397 6.55085 13.4469C5.22909 14.2649 3.71396 14.6779 1.8243 15.0155C1.28063 15.1126 0.918627 15.6321 1.01576 16.1758C1.11288 16.7195 1.63236 17.0815 2.17604 16.9843C3.15217 16.81 4.09304 16.6069 4.99545 16.3209C6.02642 16.593 6.92468 17.2416 7.81649 17.8855L7.91018 17.9531C8.4212 18.3217 8.99094 18.7276 9.55119 18.9227C9.84729 19.0258 10.1826 19.0865 10.5371 19.0326C10.9011 18.9772 11.226 18.8098 11.5064 18.5513C11.5352 18.5247 11.562 18.4959 11.5863 18.4651C12.12 17.7904 12.1966 17.073 12.0044 16.4005C11.831 15.7936 11.4414 15.2355 11.1056 14.78C11.0306 14.6783 10.9576 14.5807 10.887 14.4865L10.887 14.4864L10.8869 14.4863C10.6115 14.1183 10.3732 13.8 10.1973 13.4748C10.1141 13.321 10.057 13.1864 10.0216 13.0663C10.7071 12.2732 11.3473 11.3235 11.9532 10.182Z',
  d11: 'M9.5 12.5L12 17L10 19L4.5 15.5',
  d12: 'M5 20C7 20 8.5 17.5 8.5 17.5M10.7143 15.2941C12.8448 12.2758 15.2857 10 21 10',
  d13: 'M15.7463 5.89463C14.1531 6.806 12.8699 8.35278 11.8973 10.182C11.4162 11.0869 10.9134 11.8712 10.3836 12.5525L10.8693 13.4268C11.7357 12.3704 12.7314 11.4092 13.9981 10.6557C15.7758 9.59838 18.0005 9 20.9961 9V11C18.2774 11 16.4246 11.5395 15.0206 12.3747C13.7867 13.1086 12.8331 14.1092 11.9237 15.3247L12.9268 17.1303L10.1013 19.9557L8.61656 19.0109C8.49297 19.1545 8.35481 19.3055 8.2032 19.4571C7.52326 20.1371 6.40328 21 4.99609 21V19C5.58891 19 6.21893 18.6129 6.78899 18.0429C6.82916 18.0027 6.8682 17.9625 6.90605 17.9224L4.56271 16.4312C3.77051 16.6606 2.9497 16.8332 2.10237 16.9843L1.75 15.0155C3.6431 14.6779 5.16099 14.2649 6.48515 13.4469C7.79179 12.6397 8.98776 11.3879 10.1275 9.24439C11.2086 7.2111 12.7212 5.31992 14.75 4.15938C16.8114 2.9802 19.3211 2.60554 22.25 3.48099L21.6752 5.39694C19.2455 4.67069 17.3069 5.0019 15.7463 5.89463Z',
};

export const IconHairClipsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-stroke-rounded IconHairClipsStrokeRounded"
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

export const IconHairClipsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-duotone-rounded IconHairClipsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHairClipsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-twotone-rounded IconHairClipsTwotoneRounded"
    >
      <path 
        d={d.d6} 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHairClipsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-solid-rounded IconHairClipsSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHairClipsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-bulk-rounded IconHairClipsBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHairClipsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-stroke-sharp IconHairClipsStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHairClipsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hair-clips-solid-sharp IconHairClipsSolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHairClips: TheIconSelfPack = {
  name: 'HairClips',
  StrokeRounded: IconHairClipsStrokeRounded,
  DuotoneRounded: IconHairClipsDuotoneRounded,
  TwotoneRounded: IconHairClipsTwotoneRounded,
  SolidRounded: IconHairClipsSolidRounded,
  BulkRounded: IconHairClipsBulkRounded,
  StrokeSharp: IconHairClipsStrokeSharp,
  SolidSharp: IconHairClipsSolidSharp,
};