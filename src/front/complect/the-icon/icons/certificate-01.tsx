import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.5 22C7.49306 22 5.48959 22 4.2448 20.5355C3 19.0711 3 16.714 3 12C3 7.28596 3 4.92893 4.2448 3.46447C5.48959 2 7.49306 2 11.5 2C15.5069 2 17.5104 2 18.7552 3.46447C19.7572 4.64332 19.9527 6.40054 19.9908 9.5',
  d2: 'M8 8H15M8 13H11',
  d3: 'M19.6092 18.1054C20.4521 17.4918 21 16.4974 21 15.375C21 13.511 19.489 12 17.625 12H17.375C15.511 12 14 13.511 14 15.375C14 16.4974 14.5479 17.4918 15.3908 18.1054M19.6092 18.1054C19.0523 18.5108 18.3666 18.75 17.625 18.75H17.375C16.6334 18.75 15.9477 18.5108 15.3908 18.1054M19.6092 18.1054L20.192 19.9404C20.4143 20.6403 20.5255 20.9903 20.4951 21.2082C20.4318 21.6617 20.0619 21.9984 19.6252 22C19.4154 22.0008 19.101 21.8358 18.4723 21.5059C18.2027 21.3644 18.0679 21.2936 17.93 21.252C17.649 21.1673 17.351 21.1673 17.07 21.252C16.9321 21.2936 16.7973 21.3644 16.5277 21.5059C15.899 21.8358 15.5846 22.0008 15.3748 22C14.9381 21.9984 14.5682 21.6617 14.5049 21.2082C14.4745 20.9903 14.5857 20.6403 14.808 19.9404L15.3908 18.1054',
  d4: 'M8 8.00049H15M8 13.0005H11',
  d5: 'M3 12C3 7.28596 3 4.92893 4.2448 3.46447C5.48959 2 7.49306 2 11.5 2C15.5069 2 17.5618 2.00015 18.8066 3.46462C20.0514 4.92909 20.0514 7.28611 20.0514 12.0002C20.0514 12.3562 20.0514 12.6988 20.0509 13.0286C19.4373 12.3943 18.5772 12 17.625 12H17.375C15.511 12 14 13.511 14 15.375C14 16.4974 14.5479 17.4918 15.3908 18.1054L14.808 19.9404C14.5857 20.6403 14.4745 20.9903 14.5049 21.2082C14.5522 21.5473 14.771 21.8211 15.0609 21.9383C14.099 22.0002 12.9466 22.0002 11.5514 22.0002C7.54449 22.0002 5.48959 22 4.2448 20.5355C3 19.0711 3 16.714 3 12Z',
  d6: 'M19.6092 18.1059C20.4521 17.4923 21 16.4979 21 15.3755C21 13.5115 19.489 12.0005 17.625 12.0005H17.375C15.511 12.0005 14 13.5115 14 15.3755C14 16.4979 14.5479 17.4923 15.3908 18.1059M19.6092 18.1059C19.0523 18.5113 18.3666 18.7505 17.625 18.7505H17.375C16.6334 18.7505 15.9477 18.5113 15.3908 18.1059M19.6092 18.1059L20.192 19.9409C20.4143 20.6408 20.5255 20.9907 20.4951 21.2087C20.4318 21.6622 20.0619 21.9989 19.6252 22.0005C19.4154 22.0013 19.101 21.8363 18.4723 21.5064C18.2027 21.3649 18.0679 21.2941 17.93 21.2525C17.649 21.1678 17.351 21.1678 17.07 21.2525C16.9321 21.2941 16.7973 21.3649 16.5277 21.5064C15.899 21.8363 15.5846 22.0013 15.3748 22.0005C14.9381 21.9989 14.5682 21.6622 14.5049 21.2087C14.4745 20.9907 14.5857 20.6408 14.808 19.9409L15.3908 18.1059',
  d7: 'M11.5566 1.25C13.5045 1.24998 15.056 1.24996 16.2718 1.44227C17.5369 1.64237 18.5409 2.0646 19.3179 2.97873C20.0799 3.87526 20.4179 5.00361 20.5808 6.42849C20.7109 7.56695 20.7355 8.96746 20.7401 10.6906C19.8483 10.0964 18.7771 9.75 17.625 9.75H17.375C14.2684 9.75 11.75 12.2684 11.75 15.375C11.75 16.6204 12.1562 17.7722 12.8402 18.7032L12.6469 19.3115C12.5496 19.6179 12.4498 19.9319 12.382 20.197C12.3216 20.4329 12.1962 20.943 12.2765 21.5191C12.3377 21.9576 12.4905 22.3763 12.7183 22.7483C12.3506 22.75 11.9665 22.75 11.5656 22.75H11.4346C9.48668 22.75 7.93526 22.75 6.71943 22.5577C5.45432 22.3576 4.45035 21.9354 3.67334 21.0213C2.91129 20.1247 2.57328 18.9964 2.41045 17.5715C2.24999 16.1674 2.24999 14.3646 2.25 12.0495V12.0495V11.9505C2.24999 9.63538 2.24999 7.83262 2.41045 6.42849C2.57328 5.00361 2.91129 3.87526 3.67334 2.97873C4.44994 2.06508 5.45123 1.64255 6.71481 1.4423C7.92855 1.24996 9.47789 1.24998 11.4256 1.25H11.4256H11.5566H11.5566ZM8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75H15C15.4142 8.75 15.75 8.41421 15.75 8C15.75 7.58579 15.4142 7.25 15 7.25H8ZM8 12.25C7.58579 12.25 7.25 12.5858 7.25 13C7.25 13.4142 7.58579 13.75 8 13.75H10.209C10.6232 13.75 10.959 13.4142 10.959 13C10.959 12.5858 10.6232 12.25 10.209 12.25H8Z',
  d8: 'M17.375 11.25C15.0968 11.25 13.25 13.0968 13.25 15.375C13.25 16.5477 13.7399 17.606 14.5242 18.3563L14.0863 19.7349C13.981 20.0665 13.8922 20.3459 13.8351 20.569C13.7808 20.7811 13.7251 21.0465 13.7621 21.3118C13.8731 22.1077 14.5353 22.7469 15.372 22.75C15.6508 22.751 15.9096 22.6473 16.1015 22.5611C16.306 22.4692 16.5587 22.3366 16.855 22.1811C17.1509 22.0258 17.2334 21.9861 17.2866 21.9701C17.4263 21.928 17.5737 21.928 17.7134 21.9701C17.7666 21.9861 17.849 22.0258 18.1449 22.1811C18.4412 22.3366 18.694 22.4692 18.8985 22.5611C19.0904 22.6473 19.3492 22.751 19.628 22.75C20.4647 22.7469 21.1269 22.1077 21.2379 21.3118C21.2749 21.0465 21.2192 20.7811 21.1649 20.569C21.1078 20.3459 21.019 20.0665 20.9137 19.7349L20.4758 18.3563C21.2601 17.606 21.75 16.5477 21.75 15.375C21.75 13.0968 19.9032 11.25 17.625 11.25H17.375ZM15.5231 20.167L15.8301 19.2002C16.3077 19.3932 16.8295 19.4996 17.3753 19.4996H17.6253C18.1711 19.4996 18.6929 19.3932 19.1705 19.2002L19.4775 20.167C19.5915 20.5259 19.6668 20.7641 19.712 20.9406C19.8192 21.3051 19.6243 21.2603 19.5134 21.1924C19.356 21.1216 19.0981 20.9867 18.7748 20.817C18.5511 20.6994 18.3552 20.5964 18.1468 20.5336C17.7246 20.4062 17.276 20.4062 16.8538 20.5336C16.6454 20.5964 16.4495 20.6994 16.2258 20.817C15.9025 20.9867 15.6446 21.1216 15.4872 21.1924C15.2109 21.3285 15.2397 21.0813 15.2886 20.9406C15.3338 20.7641 15.4091 20.5259 15.5231 20.167Z',
  d9: 'M16.2718 1.44227C15.056 1.24996 13.5045 1.24998 11.5566 1.25H11.4256C9.47789 1.24998 7.92855 1.24996 6.71481 1.4423C5.45123 1.64255 4.44994 2.06508 3.67334 2.97873C2.91129 3.87526 2.57328 5.00361 2.41045 6.42849C2.24999 7.83262 2.24999 9.63538 2.25 11.9505V12.0495C2.24999 14.3646 2.24999 16.1674 2.41045 17.5715C2.57328 18.9964 2.91129 20.1247 3.67334 21.0213C4.45035 21.9354 5.45432 22.3576 6.71943 22.5577C7.93526 22.75 9.48668 22.75 11.4346 22.75H11.5656C11.9665 22.75 12.3506 22.75 12.7183 22.7483C12.4905 22.3763 12.3377 21.9576 12.2765 21.5191C12.1962 20.943 12.3216 20.4329 12.382 20.197C12.4498 19.9319 12.5496 19.6179 12.6469 19.3115L12.8402 18.7032C12.1562 17.7722 11.75 16.6204 11.75 15.375C11.75 12.2684 14.2684 9.75 17.375 9.75H17.625C18.7771 9.75 19.8483 10.0964 20.7401 10.6906C20.7355 8.96746 20.7109 7.56695 20.5808 6.42849C20.4179 5.00361 20.0799 3.87526 19.3179 2.97873C18.5409 2.0646 17.5369 1.64237 16.2718 1.44227Z',
  d10: 'M7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H10.209C10.6232 12.25 10.959 12.5858 10.959 13C10.959 13.4142 10.6232 13.75 10.209 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13Z',
  d11: 'M12.0047 21.9981H3V1.99805H20V9.49815',
  d12: 'M7 7.99902H16M7 12.999H12',
  d13: 'M15.0161 17.2101V22.0017L17.5 20.9846L19.9839 22.0017V17.2101M21 14.8491C21 16.9503 19.433 18.5158 17.5 18.5158C15.567 18.5158 14 16.9202 14 14.8491C14 12.9984 15.567 11.498 17.5 11.498C19.433 11.498 21 12.9984 21 14.8491Z',
  d14: 'M2.25 2C2.25 1.58579 2.58579 1.25 3 1.25H19.9911C20.4053 1.25 20.7411 1.58579 20.7411 2V10.0003C19.8183 9.36945 18.7022 9.00049 17.5 9.00049C14.3244 9.00049 11.75 11.5749 11.75 14.7505C11.75 15.9526 12.1189 17.0686 12.7497 17.9913V22.7501H3C2.80109 22.7501 2.61032 22.6711 2.46967 22.5304C2.32902 22.3898 2.25 22.199 2.25 22.0001V2ZM6 7.5H17V6H6V7.5ZM6 12.5H11V11H6V12.5Z',
  d15: 'M13.25 14.7505C13.25 12.4033 15.1528 10.5005 17.5 10.5005C19.8472 10.5005 21.75 12.4033 21.75 14.7505C21.75 17.0977 19.8472 19.0005 17.5 19.0005C15.1528 19.0005 13.25 17.0977 13.25 14.7505Z',
  d16: 'M14.2497 18.8738V22.7498L17.4996 21.4498L20.7497 22.7502V18.8738C19.8557 19.5794 18.7269 20.0004 17.4997 20.0004C16.2724 20.0004 15.1436 19.5794 14.2497 18.8738Z',
};

export const IconCertificate01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-stroke-rounded IconCertificate01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCertificate01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-duotone-rounded IconCertificate01DuotoneRounded"
    >
      <path 
        d={d.d1} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCertificate01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-twotone-rounded IconCertificate01TwotoneRounded"
    >
      <path 
        d={d.d1} 
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCertificate01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-solid-rounded IconCertificate01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCertificate01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-bulk-rounded IconCertificate01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCertificate01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-stroke-sharp IconCertificate01StrokeSharp"
    >
      <path 
        d={d.d11} 
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

export const IconCertificate01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="certificate-01-solid-sharp IconCertificate01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCertificate01: TheIconSelfPack = {
  name: 'Certificate01',
  StrokeRounded: IconCertificate01StrokeRounded,
  DuotoneRounded: IconCertificate01DuotoneRounded,
  TwotoneRounded: IconCertificate01TwotoneRounded,
  SolidRounded: IconCertificate01SolidRounded,
  BulkRounded: IconCertificate01BulkRounded,
  StrokeSharp: IconCertificate01StrokeSharp,
  SolidSharp: IconCertificate01SolidSharp,
};