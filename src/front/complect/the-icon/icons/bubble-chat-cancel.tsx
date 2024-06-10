import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 2.01175C12.3344 2.00395 12.1677 2 12 2C6.47778 2 2 6.28357 2 11.5667C2 14.1051 3.03333 16.4115 4.71889 18.1231C5.09 18.5 5.33778 19.0148 5.23778 19.5448C5.07275 20.4112 4.69874 21.2194 4.15111 21.893C5.59195 22.161 7.09014 21.9197 8.37499 21.2364C8.82918 20.9949 9.05627 20.8741 9.21653 20.8496C9.37678 20.8251 9.60633 20.8682 10.0654 20.9545C10.7032 21.0742 11.3507 21.1343 12 21.1334C17.5222 21.1334 22 16.8499 22 11.5667C22 11.3765 21.9942 11.1875 21.9827 11',
  d2: 'M16 2L19 5M19 5L22 8M19 5L22 2M19 5L16 8',
  d3: 'M11.9955 12H12.0045M15.991 12H16M8 12H8.00897',
  d4: 'M22 11.5667C22 16.8499 17.5222 21.1334 12 21.1334C11.3507 21.1343 10.7032 21.0742 10.0654 20.9545C9.60633 20.8682 9.37678 20.8251 9.21653 20.8496C9.05627 20.8741 8.82918 20.9949 8.37499 21.2364C7.09014 21.9197 5.59195 22.161 4.15111 21.893C4.69874 21.2194 5.07275 20.4112 5.23778 19.5448C5.33778 19.0148 5.09 18.5 4.71889 18.1231C3.03333 16.4115 2 14.1051 2 11.5667C2 6.28357 6.47778 2 12 2C17.5222 2 22 6.28357 22 11.5667Z',
  d5: 'M15.1679 1.41789C15.5584 1.02737 16.1916 1.02737 16.5821 1.41789L18.875 3.71079L21.1679 1.41789C21.5584 1.02737 22.1916 1.02737 22.5821 1.41789C22.9726 1.80842 22.9726 2.44158 22.5821 2.83211L20.2892 5.125L22.5821 7.41789C22.9726 7.80842 22.9726 8.44158 22.5821 8.83211C22.1916 9.22263 21.5584 9.22263 21.1679 8.83211L18.875 6.53921L16.5821 8.83211C16.1916 9.22263 15.5584 9.22263 15.1679 8.83211C14.7774 8.44158 14.7774 7.80842 15.1679 7.41789L17.4608 5.125L15.1679 2.83211C14.7774 2.44158 14.7774 1.80842 15.1679 1.41789Z',
  d6: 'M13.2898 1.53101C13.3691 1.61601 13.3711 1.79517 13.3752 2.15348C13.3823 2.78376 13.6263 3.41185 14.1072 3.89276L14.9152 4.70073C15.1152 4.90073 15.2152 5.00073 15.2152 5.12499C15.2152 5.24926 15.1152 5.34926 14.9152 5.54926L14.1072 6.35723C13.1309 7.33354 13.1309 8.91645 14.1072 9.89276C15.0835 10.8691 16.6665 10.8691 17.6428 9.89276L18.4507 9.08479C18.6507 8.88479 18.7507 8.78479 18.875 8.78479C18.9993 8.78479 19.0993 8.88479 19.2993 9.08478L19.2993 9.08479L20.1072 9.89276C20.5921 10.3776 21.2266 10.6217 21.8621 10.625C22.2352 10.6269 22.4218 10.6278 22.5082 10.7108C22.5946 10.7939 22.6013 10.94 22.6146 11.2324C22.6215 11.3846 22.625 11.5378 22.625 11.6917C22.625 17.42 17.7798 22.0084 11.875 22.0084C11.1791 22.0093 10.4853 21.9449 9.80198 21.8166C9.56479 21.772 9.41409 21.7439 9.30196 21.7286C9.21834 21.7157 9.13431 21.7469 9.10275 21.7641C8.98822 21.8185 8.83568 21.8994 8.60214 22.0236C7.17042 22.785 5.50004 23.055 3.88896 22.7553C3.62881 22.7069 3.4134 22.525 3.32213 22.2766C3.23086 22.0283 3.27724 21.7502 3.44417 21.5448C3.91197 20.9695 4.23363 20.2763 4.37588 19.5302C4.41437 19.325 4.32727 19.0463 4.05951 18.7744C2.24472 16.9315 1.125 14.4394 1.125 11.6917C1.125 5.96338 5.97023 1.37499 11.875 1.37499C12.1822 1.37499 12.4866 1.38742 12.7876 1.41178C13.0695 1.43459 13.2105 1.446 13.2898 1.53101ZM7.875 11.125C7.32272 11.125 6.875 11.5727 6.875 12.125C6.875 12.6773 7.32272 13.125 7.875 13.125H7.88397C8.43626 13.125 8.88397 12.6773 8.88397 12.125C8.88397 11.5727 8.43626 11.125 7.88397 11.125H7.875ZM11.8705 11.125C11.3182 11.125 10.8705 11.5727 10.8705 12.125C10.8705 12.6773 11.3182 13.125 11.8705 13.125H11.8795C12.4318 13.125 12.8795 12.6773 12.8795 12.125C12.8795 11.5727 12.4318 11.125 11.8795 11.125H11.8705Z',
  d7: 'M13.3752 2.15348C13.3711 1.79517 13.3691 1.61602 13.2898 1.53101C13.2105 1.44601 13.0695 1.4346 12.7876 1.41178C12.4866 1.38742 12.1822 1.375 11.875 1.375C5.97023 1.375 1.125 5.96338 1.125 11.6917C1.125 14.4394 2.24472 16.9315 4.05951 18.7744C4.32727 19.0463 4.41437 19.325 4.37588 19.5302C4.23363 20.2763 3.91197 20.9695 3.44417 21.5449C3.27724 21.7502 3.23086 22.0283 3.32213 22.2767C3.4134 22.525 3.62881 22.7069 3.88896 22.7553C5.50004 23.055 7.17042 22.785 8.60214 22.0236C8.83568 21.8994 8.98822 21.8185 9.10275 21.7641C9.13431 21.7469 9.21834 21.7157 9.30196 21.7286C9.41409 21.7439 9.56479 21.772 9.80198 21.8166C10.4853 21.9449 11.1791 22.0093 11.875 22.0084C17.7798 22.0084 22.625 17.42 22.625 11.6917C22.625 11.5378 22.6215 11.3846 22.6146 11.2324C22.6013 10.9401 22.5946 10.7939 22.5082 10.7109C22.4218 10.6278 22.2352 10.6269 21.8621 10.625C21.2266 10.6217 20.5921 10.3776 20.1072 9.89277L19.2993 9.0848C19.0993 8.8848 18.9993 8.7848 18.875 8.7848C18.7507 8.7848 18.6507 8.8848 18.4507 9.0848L17.6428 9.89277C16.6665 10.8691 15.0835 10.8691 14.1072 9.89277C13.1309 8.91646 13.1309 7.33354 14.1072 6.35723L14.9152 5.54926C15.1152 5.34926 15.2152 5.24926 15.2152 5.125C15.2152 5.00074 15.1152 4.90074 14.9152 4.70074L14.1072 3.89277C13.6263 3.41186 13.3823 2.78376 13.3752 2.15348Z',
  d8: 'M6.875 12.125C6.875 11.5727 7.32272 11.125 7.875 11.125H7.88397C8.43626 11.125 8.88397 11.5727 8.88397 12.125C8.88397 12.6773 8.43626 13.125 7.88397 13.125H7.875C7.32272 13.125 6.875 12.6773 6.875 12.125ZM10.8705 12.125C10.8705 11.5727 11.3182 11.125 11.8705 11.125H11.8795C12.4318 11.125 12.8795 11.5727 12.8795 12.125C12.8795 12.6773 12.4318 13.125 11.8795 13.125H11.8705C11.3182 13.125 10.8705 12.6773 10.8705 12.125Z',
  d9: 'M15.9978 2L18.9978 5M18.9978 5L21.9978 8M18.9978 5L21.9978 2M18.9978 5L15.9978 8',
  d10: 'M11.9933 12H12.0023M15.9888 12H15.9978M7.9978 12H8.00677',
  d11: 'M21.9978 11.5041C21.9978 16.7531 17.5216 21.0082 12 21.0082C10.5758 21.0082 9.22111 20.7251 7.99487 20.2149L4.019 21.9991C4.0113 22.0026 4.00305 21.9955 4.00525 21.9874L5.00624 18.2923C3.16355 16.5119 2.0022 14.1818 2.0022 11.5041C2.0022 6.25513 6.47837 2 12 2',
  d12: 'M17.6287 4.95711L15.3358 2.66421L16.75 1.25L19.0429 3.54289L21.3358 1.25L22.75 2.66421L20.4571 4.95711L22.75 7.25L21.3358 8.66421L19.0429 6.37132L16.75 8.66421L15.3358 7.25L17.6287 4.95711Z',
  d13: 'M12 1.25C12.9183 1.25 13.8112 1.36033 14.6644 1.56813L13.5684 2.66416L15.8613 4.95705L13.5684 7.24994L16.7503 10.4319L19.0432 8.13903L21.3361 10.4319L22.4961 9.272C22.6623 9.98847 22.75 10.7339 22.75 11.5C22.75 17.1963 17.8997 21.75 12 21.75C10.5948 21.75 9.25046 21.4925 8.01735 21.0233L3.25001 22.75L4.16134 18.5143C2.36071 16.6855 1.25 14.2189 1.25 11.5C1.25 5.80369 6.10029 1.25 12 1.25ZM9.00897 11H7V13H9.00897V11ZM13.0045 13V11H10.9955V13H13.0045Z',
};

export const IconBubbleChatCancelStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-stroke-rounded IconBubbleChatCancelStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBubbleChatCancelDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-duotone-rounded IconBubbleChatCancelDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
    </TheIconWrapper>
  );
};

export const IconBubbleChatCancelTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-twotone-rounded IconBubbleChatCancelTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconBubbleChatCancelSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-solid-rounded IconBubbleChatCancelSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconBubbleChatCancelBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-bulk-rounded IconBubbleChatCancelBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBubbleChatCancelStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-stroke-sharp IconBubbleChatCancelStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBubbleChatCancelSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-cancel-solid-sharp IconBubbleChatCancelSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfBubbleChatCancel: TheIconSelfPack = {
  name: 'BubbleChatCancel',
  StrokeRounded: IconBubbleChatCancelStrokeRounded,
  DuotoneRounded: IconBubbleChatCancelDuotoneRounded,
  TwotoneRounded: IconBubbleChatCancelTwotoneRounded,
  SolidRounded: IconBubbleChatCancelSolidRounded,
  BulkRounded: IconBubbleChatCancelBulkRounded,
  StrokeSharp: IconBubbleChatCancelStrokeSharp,
  SolidSharp: IconBubbleChatCancelSolidSharp,
};