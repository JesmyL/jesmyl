import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.01654 6.15879C10.9944 4.77262 17.9171 3.55944 18.906 6.15879C20.3862 10.0497 3.87743 12.3805 5.06077 6.15849C5.55508 3.55944 10.5002 2 12.9725 2',
  d2: 'M18 11.1934C15.423 13.0706 8.5771 13.8244 6 11.7816',
  d3: 'M14.0219 21.6941C13.0436 21.8816 12.0077 21.989 11 21.9995',
  d4: 'M7 15.166C9.07731 16.0444 12.3835 15.9574 15 15.2812',
  d5: 'M8.03906 18.5039C9.49304 18.8598 11.2867 18.8854 12.9988 18.6635',
  d6: 'M5.06077 6.15847C3.87742 12.3804 20.3862 10.0496 18.906 6.15876C18.3466 4.68823 15.888 4.43791 13.5 4.74881L12.9726 2C10.5002 2 5.55508 3.55942 5.06077 6.15847Z',
  d7: 'M14.0219 21.6951C13.0436 21.8825 12.0077 21.9899 11 22.0005',
  d8: 'M6.8246 5.15741C6.35159 5.58074 6.11185 5.98349 6.04303 6.34533C5.93715 6.90204 6.03681 7.28095 6.21891 7.56562C6.41518 7.87245 6.77176 8.16798 7.33453 8.4148C8.47891 8.9167 10.1977 9.09366 12.018 8.9539C13.8267 8.81503 15.5776 8.37569 16.7491 7.7829C17.3415 7.48316 17.7025 7.18577 17.8778 6.94403C18.0221 6.74501 18.0166 6.63377 17.9712 6.51436C17.8859 6.29028 17.6291 6.02051 16.951 5.82997C16.2861 5.64312 15.3941 5.59018 14.404 5.66163C13.425 5.73227 12.4109 5.91998 11.5305 6.17033C10.6299 6.42643 9.95064 6.72518 9.59033 6.9777C9.13806 7.29467 8.51447 7.18498 8.1975 6.73271C7.88053 6.28044 7.99022 5.65684 8.44249 5.33988C9.07112 4.89931 9.99886 4.5266 10.9835 4.2466C11.9883 3.96085 13.1375 3.74782 14.26 3.66681C15.3715 3.58661 16.5191 3.63112 17.4921 3.90455C18.452 4.17429 19.4313 4.72762 19.8405 5.80322C20.1651 6.65653 19.9675 7.46926 19.4969 8.11815C19.0573 8.72431 18.3807 9.19874 17.6521 9.56746C16.1815 10.3116 14.1566 10.7956 12.1711 10.948C10.1972 11.0996 8.10317 10.9358 6.53124 10.2464C5.73584 9.89754 5.00839 9.38477 4.53412 8.64334C4.04567 7.87975 3.88829 6.97044 4.07825 5.97166C4.25659 5.03396 4.82035 4.26714 5.49083 3.66709C6.16401 3.06462 7.00433 2.57517 7.8684 2.19089C9.58406 1.42787 11.5765 1 12.9724 1C13.5247 1 13.9724 1.44772 13.9724 2C13.9724 2.55228 13.5247 3 12.9724 3C11.896 3 10.1797 3.35185 8.68112 4.01831C7.93808 4.34877 7.29491 4.7365 6.8246 5.15741Z',
  d9: 'M18.8083 10.6046C19.1335 11.051 19.0352 11.6765 18.5888 12.0017C17.0815 13.0997 14.5082 13.7815 12.0711 13.9551C10.8299 14.0435 9.56664 14.0049 8.42337 13.7999C7.29373 13.5974 6.2026 13.2183 5.37885 12.5654C4.94605 12.2223 4.87331 11.5933 5.21638 11.1605C5.55946 10.7277 6.18843 10.655 6.62123 10.998C7.08603 11.3665 7.81704 11.6593 8.77634 11.8313C9.72201 12.0008 10.8145 12.0395 11.929 11.9601C14.2034 11.7982 16.3415 11.1644 17.4112 10.3851C17.8576 10.06 18.4831 10.1582 18.8083 10.6046Z',
  d10: 'M14.21 22.6767C14.7525 22.5727 15.1079 22.0488 15.004 21.5063C14.9001 20.9639 14.3761 20.6085 13.8337 20.7124C12.912 20.889 11.9356 20.9901 10.9895 21C10.4373 21.0058 9.99427 21.4581 10.0001 22.0104C10.0058 22.5626 10.4582 23.0056 11.0105 22.9999C12.0798 22.9887 13.1752 22.8749 14.21 22.6767Z',
  d11: 'M6.07921 14.7758C6.2943 14.2672 6.88103 14.0292 7.38971 14.2443C8.2611 14.6127 9.46095 14.8025 10.8006 14.8059C12.1284 14.8092 13.5241 14.6291 14.75 14.3123C15.2847 14.1741 15.8302 14.4955 15.9684 15.0302C16.1066 15.5649 15.7852 16.1104 15.2505 16.2486C13.8599 16.608 12.2943 16.8096 10.7956 16.8059C9.30863 16.8022 7.81672 16.5963 6.6108 16.0863C6.10212 15.8713 5.86412 15.2845 6.07921 14.7758Z',
  d12: 'M8.27703 17.5328C7.74058 17.4015 7.19926 17.73 7.06797 18.2664C6.93667 18.8029 7.26511 19.3442 7.80156 19.4755C9.4096 19.869 11.3338 19.888 13.1276 19.6554C13.6753 19.5844 14.0617 19.0828 13.9907 18.5351C13.9197 17.9874 13.4181 17.601 12.8704 17.672C11.2399 17.8834 9.57694 17.851 8.27703 17.5328Z',
  d13: 'M18.8083 10.6066C19.1335 11.053 19.0352 11.6785 18.5888 12.0037C17.0815 13.1017 14.5082 13.7835 12.0711 13.957C10.8299 14.0454 9.56664 14.0068 8.42337 13.8018C7.29373 13.5993 6.2026 13.2203 5.37885 12.5673C4.94605 12.2242 4.87331 11.5953 5.21638 11.1625C5.55946 10.7297 6.18843 10.6569 6.62123 11C7.08603 11.3684 7.81704 11.6612 8.77634 11.8332C9.72201 12.0028 10.8145 12.0415 11.929 11.9621C14.2034 11.8001 16.3415 11.1664 17.4112 10.3871C17.8576 10.0619 18.4831 10.1602 18.8083 10.6066Z',
  d14: 'M6.07921 14.7778C6.2943 14.2691 6.88103 14.0311 7.38971 14.2462C8.2611 14.6147 9.46095 14.8045 10.8006 14.8078C12.1284 14.8111 13.5241 14.6311 14.75 14.3142C15.2847 14.176 15.8302 14.4974 15.9684 15.0322C16.1066 15.5669 15.7852 16.1124 15.2505 16.2506C13.8599 16.61 12.2943 16.8115 10.7956 16.8078C9.30863 16.8041 7.81672 16.5982 6.6108 16.0883C6.10212 15.8732 5.86412 15.2865 6.07921 14.7778Z',
  d15: 'M8.27703 17.5348C7.74058 17.4035 7.19926 17.7319 7.06797 18.2684C6.93667 18.8048 7.26511 19.3461 7.80156 19.4774C9.4096 19.871 11.3338 19.8899 13.1276 19.6573C13.6753 19.5863 14.0617 19.0848 13.9907 18.5371C13.9197 17.9894 13.4181 17.6029 12.8704 17.6739C11.2399 17.8853 9.57694 17.8529 8.27703 17.5348Z',
  d16: 'M6.8246 5.15741C6.35159 5.58074 6.11185 5.98349 6.04303 6.34533C5.93715 6.90204 6.03681 7.28095 6.21891 7.56562C6.41518 7.87245 6.77176 8.16798 7.33453 8.4148C8.47891 8.9167 10.1977 9.09366 12.018 8.9539C13.8267 8.81503 15.5776 8.37569 16.7491 7.7829C17.3415 7.48316 17.7025 7.18577 17.8778 6.94403C18.0221 6.74501 18.0166 6.63377 17.9712 6.51436C17.8859 6.29028 17.6291 6.02051 16.951 5.82997C16.2861 5.64312 15.3941 5.59018 14.404 5.66163C13.425 5.73227 12.4109 5.91998 11.5305 6.17033C10.6299 6.42643 9.95064 6.72518 9.59033 6.9777L8.44249 5.33988C9.07112 4.89931 9.99886 4.5266 10.9835 4.2466C11.9883 3.96085 13.1375 3.74782 14.26 3.66681C15.3715 3.58661 16.5191 3.63112 17.4921 3.90455C18.452 4.17429 19.4313 4.72762 19.8405 5.80322C20.1651 6.65653 19.9675 7.46926 19.4969 8.11815C19.0573 8.72431 18.3807 9.19874 17.6521 9.56746C16.1815 10.3116 14.1566 10.7956 12.1711 10.948C10.1972 11.0996 8.10317 10.9358 6.53124 10.2464C5.73584 9.89754 5.00839 9.38477 4.53412 8.64334C4.04567 7.87975 3.88829 6.97044 4.07825 5.97166C4.25659 5.03396 4.82035 4.26714 5.49083 3.66709C6.16401 3.06462 7.00433 2.57517 7.8684 2.19089C9.58406 1.42787 11.5765 1 12.9724 1V3C11.896 3 10.1797 3.35185 8.68112 4.01831C7.93808 4.34877 7.29491 4.7365 6.8246 5.15741Z',
  d17: 'M11.9291 11.9597C14.2034 11.7978 16.3415 11.164 17.4113 10.3848L18.5889 12.0013C17.0816 13.0993 14.5083 13.7811 12.0711 13.9547C10.83 14.0431 9.56669 14.0045 8.42343 13.7995C7.29379 13.597 6.20266 13.2179 5.37891 12.565L6.62129 10.9977C7.08609 11.3661 7.8171 11.6589 8.77639 11.8309C9.72207 12.0005 10.8145 12.0391 11.9291 11.9597Z',
  d18: 'M10.9883 20.9995C11.9343 20.9896 12.9108 20.8885 13.8324 20.7119L14.2088 22.6762C13.1739 22.8745 12.0785 22.9882 11.0092 22.9994L10.9883 20.9995Z',
  d19: 'M10.7991 14.8067C12.1269 14.81 13.5227 14.63 14.7486 14.3131L15.2491 16.2495C13.8585 16.6089 12.2929 16.8105 10.7941 16.8067C9.3072 16.803 7.81529 16.5971 6.60938 16.0872L7.38829 14.2451C8.25968 14.6136 9.45953 14.8034 10.7991 14.8067Z',
  d20: 'M8.27625 17.5322C9.57616 17.8504 11.2392 17.8828 12.8697 17.6714L13.1268 19.6548C11.3331 19.8874 9.40882 19.8685 7.80078 19.4749L8.27625 17.5322Z',
};

export const IconTornado02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-stroke-rounded IconTornado02StrokeRounded"
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-duotone-rounded IconTornado02DuotoneRounded"
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
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-twotone-rounded IconTornado02TwotoneRounded"
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
        d={d.d7} 
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-solid-rounded IconTornado02SolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-bulk-rounded IconTornado02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
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
      </g>
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-stroke-sharp IconTornado02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTornado02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tornado-02-solid-sharp IconTornado02SolidSharp"
    >
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

export const iconPackOfTornado02: TheIconSelfPack = {
  name: 'Tornado02',
  StrokeRounded: IconTornado02StrokeRounded,
  DuotoneRounded: IconTornado02DuotoneRounded,
  TwotoneRounded: IconTornado02TwotoneRounded,
  SolidRounded: IconTornado02SolidRounded,
  BulkRounded: IconTornado02BulkRounded,
  StrokeSharp: IconTornado02StrokeSharp,
  SolidSharp: IconTornado02SolidSharp,
};