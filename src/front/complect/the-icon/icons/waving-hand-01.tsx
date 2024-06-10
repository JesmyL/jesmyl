import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.1245 5.74923C14.3983 4.99948 15.2302 4.6129 15.9825 4.88579C16.7348 5.15868 17.1227 5.98769 16.8489 6.73744L16.1878 8.5475M14.1245 5.74923L14.7855 3.93917C15.0594 3.18942 14.6715 2.3604 13.9192 2.08752C13.1668 1.81463 12.335 2.20121 12.0612 2.95096L11.5656 4.30857M14.1245 5.74923L12.3066 10.7269M11.5656 4.30857C11.839 3.55897 11.4511 2.73032 10.699 2.4575C9.94664 2.18461 9.11479 2.57119 8.84097 3.32094L6.04389 10.9791L5.1097 8.97429C4.69981 8.09467 3.61484 7.7678 2.78416 8.27368C2.14856 8.66075 1.85475 9.42786 2.06986 10.1386L3.81898 15.4859C4.15364 16.509 4.04527 17.8595 3.67597 18.8707M11.5656 4.30857L9.91291 8.83372M12.3032 22L12.6881 20.946C12.8639 20.4648 13.2266 20.0763 13.677 19.8297C14.1978 19.5445 14.8694 19.1322 15.2097 18.7412C15.7963 18.0673 16.1555 17.0838 16.8739 15.1169L18.9122 9.53572C19.186 8.78596 18.7981 7.95695 18.0458 7.68406C17.2935 7.41118 16.4616 7.79775 16.1878 8.5475M14.7004 12.6201L16.1878 8.5475',
  d2: 'M20.8307 13C21.377 14.6354 20.5574 16.4263 19 17',
  d3: 'M16.8489 6.73744C17.1227 5.98769 16.7348 5.15868 15.9825 4.88579C15.2302 4.6129 14.3983 4.99948 14.1245 5.74923L14.7855 3.93917C15.0594 3.18942 14.6715 2.3604 13.9192 2.08752C13.1668 1.81463 12.335 2.20121 12.0612 2.95096L11.5656 4.30857C11.839 3.55897 11.4511 2.73032 10.699 2.4575C9.94664 2.18461 9.11479 2.57119 8.84097 3.32094L6.04389 10.9791L5.1097 8.97429C4.69981 8.09467 3.61484 7.7678 2.78416 8.27368C2.14856 8.66075 1.85475 9.42786 2.06986 10.1386L3.81898 15.4859C4.15364 16.509 4.04527 17.8595 3.67597 18.8707L12.3032 22L12.6881 20.946C12.8639 20.4648 13.2266 20.0763 13.677 19.8297C14.1978 19.5445 14.8694 19.1322 15.2097 18.7412C15.7963 18.0673 16.1555 17.0838 16.8739 15.1169L18.9122 9.53572C19.186 8.78596 18.7981 7.95695 18.0458 7.68406C17.2935 7.41118 16.4616 7.79775 16.1878 8.5475L16.8489 6.73744Z',
  d4: 'M10.6061 8.58412L12.488 3.50133L13.0498 2.08222C13.2941 1.46522 13.9893 1.15957 14.6091 1.3967C15.2327 1.63529 15.5457 2.33346 15.3089 2.95776L14.616 4.78478L12.5292 10.4212C12.4483 10.6397 12.5623 10.8815 12.7837 10.9613C13.0052 11.0411 13.2503 10.9287 13.3312 10.7102L15.4507 5.07578C15.6837 4.45629 16.3726 4.14054 16.994 4.36841C17.6205 4.59815 17.9412 5.29312 17.7094 5.91887L15.2545 12.5474C15.1736 12.7659 15.2876 13.0077 15.5091 13.0874C15.7306 13.1672 15.9757 13.0548 16.0566 12.8363L17.7499 8.26269L17.8533 7.99849C18.1104 7.34128 18.844 7.00816 19.5081 7.24703C20.1906 7.49253 20.5414 8.24806 20.2884 8.92787L19.9902 9.72927L17.943 15.3347C17.5914 16.2974 17.3151 17.0539 17.0526 17.6517C16.7854 18.2603 16.5129 18.7518 16.149 19.1699C15.7091 19.6752 14.9221 20.1438 14.4108 20.4238C14.0988 20.5946 13.8717 20.8504 13.7661 21.1396L13.3812 22.1936C13.2393 22.582 12.8097 22.7823 12.421 22.6413L3.79375 19.512C3.60649 19.4441 3.45395 19.3044 3.36977 19.1239C3.28558 18.9434 3.27667 18.7367 3.34501 18.5496C3.67038 17.6587 3.75082 16.4843 3.47967 15.6554L1.68333 9.77892C1.6528 9.6783 1.63422 9.57637 1.62695 9.47478C1.642 9.19908 1.70503 8.92938 1.8114 8.67761C1.92868 8.47462 2.09799 8.2985 2.31126 8.17039C3.04051 7.73231 3.99108 8.01605 4.34979 8.77538L5.41334 11.0268C5.48625 11.1811 5.64619 11.2769 5.81865 11.2696C5.9911 11.2623 6.14212 11.1533 6.20134 10.9934L9.42824 2.4295C9.66403 1.80373 10.3636 1.48884 10.9884 1.72725C11.609 1.96409 11.9217 2.65785 11.6881 3.27972L9.80407 8.29517C9.72318 8.51365 9.83715 8.75543 10.0586 8.83522C10.2801 8.91501 10.5252 8.80259 10.6061 8.58412Z',
  d5: 'M20.8872 11.9893C21.411 11.8143 21.9775 12.0971 22.1525 12.6209C22.8591 14.736 21.8154 17.1039 19.719 17.8761C19.2007 18.067 18.6259 17.8017 18.435 17.2834C18.2441 16.7652 18.5094 16.1903 19.0277 15.9994C20.046 15.6243 20.6417 14.4104 20.2556 13.2546C20.0806 12.7308 20.3634 12.1643 20.8872 11.9893Z',
  d6: 'M14.6245 5.74923C14.8983 4.99948 15.7302 4.6129 16.4825 4.88579C17.2348 5.15868 17.6227 5.98769 17.3489 6.73744L16.6878 8.5475M14.6245 5.74923L15.2855 3.93917C15.5594 3.18942 15.1715 2.3604 14.4192 2.08752C13.6668 1.81463 12.835 2.20121 12.5612 2.95096L12.0656 4.30857M14.6245 5.74923L12.8066 10.7269M12.0656 4.30857C12.339 3.55897 11.9511 2.73032 11.199 2.4575C10.4466 2.18461 9.61479 2.57119 9.34097 3.32094L6.54389 10.9791L5.6097 8.97429C5.19981 8.09467 4.11484 7.7678 3.28416 8.27368C2.64856 8.66075 2.35475 9.42786 2.56986 10.1386L5 16.5L4.17597 18.8707M12.0656 4.30857L10.4129 8.83372M12.8032 22L13.5 20C13.5 20 15.3694 19.1322 15.7097 18.7412C16.2963 18.0673 16.6555 17.0838 17.3739 15.1169L19.4122 9.53572C19.686 8.78596 19.2981 7.95695 18.5458 7.68406C17.7935 7.41118 16.9616 7.79775 16.6878 8.5475M15.2004 12.6201L16.6878 8.5475',
  d7: 'M21.3307 13C21.877 14.6354 21.0574 16.4263 19.5 17',
  d8: 'M14.7453 1.32444C14.0964 1.09223 13.3804 1.42167 13.1451 2.05732L10.7068 8.64478L9.96057 8.37588L11.8362 3.30882C12.0707 2.67401 11.7384 1.97062 11.0904 1.73874C10.4415 1.50653 9.72552 1.83597 9.49022 2.47162L5.98696 11.9348L4.52209 8.83327C4.15731 8.06094 3.19073 7.77248 2.44934 8.21794C1.88592 8.55646 1.62418 9.2246 1.80842 9.8455L4.61295 17.0886L3.75881 19.513L12.8039 22.75L13.5177 20.7286C13.7204 20.6317 14.4782 20.2726 14.763 20.1261C15.0488 19.9791 15.3413 19.8212 15.5836 19.6752C15.8417 19.5195 15.9951 19.4049 16.0458 19.3473C16.3413 19.0124 16.5906 18.5887 16.8701 17.9608C17.1509 17.3299 19.7652 10.2679 20.1746 9.16196C20.4096 8.52694 20.0771 7.82337 19.4289 7.59139C18.7801 7.35918 18.064 7.68862 17.8287 8.32427L16.1406 12.8848L15.3943 12.6159L17.8328 6.02848C18.0678 5.39347 17.7353 4.6899 17.0871 4.45791C16.4382 4.2257 15.7222 4.55514 15.4869 5.1908L13.4236 10.7647L12.6773 10.4958L15.4909 2.89501C15.726 2.25999 15.3935 1.55642 14.7453 1.32444Z',
  d9: 'M18.9053 15.984C19.9236 15.6088 20.5193 14.395 20.1332 13.2392L22.0301 12.6055C22.7367 14.7205 21.693 17.0884 19.5966 17.8607L18.9053 15.984Z',
};

export const IconWavingHand01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-stroke-rounded IconWavingHand01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconWavingHand01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-duotone-rounded IconWavingHand01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconWavingHand01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-twotone-rounded IconWavingHand01TwotoneRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconWavingHand01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-solid-rounded IconWavingHand01SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWavingHand01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-bulk-rounded IconWavingHand01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWavingHand01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-stroke-sharp IconWavingHand01StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWavingHand01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waving-hand-01-solid-sharp IconWavingHand01SolidSharp"
    >
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

export const iconPackOfWavingHand01: TheIconSelfPack = {
  name: 'WavingHand01',
  StrokeRounded: IconWavingHand01StrokeRounded,
  DuotoneRounded: IconWavingHand01DuotoneRounded,
  TwotoneRounded: IconWavingHand01TwotoneRounded,
  SolidRounded: IconWavingHand01SolidRounded,
  BulkRounded: IconWavingHand01BulkRounded,
  StrokeSharp: IconWavingHand01StrokeSharp,
  SolidSharp: IconWavingHand01SolidSharp,
};