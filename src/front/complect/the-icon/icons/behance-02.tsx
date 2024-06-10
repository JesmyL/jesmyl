import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z',
  d2: 'M6.75085 11.985V9.00492C6.75085 8.72282 6.9824 8.49414 7.26802 8.49414H9.24582C9.68571 8.49414 10.1378 8.56982 10.4656 8.8595C10.8163 9.16935 11.1564 9.64935 11.1395 10.2909C11.1199 11.0391 10.5736 11.9234 9.77316 11.985C8.97271 12.0466 8.22065 11.985 6.75085 11.985ZM6.75085 11.985V14.9675C6.75085 15.2496 6.98243 15.478 7.26804 15.4808C8.40871 15.4917 9.07239 15.5322 9.77316 15.4783C10.5736 15.4166 11.1199 14.5323 11.1395 13.7841C11.1564 13.1426 10.8163 12.6626 10.4656 12.3527C10.1378 12.063 9.68571 11.9873 9.24582 11.9873L6.75085 11.985ZM16.7954 14.9655C16.3572 15.3901 14.2227 16.2293 13.4537 14.0205C13.3738 13.8 13.3102 13.3244 13.3473 12.957M13.3473 12.957C13.4106 12.3314 13.6867 11.4539 14.7115 11.0958C16.1791 10.583 17.102 12.0065 17.341 12.957H13.3473ZM14.5888 9.00095H15.949',
  d3: 'M6.52637 11.997V8.59359C6.52637 8.27142 6.76644 8.01026 7.06257 8.01026L9.19265 7.99414C9.64873 7.99414 10.4338 8.09406 10.7737 8.42489C11.1373 8.77875 11.4899 9.32694 11.4724 10.0596C11.4521 10.9141 10.5693 11.9105 9.7394 11.9809C8.90949 12.0512 8.05027 11.997 6.52637 11.997ZM6.52637 11.997V15.4031C6.52637 15.7253 6.84594 15.97 7.14207 15.9732C8.32473 15.9857 9.32918 16.0454 10.0557 15.9839C10.8856 15.9134 11.4521 14.9035 11.4724 14.049C11.4899 13.3164 11.1373 12.7682 10.7737 12.4143C10.4338 12.0834 9.96507 11.997 9.50899 11.997H6.52637ZM17.2191 15.0602C16.7435 15.8672 14.3704 16.9631 13.5731 14.4406C13.4903 14.1888 13.414 13.4377 13.4524 13.0181M13.4524 13.0181C13.518 12.3036 13.797 11.4608 14.8595 11.0518C16.3812 10.4662 17.5002 12.0044 17.5931 13.1046L13.4524 13.0181ZM14.6684 9.01198H16.3401',
  d4: 'M6.91895 11.985V9.00492C6.91895 8.72282 7.15049 8.49414 7.43611 8.49414H9.41391C9.8538 8.49414 10.3059 8.56982 10.6337 8.8595C10.9844 9.16935 11.3245 9.64935 11.3076 10.2909C11.2879 11.0391 10.7417 11.9234 9.94126 11.985C9.1408 12.0466 8.38874 11.985 6.91895 11.985ZM6.91895 11.985V14.9675C6.91895 15.2496 7.15052 15.478 7.43613 15.4808C8.5768 15.4917 9.24048 15.5322 9.94126 15.4783C10.7417 15.4166 11.2879 14.5323 11.3076 13.7841C11.3245 13.1426 10.9844 12.6626 10.6337 12.3527C10.3059 12.063 9.8538 11.9873 9.41391 11.9873L6.91895 11.985ZM16.5355 14.9675C16.0973 15.392 13.9628 16.2313 13.1938 14.0225C13.1139 13.802 13.0503 13.3263 13.0874 12.959M13.0874 12.959C13.1508 12.3334 13.4268 11.4559 14.4516 11.0978C15.9192 10.5849 16.8421 12.0085 17.0811 12.959H13.0874ZM14.3417 9.00492H15.7019',
  d5: 'M12.0572 1.75H12.0572H11.9428H11.9428C9.7521 1.74999 8.03143 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.75212 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H11.9428H12.0572H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V12.0572V11.9428V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75ZM7.72396 7.75002L7.68952 7.75001C7.49065 7.74992 7.27211 7.74983 7.08706 7.77537C6.86761 7.80567 6.58839 7.88392 6.35536 8.12318C6.12503 8.35968 6.05245 8.63823 6.02419 8.85401C5.99985 9.03991 5.99993 9.26046 6.00001 9.46603L6.00002 9.50002L6.00002 14.5L6.00001 14.534C5.99993 14.7396 5.99985 14.9601 6.02419 15.146C6.05245 15.3618 6.12503 15.6404 6.35536 15.8769C6.58839 16.1161 6.86761 16.1944 7.08706 16.2247C7.27211 16.2502 7.49065 16.2501 7.68952 16.25L7.72396 16.25H9.37966C10.7608 16.25 11.8827 15.132 11.8827 13.75C11.8827 13.0683 11.6097 12.4508 11.1672 12C11.6097 11.5493 11.8827 10.9318 11.8827 10.25C11.8827 8.86806 10.7608 7.75002 9.37966 7.75002L7.72396 7.75002ZM7.50002 14.5V12.75L9.37966 12.75C9.9349 12.75 10.3827 13.199 10.3827 13.75C10.3827 14.3011 9.9349 14.75 9.37966 14.75H7.72396C7.63625 14.75 7.56398 14.75 7.50114 14.7492C7.50005 14.6795 7.50002 14.599 7.50002 14.5ZM7.50002 11.25L9.37966 11.25C9.9349 11.25 10.3827 10.8011 10.3827 10.25C10.3827 9.69898 9.9349 9.25002 9.37966 9.25002L7.72396 9.25002C7.63625 9.25002 7.56398 9.25005 7.50114 9.25089C7.50005 9.32056 7.50002 9.40102 7.50002 9.50002V11.25ZM14.5546 8.08151C14.1404 8.08151 13.8046 8.4173 13.8046 8.83151C13.8046 9.24573 14.1404 9.58151 14.5546 9.58151H16.0155C16.4297 9.58151 16.7655 9.24573 16.7655 8.83151C16.7655 8.4173 16.4297 8.08151 16.0155 8.08151H14.5546ZM15.3021 10.25C13.7738 10.25 12.6043 11.6045 12.6043 13V13.5C12.6043 15 13.7936 16.25 15.3021 16.25C15.931 16.25 16.7385 16.0226 17.2537 15.5558C17.5606 15.2776 17.5839 14.8033 17.3058 14.4964C17.0276 14.1895 16.5533 14.1661 16.2464 14.4443C16.0747 14.5998 15.6612 14.75 15.3021 14.75C14.7371 14.75 14.2402 14.3324 14.1279 13.75L17.25 13.75C17.6642 13.75 18 13.4142 18 13C18 11.6045 16.8304 10.25 15.3021 10.25ZM15.3021 11.75C15.6636 11.75 16.0088 11.9533 16.2349 12.25H14.3694C14.5955 11.9533 14.9406 11.75 15.3021 11.75Z',
  d6: 'M12.0572 1.75C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75H12.0572Z',
  d7: 'M7.68952 7.75001C7.70107 7.75002 7.71255 7.75002 7.72396 7.75002H9.37966C10.7608 7.75002 11.8828 8.86806 11.8828 10.25C11.8828 10.9318 11.6097 11.5493 11.1672 12C11.6097 12.4508 11.8828 13.0683 11.8828 13.75C11.8828 15.132 10.7608 16.25 9.37966 16.25H7.72396C7.71255 16.25 7.70107 16.25 7.68952 16.25C7.49065 16.2501 7.27211 16.2502 7.08706 16.2247C6.86761 16.1944 6.58839 16.1161 6.35536 15.8769C6.12503 15.6404 6.05245 15.3618 6.02419 15.146C5.99985 14.9601 5.99993 14.7396 6.00001 14.534C6.00001 14.5226 6.00002 14.5113 6.00002 14.5V9.50002C6.00002 9.48874 6.00001 9.47741 6.00001 9.46603C5.99993 9.26046 5.99985 9.03991 6.02419 8.85401C6.05245 8.63823 6.12503 8.35968 6.35536 8.12318C6.58839 7.88392 6.86761 7.80567 7.08706 7.77537C7.27211 7.74983 7.49065 7.74992 7.68952 7.75001ZM7.50002 12.75V14.5C7.50002 14.599 7.50005 14.6795 7.50114 14.7492C7.56398 14.75 7.63625 14.75 7.72396 14.75H9.37966C9.9349 14.75 10.3828 14.3011 10.3828 13.75C10.3828 13.199 9.9349 12.75 9.37966 12.75H7.50002ZM9.37966 11.25H7.50002V9.50002C7.50002 9.40103 7.50005 9.32056 7.50114 9.25089C7.56398 9.25005 7.63625 9.25002 7.72396 9.25002H9.37966C9.9349 9.25002 10.3828 9.69898 10.3828 10.25C10.3828 10.8011 9.9349 11.25 9.37966 11.25ZM13.8046 8.83151C13.8046 8.4173 14.1404 8.08151 14.5546 8.08151H16.0155C16.4297 8.08151 16.7655 8.4173 16.7655 8.83151C16.7655 9.24573 16.4297 9.58151 16.0155 9.58151H14.5546C14.1404 9.58151 13.8046 9.24573 13.8046 8.83151ZM12.6043 13C12.6043 11.6045 13.7738 10.25 15.3021 10.25C16.8304 10.25 18 11.6045 18 13C18 13.4142 17.6642 13.75 17.25 13.75H14.1279C14.2402 14.3324 14.7371 14.75 15.3021 14.75C15.6612 14.75 16.0747 14.5998 16.2464 14.4443C16.5533 14.1661 17.0276 14.1895 17.3058 14.4964C17.5839 14.8033 17.5606 15.2776 17.2537 15.5558C16.7385 16.0226 15.931 16.25 15.3021 16.25C13.7936 16.25 12.6043 15 12.6043 13.5V13ZM14.3694 12.25H16.2349C16.0088 11.9533 15.6636 11.75 15.3021 11.75C14.9406 11.75 14.5955 11.9533 14.3694 12.25Z',
  d8: 'M21 3V21H3V3H21Z',
  d9: 'M6.51221 12.0001H9.13643M6.51221 12.0001V8.49219H9.13643C10.1051 8.49219 10.8904 9.27746 10.8904 10.2461C10.8904 11.2148 10.1051 12.0001 9.13643 12.0001M6.51221 12.0001V15.508H9.13643C10.1051 15.508 10.8904 14.7227 10.8904 13.754C10.8904 12.7854 10.1051 12.0001 9.13643 12.0001',
  d10: 'M13.5947 12.9954C13.5877 13.0789 13.5846 13.1638 13.5856 13.25C13.524 14.5444 14.402 15.518 15.5754 15.5078C16.0992 15.5078 16.6388 15.3473 17.0073 15.0095M13.5947 12.9954C13.6918 11.8356 14.5371 10.9588 15.5754 10.9922C16.5629 11.0552 17.4196 11.7804 17.5107 12.8916C17.5154 12.9482 17.4698 12.9954 17.4131 12.9954H13.5947ZM14.0026 9.00684H16.9943',
  d11: 'M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3L2.25 21C2.25 21.4142 2.58579 21.75 3 21.75L21 21.75C21.4142 21.75 21.75 21.4142 21.75 21L21.75 3C21.75 2.58579 21.4142 2.25 21 2.25L3 2.25ZM9.12964 7.75H5.75L5.75 16.25H9.12964C10.5108 16.25 11.6327 15.132 11.6327 13.75C11.6327 13.0683 11.3597 12.4507 10.9172 12C11.3597 11.5493 11.6327 10.9317 11.6327 10.25C11.6327 8.86804 10.5108 7.75 9.12964 7.75ZM10.1327 10.25C10.1327 10.801 9.68488 11.25 9.12964 11.25H7.25L7.25 9.25H9.12964C9.68488 9.25 10.1327 9.69896 10.1327 10.25ZM9.12964 12.75H7.25V14.75H9.12964C9.68488 14.75 10.1327 14.301 10.1327 13.75C10.1327 13.199 9.68488 12.75 9.12964 12.75ZM17 8.25H14V9.75H17V8.25ZM15.5521 10.25C14.0238 10.25 12.8542 11.6045 12.8542 13V13.5C12.8542 15 14.0436 16.25 15.5521 16.25C16.181 16.25 16.9885 16.0226 17.5036 15.5557L16.4964 14.4443C16.3247 14.5998 15.9112 14.75 15.5521 14.75C14.9871 14.75 14.4902 14.3324 14.3779 13.75H17.5C17.9142 13.75 18.25 13.4142 18.25 13C18.25 11.6045 17.0804 10.25 15.5521 10.25ZM16.4849 12.25H14.6193C14.8455 11.9533 15.1906 11.75 15.5521 11.75C15.9136 11.75 16.2588 11.9533 16.4849 12.25Z',
};

export const IconBehance02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-stroke-rounded IconBehance02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconBehance02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-duotone-rounded IconBehance02DuotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBehance02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-twotone-rounded IconBehance02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconBehance02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-solid-rounded IconBehance02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBehance02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-bulk-rounded IconBehance02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBehance02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-stroke-sharp IconBehance02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBehance02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="behance-02-solid-sharp IconBehance02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBehance02: TheIconSelfPack = {
  name: 'Behance02',
  StrokeRounded: IconBehance02StrokeRounded,
  DuotoneRounded: IconBehance02DuotoneRounded,
  TwotoneRounded: IconBehance02TwotoneRounded,
  SolidRounded: IconBehance02SolidRounded,
  BulkRounded: IconBehance02BulkRounded,
  StrokeSharp: IconBehance02StrokeSharp,
  SolidSharp: IconBehance02SolidSharp,
};