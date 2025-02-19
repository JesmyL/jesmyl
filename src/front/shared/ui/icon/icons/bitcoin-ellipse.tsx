import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.5 16L9.5 8',
  d2: 'M11 8V6M13.5 8V6',
  d3: 'M11 18V16M13.5 18V16',
  d4: 'M9.5 12H14.5C15.3284 12 16 12.6716 16 13.5V14.5C16 15.3284 15.3284 16 14.5 16H8',
  d5: 'M8 8L14.5 8C15.3284 8 16 8.67157 16 9.5V10.5C16 11.3284 15.3284 12 14.5 12H9.5',
  d6: 'M9.5 16L9.5 8M11 8V6M13.5 8V6M11 18V16M13.5 18V16M9.5 12H14.5M14.5 12C15.3284 12 16 12.6716 16 13.5V14.5C16 15.3284 15.3284 16 14.5 16H8M14.5 12C15.3284 12 16 11.3284 16 10.5V9.5C16 8.67157 15.3284 8 14.5 8H8',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11.75 6C11.75 5.58579 11.4142 5.25 11 5.25C10.5858 5.25 10.25 5.58579 10.25 6V7.25H8C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75H8.75L8.75 15.25H8C7.58579 15.25 7.25 15.5858 7.25 16C7.25 16.4142 7.58579 16.75 8 16.75H10.25V18C10.25 18.4142 10.5858 18.75 11 18.75C11.4142 18.75 11.75 18.4142 11.75 18V16.75H12.75V18C12.75 18.4142 13.0858 18.75 13.5 18.75C13.9142 18.75 14.25 18.4142 14.25 18V16.75H14.5C15.7426 16.75 16.75 15.7426 16.75 14.5V13.5C16.75 12.9237 16.5334 12.3981 16.1771 12C16.5334 11.6019 16.75 11.0763 16.75 10.5V9.5C16.75 8.25736 15.7426 7.25 14.5 7.25H14.25V6C14.25 5.58579 13.9142 5.25 13.5 5.25C13.0858 5.25 12.75 5.58579 12.75 6V7.25H11.75V6ZM10.25 11.25V8.75H10.9991H11.0009H13.4991H13.5009H14.5C14.9142 8.75 15.25 9.08579 15.25 9.5V10.5C15.25 10.9142 14.9142 11.25 14.5 11.25H10.25ZM10.25 12.75H14.5C14.9142 12.75 15.25 13.0858 15.25 13.5V14.5C15.25 14.9142 14.9142 15.25 14.5 15.25H10.25V12.75Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d9: 'M11 5.25C11.4142 5.25 11.75 5.58579 11.75 6V7.25H12.75V6C12.75 5.58579 13.0858 5.25 13.5 5.25C13.9142 5.25 14.25 5.58579 14.25 6V7.25H14.5C15.7426 7.25 16.75 8.25736 16.75 9.5V10.5C16.75 11.0763 16.5334 11.6019 16.1771 12C16.5334 12.3981 16.75 12.9237 16.75 13.5V14.5C16.75 15.7426 15.7426 16.75 14.5 16.75H14.25V18C14.25 18.4142 13.9142 18.75 13.5 18.75C13.0858 18.75 12.75 18.4142 12.75 18V16.75H11.75V18C11.75 18.4142 11.4142 18.75 11 18.75C10.5858 18.75 10.25 18.4142 10.25 18V16.75H8C7.58579 16.75 7.25 16.4142 7.25 16C7.25 15.5858 7.58579 15.25 8 15.25H8.75L8.75 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H10.25V6C10.25 5.58579 10.5858 5.25 11 5.25ZM10.25 8.75V11.25H14.5C14.9142 11.25 15.25 10.9142 15.25 10.5V9.5C15.25 9.08579 14.9142 8.75 14.5 8.75H13.5009H13.4991H11.0009H10.9991H10.25ZM14.5 12.75H10.25V15.25H14.5C14.9142 15.25 15.25 14.9142 15.25 14.5V13.5C15.25 13.0858 14.9142 12.75 14.5 12.75Z',
  d10: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM8 7.25H10.25V6H11.75V7.25H12.75V6H14.25V7.25H14.5C15.7426 7.25 16.75 8.25736 16.75 9.5V10.5C16.75 11.0763 16.5334 11.6019 16.1771 12C16.5334 12.3981 16.75 12.9237 16.75 13.5V14.5C16.75 15.7426 15.7426 16.75 14.5 16.75H14.25V18H12.75V16.75H11.75V18H10.25V16.75H8V15.25H8.75L8.75 8.75H8V7.25ZM15.25 10.5C15.25 10.9142 14.9142 11.25 14.5 11.25H10.25V8.75H14.5C14.9142 8.75 15.25 9.08579 15.25 9.5V10.5ZM14.5 12.75H10.25V15.25H14.5C14.9142 15.25 15.25 14.9142 15.25 14.5V13.5C15.25 13.0858 14.9142 12.75 14.5 12.75Z',
};

export const IconBitcoinEllipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-stroke-rounded IconBitcoinEllipseStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinEllipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-duotone-rounded IconBitcoinEllipseDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinEllipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-twotone-rounded IconBitcoinEllipseTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinEllipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-solid-rounded IconBitcoinEllipseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBitcoinEllipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-bulk-rounded IconBitcoinEllipseBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBitcoinEllipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-stroke-sharp IconBitcoinEllipseStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
    </TheIconWrapper>
  );
};

export const IconBitcoinEllipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="bitcoin-ellipse-solid-sharp IconBitcoinEllipseSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBitcoinEllipse: TheIconSelfPack = {
  name: 'BitcoinEllipse',
  StrokeRounded: IconBitcoinEllipseStrokeRounded,
  DuotoneRounded: IconBitcoinEllipseDuotoneRounded,
  TwotoneRounded: IconBitcoinEllipseTwotoneRounded,
  SolidRounded: IconBitcoinEllipseSolidRounded,
  BulkRounded: IconBitcoinEllipseBulkRounded,
  StrokeSharp: IconBitcoinEllipseStrokeSharp,
  SolidSharp: IconBitcoinEllipseSolidSharp,
};