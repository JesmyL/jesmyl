import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.97487 7.97487C9.60825 7.3415 10 6.4665 10 5.5C10 3.567 8.433 2 6.5 2C5.5335 2 4.6585 2.39175 4.02513 3.02513M8.97487 7.97487C8.3415 8.60825 7.4665 9 6.5 9C4.567 9 3 7.433 3 5.5C3 4.5335 3.39175 3.6585 4.02513 3.02513M8.97487 7.97487L4.02513 3.02513',
  d2: 'M12.5 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V11.8182',
  d3: 'M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22',
  d4: 'M8.97487 7.97487C9.60825 7.3415 10 6.4665 10 5.5C10 3.81611 8.81085 2.40996 7.22651 2.0755C7.61155 2 8.07619 2 9 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29753 20.1523 3.60289C21 4.66867 21 6.20335 21 9.27271V11.8199C21 12.2462 21 12.6419 20.9986 13.0104C20.6582 13.8464 19.09 15.5021 15.502 15.5021C15.2005 15.5021 14.4099 15.8053 14.4508 17.4483C14.4675 18.9333 13.9262 21.8711 11.6555 21.9978C11.2059 22 10.7172 22 10.1832 22H10.1818C8.38275 22 7.48321 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V7.94949C4.63526 8.59777 5.52066 9 6.5 9C7.4665 9 8.3415 8.60825 8.97487 7.97487Z',
  d5: 'M17.1885 1.47775C16.2062 1.37499 14.9185 1.37499 13.3774 1.375C12.8377 1.375 12.4001 1.81256 12.4001 2.35231C12.4001 2.89205 12.8377 3.32959 13.3774 3.32959C14.986 3.32959 16.1172 3.33084 16.9866 3.42179C17.8405 3.51112 18.3244 3.67788 18.6823 3.93092C18.9237 4.10167 19.1361 4.30276 19.3139 4.52711C19.5695 4.84961 19.7389 5.2824 19.8311 6.06919C19.9261 6.87895 19.9276 7.93628 19.9276 9.45973L19.9277 12.3599C19.9277 12.6269 19.9276 13.2655 19.647 13.7377C19.474 14.0286 19.2526 14.2717 19.0252 14.3956C18.6586 14.5951 18.2385 14.7085 17.7918 14.7085L16.7514 14.672C16.3713 14.6641 15.9278 14.6761 15.4996 14.7908C14.6657 15.0143 14.0143 15.6657 13.7908 16.4996C13.6761 16.9278 13.6641 17.3713 13.672 17.7514L13.7085 18.7918C13.7085 19.2595 13.5841 19.6666 13.3667 20.045C13.24 20.2656 13.0193 20.4675 12.7145 20.6448C12.2524 20.9137 11.699 20.9162 11.3608 20.9177C11.0227 20.9193 10.6659 20.9204 10.3678 20.9204C8.53372 20.9204 7.86659 20.9065 7.36323 20.7291C6.4906 20.4217 5.8249 19.78 5.51481 18.9947C5.43717 18.798 5.38233 18.5396 5.35289 18.0917C5.32288 17.635 5.32239 17.052 5.32239 16.2118V13.0987C5.32239 12.5609 4.88645 12.125 4.34869 12.125C3.81094 12.125 3.375 12.5609 3.375 13.0987V16.245C3.37499 17.0441 3.37499 17.6917 3.40973 18.2202C3.44552 18.7649 3.52113 19.2505 3.7044 19.7147C4.23321 21.054 5.34164 22.0883 6.7182 22.5733C7.577 22.8759 9.04908 22.8755 10.6041 22.8749C13.4437 22.8753 15.1304 22.8755 16.5128 22.3884C18.7328 21.6063 20.5065 19.9435 21.3499 17.8075C21.631 17.0955 21.7556 16.3308 21.8158 15.4139C21.875 14.5132 21.875 13.4006 21.875 11.9823V9.39882C21.875 7.95073 21.875 6.77808 21.7652 5.84075C21.651 4.86735 21.4078 4.02947 20.838 3.3104C20.5428 2.93792 20.1942 2.60914 19.8039 2.33309C19.0591 1.80643 18.1979 1.58334 17.1885 1.47775Z',
  d6: 'M5.71121 3.29699L8.95301 6.53879C9.06413 6.25584 9.125 5.94774 9.125 5.625C9.125 4.24429 8.00571 3.125 6.625 3.125C6.30226 3.125 5.99416 3.18587 5.71121 3.29699ZM7.53879 7.95301L4.29699 4.71121C4.18587 4.99416 4.125 5.30226 4.125 5.625C4.125 7.00571 5.24429 8.125 6.625 8.125C6.94774 8.125 7.25584 8.06413 7.53879 7.95301ZM3.44302 2.44302C4.25626 1.62977 5.38264 1.125 6.625 1.125C9.11028 1.125 11.125 3.13972 11.125 5.625C11.125 6.86736 10.6202 7.99374 9.80698 8.80698C8.99374 9.62022 7.86736 10.125 6.625 10.125C4.13972 10.125 2.125 8.11028 2.125 5.625C2.125 4.38264 2.62977 3.25626 3.44302 2.44302Z',
  d7: 'M12.0156 2H20.99C20.9955 2 21 2.00448 21 2.01V15L14 22H4.01C4.00448 22 4 21.9955 4 21.99V11.0122M20.5192 15H14V21.4862',
  d8: 'M6.13697 3.30133L9.19867 6.36303C9.30363 6.0958 9.36111 5.80481 9.36111 5.5C9.36111 4.19599 8.30401 3.13889 7 3.13889C6.69519 3.13889 6.4042 3.19637 6.13697 3.30133ZM7.86303 7.69867L4.80133 4.63697C4.69637 4.9042 4.63889 5.19519 4.63889 5.5C4.63889 6.80401 5.69599 7.86111 7 7.86111C7.30481 7.86111 7.5958 7.80363 7.86303 7.69867ZM3.9948 2.4948C4.76286 1.72673 5.82666 1.25 7 1.25C9.34721 1.25 11.25 3.15279 11.25 5.5C11.25 6.67334 10.7733 7.73714 10.0052 8.5052C9.23714 9.27327 8.17334 9.75 7 9.75C4.65279 9.75 2.75 7.84721 2.75 5.5C2.75 4.32666 3.22673 3.26286 3.9948 2.4948Z',
  d9: 'M2.75 21.7727C2.75 22.3125 3.18593 22.75 3.72368 22.75H13.8638L21.25 15.3366V2.22727C21.25 1.68754 20.8141 1.25 20.2763 1.25H12.4869V3.2045H19.3027V13.9545H12.4869L12.4869 20.7954H4.69747V11H2.75V21.7727Z',
};

export const IconFileBlockStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-stroke-rounded IconFileBlockStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconFileBlockDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-duotone-rounded IconFileBlockDuotoneRounded"
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

export const IconFileBlockTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-twotone-rounded IconFileBlockTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconFileBlockSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-solid-rounded IconFileBlockSolidRounded"
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

export const IconFileBlockBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-bulk-rounded IconFileBlockBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconFileBlockStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-stroke-sharp IconFileBlockStrokeSharp"
    >
      <path 
        d={d.d1} 
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

export const IconFileBlockSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="file-block-solid-sharp IconFileBlockSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfFileBlock: TheIconSelfPack = {
  name: 'FileBlock',
  StrokeRounded: IconFileBlockStrokeRounded,
  DuotoneRounded: IconFileBlockDuotoneRounded,
  TwotoneRounded: IconFileBlockTwotoneRounded,
  SolidRounded: IconFileBlockSolidRounded,
  BulkRounded: IconFileBlockBulkRounded,
  StrokeSharp: IconFileBlockStrokeSharp,
  SolidSharp: IconFileBlockSolidSharp,
};