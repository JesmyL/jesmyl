import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 18C14 18 15 18 16 20C16 20 19.1765 15 22 14',
  d2: 'M13 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.75591 13.5891 12.7529 13.5096 16 15.2432',
  d3: 'M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z',
  d4: 'M5.57757 15.4816C4.1628 16.324 0.453365 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H15.4091C16.9545 22 18.1837 21.248 19.2873 20.1966C21.5466 18.0441 17.8372 16.324 16.4224 15.4816C13.1048 13.5061 8.89519 13.5061 5.57757 15.4816Z',
  d5: 'M22.8167 13.9164C23.001 14.437 22.7285 15.0085 22.2079 15.1929C21.6742 15.3819 21.0578 15.7888 20.4047 16.3615C19.762 16.9251 19.1368 17.6021 18.5831 18.2659C18.0312 18.9274 17.5625 19.5611 17.2314 20.0301C17.0663 20.2641 16.8061 20.6544 16.7181 20.7865C16.5248 21.0906 16.1827 21.2674 15.8229 21.249C15.4629 21.2305 15.1408 21.0198 14.9796 20.6975C14.5389 19.8161 14.1436 19.4652 13.9443 19.3323C13.86 19.2761 13.803 19.2536 13.7804 19.2459C13.272 19.1987 12.874 18.771 12.874 18.2503C12.874 17.698 13.3217 17.2503 13.874 17.2503C14.4776 17.2503 14.7793 17.4853 15.0537 17.6682C15.328 17.8511 15.6157 18.1038 15.9044 18.4497C16.2196 18.0189 16.608 17.5113 17.0473 16.9847C17.6406 16.2735 18.339 15.5129 19.086 14.8578C19.8226 14.2118 20.6621 13.6186 21.5402 13.3076C22.0608 13.1233 22.6323 13.3958 22.8167 13.9164Z',
  d6: 'M6.62438 6.5C6.62438 3.6005 8.97488 1.25 11.8744 1.25C14.7739 1.25 17.1244 3.6005 17.1244 6.5C17.1244 9.39949 14.7739 11.75 11.8744 11.75C8.97488 11.75 6.62438 9.39949 6.62438 6.5Z',
  d7: 'M12.4789 13.3625C11.4151 13.2125 10.3333 13.2125 9.26946 13.3625C7.80498 13.5691 6.37291 14.0602 5.06806 14.8372C4.95178 14.9064 4.80813 14.9875 4.64552 15.0792C3.9327 15.4813 2.85509 16.0893 2.11692 16.8118C1.65525 17.2637 1.2166 17.8592 1.13685 18.5888C1.05205 19.3646 1.39051 20.0927 2.06953 20.7396C3.24097 21.8556 4.64676 22.75 6.46507 22.75H13.6486C14.3274 22.75 14.6667 22.75 14.7428 22.563C14.8188 22.3759 14.5705 22.1341 14.0739 21.6505C13.7849 21.369 13.5052 21.0775 13.3148 20.835C13.2419 20.7421 13.2054 20.6956 13.1729 20.6716C13.1405 20.6475 13.0838 20.6256 12.9705 20.5816C12.036 20.2192 11.374 19.3126 11.374 18.2502C11.374 16.8695 12.4933 15.7502 13.874 15.7502C14.4383 15.7502 14.8818 15.879 15.2164 16.0286C15.468 16.1412 15.5938 16.1975 15.6912 16.1756C15.7886 16.1536 15.8671 16.0616 16.0242 15.8776C16.1301 15.7536 16.243 15.6225 16.3553 15.4939C16.5878 15.2275 16.7041 15.0943 16.6765 14.9506C16.6489 14.8069 16.4995 14.7304 16.2007 14.5773C15.0346 13.9802 13.707 13.5357 12.4789 13.3625Z',
  d8: 'M22.8176 13.9164C23.002 14.437 22.7294 15.0085 22.2088 15.1929C21.6752 15.3819 21.0587 15.7888 20.4057 16.3615C19.763 16.9251 19.1378 17.6021 18.5841 18.2659C18.0322 18.9274 17.5635 19.5611 17.2324 20.0301C17.0672 20.2641 16.807 20.6544 16.7191 20.7865C16.5258 21.0906 16.1837 21.2674 15.8239 21.249C15.4639 21.2305 15.1418 21.0198 14.9806 20.6975C14.5399 19.8161 14.1446 19.4652 13.9453 19.3323C13.861 19.2761 13.804 19.2536 13.7814 19.2459C13.273 19.1987 12.875 18.771 12.875 18.2503C12.875 17.698 13.3227 17.2503 13.875 17.2503C14.4786 17.2503 14.7803 17.4853 15.0547 17.6682C15.329 17.8511 15.6166 18.1038 15.9054 18.4497C16.2206 18.0189 16.609 17.5113 17.0483 16.9847C17.6416 16.2735 18.34 15.5129 19.087 14.8578C19.8236 14.2118 20.663 13.6186 21.5412 13.3076C22.0618 13.1233 22.6332 13.3958 22.8176 13.9164Z',
  d9: 'M11.875 1.25C8.9755 1.25 6.625 3.6005 6.625 6.5C6.625 9.39949 8.9755 11.75 11.875 11.75C14.7745 11.75 17.125 9.39949 17.125 6.5C17.125 3.6005 14.7745 1.25 11.875 1.25Z',
  d10: 'M9.27043 13.3625C10.3343 13.2125 11.4161 13.2125 12.4799 13.3625C13.708 13.5357 15.0356 13.9802 16.2016 14.5773C16.5004 14.7304 16.6498 14.8069 16.6775 14.9506C16.7051 15.0943 16.5888 15.2275 16.3563 15.4939C16.244 15.6225 16.131 15.7536 16.0252 15.8776C15.8681 16.0616 15.7896 16.1536 15.6922 16.1756C15.5948 16.1975 15.469 16.1412 15.2174 16.0286C14.8828 15.879 14.4393 15.7502 13.875 15.7502C12.4943 15.7502 11.375 16.8695 11.375 18.2502C11.375 19.3126 12.0369 20.2192 12.9714 20.5816C13.0848 20.6256 13.1415 20.6475 13.1739 20.6716C13.2064 20.6956 13.2428 20.7421 13.3158 20.8349C13.5062 21.0775 13.7858 21.369 14.0749 21.6505C14.5715 22.1341 14.8198 22.3759 14.7437 22.563C14.6677 22.75 14.3283 22.75 13.6496 22.75H6.46604C4.64774 22.75 3.24195 21.8556 2.0705 20.7396C1.39149 20.0927 1.05302 19.3646 1.13783 18.5888C1.21757 17.8592 1.65623 17.2637 2.1179 16.8118C2.85606 16.0893 3.93357 15.4814 4.64639 15.0793C4.809 14.9875 4.95276 14.9064 5.06904 14.8372C6.37389 14.0602 7.80596 13.5691 9.27043 13.3625Z',
  d11: 'M14 18L16 20L22 14',
  d12: 'M12 20H2C2 16.134 5.58172 13 10 13C11.8919 13 13.6304 13.5746 15 14.5353M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z',
  d13: 'M22.75 15.1642L15.7502 22.25L12.75 19.164L14.1642 17.7498L15.7502 19.4216L21.3358 13.75L22.75 15.1642Z',
  d14: 'M10 1.75C7.37665 1.75 5.25 3.87665 5.25 6.5C5.25 9.12335 7.37665 11.25 10 11.25C12.6234 11.25 14.75 9.12335 14.75 6.5C14.75 3.87665 12.6234 1.75 10 1.75Z',
  d15: 'M10 12.75C5.26471 12.75 1.25 16.1289 1.25 20.5V21.25H12.6874L10.6445 19.1487L14.1935 15.5997L15.7714 17.263L17.0777 15.9365C15.4702 13.9888 12.8672 12.75 10 12.75Z',
};

export const IconUserCheck01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-stroke-rounded IconUserCheck01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconUserCheck01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-duotone-rounded IconUserCheck01DuotoneRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCheck01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-twotone-rounded IconUserCheck01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconUserCheck01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-solid-rounded IconUserCheck01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCheck01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-bulk-rounded IconUserCheck01BulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconUserCheck01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-stroke-sharp IconUserCheck01StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconUserCheck01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="user-check-01-solid-sharp IconUserCheck01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfUserCheck01: TheIconSelfPack = {
  name: 'UserCheck01',
  StrokeRounded: IconUserCheck01StrokeRounded,
  DuotoneRounded: IconUserCheck01DuotoneRounded,
  TwotoneRounded: IconUserCheck01TwotoneRounded,
  SolidRounded: IconUserCheck01SolidRounded,
  BulkRounded: IconUserCheck01BulkRounded,
  StrokeSharp: IconUserCheck01StrokeSharp,
  SolidSharp: IconUserCheck01SolidSharp,
};