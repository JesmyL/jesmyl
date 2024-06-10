import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.00098 6.5H16.751C18.8577 6.5 19.911 6.5 20.6677 7.00559C20.9953 7.22447 21.2765 7.50572 21.4954 7.83329C21.9371 8.4943 21.9929 9.38174 22 11M12.001 6.5L11.3676 5.23313C10.8428 4.18358 10.3632 3.12712 9.20024 2.69101C8.69088 2.5 8.109 2.5 6.94525 2.5C5.12878 2.5 4.22054 2.5 3.53904 2.88032C3.05325 3.15142 2.6524 3.55227 2.3813 4.03806C2.00098 4.71956 2.00098 5.6278 2.00098 7.44427V10.5C2.00098 15.214 2.00098 17.5711 3.46545 19.0355C4.76558 20.3357 6.76918 20.4816 10.501 20.4979H11.001',
  d2: 'M20.8615 13.9393L21.5557 14.6317C22.1432 15.2175 22.1432 16.1672 21.5557 16.753L17.9183 20.4487C17.6321 20.734 17.2661 20.9264 16.8683 21.0005L14.6139 21.4885C14.258 21.5656 13.941 21.2504 14.0173 20.8952L14.4972 18.6599C14.5714 18.2632 14.7643 17.8982 15.0505 17.6129L18.7342 13.9393C19.3217 13.3536 20.274 13.3536 20.8615 13.9393Z',
  d3: 'M13.251 20.5H12.001C7.28693 20.5 4.92991 20.5 3.46545 19.0355C2.00098 17.5711 2.00098 15.214 2.00098 10.5V7.44427C2.00098 5.6278 2.00098 4.71956 2.3813 4.03806C2.6524 3.55227 3.05325 3.15142 3.53904 2.88032C4.22054 2.5 5.12878 2.5 6.94525 2.5C8.109 2.5 8.69088 2.5 9.20024 2.69101C10.3089 3.10673 10.7965 4.08617 11.2942 5.08597C11.3186 5.13499 11.343 5.18407 11.3676 5.23313L12.001 6.5H16.751C18.8577 6.5 19.911 6.5 20.6677 7.00559C20.9953 7.22447 21.2765 7.50572 21.4954 7.83329C22.001 8.58996 22.001 9.64331 22.001 11.75C22.001 13.2111 22.001 14.3682 21.9403 15.3121C21.9066 15.1966 21.8589 15.0841 21.7973 14.9773C21.6971 14.8039 21.5305 14.6372 21.1971 14.3039C20.8638 13.9705 20.6971 13.8039 20.5237 13.7037C20.0532 13.4321 19.4735 13.4321 19.0029 13.7037C18.8295 13.8039 18.6629 13.9705 18.3295 14.3038L15.0217 17.6117C14.4982 18.1352 14.3725 18.8698 14.2491 19.5912C14.2167 19.7805 14.1845 19.9689 14.1453 20.1523C14.1181 20.2793 14.0935 20.3947 14.0725 20.4995C13.8098 20.5 13.5362 20.5 13.251 20.5Z',
  d4: 'M20.8688 13.9393L21.5611 14.6317C22.1469 15.2175 22.1469 16.1672 21.5611 16.753L17.9337 20.4487C17.6484 20.734 17.2834 20.9264 16.8867 21.0005L14.6386 21.4885C14.2836 21.5656 13.9675 21.2504 14.0436 20.8953L14.5221 18.6599C14.5962 18.2632 14.7885 17.8982 15.0739 17.6129L18.7475 13.9393C19.3332 13.3536 20.283 13.3536 20.8688 13.9393Z',
  d5: 'M18.6269 13.0542C19.3294 12.6486 20.1951 12.6486 20.8976 13.0542C21.1592 13.2053 21.4533 13.4999 21.7264 13.7735C22.0001 14.0467 22.2947 14.3407 22.4457 14.6023C22.8513 15.3049 22.8513 16.1705 22.4457 16.8731C22.2947 17.1347 22.0599 17.3689 21.7862 17.6421L18.4185 21.0097C17.9532 21.475 17.3913 21.6924 16.8865 21.8213C16.6345 21.8856 16.3813 21.9315 16.1516 21.9712C15.8456 22.0367 14.8479 22.2297 14.5947 22.2458C14.3157 22.2636 13.9113 22.2362 13.5875 21.9124C13.2637 21.5887 13.2364 21.1842 13.2541 20.9052C13.2702 20.652 13.4632 19.6543 13.5288 19.3483C13.5684 19.1186 13.6143 18.8654 13.6786 18.6134C13.8075 18.1086 14.025 17.5467 14.4903 17.0814L17.8579 13.7137C18.131 13.44 18.3653 13.2053 18.6269 13.0542Z',
  d6: 'M9.4626 1.98884C8.82373 1.74927 8.11205 1.74958 7.08264 1.75004C6.2039 1.75003 5.32205 1.75006 4.7497 1.80052C4.15996 1.8525 3.64388 1.96246 3.17258 2.22548C2.56533 2.56435 2.06428 3.06541 1.7254 3.67266C1.46238 4.14396 1.35242 4.66004 1.30044 5.24978C1.24998 5.82212 1.24999 6.53085 1.25 7.40958V10.5575C1.24999 12.8658 1.24998 14.6749 1.43975 16.0864C1.63399 17.5311 2.03933 18.6711 2.93414 19.5659C3.82895 20.4608 4.96897 20.8661 6.41371 21.0603C7.67097 21.2294 9.24365 21.2478 11.2037 21.2498C11.466 21.2501 11.5972 21.2502 11.6832 21.1718C11.7692 21.0934 11.7813 20.9618 11.8054 20.6985C11.8342 20.3836 11.8705 20.0232 11.8973 19.8766C11.9542 19.5658 12.0176 19.2441 12.0554 19.0646C12.0952 18.8352 12.1482 18.5436 12.2251 18.2425C12.3859 17.6126 12.6944 16.756 13.4295 16.0209L16.841 12.609C17.0768 12.3719 17.4379 12.0087 17.8767 11.7553C19.0434 11.0817 20.4808 11.0817 21.6475 11.7553C21.8051 11.8463 21.9611 11.9584 22.1072 12.0756C22.2282 12.1727 22.2888 12.2213 22.3194 12.2361C22.5027 12.3248 22.6968 12.2317 22.7424 12.0331C22.75 12 22.75 11.9308 22.75 11.7923C22.75 10.7733 22.75 9.86889 22.683 9.20956C22.6137 8.529 22.4669 7.9388 22.118 7.41669C21.8444 7.00723 21.4929 6.65566 21.0834 6.38207C20.5613 6.03321 19.9711 5.88636 19.2905 5.81713C18.6312 5.75006 17.8095 5.75007 16.7905 5.75008L13.2361 5.75008C12.92 5.75008 12.7396 5.74915 12.6064 5.73539C12.5044 5.72825 12.4348 5.65263 12.4128 5.61571C12.3409 5.50277 12.0838 4.98916 11.9425 4.70644C11.4704 3.75129 10.8581 2.51213 9.4626 1.98884Z',
  d7: 'M6.98737 6.5021H11.9999M11.9999 6.5021H21.9929C21.9984 6.5021 22.0029 6.50658 22.0029 6.5121V11.0311M11.9999 6.5021L8.99624 2.50195H2.01011C2.00458 2.50195 2.0001 2.50643 2.0001 2.51196L2.00054 20.4588C2.00054 20.4643 1.99497 20.507 2.00048 20.507H11.0392',
  d8: 'M16.497 21.5023H13.9902V19.0298L19.4863 13.5156C19.4902 13.5117 19.4965 13.5117 19.5004 13.5156L21.9991 16.0151C22.003 16.019 22.003 16.0254 21.9991 16.0293L16.497 21.5023Z',
  d9: 'M16.6979 22.25H13.25V18.8021L19.3021 12.75L22.7499 16.1979L16.6979 22.25Z',
  d10: 'M2 1.75C1.80109 1.75 1.61032 1.82902 1.46967 1.96967C1.32902 2.11032 1.25 2.30109 1.25 2.5V20.5C1.25 20.9142 1.58579 21.25 2 21.25H11.75V18.1808L19.3021 10.6287L22.75 14.0766V6.5C22.75 6.08579 22.4142 5.75 22 5.75H12.375L9.375 1.75001L2 1.75Z',
};

export const IconFolderEditStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-stroke-rounded IconFolderEditStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconFolderEditDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-duotone-rounded IconFolderEditDuotoneRounded"
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

export const IconFolderEditTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-twotone-rounded IconFolderEditTwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderEditSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-solid-rounded IconFolderEditSolidRounded"
    >
      <path 
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

export const IconFolderEditBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-bulk-rounded IconFolderEditBulkRounded"
    >
      <path 
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

export const IconFolderEditStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-stroke-sharp IconFolderEditStrokeSharp"
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

export const IconFolderEditSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-edit-solid-sharp IconFolderEditSolidSharp"
    >
      <path 
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

export const iconPackOfFolderEdit: TheIconSelfPack = {
  name: 'FolderEdit',
  StrokeRounded: IconFolderEditStrokeRounded,
  DuotoneRounded: IconFolderEditDuotoneRounded,
  TwotoneRounded: IconFolderEditTwotoneRounded,
  SolidRounded: IconFolderEditSolidRounded,
  BulkRounded: IconFolderEditBulkRounded,
  StrokeSharp: IconFolderEditStrokeSharp,
  SolidSharp: IconFolderEditSolidSharp,
};