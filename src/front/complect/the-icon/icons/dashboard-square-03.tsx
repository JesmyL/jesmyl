import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 5C16 4.06812 16 3.60218 16.1522 3.23463C16.3552 2.74458 16.7446 2.35523 17.2346 2.15224C17.6022 2 18.0681 2 19 2C19.9319 2 20.3978 2 20.7654 2.15224C21.2554 2.35523 21.6448 2.74458 21.8478 3.23463C22 3.60218 22 4.06812 22 5V9C22 9.93188 22 10.3978 21.8478 10.7654C21.6448 11.2554 21.2554 11.6448 20.7654 11.8478C20.3978 12 19.9319 12 19 12C18.0681 12 17.6022 12 17.2346 11.8478C16.7446 11.6448 16.3552 11.2554 16.1522 10.7654C16 10.3978 16 9.93188 16 9V5Z',
  d2: 'M16 19C16 18.0681 16 17.6022 16.1522 17.2346C16.3552 16.7446 16.7446 16.3552 17.2346 16.1522C17.6022 16 18.0681 16 19 16C19.9319 16 20.3978 16 20.7654 16.1522C21.2554 16.3552 21.6448 16.7446 21.8478 17.2346C22 17.6022 22 18.0681 22 19C22 19.9319 22 20.3978 21.8478 20.7654C21.6448 21.2554 21.2554 21.6448 20.7654 21.8478C20.3978 22 19.9319 22 19 22C18.0681 22 17.6022 22 17.2346 21.8478C16.7446 21.6448 16.3552 21.2554 16.1522 20.7654C16 20.3978 16 19.9319 16 19Z',
  d3: 'M2 16C2 14.1144 2 13.1716 2.58579 12.5858C3.17157 12 4.11438 12 6 12H8C9.88562 12 10.8284 12 11.4142 12.5858C12 13.1716 12 14.1144 12 16V18C12 19.8856 12 20.8284 11.4142 21.4142C10.8284 22 9.88562 22 8 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V16Z',
  d4: 'M2 5C2 4.06812 2 3.60218 2.15224 3.23463C2.35523 2.74458 2.74458 2.35523 3.23463 2.15224C3.60218 2 4.06812 2 5 2H9C9.93188 2 10.3978 2 10.7654 2.15224C11.2554 2.35523 11.6448 2.74458 11.8478 3.23463C12 3.60218 12 4.06812 12 5C12 5.93188 12 6.39782 11.8478 6.76537C11.6448 7.25542 11.2554 7.64477 10.7654 7.84776C10.3978 8 9.93188 8 9 8H5C4.06812 8 3.60218 8 3.23463 7.84776C2.74458 7.64477 2.35523 7.25542 2.15224 6.76537C2 6.39782 2 5.93188 2 5Z',
  d5: 'M19.0253 1.25C19.4697 1.24999 19.8408 1.24999 20.1454 1.27077C20.4625 1.29241 20.762 1.33905 21.0524 1.45933C21.7262 1.73844 22.2616 2.27379 22.5407 2.94762C22.661 3.23801 22.7076 3.53754 22.7292 3.85464C22.75 4.15925 22.75 4.53028 22.75 4.97474V9.02526C22.75 9.46972 22.75 9.84075 22.7292 10.1454C22.7076 10.4625 22.661 10.762 22.5407 11.0524C22.2616 11.7262 21.7262 12.2616 21.0524 12.5407C20.762 12.661 20.4625 12.7076 20.1454 12.7292C19.8408 12.75 19.4697 12.75 19.0253 12.75H18.9747C18.5303 12.75 18.1592 12.75 17.8546 12.7292C17.5375 12.7076 17.238 12.661 16.9476 12.5407C16.2738 12.2616 15.7384 11.7262 15.4593 11.0524C15.339 10.762 15.2924 10.4625 15.2708 10.1454C15.25 9.84076 15.25 9.46972 15.25 9.02526V9.02525V4.97475V4.97474C15.25 4.53028 15.25 4.15925 15.2708 3.85464C15.2924 3.53754 15.339 3.23801 15.4593 2.94762C15.7384 2.27379 16.2738 1.73844 16.9476 1.45933C17.238 1.33905 17.5375 1.29241 17.8546 1.27077C18.1592 1.24999 18.5303 1.24999 18.9747 1.25H18.9747H19.0253H19.0253Z',
  d6: 'M19.0253 15.25C19.4697 15.25 19.8408 15.25 20.1454 15.2708C20.4625 15.2924 20.762 15.339 21.0524 15.4593C21.7262 15.7384 22.2616 16.2738 22.5407 16.9476C22.661 17.238 22.7076 17.5375 22.7292 17.8546C22.75 18.1592 22.75 18.5303 22.75 18.9747V19.0253C22.75 19.4697 22.75 19.8408 22.7292 20.1454C22.7076 20.4625 22.661 20.762 22.5407 21.0524C22.2616 21.7262 21.7262 22.2616 21.0524 22.5407C20.762 22.661 20.4625 22.7076 20.1454 22.7292C19.8408 22.75 19.4697 22.75 19.0253 22.75H18.9747C18.5303 22.75 18.1592 22.75 17.8546 22.7292C17.5375 22.7076 17.238 22.661 16.9476 22.5407C16.2738 22.2616 15.7384 21.7262 15.4593 21.0524C15.339 20.762 15.2924 20.4625 15.2708 20.1454C15.25 19.8408 15.25 19.4697 15.25 19.0253V19.0253V18.9747V18.9747C15.25 18.5303 15.25 18.1592 15.2708 17.8546C15.2924 17.5375 15.339 17.238 15.4593 16.9476C15.7384 16.2738 16.2738 15.7384 16.9476 15.4593C17.238 15.339 17.5375 15.2924 17.8546 15.2708C18.1592 15.25 18.5303 15.25 18.9747 15.25H18.9747H19.0253H19.0253Z',
  d7: 'M8.05203 11.25C8.9505 11.25 9.69971 11.2499 10.2945 11.3299C10.9223 11.4143 11.4891 11.6 11.9445 12.0555C12.4 12.5109 12.5857 13.0777 12.6701 13.7055C12.7501 14.3003 12.75 15.0495 12.75 15.948V15.948V18.052V18.052C12.75 18.9505 12.7501 19.6997 12.6701 20.2945C12.5857 20.9223 12.4 21.4891 11.9445 21.9445C11.4891 22.4 10.9223 22.5857 10.2945 22.6701C9.69971 22.7501 8.9505 22.75 8.05203 22.75H8.052H5.94801H5.94798C5.04951 22.75 4.3003 22.7501 3.70552 22.6701C3.07773 22.5857 2.51093 22.4 2.05546 21.9445C1.59999 21.4891 1.41432 20.9223 1.32991 20.2945C1.24995 19.6997 1.24997 18.9505 1.25 18.052V18.052V15.948V15.948C1.24997 15.0495 1.24995 14.3003 1.32991 13.7055C1.41432 13.0777 1.59999 12.5109 2.05546 12.0555C2.51093 11.6 3.07773 11.4143 3.70552 11.3299C4.3003 11.2499 5.04951 11.25 5.94797 11.25H5.948H8.052H8.05203Z',
  d8: 'M9.02526 1.25C9.46972 1.24999 9.84076 1.24999 10.1454 1.27077C10.4625 1.29241 10.762 1.33905 11.0524 1.45933C11.7262 1.73844 12.2616 2.27379 12.5407 2.94762C12.661 3.23801 12.7076 3.53754 12.7292 3.85464C12.75 4.15925 12.75 4.53028 12.75 4.97474V5.02526C12.75 5.46972 12.75 5.84075 12.7292 6.14537C12.7076 6.46247 12.661 6.76199 12.5407 7.05238C12.2616 7.72621 11.7262 8.26156 11.0524 8.54067C10.762 8.66095 10.4625 8.7076 10.1454 8.72923C9.84075 8.75001 9.46972 8.75001 9.02526 8.75H4.97474C4.53028 8.75001 4.15925 8.75001 3.85464 8.72923C3.53754 8.7076 3.23801 8.66095 2.94762 8.54067C2.27379 8.26156 1.73844 7.72621 1.45933 7.05238C1.33905 6.76199 1.29241 6.46247 1.27077 6.14537C1.24999 5.84075 1.24999 5.46972 1.25 5.02526V5.02525V4.97475V4.97474C1.24999 4.53028 1.24999 4.15925 1.27077 3.85464C1.29241 3.53754 1.33905 3.23801 1.45933 2.94762C1.73844 2.27379 2.27379 1.73844 2.94762 1.45933C3.23801 1.33905 3.53754 1.29241 3.85464 1.27077C4.15925 1.24999 4.53028 1.24999 4.97474 1.25H4.97475H9.02525H9.02526Z',
  d9: 'M12 2H2V8H12V2Z',
  d10: 'M22 2H16V12H22V2Z',
  d11: 'M22 16H16V22H22V16Z',
  d12: 'M12 12H2V22H12V12Z',
  d13: 'M1.25 2C1.25 1.58579 1.58579 1.25 2 1.25H12C12.4142 1.25 12.75 1.58579 12.75 2V8C12.75 8.41421 12.4142 8.75 12 8.75H2C1.58579 8.75 1.25 8.41421 1.25 8V2Z',
  d14: 'M15.25 2C15.25 1.58579 15.5858 1.25 16 1.25H22C22.4142 1.25 22.75 1.58579 22.75 2V12C22.75 12.4142 22.4142 12.75 22 12.75H16C15.5858 12.75 15.25 12.4142 15.25 12V2Z',
  d15: 'M15.25 16C15.25 15.5858 15.5858 15.25 16 15.25H22C22.4142 15.25 22.75 15.5858 22.75 16V22C22.75 22.4142 22.4142 22.75 22 22.75H16C15.5858 22.75 15.25 22.4142 15.25 22V16Z',
  d16: 'M1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V22C12.75 22.4142 12.4142 22.75 12 22.75H2C1.58579 22.75 1.25 22.4142 1.25 22V12Z',
};

export const IconDashboardSquare03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-stroke-rounded IconDashboardSquare03StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSquare03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-duotone-rounded IconDashboardSquare03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSquare03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-twotone-rounded IconDashboardSquare03TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSquare03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-solid-rounded IconDashboardSquare03SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconDashboardSquare03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-bulk-rounded IconDashboardSquare03BulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconDashboardSquare03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-stroke-sharp IconDashboardSquare03StrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardSquare03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-square-03-solid-sharp IconDashboardSquare03SolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfDashboardSquare03: TheIconSelfPack = {
  name: 'DashboardSquare03',
  StrokeRounded: IconDashboardSquare03StrokeRounded,
  DuotoneRounded: IconDashboardSquare03DuotoneRounded,
  TwotoneRounded: IconDashboardSquare03TwotoneRounded,
  SolidRounded: IconDashboardSquare03SolidRounded,
  BulkRounded: IconDashboardSquare03BulkRounded,
  StrokeSharp: IconDashboardSquare03StrokeSharp,
  SolidSharp: IconDashboardSquare03SolidSharp,
};