import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 9C19.1434 4.9811 14.9912 2 11.0011 2C7.45834 2 4.08963 4.09916 2.68627 7.37966C0.090763 13.4469 5.41302 17.626 9.38449 21.367C9.81818 21.773 10.3978 22 11.0011 22C11.5513 22 12.0819 21.8112 12.5 21.4699',
  d2: 'M14 9.19621C13.3876 8.17979 12.2732 7.5 11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.3962 8.31753 13.6015 9.5 14.1632',
  d3: 'M17 16H17.009',
  d4: 'M17.8981 21.6518C17.6572 21.8752 17.3352 22 17.0001 22C16.665 22 16.343 21.8752 16.1021 21.6518C13.8959 19.5943 10.9394 17.2958 12.3812 13.9588C13.1608 12.1545 15.0321 11 17.0001 11C18.9681 11 20.8394 12.1545 21.619 13.9588C23.059 17.2916 20.1097 19.6014 17.8981 21.6518Z',
  d5: 'M11 2C15.8706 2 20 6.03298 20 10.9258C20 11.2665 19.9803 11.6003 19.9423 11.9272C19.0935 11.3354 18.0609 11 17.0001 11C16.0907 11 15.202 11.2465 14.432 11.6898C14.4766 11.4668 14.5 11.2361 14.5 11C14.5 9.067 12.933 7.5 11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.933 9.067 14.5 11 14.5C11.444 14.5 11.8687 14.4173 12.2595 14.2665C11.411 16.633 12.7777 18.4696 14.4143 20.0777C13.6 20.6908 12.7562 21.2493 11.927 21.7567C11.6445 21.9162 11.325 22 11 22C10.675 22 10.3555 21.9162 10.073 21.7567C6.2039 19.3616 2 15.9137 2 10.9258C2 6.03298 6.12944 2 11 2Z',
  d6: 'M1.99616 7.08468C3.52407 3.51303 7.1744 1.25 11.0006 1.25C14.8267 1.25 18.4771 3.51303 20.005 7.08468C20.4256 8.06803 20.6544 9.00854 20.7264 9.90834C20.7492 10.1924 20.7605 10.3344 20.6695 10.4004C20.5785 10.4663 20.4359 10.4064 20.1508 10.2868C19.3169 9.9368 18.4146 9.75 17.502 9.75C16.7817 9.75 16.0678 9.86637 15.3889 10.0875C15.1732 10.1578 15.0653 10.1929 14.9913 10.155C14.9173 10.1171 14.8815 10.0052 14.81 9.78142C14.2946 8.16818 12.7832 7 10.999 7C8.78988 7 6.99902 8.79086 6.99902 11C6.99902 13.008 8.47867 14.6705 10.4071 14.9565C10.6366 14.9906 10.7514 15.0076 10.8007 15.0733C10.85 15.139 10.8348 15.2509 10.8043 15.4748C10.5741 17.1635 11.1162 18.6498 11.9153 19.8547C12.276 20.3986 12.7049 20.9089 13.1447 21.3767C13.26 21.4995 13.3177 21.5608 13.323 21.6313C13.3241 21.6458 13.3237 21.6596 13.3217 21.6739C13.3119 21.7439 13.2512 21.8008 13.1298 21.9144C12.5548 22.4528 11.7909 22.75 11.0006 22.75C10.2102 22.75 9.44636 22.4528 8.87134 21.9145L8.86968 21.9129C8.55943 21.6206 8.2369 21.3224 7.90757 21.0178L7.90645 21.0168C6.17737 19.4178 4.2608 17.6454 2.94674 15.6595C1.34399 13.2373 0.574203 10.4086 1.99616 7.08468Z',
  d7: 'M17.5011 11.25C15.4495 11.25 13.4828 12.4592 12.6556 14.3884C11.8819 16.193 12.3099 17.7372 13.1645 19.0257C13.8536 20.0649 14.8591 20.992 15.7352 21.7999L15.7353 21.8C15.9005 21.9524 16.0611 22.1005 16.2142 22.2443L16.2157 22.2457C16.565 22.572 17.0263 22.75 17.5011 22.75C17.9758 22.75 18.4371 22.572 18.7865 22.2457C18.9316 22.1101 19.0833 21.9707 19.2392 21.8275C20.1242 21.0144 21.143 20.0784 21.8393 19.0261C22.6928 17.7364 23.1193 16.1908 22.3466 14.3884C21.5194 12.4592 19.5526 11.25 17.5011 11.25ZM17.492 14.5C16.3924 14.5 15.501 15.3954 15.501 16.5C15.501 17.6046 16.3924 18.5 17.492 18.5H17.5099C18.6095 18.5 19.501 17.6046 19.501 16.5C19.501 15.3954 18.6095 14.5 17.5099 14.5H17.492Z',
  d8: 'M17.5 11C15.0147 11 13 12.9898 13 15.4444C13 16.8479 13.5625 17.9392 14.6875 18.914C15.4805 19.6011 16.9232 21.0749 17.5 22C18.106 21.0933 19.5195 19.6011 20.3125 18.914C21.4375 17.9392 22 16.8479 22 15.4444C22 12.9898 19.9853 11 17.5 11Z',
  d9: 'M13.5352 10C13.5352 8.067 11.9682 6.5 10.0352 6.5C8.10216 6.5 6.53516 8.067 6.53516 10C6.53516 11.933 8.10216 13.5 10.0352 13.5C10.4027 13.5 10.7571 13.4433 11.09 13.3383',
  d10: 'M12.062 19.3956C11.2398 20.326 10.4783 21.2679 10 21.9999C8.97463 20.3179 6.40971 17.6382 5 16.389C3 14.6167 2 12.6325 2 10.0807C2 5.61783 5.58172 2 10 2C13.9735 2 17.2703 4.92604 17.8939 8.76126',
  d11: 'M17.501 15.5H17.51',
  d12: 'M17.5 10.25C14.6093 10.25 12.25 12.5668 12.25 15.4444C12.25 17.0972 12.9326 18.3858 14.1964 19.4808C14.9709 20.1519 16.3464 21.5674 16.8636 22.3968C16.9983 22.6129 17.2335 22.7459 17.4881 22.7499C17.7428 22.7539 17.982 22.6285 18.1236 22.4167C18.6808 21.583 20.0428 20.1401 20.8036 19.4808C22.0674 18.3858 22.75 17.0972 22.75 15.4444C22.75 12.5668 20.3907 10.25 17.5 10.25ZM17.494 13.5C16.3928 13.5 15.5 14.3954 15.5 15.5C15.5 16.6046 16.3928 17.5 17.494 17.5H17.506C18.6072 17.5 19.5 16.6046 19.5 15.5C19.5 14.3954 18.6072 13.5 17.506 13.5H17.494Z',
  d13: 'M1.25 10.0807C1.25 5.21073 5.16043 1.25 10 1.25C14.4246 1.25 18.0725 4.56057 18.6656 8.84982C18.2865 8.78419 17.897 8.75 17.5 8.75C16.024 8.75 14.6517 9.22246 13.5351 10.0268C13.5351 10.0179 13.5352 10.0089 13.5352 10C13.5352 8.067 11.9682 6.5 10.0352 6.5C8.10216 6.5 6.53516 8.067 6.53516 10C6.53516 11.933 8.10216 13.5 10.0352 13.5C10.4027 13.5 10.7571 13.4433 11.09 13.3383C10.8695 13.9993 10.75 14.7071 10.75 15.4444C10.75 17.2667 11.412 18.7526 12.5503 19.9757C11.778 20.8542 11.0705 21.7327 10.6278 22.4101C10.487 22.6256 10.2456 22.7538 9.98825 22.7498C9.7309 22.7457 9.49359 22.61 9.35962 22.3903C8.39254 20.804 5.89367 18.183 4.50258 16.9503C2.36442 15.0556 1.25 12.8754 1.25 10.0807Z',
};

export const IconMapPinpoint02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-stroke-rounded IconMapPinpoint02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMapPinpoint02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-duotone-rounded IconMapPinpoint02DuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapPinpoint02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-twotone-rounded IconMapPinpoint02TwotoneRounded"
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
      />
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconMapPinpoint02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-solid-rounded IconMapPinpoint02SolidRounded"
    >
      <path 
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

export const IconMapPinpoint02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-bulk-rounded IconMapPinpoint02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMapPinpoint02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-stroke-sharp IconMapPinpoint02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapPinpoint02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="map-pinpoint-02-solid-sharp IconMapPinpoint02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfMapPinpoint02: TheIconSelfPack = {
  name: 'MapPinpoint02',
  StrokeRounded: IconMapPinpoint02StrokeRounded,
  DuotoneRounded: IconMapPinpoint02DuotoneRounded,
  TwotoneRounded: IconMapPinpoint02TwotoneRounded,
  SolidRounded: IconMapPinpoint02SolidRounded,
  BulkRounded: IconMapPinpoint02BulkRounded,
  StrokeSharp: IconMapPinpoint02StrokeSharp,
  SolidSharp: IconMapPinpoint02SolidSharp,
};