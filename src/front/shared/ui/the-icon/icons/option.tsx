import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 5H5.04362C6.96246 5 7.92187 5 8.67328 5.49548C9.42469 5.99095 9.80263 6.8728 10.5585 8.63648L13.4415 15.3635C14.1974 17.1272 14.5753 18.009 15.3267 18.5045C16.0781 19 17.0375 19 18.9564 19H20',
  d2: 'M14 5H20',
  d3: 'M7.18889 6.05616C6.68125 6.00135 6.02462 6 5.04362 6H4C3.44772 6 3 5.55229 3 5C3 4.44772 3.44772 4 4 4H5.04362H5.09645H5.09648C6.01091 3.99998 6.77601 3.99996 7.40358 4.06771C8.06734 4.13938 8.66777 4.29401 9.22378 4.66064C9.77978 5.02726 10.1584 5.51824 10.4858 6.1001C10.7953 6.65023 11.0966 7.35347 11.4568 8.19396L11.4568 8.19399L14.3607 14.9696C14.7471 15.8713 15.007 16.4743 15.2573 16.9193C15.4958 17.3431 15.6818 17.5408 15.8772 17.6697C16.0726 17.7985 16.3276 17.8916 16.8111 17.9438C17.3187 17.9987 17.9754 18 18.9564 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H18.9035H18.9035C17.9891 20 17.224 20 16.5964 19.9323C15.9327 19.8606 15.3322 19.706 14.7762 19.3394C14.2202 18.9727 13.8416 18.4818 13.5142 17.8999C13.2047 17.3498 12.9034 16.6465 12.5432 15.806L9.63935 9.03041C9.25292 8.12873 8.99302 7.52572 8.74267 7.08071C8.50422 6.65686 8.3182 6.45917 8.12279 6.33032C7.92739 6.20147 7.6724 6.10836 7.18889 6.05616Z',
  d4: 'M13 5C13 4.44772 13.4477 4 14 4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H14C13.4477 6 13 5.55228 13 5Z',
  d5: 'M4 5H9L15 19H20',
  d6: 'M8.3406 6H4V4H9.6594L15.6594 18H20V20H14.3406L8.3406 6Z',
  d7: 'M20 6H14V4H20V6Z',
};

export const IconOptionStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconOptionDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconOptionTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconOptionSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconOptionBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconOptionStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconOptionSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Option SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfOption: TheIconSelfPack = [
  'Option',
  IconOptionStrokeRounded,
  IconOptionDuotoneRounded,
  IconOptionTwotoneRounded,
  IconOptionSolidRounded,
  IconOptionBulkRounded,
  IconOptionStrokeSharp,
  IconOptionSolidSharp,
];