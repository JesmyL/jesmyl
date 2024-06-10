import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16',
  d2: 'M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8',
  d3: 'M16.881 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16C3.848 16.9858 5.85306 18.3096 6.90847 18.9219C6.97458 18.9602 7.00764 18.9794 7.04593 18.9897C7.08423 19 7.12375 19 7.20279 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8C19.7228 6.4681 17.9648 5.4251 17.1087 5.04654C17.0581 5.02415 17.0327 5.01295 17.0021 5.00648C16.9714 5 16.9413 5 16.881 5Z',
  d4: 'M20.1261 7.18734C20.575 6.86556 21.1997 6.96858 21.5215 7.41744C22.4509 8.71393 22.9982 10.2951 22.9982 12.0001C22.9982 16.444 19.3036 20.0001 14.804 20.0001H8.60981V21C8.60985 21.2514 8.51568 21.503 8.32652 21.6974C7.94138 22.0933 7.30827 22.1019 6.91244 21.7168L5.90963 20.7411C5.71865 20.5554 5.46841 20.3122 5.32169 20.1224C5.19282 19.9557 4.82098 19.4343 5.09372 18.7936C5.36042 18.1671 5.97838 18.0609 6.18409 18.0326C6.42227 17.9998 6.72129 17.9999 6.99253 18.0001H6.99256L7.04303 18.0001H14.804C18.251 18.0001 20.9982 15.2882 20.9982 12.0001C20.9982 10.7305 20.5922 9.55389 19.896 8.58271C19.5742 8.13385 19.6773 7.50912 20.1261 7.18734Z',
  d5: 'M3.87389 16.8127C3.42502 17.1344 2.8003 17.0314 2.47852 16.5826C1.5491 15.2861 1.00175 13.7049 1.00175 11.9999C1.00175 7.55602 4.69641 3.99992 9.19597 3.99992H15.3902V3C15.3902 2.74861 15.4843 2.49697 15.6735 2.30256C16.0586 1.90673 16.6917 1.89806 17.0876 2.28321L18.0904 3.25894C18.2813 3.44457 18.5316 3.68781 18.6783 3.87758C18.8072 4.04428 19.179 4.56574 18.9063 5.20642C18.6396 5.83292 18.0216 5.93914 17.8159 5.96744C17.5777 6.00021 17.2787 6.00007 17.0075 5.99994H17.0074L16.957 5.99992H9.19597C5.74902 5.99992 3.00175 8.71184 3.00175 11.9999C3.00175 13.2695 3.40777 14.4461 4.10399 15.4173C4.42577 15.8662 4.32275 16.4909 3.87389 16.8127Z',
  d6: 'M3.31245 15.9844C1.62328 13.7974 1.52213 10.263 3.36893 7.90974C5.21573 5.55645 6.8522 4.97575 10.5565 4.97575C13.3938 4.97575 17.0435 4.9878 18.7683 4.9878M15.0229 2.02051L18.2839 4.81639',
  d7: 'M20.7198 8.05413C22.4089 10.2412 22.5101 13.7756 20.6633 16.1288C18.8165 18.4821 17.18 19.0628 13.4758 19.0628C10.6384 19.0628 6.9887 19.0508 5.2639 19.0508M9.0093 22.0181L5.74834 19.2222',
  d8: 'M15.6402 1.5L19 4.29985V6.26822H9.19422C5.74727 6.26822 3 8.98013 3 12.2682C3 13.5378 3.40602 14.7144 4.10224 15.6856L2.47676 16.8509C1.54735 15.5544 1 13.9732 1 12.2682C1 7.82432 4.69465 4.26822 9.19422 4.26822H15.8379L14.3598 3.03644L15.6402 1.5Z',
  d9: 'M21 11.7311C21 10.4615 20.594 9.28488 19.8978 8.3137L21.5232 7.14844C22.4527 8.44492 23 10.0261 23 11.7311C23 16.175 19.3053 19.7311 14.8058 19.7311H8.16205L9.64018 20.9628L8.35982 22.4993L5 19.6994V17.7311H14.8058C18.2527 17.7311 21 15.0192 21 11.7311Z',
};

export const IconRepeatStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-stroke-rounded IconRepeatStrokeRounded"
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

export const IconRepeatDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-duotone-rounded IconRepeatDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconRepeatTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-twotone-rounded IconRepeatTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconRepeatSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-solid-rounded IconRepeatSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRepeatBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-bulk-rounded IconRepeatBulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRepeatStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-stroke-sharp IconRepeatStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="bevel" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="bevel" 
      />
    </TheIconWrapper>
  );
};

export const IconRepeatSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="repeat-solid-sharp IconRepeatSolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfRepeat: TheIconSelfPack = {
  name: 'Repeat',
  StrokeRounded: IconRepeatStrokeRounded,
  DuotoneRounded: IconRepeatDuotoneRounded,
  TwotoneRounded: IconRepeatTwotoneRounded,
  SolidRounded: IconRepeatSolidRounded,
  BulkRounded: IconRepeatBulkRounded,
  StrokeSharp: IconRepeatStrokeSharp,
  SolidSharp: IconRepeatSolidSharp,
};