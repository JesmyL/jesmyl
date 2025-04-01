import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22V18',
  d2: 'M8.59238 7.43436C9.56387 7.79137 10.7369 8 12 8C13.2631 8 14.4361 7.79137 15.4076 7.43436C16.0441 7.20048 16.1801 6.43408 15.7553 5.91561L12.8887 2.41707C12.4331 1.86098 11.5669 1.86098 11.1113 2.41707L8.24472 5.91561C7.81991 6.43408 7.95593 7.20048 8.59238 7.43436Z',
  d3: 'M14.7898 7.62305L17.2408 10.4446C17.674 10.9434 17.5554 11.7064 16.9511 11.9898C15.6018 12.6226 14.0495 12.9999 12 12.9999C9.95052 12.9999 8.39815 12.6226 7.04891 11.9898C6.44464 11.7064 6.326 10.9434 6.75921 10.4446L9.21022 7.62305',
  d4: 'M7.64436 12.3418L5.26271 15.0154C4.84523 15.484 4.92927 16.2074 5.4867 16.504C7.23841 17.4362 9.51345 17.9992 12 17.9992C14.4866 17.9992 16.7616 17.4362 18.5133 16.504C19.0707 16.2074 19.1548 15.484 18.7373 15.0154L16.3556 12.3418',
  d5: 'M10 22H14',
  d6: 'M5.4867 16.504C7.23841 17.4362 9.51345 17.9992 12 17.9992C14.4866 17.9992 16.7616 17.4362 18.5133 16.504C19.0707 16.2074 19.1548 15.484 18.7373 15.0154L16.3556 12.3418C13.0401 13.4152 9.16667 12.7891 7.64436 12.3418L5.26271 15.0154C4.84523 15.484 4.92927 16.2074 5.4867 16.504Z',
  d7: 'M12 22V18M12 18C9.51345 18 7.23841 17.4362 5.4867 16.504C4.92927 16.2074 4.84523 15.484 5.26271 15.0154L7.64436 12.3418M12 18C14.4866 18 16.7616 17.4362 18.5133 16.504C19.0707 16.2074 19.1548 15.484 18.7373 15.0154L16.3556 12.3418M10 22H14',
  d8: 'M10.5312 1.94173C11.2869 1.01942 12.7133 1.01942 13.4689 1.94173L16.3355 5.44027C17.0231 6.2795 16.8782 7.693 15.6664 8.13833C14.604 8.52874 13.3425 8.75 12.0001 8.75C10.6577 8.75 9.39612 8.52874 8.33375 8.13833C7.1219 7.693 6.97703 6.2795 7.66465 5.44027L10.5312 1.94173Z',
  d9: 'M7.11983 8.88685L6.1932 9.95358C5.47035 10.7857 5.62616 12.1516 6.73064 12.6696C8.18781 13.3531 9.85016 13.7507 12.0002 13.7507C14.1502 13.7507 15.8126 13.3531 17.2698 12.6696C18.3742 12.1516 18.53 10.7857 17.8072 9.95358L16.8805 8.88672C16.6534 9.0594 16.3922 9.20411 16.0975 9.3124C14.8837 9.75847 13.4746 10.0008 12.0001 10.0008C10.5255 10.0008 9.11644 9.75847 7.90257 9.3124C7.60796 9.20413 7.34686 9.05947 7.11983 8.88685Z',
  d10: 'M5.63974 13.465L4.70306 14.5165C4.00456 15.3006 4.09393 16.6122 5.13474 17.1661C7.0077 18.1628 9.40629 18.7492 12.0004 18.7492C14.5945 18.7492 16.9931 18.1628 18.866 17.1661C19.9068 16.6122 19.9962 15.3006 19.2977 14.5165L18.3612 13.4653C18.1938 13.5916 18.0073 13.7046 17.801 13.8014C16.1639 14.5692 14.3183 15.0007 12.0006 15.0007C9.68302 15.0007 7.83738 14.5692 6.20029 13.8014C5.9939 13.7046 5.8072 13.5915 5.63974 13.465Z',
  d11: 'M12.75 18C12.75 17.5858 12.4142 17.25 12 17.25C11.5858 17.25 11.25 17.5858 11.25 18V21.25H10C9.58579 21.25 9.25 21.5858 9.25 22C9.25 22.4142 9.58579 22.75 10 22.75H14C14.4142 22.75 14.75 22.4142 14.75 22C14.75 21.5858 14.4142 21.25 14 21.25H12.75V18Z',
  d12: 'M7.94283 7.93957L6.1932 9.95375C5.47035 10.7859 5.62616 12.1518 6.73064 12.6698C8.18781 13.3532 9.85016 13.7508 12.0002 13.7508C14.1502 13.7508 15.8126 13.3532 17.2698 12.6698C18.3742 12.1518 18.53 10.7859 17.8072 9.95375L16.0575 7.93945C15.9422 8.01826 15.812 8.08576 15.6664 8.13928C14.604 8.52968 13.3425 8.75094 12.0001 8.75094C10.6577 8.75094 9.39612 8.52968 8.33375 8.13927C8.18818 8.08578 8.05801 8.01832 7.94283 7.93957Z',
  d13: 'M6.47691 12.5255C6.55507 12.579 6.63963 12.6274 6.73064 12.6701C8.18781 13.3535 9.85016 13.7511 12.0002 13.7511C14.1502 13.7511 15.8126 13.3535 17.2698 12.6701C17.3609 12.6274 17.4455 12.5789 17.5237 12.5254L19.2977 14.5168C19.9962 15.3009 19.9068 16.6125 18.866 17.1664C16.9931 18.1631 14.5945 18.7495 12.0004 18.7495C9.40629 18.7495 7.0077 18.1631 5.13474 17.1664C4.09393 16.6125 4.00456 15.3009 4.70306 14.5168L6.47691 12.5255Z',
  d14: 'M11.25 18.7324V21.2493H10C9.58579 21.2493 9.25 21.5851 9.25 21.9993C9.25 22.4136 9.58579 22.7493 10 22.7493H14C14.4142 22.7493 14.75 22.4136 14.75 21.9993C14.75 21.5851 14.4142 21.2493 14 21.2493H12.75V18.7325C12.5022 18.7433 12.2522 18.7489 12.0004 18.7489C11.7483 18.7489 11.4981 18.7433 11.25 18.7324Z',
  d15: 'M8 7C9.14037 7.63116 10.5173 8 12 8C13.4827 8 14.8596 7.63116 16 7L12 2L8 7Z',
  d16: 'M14.8 7.5L18 11.5C16.2894 12.4467 14.2241 13 12 13C9.77595 13 7.71056 12.4467 6 11.5L9.2 7.5',
  d17: 'M16.4041 12.291L19 15.9994C17.0043 17.2617 14.5947 17.9994 12 17.9994C9.40528 17.9994 6.99566 17.2617 5 15.9994L7.59586 12.291',
  d18: 'M12 22V18M10 22H14',
  d19: 'M17.1395 7.22511L16.3616 7.65561C15.107 8.35003 13.6046 8.74941 11.9984 8.74941C10.3923 8.74941 8.88991 8.35003 7.63526 7.65561L6.85742 7.2251L12 1.25L17.1395 7.22511Z',
  d20: 'M12.748 17.25V21.25H14.748V22.75H9.24805V21.25H11.248V17.25H12.748Z',
  d21: 'M7.17343 8.82812L4.85547 11.7256L5.6333 12.1561C7.45814 13.1661 9.649 13.7499 11.9965 13.7499C14.344 13.7499 16.5348 13.1661 18.3597 12.1561L19.1375 11.7256L16.82 8.82868C15.4061 9.57911 13.7486 9.99982 11.9972 9.99982C10.2455 9.99982 8.58753 9.5789 7.17343 8.82812Z',
  d22: 'M5.78786 13.6383L4 16.2131L4.65881 16.6333C6.75636 17.9708 9.28426 18.7494 12 18.7494C14.7157 18.7494 17.2436 17.9708 19.3412 16.6333L20 16.2131L18.2111 13.6367C16.3624 14.5108 14.2392 14.9999 11.9978 14.9999C9.75776 14.9999 7.6357 14.5114 5.78786 13.6383Z',
};

export const IconTree07StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-stroke-rounded IconTree07StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconTree07DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-duotone-rounded IconTree07DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
    </TheIconWrapper>
  );
};

export const IconTree07TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-twotone-rounded IconTree07TwotoneRounded"
    >
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

export const IconTree07SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-solid-rounded IconTree07SolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTree07BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-bulk-rounded IconTree07BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTree07StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-stroke-sharp IconTree07StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTree07SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-07-solid-sharp IconTree07SolidSharp"
    >
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTree07: TheIconSelfPack = {
  name: 'Tree07',
  StrokeRounded: IconTree07StrokeRounded,
  DuotoneRounded: IconTree07DuotoneRounded,
  TwotoneRounded: IconTree07TwotoneRounded,
  SolidRounded: IconTree07SolidRounded,
  BulkRounded: IconTree07BulkRounded,
  StrokeSharp: IconTree07StrokeSharp,
  SolidSharp: IconTree07SolidSharp,
};