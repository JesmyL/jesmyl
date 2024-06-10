import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.5 20.4989C10.7011 20.4954 9.90159 20.4836 9.09883 20.4634C5.95033 20.3843 4.37608 20.3448 3.24496 19.2094C2.11383 18.0739 2.08114 16.5412 2.01577 13.4756C1.99475 12.4899 1.99474 11.5101 2.01576 10.5244C2.08114 7.45885 2.11382 5.92608 3.24495 4.79065C4.37608 3.65521 5.95033 3.61566 9.09882 3.53656C11.0393 3.48781 12.9607 3.48781 14.9012 3.53657C18.0497 3.61568 19.6239 3.65523 20.7551 4.79066C21.8862 5.92609 21.9189 7.45886 21.9842 10.5244C22.0019 11.3514 22.0047 12.1744 21.9928 13.0001',
  d2: 'M2 6L8.91302 9.92462C11.4387 11.3585 12.5613 11.3585 15.087 9.92462L22 6',
  d3: 'M14 18.5H22',
  d4: 'M9.09883 20.4647C11.0393 20.5118 12.9607 20.5118 14.9012 20.4647C18.0497 20.3883 19.6239 20.3501 20.755 19.2539C21.8862 18.1576 21.9189 16.6777 21.9842 13.7179V13.7178C22.0053 12.7661 22.0053 11.8201 21.9842 10.8684C21.9392 8.82941 21.9097 7.49275 21.5259 6.5L12 11.3276L2.47411 6.5C2.09032 7.49275 2.0608 8.82941 2.01576 10.8684C1.99474 11.8201 1.99475 12.7661 2.01577 13.7178C2.08114 16.6777 2.11383 18.1576 3.24496 19.2539C4.37608 20.3501 5.95033 20.3883 9.09883 20.4647Z',
  d5: 'M15.4548 10.7894L19.6905 8.38864C20.0515 8.18402 20.2321 8.08172 20.3789 8.16269C20.5257 8.24366 20.5354 8.44648 20.5548 8.8521C20.5808 9.39883 20.595 10.0327 20.611 10.7821C20.6234 11.3637 20.6283 12.7773 20.6259 13.2242C20.6228 13.7762 21.0583 14.2332 21.6101 14.245C22.1618 14.2567 22.6207 13.8188 22.6242 13.2668C22.6272 12.7898 22.6221 11.3529 22.609 10.7395L22.6074 10.6641C22.5762 9.19819 22.5503 7.98692 22.3797 7.00542C22.1979 5.95955 21.8391 5.0838 21.0896 4.33221C20.6663 3.90762 20.1999 3.60795 19.684 3.39408C19.6055 3.35121 19.5214 3.3189 19.4337 3.29827C19.1039 3.18196 18.7546 3.09626 18.3843 3.03184C17.3834 2.85768 16.1415 2.82654 14.6321 2.78869L14.5573 2.78682C12.6015 2.73772 11.1485 2.73773 9.1927 2.78682L9.11785 2.7887C7.60849 2.82654 6.36661 2.85768 5.36564 3.03184C4.30328 3.21668 3.41376 3.57665 2.66036 4.3322C1.9109 5.0838 1.55205 5.95955 1.37026 7.00541C1.19965 7.98693 1.17383 9.19814 1.14258 10.6641L1.14097 10.7395C1.11967 11.7377 1.11968 12.2678 1.14099 13.266L1.1426 13.3414C1.17384 14.8073 1.19966 16.0185 1.37027 17.0001C1.55207 18.0459 1.91092 18.9217 2.66037 19.6733C3.41378 20.4288 4.30329 20.7888 5.36566 20.9736C6.36662 21.1478 7.6085 21.1789 9.11786 21.2168L9.19272 21.2187C9.79161 21.2337 10.3434 21.2441 10.8768 21.2499C11.428 21.256 11.8748 20.8085 11.8748 20.2572C11.8748 19.7058 11.428 19.2594 10.8768 19.2532C10.3596 19.2474 9.82427 19.2373 9.24291 19.2227C7.63997 19.1824 6.54674 19.1525 5.70855 19.0066C4.91527 18.8686 4.4531 18.6421 4.07622 18.2641C3.69538 17.8822 3.47276 17.4261 3.33932 16.6584C3.19761 15.8432 3.17236 14.7839 3.13905 13.2234C3.11834 12.2536 3.11833 11.7519 3.13903 10.7821C3.15503 10.0328 3.16916 9.399 3.19523 8.85233C3.21457 8.44669 3.22424 8.24387 3.37108 8.1629C3.51792 8.08193 3.69843 8.18424 4.05945 8.38885L8.29485 10.7894C9.59446 11.526 10.6936 12.0027 11.8748 12.0027C13.056 12.0027 14.1551 11.526 15.4548 10.7894Z',
  d6: 'M12.875 18.5C12.875 17.9477 13.3227 17.5 13.875 17.5H21.875C22.4273 17.5 22.875 17.9477 22.875 18.5C22.875 19.0523 22.4273 19.5 21.875 19.5H13.875C13.3227 19.5 12.875 19.0523 12.875 18.5Z',
  d7: 'M22 15V3.5H2V20.5H11',
  d8: 'M2 7L12 12L22 7',
  d9: 'M1.25 3.72368C1.25 3.18593 1.68754 2.75 2.22727 2.75H21.7727C22.3125 2.75 22.75 3.18593 22.75 3.72368V14.5H20.796V8.60217L12.0003 13L3.20508 8.6024V19.3026H12V21.25H2.22727C1.68754 21.25 1.25 20.8141 1.25 20.2763V3.72368Z',
  d10: 'M22 18.5H14V16.5H22V18.5Z',
};

export const IconMailMinus01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-stroke-rounded IconMailMinus01StrokeRounded"
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

export const IconMailMinus01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-duotone-rounded IconMailMinus01DuotoneRounded"
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

export const IconMailMinus01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-twotone-rounded IconMailMinus01TwotoneRounded"
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

export const IconMailMinus01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-solid-rounded IconMailMinus01SolidRounded"
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

export const IconMailMinus01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-bulk-rounded IconMailMinus01BulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconMailMinus01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-stroke-sharp IconMailMinus01StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailMinus01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-minus-01-solid-sharp IconMailMinus01SolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMailMinus01: TheIconSelfPack = {
  name: 'MailMinus01',
  StrokeRounded: IconMailMinus01StrokeRounded,
  DuotoneRounded: IconMailMinus01DuotoneRounded,
  TwotoneRounded: IconMailMinus01TwotoneRounded,
  SolidRounded: IconMailMinus01SolidRounded,
  BulkRounded: IconMailMinus01BulkRounded,
  StrokeSharp: IconMailMinus01StrokeSharp,
  SolidSharp: IconMailMinus01SolidSharp,
};