import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124Z',
  d2: 'M8.5 2.5V21.5',
  d3: 'M15.5 2.5V21.5',
  d4: 'M21.5 12C21.5 7.52161 21.5 5.28244 20.1088 3.8912C19.1401 2.92253 17.7604 2.62831 15.5 2.53894V21.461C17.7604 21.3716 19.1401 21.0774 20.1088 20.1087C21.5 18.7175 21.5 16.4783 21.5 12Z',
  d5: 'M8.5 21.461V2.53894C6.23963 2.62831 4.85991 2.92253 3.89124 3.8912C2.5 5.28244 2.5 7.52161 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1087C4.85991 21.0774 6.23963 21.3716 8.5 21.461Z',
  d6: 'M1.5 11.9271V12.076C1.49998 14.252 1.49996 15.9867 1.68282 17.3469C1.87164 18.7513 2.27175 19.9051 3.18414 20.8175C4.09653 21.7298 5.25033 22.13 6.65471 22.3188C6.92267 22.3548 7.05665 22.3728 7.17331 22.3297C7.28475 22.2885 7.38606 22.1999 7.44173 22.095C7.5 21.9851 7.5 21.8423 7.5 21.5568V2.44641C7.5 2.16088 7.5 2.01811 7.44173 1.90823C7.38606 1.80327 7.28475 1.71467 7.17331 1.67349C7.05665 1.63038 6.92267 1.64839 6.65471 1.68442C5.25033 1.87323 4.09653 2.27334 3.18414 3.18573C2.27175 4.09812 1.87164 5.25193 1.68282 6.65631C1.49996 8.01644 1.49998 9.75117 1.5 11.9271ZM17.3453 1.68442C17.0773 1.64839 16.9433 1.63038 16.8267 1.67349C16.7152 1.71467 16.6139 1.80327 16.5583 1.90823C16.5 2.01811 16.5 2.16088 16.5 2.44641V21.5568C16.5 21.8423 16.5 21.9851 16.5583 22.095C16.6139 22.1999 16.7152 22.2885 16.8267 22.3297C16.9433 22.3728 17.0773 22.3548 17.3453 22.3188C18.7497 22.13 19.9035 21.7298 20.8159 20.8175C21.7283 19.9051 22.1284 18.7513 22.3172 17.3469C22.5 15.9867 22.5 14.252 22.5 12.076V11.9272C22.5 9.75118 22.5 8.01645 22.3172 6.65631C22.1284 5.25193 21.7283 4.09812 20.8159 3.18573C19.9035 2.27334 18.7497 1.87323 17.3453 1.68442Z',
  d7: 'M10.4837 1.50214C10.022 1.50442 9.79114 1.50557 9.64557 1.65186C9.5 1.79816 9.5 2.03069 9.5 2.49575V21.504C9.5 21.9691 9.5 22.2016 9.64557 22.3479C9.79114 22.4942 10.022 22.4953 10.4837 22.4976C10.9412 22.4999 11.4215 22.4999 11.9255 22.4999H12.0745C12.5785 22.4999 13.0588 22.4999 13.5163 22.4976C13.978 22.4953 14.2089 22.4942 14.3544 22.3479C14.5 22.2016 14.5 21.9691 14.5 21.504V2.49575C14.5 2.03069 14.5 1.79816 14.3544 1.65186C14.2089 1.50557 13.978 1.50442 13.5163 1.50213C13.0588 1.49987 12.5784 1.49987 12.0744 1.49988L11.9256 1.49988C11.4216 1.49987 10.9412 1.49987 10.4837 1.50214Z',
  d8: 'M3 21H21V3H3V21Z',
  d9: 'M9 3V21',
  d10: 'M15 3V21',
  d11: 'M10 21.75H14V2.25H10V21.75Z',
  d12: 'M8 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H8V2.25Z',
  d13: 'M16 2.25V21.75H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H16Z',
};

export const IconLayout3ColumnStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout3ColumnDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column DuotoneRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      </g>
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout3ColumnTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sw"
      />
    </TheIconWrapper>
  );
};

export const IconLayout3ColumnSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconLayout3ColumnBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconLayout3ColumnStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column StrokeSharp"
    >
      <path 
        d={d.d8}
        i-c="s sj sw"
      />
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

export const IconLayout3ColumnSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Layout3Column SolidSharp"
    >
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLayout3Column: TheIconSelfPack = [
  'Layout3Column',
  IconLayout3ColumnStrokeRounded,
  IconLayout3ColumnDuotoneRounded,
  IconLayout3ColumnTwotoneRounded,
  IconLayout3ColumnSolidRounded,
  IconLayout3ColumnBulkRounded,
  IconLayout3ColumnStrokeSharp,
  IconLayout3ColumnSolidSharp,
];