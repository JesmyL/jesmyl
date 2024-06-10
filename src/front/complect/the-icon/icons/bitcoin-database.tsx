import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 15C7.58172 15 4 13.6569 4 12',
  d2: 'M15.9375 20.6667L15.9375 15.3333M17.5 15.3333V14M17.5 22V20.6667M15.9375 18H19.0625M19.0625 18C19.5803 18 20 18.4477 20 19V19.6667C20 20.219 19.5803 20.6667 19.0625 20.6667H15M19.0625 18C19.5803 18 20 17.5523 20 17V16.3333C20 15.781 19.5803 15.3333 19.0625 15.3333H15',
  d3: 'M20 12V5M12 22C7.58172 22 4 20.6569 4 19V5',
  d4: 'M12 8C16.4183 8 20 6.65685 20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5C4 6.65685 7.58172 8 12 8Z',
  d5: 'M17.5 13.25C17.9142 13.25 18.25 13.5858 18.25 14V14.5833H19.0625C20.0393 14.5833 20.75 15.4132 20.75 16.3333V17C20.75 17.3624 20.6398 17.7108 20.4465 18C20.6398 18.2892 20.75 18.6376 20.75 19V19.6667C20.75 20.5868 20.0393 21.4167 19.0625 21.4167H18.25V22C18.25 22.4142 17.9142 22.75 17.5 22.75C17.0858 22.75 16.75 22.4142 16.75 22V21.4167H15C14.5858 21.4167 14.25 21.0809 14.25 20.6667C14.25 20.2525 14.5858 19.9167 15 19.9167H15.1875L15.1875 16.0833H15C14.5858 16.0833 14.25 15.7475 14.25 15.3333C14.25 14.9191 14.5858 14.5833 15 14.5833H16.75V14C16.75 13.5858 17.0858 13.25 17.5 13.25ZM16.6875 16.0833V17.25H19.0625C19.1212 17.25 19.25 17.1844 19.25 17V16.3333C19.25 16.1489 19.1212 16.0833 19.0625 16.0833H16.6875ZM19.0625 18.75H16.6875L16.6875 19.9167H19.0625C19.1212 19.9167 19.25 19.8511 19.25 19.6667V19C19.25 18.8156 19.1212 18.75 19.0625 18.75Z',
  d6: 'M6.15891 2.13345C7.70115 1.57577 9.76651 1.25 12 1.25C14.2335 1.25 16.2988 1.57577 17.8411 2.13345C18.6086 2.411 19.2973 2.7641 19.8115 3.20376C20.3247 3.64244 20.75 4.24729 20.75 5V10.75C20.75 11.5027 20.3247 12.1076 19.8115 12.5462C19.6924 12.6481 19.5639 12.7453 19.4271 12.8381C19.0331 12.186 18.3175 11.75 17.5 11.75C16.5838 11.75 15.7955 12.2976 15.4446 13.0833H15C14.0588 13.0833 13.2526 13.6612 12.9168 14.4815C12.6151 14.4938 12.3091 14.5 12 14.5C9.76651 14.5 7.70115 14.1742 6.15891 13.6165C5.39138 13.339 4.70271 12.9859 4.18846 12.5462C3.67534 12.1076 3.25 11.5027 3.25 10.75V5C3.25 4.24729 3.67534 3.64244 4.18846 3.20376C4.70271 2.7641 5.39138 2.411 6.15891 2.13345ZM5.47842 4.60674C5.20438 4.84102 5.19444 4.97606 5.19444 5C5.19444 5.02394 5.20438 5.15898 5.47842 5.39326C5.75132 5.62657 6.20168 5.87951 6.84165 6.11093C8.11441 6.57117 9.93794 6.875 12 6.875C14.0621 6.875 15.8856 6.57117 17.1583 6.11093C17.7983 5.87951 18.2487 5.62657 18.5216 5.39326C18.7956 5.15898 18.8056 5.02394 18.8056 5C18.8056 4.97606 18.7956 4.84102 18.5216 4.60674C18.2487 4.37343 17.7983 4.12049 17.1583 3.88907C15.8856 3.42883 14.0621 3.125 12 3.125C9.93794 3.125 8.11441 3.42883 6.84165 3.88907C6.20168 4.12049 5.75132 4.37343 5.47842 4.60674Z',
  d7: 'M12.846 15.9855C12.5661 15.9953 12.2839 16.0002 12 16.0002C9.63942 16.0002 7.39353 15.6583 5.64882 15.0274C4.80108 14.7208 3.94495 14.3009 3.25 13.7173V19C3.25 19.7527 3.67534 20.3576 4.18846 20.7962C4.70271 21.2359 5.39138 21.589 6.15891 21.8665C7.70115 22.4242 9.76651 22.75 12 22.75C12.6728 22.75 13.3303 22.7204 13.9629 22.6639C13.2422 22.2889 12.75 21.5353 12.75 20.6667C12.75 19.9138 13.1197 19.2474 13.6875 18.8389V17.1611C13.2908 16.8757 12.9907 16.4643 12.846 15.9855Z',
  d8: 'M18.25 13.25V14.5833H19.0625C20.0393 14.5833 20.75 15.4132 20.75 16.3333V17C20.75 17.3624 20.6398 17.7108 20.4465 18C20.6398 18.2892 20.75 18.6376 20.75 19V19.6667C20.75 20.5868 20.0393 21.4167 19.0625 21.4167H18.25V22.75H16.75V21.4167H14.25V19.9167H15.1875L15.1875 16.0833H14.25V14.5833H16.75V13.25H18.25ZM16.6875 16.0833V17.25H19.0625C19.1212 17.25 19.25 17.1844 19.25 17V16.3333C19.25 16.1489 19.1212 16.0833 19.0625 16.0833H16.6875ZM19.0625 18.75H16.6875L16.6875 19.9167H19.0625C19.1212 19.9167 19.25 19.8511 19.25 19.6667V19C19.25 18.8156 19.1212 18.75 19.0625 18.75Z',
  d9: 'M3.25 5V11C3.25 11.7057 3.63408 12.2883 4.13112 12.7289C4.62904 13.1704 5.30674 13.5337 6.0798 13.8236C7.63146 14.4054 9.72474 14.75 12 14.75C12.2524 14.75 12.5026 14.7458 12.75 14.7374V13.0833H15.25V11.75H19.75V12.8301C19.7907 12.7968 19.8303 12.7631 19.8689 12.7289C20.3659 12.2883 20.75 11.7057 20.75 11V5C20.75 4.24729 20.3247 3.64244 19.8115 3.20376C19.2973 2.7641 18.6086 2.411 17.8411 2.13345C16.2988 1.57577 14.2335 1.25 12 1.25C9.76651 1.25 7.70115 1.57577 6.15891 2.13345C5.39138 2.411 4.70271 2.7641 4.18846 3.20375C3.67534 3.64244 3.25 4.24729 3.25 5ZM18.8056 5C18.8056 5.02394 18.7956 5.15898 18.5216 5.39326C18.2487 5.62657 17.7983 5.87951 17.1583 6.11093C15.8856 6.57117 14.0621 6.875 12 6.875C9.93795 6.875 8.11441 6.57117 6.84165 6.11093C6.20168 5.87951 5.75132 5.62657 5.47842 5.39326C5.20438 5.15898 5.19445 5.02394 5.19445 5C5.19445 4.97606 5.20438 4.84102 5.47842 4.60674C5.75132 4.37343 6.20168 4.12049 6.84165 3.88907C8.11441 3.42883 9.93795 3.125 12 3.125C14.0621 3.125 15.8856 3.42883 17.1583 3.88907C17.7983 4.12049 18.2487 4.37343 18.5216 4.60674C18.7956 4.84102 18.8056 4.97606 18.8056 5Z',
  d10: 'M12.75 16.2379V22.7376C12.5026 22.7459 12.2524 22.7501 12 22.7501C9.72474 22.7501 7.63146 22.4056 6.0798 21.8237C5.30674 21.5338 4.62904 21.1705 4.13112 20.7291C3.63408 20.2884 3.25 19.7059 3.25 19.0001V13.9492C3.91449 14.5057 4.72933 14.9188 5.55312 15.2278C7.31267 15.8876 9.5925 16.2497 12 16.2497C12.2515 16.2497 12.5017 16.2457 12.75 16.2379Z',
};

