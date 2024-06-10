import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.5563 13.2183C13.514 14.2606 11.8241 14.2606 10.7817 13.2183C9.73942 12.1759 9.73942 10.486 10.7817 9.44364L13.1409 7.0845C14.1357 6.08961 15.7206 6.04433 16.7692 6.94866M16.4437 3.78175C17.486 2.73942 19.1759 2.73942 20.2183 3.78175C21.2606 4.82408 21.2606 6.51403 20.2183 7.55636L17.8591 9.9155C16.8643 10.9104 15.2794 10.9557 14.2308 10.0513',
  d2: 'M21 13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3',
  d3: 'M3 9.3C3 6.33015 3 4.84523 4.31802 3.92261C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 3.92261C21 4.84523 21 6.33015 21 9.3V14.7C21 17.6698 21 19.1548 19.682 20.0774C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 20.0774C3 19.1548 3 17.6698 3 14.7V9.3Z',
  d4: 'M19.5111 4.48885C18.8593 3.83705 17.8026 3.83705 17.1508 4.48885C16.7603 4.87938 16.1271 4.87938 15.7366 4.48886C15.346 4.09833 15.346 3.46517 15.7366 3.07464C17.1694 1.64179 19.4925 1.64179 20.9254 3.07464C22.3582 4.5075 22.3582 6.83061 20.9254 8.26347L18.5662 10.6226C17.1983 11.9906 15.0199 12.0524 13.5777 10.8086C13.1594 10.4479 13.1128 9.81648 13.4735 9.39825C13.8342 8.98002 14.4656 8.93337 14.8839 9.29406C15.5388 9.85891 16.5302 9.83022 17.152 9.20839L19.5111 6.84926C20.163 6.19745 20.163 5.14066 19.5111 4.48885ZM16.1161 7.70594C15.4612 7.14109 14.4698 7.16978 13.848 7.79161L11.4889 10.1507C10.837 10.8025 10.837 11.8593 11.4889 12.5111C12.1407 13.163 13.1974 13.163 13.8492 12.5111C14.2397 12.1206 14.8729 12.1206 15.2634 12.5111C15.654 12.9017 15.654 13.5348 15.2634 13.9254C13.8306 15.3582 11.5075 15.3582 10.0746 13.9254C8.64179 12.4925 8.64179 10.1694 10.0746 8.73653L12.4338 6.3774C13.8017 5.00944 15.9801 4.94757 17.4223 6.19138C17.8406 6.55207 17.8872 7.18352 17.5265 7.60175C17.1658 8.01998 16.5344 8.06663 16.1161 7.70594Z',
  d5: 'M10.9537 2.25L11.025 2.25C11.5635 2.25 12 2.68652 12 3.225C12 3.76348 11.5635 4.2 11.025 4.2C9.15896 4.2 7.85751 4.20207 6.87556 4.33409C5.92165 4.46234 5.41651 4.69692 5.05671 5.05671C4.69692 5.41651 4.46234 5.92165 4.33409 6.87556C4.20207 7.85751 4.2 9.15896 4.2 11.025V12.975C4.2 14.841 4.20207 16.1425 4.33409 17.1244C4.46234 18.0784 4.69692 18.5835 5.05671 18.9433C5.41651 19.3031 5.92165 19.5377 6.87556 19.6659C7.85751 19.7979 9.15896 19.8 11.025 19.8H12.975C14.841 19.8 16.1425 19.7979 17.1244 19.6659C18.0784 19.5377 18.5835 19.3031 18.9433 18.9433C19.3031 18.5835 19.5377 18.0784 19.6659 17.1244C19.7979 16.1425 19.8 14.841 19.8 12.975C19.8 12.4365 20.2365 12 20.775 12C21.3135 12 21.75 12.4365 21.75 12.975V13.0463C21.75 14.8242 21.75 16.2572 21.5985 17.3843C21.4412 18.5544 21.1046 19.5397 20.3221 20.3221C19.5397 21.1046 18.5544 21.4412 17.3843 21.5985C16.2572 21.75 14.8242 21.75 13.0463 21.75H10.9537C9.17581 21.75 7.74279 21.75 6.61572 21.5985C5.44558 21.4412 4.46035 21.1046 3.67786 20.3221C2.89536 19.5397 2.5588 18.5544 2.40148 17.3843C2.24995 16.2572 2.24997 14.8242 2.25 13.0463V10.9537C2.24997 9.1758 2.24995 7.74278 2.40148 6.61572C2.5588 5.44558 2.89536 4.46035 3.67786 3.67786C4.46035 2.89536 5.44558 2.5588 6.61572 2.40148C7.74278 2.24995 9.1758 2.24997 10.9537 2.25Z',
  d6: 'M11 3H3.00017L3 21H21V13',
  d7: 'M19.2611 4.73885C18.6093 4.08705 17.5526 4.08705 16.9008 4.73885L15.4866 3.32464C16.9194 1.89179 19.2425 1.89179 20.6754 3.32464C22.1082 4.7575 22.1082 7.08061 20.6754 8.51347L18.3162 10.8726C16.9483 12.2406 14.7699 12.3024 13.3277 11.0586L14.6339 9.54406C15.2888 10.1089 16.2802 10.0802 16.902 9.45839L19.2611 7.09926C19.913 6.44745 19.913 5.39066 19.2611 4.73885ZM15.8661 7.95594C15.2112 7.39109 14.2198 7.41978 13.598 8.04161L11.2389 10.4007C10.587 11.0525 10.587 12.1093 11.2389 12.7611C11.8907 13.413 12.9474 13.413 13.5992 12.7611L15.0134 14.1754C13.5806 15.6082 11.2575 15.6082 9.82463 14.1754C8.39179 12.7425 8.39179 10.4194 9.82463 8.98653L12.1838 6.6274C13.5517 5.25944 15.7301 5.19757 17.1723 6.44138L15.8661 7.95594Z',
  d8: 'M2.25017 3.22499C2.25018 2.68652 2.6867 2.25 3.22517 2.25H11.025V4.2H4.20016L4.20001 19.8H19.8V12.975H21.75V20.775C21.75 21.3135 21.3135 21.75 20.775 21.75H3.225C2.96641 21.75 2.71842 21.6473 2.53557 21.4644C2.35272 21.2816 2.25 21.0336 2.25 20.775L2.25017 3.22499Z',
};

export const IconCopyLinkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-stroke-rounded IconCopyLinkStrokeRounded"
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

export const IconCopyLinkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-duotone-rounded IconCopyLinkDuotoneRounded"
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

export const IconCopyLinkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-twotone-rounded IconCopyLinkTwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCopyLinkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-solid-rounded IconCopyLinkSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCopyLinkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-bulk-rounded IconCopyLinkBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCopyLinkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-stroke-sharp IconCopyLinkStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCopyLinkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copy-link-solid-sharp IconCopyLinkSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCopyLink: TheIconSelfPack = {
  name: 'CopyLink',
  StrokeRounded: IconCopyLinkStrokeRounded,
  DuotoneRounded: IconCopyLinkDuotoneRounded,
  TwotoneRounded: IconCopyLinkTwotoneRounded,
  SolidRounded: IconCopyLinkSolidRounded,
  BulkRounded: IconCopyLinkBulkRounded,
  StrokeSharp: IconCopyLinkStrokeSharp,
  SolidSharp: IconCopyLinkSolidSharp,
};