import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 7.66667C5 7.04669 5 6.73669 5.06815 6.48236C5.25308 5.79218 5.79218 5.25308 6.48236 5.06815C6.73669 5 7.04669 5 7.66667 5H16.3333C16.9533 5 17.2633 5 17.5176 5.06815C18.2078 5.25308 18.7469 5.79218 18.9319 6.48236C19 6.73669 19 7.04669 19 7.66667C19 8.90663 19 9.52661 18.8637 10.0353C18.4938 11.4156 17.4156 12.4938 16.0353 12.8637C15.5266 13 14.9066 13 13.6667 13H10.3333C9.09337 13 8.47339 13 7.96472 12.8637C6.58436 12.4938 5.50617 11.4156 5.1363 10.0353C5 9.52661 5 8.90663 5 7.66667Z',
  d2: 'M18 11C18.3716 11.5839 18.5574 11.8759 18.689 12.1897C18.8062 12.4694 18.8913 12.7615 18.9425 13.0604C19 13.3959 19 13.7419 19 14.4341V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V14.4341C5 13.7419 5 13.3959 5.0575 13.0604C5.10874 12.7615 5.1938 12.4694 5.31105 12.1897C5.44263 11.8759 5.62842 11.5839 6 11',
  d3: 'M5 20C4.32352 20 3.98528 20 3.70219 19.922C3.08287 19.7512 2.58068 19.3162 2.34157 18.7433C2.23227 18.4815 2.19862 18.1593 2.1313 17.515L2.06691 16.8986C1.98995 16.1619 1.95147 15.7936 2.1089 15.5209C2.46075 14.9115 3.25125 15.0052 3.85704 15.0052H5',
  d4: 'M19 20C19.6765 20 20.0147 20 20.2978 19.9219C20.9171 19.751 21.4193 19.3155 21.6584 18.742C21.7677 18.4799 21.8014 18.1574 21.8687 17.5124L21.9331 16.8954C21.9955 16.2975 22.1529 15.5626 21.5709 15.1773C21.3031 15 20.9164 15 20.143 15H19',
  d5: 'M9 14.5L9 13.5',
  d6: 'M15 14.5L15 13.5',
  d7: 'M15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5',
  d8: 'M10.3337 12.9999H13.667C14.907 12.9999 15.527 12.9999 16.0356 12.8636C17.416 12.4937 18.4942 11.4155 18.864 10.0352L18.9312 15.9315C18.9638 18.7894 18.98 20.2183 18.0993 21.1091C17.2186 21.9999 15.7896 21.9999 12.9316 21.9999H11.0691C8.21106 21.9999 6.78205 21.9999 5.90134 21.1091C5.02064 20.2183 5.03691 18.7894 5.06947 15.9315L5.13664 10.0352C5.50651 11.4155 6.5847 12.4937 7.96507 12.8636C8.47373 12.9999 9.09371 12.9999 10.3337 12.9999Z',
  d9: 'M19.6335 19.3915C19.75 18.5245 19.75 17.4222 19.75 16.0546L19.75 14.3683C19.7501 14.0015 19.7501 13.6356 19.7178 13.2732C19.6888 12.9487 19.6744 12.7865 19.5551 12.7429C19.4359 12.6993 19.3062 12.8278 19.0467 13.0848C18.478 13.6482 17.7917 14.093 17.0261 14.3811C16.8971 14.4297 16.8325 14.454 16.7986 14.4953C16.7646 14.5367 16.7517 14.6138 16.7261 14.768C16.5882 15.5972 15.872 16.2498 15.0001 16.2498C14.2392 16.2498 13.5918 15.7643 13.3507 15.0861C13.2884 14.9107 13.2572 14.823 13.2053 14.7864C13.1535 14.7498 13.076 14.7498 12.921 14.7498H11.0792C10.9242 14.7498 10.8467 14.7498 10.7948 14.7864C10.743 14.823 10.7118 14.9107 10.6495 15.0861C10.4084 15.7643 9.76095 16.2498 9.00009 16.2498C8.12819 16.2498 7.412 15.5972 7.27409 14.768C7.24844 14.6138 7.23562 14.5367 7.20163 14.4953C7.16765 14.454 7.10314 14.4297 6.97412 14.3811C6.20839 14.093 5.52203 13.6481 4.95331 13.0847C4.69389 12.8277 4.56417 12.6992 4.44493 12.7427C4.32569 12.7863 4.31121 12.9486 4.28226 13.273C4.24991 13.6355 4.24996 14.0014 4.25001 14.3683L4.25001 16.0546C4.24999 17.4222 4.24997 18.5245 4.36653 19.3915C4.61589 21.2461 5.7536 22.3839 7.60826 22.6332C8.47523 22.7498 9.57754 22.7497 10.9451 22.7497H13.0549C14.4225 22.7497 15.5248 22.7498 16.3918 22.6332C18.2464 22.3839 19.3841 21.2461 19.6335 19.3915Z',
  d10: 'M3.37545 19.5247C3.24991 18.591 3.24996 17.4329 3.25001 16.1174L3.24998 14.6635C3.24998 14.4654 3.24998 14.3663 3.18019 14.3064C3.11039 14.2466 3.02038 14.2605 2.84035 14.2882C2.28049 14.3745 1.7625 14.6206 1.45939 15.1456C1.28744 15.4434 1.25057 15.7539 1.25001 16.0339C1.24949 16.2926 1.28195 16.6031 1.31734 16.9415L1.39596 17.6946C1.45235 18.2384 1.49668 18.6659 1.64944 19.0319C1.90399 19.6418 2.38718 20.1475 2.97571 20.4444C3.22569 20.5705 3.35068 20.6336 3.45019 20.5579C3.5497 20.4823 3.51798 20.3228 3.45453 20.0038C3.42289 19.8447 3.39697 19.6848 3.37545 19.5247Z',
  d11: 'M20.7501 16.1176C20.7501 17.4332 20.7502 18.5912 20.6246 19.5249C20.6031 19.685 20.5772 19.8448 20.5456 20.0038C20.4821 20.3229 20.4504 20.4824 20.55 20.558C20.6495 20.6336 20.7745 20.5705 21.0244 20.4443C21.6131 20.1471 22.0963 19.6408 22.3507 19.0306C22.5034 18.6644 22.5477 18.2366 22.6041 17.6922L22.6953 16.833C22.725 16.5862 22.7686 16.2234 22.7411 15.8942C22.7035 15.4438 22.5288 14.9118 21.985 14.5518C21.7355 14.3866 21.4512 14.314 21.1601 14.2808C20.9759 14.2598 20.8838 14.2493 20.8169 14.3089C20.7501 14.3686 20.7501 14.4676 20.7501 14.6657L20.7501 16.1176Z',
  d12: 'M9.87801 4.25004C10.1869 3.37613 11.0203 2.75 12 2.75C12.9797 2.75 13.8131 3.37613 14.122 4.25004H9.87801ZM8.32501 4.25004C8.67244 2.53834 10.1858 1.25 12 1.25C13.8142 1.25 15.3276 2.53834 15.675 4.25004H16.4311C16.9549 4.2497 17.3597 4.24943 17.7118 4.34379C18.6608 4.59807 19.4021 5.33933 19.6564 6.28833C19.7507 6.64048 19.7505 7.04523 19.7501 7.56903C19.7503 8.68701 19.7505 9.62402 19.5882 10.2295C19.149 11.8687 17.8687 13.149 16.2295 13.5882C16.1851 13.6001 16.1401 13.6111 16.0945 13.6214C15.9234 13.6596 15.8379 13.6788 15.794 13.7336C15.7501 13.7884 15.7501 13.8695 15.7501 14.0319V14.5001C15.7501 14.9143 15.4143 15.2501 15.0001 15.2501C14.5859 15.2501 14.2501 14.9143 14.2501 14.5001V14.151C14.2501 13.9619 14.2501 13.8673 14.1915 13.8087C14.1329 13.7502 14.0382 13.7501 13.8488 13.7501H10.1513C9.96192 13.7501 9.86722 13.7502 9.80865 13.8087C9.75008 13.8673 9.75008 13.9619 9.75008 14.151V14.5001C9.75008 14.9143 9.4143 15.2501 9.00008 15.2501C8.58587 15.2501 8.25008 14.9143 8.25008 14.5001V14.0319C8.25008 13.8695 8.25008 13.7884 8.20618 13.7336C8.16228 13.6788 8.07675 13.6596 7.90569 13.6214C7.86004 13.6111 7.81508 13.6001 7.77069 13.5882C6.13151 13.149 4.85116 11.8687 4.41194 10.2295C4.24971 9.62402 4.24982 8.68702 4.25004 7.56903C4.2497 7.04522 4.24943 6.64049 4.34379 6.28833C4.59807 5.33933 5.33933 4.59807 6.28833 4.34379C6.64049 4.24943 7.04522 4.2497 7.56903 4.25004H8.32501Z',
  d13: 'M19 15H22V17C22 17.9319 22 18.3978 21.8478 18.7654C21.6448 19.2554 21.2554 19.6448 20.7654 19.8478C20.3978 20 19.9319 20 19 20',
  d14: 'M5 15H2V17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20',
  d15: 'M19.0017 9.00001V5.00001L5 5V9C5 11.2091 6.79086 13 9 13L15.0017 13C17.2108 13 19.0017 11.2091 19.0017 9.00001Z',
  d16: 'M18 11L19 13V22H5V13L6 11',
  d17: 'M9 15V13M15 15V13',
  d18: 'M19.7517 4.25001L4.25 4.25V8C4.25 10.3682 5.98301 12.3315 8.25 12.6911V14H9.75V12.75L14.25 12.75V14H15.75V12.6914C18.0178 12.3325 19.7517 10.3688 19.7517 8.00001V4.25001Z',
  d19: 'M12 2.75C10.7574 2.75 9.75 3.75736 9.75 5H8.25C8.25 2.92893 9.92893 1.25 12 1.25C14.0711 1.25 15.75 2.92893 15.75 5H14.25C14.25 3.75736 13.2426 2.75 12 2.75Z',
  d20: 'M4.61424 12.0942L4.32918 12.6643C4.27711 12.7685 4.25 12.8833 4.25 12.9998V21.9998C4.25 22.414 4.58579 22.7498 5 22.7498H19C19.4142 22.7498 19.75 22.414 19.75 21.9998V12.9998C19.75 12.8833 19.7229 12.7685 19.6708 12.6643L19.3864 12.0954C18.7347 12.7926 17.9187 13.3341 17 13.6586V15.2498H13V13.9998L11 13.9998V15.2498H7V13.658C6.08148 13.3333 5.26564 12.7915 4.61424 12.0942Z',
  d21: 'M21 20.5615C21.0175 20.5548 21.035 20.5479 21.0524 20.5407C21.7262 20.2616 22.2616 19.7262 22.5407 19.0524C22.661 18.762 22.7076 18.4625 22.7292 18.1454C22.75 17.8408 22.75 17.4697 22.75 17.0253L22.75 15C22.75 14.5858 22.4142 14.25 22 14.25H21V20.5615Z',
  d22: 'M3 20.5615C2.98251 20.5548 2.96505 20.5479 2.94762 20.5407C2.27379 20.2616 1.73844 19.7262 1.45933 19.0524C1.33905 18.762 1.29241 18.4625 1.27077 18.1454C1.24999 17.8408 1.24999 17.4697 1.25 17.0253L1.25 15C1.25 14.5858 1.58579 14.25 2 14.25H3V20.5615Z',
};

export const IconBackpack03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-stroke-rounded IconBackpack03StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-duotone-rounded IconBackpack03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-twotone-rounded IconBackpack03TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-solid-rounded IconBackpack03SolidRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-bulk-rounded IconBackpack03BulkRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-stroke-sharp IconBackpack03StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBackpack03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="backpack-03-solid-sharp IconBackpack03SolidSharp"
    >
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBackpack03: TheIconSelfPack = {
  name: 'Backpack03',
  StrokeRounded: IconBackpack03StrokeRounded,
  DuotoneRounded: IconBackpack03DuotoneRounded,
  TwotoneRounded: IconBackpack03TwotoneRounded,
  SolidRounded: IconBackpack03SolidRounded,
  BulkRounded: IconBackpack03BulkRounded,
  StrokeSharp: IconBackpack03StrokeSharp,
  SolidSharp: IconBackpack03SolidSharp,
};