import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.99805 16H11.998M7.99805 11H15.998',
  d2: 'M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5',
  d3: 'M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z',
  d4: 'M7.51382 3.5C7.50214 3.58165 7.49609 3.66512 7.49609 3.75C7.49609 4.7165 8.2796 5.5 9.24609 5.5H14.7461C15.7126 5.5 16.4961 4.7165 16.4961 3.75C16.4961 3.66512 16.4901 3.58165 16.4784 3.5H16.4922C18.048 3.54667 18.9756 3.71984 19.6174 4.36228C20.4961 5.24177 20.4961 6.6573 20.4961 9.48836V15.9944C20.4961 18.8255 20.4961 20.241 19.6174 21.1205C18.7387 22 17.3245 22 14.4961 22L9.49609 22C6.66767 22 5.25345 22 4.37477 21.1205C3.49609 20.241 3.49609 18.8255 3.49609 15.9944V9.48836C3.49609 6.6573 3.49609 5.24177 4.37477 4.36227C5.01661 3.71984 5.9442 3.54667 7.5 3.5H7.51382Z',
  d5: 'M7.5 3C7.5 2.0335 8.2835 1.25 9.25 1.25H14.75C15.7165 1.25 16.5 2.0335 16.5 3C16.5 3.9665 15.7165 4.75 14.75 4.75H9.25C8.2835 4.75 7.5 3.9665 7.5 3Z',
  d6: 'M6.25 3.00113C6.25 2.9125 6.17409 2.84079 6.08629 2.8529C5.18618 2.97705 4.43852 3.24236 3.84811 3.83332C3.24631 4.43567 2.9875 5.19403 2.86651 6.09477C2.74997 6.96244 2.74998 8.06574 2.75 9.43465L2.75 16.0504C2.74998 17.4193 2.74997 18.5226 2.86651 19.3903C2.9875 20.291 3.24631 21.0494 3.84811 21.6517C4.44999 22.2542 5.20792 22.5133 6.10816 22.6345C6.97517 22.7512 8.07752 22.7511 9.44506 22.7511L14.5549 22.7511C15.9225 22.7512 17.0248 22.7512 17.8918 22.6345C18.7921 22.5133 19.55 22.2542 20.1519 21.6517C20.7537 21.0494 21.0125 20.291 21.1335 19.3903C21.25 18.5226 21.25 17.4193 21.25 16.0503L21.25 9.43469C21.25 8.06574 21.25 6.96246 21.1335 6.09477C21.0125 5.19403 20.7537 4.43567 20.1519 3.83332C19.5615 3.24236 18.8138 2.97705 17.9137 2.8529C17.8259 2.84079 17.75 2.9125 17.75 3.00113C17.75 4.65798 16.4069 6.00113 14.75 6.00113L9.25 6.00113C7.59315 6.00113 6.25 4.65798 6.25 3.00113ZM8.00196 10.2499C7.58774 10.2499 7.25196 10.5857 7.25196 10.9999C7.25196 11.4142 7.58774 11.7499 8.00196 11.7499L16.002 11.7499C16.4162 11.7499 16.752 11.4142 16.752 10.9999C16.752 10.5857 16.4162 10.2499 16.002 10.2499L8.00196 10.2499ZM8.00196 15.2499C7.58774 15.2499 7.25196 15.5857 7.25196 15.9999C7.25196 16.4142 7.58774 16.7499 8.00196 16.7499H12.002C12.4162 16.7499 12.752 16.4142 12.752 15.9999C12.752 15.5857 12.4162 15.2499 12.002 15.2499H8.00196Z',
  d7: 'M6.08629 2.8529C6.17409 2.84079 6.25 2.9125 6.25 3.00113C6.25 4.65798 7.59315 6.00113 9.25 6.00113H14.75C16.4069 6.00113 17.75 4.65798 17.75 3.00113C17.75 2.9125 17.8259 2.84079 17.9137 2.8529C18.8138 2.97705 19.5615 3.24236 20.1519 3.83332C20.7537 4.43567 21.0125 5.19403 21.1335 6.09477C21.25 6.96246 21.25 8.06574 21.25 9.43469V16.0503C21.25 17.4193 21.25 18.5226 21.1335 19.3903C21.0125 20.291 20.7537 21.0494 20.1519 21.6517C19.55 22.2542 18.7921 22.5133 17.8918 22.6345C17.0248 22.7512 15.9225 22.7512 14.5549 22.7511L9.44506 22.7511C8.07752 22.7511 6.97517 22.7512 6.10816 22.6345C5.20792 22.5133 4.44999 22.2542 3.84811 21.6517C3.24631 21.0494 2.9875 20.291 2.86651 19.3903C2.74997 18.5226 2.74998 17.4193 2.75 16.0504V9.43465C2.74998 8.06574 2.74997 6.96244 2.86651 6.09477C2.9875 5.19403 3.24631 4.43567 3.84811 3.83332C4.43852 3.24236 5.18618 2.97705 6.08629 2.8529Z',
  d8: 'M7.25195 11C7.25195 10.5858 7.58774 10.25 8.00195 10.25H16.002C16.4162 10.25 16.752 10.5858 16.752 11C16.752 11.4142 16.4162 11.75 16.002 11.75H8.00195C7.58774 11.75 7.25195 11.4142 7.25195 11ZM7.25195 16C7.25195 15.5858 7.58774 15.25 8.00195 15.25H12.002C12.4162 15.25 12.752 15.5858 12.752 16C12.752 16.4142 12.4162 16.75 12.002 16.75H8.00195C7.58774 16.75 7.25195 16.4142 7.25195 16Z',
  d9: 'M16 3.5H20.5V22L3.5 22V3.5H8',
  d10: 'M16.0008 2H8.00076V5H16.0008V2Z',
  d11: 'M3.5 3H6.75L6.75 6H17.25V3H20.5C20.9142 3 21.25 3.33579 21.25 3.75V22C21.25 22.1989 21.171 22.3897 21.0303 22.5303C20.8897 22.671 20.6989 22.75 20.5 22.75L3.5 22.75C3.08579 22.75 2.75 22.4142 2.75 22V3.75C2.75 3.33579 3.08579 3 3.5 3ZM7.99805 11.75H15.998V10.25H7.99805V11.75ZM7.99805 16.75H11.998V15.25H7.99805V16.75Z',
  d12: 'M16 1.25H8V4.75H16V1.25Z',
};

export const IconTask01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-stroke-rounded IconTask01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-duotone-rounded IconTask01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-twotone-rounded IconTask01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-solid-rounded IconTask01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-bulk-rounded IconTask01BulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-stroke-sharp IconTask01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTask01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-01-solid-sharp IconTask01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTask01: TheIconSelfPack = {
  name: 'Task01',
  StrokeRounded: IconTask01StrokeRounded,
  DuotoneRounded: IconTask01DuotoneRounded,
  TwotoneRounded: IconTask01TwotoneRounded,
  SolidRounded: IconTask01SolidRounded,
  BulkRounded: IconTask01BulkRounded,
  StrokeSharp: IconTask01StrokeSharp,
  SolidSharp: IconTask01SolidSharp,
};