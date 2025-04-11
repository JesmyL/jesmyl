import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d2: 'M11.9831 17L11.9831 11.0245M11.9831 11.0245C11.7217 11.021 11.4637 11.204 11.2734 11.4273L9.99903 12.8827M11.9831 11.0245C12.2353 11.028 12.4908 11.21 12.6927 11.4273L13.9745 12.8827M14.9902 8L8.99023 8',
  d3: 'M12.1904 21.5566C17.7133 21.5566 22.1904 17.0795 22.1904 11.5566C22.1904 6.03379 17.7133 1.55664 12.1904 1.55664C6.66758 1.55664 2.19043 6.03379 2.19043 11.5566C2.19043 17.0795 6.66758 21.5566 12.1904 21.5566Z',
  d4: 'M12.1833 16.5566V10.5811M12.1833 10.5811C11.9219 10.5776 11.6639 10.7606 11.4736 10.9839L10.1992 12.4393M12.1833 10.5811C12.4355 10.5846 12.691 10.7666 12.8929 10.9839L14.1747 12.4393M15.1904 7.55664H9.19043',
  d5: 'M11.9928 17L11.9929 11.0245M11.9929 11.0245C11.7314 11.021 11.4735 11.204 11.2832 11.4273L10.0088 12.8827M11.9929 11.0245C12.2451 11.028 12.5005 11.21 12.7025 11.4273L13.9843 12.8827M15 8L9 8',
  d6: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12ZM12 18C12.5523 18 13 17.5523 13 17V13.8716H13.5501L13.5692 13.8717C13.6415 13.8719 13.7856 13.8723 13.9131 13.854C14.0276 13.8376 14.5425 13.7532 14.7802 13.2184C15.0179 12.6836 14.7355 12.2449 14.6711 12.1489C14.5992 12.042 14.5023 11.9352 14.4537 11.8818L14.4409 11.8676L13.7691 11.1233C13.549 10.8794 13.3215 10.6271 13.1049 10.444C12.8592 10.2364 12.4949 10 12 10C11.5051 10 11.1408 10.2364 10.8951 10.444C10.6785 10.6271 10.4509 10.8794 10.2309 11.1233L9.55915 11.8676L9.54626 11.8818C9.4977 11.9352 9.40076 12.042 9.32894 12.1489C9.26446 12.2449 8.98208 12.6836 9.2198 13.2184C9.45752 13.7532 9.97239 13.8376 10.0869 13.854C10.2144 13.8723 10.3585 13.8719 10.4308 13.8717L10.4499 13.8716H11V17C11 17.5523 11.4477 18 12 18ZM8 7C8 7.55229 8.44772 8 9 8H15C15.5523 8 16 7.55229 16 7C16 6.44772 15.5523 6 15 6H9C8.44772 6 8 6.44772 8 7Z',
  d7: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z',
  d8: 'M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13.8716H10.4499L10.4308 13.8717C10.3585 13.8719 10.2144 13.8723 10.0869 13.854C9.97239 13.8376 9.45752 13.7532 9.2198 13.2184C8.98208 12.6836 9.26446 12.2449 9.32894 12.1489C9.40076 12.042 9.4977 11.9352 9.54626 11.8818L9.55915 11.8676L10.2309 11.1233C10.4509 10.8794 10.6785 10.6271 10.8951 10.444C11.1408 10.2364 11.5051 10 12 10C12.4949 10 12.8592 10.2364 13.1049 10.444C13.3215 10.6271 13.549 10.8794 13.7691 11.1233L14.4409 11.8676L14.4537 11.8818C14.5023 11.9352 14.5992 12.042 14.6711 12.1489C14.7355 12.2449 15.0179 12.6836 14.7802 13.2184C14.5425 13.7532 14.0276 13.8376 13.9131 13.854C13.7856 13.8723 13.6415 13.8719 13.5692 13.8717L13.5501 13.8716H13V17ZM9 8C8.44772 8 8 7.55229 8 7C8 6.44772 8.44772 6 9 6H15C15.5523 6 16 6.44772 16 7C16 7.55229 15.5523 8 15 8H9Z',
  d9: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d10: 'M8.99609 8H15M12.0156 17V11.3226M9.50819 13.0162L12.0032 11.0115L14.5098 13.0162',
  d11: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 12.4355V16.875H11.25V12.4355L9.96852 13.4607L9.03148 12.2893L12 9.91453L14.9685 12.2893L14.0315 13.4607L12.75 12.4355ZM15 7.125V8.625H9V7.125H15Z',
};

export const IconUploadCircle02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="o7 s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 BulkRounded"
    >
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

export const IconUploadCircle02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sw"
      />
      <path 
        d={d.d10}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconUploadCircle02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="UploadCircle02 SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUploadCircle02: TheIconSelfPack = [
  'UploadCircle02',
  IconUploadCircle02StrokeRounded,
  IconUploadCircle02DuotoneRounded,
  IconUploadCircle02TwotoneRounded,
  IconUploadCircle02SolidRounded,
  IconUploadCircle02BulkRounded,
  IconUploadCircle02StrokeSharp,
  IconUploadCircle02SolidSharp,
];