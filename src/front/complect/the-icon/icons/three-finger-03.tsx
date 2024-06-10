import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.5004 6C11.5004 5.17157 10.8289 4.5 10.0004 4.5C9.172 4.5 8.50042 5.17157 8.50042 6V13.9627L6.8797 12.3369C6.16877 11.6237 4.99772 11.6888 4.36965 12.4763C3.88907 13.0789 3.8758 13.9314 4.33738 14.5487L7.34137 18.5667C8.02311 19.4785 8.36398 19.9344 8.77419 20.2888C9.40001 20.8294 10.1499 21.2056 10.9566 21.3834C11.4853 21.5 12.0534 21.5 13.1896 21.5C15.3562 21.5 16.4395 21.5 17.3019 21.1679C18.6207 20.6601 19.6627 19.6148 20.1689 18.2918C20.5 17.4267 20.5 16.34 20.5 14.1667V11.5C20.5 10.3954 19.605 9.5 18.5004 9.5H17.5004M11.5004 6V4C11.5004 3.17157 12.172 2.5 13.0004 2.5C13.8289 2.5 14.5004 3.17157 14.5004 4V6M11.5004 6V10.5M14.5004 6V10.5M14.5004 6C14.5004 5.17157 15.172 4.5 16.0004 4.5C16.8289 4.5 17.5004 5.17157 17.5004 6V9.5M17.5004 9.5V11.5',
  d2: 'M7.34137 18.5667L4.33738 14.5487C3.8758 13.9314 3.88907 13.0789 4.36965 12.4763C4.99772 11.6888 6.16877 11.6237 6.8797 12.3369L8.50042 13.9627V6C8.50042 5.17157 9.172 4.5 10.0004 4.5C10.8289 4.5 11.5004 5.17157 11.5004 6V4C11.5004 3.17157 12.172 2.5 13.0004 2.5C13.8289 2.5 14.5004 3.17157 14.5004 4V6C14.5004 5.17157 15.172 4.5 16.0004 4.5C16.8289 4.5 17.5004 5.17157 17.5004 6V9.5H18.5004C19.605 9.5 20.5 10.3954 20.5 11.5V14.1667C20.5 16.34 20.5 17.4267 20.1689 18.2918C19.6627 19.6148 18.6207 20.6601 17.3019 21.1679C16.4395 21.5 15.3562 21.5 13.1896 21.5C12.0534 21.5 11.4853 21.5 10.9566 21.3834C10.1499 21.2056 9.40001 20.8294 8.77419 20.2888C8.36398 19.9344 8.02311 19.4785 7.34137 18.5667Z',
  d3: 'M11.5004 6C11.5004 5.17157 10.8289 4.5 10.0004 4.5C9.172 4.5 8.50042 5.17157 8.50042 6V13.9627L6.8797 12.3369C6.16877 11.6237 4.99772 11.6888 4.36965 12.4763C3.88907 13.0789 3.8758 13.9314 4.33738 14.5487L7.34137 18.5667C8.02311 19.4785 8.36398 19.9344 8.77419 20.2888C9.40001 20.8294 10.1499 21.2056 10.9566 21.3834C11.4853 21.5 12.0534 21.5 13.1896 21.5C15.1115 21.5 16.181 21.5 17 21.2682M11.5004 6V4C11.5004 3.17157 12.172 2.5 13.0004 2.5C13.8289 2.5 14.5004 3.17157 14.5004 4V6V10.5M11.5004 6V10.5',
  d4: 'M11.143 10.7364C11.3797 10.7364 11.5716 10.5478 11.5716 10.3152V3.03592C11.5716 2.32573 12.1473 1.75 12.8575 1.75C13.5678 1.75 14.1435 2.32577 14.1435 3.036L14.143 10.3152C14.143 10.5478 14.3349 10.7364 14.5716 10.7364C14.8083 10.7364 15.0002 10.5478 15.0002 10.3152V5.16444C15.0002 4.45412 15.5762 3.87839 16.2865 3.87872C16.9963 3.87905 17.5716 4.45459 17.5716 5.16444V11.4385C17.5716 11.6711 17.7635 11.8597 18.0002 11.8597C18.2369 11.8597 18.4288 11.6711 18.4288 11.4385V9.39559C18.4288 9.08678 18.4288 8.93237 18.5504 8.84243C18.672 8.75249 18.8003 8.79179 19.0568 8.8704C20.1819 9.21518 20.9996 10.2623 20.9996 11.5002V14.1926C20.9996 15.2572 20.9996 16.0923 20.9567 16.7675C20.9131 17.4544 20.8229 18.0271 20.619 18.56C20.037 20.0809 18.8387 21.2836 17.321 21.868C16.789 22.0728 16.2173 22.1633 15.5322 22.2071C14.8588 22.2502 14.0265 22.2502 12.9653 22.2502C11.9181 22.2503 11.154 22.2503 10.5447 22.116C9.61631 21.9113 8.75342 21.4784 8.03349 20.8565C7.561 20.4483 7.17449 19.9313 6.5461 19.0906L3.48629 14.998C3.3897 14.8688 3.30752 14.7325 3.23972 14.5912C3.2356 14.5826 3.24535 14.5741 3.25323 14.5795C3.26201 14.5854 3.27287 14.5742 3.26678 14.5655C3.21553 14.4926 3.17167 14.4163 3.13519 14.3376C3.05668 14.1118 3.0123 13.8771 3.00195 13.6414C3.01864 13.3412 3.12778 13.0454 3.32865 12.7978C3.88695 12.1097 4.92702 12.0531 5.55868 12.6759L7.41094 14.5022C7.53341 14.6229 7.71785 14.6592 7.87816 14.5941C8.03847 14.529 8.14303 14.3753 8.14303 14.2048V5.03587C8.14303 4.32579 8.71867 3.75015 9.42875 3.75015C10.1388 3.75015 10.7145 4.32579 10.7145 5.03587V10.3152C10.7145 10.5478 10.9063 10.7364 11.143 10.7364Z',
  d5: 'M11.2273 5.57895C11.2273 4.70692 10.5353 4 9.68182 4C8.82829 4 8.13636 4.70692 8.13636 5.57895V14.0655L6.46696 12.3546C5.73449 11.6039 4.52795 11.6724 3.88085 12.5014C3.38571 13.1357 3.37204 14.033 3.8476 14.6829L8.13636 22H17.5C19.1569 22 20.5 20.6569 20.5 19V7.54545C20.5 6.69192 19.8081 6 18.9545 6C18.101 6 17.4091 6.69192 17.4091 7.54545M11.2273 5.57895V3.54545C11.2273 2.69192 11.9192 2 12.7727 2C13.6263 2 14.3182 2.69192 14.3182 3.54545V5.54545M11.2273 5.57895V12.4211M14.3182 5.54545C14.3182 4.69192 15.0101 4 15.8636 4C16.7172 4 17.4091 4.69192 17.4091 5.54545V7.54545M14.3182 5.54545V12.4211M17.4091 7.54545V12.5014',
  d6: 'M12.877 1.25C12.1277 1.25 11.5202 1.84623 11.5202 2.58172V12.4691H10.7257V4.84701C10.7257 4.08299 10.1103 3.47798 9.36893 3.47798C8.62758 3.47798 8.01213 4.08299 8.01213 4.84701V15.2589L5.43585 12.6673C4.77342 12.001 3.6853 12.0602 3.09815 12.7985C2.64562 13.3675 2.63291 14.1751 3.06785 14.7585L3.07978 14.7745L7.8425 22.75H18.2423C19.9034 22.75 21.25 21.4283 21.25 19.7979V7.03768C21.25 6.30219 20.6425 5.70596 19.8932 5.70596C19.1439 5.70596 18.5364 6.30219 18.5364 7.03768V12.5586H17.7419V4.8097C17.7419 4.07421 17.1345 3.47798 16.3851 3.47798C15.6358 3.47798 15.0283 4.07421 15.0283 4.8097V12.4691H14.2338V2.58172C14.2338 1.84623 13.6264 1.25 12.877 1.25Z',
};

export const IconThreeFinger03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-stroke-rounded IconThreeFinger03StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-duotone-rounded IconThreeFinger03DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-twotone-rounded IconThreeFinger03TwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-solid-rounded IconThreeFinger03SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-bulk-rounded IconThreeFinger03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-stroke-sharp IconThreeFinger03StrokeSharp"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconThreeFinger03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="three-finger-03-solid-sharp IconThreeFinger03SolidSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfThreeFinger03: TheIconSelfPack = {
  name: 'ThreeFinger03',
  StrokeRounded: IconThreeFinger03StrokeRounded,
  DuotoneRounded: IconThreeFinger03DuotoneRounded,
  TwotoneRounded: IconThreeFinger03TwotoneRounded,
  SolidRounded: IconThreeFinger03SolidRounded,
  BulkRounded: IconThreeFinger03BulkRounded,
  StrokeSharp: IconThreeFinger03StrokeSharp,
  SolidSharp: IconThreeFinger03SolidSharp,
};