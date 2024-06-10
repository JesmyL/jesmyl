import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.4711 19.9634C10.8851 15.8356 11.4912 7.3524 10.6271 3.69484L9 4.5C9 4.5 7.76992 3 6.49953 3C5.22914 3 4 4.5 4 4.5L2.3727 3.69484C1.5086 7.35252 2.11482 15.8358 4.52945 19.9634C5.33792 21.3455 7.66279 21.3456 8.4711 19.9634Z',
  d2: 'M15.5289 4.03657C13.1149 8.1644 12.5088 16.6476 13.3729 20.3052L15 19.5C15 19.5 16.2301 21 17.5005 21C18.7709 21 20 19.5 20 19.5L21.6273 20.3052C22.4914 16.6475 21.8852 8.16425 19.4706 4.03657C18.6621 2.65454 16.3372 2.6544 15.5289 4.03657Z',
  d3: 'M6.5 17V16',
  d4: 'M17.5 8V7',
  d5: 'M15.5289 4.03657C13.1149 8.1644 12.5088 16.6476 13.3729 20.3052L15 19.5C15 19.5 16.2301 21 17.5005 21C18.7709 21 20 19.5 20 19.5L21.6273 20.3052C22.4914 16.6475 21.8852 8.16425 19.4706 4.03657C18.6621 2.65454 16.3372 2.65441 15.5289 4.03657Z',
  d6: 'M14.8348 20.4185C14.9652 20.5454 15.1236 20.6895 15.3038 20.8345C15.8011 21.2344 16.5979 21.75 17.5005 21.75C18.4031 21.75 19.1997 21.2343 19.6968 20.8343C19.8769 20.6895 20.0351 20.5454 20.1654 20.4186L21.2947 20.9774C21.4996 21.0788 21.7396 21.0811 21.9465 20.9838C22.1534 20.8865 22.3046 20.7001 22.3572 20.4776C22.8174 18.5295 22.8736 15.3974 22.5238 12.2639C22.1744 9.13406 21.4044 5.85714 20.1179 3.65787C19.5483 2.68424 18.4822 2.25002 17.4997 2.25C16.5172 2.24998 15.451 2.68416 14.8815 3.65795C13.5953 5.85728 12.8255 9.1342 12.4762 12.264C12.1265 15.3975 12.1827 18.5296 12.6429 20.4776C12.6955 20.7001 12.8467 20.8865 13.0536 20.9838C13.2605 21.0812 13.5005 21.0788 13.7055 20.9774L14.8348 20.4185ZM18.25 7C18.25 6.58579 17.9142 6.25 17.5 6.25C17.0858 6.25 16.75 6.58579 16.75 7V8C16.75 8.41421 17.0858 8.75 17.5 8.75C17.9142 8.75 18.25 8.41421 18.25 8V7Z',
  d7: 'M9.16519 3.58146C9.03478 3.4546 8.87643 3.3105 8.69617 3.16554C8.19887 2.76563 7.4021 2.25 6.49953 2.25C5.5969 2.25 4.80034 2.76569 4.30322 3.16566C4.12314 3.31054 3.96494 3.45458 3.83464 3.5814L2.7053 3.02262C2.50037 2.92123 2.26037 2.91885 2.05347 3.01617C1.84657 3.1135 1.69536 3.29989 1.6428 3.52241C1.18258 5.47049 1.12641 8.60263 1.47619 11.7361C1.82556 14.8659 2.59555 18.1429 3.88209 20.3421C4.45165 21.3158 5.51783 21.75 6.50032 21.75C7.48282 21.75 8.54903 21.3158 9.11853 20.342C10.4047 18.1427 11.1745 14.8658 11.5238 11.736C11.8735 8.60252 11.8173 5.47042 11.3571 3.52241C11.3045 3.29988 11.1533 3.11349 10.9464 3.01617C10.7395 2.91885 10.4995 2.92123 10.2945 3.02264L9.16519 3.58146ZM7.25 16C7.25 15.5858 6.91421 15.25 6.5 15.25C6.08579 15.25 5.75 15.5858 5.75 16V17C5.75 17.4142 6.08579 17.75 6.5 17.75C6.91421 17.75 7.25 17.4142 7.25 17V16Z',
  d8: 'M15.3038 20.8345C15.1236 20.6895 14.9652 20.5454 14.8348 20.4185L13.7055 20.9774C13.5005 21.0788 13.2605 21.0812 13.0536 20.9838C12.8467 20.8865 12.6955 20.7001 12.6429 20.4776C12.1827 18.5296 12.1265 15.3975 12.4762 12.264C12.8255 9.1342 13.5953 5.85728 14.8815 3.65795C15.451 2.68416 16.5172 2.24998 17.4997 2.25C18.4822 2.25002 19.5484 2.68424 20.1179 3.65787C21.4045 5.85714 22.1744 9.13406 22.5238 12.2639C22.8736 15.3974 22.8174 18.5295 22.3572 20.4776C22.3046 20.7001 22.1534 20.8865 21.9465 20.9838C21.7396 21.0811 21.4996 21.0788 21.2947 20.9774L20.1654 20.4186C20.0351 20.5454 19.8769 20.6895 19.6968 20.8343C19.1997 21.2343 18.4031 21.75 17.5005 21.75C16.5979 21.75 15.8011 21.2344 15.3038 20.8345Z',
  d9: 'M17.5 6.25C17.9142 6.25 18.25 6.58579 18.25 7V8C18.25 8.41421 17.9142 8.75 17.5 8.75C17.0858 8.75 16.75 8.41421 16.75 8V7C16.75 6.58579 17.0858 6.25 17.5 6.25Z',
  d10: 'M8.69617 3.16554C8.87643 3.3105 9.03478 3.4546 9.16519 3.58146L10.2945 3.02264C10.4995 2.92123 10.7395 2.91885 10.9464 3.01617C11.1533 3.11349 11.3045 3.29988 11.3571 3.52241C11.8173 5.47042 11.8735 8.60252 11.5238 11.736C11.1745 14.8658 10.4047 18.1427 9.11853 20.342C8.54903 21.3158 7.48282 21.75 6.50032 21.75C5.51783 21.75 4.45165 21.3158 3.88209 20.3421C2.59555 18.1429 1.82556 14.8659 1.47619 11.7361C1.12641 8.60263 1.18258 5.47049 1.6428 3.52241C1.69536 3.29989 1.84657 3.1135 2.05347 3.01617C2.26037 2.91885 2.50037 2.92123 2.7053 3.02262L3.83464 3.5814C3.96494 3.45458 4.12314 3.31054 4.30322 3.16566C4.80034 2.76569 5.5969 2.25 6.49953 2.25C7.4021 2.25 8.19887 2.76563 8.69617 3.16554Z',
  d11: 'M6.5 15.25C6.91421 15.25 7.25 15.5858 7.25 16V17C7.25 17.4142 6.91421 17.75 6.5 17.75C6.08579 17.75 5.75 17.4142 5.75 17V16C5.75 15.5858 6.08579 15.25 6.5 15.25Z',
  d12: 'M6.5 17V15',
  d13: 'M17.5 9V7',
  d14: 'M9.16519 3.58146C9.03478 3.4546 8.87643 3.3105 8.69617 3.16554C8.19887 2.76563 7.4021 2.25 6.49953 2.25C5.5969 2.25 4.80034 2.76569 4.30322 3.16566C4.12314 3.31054 3.96494 3.45458 3.83464 3.5814L1.8597 2.60424L1.6428 3.52241C1.18258 5.47049 1.12641 8.60263 1.47619 11.7361C1.82556 14.8659 2.59555 18.1429 3.88209 20.3421C4.45165 21.3158 5.51783 21.75 6.50032 21.75C7.48282 21.75 8.54903 21.3158 9.11853 20.342C10.4047 18.1427 11.1745 14.8658 11.5238 11.736C11.8735 8.60252 11.8173 5.47042 11.3571 3.52241L11.1401 2.6042L9.16519 3.58146ZM7.25 17V15H5.75V17H7.25Z',
  d15: 'M14.8348 20.4185C14.9652 20.5454 15.1236 20.6895 15.3038 20.8345C15.8011 21.2344 16.5979 21.75 17.5005 21.75C18.4031 21.75 19.1997 21.2343 19.6968 20.8343C19.8769 20.6895 20.0351 20.5454 20.1654 20.4186L22.1403 21.3958L22.3572 20.4776C22.8174 18.5295 22.8736 15.3974 22.5238 12.2639C22.1744 9.13406 21.4044 5.85714 20.1179 3.65787C19.5483 2.68424 18.4822 2.25002 17.4997 2.25C16.5172 2.24998 15.451 2.68416 14.8815 3.65795C13.5953 5.85728 12.8255 9.1342 12.4762 12.264C12.1265 15.3975 12.1827 18.5296 12.6429 20.4776L12.8599 21.3958L14.8348 20.4185ZM18.25 9V7H16.75V9H18.25Z',
};

export const IconFinsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-stroke-rounded IconFinsStrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
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

export const IconFinsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-duotone-rounded IconFinsDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
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

export const IconFinsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-twotone-rounded IconFinsTwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFinsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-solid-rounded IconFinsSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFinsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-bulk-rounded IconFinsBulkRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconFinsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-stroke-sharp IconFinsStrokeSharp"
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
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFinsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="fins-solid-sharp IconFinsSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFins: TheIconSelfPack = {
  name: 'Fins',
  StrokeRounded: IconFinsStrokeRounded,
  DuotoneRounded: IconFinsDuotoneRounded,
  TwotoneRounded: IconFinsTwotoneRounded,
  SolidRounded: IconFinsSolidRounded,
  BulkRounded: IconFinsBulkRounded,
  StrokeSharp: IconFinsStrokeSharp,
  SolidSharp: IconFinsSolidSharp,
};