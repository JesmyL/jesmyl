import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.71288 7.97461C6.6048 7.97461 4.08521 10.2303 4.08521 13.0129H9.71288V7.97461Z',
  d2: 'M2.53453 15.926C3.77319 18.368 6.52105 20.0662 9.71196 20.0662L9.71196 13.0127H4.87217C3.40834 13.0127 2.67643 13.0127 2.23141 13.7319C1.78639 14.4511 2.03577 14.9427 2.53453 15.926Z',
  d3: 'M12.7146 21.6766C16.8432 20.5311 19.842 17.0854 19.842 13.0127H9.71216V19.0586C9.71216 20.5322 9.71216 21.269 10.3128 21.7226C10.9134 22.1763 11.5138 22.0097 12.7146 21.6766Z',
  d4: 'M21.6409 10.0343C20.4535 6.21439 17.0382 3.22528 12.7272 2.25958C11.4777 1.97968 10.8529 1.83973 10.2825 2.29354C9.71216 2.74735 9.71216 3.48208 9.71216 4.95155V13.0127H19.0541C20.534 13.0127 21.2739 13.0127 21.7294 12.3984C22.1849 11.784 22.0036 11.2008 21.6409 10.0343Z',
  d5: 'M2.69223 15.8911C3.91502 18.3146 6.62767 19.9999 9.77769 19.9999L9.77769 12.9999H4.99991C3.55484 12.9999 2.83231 12.9999 2.393 13.7137C1.95368 14.4274 2.19986 14.9153 2.69223 15.8911Z',
  d6: 'M21.5532 10.0441C20.3809 6.2532 17.0094 3.28678 12.7536 2.32841C11.5201 2.05063 10.9034 1.91174 10.3403 2.36211C9.77725 2.81248 9.77725 3.54163 9.77725 4.99994L9.77769 12.9999H18.9995C20.4604 12.9999 21.1908 12.9999 21.6405 12.3903C22.0901 11.7806 21.9111 11.2018 21.5532 10.0441Z',
  d7: 'M9.77821 8C6.70996 8 4.22266 10.2386 4.22266 13H9.77821V8Z',
  d8: 'M2.69232 15.8912C3.91511 18.3147 6.62776 20 9.77778 20L9.77778 13H5C3.55493 13 2.8324 13 2.39309 13.7137C1.95377 14.4275 2.19995 14.9154 2.69232 15.8912Z',
  d9: 'M12.7413 21.5981C16.817 20.4613 19.7773 17.0418 19.7773 13H9.77734V19C9.77734 20.4624 9.77734 21.1936 10.3703 21.6438C10.9632 22.094 11.5559 21.9287 12.7413 21.5981Z',
  d10: 'M21.5533 10.0442C20.381 6.25325 17.0095 3.28684 12.7537 2.32846C11.5202 2.05069 10.9035 1.9118 10.3404 2.36217C9.77734 2.81253 9.77734 3.54169 9.77734 5V13H18.9996C20.4605 13 21.1909 13 21.6406 12.3903C22.0902 11.7806 21.9112 11.2018 21.5533 10.0442Z',
  d11: 'M14.1393 1.49455L14.0878 1.48292C13.587 1.36976 13.1255 1.26547 12.7276 1.25162C12.2678 1.23562 11.8423 1.33592 11.4459 1.65382C11.0304 1.98705 10.8501 2.42043 10.7705 2.89734C10.6991 3.32552 10.6992 3.85746 10.6992 4.45922L10.6992 4.51108V11.2669C10.6992 11.7383 10.6992 11.974 10.8457 12.1204C10.9921 12.2669 11.2278 12.2669 11.6992 12.2669H19.5155L19.5703 12.2669H19.5703C20.169 12.2669 20.7044 12.267 21.1362 12.1887C21.625 12.1001 22.0581 11.8993 22.3841 11.4562C22.6898 11.0406 22.7823 10.6111 22.7399 10.1438C22.7041 9.74906 22.5673 9.30588 22.4231 8.83901L22.4067 8.78574C21.2926 5.1734 18.1071 2.39038 14.1393 1.49455ZM8.558 7.22266C5.735 7.22266 3.33203 9.1648 3.33203 11.686C3.33203 12.0076 3.61033 12.2682 3.95362 12.2682H8.558C8.9013 12.2682 9.17959 12.0076 9.17959 11.686V7.80484C9.17959 7.48331 8.9013 7.22266 8.558 7.22266ZM4.36988 13.7695L4.30959 13.7695H4.30957C3.73301 13.7694 3.20147 13.7693 2.77066 13.8574C2.26481 13.9607 1.84535 14.1934 1.54563 14.6575C1.27496 15.0766 1.19287 15.4857 1.2882 15.9297C1.36536 16.2891 1.56136 16.6589 1.7523 17.0191L1.77913 17.0697C2.96218 19.3045 5.55833 20.8194 8.52738 20.8194C8.88782 20.8194 9.18001 20.5409 9.18001 20.1973L9.18001 14.3916C9.18001 14.2266 9.11125 14.0684 8.98886 13.9517C8.86647 13.8351 8.70047 13.7695 8.52738 13.7695H4.36988ZM10.6992 14.4161C10.6992 14.059 10.9881 13.7695 11.3445 13.7695H19.9483C20.3047 13.7695 20.5936 14.059 20.5936 14.4161C20.5936 18.2376 17.806 21.4069 14.068 22.4516L14.0168 22.4659L14.0167 22.4659C13.5511 22.5961 13.114 22.7184 12.7293 22.7459C12.2777 22.7781 11.8618 22.6855 11.4645 22.3832C11.0432 22.0627 10.8555 21.64 10.7727 21.1677C10.6991 20.7477 10.6992 20.2266 10.6992 19.6412L10.6992 19.5889V14.4161Z',
  d12: 'M3.33203 11.686C3.33203 9.1648 5.735 7.22266 8.558 7.22266C8.9013 7.22266 9.17959 7.48331 9.17959 7.80484V11.686C9.17959 12.0076 8.9013 12.2682 8.558 12.2682H3.95362C3.61033 12.2682 3.33203 12.0076 3.33203 11.686Z',
  d13: 'M4.30959 13.7695L4.36988 13.7695H8.52738C8.70047 13.7695 8.86647 13.8351 8.98886 13.9517C9.11125 14.0684 9.18001 14.2266 9.18001 14.3916L9.18001 20.1973C9.18001 20.5409 8.88782 20.8194 8.52738 20.8194C5.55833 20.8194 2.96218 19.3045 1.77913 17.0697L1.7523 17.0191C1.56136 16.6589 1.36536 16.2891 1.2882 15.9297C1.19287 15.4857 1.27496 15.0766 1.54563 14.6575C1.84535 14.1934 2.26481 13.9607 2.77066 13.8574C3.20147 13.7693 3.73302 13.7694 4.30959 13.7695Z',
  d14: 'M10.6992 14.4161C10.6992 14.059 10.9881 13.7695 11.3445 13.7695H19.9483C20.3047 13.7695 20.5936 14.059 20.5936 14.4161C20.5936 18.2376 17.806 21.4069 14.068 22.4516L14.0168 22.4659C13.5512 22.5961 13.114 22.7184 12.7293 22.7459C12.2777 22.7781 11.8618 22.6855 11.4645 22.3832C11.0432 22.0627 10.8555 21.64 10.7727 21.1677C10.6991 20.7477 10.6992 20.2266 10.6992 19.6412L10.6992 19.5889V14.4161Z',
  d15: 'M14.0878 1.48292L14.1393 1.49455C18.1071 2.39038 21.2926 5.1734 22.4067 8.78574L22.4231 8.83901L22.4231 8.83902C22.5673 9.30588 22.7041 9.74906 22.7399 10.1438C22.7823 10.6111 22.6898 11.0406 22.3841 11.4562C22.0581 11.8993 21.625 12.1001 21.1362 12.1887C20.7044 12.267 20.169 12.2669 19.5703 12.2669H19.5703L19.5155 12.2669H10.6992V4.51108L10.6992 4.45922C10.6992 3.85746 10.6991 3.32552 10.7705 2.89734C10.8501 2.42043 11.0304 1.98705 11.4459 1.65382C11.8423 1.33592 12.2678 1.23562 12.7276 1.25162C13.1255 1.26547 13.587 1.36976 14.0878 1.48292Z',
  d16: 'M2 13C2 16.866 5.48223 20 9.77778 20L9.77778 13H2Z',
  d17: 'M9.77734 22C15.3002 22 19.7773 17.9706 19.7773 13H9.77734V22Z',
  d18: 'M21.9996 13C21.9996 6.92487 16.5275 2 9.77734 2V13H21.9996Z',
  d19: 'M9.01236 12.2526H3.49289C3.86702 9.60412 6.193 7.59121 9.01191 7.28344L9.01236 12.2526Z',
  d20: 'M10.5169 12.2526V1.25C17.016 1.5875 22.3364 6.26695 22.75 12.2526H10.5169Z',
  d21: 'M10.5169 13.7556H20.5158C20.11 18.6309 15.7876 22.4183 10.5169 22.75V13.7556Z',
  d22: 'M1.25 13.7556H9.01236L9.01191 20.7397C4.96823 20.4169 1.64403 17.5191 1.25 13.7556Z',
};

export const IconChartRoseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-stroke-rounded IconChartRoseStrokeRounded"
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

export const IconChartRoseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-duotone-rounded IconChartRoseDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRoseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-twotone-rounded IconChartRoseTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRoseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-solid-rounded IconChartRoseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRoseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-bulk-rounded IconChartRoseBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRoseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-stroke-sharp IconChartRoseStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChartRoseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chart-rose-solid-sharp IconChartRoseSolidSharp"
    >
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChartRose: TheIconSelfPack = {
  name: 'ChartRose',
  StrokeRounded: IconChartRoseStrokeRounded,
  DuotoneRounded: IconChartRoseDuotoneRounded,
  TwotoneRounded: IconChartRoseTwotoneRounded,
  SolidRounded: IconChartRoseSolidRounded,
  BulkRounded: IconChartRoseBulkRounded,
  StrokeSharp: IconChartRoseStrokeSharp,
  SolidSharp: IconChartRoseSolidSharp,
};