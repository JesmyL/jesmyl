import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 19.4634C10.2011 19.46 9.90159 19.4836 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52438C2.08114 6.45885 2.11382 4.92608 3.24495 3.79065C4.37608 2.65521 5.95033 2.61566 9.09882 2.53656C11.0393 2.48781 12.9607 2.48781 14.9012 2.53657C18.0497 2.61568 19.6239 2.65523 20.7551 3.79066C21.8862 4.92609 21.9189 6.45886 21.9842 9.52439C21.9983 10.1829 22 10.8414 22 11.5',
  d2: 'M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5',
  d3: 'M20.017 19.5233L22 21.5M21.0531 17.0265C21.0531 15.0789 19.4742 13.5 17.5265 13.5C15.5789 13.5 14 15.0789 14 17.0265C14 18.9742 15.5789 20.5531 17.5265 20.5531C19.4742 20.5531 21.0531 18.9742 21.0531 17.0265Z',
  d4: 'M14.9012 19.4647C12.9607 19.5118 11.0393 19.5118 9.09883 19.4647C5.95033 19.3883 4.37608 19.3501 3.24496 18.2539C2.11383 17.1576 2.08114 15.6777 2.01577 12.7178C1.99475 11.7661 1.99474 10.8201 2.01576 9.86836C2.0608 7.82941 2.09032 6.49275 2.47411 5.5L12 10.3276L21.5259 5.5C21.9097 6.49275 21.9392 7.82941 21.9842 9.86838C22.0053 10.8201 22.0053 11.7661 21.9842 12.7178C21.9213 15.5672 21.8887 17.0451 20.8772 18.1295C20.9913 17.7825 21.0531 17.4117 21.0531 17.0265C21.0531 15.0789 19.4742 13.5 17.5265 13.5C15.5789 13.5 14 15.0789 14 17.0265C14 17.9715 14.3717 18.8297 14.9769 19.4629C14.9517 19.4635 14.9265 19.4641 14.9012 19.4647Z',
  d5: 'M15.4552 9.662L19.6909 7.26197C20.0519 7.05742 20.2325 6.95514 20.3793 7.03609C20.5261 7.11703 20.5358 7.3198 20.5551 7.7253C20.5812 8.27187 20.5954 8.90551 20.6114 9.6547C20.6189 10.0071 20.6237 10.7024 20.6257 10.8549C20.6333 11.4148 21.0718 11.8749 21.6317 11.8749C22.175 11.8749 22.6298 11.4408 22.625 10.8975C22.6235 10.7308 22.6183 10.0288 22.6094 9.61215L22.6078 9.53677C22.5766 8.07128 22.5507 6.86037 22.3801 5.87916C22.1983 4.8336 21.8395 3.95811 21.09 3.20674C20.6666 2.78228 20.2003 2.4827 19.6844 2.26889C19.6059 2.22604 19.5218 2.19373 19.4341 2.17311C19.1043 2.05684 18.755 1.97116 18.3847 1.90676C17.3838 1.73265 16.1419 1.70152 14.6325 1.66368L14.5577 1.66181C12.6019 1.61273 11.1489 1.61274 9.1931 1.66181L9.11825 1.66369C7.60889 1.70152 6.36701 1.73265 5.36604 1.90675C4.30367 2.09154 3.41416 2.45141 2.66075 3.20674C1.9113 3.95811 1.55245 4.8336 1.37065 5.87916C1.20004 6.86038 1.17423 8.07123 1.14298 9.53675L1.14137 9.61214C1.12006 10.6101 1.12008 11.14 1.14138 12.1379L1.14299 12.2133C1.17424 13.6788 1.20006 14.8896 1.37067 15.8709C1.55246 16.9164 1.91131 17.7919 2.66077 18.5433C3.41417 19.2986 4.30369 19.6585 5.36606 19.8433C6.36702 20.0174 7.6089 20.0485 9.11825 20.0863L9.19311 20.0882C9.87468 20.1053 9.98106 20.1164 10.8775 20.1216C11.4286 20.1248 11.8752 19.6782 11.8752 19.127C11.8752 18.5758 11.4286 18.1288 10.8774 18.1256C9.99535 18.1204 9.90936 18.1095 9.24331 18.0928C7.64036 18.0526 6.54713 18.0226 5.70895 17.8768C4.91566 17.7388 4.4535 17.5124 4.07661 17.1345C3.69578 16.7527 3.47315 16.2968 3.33971 15.5293C3.19801 14.7143 3.17275 13.6553 3.13944 12.0953C3.11874 11.1258 3.11873 10.6242 3.13943 9.6547C3.15542 8.90561 3.16956 8.27204 3.19563 7.72553C3.21497 7.32001 3.22464 7.11725 3.37148 7.0363C3.51832 6.95535 3.69883 7.05763 4.05985 7.26219L8.29525 9.662C9.59486 10.3984 10.694 10.875 11.8752 10.875C13.0564 10.875 14.1555 10.3984 15.4552 9.662Z',
  d6: 'M12.8752 16.9015C12.8752 14.4016 14.9018 12.375 17.4017 12.375C19.9017 12.375 21.9283 14.4016 21.9283 16.9015C21.9283 17.7906 21.672 18.6197 21.2292 19.3192L22.5812 20.6668C22.9723 21.0567 22.9733 21.6898 22.5834 22.081C22.1935 22.4721 21.5604 22.4731 21.1692 22.0832L19.814 20.7324C19.1157 21.1731 18.2885 21.4281 17.4017 21.4281C14.9018 21.4281 12.8752 19.4015 12.8752 16.9015ZM17.4017 14.375C16.0064 14.375 14.8752 15.5062 14.8752 16.9015C14.8752 18.2969 16.0064 19.4281 17.4017 19.4281C18.7971 19.4281 19.9283 18.2969 19.9283 16.9015C19.9283 15.5062 18.7971 14.375 17.4017 14.375Z',
  d7: 'M20.9283 16.9015C20.9283 14.9539 19.3494 13.375 17.4017 13.375C15.4541 13.375 13.8752 14.9539 13.8752 16.9015C13.8752 18.8492 15.4541 20.4281 17.4017 20.4281C19.3494 20.4281 20.9283 18.8492 20.9283 16.9015Z',
  d8: 'M15.455 9.662L19.6907 7.26197C20.0517 7.05742 20.2323 6.95514 20.3791 7.03609C20.5259 7.11703 20.5356 7.3198 20.5549 7.7253C20.581 8.27187 20.5952 8.90551 20.6112 9.6547C20.6187 10.0071 20.6235 10.7024 20.6255 10.8549C20.6331 11.4148 21.0716 11.8749 21.6315 11.8749C22.1748 11.8749 22.6296 11.4408 22.6248 10.8975C22.6233 10.7308 22.6181 10.0288 22.6092 9.61215L22.6076 9.53677C22.5764 8.07128 22.5505 6.86037 22.3799 5.87916C22.1981 4.8336 21.8393 3.95811 21.0898 3.20674C20.6664 2.78228 20.2001 2.4827 19.6842 2.26889C19.6057 2.22604 19.5216 2.19373 19.4339 2.17311C19.1041 2.05684 18.7548 1.97116 18.3845 1.90676C17.3836 1.73265 16.1417 1.70152 14.6323 1.66368L14.5575 1.66181C12.6017 1.61273 11.1487 1.61274 9.1929 1.66181L9.11805 1.66369C7.60869 1.70152 6.36681 1.73265 5.36584 1.90675C4.30347 2.09154 3.41396 2.45141 2.66056 3.20674C1.9111 3.95811 1.55225 4.8336 1.37046 5.87916C1.19985 6.86038 1.17403 8.07123 1.14278 9.53675L1.14117 9.61214C1.11987 10.6101 1.11988 11.14 1.14119 12.1379L1.14279 12.2133C1.17404 13.6788 1.19986 14.8896 1.37047 15.8709C1.55227 16.9164 1.91111 17.7919 2.66057 18.5433C3.41397 19.2986 4.30349 19.6585 5.36586 19.8433C6.36682 20.0174 7.6087 20.0485 9.11805 20.0863L9.19292 20.0882C9.87449 20.1053 9.98086 20.1164 10.8773 20.1216C11.4284 20.1248 11.875 19.6782 11.875 19.127C11.875 18.5758 11.4284 18.1288 10.8772 18.1256C9.99515 18.1204 9.90916 18.1095 9.24311 18.0928C7.64017 18.0526 6.54693 18.0226 5.70875 17.8768C4.91547 17.7388 4.4533 17.5124 4.07641 17.1345C3.69558 16.7527 3.47296 16.2968 3.33952 15.5293C3.19781 14.7143 3.17255 13.6553 3.13924 12.0953C3.11854 11.1258 3.11853 10.6242 3.13923 9.6547C3.15523 8.90561 3.16936 8.27204 3.19543 7.72553C3.21477 7.32001 3.22444 7.11725 3.37128 7.0363C3.51812 6.95535 3.69863 7.05763 4.05965 7.26219L8.29505 9.662C9.59466 10.3984 10.6938 10.875 11.875 10.875C13.0562 10.875 14.1553 10.3984 15.455 9.662Z',
  d9: 'M22 11V2.5H2V19.5H11',
  d10: 'M2 6L12 11L22 6',
  d11: 'M1.25 2.72368C1.25 2.18593 1.68754 1.75 2.22727 1.75H21.7727C22.3125 1.75 22.75 2.18593 22.75 2.72368V11.5H20.796V7.60217L12.0003 12L3.20508 7.6024V18.3026H11V20.25H2.22727C1.68754 20.25 1.25 19.8141 1.25 19.2763V2.72368Z',
  d12: 'M13.252 17.0492C13.252 14.6748 15.1768 12.75 17.5512 12.75C19.9256 12.75 21.8504 14.6748 21.8504 17.0492C21.8504 17.8936 21.607 18.6811 21.1865 19.3455L22.7498 20.9047L21.4088 22.25L19.8424 20.6877C19.1791 21.1063 18.3934 21.3485 17.5512 21.3485C15.1768 21.3485 13.252 19.4236 13.252 17.0492ZM17.5512 14.6496C16.2259 14.6496 15.1515 15.7239 15.1515 17.0492C15.1515 18.3745 16.2259 19.4489 17.5512 19.4489C18.8765 19.4489 19.9508 18.3745 19.9508 17.0492C19.9508 15.7239 18.8765 14.6496 17.5512 14.6496Z',
};

export const IconMailSearch01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-stroke-rounded IconMailSearch01StrokeRounded"
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

export const IconMailSearch01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-duotone-rounded IconMailSearch01DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconMailSearch01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-twotone-rounded IconMailSearch01TwotoneRounded"
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

export const IconMailSearch01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-solid-rounded IconMailSearch01SolidRounded"
    >
      <path 
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

export const IconMailSearch01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-bulk-rounded IconMailSearch01BulkRounded"
    >
      <path 
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
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSearch01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-stroke-sharp IconMailSearch01StrokeSharp"
    >
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSearch01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-search-01-solid-sharp IconMailSearch01SolidSharp"
    >
      <path 
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

export const iconPackOfMailSearch01: TheIconSelfPack = {
  name: 'MailSearch01',
  StrokeRounded: IconMailSearch01StrokeRounded,
  DuotoneRounded: IconMailSearch01DuotoneRounded,
  TwotoneRounded: IconMailSearch01TwotoneRounded,
  SolidRounded: IconMailSearch01SolidRounded,
  BulkRounded: IconMailSearch01BulkRounded,
  StrokeSharp: IconMailSearch01StrokeSharp,
  SolidSharp: IconMailSearch01SolidSharp,
};