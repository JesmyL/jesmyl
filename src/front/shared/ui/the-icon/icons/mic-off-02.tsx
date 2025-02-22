import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 2L22 22',
  d2: 'M4 11C4 15.4183 7.58172 19 12 19M12 19C13.9545 19 15.7454 18.2991 17.1348 17.1348M12 19V22M12 22H15M12 22H9M20 11C20 12.6514 19.4996 14.1859 18.6422 15.4603',
  d3: 'M7 6.98V11C7 13.7614 9.23858 16 12 16C13.1354 16 14.1647 15.6096 15.004 14.972M16.4387 13.244C16.7973 12.5545 17 11.8309 17 11V6.98C17 4.21858 14.7614 2 12 2C10.1312 2 8.53009 2.96527 7.672 4.484',
  d4: 'M7 7V11C7 13.7614 9.23858 16 12 16C13.1257 16 14.1645 15.628 15.0002 15.0002L7 7Z',
  d5: 'M7.672 4.484C8.53009 2.96527 10.1312 2 12 2C14.7614 2 17 4.21858 17 6.98V10.988V11C17 11.8309 16.7973 12.5545 16.4387 13.244M7 6.98V11C7 13.7614 9.23858 16 12 16C13.1354 16 14.1647 15.6096 15.004 14.972',
  d6: 'M4 11C4 15.4183 7.58172 19 12 19M12 19C13.9545 19 15.7454 18.2991 17.1348 17.1348M12 19V22M12 22H15M12 22H9',
  d7: 'M7.80682 4.484C8.66491 2.96527 10.266 2 12.1348 2C14.8962 2 17.1348 4.21858 17.1348 6.98V10.988V11C17.1348 11.8309 16.9321 12.5545 16.5735 13.244',
  d8: 'M7.05838 7.48004V11.5C7.05838 14.2614 9.29696 16.5 12.0584 16.5C13.1938 16.5 14.2231 16.1096 15.0624 15.472',
  d9: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d10: 'M12 1.25C15.1756 1.25 17.75 3.82436 17.75 7V11C17.75 11.641 17.6451 12.2575 17.4516 12.8333C17.3374 13.1729 17.2803 13.3428 17.1177 13.3809C16.9551 13.4191 16.819 13.283 16.5467 13.0107L7.62218 4.08618C7.44997 3.91397 7.36387 3.82786 7.35845 3.71186C7.35302 3.59585 7.42553 3.50835 7.57054 3.33337C8.62524 2.06068 10.2179 1.25 12 1.25Z',
  d11: 'M12 16.75C8.82436 16.75 6.25 14.1756 6.25 11V7C6.25 6.96449 6.25 6.94673 6.25484 6.9201C6.2915 6.7186 6.55234 6.61056 6.72074 6.72712C6.74299 6.74252 6.76017 6.7597 6.79452 6.79405L15.0557 15.0553C15.2835 15.283 15.3973 15.3969 15.3798 15.5417C15.3624 15.6866 15.234 15.7645 14.9774 15.9201C14.1089 16.4468 13.0899 16.75 12 16.75Z',
  d12: 'M4.22222 10.25C4.75917 10.25 5.19444 10.6805 5.19444 11.2115C5.19444 14.9288 8.2414 17.9423 12 17.9423C13.6641 17.9423 15.1887 17.3516 16.3711 16.3706L17.742 17.7416C16.4352 18.8666 14.7874 19.6141 12.9722 19.8126V20.8269H14.9167C15.4536 20.8269 15.8889 21.2574 15.8889 21.7885C15.8889 22.3195 15.4536 22.75 14.9167 22.75H9.08333C8.54639 22.75 8.11111 22.3195 8.11111 21.7885C8.11111 21.2574 8.54639 20.8269 9.08333 20.8269H11.0278V19.8126C6.65283 19.3343 3.25 15.6659 3.25 11.2115C3.25 10.6805 3.68528 10.25 4.22222 10.25Z',
  d13: 'M18.8056 11.2115C18.8056 10.6805 19.2408 10.25 19.7778 10.25C20.3147 10.25 20.75 10.6805 20.75 11.2115C20.75 12.6536 20.3934 14.0133 19.7626 15.209C19.6077 15.5026 19.5303 15.6493 19.3804 15.672C19.2306 15.6946 19.1075 15.5715 18.8612 15.3252L18.2935 14.7575C18.1428 14.6068 18.0674 14.5314 18.051 14.4381C18.0346 14.3448 18.0828 14.2418 18.1793 14.0357C18.5813 13.1769 18.8056 12.2201 18.8056 11.2115Z',
  d14: 'M12 16.7505C8.82436 16.7505 6.25 14.1762 6.25 11.0005V7.00054C6.25 6.96502 6.25 6.94727 6.25484 6.92064C6.2915 6.71914 6.55234 6.61109 6.72074 6.72766C6.74299 6.74306 6.76017 6.76023 6.79452 6.79458L15.0557 15.0558C15.2835 15.2835 15.3973 15.3974 15.3798 15.5423C15.3624 15.6872 15.234 15.765 14.9774 15.9206C14.1089 16.4473 13.0899 16.7505 12 16.7505Z',
  d15: 'M7 7V11C7 13.7614 9.23858 16 12 16C12.8902 16 13.8192 15.7554 14.5331 15.3045M16.4531 13.2852C16.7852 12.6367 17.0234 11.7969 17 11V7C17 4.23858 14.7614 2 12 2C10.1884 2 8.4964 3.03385 7.66797 4.50391',
  d16: 'M21.3358 22.7505L1.25 2.6647L2.66421 1.25049L22.75 21.3363L21.3358 22.7505Z',
  d17: 'M6.24756 6.75V10.75C6.24756 13.9256 8.82192 16.5 11.9976 16.5C13.2667 16.5 14.4398 16.0888 15.391 15.3924L6.2674 6.26885C6.25426 6.42749 6.24756 6.58796 6.24756 6.75Z',
  d18: 'M17.7476 10.75V6.75C17.7476 3.57436 15.1732 1 11.9976 1C9.97132 1 8.18987 2.04807 7.16575 3.63166L17.0434 13.5094C17.4923 12.6902 17.7476 11.7499 17.7476 10.75Z',
  d19: 'M2.99756 10.75C2.99756 15.3826 6.49761 19.1976 10.9976 19.6951V21H8.99756V23H14.9976V21H12.9976V19.6951C14.7744 19.4987 16.3954 18.785 17.7065 17.7079L16.2835 16.2849C15.0992 17.2033 13.6122 17.75 11.9976 17.75C8.13157 17.75 4.99756 14.616 4.99756 10.75H2.99756Z',
  d20: 'M20.9976 10.75H18.9976C18.9976 12.0972 18.617 13.3556 17.9574 14.4234L19.4018 15.8678C20.408 14.4147 20.9976 12.6512 20.9976 10.75Z',
};

export const IconMicOff02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-stroke-rounded IconMicOff02StrokeRounded"
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

export const IconMicOff02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-duotone-rounded IconMicOff02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-twotone-rounded IconMicOff02TwotoneRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-solid-rounded IconMicOff02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconMicOff02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-bulk-rounded IconMicOff02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      </g>
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-stroke-sharp IconMicOff02StrokeSharp"
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
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMicOff02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mic-off-02-solid-sharp IconMicOff02SolidSharp"
    >
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMicOff02: TheIconSelfPack = {
  name: 'MicOff02',
  StrokeRounded: IconMicOff02StrokeRounded,
  DuotoneRounded: IconMicOff02DuotoneRounded,
  TwotoneRounded: IconMicOff02TwotoneRounded,
  SolidRounded: IconMicOff02SolidRounded,
  BulkRounded: IconMicOff02BulkRounded,
  StrokeSharp: IconMicOff02StrokeSharp,
  SolidSharp: IconMicOff02SolidSharp,
};