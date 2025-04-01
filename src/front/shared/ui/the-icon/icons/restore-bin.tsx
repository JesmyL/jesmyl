import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.25 5.5L19.75 11.5M5.25 5.5L5.85461 15.5368C6.00945 18.1073 6.08688 19.3925 6.72868 20.3167C7.046 20.7737 7.4548 21.1594 7.92905 21.4493C8.51127 21.8051 9.21343 21.945 10.25 22',
  d2: 'M11.75 15.5L12.8863 16.9657C13.458 14.8319 15.6514 13.5655 17.7852 14.1373C18.8775 14.43 19.7425 15.1475 20.25 16.0646M21.75 20.5L20.6137 19.0363C20.0419 21.1701 17.8486 22.4365 15.7147 21.8647C14.6478 21.5788 13.7977 20.8875 13.2859 20.001',
  d3: 'M3.75 5.5H21.75M16.8057 5.5L16.1231 4.09173C15.6696 3.15626 15.4428 2.68852 15.0517 2.39681C14.965 2.3321 14.8731 2.27454 14.777 2.2247C14.3439 2 13.8241 2 12.7845 2C11.7188 2 11.186 2 10.7457 2.23412C10.6481 2.28601 10.555 2.3459 10.4673 2.41317C10.0716 2.7167 9.85063 3.20155 9.40861 4.17126L8.80292 5.5',
  d4: 'M19.6477 15.2426L20.25 5.5H5.25L5.85461 15.5152C6.00945 18.0801 6.08688 19.3626 6.72868 20.2848C7.046 20.7408 7.4548 21.1257 7.92905 21.4149C8.8883 22 10.1731 22 12.7427 22C14.1151 22 15.1205 22 15.9055 21.9107C14.1019 21.5231 12.75 19.9194 12.75 18C12.75 15.7909 14.5409 14 16.75 14C17.8903 14 18.9191 14.4771 19.6477 15.2426Z',
  d5: 'M21.75 5.5H3.75',
  d6: 'M16.8075 5.5L16.1248 4.09173C15.6713 3.15626 15.4446 2.68852 15.0535 2.39681C14.9667 2.3321 14.8749 2.27454 14.7788 2.2247C14.3457 2 13.8259 2 12.7863 2C11.7206 2 11.1877 2 10.7474 2.23412C10.6499 2.28601 10.5567 2.3459 10.4691 2.41317C10.0734 2.7167 9.85239 3.20155 9.41037 4.17126L8.80469 5.5',
  d7: 'M12.7436 1.25L12.8242 1.25C13.3099 1.24998 13.7381 1.24996 14.0971 1.28207C14.4845 1.31672 14.8639 1.39328 15.2374 1.58705C15.3815 1.66182 15.5193 1.74815 15.6494 1.84521C15.9867 2.09677 16.221 2.40472 16.4212 2.73822C16.6067 3.04728 16.7935 3.43259 17.0054 3.8697L17.4321 4.75H21.7498C22.3021 4.75 22.7498 5.19772 22.7498 5.75C22.7498 6.30229 22.3021 6.75 21.7498 6.75H16.8276C16.8134 6.75031 16.7991 6.75031 16.7849 6.75H8.82417C8.80951 6.75033 8.79482 6.75033 8.78011 6.75H3.74982C3.19753 6.75 2.74982 6.30229 2.74982 5.75C2.74982 5.19772 3.19753 4.75 3.74982 4.75H8.15958L8.51538 3.96946C8.72193 3.51625 8.90385 3.11712 9.08658 2.79684C9.28369 2.45137 9.51703 2.13167 9.85843 1.86975C9.98997 1.76885 10.1296 1.67901 10.276 1.60118C10.6559 1.39917 11.0436 1.31945 11.4397 1.28339C11.807 1.24996 12.2456 1.24998 12.7436 1.25ZM10.3576 4.75H15.2095C14.9829 4.28261 14.8378 3.98637 14.7064 3.7675C14.5821 3.56034 14.5075 3.48856 14.4537 3.44841C14.4103 3.41605 14.3644 3.38727 14.3163 3.36235C14.2567 3.33143 14.1596 3.29564 13.9189 3.27411C13.6597 3.25092 13.3218 3.25 12.7843 3.25C12.2335 3.25 11.8868 3.25096 11.6211 3.27515C11.3742 3.29762 11.2754 3.33496 11.215 3.36706C11.1662 3.39301 11.1196 3.42295 11.0758 3.45659C11.0215 3.49821 10.9465 3.5727 10.8237 3.78796C10.6992 4.00617 10.5637 4.29827 10.3576 4.75Z',
  d8: 'M13.5937 15.5161C14.6958 14.1064 16.5947 13.4231 18.4337 13.9021C19.4118 14.1568 20.2375 14.704 20.8319 15.4265C21.1828 15.853 21.1216 16.4832 20.6951 16.8341C20.2686 17.185 19.6384 17.1237 19.2875 16.6972C18.9565 16.2949 18.4925 15.9841 17.9296 15.8375C16.5161 15.4694 15.0999 16.292 14.7366 17.6098C14.6366 17.9724 14.3417 18.2482 13.9733 18.3237C13.6049 18.3992 13.2252 18.2616 12.9907 17.9676L11.9681 16.6854C11.6237 16.2536 11.6946 15.6244 12.1264 15.2801C12.5581 14.9357 13.1873 15.0066 13.5317 15.4383L13.5937 15.5161ZM20.5261 18.1758C20.1578 18.2514 19.8631 18.5271 19.7632 18.8896C19.3999 20.2074 17.9837 21.03 16.5702 20.6619C16.0066 20.5151 15.5423 20.2038 15.2112 19.8009C14.8606 19.3742 14.2304 19.3125 13.8037 19.6632C13.377 20.0138 13.3154 20.644 13.666 21.0707C14.2606 21.7942 15.087 22.3423 16.0661 22.5973C17.9054 23.0764 19.8047 22.3927 20.9067 20.9824L20.9685 21.0599C21.3132 21.4914 21.9424 21.5618 22.374 21.2171C22.8055 20.8725 22.8759 20.2432 22.5313 19.8117L21.5086 18.5313C21.2739 18.2375 20.8944 18.1002 20.5261 18.1758Z',
  d9: 'M12.7506 22.75C11.499 22.75 10.5059 22.75 9.70799 22.6734C8.88968 22.5949 8.20218 22.4307 7.58674 22.0552C7.02372 21.7117 6.53841 21.2547 6.16171 20.7133C5.74994 20.1214 5.54465 19.4448 5.41698 18.6325C5.29248 17.8404 5.23264 16.8487 5.15723 15.5991L4.56643 5.80992C4.53644 5.31291 4.52144 5.0644 4.67029 4.9072C4.81915 4.75 5.06945 4.75 5.57006 4.75H20.023C20.5243 4.75 20.7749 4.75 20.9238 4.90746C21.0727 5.06493 21.0573 5.31373 21.0265 5.81135L20.675 11.4991C20.6317 12.2001 20.61 12.5507 20.413 12.689C20.216 12.8274 19.8254 12.7157 19.0442 12.4924C18.9938 12.478 18.9431 12.4642 18.8921 12.451C17.0902 11.9842 15.2405 12.3532 13.8027 13.3362C13.6051 13.4713 13.5063 13.5389 13.4276 13.5613C13.3489 13.5838 13.201 13.5774 12.9052 13.5646C12.3202 13.5394 11.7238 13.7162 11.2301 14.1079C10.1448 14.9688 9.96667 16.5418 10.8323 17.6212L11.8605 18.9034C11.9932 19.0689 12.0596 19.1517 12.0803 19.1891C12.1511 19.3171 12.1525 19.3235 12.141 19.4692C12.1377 19.5117 12.1115 19.6144 12.0591 19.8197C11.8694 20.5639 12.0256 21.3848 12.5532 22.0235C12.6604 22.1531 12.773 22.2785 12.891 22.3991C13.0148 22.5257 12.9281 22.75 12.7506 22.75Z',
  d10: 'M12.7506 22.75C11.499 22.75 10.5059 22.75 9.70799 22.6734C8.88968 22.5949 8.20218 22.4307 7.58674 22.0552C7.02372 21.7117 6.53841 21.2547 6.16171 20.7133C5.74994 20.1214 5.54465 19.4448 5.41698 18.6325C5.29248 17.8404 5.23264 16.8487 5.15723 15.5991L4.56643 5.80992C4.53644 5.31291 4.52144 5.0644 4.67029 4.9072C4.81915 4.75 5.06945 4.75 5.57006 4.75H20.023C20.5242 4.75 20.7749 4.75 20.9238 4.90746C21.0727 5.06493 21.0573 5.31373 21.0265 5.81135L20.675 11.4991C20.6317 12.2001 20.61 12.5507 20.413 12.689C20.216 12.8274 19.8254 12.7157 19.0442 12.4924C18.9938 12.478 18.9431 12.4642 18.8921 12.451C17.0902 11.9842 15.2405 12.3532 13.8027 13.3362C13.6051 13.4713 13.5063 13.5389 13.4276 13.5613C13.3489 13.5838 13.201 13.5774 12.9052 13.5646C12.3202 13.5394 11.7238 13.7162 11.2301 14.1079C10.1448 14.9688 9.96667 16.5418 10.8323 17.6212L11.8605 18.9034C11.9932 19.0689 12.0596 19.1517 12.0803 19.1891C12.1511 19.3171 12.1525 19.3235 12.141 19.4692C12.1377 19.5117 12.1115 19.6144 12.0591 19.8197C11.8694 20.5639 12.0256 21.3848 12.5532 22.0235C12.6604 22.1531 12.773 22.2785 12.891 22.3991C13.0148 22.5257 12.9281 22.75 12.7506 22.75Z',
  d11: 'M19.8731 5.49998L19.5278 11.5M5.62579 5.49998L6.57562 22H10.3749',
  d12: 'M3.25128 5.49998H8.95022M8.95022 5.49998L10.375 1.99998H15.1241L16.5488 5.49998M8.95022 5.49998H16.5488M22.2477 5.49998H16.5488',
  d13: 'M19.3022 15.9985C18.6415 14.8129 17.3916 13.9521 15.9853 13.9521C14.1627 13.9521 12.7016 15.5278 12.2363 17.3131L10.7562 14.4484M12.7016 19.9678C13.3908 21.124 14.5954 22.0196 16.0112 21.976C18.2434 21.9073 19.0934 20.4935 19.8051 18.5542L21.1653 21.4418',
  d14: 'M13.6834 15.2213C14.7913 13.6684 16.7707 12.8879 18.7084 13.413C19.9906 13.7604 21.0069 14.6137 21.6019 15.701L19.9584 16.6207C19.6002 15.9661 18.9918 15.4563 18.2222 15.2478C16.7192 14.8405 15.1742 15.7425 14.7715 17.2625L14.5849 17.9665H13.0084L11.5 15.124L13.1551 14.2258L13.6834 15.2213ZM22.0995 18.0335H20.401L20.2145 18.7375C19.8118 20.2575 18.2668 21.1595 16.7638 20.7522C16.012 20.5485 15.4142 20.0574 15.0529 19.4246L13.4262 20.3744C14.0264 21.4256 15.0253 22.2477 16.2776 22.587C18.2298 23.116 20.2245 22.3197 21.3275 20.7435L21.8156 21.7436L23.5 20.9029L22.0995 18.0335Z',
  d15: 'M8.58085 1.85608C8.73843 1.4884 9.09997 1.25 9.5 1.25H14.5C14.9 1.25 15.2616 1.4884 15.4191 1.85608L16.6594 4.75H22V6.75H2V4.75H7.3406L8.58085 1.85608ZM9.51654 4.75H14.4835L13.8406 3.25H10.1594L9.51654 4.75Z',
  d16: 'M3.95387 4.98594C4.0956 4.83536 4.29321 4.74998 4.5 4.74998H19.5C19.7068 4.74998 19.9044 4.83536 20.0461 4.98594C20.1879 5.13652 20.2611 5.33894 20.2486 5.54535L19.8442 12.218C19.605 12.1193 19.357 12.0346 19.1008 11.9652C17.3169 11.4818 15.5112 11.8354 14.0865 12.7808L13.7705 12.1852L9.47852 14.5144L12.0827 19.4219L11.3872 19.828L12.1237 21.1181C12.4727 21.7295 12.9257 22.2835 13.466 22.75H5.5C5.10341 22.75 4.77537 22.4412 4.75138 22.0454L3.75138 5.54535C3.73887 5.33894 3.81213 5.13652 3.95387 4.98594Z',
};

