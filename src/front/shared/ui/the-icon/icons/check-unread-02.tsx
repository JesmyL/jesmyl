import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 13.5C2.5 13.5 4.5 14 6 17C6 17 6.28485 16.5192 6.82133 15.7526M16.5 6C14.9915 6.75423 13.4376 8.05457 12.0029 9.50285',
  d2: 'M7.5 13.5C7.5 13.5 9.5 14 11 17C11 17 11.7152 15.8948 12.8641 14.3641M21.5 6C19.1047 7.19763 16.5947 9.7722 14.6296 12.1296',
  d3: 'M3.5 5L17.5 19',
  d4: 'M16.6002 6.29986C16.5478 6.34069 16.3953 6.45977 16.2957 6.54086C16.0965 6.70322 15.8135 6.94142 15.4852 7.23994C14.8242 7.84082 13.9986 8.66854 13.3 9.6C12.9686 10.0418 12.3418 10.1314 11.9 9.8C11.4582 9.46863 11.3686 8.84183 11.7 8.4C12.5014 7.33147 13.4258 6.40919 14.1398 5.76006C14.4989 5.43359 14.8098 5.17179 15.0324 4.99039C15.1438 4.89961 15.3998 4.70019 15.3998 4.70019C15.8416 4.36881 16.4686 4.45818 16.8 4.9C17.1313 5.34172 17.0417 5.96842 16.6002 6.29986Z',
  d5: 'M1.52985 15.2575C1.6638 14.7217 2.20673 14.3959 2.74253 14.5299C2.91879 14.5739 3.1073 14.6513 3.24207 14.7112C3.51175 14.831 3.87046 15.0216 4.27566 15.3163C4.82208 15.7137 5.44292 16.2932 6.04066 17.1276C6.36733 16.7188 6.95997 16.6291 7.39471 16.9334C7.84719 17.25 7.95728 17.8736 7.6406 18.326C7.38096 18.697 7.18327 18.9974 7.05172 19.2029C6.98595 19.3056 6.89243 19.4575 6.86034 19.5097C6.67379 19.8245 6.33012 20.0124 5.96441 19.9994C5.59866 19.9863 5.26924 19.7746 5.10557 19.4472C4.42824 18.0926 3.65911 17.3409 3.09932 16.9337C2.81702 16.7284 2.58199 16.6065 2.42979 16.5388C2.35362 16.505 2.27363 16.4768 2.24333 16.4665C1.71595 16.3266 1.39708 15.7885 1.52985 15.2575Z',
  d6: 'M22.3944 5.55279C22.6413 6.04665 22.4413 6.64716 21.9476 6.89426C21.8428 6.95065 21.5369 7.11569 21.3408 7.23038C20.9482 7.46002 20.3962 7.80305 19.7687 8.25124C18.5057 9.15339 16.976 10.454 15.8137 12.0812C15.4927 12.5307 14.8682 12.6347 14.4188 12.3137C13.9693 11.9927 13.8653 11.3682 14.1863 10.9188C15.524 9.04599 17.2443 7.59662 18.6063 6.62377C19.2913 6.13446 19.8955 5.75874 20.331 5.50401C20.5428 5.38013 20.9075 5.18377 21.0416 5.11159L21.0528 5.10558C21.5468 4.85859 22.1474 5.05881 22.3944 5.55279Z',
  d7: 'M6.52985 14.2575C6.6638 13.7217 7.20673 13.3959 7.74253 13.5299C7.94317 13.58 8.1073 13.6513 8.24207 13.7112C8.51175 13.8311 8.87046 14.0216 9.27566 14.3163C9.82655 14.7169 10.4531 15.3027 11.0553 16.1481C11.3361 15.7512 11.6759 15.2814 12.0644 14.7638C12.396 14.3221 13.0228 14.2328 13.4645 14.5644C13.9062 14.896 13.9954 15.5228 13.6639 15.9645C13.0988 16.7173 12.6406 17.3651 12.3245 17.8237C12.1665 18.0529 11.922 18.4196 11.8397 18.5431C11.6447 18.8444 11.303 19.0183 10.9447 18.9985C10.5863 18.9786 10.2661 18.7682 10.1056 18.4472C9.42824 17.0926 8.65911 16.3409 8.09932 15.9337C7.81702 15.7284 7.58199 15.6065 7.42979 15.5388C7.35362 15.505 7.24333 15.4665 7.24333 15.4665C6.71595 15.3266 6.39708 14.7885 6.52985 14.2575Z',
  d8: 'M2.79289 4.29289C3.18342 3.90237 3.81658 3.90237 4.20711 4.29289L18.2071 18.2929C18.5976 18.6834 18.5976 19.3166 18.2071 19.7071C17.8166 20.0976 17.1834 20.0976 16.7929 19.7071L2.79289 5.70711C2.40237 5.31658 2.40237 4.68342 2.79289 4.29289Z',
  d9: 'M2.5 13.5C2.5 13.5 4.54762 14.267 6 17C6 17 6.28485 16.5192 6.82133 15.7526M16.5 5.5C16.5 5.5 14.0249 7.0056 12.0029 9.50285',
  d10: 'M7.5 13C7.5 13 9.70661 14.3641 11 17C11 17 11.6153 15.972 12.7642 14.4413M21.5 6C21.5 6 17.5576 8.09635 14.6296 12.1296',
  d11: 'M16.4544 5.96544C16.4544 5.96544 16.2508 6.12534 16.1518 6.2065C15.9537 6.36898 15.6723 6.60737 15.3457 6.90614C14.6884 7.50749 13.8673 8.33589 13.1725 9.2681L12.5758 10.0687L10.9846 8.86778L11.5813 8.06713C12.3783 6.99773 13.2976 6.07472 14.0078 5.42507C14.3649 5.09833 14.674 4.83632 14.8954 4.65478C15.0062 4.56392 15.2608 4.36434 15.2608 4.36434L16.0566 3.76367L17.25 5.36496L16.4544 5.96544Z',
  d12: 'M2.83475 14.2578C2.90861 14.2957 3.14586 14.4163 3.26849 14.4888C3.51359 14.6339 3.84721 14.8525 4.22892 15.1591C4.73359 15.5645 5.32301 16.1244 5.90224 16.8714L6.48496 16.0335L8.11452 17.1812L7.54428 18.0012C7.28607 18.3724 6.89915 18.9801 6.76831 19.1858L5.88784 20.75L5.05137 19.176C4.37087 17.9895 3.58865 17.2058 2.98809 16.7234C2.68755 16.482 2.43288 16.3164 2.26027 16.2142C2.17404 16.1632 2.06469 16.1064 2.02454 16.0858L1.25 15.7405L2.06841 13.9162L2.83475 14.2578Z',
  d13: 'M21.8389 6.48127C21.8389 6.48127 21.5001 6.64575 21.3286 6.73923C20.9855 6.92629 20.4903 7.21903 19.9037 7.6323C18.7295 8.45955 17.197 9.76394 15.7818 11.6631L15.1857 12.4631L13.5959 11.2631L14.1921 10.4631C15.7576 8.36219 17.4544 6.91658 18.7641 5.99383C19.4195 5.5321 19.9801 5.19984 20.3822 4.98065C20.5833 4.871 21.0539 4.64392 21.0539 4.64392L21.9672 4.25L22.75 6.08829L21.8389 6.48127Z',
  d14: 'M8.15804 12.7526C8.15804 12.7526 8.46228 12.9306 8.57856 13.0106C8.81115 13.1706 9.12454 13.411 9.48383 13.7507C9.9655 14.206 10.5267 14.8372 11.0851 15.6873C11.3608 15.2955 11.6926 14.8341 12.071 14.3269L12.6675 13.5271L14.2567 14.7278L13.6602 15.5276C13.0987 16.2803 12.6435 16.9282 12.3294 17.3867C12.1724 17.6159 11.9294 17.9827 11.8477 18.1062L10.9026 19.75L10.1247 18.0103C9.43459 16.6213 8.68152 15.7362 8.12326 15.2084C7.8434 14.9438 7.55078 14.6836 7.25815 14.5358L6.75 14.2786L7.59076 12.4654L8.15804 12.7526Z',
  d15: 'M3.93765 3.25L19.5234 18.8358L18.1092 20.25L2.52344 4.66421L3.93765 3.25Z',
};

export const IconCheckUnread02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-stroke-rounded IconCheckUnread02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-duotone-rounded IconCheckUnread02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-twotone-rounded IconCheckUnread02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconCheckUnread02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-solid-rounded IconCheckUnread02SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconCheckUnread02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-bulk-rounded IconCheckUnread02BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-stroke-sharp IconCheckUnread02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconCheckUnread02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="check-unread-02-solid-sharp IconCheckUnread02SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfCheckUnread02: TheIconSelfPack = {
  name: 'CheckUnread02',
  StrokeRounded: IconCheckUnread02StrokeRounded,
  DuotoneRounded: IconCheckUnread02DuotoneRounded,
  TwotoneRounded: IconCheckUnread02TwotoneRounded,
  SolidRounded: IconCheckUnread02SolidRounded,
  BulkRounded: IconCheckUnread02BulkRounded,
  StrokeSharp: IconCheckUnread02StrokeSharp,
  SolidSharp: IconCheckUnread02SolidSharp,
};