import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 11L18 18',
  d2: 'M8.45901 6.08278L9.70078 6.19567C11.7127 6.37857 12.7186 6.47002 12.9553 7.12388C13.1921 7.77774 12.4778 8.49198 11.0493 9.92046L9.92046 11.0493C8.49198 12.4778 7.77774 13.1921 7.12388 12.9553C6.47002 12.7186 6.37857 11.7127 6.19567 9.70078L6.08278 8.45902C5.97266 7.24766 5.9176 6.64198 6.27979 6.27979C6.64198 5.9176 7.24766 5.97266 8.45901 6.08278Z',
  d3: 'M5.62338 5.62435C5.99207 5.25565 6.45196 5.15219 6.88671 5.13003C7.28864 5.10954 7.78802 5.15499 8.34999 5.20613L9.70436 5.32925C10.6577 5.41588 11.4565 5.48846 12.0422 5.62865C12.6282 5.76889 13.2797 6.03986 13.5345 6.74345C13.7892 7.44704 13.4621 8.07232 13.1018 8.55516C12.7593 9.01405 12.2298 9.54925 11.5968 10.1825L18.5821 17.1678C18.9726 17.5583 18.9726 18.1915 18.5821 18.582C18.1916 18.9725 17.5584 18.9725 17.1679 18.582L10.1826 11.5967C9.5489 12.2301 9.01334 12.7601 8.5542 13.1027C8.07135 13.4631 7.44607 13.7902 6.74248 13.5354C6.03889 13.2807 5.76792 12.6291 5.62768 12.0432C5.48749 11.4574 5.41491 10.6586 5.32829 9.70536V9.70535L5.20516 8.35094C5.15402 7.78898 5.10858 7.2896 5.12906 6.88767C5.15122 6.45293 5.25469 5.99304 5.62338 5.62435Z',
  d4: 'M10.1679 10.1679C9.77737 10.5584 9.77737 11.1916 10.1679 11.5821L17.1679 18.5821C17.5584 18.9726 18.1916 18.9726 18.5821 18.5821C18.9726 18.1916 18.9726 17.5584 18.5821 17.1679L11.5821 10.1679C11.1916 9.77737 10.5584 9.77737 10.1679 10.1679Z',
  d5: 'M6.88671 5.13003C6.45196 5.15219 5.99207 5.25565 5.62338 5.62435C5.25469 5.99304 5.15122 6.45293 5.12906 6.88767C5.10858 7.2896 5.15402 7.78898 5.20516 8.35094L5.32829 9.70535V9.70536C5.41491 10.6586 5.48749 11.4574 5.62768 12.0432C5.76792 12.6291 6.03889 13.2807 6.74248 13.5354C7.44607 13.7902 8.07135 13.4631 8.5542 13.1027C9.03689 12.7425 9.60403 12.1753 10.2809 11.4984L10.2809 11.4984L11.4974 10.2818L11.4975 10.2818C12.1743 9.605 12.7415 9.03786 13.1018 8.55516C13.4621 8.07232 13.7892 7.44704 13.5345 6.74345C13.2797 6.03986 12.6282 5.76889 12.0422 5.62865C11.4565 5.48846 10.6577 5.41588 9.70436 5.32925L8.34999 5.20613C7.78802 5.15499 7.28864 5.10954 6.88671 5.13003Z',
  d6: 'M10 10L18 18',
  d7: 'M7.00026 13L6 6L13.0003 7L7.00026 13Z',
  d8: 'M6.13432 13.9097L5 5L13.9125 6.13149L10.7305 9.31348L19.0028 17.5858L17.5886 19L9.3163 10.7277L6.13432 13.9097Z',
};

export const IconArrowUpLeft02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-stroke-rounded IconArrowUpLeft02StrokeRounded"
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

export const IconArrowUpLeft02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-duotone-rounded IconArrowUpLeft02DuotoneRounded"
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

export const IconArrowUpLeft02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-twotone-rounded IconArrowUpLeft02TwotoneRounded"
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

export const IconArrowUpLeft02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-solid-rounded IconArrowUpLeft02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowUpLeft02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-bulk-rounded IconArrowUpLeft02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconArrowUpLeft02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-stroke-sharp IconArrowUpLeft02StrokeSharp"
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

export const IconArrowUpLeft02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-up-left-02-solid-sharp IconArrowUpLeft02SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowUpLeft02: TheIconSelfPack = {
  name: 'ArrowUpLeft02',
  StrokeRounded: IconArrowUpLeft02StrokeRounded,
  DuotoneRounded: IconArrowUpLeft02DuotoneRounded,
  TwotoneRounded: IconArrowUpLeft02TwotoneRounded,
  SolidRounded: IconArrowUpLeft02SolidRounded,
  BulkRounded: IconArrowUpLeft02BulkRounded,
  StrokeSharp: IconArrowUpLeft02StrokeSharp,
  SolidSharp: IconArrowUpLeft02SolidSharp,
};