import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4Z',
  d2: 'M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z',
  d3: 'M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z',
  d4: 'M6 20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20C2 18.8954 2.89543 18 4 18C5.10457 18 6 18.8954 6 20Z',
  d5: 'M20 6V18M18 20H6M18 4H6M4 6V18',
  d6: 'M16.5 9C16.5 8.53406 16.5 8.30109 16.4239 8.11732C16.3224 7.87229 16.1277 7.67761 15.8827 7.57612C15.6989 7.5 15.4659 7.5 15 7.5H9C8.53406 7.5 8.30109 7.5 8.11732 7.57612C7.87229 7.67761 7.67761 7.87229 7.57612 8.11732C7.5 8.30109 7.5 8.53406 7.5 9C7.5 9.46594 7.5 9.69891 7.57612 9.88268C7.67761 10.1277 7.87229 10.3224 8.11732 10.4239C8.30109 10.5 8.53406 10.5 9 10.5H15C15.4659 10.5 15.6989 10.5 15.8827 10.4239C16.1277 10.3224 16.3224 10.1277 16.4239 9.88268C16.5 9.69891 16.5 9.46594 16.5 9Z',
  d7: 'M16.5 15C16.5 14.5341 16.5 14.3011 16.4239 14.1173C16.3224 13.8723 16.1277 13.6776 15.8827 13.5761C15.6989 13.5 15.4659 13.5 15 13.5H9C8.53406 13.5 8.30109 13.5 8.11732 13.5761C7.87229 13.6776 7.67761 13.8723 7.57612 14.1173C7.5 14.3011 7.5 14.5341 7.5 15C7.5 15.4659 7.5 15.6989 7.57612 15.8827C7.67761 16.1277 7.87229 16.3224 8.11732 16.4239C8.30109 16.5 8.53406 16.5 9 16.5H15C15.4659 16.5 15.6989 16.5 15.8827 16.4239C16.1277 16.3224 16.3224 16.1277 16.4239 15.8827C16.5 15.6989 16.5 15.4659 16.5 15Z',
  d8: 'M5 4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4C19 4.55228 18.5523 5 18 5H6C5.44772 5 5 4.55228 5 4ZM4 5C4.55228 5 5 5.44772 5 6V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5ZM20 5C20.5523 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V6C19 5.44772 19.4477 5 20 5ZM5 20C5 19.4477 5.44772 19 6 19H18C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20Z',
  d9: 'M14.5218 6.75C14.7361 6.74999 14.9329 6.74998 15.0982 6.76126C15.2759 6.77338 15.4712 6.80099 15.6697 6.88321C16.0985 7.06083 16.4392 7.40151 16.6168 7.83031C16.699 8.02881 16.7266 8.22415 16.7387 8.40179C16.75 8.56712 16.75 8.80749 16.75 9.02176V9.02177C16.75 9.23604 16.75 9.43289 16.7387 9.59821C16.7266 9.77585 16.699 9.97119 16.6168 10.1697C16.4392 10.5985 16.0985 10.9392 15.6697 11.1168C15.4712 11.199 15.2759 11.2266 15.0982 11.2387C14.9329 11.25 14.736 11.25 14.5218 11.25H9.47824C9.26396 11.25 9.06712 11.25 8.90179 11.2387C8.72415 11.2266 8.52881 11.199 8.33031 11.1168C7.90151 10.9392 7.56083 10.5985 7.38321 10.1697C7.30099 9.97119 7.27338 9.77585 7.26126 9.59821C7.24998 9.4329 7.24999 9.21433 7.25 9.00007V9V8.99993C7.24999 8.78568 7.24998 8.5671 7.26126 8.40179C7.27338 8.22415 7.30099 8.02881 7.38321 7.83031C7.56083 7.40151 7.90151 7.06083 8.33031 6.88321C8.52881 6.80099 8.72415 6.77338 8.90179 6.76126C9.06711 6.74998 9.26394 6.74999 9.4782 6.75H9.47825H14.5218H14.5218Z',
  d10: 'M14.5218 12.75C14.736 12.75 14.9329 12.75 15.0982 12.7613C15.2759 12.7734 15.4712 12.801 15.6697 12.8832C16.0985 13.0608 16.4392 13.4015 16.6168 13.8303C16.699 14.0288 16.7266 14.2241 16.7387 14.4018C16.75 14.5671 16.75 14.8075 16.75 15.0218V15.0218C16.75 15.236 16.75 15.4329 16.7387 15.5982C16.7266 15.7759 16.699 15.9712 16.6168 16.1697C16.4392 16.5985 16.0985 16.9392 15.6697 17.1168C15.4712 17.199 15.2759 17.2266 15.0982 17.2387C14.9329 17.25 14.736 17.25 14.5218 17.25H14.5218H9.47824H9.47823C9.26396 17.25 9.06712 17.25 8.90179 17.2387C8.72415 17.2266 8.52881 17.199 8.33031 17.1168C7.90151 16.9392 7.56083 16.5985 7.38321 16.1697C7.30099 15.9712 7.27338 15.7759 7.26126 15.5982C7.24998 15.4329 7.24999 15.2361 7.25 15.0218V15.0218C7.24999 14.8075 7.24998 14.5671 7.26126 14.4018C7.27338 14.2241 7.30099 14.0288 7.38321 13.8303C7.56083 13.4015 7.90151 13.0608 8.33031 12.8832C8.52881 12.801 8.72415 12.7734 8.90179 12.7613C9.06712 12.75 9.26396 12.75 9.47824 12.75H14.5218Z',
  d11: 'M1.25 4C1.25 2.48122 2.48122 1.25 4 1.25C5.51878 1.25 6.75 2.48122 6.75 4C6.75 5.51878 5.51878 6.75 4 6.75C2.48122 6.75 1.25 5.51878 1.25 4Z',
  d12: 'M17.25 4C17.25 2.48122 18.4812 1.25 20 1.25C21.5188 1.25 22.75 2.48122 22.75 4C22.75 5.51878 21.5188 6.75 20 6.75C18.4812 6.75 17.25 5.51878 17.25 4Z',
  d13: 'M17.25 20C17.25 18.4812 18.4812 17.25 20 17.25C21.5188 17.25 22.75 18.4812 22.75 20C22.75 21.5188 21.5188 22.75 20 22.75C18.4812 22.75 17.25 21.5188 17.25 20Z',
  d14: 'M1.25 20C1.25 18.4812 2.48122 17.25 4 17.25C5.51878 17.25 6.75 18.4812 6.75 20C6.75 21.5188 5.51878 22.75 4 22.75C2.48122 22.75 1.25 21.5188 1.25 20Z',
  d15: 'M14.5218 6.75C14.7361 6.74999 14.9329 6.74998 15.0982 6.76126C15.2759 6.77338 15.4712 6.80099 15.6697 6.88321C16.0985 7.06083 16.4392 7.40151 16.6168 7.83031C16.699 8.02881 16.7266 8.22415 16.7387 8.40179C16.75 8.56712 16.75 8.80749 16.75 9.02176V9.02177C16.75 9.23604 16.75 9.43289 16.7387 9.59821C16.7266 9.77585 16.699 9.97119 16.6168 10.1697C16.4392 10.5985 16.0985 10.9392 15.6697 11.1168C15.4712 11.199 15.2759 11.2266 15.0982 11.2387C14.9329 11.25 14.736 11.25 14.5218 11.25H9.47824C9.26396 11.25 9.06712 11.25 8.90179 11.2387C8.72415 11.2266 8.52881 11.199 8.3303 11.1168C7.90151 10.9392 7.56083 10.5985 7.38321 10.1697C7.30099 9.97119 7.27338 9.77585 7.26126 9.59821C7.24998 9.43289 7.24999 9.21429 7.25 9.00002V9V8.99998C7.24999 8.78571 7.24998 8.56711 7.26126 8.40179C7.27338 8.22415 7.30099 8.02881 7.38321 7.83031C7.56083 7.40151 7.90151 7.06083 8.3303 6.88321C8.52881 6.80099 8.72415 6.77338 8.90179 6.76126C9.06711 6.74998 9.26394 6.74999 9.4782 6.75H9.47824H14.5218H14.5218Z',
  d16: 'M14.5218 12.75C14.7361 12.75 14.9329 12.75 15.0982 12.7613C15.2759 12.7734 15.4712 12.801 15.6697 12.8832C16.0985 13.0608 16.4392 13.4015 16.6168 13.8303C16.699 14.0288 16.7266 14.2241 16.7387 14.4018C16.75 14.5671 16.75 14.8075 16.75 15.0218V15.0218C16.75 15.236 16.75 15.4329 16.7387 15.5982C16.7266 15.7759 16.699 15.9712 16.6168 16.1697C16.4392 16.5985 16.0985 16.9392 15.6697 17.1168C15.4712 17.199 15.2759 17.2266 15.0982 17.2387C14.9329 17.25 14.736 17.25 14.5218 17.25H14.5218H9.47824H9.47823C9.26396 17.25 9.06712 17.25 8.90179 17.2387C8.72415 17.2266 8.52881 17.199 8.33031 17.1168C7.90151 16.9392 7.56083 16.5985 7.38321 16.1697C7.30099 15.9712 7.27338 15.7759 7.26126 15.5982C7.24998 15.4329 7.24999 15.2361 7.25 15.0218V15.0218C7.24999 14.8075 7.24998 14.5671 7.26126 14.4018C7.27338 14.2241 7.30099 14.0288 7.38321 13.8303C7.56083 13.4015 7.90151 13.0608 8.33031 12.8832C8.52881 12.801 8.72415 12.7734 8.90179 12.7613C9.06711 12.75 9.26395 12.75 9.47822 12.75H9.47824H14.5218H14.5218Z',
  d17: 'M3 6.56253V17.4375C3.30993 17.3164 3.64721 17.25 4 17.25C4.35279 17.25 4.69007 17.3164 5 17.4375V6.56253C4.69007 6.68357 4.35279 6.75 4 6.75C3.64721 6.75 3.30993 6.68357 3 6.56253Z',
  d18: 'M6.56253 5H17.4375C17.3164 4.69007 17.25 4.35279 17.25 4C17.25 3.64721 17.3164 3.30993 17.4375 3H6.56253C6.68357 3.30993 6.75 3.64721 6.75 4C6.75 4.35279 6.68357 4.69007 6.56253 5Z',
  d19: 'M19 6.56253C19.3099 6.68357 19.6472 6.75 20 6.75C20.3528 6.75 20.6901 6.68357 21 6.56253V17.4375C20.6901 17.3164 20.3528 17.25 20 17.25C19.6472 17.25 19.3099 17.3164 19 17.4375V6.56253Z',
  d20: 'M17.4375 19H6.56253C6.68357 19.3099 6.75 19.6472 6.75 20C6.75 20.3528 6.68357 20.6901 6.56253 21H17.4375C17.3164 20.6901 17.25 20.3528 17.25 20C17.25 19.6472 17.3164 19.3099 17.4375 19Z',
  d21: 'M16.5 7.5H7.5V10.5H16.5V7.5Z',
  d22: 'M16.5 13.5H7.5V16.5H16.5V13.5Z',
  d23: 'M6 3H18V5H6V3ZM3 18V6H5V18H3ZM19 18V6H21V18H19ZM6 19H18V21H6V19Z',
  d24: 'M7.5 7.5H16.5V11.25H7.5V7.5Z',
  d25: 'M7.5 12.75H16.5V16.5H7.5V12.75Z',
};

export const IconGroupItemsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-stroke-rounded IconGroupItemsStrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGroupItemsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-duotone-rounded IconGroupItemsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      </g>
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGroupItemsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-twotone-rounded IconGroupItemsTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGroupItemsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-solid-rounded IconGroupItemsSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconGroupItemsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-bulk-rounded IconGroupItemsBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconGroupItemsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-stroke-sharp IconGroupItemsStrokeSharp"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGroupItemsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="group-items-solid-sharp IconGroupItemsSolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGroupItems: TheIconSelfPack = {
  name: 'GroupItems',
  StrokeRounded: IconGroupItemsStrokeRounded,
  DuotoneRounded: IconGroupItemsDuotoneRounded,
  TwotoneRounded: IconGroupItemsTwotoneRounded,
  SolidRounded: IconGroupItemsSolidRounded,
  BulkRounded: IconGroupItemsBulkRounded,
  StrokeSharp: IconGroupItemsStrokeSharp,
  SolidSharp: IconGroupItemsSolidSharp,
};