import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.4407 21.3478L16.9929 20.6576C17.4781 20.0511 18.5085 20.1 18.9184 20.7488C19.4114 21.5295 20.6292 21.3743 20.9669 20.6562C20.9845 20.6189 20.9405 20.7123 20.9781 20.3892C21.0156 20.0661 21 19.9923 20.9687 19.8448L19.0456 10.7641C18.5623 8.48195 18.3206 7.34086 17.4893 6.67043C16.6581 6 15.4848 6 13.1384 6H10.8616C8.51517 6 7.34194 6 6.51066 6.67043C5.67937 7.34086 5.43771 8.48195 4.95439 10.7641L3.0313 19.8448C3.00004 19.9923 2.98441 20.0661 3.02194 20.3892C3.05946 20.7123 3.01554 20.6189 3.0331 20.6562C3.37084 21.3743 4.58856 21.5295 5.08165 20.7488C5.49152 20.1 6.52187 20.0511 7.00709 20.6576L7.55934 21.3478C8.25514 22.2174 9.70819 22.2174 10.404 21.3478L10.4908 21.2392C11.2291 20.3165 12.7709 20.3165 13.5092 21.2392L13.596 21.3478C14.2918 22.2174 15.7449 22.2174 16.4407 21.3478Z',
  d2: 'M2.48336 9.5C1.89805 8.89199 2.00824 8.10893 2.00824 6.15176C2.00824 4.1946 2.00824 3.21602 2.59355 2.60801C3.17886 2 4.1209 2 6.00497 2L17.9952 2C19.8792 2 20.8213 2 21.4066 2.60801C21.9919 3.21602 21.9919 4.1946 21.9919 6.15176C21.9919 8.10893 22.1014 8.89199 21.5161 9.5',
  d3: 'M12 10H9',
  d4: 'M14 14L8 14',
  d5: 'M10.9917 21.8163C9.99781 23.0612 7.97828 23.0612 6.98434 21.8163L6.43326 21.1261C6.3636 21.0389 6.23198 20.9736 6.06421 20.9816C5.89617 20.9896 5.78156 21.066 5.72902 21.1494C5.30689 21.8191 4.58616 22.06 3.95942 22.0124C3.35027 21.9661 2.6841 21.6344 2.37482 20.9755C2.18146 20.6744 2.25512 19.9988 2.31612 19.6987L4.24708 10.5615C4.47973 9.46055 4.66851 8.56723 4.90773 7.86925C5.15714 7.14153 5.48722 6.54343 6.05242 6.08663C6.61716 5.63021 7.2714 5.43226 8.03598 5.33927C8.77022 5.24997 9.68609 5.24998 10.8162 5.25H10.8163H10.8163H13.1837H13.1837H13.1838C14.3139 5.24998 15.2298 5.24997 15.964 5.33927C16.7286 5.43226 17.3828 5.63021 17.9476 6.08663C18.5128 6.54343 18.8429 7.14153 19.0923 7.86925C19.3315 8.5672 19.5203 9.46049 19.7529 10.5614L19.7529 10.5615L19.7529 10.5615L21.6839 19.6987C21.7449 19.9988 21.8185 20.6744 21.6252 20.9755C21.3159 21.6344 20.6497 21.9661 20.0406 22.0124C19.4138 22.06 18.6931 21.8191 18.271 21.1494C18.2184 21.066 18.1038 20.9896 17.9358 20.9816C17.768 20.9736 17.6364 21.0389 17.5667 21.1261L17.0157 21.8163C16.0217 23.0612 14.0022 23.0612 13.0083 21.8163C12.7897 21.5426 12.3515 21.2972 12 21.2972C11.6485 21.2972 11.2103 21.5426 10.9917 21.8163ZM12.75 10C12.75 9.58579 12.4142 9.25 12 9.25H9C8.58579 9.25 8.25 9.58579 8.25 10C8.25 10.4142 8.58579 10.75 9 10.75H12C12.4142 10.75 12.75 10.4142 12.75 10ZM14 13.25C14.4142 13.25 14.75 13.5858 14.75 14C14.75 14.4142 14.4142 14.75 14 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H14Z',
  d6: 'M6.07495 1.25C6.09695 1.25 6.11902 1.25001 6.14117 1.25001L17.9252 1.25C18.7891 1.24995 19.5372 1.24991 20.1371 1.33111C20.7842 1.41873 21.4008 1.61673 21.8969 2.11636C22.3881 2.61093 22.5779 3.21692 22.6626 3.8511C22.7422 4.44779 22.7422 5.19468 22.7422 6.06963L22.7422 6.13062C22.7422 6.36995 22.7443 6.59989 22.7464 6.81886C22.7517 7.38963 22.7563 7.88588 22.7203 8.2796C22.6644 8.89092 22.5004 9.45974 22.0039 9.95966C21.6296 10.3366 21.011 10.348 20.6221 9.98514C20.2333 9.62228 20.2215 9.02255 20.5958 8.64561C20.6714 8.56951 20.7398 8.4794 20.7734 8.11226C20.8005 7.81569 20.7972 7.46151 20.7924 6.95031C20.7901 6.71393 20.7876 6.44398 20.7876 6.13062C20.7876 5.17774 20.7857 4.55487 20.7242 4.0943C20.6658 3.65741 20.5697 3.51185 20.4888 3.43041C20.4129 3.35402 20.2832 3.26402 19.8667 3.20764C19.4182 3.14691 18.8083 3.14474 17.8589 3.14474L6.14117 3.14474C5.19187 3.14474 4.58196 3.14691 4.13342 3.20764C3.71692 3.26402 3.58717 3.35402 3.51132 3.43041C3.43044 3.51185 3.33428 3.6574 3.27594 4.0943C3.21445 4.55487 3.21253 5.17774 3.21253 6.13062C3.21253 6.44562 3.20993 6.71673 3.20767 6.95398C3.2028 7.46333 3.19942 7.81653 3.22639 8.11257C3.25986 8.47981 3.32825 8.5697 3.40363 8.64561C3.77795 9.02255 3.76618 9.62228 3.37734 9.98514C2.9885 10.348 2.36983 10.3366 1.9955 9.95966C1.49887 9.45955 1.33511 8.89051 1.27941 8.27929C1.24362 7.88646 1.24831 7.39125 1.2537 6.82187C1.25578 6.60197 1.25796 6.37102 1.25796 6.13062C1.25796 6.11022 1.25796 6.08988 1.25796 6.06962C1.25792 5.19467 1.25788 4.44779 1.33755 3.8511C1.42222 3.21692 1.61206 2.61093 2.10319 2.11636C2.59935 1.61673 3.21592 1.41873 3.86306 1.33111C4.46288 1.24991 5.21101 1.24995 6.07495 1.25Z',
  d7: 'M10.9917 21.8163C9.99781 23.0612 7.97828 23.0612 6.98434 21.8163L6.43326 21.1261C6.3636 21.0389 6.23198 20.9736 6.06421 20.9816C5.89617 20.9896 5.78156 21.066 5.72902 21.1494C5.30689 21.8191 4.58616 22.06 3.95942 22.0124C3.35027 21.9661 2.6841 21.6344 2.37482 20.9755C2.18146 20.6744 2.25512 19.9988 2.31612 19.6987L4.24708 10.5615C4.47973 9.46055 4.66851 8.56723 4.90773 7.86925C5.15714 7.14153 5.48722 6.54343 6.05242 6.08663C6.61716 5.63021 7.2714 5.43226 8.03598 5.33927C8.77022 5.24997 9.68609 5.24998 10.8163 5.25H10.8163H13.1837H13.1837C14.3139 5.24998 15.2298 5.24997 15.964 5.33927C16.7286 5.43226 17.3828 5.63021 17.9476 6.08663C18.5128 6.54343 18.8429 7.14153 19.0923 7.86925C19.3315 8.56722 19.5203 9.46053 19.7529 10.5615L19.7529 10.5615L21.6839 19.6987C21.7449 19.9988 21.8185 20.6744 21.6252 20.9755C21.3159 21.6344 20.6497 21.9661 20.0406 22.0124C19.4138 22.06 18.6931 21.8191 18.271 21.1494C18.2184 21.066 18.1038 20.9896 17.9358 20.9816C17.768 20.9736 17.6364 21.0389 17.5667 21.1261L17.0157 21.8163C16.0217 23.0612 14.0022 23.0612 13.0083 21.8163C12.7897 21.5426 12.3515 21.2972 12 21.2972C11.6485 21.2972 11.2103 21.5426 10.9917 21.8163Z',
  d8: 'M12.75 10C12.75 9.58579 12.4142 9.25 12 9.25L9 9.25C8.58579 9.25 8.25 9.58579 8.25 10C8.25 10.4142 8.58579 10.75 9 10.75H12C12.4142 10.75 12.75 10.4142 12.75 10Z',
  d9: 'M14.75 14C14.75 13.5858 14.4142 13.25 14 13.25L8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75L14 14.75C14.4142 14.75 14.75 14.4142 14.75 14Z',
  d10: 'M3.5 9.5H2V2H21.9996V9.5H20.5',
  d11: 'M12 10H8.5',
  d12: 'M15 14H8.5',
  d13: 'M17.9078 6H6.11858C6.06845 6 6.02602 6.03701 6.01925 6.08665L4.00096 20.8773C3.99091 20.9509 4.06174 21.0094 4.13222 20.9858L7.00428 20.0219L8.93058 21.9701C8.96435 22.0042 9.01763 22.0096 9.05759 21.983L11.9959 20.0219L14.9159 21.983C14.9556 22.0097 15.0087 22.0045 15.0426 21.9707L16.996 20.0219L19.8678 20.9859C19.9382 21.0095 20.009 20.9511 19.9991 20.8775L18.0072 6.08682C18.0005 6.0371 17.958 6 17.9078 6Z',
  d14: 'M1.25 1.25H22.75V10.25H20.3072V8.35526H20.7954V3.14474H3.20458V8.35526H3.69323V10.25H1.25V1.25Z',
  d15: 'M5.25659 5.90088C5.30627 5.52827 5.62411 5.25 6.00001 5.25H18C18.3759 5.25 18.6938 5.52827 18.7434 5.90088L20.7434 20.9009C20.7776 21.1573 20.6773 21.4132 20.4779 21.5781C20.2785 21.7429 20.0083 21.7933 19.7628 21.7115L17.2026 20.8581L15.5303 22.5303C15.2775 22.7831 14.8815 22.8223 14.584 22.624L12 20.9014L9.41604 22.624C9.11857 22.8223 8.72248 22.7831 8.46968 22.5303L6.79744 20.8581L4.23718 21.7115C3.99177 21.7933 3.72153 21.7429 3.52215 21.5781C3.32277 21.4132 3.2224 21.1573 3.25659 20.9009L5.25659 5.90088ZM8.5 9.25H12V10.75H8.5V9.25ZM15 13.25H8.5V14.75H15V13.25Z',
};

export const IconInvoice04StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-stroke-rounded IconInvoice04StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInvoice04DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-duotone-rounded IconInvoice04DuotoneRounded"
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

export const IconInvoice04TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-twotone-rounded IconInvoice04TwotoneRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconInvoice04SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-solid-rounded IconInvoice04SolidRounded"
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

export const IconInvoice04BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-bulk-rounded IconInvoice04BulkRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
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

export const IconInvoice04StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-stroke-sharp IconInvoice04StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInvoice04SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="invoice-04-solid-sharp IconInvoice04SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInvoice04: TheIconSelfPack = {
  name: 'Invoice04',
  StrokeRounded: IconInvoice04StrokeRounded,
  DuotoneRounded: IconInvoice04DuotoneRounded,
  TwotoneRounded: IconInvoice04TwotoneRounded,
  SolidRounded: IconInvoice04SolidRounded,
  BulkRounded: IconInvoice04BulkRounded,
  StrokeSharp: IconInvoice04StrokeSharp,
  SolidSharp: IconInvoice04SolidSharp,
};