import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.5 16L18.5 19M18.5 19L15.5 22M18.5 19L21.5 22M18.5 19L15.5 16',
  d2: 'M7 16H11M7 11H15',
  d3: 'M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H12M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12.5',
  d4: 'M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z',
  d5: 'M6.51382 3.5C6.50214 3.58165 6.49609 3.66512 6.49609 3.75C6.49609 4.7165 7.2796 5.5 8.24609 5.5H13.7461C14.7126 5.5 15.4961 4.7165 15.4961 3.75C15.4961 3.66512 15.4901 3.58165 15.4784 3.5H15.4922C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V15.9944C19.4961 18.8255 19.4961 20.241 18.6174 21.1205C17.7387 22 16.3245 22 13.4961 22L8.49609 22C5.66767 22 4.25345 22 3.37477 21.1205C2.49609 20.241 2.49609 18.8255 2.49609 15.9944V9.48836C2.49609 6.6573 2.49609 5.24177 3.37477 4.36227C4.01661 3.71984 4.9442 3.54667 6.5 3.5H6.51382Z',
  d6: 'M7 16H11',
  d7: 'M7 11H15',
  d8: 'M6.375 2.875C6.375 1.9085 7.1585 1.125 8.125 1.125H13.625C14.5915 1.125 15.375 1.9085 15.375 2.875C15.375 3.8415 14.5915 4.625 13.625 4.625H8.125C7.1585 4.625 6.375 3.8415 6.375 2.875Z',
  d9: 'M4.96129 2.7279C5.04909 2.71579 5.125 2.7875 5.125 2.87613C5.125 4.53298 6.46815 5.87613 8.125 5.87613L13.625 5.87613C15.2819 5.87613 16.625 4.53298 16.625 2.87613C16.625 2.7875 16.7009 2.71579 16.7887 2.7279C17.6888 2.85205 18.4365 3.11736 19.0269 3.70832C19.6287 4.31067 19.8875 5.06903 20.0085 5.96977C20.125 6.83746 20.125 7.94074 20.125 9.30969L20.125 13.364C20.125 13.5231 20.125 13.6027 20.0946 13.6649C20.0643 13.7272 19.9889 13.786 19.8383 13.9037C19.7581 13.9663 19.681 14.0345 19.6072 14.1082L18.7993 14.9162C18.5993 15.1162 18.4993 15.2162 18.375 15.2162C18.2507 15.2162 18.1507 15.1162 17.9507 14.9162L17.1428 14.1082C16.1665 13.1319 14.5835 13.1319 13.6072 14.1082C12.6309 15.0845 12.6309 16.6674 13.6072 17.6437L14.4152 18.4517C14.6152 18.6517 14.7152 18.7517 14.7152 18.876C14.7152 19.0002 14.6152 19.1002 14.4152 19.3002L13.6072 20.1082C13.1331 20.5823 12.8892 21.1995 12.8756 21.8208C12.8663 22.2436 12.8617 22.455 12.7742 22.5406C12.6868 22.6261 12.5154 22.6261 12.1727 22.6261L8.32006 22.6261C6.95252 22.6261 5.85017 22.6262 4.98316 22.5095C4.08293 22.3883 3.325 22.1292 2.72311 21.5267C2.12131 20.9244 1.8625 20.166 1.74152 19.2653C1.62497 18.3976 1.62498 17.2943 1.625 15.9255V15.9254L1.625 9.30963V9.3096C1.62498 7.94071 1.62497 6.83743 1.74151 5.96977C1.8625 5.06903 2.12131 4.31067 2.72311 3.70832C3.31352 3.11736 4.06119 2.85205 4.96129 2.7279ZM6.875 10.125C6.46079 10.125 6.125 10.4608 6.125 10.875C6.125 11.2892 6.46079 11.625 6.875 11.625L14.875 11.625C15.2892 11.625 15.625 11.2892 15.625 10.875C15.625 10.4608 15.2892 10.125 14.875 10.125L6.875 10.125ZM6.875 15.125C6.46079 15.125 6.125 15.4608 6.125 15.875C6.125 16.2892 6.46079 16.625 6.875 16.625H10.875C11.2892 16.625 11.625 16.2892 11.625 15.875C11.625 15.4608 11.2892 15.125 10.875 15.125H6.875Z',
  d10: 'M14.6679 15.1679C15.0584 14.7774 15.6916 14.7774 16.0821 15.1679L18.375 17.4608L20.6679 15.1679C21.0584 14.7774 21.6916 14.7774 22.0821 15.1679C22.4726 15.5584 22.4726 16.1916 22.0821 16.5821L19.7892 18.875L22.0821 21.1679C22.4726 21.5584 22.4726 22.1916 22.0821 22.5821C21.6916 22.9726 21.0584 22.9726 20.6679 22.5821L18.375 20.2892L16.0821 22.5821C15.6916 22.9726 15.0584 22.9726 14.6679 22.5821C14.2774 22.1916 14.2774 21.5584 14.6679 21.1679L16.9608 18.875L14.6679 16.5821C14.2774 16.1916 14.2774 15.5584 14.6679 15.1679Z',
  d11: 'M5.125 2.87613C5.125 2.7875 5.04909 2.71579 4.96129 2.7279C4.06119 2.85205 3.31352 3.11736 2.72311 3.70832C2.12131 4.31067 1.8625 5.06903 1.74151 5.96977C1.62497 6.83743 1.62498 7.94072 1.625 9.30963V15.9254C1.62498 17.2943 1.62497 18.3976 1.74151 19.2653C1.8625 20.166 2.12131 20.9244 2.72311 21.5267C3.325 22.1292 4.08293 22.3883 4.98316 22.5095C5.85017 22.6262 6.95252 22.6261 8.32006 22.6261L12.1727 22.6261C12.5154 22.6261 12.6868 22.6261 12.7742 22.5406C12.8617 22.455 12.8663 22.2436 12.8756 21.8208C12.8892 21.1995 13.1331 20.5823 13.6072 20.1082L14.4152 19.3002C14.6152 19.1002 14.7152 19.0002 14.7152 18.876C14.7152 18.7517 14.6152 18.6517 14.4152 18.4517L13.6072 17.6437C12.6309 16.6674 12.6309 15.0845 13.6072 14.1082C14.5835 13.1319 16.1665 13.1319 17.1428 14.1082L17.9507 14.9162C18.1507 15.1162 18.2507 15.2162 18.375 15.2162C18.4993 15.2162 18.5993 15.1162 18.7993 14.9162L19.6072 14.1082C19.681 14.0345 19.7581 13.9663 19.8383 13.9037C19.9889 13.786 20.0643 13.7272 20.0946 13.6649C20.125 13.6027 20.125 13.5231 20.125 13.364V9.30969C20.125 7.94074 20.125 6.83746 20.0085 5.96977C19.8875 5.06903 19.6287 4.31067 19.0269 3.70832C18.4365 3.11736 17.6888 2.85205 16.7887 2.7279C16.7009 2.71579 16.625 2.7875 16.625 2.87613C16.625 4.53298 15.2819 5.87613 13.625 5.87613H8.125C6.46815 5.87613 5.125 4.53298 5.125 2.87613Z',
  d12: 'M6.125 10.875C6.125 10.4608 6.46079 10.125 6.875 10.125H14.875C15.2892 10.125 15.625 10.4608 15.625 10.875C15.625 11.2892 15.2892 11.625 14.875 11.625H6.875C6.46079 11.625 6.125 11.2892 6.125 10.875ZM6.125 15.875C6.125 15.4608 6.46079 15.125 6.875 15.125H10.875C11.2892 15.125 11.625 15.4608 11.625 15.875C11.625 16.2892 11.2892 16.625 10.875 16.625H6.875C6.46079 16.625 6.125 16.2892 6.125 15.875Z',
  d13: 'M15 3.5H19.5V13M7 3.5H2.5V22H12',
  d14: 'M15 2H7V5H15V2Z',
  d15: 'M6.5 16H11.5M6.5 11H15.5',
  d16: 'M14.5 1.24992H6.5V4.74992H14.5V1.24992Z',
  d17: 'M2 2.99992H5.25L5.25 5.99992H15.75V2.99992H19C19.4142 2.99992 19.75 3.33571 19.75 3.74992V14.8009L19.0433 15.5077L16.7504 13.2148L13.2148 16.7503L15.5077 19.0432L13.2148 21.3361L14.6287 22.7499L2 22.7499C1.58579 22.7499 1.25 22.4141 1.25 21.9999V3.74992C1.25 3.33571 1.58579 2.99992 2 2.99992ZM6.00195 11.7499H15.002V10.2499H6.00195V11.7499ZM6.00195 16.7499H11.002V15.2499H6.00195V16.7499Z',
  d18: 'M19 22.7499H18.8721L19.0433 22.5787L19.19 22.7255C19.1285 22.7416 19.0647 22.7499 19 22.7499Z',
  d19: 'M20.4571 19.043L22.75 16.7501L21.3358 15.3359L19.0429 17.6288L16.75 15.3359L15.3358 16.7501L17.6287 19.043L15.3358 21.3359L16.75 22.7501L19.0429 20.4572L21.3358 22.7501L22.75 21.3359L20.4571 19.043Z',
};

export const IconTaskRemove01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-stroke-rounded IconTaskRemove01StrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-duotone-rounded IconTaskRemove01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-twotone-rounded IconTaskRemove01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-solid-rounded IconTaskRemove01SolidRounded"
    >
      <path 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-bulk-rounded IconTaskRemove01BulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-stroke-sharp IconTaskRemove01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskRemove01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-remove-01-solid-sharp IconTaskRemove01SolidSharp"
    >
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskRemove01: TheIconSelfPack = {
  name: 'TaskRemove01',
  StrokeRounded: IconTaskRemove01StrokeRounded,
  DuotoneRounded: IconTaskRemove01DuotoneRounded,
  TwotoneRounded: IconTaskRemove01TwotoneRounded,
  SolidRounded: IconTaskRemove01SolidRounded,
  BulkRounded: IconTaskRemove01BulkRounded,
  StrokeSharp: IconTaskRemove01StrokeSharp,
  SolidSharp: IconTaskRemove01SolidSharp,
};