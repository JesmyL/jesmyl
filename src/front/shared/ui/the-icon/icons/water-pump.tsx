import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 5.5H10.5C9.55719 5.5 9.08579 5.5 8.79289 5.79289C8.5 6.08579 8.5 6.55719 8.5 7.5V9.5C8.5 10.4428 8.5 10.9142 8.79289 11.2071C9.08579 11.5 9.55719 11.5 10.5 11.5H12.5C13.4428 11.5 13.9142 11.5 14.2071 11.2071C14.5 10.9142 14.5 10.4428 14.5 9.5V7.5C14.5 6.55719 14.5 6.08579 14.2071 5.79289C13.9142 5.5 13.4428 5.5 12.5 5.5Z',
  d2: 'M13 11.5H10V21.5H13V11.5Z',
  d3: 'M7.5 21.5H15.5',
  d4: 'M14.5 7H18.5C20.1569 7 21.5 8.34315 21.5 10V12.5H18.5V10H14.5V7Z',
  d5: 'M14.5 2.5H9.09949C7.83781 2.5 7.20696 2.5 6.70992 2.82302C6.21288 3.14603 5.95667 3.7225 5.44425 4.87545L2.5 11.5',
  d6: 'M20 15.5L20.5582 14.9991C20.4159 14.8406 20.213 14.75 20 14.75C19.787 14.75 19.5841 14.8406 19.4418 14.9991L20 15.5ZM20.75 18C20.75 18.4142 20.4142 18.75 20 18.75V20.25C21.2426 20.25 22.25 19.2426 22.25 18H20.75ZM20 18.75C19.5858 18.75 19.25 18.4142 19.25 18H17.75C17.75 19.2426 18.7574 20.25 20 20.25V18.75ZM19.25 18C19.25 18.003 19.2507 17.969 19.2771 17.8886C19.3022 17.8119 19.343 17.7162 19.4012 17.6031C19.5182 17.3759 19.6824 17.1227 19.8589 16.8772C20.0335 16.6345 20.2097 16.4137 20.3431 16.2528C20.4094 16.1727 20.4644 16.1084 20.5023 16.0646C20.5212 16.0428 20.5358 16.0262 20.5454 16.0153C20.5502 16.0099 20.5537 16.0059 20.5559 16.0035C20.557 16.0023 20.5577 16.0015 20.5581 16.001C20.5583 16.0008 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5584 16.0007 20.5584 16.0007C20.5584 16.0007 20.5583 16.0008 20.5583 16.0008C20.5583 16.0008 20.5582 16.0009 20 15.5C19.4418 14.9991 19.4417 14.9992 19.4417 14.9992C19.4416 14.9993 19.4415 14.9994 19.4415 14.9994C19.4414 14.9996 19.4412 14.9997 19.441 14.9999C19.4407 15.0003 19.4403 15.0008 19.4397 15.0014C19.4387 15.0026 19.4373 15.0042 19.4355 15.0061C19.432 15.0101 19.4271 15.0156 19.4209 15.0226C19.4085 15.0367 19.3909 15.0568 19.3688 15.0822C19.3246 15.1332 19.2625 15.2059 19.1882 15.2955C19.0403 15.4739 18.8415 15.7228 18.6411 16.0015C18.4426 16.2774 18.2318 16.5975 18.0675 16.9166C17.9157 17.2115 17.75 17.6053 17.75 18H19.25ZM20 15.5C19.4418 16.0009 19.4417 16.0008 19.4417 16.0008C19.4417 16.0008 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4416 16.0007 19.4416 16.0007C19.4416 16.0007 19.4417 16.0008 19.4419 16.001C19.4423 16.0015 19.443 16.0023 19.4441 16.0035C19.4463 16.0059 19.4498 16.0099 19.4546 16.0153C19.4642 16.0262 19.4788 16.0428 19.4977 16.0646C19.5356 16.1084 19.5906 16.1727 19.6569 16.2528C19.7903 16.4137 19.9665 16.6345 20.1411 16.8772C20.3176 17.1227 20.4818 17.3759 20.5988 17.6031C20.657 17.7162 20.6978 17.8119 20.7229 17.8886C20.7493 17.969 20.75 18.003 20.75 18H22.25C22.25 17.6053 22.0843 17.2115 21.9325 16.9166C21.7682 16.5975 21.5574 16.2774 21.3589 16.0015C21.1585 15.7228 20.9597 15.4739 20.8118 15.2955C20.7375 15.2059 20.6754 15.1332 20.6312 15.0822C20.6091 15.0568 20.5915 15.0367 20.5791 15.0226C20.5729 15.0156 20.568 15.0101 20.5645 15.0061C20.5627 15.0042 20.5613 15.0026 20.5603 15.0014C20.5597 15.0008 20.5593 15.0003 20.559 14.9999C20.5588 14.9997 20.5586 14.9996 20.5585 14.9994C20.5585 14.9994 20.5584 14.9993 20.5583 14.9992C20.5583 14.9992 20.5582 14.9991 20 15.5Z',
  d7: 'M11.5 2.5V5.5',
  d8: 'M20 19.5C20.8284 19.5 21.5 18.8284 21.5 18C21.5 17.1716 20 15.5 20 15.5C20 15.5 18.5 17.1716 18.5 18C18.5 18.8284 19.1716 19.5 20 19.5Z',
  d9: 'M19.9138 19.4705C17.4563 18.9732 18.8136 16.5675 19.9139 15.5771H19.9995C21.0998 16.5675 22.4571 18.9732 19.9996 19.4705H19.9138Z',
  d10: 'M14.5 2.5H9.09949C7.83781 2.5 7.20696 2.5 6.70992 2.82302C6.21288 3.14603 5.95667 3.7225 5.44425 4.87545L2.5 11.5M11.5 2.5V5.5',
  d11: 'M21.5 18.2174C21.5 19.4084 19.3909 20.1967 18.6404 18.5718C18.4935 18.2538 18.516 17.8889 18.601 17.5491C18.6074 17.5237 18.6176 17.4995 18.6315 17.4773L19.8003 15.5996C19.9052 15.431 20.1506 15.4306 20.2561 15.5989L20.806 16.4762L21.2448 17.25C21.4121 17.545 21.5 17.8783 21.5 18.2174Z',
  d12: 'M10.4554 4.75H12.5449C12.9777 4.74995 13.3745 4.74991 13.6973 4.79331C14.0528 4.8411 14.4285 4.95355 14.7376 5.26257C15.0466 5.57159 15.159 5.94732 15.2068 6.3028C15.2502 6.62561 15.2502 7.02244 15.2501 7.45525V7.45526V9.54475V9.54476C15.2502 9.97758 15.2502 10.3744 15.2068 10.6972C15.159 11.0527 15.0466 11.4284 14.7376 11.7374C14.4285 12.0465 14.0528 12.1589 13.6973 12.2067C13.3745 12.2501 12.9777 12.2501 12.5449 12.25H12.5449H10.4554H10.4554C10.0226 12.2501 9.62573 12.2501 9.30292 12.2067C8.94744 12.1589 8.57172 12.0465 8.26269 11.7374C7.95367 11.4284 7.84122 11.0527 7.79343 10.6972C7.75003 10.3744 7.75007 9.97757 7.75013 9.54475L7.75013 7.50001C7.75008 7.06719 7.75003 6.62561 7.79343 6.3028C7.84122 5.94732 7.95367 5.57159 8.26269 5.26257C8.57172 4.95355 8.94744 4.8411 9.30292 4.79331C9.62573 4.74991 10.0226 4.74995 10.4554 4.75Z',
  d13: 'M6.49988 21.25C6.49988 20.6977 6.94759 20.25 7.49988 20.25H15.4999C16.0522 20.25 16.4999 20.6977 16.4999 21.25C16.4999 21.8023 16.0522 22.25 15.4999 22.25H7.49988C6.94759 22.25 6.49988 21.8023 6.49988 21.25Z',
  d14: 'M19.4417 14.9991C19.5839 14.8406 19.7869 14.75 19.9999 14.75C20.2129 14.75 20.4158 14.8406 20.5581 14.9991L20.5614 15.0029C20.6086 15.0574 20.7392 15.208 20.8117 15.2955C20.9595 15.4739 21.1584 15.7228 21.3588 16.0015C21.5572 16.2774 21.7681 16.5975 21.9324 16.9166C22.0841 17.2116 22.2499 17.6053 22.2499 18C22.2499 19.2426 21.2425 20.25 19.9999 20.25C18.7572 20.25 17.7499 19.2426 17.7499 18C17.7499 17.6053 17.9156 17.2116 18.0674 16.9166C18.2317 16.5975 18.4425 16.2774 18.641 16.0015C18.8414 15.7228 19.0402 15.4739 19.1881 15.2955C19.2606 15.208 19.3912 15.0573 19.4384 15.0029L19.4417 14.9991Z',
  d15: 'M14.2859 1.75001L9.03173 1.75C8.4633 1.74997 7.96295 1.74994 7.54719 1.79396C7.09705 1.84161 6.66072 1.94743 6.24868 2.21249C5.83664 2.47756 5.56175 2.82928 5.33494 3.21711C5.12544 3.57533 4.92227 4.02792 4.69143 4.54214L1.83347 10.9076C1.61718 11.3893 1.83635 11.9534 2.323 12.1675C2.80966 12.3816 3.3795 12.1646 3.59579 11.6829L6.43483 5.35962C6.69025 4.79075 6.8523 4.43291 7.00398 4.17356C7.14405 3.93404 7.23232 3.85647 7.29957 3.81322C7.36681 3.76996 7.47427 3.72161 7.75226 3.69218C8.05329 3.66031 8.44944 3.65905 9.07831 3.65905H10.5006V6C10.5006 6.55229 10.9483 7 11.5006 7C12.0529 7 12.5006 6.55229 12.5006 6V3.65905H14.2859C14.8184 3.65905 15.2501 3.2317 15.2501 2.70453C15.2501 2.17736 14.8184 1.75001 14.2859 1.75001Z',
  d16: 'M9.24988 13.1995V21.5C9.24988 21.9142 9.58566 22.25 9.99988 22.25H12.9999C13.4141 22.25 13.7499 21.9142 13.7499 21.5V13.249C13.6115 13.25 13.469 13.25 13.3232 13.25H13.3232H10.6765H10.6765C10.143 13.2501 9.65266 13.2501 9.24988 13.1995Z',
  d17: 'M16.7383 10.75H17.7501V12.5C17.7501 12.9142 18.0859 13.25 18.5001 13.25H21.5001C21.9143 13.25 22.2501 12.9142 22.2501 12.5V10C22.2501 7.92893 20.5712 6.25 18.5001 6.25H16.7383C16.7502 6.53557 16.7501 6.84791 16.7501 7.17664V7.17666V9.82334V9.82336C16.7501 10.1521 16.7502 10.4644 16.7383 10.75Z',
  d18: 'M14.4827 5.5H8.49121V11.5H14.4827V5.5Z',
  d19: 'M12.9851 11.5H9.98938V21.5H12.9851V11.5Z',
  d20: 'M7.49292 21.5H15.4816',
  d21: 'M14.483 2.5H6.99364L2.5 11.5',
  d22: 'M11.4872 2.5V5.5',
  d23: 'M18.5333 7.04313L14.4473 7.04297V10.0079H18.4704C18.4759 10.0079 18.4804 10.0123 18.4804 10.0179V12.4962H21.4944V10.5127C21.6128 7.85594 19.5697 7.09267 18.5333 7.04313Z',
  d24: 'M19.9588 15.4668C17.8873 17.6827 18.3532 19.4993 19.9589 19.4993C21.9151 19.4993 21.9468 17.5161 19.9588 15.4668Z',
  d25: 'M7.75 4.75H15.25V12.25H7.75V4.75Z',
  d26: 'M15.5001 22.25H7.50006V20.25H15.5001V22.25Z',
  d27: 'M19.1882 15.2955C19.2625 15.2059 19.9559 14.428 20 14.377C20.0441 14.428 20.7375 15.2059 20.8118 15.2955C20.9597 15.4739 21.1585 15.7228 21.3589 16.0015C21.5574 16.2774 21.7682 16.5975 21.9325 16.9166C22.0843 17.2116 22.25 17.6053 22.25 18C22.25 19.2426 21.2426 20.25 20 20.25C18.7574 20.25 17.75 19.2426 17.75 18C17.75 17.6053 17.9157 17.2116 18.0675 16.9166C18.2318 16.5975 18.4426 16.2774 18.6411 16.0015C18.8415 15.7228 19.0403 15.4739 19.1882 15.2955Z',
  d28: 'M10.5 5.5V2.5H12.5V5.5H10.5Z',
  d29: 'M6.38035 1.75H14.2501V3.66439H7.57861L3.4842 11.75L1.75006 10.8939L6.38035 1.75Z',
  d30: 'M9.25012 13.25V22.25H13.7501V13.25H9.25012Z',
  d31: 'M16.2501 10.75H17.7501V13.25H22.2501V10C22.2501 7.92893 20.5712 6.25 18.5001 6.25H16.2501V10.75Z',
};

export const IconWaterPumpStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-stroke-rounded IconWaterPumpStrokeRounded"
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
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
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
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterPumpDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-duotone-rounded IconWaterPumpDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterPumpTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-twotone-rounded IconWaterPumpTwotoneRounded"
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
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconWaterPumpSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-solid-rounded IconWaterPumpSolidRounded"
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterPumpBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-bulk-rounded IconWaterPumpBulkRounded"
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
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterPumpStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-stroke-sharp IconWaterPumpStrokeSharp"
    >
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWaterPumpSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="water-pump-solid-sharp IconWaterPumpSolidSharp"
    >
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWaterPump: TheIconSelfPack = {
  name: 'WaterPump',
  StrokeRounded: IconWaterPumpStrokeRounded,
  DuotoneRounded: IconWaterPumpDuotoneRounded,
  TwotoneRounded: IconWaterPumpTwotoneRounded,
  SolidRounded: IconWaterPumpSolidRounded,
  BulkRounded: IconWaterPumpBulkRounded,
  StrokeSharp: IconWaterPumpStrokeSharp,
  SolidSharp: IconWaterPumpSolidSharp,
};