import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 19.5V11.5C13.5 10.5572 13.5 10.0858 13.2071 9.79289C12.9142 9.5 12.4428 9.5 11.5 9.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V19.5C9.5 20.4428 9.5 20.9142 9.79289 21.2071C10.0858 21.5 10.5572 21.5 11.5 21.5C12.4428 21.5 12.9142 21.5 13.2071 21.2071C13.5 20.9142 13.5 20.4428 13.5 19.5Z',
  d2: 'M20.5 12.5V19.5C20.5 20.4428 20.5 20.9142 20.2071 21.2071C19.9142 21.5 19.4428 21.5 18.5 21.5C17.5572 21.5 17.0858 21.5 16.7929 21.2071C16.5 20.9142 16.5 20.4428 16.5 19.5V12.5',
  d3: 'M17.4375 9.16667L17.4375 3.83333M19 3.83333V2.5M19 10.5V9.16667M17.4375 6.5H20.5625M20.5625 6.5C21.0803 6.5 21.5 6.94772 21.5 7.5V8.16667C21.5 8.71895 21.0803 9.16667 20.5625 9.16667H16.5M20.5625 6.5C21.0803 6.5 21.5 6.05228 21.5 5.5V4.83333C21.5 4.28105 21.0803 3.83333 20.5625 3.83333H16.5',
  d4: 'M6.5 19.5V14.5C6.5 13.5572 6.5 13.0858 6.20711 12.7929C5.91421 12.5 5.44281 12.5 4.5 12.5C3.55719 12.5 3.08579 12.5 2.79289 12.7929C2.5 13.0858 2.5 13.5572 2.5 14.5V19.5C2.5 20.4428 2.5 20.9142 2.79289 21.2071C3.08579 21.5 3.55719 21.5 4.5 21.5C5.44281 21.5 5.91421 21.5 6.20711 21.2071C6.5 20.9142 6.5 20.4428 6.5 19.5Z',
  d5: 'M20.5 19.5V12.5H16.5V19.5C16.5 20.4428 16.5 20.9142 16.7929 21.2071C17.0858 21.5 17.5572 21.5 18.5 21.5C19.4428 21.5 19.9142 21.5 20.2071 21.2071C20.5 20.9142 20.5 20.4428 20.5 19.5Z',
  d6: 'M11.5 8.75001C11.9328 8.74996 12.3744 8.74991 12.6972 8.79331C13.0527 8.8411 13.4284 8.95355 13.7374 9.26257C14.0465 9.57159 14.1589 9.94732 14.2067 10.3028C14.2501 10.6256 14.2501 11.0224 14.25 11.4553V11.4553V19.5448V19.5448C14.2501 19.9776 14.2501 20.3744 14.2067 20.6972C14.1589 21.0527 14.0465 21.4284 13.7374 21.7374C13.4284 22.0465 13.0527 22.1589 12.6972 22.2067C12.3744 22.2501 11.8881 22.2501 11.4553 22.25H11.4553C11.0224 22.2501 10.6256 22.2501 10.3028 22.2067C9.94732 22.1589 9.57159 22.0465 9.26257 21.7374C8.95355 21.4284 8.8411 21.0527 8.79331 20.6972C8.74991 20.3744 8.74995 19.9776 8.75 19.5448L8.75 11.4553C8.74995 11.0224 8.74991 10.6256 8.79331 10.3028C8.8411 9.94732 8.95355 9.57159 9.26257 9.26257C9.57159 8.95355 9.94732 8.8411 10.3028 8.79331C10.6256 8.74991 11.0672 8.74996 11.5 8.75001Z',
  d7: 'M19 1.75C19.4142 1.75 19.75 2.08579 19.75 2.5V3.08333H20.5625C21.5393 3.08333 22.25 3.91317 22.25 4.83333V5.5C22.25 5.8624 22.1398 6.2108 21.9465 6.5C22.1398 6.7892 22.25 7.1376 22.25 7.5V8.16667C22.25 9.08683 21.5393 9.91667 20.5625 9.91667H19.75V10.5C19.75 10.9142 19.4142 11.25 19 11.25C18.5858 11.25 18.25 10.9142 18.25 10.5V9.91667H16.5C16.0858 9.91667 15.75 9.58088 15.75 9.16667C15.75 8.75245 16.0858 8.41667 16.5 8.41667H16.6875L16.6875 4.58333H16.5C16.0858 4.58333 15.75 4.24755 15.75 3.83333C15.75 3.41912 16.0858 3.08333 16.5 3.08333H18.25V2.5C18.25 2.08579 18.5858 1.75 19 1.75ZM18.1875 4.58333V5.75H20.5625C20.6212 5.75 20.75 5.6844 20.75 5.5V4.83333C20.75 4.64893 20.6212 4.58333 20.5625 4.58333H18.1875ZM20.5625 7.25H18.1875L18.1875 8.41667H20.5625C20.6212 8.41667 20.75 8.35107 20.75 8.16667V7.5C20.75 7.3156 20.6212 7.25 20.5625 7.25Z',
  d8: 'M4.54476 11.75C4.97757 11.75 5.3744 11.7499 5.69721 11.7933C6.05269 11.8411 6.42842 11.9535 6.73744 12.2626C7.04647 12.5716 7.15891 12.9473 7.20671 13.3028C7.25011 13.6256 7.25006 14.0224 7.25001 14.4553V14.4553V19.5448V19.5448C7.25006 19.9776 7.25011 20.3744 7.20671 20.6972C7.15891 21.0527 7.04647 21.4284 6.73744 21.7374C6.42842 22.0465 6.0527 22.1589 5.69721 22.2067C5.3744 22.2501 4.88808 22.2501 4.45526 22.25H4.45525C4.02244 22.2501 3.62561 22.2501 3.3028 22.2067C2.94732 22.1589 2.57159 22.0465 2.26257 21.7374C1.95355 21.4284 1.8411 21.0527 1.79331 20.6972C1.74991 20.3744 1.74995 19.9776 1.75 19.5448L1.75 14.4553C1.74995 14.0224 1.74991 13.6256 1.79331 13.3028C1.8411 12.9473 1.95355 12.5716 2.26257 12.2626C2.57159 11.9535 2.94732 11.8411 3.3028 11.7933C3.62561 11.7499 4.11194 11.75 4.54476 11.75Z',
  d9: 'M15.75 11.2886L15.75 19.5447C15.75 19.9775 15.7499 20.3743 15.7933 20.6971C15.8411 21.0526 15.9535 21.4284 16.2626 21.7374C16.5716 22.0464 16.9473 22.1588 17.3028 22.2066C17.6256 22.25 18.1119 22.25 18.5448 22.2499C18.9776 22.25 19.3744 22.25 19.6972 22.2066C20.0527 22.1588 20.4284 22.0464 20.7374 21.7374C21.0465 21.4284 21.1589 21.0526 21.2067 20.6971C21.2501 20.3743 21.2501 19.9775 21.25 19.5447L21.25 11.3437C21.1917 11.3564 21.1326 11.3675 21.0727 11.377C20.7308 12.1839 19.9315 12.7499 19 12.7499C18.0838 12.7499 17.2955 12.2023 16.9446 11.4166H16.5C16.237 11.4166 15.9846 11.3715 15.75 11.2886Z',
  d10: 'M13.5 9.5H9.5V21.5H13.5V9.5Z',
  d11: 'M20.5 12.5V21.5L16.5 21.5V12.5',
  d12: 'M6.5 12.5H2.5V21.5H6.5V12.5Z',
  d13: 'M8.75 8.75H14.25V22.25H8.75V8.75Z',
  d14: 'M19.75 1.75V3.08333H20.5625C21.5393 3.08333 22.25 3.91317 22.25 4.83333V5.5C22.25 5.8624 22.1398 6.2108 21.9465 6.5C22.1398 6.7892 22.25 7.1376 22.25 7.5V8.16667C22.25 9.08683 21.5393 9.91667 20.5625 9.91667H19.75V11.25H18.25V9.91667H15.75V8.41667H16.6875L16.6875 4.58333H15.75V3.08333H18.25V1.75H19.75ZM18.1875 4.58333V5.75H20.5625C20.6212 5.75 20.75 5.6844 20.75 5.5V4.83333C20.75 4.64893 20.6212 4.58333 20.5625 4.58333H18.1875ZM20.5625 7.25H18.1875L18.1875 8.41667H20.5625C20.6212 8.41667 20.75 8.35107 20.75 8.16667V7.5C20.75 7.3156 20.6212 7.25 20.5625 7.25Z',
  d15: 'M15.75 22.25L21.25 22.25V12.75H15.75V22.25Z',
  d16: 'M1.75 11.75H7.25V22.25H1.75V11.75Z',
};

export const IconBitcoinGraphStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-stroke-rounded IconBitcoinGraphStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBitcoinGraphDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-duotone-rounded IconBitcoinGraphDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconBitcoinGraphTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-twotone-rounded IconBitcoinGraphTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
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
    </TheIconWrapper>
  );
};

export const IconBitcoinGraphSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-solid-rounded IconBitcoinGraphSolidRounded"
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinGraphBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-bulk-rounded IconBitcoinGraphBulkRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinGraphStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-stroke-sharp IconBitcoinGraphStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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

export const IconBitcoinGraphSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-graph-solid-sharp IconBitcoinGraphSolidSharp"
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
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinGraph: TheIconSelfPack = {
  name: 'BitcoinGraph',
  StrokeRounded: IconBitcoinGraphStrokeRounded,
  DuotoneRounded: IconBitcoinGraphDuotoneRounded,
  TwotoneRounded: IconBitcoinGraphTwotoneRounded,
  SolidRounded: IconBitcoinGraphSolidRounded,
  BulkRounded: IconBitcoinGraphBulkRounded,
  StrokeSharp: IconBitcoinGraphStrokeSharp,
  SolidSharp: IconBitcoinGraphSolidSharp,
};