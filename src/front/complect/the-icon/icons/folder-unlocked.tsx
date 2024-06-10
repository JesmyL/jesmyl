import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.0088 20.5C7.29058 20.5 4.9315 20.5 3.46575 19.0355C2 17.5711 2 15.214 2 10.5V7.44427C2 5.6278 2 4.71956 2.38065 4.03806C2.65199 3.55227 3.05319 3.15142 3.53941 2.88032C4.22151 2.5 5.13054 2.5 6.9486 2.5C8.11337 2.5 8.69575 2.5 9.20556 2.69101C10.3695 3.12712 10.8495 4.18358 11.3748 5.23313L12.0088 6.5M7.00438 6.5H16.7629C18.8714 6.5 19.9257 6.5 20.6831 7.00559C21.0109 7.22447 21.2924 7.50572 21.5115 7.83329C21.8526 8.34341 21.9638 8.98836 22 10',
  d2: 'M16.5312 15.86V14.4523C16.5312 13.3741 17.4127 12.5 18.5 12.5C18.9887 12.5 19.4359 12.6766 19.7801 12.969M17.8437 21.5H19.1563C20.1777 21.5 20.6884 21.5 21.0749 21.2951C21.3802 21.1333 21.6302 20.8854 21.7934 20.5827C22 20.1993 22 19.6929 22 18.68C22 17.6671 22 17.1607 21.7934 16.7773C21.6302 16.4746 21.3802 16.2267 21.0749 16.0649C20.6884 15.86 20.1777 15.86 19.1563 15.86H17.8437C16.8223 15.86 16.3116 15.86 15.9251 16.0649C15.6198 16.2267 15.3698 16.4746 15.2066 16.7773C15 17.1607 15 17.6671 15 18.68C15 19.6929 15 20.1993 15.2066 20.5827C15.3698 20.8854 15.6198 21.1333 15.9251 21.2951C16.3116 21.5 16.8223 21.5 17.8437 21.5Z',
  d3: 'M13.25 20.5H12C7.28595 20.5 4.92893 20.5 3.46447 19.0355C2 17.5711 2 15.214 2 10.5V7.44427C2 5.6278 2 4.71956 2.38032 4.03806C2.65142 3.55227 3.05227 3.15142 3.53806 2.88032C4.21956 2.5 5.1278 2.5 6.94427 2.5C8.10802 2.5 8.6899 2.5 9.19926 2.69101C10.3079 3.10673 10.7955 4.08617 11.2932 5.08597C11.3176 5.13499 11.342 5.18407 11.3666 5.23313L12 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C22 8.58996 22 9.64331 22 11.75C22 14.0394 22 15.5824 21.7664 16.7286C21.6033 16.4477 21.3639 16.2174 21.0749 16.0643C20.6884 15.8594 20.1777 15.8594 19.1562 15.8594H17.8438C16.8223 15.8594 16.3116 15.8594 15.9251 16.0643C15.6198 16.2261 15.3698 16.474 15.2066 16.7767C15 17.1601 15 17.6665 15 18.6794C15 19.616 15 20.1195 15.1634 20.4932C14.5896 20.5 13.9552 20.5 13.25 20.5Z',
  d4: 'M15.7813 14.4523C15.7813 12.954 17.0044 11.75 18.5 11.75C19.1725 11.75 19.7904 11.9937 20.2656 12.3973C20.5813 12.6655 20.6198 13.1388 20.3517 13.4545C20.0835 13.7702 19.6102 13.8087 19.2945 13.5406C19.0813 13.3595 18.8049 13.25 18.5 13.25C17.821 13.25 17.2813 13.7942 17.2813 14.4523V15.1116L19.1871 15.11C19.6715 15.11 20.0813 15.1099 20.4167 15.1382C20.7683 15.1679 21.1063 15.2326 21.4262 15.4022C21.8618 15.6331 22.2197 15.9875 22.4536 16.4214C22.6257 16.7408 22.6914 17.0783 22.7214 17.4285C22.75 17.7619 22.75 18.2314 22.75 18.7112C22.75 19.191 22.75 19.5981 22.7214 19.9315C22.6914 20.2816 22.6257 20.6191 22.4536 20.9385C22.2197 21.3724 21.8618 21.7268 21.4262 21.9578C21.1063 22.1273 20.7683 22.1921 20.4167 22.2217C20.0813 22.25 19.6715 22.25 19.1871 22.25H19.1871H17.8129H17.8129C17.3285 22.25 16.9187 22.25 16.5833 22.2217C16.2317 22.1921 15.8937 22.1273 15.5738 21.9578C15.1382 21.7268 14.7803 21.3724 14.5464 20.9385C14.3743 20.6191 14.3086 20.2816 14.2786 19.9315C14.25 19.5981 14.25 19.191 14.25 18.7112V18.7112C14.25 18.2313 14.25 17.7619 14.2786 17.4285C14.3086 17.0783 14.3743 16.7408 14.5464 16.4214C14.7803 15.9875 15.1382 15.6331 15.5738 15.4022C15.6421 15.366 15.7113 15.3346 15.7813 15.3072V14.4523Z',
  d5: 'M9.4626 1.98908C8.82373 1.74951 8.11205 1.74983 7.08264 1.75028C6.2039 1.75027 5.32205 1.75031 4.7497 1.80076C4.15996 1.85275 3.64388 1.96271 3.17258 2.22572C2.56533 2.5646 2.06428 3.06566 1.7254 3.6729C1.46238 4.14421 1.35242 4.66028 1.30044 5.25002C1.24998 5.82237 1.24999 6.53109 1.25 7.40983V10.5577C1.24999 12.8661 1.24998 14.6751 1.43975 16.0866C1.63399 17.5314 2.03933 18.6714 2.93414 19.5662C3.82895 20.461 4.96897 20.8663 6.41371 21.0606C7.82519 21.2503 9.63423 21.2503 11.9426 21.2503H12.1683C12.5493 21.2503 12.7398 21.2503 12.8296 21.1461C12.9193 21.0419 12.8876 20.8299 12.8241 20.4059C12.806 20.2846 12.7934 20.1688 12.7841 20.0599C12.7499 19.6616 12.75 19.1994 12.75 18.7555C12.75 18.3118 12.7499 17.6991 12.7841 17.3005C12.8225 16.852 12.9163 16.2845 13.226 15.71C13.4423 15.3087 13.7244 14.9454 14.0578 14.6413C14.1696 14.5394 14.2255 14.4885 14.2507 14.4363C14.2759 14.3842 14.281 14.3094 14.2913 14.1599C14.4425 11.9595 16.2861 10.2502 18.5 10.2502C19.5403 10.2502 20.4997 10.6283 21.2367 11.2543C21.9348 11.8473 22.1811 12.7747 21.9403 13.6006C21.9136 13.6921 21.9002 13.7379 21.8972 13.7604C21.8812 13.8799 21.9083 13.9505 22.0002 14.0286C22.0175 14.0433 22.0454 14.0606 22.1013 14.0952C22.2424 14.1824 22.313 14.2261 22.3481 14.2373C22.521 14.2925 22.6829 14.2037 22.7294 14.0283C22.7388 13.9926 22.7397 13.9269 22.7416 13.7955C22.75 13.1903 22.75 12.5251 22.75 11.7926C22.75 10.7736 22.75 9.86913 22.683 9.20981C22.6137 8.52925 22.4669 7.93904 22.118 7.41693C21.8444 7.00747 21.4929 6.65591 21.0834 6.38231C20.5613 6.03345 19.9711 5.8866 19.2905 5.81737C18.6312 5.7503 17.8095 5.75031 16.7905 5.75032L13.2361 5.75032C12.92 5.75032 12.7396 5.7494 12.6064 5.73563C12.5044 5.72849 12.4348 5.65287 12.4128 5.61595C12.3409 5.50302 12.0838 4.98941 11.9425 4.70668C11.4704 3.75154 10.8581 2.51237 9.4626 1.98908Z',
  d6: 'M16.4977 16V14.5C16.4977 13.3955 17.3935 12.5 18.4986 12.5C19.0962 12.5 19.6326 12.7619 19.9993 13.1771M14.9971 16H22.0001V21.5H14.9971V16Z',
  d7: 'M12.0133 20.4987H2.09907C2.04381 20.4987 1.99902 20.454 1.99902 20.3987L1.99913 2.60139C1.99914 2.54616 2.04392 2.50139 2.09917 2.50139L8.97257 2.50098L12.0133 6.48288M12.0133 6.48288H6.98668M12.0133 6.48288H21.8998C21.9551 6.48288 21.9999 6.52765 21.9999 6.58288V10.5718',
  d8: 'M15.75 14.5002C15.75 12.9815 16.9812 11.7502 18.5 11.7502C19.3215 11.7502 20.0595 12.1114 20.5623 12.681L19.4377 13.6736C19.2076 13.4129 18.8732 13.2502 18.5 13.2502C17.8096 13.2502 17.25 13.8099 17.25 14.5002V15.2502H22.75V22.2502H14.25V15.2502H15.75V14.5002Z',
  d9: 'M2 1.75C1.80109 1.75 1.61032 1.82902 1.46967 1.96967C1.32902 2.11032 1.25 2.30109 1.25 2.5V20.5C1.25 20.9142 1.58579 21.25 2 21.25H12.75V13.7502H14.316C14.6702 11.7607 16.4087 10.2502 18.5 10.2502C19.77 10.2502 20.9117 10.8101 21.6869 11.6884L22.75 12.813V6.5C22.75 6.08579 22.4142 5.75 22 5.75H12.375L9.375 1.75001L2 1.75Z',
};

export const IconFolderUnlockedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-stroke-rounded IconFolderUnlockedStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFolderUnlockedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-duotone-rounded IconFolderUnlockedDuotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderUnlockedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-twotone-rounded IconFolderUnlockedTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFolderUnlockedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-solid-rounded IconFolderUnlockedSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderUnlockedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-bulk-rounded IconFolderUnlockedBulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFolderUnlockedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-stroke-sharp IconFolderUnlockedStrokeSharp"
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

export const IconFolderUnlockedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="folder-unlocked-solid-sharp IconFolderUnlockedSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFolderUnlocked: TheIconSelfPack = {
  name: 'FolderUnlocked',
  StrokeRounded: IconFolderUnlockedStrokeRounded,
  DuotoneRounded: IconFolderUnlockedDuotoneRounded,
  TwotoneRounded: IconFolderUnlockedTwotoneRounded,
  SolidRounded: IconFolderUnlockedSolidRounded,
  BulkRounded: IconFolderUnlockedBulkRounded,
  StrokeSharp: IconFolderUnlockedStrokeSharp,
  SolidSharp: IconFolderUnlockedSolidSharp,
};