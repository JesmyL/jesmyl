import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 20V22',
  d2: 'M20 8V6.48477C20 3.77749 20 2.42383 19.2091 2.07276C18.4182 1.72168 17.4766 2.65735 15.5934 4.5287L4.71649 15.3371C2.7279 17.3131 1.73361 18.3012 2.06169 19.1506C2.38977 20 3.76568 20 6.51751 20H8M11 20H17.3944C18.6227 20 19.2368 20 19.6184 19.6036C20 19.2072 20 18.5692 20 17.2932V13C20 12.0572 20 11.5858 20.2929 11.2929C20.5858 11 21.0572 11 22 11',
  d3: 'M20 15H19C17.1144 15 16.1716 15 15.5858 15.5858C15 16.1716 15 17.1144 15 19V20',
  d4: 'M15.5934 4.5287L4.71649 15.3371C2.7279 17.3131 1.73361 18.3012 2.06169 19.1506C2.38977 20 3.76568 20 6.51751 20H16C15.4477 20 15 19.5523 15 19C15 17.1144 15 16.1716 15.5858 15.5858C16.1716 15 17.1144 15 19 15H20V6.48477C20 3.77749 20 2.42383 19.2091 2.07276C18.4182 1.72168 17.4766 2.65735 15.5934 4.5287Z',
  d5: 'M19.6184 19.6075C19.2368 20.0039 18.6227 20.0039 17.3944 20.0039H16C15.4477 20.0039 15 19.5562 15 19.0039C15 17.1183 15 16.1755 15.5858 15.5897C16.1716 15.0039 17.1144 15.0039 19 15.0039H20V17.2971C20 18.5731 20 19.2111 19.6184 19.6075Z',
  d6: 'M18.4096 3.27161C17.9115 3.64229 17.2658 4.28037 16.3 5.2401L5.42306 16.0485C4.40536 17.0598 3.72181 17.7424 3.3182 18.2735C3.10873 18.5491 3.03693 18.7041 3.01342 18.7783C3.08089 18.8114 3.22823 18.8629 3.52652 18.9063C4.16584 18.9995 5.10866 19.0021 6.51921 19.0021H8.0017C8.55398 19.0021 9.00169 19.4498 9.00169 20.0021C9.00169 20.5544 8.55398 21.0021 8.0017 21.0021L6.43467 21.0021C5.13079 21.0021 4.03961 21.0022 3.23826 20.8854C2.45302 20.7711 1.50598 20.485 1.13055 19.513C0.762377 18.5598 1.24063 17.7018 1.72587 17.0633C2.22442 16.4073 3.0104 15.6263 3.95557 14.6872L14.9492 3.76286L14.9492 3.76286C15.8405 2.87705 16.5881 2.13413 17.2156 1.66717C17.825 1.21361 18.6813 0.745665 19.6165 1.16083C20.5323 1.56733 20.7891 2.50021 20.8936 3.26135C21.0018 4.05032 21.0017 5.12132 21.0017 6.40696L21.0017 8.00207C21.0017 8.55435 20.554 9.00207 20.0017 9.00207C19.4494 9.00207 19.0017 8.55435 19.0017 8.00207V6.48684C19.0017 5.10075 18.9994 4.16932 18.9121 3.53315C18.8744 3.25834 18.8293 3.10768 18.7972 3.02937C18.7242 3.0613 18.6007 3.12938 18.4096 3.27161Z',
  d7: 'M22.0039 10.0039L21.9495 10.0039C21.5254 10.0038 21.1133 10.0037 20.7734 10.0494C20.3902 10.101 19.9529 10.2265 19.5897 10.5897C19.2265 10.9529 19.101 11.3902 19.0494 11.7734C19.0037 12.1133 19.0038 12.5254 19.0039 12.9495L19.0039 14.2539H18.9519C18.0534 14.2539 17.3042 14.2539 16.7094 14.3339C16.0816 14.4183 15.5148 14.6039 15.0594 15.0594C14.6039 15.5149 14.4182 16.0817 14.3338 16.7095C14.2539 17.3042 14.2539 18.0535 14.2539 18.9519V19.0039L12.9495 19.0039C12.5254 19.0038 12.1133 19.0037 11.7734 19.0494C11.3902 19.101 10.9529 19.2265 10.5897 19.5897C10.2265 19.9529 10.101 20.3902 10.0494 20.7734C10.0037 21.1133 10.0038 21.5254 10.0039 21.9495L10.0039 22.0039C10.0039 22.5562 10.4516 23.0039 11.0039 23.0039C11.5562 23.0039 12.0039 22.5562 12.0039 22.0039C12.0039 21.5042 12.006 21.2301 12.0316 21.0399L12.0326 21.0326L12.0399 21.0316C12.2301 21.006 12.5042 21.0039 13.0039 21.0039L17.4592 21.0039C18.0208 21.004 18.5415 21.0041 18.9662 20.9448C19.439 20.8787 19.937 20.7226 20.3428 20.301C20.7435 19.8848 20.8868 19.3832 20.948 18.9105C21.004 18.4771 21.004 17.9432 21.0039 17.3554L21.0039 13.0039C21.0039 12.5042 21.006 12.2301 21.0316 12.0399L21.0326 12.0326L21.0399 12.0316C21.2301 12.006 21.5042 12.0039 22.0039 12.0039C22.5562 12.0039 23.0039 11.5562 23.0039 11.0039C23.0039 10.4516 22.5562 10.0039 22.0039 10.0039Z',
  d8: 'M20 15H15V20',
  d9: 'M21.9994 11.0005H20.0062V20.0017H11.0038V22.0069M20.0062 7.99019V2.00318C20.0062 1.99427 19.9955 1.98981 19.9892 1.99611L2.00783 19.9833C2.00153 19.9896 2.00599 20.0004 2.0149 20.0004H7.99983',
  d10: 'M21.5 2.50003C21.5 2.09557 21.2564 1.73093 20.8827 1.57615C20.509 1.42137 20.0789 1.50692 19.7929 1.79292L1.79292 19.7929C1.50692 20.0789 1.42137 20.509 1.57615 20.8827C1.73093 21.2564 2.09557 21.5 2.50003 21.5H8.50003V19.5H4.91424L19.5 4.91424V8.50003H21.5V2.50003Z',
  d11: 'M22.5 10.5H19.5V14.5H15.5C14.9477 14.5 14.5 14.9477 14.5 15.5V19.5H10.5V22.5H12.5V21.5H20.5C21.0523 21.5 21.5 21.0523 21.5 20.5V12.5H22.5V10.5Z',
};

export const IconLeftTriangleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-stroke-rounded IconLeftTriangleStrokeRounded"
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

export const IconLeftTriangleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-duotone-rounded IconLeftTriangleDuotoneRounded"
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

export const IconLeftTriangleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-twotone-rounded IconLeftTriangleTwotoneRounded"
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

export const IconLeftTriangleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-solid-rounded IconLeftTriangleSolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftTriangleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-bulk-rounded IconLeftTriangleBulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftTriangleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-stroke-sharp IconLeftTriangleStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLeftTriangleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="left-triangle-solid-sharp IconLeftTriangleSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLeftTriangle: TheIconSelfPack = {
  name: 'LeftTriangle',
  StrokeRounded: IconLeftTriangleStrokeRounded,
  DuotoneRounded: IconLeftTriangleDuotoneRounded,
  TwotoneRounded: IconLeftTriangleTwotoneRounded,
  SolidRounded: IconLeftTriangleSolidRounded,
  BulkRounded: IconLeftTriangleBulkRounded,
  StrokeSharp: IconLeftTriangleStrokeSharp,
  SolidSharp: IconLeftTriangleSolidSharp,
};