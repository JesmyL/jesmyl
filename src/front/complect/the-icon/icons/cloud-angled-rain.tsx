import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 15L11.5 17M17 15L16 17M13.5 19L12.5 21M8 15L7 17M9 19L8 21',
  d2: 'M17.4776 8.89801L17.5 8.89795C19.9853 8.89795 22 10.8784 22 13.3214C22 14.8551 21.206 16.2065 20 17M17.4776 8.89801C17.4924 8.73611 17.5 8.57216 17.5 8.40646C17.5 5.42055 15.0376 3 12 3C9.12324 3 6.76233 5.17106 6.52042 7.93728M17.4776 8.89801C17.3753 10.0132 16.9286 11.0307 16.2428 11.8469M6.52042 7.93728C3.98398 8.17454 2 10.2745 2 12.8299C2 14.4378 2.78565 15.8652 4 16.7619M6.52042 7.93728C6.67826 7.92251 6.83823 7.91496 7 7.91496C8.12582 7.91496 9.16474 8.28072 10.0005 8.89795',
  d3: 'M17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 15.7614 4.23858 18 7 18H17.5C19.9853 18 22 15.9853 22 13.5C22 11.0147 19.9853 9 17.5 9L17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5Z',
  d4: 'M8.44743 13.8558C8.94141 14.1028 9.14164 14.7035 8.89465 15.1974L7.89465 17.1974C7.64766 17.6914 7.04698 17.8916 6.55301 17.6446C6.05903 17.3977 5.8588 16.797 6.10579 16.303L7.10579 14.303C7.35278 13.809 7.95345 13.6088 8.44743 13.8558ZM12.9474 13.8558C13.4414 14.1028 13.6416 14.7035 13.3946 15.1974L12.3946 17.1974C12.1477 17.6914 11.547 17.8916 11.053 17.6446C10.559 17.3977 10.3588 16.797 10.6058 16.303L11.6058 14.303C11.8528 13.809 12.4535 13.6088 12.9474 13.8558ZM17.4474 13.8558C17.9414 14.1028 18.1416 14.7035 17.8946 15.1974L16.8946 17.1974C16.6477 17.6914 16.047 17.8916 15.553 17.6446C15.059 17.3977 14.8588 16.797 15.1058 16.303L16.1058 14.303C16.3528 13.809 16.9535 13.6088 17.4474 13.8558ZM9.44743 17.8558C9.94141 18.1028 10.1416 18.7035 9.89465 19.1974L8.89465 21.1974C8.64766 21.6914 8.04698 21.8916 7.55301 21.6446C7.05903 21.3977 6.8588 20.797 7.10579 20.303L8.10579 18.303C8.35278 17.809 8.95345 17.6088 9.44743 17.8558ZM13.9474 17.8558C14.4414 18.1028 14.6416 18.7035 14.3946 19.1974L13.3946 21.1974C13.1477 21.6914 12.547 21.8916 12.053 21.6446C11.559 21.3977 11.3588 20.797 11.6058 20.303L12.6058 18.303C12.8528 17.809 13.4535 17.6088 13.9474 17.8558Z',
  d5: 'M5.90764 7.09954C5.87784 7.22967 5.86294 7.29474 5.82354 7.33502C5.78413 7.37531 5.71913 7.39171 5.58913 7.42451C3.09536 8.05373 1.25 10.311 1.25 13C1.25 14.9761 2.24688 16.7194 3.76519 17.7545C4.20291 18.0529 4.42177 18.202 4.53188 18.135C4.642 18.068 4.60074 17.7283 4.51823 17.0489C4.46113 16.5788 4.5368 16.0871 4.76448 15.6318L5.76448 13.6318C6.38195 12.3968 7.88364 11.8963 9.11858 12.5137C9.3728 12.6409 9.5959 12.8054 9.78453 12.9974C10.0413 13.2588 10.1696 13.3894 10.253 13.3898C10.3364 13.3902 10.4656 13.2609 10.7239 13.0024C11.4678 12.2582 12.6327 12.0208 13.6186 12.5137C13.8728 12.6409 14.0959 12.8054 14.2845 12.9974C14.5413 13.2588 14.6696 13.3894 14.753 13.3898C14.8364 13.3902 14.9656 13.2609 15.2239 13.0025C15.9678 12.2582 17.1327 12.0208 18.1186 12.5137C19.3535 13.1312 19.8541 14.6329 19.2366 15.8678L18.2366 17.8678C18.0093 18.3224 17.8957 18.5497 17.9593 18.6461C17.9658 18.656 17.971 18.6626 17.979 18.6713C18.0572 18.7563 18.2552 18.712 18.6512 18.6234C20.9969 18.0986 22.75 16.004 22.75 13.5C22.75 10.9701 20.9606 8.85821 18.5784 8.36087C18.4169 8.32715 18.3361 8.31029 18.2922 8.26063C18.2482 8.21098 18.2413 8.1296 18.2276 7.96686C17.9571 4.76463 15.2722 2.25 12 2.25C9.02957 2.25 6.5437 4.32177 5.90764 7.09954Z',
  d6: 'M6.10547 16.8555L7.10547 14.8555L8.89432 15.7499L7.89432 17.7499L6.10547 16.8555ZM10.6055 16.8555L11.6055 14.8555L13.3943 15.7499L12.3943 17.7499L10.6055 16.8555ZM15.1055 16.8555L16.1055 14.8555L17.8943 15.7499L16.8943 17.7499L15.1055 16.8555ZM7.10547 20.8555L8.10547 18.8555L9.89432 19.7499L8.89432 21.7499L7.10547 20.8555ZM11.6055 20.8555L12.6055 18.8555L14.3943 19.7499L13.3943 21.7499L11.6055 20.8555Z',
  d7: 'M5.853 7.36454C3.22664 7.89643 1.25 10.217 1.25 13C1.25 14.9175 2.18856 16.6157 3.63134 17.6604L6.43491 12.8428L10.0349 14.6428L10.9349 12.8428L14.5349 14.6428L15.4349 12.8428L19.907 15.0788L18.0877 18.7175C20.7106 18.4253 22.75 16.2008 22.75 13.5C22.75 10.8541 20.7927 8.66534 18.2469 8.30273C18.1428 4.94224 15.3858 2.25 12 2.25C8.93585 2.25 6.38731 4.45456 5.853 7.36454Z',
};

export const IconCloudAngledRainStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-stroke-rounded IconCloudAngledRainStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconCloudAngledRainDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-duotone-rounded IconCloudAngledRainDuotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCloudAngledRainTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-twotone-rounded IconCloudAngledRainTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconCloudAngledRainSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-solid-rounded IconCloudAngledRainSolidRounded"
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

export const IconCloudAngledRainBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-bulk-rounded IconCloudAngledRainBulkRounded"
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

export const IconCloudAngledRainStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-stroke-sharp IconCloudAngledRainStrokeSharp"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCloudAngledRainSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cloud-angled-rain-solid-sharp IconCloudAngledRainSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfCloudAngledRain: TheIconSelfPack = {
  name: 'CloudAngledRain',
  StrokeRounded: IconCloudAngledRainStrokeRounded,
  DuotoneRounded: IconCloudAngledRainDuotoneRounded,
  TwotoneRounded: IconCloudAngledRainTwotoneRounded,
  SolidRounded: IconCloudAngledRainSolidRounded,
  BulkRounded: IconCloudAngledRainBulkRounded,
  StrokeSharp: IconCloudAngledRainStrokeSharp,
  SolidSharp: IconCloudAngledRainSolidSharp,
};