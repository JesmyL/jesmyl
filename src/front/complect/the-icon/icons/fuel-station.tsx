import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.4626 13L9.06858 14.8124C8.91919 15.0066 9.02626 15.2861 9.26987 15.3378L10.7301 15.6477C10.9899 15.7028 11.0889 16.0122 10.9073 16.2011L9.17773 18',
  d2: 'M4 10H16',
  d3: 'M4 21L4 9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3C12.8284 3 14.2426 3 15.1213 3.87868C16 4.75736 16 6.17157 16 9L16 21H4Z',
  d4: 'M2 21H18',
  d5: 'M16 14H17.6667C17.9767 14 18.1317 14 18.2588 14.0341C18.6039 14.1265 18.8735 14.3961 18.9659 14.7412C19 14.8683 19 15.0233 19 15.3333V16.5C19 17.3284 19.6716 18 20.5 18C21.3284 18 22 17.3284 22 16.5V10.2111C22 9.60998 22 9.30941 21.9142 9.02598C21.8284 8.74255 21.6616 8.49247 21.3282 7.9923L20.5547 6.83205C20.2082 6.31223 19.6247 6 19 6',
  d6: 'M4 10V21.0016H16L16 10.0016L4 10Z',
  d7: 'M10.0681 2.125H9.93195H9.93192H9.93189H9.93186C8.62614 2.12497 7.54944 2.12494 6.69726 2.24079C5.80257 2.36241 5.01241 2.62758 4.37974 3.26729C3.74706 3.90699 3.48481 4.70593 3.36452 5.61057C3.24995 6.4722 3.24997 7.56086 3.25 8.88107V8.8811V8.88113V8.88117V9.87441V9.87559L3.25001 19.875H2C1.44772 19.875 1 20.3227 1 20.875C1 21.4273 1.44772 21.875 2 21.875H18C18.5523 21.875 19 21.4273 19 20.875C19 20.3227 18.5523 19.875 18 19.875H16.75L16.75 14.875H17.6667C17.8307 14.875 17.9204 14.8752 17.9857 14.8782L17.9963 14.8787L17.9968 14.8893C17.9998 14.9546 18 15.0443 18 15.2083V16.375C18 17.7557 19.1193 18.875 20.5 18.875C21.8807 18.875 23 17.7557 23 16.375V10.0861L23.0001 9.98465C23.0007 9.48378 23.0012 9.04019 22.8713 8.6112C22.7414 8.18221 22.4949 7.8134 22.2166 7.39697L22.1603 7.3126L21.3867 6.15235C20.8547 5.35433 19.9591 4.875 19 4.875C18.4477 4.875 18 5.32272 18 5.875C18 6.42728 18.4477 6.875 19 6.875C19.2904 6.875 19.5616 7.02013 19.7226 7.26175L20.4962 8.422C20.8619 8.97068 20.924 9.08163 20.9571 9.19077C20.9901 9.2999 21 9.42667 21 10.0861V16.375C21 16.6511 20.7761 16.875 20.5 16.875C20.2239 16.875 20 16.6511 20 16.375V15.2083L20.0001 15.1408C20.0009 14.906 20.0017 14.6182 19.9319 14.3574C19.7469 13.6672 19.2078 13.1281 18.5176 12.9431C18.2568 12.8733 17.969 12.8741 17.7342 12.8749L17.6667 12.875H16.75V9.87626L16.75 9.875L16.75 9.87375V8.88119C16.75 7.56093 16.7501 6.47223 16.6355 5.61057C16.5152 4.70593 16.2529 3.90699 15.6203 3.26729C14.9876 2.62758 14.1974 2.36241 13.3027 2.24079C12.4506 2.12494 11.3739 2.12497 10.0681 2.125H10.0681H10.0681H10.0681ZM14.8221 8.52403C14.8199 7.39501 14.8065 6.48107 14.7252 5.86962C14.6337 5.18121 14.4723 4.86237 14.2577 4.64536C14.0431 4.42835 13.7277 4.26517 13.0469 4.17261C12.3383 4.07629 11.3921 4.07422 10.0011 4.07422C8.61015 4.07422 7.66393 4.07629 6.95536 4.17261C6.27452 4.26517 5.95918 4.42836 5.74455 4.64536C5.52993 4.86237 5.36854 5.18121 5.277 5.86962C5.1957 6.48107 5.18229 7.39501 5.18011 8.52403C5.17956 8.80673 5.17929 8.94807 5.26719 9.03615C5.35509 9.12422 5.49663 9.12422 5.77969 9.12422H14.2225C14.5056 9.12422 14.6471 9.12422 14.735 9.03615C14.8229 8.94807 14.8227 8.80673 14.8221 8.52403ZM11.2544 13.4847C11.5911 13.047 11.5092 12.4191 11.0714 12.0824C10.6337 11.7457 10.0058 11.8276 9.6691 12.2654L8.27509 14.0778C7.65746 14.8807 8.12959 15.9932 9.06139 16.191L9.34992 16.2523L8.45603 17.182C8.07325 17.5801 8.08569 18.2131 8.4838 18.5959C8.88192 18.9787 9.51497 18.9662 9.89775 18.5681L11.6273 16.7692C12.3753 15.9913 11.9319 14.7558 10.9369 14.5446L10.5091 14.4537L11.2544 13.4847Z',
  d8: 'M10.068 2.125H9.93195H9.93192C8.62617 2.12497 7.54945 2.12494 6.69726 2.24079C5.80257 2.36241 5.01241 2.62758 4.37973 3.26729C3.74706 3.90699 3.4848 4.70593 3.36451 5.61057C3.24994 6.47222 3.24997 7.56089 3.25 8.88113V8.88116V9.87441V9.87559L3.25 21.625H16.75L16.75 9.87626L16.75 9.875L16.75 9.87374V8.88119C16.75 7.56093 16.7501 6.47223 16.6355 5.61057C16.5152 4.70593 16.2529 3.90699 15.6203 3.26729C14.9876 2.62758 14.1974 2.36241 13.3027 2.24079C12.4506 2.12494 11.3738 2.12497 10.0681 2.125H10.068Z',
  d9: 'M14.2222 9.12422C14.5053 9.12422 14.6468 9.12422 14.7347 9.03614C14.8226 8.94807 14.8223 8.80672 14.8218 8.52403C14.8196 7.39501 14.8062 6.48107 14.7249 5.86961C14.6334 5.18121 14.472 4.86237 14.2573 4.64536C14.0427 4.42835 13.7274 4.26517 13.0465 4.17261C12.338 4.07629 11.3917 4.07422 10.0008 4.07422C8.60981 4.07422 7.66359 4.07629 6.95502 4.17261C6.27418 4.26517 5.95884 4.42835 5.74422 4.64536C5.52959 4.86237 5.3682 5.18121 5.27666 5.86962C5.19536 6.48107 5.18195 7.39501 5.17977 8.52403C5.17922 8.80672 5.17895 8.94807 5.26685 9.03614C5.35475 9.12422 5.49629 9.12422 5.77935 9.12422H14.2222Z',
  d10: 'M11.0714 12.0824C11.5092 12.4191 11.5911 13.047 11.2544 13.4847L10.5091 14.4537L10.9369 14.5446C11.9319 14.7558 12.3753 15.9913 11.6273 16.7692L9.89774 18.5681C9.51496 18.9663 8.88192 18.9787 8.4838 18.5959C8.08568 18.2131 8.07325 17.5801 8.45603 17.182L9.34992 16.2523L9.06139 16.191C8.12959 15.9932 7.65746 14.8807 8.27508 14.0778L9.6691 12.2654C10.0058 11.8276 10.6337 11.7457 11.0714 12.0824Z',
  d11: 'M1 20.875C1 20.3227 1.44772 19.875 2 19.875H18C18.5523 19.875 19 20.3227 19 20.875C19 21.4273 18.5523 21.875 18 21.875H2C1.44772 21.875 1 21.4273 1 20.875Z',
  d12: 'M16.75 14.875V12.875H17.6667L17.7342 12.8749C17.969 12.8741 18.2568 12.8733 18.5176 12.9431C19.2078 13.1281 19.7469 13.6672 19.9319 14.3574C20.0017 14.6182 20.0009 14.906 20.0001 15.1408L20 15.2083V16.375C20 16.6511 20.2239 16.875 20.5 16.875C20.7761 16.875 21 16.6511 21 16.375V10.0861C21 9.42667 20.9901 9.2999 20.9571 9.19077C20.924 9.08163 20.8619 8.97068 20.4962 8.422L19.7226 7.26175C19.5616 7.02013 19.2904 6.875 19 6.875C18.4477 6.875 18 6.42728 18 5.875C18 5.32272 18.4477 4.875 19 4.875C19.9591 4.875 20.8547 5.35433 21.3867 6.15235L22.1603 7.3126L22.2166 7.39697L22.2166 7.39698C22.4949 7.8134 22.7414 8.18221 22.8713 8.6112C23.0012 9.04019 23.0007 9.48378 23.0001 9.98465L23 10.0861V16.375C23 17.7557 21.8807 18.875 20.5 18.875C19.1193 18.875 18 17.7557 18 16.375V15.2083C18 15.0443 17.9998 14.9546 17.9968 14.8893L17.9963 14.8787L17.9857 14.8782C17.9204 14.8752 17.8307 14.875 17.6667 14.875H16.75Z',
  d13: 'M10.5 11.5L8.5 15H11.5L9.5 18.5',
  d14: 'M4 9H16',
  d15: 'M4 21V3H16V21',
  d16: 'M16 14H19V16.5C19 17.3284 19.6716 18 20.5 18C21.3284 18 22 17.3284 22 16.5V10L20 7.00025L18 7',
  d17: 'M2.75 3.225C2.75 2.68652 3.18173 2.25 3.71429 2.25H15.2857C15.8183 2.25 16.25 2.68652 16.25 3.225V20.775C16.25 21.3135 15.8183 21.75 15.2857 21.75H3.71429C3.18173 21.75 2.75 21.3135 2.75 20.775V3.225ZM14.3225 4.2002H4.67969V9.0002H14.3225V4.2002ZM10.6506 11.8721L9.34823 11.1279L6.70703 15.75H9.70703L8.34823 18.1279L9.6506 18.8721L12.2918 14.25H9.2918L10.6506 11.8721Z',
  d18: 'M17.5 21.75H1.5V19.75H17.5V21.75Z',
  d19: 'M17.5001 6L19.5001 6.00025C19.8344 6.00029 20.1466 6.16738 20.332 6.44552L22.332 9.44527C22.4416 9.60954 22.5 9.80256 22.5 10V16.5C22.5 17.8807 21.3807 19 20 19C18.6193 19 17.5 17.8807 17.5 16.5V15H15.5V13H18.5C19.0523 13 19.5 13.4477 19.5 14V16.5C19.5 16.7761 19.7239 17 20 17C20.2761 17 20.5 16.7761 20.5 16.5V10.3028L18.9648 8.00019L17.4999 8L17.5001 6Z',
};

export const IconFuelStationStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-stroke-rounded IconFuelStationStrokeRounded"
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

export const IconFuelStationDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-duotone-rounded IconFuelStationDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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

export const IconFuelStationTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-twotone-rounded IconFuelStationTwotoneRounded"
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
      <path 
        d={d.d4} 
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

export const IconFuelStationSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-solid-rounded IconFuelStationSolidRounded"
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

export const IconFuelStationBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-bulk-rounded IconFuelStationBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconFuelStationStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-stroke-sharp IconFuelStationStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFuelStationSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fuel-station-solid-sharp IconFuelStationSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFuelStation: TheIconSelfPack = {
  name: 'FuelStation',
  StrokeRounded: IconFuelStationStrokeRounded,
  DuotoneRounded: IconFuelStationDuotoneRounded,
  TwotoneRounded: IconFuelStationTwotoneRounded,
  SolidRounded: IconFuelStationSolidRounded,
  BulkRounded: IconFuelStationBulkRounded,
  StrokeSharp: IconFuelStationStrokeSharp,
  SolidSharp: IconFuelStationSolidSharp,
};