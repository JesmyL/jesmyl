import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 9.71428V11M7 9.71428C5.84322 9.71428 4.82406 9.14608 4.22632 8.28331M7 9.71428C8.15678 9.71428 9.17594 9.14608 9.77368 8.28331M7 3.28571C8.15687 3.28571 9.17609 3.854 9.77381 4.71688M7 3.28571C5.84313 3.28571 4.82391 3.854 4.22619 4.71688M7 3.28571V2M11 3.92857L9.77381 4.71688M3.00042 9.07143L4.22632 8.28331M3 3.92857L4.22619 4.71688M10.9996 9.07143L9.77368 8.28331M9.77381 4.71688C10.1273 5.22711 10.3333 5.84035 10.3333 6.5C10.3333 7.15973 10.1272 7.77304 9.77368 8.28331M4.22619 4.71688C3.87274 5.22711 3.66667 5.84035 3.66667 6.5C3.66667 7.15973 3.87279 7.77304 4.22632 8.28331',
  d2: 'M13 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V13',
  d3: 'M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22',
  d4: 'M15.502 15.5021C19.09 15.5021 20.6582 13.8464 20.9986 13.0104C21 12.6419 21 12.2462 21 11.8199V9.27273C21 6.20337 21 4.66867 20.1523 3.60289C19.9094 3.29753 19.6214 3.02643 19.2969 2.79784C18.1645 2 16.5339 2 13.2727 2H9C8.07069 2 7.60604 2 7.21964 2.07686C5.79014 2.3612 4.64176 3.39609 4.19739 4.75862C4.20603 4.74576 4.21476 4.73296 4.22358 4.72022C4.82131 3.85735 5.84053 3.28906 6.9974 3.28906C8.15426 3.28906 9.17348 3.85735 9.77121 4.72022C10.1247 5.23046 10.3307 5.8437 10.3307 6.50335C10.3307 7.16308 10.1246 7.77639 9.77108 8.28666C9.17334 9.14943 8.15418 9.71763 6.9974 9.71763C5.84061 9.71763 4.82146 9.14943 4.22371 8.28666C4.14078 8.16695 4.06595 8.04158 4 7.91126V16.1818C4 17.8751 4 18.7217 4.26796 19.3979C4.69875 20.4849 5.60979 21.3424 6.76478 21.7478C7.48321 22 8.38275 22 10.1818 22H10.1832C10.7172 22 11.2059 22 11.6555 21.9978C13.9262 21.8711 14.4675 18.9333 14.4508 17.4483C14.4099 15.8053 15.2005 15.5021 15.502 15.5021Z',
  d5: 'M7.00012 1C7.55241 1 8.00012 1.44772 8.00012 2V2.39864C8.74051 2.56884 9.40985 2.92409 9.95135 3.41399L10.4593 3.08741C10.9239 2.78874 11.5426 2.92323 11.8413 3.38779C12.14 3.85236 12.0055 4.47107 11.5409 4.76974L11.0767 5.06817C11.2426 5.51495 11.3335 5.99727 11.3335 6.5C11.3335 7.00281 11.2426 7.48521 11.0766 7.93205L11.5405 8.23026C12.005 8.52893 12.1395 9.14764 11.8409 9.61221C11.5422 10.0768 10.9235 10.2113 10.4589 9.91259L9.95117 9.58617C9.40971 10.076 8.74043 10.4312 8.00012 10.6014V11C8.00012 11.5523 7.55241 12 7.00012 12C6.44784 12 6.00012 11.5523 6.00012 11V10.6014C5.25981 10.4312 4.59054 10.076 4.04907 9.58617L3.54132 9.91259C3.07676 10.2113 2.45804 10.0768 2.15938 9.61221C1.86072 9.14764 1.99521 8.52893 2.45977 8.23026L2.92363 7.93205C2.75766 7.48521 2.66679 7.00281 2.66679 6.5C2.66679 5.99727 2.75763 5.51495 2.92355 5.06817L2.45934 4.76974C1.99478 4.47107 1.86029 3.85236 2.15896 3.38779C2.45762 2.92323 3.07634 2.78874 3.5409 3.08741L4.0489 3.41399C4.59039 2.92409 5.25973 2.56884 6.00012 2.39864V2C6.00012 1.44772 6.44784 1 7.00012 1ZM7.00012 4.28571C6.17526 4.28571 5.46153 4.68984 5.04834 5.28631C4.80569 5.63659 4.66679 6.05259 4.66679 6.5C4.66679 6.94747 4.80573 7.36351 5.04843 7.71382C5.46163 8.31022 6.17532 8.71428 7.00012 8.71428C7.82493 8.71428 8.53861 8.31022 8.95181 7.71382C9.19452 7.36351 9.33346 6.94747 9.33346 6.5C9.33346 6.05259 9.19455 5.6366 8.9519 5.28631C8.53871 4.68984 7.82499 4.28571 7.00012 4.28571Z',
  d6: 'M17.0635 1.35275C16.0812 1.24999 15.7935 1.24999 14.2524 1.25C13.7127 1.25 13.2751 1.68756 13.2751 2.22731C13.2751 2.76705 13.7127 3.20459 14.2524 3.20459C15.861 3.20459 15.9922 3.20584 16.8616 3.29679C17.7155 3.38612 18.1994 3.55288 18.5573 3.80592C18.7987 3.97667 19.0111 4.17776 19.1889 4.40211C19.4445 4.72461 19.6139 5.1574 19.7061 5.94419C19.8011 6.75395 19.8026 7.81128 19.8026 9.33473L19.8027 12.2349C19.8027 12.5019 19.8026 13.1405 19.522 13.6127C19.349 13.9036 19.1276 14.1467 18.9002 14.2706C18.5336 14.4701 18.1135 14.5835 17.6668 14.5835L16.6264 14.547C16.2463 14.5391 15.8028 14.5511 15.3746 14.6658C14.5407 14.8893 13.8893 15.5407 13.6658 16.3746C13.5511 16.8028 13.5391 17.2463 13.547 17.6264L13.5835 18.6668C13.5835 19.1345 13.4591 19.5416 13.2417 19.92C13.115 20.1406 12.8943 20.3425 12.5895 20.5198C12.1274 20.7887 11.574 20.7912 11.2358 20.7927C10.8977 20.7943 10.5409 20.7954 10.2428 20.7954C8.40872 20.7954 7.74159 20.7815 7.23823 20.6041C6.3656 20.2967 5.6999 19.655 5.38981 18.8697C5.31217 18.673 5.25733 18.4146 5.22789 17.9667C5.19788 17.51 5.19739 16.927 5.19739 16.0868V13.9737C5.19739 13.4359 4.76145 13 4.22369 13C3.68594 13 3.25 13.4359 3.25 13.9737V16.12C3.24999 16.9191 3.24999 17.5667 3.28473 18.0952C3.32052 18.6399 3.39613 19.1255 3.5794 19.5897C4.10821 20.929 5.21664 21.9633 6.5932 22.4483C7.452 22.7509 8.92408 22.7505 10.4791 22.7499C13.3187 22.7503 15.0054 22.7505 16.3878 22.2634C18.6078 21.4813 20.3815 19.8185 21.2249 17.6825C21.506 16.9705 21.6306 16.2058 21.6908 15.2889C21.75 14.3882 21.75 13.2756 21.75 11.8573V9.27382C21.75 7.82573 21.75 6.65308 21.6402 5.71575C21.526 4.74235 21.2828 3.90447 20.713 3.1854C20.4178 2.81292 20.0692 2.48414 19.6789 2.20809C18.9341 1.68143 18.0729 1.45834 17.0635 1.35275Z',
  d7: 'M7.5 10.2143V12M7.5 10.2143C6.34322 10.2143 5.32406 9.64608 4.72632 8.78331M7.5 10.2143C8.65678 10.2143 9.67594 9.64608 10.2737 8.78331M4.72632 8.78331L3 10M4.72632 8.78331C4.37279 8.27304 4.16667 7.65973 4.16667 7C4.16667 6.34035 4.37274 5.72711 4.72619 5.21688M10.2737 8.78331L12 10M10.2737 8.78331C10.6272 8.27304 10.8333 7.65973 10.8333 7C10.8333 6.34035 10.6273 5.72711 10.2738 5.21688M7.5 3.78571C8.65687 3.78571 9.67609 4.354 10.2738 5.21688M7.5 3.78571C6.34313 3.78571 5.32391 4.354 4.72619 5.21688M7.5 3.78571V2M10.2738 5.21688L12 4M4.72619 5.21688L3 4',
  d8: 'M14 2H20.99C20.9955 2 21 2.00448 21 2.01V15L14 22H4.01C4.00448 22 4 21.9955 4 21.99V13.9856M20.5527 15H14V21.4608',
  d9: 'M6.82617 2.14864C6.09873 2.31586 5.43987 2.66173 4.90347 3.13842L3.90235 2.43267L2.75 4.06733L3.76335 4.78169C3.58871 5.23865 3.49284 5.73355 3.49284 6.25C3.49284 6.76649 3.58872 7.26144 3.7634 7.71844L2.75009 8.43261L3.90226 10.0674L4.90358 9.36167C5.43996 9.83832 6.09878 10.1841 6.82617 10.3514V11.25H8.82617V10.3514C9.55357 10.1841 10.2124 9.83832 10.7488 9.36167L11.7501 10.0674L12.9023 8.43261L11.8889 7.71844C12.0636 7.26144 12.1595 6.76649 12.1595 6.25C12.1595 5.73355 12.0636 5.23865 11.889 4.78169L12.9023 4.06733L11.75 2.43267L10.7489 3.13842C10.2125 2.66173 9.55362 2.31586 8.82617 2.14864V1.25H6.82617V2.14864ZM7.82617 4.03571C7.00131 4.03571 6.28758 4.43984 5.87439 5.03631C5.63175 5.3866 5.49284 5.80259 5.49284 6.25C5.49284 6.69747 5.63178 7.11351 5.87448 7.46382C6.28769 8.06022 7.00137 8.46428 7.82617 8.46428C8.65098 8.46428 9.36466 8.06022 9.77787 7.46382C10.0206 7.11351 10.1595 6.69747 10.1595 6.25C10.1595 5.80259 10.0206 5.3866 9.77796 5.03631C9.36477 4.43984 8.65104 4.03571 7.82617 4.03571Z',
  d10: 'M2.75098 21.7727C2.75098 22.3125 3.18691 22.75 3.72466 22.75H13.8648L21.251 15.3366V2.22727C21.251 1.68754 20.815 1.25 20.2773 1.25H14.4879V3.2045H19.3037V13.9545H12.4879L12.4879 20.7954H4.69845V13H2.75098V21.7727Z',
};

export const IconFileManagementStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-stroke-rounded IconFileManagementStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFileManagementDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-duotone-rounded IconFileManagementDuotoneRounded"
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

export const IconFileManagementTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-twotone-rounded IconFileManagementTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFileManagementSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-solid-rounded IconFileManagementSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileManagementBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-bulk-rounded IconFileManagementBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileManagementStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-stroke-sharp IconFileManagementStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFileManagementSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-management-solid-sharp IconFileManagementSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfFileManagement: TheIconSelfPack = {
  name: 'FileManagement',
  StrokeRounded: IconFileManagementStrokeRounded,
  DuotoneRounded: IconFileManagementDuotoneRounded,
  TwotoneRounded: IconFileManagementTwotoneRounded,
  SolidRounded: IconFileManagementSolidRounded,
  BulkRounded: IconFileManagementBulkRounded,
  StrokeSharp: IconFileManagementStrokeSharp,
  SolidSharp: IconFileManagementSolidSharp,
};