import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 7.5L9.94202 9.23943C11.6572 10.2535 12.3428 10.2535 14.058 9.23943L17 7.5',
  d2: 'M12 19.5C11.0345 19.5 10.0691 19.4878 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52438C2.08114 6.45885 2.11382 4.92608 3.24495 3.79065C4.37608 2.65521 5.95033 2.61566 9.09882 2.53656C11.0393 2.48781 12.9607 2.48781 14.9012 2.53657C18.0497 2.61568 19.6239 2.65523 20.7551 3.79066C21.8862 4.92609 21.9189 6.45886 21.9842 9.52439C21.9947 10.0172 22 10.0086 22 10.5',
  d3: 'M16.5312 15.86V14.4523C16.5312 13.3741 17.4127 12.5 18.5 12.5C18.9887 12.5 19.4359 12.6766 19.7801 12.969M17.8438 21.5H19.1562C20.1777 21.5 20.6884 21.5 21.0749 21.2951C21.3802 21.1333 21.6302 20.8854 21.7934 20.5827C22 20.1993 22 19.6929 22 18.68C22 17.6671 22 17.1607 21.7934 16.7773C21.6302 16.4746 21.3802 16.2267 21.0749 16.0649C20.6884 15.86 20.1777 15.86 19.1562 15.86H17.8438C16.8223 15.86 16.3116 15.86 15.9251 16.0649C15.6198 16.2267 15.3698 16.4746 15.2066 16.7773C15 17.1607 15 17.6671 15 18.68C15 19.6929 15 20.1993 15.2066 20.5827C15.3698 20.8854 15.6198 21.1333 15.9251 21.2951C16.3116 21.5 16.8223 21.5 17.8438 21.5Z',
  d4: 'M3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52438C2.08114 6.45885 2.11382 4.92608 3.24495 3.79065C4.37608 2.65521 5.95033 2.61566 9.09882 2.53656C11.0393 2.48781 12.9607 2.48781 14.9012 2.53657C18.0497 2.61568 19.6239 2.65523 20.7551 3.79066C21.8862 4.92609 21.9189 6.45886 21.9842 9.52439C22.0053 10.5101 22.0053 11.4899 21.9842 12.4756C21.9445 14.3386 21.9168 15.6356 21.6474 16.6212C21.461 16.3564 21.2106 16.1468 20.9197 16.0177C20.5981 15.875 20.1904 15.875 19.375 15.875H17.625C16.8096 15.875 16.4019 15.875 16.0803 16.0177C15.6515 16.208 15.3108 16.573 15.1332 17.0325C15 17.377 15 17.8139 15 18.6875C15 18.9941 15 19.2469 15.0058 19.4608C14.9711 19.4617 14.9362 19.4626 14.9012 19.4634C12.9607 19.5122 11.0393 19.5122 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094Z',
  d5: 'M9.07999 1.7868C11.033 1.73773 12.967 1.73773 14.92 1.78681L14.9782 1.78827C16.503 1.82656 17.73 1.85737 18.7133 2.02862C19.7428 2.20791 20.5795 2.55179 21.2864 3.26134C21.9903 3.96792 22.3324 4.79261 22.5082 5.80542C22.6757 6.76979 22.7012 7.96683 22.7328 9.44967L22.7341 9.5084C22.7553 10.5047 22.7553 11.4953 22.7341 12.4916L22.7251 12.8002C22.7218 12.9109 22.6312 12.9989 22.5205 12.9989C22.4373 12.9989 22.3627 12.9483 22.3289 12.8722C21.6559 11.3613 20.0997 10.25 18.5 10.25C16.3735 10.25 14.5 11.9318 14.5 14.1875C14.5 14.2822 14.4534 14.3704 14.3779 14.4277C13.769 14.89 13.3071 15.5163 13.0346 16.2211C12.8502 16.6981 12.7946 17.1511 12.7712 17.5186C12.75 17.8523 12.75 18.2409 12.75 18.6292V18.7459C12.75 18.962 12.7615 19.2991 12.7754 19.6131C12.7887 19.9137 12.7954 20.064 12.707 20.1566C12.6185 20.2492 12.4702 20.2494 12.1736 20.2499C11.144 20.2514 10.1147 20.2392 9.07999 20.2132L9.02177 20.2117C7.49697 20.1735 6.27001 20.1426 5.2867 19.9714C4.2572 19.7921 3.42048 19.4482 2.71362 18.7387C2.00972 18.0321 1.66764 17.2074 1.49176 16.1946C1.32429 15.2302 1.29879 14.0332 1.26719 12.5504L1.26594 12.4916C1.24469 11.4953 1.24469 10.5047 1.26593 9.50839L1.26719 9.44965C1.29878 7.9668 1.32429 6.76978 1.49176 5.8054C1.66764 4.7926 2.00971 3.9679 2.71362 3.26132C3.42048 2.55177 4.2572 2.20789 5.2867 2.0286C6.27002 1.85735 7.497 1.82655 9.02182 1.78826L9.07999 1.7868ZM7.38182 6.85439C7.02527 6.64358 6.56533 6.76174 6.35452 7.11829C6.14371 7.47485 6.26186 7.93479 6.61841 8.1456L9.56043 9.88503C10.4313 10.3999 11.1827 10.75 12.0001 10.75C12.8175 10.75 13.569 10.3999 14.4398 9.88503L17.3818 8.1456C17.7384 7.93479 17.8565 7.47485 17.6457 7.11829C17.4349 6.76174 16.975 6.64358 16.6184 6.85439L13.6764 8.59382C12.832 9.09304 12.3831 9.25 12.0001 9.25C11.6171 9.25 11.1682 9.09304 10.3238 8.59382L7.38182 6.85439Z',
  d6: 'M15.7813 14.4523C15.7813 12.954 17.0044 11.75 18.5 11.75C19.1725 11.75 19.7904 11.9937 20.2656 12.3973C20.5813 12.6655 20.6198 13.1388 20.3517 13.4545C20.0835 13.7702 19.6102 13.8087 19.2945 13.5406C19.0813 13.3595 18.8049 13.25 18.5 13.25C17.821 13.25 17.2813 13.7942 17.2813 14.4523V15.1116C17.4472 15.11 17.6244 15.11 17.8129 15.11H19.1871C19.6715 15.11 20.0813 15.1099 20.4167 15.1382C20.7683 15.1679 21.1063 15.2326 21.4262 15.4022C21.8618 15.6331 22.2197 15.9875 22.4536 16.4214C22.6257 16.7408 22.6914 17.0783 22.7214 17.4285C22.75 17.7619 22.75 18.1689 22.75 18.6488V18.7112C22.75 19.191 22.75 19.5981 22.7214 19.9315C22.6914 20.2816 22.6257 20.6191 22.4536 20.9385C22.2197 21.3724 21.8618 21.7268 21.4262 21.9578C21.1063 22.1273 20.7683 22.1921 20.4167 22.2217C20.0813 22.25 19.6715 22.25 19.1871 22.25H19.1871H17.8129H17.8129C17.3285 22.25 16.9187 22.25 16.5833 22.2217C16.2317 22.1921 15.8937 22.1273 15.5738 21.9578C15.1382 21.7268 14.7803 21.3724 14.5464 20.9385C14.3743 20.6191 14.3086 20.2816 14.2786 19.9315C14.25 19.5981 14.25 19.191 14.25 18.7112V18.7112V18.6488V18.6488C14.25 18.1689 14.25 17.7619 14.2786 17.4285C14.3086 17.0783 14.3743 16.7408 14.5464 16.4214C14.7803 15.9875 15.1382 15.6331 15.5738 15.4022C15.6421 15.366 15.7113 15.3346 15.7813 15.3072V14.4523Z',
  d7: 'M14.92 1.78681C12.967 1.73773 11.033 1.73773 9.07999 1.7868L9.02182 1.78826C7.497 1.82655 6.27002 1.85735 5.2867 2.0286C4.2572 2.20789 3.42048 2.55177 2.71362 3.26132C2.00971 3.9679 1.66764 4.7926 1.49176 5.8054C1.32429 6.76978 1.29878 7.9668 1.26719 9.44965L1.26593 9.50839C1.24469 10.5047 1.24469 11.4953 1.26594 12.4916L1.26719 12.5504C1.29879 14.0332 1.32429 15.2302 1.49176 16.1946C1.66764 17.2074 2.00972 18.0321 2.71362 18.7387C3.42048 19.4482 4.2572 19.7921 5.2867 19.9714C6.27001 20.1426 7.49697 20.1735 9.02177 20.2117L9.07999 20.2132C10.1147 20.2392 11.144 20.2514 12.1736 20.2499C12.4702 20.2494 12.6185 20.2492 12.707 20.1566C12.7954 20.064 12.7887 19.9137 12.7754 19.6131C12.7615 19.2991 12.75 18.962 12.75 18.7459V18.6292C12.75 18.2409 12.75 17.8523 12.7712 17.5186C12.7946 17.1511 12.8502 16.6981 13.0346 16.2211C13.3071 15.5163 13.769 14.89 14.3779 14.4277C14.4534 14.3704 14.5 14.2822 14.5 14.1875C14.5 11.9318 16.3735 10.25 18.5 10.25C20.0997 10.25 21.6559 11.3613 22.3289 12.8722C22.3627 12.9483 22.4373 12.9989 22.5205 12.9989C22.6312 12.9989 22.7218 12.9109 22.7251 12.8002L22.7341 12.4916C22.7553 11.4953 22.7553 10.5047 22.7341 9.5084L22.7328 9.44967C22.7012 7.96683 22.6757 6.76979 22.5082 5.80542C22.3324 4.79261 21.9903 3.96792 21.2864 3.26134C20.5795 2.55179 19.7428 2.20791 18.7133 2.02862C17.73 1.85737 16.503 1.82656 14.9782 1.78827L14.92 1.78681Z',
  d8: 'M6.13931 6.99106C6.42039 6.51565 7.03364 6.35812 7.50905 6.63919L10.4511 8.37862C11.2914 8.87546 11.6897 9 12.0001 9C12.3105 9 12.7088 8.87546 13.5492 8.37862L16.4912 6.63919C16.9666 6.35812 17.5798 6.51565 17.8609 6.99106C18.142 7.46647 17.9845 8.07972 17.5091 8.3608L14.567 10.1002C13.6915 10.6179 12.8897 11 12.0001 11C11.1105 11 10.3087 10.6179 9.43319 10.1002L6.49117 8.3608C6.01576 8.07972 5.85823 7.46647 6.13931 6.99106Z',
  d9: 'M22 11V2.5H2V19.5H12',
  d10: 'M6 7L12 11L18 7',
  d11: 'M16.5 16V14.5C16.5 13.3955 17.3954 12.5 18.5 12.5C19.0973 12.5 19.6335 12.7619 20 13.1771M15 16H22V21.5H15V16Z',
  d12: 'M1.25 2.5C1.25 2.08579 1.58579 1.75 2 1.75H22C22.4142 1.75 22.75 2.08579 22.75 2.5V14H22.4691C22.223 12.0268 20.5398 10.5 18.5 10.5C16.4602 10.5 14.777 12.0268 14.5309 14H13V20.25H2C1.58579 20.25 1.25 19.9142 1.25 19.5V2.5ZM6.41603 6.37598L5.58398 7.62405L12 11.9014L18.416 7.62405L17.584 6.37598L12 10.0986L6.41603 6.37598Z',
  d13: 'M15.75 14.5C15.75 12.9813 16.9812 11.75 18.5 11.75C19.3215 11.75 20.0595 12.1112 20.5623 12.6808L19.4377 13.6734C19.2076 13.4127 18.8732 13.25 18.5 13.25C17.8096 13.25 17.25 13.8097 17.25 14.5V15.25H22.75V22.25H14.25V15.25H15.75V14.5Z',
};

export const IconMailUnlock02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-stroke-rounded IconMailUnlock02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-duotone-rounded IconMailUnlock02DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-twotone-rounded IconMailUnlock02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-solid-rounded IconMailUnlock02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconMailUnlock02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-bulk-rounded IconMailUnlock02BulkRounded"
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
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-stroke-sharp IconMailUnlock02StrokeSharp"
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
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-02-solid-sharp IconMailUnlock02SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfMailUnlock02: TheIconSelfPack = {
  name: 'MailUnlock02',
  StrokeRounded: IconMailUnlock02StrokeRounded,
  DuotoneRounded: IconMailUnlock02DuotoneRounded,
  TwotoneRounded: IconMailUnlock02TwotoneRounded,
  SolidRounded: IconMailUnlock02SolidRounded,
  BulkRounded: IconMailUnlock02BulkRounded,
  StrokeSharp: IconMailUnlock02StrokeSharp,
  SolidSharp: IconMailUnlock02SolidSharp,
};