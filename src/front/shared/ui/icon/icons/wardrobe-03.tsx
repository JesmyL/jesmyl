import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 20V22M18 20V22',
  d2: 'M3 16H21',
  d3: 'M12 16V2',
  d4: 'M3 14V8C3 5.17157 3 3.75736 3.93037 2.87868C4.86073 2 6.35814 2 9.35294 2H14.6471C17.6419 2 19.1393 2 20.0696 2.87868C21 3.75736 21 5.17157 21 8V14C21 16.8284 21 18.2426 20.0696 19.1213C19.1393 20 17.6419 20 14.6471 20H9.35294C6.35814 20 4.86073 20 3.93037 19.1213C3 18.2426 3 16.8284 3 14Z',
  d5: 'M9 10V9',
  d6: 'M15 10V9',
  d7: 'M3 14V8C3 5.17157 3 3.75736 3.93037 2.87868C4.86073 2 6.35814 2 9.35294 2H14.6471C17.6419 2 19.1393 2 20.0696 2.87868C21 3.75736 21 5.17157 21 7.99998V8V14C21 14.7641 21 15.425 20.9817 16H3.01834C3 15.425 3 14.7641 3 14Z',
  d8: 'M3 16H21M12 16V2',
  d9: 'M6 18.875C6.55228 18.875 7 19.3227 7 19.875V21.875C7 22.4273 6.55228 22.875 6 22.875C5.44772 22.875 5 22.4273 5 21.875V19.875C5 19.3227 5.44772 18.875 6 18.875ZM18 18.875C18.5523 18.875 19 19.3227 19 19.875V21.875C19 22.4273 18.5523 22.875 18 22.875C17.4477 22.875 17 22.4273 17 21.875V19.875C17 19.3227 17.4477 18.875 18 18.875Z',
  d10: 'M11.25 1.725C11.25 1.44216 11.25 1.30074 11.1621 1.21287C11.0743 1.125 10.9328 1.125 10.65 1.125H9.35301C7.94929 1.12497 6.80293 1.12495 5.89799 1.23986C4.95628 1.35943 4.12925 1.61831 3.46266 2.24788C2.78819 2.88487 2.50341 3.68789 2.37313 4.60307C2.24993 5.46847 2.24996 6.56052 2.25 7.8779L2.25 13.8722C2.24996 15.1896 2.24993 16.2815 2.37313 17.1469C2.50341 18.0621 2.78819 18.8651 3.46266 19.5021C4.12925 20.1317 4.95628 20.3906 5.89799 20.5101C6.80293 20.6251 7.94925 20.625 9.35296 20.625H14.647C16.0507 20.625 17.1971 20.6251 18.102 20.5101C19.0437 20.3906 19.8708 20.1317 20.5374 19.5021C21.2118 18.8651 21.4966 18.0621 21.6269 17.1469C21.7501 16.2815 21.75 15.1896 21.75 13.8722V7.87787C21.75 6.56051 21.7501 5.46846 21.6269 4.60307C21.4966 3.68789 21.2118 2.88487 20.5374 2.24788C19.8708 1.61831 19.0437 1.35943 18.102 1.23986C17.1971 1.12495 16.0507 1.12497 14.647 1.125H13.35C13.0672 1.125 12.9257 1.125 12.8379 1.21287C12.75 1.30074 12.75 1.44216 12.75 1.725L12.75 16.025C12.75 16.3078 12.75 16.4493 12.8379 16.5371C12.9257 16.625 13.0672 16.625 13.35 16.625L19.4778 16.625C19.6109 16.625 19.7152 16.7403 19.6964 16.8721C19.5999 17.55 19.4312 17.8647 19.1985 18.0845C18.958 18.3116 18.6015 18.4811 17.8565 18.5757C17.0888 18.6732 16.067 18.675 14.581 18.675H9.41921C7.93318 18.675 6.91135 18.6732 6.14371 18.5757C5.39868 18.4811 5.04217 18.3116 4.80166 18.0845C4.56902 17.8647 4.40025 17.55 4.30375 16.8721C4.28499 16.7403 4.38932 16.625 4.52242 16.625H10.65C10.9328 16.625 11.0743 16.625 11.1621 16.5371C11.25 16.4493 11.25 16.3078 11.25 16.025L11.25 1.725ZM9 8.125C9.41422 8.125 9.75 8.46079 9.75 8.875L9.75 9.875C9.75 10.2892 9.41422 10.625 9 10.625C8.58579 10.625 8.25 10.2892 8.25 9.875L8.25 8.875C8.25 8.46079 8.58579 8.125 9 8.125ZM15.75 8.875C15.75 8.46079 15.4142 8.125 15 8.125C14.5858 8.125 14.25 8.46079 14.25 8.875V9.875C14.25 10.2892 14.5858 10.625 15 10.625C15.4142 10.625 15.75 10.2892 15.75 9.875V8.875Z',
  d11: 'M10.65 1.125H9.35301C7.94929 1.12497 6.80293 1.12495 5.89799 1.23986C4.95628 1.35943 4.12925 1.61831 3.46266 2.24788C2.78819 2.88488 2.50341 3.68789 2.37313 4.60307C2.24993 5.46846 2.24996 6.5605 2.25 7.87786V7.8779V13.8722V13.8722C2.24997 14.9374 2.24995 15.8552 2.31506 16.625H10.65C10.9328 16.625 11.0743 16.625 11.1621 16.5371C11.25 16.4493 11.25 16.3078 11.25 16.025L11.25 1.725C11.25 1.44216 11.25 1.30074 11.1621 1.21287C11.0743 1.125 10.9328 1.125 10.65 1.125Z',
  d12: 'M21.75 13.8722V7.87787C21.75 6.56051 21.7501 5.46846 21.6269 4.60307C21.4966 3.68789 21.2118 2.88488 20.5374 2.24788C19.8708 1.61831 19.0437 1.35943 18.102 1.23986C17.1971 1.12495 16.0507 1.12497 14.647 1.125H13.35C13.0672 1.125 12.9257 1.125 12.8379 1.21287C12.75 1.30074 12.75 1.44216 12.75 1.725L12.75 16.025C12.75 16.3078 12.75 16.4493 12.8379 16.5371C12.9257 16.625 13.0672 16.625 13.35 16.625H21.685C21.7501 15.8552 21.75 14.9374 21.75 13.8722Z',
  d13: 'M9 8.125C9.41421 8.125 9.75 8.46079 9.75 8.875V9.875C9.75 10.2892 9.41421 10.625 9 10.625C8.58579 10.625 8.25 10.2892 8.25 9.875V8.875C8.25 8.46079 8.58579 8.125 9 8.125Z',
  d14: 'M15 8.125C15.4142 8.125 15.75 8.46079 15.75 8.875V9.875C15.75 10.2892 15.4142 10.625 15 10.625C14.5858 10.625 14.25 10.2892 14.25 9.875V8.875C14.25 8.46079 14.5858 8.125 15 8.125Z',
  d15: 'M4.52377 16.625C4.39067 16.625 4.28634 16.7403 4.3051 16.8721C4.4016 17.55 4.57037 17.8647 4.80301 18.0845C5.04352 18.3116 5.40003 18.4811 6.14506 18.5757C6.9127 18.6731 7.93452 18.675 9.42056 18.675H14.5823C16.0684 18.675 17.0902 18.6731 17.8578 18.5757C18.6029 18.4811 18.9594 18.3116 19.1999 18.0845C19.4325 17.8647 19.6013 17.55 19.6978 16.8721C19.7165 16.7403 19.6122 16.625 19.4791 16.625H21.6863C21.6709 16.8073 21.6518 16.9813 21.6282 17.1469C21.498 18.0621 21.2132 18.8651 20.5387 19.5021C19.8721 20.1317 19.0451 20.3906 18.1034 20.5101C17.1984 20.6251 16.0521 20.625 14.6483 20.625H9.35431C7.9506 20.625 6.80428 20.6251 5.89934 20.5101C4.95763 20.3906 4.1306 20.1317 3.46401 19.5021C2.78954 18.8651 2.50476 18.0621 2.37448 17.1469C2.35089 16.9813 2.33182 16.8073 2.31641 16.625H4.52377Z',
  d16: 'M6 19V22M18 19V22',
  d17: 'M3 15H21',
  d18: 'M12 15V2',
  d19: 'M21 2H3V19H21V2Z',
  d20: 'M9 10V7',
  d21: 'M15 10V7',
  d22: 'M5 22.25V19.25H7V22.25H5ZM17 22.25V19.25H19V22.25H17Z',
  d23: 'M21.75 16.2498V19.4998C21.75 19.914 21.4142 20.2498 21 20.2498L3 20.2498C2.58579 20.2498 2.25 19.914 2.25 19.4998L2.25 16.2498L21.75 16.2498ZM2.25 2.49976C2.25 2.08554 2.58579 1.74976 3 1.74976H11.25L11.25 14.7498H2.25L2.25 2.49976ZM21 1.74976L12.75 1.74976L12.75 14.7498L21.75 14.7498L21.75 2.49976C21.75 2.08554 21.4142 1.74976 21 1.74976ZM9.75 6.74976L9.75 9.74976L8.25 9.74976L8.25 6.74976L9.75 6.74976ZM15.75 9.74976V6.74976H14.25V9.74976H15.75Z',
};

export const IconWardrobe03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-stroke-rounded IconWardrobe03StrokeRounded"
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWardrobe03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-duotone-rounded IconWardrobe03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWardrobe03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-twotone-rounded IconWardrobe03TwotoneRounded"
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
        d={d.d8} 
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWardrobe03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-solid-rounded IconWardrobe03SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconWardrobe03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-bulk-rounded IconWardrobe03BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWardrobe03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-stroke-sharp IconWardrobe03StrokeSharp"
    >
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWardrobe03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wardrobe-03-solid-sharp IconWardrobe03SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWardrobe03: TheIconSelfPack = {
  name: 'Wardrobe03',
  StrokeRounded: IconWardrobe03StrokeRounded,
  DuotoneRounded: IconWardrobe03DuotoneRounded,
  TwotoneRounded: IconWardrobe03TwotoneRounded,
  SolidRounded: IconWardrobe03SolidRounded,
  BulkRounded: IconWardrobe03BulkRounded,
  StrokeSharp: IconWardrobe03StrokeSharp,
  SolidSharp: IconWardrobe03SolidSharp,
};