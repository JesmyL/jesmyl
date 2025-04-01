import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12.001C22 17.5236 17.5229 22.001 12 22.001C6.47713 22.001 2 17.5236 2 12.001C2 6.47811 6.47713 2.00098 12 2.00098C17.5229 2.00098 22 6.47811 22 12.001Z',
  d2: 'M16.2581 8.51081C15.9874 8.1973 15.5138 8.16261 15.2003 8.43332C14.8868 8.70403 14.8521 9.17763 15.1228 9.49114L16.2581 8.51081ZM17.1609 10.704L16.5933 11.1941H16.5933L17.1609 10.704ZM16.048 13.0005L16.0484 13.7505H16.0484L16.048 13.0005ZM14.9996 12.251C14.5854 12.2512 14.2498 12.5871 14.25 13.0013C14.2502 13.4155 14.5861 13.7512 15.0004 13.751L14.9996 12.251ZM15.1228 9.49114L16.5933 11.1941L17.7286 10.2138L16.2581 8.51081L15.1228 9.49114ZM16.0476 12.2505L14.9996 12.251L15.0004 13.751L16.0484 13.7505L16.0476 12.2505ZM16.5933 11.1941C16.9262 11.5796 16.6886 12.2502 16.0476 12.2505L16.0484 13.7505C17.8657 13.7496 18.9699 11.6514 17.7286 10.2138L16.5933 11.1941Z',
  d3: 'M9 8.00098V12.999',
  d4: 'M9.5 17.5007H11M9.5 17.5007H8M9.5 17.5007C9.16667 17.1673 8.69989 16.3005 9.5 15.5007C10.1328 14.8681 11 15.5015 11 15.5015',
  d5: 'M12 13.001V13.011',
  d6: 'M1.25 12.001C1.25 6.0639 6.06292 1.25098 12 1.25098C17.9371 1.25098 22.75 6.0639 22.75 12.001C22.75 17.9378 17.9371 22.751 12 22.751C6.06291 22.751 1.25 17.9378 1.25 12.001ZM15.2003 8.43333C15.5138 8.16262 15.9874 8.19731 16.2581 8.51083L17.7286 10.2138C18.9699 11.6514 17.8657 13.7496 16.0484 13.7505L15.0004 13.751C14.5861 13.7512 14.2502 13.4156 14.25 13.0013C14.2498 12.5871 14.5854 12.2512 14.9996 12.251L16.0476 12.2505C16.6886 12.2502 16.9262 11.5796 16.5933 11.1941L15.1228 9.49115C14.8521 9.17764 14.8868 8.70404 15.2003 8.43333ZM9.75 8.00098C9.75 7.58676 9.41421 7.25098 9 7.25098C8.58579 7.25098 8.25 7.58676 8.25 8.00098L8.25 12.999C8.25 13.4132 8.58579 13.749 9 13.749C9.41421 13.749 9.75 13.4132 9.75 12.999V8.00098ZM9.8791 16.7499H11C11.4142 16.7499 11.75 17.0857 11.75 17.4999C11.75 17.9141 11.4142 18.2499 11 18.2499H8C7.58579 18.2499 7.25 17.9141 7.25 17.4999C7.25 17.0857 7.58579 16.7499 8 16.7499H8.32782C8.24647 16.1685 8.41137 15.5277 8.96974 14.9695C9.54312 14.3962 10.2345 14.4189 10.6814 14.5386C10.8393 14.5828 11.2125 14.7159 11.4424 14.8951C11.7769 15.1394 11.85 15.6087 11.6056 15.9431C11.3628 16.2755 10.898 16.3498 10.564 16.111C10.2903 15.9114 10.0941 15.974 10.0303 16.0303C9.78991 16.2422 9.82934 16.5983 9.8791 16.7499ZM13 13.001C13 12.4487 12.5523 12.001 12 12.001C11.4477 12.001 11 12.4487 11 13.001V13.011C11 13.5633 11.4477 14.011 12 14.011C12.5523 14.011 13 13.5633 13 13.011V13.001Z',
  d7: 'M1.25 12.001C1.25 6.0639 6.06292 1.25098 12 1.25098C17.9371 1.25098 22.75 6.0639 22.75 12.001C22.75 17.9378 17.9371 22.751 12 22.751C6.06291 22.751 1.25 17.9378 1.25 12.001Z',
  d8: 'M15.2003 8.43333C15.5138 8.16262 15.9874 8.19731 16.2581 8.51082L17.7286 10.2138C18.9699 11.6514 17.8657 13.7496 16.0484 13.7505L15.0004 13.751C14.5861 13.7512 14.2502 13.4156 14.25 13.0013C14.2498 12.5871 14.5854 12.2512 14.9996 12.251L16.0476 12.2505C16.6886 12.2502 16.9262 11.5796 16.5933 11.1941L15.1228 9.49115C14.8521 9.17764 14.8868 8.70404 15.2003 8.43333Z',
  d9: 'M9 7.25098C9.41421 7.25098 9.75 7.58676 9.75 8.00098V12.999C9.75 13.4132 9.41421 13.749 9 13.749C8.58579 13.749 8.25 13.4132 8.25 12.999V8.00098C8.25 7.58676 8.58579 7.25098 9 7.25098Z',
  d10: 'M9.8791 16.7499H11C11.4142 16.7499 11.75 17.0857 11.75 17.4999C11.75 17.9141 11.4142 18.2499 11 18.2499H8C7.58579 18.2499 7.25 17.9141 7.25 17.4999C7.25 17.0857 7.58579 16.7499 8 16.7499H8.32782C8.24647 16.1685 8.41137 15.5277 8.96974 14.9695C9.54312 14.3962 10.2345 14.4189 10.6814 14.5386C10.8393 14.5828 11.2125 14.7159 11.4424 14.8951C11.7769 15.1394 11.85 15.6087 11.6056 15.9431C11.3628 16.2755 10.898 16.3498 10.564 16.111C10.2903 15.9114 10.0941 15.974 10.0303 16.0303C9.78991 16.2422 9.82934 16.5983 9.8791 16.7499Z',
  d11: 'M12 12.001C12.5523 12.001 13 12.4487 13 13.001V13.011C13 13.5633 12.5523 14.011 12 14.011C11.4477 14.011 11 13.5633 11 13.011V13.001C11 12.4487 11.4477 12.001 12 12.001Z',
  d12: 'M16.2581 8.51081L15.7679 7.94315L14.6326 8.92348L15.1228 9.49114L16.2581 8.51081ZM17.1609 10.704L16.5933 11.1941H16.5933L17.1609 10.704ZM16.048 13.0005L16.0484 13.7505H16.0484L16.048 13.0005ZM14.9996 12.251L14.2496 12.2513L14.2504 13.7513L15.0004 13.751L14.9996 12.251ZM15.1228 9.49114L16.5933 11.1941L17.7286 10.2138L16.2581 8.51081L15.1228 9.49114ZM16.0476 12.2505L14.9996 12.251L15.0004 13.751L16.0484 13.7505L16.0476 12.2505ZM16.5933 11.1941C16.9262 11.5796 16.6886 12.2502 16.0476 12.2505L16.0484 13.7505C17.8657 13.7496 18.9699 11.6514 17.7286 10.2138L16.5933 11.1941Z',
  d13: 'M9.5 17.5007H11M9.5 17.5007H7.5M9.5 17.5007C9.16667 17.1673 8.69989 16.3005 9.5 15.5007C10.1328 14.8681 11 15.5015 11 15.5015',
  d14: 'M1.25 12.002C1.25 6.06487 6.06292 1.25195 12 1.25195C17.9371 1.25195 22.75 6.06487 22.75 12.002C22.75 17.9388 17.9371 22.752 12 22.752C6.06291 22.752 1.25 17.9388 1.25 12.002ZM15.7683 7.94336L17.729 10.214C18.9703 11.6516 17.8661 13.7498 16.0487 13.7507L14.2507 13.7515L14.25 12.2515L16.048 12.2507C16.6889 12.2504 16.9265 11.5798 16.5936 11.1943L14.633 8.92369L15.7683 7.94336ZM9.75 13.75V7.25195H8.25V13.75H9.75ZM10.2932 15.9885C10.1483 15.9497 10.0897 15.9719 10.0303 16.0313C9.90597 16.1555 9.85352 16.2586 9.83002 16.3321C9.80631 16.4063 9.80287 16.4795 9.81521 16.5553C9.82625 16.6231 9.8497 16.6899 9.8791 16.7508H11V18.2508H7.5V16.7508H8.32782C8.24647 16.1695 8.41137 15.5287 8.96974 14.9704C9.54312 14.3972 10.2345 14.4199 10.6814 14.5396C10.9024 14.5988 11.1328 14.6621 11.4414 14.8954C11.4414 14.8954 11.4424 14.8961 11 15.5017C10.5576 16.1073 10.5581 16.1077 10.5581 16.1077C10.5017 16.0771 10.3681 16.0086 10.2932 15.9885ZM13 14.012V12.002H11V14.012H13Z',
};

export const IconDirhamStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-stroke-rounded IconDirhamStrokeRounded"
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
        fill="var(--icon-fill)" 
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

export const IconDirhamDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-duotone-rounded IconDirhamDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
        fill="var(--icon-fill)" 
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

export const IconDirhamTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-twotone-rounded IconDirhamTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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

export const IconDirhamSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-solid-rounded IconDirhamSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDirhamBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-bulk-rounded IconDirhamBulkRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDirhamStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-stroke-sharp IconDirhamStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconDirhamSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dirham-solid-sharp IconDirhamSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDirham: TheIconSelfPack = {
  name: 'Dirham',
  StrokeRounded: IconDirhamStrokeRounded,
  DuotoneRounded: IconDirhamDuotoneRounded,
  TwotoneRounded: IconDirhamTwotoneRounded,
  SolidRounded: IconDirhamSolidRounded,
  BulkRounded: IconDirhamBulkRounded,
  StrokeSharp: IconDirhamStrokeSharp,
  SolidSharp: IconDirhamSolidSharp,
};