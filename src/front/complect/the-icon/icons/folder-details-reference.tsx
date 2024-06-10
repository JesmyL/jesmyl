import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C22 8.58996 22 9.89331 22 12M12 6.5L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 14.6788 2 17.0054 3.0201 18.5',
  d2: 'M6.65709 15.5694L8.71949 15.5141C9.81727 15.4847 10.3662 15.47 10.6981 15.8019C11.03 16.1338 11.0153 16.6827 10.9859 17.7805L10.9306 19.8429M10.6359 15.8641L5 21.5',
  d3: 'M22 15.5L15 15.5M22 18.5H15M18.5 21.5H15',
  d4: 'M12 20.5H13.25C16.7612 20.5 18.5167 20.5 19.7779 19.6573C20.3238 19.2926 20.7926 18.8238 21.1573 18.2779C22 17.0167 22 15.2612 22 11.75C22 9.64331 22 8.58996 21.4944 7.83329C21.2755 7.50572 20.9943 7.22447 20.6667 7.00559C19.91 6.5 18.8567 6.5 16.75 6.5H12L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 15.214 2 17.5711 3.46447 19.0355C4.92893 20.5 7.28595 20.5 12 20.5Z',
  d5: 'M11.8053 19.7447C11.7905 20.2968 11.331 20.7323 10.7789 20.7175C10.4879 20.7097 10.2292 20.5784 10.0518 20.375L8.67052 18.9937L5.58211 22.0821C5.19158 22.4726 4.55842 22.4726 4.16789 22.0821C3.77737 21.6916 3.77737 21.0584 4.16789 20.6679L7.25631 17.5795L5.875 16.1982C5.67162 16.0208 5.54024 15.7621 5.53245 15.4711C5.51766 14.919 5.95323 14.4595 6.50532 14.4447L8.6257 14.3879C9.12436 14.3745 9.5944 14.3618 9.97841 14.4033C10.4036 14.4493 10.8855 14.5752 11.2802 14.9698C11.6748 15.3645 11.8007 15.8464 11.8467 16.2716C11.8882 16.6556 11.8755 17.1256 11.8621 17.6243L11.8053 19.7447Z',
  d6: 'M13.875 15.375C13.875 14.8227 14.3227 14.375 14.875 14.375L21.875 14.375C22.4273 14.375 22.875 14.8227 22.875 15.375C22.875 15.9273 22.4273 16.375 21.875 16.375L14.875 16.375C14.3227 16.375 13.875 15.9273 13.875 15.375ZM13.875 18.375C13.875 17.8227 14.3227 17.375 14.875 17.375H21.875C22.4273 17.375 22.875 17.8227 22.875 18.375C22.875 18.9273 22.4273 19.375 21.875 19.375H14.875C14.3227 19.375 13.875 18.9273 13.875 18.375ZM13.875 21.375C13.875 20.8227 14.3227 20.375 14.875 20.375H18.375C18.9273 20.375 19.375 20.8227 19.375 21.375C19.375 21.9273 18.9273 22.375 18.375 22.375H14.875C14.3227 22.375 13.875 21.9273 13.875 21.375Z',
  d7: 'M6.95764 1.62504C7.98705 1.62458 8.69873 1.62427 9.3376 1.86384C10.7331 2.38713 11.3454 3.62629 11.8175 4.58144C11.9588 4.86416 12.2159 5.37777 12.2878 5.49071C12.3098 5.52763 12.3794 5.60325 12.4814 5.61039C12.6146 5.62415 12.795 5.62508 13.1111 5.62508L16.6655 5.62508C17.6845 5.62507 18.5062 5.62506 19.1655 5.69213C19.8461 5.76136 20.4363 5.90821 20.9584 6.25707C21.3679 6.53066 21.7194 6.88223 21.993 7.29169C22.3419 7.8138 22.4887 8.404 22.558 9.08456C22.625 9.74389 22.625 10.6483 22.625 11.6673V11.6734C22.625 11.8802 22.625 12.0816 22.6248 12.2778C22.6245 12.559 22.6244 12.6996 22.5365 12.7874C22.4487 12.8752 22.3078 12.8752 22.0259 12.8752H14.875C14.0522 12.8752 13.3222 13.2727 12.8666 13.8862C12.7503 14.0428 12.4788 14.0473 12.3408 13.9093C11.6024 13.1709 10.727 12.9756 10.1396 12.9122L6.48744 12.945L6.46516 12.9454C5.08495 12.9824 3.99602 14.1312 4.03299 15.5114C4.05187 16.2164 4.36264 16.8469 4.84234 17.287C4.9174 17.362 4.95494 17.3996 4.97605 17.4395C5.02245 17.5272 5.02249 17.6322 4.97615 17.7199C4.95507 17.7598 4.91755 17.7974 4.84255 17.8725L3.40067 19.3165C3.22873 19.4887 3.14276 19.5748 3.02076 19.5764C2.89876 19.5781 2.82121 19.5045 2.6661 19.3574C1.79063 18.5271 1.48596 17.2348 1.31475 15.9614C1.12498 14.5499 1.12499 12.7408 1.125 10.4325V7.28457C1.12499 6.40584 1.12499 5.69712 1.17544 5.12478C1.22742 4.53504 1.33738 4.01896 1.6004 3.54766C1.93928 2.94041 2.44033 2.43935 3.04758 2.10048C3.51888 1.83746 4.03496 1.7275 4.6247 1.67552C5.19705 1.62506 6.0789 1.62503 6.95764 1.62504Z',
  d8: 'M11 20V15.5081H6.5M5 21.5117L10.5497 15.9586',
  d9: 'M22 15.5081H15M22 18.5099H15M18.5 21.5117H15',
  d10: 'M6.98727 6.51421H11.9998M11.9998 6.51421H21.9928C21.9984 6.51421 22.0028 6.51869 22.0028 6.52422V12.0057M11.9998 6.51421L8.99614 2.51367H2.01001C2.00448 2.51367 2 2.51815 2 2.52368L2.00043 20.0089',
  d11: 'M2 1.75C1.80109 1.75 1.61032 1.82902 1.46967 1.96967C1.32902 2.11032 1.25 2.30109 1.25 2.5V20.2148L3.7503 17.7145V12.75L22.75 12.75V6.5C22.75 6.08579 22.4142 5.75 22 5.75H12.375L9.375 1.75001L2 1.75Z',
  d12: 'M5.25008 14.25H10.7501V20.25H8.75008V17.6642L4.45719 21.9571L3.04297 20.5429L7.33588 16.25H5.25008V14.25Z',
  d13: 'M13.7501 14.25L20.7501 14.25V16.25L13.7501 16.25V14.25ZM13.7501 17.25H20.7501V19.25H13.7501V17.25ZM13.7501 20.25H17.2501V22.25H13.7501V20.25Z',
};

export const IconFolderDetailsReferenceStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-stroke-rounded IconFolderDetailsReferenceStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-duotone-rounded IconFolderDetailsReferenceDuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-twotone-rounded IconFolderDetailsReferenceTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-solid-rounded IconFolderDetailsReferenceSolidRounded"
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
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-bulk-rounded IconFolderDetailsReferenceBulkRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-stroke-sharp IconFolderDetailsReferenceStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconFolderDetailsReferenceSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-details-reference-solid-sharp IconFolderDetailsReferenceSolidSharp"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFolderDetailsReference: TheIconSelfPack = {
  name: 'FolderDetailsReference',
  StrokeRounded: IconFolderDetailsReferenceStrokeRounded,
  DuotoneRounded: IconFolderDetailsReferenceDuotoneRounded,
  TwotoneRounded: IconFolderDetailsReferenceTwotoneRounded,
  SolidRounded: IconFolderDetailsReferenceSolidRounded,
  BulkRounded: IconFolderDetailsReferenceBulkRounded,
  StrokeSharp: IconFolderDetailsReferenceStrokeSharp,
  SolidSharp: IconFolderDetailsReferenceSolidSharp,
};