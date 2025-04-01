import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 19.9985H17.9997',
  d2: 'M11.996 4.00195V11.53M14.5055 14.5899L15.9502 12.6384C16.2907 12.1784 15.9594 11.53 15.3839 11.53H8.67439C8.10419 11.53 7.77156 12.1679 8.10132 12.6291L9.50342 14.5899L11.444 16.9564C11.7237 17.2976 12.2484 17.2996 12.5307 16.9606L14.5055 14.5899Z',
  d3: 'M10.3974 15.7037L9.63612 14.8178C8.40264 13.3825 7.7859 12.6648 8.06721 12.0824C8.34853 11.5 9.31191 11.5 11.2387 11.5H12.7613C14.6881 11.5 15.6515 11.5 15.9328 12.0824C16.2141 12.6648 15.5974 13.3825 14.3639 14.8178L13.6026 15.7037C12.8599 16.5679 12.4885 17 12 17C11.5115 17 11.1401 16.5679 10.3974 15.7037Z',
  d4: 'M6 19.998H17.9997',
  d5: 'M11.996 4.00195V11.53M14.5055 14.59L15.9502 12.638C16.2907 12.178 15.9594 11.53 15.3839 11.53H8.67435C8.10415 11.53 7.77155 12.168 8.10135 12.629L9.50345 14.59L11.4439 16.956C11.7236 17.298 12.2483 17.3 12.5307 16.961L14.5055 14.59Z',
  d6: 'M11.995 4.00146V11.5295M14.5046 14.5894L15.9493 12.6379C16.2898 12.178 15.9585 11.5295 15.383 11.5295H8.67342C8.10321 11.5295 7.77058 12.1675 8.10034 12.6286L9.50244 14.5894L11.443 16.956C11.7227 17.2971 12.2474 17.2991 12.5297 16.9601L14.5046 14.5894Z',
  d7: 'M5 20C5 19.4477 5.44772 19 6 19L18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21L6 21C5.44772 21 5 20.5523 5 20Z',
  d8: 'M11.0004 3.99987C11.0004 3.44758 11.4481 2.99987 12.0004 2.99987C12.5527 2.99987 13.0004 3.44758 13.0004 3.99987L13.0004 11L14.0873 11C14.4666 10.9998 14.8599 10.9997 15.1717 11.0477C15.505 11.099 16.0844 11.2553 16.37 11.864C16.6526 12.4663 16.412 13.005 16.2367 13.2974C16.0763 13.5651 15.8276 13.8625 15.5904 14.1461L15.5511 14.1932C15.0722 14.7663 14.4986 15.414 13.9529 15.9263C13.6817 16.181 13.3935 16.4249 13.1093 16.6113C12.8635 16.7726 12.4621 17 12 17C11.5379 17 11.1366 16.7726 10.8908 16.6113C10.6066 16.4249 10.3184 16.181 10.0471 15.9263C9.50146 15.414 8.92787 14.7663 8.44896 14.1932L8.40965 14.1462C8.17242 13.8625 7.92375 13.5652 7.76332 13.2975C7.58805 13.005 7.34738 12.4663 7.62998 11.864C7.91554 11.2553 8.49501 11.099 8.82833 11.0477C9.14007 10.9997 9.53339 10.9999 9.91274 11L11.0004 11L11.0004 3.99987Z',
  d9: 'M6 20H18',
  d10: 'M12 12V4',
  d11: 'M12 17L16 12L8 12L12 17Z',
  d12: 'M18 20.5H6V18.5H18V20.5Z',
  d13: 'M11 10.5494V3.5H13V10.5494L17.5 10.5495L11.9999 16.5L6.5 10.5494L11 10.5494Z',
};

export const IconArrowDown05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-stroke-rounded IconArrowDown05StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowDown05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-duotone-rounded IconArrowDown05DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDown05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-twotone-rounded IconArrowDown05TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDown05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-solid-rounded IconArrowDown05SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconArrowDown05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-bulk-rounded IconArrowDown05BulkRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconArrowDown05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-stroke-sharp IconArrowDown05StrokeSharp"
    >
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
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowDown05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-down-05-solid-sharp IconArrowDown05SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowDown05: TheIconSelfPack = {
  name: 'ArrowDown05',
  StrokeRounded: IconArrowDown05StrokeRounded,
  DuotoneRounded: IconArrowDown05DuotoneRounded,
  TwotoneRounded: IconArrowDown05TwotoneRounded,
  SolidRounded: IconArrowDown05SolidRounded,
  BulkRounded: IconArrowDown05BulkRounded,
  StrokeSharp: IconArrowDown05StrokeSharp,
  SolidSharp: IconArrowDown05SolidSharp,
};