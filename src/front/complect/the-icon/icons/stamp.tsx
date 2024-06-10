import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.6667 21H6.33333C6.02334 21 5.86835 21 5.74118 20.9574C5.39609 20.8418 5.12654 20.5049 5.03407 20.0735C5 19.9146 5 19.7208 5 19.3333C5 18.5584 5 18.1709 5.06815 17.853C5.25308 16.9902 5.79218 16.3164 6.48236 16.0852C6.7367 16 7.04669 16 7.66667 16H16.3333C16.9533 16 17.2633 16 17.5176 16.0852C18.2078 16.3164 18.7469 16.9902 18.9319 17.853C19 18.1709 19 18.5584 19 19.3333C19 19.7208 19 19.9146 18.9659 20.0735C18.8735 20.5049 18.6039 20.8418 18.2588 20.9574C18.1317 21 17.9767 21 17.6667 21Z',
  d2: 'M9.50044 16C10.0151 13.4523 10.0845 11.9663 9.75631 11.0497C9.68503 10.8507 9.56363 10.6749 9.44039 10.5034C8.62715 9.37155 8.25775 8.48762 8.11746 7.94129C8.03527 7.62119 8.0097 7.28611 8.02447 6.95595C8.0513 6.35609 8.2462 5.4471 8.87882 4.56208C9.72889 3.37285 11.3129 3.007 12.0004 3C12.688 3.007 14.3133 3.37285 15.1634 4.56208C15.796 5.4471 15.9909 6.35609 16.0177 6.95595C16.0325 7.28611 16.0069 7.62119 15.9247 7.94129C15.7845 8.48762 15.4151 9.37155 14.6018 10.5034C14.4786 10.6749 14.3572 10.8507 14.2859 11.0497C13.9577 11.9663 13.9858 13.4523 14.5004 16',
  d3: 'M14 13H10',
  d4: 'M12 3C9.79086 3 8 4.81884 8 7.0625C8 8.03146 8.33401 8.92119 8.89147 9.6194C9.50515 10.388 10.0632 11.296 9.96621 12.2807L9.88298 12.9447H14.117L14.0338 12.2807C13.9368 11.296 14.4948 10.388 15.1085 9.6194C15.666 8.92119 16 8.03146 16 7.0625C16 4.81884 14.2091 3 12 3Z',
  d5: 'M9.49849 16C10.0131 13.4523 10.0825 11.9663 9.75436 11.0497C9.68308 10.8507 9.56168 10.6749 9.43844 10.5034C8.6252 9.37155 8.2558 8.48762 8.11551 7.94129C8.03332 7.62119 8.00775 7.28611 8.02252 6.95595C8.04935 6.35609 8.24425 5.4471 8.87687 4.56208C9.72694 3.37285 11.3109 3.007 11.9984 3C12.686 3.007 14.3113 3.37285 15.1614 4.56208C15.794 5.4471 15.9889 6.35609 16.0157 6.95595C16.0305 7.28611 16.0049 7.62119 15.9227 7.94129C15.7825 8.48762 15.4131 9.37155 14.5998 10.5034C14.4766 10.6749 14.3552 10.8507 14.2839 11.0497C13.9557 11.9663 13.9838 13.4523 14.4984 16',
  d6: 'M9.49947 16C10.0141 13.4523 10.0835 11.9663 9.75533 11.0497C9.68405 10.8507 9.56265 10.6749 9.43941 10.5034C8.62617 9.37155 8.25677 8.48762 8.11649 7.94129C8.03429 7.62119 8.00872 7.28611 8.02349 6.95595C8.05032 6.35609 8.24522 5.4471 8.87785 4.56208C9.72792 3.37285 11.3119 3.007 11.9995 3C12.687 3.007 14.3123 3.37285 15.1624 4.56208C15.795 5.4471 15.9899 6.35609 16.0168 6.95595C16.0315 7.28611 16.006 7.62119 15.9238 7.94129C15.7835 8.48762 15.4141 9.37155 14.6008 10.5034C14.4776 10.6749 14.3562 10.8507 14.2849 11.0497C13.9567 11.9663 13.9848 13.4523 14.4995 16M13.9995 13H9.99951',
  d7: 'M7.56011 15.2501H16.44C16.9535 15.2495 17.3823 15.249 17.7559 15.3742C18.7542 15.7085 19.4386 16.6384 19.6653 17.6959C19.7504 18.093 19.7503 18.5551 19.7501 19.2379C19.7504 19.5558 19.7506 19.9918 19.6993 20.2309C19.5651 20.857 19.1503 21.45 18.4971 21.6687C18.2485 21.752 17.9706 21.7511 17.733 21.7503L6.26716 21.7503C6.0295 21.7511 5.75163 21.752 5.50306 21.6687C4.84987 21.45 4.43502 20.857 4.30081 20.2309C4.24955 19.9918 4.2498 19.5558 4.25006 19.2379C4.24988 18.5551 4.24977 18.093 4.33488 17.6959C4.56157 16.6384 5.24595 15.7085 6.24424 15.3742C6.61789 15.249 7.04667 15.2495 7.56011 15.2501Z',
  d8: 'M13.1794 13.8499H10.8206L10.5676 15.9035C10.5024 16.4332 10.0274 16.8088 9.50684 16.7424C8.98625 16.676 8.61712 16.1927 8.68238 15.663L9.12348 12.0823C9.17069 11.5448 8.87019 10.9394 8.3045 10.2185C7.6445 9.37737 7.25 8.30597 7.25 7.14372C7.25 4.45518 9.36282 2.25 12 2.25C14.6372 2.25 16.75 4.45518 16.75 7.14372C16.75 8.30597 16.3555 9.37737 15.6955 10.2185C15.1298 10.9394 14.8293 11.5448 14.8765 12.0823L15.3176 15.663C15.3829 16.1927 15.0138 16.676 14.4932 16.7424C13.9726 16.8088 13.4976 16.4332 13.4324 15.9035L13.1794 13.8499Z',
  d9: 'M5 18C5 16.8954 5.89543 16 7 16H17C18.1046 16 19 16.8954 19 18V21H5V18Z',
  d10: 'M14.5 16L14 10.4649C15.1956 9.77325 16 8.48056 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 8.48056 8.8044 9.77325 10 10.4649L9.5 16',
  d11: 'M4.25 18C4.25 16.4812 5.48122 15.25 7 15.25H17C18.5188 15.25 19.75 16.4812 19.75 18V21C19.75 21.4142 19.4142 21.75 19 21.75H5C4.58579 21.75 4.25 21.4142 4.25 21V18Z',
  d12: 'M13.2495 13.85H10.7505L10.5711 15.8702C10.5239 16.402 10.0621 16.7941 9.53953 16.746C9.01699 16.698 8.63165 16.228 8.67885 15.6963L9.10339 10.9141C7.97755 10.0314 7.25 8.64423 7.25 7.08331C7.25 4.41395 9.37665 2.25 12 2.25C14.6234 2.25 16.75 4.41395 16.75 7.08331C16.75 8.64423 16.0225 10.0314 14.8966 10.9141L15.3211 15.6963C15.3684 16.228 14.983 16.698 14.4605 16.746C13.9379 16.7941 13.4761 16.402 13.4289 15.8702L13.2495 13.85Z',
};

export const IconStampStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-stroke-rounded IconStampStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeMiterlimit="10" 
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
      />
    </TheIconWrapper>
  );
};

export const IconStampDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-duotone-rounded IconStampDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeMiterlimit="10" 
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconStampTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-twotone-rounded IconStampTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeMiterlimit="10" 
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

export const IconStampSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-solid-rounded IconStampSolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStampBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-bulk-rounded IconStampBulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconStampStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-stroke-sharp IconStampStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconStampSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="stamp-solid-sharp IconStampSolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfStamp: TheIconSelfPack = {
  name: 'Stamp',
  StrokeRounded: IconStampStrokeRounded,
  DuotoneRounded: IconStampDuotoneRounded,
  TwotoneRounded: IconStampTwotoneRounded,
  SolidRounded: IconStampSolidRounded,
  BulkRounded: IconStampBulkRounded,
  StrokeSharp: IconStampStrokeSharp,
  SolidSharp: IconStampSolidSharp,
};