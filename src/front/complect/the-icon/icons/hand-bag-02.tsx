import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.9933 10.5C20.8401 12.9778 23.118 17.458 21.3419 19.8804C19.0536 23.0016 4.50551 22.3952 2.66177 19.8804C0.885738 17.458 3.15325 12.9778 4 10.5',
  d2: 'M12 15C13.2636 15 14.9984 17.5713 13.2796 17.8929C12.5102 18.0368 11.4776 18.0346 10.7204 17.8929C9.00158 17.5713 10.7364 15 12 15Z',
  d3: 'M7.5 15C5.72205 13.8047 4.61134 12.0921 4.17261 10.0698C3.98648 9.21181 3.89341 8.78282 4.19523 8.39141C4.49706 8 4.98753 8 5.96846 8H18.0315C19.0125 8 19.5029 8 19.8048 8.39141C20.1066 8.78282 20.0135 9.21181 19.8274 10.0698C19.3887 12.0921 18.278 13.8047 16.5 15',
  d4: 'M12 15V8',
  d5: 'M6.5 8C7.0699 3.99202 9.316 1 12 1C14.684 1 16.9301 3.99202 17.5 8',
  d6: 'M21.342 19.8805C19.0537 23.0017 4.50558 22.3953 2.66184 19.8805C1.18144 17.8613 2.51048 14.4124 3.48434 11.8851C3.53584 11.7515 3.59843 11.5912 3.66526 11.4201C3.85082 10.9449 4.06899 10.3862 4.17261 10.083C4.61134 12.1181 5.66289 13.9353 7.5 15.0445C8.30807 15.5324 9.37732 15.811 10.5051 15.9302C9.90033 16.701 9.69115 17.7003 10.7204 17.8929C11.4776 18.0346 12.5102 18.0368 13.2796 17.8929C14.3181 17.6986 14.0958 16.6829 13.4784 15.9094C14.783 15.7611 15.9112 15.4429 16.5 15.0445C18.278 13.8416 19.3887 12.1181 19.8274 10.083C19.9467 10.4322 20.2114 11.115 20.4098 11.6268C20.4478 11.7247 20.4833 11.8164 20.515 11.8983C21.4908 14.4243 22.8198 17.8648 21.342 19.8805Z',
  d7: 'M19.9924 11C20.8392 13.4778 23.1171 17.958 21.341 20.3804C19.0527 23.5016 4.5046 22.8952 2.66086 20.3804C0.884833 17.958 3.15234 13.4778 3.99909 11',
  d8: 'M7.49902 15.5C5.72107 14.3047 4.61036 12.5921 4.17163 10.5698C3.9855 9.71181 3.89243 9.28282 4.19425 8.89141C4.49608 8.5 4.98655 8.5 5.96748 8.5H18.0305C19.0115 8.5 19.5019 8.5 19.8038 8.89141C20.1056 9.28282 20.0125 9.71181 19.8264 10.5698C19.3877 12.5921 18.277 14.3047 16.499 15.5',
  d9: 'M6.49902 8.5C7.06892 4.49202 9.31502 1.5 11.999 1.5C14.683 1.5 16.9291 4.49202 17.499 8.5',
  d10: 'M11.999 15.5C13.2626 15.5 14.9974 18.0713 13.2787 18.3929C12.5093 18.5368 11.4766 18.5346 10.7194 18.3929C9.00063 18.0713 10.7354 15.5 11.999 15.5ZM11.999 15.5L11.999 8.5',
  d11: 'M9.0481 4.45652C8.17473 5.58312 7.51109 7.20381 7.24067 9.10558C7.18236 9.51567 6.80265 9.80084 6.39256 9.74253C5.98247 9.68422 5.6973 9.30451 5.75561 8.89442C6.0551 6.78821 6.79945 4.90891 7.86261 3.5375C8.92487 2.16724 10.3557 1.25 11.9981 1.25C13.6405 1.25 15.0714 2.16724 16.1337 3.5375C17.1968 4.90891 17.9412 6.78821 18.2407 8.89442C18.299 9.30451 18.0138 9.68422 17.6037 9.74253C17.1936 9.80084 16.8139 9.51567 16.7556 9.10558C16.4852 7.20381 15.8216 5.58312 14.9482 4.45652C14.0739 3.32877 13.0397 2.75 11.9981 2.75C10.9565 2.75 9.92236 3.32877 9.0481 4.45652Z',
  d12: 'M10.648 7.25001C10.9309 7.25001 11.0723 7.25001 11.1602 7.33788C11.248 7.42574 11.248 7.56716 11.248 7.85001V14.4076C10.9915 14.5134 10.7583 14.6614 10.5604 14.8169C10.1684 15.1246 9.82071 15.5332 9.58331 15.9636C9.35764 16.3726 9.16932 16.9169 9.28134 17.4574C9.34121 17.7463 9.48612 18.0217 9.73215 18.2387C9.97193 18.4502 10.2679 18.5716 10.5807 18.6301C11.4284 18.7887 12.5545 18.7912 13.4157 18.6301C13.7285 18.5716 14.0244 18.4502 14.2642 18.2387C14.5103 18.0217 14.6552 17.7463 14.715 17.4574C14.8271 16.9169 14.6387 16.3726 14.4131 15.9636C14.1757 15.5332 13.828 15.1246 13.436 14.8169C13.238 14.6614 13.0047 14.5133 12.748 14.4075V7.85001C12.748 7.56716 12.748 7.42574 12.8359 7.33788C12.9238 7.25001 13.0652 7.25001 13.348 7.25001H18.0831C18.5272 7.24991 18.9512 7.24982 19.2987 7.30991C19.7048 7.38012 20.0978 7.54571 20.3968 7.93344C20.676 8.29553 20.7601 8.68257 20.7467 9.08071C20.7405 9.26843 20.6819 9.60818 20.6397 9.83292C20.6344 9.84885 20.6296 9.86507 20.6253 9.88155C20.157 11.6882 18.9715 13.2413 17.0075 14.3463C16.6465 14.5494 16.5185 15.0067 16.7216 15.3677C16.9247 15.7287 17.382 15.8567 17.743 15.6536C18.9484 14.9755 19.9267 14.1342 20.6672 13.1621C21.0264 12.6906 21.2059 12.4549 21.3828 12.4827C21.5596 12.5105 21.6512 12.7705 21.8343 13.2904C22.0351 13.8603 22.2247 14.4474 22.3748 15.0212C22.8333 16.7733 23.0531 18.8124 21.9449 20.3239C21.5501 20.8624 20.94 21.2615 20.262 21.5645C19.5742 21.8718 18.7531 22.1082 17.8622 22.2863C16.0795 22.6427 13.9321 22.7824 11.8195 22.7438C9.70595 22.7052 7.59253 22.4876 5.8749 22.1131C5.01717 21.926 4.23797 21.6956 3.59945 21.4185C2.98138 21.1502 2.40419 20.8002 2.05502 20.3239C0.947357 18.8131 1.16369 16.7747 1.61961 15.0222C1.76929 14.4468 1.95848 13.8585 2.15883 13.2878C2.34175 12.7667 2.43321 12.5062 2.61018 12.4783C2.78715 12.4503 2.96697 12.6866 3.32663 13.1592C4.06743 14.1325 5.04646 14.9748 6.253 15.6536C6.614 15.8567 7.0713 15.7287 7.27441 15.3677C7.47752 15.0067 7.34952 14.5494 6.98852 14.3463C5.02453 13.2413 3.83906 11.6882 3.37071 9.88156C3.36651 9.86535 3.36182 9.84942 3.35664 9.83375C3.31473 9.61074 3.25576 9.26889 3.24946 9.08071C3.23616 8.68258 3.3202 8.29553 3.59941 7.93344C3.8984 7.54571 4.29145 7.38012 4.6975 7.30991C5.04502 7.24982 5.46906 7.24991 5.91307 7.25001H10.648Z',
  d13: 'M10.6482 16.9341C10.6236 17.0362 10.6113 17.0872 10.6489 17.155C10.6865 17.2228 10.7414 17.2414 10.8513 17.2787C11.5185 17.505 12.4765 17.5072 13.1487 17.2788C13.2586 17.2414 13.3136 17.2227 13.3512 17.155C13.3887 17.0872 13.3764 17.0362 13.3518 16.9341C13.2404 16.4723 12.8588 16.0219 12.5663 15.7603C12.2909 15.5141 12.0871 15.4492 12 15.4492C11.9129 15.4492 11.709 15.5141 11.4337 15.7603C11.1412 16.0219 10.7596 16.4723 10.6482 16.9341Z',
  d14: 'M20.001 8L22.0005 22H2.00098L4.00098 8',
  d15: 'M14 15H10V18H14V15Z',
  d16: 'M16.5 15C16.5 15 20 14 20 8H4C4 14 7.5 15 7.5 15',
  d17: 'M10.7461 15.75H13.2461V17.25H10.7461V15.75Z',
  d18: 'M7.8609 3.5375C7.08363 4.54013 6.47676 5.81423 6.08956 7.25H4.00001C3.62677 7.25 3.31033 7.52445 3.25754 7.89393L3.24239 8H3.25C3.25 10.8434 4.07457 12.4106 4.81443 13.2561C5.19002 13.6854 5.55968 13.9471 5.82523 14.0988C5.95819 14.1748 6.20712 14.2792 6.20712 14.2792C6.20712 14.2792 6.20604 14.2789 6 15C5.79396 15.7211 5.7928 15.7208 5.7928 15.7208C5.7928 15.7208 5.6279 15.6649 5.56618 15.6397C5.44281 15.5893 5.27618 15.5127 5.08102 15.4012C4.69031 15.1779 4.18497 14.8146 3.68557 14.2439C3.29338 13.7957 2.91396 13.2301 2.59651 12.5212L1.25754 21.8939C1.2268 22.1092 1.29096 22.3272 1.43341 22.4914C1.57587 22.6557 1.78259 22.75 2 22.75H21.9996C22.217 22.75 22.4237 22.6557 22.5662 22.4914C22.7086 22.3272 22.7728 22.1092 22.742 21.894L21.4034 12.5214C21.086 13.2302 20.7066 13.7957 20.3144 14.2439C19.815 14.8146 19.3097 15.1779 18.919 15.4012C18.7238 15.5127 18.2072 15.7208 18.2072 15.7208C18.2072 15.7208 18.206 15.7211 18 15L17.7919 14.2795C17.8599 14.2517 18.0418 14.1748 18.1748 14.0988C18.4403 13.9471 18.81 13.6854 19.1856 13.2561C19.9254 12.4106 20.75 10.8434 20.75 8H20.7576L20.7425 7.89396C20.6897 7.52446 20.3733 7.25 20 7.25H17.9033C17.5161 5.81423 16.9092 4.54013 16.132 3.5375C15.0697 2.16724 13.6388 1.25 11.9964 1.25C10.354 1.25 8.92316 2.16724 7.8609 3.5375ZM9.04639 4.45652C8.47371 5.19525 7.9912 6.14643 7.6506 7.25H11.2461V14.25H9.99609C9.58188 14.25 9.24609 14.5858 9.24609 15V18C9.24609 18.4142 9.58188 18.75 9.99609 18.75H13.9961C14.4103 18.75 14.7461 18.4142 14.7461 18V15C14.7461 14.5858 14.4103 14.25 13.9961 14.25H12.7461V7.25H16.3423C16.0017 6.14643 15.5192 5.19525 14.9465 4.45652C14.0722 3.32877 13.038 2.75 11.9964 2.75C10.9548 2.75 9.92066 3.32877 9.04639 4.45652Z',
};

export const IconHandBag02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-stroke-rounded IconHandBag02StrokeRounded"
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandBag02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-duotone-rounded IconHandBag02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandBag02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-twotone-rounded IconHandBag02TwotoneRounded"
    >
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
    </TheIconWrapper>
  );
};

export const IconHandBag02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-solid-rounded IconHandBag02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconHandBag02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-bulk-rounded IconHandBag02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandBag02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-stroke-sharp IconHandBag02StrokeSharp"
    >
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconHandBag02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hand-bag-02-solid-sharp IconHandBag02SolidSharp"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHandBag02: TheIconSelfPack = {
  name: 'HandBag02',
  StrokeRounded: IconHandBag02StrokeRounded,
  DuotoneRounded: IconHandBag02DuotoneRounded,
  TwotoneRounded: IconHandBag02TwotoneRounded,
  SolidRounded: IconHandBag02SolidRounded,
  BulkRounded: IconHandBag02BulkRounded,
  StrokeSharp: IconHandBag02StrokeSharp,
  SolidSharp: IconHandBag02SolidSharp,
};