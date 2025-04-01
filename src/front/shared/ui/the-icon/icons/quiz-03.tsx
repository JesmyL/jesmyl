import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5',
  d2: 'M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z',
  d3: 'M6.5 10L10.5 10',
  d4: 'M13.5 11C13.5 11 14 11 14.5 12C14.5 12 16.0882 9.5 17.5 9',
  d5: 'M6.5 16L10.5 16',
  d6: 'M13.5 17C13.5 17 14 17 14.5 18C14.5 18 16.0882 15.5 17.5 15',
  d7: 'M9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9766 3.72091 18.0511 3.54726 16.5 3.50024C16.4999 4.46667 15.7125 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.5 4.4665 7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836V15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22Z',
  d8: 'M7.49805 3C7.49805 2.0335 8.28155 1.25 9.24805 1.25H14.748C15.7145 1.25 16.498 2.0335 16.498 3C16.498 3.9665 15.7145 4.75 14.748 4.75H9.24805C8.28155 4.75 7.49805 3.9665 7.49805 3Z',
  d9: 'M6.08434 2.8529C6.17214 2.84079 6.24805 2.9125 6.24805 3.00113C6.24805 4.65798 7.59119 6.00113 9.24805 6.00113L14.748 6.00113C16.4049 6.00113 17.748 4.65798 17.748 3.00113C17.748 2.9125 17.824 2.84079 17.9118 2.8529C18.8119 2.97705 19.5595 3.24236 20.1499 3.83332C20.7517 4.43567 21.0105 5.19403 21.1315 6.09477C21.2481 6.96246 21.2481 8.06574 21.2481 9.43469L21.2481 16.0503C21.2481 17.4193 21.2481 18.5226 21.1315 19.3903C21.0105 20.291 20.7517 21.0494 20.1499 21.6517C19.5481 22.2542 18.7901 22.5133 17.8899 22.6345C17.0229 22.7512 15.9205 22.7512 14.553 22.7511L9.44311 22.7511C8.07557 22.7511 6.97322 22.7512 6.10621 22.6345C5.20597 22.5133 4.44804 22.2542 3.84615 21.6517C3.24436 21.0494 2.98555 20.291 2.86456 19.3903C2.74802 18.5226 2.74803 17.4194 2.74805 16.0505V16.0504L2.74805 9.43465V9.43463C2.74803 8.06572 2.74801 6.96243 2.86456 6.09477C2.98555 5.19403 3.24436 4.43567 3.84615 3.83332C4.43657 3.24236 5.18423 2.97705 6.08434 2.8529ZM5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L10.5 9.25C10.9142 9.25 11.25 9.58579 11.25 10C11.25 10.4142 10.9142 10.75 10.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10ZM6.5 15.25C6.08579 15.25 5.75 15.5858 5.75 16C5.75 16.4142 6.08579 16.75 6.5 16.75H10.5C10.9142 16.75 11.25 16.4142 11.25 16C11.25 15.5858 10.9142 15.25 10.5 15.25H6.5ZM18.207 8.74982C18.3453 9.14027 18.1408 9.56889 17.7504 9.70717C17.5266 9.78642 17.2463 9.96657 16.9302 10.2438C16.6219 10.5142 16.3184 10.8422 16.0465 11.1681C15.776 11.4924 15.5458 11.8036 15.3829 12.0343C15.3018 12.1492 15.1761 12.3377 15.1332 12.4021C14.9882 12.6302 14.7315 12.763 14.4616 12.7492C14.1917 12.7354 13.9501 12.5774 13.8292 12.3356C13.6237 11.9246 13.4522 11.7864 13.3965 11.7492L13.3914 11.7459L13.3839 11.7413C13.0248 11.6855 12.75 11.3749 12.75 11.0002C12.75 10.586 13.0858 10.2502 13.5 10.2502C13.859 10.2502 14.0392 10.3727 14.1894 10.4748L14.2285 10.5012C14.3162 10.5596 14.4046 10.6294 14.4928 10.7119C14.6135 10.5534 14.7485 10.3825 14.8947 10.2073C15.1963 9.84574 15.5546 9.455 15.9411 9.11601C16.3199 8.78384 16.7675 8.46399 17.2496 8.29323C17.6401 8.15495 18.0687 8.35937 18.207 8.74982ZM17.7504 15.7072C18.1408 15.5689 18.3453 15.1403 18.207 14.7498C18.0687 14.3594 17.6401 14.155 17.2496 14.2932C16.7675 14.464 16.3199 14.7838 15.9411 15.116C15.5546 15.455 15.1963 15.8457 14.8947 16.2073C14.7485 16.3825 14.6135 16.5534 14.4928 16.7119C14.4046 16.6294 14.3162 16.5596 14.2285 16.5012C14.2157 16.4926 14.2027 16.4838 14.1894 16.4748C14.0392 16.3727 13.859 16.2502 13.5 16.2502C13.0858 16.2502 12.75 16.586 12.75 17.0002C12.75 17.3749 13.0248 17.6855 13.3839 17.7413C13.3875 17.7434 13.3917 17.746 13.3965 17.7492C13.4522 17.7864 13.6237 17.9246 13.8292 18.3356C13.9501 18.5774 14.1917 18.7354 14.4616 18.7492C14.7315 18.763 14.9882 18.6302 15.1332 18.4021C15.1761 18.3377 15.3018 18.1492 15.3829 18.0343C15.5458 17.8036 15.776 17.4924 16.0465 17.1681C16.3184 16.8422 16.6219 16.5142 16.9302 16.2438C17.2463 15.9666 17.5266 15.7864 17.7504 15.7072Z',
  d10: 'M6.08434 2.8529C6.17214 2.84079 6.24805 2.9125 6.24805 3.00113C6.24805 4.65798 7.59119 6.00113 9.24805 6.00113H14.748C16.4049 6.00113 17.748 4.65798 17.748 3.00113C17.748 2.9125 17.824 2.84079 17.9118 2.8529C18.8119 2.97705 19.5595 3.24236 20.1499 3.83332C20.7517 4.43567 21.0105 5.19403 21.1315 6.09477C21.2481 6.96246 21.2481 8.06574 21.2481 9.43469V16.0503C21.2481 17.4193 21.2481 18.5226 21.1315 19.3903C21.0105 20.291 20.7517 21.0494 20.1499 21.6517C19.5481 22.2542 18.7901 22.5133 17.8899 22.6345C17.0229 22.7512 15.9205 22.7512 14.553 22.7511L9.44311 22.7511C8.07557 22.7511 6.97321 22.7512 6.10621 22.6345C5.20597 22.5133 4.44804 22.2542 3.84615 21.6517C3.24436 21.0494 2.98555 20.291 2.86456 19.3903C2.74801 18.5226 2.74803 17.4193 2.74805 16.0504V9.43465C2.74803 8.06574 2.74801 6.96244 2.86456 6.09477C2.98555 5.19403 3.24436 4.43567 3.84615 3.83332C4.43657 3.24236 5.18423 2.97705 6.08434 2.8529Z',
  d11: 'M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25L10.5 9.25C10.9142 9.25 11.25 9.58579 11.25 10C11.25 10.4142 10.9142 10.75 10.5 10.75L6.5 10.75C6.08579 10.75 5.75 10.4142 5.75 10Z',
  d12: 'M5.75 16C5.75 15.5858 6.08579 15.25 6.5 15.25L10.5 15.25C10.9142 15.25 11.25 15.5858 11.25 16C11.25 16.4142 10.9142 16.75 10.5 16.75H6.5C6.08579 16.75 5.75 16.4142 5.75 16Z',
  d13: 'M18.207 8.74982C18.3453 9.14027 18.1408 9.56889 17.7504 9.70717C17.5266 9.78642 17.2463 9.96657 16.9302 10.2438C16.6219 10.5142 16.3184 10.8422 16.0465 11.1681C15.776 11.4924 15.5458 11.8036 15.3829 12.0343C15.3018 12.1492 15.1761 12.3377 15.1332 12.4021C14.9882 12.6302 14.7315 12.763 14.4616 12.7492C14.1917 12.7354 13.9501 12.5774 13.8292 12.3356C13.6237 11.9246 13.4522 11.7864 13.3965 11.7492C13.3917 11.746 13.3875 11.7434 13.3839 11.7413C13.0248 11.6855 12.75 11.3749 12.75 11.0002C12.75 10.586 13.0858 10.2502 13.5 10.2502C13.8906 10.2502 14.0696 10.3952 14.2285 10.5012C14.3162 10.5596 14.4046 10.6294 14.4928 10.7119C14.6135 10.5534 14.7485 10.3825 14.8947 10.2073C15.1963 9.84574 15.5546 9.455 15.9411 9.11601C16.3199 8.78384 16.7675 8.46399 17.2496 8.29323C17.6401 8.15495 18.0687 8.35937 18.207 8.74982Z',
  d14: 'M18.207 14.7498C18.3453 15.1403 18.1408 15.5689 17.7504 15.7072C17.5266 15.7864 17.2463 15.9666 16.9302 16.2438C16.6219 16.5142 16.3184 16.8422 16.0465 17.1681C15.776 17.4924 15.5458 17.8036 15.3829 18.0343C15.3018 18.1492 15.1761 18.3377 15.1332 18.4021C14.9882 18.6302 14.7315 18.763 14.4616 18.7492C14.1917 18.7354 13.9501 18.5774 13.8292 18.3356C13.6237 17.9246 13.4522 17.7864 13.3965 17.7492C13.3917 17.746 13.3875 17.7434 13.3839 17.7413C13.0248 17.6855 12.75 17.3749 12.75 17.0002C12.75 16.586 13.0858 16.2502 13.5 16.2502C13.8906 16.2502 14.0696 16.3952 14.2285 16.5012C14.3162 16.5596 14.4046 16.6294 14.4928 16.7119C14.6135 16.5534 14.7485 16.3825 14.8947 16.2073C15.1963 15.8457 15.5546 15.455 15.9411 15.116C16.3199 14.7838 16.7675 14.464 17.2496 14.2932C17.6401 14.1549 18.0687 14.3594 18.207 14.7498Z',
  d15: 'M16.5 1.9993H7.5V5.4993H16.5V1.9993Z',
  d16: 'M7.5 3.4993H4V21.9993H20V3.4993H16.5',
  d17: 'M13.5 11L14.5 12L17.5 9',
  d18: 'M13.5 17L14.5 18L17.5 15',
  d19: 'M8 1.2493H16V4.7493H8V1.2493Z',
  d20: 'M6.75 2.7493L3.25 2.7493L3.25 22.7493L20.75 22.7493L20.75 2.7493L17.25 2.7493V5.99919L6.75 5.99919L6.75 2.7493ZM5.75 9.2493L11.25 9.2493V10.7493L5.75 10.7493V9.2493ZM14.5001 13.0601L18.5608 8.99941L17.5001 7.93875L14.5001 10.9388L13.5001 9.93875L12.4395 10.9994L14.5001 13.0601ZM5.75 15.2493L11.25 15.2493V16.7493H5.75V15.2493ZM14.5001 19.0601L18.5608 14.9994L17.5001 13.9388L14.5001 16.9388L13.5001 15.9388L12.4395 16.9994L14.5001 19.0601Z',
};

export const IconQuiz03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-stroke-rounded IconQuiz03StrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconQuiz03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-duotone-rounded IconQuiz03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconQuiz03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-twotone-rounded IconQuiz03TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconQuiz03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-solid-rounded IconQuiz03SolidRounded"
    >
      <path 
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

export const IconQuiz03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-bulk-rounded IconQuiz03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconQuiz03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-stroke-sharp IconQuiz03StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d16} 
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
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconQuiz03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="quiz-03-solid-sharp IconQuiz03SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfQuiz03: TheIconSelfPack = {
  name: 'Quiz03',
  StrokeRounded: IconQuiz03StrokeRounded,
  DuotoneRounded: IconQuiz03DuotoneRounded,
  TwotoneRounded: IconQuiz03TwotoneRounded,
  SolidRounded: IconQuiz03SolidRounded,
  BulkRounded: IconQuiz03BulkRounded,
  StrokeSharp: IconQuiz03StrokeSharp,
  SolidSharp: IconQuiz03SolidSharp,
};