import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.4564 2.64012C11.3085 1.78663 12.6915 1.78663 13.5436 2.64012L14.553 3.65112C14.9625 4.06139 15.5186 4.29172 16.0983 4.29124L17.5269 4.29007C18.733 4.28909 19.7109 5.26702 19.7099 6.47306L19.7088 7.90166C19.7083 8.48139 19.9386 9.03745 20.3489 9.44705L21.3599 10.4564C22.2134 11.3085 22.2134 12.6915 21.3599 13.5436L20.3489 14.553C19.9386 14.9625 19.7083 15.5186 19.7088 16.0983L19.7099 17.5269C19.7109 18.733 18.733 19.7109 17.5269 19.7099L16.0983 19.7088C15.5186 19.7083 14.9625 19.9386 14.553 20.3489L13.5436 21.3599C12.6915 22.2134 11.3085 22.2134 10.4564 21.3599L9.44705 20.3489C9.03745 19.9386 8.48139 19.7083 7.90166 19.7088L6.47306 19.7099C5.26702 19.7109 4.28909 18.733 4.29007 17.5269L4.29124 16.0983C4.29172 15.5186 4.06139 14.9625 3.65112 14.553L2.64012 13.5436C1.78663 12.6915 1.78663 11.3085 2.64012 10.4564L3.65112 9.44705C4.06139 9.03745 4.29172 8.48139 4.29124 7.90166L4.29007 6.47306C4.28909 5.26702 5.26702 4.28909 6.47306 4.29007L7.90166 4.29124C8.48139 4.29172 9.03745 4.06139 9.44705 3.65112L10.4564 2.64012Z',
  d2: 'M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5',
  d3: 'M11.992 17H12.001',
  d4: 'M9.92563 2.11023C11.0707 0.963259 12.9293 0.963258 14.0744 2.11023L15.0837 3.12122C15.3525 3.39042 15.7173 3.54155 16.0977 3.54124L17.5263 3.54007C19.1471 3.53875 20.4613 4.85294 20.4599 6.47367L20.4588 7.90227C20.4584 8.28266 20.6096 8.64753 20.8788 8.91628L21.8898 9.92563C23.0367 11.0707 23.0367 12.9293 21.8898 14.0744L20.8788 15.0837C20.6096 15.3525 20.4584 15.7173 20.4588 16.0977L20.4599 17.5263C20.4613 19.1471 19.1471 20.4613 17.5263 20.4599L16.0977 20.4588C15.7173 20.4584 15.3525 20.6096 15.0837 20.8788L14.0744 21.8898C12.9293 23.0367 11.0707 23.0367 9.92563 21.8898L8.91628 20.8788C8.64753 20.6096 8.28266 20.4584 7.90227 20.4588L6.47367 20.4599C4.85294 20.4613 3.53875 19.1471 3.54007 17.5263L3.54124 16.0977C3.54155 15.7173 3.39042 15.3525 3.12122 15.0837L2.11023 14.0744C0.963259 12.9293 0.963258 11.0707 2.11023 9.92563L3.12122 8.91628C3.39042 8.64753 3.54155 8.28266 3.54124 7.90227L3.54007 6.47367C3.53875 4.85294 4.85294 3.53875 6.47367 3.54007L7.90227 3.54124C8.28266 3.54155 8.64753 3.39042 8.91628 3.12123L9.92563 2.11023ZM12 8C11.4477 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10C9.44771 10 9 9.55228 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 9.59573 14.8253 10.1537 14.5241 10.6219C14.3433 10.9028 14.1337 11.1684 13.9471 11.4004L13.8449 11.527C13.6904 11.7182 13.5532 11.8881 13.426 12.0629C13.1099 12.4973 13 12.777 13 13V13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5V13C11 12.1184 11.4328 11.403 11.8088 10.8862C11.9687 10.6665 12.1441 10.4494 12.2993 10.2576L12.3889 10.1466C12.5739 9.91666 12.7241 9.7232 12.8422 9.53967C12.942 9.38454 13 9.20057 13 9C13 8.44772 12.5523 8 12 8ZM11.9922 16C11.4399 16 10.9922 16.4477 10.9922 17C10.9922 17.5523 11.4399 18 11.9922 18H12.0012C12.5535 18 13.0012 17.5523 13.0012 17C13.0012 16.4477 12.5535 16 12.0012 16H11.9922Z',
  d5: 'M9.92563 2.11023C11.0707 0.963259 12.9293 0.963258 14.0744 2.11023L15.0837 3.12122C15.3525 3.39042 15.7173 3.54155 16.0977 3.54124L17.5263 3.54007C19.1471 3.53875 20.4613 4.85294 20.4599 6.47367L20.4588 7.90227C20.4584 8.28266 20.6096 8.64753 20.8788 8.91628L21.8898 9.92563C23.0367 11.0707 23.0367 12.9293 21.8898 14.0744L20.8788 15.0837C20.6096 15.3525 20.4584 15.7173 20.4588 16.0977L20.4599 17.5263C20.4613 19.1471 19.1471 20.4613 17.5263 20.4599L16.0977 20.4588C15.7173 20.4584 15.3525 20.6096 15.0837 20.8788L14.0744 21.8898C12.9293 23.0367 11.0707 23.0367 9.92563 21.8898L8.91628 20.8788C8.64753 20.6096 8.28266 20.4584 7.90227 20.4588L6.47367 20.4599C4.85294 20.4613 3.53875 19.1471 3.54007 17.5263L3.54124 16.0977C3.54155 15.7173 3.39042 15.3525 3.12122 15.0837L2.11023 14.0744C0.963259 12.9293 0.963258 11.0707 2.11023 9.92563L3.12122 8.91628C3.39042 8.64753 3.54155 8.28266 3.54124 7.90227L3.54007 6.47367C3.53875 4.85294 4.85294 3.53875 6.47367 3.54007L7.90227 3.54124C8.28266 3.54155 8.64753 3.39042 8.91628 3.12123L9.92563 2.11023Z',
  d6: 'M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10C9.44772 10 9 9.55228 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 9.59573 14.8253 10.1537 14.5241 10.6219C14.3433 10.9028 14.1337 11.1684 13.9471 11.4004C13.9122 11.4437 13.8781 11.4859 13.8449 11.527C13.6904 11.7182 13.5532 11.8881 13.426 12.0629C13.1099 12.4973 13 12.777 13 13V13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5V13C11 12.1184 11.4328 11.403 11.8088 10.8862C11.9687 10.6665 12.1441 10.4494 12.2993 10.2576C12.33 10.2195 12.36 10.1825 12.3889 10.1466C12.5739 9.91666 12.7241 9.72319 12.8422 9.53967C12.942 9.38454 13 9.20057 13 9C13 8.44772 12.5523 8 12 8Z',
  d7: 'M10.9922 17C10.9922 16.4477 11.4399 16 11.9922 16H12.0012C12.5535 16 13.0012 16.4477 13.0012 17C13.0012 17.5523 12.5535 18 12.0012 18H11.9922C11.4399 18 10.9922 17.5523 10.9922 17Z',
  d8: 'M4.41255 19.3571C4.41255 19.468 4.50259 19.5578 4.61365 19.5578H8.90376L11.86 21.9412C11.9385 22.0196 12.0658 22.0196 12.1444 21.9412L14.938 19.5578H19.3737C19.4848 19.5578 19.5748 19.468 19.5748 19.3571V15.138L21.9425 12.1547C22.0211 12.0763 22.0211 11.9493 21.9425 11.8709L19.5748 8.88757V4.6516C19.5748 4.54077 19.4848 4.45092 19.3737 4.45092H15.1289L12.1274 2.05682C12.0489 1.97845 11.9216 1.97845 11.843 2.05682L8.84152 4.45092H4.61365C4.50259 4.45092 4.41255 4.54077 4.41255 4.6516V8.87068L2.0589 11.854C1.98037 11.9324 1.98037 12.0594 2.0589 12.1378L4.41255 15.1212V19.3571Z',
  d9: 'M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 12.5 12 12.5V13.5',
  d10: 'M12.6161 1.48721L15.3914 3.70092H19.3737C19.8975 3.70092 20.3248 4.12508 20.3248 4.6516V8.62612L22.5127 11.3828C22.831 11.7418 22.831 12.2838 22.5127 12.6428L20.3248 15.3995V19.3571C20.3248 19.8836 19.8975 20.3078 19.3737 20.3078H15.2144L12.6455 22.4996C12.2857 22.8303 11.7328 22.8334 11.3693 22.5091L8.63908 20.3078H4.61365C4.08985 20.3078 3.66255 19.8836 3.66255 19.3571V15.3814L1.48779 12.6248C1.17074 12.2662 1.17074 11.7256 1.48778 11.367L3.66255 8.61045V4.6516C3.66255 4.12508 4.08985 3.70092 4.61365 3.70092H8.57904L11.3544 1.4872C11.7137 1.16832 12.2567 1.16833 12.6161 1.48721ZM12 8C11.4477 8 11 8.44772 11 9V10H9V9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 9.59573 14.8253 10.1537 14.5241 10.6219C14.2124 11.1063 13.7807 11.7264 13.4335 12.2166C13.2635 12.4567 13.1115 12.6689 13 12.8237V14.5H11V12.1744L11.1917 11.9113L11.2381 11.8473C11.2684 11.8055 11.3126 11.7444 11.3675 11.6681C11.4774 11.5155 11.6302 11.3025 11.8013 11.0608C12.1463 10.5736 12.5561 9.98417 12.8422 9.53967C12.942 9.38454 13 9.20057 13 9C13 8.44772 12.5523 8 12 8ZM13.0012 16H10.9922V18H13.0012V16Z',
};

export const IconQuiz01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-stroke-rounded IconQuiz01StrokeRounded"
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

export const IconQuiz01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-duotone-rounded IconQuiz01DuotoneRounded"
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
        strokeLinecap="round" 
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

export const IconQuiz01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-twotone-rounded IconQuiz01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-solid-rounded IconQuiz01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-bulk-rounded IconQuiz01BulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-stroke-sharp IconQuiz01StrokeSharp"
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
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-01-solid-sharp IconQuiz01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfQuiz01: TheIconSelfPack = {
  name: 'Quiz01',
  StrokeRounded: IconQuiz01StrokeRounded,
  DuotoneRounded: IconQuiz01DuotoneRounded,
  TwotoneRounded: IconQuiz01TwotoneRounded,
  SolidRounded: IconQuiz01SolidRounded,
  BulkRounded: IconQuiz01BulkRounded,
  StrokeSharp: IconQuiz01StrokeSharp,
  SolidSharp: IconQuiz01SolidSharp,
};