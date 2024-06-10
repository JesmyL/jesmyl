import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.85635 22C6.31271 20.0139 6 17.6873 6 15.2C6 7.90984 8.68629 2 12 2C15.3137 2 18 7.90984 18 15.2C18 17.6873 17.6873 20.0139 17.1436 22',
  d2: 'M3 22H21',
  d3: 'M15.5516 5C14.6016 9.20545 9.11987 7.73398 6.74686 11.1962C6.41711 11.6774 6.41568 12.3243 6.75482 12.7985C9.23576 16.2675 15.599 14.7924 17.5 19',
  d4: 'M8.44841 5C9.39844 9.20545 14.8801 7.73398 17.2531 11.1962C17.5829 11.6774 17.5843 12.3243 17.2452 12.7985C14.7642 16.2675 8.40101 14.7924 6.5 19',
  d5: 'M6.25195 19C6.39689 20.0625 6.60103 21.0687 6.85596 22H17.1432C17.3982 21.0687 17.6023 20.0625 17.7473 19C17.057 17.7333 14.9996 15.5 11.9996 15.5C9.04834 15.5 6.94221 17.9333 6.25195 19Z',
  d6: 'M12 2C11.289 2 10.6069 2.27207 9.97401 2.77146C8.32375 4.07364 8.18494 6.79237 9.96286 7.914C10.5199 8.26539 11.1964 8.5 12 8.5C12.9545 8.5 13.7096 8.13093 14.2898 7.61297C15.7624 6.29841 15.472 3.80941 13.8711 2.6545C13.2823 2.22974 12.6533 2 12 2Z',
  d7: 'M15.5516 5C14.6016 9.20545 9.11987 7.73398 6.74686 11.1962C6.41711 11.6774 6.41568 12.3243 6.75482 12.7985C9.23576 16.2675 15.599 14.7924 17.5 19M8.44841 5C9.39844 9.20545 14.8801 7.73398 17.2531 11.1962C17.5829 11.6774 17.5843 12.3243 17.2452 12.7985C14.7642 16.2675 8.40101 14.7924 6.5 19',
  d8: 'M7.0085 14.5034C7.00286 14.7338 7 14.9661 7 15.2C7 15.6886 7.01248 16.1701 7.03672 16.6432C7.5683 16.1823 8.16617 15.8289 8.78695 15.5446C8.16685 15.278 7.55819 14.945 7.0085 14.5034ZM7.75864 8.89705C8.27852 8.57112 8.82473 8.31802 9.36262 8.10753C8.98004 7.8332 8.62668 7.50581 8.32466 7.10636C8.11443 7.66106 7.92461 8.26006 7.75864 8.89705ZM9.44252 4.85849C9.75942 6.13436 10.618 6.69908 12 7.20835C13.382 6.69908 14.2406 6.13436 14.5575 4.85848C13.6981 3.55934 12.782 3 12 3C11.218 3 10.3019 3.55934 9.44252 4.85849ZM15.6753 7.10635C15.3733 7.50581 15.02 7.8332 14.6374 8.10753C15.1753 8.31802 15.7215 8.57112 16.2414 8.89705C16.0754 8.26006 15.8856 7.66105 15.6753 7.10635ZM16.9915 14.5034C16.4418 14.945 15.8331 15.278 15.213 15.5446C15.8338 15.8289 16.4317 16.1823 16.9633 16.6432C16.9875 16.1701 17 15.6886 17 15.2C17 14.9661 16.9971 14.7338 16.9915 14.5034ZM16.6558 19.5363C16.6309 19.4969 16.6084 19.4554 16.5887 19.4117C15.8537 17.785 14.2646 17.1901 12.0786 16.5862C12.0525 16.579 12.0263 16.5717 12 16.5645C11.9737 16.5717 11.9475 16.579 11.9214 16.5862C9.73537 17.1901 8.14627 17.785 7.4113 19.4117C7.39158 19.4554 7.36911 19.4969 7.34419 19.5363C7.42734 20.0409 7.52447 20.5296 7.63442 21H16.3656C16.4755 20.5296 16.5727 20.0409 16.6558 19.5363ZM18.4147 21C18.7918 19.2284 19 17.2632 19 15.2C19 11.4458 18.3103 7.99854 17.153 5.45239C16.0367 2.99651 14.2901 1 12 1C9.70987 1 7.9633 2.99651 6.84699 5.45239C5.68965 7.99854 5 11.4458 5 15.2C5 17.2632 5.20818 19.2284 5.5853 21H3C2.44772 21 2 21.4477 2 22C2 22.5523 2.44772 23 3 23H6.83344C6.84828 23.0003 6.86318 23.0003 6.8781 23H17.1219C17.1368 23.0003 17.1517 23.0003 17.1666 23H21C21.5523 23 22 22.5523 22 22C22 21.4477 21.5523 21 21 21H18.4147ZM12 14.491C12.8682 14.2537 13.6661 14.0297 14.3951 13.7192C15.2718 13.3459 15.9555 12.8827 16.4318 12.2168C16.5197 12.0938 16.5269 11.9055 16.4283 11.7616C15.5534 10.4852 14.1693 10.0336 12.4663 9.47804C12.3144 9.42849 12.16 9.37811 12.0032 9.32624C12.0021 9.32589 12.0011 9.32554 12 9.32519C11.9989 9.32554 11.9979 9.32589 11.9968 9.32624C11.84 9.37811 11.6856 9.42849 11.5337 9.47804C9.83067 10.0336 8.44657 10.4852 7.57172 11.7616C7.47307 11.9055 7.48029 12.0938 7.56821 12.2168C8.0445 12.8827 8.72825 13.3459 9.60489 13.7192C10.3339 14.0297 11.1318 14.2537 12 14.491Z',
  d9: 'M8.66773 6.27999C7.65349 8.51131 7 11.6641 7 15.2C7 17.6066 7.30293 19.8438 7.82087 21.736C7.96669 22.2687 7.65306 22.8187 7.12037 22.9645C6.58769 23.1103 6.03765 22.7967 5.89184 22.264C5.32249 20.1841 5 17.768 5 15.2C5 11.4458 5.68965 7.99854 6.84699 5.45239C7.9633 2.99651 9.70987 1 12 1C14.2901 1 16.0367 2.99651 17.153 5.45239C18.3103 7.99854 19 11.4458 19 15.2C19 17.768 18.6775 20.1841 18.1082 22.264C17.9623 22.7967 17.4123 23.1103 16.8796 22.9645C16.3469 22.8187 16.0333 22.2687 16.1791 21.736C16.6971 19.8438 17 17.6066 17 15.2C17 11.6641 16.3465 8.51131 15.3323 6.27999C14.277 3.95841 13.0236 3 12 3C10.9764 3 9.72299 3.95841 8.66773 6.27999Z',
  d10: 'M2 22C2 21.4477 2.44772 21 3 21H21C21.5523 21 22 21.4477 22 22C22 22.5523 21.5523 23 21 23H3C2.44772 23 2 22.5523 2 22Z',
  d11: 'M9.42408 4.77987C9.30238 4.24116 8.76702 3.9031 8.22831 4.0248C7.6896 4.14649 7.35154 4.68186 7.47324 5.22057C7.78463 6.59898 8.49929 7.48847 9.36277 8.10769C8.11705 8.59515 6.82671 9.31113 5.92201 10.6311C5.36114 11.4494 5.35107 12.5549 5.94142 13.3804C6.6975 14.4376 7.72553 15.0884 8.78708 15.5449C7.48832 16.1396 6.28986 17.0371 5.58894 18.5885C5.36155 19.0918 5.58521 19.6841 6.08851 19.9115C6.59181 20.1389 7.18416 19.9152 7.41155 19.412C8.14652 17.7852 9.73562 17.1903 11.9217 16.5864C11.9477 16.5792 11.9739 16.572 12.0001 16.5648C12.0264 16.572 12.0525 16.5792 12.0786 16.5864C14.2646 17.1903 15.8537 17.7852 16.5887 19.412C16.8161 19.9152 17.4084 20.1389 17.9117 19.9115C18.415 19.6841 18.6387 19.0918 18.4113 18.5885C17.7104 17.0371 16.5119 16.1396 15.2132 15.5449C16.2747 15.0884 17.3027 14.4376 18.0588 13.3804C18.6492 12.5549 18.6391 11.4494 18.0782 10.6311C17.1735 9.31113 15.8832 8.59515 14.6375 8.10768C15.501 7.48847 16.2156 6.59898 16.527 5.22057C16.6487 4.68186 16.3106 4.14649 15.7719 4.0248C15.2332 3.9031 14.6979 4.24116 14.5762 4.77987C14.2753 6.11151 13.4102 6.6889 12.0001 7.20852C10.59 6.6889 9.7249 6.11151 9.42408 4.77987ZM12.0001 9.32537L11.9968 9.32646C11.84 9.37832 11.6856 9.42871 11.5337 9.47826C9.83067 10.0338 8.44657 10.4854 7.57171 11.7618C7.47307 11.9057 7.48029 12.094 7.56821 12.217C8.0445 12.883 8.72825 13.3461 9.60489 13.7195C10.334 14.0299 11.1319 14.2539 12.0001 14.4913C12.8684 14.2539 13.6663 14.0299 14.3954 13.7195C15.272 13.3461 15.9557 12.883 16.432 12.217C16.52 12.094 16.5272 11.9057 16.4285 11.7618C15.5537 10.4854 14.1696 10.0338 12.4666 9.47826C12.3147 9.42871 12.1603 9.37832 12.0034 9.32646L12.0001 9.32537Z',
  d12: 'M21 23H3V21H21V23Z',
  d13: 'M7.0085 14.5034C7.00286 14.7338 7 14.9661 7 15.2C7 15.6886 7.01248 16.1701 7.03672 16.6432C7.5683 16.1823 8.16617 15.8289 8.78695 15.5446C8.16685 15.278 7.55819 14.945 7.0085 14.5034ZM7.75864 8.89705C8.27852 8.57112 8.82473 8.31802 9.36262 8.10753C8.98005 7.8332 8.62668 7.50581 8.32466 7.10636C8.11443 7.66106 7.92461 8.26006 7.75864 8.89705ZM9.44252 4.85849C9.75942 6.13436 10.618 6.69908 12 7.20835C13.382 6.69908 14.2406 6.13436 14.5575 4.85848C13.6981 3.55934 12.782 3 12 3C11.218 3 10.3019 3.55934 9.44252 4.85849ZM15.6753 7.10635C15.3733 7.50581 15.02 7.8332 14.6374 8.10753C15.1753 8.31802 15.7215 8.57112 16.2414 8.89705C16.0754 8.26006 15.8856 7.66105 15.6753 7.10635ZM16.9915 14.5034C16.4418 14.945 15.8331 15.278 15.213 15.5446C15.8338 15.8289 16.4317 16.1823 16.9633 16.6432C16.9875 16.1701 17 15.6886 17 15.2C17 14.9661 16.9971 14.7338 16.9915 14.5034ZM16.6827 19.3693C16.5512 20.2039 16.3816 20.9963 16.1791 21.736L18.1082 22.264C18.6775 20.1841 19 17.768 19 15.2C19 11.4458 18.3103 7.99854 17.153 5.45239C16.0367 2.99651 14.2901 1 12 1C9.70987 1 7.9633 2.99651 6.84699 5.45239C5.68965 7.99854 5 11.4458 5 15.2C5 17.768 5.32249 20.1841 5.89184 22.264L7.82087 21.736C7.6184 20.9963 7.44878 20.2039 7.31728 19.3693L7.4113 19.4117C8.14627 17.785 9.73537 17.1901 11.9214 16.5862C11.9475 16.579 11.9737 16.5717 12 16.5645C12.0263 16.5717 12.0525 16.579 12.0786 16.5862C14.2646 17.1901 15.8537 17.785 16.5887 19.4117L16.6827 19.3693ZM12 14.491C12.8682 14.2537 13.6661 14.0297 14.3951 13.7192C15.2718 13.3459 15.9555 12.8827 16.4318 12.2168C16.5197 12.0938 16.5269 11.9055 16.4283 11.7616C15.5534 10.4852 14.1693 10.0336 12.4663 9.47804C12.3144 9.42849 12.16 9.37811 12.0032 9.32624C12.0021 9.32589 12.0011 9.32554 12 9.32519C11.9989 9.32554 11.9979 9.32589 11.9968 9.32624C11.84 9.37811 11.6856 9.42849 11.5337 9.47804C9.83067 10.0336 8.44657 10.4852 7.57172 11.7616C7.47307 11.9055 7.48029 12.0938 7.56821 12.2168C8.0445 12.8827 8.72825 13.3459 9.60489 13.7192C10.3339 14.0297 11.1318 14.2537 12 14.491Z',
};

export const IconDomeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-stroke-rounded IconDomeStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconDomeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-duotone-rounded IconDomeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconDomeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-twotone-rounded IconDomeTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDomeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-solid-rounded IconDomeSolidRounded"
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

export const IconDomeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-bulk-rounded IconDomeBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDomeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-stroke-sharp IconDomeStrokeSharp"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDomeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dome-solid-sharp IconDomeSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDome: TheIconSelfPack = {
  name: 'Dome',
  StrokeRounded: IconDomeStrokeRounded,
  DuotoneRounded: IconDomeDuotoneRounded,
  TwotoneRounded: IconDomeTwotoneRounded,
  SolidRounded: IconDomeSolidRounded,
  BulkRounded: IconDomeBulkRounded,
  StrokeSharp: IconDomeStrokeSharp,
  SolidSharp: IconDomeSolidSharp,
};