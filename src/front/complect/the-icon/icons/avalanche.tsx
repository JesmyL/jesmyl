import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 21H11.6547C14.1755 21 15.4359 21 15.8711 20.1706C16.3063 19.3412 15.6107 18.2648 14.2196 16.112L6.93559 4.83965C6.13925 3.60728 5.74108 2.9911 5.17984 3.0001C3.95309 3.01976 2.5 6 2 7',
  d2: 'M10 5C10.6024 6.2142 11.1505 7.01476 12 8',
  d3: 'M2 7C2.19944 7.58943 2.32706 8.50266 2.75554 8.96655C3.00648 9.23823 3.39002 9.34981 3.75053 9.25601C4.29307 9.11485 4.61512 8.53558 5.1267 8.33278C5.36623 8.23783 5.63377 8.23783 5.8733 8.33278C6.51536 8.5873 6.92764 9.39686 7.63967 9.49121C8.32392 9.58188 8.66629 8.9708 9 8.47768',
  d4: 'M18.7267 15.0452C18.6898 15.426 18.5912 15.7902 18.4401 16.1291M18.7267 15.0452C18.936 12.8817 17.0417 11 14.762 11C14.0531 11 12.8052 11.1754 12 11.763M18.7267 15.0452C20.5289 15.0371 22 16.3985 22 18.0791C22 19.4694 20.9961 20.6412 19.6267 21',
  d5: 'M15.7597 19.1973C15.533 18.4452 15.2611 17.7237 14.2196 16.112L12 11.763C12.8052 11.1754 14.0531 11 14.762 11C17.0417 11 18.936 12.8817 18.7267 15.0452C20.5289 15.0371 22 16.3985 22 18.0791C22 19.4694 21.3733 20.5 20 21L18 20.5L16.8129 20.2032C16.3077 20.0769 15.9099 19.6959 15.7597 19.1973Z',
  d6: 'M10.5577 4.10442C11.0524 3.85895 11.6525 4.06102 11.898 4.55576C12.4605 5.68956 12.9606 6.42071 13.7595 7.3472C14.1202 7.76546 14.0735 8.3969 13.6552 8.75756C13.2369 9.11821 12.6055 9.07151 12.2448 8.65325C11.3446 7.60926 10.7487 6.73929 10.1064 5.44468C9.86091 4.94995 10.063 4.34989 10.5577 4.10442Z',
  d7: 'M7.77647 4.43173C7.42284 3.88078 7.10074 3.37895 6.79238 3.0251C6.46474 2.64913 5.98235 2.23895 5.28356 2.25023C4.61534 2.26101 4.07747 2.65758 3.72079 2.99529C3.3364 3.35924 2.98645 3.82454 2.68779 4.27744C2.12293 5.13399 1.60328 6.18248 1.35227 6.68897C1.23669 6.92162 1.21827 7.19112 1.30111 7.43751C1.34179 7.5919 1.521 8.23716 1.57533 8.41546C1.68747 8.78351 1.87265 9.30472 2.23902 9.70394C2.72676 10.2354 3.46651 10.4494 4.15842 10.2682C4.66342 10.136 5.02653 9.81236 5.22261 9.63763L5.60459 9.33085C5.60459 9.33085 6.1239 9.74605 6.15165 9.77128C6.40923 10.0055 6.88102 10.4306 7.55472 10.5205C8.21178 10.6081 8.7173 10.3539 9.07045 10.0401L13.2425 16.5383C13.9338 17.6152 14.3907 18.3314 14.6384 18.8769C14.7583 19.1409 14.7997 19.3043 14.8096 19.4014C14.8274 19.498 14.7623 19.5564 14.7275 19.5735C14.651 19.6145 14.5028 19.6677 14.2262 19.7099C13.653 19.7973 12.8261 19.8 11.5714 19.8H2.21872C1.68371 19.8 1.25 20.2365 1.25 20.775C1.25 21.3135 1.68371 21.75 2.21872 21.75L11.6519 21.75C12.4405 21.75 13.1466 21.7501 13.7498 21.7141C13.8222 21.7374 13.8994 21.75 13.9796 21.75H17.9521C18.5053 21.75 19.1516 21.7428 19.7721 21.6226C20.4012 21.5008 21.0547 21.2541 21.594 20.7386C22.3017 20.0621 22.7501 19.1239 22.7501 18.0791C22.7501 16.1874 21.3042 14.683 19.4781 14.3597C19.2816 12.0469 17.1635 10.25 14.7621 10.25C14.3538 10.25 13.807 10.2996 13.2463 10.4309C12.8231 10.5299 12.3621 10.6823 11.9391 10.9154L7.77647 4.43173Z',
  d8: 'M14.9121 15.546C15.5498 16.5391 16.0868 17.3755 16.4005 18.0663C16.7219 18.7741 16.9386 19.6043 16.5137 20.4193C16.0841 21.2433 15.2766 21.522 14.5163 21.6379C13.7803 21.7501 12.8042 21.7501 11.6519 21.75H11.6519L2.21872 21.75C1.68371 21.75 1.25 21.3135 1.25 20.775C1.25 20.2365 1.68371 19.8 2.21872 19.8H11.5714C12.8261 19.8 13.653 19.7973 14.2262 19.7099C14.5028 19.6677 14.651 19.6145 14.7275 19.5735C14.7623 19.5567 14.8276 19.4988 14.8096 19.4014C14.7997 19.3043 14.7583 19.1409 14.6384 18.8769C14.3907 18.3314 13.9338 17.6152 13.2425 16.5383L9.07045 10.0401C8.7173 10.3539 8.21178 10.6081 7.55472 10.5205C6.88102 10.4306 6.40923 10.0055 6.15165 9.77128C5.87556 9.51993 5.70065 9.36918 5.60459 9.33085C5.55042 9.35247 5.47718 9.41093 5.22261 9.63763C5.02653 9.81236 4.66342 10.136 4.15842 10.2682C3.46651 10.4494 2.72676 10.2354 2.23902 9.70394C1.87265 9.30472 1.68747 8.78351 1.57533 8.41546C1.57533 8.41546 1.33753 7.54585 1.30111 7.43751C1.21827 7.19112 1.23669 6.92162 1.35227 6.68897C1.60328 6.18248 2.12293 5.13399 2.68779 4.27744C2.98645 3.82454 3.3364 3.35924 3.72079 2.99529C4.07747 2.65758 4.61534 2.26101 5.28356 2.25023C5.98235 2.23895 6.46474 2.64913 6.79238 3.0251C7.10075 3.37896 7.42285 3.88079 7.77649 4.43176L7.7765 4.43178L14.9121 15.546L14.9121 15.546Z',
  d9: 'M19.7724 21.6226C19.1519 21.7428 18.5056 21.75 17.9524 21.75L13.7501 21.7141C14.0282 21.6976 14.2844 21.6733 14.5167 21.6379C15.2769 21.522 16.0844 21.2433 16.514 20.4193C16.9389 19.6043 16.7222 18.7741 16.4008 18.0663C16.0871 17.3754 15.5501 16.5391 14.9124 15.546L11.9395 10.9154C12.3624 10.6823 12.8234 10.5299 13.2466 10.4309C13.8073 10.2996 14.3541 10.25 14.7624 10.25C17.1638 10.25 19.2819 12.0469 19.4784 14.3597C21.3046 14.683 22.7504 16.1874 22.7504 18.0791C22.7504 19.1239 22.302 20.0621 21.5943 20.7386C21.055 21.2541 20.4015 21.5008 19.7724 21.6226Z',
  d10: 'M10 5.00049L12 8.00261',
  d11: 'M18.7267 15.0497C18.6898 15.4306 18.5912 15.795 18.4401 16.134M18.7267 15.0497C18.936 12.8853 17.0417 11.0029 14.762 11.0029C13.5 11.0029 12 11.5031 11.5 12.5035M18.7267 15.0497C20.5289 15.0416 22 16.4035 22 18.0847C22 19.4755 20.9961 20.6478 19.6267 21.0067',
  d12: 'M1 21.0066H16.9813C16.9893 21.0066 16.9941 20.9977 16.9896 20.9911L7.99528 7.50148M7.99528 7.50148L5.00832 3.01227C5.00436 3.00633 4.99563 3.00632 4.99167 3.01227L2 7.50148L2.99596 9.99234C2.99814 9.99777 3.00449 10.0002 3.00972 9.99757L5 9.00205L6.99026 9.99756C6.9955 10.0002 7.00186 9.99776 7.00403 9.99231L7.99528 7.50148Z',
  d13: 'M11.3613 8.55471L9.36133 5.55471L11.0254 4.44531L13.0254 7.44531L11.3613 8.55471Z',
  d14: 'M6.08005 2.68417C5.89922 2.41292 5.5948 2.25 5.2688 2.25C4.94281 2.25 4.63838 2.41292 4.45755 2.68417L1.24806 7.49841L2.41354 10.4121C2.5148 10.6653 2.71744 10.8645 2.97231 10.9614C3.22717 11.0583 3.51096 11.044 3.75484 10.9221L5.2688 10.1651L6.78277 10.9221C7.02664 11.044 7.31044 11.0583 7.5653 10.9614C7.82016 10.8645 8.0228 10.6653 8.12407 10.4121L8.41069 9.69554L15.147 19.8L1.24806 19.7999L1.24805 21.7499L19.6276 21.75C19.6917 21.75 19.7556 21.7418 19.8177 21.7255C21.4762 21.291 22.7509 19.8507 22.7509 18.0791C22.7509 16.1874 21.3051 14.683 19.479 14.3597C19.2824 12.0469 17.1643 10.25 14.7629 10.25C14.0419 10.25 13.2515 10.3913 12.5557 10.6835C12.269 10.8039 11.9833 10.9567 11.7215 11.1463L6.08005 2.68417Z',
};

export const IconAvalancheStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-stroke-rounded IconAvalancheStrokeRounded"
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

export const IconAvalancheDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-duotone-rounded IconAvalancheDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        d={d.d4} 
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

export const IconAvalancheTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-twotone-rounded IconAvalancheTwotoneRounded"
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
      <path 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAvalancheSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-solid-rounded IconAvalancheSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconAvalancheBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-bulk-rounded IconAvalancheBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAvalancheStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-stroke-sharp IconAvalancheStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAvalancheSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="avalanche-solid-sharp IconAvalancheSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfAvalanche: TheIconSelfPack = {
  name: 'Avalanche',
  StrokeRounded: IconAvalancheStrokeRounded,
  DuotoneRounded: IconAvalancheDuotoneRounded,
  TwotoneRounded: IconAvalancheTwotoneRounded,
  SolidRounded: IconAvalancheSolidRounded,
  BulkRounded: IconAvalancheBulkRounded,
  StrokeSharp: IconAvalancheStrokeSharp,
  SolidSharp: IconAvalancheSolidSharp,
};