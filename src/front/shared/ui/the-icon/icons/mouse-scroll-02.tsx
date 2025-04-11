import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C18 22 19.5 17.49 19.5 12C19.5 6.50998 18 2 12 2C5.99993 2 4.5 6.50996 4.5 12C4.5 17.49 5.99993 22 12 22Z',
  d2: 'M11.9883 6.83887L11.9883 11.7589',
  d3: 'M9.99609 7.8586C10.9801 6.8386 11.5801 5.9386 12.0361 6.00329C12.4201 6.0001 12.7801 6.5986 14.0041 7.8586',
  d4: 'M14.0041 11.1406C13.0201 12.1606 12.4201 13.0606 11.9641 12.9959C11.5801 12.9991 11.2201 12.4006 9.99609 11.1406',
  d5: 'M11.9883 6.83887V11.7588',
  d6: 'M10.0039 7.85861C10.9859 6.83861 11.5847 5.93861 12.0398 6.00329C12.4231 6.0001 12.7823 6.59861 14.0039 7.85861',
  d7: 'M13.9961 11.1406C13.0141 12.1606 12.4153 13.0606 11.9602 12.9959C11.5769 12.9991 11.2177 12.4006 9.99609 11.1406',
  d8: 'M11.9883 6.83886V11.7588M10.0039 7.85861C10.9859 6.83861 11.5847 5.93861 12.0398 6.00329C12.4231 6.0001 12.7823 6.59861 14.0039 7.85861M13.9961 11.1406C13.0141 12.1606 12.4153 13.0606 11.9602 12.9959C11.5769 12.9991 11.2177 12.4006 9.99609 11.1406',
  d9: 'M12 1.25C8.77681 1.25 6.64252 2.48241 5.36262 4.54591C4.12483 6.54151 3.75 9.21526 3.75 12C3.75 14.7847 4.12483 17.4585 5.36262 19.4541C6.64252 21.5176 8.7768 22.75 12 22.75C15.2231 22.75 17.3574 21.5176 18.6373 19.4541C19.8751 17.4585 20.25 14.7847 20.25 12C20.25 9.21527 19.8751 6.54152 18.6373 4.54592C17.3574 2.48242 15.2231 1.25 12 1.25ZM9.49278 8.41184C9.18766 8.13171 9.1674 7.65727 9.44754 7.35215L10.4755 6.23249C10.6868 6.00228 10.8934 5.77707 11.0876 5.61573C11.3045 5.4355 11.6032 5.25 12 5.25C12.3968 5.25 12.6955 5.4355 12.9124 5.61573C13.1066 5.77706 13.3132 6.00225 13.5245 6.23246L13.5245 6.23248L13.5245 6.23249L14.5525 7.35215C14.8326 7.65727 14.8124 8.13171 14.5072 8.41184C14.3631 8.54413 14.1813 8.60943 14 8.60938H13V10.3906H14C14.1813 10.3906 14.3631 10.4559 14.5072 10.5882C14.8124 10.8683 14.8326 11.3427 14.5525 11.6479L13.5245 12.7675L13.5245 12.7675C13.3132 12.9977 13.1066 13.2229 12.9124 13.3843C12.6955 13.5645 12.3968 13.75 12 13.75C11.6032 13.75 11.3045 13.5645 11.0876 13.3843C10.8934 13.2229 10.6868 12.9977 10.4755 12.7675L9.44754 11.6479C9.1674 11.3427 9.18766 10.8683 9.49278 10.5882C9.63686 10.4559 9.8187 10.3906 10 10.3906H11V8.60938H10C9.8187 8.60943 9.63686 8.54413 9.49278 8.41184Z',
  d10: 'M5.36262 4.54591C6.64252 2.48241 8.77681 1.25 12 1.25C15.2231 1.25 17.3574 2.48242 18.6373 4.54592C19.8751 6.54152 20.25 9.21527 20.25 12C20.25 14.7847 19.8751 17.4585 18.6373 19.4541C17.3574 21.5176 15.2231 22.75 12 22.75C8.7768 22.75 6.64252 21.5176 5.36262 19.4541C4.12483 17.4585 3.75 14.7847 3.75 12C3.75 9.21526 4.12483 6.54151 5.36262 4.54591Z',
  d11: 'M9.44754 7.35215C9.1674 7.65727 9.18766 8.13171 9.49278 8.41184C9.63686 8.54413 9.8187 8.60943 10 8.60938H11V10.3906H10C9.8187 10.3906 9.63686 10.4559 9.49278 10.5882C9.18766 10.8683 9.1674 11.3427 9.44754 11.6479L10.4755 12.7675C10.6868 12.9977 10.8934 13.2229 11.0876 13.3843C11.3045 13.5645 11.6032 13.75 12 13.75C12.3968 13.75 12.6955 13.5645 12.9124 13.3843C13.1066 13.2229 13.3132 12.9977 13.5245 12.7675L14.5525 11.6479C14.8326 11.3427 14.8124 10.8683 14.5072 10.5882C14.3631 10.4559 14.1813 10.3906 14 10.3906H13V8.60938H14C14.1813 8.60943 14.3631 8.54413 14.5072 8.41184C14.8124 8.13171 14.8326 7.65727 14.5525 7.35215L13.5245 6.23249L13.5245 6.23248C13.3132 6.00227 13.1066 5.77706 12.9124 5.61573C12.6955 5.4355 12.3968 5.25 12 5.25C11.6032 5.25 11.3045 5.4355 11.0876 5.61573C10.8934 5.77707 10.6868 6.00228 10.4755 6.23249L9.44754 7.35215Z',
  d12: 'M9.47754 10.9543L12.0091 13.001L14.4843 10.9981M14.5223 7.99188L12.0091 5.99902L9.47754 7.99188M12.0091 12.4027V6.58615',
  d13: 'M12 1.25C8.77681 1.25 6.64252 2.48241 5.36262 4.54591C4.12483 6.54151 3.75 9.21526 3.75 12C3.75 14.7847 4.12483 17.4585 5.36262 19.4541C6.64252 21.5176 8.7768 22.75 12 22.75C15.2231 22.75 17.3574 21.5176 18.6373 19.4541C19.8751 17.4585 20.25 14.7847 20.25 12C20.25 9.21527 19.8751 6.54152 18.6373 4.54592C17.3574 2.48242 15.2231 1.25 12 1.25ZM14.9683 7.41388L11.9998 5.03906L9.03125 7.41388L9.96829 8.58518L11.2498 7.56V11.4391L9.96829 10.4139L9.03125 11.5852L11.9998 13.96L14.9683 11.5852L14.0312 10.4139L12.7498 11.4391V7.56L14.0312 8.58518L14.9683 7.41388Z',
};

export const IconMouseScroll02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
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

export const IconMouseScroll02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 DuotoneRounded"
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
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouseScroll02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d8}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouseScroll02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 SolidRounded"
    >
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconMouseScroll02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 BulkRounded"
    >
      <path 
        d={d.d10}
        i-c="f o7"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconMouseScroll02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconMouseScroll02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MouseScroll02 SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMouseScroll02: TheIconSelfPack = [
  'MouseScroll02',
  IconMouseScroll02StrokeRounded,
  IconMouseScroll02DuotoneRounded,
  IconMouseScroll02TwotoneRounded,
  IconMouseScroll02SolidRounded,
  IconMouseScroll02BulkRounded,
  IconMouseScroll02StrokeSharp,
  IconMouseScroll02SolidSharp,
];