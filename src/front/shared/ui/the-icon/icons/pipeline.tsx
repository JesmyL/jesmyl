import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.2498 16.4334C14.3307 19.4778 13.3712 21 12 21C10.6288 21 9.66926 19.4778 7.75025 16.4334L5.50587 12.8729C2.76382 8.5228 1.3928 6.34777 2.25742 4.67388C3.12205 3 5.61655 3 10.6056 3L13.3944 3C18.3834 3 20.878 3 21.7426 4.67389C22.6072 6.34777 21.2362 8.5228 18.4941 12.8729L16.2498 16.4334Z',
  d2: 'M21 9L3 9M17.1818 15L7 15',
  d3: 'M12 21C13.3712 21 14.3307 19.4778 16.2497 16.4334L17.1533 15H6.84756L7.75023 16.4334C9.66924 19.4778 10.6287 21 12 21Z',
  d4: 'M20.8505 9C21.9262 7.04721 22.3014 5.75585 21.7426 4.67389C20.8779 3 18.3834 3 13.3944 3H10.6055C5.61653 3 3.12203 3 2.2574 4.67388C1.66326 5.61299 2.60516 7.94926 3.15037 9H20.8505Z',
  d5: 'M12.0003 21.75C10.985 21.75 10.2122 21.1656 9.51098 20.3459C8.82416 19.5431 8.08085 18.3639 7.15074 16.8883C6.91295 16.5111 6.79405 16.3224 6.86194 16.1747C6.86808 16.1614 6.87518 16.1485 6.8832 16.1362C6.97196 16 7.19492 16 7.64085 16H16.3598C16.8057 16 17.0287 16 17.1175 16.1362C17.1255 16.1485 17.1326 16.1614 17.1387 16.1747C17.2066 16.3224 17.0877 16.5111 16.8499 16.8883L16.8499 16.8883L16.8499 16.8883C15.9198 18.3639 15.1765 19.5431 14.4897 20.3459C13.7884 21.1656 13.0157 21.75 12.0003 21.75ZM18.8471 13.7199C18.7608 13.8569 18.7176 13.9253 18.6499 13.9627C18.5823 14 18.5014 14 18.3395 14H5.66116C5.4993 14 5.41836 14 5.35071 13.9627C5.28305 13.9253 5.23989 13.8569 5.15358 13.7199L4.836 13.2161C4.30478 12.3734 3.81898 11.6027 3.38872 10.8956C3.14957 10.5025 3.03 10.306 3.116 10.153C3.202 10 3.43386 10 3.89759 10H20.1031C20.5668 10 20.7987 10 20.8847 10.153C20.9707 10.306 20.8511 10.5025 20.6119 10.8956C20.1817 11.6027 19.6959 12.3734 19.1646 13.2161L18.8471 13.7199ZM22.3397 7.63719C22.2724 7.80937 22.2388 7.89546 22.1623 7.94773C22.0857 8 21.9894 8 21.7967 8H2.20398C2.01126 8 1.9149 8 1.83837 7.94773C1.76184 7.89546 1.72823 7.80937 1.66099 7.63719C1.19658 6.44796 1.06291 5.35282 1.59139 4.32969C2.19038 3.17008 3.33525 2.68963 4.77075 2.46802C6.1832 2.24996 8.10042 2.24998 10.5344 2.25H10.5344H10.5344H13.4662H13.4662H13.4663C15.9002 2.24998 17.8175 2.24996 19.2299 2.46802C20.6654 2.68963 21.8103 3.17008 22.4093 4.32969C22.9377 5.35282 22.8041 6.44796 22.3397 7.63719Z',
  d6: 'M12.0011 21.75C10.9857 21.75 10.213 21.1656 9.51172 20.3459C8.8249 19.5431 8.08159 18.3639 7.15148 16.8883C6.91369 16.5111 6.7948 16.3224 6.86269 16.1747C6.86882 16.1614 6.87592 16.1485 6.88394 16.1362C6.9727 16 7.19567 16 7.6416 16H16.3606C16.8065 16 17.0294 16 17.1182 16.1362C17.1262 16.1485 17.1333 16.1614 17.1395 16.1747C17.2073 16.3225 17.0884 16.5111 16.8507 16.8883C15.9206 18.3639 15.1772 19.5431 14.4904 20.3459C13.7892 21.1656 13.0164 21.75 12.0011 21.75Z',
  d7: 'M18.8468 13.7199C18.7605 13.8569 18.7173 13.9253 18.6497 13.9627C18.582 14 18.5011 14 18.3392 14H5.66088C5.49902 14 5.41808 14 5.35043 13.9627C5.28277 13.9253 5.23962 13.8569 5.1533 13.7199L4.83572 13.2161C4.3045 12.3734 3.8187 11.6027 3.38844 10.8956C3.14929 10.5025 3.02972 10.306 3.11572 10.153C3.20172 10 3.43358 10 3.89731 10H20.1028C20.5665 10 20.7984 10 20.8844 10.153C20.9704 10.306 20.8508 10.5025 20.6117 10.8956C20.1814 11.6027 19.6956 12.3734 19.1644 13.2161L18.8468 13.7199Z',
  d8: 'M22.3397 7.63719C22.2724 7.80937 22.2388 7.89546 22.1623 7.94773C22.0858 8 21.9894 8 21.7967 8H2.20398C2.01126 8 1.9149 8 1.83837 7.94773C1.76184 7.89546 1.72823 7.80937 1.66099 7.63719C1.19658 6.44796 1.06291 5.35282 1.59139 4.32969C2.19038 3.17008 3.33525 2.68963 4.77075 2.46802C6.1832 2.24996 8.10042 2.24998 10.5344 2.25H13.4662C15.9002 2.24998 17.8175 2.24996 19.2299 2.46802C20.6654 2.68963 21.8103 3.17008 22.4093 4.32969C22.9377 5.35282 22.8041 6.44796 22.3397 7.63719Z',
  d9: 'M22 3L12 21L2 3H22Z',
  d10: 'M19 9L5 9M16.1818 14L8 14',
  d11: 'M20.6365 6.99976L23.2753 2.24976H0.726074L3.36496 6.99975L20.6365 6.99976Z',
  d12: 'M19.5253 8.99976L16.7476 13.9998L7.25385 13.9998L4.47607 8.99975L19.5253 8.99976Z',
  d13: 'M8.36496 15.9998L15.6365 15.9998L12.0007 22.5441L8.36496 15.9998Z',
};

export const IconPipelineStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-stroke-rounded IconPipelineStrokeRounded"
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

export const IconPipelineDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-duotone-rounded IconPipelineDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconPipelineTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-twotone-rounded IconPipelineTwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPipelineSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-solid-rounded IconPipelineSolidRounded"
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

export const IconPipelineBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-bulk-rounded IconPipelineBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPipelineStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-stroke-sharp IconPipelineStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPipelineSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pipeline-solid-sharp IconPipelineSolidSharp"
    >
      <path 
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

export const iconPackOfPipeline: TheIconSelfPack = {
  name: 'Pipeline',
  StrokeRounded: IconPipelineStrokeRounded,
  DuotoneRounded: IconPipelineDuotoneRounded,
  TwotoneRounded: IconPipelineTwotoneRounded,
  SolidRounded: IconPipelineSolidRounded,
  BulkRounded: IconPipelineBulkRounded,
  StrokeSharp: IconPipelineStrokeSharp,
  SolidSharp: IconPipelineSolidSharp,
};