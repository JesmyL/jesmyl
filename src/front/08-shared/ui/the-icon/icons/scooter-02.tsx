import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 16C2 12.8182 4.23858 11 7 11C9.76142 11 12 12.8182 12 16H2Z',
  d2: 'M5 8H9',
  d3: 'M10 16C10 17.6569 8.65685 19 7 19C5.34315 19 4 17.6569 4 16',
  d4: 'M16 8C17.3333 8.63768 20 11.1739 20 15M15.9899 5H16.5366C17.5214 5 18.4246 5.57927 18.8809 6.5034C19.1964 7.14264 18.8809 8 17.9849 8H15.9899M15.9899 5V8M15.9899 5H12.9444M15.9899 8C15.9899 9.91304 15.7776 16 12 16H17.6665',
  d5: 'M16.8036 5H16V7.86957H18.4584C19.1599 7.86957 19.6108 7.12502 19.2859 6.5034C18.8028 5.57927 17.8464 5 16.8036 5Z',
  d6: 'M16 5H16.8036C17.8464 5 18.8028 5.57927 19.2859 6.5034C19.6108 7.12502 19.1599 7.86957 18.4584 7.86957H16M16 5V7.86957M16 5H13M16 7.86957C17.3333 8.50725 20 10.7391 20 14.5652M16 7.86957C16 9.78261 16 16 12 16H18',
  d7: 'M16 8C17.3333 8.63768 20 11.1739 20 15',
  d8: 'M15.9899 5H16.5366C17.5214 5 18.4246 5.57927 18.8809 6.5034C19.1964 7.14264 18.8809 8 17.9849 8H15.9899M15.9899 5V8M15.9899 5H12.9444M15.9899 8C15.9899 9.91304 15.7776 16 12 16H17.6665',
  d9: 'M19.875 15.625C19.1846 15.625 18.625 16.1846 18.625 16.875C18.625 17.5654 19.1846 18.125 19.875 18.125C20.5654 18.125 21.125 17.5654 21.125 16.875C21.125 16.1846 20.5654 15.625 19.875 15.625ZM17.125 16.875C17.125 15.3562 18.3562 14.125 19.875 14.125C21.3938 14.125 22.625 15.3562 22.625 16.875C22.625 18.3938 21.3938 19.625 19.875 19.625C18.3562 19.625 17.125 18.3938 17.125 16.875Z',
  d10: 'M2.82523 11.6359C3.88821 10.6346 5.33096 10.125 6.875 10.125C8.41904 10.125 9.86179 10.6346 10.9248 11.6359C11.9948 12.6437 12.625 14.0985 12.625 15.875C12.625 16.2892 12.2892 16.625 11.875 16.625H1.875C1.46079 16.625 1.125 16.2892 1.125 15.875C1.125 14.0985 1.75521 12.6437 2.82523 11.6359Z',
  d11: 'M3.61328 8C3.61328 7.44772 4.061 7 4.61328 7H9.11328C9.66557 7 10.1133 7.44772 10.1133 8C10.1133 8.55228 9.66557 9 9.11328 9H4.61328C4.061 9 3.61328 8.55228 3.61328 8Z',
  d12: 'M4.875 15.875C4.875 16.9796 5.77043 17.875 6.875 17.875C7.97957 17.875 8.875 16.9796 8.875 15.875H10.875C10.875 18.0841 9.08414 19.875 6.875 19.875C4.66586 19.875 2.875 18.0841 2.875 15.875H4.875Z',
  d13: 'M19.875 15.875C19.3227 15.875 18.875 16.3227 18.875 16.875C18.875 17.4273 19.3227 17.875 19.875 17.875C20.4273 17.875 20.875 17.4273 20.875 16.875C20.875 16.3227 20.4273 15.875 19.875 15.875ZM16.875 16.875C16.875 15.2181 18.2181 13.875 19.875 13.875C21.5319 13.875 22.875 15.2181 22.875 16.875C22.875 18.5319 21.5319 19.875 19.875 19.875C18.2181 19.875 16.875 18.5319 16.875 16.875Z',
  d14: 'M13.025 4.125C12.5003 4.125 12.075 4.5555 12.075 5.08654C12.075 5.61758 12.5003 6.04808 13.025 6.04808H14.325C14.6078 6.04808 14.7493 6.04808 14.8371 6.13594C14.925 6.22381 14.925 6.36523 14.925 6.64808V7.84574C14.925 8.77788 14.9202 10.606 14.4849 12.1862C14.2679 12.974 13.965 13.6171 13.572 14.0504C13.2062 14.4537 12.7426 14.7019 12.075 14.7019C11.5503 14.7019 11.125 15.1324 11.125 15.6635C11.125 16.1945 11.5503 16.625 12.075 16.625H15.066C15.3247 16.625 15.4541 16.625 15.5372 16.5564C15.6203 16.4878 15.6477 16.3463 15.7024 16.0634C16.0812 14.1044 17.8053 12.625 19.875 12.625C20.0616 12.625 20.1549 12.625 20.2106 12.6017C20.3124 12.559 20.3771 12.4746 20.3919 12.3652C20.4 12.3054 20.3799 12.2306 20.3397 12.0811C20.0106 10.857 19.4309 9.84492 18.7819 9.04366C18.6863 8.92561 18.6385 8.86658 18.6512 8.81774C18.6639 8.76889 18.7399 8.73831 18.8921 8.67716C19.8571 8.28937 20.3645 7.10517 19.8385 6.08668C19.2157 4.88085 17.9827 4.125 16.6384 4.125H13.025Z',
  d15: 'M16 8C16 8 16 8 16 8ZM16 8C17.3333 8.63768 20 11.1739 20 15M16 8L19 8C19 7.06812 19 6.60218 18.8478 6.23463C18.6448 5.74458 18.2554 5.35523 17.7654 5.15224C17.3978 5 16.9285 5 15.9899 5M16 8L15.9899 8M15.9899 8C15.9899 9.91304 15.7776 16 12 16H18.5M15.9899 8V5M15.9899 5H12.9444',
  d16: 'M2.77881 11.5789C3.89452 10.528 5.40152 10 7 10C8.59848 10 10.1055 10.528 11.2212 11.5789C12.3463 12.6386 13 14.1617 13 16V17H1V16C1 14.1617 1.65374 12.6386 2.77881 11.5789Z',
  d17: 'M9 9H5V7H9V9Z',
  d18: 'M5 16C5 17.1046 5.89543 18 7 18C8.10457 18 9 17.1046 9 16H11C11 18.2091 9.20914 20 7 20C4.79086 20 3 18.2091 3 16H5Z',
  d19: 'M20 16C19.4477 16 19 16.4477 19 17C19 17.5523 19.4477 18 20 18C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16ZM17 17C17 15.3431 18.3431 14 20 14C21.6569 14 23 15.3431 23 17C23 18.6569 21.6569 20 20 20C18.3431 20 17 18.6569 17 17Z',
  d20: 'M18.7545 9H19C19.2652 9 19.5196 8.89465 19.7071 8.70711C19.8946 8.51957 20 8.26522 20 8V7.96801C20 7.52941 20 7.15085 19.9787 6.83762C19.9561 6.50779 19.9066 6.17788 19.7716 5.85195C19.4672 5.11687 18.8831 4.53285 18.1481 4.22836C17.8215 4.0931 17.4903 4.04376 17.1595 4.02132C16.8447 3.99998 16.4639 3.99999 16.0219 4H12.9444V6H14.9899V8C14.9899 8.94083 14.9346 10.8179 14.4533 12.4315C14.2128 13.2378 13.8886 13.8981 13.4804 14.3429C13.0988 14.7587 12.6363 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17L15.5 17C15.5 14.5147 17.5147 12.5 20 12.5C20.225 12.5 20.4461 12.5165 20.6622 12.5484C20.3555 11.4617 19.8684 10.5164 19.3196 9.73139C19.1382 9.47198 18.9486 9.22786 18.7545 9Z',
};

export const IconScooter02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-stroke-rounded IconScooter02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
      <circle 
        cx="20" 
        cy="17" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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

export const IconScooter02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-duotone-rounded IconScooter02DuotoneRounded"
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
      />
      <circle 
        cx="20" 
        cy="17" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
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

export const IconScooter02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-twotone-rounded IconScooter02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.5" 
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
      />
      <circle 
        cx="20" 
        cy="17" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconScooter02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-solid-rounded IconScooter02SolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconScooter02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-bulk-rounded IconScooter02BulkRounded"
    >
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconScooter02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-stroke-sharp IconScooter02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="20" 
        cy="17" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconScooter02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scooter-02-solid-sharp IconScooter02SolidSharp"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfScooter02: TheIconSelfPack = {
  name: 'Scooter02',
  StrokeRounded: IconScooter02StrokeRounded,
  DuotoneRounded: IconScooter02DuotoneRounded,
  TwotoneRounded: IconScooter02TwotoneRounded,
  SolidRounded: IconScooter02SolidRounded,
  BulkRounded: IconScooter02BulkRounded,
  StrokeSharp: IconScooter02StrokeSharp,
  SolidSharp: IconScooter02SolidSharp,
};