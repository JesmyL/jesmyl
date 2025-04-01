import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.51331 16H10.5133M6.51331 11H14.5133',
  d2: 'M10.0133 22H11.0133',
  d3: 'M7.50993 22C6.36069 21.975 5.58621 22 4.58688 21.775C3.53758 21.5 2.88801 20.85 2.66317 19.55C2.43831 18.7 2.5106 14.9238 2.51327 11.325C2.51533 8.53219 2.53385 5.99934 2.7631 5.475C3.08789 4.35 3.83739 3.55 6.16084 3.525M16.0292 3.525C16.8287 3.6 18.9184 3.525 19.327 5.825C19.5491 7.075 19.5019 8.85 19.5019 10.975M8.18449 5.5C9.23379 5.525 12.6065 5.5 13.7558 5.5C14.905 5.5 15.5123 4.55409 15.5046 3.675C15.4967 2.77925 14.7051 2.08017 13.9307 2C12.9813 2 8.95897 2 8.1595 2C7.23512 2.05 6.61054 2.8 6.5106 3.55C6.41067 4.575 7.16017 5.45 8.18449 5.5Z',
  d4: 'M18.2776 14.375C16.9035 15.775 14.2553 18.275 14.2553 18.45C14.0417 18.7468 13.8555 19.35 13.7306 20.2C13.5737 20.9879 13.3858 21.675 13.6057 21.875C13.8256 22.075 14.6535 21.9064 15.5294 21.725C16.229 21.65 16.8785 21.4 17.2033 21.15C17.678 20.7298 20.9009 17.475 21.2756 17.05C21.5504 16.675 21.5754 15.975 21.3356 15.55C21.2007 15.25 20.3512 14.45 20.0764 14.225C19.5767 13.925 18.8772 13.875 18.2776 14.375Z',
  d5: 'M6.51575 3.5C6.50407 3.58165 6.49802 3.66512 6.49802 3.75C6.49802 4.7165 7.28153 5.5 8.24802 5.5H13.748C14.7145 5.5 15.498 4.7165 15.498 3.75C15.498 3.66512 15.492 3.58165 15.4803 3.5H15.4941C17.0499 3.54667 17.9775 3.71984 18.6193 4.36228C19.498 5.24177 19.498 6.6573 19.498 9.48836V14.0181C19.1604 13.9656 18.8091 14.0275 18.5038 14.2037C18.3304 14.3039 18.1638 14.4705 17.8304 14.8039L14.5226 18.1117C13.9991 18.6352 13.8734 19.3698 13.75 20.0912C13.7176 20.2805 13.6854 20.4689 13.6462 20.6523C13.4987 21.3422 13.4249 21.6872 13.6198 21.8821C13.7004 21.9627 13.8066 21.9974 13.9523 21.9999L8.49802 22C5.6696 22 4.25538 22 3.3767 21.1205C2.49802 20.241 2.49802 18.8255 2.49802 15.9944V9.48836C2.49802 6.6573 2.49802 5.24177 3.3767 4.36227C4.01854 3.71984 4.94613 3.54667 6.50193 3.5H6.51575Z',
  d6: 'M6.50192 16H10.5019M6.50192 11H14.5019',
  d7: 'M10.0019 22H11.0019',
  d8: 'M6.50193 3.5C4.94613 3.54667 4.01854 3.71984 3.3767 4.36227C2.49802 5.24177 2.49802 6.6573 2.49802 9.48836V15.9944C2.49802 18.8255 2.49802 20.241 3.3767 21.1205C4.14555 21.8901 5.32441 21.9863 7.50193 21.9983M15.4941 3.5C17.0499 3.54667 17.9775 3.71984 18.6193 4.36228C19.498 5.24177 19.498 6.6573 19.498 9.48836V11',
  d9: 'M6.49802 3.75C6.49802 2.7835 7.28153 2 8.24802 2H13.748C14.7145 2 15.498 2.7835 15.498 3.75C15.498 4.7165 14.7145 5.5 13.748 5.5H8.24802C7.28153 5.5 6.49802 4.7165 6.49802 3.75Z',
  d10: 'M20.7617 14.8765C19.8563 13.8621 19.3131 13.9225 18.7095 14.1036C18.287 14.164 16.8384 15.8548 16.2348 16.3932C15.2438 17.3723 14.2483 18.3803 14.1826 18.5118C13.995 18.8168 13.8205 19.3572 13.736 19.961C13.579 20.8668 13.3526 21.8865 13.6394 21.9739C13.9261 22.0612 14.7258 21.8934 15.6312 21.7605C16.2348 21.6518 16.6573 21.531 16.9591 21.3499C17.3816 21.0963 18.1663 20.2026 19.5183 18.8741C20.3663 17.9813 21.1842 17.3644 21.4257 16.7606C21.6671 15.8548 21.305 15.3717 20.7617 14.8765Z',
  d11: 'M7 16H11',
  d12: 'M7 11H15',
  d13: 'M10 22H11',
  d14: 'M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836V15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.14362 21.8901 5.32248 21.9863 7.5 21.9983M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V11',
  d15: 'M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z',
  d16: 'M18.2751 14.4131C16.901 15.8124 14.2527 18.3112 14.2527 18.4861C14.0392 18.7828 13.853 19.3857 13.7281 20.2353C13.5712 21.0228 13.3833 21.7095 13.6032 21.9094C13.8231 22.1093 14.6509 21.9408 15.5269 21.7595C16.2264 21.6846 16.876 21.4347 17.2008 21.1848C17.6755 20.7648 20.8983 17.5116 21.2731 17.0868C21.5479 16.712 21.5729 16.0123 21.333 15.5875C21.1981 15.2877 20.3487 14.4881 20.0739 14.2632C19.5742 13.9633 18.8747 13.9134 18.2751 14.4131Z',
  d17: 'M5.08428 2.8529C5.17208 2.84079 5.24799 2.9125 5.24799 3.00113C5.24799 4.65798 6.59113 6.00113 8.24799 6.00113L13.748 6.00113C15.4048 6.00113 16.748 4.65798 16.748 3.00113C16.748 2.9125 16.8239 2.84079 16.9117 2.8529C17.8118 2.97705 18.5595 3.24236 19.1499 3.83332C19.7517 4.43567 20.0105 5.19403 20.1315 6.09477C20.248 6.96246 20.248 8.06574 20.248 9.43469L20.248 11.3469C20.248 11.6897 20.248 11.8612 20.1541 11.9499C20.0602 12.0387 19.8654 12.0278 19.4757 12.0059C18.7551 11.9655 18.0254 12.1319 17.3789 12.5052C16.94 12.7585 16.5789 13.1218 16.3431 13.3589L16.2985 13.4037L12.9316 16.7707C12.1965 17.5058 11.8881 18.3625 11.7273 18.9923C11.6496 19.2966 11.6107 19.4488 11.5283 19.512C11.5175 19.5202 11.5132 19.5232 11.5016 19.5302C11.4129 19.5842 11.2312 19.5622 10.8679 19.5182C10.7684 19.5062 10.6671 19.5 10.5644 19.5H9.56439C8.18368 19.5 7.06439 20.6193 7.06439 22C7.06439 22.365 7.06439 22.5475 6.99921 22.6295C6.98016 22.6534 6.96791 22.6653 6.94335 22.6835C6.85929 22.746 6.7127 22.7412 6.41953 22.7317C5.93246 22.7158 5.49556 22.6869 5.10615 22.6345C4.20591 22.5133 3.44798 22.2542 2.84609 21.6517C2.2443 21.0494 1.98549 20.291 1.8645 19.3903C1.74795 18.5226 1.74797 17.4194 1.74799 16.0505V16.0504L1.74799 9.43465V9.43463C1.74797 8.06572 1.74795 6.96243 1.8645 6.09477C1.98549 5.19403 2.2443 4.43567 2.84609 3.83332C3.43651 3.24236 4.18417 2.97705 5.08428 2.8529ZM6.24994 10.9999C6.24994 10.5857 6.58573 10.2499 6.99994 10.2499L14.9999 10.2499C15.4142 10.2499 15.7499 10.5857 15.7499 10.9999C15.7499 11.4142 15.4142 11.7499 14.9999 11.7499L6.99994 11.7499C6.58573 11.7499 6.24994 11.4142 6.24994 10.9999ZM6.24994 15.9999C6.24994 15.5857 6.58573 15.2499 6.99994 15.2499H10.9999C11.4142 15.2499 11.7499 15.5857 11.7499 15.9999C11.7499 16.4142 11.4142 16.7499 10.9999 16.7499H6.99994C6.58573 16.7499 6.24994 16.4142 6.24994 15.9999Z',
  d18: 'M6.49799 3C6.49799 2.0335 7.28149 1.25 8.24799 1.25H13.748C14.7145 1.25 15.498 2.0335 15.498 3C15.498 3.9665 14.7145 4.75 13.748 4.75H8.24799C7.28149 4.75 6.49799 3.9665 6.49799 3Z',
  d19: 'M18.1289 13.8042C18.8315 13.3986 19.6971 13.3986 20.3997 13.8042C20.6613 13.9553 20.9553 14.2499 21.2285 14.5235C21.5021 14.7967 21.7967 15.0907 21.9478 15.3523C22.3534 16.0549 22.3534 16.9205 21.9478 17.6231C21.7967 17.8847 21.562 18.119 21.2883 18.3921L17.9206 21.7597C17.4553 22.225 16.8934 22.4424 16.3886 22.5713C16.1366 22.6356 15.8834 22.6815 15.6537 22.7212C15.3477 22.7867 14.35 22.9797 14.0968 22.9958C13.8178 23.0136 13.4133 22.9862 13.0896 22.6624C12.7658 22.3387 12.7384 21.9342 12.7562 21.6552C12.7723 21.402 12.9653 20.4043 13.0308 20.0983C13.0705 19.8686 13.1164 19.6154 13.1807 19.3634C13.3096 18.8586 13.527 18.2967 13.9923 17.8314L17.3599 14.4637C17.6331 14.19 17.8673 13.9553 18.1289 13.8042Z',
  d20: 'M8.56445 22C8.56445 21.4477 9.01217 21 9.56445 21H10.5645C11.1167 21 11.5645 21.4477 11.5645 22C11.5645 22.5523 11.1167 23 10.5645 23H9.56445C9.01217 23 8.56445 22.5523 8.56445 22Z',
  d21: 'M5.24799 3.00113C5.24799 2.9125 5.17208 2.84079 5.08428 2.8529C4.18417 2.97705 3.43651 3.24236 2.84609 3.83332C2.2443 4.43567 1.98549 5.19403 1.8645 6.09477C1.74795 6.96243 1.74797 8.06572 1.74799 9.43463V16.0504C1.74797 17.4193 1.74795 18.5226 1.8645 19.3903C1.98549 20.291 2.2443 21.0494 2.84609 21.6517C3.44798 22.2542 4.20591 22.5133 5.10615 22.6345C5.49579 22.6869 5.93296 22.7158 6.42037 22.7317C6.71283 22.7412 6.85907 22.746 6.94301 22.6838C6.96789 22.6654 6.9803 22.6533 6.99953 22.6291C7.06442 22.5472 7.06442 22.3652 7.06442 22.0011C7.06442 20.6204 8.18371 19.5011 9.56442 19.5011H10.5644C10.6671 19.5011 10.7684 19.5073 10.8679 19.5193C11.2312 19.5633 11.4129 19.5853 11.5017 19.5313C11.5132 19.5243 11.5176 19.5213 11.5283 19.5131C11.6108 19.4499 11.6496 19.2977 11.7273 18.9934C11.8881 18.3636 12.1965 17.5069 12.9316 16.7718L16.2986 13.4048L16.3432 13.36C16.5789 13.1229 16.9401 12.7596 17.3789 12.5063C18.0254 12.133 18.7551 11.9666 19.4757 12.007C19.8654 12.0289 20.0602 12.0398 20.1541 11.951C20.248 11.8623 20.248 11.6908 20.248 11.348V9.43469C20.248 8.06574 20.248 6.96246 20.1315 6.09477C20.0105 5.19403 19.7517 4.43567 19.1499 3.83332C18.5595 3.24236 17.8118 2.97705 16.9117 2.8529C16.8239 2.84079 16.748 2.9125 16.748 3.00113C16.748 4.65798 15.4048 6.00113 13.748 6.00113H8.24799C6.59113 6.00113 5.24799 4.65798 5.24799 3.00113Z',
  d22: 'M6.24994 11C6.24994 10.5858 6.58573 10.25 6.99994 10.25H14.9999C15.4142 10.25 15.7499 10.5858 15.7499 11C15.7499 11.4142 15.4142 11.75 14.9999 11.75H6.99994C6.58573 11.75 6.24994 11.4142 6.24994 11ZM6.24994 16C6.24994 15.5858 6.58573 15.25 6.99994 15.25H10.9999C11.4142 15.25 11.7499 15.5858 11.7499 16C11.7499 16.4142 11.4142 16.75 10.9999 16.75H6.99994C6.58573 16.75 6.24994 16.4142 6.24994 16Z',
  d23: 'M15 3.5H19.5V12M7 3.5H2.5V22H7',
  d24: 'M15 2H7V5H15V2Z',
  d25: 'M6.5 16H11.5M6.5 11H15.5',
  d26: 'M9 22H11',
  d27: 'M16.0017 21.9998H13.501V19.4998L18.9955 14.0068C18.9994 14.0029 19.0058 14.0029 19.0097 14.0068L21.4962 16.4927C21.5002 16.4966 21.5002 16.5029 21.4962 16.5068L16.0017 21.9998Z',
  d28: 'M14.75 20.25V22.75H17.25L22.75 17.25L20.25 14.75L14.75 20.25Z',
  d29: 'M14.5 1.25H6.5V4.75H14.5V1.25Z',
  d30: 'M2 3H5.25L5.25 6H15.75V3H19C19.4142 3 19.75 3.33579 19.75 3.75V13.1289L13.25 19.75H9V22.75L2 22.75C1.58579 22.75 1.25 22.4142 1.25 22V3.75C1.25 3.33579 1.58579 3 2 3ZM15 11.75H6V10.25H15V11.75ZM11 16.75H6V15.25H11V16.75Z',
  d31: 'M12.5 22.75H10.5V21.25H12.5V22.75Z',
};

export const IconTaskEdit01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-stroke-rounded IconTaskEdit01StrokeRounded"
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-duotone-rounded IconTaskEdit01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.93" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-twotone-rounded IconTaskEdit01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-solid-rounded IconTaskEdit01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconTaskEdit01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-bulk-rounded IconTaskEdit01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconTaskEdit01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-stroke-sharp IconTaskEdit01StrokeSharp"
    >
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d27} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskEdit01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-edit-01-solid-sharp IconTaskEdit01SolidSharp"
    >
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskEdit01: TheIconSelfPack = {
  name: 'TaskEdit01',
  StrokeRounded: IconTaskEdit01StrokeRounded,
  DuotoneRounded: IconTaskEdit01DuotoneRounded,
  TwotoneRounded: IconTaskEdit01TwotoneRounded,
  SolidRounded: IconTaskEdit01SolidRounded,
  BulkRounded: IconTaskEdit01BulkRounded,
  StrokeSharp: IconTaskEdit01StrokeSharp,
  SolidSharp: IconTaskEdit01SolidSharp,
};