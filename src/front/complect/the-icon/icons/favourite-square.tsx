import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.76872 7.99708C9.10954 7.17461 10.2798 7.50606 10.9828 8.03401C11.2711 8.25048 11.4152 8.35871 11.5 8.35871C11.5848 8.35871 11.7289 8.25048 12.0172 8.03401C12.7202 7.50606 13.8905 7.17461 15.2313 7.99708C16.991 9.07647 17.3891 12.6374 13.3302 15.6417C12.5571 16.2139 12.1706 16.5 11.5 16.5C10.8294 16.5 10.4429 16.2139 9.66976 15.6417C5.61086 12.6374 6.00903 9.07647 7.76872 7.99708Z',
  d2: 'M2 12C2 7.52166 2 5.28249 3.39124 3.89124C4.78249 2.5 7.02166 2.5 11.5 2.5C15.9783 2.5 18.2175 2.5 19.6088 3.89124C21 5.28249 21 7.52166 21 12C21 16.4783 21 18.7175 19.6088 20.1088C18.2175 21.5 15.9783 21.5 11.5 21.5C7.02166 21.5 4.78249 21.5 3.39124 20.1088C2 18.7175 2 16.4783 2 12Z',
  d3: 'M3.39124 3.89124C2 5.28249 2 7.52166 2 12C2 16.4783 2 18.7175 3.39124 20.1088C4.78249 21.5 7.02166 21.5 11.5 21.5C15.9783 21.5 18.2175 21.5 19.6088 20.1088C21 18.7175 21 16.4783 21 12C21 7.52166 21 5.28249 19.6088 3.89124C18.2175 2.5 15.9783 2.5 11.5 2.5C7.02166 2.5 4.78249 2.5 3.39124 3.89124ZM10.9828 8.03401C10.2798 7.50606 9.10954 7.17461 7.76872 7.99708C6.00903 9.07647 5.61086 12.6374 9.66976 15.6417C10.4429 16.2139 10.8294 16.5 11.5 16.5C12.1706 16.5 12.5571 16.2139 13.3302 15.6417C17.3891 12.6374 16.991 9.07647 15.2313 7.99708C13.8905 7.17461 12.7202 7.50606 12.0172 8.03401C11.7289 8.25048 11.5848 8.35871 11.5 8.35871C11.4152 8.35871 11.2711 8.25048 10.9828 8.03401Z',
  d4: 'M17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75H11.9428C9.75212 1.74999 8.03144 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50272 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50272 18.6886 2.11568 17.312 1.93059ZM16.123 7.35808C14.4829 6.35201 12.9789 6.74932 12.0664 7.43461L11.9996 7.48474L11.9328 7.43461C11.0203 6.74932 9.51633 6.35201 7.87618 7.35808C6.69478 8.08275 6.07441 9.56375 6.29354 11.1976C6.51463 12.846 7.57303 14.6534 9.72318 16.2448C10.4216 16.7628 11.0789 17.2503 11.9996 17.2503C12.9203 17.2503 13.5776 16.7628 14.276 16.2448C16.4262 14.6534 17.4846 12.846 17.7057 11.1976C17.9248 9.56375 17.3044 8.08275 16.123 7.35808Z',
  d5: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d6: 'M12.0664 7.43461C12.9789 6.74932 14.4829 6.35201 16.123 7.35808C17.3044 8.08275 17.9248 9.56375 17.7057 11.1976C17.4846 12.846 16.4262 14.6534 14.276 16.2448C13.5776 16.7628 12.9203 17.2503 11.9996 17.2503C11.0789 17.2503 10.4216 16.7628 9.72318 16.2448C7.57303 14.6534 6.51463 12.846 6.29354 11.1976C6.07441 9.56375 6.69478 8.08275 7.87618 7.35808C9.51633 6.35201 11.0203 6.74932 11.9328 7.4346L11.9996 7.48474L12.0664 7.43461Z',
  d7: 'M15.4289 7.87235C13.4331 6.80191 12 8.37985 12 8.37985C12 8.37985 10.5669 6.80191 8.57105 7.87234C6.1537 9.16884 5.98011 14.246 12 16.5C18.0199 14.246 17.8463 9.16885 15.4289 7.87235Z',
  d8: 'M20.9995 3V21H2.99951V3H20.9995Z',
  d9: 'M2.99951 2.25C2.5853 2.25 2.24951 2.58579 2.24951 3V21C2.24951 21.4142 2.5853 21.75 2.99951 21.75H20.9995C21.4137 21.75 21.7495 21.4142 21.7495 21V3C21.7495 2.58579 21.4137 2.25 20.9995 2.25H2.99951ZM12.0003 7.40326C11.8192 7.27903 11.5942 7.14683 11.3299 7.03402C10.5519 6.70194 9.45093 6.55048 8.21684 7.20917C6.64299 8.0492 5.92515 10.0186 6.39213 11.9751C6.86918 13.9738 8.54847 15.9638 11.7373 17.152L12.0003 17.25L12.2633 17.152C15.4521 15.9638 17.1314 13.9738 17.6084 11.9751C18.0754 10.0186 17.3575 8.0492 15.7837 7.20917C14.5496 6.55048 13.4486 6.70194 12.6706 7.03403C12.4064 7.14683 12.1814 7.27903 12.0003 7.40326Z',
};

export const IconFavouriteSquareStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-stroke-rounded IconFavouriteSquareStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-duotone-rounded IconFavouriteSquareDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-twotone-rounded IconFavouriteSquareTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-solid-rounded IconFavouriteSquareSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-bulk-rounded IconFavouriteSquareBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-stroke-sharp IconFavouriteSquareStrokeSharp"
    >
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFavouriteSquareSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="favourite-square-solid-sharp IconFavouriteSquareSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFavouriteSquare: TheIconSelfPack = {
  name: 'FavouriteSquare',
  StrokeRounded: IconFavouriteSquareStrokeRounded,
  DuotoneRounded: IconFavouriteSquareDuotoneRounded,
  TwotoneRounded: IconFavouriteSquareTwotoneRounded,
  SolidRounded: IconFavouriteSquareSolidRounded,
  BulkRounded: IconFavouriteSquareBulkRounded,
  StrokeSharp: IconFavouriteSquareStrokeSharp,
  SolidSharp: IconFavouriteSquareSolidSharp,
};