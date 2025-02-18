import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 7.13678V17M11 7.13678C12.8928 8.81698 14.5706 10.0042 16.0063 10.6818C16.6937 11.0062 17.3165 11.0682 18.0198 10.7552C19.7751 9.97419 21 8.20629 21 6.15045C19.0715 7.50911 16.6876 6.77163 14.6847 5.50548C13.0454 4.46918 12.2258 3.95102 11.8569 4.00364C11.5781 4.0434 11.4283 4.1242 11.244 4.33421C11 4.61216 11 5.4537 11 7.13678Z',
  d2: 'M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z',
  d3: 'M15.1883 4.14072L15.2191 4.16014C17.1601 5.38719 19.0314 5.81404 20.4241 4.83289C20.7293 4.61782 21.129 4.59076 21.4605 4.7627C21.7919 4.93465 22 5.27696 22 5.65038C22 8.11264 20.532 10.2318 18.4263 11.1688C17.4057 11.6229 16.4745 11.5084 15.5795 11.0861C14.4827 10.5684 13.2856 9.79223 12 8.78052V16.4999C12 19.2614 9.76142 21.4999 7 21.4999C4.23858 21.4999 2 19.2614 2 16.4999C2 13.7385 4.23858 11.4999 7 11.4999C8.12561 11.4999 9.16434 11.8719 10 12.4996V6.59669C9.99999 5.78908 9.99998 5.13081 10.0327 4.6417C10.0495 4.39177 10.077 4.14449 10.1301 3.92126C10.1803 3.7102 10.2752 3.42193 10.4924 3.17445C10.6312 3.01639 10.8049 2.85184 11.0403 2.72487C11.2753 2.59816 11.508 2.54321 11.7157 2.51359C12.059 2.46462 12.3709 2.55812 12.5723 2.63297C12.7959 2.71609 13.0348 2.83619 13.2789 2.97134C13.7603 3.23796 14.3947 3.63898 15.1883 4.14072Z',
  d4: 'M2 16.5C2 19.2614 4.23858 21.5 7 21.5C9.76142 21.5 12 19.2614 12 16.5C12 13.7386 9.76142 11.5 7 11.5C4.23858 11.5 2 13.7386 2 16.5Z',
  d5: 'M15.1884 4.14072L15.2191 4.16014C17.1601 5.38719 19.0314 5.81404 20.4241 4.83289C20.7293 4.61782 21.129 4.59076 21.4605 4.7627C21.7919 4.93465 22 5.27696 22 5.65038C22 8.11264 20.532 10.2318 18.4263 11.1688C17.4057 11.6229 16.4745 11.5084 15.5795 11.0861C14.4827 10.5684 13.2856 9.79223 12 8.78052V16.5C12 14.8642 11.2144 13.4118 10 12.4996V6.59669C9.99999 5.78908 9.99998 5.13081 10.0327 4.6417C10.0495 4.39177 10.077 4.14449 10.1301 3.92126C10.1803 3.7102 10.2752 3.42193 10.4924 3.17445C10.6312 3.01639 10.8049 2.85184 11.0403 2.72487C11.2753 2.59816 11.508 2.54321 11.7157 2.51359C12.059 2.46462 12.3709 2.55812 12.5723 2.63297C12.7959 2.71609 13.0348 2.83619 13.2789 2.97134C13.7603 3.23796 14.3947 3.63898 15.1884 4.14072Z',
  d6: 'M12 17.0002V9M12 9V3L20 7V13L12 9Z',
  d7: 'M12 17C12 19.2091 10.2091 21 8 21C5.79086 21 4 19.2091 4 17C4 14.7909 5.79086 13 8 13C10.2091 13 12 14.7909 12 17Z',
  d8: 'M11.1244 2.36201C11.3572 2.22536 11.6478 2.21293 11.8925 2.32918L20.3136 6.32918C20.5811 6.45622 20.75 6.71592 20.75 7V13C20.75 13.2599 20.6083 13.5013 20.3756 13.638C20.1428 13.7746 19.8522 13.7871 19.6075 13.6708L12.75 10.4135V17C12.75 16.9999 12.75 17.0001 12.75 17C12.7499 19.6233 10.6233 21.75 8 21.75C5.37665 21.75 3.25 19.6234 3.25 17C3.25 14.3766 5.37665 12.25 8 12.25C9.02487 12.25 9.97393 12.5746 10.75 13.1266V3C10.75 2.74007 10.8917 2.49867 11.1244 2.36201Z',
};

export const IconMusicNote02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-stroke-rounded IconMusicNote02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMusicNote02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-duotone-rounded IconMusicNote02DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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

export const IconMusicNote02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-twotone-rounded IconMusicNote02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMusicNote02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-solid-rounded IconMusicNote02SolidRounded"
    >
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMusicNote02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-bulk-rounded IconMusicNote02BulkRounded"
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

export const IconMusicNote02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-stroke-sharp IconMusicNote02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMusicNote02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="music-note-02-solid-sharp IconMusicNote02SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMusicNote02: TheIconSelfPack = {
  name: 'MusicNote02',
  StrokeRounded: IconMusicNote02StrokeRounded,
  DuotoneRounded: IconMusicNote02DuotoneRounded,
  TwotoneRounded: IconMusicNote02TwotoneRounded,
  SolidRounded: IconMusicNote02SolidRounded,
  BulkRounded: IconMusicNote02BulkRounded,
  StrokeSharp: IconMusicNote02StrokeSharp,
  SolidSharp: IconMusicNote02SolidSharp,
};