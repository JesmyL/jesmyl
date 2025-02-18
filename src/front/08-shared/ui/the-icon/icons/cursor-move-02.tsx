import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.38086 2.46562C4.21503 0.490413 18.0114 5.32901 18 7.09558C17.9871 9.09884 12.6121 9.71513 11.1223 10.1331C10.2265 10.3844 9.98651 10.6421 9.77993 11.5815C8.84436 15.8362 8.37464 17.9524 7.3041 17.9997C5.59766 18.0751 0.590865 4.39327 2.38086 2.46562Z',
  d2: 'M22 17.4985L19 17.4985M22 17.4985C22 17.2427 21.172 16.3301 20.8664 16M22 17.4985C22 17.7557 21.172 18.6986 20.8664 19',
  d3: 'M13 17.5015L16 17.5015M13 17.5015C13 17.7573 13.828 18.6699 14.1336 19M13 17.5015C13 17.2443 13.828 16.3014 14.1336 16',
  d4: 'M17.4985 13L17.4985 16M17.4985 13C17.2427 13 16.3301 13.828 16 14.1336M17.4985 13C17.7557 13 18.6986 13.828 19 14.1336',
  d5: 'M17.5015 22V19M17.5015 22C17.7573 22 18.6699 21.172 19 20.8664M17.5015 22C17.2443 22 16.3014 21.172 16 20.8664',
  d6: 'M22 17.4985H19M22 17.4985C22 17.2427 21.172 16.3301 20.8664 16M22 17.4985C22 17.7557 21.172 18.6986 20.8664 19',
  d7: 'M13 17.5015H16M13 17.5015C13 17.7573 13.828 18.6699 14.1336 19M13 17.5015C13 17.2443 13.828 16.3014 14.1336 16',
  d8: 'M17.4985 13V16M17.4985 13C17.2427 13 16.3301 13.828 16 14.1336M17.4985 13C17.7557 13 18.6986 13.828 19 14.1336',
  d9: 'M18.4425 6.27536C18.5886 6.46652 18.7522 6.75077 18.75 7.1004C18.7443 7.97857 18.1458 8.58792 17.54 8.98418C16.9196 9.38997 16.1174 9.69253 15.3293 9.92753C14.5313 10.1655 13.6933 10.3496 12.9758 10.4983C12.4741 10.6005 11.5838 10.7826 11.3249 10.8552C10.9012 10.9741 10.7913 11.0567 10.7425 11.1093C10.6902 11.1657 10.6114 11.2923 10.5124 11.7426L10.5104 11.7517C10.0481 13.8541 9.68698 15.4964 9.30157 16.613C9.10919 17.1705 8.88921 17.6642 8.60512 18.0329C8.30691 18.42 7.89112 18.7245 7.33719 18.7489C6.98111 18.7647 6.69083 18.6021 6.50071 18.4609C6.2991 18.3112 6.11291 18.113 5.94368 17.9016C5.60325 17.4763 5.24878 16.8921 4.89868 16.2231C4.19444 14.8772 3.45027 13.076 2.8212 11.2251C2.19243 9.3752 1.66737 7.44262 1.4141 5.83323C1.28785 5.03098 1.22444 4.28056 1.25964 3.64796C1.29271 3.05346 1.4196 2.39857 1.83126 1.95526C2.25571 1.49817 2.91058 1.33595 3.5071 1.27845C4.13915 1.21753 4.89107 1.25834 5.69427 1.36369C7.30601 1.57509 9.24899 2.06371 11.1123 2.66349C12.977 3.26372 14.7968 3.98654 16.1621 4.68051C16.841 5.02559 17.435 5.37727 17.8699 5.71803C18.0863 5.88759 18.2884 6.07373 18.4425 6.27536Z',
  d10: 'M19.278 13.4767C19.5736 13.7668 19.5782 14.2417 19.2881 14.5373C19.1305 14.6979 18.9185 14.7726 18.7103 14.7609H18.25V15.7C18.25 16.1142 17.9142 16.45 17.5 16.45C17.0858 16.45 16.75 16.1142 16.75 15.7V14.7609H16.2897C16.0815 14.7726 15.8695 14.6979 15.712 14.5373C15.4218 14.2417 15.4264 13.7668 15.722 13.4767C15.722 13.4767 16.1608 12.9869 16.2897 12.8592C16.4169 12.7332 16.5759 12.5913 16.759 12.4778C16.9391 12.3662 17.1939 12.25 17.5 12.25C17.8061 12.25 18.0609 12.3662 18.241 12.4778C18.4241 12.5913 18.5831 12.7332 18.7103 12.8592C18.7103 12.8592 19.2261 13.4258 19.278 13.4767Z',
  d11: 'M13.4767 15.722C13.7668 15.4264 14.2417 15.4218 14.5373 15.7119C14.6979 15.8695 14.7726 16.0815 14.7609 16.2897V16.75H15.7C16.1142 16.75 16.45 17.0858 16.45 17.5C16.45 17.9142 16.1142 18.25 15.7 18.25H14.7609V18.7951C14.7507 18.975 14.6761 19.1519 14.5373 19.288C14.2417 19.5782 13.7668 19.5736 13.4767 19.278L12.8592 18.7103C12.7332 18.5831 12.5913 18.4241 12.4778 18.241C12.3662 18.0609 12.25 17.8061 12.25 17.5C12.25 17.1939 12.3662 16.9391 12.4778 16.759C12.5913 16.5759 12.7332 16.4169 12.8592 16.2897C12.8592 16.2897 13.4258 15.7739 13.4767 15.722Z',
  d12: 'M20.4627 15.712C20.7583 15.4218 21.2332 15.4264 21.5233 15.722C21.5233 15.722 22.0131 16.1608 22.1408 16.2897C22.2668 16.4169 22.4087 16.5759 22.5222 16.759C22.6338 16.9391 22.75 17.1939 22.75 17.5C22.75 17.8061 22.6338 18.0609 22.5222 18.241C22.4087 18.4241 22.2668 18.5831 22.1408 18.7103C22.1408 18.7103 21.5742 19.2261 21.5233 19.278C21.2332 19.5736 20.7583 19.5782 20.4627 19.288C20.3239 19.1519 20.2493 18.975 20.2391 18.7951V18.25H19.3C18.8858 18.25 18.55 17.9142 18.55 17.5C18.55 17.0858 18.8858 16.75 19.3 16.75H20.2391V16.2897C20.2274 16.0815 20.3021 15.8695 20.4627 15.712Z',
  d13: 'M17.5 18.55C17.9142 18.55 18.25 18.8858 18.25 19.3V20.2391H18.7103C18.9185 20.2274 19.1305 20.3021 19.288 20.4627C19.5781 20.7583 19.5736 21.2332 19.278 21.5233L18.7103 22.1408C18.5831 22.2668 18.4241 22.4087 18.241 22.5222C18.0609 22.6338 17.8061 22.75 17.5 22.75C17.1939 22.75 16.9391 22.6338 16.759 22.5222C16.5759 22.4087 16.4169 22.2668 16.2897 22.1408C16.1608 22.0131 15.722 21.5233 15.722 21.5233C15.4264 21.2332 15.4218 20.7583 15.712 20.4627C15.8695 20.3021 16.0815 20.2274 16.2897 20.2391H16.75V19.3C16.75 18.8858 17.0858 18.55 17.5 18.55Z',
  d14: 'M18.0029 7.32696L2.01465 2L7.34408 17.9809L10.0088 9.99044L18.0029 7.32696Z',
  d15: 'M15.0131 16.9975H12.661M14.0095 14.9921L12.0078 16.9975L14.0095 18.9935M19.0137 16.9975H21.5833M20.0173 14.9921L22.019 16.9975L20.0173 18.9935M17.0122 18.9932V21.3143M15.0061 19.9964L17.0122 21.9973L19.0091 19.9964M17.0032 14.9924V12.5067M19.0093 13.9892L17.0032 11.9883L15.0063 13.9892',
  d16: 'M1.46969 1.46969C1.67056 1.26882 1.96769 1.19867 2.23719 1.28851L18.2372 6.62184C18.5434 6.72393 18.75 7.01053 18.75 7.33335C18.75 7.65618 18.5434 7.94278 18.2372 8.04487L10.5929 10.5929L8.04487 18.2372C7.94278 18.5434 7.65618 18.75 7.33335 18.75C7.01053 18.75 6.72393 18.5434 6.62184 18.2372L1.28851 2.23719C1.19867 1.96769 1.26882 1.67056 1.46969 1.46969Z',
  d17: 'M16.6896 10.6289L19.2199 13.1592L18.1592 14.2199L17.4396 13.5002V14.6896H15.9396V13.5002L15.2199 14.2199L14.1592 13.1592L16.6896 10.6289ZM13.5002 17.4396L14.2199 18.1592L13.1592 19.2199L10.6289 16.6896L13.1592 14.1592L14.2199 15.2199L13.5002 15.9396H14.6896V17.4396H13.5002ZM19.8789 15.9396L19.1592 15.2199L20.2199 14.1592L22.7502 16.6896L20.2199 19.2199L19.1592 18.1592L19.8789 17.4396H18.6896V15.9396H19.8789ZM17.4396 18.6896V19.8789L18.1592 19.1592L19.2199 20.2199L16.6896 22.7502L14.1592 20.2199L15.2199 19.1592L15.9396 19.8789V18.6896H17.4396Z',
};

export const IconCursorMove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-stroke-rounded IconCursorMove02StrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCursorMove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-duotone-rounded IconCursorMove02DuotoneRounded"
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
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCursorMove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-twotone-rounded IconCursorMove02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCursorMove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-solid-rounded IconCursorMove02SolidRounded"
    >
      <path 
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

export const IconCursorMove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-bulk-rounded IconCursorMove02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconCursorMove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-stroke-sharp IconCursorMove02StrokeSharp"
    >
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
      />
    </TheIconWrapper>
  );
};

export const IconCursorMove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cursor-move-02-solid-sharp IconCursorMove02SolidSharp"
    >
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

export const iconPackOfCursorMove02: TheIconSelfPack = {
  name: 'CursorMove02',
  StrokeRounded: IconCursorMove02StrokeRounded,
  DuotoneRounded: IconCursorMove02DuotoneRounded,
  TwotoneRounded: IconCursorMove02TwotoneRounded,
  SolidRounded: IconCursorMove02SolidRounded,
  BulkRounded: IconCursorMove02BulkRounded,
  StrokeSharp: IconCursorMove02StrokeSharp,
  SolidSharp: IconCursorMove02SolidSharp,
};