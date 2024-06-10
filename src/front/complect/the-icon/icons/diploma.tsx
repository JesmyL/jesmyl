import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.5 17.838C19.5305 17.6867 20.2627 17.3941 20.8284 16.8284C22 15.6569 22 13.7712 22 10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H10C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10C2 13.7712 2 15.6569 3.17157 16.8284C3.97975 17.6366 5.1277 17.8873 7 17.965',
  d2: 'M17 7L7 7',
  d3: 'M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z',
  d4: 'M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471',
  d5: 'M10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C20.2627 17.3941 19.5306 17.6867 18.5 17.838L15.2232 17.8742C14.7724 16.6658 14.5 15.502 14.5 15L14.451 14.9951C14.4831 14.8351 14.5 14.6695 14.5 14.5C14.5 13.1193 13.3807 12 12 12C10.6193 12 9.5 13.1193 9.5 14.5C9.5 15.8242 9.68267 16.9616 9.9559 17.9324L7 17.965C5.1277 17.8873 3.97975 17.6366 3.17157 16.8284C2 15.6569 2 13.7712 2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2Z',
  d6: 'M17 7H7',
  d7: 'M9.5 14.5C9.5 15.8807 10.6193 17 12 17C13.3807 17 14.5 15.8807 14.5 14.5C14.5 13.1193 13.3807 12 12 12C10.6193 12 9.5 13.1193 9.5 14.5ZM9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471',
  d8: 'M18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25H9.94358C8.10583 1.24998 6.65019 1.24997 5.51098 1.40314C4.33856 1.56076 3.38961 1.89288 2.64124 2.64124C1.89288 3.38961 1.56076 4.33856 1.40314 5.51098C1.24997 6.65019 1.24998 8.10581 1.25 9.94356V10.0564C1.24998 11.8942 1.24997 13.3498 1.40314 14.489C1.56076 15.6614 1.89288 16.6104 2.64124 17.3588C3.67009 18.3876 5.08744 18.6363 6.96888 18.7144L6.98858 18.7152L7.53921 18.7091C7.57101 18.7088 7.58692 18.7086 7.59842 18.7071C7.7112 18.6927 7.78779 18.5914 7.77089 18.479C7.76916 18.4675 7.76478 18.4514 7.75601 18.4191C7.58734 17.8219 7.25 16.2021 7.25 14.5C7.25 11.8766 9.37665 9.75 12 9.75C14.6234 9.75 16.75 11.8766 16.75 14.5C16.7968 14.8582 16.9553 15.7608 17.2147 16.5056C17.4048 17.1299 17.6527 17.7762 17.9681 18.3804C18.0212 18.4821 18.0477 18.533 18.097 18.5621C18.1462 18.5911 18.2054 18.5897 18.3238 18.5868L18.6089 18.58C19.7268 18.4159 20.6364 18.0811 21.3588 17.3588C22.1071 16.6104 22.4392 15.6614 22.5969 14.489C22.75 13.3498 22.75 11.8942 22.75 10.0565V9.94359C22.75 8.10585 22.75 6.65018 22.5969 5.51098C22.4392 4.33856 22.1071 3.38961 21.3588 2.64124C20.6104 1.89288 19.6614 1.56076 18.489 1.40314ZM17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25H7C6.58579 5.25 6.25 5.58579 6.25 6C6.25 6.41421 6.58579 6.75 7 6.75H17Z',
  d9: 'M12 11.25C10.2051 11.25 8.75 12.7051 8.75 14.5C8.75 16.2949 10.2051 17.75 12 17.75C13.7949 17.75 15.25 16.2949 15.25 14.5C15.25 12.7051 13.7949 11.25 12 11.25ZM17.572 21.4847C17.8057 21.2093 17.8099 20.8065 17.582 20.5263C16.8027 19.5678 16.27 18.4126 15.9116 17.3516C15.8525 17.1767 15.823 17.0892 15.7644 17.079C15.7058 17.0689 15.647 17.1431 15.5294 17.2915C14.7052 18.332 13.4306 18.9994 12.0001 18.9994C11.1618 18.9994 10.377 18.7702 9.70499 18.3709C9.48328 18.2392 9.37242 18.1734 9.31837 18.2166C9.26433 18.2598 9.30226 18.3763 9.37812 18.6092C9.94639 20.354 10.7699 21.5413 11.2784 22.2745C11.3147 22.3269 11.3495 22.377 11.3824 22.4248C11.5329 22.6433 11.7877 22.7661 12.0524 22.7476C12.3171 22.7291 12.5523 22.5722 12.6709 22.3348L13.7218 20.2331C13.7662 20.1444 13.7884 20.1 13.8296 20.0875C13.8708 20.075 13.9138 20.0996 13.9999 20.1489L16.628 21.6506C16.9416 21.8298 17.3383 21.7601 17.572 21.4847Z',
  d10: 'M14.0564 1.25C15.8942 1.24999 17.3498 1.24997 18.489 1.40314C19.6614 1.56076 20.6104 1.89288 21.3588 2.64124C22.1071 3.38961 22.4392 4.33856 22.5969 5.51098C22.75 6.65018 22.75 8.10585 22.75 9.94359V10.0565C22.75 11.8942 22.75 13.3498 22.5969 14.489C22.4392 15.6614 22.1071 16.6104 21.3588 17.3588C20.6364 18.0811 19.7268 18.4159 18.6089 18.58L18.3238 18.5868C18.2054 18.5897 18.1462 18.5911 18.097 18.5621C18.0477 18.533 18.0212 18.4821 17.9681 18.3804C17.6527 17.7762 17.4048 17.1299 17.2147 16.5056C16.9553 15.7608 16.7968 14.8582 16.75 14.5C16.75 11.8766 14.6234 9.75 12 9.75C9.37665 9.75 7.25 11.8766 7.25 14.5C7.25 16.2021 7.58734 17.8219 7.75601 18.4191C7.76478 18.4514 7.76916 18.4675 7.77089 18.479C7.78779 18.5914 7.7112 18.6927 7.59842 18.7071C7.58692 18.7086 7.57101 18.7088 7.53921 18.7091L6.98858 18.7152L6.96888 18.7144C5.08744 18.6363 3.67009 18.3876 2.64124 17.3588C1.89288 16.6104 1.56076 15.6614 1.40314 14.489C1.24997 13.3498 1.24999 11.8942 1.25 10.0564V9.94356C1.24999 8.10581 1.24997 6.65019 1.40314 5.51098C1.56076 4.33856 1.89288 3.38961 2.64124 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10583 1.24999 9.94358 1.25H14.0564Z',
  d11: 'M17.75 6C17.75 6.41421 17.4142 6.75 17 6.75L7 6.75C6.58579 6.75 6.25 6.41421 6.25 6C6.25 5.58579 6.58579 5.25 7 5.25L17 5.25C17.4142 5.25 17.75 5.58579 17.75 6Z',
  d12: 'M18 18.9891H22V3H2V18.9891H6',
  d13: 'M17 6.99707H7',
  d14: 'M15 13.9926C15 15.6484 13.6569 16.9906 12 16.9906C10.3431 16.9906 9 15.6484 9 13.9926C9 12.3368 10.3431 10.9946 12 10.9946C13.6569 10.9946 15 12.3368 15 13.9926Z',
  d15: 'M8.98438 13.9087V20.9881C8.98438 20.9956 8.9922 21.0004 8.99885 20.9971L12.0437 19.4748L14.9818 20.9967C14.9885 21.0002 14.9964 20.9954 14.9964 20.9879V13.9087',
  d16: 'M1.25 3C1.25 2.58579 1.58579 2.25 2 2.25H22C22.4142 2.25 22.75 2.58579 22.75 3V19C22.75 19.4142 22.4142 19.75 22 19.75H16.5V14C16.5 11.5147 14.4853 9.5 12 9.5C9.51472 9.5 7.5 11.5147 7.5 14V19.75H2C1.58579 19.75 1.25 19.4142 1.25 19V3ZM17 5.25H7V6.75H17V5.25Z',
  d17: 'M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z',
  d18: 'M12 18C13.171 18 14.2313 17.5264 15 16.7604V21.75L12 20.25L9 21.75V16.7604C9.76868 17.5264 10.829 18 12 18Z',
};

export const IconDiplomaStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-stroke-rounded IconDiplomaStrokeRounded"
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
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiplomaDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-duotone-rounded IconDiplomaDuotoneRounded"
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

export const IconDiplomaTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-twotone-rounded IconDiplomaTwotoneRounded"
    >
      <path 
        d={d.d1} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDiplomaSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-solid-rounded IconDiplomaSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconDiplomaBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-bulk-rounded IconDiplomaBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
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

export const IconDiplomaStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-stroke-sharp IconDiplomaStrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDiplomaSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="diploma-solid-sharp IconDiplomaSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
    </TheIconWrapper>
  );
};

export const iconPackOfDiploma: TheIconSelfPack = {
  name: 'Diploma',
  StrokeRounded: IconDiplomaStrokeRounded,
  DuotoneRounded: IconDiplomaDuotoneRounded,
  TwotoneRounded: IconDiplomaTwotoneRounded,
  SolidRounded: IconDiplomaSolidRounded,
  BulkRounded: IconDiplomaBulkRounded,
  StrokeSharp: IconDiplomaStrokeSharp,
  SolidSharp: IconDiplomaSolidSharp,
};