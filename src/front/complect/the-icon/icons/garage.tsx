import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.7812 3.09766L5.6718 5.89369C4.3639 6.78359 3.70995 7.22854 3.35498 7.90548C3 8.58242 3 9.38456 3 10.9888V17.9176C3 19.8421 3 20.8043 3.58579 21.4021C4.17157 22 5.11438 22 7 22H17C18.8856 22 19.8284 22 20.4142 21.4021C21 20.8043 21 19.8421 21 17.9176V10.9888C21 9.38456 21 8.58242 20.645 7.90548C20.29 7.22854 19.6361 6.78359 18.3282 5.89369L14.2188 3.09766C13.1433 2.36589 12.6056 2 12 2C11.3944 2 10.8567 2.36589 9.7812 3.09766Z',
  d2: 'M7 22V15C7 13.1144 7 12.1716 7.58579 11.5858C8.17157 11 9.11438 11 11 11H13C14.8856 11 15.8284 11 16.4142 11.5858C17 12.1716 17 13.1144 17 15V22',
  d3: 'M7 14H17',
  d4: 'M7 18H17',
  d5: 'M12.008 7L11.999 7',
  d6: 'M5.6718 5.89369L9.7812 3.09766C10.8567 2.36588 11.3944 2 12 2C12.6056 2 13.1433 2.36588 14.2188 3.09766L18.3282 5.89369C19.6361 6.78359 20.29 7.22854 20.645 7.90548C21 8.58242 21 9.38456 21 10.9888V17.9176C21 19.8421 21 20.8043 20.4142 21.4021C19.8284 22 18.8856 22 17 22V15C17 13.1144 17 12.1716 16.4142 11.5858C15.8284 11 14.8856 11 13 11H11C9.11438 11 8.17157 11 7.58579 11.5858C7 12.1716 7 13.1144 7 15V22C5.11438 22 4.17157 22 3.58579 21.4021C3 20.8043 3 19.8421 3 17.9176V10.9888C3 9.38456 3 8.58242 3.35498 7.90548C3.70995 7.22854 4.3639 6.78359 5.6718 5.89369Z',
  d7: 'M11 11H13C14.8856 11 15.8284 11 16.4142 11.5858C17 12.1716 17 13.1144 17 15V22H7V15C7 13.1144 7 12.1716 7.58579 11.5858C8.17157 11 9.11438 11 11 11Z',
  d8: 'M12.008 7H11.999',
  d9: 'M7.00781 22V15C7.00781 13.1144 7.00781 12.1716 7.5936 11.5858C8.17938 11 9.12219 11 11.0078 11H13.0078C14.8934 11 15.8362 11 16.422 11.5858C17.0078 12.1716 17.0078 13.1144 17.0078 15V22M7.00781 14H17.0078M7.00781 18H17.0078',
  d10: 'M13.052 10.25C13.9505 10.25 14.6997 10.2499 15.2945 10.3299C15.9223 10.4143 16.4891 10.6 16.9445 11.0555C17.4 11.5109 17.5857 12.0777 17.6701 12.7055C17.7169 13.0536 17.7363 13.4545 17.7443 13.9073C17.7481 13.9377 17.75 13.9686 17.75 14C17.75 14.0238 17.7489 14.0473 17.7467 14.0705C17.75 14.345 17.75 14.6375 17.75 14.9478V14.948V14.948L17.75 22.144C17.75 22.4308 17.75 22.5742 17.8412 22.6626C17.9324 22.751 18.073 22.7466 18.3544 22.7379C18.7021 22.7271 19.0163 22.7067 19.2965 22.6683C19.9271 22.5818 20.4951 22.3912 20.9499 21.927C21.4027 21.465 21.5865 20.8916 21.6704 20.2553C21.7501 19.6503 21.75 18.8874 21.75 17.9689V10.9546V10.9545C21.75 10.1815 21.75 9.5511 21.7025 9.03117C21.653 8.48866 21.5483 8.01297 21.3092 7.55718C21.0699 7.10072 20.7389 6.74627 20.3219 6.40147C19.9234 6.07188 19.4084 5.72153 18.779 5.29329L14.6079 2.45528L14.6079 2.45524L14.6078 2.45522L14.6078 2.45519L14.6077 2.45514C14.098 2.10831 13.666 1.81433 13.2849 1.61199C12.8794 1.39671 12.4697 1.25 12 1.25C11.5303 1.25 11.1206 1.39671 10.7151 1.61199C10.334 1.81436 9.90187 2.10838 9.39208 2.45527L5.22102 5.29326L5.221 5.29328C4.59157 5.72153 4.07664 6.07188 3.67808 6.40147C3.26113 6.74627 2.93012 7.10072 2.69076 7.55718C2.45175 8.01297 2.34705 8.48866 2.29748 9.03117C2.24998 9.5511 2.24999 10.1815 2.25 10.9545V10.9545L2.25 17.9689V17.9689C2.24997 18.8874 2.24995 19.6503 2.32965 20.2553C2.41347 20.8916 2.59735 21.465 3.05008 21.927C3.5049 22.3912 4.07288 22.5818 4.7035 22.6683C4.98366 22.7067 5.29794 22.7271 5.64565 22.7379C5.92698 22.7466 6.06764 22.751 6.15882 22.6626C6.25 22.5742 6.25 22.4308 6.25 22.144L6.25 18.0012L6.25 18L6.25 17.9988L6.25 14.948V14.948V14.9479V14.9479C6.24999 14.6376 6.24998 14.345 6.25327 14.0705C6.25111 14.0473 6.25 14.0238 6.25 14C6.25 13.9686 6.25193 13.9376 6.25568 13.9073C6.26372 13.4545 6.28312 13.0536 6.32991 12.7055C6.41432 12.0777 6.59999 11.5109 7.05546 11.0555C7.51093 10.6 8.07773 10.4143 8.70552 10.3299C9.3003 10.2499 10.0495 10.25 10.948 10.25H10.948H13.052H13.052ZM8.35 22.75C8.06716 22.75 7.92574 22.75 7.83787 22.6621C7.75 22.5743 7.75 22.4328 7.75 22.15V19.35C7.75 19.0672 7.75 18.9257 7.83787 18.8379C7.92574 18.75 8.06716 18.75 8.35 18.75H15.65C15.9328 18.75 16.0743 18.75 16.1621 18.8379C16.25 18.9257 16.25 19.0672 16.25 19.35V22.15C16.25 22.4328 16.25 22.5743 16.1621 22.6621C16.0743 22.75 15.9328 22.75 15.65 22.75H8.35ZM16.25 16.65C16.25 16.9328 16.25 17.0743 16.1621 17.1621C16.0743 17.25 15.9328 17.25 15.65 17.25H8.35C8.06716 17.25 7.92574 17.25 7.83787 17.1621C7.75 17.0743 7.75 16.9328 7.75 16.65V15C7.75005 14.8619 7.862 14.75 8.00009 14.75L15.9999 14.75C16.138 14.75 16.25 14.8619 16.25 15V16.65ZM8.12856 13.25C8.11192 13.25 8.1036 13.25 8.09399 13.2494C7.93477 13.2391 7.80289 13.0883 7.81396 12.9292C7.81463 12.9196 7.81527 12.9148 7.81654 12.9054C7.87858 12.4439 7.9858 12.2464 8.11612 12.1161C8.24644 11.9858 8.44393 11.8786 8.90539 11.8165C9.38843 11.7516 10.036 11.75 11 11.75H13C13.964 11.75 14.6116 11.7516 15.0946 11.8165C15.5561 11.8786 15.7536 11.9858 15.8839 12.1161C16.0142 12.2464 16.1214 12.4439 16.1835 12.9054C16.1847 12.9148 16.1854 12.9196 16.186 12.9292C16.1971 13.0883 16.0652 13.2391 15.906 13.2494C15.8964 13.25 15.8881 13.25 15.8714 13.25L8.12856 13.25ZM12.0078 8C12.5601 8 13.0078 7.55229 13.0078 7C13.0078 6.44772 12.5601 6 12.0078 6H11.9988C11.4465 6 10.9988 6.44772 10.9988 7C10.9988 7.55228 11.4465 8 11.9988 8H12.0078Z',
  d11: 'M10.7151 1.61199C11.1206 1.39671 11.5303 1.25 12 1.25C12.4697 1.25 12.8794 1.39671 13.2849 1.61199C13.666 1.81436 14.0981 2.10839 14.6079 2.45528L18.779 5.29329C19.4084 5.72153 19.9234 6.07188 20.3219 6.40147C20.7389 6.74627 21.0699 7.10072 21.3092 7.55718C21.5483 8.01297 21.653 8.48866 21.7025 9.03117C21.75 9.5511 21.75 10.1815 21.75 10.9545V10.9546V17.9689C21.75 18.8874 21.7501 19.6503 21.6704 20.2553C21.5865 20.8916 21.4027 21.465 20.9499 21.927C20.4951 22.3912 19.9271 22.5818 19.2965 22.6683C18.7007 22.7501 17.9506 22.75 17.0529 22.75H6.94715C6.04941 22.75 5.2993 22.7501 4.7035 22.6683C4.07288 22.5818 3.5049 22.3912 3.05008 21.927C2.59735 21.465 2.41347 20.8916 2.32965 20.2553C2.24995 19.6503 2.24997 18.8874 2.25 17.9689V17.9689V10.9545V10.9545C2.24999 10.1815 2.24998 9.5511 2.29748 9.03117C2.34705 8.48866 2.45175 8.01297 2.69076 7.55718C2.93012 7.10072 3.26113 6.74627 3.67808 6.40147C4.07664 6.07188 4.59157 5.72153 5.221 5.29328L5.22102 5.29326L9.39208 2.45527C9.90187 2.10838 10.334 1.81436 10.7151 1.61199Z',
  d12: 'M13.0078 7C13.0078 7.55228 12.5601 8 12.0078 8L11.9988 8C11.4465 8 10.9988 7.55228 10.9988 7C10.9988 6.44771 11.4465 6 11.9988 6L12.0078 6C12.5601 6 13.0078 6.44772 13.0078 7Z',
  d13: 'M15.2945 10.3299C14.6997 10.2499 13.9505 10.25 13.052 10.25H13.052H10.948H10.948C10.0495 10.25 9.3003 10.2499 8.70552 10.3299C8.07773 10.4143 7.51093 10.6 7.05546 11.0555C6.59999 11.5109 6.41432 12.0777 6.32991 12.7055C6.30719 12.8746 6.29092 13.0561 6.27928 13.25L17.7207 13.25C17.7091 13.0561 17.6928 12.8746 17.6701 12.7055C17.5857 12.0777 17.4 11.5109 16.9445 11.0555C16.4891 10.6 15.9223 10.4143 15.2945 10.3299ZM17.75 14.75L6.25003 14.75C6.25 14.8152 6.25 14.8811 6.25 14.9479V14.948V14.948L6.25 17.25H17.75L17.75 14.948V14.948C17.75 14.8812 17.75 14.8152 17.75 14.75ZM17.75 18.75H6.25L6.25 22.75H7.75H16.25H17.75L17.75 18.75Z',
  d14: 'M17.0228 12.959H7.01465V21.999H17.0228V12.959Z',
  d15: 'M7.01465 15.9727H17.0228M7.01465 18.986H17.0228',
  d16: 'M12.0276 6.93262H12.0186',
  d17: 'M7.12879 21.9989H2.99805L3.10723 8.00163C3.10749 7.96846 3.12405 7.93755 3.15149 7.91905L11.9012 2.01805C11.9347 1.99549 11.9784 1.99527 12.012 2.01749L20.9573 7.91886C20.9855 7.93743 21.0024 7.96898 21.0024 8.00279V21.9989H16.8642',
  d18: 'M6.25 13C6.25 12.5858 6.58579 12.25 7 12.25H17C17.4142 12.25 17.75 12.5858 17.75 13V22.75H21.75V8C21.75 7.74924 21.6247 7.51506 21.416 7.37596L12.416 1.37596C12.1641 1.20801 11.8359 1.20801 11.584 1.37596L2.58397 7.37596C2.37533 7.51506 2.25 7.74924 2.25 8V22.75H6.25V13ZM10.9988 8H13.0078V6H10.9988V8Z',
  d19: 'M7.75 22.75H16.25V19.75H7.75V22.75Z',
  d20: 'M7.75 16.75V18.25H16.25V16.75H7.75Z',
  d21: 'M16.25 15.25H7.75V13.75H16.25V15.25Z',
};

export const IconGarageStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-stroke-rounded IconGarageStrokeRounded"
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

export const IconGarageDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-duotone-rounded IconGarageDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
        d={d.d7} 
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

export const IconGarageTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-twotone-rounded IconGarageTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGarageSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-solid-rounded IconGarageSolidRounded"
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

export const IconGarageBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-bulk-rounded IconGarageBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGarageStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-stroke-sharp IconGarageStrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconGarageSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="garage-solid-sharp IconGarageSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfGarage: TheIconSelfPack = {
  name: 'Garage',
  StrokeRounded: IconGarageStrokeRounded,
  DuotoneRounded: IconGarageDuotoneRounded,
  TwotoneRounded: IconGarageTwotoneRounded,
  SolidRounded: IconGarageSolidRounded,
  BulkRounded: IconGarageBulkRounded,
  StrokeSharp: IconGarageStrokeSharp,
  SolidSharp: IconGarageSolidSharp,
};