import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13 2.04725C12.6711 2.016 12.3375 2 12 2C6.47778 2 2 6.28357 2 11.5667C2 14.1051 3.03333 16.4115 4.71889 18.1231C5.09 18.5 5.33778 19.0148 5.23778 19.5448C5.07275 20.4112 4.69874 21.2194 4.15111 21.893C5.59195 22.161 7.09014 21.9197 8.37499 21.2364C8.82918 20.9949 9.05627 20.8741 9.21653 20.8496C9.37678 20.8251 9.60633 20.8682 10.0654 20.9545C10.7032 21.0742 11.3507 21.1343 12 21.1334C16.83 21.1334 21.0653 17.8565 22 13.5',
  d2: 'M16.5312 5.35997V3.95232C16.5312 2.87408 17.4127 2 18.5 2C18.9887 2 19.4359 2.1766 19.7801 2.46895M17.8437 11H19.1563C20.1777 11 20.6884 11 21.0749 10.7951C21.3802 10.6333 21.6302 10.3854 21.7934 10.0827C22 9.6993 22 9.19286 22 8.17998C22 7.16711 22 6.66067 21.7934 6.2773C21.6302 5.9746 21.3802 5.72668 21.0749 5.56488C20.6884 5.35997 20.1777 5.35997 19.1563 5.35997H17.8437C16.8223 5.35997 16.3116 5.35997 15.9251 5.56488C15.6198 5.72668 15.3698 5.9746 15.2066 6.2773C15 6.66067 15 7.16711 15 8.17998C15 9.19286 15 9.6993 15.2066 10.0827C15.3698 10.3854 15.6198 10.6333 15.9251 10.7951C16.3116 11 16.8223 11 17.8437 11Z',
  d3: 'M11.9955 12H12.0045M8 12H8.00897',
  d4: 'M12 21.1334C17.5222 21.1334 22 16.8499 22 11.5667C22 11.0137 21.9509 10.4717 21.8568 9.94436C21.8382 9.99228 21.8171 10.038 21.7934 10.0821C21.6302 10.3848 21.3802 10.6327 21.0749 10.7945C20.6884 10.9994 20.1777 10.9994 19.1562 10.9994H17.8438C16.8224 10.9994 16.3116 10.9994 15.9251 10.7945C15.6198 10.6327 15.3698 10.3848 15.2066 10.0821C15 9.69871 15 9.19227 15 8.17939C15 7.16651 15 6.66008 15.2066 6.27671C15.3698 5.97401 15.6198 5.72608 15.9251 5.56429C16.3116 5.35937 16.8223 5.35938 17.8438 5.35938H19.1562C19.32 5.35938 19.4707 5.35938 19.6098 5.36022C17.7756 3.30392 15.0467 2 12 2C6.47778 2 2 6.28357 2 11.5667C2 14.1051 3.03333 16.4115 4.71889 18.1231C5.09 18.5 5.33778 19.0148 5.23778 19.5448C5.07275 20.4112 4.69874 21.2194 4.15111 21.893C5.59195 22.161 7.09014 21.9197 8.37499 21.2364C8.82918 20.9949 9.05627 20.8741 9.21653 20.8496C9.37678 20.8251 9.60633 20.8682 10.0654 20.9545C10.7032 21.0742 11.3507 21.1343 12 21.1334Z',
  d5: 'M15.7813 3.95232C15.7813 2.45396 17.0044 1.25 18.5 1.25C19.1725 1.25 19.7904 1.49372 20.2656 1.89733C20.5813 2.16548 20.6198 2.63879 20.3517 2.95449C20.0835 3.27019 19.6102 3.30873 19.2945 3.04058C19.0813 2.85948 18.8049 2.75 18.5 2.75C17.821 2.75 17.2813 3.29421 17.2813 3.95232V4.61162C17.4472 4.60996 17.6244 4.60996 17.8129 4.60997H19.1871C19.6715 4.60996 20.0813 4.60994 20.4167 4.63824C20.7683 4.66789 21.1063 4.73264 21.4262 4.90222C21.8618 5.13313 22.2197 5.48753 22.4536 5.92145C22.6257 6.24083 22.6914 6.57833 22.7214 6.92848C22.75 7.2619 22.75 7.66893 22.75 8.14877V8.2112C22.75 8.69104 22.75 9.09807 22.7214 9.43149C22.6914 9.78163 22.6257 10.1191 22.4536 10.4385C22.2197 10.8724 21.8618 11.2268 21.4262 11.4578C21.1063 11.6273 20.7683 11.6921 20.4167 11.7217C20.0813 11.75 19.6715 11.75 19.1871 11.75H19.1871H17.8129H17.8129C17.3285 11.75 16.9187 11.75 16.5833 11.7217C16.2317 11.6921 15.8937 11.6273 15.5738 11.4578C15.1382 11.2268 14.7803 10.8724 14.5464 10.4385C14.3743 10.1191 14.3086 9.78163 14.2786 9.43149C14.25 9.09807 14.25 8.69105 14.25 8.21122V8.21119V8.14878V8.14875C14.25 7.66892 14.25 7.2619 14.2786 6.92848C14.3086 6.57833 14.3743 6.24083 14.5464 5.92145C14.7803 5.48753 15.1382 5.13313 15.5738 4.90222C15.6421 4.86599 15.7113 4.83455 15.7813 4.80722V3.95232Z',
  d6: 'M14.7494 1.68598C14.6821 1.56162 14.5102 1.5278 14.1664 1.46014C13.4659 1.32232 12.7413 1.25 12 1.25C6.09523 1.25 1.25 5.83838 1.25 11.5667C1.25 14.3144 2.36972 16.8065 4.18451 18.6494C4.45227 18.9213 4.53937 19.2 4.50088 19.4052C4.35863 20.1513 4.03697 20.8445 3.56917 21.4199C3.40224 21.6252 3.35586 21.9033 3.44713 22.1517C3.5384 22.4 3.75381 22.5819 4.01396 22.6303C5.62504 22.93 7.29542 22.66 8.72714 21.8986C8.96068 21.7744 9.11322 21.6935 9.22775 21.6391C9.25931 21.6219 9.34334 21.5907 9.42696 21.6036C9.53909 21.6189 9.68979 21.647 9.92698 21.6916C10.6103 21.8199 11.3041 21.8843 12 21.8834C17.3679 21.8834 21.8601 18.0915 22.6327 13.0984L22.6404 13.0479C22.6734 12.7955 22.4364 12.6269 22.2087 12.7408L22.1287 12.7831C21.5557 13.0868 20.9907 13.1786 20.5428 13.2164C20.1435 13.2501 19.6796 13.2501 19.231 13.25H17.769C17.3204 13.2501 16.8565 13.2501 16.4573 13.2164C16.0093 13.1786 15.4443 13.0868 14.8713 12.7831C14.1749 12.4139 13.6014 11.8466 13.226 11.1502C12.9163 10.5757 12.8225 10.0082 12.7841 9.55968C12.7499 9.16133 12.75 8.54863 12.75 8.1047C12.75 7.66079 12.7499 7.19863 12.7841 6.80029C12.8225 6.35174 12.9163 5.7843 13.226 5.20974C13.4879 4.72386 13.8463 4.30081 14.2755 3.96406C14.2791 3.96123 14.2813 3.9569 14.2813 3.95232C14.2813 3.39458 14.3897 2.86394 14.5861 2.37917C14.7398 1.99995 14.8166 1.81033 14.7494 1.68598ZM7.49609 11C6.94381 11 6.49609 11.4477 6.49609 12C6.49609 12.5523 6.94381 13 7.49609 13H7.50507C8.05735 13 8.50507 12.5523 8.50507 12C8.50507 11.4477 8.05735 11 7.50507 11H7.49609ZM11.4916 11C10.9393 11 10.4916 11.4477 10.4916 12C10.4916 12.5523 10.9393 13 11.4916 13H11.5006C12.0529 13 12.5006 12.5523 12.5006 12C12.5006 11.4477 12.0529 11 11.5006 11H11.4916Z',
  d7: 'M14.1664 1.46014C14.5102 1.5278 14.6821 1.56162 14.7494 1.68598C14.8166 1.81033 14.7398 1.99995 14.5861 2.37917C14.3897 2.86394 14.2813 3.39458 14.2813 3.95232C14.2813 3.9569 14.2791 3.96123 14.2755 3.96406C13.8463 4.30081 13.4879 4.72386 13.226 5.20974C12.9163 5.7843 12.8225 6.35174 12.7841 6.80029C12.7499 7.19863 12.75 7.66079 12.75 8.1047C12.75 8.54863 12.7499 9.16133 12.7841 9.55968C12.8225 10.0082 12.9163 10.5757 13.226 11.1502C13.6014 11.8466 14.1749 12.4139 14.8713 12.7831C15.4443 13.0868 16.0093 13.1786 16.4573 13.2164C16.8565 13.2501 17.3204 13.2501 17.769 13.25H19.231C19.6796 13.2501 20.1435 13.2501 20.5428 13.2164C20.9907 13.1786 21.5557 13.0868 22.1287 12.7831C22.1799 12.7559 22.2056 12.7423 22.2087 12.7408C22.4364 12.6269 22.6734 12.7955 22.6404 13.0479C22.6399 13.0514 22.6375 13.0671 22.6327 13.0984C21.8601 18.0915 17.3679 21.8834 12 21.8834C11.3041 21.8843 10.6103 21.8199 9.92698 21.6916C9.68979 21.647 9.53909 21.6189 9.42696 21.6036C9.34334 21.5907 9.25931 21.6219 9.22775 21.6391C9.11322 21.6935 8.96068 21.7744 8.72714 21.8986C7.29542 22.66 5.62504 22.93 4.01396 22.6303C3.75381 22.5819 3.5384 22.4 3.44713 22.1517C3.35586 21.9033 3.40224 21.6252 3.56917 21.4199C4.03697 20.8445 4.35863 20.1513 4.50088 19.4052C4.53937 19.2 4.45227 18.9213 4.18451 18.6494C2.36972 16.8065 1.25 14.3144 1.25 11.5667C1.25 5.83838 6.09523 1.25 12 1.25C12.7413 1.25 13.4659 1.32232 14.1664 1.46014Z',
  d8: 'M6.49609 12C6.49609 11.4477 6.94381 11 7.49609 11H7.50507C8.05735 11 8.50507 11.4477 8.50507 12C8.50507 12.5523 8.05735 13 7.50507 13H7.49609C6.94381 13 6.49609 12.5523 6.49609 12ZM10.4916 12C10.4916 11.4477 10.9393 11 11.4916 11H11.5006C12.0529 11 12.5006 11.4477 12.5006 12C12.5006 12.5523 12.0529 13 11.5006 13H11.4916C10.9393 13 10.4916 12.5523 10.4916 12Z',
  d9: 'M16.5015 5.49272V3.99542C16.5015 2.89284 17.3967 1.99902 18.501 1.99902C19.0982 1.99902 19.6343 2.26043 20.0007 2.67489M15.0018 5.49272H22.0002V10.9828H15.0018V5.49272Z',
  d10: 'M11.9979 11.981H12.0069M8.0033 11.981H8.01226',
  d11: 'M14.0071 2.17637C13.1321 2.027 12.2171 1.98768 11.2791 2.07201C5.56487 2.37337 1.56311 7.16629 2.0381 12.433C2.48093 15.6827 3.76546 16.8989 5.02307 18.1725L3.96309 21.9884C3.96083 21.9965 3.96913 22.0036 3.97685 22.0001L7.98518 20.1872C9.57085 20.9291 11.1712 21.0539 13.0633 20.8838C17.3228 20.5008 20.6085 17.7034 21.6537 14.0149',
  d12: 'M15.75 4C15.75 2.48122 16.9812 1.25 18.5 1.25C19.3215 1.25 20.0595 1.61112 20.5623 2.18079L19.4377 3.17339C19.2076 2.91264 18.8732 2.75 18.5 2.75C17.8096 2.75 17.25 3.30964 17.25 4V4.75H22.75V11.75H14.25V4.75H15.75V4Z',
  d13: 'M14.5309 3.5C14.6129 2.84299 14.8541 2.23546 15.2149 1.7173C14.1982 1.4135 13.1179 1.25 12 1.25C6.10029 1.25 1.25 5.80369 1.25 11.5C1.25 14.2189 2.36071 16.6855 4.16134 18.5143L3.25001 22.75L8.01735 21.0233C9.25046 21.4925 10.5948 21.75 12 21.75C17.3715 21.75 21.8731 17.9752 22.6361 13H13V3.5H14.5309ZM7.00897 11H5V13H7.00897V11ZM11.0045 11H8.99551V13H11.0045V11Z',
};

export const IconBubbleChatUnlockStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-stroke-rounded IconBubbleChatUnlockStrokeRounded"
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

export const IconBubbleChatUnlockDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-duotone-rounded IconBubbleChatUnlockDuotoneRounded"
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

export const IconBubbleChatUnlockTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-twotone-rounded IconBubbleChatUnlockTwotoneRounded"
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

export const IconBubbleChatUnlockSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-solid-rounded IconBubbleChatUnlockSolidRounded"
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

export const IconBubbleChatUnlockBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-bulk-rounded IconBubbleChatUnlockBulkRounded"
    >
      <path 
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

export const IconBubbleChatUnlockStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-stroke-sharp IconBubbleChatUnlockStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconBubbleChatUnlockSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bubble-chat-unlock-solid-sharp IconBubbleChatUnlockSolidSharp"
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

export const iconPackOfBubbleChatUnlock: TheIconSelfPack = {
  name: 'BubbleChatUnlock',
  StrokeRounded: IconBubbleChatUnlockStrokeRounded,
  DuotoneRounded: IconBubbleChatUnlockDuotoneRounded,
  TwotoneRounded: IconBubbleChatUnlockTwotoneRounded,
  SolidRounded: IconBubbleChatUnlockSolidRounded,
  BulkRounded: IconBubbleChatUnlockBulkRounded,
  StrokeSharp: IconBubbleChatUnlockStrokeSharp,
  SolidSharp: IconBubbleChatUnlockSolidSharp,
};