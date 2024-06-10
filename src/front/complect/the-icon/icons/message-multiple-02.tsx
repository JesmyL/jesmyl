import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.79098 19C7.46464 18.8681 7.28441 18.8042 7.18359 18.8166C7.05968 18.8317 6.8799 18.9637 6.52034 19.2275C5.88637 19.6928 5.0877 20.027 3.90328 19.9983C3.30437 19.9838 3.00491 19.9765 2.87085 19.749C2.73679 19.5216 2.90376 19.2067 3.23769 18.5769C3.70083 17.7034 3.99427 16.7035 3.54963 15.9023C2.78384 14.7578 2.13336 13.4025 2.0383 11.9387C1.98723 11.1522 1.98723 10.3377 2.0383 9.55121C2.29929 5.53215 5.47105 2.33076 9.45292 2.06733C10.8086 1.97765 12.2269 1.97746 13.5854 2.06733C17.5503 2.32964 20.712 5.50498 20.9965 9.5',
  d2: 'M14.6976 21.6471C12.1878 21.4862 10.1886 19.5298 10.0241 17.0737C9.99195 16.593 9.99195 16.0953 10.0241 15.6146C10.1886 13.1585 12.1878 11.2021 14.6976 11.0411C15.5539 10.9862 16.4479 10.9863 17.3024 11.0411C19.8122 11.2021 21.8114 13.1585 21.9759 15.6146C22.008 16.0953 22.008 16.593 21.9759 17.0737C21.9159 17.9682 21.5059 18.7965 21.0233 19.4958C20.743 19.9854 20.928 20.5965 21.2199 21.1303C21.4304 21.5152 21.5356 21.7076 21.4511 21.8466C21.3666 21.9857 21.1778 21.9901 20.8003 21.999C20.0538 22.0165 19.5504 21.8123 19.1508 21.5279C18.9242 21.3667 18.8108 21.2861 18.7327 21.2768C18.6546 21.2675 18.5009 21.3286 18.1936 21.4507C17.9174 21.5605 17.5966 21.6283 17.3024 21.6471C16.4479 21.702 15.5539 21.7021 14.6976 21.6471Z',
  d3: 'M10.8616 19.4836C10.3838 18.7868 10.0837 17.963 10.0241 17.0737C9.99195 16.593 9.99195 16.0953 10.0241 15.6146C10.1886 13.1585 12.1878 11.2021 14.6976 11.0411C15.5539 10.9862 16.4479 10.9863 17.3024 11.0411C18.7349 11.133 20.001 11.8098 20.8546 12.8306C20.9062 12.5385 20.9422 12.2409 20.9618 11.9387C21.0127 11.1522 21.0127 10.3377 20.9618 9.55121C20.7013 5.53215 17.5359 2.33076 13.5621 2.06733C12.2063 1.97746 10.7909 1.97765 9.43793 2.06733C5.46407 2.33076 2.29869 5.53215 2.03823 9.55121C1.98726 10.3377 1.98726 11.1522 2.03823 11.9387C2.13309 13.4025 2.78226 14.7578 3.54651 15.9023C3.99026 16.7035 3.69741 17.7034 3.2352 18.5769C2.90194 19.2067 2.73531 19.5216 2.8691 19.749C3.00289 19.9765 3.30175 19.9838 3.89945 19.9983C5.08148 20.027 5.87855 19.6928 6.51124 19.2275C6.87008 18.9637 7.0495 18.8317 7.17316 18.8166C7.29682 18.8014 7.54017 18.9013 8.02677 19.1012C8.46414 19.2808 8.97202 19.3917 9.43793 19.4226C9.90668 19.4537 10.3829 19.474 10.8616 19.4836Z',
  d4: 'M17.4464 8.79576C16.4961 8.73481 15.5059 8.73468 14.5536 8.79576C10.9555 9.02655 8.02168 11.8436 7.77917 15.4643C7.74028 16.045 7.74028 16.6433 7.77917 17.224C7.82147 17.8556 7.94566 18.4627 8.14097 19.0359C8.28754 19.466 8.36083 19.6811 8.2777 19.8046C8.25045 19.845 8.20843 19.8822 8.16497 19.9043C8.03237 19.9718 7.81322 19.866 7.37498 19.6542C7.37605 19.6545 7.37686 19.6546 7.37686 19.6546C7.37686 19.6546 7.37624 19.6545 7.37464 19.654C7.37463 19.654 7.37461 19.654 7.37459 19.654C7.37455 19.654 7.37447 19.654 7.37433 19.654C7.37388 19.6537 7.37347 19.6535 7.37317 19.6534M7.37461 19.6541C7.37473 19.6542 7.37486 19.6542 7.37498 19.6542C7.37488 19.6542 7.37478 19.6541 7.37469 19.6541C7.37467 19.6541 7.37466 19.6541 7.37464 19.654M7.37461 19.6541C7.37767 19.6558 7.3823 19.6584 7.37415 19.6553C7.37153 19.6544 7.3703 19.6538 7.36993 19.6536C7.3632 19.6531 7.34691 19.6522 7.30759 19.6512C7.28682 19.6507 7.25822 19.6533 7.23789 19.6576C7.17463 19.671 7.13042 19.7034 7.042 19.7683L6.95557 19.8318C6.19643 20.39 5.23823 20.781 3.88125 20.7481L3.8367 20.747C3.57763 20.7408 3.29744 20.7342 3.0682 20.6899C2.79078 20.6364 2.44152 20.5014 2.22262 20.1293C1.98368 19.723 2.08058 19.3131 2.17095 19.0609C2.25602 18.8234 2.40299 18.5458 2.55118 18.266L2.57229 18.2261C3.01408 17.3912 3.12803 16.7252 2.90267 16.2886C2.11057 15.0958 1.39578 13.6226 1.2898 11.9872C1.23673 11.1684 1.23673 10.3215 1.2898 9.50271C1.57417 5.1146 5.0324 1.60773 9.38832 1.31898C10.7743 1.2271 12.2229 1.22691 13.6117 1.31898C17.9676 1.60773 21.4258 5.11461 21.7102 9.50271C21.7308 9.82087 21.7411 9.97995 21.6883 10.0628C21.6348 10.1465 21.5544 10.1941 21.4553 10.2006C21.3573 10.2072 21.2089 10.1128 20.9121 9.92401C19.8983 9.27907 18.7135 8.87704 17.4464 8.79576M7.37334 19.6539C7.37383 19.6539 7.37414 19.6539 7.37433 19.654C7.37442 19.654 7.37451 19.6541 7.37461 19.6541C7.3742 19.654 7.37377 19.6539 7.37334 19.6539ZM17.3504 10.2927C16.4639 10.2358 15.5379 10.2357 14.6496 10.2927C11.7768 10.477 9.46631 12.7205 9.27582 15.5645C9.24139 16.0785 9.24139 16.6098 9.27582 17.1238C9.46631 19.9678 11.7768 22.2113 14.6496 22.3956C15.5379 22.4526 16.4639 22.4525 17.3504 22.3956C17.7164 22.3721 18.1151 22.289 18.4706 22.1477C18.5342 22.1224 18.5884 22.1009 18.6361 22.0823L18.716 22.139C19.2419 22.5132 19.9029 22.7702 20.818 22.7487L20.8518 22.748H20.8518H20.8519C21.009 22.7444 21.2066 22.74 21.3733 22.7089C21.5824 22.6698 21.8935 22.5628 22.092 22.2362C22.3158 21.8679 22.2168 21.5021 22.1494 21.3203C22.0877 21.1536 21.9848 20.9657 21.8954 20.8024L21.8954 20.8024L21.8954 20.8024L21.8779 20.7705C21.7538 20.5435 21.675 20.3391 21.6464 20.1709C21.6219 20.0269 21.6387 19.9418 21.6646 19.8867C22.1749 19.1398 22.6526 18.1928 22.7242 17.1238C22.7586 16.6098 22.7586 16.0785 22.7242 15.5645C22.5337 12.7205 20.2232 10.477 17.3504 10.2927Z',
  d5: 'M14.6496 10.2927C15.5379 10.2357 16.4639 10.2358 17.3504 10.2927C20.2232 10.477 22.5337 12.7205 22.7242 15.5645C22.7586 16.0785 22.7586 16.6098 22.7242 17.1238C22.6526 18.1928 22.1749 19.1398 21.6646 19.8867C21.6387 19.9418 21.6219 20.0269 21.6464 20.1709C21.675 20.3391 21.7538 20.5435 21.8779 20.7704L21.8954 20.8024L21.8954 20.8024C21.9848 20.9657 22.0877 21.1536 22.1494 21.3203C22.2168 21.5021 22.3158 21.8679 22.092 22.2362C21.8935 22.5628 21.5824 22.6698 21.3733 22.7089C21.2066 22.74 21.009 22.7444 20.8518 22.748H20.8518L20.818 22.7487C19.9029 22.7702 19.2419 22.5132 18.716 22.139L18.6361 22.0823C18.5884 22.1009 18.5342 22.1224 18.4706 22.1477C18.1151 22.289 17.7164 22.3721 17.3504 22.3956C16.4639 22.4525 15.5379 22.4526 14.6496 22.3956C11.7768 22.2113 9.46631 19.9678 9.27582 17.1238C9.24139 16.6098 9.24139 16.0785 9.27582 15.5645C9.46631 12.7205 11.7768 10.477 14.6496 10.2927Z',
  d6: 'M14.5536 8.79576C15.5059 8.73468 16.4961 8.73481 17.4464 8.79576C18.7135 8.87704 19.8983 9.27907 20.9121 9.924C21.2089 10.1128 21.3573 10.2072 21.4553 10.2006C21.5544 10.1941 21.6348 10.1465 21.6883 10.0628C21.7411 9.97995 21.7308 9.82087 21.7102 9.50271C21.4258 5.1146 17.9676 1.60773 13.6117 1.31898C12.2229 1.22691 10.7743 1.2271 9.38832 1.31898C5.0324 1.60773 1.57417 5.1146 1.2898 9.50271C1.23673 10.3215 1.23673 11.1684 1.2898 11.9872C1.39578 13.6226 2.11057 15.0958 2.90267 16.2886C3.12803 16.7252 3.01408 17.3912 2.57229 18.2261L2.55118 18.266C2.40299 18.5458 2.25602 18.8234 2.17095 19.0609C2.08058 19.3131 1.98368 19.723 2.22262 20.1293C2.44152 20.5014 2.79078 20.6364 3.0682 20.6899C3.29744 20.7342 3.57763 20.7408 3.8367 20.747L3.88125 20.7481C5.23823 20.781 6.19643 20.39 6.95557 19.8318L7.042 19.7683C7.13042 19.7034 7.17463 19.671 7.23789 19.6576C7.25822 19.6533 7.28682 19.6507 7.30759 19.6512C7.36807 19.6528 7.37407 19.6539 7.37459 19.654C7.3839 19.6565 7.36064 19.6503 7.37415 19.6553C7.38766 19.6603 7.36594 19.6499 7.37459 19.654C7.81303 19.8659 8.03234 19.9719 8.16497 19.9043C8.20843 19.8822 8.25045 19.845 8.2777 19.8046C8.36083 19.6811 8.28754 19.466 8.14097 19.0359C7.94566 18.4627 7.82147 17.8556 7.77917 17.224C7.74028 16.6433 7.74028 16.045 7.77917 15.4643C8.02168 11.8436 10.9555 9.02655 14.5536 8.79576Z',
  d7: 'M9.434 2.04268C2.70535 2.42386 -0.312387 10.8026 3.54164 16.1954L2.14878 19.8434C2.11867 19.9223 2.19379 20.0007 2.27386 19.974L6.2828 18.6359C6.69874 18.8254 7.15627 19.1413 7.98815 19.3098M9.434 2.04268C9.59077 2.0338 9.74926 2.0293 9.9094 2.0293M9.434 2.04268L12.9078 2.03046M12.9078 2.03046L13.2372 2.0293M12.9078 2.03046C12.8594 2.02969 12.8108 2.0293 12.7619 2.0293M12.9078 2.03046C17.6784 2.10642 19.8712 5.8957 20.3683 7.37521C20.5787 8.12792 20.7111 8.87674 20.8115 9.54816',
  d8: 'M17.0968 11.0436C20.9355 11.261 23.2869 15.646 20.862 19.7264L21.6722 21.8316C21.7025 21.9103 21.6277 21.9889 21.5476 21.9625L19.2063 21.1899C18.2125 22.0269 13.8943 22.0977 12.7288 21.3464C11.1972 20.4919 9.09949 18.5068 10.2022 14.406C10.486 13.3507 11.9698 11.0825 14.9062 11.0359M17.0968 11.0436C16.9979 11.038 16.898 11.0352 16.797 11.0352M17.0968 11.0436L14.9062 11.0359M14.9062 11.0359L14.6987 11.0352M14.9062 11.0359C14.9368 11.0354 14.9675 11.0352 14.9984 11.0352',
  d9: 'M15.5043 10.25C15.0904 10.25 14.8569 10.25 14.656 10.2635C11.7652 10.4584 9.46459 12.6925 9.26394 15.4997C9.24999 15.6949 9.24999 15.9216 9.25 16.3235V16.3717C9.24999 16.7736 9.24999 17.0003 9.26394 17.1955C9.46459 20.0026 11.7652 22.2368 14.656 22.4316C14.8569 22.4452 15.0904 22.4452 15.5043 22.4452H16.4957C16.9096 22.4452 17.1431 22.4452 17.344 22.4316C18.1108 22.3799 18.8368 22.1845 19.493 21.8728L22.6088 22.75L21.7898 19.9119C22.3263 19.1233 22.6646 18.1954 22.7361 17.1955C22.75 17.0003 22.75 16.7735 22.75 16.3717V16.3235C22.75 15.9216 22.75 15.6949 22.7361 15.4997C22.5354 12.6925 20.2348 10.4584 17.344 10.2635C17.1431 10.25 16.9096 10.25 16.4957 10.25H15.5043Z',
  d10: 'M13.541 1.27112C13.2358 1.24999 12.8812 1.24999 12.2528 1.25H10.7472C10.1188 1.24999 9.76423 1.24999 9.45905 1.27112C5.0694 1.57509 1.57586 5.06032 1.27117 9.43953C1.24999 9.74398 1.24999 10.0977 1.25 10.7246V10.7998C1.24999 11.4267 1.24999 11.7804 1.27117 12.0849C1.37971 13.6448 1.89333 15.0923 2.70808 16.3225L1.46437 20.75L6.19583 19.3815C7.03538 19.7913 7.95005 20.0722 8.91367 20.1987C8.40995 19.3308 8.09279 18.3431 8.01713 17.2846C7.99994 17.0441 7.99997 16.7764 8 16.4168L8.00001 16.3717L8 16.2784C7.99997 15.9188 7.99994 15.651 8.01713 15.4106C8.26421 11.9537 11.087 9.25127 14.5719 9.01637C14.8155 8.99995 15.0875 8.99997 15.4603 9L15.5043 9.00001L16.5397 9C16.9125 8.99997 17.1845 8.99995 17.4281 9.01637C19.0878 9.12825 20.5974 9.79983 21.75 10.846C21.75 10.8308 21.75 10.8154 21.75 10.7998V10.7246C21.75 10.0977 21.75 9.74398 21.7288 9.43953C21.4241 5.06032 17.9306 1.57509 13.541 1.27112Z',
};

export const IconMessageMultiple02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-stroke-rounded IconMessageMultiple02StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageMultiple02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-duotone-rounded IconMessageMultiple02DuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageMultiple02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-twotone-rounded IconMessageMultiple02TwotoneRounded"
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
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageMultiple02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-solid-rounded IconMessageMultiple02SolidRounded"
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

export const IconMessageMultiple02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-bulk-rounded IconMessageMultiple02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMessageMultiple02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-stroke-sharp IconMessageMultiple02StrokeSharp"
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

export const IconMessageMultiple02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-multiple-02-solid-sharp IconMessageMultiple02SolidSharp"
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

export const iconPackOfMessageMultiple02: TheIconSelfPack = {
  name: 'MessageMultiple02',
  StrokeRounded: IconMessageMultiple02StrokeRounded,
  DuotoneRounded: IconMessageMultiple02DuotoneRounded,
  TwotoneRounded: IconMessageMultiple02TwotoneRounded,
  SolidRounded: IconMessageMultiple02SolidRounded,
  BulkRounded: IconMessageMultiple02BulkRounded,
  StrokeSharp: IconMessageMultiple02StrokeSharp,
  SolidSharp: IconMessageMultiple02SolidSharp,
};