import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15',
  d2: 'M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15',
  d3: 'M14.5 4L9.5 20',
  d4: 'M16.2949 7.29093C15.9033 7.68036 15.9015 8.31353 16.2909 8.70514L18.1307 10.5552C18.5374 10.9641 18.77 11.201 18.9133 11.3899C18.9517 11.4405 18.9747 11.4764 18.9882 11.5C18.9747 11.5236 18.9517 11.5595 18.9133 11.6101C18.77 11.799 18.5374 12.0359 18.1307 12.4448L16.2909 14.2949C15.9015 14.6865 15.9033 15.3196 16.2949 15.7091C16.6865 16.0985 17.3196 16.0967 17.7091 15.7051L19.5489 13.8551L19.5892 13.8145C19.9411 13.4608 20.2721 13.128 20.5066 12.819C20.7677 12.4748 21 12.0465 21 11.5C21 10.9535 20.7677 10.5252 20.5066 10.181C20.2721 9.87202 19.9411 9.53924 19.5892 9.1855L19.5892 9.18549L19.5489 9.14495L17.7091 7.29486C17.3196 6.90325 16.6865 6.90149 16.2949 7.29093Z',
  d5: 'M7.70514 7.29093C8.09675 7.68036 8.09851 8.31353 7.70907 8.70514L5.86926 10.5552C5.46264 10.9641 5.23002 11.201 5.08669 11.3899C5.0483 11.4405 5.02527 11.4764 5.01181 11.5C5.02527 11.5236 5.0483 11.5595 5.08669 11.6101C5.23002 11.799 5.46264 12.0359 5.86926 12.4448L7.70907 14.2949C8.09851 14.6865 8.09675 15.3196 7.70514 15.7091C7.31353 16.0985 6.68036 16.0967 6.29093 15.7051L4.45112 13.8551L4.41079 13.8145C4.05891 13.4608 3.72787 13.128 3.4934 12.819C3.23231 12.4748 3 12.0465 3 11.5C3 10.9535 3.23231 10.5252 3.4934 10.181C3.72787 9.87202 4.0589 9.53924 4.41079 9.1855L4.41079 9.18549L4.45112 9.14495L6.29093 7.29486C6.68036 6.90325 7.31353 6.90149 7.70514 7.29093Z',
  d6: 'M14.7985 3.04579C15.3257 3.21052 15.6195 3.7714 15.4547 4.29854L10.4547 20.2985C10.29 20.8257 9.72914 21.1195 9.20199 20.9547C8.67485 20.79 8.38105 20.2291 8.54579 19.702L13.5458 3.70199C13.7105 3.17485 14.2714 2.88105 14.7985 3.04579Z',
  d7: 'M17 8L20 11.5L17 15',
  d8: 'M7 8L4 11.5L7 15',
  d9: 'M18.866 11.5009L16.4238 8.65168L17.9424 7.3501L21.5002 11.5009L17.9424 15.6517L16.4238 14.3501L18.866 11.5009Z',
  d10: 'M6.05746 7.34912L7.57597 8.6507L5.13379 11.4999L7.57597 14.3491L6.05746 15.6507L2.49963 11.4999L6.05746 7.34912Z',
  d11: 'M8.24921 19.9035L13.8411 3.5L15.75 4.09655L10.1582 20.5L8.24921 19.9035Z',
};

export const IconSourceCodeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode BulkRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconSourceCodeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="SourceCode SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="c f fr"
      />
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSourceCode: TheIconSelfPack = [
  'SourceCode',
  IconSourceCodeStrokeRounded,
  IconSourceCodeDuotoneRounded,
  IconSourceCodeTwotoneRounded,
  IconSourceCodeSolidRounded,
  IconSourceCodeBulkRounded,
  IconSourceCodeStrokeSharp,
  IconSourceCodeSolidSharp,
];