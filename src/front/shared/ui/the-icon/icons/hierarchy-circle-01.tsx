import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z',
  d2: 'M8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C6.65685 16 8 17.3431 8 19Z',
  d3: 'M22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z',
  d4: 'M12 8V12M12 12H8.5C6.85008 12 6.02513 12 5.51256 12.4393C5 12.8787 5 13.5858 5 15V16M12 12H15.5C17.1499 12 17.9749 12 18.4874 12.4393C19 12.8787 19 13.5858 19 15V16',
  d5: 'M8.25 5C8.25 2.92893 9.92893 1.25 12 1.25C14.0711 1.25 15.75 2.92893 15.75 5C15.75 7.07107 14.0711 8.75 12 8.75C9.92893 8.75 8.25 7.07107 8.25 5Z',
  d6: 'M1.25 19C1.25 16.9289 2.92893 15.25 5 15.25C7.07107 15.25 8.75 16.9289 8.75 19C8.75 21.0711 7.07107 22.75 5 22.75C2.92893 22.75 1.25 21.0711 1.25 19Z',
  d7: 'M15.25 19C15.25 16.9289 16.9289 15.25 19 15.25C21.0711 15.25 22.75 16.9289 22.75 19C22.75 21.0711 21.0711 22.75 19 22.75C16.9289 22.75 15.25 21.0711 15.25 19Z',
  d8: 'M12 7C12.5523 7 13 7.44772 13 8V11L15.5569 11H15.5569C16.3332 11 17.0005 10.9999 17.5347 11.0615C18.0969 11.1263 18.6628 11.2726 19.1382 11.6801C19.6359 12.1067 19.8375 12.6488 19.9239 13.1991C20.0002 13.6858 20.0001 14.2836 20 14.9315L20 15V16C20 16.5523 19.5523 17 19 17C18.4477 17 18 16.5523 18 16V15C18 14.2601 17.9971 13.8222 17.948 13.5091C17.9084 13.2566 17.8573 13.2153 17.8394 13.2008L17.8367 13.1986C17.7995 13.1668 17.6967 13.0934 17.3058 13.0483C16.8999 13.0016 16.3493 13 15.5 13H8.50001C7.65074 13 7.10016 13.0016 6.69427 13.0483C6.30335 13.0934 6.20051 13.1668 6.16337 13.1986L6.16066 13.2008C6.14269 13.2153 6.0916 13.2566 6.052 13.5091C6.00288 13.8222 6.00001 14.2601 6.00001 15V16C6.00001 16.5523 5.5523 17 5.00001 17C4.44773 17 4.00001 16.5523 4.00001 16V15L4.00001 14.9315C3.99991 14.2835 3.99983 13.6858 4.07616 13.1991C4.16248 12.6488 4.36412 12.1066 4.86178 11.6801C5.33721 11.2726 5.90313 11.1263 6.46531 11.0615C6.9995 10.9999 7.66679 11 8.4431 11H8.44312L8.50001 11H11V8C11 7.44772 11.4477 7 12 7Z',
  d9: 'M11 8.61329C11.3184 8.70115 11.6537 8.74809 12 8.74809C12.3463 8.74809 12.6817 8.70115 13 8.61328V10.9981L15.5569 10.9981C16.3332 10.9981 17.0005 10.998 17.5347 11.0596C18.0969 11.1244 18.6628 11.2707 19.1382 11.6782C19.6359 12.1047 19.8375 12.6469 19.9239 13.1972C20.0002 13.6839 20.0001 14.2816 20 14.9296L20 15.3829C19.6817 15.295 19.3463 15.2481 19 15.2481C18.6537 15.2481 18.3184 15.295 18 15.3829V14.9981C18 14.2582 17.9971 13.8203 17.948 13.5071C17.9084 13.2547 17.8573 13.2134 17.8394 13.1989L17.8367 13.1967C17.7995 13.1649 17.6967 13.0915 17.3058 13.0464C16.8999 12.9997 16.3493 12.9981 15.5 12.9981H8.50001C7.65074 12.9981 7.10016 12.9997 6.69427 13.0464C6.30335 13.0915 6.20051 13.1649 6.16337 13.1967L6.16066 13.1989C6.14269 13.2134 6.0916 13.2547 6.052 13.5071C6.00288 13.8203 6.00001 14.2582 6.00001 14.9981V15.3829C5.68165 15.295 5.34631 15.2481 5 15.2481C4.6537 15.2481 4.31837 15.295 4.00001 15.3829L4.00001 14.9296C3.99991 14.2816 3.99983 13.6839 4.07616 13.1972C4.16248 12.6469 4.36412 12.1047 4.86178 11.6782C5.33721 11.2707 5.90313 11.1244 6.46531 11.0596C6.9995 10.998 7.66679 10.9981 8.4431 10.9981L11 10.9981V8.61329Z',
  d10: 'M12 8V12M12 12H5V16M12 12H19V16',
  d11: 'M11 11V8H13V11H19C19.5523 11 20 11.4477 20 12V16H18V13H6V16H4V12C4 11.4477 4.44772 11 5 11H11Z',
};

export const IconHierarchyCircle01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconHierarchyCircle01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="HierarchyCircle01 SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHierarchyCircle01: TheIconSelfPack = [
  'HierarchyCircle01',
  IconHierarchyCircle01StrokeRounded,
  IconHierarchyCircle01DuotoneRounded,
  IconHierarchyCircle01TwotoneRounded,
  IconHierarchyCircle01SolidRounded,
  IconHierarchyCircle01BulkRounded,
  IconHierarchyCircle01StrokeSharp,
  IconHierarchyCircle01SolidSharp,
];