import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.999 11C21.9906 13.6255 21.9127 15.0435 21.1862 16.0811C20.8851 16.5111 20.5111 16.8851 20.0811 17.1862C18.9188 18 17.2792 18 14 18H10C6.72077 18 5.08116 18 3.91891 17.1862C3.48891 16.8851 3.1149 16.5111 2.81382 16.0811C2 14.9188 2 13.2792 2 10C2 6.72077 2 5.08116 2.81382 3.91891C3.1149 3.48891 3.48891 3.1149 3.91891 2.81382C5.08116 2 6.72077 2 10 2H11.5',
  d2: 'M14 6C14 6 15 6 16 8C16 8 19.1765 3 22 2',
  d3: 'M11 15H13',
  d4: 'M12 18V22',
  d5: 'M8 22H16',
  d6: 'M14 2H10C6.72077 2 5.08116 2 3.91891 2.81382C3.48891 3.1149 3.1149 3.48891 2.81382 3.91891C2 5.08116 2 6.72077 2 10C2 13.2792 2 14.9188 2.81382 16.0811C3.1149 16.5111 3.48891 16.8851 3.91891 17.1862C5.08116 18 6.72077 18 10 18H14C17.2792 18 18.9188 18 20.0811 17.1862C20.5111 16.8851 20.8851 16.5111 21.1862 16.0811C22 14.9188 22 13.2792 22 10C22 6.72077 22 5.08116 21.1862 3.91891C20.8851 3.48891 20.5111 3.1149 20.0811 2.81382C18.9188 2 17.2792 2 14 2Z',
  d7: 'M22.9407 1.66643C23.1251 2.18702 22.8525 2.75852 22.3319 2.9429C21.7983 3.1319 21.1818 3.53876 20.5287 4.11148C19.886 4.67513 19.2609 5.35205 18.7071 6.01586C18.1553 6.67736 17.6865 7.31109 17.3555 7.78008C17.1903 8.01407 17.0603 8.20579 16.9723 8.33786L16.8421 8.53651C16.6488 8.84059 16.3068 9.01739 15.9469 8.99896C15.587 8.98053 15.2648 8.76985 15.1036 8.44749C14.6629 7.56612 14.2676 7.21517 14.0683 7.08232C13.984 7.02611 13.9271 7.00359 13.9044 6.99595C13.396 6.94874 12.998 6.52099 12.998 6.00027C12.998 5.44799 13.4458 5.00027 13.998 5.00027C14.0804 5.00107 14.2851 5.01614 14.4446 5.07C14.6525 5.12939 14.9033 5.23529 15.1777 5.41822C15.452 5.60107 15.7397 5.85384 16.0284 6.1997C16.3436 5.76895 16.732 5.26128 17.1713 4.73468C17.7646 4.02349 18.463 3.26292 19.21 2.60781C19.9467 1.96179 20.7861 1.36865 21.6642 1.05765C22.1848 0.873267 22.7563 1.14583 22.9407 1.66643Z',
  d8: 'M10 14C10 13.4477 10.4477 13 11 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H11C10.4477 15 10 14.5523 10 14Z',
  d9: 'M9.94328 1L11.5 1C12.0523 1 12.5 1.44772 12.5 2C12.5 2.55229 12.0523 3 11.5 3H10C8.33876 3 7.17091 3.0013 6.27041 3.09622C5.38772 3.18926 4.8778 3.36317 4.49248 3.63297C4.15804 3.86715 3.86715 4.15804 3.63297 4.49248C3.36317 4.8778 3.18926 5.38772 3.09622 6.27041C3.0013 7.17091 3 8.33876 3 10C3 11.6612 3.0013 12.8291 3.09622 13.7296C3.18926 14.6123 3.36317 15.1222 3.63297 15.5075C3.86715 15.842 4.15804 16.1329 4.49248 16.367C4.8778 16.6368 5.38772 16.8107 6.27041 16.9038C7.17091 16.9987 8.33876 17 10 17H14C15.6612 17 16.8291 16.9987 17.7296 16.9038C18.6123 16.8107 19.1222 16.6368 19.5075 16.367C19.842 16.1329 20.1329 15.842 20.367 15.5075C20.608 15.1633 20.7726 14.7194 20.8712 14.0002C20.9721 13.2636 20.9948 12.3171 20.999 10.9968C21.0008 10.4445 21.4499 9.99825 22.0022 10C22.5545 10.0018 23.0007 10.4509 22.999 11.0032C22.9948 12.3083 22.9744 13.3836 22.8526 14.2718C22.7285 15.1774 22.4909 15.9613 22.0053 16.6547C21.6373 17.1802 21.1802 17.6373 20.6547 18.0053C19.8777 18.5494 18.9867 18.7824 17.9392 18.8928C16.9216 19 15.6482 19 14.0567 19H13.4C13.0229 19 13 19.0229 13 19.4V20C13 20.8273 13.1727 21 14 21H16C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21H10C10.8273 21 11 20.8273 11 20V19.4C11 19.0229 10.9771 19 10.6 19H9.94327C8.35178 19 7.07837 19 6.06076 18.8928C5.01328 18.7824 4.12227 18.5494 3.34533 18.0053C2.81978 17.6373 2.36266 17.1802 1.99466 16.6547C1.45065 15.8777 1.21765 14.9867 1.10724 13.9392C0.999973 12.9216 0.999985 11.6482 1 10.0567V9.94328C0.999985 8.35179 0.999973 7.07838 1.10724 6.06076C1.21765 5.01328 1.45065 4.12227 1.99466 3.34533C2.36266 2.81978 2.81978 2.36266 3.34533 1.99466C4.12227 1.45065 5.01328 1.21765 6.06076 1.10724C7.07838 0.999973 8.35179 0.999985 9.94328 1Z',
  d10: 'M22 9V18H2V3H12',
  d11: 'M14 6L16 8L22 2',
  d12: 'M10.5 15H13.5',
  d13: 'M12 18.001V21.9996M12 21.9996H8M12 21.9996H16',
  d14: 'M22.7502 2.66421L16.043 9.37132L13.3359 6.66421L14.7502 5.25L16.043 6.54289L21.3359 1.25L22.7502 2.66421Z',
  d15: 'M13.5 15.25H10.5V13.25H13.5V15.25Z',
  d16: 'M2.22727 1.25C1.68754 1.25 1.25 1.68528 1.25 2.22222V17.7778C1.25 18.3147 1.68754 18.75 2.22727 18.75H9.25V20.75H7V22.75H17V20.75H14.75V18.75H21.7727C22.3125 18.75 22.75 18.3147 22.75 17.7778V9L20.7955 9V16.8056H3.20455V3.19444H12L12 1.25H2.22727Z',
};

export const IconComputerCheckStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
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
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck DuotoneRounded"
    >
      <path 
        d={d.d6}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sr sw"
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
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sw"
      />
      <path 
        d={d.d5}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck SolidRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="c f fr o7"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck StrokeSharp"
    >
      <path 
        d={d.d10}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sw"
      />
      <path 
        d={d.d12}
        i-c="s sj sw"
      />
      <path 
        d={d.d13}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconComputerCheckSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="ComputerCheck SolidSharp"
    >
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
      <path 
        d={d.d16}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfComputerCheck: TheIconSelfPack = [
  'ComputerCheck',
  IconComputerCheckStrokeRounded,
  IconComputerCheckDuotoneRounded,
  IconComputerCheckTwotoneRounded,
  IconComputerCheckSolidRounded,
  IconComputerCheckBulkRounded,
  IconComputerCheckStrokeSharp,
  IconComputerCheckSolidSharp,
];