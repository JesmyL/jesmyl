import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 2C7.85786 2 4.5 5.35786 4.5 9.5C4.5 11.816 5.54973 13.8867 7.19934 15.2625C8.19018 16.0889 9 17.2098 9 18.5H15C15 17.2098 15.8098 16.0889 16.8007 15.2625C18.4503 13.8867 19.5 11.816 19.5 9.5C19.5 5.35786 16.1421 2 12 2Z',
  d2: 'M15 18.5H9V20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5V18.5Z',
  d3: 'M10 8C10 6.98748 10.8954 6 12 6C13.1046 6 14 6.82081 14 7.83333C14 8.19831 13.8837 8.53837 13.6831 8.82406C13.0854 9.67553 12 10.4875 12 11.5',
  d4: 'M11.992 14H12.001',
  d5: 'M8.25 19.25V20.5C8.25 21.7426 9.25736 22.75 10.5 22.75H13.5C14.7426 22.75 15.75 21.7426 15.75 20.5V19.25H8.25Z',
  d6: 'M12 1.25C7.44365 1.25 3.75 4.94365 3.75 9.5C3.75 12.0478 4.90582 14.3263 6.71898 15.8385C7.39484 16.4021 7.90718 17.0566 8.12911 17.75H15.8709C16.0928 17.0566 16.6052 16.4021 17.281 15.8385C19.0942 14.3263 20.25 12.0478 20.25 9.5C20.25 4.94365 16.5563 1.25 12 1.25ZM12 6.75C11.3316 6.75 10.75 7.37939 10.75 8C10.75 8.41421 10.4142 8.75 10 8.75C9.58579 8.75 9.25 8.41421 9.25 8C9.25 6.59556 10.4593 5.25 12 5.25C13.456 5.25 14.75 6.3465 14.75 7.83333C14.75 8.36152 14.5808 8.85062 14.297 9.25496C14.1219 9.50434 13.9179 9.74155 13.7316 9.95377L13.6307 10.0684C13.4761 10.2439 13.3351 10.4038 13.2049 10.5679C12.8791 10.9783 12.75 11.262 12.75 11.5C12.75 11.9142 12.4142 12.25 12 12.25C11.5858 12.25 11.25 11.9142 11.25 11.5C11.25 10.7255 11.6636 10.0969 12.03 9.63536C12.1867 9.43796 12.3584 9.24326 12.5135 9.06733L12.6043 8.96424C12.7896 8.7531 12.9455 8.56951 13.0693 8.39315C13.1865 8.22611 13.25 8.03509 13.25 7.83333C13.25 7.29512 12.7531 6.75 12 6.75ZM11.9922 13C11.4399 13 10.9922 13.4477 10.9922 14C10.9922 14.5523 11.4399 15 11.9922 15H12.0012C12.5535 15 13.0012 14.5523 13.0012 14C13.0012 13.4477 12.5535 13 12.0012 13H11.9922Z',
  d7: 'M12 1.25C7.44365 1.25 3.75 4.94365 3.75 9.5C3.75 12.0478 4.90582 14.3263 6.71898 15.8385C7.39484 16.4021 7.90718 17.0566 8.12911 17.75H15.8709C16.0928 17.0566 16.6052 16.4021 17.281 15.8385C19.0942 14.3263 20.25 12.0478 20.25 9.5C20.25 4.94365 16.5563 1.25 12 1.25Z',
  d8: 'M12 6.75C11.3316 6.75 10.75 7.37939 10.75 8C10.75 8.41421 10.4142 8.75 10 8.75C9.58579 8.75 9.25 8.41421 9.25 8C9.25 6.59556 10.4593 5.25 12 5.25C13.456 5.25 14.75 6.3465 14.75 7.83333C14.75 8.36152 14.5808 8.85062 14.297 9.25496C14.1219 9.50434 13.9179 9.74155 13.7316 9.95377C13.6973 9.99283 13.6637 10.031 13.6307 10.0684C13.4761 10.2439 13.3351 10.4038 13.2049 10.5679C12.8791 10.9783 12.75 11.262 12.75 11.5C12.75 11.9142 12.4142 12.25 12 12.25C11.5858 12.25 11.25 11.9142 11.25 11.5C11.25 10.7255 11.6636 10.0969 12.03 9.63536C12.1867 9.43796 12.3584 9.24326 12.5135 9.06733C12.5445 9.03217 12.5749 8.99777 12.6043 8.96424C12.7896 8.7531 12.9455 8.56951 13.0693 8.39315C13.1865 8.22611 13.25 8.03509 13.25 7.83333C13.25 7.29512 12.7531 6.75 12 6.75Z',
  d9: 'M10.9922 14C10.9922 13.4477 11.4399 13 11.9922 13H12.0012C12.5535 13 13.0012 13.4477 13.0012 14C13.0012 14.5523 12.5535 15 12.0012 15H11.9922C11.4399 15 10.9922 14.5523 10.9922 14Z',
  d10: 'M15 18.5H9V22H15V18.5Z',
  d11: 'M10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8C14 8.39815 13.8837 8.76913 13.6831 9.08079C13.0854 10.0097 12 10.5 12 10.5V11.5',
  d12: 'M8.25 19.25V22C8.25 22.4142 8.58579 22.75 9 22.75H15C15.4142 22.75 15.75 22.4142 15.75 22V19.25H8.25Z',
  d13: 'M12 1.25C7.44365 1.25 3.75 4.94365 3.75 9.5C3.75 12.0478 4.90582 14.3263 6.71898 15.8385C7.39484 16.4021 7.90718 17.0566 8.12911 17.75H15.8709C16.0928 17.0566 16.6052 16.4021 17.281 15.8385C19.0942 14.3263 20.25 12.0478 20.25 9.5C20.25 4.94365 16.5563 1.25 12 1.25ZM12 6.75C11.3096 6.75 10.75 7.30964 10.75 8V8.75H9.25V8C9.25 6.48122 10.4812 5.25 12 5.25C13.5188 5.25 14.75 6.48122 14.75 8C14.75 8.54634 14.5899 9.05757 14.3138 9.48663C13.9408 10.0663 13.4325 10.4876 13.0432 10.7561C12.9383 10.8285 12.8392 10.8917 12.75 10.9456V12.25H11.25V10.0158L11.6889 9.81757L11.6924 9.81592L11.7159 9.80455C11.7385 9.79339 11.7743 9.77521 11.8203 9.75016C11.9128 9.69983 12.044 9.6231 12.1916 9.52134C12.4944 9.31246 12.8277 9.02417 13.0524 8.67495C13.1774 8.48068 13.25 8.24996 13.25 8C13.25 7.30964 12.6904 6.75 12 6.75ZM12.7512 13.25H11.2422V14.75H12.7512V13.25Z',
};

export const IconQuiz02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-stroke-rounded IconQuiz02StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
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

export const IconQuiz02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-duotone-rounded IconQuiz02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
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

export const IconQuiz02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-twotone-rounded IconQuiz02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-solid-rounded IconQuiz02SolidRounded"
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

export const IconQuiz02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-bulk-rounded IconQuiz02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-stroke-sharp IconQuiz02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-02-solid-sharp IconQuiz02SolidSharp"
    >
      <path 
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

export const iconPackOfQuiz02: TheIconSelfPack = {
  name: 'Quiz02',
  StrokeRounded: IconQuiz02StrokeRounded,
  DuotoneRounded: IconQuiz02DuotoneRounded,
  TwotoneRounded: IconQuiz02TwotoneRounded,
  SolidRounded: IconQuiz02SolidRounded,
  BulkRounded: IconQuiz02BulkRounded,
  StrokeSharp: IconQuiz02StrokeSharp,
  SolidSharp: IconQuiz02SolidSharp,
};