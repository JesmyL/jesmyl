import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.25195 3V21',
  d2: 'M16.252 3V10.5',
  d3: 'M9.75195 3V7',
  d4: 'M9.75195 10V14',
  d5: 'M9.75195 17V21',
  d6: 'M19.6124 13.4393L20.3067 14.1317C20.8941 14.7175 20.8941 15.6672 20.3067 16.253L16.6692 19.9487C16.3831 20.234 16.0171 20.4264 15.6193 20.5005L13.3649 20.9885C13.009 21.0656 12.692 20.7504 12.7683 20.3952L13.2481 18.1599C13.3224 17.7632 13.5153 17.3982 13.8015 17.1129L17.4852 13.4393C18.0726 12.8536 19.025 12.8536 19.6124 13.4393Z',
  d7: 'M17.0785 13.8039C17.4119 13.4705 17.5785 13.3039 17.7519 13.2037C18.2225 12.9321 18.8022 12.9321 19.2727 13.2037C19.4461 13.3039 19.6128 13.4705 19.9461 13.8039C20.2795 14.1372 20.4461 14.3039 20.5463 14.4773C20.8179 14.9478 20.8179 15.5275 20.5463 15.9981C20.4461 16.1715 20.2795 16.3381 19.9461 16.6715L16.6383 19.9793C15.9774 20.6402 14.9801 20.6671 14.0977 20.8557C13.4078 21.0032 13.0628 21.077 12.8679 20.8821C12.673 20.6872 12.7468 20.3422 12.8943 19.6523C13.0829 18.7699 13.1098 17.7726 13.7707 17.1117L17.0785 13.8039Z',
  d8: 'M3.25 3V21',
  d9: 'M16.25 3V10.5',
  d10: 'M9.75 3V7',
  d11: 'M9.75 10V14',
  d12: 'M9.75 17V21',
  d13: 'M19.6055 13.4393L20.2998 14.1317C20.8872 14.7175 20.8872 15.6672 20.2998 16.253L16.6623 19.9487C16.3762 20.234 16.0102 20.4264 15.6124 20.5005L13.358 20.9885C13.0021 21.0656 12.6851 20.7504 12.7614 20.3952L13.2412 18.1599C13.3155 17.7632 13.5084 17.3982 13.7946 17.1129L17.4783 13.4393C18.0657 12.8536 19.0181 12.8536 19.6055 13.4393Z',
  d14: 'M20.1476 12.5542C19.4451 12.1486 18.5794 12.1486 17.8769 12.5542C17.6153 12.7053 17.381 12.94 17.1079 13.2137L13.7403 16.5814C13.275 17.0467 13.0575 17.6086 12.9286 18.1134C12.8643 18.3654 12.8184 18.6186 12.7788 18.8483L12.758 18.9693C12.7256 19.1582 12.6965 19.3285 12.6608 19.4955L12.6513 19.5398C12.5858 19.8458 12.5202 20.152 12.5041 20.4052C12.4864 20.6842 12.5137 21.0887 12.8375 21.4124C13.1613 21.7362 13.5657 21.7636 13.8447 21.7458C14.0979 21.7297 14.4041 21.6642 14.7101 21.5986L14.7545 21.5891C14.9214 21.5534 15.0917 21.5243 15.2807 21.4919L15.4016 21.4712C15.6313 21.4315 15.8845 21.3856 16.1365 21.3213C16.6413 21.1924 17.2032 20.975 17.6685 20.5097L21.0362 17.1421C21.3099 16.8689 21.5447 16.6347 21.6957 16.3731C22.1013 15.6705 22.1013 14.8049 21.6957 14.1023C21.5447 13.8407 21.3099 13.6064 21.0362 13.3333L20.9764 13.2735L20.9166 13.2137C20.6435 12.94 20.4092 12.7053 20.1476 12.5542Z',
  d15: 'M3 2C3.55228 2 4 2.44772 4 3V21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21V3C2 2.44772 2.44772 2 3 2Z',
  d16: 'M16 2C16.5523 2 17 2.44772 17 3V10.5C17 11.0523 16.5523 11.5 16 11.5C15.4477 11.5 15 11.0523 15 10.5V3C15 2.44772 15.4477 2 16 2Z',
  d17: 'M9.5 2C10.0523 2 10.5 2.44772 10.5 3V7C10.5 7.55228 10.0523 8 9.5 8C8.94772 8 8.5 7.55228 8.5 7V3C8.5 2.44772 8.94772 2 9.5 2ZM9.5 9C10.0523 9 10.5 9.44772 10.5 10L10.5 14C10.5 14.5523 10.0523 15 9.5 15C8.94772 15 8.5 14.5523 8.5 14V10C8.5 9.44772 8.94772 9 9.5 9ZM10.5 17C10.5 16.4477 10.0523 16 9.5 16C8.94772 16 8.5 16.4477 8.5 17V21C8.5 21.5523 8.94772 22 9.5 22C10.0523 22 10.5 21.5523 10.5 21L10.5 17Z',
  d18: 'M9.5 2C10.0523 2 10.5 2.44772 10.5 3V7C10.5 7.55228 10.0523 8 9.5 8C8.94772 8 8.5 7.55228 8.5 7V3C8.5 2.44772 8.94772 2 9.5 2Z',
  d19: 'M9.5 9C10.0523 9 10.5 9.44772 10.5 10L10.5 14C10.5 14.5523 10.0523 15 9.5 15C8.94772 15 8.5 14.5523 8.5 14L8.5 10C8.5 9.44772 8.94772 9 9.5 9Z',
  d20: 'M9.5 16C10.0523 16 10.5 16.4477 10.5 17L10.5 21C10.5 21.5523 10.0523 22 9.5 22C8.94772 22 8.5 21.5523 8.5 21L8.5 17C8.5 16.4477 8.94772 16 9.5 16Z',
  d21: 'M3 3V21',
  d22: 'M16 3V10.5',
  d23: 'M9.5 3V7',
  d24: 'M9.5 10V14',
  d25: 'M9.5 17V21',
  d26: 'M15.5017 19.9978H13.001V17.4978L18.4955 12.0049C18.4994 12.001 18.5058 12.001 18.5097 12.0049L20.9962 14.4907C21.0002 14.4946 21.0002 14.501 20.9962 14.5049L15.5017 19.9978Z',
  d27: 'M18.2197 11.7197C18.5126 11.4268 18.9874 11.4268 19.2803 11.7197L21.7803 14.2197C22.0732 14.5126 22.0732 14.9874 21.7803 15.2803L16.0607 21H12.5V17.4393L18.2197 11.7197Z',
  d28: 'M2 21V3H4V21H2Z',
  d29: 'M15 10.5V3H17V10.5H15Z',
  d30: 'M8.5 7V3H10.5V7H8.5Z',
  d31: 'M8.5 14L8.5 10L10.5 10L10.5 14L8.5 14Z',
  d32: 'M8.5 21L8.5 17L10.5 17L10.5 21L8.5 21Z',
};

export const IconEditRoadStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-stroke-rounded IconEditRoadStrokeRounded"
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
        strokeLinecap="round" 
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
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEditRoadDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-duotone-rounded IconEditRoadDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEditRoadTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-twotone-rounded IconEditRoadTwotoneRounded"
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
        strokeLinecap="round" 
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
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEditRoadSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-solid-rounded IconEditRoadSolidRounded"
    >
      <path 
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

export const IconEditRoadBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-bulk-rounded IconEditRoadBulkRounded"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEditRoadStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-stroke-sharp IconEditRoadStrokeSharp"
    >
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d26} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconEditRoadSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="edit-road-solid-sharp IconEditRoadSolidSharp"
    >
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEditRoad: TheIconSelfPack = {
  name: 'EditRoad',
  StrokeRounded: IconEditRoadStrokeRounded,
  DuotoneRounded: IconEditRoadDuotoneRounded,
  TwotoneRounded: IconEditRoadTwotoneRounded,
  SolidRounded: IconEditRoadSolidRounded,
  BulkRounded: IconEditRoadBulkRounded,
  StrokeSharp: IconEditRoadStrokeSharp,
  SolidSharp: IconEditRoadSolidSharp,
};