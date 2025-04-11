import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.8984 13C10.0813 14.8881 8.10749 18.0404 5.89844 21',
  d2: 'M3.776 3.5C2.5 4.93424 2.5 7.23263 2.5 11.7454C2.5 16.3438 2.5 18.6429 3.85001 20.0715C5.20003 21.5 7.37284 21.5 11.7185 21.5C15.972 21.5 18.1439 21.3279 19.5 19.9883',
  d3: 'M16.5 12.0144C18.0399 11.9084 19.6963 12.3315 21.497 13.6201M21.497 13.6201C21.5 13.1151 21.5 12.5761 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C9.59086 2.5 7.82972 2.5 6.5 2.71659M21.497 13.6201C21.4876 15.2267 21.4482 16.4882 21.2834 17.5',
  d4: 'M2 2L22 22',
  d5: 'M3.89124 20.1081C5.28249 21.4994 7.52166 21.4994 12 21.4994C16.4783 21.4994 18.7175 21.4994 20.1088 20.1081L3.89124 3.89062C2.5 5.28187 2.5 7.52104 2.5 11.9994C2.5 16.4777 2.5 18.7169 3.89124 20.1081Z',
  d6: 'M12.8426 12.2567C12.6628 12.0769 12.4979 12.0265 12.2839 12.2081C10.7784 13.23 9.49447 14.6 8.33125 16.0452C7.56022 17.0032 6.80867 18.039 6.07819 19.0458C5.91947 19.2646 5.65236 19.8372 5.36161 19.8876C5.09174 19.9343 4.74202 19.5594 4.57681 19.3846C4.10829 18.8889 3.8167 18.1983 3.66078 16.9711C3.5019 15.7206 3.5 14.0713 3.5 11.7454C3.5 9.46379 3.50172 7.83231 3.65226 6.5884C3.75777 5.71657 3.92918 5.11116 4.17918 4.65465C4.33167 4.37621 4.40791 4.23699 4.39003 4.13369C4.37216 4.03039 4.27306 3.94222 4.07485 3.76588L3.47716 3.23413C3.26129 3.04208 3.15336 2.94606 3.0185 2.96281C2.88364 2.97957 2.80922 3.08915 2.6604 3.30833C2.08534 4.15521 1.80977 5.16629 1.66675 6.34811C1.49997 7.72618 1.49998 9.4787 1.5 11.6784V11.8164C1.49998 14.0553 1.49997 15.832 1.67673 17.2232C1.85831 18.6523 2.24173 19.8256 3.12322 20.7583C4.01225 21.6991 5.1433 22.1156 6.52004 22.3115C7.19606 22.4077 7.9664 22.4548 8.83845 22.4779C9.79817 22.5035 10.7585 22.5 11.7185 22.5C13.8373 22.5 15.5239 22.459 16.8626 22.2325C18.1379 22.0168 19.2525 21.3865 20.3279 20.6987C20.5881 20.5323 20.7182 20.4491 20.7337 20.3062C20.7492 20.1633 20.6356 20.0497 20.4084 19.8225L12.8426 12.2567Z',
  d7: 'M21.4503 17.8946C21.6839 18.1286 21.8007 18.2456 21.9329 18.2397C21.9826 18.2375 22.0405 18.219 22.0823 18.192C22.1934 18.1203 22.2189 17.969 22.2698 17.6666L22.2707 17.6613C22.4496 16.5629 22.4879 15.2287 22.4973 13.6264L22.4973 13.6094C22.5005 13.0484 22.5001 12.4873 22.5001 11.9263C22.5002 9.75032 22.5002 8.01559 22.3173 6.65545C22.1285 5.25107 21.7284 4.09726 20.816 3.18487C19.9036 2.27248 18.7498 1.87237 17.3454 1.68356C15.9853 1.5007 14.2506 1.50071 12.0747 1.50073C10.4906 1.50073 8.90773 1.47488 7.33939 1.73033C6.79429 1.81912 6.42437 2.33299 6.51316 2.87809C6.59143 3.3586 7.18221 3.78229 7.66092 3.70432C8.89144 3.50389 9.55536 3.50074 12.0002 3.50074C14.2676 3.50074 15.8676 3.50286 17.0789 3.66573C18.2615 3.82472 18.9229 4.12023 19.4018 4.59909C19.8807 5.07794 20.1762 5.73934 20.3352 6.92194C20.4702 7.92631 20.4947 9.19782 20.4992 10.8954C20.5003 11.3179 20.5008 11.5291 20.3728 11.619C20.2448 11.7089 20.0352 11.6326 19.6162 11.4799C18.527 11.0833 17.4655 10.9461 16.4316 11.0173C16.2834 11.0275 16.1229 11.0551 15.9406 11.0821C15.461 11.1532 15.2212 11.1888 15.1632 11.3642C15.1051 11.5396 15.2799 11.7147 15.6295 12.0648L21.4503 17.8946Z',
  d8: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d9: 'M5 21L13.4211 13.4211M21 16L16 11',
  d10: 'M3 3V21H21M6.2058 3H21V17.8394',
  d11: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d12: 'M2 3.00024V21.0002C2 21.5525 2.44772 22.0002 3 22.0002H21C21.2766 22.0002 21.5269 21.888 21.7079 21.7065L12.6406 12.6391L4 19.7087V4.00024L2.29289 2.29314C2.11193 2.4741 2 2.7241 2 3.00024Z',
  d13: 'M22 3.00024C22 2.44796 21.5523 2.00024 21 2.00024H5.53721L7.53721 4.00024H20V14.1316L14.9397 10.7581L14.5851 11.0481L22 18.463V3.00024Z',
};

export const IconImageNotFound02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 DuotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 SolidRounded"
    >
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
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconImageNotFound02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ImageNotFound02 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfImageNotFound02: TheIconSelfPack = [
  'ImageNotFound02',
  IconImageNotFound02StrokeRounded,
  IconImageNotFound02DuotoneRounded,
  IconImageNotFound02TwotoneRounded,
  IconImageNotFound02SolidRounded,
  IconImageNotFound02BulkRounded,
  IconImageNotFound02StrokeSharp,
  IconImageNotFound02SolidSharp,
];