export const IconBitcoinDatabaseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-stroke-rounded IconBitcoinDatabaseStrokeRounded"
    >
      <ellipse 
        cx="12" 
        cy="5" 
        rx="8" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-duotone-rounded IconBitcoinDatabaseDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <ellipse 
        cx="12" 
        cy="5" 
        rx="8" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-twotone-rounded IconBitcoinDatabaseTwotoneRounded"
    >
      <ellipse 
        cx="12" 
        cy="5" 
        rx="8" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></ellipse>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-solid-rounded IconBitcoinDatabaseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-bulk-rounded IconBitcoinDatabaseBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-stroke-sharp IconBitcoinDatabaseStrokeSharp"
    >
      <ellipse 
        cx="12" 
        cy="5" 
        rx="8" 
        ry="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
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
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinDatabaseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-database-solid-sharp IconBitcoinDatabaseSolidSharp"
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
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinDatabase: TheIconSelfPack = {
  name: 'BitcoinDatabase',
  StrokeRounded: IconBitcoinDatabaseStrokeRounded,
  DuotoneRounded: IconBitcoinDatabaseDuotoneRounded,
  TwotoneRounded: IconBitcoinDatabaseTwotoneRounded,
  SolidRounded: IconBitcoinDatabaseSolidRounded,
  BulkRounded: IconBitcoinDatabaseBulkRounded,
  StrokeSharp: IconBitcoinDatabaseStrokeSharp,
  SolidSharp: IconBitcoinDatabaseSolidSharp,
};