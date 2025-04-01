import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 4V20',
  d2: 'M5 4V20',
  d3: 'M15 4V20',
  d4: 'M8 18V6C8 5.05719 8 4.58579 8.29289 4.29289C8.58579 4 9.05719 4 10 4C10.9428 4 11.4142 4 11.7071 4.29289C12 4.58579 12 5.05719 12 6V18C12 18.9428 12 19.4142 11.7071 19.7071C11.4142 20 10.9428 20 10 20C9.05719 20 8.58579 20 8.29289 19.7071C8 19.4142 8 18.9428 8 18Z',
  d5: 'M18 18V6C18 5.05719 18 4.58579 18.2929 4.29289C18.5858 4 19.0572 4 20 4C20.9428 4 21.4142 4 21.7071 4.29289C22 4.58579 22 5.05719 22 6V18C22 18.9428 22 19.4142 21.7071 19.7071C21.4142 20 20.9428 20 20 20C19.0572 20 18.5858 20 18.2929 19.7071C18 19.4142 18 18.9428 18 18Z',
  d6: 'M10.0803 3.25L10.125 3.25001L10.1698 3.25C10.6026 3.24995 10.9994 3.24991 11.3222 3.29331C11.6777 3.3411 12.0534 3.45355 12.3624 3.76257C12.6715 4.07159 12.7839 4.44732 12.8317 4.8028C12.8751 5.12561 12.8751 5.52244 12.875 5.95525V5.95526L12.875 6.00001L12.875 18.0448V18.0448C12.8751 18.4776 12.8751 18.8744 12.8317 19.1972C12.7839 19.5527 12.6715 19.9284 12.3624 20.2374C12.0534 20.5465 11.6777 20.6589 11.3222 20.7067C10.9994 20.7501 10.6026 20.7501 10.1698 20.75H10.0803C9.64744 20.7501 9.25061 20.7501 8.9278 20.7067C8.57232 20.6589 8.19659 20.5465 7.88757 20.2374C7.57855 19.9284 7.4661 19.5527 7.41831 19.1972C7.37491 18.8744 7.37495 18.4776 7.375 18.0448L7.37501 6.00001L7.375 5.95526C7.37495 5.52244 7.37491 5.12561 7.41831 4.8028C7.4661 4.44732 7.57855 4.07159 7.88757 3.76257C8.19659 3.45355 8.57232 3.3411 8.9278 3.29331C9.25061 3.24991 9.64744 3.24995 10.0803 3.25Z',
  d7: 'M2.125 3.25C2.67728 3.25 3.125 3.68528 3.125 4.22222V19.7778C3.125 20.3147 2.67728 20.75 2.125 20.75C1.57272 20.75 1.125 20.3147 1.125 19.7778V4.22222C1.125 3.68528 1.57272 3.25 2.125 3.25Z',
  d8: 'M5.125 3.25C5.67728 3.25 6.125 3.68528 6.125 4.22222V19.7778C6.125 20.3147 5.67728 20.75 5.125 20.75C4.57272 20.75 4.125 20.3147 4.125 19.7778V4.22222C4.125 3.68528 4.57272 3.25 5.125 3.25Z',
  d9: 'M15.125 3.25C15.6773 3.25 16.125 3.68528 16.125 4.22222V19.7778C16.125 20.3147 15.6773 20.75 15.125 20.75C14.5727 20.75 14.125 20.3147 14.125 19.7778V4.22222C14.125 3.68528 14.5727 3.25 15.125 3.25Z',
  d10: 'M20.0803 3.25L20.125 3.25001L20.1698 3.25C20.6026 3.24995 20.9994 3.24991 21.3222 3.29331C21.6777 3.3411 22.0534 3.45355 22.3624 3.76257C22.6715 4.07159 22.7839 4.44732 22.8317 4.8028C22.8751 5.12561 22.8751 5.52244 22.875 5.95525V5.95526L22.875 6.00001L22.875 18.0448V18.0448C22.8751 18.4776 22.8751 18.8744 22.8317 19.1972C22.7839 19.5527 22.6715 19.9284 22.3624 20.2374C22.0534 20.5465 21.6777 20.6589 21.3222 20.7067C20.9994 20.7501 20.6026 20.7501 20.1698 20.75H20.0803C19.6474 20.7501 19.2506 20.7501 18.9278 20.7067C18.5723 20.6589 18.1966 20.5465 17.8876 20.2374C17.5785 19.9284 17.4661 19.5527 17.4183 19.1972C17.3749 18.8744 17.375 18.4776 17.375 18.0448L17.375 6.00001L17.375 5.95526C17.375 5.52244 17.3749 5.12561 17.4183 4.8028C17.4661 4.44732 17.5785 4.07159 17.8876 3.76257C18.1966 3.45355 18.5723 3.3411 18.9278 3.29331C19.2506 3.24991 19.6474 3.24995 20.0803 3.25Z',
  d11: 'M8 20V4H12V20H8Z',
  d12: 'M18 20V4H22V20H18Z',
  d13: 'M7.25 3.25H12.75V20.75H7.25V3.25Z',
  d14: 'M2.75 3.25V20.75H1.25V3.25H2.75Z',
  d15: 'M5.75 3.25V20.75H4.25V3.25H5.75Z',
  d16: 'M15.75 3.25V20.75H14.25V3.25H15.75Z',
  d17: 'M17.25 3.25H22.75V20.75H17.25V3.25Z',
};

export const IconBarCode02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-stroke-rounded IconBarCode02StrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-duotone-rounded IconBarCode02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-twotone-rounded IconBarCode02TwotoneRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-solid-rounded IconBarCode02SolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-bulk-rounded IconBarCode02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-stroke-sharp IconBarCode02StrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBarCode02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bar-code-02-solid-sharp IconBarCode02SolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBarCode02: TheIconSelfPack = {
  name: 'BarCode02',
  StrokeRounded: IconBarCode02StrokeRounded,
  DuotoneRounded: IconBarCode02DuotoneRounded,
  TwotoneRounded: IconBarCode02TwotoneRounded,
  SolidRounded: IconBarCode02SolidRounded,
  BulkRounded: IconBarCode02BulkRounded,
  StrokeSharp: IconBarCode02StrokeSharp,
  SolidSharp: IconBarCode02SolidSharp,
};