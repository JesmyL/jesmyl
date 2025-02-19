import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 8C7.20949 8.5826 7.77476 9 8.43922 9C9.10367 9 9.66894 8.5826 9.87843 8M14.1216 8C14.3311 8.5826 14.8963 9 15.5608 9C16.2252 9 16.7905 8.5826 17 8',
  d2: 'M12 13.5C13.6732 13.5 15.1098 14.4559 15.7297 15.8205C15.9802 16.3718 16.1055 16.6475 15.8889 16.8748C15.6723 17.1022 15.2907 16.9913 14.5274 16.7696C13.8039 16.5595 12.9019 16.3703 12 16.3703C11.0981 16.3703 10.1961 16.5595 9.47257 16.7696C8.70933 16.9913 8.32771 17.1022 8.11112 16.8748C7.89454 16.6475 8.01978 16.3718 8.27026 15.8205C8.89021 14.4559 10.3268 13.5 12 13.5Z',
  d3: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.7297 15.8205C15.1098 14.4559 13.6732 13.5 12 13.5C10.3268 13.5 8.89021 14.4559 8.27026 15.8205C8.01978 16.3718 7.89454 16.6475 8.11112 16.8748C8.32771 17.1022 8.70933 16.9913 9.47257 16.7696C10.1961 16.5595 11.0981 16.3703 12 16.3703C12.9019 16.3703 13.8039 16.5595 14.5274 16.7696C15.2907 16.9913 15.6723 17.1022 15.8889 16.8748C16.1055 16.6475 15.9802 16.3718 15.7297 15.8205Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.43942 8.25C8.09461 8.25 7.80952 8.0342 7.70596 7.74622C7.5658 7.35644 7.1362 7.15408 6.74642 7.29424C6.35664 7.4344 6.15429 7.864 6.29445 8.25378C6.60988 9.13099 7.45533 9.75 8.43942 9.75C9.42351 9.75 10.269 9.13099 10.5844 8.25378C10.7246 7.864 10.5222 7.4344 10.1324 7.29424C9.74264 7.15408 9.31304 7.35644 9.17288 7.74622C9.06932 8.0342 8.78423 8.25 8.43942 8.25ZM15.561 8.25C15.2162 8.25 14.9311 8.0342 14.8275 7.74622C14.6874 7.35644 14.2578 7.15408 13.868 7.29424C13.4782 7.4344 13.2759 7.864 13.416 8.25378C13.7314 9.13099 14.5769 9.75 15.561 9.75C16.5451 9.75 17.3905 9.13099 17.706 8.25378C17.8461 7.864 17.6438 7.4344 17.254 7.29424C16.8642 7.15408 16.4346 7.35644 16.2944 7.74622C16.1909 8.0342 15.9058 8.25 15.561 8.25ZM15.7297 15.8205C15.1098 14.4559 13.6732 13.5 12 13.5C10.3268 13.5 8.89021 14.4559 8.27026 15.8205C8.01978 16.3718 7.89454 16.6475 8.11112 16.8748C8.32771 17.1022 8.70933 16.9913 9.47257 16.7696C10.1961 16.5595 11.0981 16.3703 12 16.3703C12.9019 16.3703 13.8039 16.5595 14.5274 16.7696C15.2907 16.9913 15.6723 17.1022 15.8889 16.8748C16.1055 16.6475 15.9802 16.3718 15.7297 15.8205Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M8.43942 8.25C8.09461 8.25 7.80952 8.0342 7.70596 7.74622C7.5658 7.35644 7.1362 7.15408 6.74642 7.29424C6.35664 7.4344 6.15429 7.864 6.29445 8.25378C6.60988 9.13099 7.45533 9.75 8.43942 9.75C9.42351 9.75 10.269 9.13099 10.5844 8.25378C10.7246 7.864 10.5222 7.4344 10.1324 7.29424C9.74264 7.15408 9.31304 7.35644 9.17288 7.74622C9.06932 8.0342 8.78423 8.25 8.43942 8.25ZM15.561 8.25C15.2162 8.25 14.9311 8.0342 14.8275 7.74622C14.6874 7.35644 14.2578 7.15408 13.868 7.29424C13.4782 7.4344 13.2759 7.864 13.416 8.25378C13.7314 9.13099 14.5769 9.75 15.561 9.75C16.5451 9.75 17.3905 9.13099 17.706 8.25378C17.8461 7.864 17.6438 7.4344 17.254 7.29424C16.8642 7.15408 16.4346 7.35644 16.2944 7.74622C16.1909 8.0342 15.9058 8.25 15.561 8.25Z',
  d7: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.4399 8.25C8.09508 8.25 7.80999 8.0342 7.70644 7.74622L6.29492 8.25378C6.61035 9.13099 7.45581 9.75 8.4399 9.75C9.42399 9.75 10.2694 9.13099 10.5849 8.25378L9.17335 7.74622C9.0698 8.0342 8.78471 8.25 8.4399 8.25ZM15.5615 8.25C15.2167 8.25 14.9316 8.0342 14.828 7.74622L13.4165 8.25378C13.7319 9.13099 14.5774 9.75 15.5615 9.75C16.5456 9.75 17.391 9.13099 17.7064 8.25378L16.2949 7.74622C16.1914 8.0342 15.9063 8.25 15.5615 8.25ZM15.7297 15.8205C15.1098 14.4559 13.6732 13.5 12 13.5C10.3268 13.5 8.89021 14.4559 8.27026 15.8205C8.01978 16.3718 7.89454 16.6475 8.11112 16.8748C8.32771 17.1022 8.70933 16.9913 9.47257 16.7696C10.1961 16.5595 11.0981 16.3703 12 16.3703C12.9019 16.3703 13.8039 16.5595 14.5274 16.7696C15.2907 16.9913 15.6723 17.1022 15.8889 16.8748C16.1055 16.6475 15.9802 16.3718 15.7297 15.8205Z',
};

export const IconTired01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-stroke-rounded IconTired01StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconTired01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-duotone-rounded IconTired01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconTired01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-twotone-rounded IconTired01TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
    </TheIconWrapper>
  );
};

export const IconTired01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-solid-rounded IconTired01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTired01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-bulk-rounded IconTired01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTired01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-stroke-sharp IconTired01StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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

export const IconTired01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tired-01-solid-sharp IconTired01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTired01: TheIconSelfPack = {
  name: 'Tired01',
  StrokeRounded: IconTired01StrokeRounded,
  DuotoneRounded: IconTired01DuotoneRounded,
  TwotoneRounded: IconTired01TwotoneRounded,
  SolidRounded: IconTired01SolidRounded,
  BulkRounded: IconTired01BulkRounded,
  StrokeSharp: IconTired01StrokeSharp,
  SolidSharp: IconTired01SolidSharp,
};