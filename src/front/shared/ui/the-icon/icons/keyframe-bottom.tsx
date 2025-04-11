import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.6909 5.00254C11.2951 4.33418 11.5971 4 12 4C12.4029 4 12.7049 4.33418 13.3091 5.00253L14.7948 6.64627C15.5983 7.53512 16 7.97954 16 8.5C16 9.02046 15.5983 9.46488 14.7948 10.3537L13.3091 11.9975C12.7049 12.6658 12.4029 13 12 13C11.5971 13 11.2951 12.6658 10.6909 11.9975L9.20516 10.3537C8.40172 9.46488 8 9.02046 8 8.5C8 7.97954 8.40172 7.53512 9.20515 6.64627L10.6909 5.00254Z',
  d2: 'M12 16V20M3 20H21',
  d3: 'M10.7824 3.48103C11.0792 3.23478 11.4755 3 12 3C12.5245 3 12.9208 3.23478 13.2176 3.48103C13.4754 3.6949 13.7442 3.9925 14.0133 4.29035L14.0509 4.33197L15.5367 5.97571L15.5741 6.01704C15.9436 6.42581 16.2811 6.79903 16.5183 7.13826C16.7774 7.50894 17 7.95138 17 8.5C17 9.04862 16.7774 9.49105 16.5183 9.86174C16.2811 10.201 15.9436 10.5742 15.5741 10.9829L15.5367 11.0243L14.0509 12.668L14.0133 12.7096C13.7442 13.0075 13.4754 13.3051 13.2176 13.519C12.9208 13.7652 12.5245 14 12 14C11.4755 14 11.0792 13.7652 10.7824 13.519C10.5246 13.3051 10.2558 13.0075 9.98669 12.7096L9.94909 12.668L8.4633 11.0243L8.42592 10.9829L8.42591 10.9829C8.05635 10.5742 7.71893 10.201 7.48175 9.86174C7.22257 9.49106 7 9.04862 7 8.5C7 7.95138 7.22257 7.50895 7.48175 7.13826C7.71893 6.79904 8.05636 6.42582 8.42592 6.01706L8.4633 5.97571L9.94909 4.33197L9.98669 4.29036C10.2558 3.99251 10.5246 3.69491 10.7824 3.48103Z',
  d4: 'M12 15C12.5523 15 13 15.4477 13 16V19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19H11V16C11 15.4477 11.4477 15 12 15Z',
  d5: 'M8 8.5L12 4L16 8.5L12 13L8 8.5Z',
  d6: 'M12 16V20M12 20L21 20M12 20L3 20',
  d7: 'M11.9996 3L17.003 8.6289L11.9996 14.2578L6.99609 8.6289L11.9996 3Z',
  d8: 'M11 19V16H13V19L21 19V21H3V19L11 19Z',
};

export const IconKeyframeBottomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeBottomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeBottomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeBottomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom SolidRounded"
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

export const IconKeyframeBottomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeBottomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconKeyframeBottomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="KeyframeBottom SolidSharp"
    >
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

export const iconPackOfKeyframeBottom: TheIconSelfPack = [
  'KeyframeBottom',
  IconKeyframeBottomStrokeRounded,
  IconKeyframeBottomDuotoneRounded,
  IconKeyframeBottomTwotoneRounded,
  IconKeyframeBottomSolidRounded,
  IconKeyframeBottomBulkRounded,
  IconKeyframeBottomStrokeSharp,
  IconKeyframeBottomSolidSharp,
];