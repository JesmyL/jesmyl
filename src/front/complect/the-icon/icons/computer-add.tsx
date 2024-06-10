import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.5046 2H10.0039C6.72304 2 5.08264 2 3.91983 2.81382C3.48962 3.1149 3.11544 3.48891 2.81421 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81421 16.0811C3.11544 16.5111 3.48962 16.8851 3.91983 17.1862C5.08264 18 6.72304 18 10.0039 18H14.0058C17.2866 18 18.927 18 20.0898 17.1862C20.52 16.8851 20.8942 16.5111 21.1954 16.0811C21.8241 15.1837 21.9674 14.0017 22 12',
  d2: 'M14 6H18M18 6L22 6M18 6L18 2M18 6V10',
  d3: 'M11 15H13',
  d4: 'M12 18V22',
  d5: 'M8 22H16',
  d6: 'M14 2H10C6.72077 2 5.08116 2 3.91891 2.81382C3.48891 3.1149 3.1149 3.48891 2.81382 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81382 16.0811C3.1149 16.5111 3.48891 16.8851 3.91891 17.1862C5.08116 18 6.72077 18 10 18H14C17.2792 18 18.9188 18 20.0811 17.1862C20.5111 16.8851 20.8851 16.5111 21.1862 16.0811C22 14.9188 22 13.2792 22 10C22 6.72077 22 5.08116 21.1862 3.91891C20.8851 3.48891 20.5111 3.1149 20.0811 2.81382C18.9188 2 17.2792 2 14 2Z',
  d7: 'M18 1C18.5523 1 19 1.44772 19 2L19 5L22 5C22.5523 5 23 5.44772 23 6C23 6.55228 22.5523 7 22 7L19 7V10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10V7H14C13.4477 7 13 6.55229 13 6C13 5.44772 13.4477 5 14 5H17L17 2C17 1.44772 17.4477 1 18 1Z',
  d8: 'M10 14C10 13.4477 10.4477 13 11 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H11C10.4477 15 10 14.5523 10 14Z',
  d9: 'M11.5046 1C12.0569 1 12.5046 1.44772 12.5046 2C12.5046 2.55229 12.0569 3 11.5046 3H10.0039C8.34184 3 7.17336 3.0013 6.27237 3.09622C5.38915 3.18928 4.87884 3.36322 4.49322 3.6331C4.15857 3.86731 3.86752 4.15823 3.63323 4.49267C3.36332 4.87796 3.18934 5.38782 3.09626 6.27046C3.0013 7.17093 3 8.33875 3 10C3 11.6612 3.0013 12.8291 3.09626 13.7295C3.18934 14.6122 3.36332 15.122 3.63323 15.5073C3.86752 15.8418 4.15857 16.1327 4.49322 16.3669C4.87884 16.6368 5.38915 16.8107 6.27237 16.9038C7.17336 16.9987 8.34184 17 10.0039 17H14.0058C15.6678 17 16.8363 16.9987 17.7373 16.9038C18.6205 16.8107 19.1308 16.6368 19.5164 16.3669C19.8511 16.1327 20.1421 15.8418 20.3764 15.5073C20.8063 14.8936 20.967 14.0157 21.0001 11.9837C21.0091 11.4315 21.4641 10.9911 22.0163 11.0001C22.5685 11.0091 23.0089 11.4641 22.9999 12.0163C22.9677 13.9876 22.8419 15.4737 22.0144 16.6549C21.6463 17.1804 21.189 17.6375 20.6632 18.0055C19.886 18.5494 18.9947 18.7824 17.9468 18.8928C16.9288 19 15.6548 19 14.0625 19H13.4C13.0229 19 13 19.0229 13 19.4V20C13 20.8273 13.1727 21 14 21H16C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21H10C10.8273 21 11 20.8273 11 20V19.4C11 19.0229 10.9771 19 10.6 19H9.94717C8.35486 19 7.08088 19 6.06282 18.8928C5.01493 18.7824 4.12363 18.5494 3.34644 18.0055C2.82068 17.6375 2.36336 17.1804 1.99519 16.6549C1.45089 15.8779 1.21776 14.9868 1.10729 13.9393C0.999974 12.9217 0.999986 11.6482 1 10.0567V9.94325C0.999986 8.35178 0.999974 7.07835 1.10729 6.06071C1.21776 5.01317 1.45089 4.12211 1.99519 3.34514C2.36336 2.81959 2.82068 2.3625 3.34644 1.99453C4.12363 1.4506 5.01493 1.21763 6.06282 1.10723C7.08087 0.999974 8.35486 0.999986 9.94716 1H11.5046Z',
  d10: 'M22 11V18H2V3H12',
  d11: 'M14 6H18M18 6H22M18 6V2M18 6V10',
  d12: 'M10.5 15H13.5',
  d13: 'M12 18.0015V22.0001M12 22.0001H8M12 22.0001H16',
  d14: 'M17.75 4.25L17.75 1.25H19.75L19.75 4.25L22.75 4.25V6.25L19.75 6.25V9.25H17.75V6.25H14.75V4.25H17.75Z',
  d15: 'M13.5 15.25H10.5V13.25H13.5V15.25Z',
  d16: 'M2.22727 1.25C1.68754 1.25 1.25 1.68528 1.25 2.22222V17.7778C1.25 18.3147 1.68754 18.75 2.22727 18.75H9.25V20.75H7V22.75H17V20.75H14.75V18.75H21.7727C22.3125 18.75 22.75 18.3147 22.75 17.7778V11L20.7955 11V16.8056H3.20455V3.19444H13L13 1.25H2.22727Z',
};

export const IconComputerAddStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-stroke-rounded IconComputerAddStrokeRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComputerAddDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-duotone-rounded IconComputerAddDuotoneRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComputerAddTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-twotone-rounded IconComputerAddTwotoneRounded"
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
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconComputerAddSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-solid-rounded IconComputerAddSolidRounded"
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
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconComputerAddBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-bulk-rounded IconComputerAddBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconComputerAddStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-stroke-sharp IconComputerAddStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconComputerAddSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="computer-add-solid-sharp IconComputerAddSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfComputerAdd: TheIconSelfPack = {
  name: 'ComputerAdd',
  StrokeRounded: IconComputerAddStrokeRounded,
  DuotoneRounded: IconComputerAddDuotoneRounded,
  TwotoneRounded: IconComputerAddTwotoneRounded,
  SolidRounded: IconComputerAddSolidRounded,
  BulkRounded: IconComputerAddBulkRounded,
  StrokeSharp: IconComputerAddStrokeSharp,
  SolidSharp: IconComputerAddSolidSharp,
};