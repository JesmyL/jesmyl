import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.3003 15.5116C20.3416 12.9804 22.6484 9.95901 21.8354 6.92985C20.7852 3.01732 15.5349 1.02232 10.1083 2.4739C4.68179 3.92547 1.13402 8.27394 2.18415 12.1865C3.03697 15.3638 5.88849 16.9746 10.3503 16.42M17.3003 15.5116C15.9161 11.5244 9.71766 12.8164 10.002 15.5116C10.2129 17.5105 14.9298 17.5105 17.3003 15.5116ZM17.3003 15.5116C18.1269 18.2959 16.2449 21.4457 12.9572 22',
  d2: 'M10.1083 2.4739C4.68179 3.92547 1.13402 8.27394 2.18415 12.1865C3.03697 15.3638 5.88849 16.9746 10.3503 16.42H10.544C10.2367 16.1865 10.0413 15.8836 10.002 15.5116C9.71766 12.8164 15.9161 11.5244 17.3003 15.5116C20.3416 12.9804 22.6484 9.95901 21.8354 6.92985C20.7852 3.01732 15.5349 1.02232 10.1083 2.4739Z',
  d3: 'M17.3978 15.4478C20.4382 12.9215 22.6428 9.94376 21.83 6.9204C20.7802 3.01537 15.5312 1.0242 10.1061 2.47299C4.68106 3.92178 1.13425 8.26191 2.1841 12.1669C3.03669 15.3382 5.88744 16.9459 10.3481 16.3924',
  d4: 'M17.2962 15.4859C15.9123 11.5064 9.71558 12.7959 9.99987 15.4859C10.2107 17.481 14.9263 17.481 17.2962 15.4859ZM17.2962 15.4859C18.1225 18.2649 16.241 21.4087 12.9543 21.9619',
  d5: 'M17.2575 3.62511C15.3523 2.90117 12.8995 2.76232 10.3664 3.43991C7.83334 4.11751 5.77906 5.46197 4.49203 7.03947C3.20397 8.61823 2.72898 10.3598 3.14968 11.9272C3.5091 13.2663 4.26652 14.2275 5.38217 14.8193C6.28965 15.3007 7.49027 15.5661 8.999 15.5235C8.92203 14.4527 9.48517 13.5912 10.2134 13.0246C10.9536 12.4487 11.9354 12.1054 12.9299 12.0102C14.5376 11.8563 16.4553 12.3507 17.5955 13.9243C18.6592 12.9418 19.5479 11.9233 20.1515 10.8995C20.919 9.59796 21.1847 8.36446 20.8693 7.18906C20.4485 5.62141 19.1644 4.34969 17.2575 3.62511ZM16.029 15.183C15.3982 14.2526 14.2769 13.8904 13.1205 14.0011C12.4278 14.0675 11.8269 14.3033 11.4415 14.6031C11.0653 14.8959 10.9716 15.173 10.9962 15.4066C11.0014 15.4555 11.0249 15.5843 11.3384 15.7383C11.6651 15.8987 12.1831 16.0107 12.841 16.0107C13.9066 16.0107 15.1008 15.7195 16.029 15.183ZM16.4762 17.2037C15.31 17.7513 13.995 18.0107 12.841 18.0107C11.9971 18.0107 11.1482 17.8729 10.457 17.5336C10.3951 17.5032 10.3337 17.4707 10.273 17.436C7.99384 17.6907 6.01236 17.4175 4.44496 16.5861C2.80619 15.7168 1.71144 14.2839 1.21805 12.4457C0.588606 10.1005 1.36244 7.71163 2.94236 5.77514C4.52332 3.83738 6.95619 2.28182 9.84962 1.50784C12.7431 0.733856 15.6288 0.86672 17.9679 1.75552C20.3053 2.64368 22.1715 4.32572 22.8009 6.6706C23.2985 8.52436 22.8173 10.3161 21.8743 11.9154C21.0322 13.3436 19.7896 14.6782 18.4114 15.8787C18.9662 19.0792 16.7257 22.3787 13.1232 22.9861C12.5786 23.0779 12.0627 22.7108 11.9709 22.1662C11.8791 21.6216 12.2461 21.1057 12.7907 21.0139C14.9431 20.651 16.3124 18.9679 16.4762 17.2037Z',
  d6: 'M17.2575 3.62511C15.3523 2.90117 12.8995 2.76232 10.3664 3.43991C7.83334 4.11751 5.77906 5.46197 4.49203 7.03947C3.20397 8.61823 2.72898 10.3598 3.14968 11.9272C3.5091 13.2663 4.26652 14.2275 5.38217 14.8193C6.52344 15.4247 8.12836 15.6885 10.2267 15.4276C10.7748 15.3595 11.2743 15.7486 11.3424 16.2966C11.4105 16.8447 11.0215 17.3442 10.4734 17.4124C8.1099 17.7061 6.05812 17.4418 4.44496 16.5861C2.80619 15.7168 1.71144 14.2839 1.21805 12.4457C0.588606 10.1005 1.36244 7.71163 2.94236 5.77514C4.52331 3.83738 6.95619 2.28182 9.84962 1.50784C12.7431 0.733856 15.6288 0.86672 17.9679 1.75552C20.3053 2.64368 22.1715 4.32572 22.8009 6.6706C23.2985 8.52436 22.8173 10.3161 21.8743 11.9154C20.9371 13.5049 19.5039 14.9783 17.9398 16.2802C17.5153 16.6335 16.8847 16.5758 16.5314 16.1513C16.1781 15.7268 16.2358 15.0962 16.6603 14.7429C18.1374 13.5136 19.3783 12.2108 20.1515 10.8995C20.919 9.59796 21.1847 8.36446 20.8693 7.18906C20.4485 5.62141 19.1644 4.34969 17.2575 3.62511Z',
  d7: 'M11.4418 14.604C11.0655 14.8967 10.9718 15.1738 10.9965 15.4075C11.0016 15.4564 11.0251 15.5852 11.3387 15.7391C11.6653 15.8995 12.1833 16.0116 12.8413 16.0116C13.9068 16.0116 15.101 15.7203 16.0292 15.1839C15.3984 14.2535 14.2771 13.8913 13.1207 14.002C12.428 14.0683 11.8271 14.3042 11.4418 14.604ZM16.4764 17.2045C15.3102 17.7522 13.9952 18.0116 12.8413 18.0116C11.9973 18.0116 11.1484 17.8738 10.4572 17.5344C9.75299 17.1887 9.10779 16.5679 9.00749 15.6173C8.88996 14.5034 9.46443 13.6084 10.2136 13.0254C10.9538 12.4496 11.9357 12.1063 12.9301 12.0111C14.9069 11.8219 17.3521 12.6127 18.245 15.1844C18.25 15.1988 18.2546 15.2133 18.2589 15.2278C19.2654 18.6181 16.9714 22.3382 13.1234 22.9869C12.5788 23.0787 12.0629 22.7117 11.9711 22.1671C11.8793 21.6225 12.2463 21.1066 12.7909 21.0147C14.9433 20.6519 16.3126 18.9688 16.4764 17.2045Z',
  d8: 'M17.1382 3.81707C15.2764 3.10914 12.8795 2.97336 10.4041 3.63597C7.92867 4.29858 5.92117 5.61332 4.66346 7.15595C3.40473 8.69981 2.94056 10.4029 3.35167 11.9356C3.70291 13.2451 4.44308 14.1851 5.53332 14.7638C6.42013 15.2345 7.59341 15.494 9.06778 15.4524C8.99256 14.4053 9.54287 13.5628 10.2545 13.0088C10.9778 12.4456 11.9373 12.1099 12.9091 12.0168C14.4803 11.8663 16.3542 12.3498 17.4685 13.8886C18.5079 12.9278 19.3764 11.9318 19.9663 10.9307C20.7163 9.65788 20.976 8.45164 20.6677 7.30223C20.2565 5.76924 19.0017 4.52564 17.1382 3.81707ZM15.9377 15.1195C15.3212 14.2097 14.2255 13.8555 13.0954 13.9637C12.4185 14.0286 11.8312 14.2592 11.4547 14.5524C11.087 14.8387 10.9954 15.1096 11.0195 15.3381C11.0245 15.3859 11.0475 15.5119 11.3539 15.6625C11.6731 15.8193 12.1794 15.9289 12.8223 15.9289C13.8636 15.9289 15.0306 15.6441 15.9377 15.1195ZM16.3747 17.0955C15.235 17.631 13.9499 17.8847 12.8223 17.8847C11.9976 17.8847 11.168 17.7499 10.4926 17.4181C10.4321 17.3883 10.372 17.3566 10.3128 17.3226C8.08551 17.5717 6.14916 17.3046 4.61746 16.4915C3.01601 15.6415 1.94619 14.2403 1.46404 12.4426C0.84893 10.1494 1.60514 7.81325 3.14908 5.91957C4.69403 4.02465 7.07149 2.50348 9.89903 1.74661C12.7266 0.98974 15.5466 1.11967 17.8324 1.98882C20.1166 2.85734 21.9403 4.5022 22.5553 6.79524C23.0416 8.60802 22.5714 10.3602 21.6499 11.9241C20.8269 13.3207 19.6127 14.6258 18.2658 15.7998C18.808 18.9295 16.6186 22.1561 13.0981 22.75L12.7731 20.8214C14.8765 20.4666 16.2146 18.8207 16.3747 17.0955Z',
};

export const IconLassoTool01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-stroke-rounded IconLassoTool01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLassoTool01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-duotone-rounded IconLassoTool01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconLassoTool01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-twotone-rounded IconLassoTool01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconLassoTool01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-solid-rounded IconLassoTool01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLassoTool01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-bulk-rounded IconLassoTool01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLassoTool01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-stroke-sharp IconLassoTool01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLassoTool01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="lasso-tool-01-solid-sharp IconLassoTool01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLassoTool01: TheIconSelfPack = {
  name: 'LassoTool01',
  StrokeRounded: IconLassoTool01StrokeRounded,
  DuotoneRounded: IconLassoTool01DuotoneRounded,
  TwotoneRounded: IconLassoTool01TwotoneRounded,
  SolidRounded: IconLassoTool01SolidRounded,
  BulkRounded: IconLassoTool01BulkRounded,
  StrokeSharp: IconLassoTool01StrokeSharp,
  SolidSharp: IconLassoTool01SolidSharp,
};