export const IconRestoreBinStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-stroke-rounded IconRestoreBinStrokeRounded"
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

export const IconRestoreBinDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-duotone-rounded IconRestoreBinDuotoneRounded"
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
      />
      <path 
        d={d.d2} 
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
      />
    </TheIconWrapper>
  );
};

export const IconRestoreBinTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-twotone-rounded IconRestoreBinTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconRestoreBinSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-solid-rounded IconRestoreBinSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRestoreBinBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-bulk-rounded IconRestoreBinBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconRestoreBinStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-stroke-sharp IconRestoreBinStrokeSharp"
    >
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
        strokeLinejoin="bevel" 
      />
    </TheIconWrapper>
  );
};

export const IconRestoreBinSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="restore-bin-solid-sharp IconRestoreBinSolidSharp"
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
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRestoreBin: TheIconSelfPack = {
  name: 'RestoreBin',
  StrokeRounded: IconRestoreBinStrokeRounded,
  DuotoneRounded: IconRestoreBinDuotoneRounded,
  TwotoneRounded: IconRestoreBinTwotoneRounded,
  SolidRounded: IconRestoreBinSolidRounded,
  BulkRounded: IconRestoreBinBulkRounded,
  StrokeSharp: IconRestoreBinStrokeSharp,
  SolidSharp: IconRestoreBinSolidSharp,
};