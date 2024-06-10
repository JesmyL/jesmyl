import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.3332 2L9.66658 2M20.9849 7.5C21.0021 7.99962 21.0029 8.49991 21.0015 9M3.01507 7.5C2.99791 7.99962 2.99703 8.49991 2.99853 9M20.4629 4.74533C19.9788 3.78698 19.1975 3.00864 18.237 2.52818M5.82028 2.5C4.83352 2.9779 4.03078 3.76801 3.53707 4.74532',
  d2: 'M18.495 12C20.453 12 20.9931 12.6378 20.9931 14.5C20.9931 17.0317 21.243 19.9537 18.7448 21.3971C17.7014 22 16.3005 22 13.4988 22L10.5012 22C7.69947 22 6.29863 22 5.25521 21.3971C2.75702 19.9537 3.00695 17.0317 3.00695 14.5C3.00695 12.5404 3.64422 12 5.50502 12L18.495 12Z',
  d3: 'M18.4969 12C20.455 12 20.995 12.6378 20.995 14.5C20.995 17.0317 21.2449 19.9537 18.7467 21.3971C17.7033 22 16.3025 22 13.5008 22L10.5031 22C7.70143 22 6.30059 22 5.25716 21.3971C2.75898 19.9537 3.0089 17.0317 3.0089 14.5C3.0089 12.5404 3.64618 12 5.50697 12L18.4969 12Z',
  d4: 'M19.8009 9.24701C19.8023 8.74835 19.8014 8.26396 19.7853 7.78431C19.7669 7.23235 20.1881 6.76954 20.7261 6.75059C21.2642 6.73164 21.7153 7.16373 21.7338 7.71569C21.7512 8.23528 21.7519 8.75146 21.7505 9.25299C21.7489 9.80528 21.3111 10.2516 20.7728 10.25C20.2344 10.2483 19.7993 9.79929 19.8009 9.24701ZM20.6902 5.8879C20.2097 6.13692 19.6234 5.93918 19.3806 5.44622C19.0031 4.67966 18.3937 4.05684 17.6447 3.67254C17.1632 3.42547 16.9681 2.82477 17.209 2.33083C17.4498 1.83689 18.0354 1.63676 18.5169 1.88382C19.6407 2.46044 20.5544 3.3943 21.1208 4.54443C21.3635 5.03738 21.1708 5.63887 20.6902 5.8879ZM15.2503 2.25C15.2503 2.80228 14.8138 3.25 14.2755 3.25L9.72634 3.25C9.18797 3.25 8.75154 2.80228 8.75154 2.25C8.75154 1.69771 9.18797 1.25 9.72635 1.25L14.2755 1.25C14.8138 1.25 15.2503 1.69771 15.2503 2.25ZM6.85427 2.31412C7.08894 2.81118 6.88638 3.40927 6.40184 3.65C5.63248 4.03224 5.00631 4.66448 4.62134 5.44622C4.37859 5.93918 3.79225 6.13692 3.31171 5.8879C2.83117 5.63887 2.63841 5.03738 2.88116 4.54442C3.45874 3.37154 4.3976 2.42355 5.55204 1.85C6.03658 1.60926 6.61961 1.81706 6.85427 2.31412ZM3.27584 6.75059C3.8139 6.76954 4.2351 7.23235 4.21663 7.78431C4.20058 8.26396 4.19963 8.74835 4.20108 9.247C4.20269 9.79929 3.76757 10.2483 3.2292 10.25C2.69083 10.2516 2.25309 9.80528 2.25147 9.25299C2.25001 8.75147 2.25077 8.23528 2.26816 7.71569C2.28663 7.16373 2.73779 6.73164 3.27584 6.75059Z',
  d5: 'M21.5412 18.5062C21.2621 19.8775 20.6072 21.1875 19.1206 22.0465C18.4656 22.4249 17.7324 22.5915 16.8495 22.6716C15.9847 22.75 14.9059 22.75 13.5366 22.75L10.4645 22.75C9.09517 22.75 8.01641 22.75 7.15163 22.6716C6.26871 22.5915 5.53547 22.4249 4.88054 22.0465C3.39387 21.1875 2.73895 19.8775 2.45987 18.5062C2.23414 17.3971 2.24464 16.1828 2.25394 15.1063L2.25394 15.1063L2.25394 15.1061C2.25574 14.8984 2.25749 14.6957 2.25749 14.5C2.25749 13.5469 2.38296 12.6501 2.98343 12.03C3.58971 11.4038 4.49229 11.25 5.50556 11.25L18.4955 11.25C19.5088 11.25 20.4114 11.4038 21.0177 12.03C21.6181 12.6501 21.7436 13.5469 21.7436 14.5C21.7436 14.6958 21.7454 14.8985 21.7471 15.1063C21.7565 16.1828 21.767 17.3971 21.5412 18.5062Z',
  d6: 'M21.001 6.99902V8.99824M2.99805 6.99902V8.99824M21.001 4.9998V2.00098H17.9995M5.99951 2.00098H2.99805L3.01459 4.9998M15.9995 2.00098H12.9995M10.9995 2.00098H7.99951',
  d7: 'M2.99805 11.9854H21.001V21.8991C21.001 21.9543 20.9562 21.999 20.901 21.999H3.09805C3.04282 21.999 2.99805 21.9543 2.99805 21.8991V11.9854Z',
  d8: 'M20.7751 1.24951C21.3135 1.24951 21.75 1.68705 21.75 2.22678V5.1586H19.8003V3.20406H17.8491V1.24951L20.7751 1.24951ZM19.8003 9.0677L19.8003 7.11315L21.75 7.11315L21.75 9.06769L19.8003 9.0677ZM12.9749 1.24951L15.8994 1.24951V3.20406H12.9749V1.24951ZM8.10056 1.24951L11.0251 1.24951V3.20406L8.10056 3.20406V1.24951ZM3.22486 1.24951L6.15085 1.24951V3.20406H4.2051L4.21582 5.15322L2.26613 5.16399L2.25001 2.23217C2.24858 1.97205 2.35066 1.7221 2.53363 1.53766C2.71661 1.35321 2.96538 1.24951 3.22486 1.24951ZM2.25 9.06769L2.25 7.11315H4.19972V9.06769H2.25Z',
  d9: 'M21.7469 21.7729C21.7469 22.3127 21.3104 22.7502 20.772 22.7502H3.23149C2.69336 22.7502 2.25701 22.3131 2.25663 21.7736L2.24902 11.0229L21.7469 11.0229V21.7729Z',
};

export const IconFlipBottomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-stroke-rounded IconFlipBottomStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFlipBottomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-duotone-rounded IconFlipBottomDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconFlipBottomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-twotone-rounded IconFlipBottomTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipBottomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-solid-rounded IconFlipBottomSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipBottomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-bulk-rounded IconFlipBottomBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlipBottomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-stroke-sharp IconFlipBottomStrokeSharp"
    >
      <path 
        d={d.d6} 
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

export const IconFlipBottomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flip-bottom-solid-sharp IconFlipBottomSolidSharp"
    >
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

export const iconPackOfFlipBottom: TheIconSelfPack = {
  name: 'FlipBottom',
  StrokeRounded: IconFlipBottomStrokeRounded,
  DuotoneRounded: IconFlipBottomDuotoneRounded,
  TwotoneRounded: IconFlipBottomTwotoneRounded,
  SolidRounded: IconFlipBottomSolidRounded,
  BulkRounded: IconFlipBottomBulkRounded,
  StrokeSharp: IconFlipBottomStrokeSharp,
  SolidSharp: IconFlipBottomSolidSharp,
};