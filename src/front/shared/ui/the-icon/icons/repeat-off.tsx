import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16',
  d2: 'M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8',
  d3: 'M9 12H15',
  d4: 'M16.881 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16C3.848 16.9858 5.85306 18.3096 6.90847 18.9219C6.97458 18.9602 7.00764 18.9794 7.04593 18.9897C7.08423 19 7.12375 19 7.20279 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8C19.7228 6.4681 17.9648 5.4251 17.1087 5.04654C17.0581 5.02415 17.0327 5.01295 17.0021 5.00648C16.9714 5 16.9413 5 16.881 5Z',
  d5: 'M16.3884 3L17.3912 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16',
  d6: 'M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z',
  d7: 'M20.13 7.18734C20.5789 6.86556 21.2036 6.96858 21.5254 7.41744C22.4548 8.71393 23.0022 10.2951 23.0022 12.0001C23.0022 16.444 19.3075 20.0001 14.8079 20.0001H8.61371V21C8.61375 21.2514 8.51959 21.503 8.33043 21.6974C7.94528 22.0933 7.31218 22.1019 6.91634 21.7168L5.91354 20.7411C5.72256 20.5554 5.47232 20.3122 5.3256 20.1224C5.19673 19.9557 4.82489 19.4343 5.09763 18.7936C5.36433 18.1671 5.98229 18.0609 6.188 18.0326C6.42618 17.9998 6.72519 17.9999 6.99644 18.0001H6.99646L7.04694 18.0001H14.8079C18.2549 18.0001 21.0022 15.2882 21.0022 12.0001C21.0022 10.7305 20.5961 9.55389 19.8999 8.58271C19.5781 8.13385 19.6812 7.50912 20.13 7.18734Z',
  d8: 'M3.87389 16.8127C3.42502 17.1344 2.8003 17.0314 2.47852 16.5826C1.5491 15.2861 1.00175 13.7049 1.00175 11.9999C1.00175 7.55602 4.69641 3.99992 9.19597 3.99992H15.3902V3C15.3902 2.74861 15.4843 2.49697 15.6735 2.30256C16.0586 1.90673 16.6917 1.89806 17.0876 2.28321L18.0904 3.25894C18.2813 3.44457 18.5316 3.68781 18.6783 3.87758C18.8072 4.04428 19.179 4.56574 18.9063 5.20642C18.6396 5.83292 18.0216 5.93914 17.8159 5.96744C17.5777 6.00021 17.2787 6.00007 17.0075 5.99994H17.0074L16.957 5.99992H9.19597C5.74902 5.99992 3.00175 8.71184 3.00175 11.9999C3.00175 13.2695 3.40777 14.4461 4.10399 15.4173C4.42577 15.8662 4.32275 16.4909 3.87389 16.8127Z',
  d9: 'M8 12H16',
  d10: 'M3.31245 15.9844C1.62328 13.7974 1.52213 10.263 3.36893 7.90974C5.21573 5.55645 6.8522 4.97575 10.5565 4.97575C13.3938 4.97575 17.0435 4.9878 18.7683 4.9878M15.0229 2.02051L18.2839 4.81639',
  d11: 'M20.7198 8.05364C22.4089 10.2407 22.5101 13.7751 20.6633 16.1284C18.8165 18.4816 17.18 19.0623 13.4758 19.0623C10.6384 19.0623 6.9887 19.0503 5.2639 19.0503M9.0093 22.0176L5.74834 19.2217',
  d12: 'M15.6402 1.25L19 4.04985V6.01822H9.19422C5.74727 6.01822 3 8.73013 3 12.0182C3 13.2878 3.40602 14.4644 4.10224 15.4356L2.47676 16.6009C1.54735 15.3044 1 13.7232 1 12.0182C1 7.57432 4.69465 4.01822 9.19422 4.01822H15.8379L14.3598 2.78644L15.6402 1.25Z',
  d13: 'M21 11.9811C21 10.7115 20.594 9.53488 19.8978 8.5637L21.5232 7.39844C22.4527 8.69492 23 10.2761 23 11.9811C23 16.425 19.3053 19.9811 14.8058 19.9811H8.16205L9.64018 21.2128L8.35982 22.7493L5 19.9494V17.9811H14.8058C18.2527 17.9811 21 15.2692 21 11.9811Z',
  d14: 'M16 13H8V11H16V13Z',
};

export const IconRepeatOffStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff DuotoneRounded"
    >
      <path 
        d={d.d4}
        i-c="f o7"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff BulkRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr o7"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sj sw"
      />
      <path 
        d={d.d10}
        i-c="s sb sw"
      />
      <path 
        d={d.d11}
        i-c="s sb sw"
      />
    </TheIconWrapper>
  );
};

export const IconRepeatOffSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="RepeatOff SolidSharp"
    >
      <path 
        d={d.d12}
        i-c="c f fr"
      />
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRepeatOff: TheIconSelfPack = [
  'RepeatOff',
  IconRepeatOffStrokeRounded,
  IconRepeatOffDuotoneRounded,
  IconRepeatOffTwotoneRounded,
  IconRepeatOffSolidRounded,
  IconRepeatOffBulkRounded,
  IconRepeatOffStrokeSharp,
  IconRepeatOffSolidSharp,
];