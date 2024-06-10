import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9832 14V3M11.9832 14C10.3248 14 8.98047 15.4354 8.98047 16.625C8.98047 18.375 10.3248 21 11.9832 21C13.6414 21 14.9858 18.375 14.9858 16.625C14.9858 15.4354 13.6414 14 11.9832 14Z',
  d2: 'M4.9785 10.0282L4.9785 20.9998M3.68624 3.12927L2.90356 3.20735C2.33235 3.26433 1.92605 3.78866 2.01391 4.35545L2.68289 8.671C2.79621 9.40206 3.42609 10.0105 4.16653 10.0105H5.79049C6.53093 10.0105 7.1608 9.40206 7.27413 8.671L7.9431 4.35545C8.03096 3.78866 7.62467 3.26433 7.05345 3.20735L6.27346 3.12943C5.4132 3.0435 4.54651 3.04344 3.68624 3.12927Z',
  d3: 'M17.9961 13.8182L17.9961 3.02588C19.1546 3.34586 21.0816 4.55262 21.4007 7.52836L21.9738 12.0423C22.0744 12.835 21.8728 13.6261 21.0847 13.7615C20.4245 13.875 19.423 13.9121 17.9961 13.8182ZM17.9961 13.8182L17.9961 21',
  d4: 'M2.59951 8.33742L2.14151 5.43278C1.97935 4.40438 1.89827 3.89018 2.21785 3.55634C2.97427 2.76618 7.11795 2.86455 7.7802 3.55634C8.09978 3.89018 8.0187 4.40438 7.85654 5.43278L7.39853 8.33742C7.17221 9.77277 6.7633 10 5.28266 10H4.71539C3.23475 10 2.82584 9.77277 2.59951 8.33742Z',
  d5: 'M17.999 14V3C19.8328 3.64166 21.1376 4.91354 21.3561 6.82088L21.9783 12.2508C22.159 13.8284 21.135 13.8392 19.7296 13.8446C18.7882 13.8482 18.3176 13.85 17.999 14Z',
  d6: 'M11.9991 14V3M11.9991 14C10.3422 14 8.99902 15.4354 8.99902 16.625C8.99902 18.375 10.3422 21 11.9991 21C13.6559 21 14.9991 18.375 14.9991 16.625C14.9991 15.4354 13.6559 14 11.9991 14Z',
  d7: 'M17.999 13.8177V3.02539C19.1575 3.34537 21.0845 4.55213 21.4036 7.52787L21.9767 12.0418C22.0773 12.8345 21.8757 13.6256 21.0876 13.761C20.4274 13.8745 19.4259 13.9116 17.999 13.8177ZM17.999 13.8177V20.9995',
  d8: 'M4.97557 10.0277V20.9993M3.68331 3.12878L2.90063 3.20686C2.32942 3.26384 1.92312 3.78817 2.01098 4.35496L2.67996 8.67051C2.79328 9.40157 3.42316 10.01 4.1636 10.01H5.78756C6.528 10.01 7.15787 9.40157 7.2712 8.67051L7.94017 4.35496C8.02803 3.78817 7.62174 3.26384 7.05052 3.20686L6.27053 3.12894C5.41027 3.04301 4.54358 3.04295 3.68331 3.12878Z',
  d9: 'M12 14V3M12 14C10.3431 14 9 15.4354 9 16.625C9 18.375 10.3431 21 12 21C13.6568 21 15 18.375 15 16.625C15 15.4354 13.6568 14 12 14Z',
  d10: 'M4.9785 10.0282V20.9998M3.68624 3.12927L2.90356 3.20735C2.33235 3.26433 1.92605 3.78866 2.01391 4.35545L2.68289 8.671C2.79621 9.40206 3.42609 10.0105 4.16653 10.0105H5.79049C6.53093 10.0105 7.1608 9.40206 7.27413 8.671L7.9431 4.35545C8.03096 3.78866 7.62467 3.26433 7.05345 3.20735L6.27346 3.12943C5.4132 3.0435 4.54651 3.04344 3.68624 3.12927Z',
  d11: 'M17.9961 13.8182V3.02588C19.1546 3.34586 21.0816 4.55262 21.4007 7.52836L21.9738 12.0423C22.0744 12.835 21.8728 13.6261 21.0847 13.7615C20.4245 13.875 19.423 13.9121 17.9961 13.8182ZM17.9961 13.8182V21',
  d12: 'M8.32295 3.03796C8.12492 2.83109 7.86369 2.70546 7.64827 2.62402C7.41665 2.53645 7.15253 2.46899 6.87963 2.41692C6.3325 2.31251 5.68286 2.25738 5.04291 2.25089C4.40347 2.24441 3.74471 2.28619 3.18085 2.38786C2.89926 2.43863 2.62413 2.50736 2.37972 2.60092C2.14634 2.69026 1.88158 2.8243 1.67705 3.03796C1.33111 3.39934 1.24921 3.83476 1.25001 4.23584C1.25071 4.59363 1.31939 5.02872 1.39353 5.49846L1.85964 8.45449C1.97431 9.18169 2.16335 9.87704 2.73864 10.3076C3.02625 10.5229 3.36494 10.6344 3.7259 10.6915C3.87925 10.7158 3.99805 10.8438 3.99805 10.999L3.99805 20.7502C3.99805 21.3025 4.44576 21.7502 4.99805 21.7502C5.55033 21.7502 5.99805 21.3025 5.99805 20.7502L5.99805 10.9996C5.99805 10.8442 6.11698 10.7163 6.27045 10.6921C6.63277 10.6351 6.97278 10.5236 7.26136 10.3076C7.83665 9.87704 8.02569 9.18169 8.14036 8.45449L8.60647 5.49846C8.68061 5.02872 8.74928 4.59363 8.74999 4.23584C8.75079 3.83476 8.66889 3.39934 8.32295 3.03796Z',
  d13: 'M13 3.25C13 2.69772 12.5523 2.25 12 2.25C11.4477 2.25 11 2.69772 11 3.25L11 13.1627C11 13.2969 10.9104 13.4137 10.7836 13.4578C10.2383 13.648 9.75578 13.9546 9.36648 14.3186C8.71976 14.9232 8.25 15.765 8.25 16.625C8.25 17.6613 8.63706 18.8902 9.24138 19.8642C9.82379 20.8029 10.7698 21.75 12 21.75C13.2302 21.75 14.1762 20.8029 14.7586 19.8642C15.3629 18.8902 15.75 17.6613 15.75 16.625C15.75 15.765 15.2802 14.9232 14.6335 14.3186C14.2442 13.9546 13.7617 13.648 13.2164 13.4578C13.0896 13.4137 13 13.2969 13 13.1627L13 3.25Z',
  d14: 'M18.2477 2.29233C18.0183 2.21206 17.7642 2.24794 17.566 2.38858C17.3678 2.52923 17.25 2.7572 17.25 3.00025V20.7502C17.25 21.3025 17.6977 21.7502 18.25 21.7502C18.8023 21.7502 19.25 21.3025 19.25 20.7502L19.25 15.0852C19.25 14.9073 19.25 14.8184 19.2872 14.7509C19.3143 14.7017 19.3552 14.6606 19.4043 14.6333C19.4717 14.5959 19.5603 14.5955 19.7374 14.5948C20.0798 14.5935 20.44 14.5921 20.7682 14.5623C21.0942 14.5327 21.4545 14.4705 21.7799 14.311C22.1295 14.1396 22.4245 13.8621 22.5945 13.4525C22.7542 13.0678 22.7775 12.6294 22.7244 12.1657L22.1023 6.73576C21.8425 4.46826 20.2743 3.00143 18.2477 2.29233Z',
  d15: 'M12.0088 14.1445V3M12.0088 14.1445C10.3508 14.1445 9.00684 15.5988 9.00684 16.804C9.00684 18.577 10.3508 21.2365 12.0088 21.2365C13.6666 21.2365 15.0107 18.577 15.0107 16.804C15.0107 15.5988 13.6666 14.1445 12.0088 14.1445Z',
  d16: 'M4.99091 21.9971V10.0806M4.99091 10.0806H7.00645L7.97617 3.10763C7.98465 3.04666 7.9379 2.99219 7.87709 2.99219H2.11082C2.04995 2.99219 2.00318 3.04676 2.01176 3.10778L2.99197 10.0806H4.99091Z',
  d17: 'M18.076 21.9928L17.9961 14.1375M17.9961 14.1375V3.00929C17.9961 3.00231 18.0025 2.99729 18.009 2.99959C18.9952 3.34882 21.0508 4.24716 21.3845 6.93424L22.0113 14.1265C22.0118 14.1324 22.0072 14.1375 22.0013 14.1375H17.9961Z',
  d18: 'M1.99805 2.25C1.7806 2.25 1.57385 2.34438 1.43139 2.50868C1.28894 2.67297 1.22481 2.89101 1.25562 3.10627L2.34972 10.7502H3.99805L3.99805 22.0005H5.99805L5.99805 10.7502H7.65067L8.74054 3.10586C8.77123 2.89065 8.70703 2.67272 8.56457 2.50852C8.42212 2.34432 8.21543 2.25 7.99805 2.25H1.99805Z',
  d19: 'M13.002 13.3893L13.002 1.99976H11.002L11.002 13.3893C10.3676 13.5688 9.80848 13.9069 9.36843 14.3183C8.72171 14.9229 8.25195 15.7648 8.25195 16.6248C8.25195 17.661 8.63901 18.8899 9.24333 19.8639C9.82575 20.8026 10.7717 21.7498 12.002 21.7498C13.2322 21.7498 14.1782 20.8026 14.7606 19.8639C15.3649 18.8899 15.752 17.661 15.752 16.6248C15.752 15.7648 15.2822 14.9229 14.6355 14.3183C14.1954 13.9069 13.6363 13.5688 13.002 13.3893Z',
  d20: 'M18.2497 2.29184C18.0202 2.21158 17.7662 2.24745 17.5679 2.38809C17.3697 2.52874 17.252 2.75672 17.252 2.99976V21.9998H19.252L19.252 14.7498H22.002C22.2125 14.7498 22.4133 14.6613 22.5554 14.5059C22.6975 14.3505 22.7677 14.1426 22.749 13.9329L22.1061 6.75376L22.1043 6.73527C21.8445 4.46777 20.2762 3.00094 18.2497 2.29184Z',
};

export const IconKitchenUtensilsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-stroke-rounded IconKitchenUtensilsStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKitchenUtensilsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-duotone-rounded IconKitchenUtensilsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKitchenUtensilsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-twotone-rounded IconKitchenUtensilsTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconKitchenUtensilsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-solid-rounded IconKitchenUtensilsSolidRounded"
    >
      <path 
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

export const IconKitchenUtensilsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-bulk-rounded IconKitchenUtensilsBulkRounded"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconKitchenUtensilsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-stroke-sharp IconKitchenUtensilsStrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconKitchenUtensilsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="kitchen-utensils-solid-sharp IconKitchenUtensilsSolidSharp"
    >
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfKitchenUtensils: TheIconSelfPack = {
  name: 'KitchenUtensils',
  StrokeRounded: IconKitchenUtensilsStrokeRounded,
  DuotoneRounded: IconKitchenUtensilsDuotoneRounded,
  TwotoneRounded: IconKitchenUtensilsTwotoneRounded,
  SolidRounded: IconKitchenUtensilsSolidRounded,
  BulkRounded: IconKitchenUtensilsBulkRounded,
  StrokeSharp: IconKitchenUtensilsStrokeSharp,
  SolidSharp: IconKitchenUtensilsSolidSharp,
};