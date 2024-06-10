import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 8C15 8 14 9 14 10C14.75 9 16.25 9 17 10',
  d2: 'M8.00897 9H8',
  d3: 'M8 14C8.91212 15.2144 10.3643 16 12 16C13.6357 16 15.0879 15.2144 16 14',
  d4: 'M10 16V17.5C10 18.6046 10.8954 19.5 12 19.5C13.1046 19.5 14 18.6046 14 17.5V16',
  d5: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10 17.5021C10 18.6066 10.8954 19.5021 12 19.5021C13.1046 19.5021 14 18.6066 14 17.5021V15.5859C13.3875 15.8536 12.7111 16.0021 12 16.0021C11.2889 16.0021 10.6125 15.8536 10 15.5859V17.5021Z',
  d6: 'M8 14C8.91212 15.2144 10.3643 16 12 16C13.6357 16 15.0879 15.2144 16 14M10 16V17.5C10 18.6046 10.8954 19.5 12 19.5C13.1046 19.5 14 18.6046 14 17.5V16',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM15.5585 8.50064C15.8229 8.20618 15.8135 7.75286 15.5303 7.46967C15.2374 7.17678 14.7626 7.17678 14.4697 7.46967L14.463 7.47679C14.4236 7.51905 14.3256 7.62395 14.2743 7.68378C14.166 7.8101 14.0215 7.9906 13.876 8.20897C13.6011 8.62133 13.25 9.27456 13.25 10C13.25 10.3228 13.4566 10.6094 13.7628 10.7115C14.0691 10.8136 14.4063 10.7083 14.6 10.45C15.05 9.85 15.95 9.85 16.4 10.45C16.6485 10.7814 17.1186 10.8485 17.45 10.6C17.7814 10.3515 17.8485 9.88137 17.6 9.55C17.088 8.86732 16.3263 8.51754 15.5585 8.50064ZM6.75 9C6.75 8.30964 7.30764 7.75 7.99553 7.75H8.00447C8.69236 7.75 9.25 8.30964 9.25 9C9.25 9.69036 8.69236 10.25 8.00447 10.25H7.99553C7.30764 10.25 6.75 9.69036 6.75 9ZM8.59974 13.5496C8.35099 13.2184 7.88084 13.1515 7.54964 13.4003C7.21843 13.649 7.1516 14.1192 7.40035 14.4504C7.89332 15.1068 8.52418 15.6546 9.25004 16.0507V17.5C9.25004 19.0188 10.4813 20.25 12 20.25C13.5188 20.25 14.75 19.0188 14.75 17.5V16.0507C15.4759 15.6546 16.1068 15.1068 16.5997 14.4504C16.8485 14.1192 16.7817 13.649 16.4505 13.4003C16.1192 13.1515 15.6491 13.2184 15.4003 13.5496C14.6238 14.5835 13.3898 15.25 12 15.25C10.6103 15.25 9.37631 14.5835 8.59974 13.5496ZM10.75 17.5V16.6136C11.1525 16.7029 11.5708 16.75 12 16.75C12.4293 16.75 12.8476 16.7029 13.25 16.6136V17.5C13.25 18.1903 12.6904 18.75 12 18.75C11.3097 18.75 10.75 18.1903 10.75 17.5Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d9: 'M15.5303 7.46967C15.8135 7.75286 15.8229 8.20618 15.5585 8.50064C16.3263 8.51754 17.088 8.86732 17.6 9.55C17.8485 9.88137 17.7814 10.3515 17.45 10.6C17.1186 10.8485 16.6485 10.7814 16.4 10.45C15.95 9.85 15.05 9.85 14.6 10.45C14.4063 10.7083 14.0691 10.8136 13.7628 10.7115C13.4566 10.6094 13.25 10.3228 13.25 10C13.25 9.27456 13.6011 8.62133 13.876 8.20897C14.0215 7.9906 14.166 7.8101 14.2743 7.68378C14.3288 7.62023 14.4359 7.50585 14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z',
  d10: 'M6.75 9C6.75 8.30964 7.30764 7.75 7.99553 7.75H8.00447C8.69236 7.75 9.25 8.30964 9.25 9C9.25 9.69036 8.69236 10.25 8.00447 10.25H7.99553C7.30764 10.25 6.75 9.69036 6.75 9Z',
  d11: 'M7.54964 13.4003C7.88084 13.1516 8.35099 13.2184 8.59974 13.5496C9.37631 14.5836 10.6103 15.25 12 15.25C13.3898 15.25 14.6238 14.5836 15.4003 13.5496C15.6491 13.2184 16.1192 13.1516 16.4505 13.4003C16.7817 13.6491 16.8485 14.1192 16.5997 14.4505C16.1068 15.1068 15.4759 15.6546 14.75 16.0507V17.5C14.75 19.0188 13.5188 20.25 12 20.25C10.4813 20.25 9.25004 19.0188 9.25004 17.5V16.0507C8.52418 15.6546 7.89332 15.1068 7.40035 14.4505C7.1516 14.1192 7.21843 13.6491 7.54964 13.4003ZM10.75 16.6137V17.5C10.75 18.1904 11.3097 18.75 12 18.75C12.6904 18.75 13.25 18.1904 13.25 17.5V16.6137C12.8476 16.703 12.4293 16.75 12 16.75C11.5708 16.75 11.1525 16.703 10.75 16.6137Z',
  d12: 'M15 7.5C15 7.5 14 9 14 10C14.75 9 16.25 9 17 10',
  d13: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM15 7.49981C14.376 7.08378 14.3759 7.08388 14.3758 7.08399L14.3742 7.08639L14.3711 7.0912L14.3606 7.1072C14.3518 7.12064 14.3395 7.1396 14.3243 7.16356C14.2938 7.21144 14.2513 7.27956 14.2006 7.36394C14.0998 7.53201 13.9649 7.76799 13.8292 8.0394C13.5762 8.54528 13.25 9.30869 13.25 9.99981C13.25 10.3226 13.4566 10.6092 13.7628 10.7113C14.0691 10.8134 14.4063 10.7081 14.6 10.4498C15.05 9.84981 15.95 9.84981 16.4 10.4498L17.6 9.54981C17.0249 8.78303 16.1349 8.43621 15.2748 8.50936C15.3527 8.36395 15.4267 8.23603 15.4869 8.13568C15.53 8.06381 15.5656 8.00693 15.5898 7.96887C15.6019 7.94986 15.6111 7.93561 15.617 7.9266L15.6232 7.91709L15.6242 7.91566C15.6241 7.91574 15.624 7.91583 15 7.49981ZM6.75 9C6.75 8.30964 7.30964 7.75 8 7.75H8.00897C8.69933 7.75 9.25897 8.30964 9.25897 9C9.25897 9.69036 8.69933 10.25 8.00897 10.25H8C7.30964 10.25 6.75 9.69036 6.75 9ZM15.4004 13.5498C14.6238 14.5838 13.3899 15.2502 12.0001 15.2502C10.6103 15.2502 9.37635 14.5838 8.59978 13.5498L7.40039 14.4506C7.89336 15.107 8.52422 15.6548 9.25008 16.0509V17.5002C9.25008 19.019 10.4813 20.2502 12.0001 20.2502C13.5189 20.2502 14.7501 19.019 14.7501 17.5002V16.0509C15.4759 15.6548 16.1068 15.107 16.5998 14.4506L15.4004 13.5498ZM10.7501 17.5002V16.6139C11.1525 16.7031 11.5708 16.7502 12.0001 16.7502C12.4294 16.7502 12.8477 16.7031 13.2501 16.6139V17.5002C13.2501 18.1906 12.6904 18.7502 12.0001 18.7502C11.3097 18.7502 10.7501 18.1906 10.7501 17.5002Z',
};

export const IconTongueWinkRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-stroke-rounded IconTongueWinkRightStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconTongueWinkRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-duotone-rounded IconTongueWinkRightDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconTongueWinkRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-twotone-rounded IconTongueWinkRightTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconTongueWinkRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-solid-rounded IconTongueWinkRightSolidRounded"
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

export const IconTongueWinkRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-bulk-rounded IconTongueWinkRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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

export const IconTongueWinkRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-stroke-sharp IconTongueWinkRightStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d12} 
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
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTongueWinkRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tongue-wink-right-solid-sharp IconTongueWinkRightSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTongueWinkRight: TheIconSelfPack = {
  name: 'TongueWinkRight',
  StrokeRounded: IconTongueWinkRightStrokeRounded,
  DuotoneRounded: IconTongueWinkRightDuotoneRounded,
  TwotoneRounded: IconTongueWinkRightTwotoneRounded,
  SolidRounded: IconTongueWinkRightSolidRounded,
  BulkRounded: IconTongueWinkRightBulkRounded,
  StrokeSharp: IconTongueWinkRightStrokeSharp,
  SolidSharp: IconTongueWinkRightSolidSharp,
};