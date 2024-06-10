import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5',
  d2: 'M9 11.7349H15',
  d3: 'M10.5 15.6543H13.5',
  d4: 'M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5',
  d5: 'M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5H19.5Z',
  d6: 'M16.0575 5.5L15.3748 4.09173C14.9213 3.15626 14.6946 2.68852 14.3035 2.39681C14.2167 2.3321 14.1249 2.27454 14.0288 2.2247C13.5957 2 13.0759 2 12.0363 2C10.9706 2 10.4377 2 9.99745 2.23412C9.89986 2.28601 9.80675 2.3459 9.71906 2.41317C9.3234 2.7167 9.10239 3.20155 8.66037 4.17126L8.05469 5.5',
  d7: 'M21 5.5H3',
  d8: 'M9 11.7344H15',
  d9: 'M10.5 15.6562H13.5',
  d10: 'M13.3473 1.28277C13.9124 1.33331 14.4435 1.50576 14.8996 1.84591C15.2369 2.09748 15.4712 2.40542 15.6714 2.73893C15.8569 3.04798 16.0437 3.4333 16.2555 3.8704L16.6823 4.7507H21C21.5523 4.7507 22 5.19842 22 5.7507C22 6.30299 21.5523 6.7507 21 6.7507C14.9998 6.7507 9.00019 6.7507 3 6.7507C2.44772 6.7507 2 6.30299 2 5.7507C2 5.19842 2.44772 4.7507 3 4.7507H7.40976L7.76556 3.97016C7.97212 3.51696 8.15403 3.11782 8.33676 2.79754C8.53387 2.45207 8.76721 2.13237 9.10861 1.87046C9.57032 1.51626 10.1121 1.33669 10.6899 1.28409C11.1249 1.24449 11.5634 1.24994 12 1.25064C12.5108 1.25146 12.97 1.24902 13.3473 1.28277ZM9.60776 4.7507H14.4597C14.233 4.28331 14.088 3.98707 13.9566 3.7682C13.7643 3.44787 13.5339 3.30745 13.1691 3.27482C12.9098 3.25163 12.5719 3.2507 12.0345 3.2507C11.4837 3.2507 11.137 3.25166 10.8712 3.27585C10.4971 3.30991 10.2639 3.45568 10.0739 3.78866C9.94941 4.00687 9.81387 4.29897 9.60776 4.7507Z',
  d11: 'M19.5825 15.6564C19.5058 16.9096 19.4449 17.9041 19.3202 18.6984C19.1922 19.5131 18.9874 20.1915 18.5777 20.7849C18.2029 21.3278 17.7204 21.786 17.1608 22.1303C16.5491 22.5067 15.8661 22.6713 15.0531 22.75L8.92739 22.7499C8.1135 22.671 7.42972 22.5061 6.8176 22.129C6.25763 21.7841 5.77494 21.3251 5.40028 20.7813C4.99073 20.1869 4.78656 19.5075 4.65957 18.6917C4.53574 17.8962 4.47623 16.9003 4.40122 15.6453L3.75 4.75H20.25L19.5825 15.6564ZM8.25 12.3164C8.25 11.9022 8.58579 11.5664 9 11.5664H15C15.4142 11.5664 15.75 11.9022 15.75 12.3164C15.75 12.7306 15.4142 13.0664 15 13.0664H9C8.58579 13.0664 8.25 12.7306 8.25 12.3164ZM10.5 15.4844C10.0858 15.4844 9.75 15.8202 9.75 16.2344C9.75 16.6486 10.0858 16.9844 10.5 16.9844H13.5C13.9142 16.9844 14.25 16.6486 14.25 16.2344C14.25 15.8202 13.9142 15.4844 13.5 15.4844H10.5Z',
  d12: 'M19.5825 15.6564C19.5058 16.9096 19.4449 17.9041 19.3202 18.6984C19.1922 19.5131 18.9874 20.1915 18.5777 20.7849C18.2029 21.3278 17.7204 21.786 17.1608 22.1303C16.5491 22.5067 15.8661 22.6713 15.0531 22.75L8.92739 22.7499C8.1135 22.671 7.42972 22.5061 6.8176 22.129C6.25763 21.7841 5.77494 21.3251 5.40028 20.7813C4.99073 20.1869 4.78656 19.5075 4.65957 18.6917C4.53574 17.8962 4.47623 16.9003 4.40122 15.6453L3.75 4.75H20.25L19.5825 15.6564Z',
  d13: 'M8.25 12.3164C8.25 11.9022 8.58579 11.5664 9 11.5664H15C15.4142 11.5664 15.75 11.9022 15.75 12.3164C15.75 12.7306 15.4142 13.0664 15 13.0664H9C8.58579 13.0664 8.25 12.7306 8.25 12.3164Z',
  d14: 'M9.75 16.2344C9.75 15.8202 10.0858 15.4844 10.5 15.4844H13.5C13.9142 15.4844 14.25 15.8202 14.25 16.2344C14.25 16.6486 13.9142 16.9844 13.5 16.9844H10.5C10.0858 16.9844 9.75 16.6486 9.75 16.2344Z',
  d15: 'M9 11.5H15',
  d16: 'M10.5 15.5H13.5',
  d17: 'M19.5 5.5L18.5 22H5.5L4.5 5.5',
  d18: 'M2 5.5H8M22 5.5H16M16 5.5L14.5 2H9.5L8 5.5M16 5.5H8',
  d19: 'M8.58085 1.85608C8.73843 1.4884 9.09997 1.25 9.5 1.25H14.5C14.9 1.25 15.2616 1.4884 15.4191 1.85608L16.6594 4.75H22V6.75H2V4.75H7.3406L8.58085 1.85608ZM9.51654 4.75H14.4835L13.8406 3.25H10.1594L9.51654 4.75Z',
  d20: 'M19.2492 22.0454L20.2492 5.54541H3.75195L4.75195 22.0454C4.77595 22.4413 5.10399 22.75 5.50058 22.75H18.5006C18.8972 22.75 19.2252 22.4413 19.2492 22.0454ZM8.50098 13H15.501V11H8.50098V13ZM10.001 17H13.501V15H10.001V17Z',
};

export const IconDelete03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-stroke-rounded IconDelete03StrokeRounded"
    >
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-duotone-rounded IconDelete03DuotoneRounded"
    >
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
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-twotone-rounded IconDelete03TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-solid-rounded IconDelete03SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-bulk-rounded IconDelete03BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-stroke-sharp IconDelete03StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDelete03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delete-03-solid-sharp IconDelete03SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDelete03: TheIconSelfPack = {
  name: 'Delete03',
  StrokeRounded: IconDelete03StrokeRounded,
  DuotoneRounded: IconDelete03DuotoneRounded,
  TwotoneRounded: IconDelete03TwotoneRounded,
  SolidRounded: IconDelete03SolidRounded,
  BulkRounded: IconDelete03BulkRounded,
  StrokeSharp: IconDelete03StrokeSharp,
  SolidSharp: IconDelete03SolidSharp,
};