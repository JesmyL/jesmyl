import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M18 7.99023H12.5167C11.7 7.99023 11.46 8.03023 11.299 8.85428L9.95406 14.4595C9.62198 15.7876 9.45066 15.9836 9.12 16.0102C8.76 15.8902 8.58977 15.5825 7.98 14.3302L7.63508 13.5702C7.37243 13.0308 7.28553 12.8032 7.02 12.7302C6.62037 12.6202 6.30716 12.931 6 13.1302M13.1035 11.4223C13.5235 11.4084 13.9795 11.3903 14.2291 11.8063C14.5724 12.4987 15.1156 13.9175 15.3175 14.3676C15.4185 14.5407 15.4795 14.6903 15.8395 14.8103C16.1088 14.8449 16.4995 14.8543 16.4995 14.8543M16.7407 11.4101C15.8945 11.4101 15.3905 12.3561 14.9167 12.9489C14.3074 13.8556 13.6807 14.8701 12.8887 14.8421',
  d3: 'M18.0107 7.98576L12.6162 7.98563C11.6847 7.98563 11.4817 7.94751 11.2981 8.76814L9.93936 14.4923C9.56062 15.8149 9.47322 15.9589 9.09609 15.9854C8.6855 15.8658 8.48456 15.3204 7.86509 14.0737C7.75491 13.8825 7.36778 12.961 7.2008 12.7999C6.99083 12.5973 6.36107 12.9011 6.01074 13.0995',
  d4: 'M13.083 11.4231C13.505 11.4091 14.043 11.4231 14.2557 11.8534C14.6006 12.551 15.1252 13.9141 15.3281 14.3677C15.4295 14.5421 15.4908 14.6928 15.8525 14.8137C16.1231 14.8486 16.5156 14.858 16.5156 14.858',
  d5: 'M16.7378 11.4355C15.8876 11.4355 15.4013 12.3414 14.9252 12.9386C14.3131 13.8522 13.6834 14.8744 12.8877 14.8462',
  d6: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM12.2848 9.01338L12.2878 9.00083C12.3176 9.00027 12.3507 9 12.3877 9H18.0001C18.5524 9 19.0001 8.55229 19.0001 8C19.0001 7.44772 18.5524 7 18.0001 7L12.3761 7C12.0756 6.99995 11.5522 6.99987 11.1083 7.29251C10.6058 7.62381 10.4341 8.15577 10.3403 8.54541L9.06438 13.8469C9.03988 13.9488 9.01688 14.0441 8.99517 14.1333C8.95107 14.0399 8.90389 13.9394 8.85316 13.8312L8.53917 13.1612L8.51988 13.12C8.4179 12.9021 8.30023 12.6506 8.16877 12.4517C8.00902 12.21 7.74712 11.9152 7.30812 11.7897C6.77399 11.6371 6.30823 11.8102 6.04433 11.9398C5.82561 12.0472 5.60796 12.1982 5.4932 12.2778L5.49318 12.2778C5.47227 12.2923 5.45477 12.3045 5.44131 12.3136C4.9833 12.6222 4.86218 13.2436 5.17079 13.7016C5.4794 14.1597 6.10088 14.2808 6.55889 13.9722C6.5911 13.9505 6.62529 13.9269 6.65517 13.9063L6.65528 13.9063L6.67357 13.8937L6.72819 14.01L7.04218 14.6799L7.0712 14.7419C7.32357 15.2805 7.55619 15.7771 7.78286 16.1272C7.98335 16.437 8.44691 17.0636 9.26506 16.9952C10.1011 16.9253 10.4411 16.208 10.5764 15.8658C10.7284 15.481 10.8556 14.952 10.9925 14.3828L10.9925 14.3828L10.9925 14.3827L11.0089 14.3149L12.2848 9.01338ZM14.103 12.4286C14.2032 12.4286 14.3565 12.4302 14.4241 12.4312C14.4487 12.4882 14.6345 12.9364 14.6706 13.0238C14.4997 13.2661 14.3462 13.4661 14.1927 13.6237C14.0797 13.7397 13.9333 13.8261 13.8766 13.8571C13.3243 13.8571 12.8766 14.3049 12.8766 14.8571C12.8766 15.4094 13.3243 15.8571 13.8766 15.8571C14.6229 15.8571 15.1855 15.4552 15.571 15.074C15.6393 15.1747 15.7191 15.2724 15.8134 15.3599C15.9749 15.5096 16.161 15.6279 16.3613 15.7113C16.7209 15.8611 17.2037 15.8587 17.5001 15.8571C18.0524 15.8571 18.5001 15.4094 18.5001 14.8571C18.5001 14.3049 18.0524 13.8571 17.5001 13.8571C17.3999 13.8571 17.2467 13.8555 17.179 13.8545C17.1544 13.7975 16.9687 13.3493 16.9326 13.2619C17.1034 13.0196 17.257 12.8196 17.4105 12.662C17.5234 12.546 17.6699 12.4596 17.7266 12.4286C18.2789 12.4286 18.7266 11.9809 18.7266 11.4286C18.7266 10.8763 18.2789 10.4286 17.7266 10.4286C16.9802 10.4286 16.4176 10.8305 16.0322 11.2117C15.9639 11.111 15.8841 11.0133 15.7897 10.9258C15.6283 10.7761 15.4421 10.6578 15.2418 10.5744C14.8822 10.4246 14.3995 10.427 14.103 10.4286C13.5508 10.4286 13.103 10.8763 13.103 11.4286C13.103 11.9809 13.5508 12.4286 14.103 12.4286Z',
  d7: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d8: 'M12.2878 9.00083L12.2848 9.01338L11.0089 14.3149L10.9925 14.3827C10.8556 14.952 10.7284 15.481 10.5764 15.8658C10.4411 16.208 10.1011 16.9253 9.26506 16.9952C8.44691 17.0636 7.98335 16.437 7.78286 16.1272C7.55619 15.7771 7.32357 15.2805 7.0712 14.7419L7.04218 14.6799L6.72819 14.01L6.67357 13.8937L6.65528 13.9063L6.65517 13.9063C6.62529 13.9269 6.5911 13.9505 6.55889 13.9722C6.10088 14.2808 5.4794 14.1597 5.17079 13.7016C4.86218 13.2436 4.9833 12.6222 5.44131 12.3136C5.45477 12.3045 5.47227 12.2923 5.49318 12.2778L5.4932 12.2778C5.60796 12.1982 5.82561 12.0472 6.04433 11.9398C6.30823 11.8102 6.77399 11.6371 7.30812 11.7897C7.74712 11.9152 8.00902 12.21 8.16877 12.4517C8.30023 12.6506 8.4179 12.9021 8.51988 13.12L8.53917 13.1612L8.85316 13.8312C8.90389 13.9394 8.95107 14.0399 8.99517 14.1333C9.01688 14.0441 9.03988 13.9488 9.06438 13.8469L10.3403 8.54541C10.4341 8.15577 10.6058 7.62381 11.1083 7.29251C11.5522 6.99987 12.0756 6.99995 12.3761 7H12.3761L18.0001 7C18.5524 7 19.0001 7.44772 19.0001 8C19.0001 8.55229 18.5524 9 18.0001 9H12.3877C12.3507 9 12.3176 9.00027 12.2878 9.00083Z',
  d9: 'M14.4241 12.4312C14.3565 12.4302 14.2032 12.4286 14.103 12.4286C13.5508 12.4286 13.103 11.9809 13.103 11.4286C13.103 10.8763 13.5508 10.4286 14.103 10.4286C14.3995 10.427 14.8822 10.4246 15.2418 10.5744C15.4421 10.6578 15.6283 10.7761 15.7897 10.9258C15.8841 11.0133 15.9639 11.111 16.0322 11.2117C16.4176 10.8305 16.9802 10.4286 17.7266 10.4286C18.2789 10.4286 18.7266 10.8763 18.7266 11.4286C18.7266 11.9809 18.2789 12.4286 17.7266 12.4286C17.6699 12.4596 17.5234 12.546 17.4105 12.662C17.257 12.8196 17.1034 13.0196 16.9326 13.2619C16.9687 13.3493 17.1544 13.7975 17.179 13.8545C17.2467 13.8555 17.3999 13.8571 17.5001 13.8571C18.0524 13.8571 18.5001 14.3049 18.5001 14.8571C18.5001 15.4094 18.0524 15.8571 17.5001 15.8571C17.2037 15.8587 16.7209 15.8611 16.3613 15.7113C16.161 15.6279 15.9749 15.5096 15.8134 15.3599C15.7191 15.2724 15.6393 15.1747 15.571 15.074C15.1855 15.4552 14.6229 15.8571 13.8766 15.8571C13.3243 15.8571 12.8766 15.4094 12.8766 14.8571C12.8766 14.3049 13.3243 13.8571 13.8766 13.8571C13.9333 13.8261 14.0797 13.7397 14.1927 13.6237C14.3462 13.4661 14.4997 13.2661 14.6706 13.0238C14.6345 12.9364 14.4487 12.4882 14.4241 12.4312Z',
  d10: 'M3 21H21V3.00046L3 3V21Z',
  d11: 'M12.0053 7.99219L12.0054 7.24219C11.6773 7.24216 11.3873 7.45532 11.2895 7.76841L12.0053 7.99219ZM9.49957 16.0077L8.82733 16.3402C8.96323 16.6149 9.25261 16.7793 9.55817 16.7554C9.86372 16.7314 10.124 16.524 10.2154 16.2314L9.49957 16.0077ZM7.50638 11.9786L8.17862 11.646C8.07193 11.4303 7.86824 11.279 7.63097 11.239C7.39369 11.199 7.15165 11.2753 6.98019 11.4441L7.50638 11.9786ZM16.9647 14.9759L16.8082 15.7094L16.8856 15.7259H16.9647V14.9759ZM15.7783 13.6047L15.0887 13.8996L15.104 13.9355L15.1231 13.9697L15.7783 13.6047ZM14.9062 11.6724L14.2434 12.0235H14.2434L14.9062 11.6724ZM16.0254 12.2809L15.4507 11.7989L15.4445 11.8064L15.4384 11.814L16.0254 12.2809ZM17.9849 7.24267L12.0054 7.24219L12.0052 8.74219L17.9848 8.74267L17.9849 7.24267ZM11.2895 7.76841L8.78373 15.7839L10.2154 16.2314L12.7211 8.21597L11.2895 7.76841ZM10.1718 15.6751L8.17862 11.646L6.83414 12.3111L8.82733 16.3402L10.1718 15.6751ZM6.98019 11.4441L5.46697 12.934L6.51935 14.0029L8.03257 12.513L6.98019 11.4441ZM17.6917 14.2259H16.9647V15.7259H17.6917V14.2259ZM17.1212 14.2424C16.9294 14.2015 16.8645 14.1305 16.7985 14.0212C16.7523 13.9446 16.7109 13.8524 16.6525 13.713C16.6011 13.5905 16.5277 13.4088 16.4335 13.2397L15.1231 13.9697C15.1673 14.0491 15.2051 14.1405 15.2692 14.2933C15.3263 14.4293 15.4048 14.6148 15.5142 14.7961C15.7595 15.2027 16.1493 15.5688 16.8082 15.7094L17.1212 14.2424ZM16.4678 13.3098C16.3754 13.0937 16.2798 12.8746 16.1872 12.665L14.8153 13.2717C14.906 13.4766 14.999 13.69 15.0887 13.8996L16.4678 13.3098ZM16.1872 12.665C15.91 12.0383 15.6433 11.4616 15.5689 11.3213L14.2434 12.0235C14.2877 12.1071 14.5317 12.6303 14.8153 13.2717L16.1872 12.665ZM15.5689 11.3213C15.4591 11.1139 15.2743 10.7143 14.8223 10.4749C14.4257 10.2648 13.9124 10.221 13.2827 10.221V11.721C13.5826 11.721 13.786 11.7338 13.9269 11.754C14.0674 11.7741 14.1148 11.7976 14.1202 11.8004C14.1213 11.801 14.1174 11.7989 14.1125 11.7945C14.1083 11.7907 14.1097 11.7909 14.1175 11.8014C14.1425 11.8353 14.1694 11.8837 14.2434 12.0235L15.5689 11.3213ZM18.0002 10.221C17.4123 10.221 16.9179 10.4506 16.5103 10.7502C16.1121 11.0428 15.7618 11.428 15.4507 11.7989L16.6001 12.7628C16.896 12.41 17.1518 12.1402 17.3986 11.9589C17.6359 11.7844 17.8254 11.721 18.0002 11.721V10.221ZM15.4384 11.814C15.2544 12.0453 15.0732 12.2887 14.9008 12.5189L16.1017 13.4178C16.2786 13.1814 16.4451 12.9581 16.6124 12.7478L15.4384 11.814ZM14.9008 12.5189C14.5164 13.0324 14.1779 13.4759 13.8294 13.7971C13.4831 14.1162 13.2206 14.2259 13.0002 14.2259V15.7259C13.7632 15.7259 14.3754 15.3338 14.8459 14.9002C15.3141 14.4686 15.7344 13.9084 16.1017 13.4178L14.9008 12.5189Z',
  d12: 'M3.00002 2.25C2.8011 2.24999 2.61033 2.32901 2.46968 2.46966C2.32902 2.61032 2.25 2.80108 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3.00046C21.75 2.58626 21.4142 2.25047 21 2.25046L3.00002 2.25ZM12.0001 7C11.5627 7 11.1761 7.28425 11.0456 7.70173L9.28536 13.3345L8.3945 11.5528C8.25075 11.2653 7.97755 11.0644 7.66026 11.0129C7.34297 10.9614 7.02026 11.0656 6.79297 11.2929L5.29297 12.7929L6.70718 14.2071L7.22612 13.6882L8.60565 16.4472C8.78807 16.812 9.17379 17.0295 9.58037 16.9968C9.98695 16.964 10.3329 16.6876 10.4546 16.2983L12.7353 9H18.0001V7H12.0001ZM13.2942 12C13.5619 12 13.7152 12.0005 13.8295 12.0079C13.8901 12.0119 13.9186 12.0168 13.9278 12.0188C13.933 12.0208 13.9376 12.0229 13.9415 12.0249L13.9472 12.0348C13.9641 12.0644 13.9865 12.1075 14.0188 12.1748C14.0513 12.2423 14.0875 12.3209 14.1342 12.4227L14.3406 12.8718C14.102 13.1779 13.8839 13.4361 13.663 13.6399C13.3422 13.9358 13.1381 14 13.0001 14V16C13.8569 16 14.5266 15.5642 15.0189 15.1101C15.1029 15.0326 15.1853 14.9513 15.2659 14.8672C15.3849 15.0882 15.539 15.3166 15.7585 15.4994C15.9444 15.6543 16.1546 15.7733 16.376 15.8562C16.7674 16.0026 17.2024 16.0014 17.6016 16.0002L17.706 16V14C17.4383 14 17.2849 13.9995 17.1706 13.9921C17.1101 13.9881 17.0816 13.9832 17.0723 13.9812C17.0671 13.9792 17.0626 13.9771 17.0586 13.9751L17.0529 13.9652C17.036 13.9356 17.0136 13.8925 16.9813 13.8252C16.9489 13.7577 16.9127 13.6791 16.8659 13.5773L16.6595 13.1282C16.8982 12.8221 17.1162 12.5639 17.3372 12.3601C17.658 12.0642 17.862 12 18.0001 12V10C17.1432 10 16.4736 10.4358 15.9812 10.8899C15.8972 10.9674 15.8149 11.0488 15.7342 11.1328C15.6153 10.9118 15.4611 10.6834 15.2417 10.5006C15.0558 10.3457 14.8455 10.2267 14.6242 10.1438C14.2328 9.99737 13.7977 9.99864 13.3986 9.9998L13.2942 10V12Z',
};

export const IconSquareRootSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-stroke-rounded IconSquareRootSquareStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconSquareRootSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-duotone-rounded IconSquareRootSquareDuotoneRounded"
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

export const IconSquareRootSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-twotone-rounded IconSquareRootSquareTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareRootSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-solid-rounded IconSquareRootSquareSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareRootSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-bulk-rounded IconSquareRootSquareBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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

export const IconSquareRootSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-stroke-sharp IconSquareRootSquareStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSquareRootSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="square-root-square-solid-sharp IconSquareRootSquareSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSquareRootSquare: TheIconSelfPack = {
  name: 'SquareRootSquare',
  StrokeRounded: IconSquareRootSquareStrokeRounded,
  DuotoneRounded: IconSquareRootSquareDuotoneRounded,
  TwotoneRounded: IconSquareRootSquareTwotoneRounded,
  SolidRounded: IconSquareRootSquareSolidRounded,
  BulkRounded: IconSquareRootSquareBulkRounded,
  StrokeSharp: IconSquareRootSquareStrokeSharp,
  SolidSharp: IconSquareRootSquareSolidSharp,
};