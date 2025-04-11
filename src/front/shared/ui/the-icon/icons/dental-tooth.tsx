import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 6C9.5 6.5 10.5033 6.41228 12 5.17632M12 5.17632C11.7786 4.99352 11.5486 4.78582 11.311 4.55032C9.0053 2.2656 5.86519 2.71292 4.39399 4.55032C3.37784 5.8194 0.777521 8.97857 7.14215 20.2396C7.40566 20.7058 7.9306 21 8.49601 21C9.398 21 10.103 20.2801 10.1323 19.4399C10.1945 17.6579 10.5397 15.6035 12 15.6035C13.4603 15.6035 13.8055 17.6579 13.8677 19.4399C13.897 20.2801 14.602 21 15.504 21C16.0694 21 16.5943 20.7058 16.8578 20.2396C23.2225 8.97857 20.6222 5.8194 19.606 4.55032C18.1348 2.71292 14.9947 2.2656 12.689 4.55032C12.4514 4.78582 12.2214 4.99352 12 5.17632Z',
  d2: 'M19.606 4.55032C18.1348 2.71292 14.9947 2.2656 12.689 4.55032C12.4514 4.78582 12.2214 4.99352 12 5.17632C11.7786 4.99352 11.5486 4.78582 11.311 4.55032C9.0053 2.2656 5.86519 2.71292 4.39399 4.55032L4.38009 4.56767C3.35448 5.84817 0.806341 9.02956 7.14215 20.2396C7.40566 20.7058 7.9306 21 8.49601 21C9.39799 21 10.103 20.2801 10.1323 19.4399C10.1945 17.6579 10.5397 15.6035 12 15.6035C13.4603 15.6035 13.8055 17.6579 13.8677 19.4399C13.897 20.2801 14.602 21 15.504 21C16.0694 21 16.5943 20.7058 16.8578 20.2396C23.2225 8.97857 20.6222 5.8194 19.606 4.55032Z',
  d3: 'M9 6C9.5 6.5 10.5033 6.41228 12 5.17632C12.2214 4.99352 12.4514 4.78582 12.689 4.55032C14.9947 2.2656 18.1348 2.71292 19.606 4.55032C20.6222 5.8194 23.2225 8.97857 16.8578 20.2396C16.5943 20.7058 16.0694 21 15.504 21C14.602 21 13.897 20.2801 13.8677 19.4399C13.8055 17.6579 13.4603 15.6035 12 15.6035',
  d4: 'M20.1915 4.0814C18.4298 1.88121 14.7694 1.43283 12.1611 4.01743C12.1069 4.0712 12.0532 4.1233 12 4.17378C11.9468 4.1233 11.8931 4.0712 11.8389 4.01743C9.23058 1.43283 5.57023 1.88121 3.80854 4.0814L3.78913 4.10563C3.53175 4.42686 3.13544 4.92148 2.81357 5.65052C2.48169 6.40224 2.24026 7.37372 2.2503 8.65371C2.27022 11.1931 3.2793 14.9291 6.48922 20.6084C6.89514 21.3266 7.67976 21.7499 8.49601 21.7499C9.80785 21.7499 10.8386 20.704 10.8818 19.4659C10.9123 18.5927 11.012 17.7347 11.244 17.1171C11.4764 16.4983 11.7349 16.3533 12 16.3533C12.2651 16.3533 12.5236 16.4983 12.756 17.1171C12.988 17.7347 13.0877 18.5927 13.1182 19.4659C13.1614 20.704 14.1921 21.7499 15.504 21.7499C16.3202 21.7499 17.1049 21.3266 17.5108 20.6084C20.7207 14.9291 21.7298 11.1931 21.7497 8.65371C21.7597 7.37372 21.5183 6.40224 21.1864 5.65052C20.8646 4.92148 20.4683 4.42687 20.2109 4.10563L20.1915 4.0814Z',
  d5: 'M12 5.17632C11.7786 4.99352 11.5486 4.78582 11.311 4.55032C9.0053 2.2656 5.86519 2.71292 4.39399 4.55032L4.38009 4.56767C3.35448 5.84817 0.80634 9.02956 7.14215 20.2396C7.40566 20.7058 7.9306 21 8.49601 21C9.39799 21 10.103 20.2801 10.1323 19.4399C10.1945 17.6579 10.5397 15.6035 12 15.6035C13.4603 15.6035 13.8055 17.6579 13.8677 19.4399C13.897 20.2801 14.602 21 15.504 21C16.0694 21 16.5943 20.7058 16.8578 20.2396C23.2225 8.97857 20.6222 5.8194 19.606 4.55032C18.1348 2.71292 14.9947 2.2656 12.689 4.55032C12.4514 4.78582 12.2214 4.99352 12 5.17632ZM12 5.17632C10.5033 6.41228 9.5 6.5 9 6',
  d6: 'M20.1924 4.0814C18.4307 1.88121 14.7704 1.43283 12.1621 4.01743C12.1079 4.0712 12.0541 4.1233 12.001 4.17378C11.9478 4.1233 11.8941 4.0712 11.8398 4.01743C9.23155 1.43283 5.5712 1.88121 3.80952 4.0814L3.79011 4.10563C3.53272 4.42686 3.13641 4.92148 2.81455 5.65052C2.48267 6.40224 2.24124 7.37372 2.25128 8.65371C2.2712 11.1931 3.28027 14.9291 6.4902 20.6084C6.89611 21.3266 7.68074 21.7499 8.49699 21.7499C9.80883 21.7499 10.8396 20.704 10.8828 19.4659C10.9133 18.5927 11.0129 17.7347 11.2449 17.1171C11.4774 16.4983 11.7358 16.3533 12.001 16.3533C12.2661 16.3533 12.5246 16.4983 12.757 17.1171C12.989 17.7347 13.0887 18.5927 13.1191 19.4659C13.1624 20.704 14.1931 21.7499 15.505 21.7499C16.3212 21.7499 17.1058 21.3266 17.5118 20.6084C20.7217 14.9291 21.7308 11.1931 21.7507 8.65371C21.7607 7.37372 21.5193 6.40224 21.1874 5.65052C20.8655 4.92148 20.4692 4.42687 20.2118 4.10563L20.1924 4.0814Z',
};

export const IconDentalToothStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth DuotoneRounded"
    >
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconDentalToothSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="DentalTooth SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDentalTooth: TheIconSelfPack = [
  'DentalTooth',
  IconDentalToothStrokeRounded,
  IconDentalToothDuotoneRounded,
  IconDentalToothTwotoneRounded,
  IconDentalToothSolidRounded,
  IconDentalToothBulkRounded,
  IconDentalToothStrokeSharp,
  IconDentalToothSolidSharp,
];