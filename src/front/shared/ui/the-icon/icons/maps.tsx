import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.25345 4.19584L4.02558 4.90813C3.03739 5.48137 2.54329 5.768 2.27164 6.24483C2 6.72165 2 7.30233 2 8.46368V16.6283C2 18.1542 2 18.9172 2.34226 19.3418C2.57001 19.6244 2.88916 19.8143 3.242 19.8773C3.77226 19.9719 4.42148 19.5953 5.71987 18.8421C6.60156 18.3306 7.45011 17.7994 8.50487 17.9435C8.98466 18.009 9.44231 18.2366 10.3576 18.6917L14.1715 20.588C14.9964 20.9982 15.004 21 15.9214 21H18C19.8856 21 20.8284 21 21.4142 20.4013C22 19.8026 22 18.8389 22 16.9117V10.1715C22 8.24423 22 7.2806 21.4142 6.68188C20.8284 6.08316 19.8856 6.08316 18 6.08316H15.9214C15.004 6.08316 14.9964 6.08139 14.1715 5.6712L10.8399 4.01463C9.44884 3.32297 8.75332 2.97714 8.01238 3.00117C7.27143 3.02521 6.59877 3.41542 5.25345 4.19584Z',
  d2: 'M8 3L8 17.5',
  d3: 'M15 6.5L15 20.5',
  d4: 'M4.02558 4.92016L5.25345 4.20331C6.59877 3.41788 7.27143 3.02517 8.01238 3.00098L8.0127 18.0189C7.22384 18.0624 6.54052 18.4628 5.84341 18.8712L5.71986 18.9435C4.4215 19.7016 3.77226 20.0806 3.242 19.9854C2.88916 19.922 2.57001 19.7308 2.34226 19.4465C2 19.0191 2 18.2512 2 16.7155V8.49853C2 7.32973 2 6.74533 2.27164 6.26544C2.54329 5.78556 3.03739 5.49709 4.02558 4.92016Z',
  d5: 'M20.5 20.9998H15L15.0003 6.04749C15.2235 6.10228 15.4547 6.10274 15.9214 6.10274H18C19.8856 6.10274 20.8284 6.10274 21.4142 6.7053C22 7.30786 22 8.27767 22 10.2173V19.4998C22 20.3282 21.3284 20.9998 20.5 20.9998Z',
  d6: 'M7.25 3.04038C7.25 2.71285 7.25 2.54908 7.13415 2.459C7.1208 2.44862 7.10281 2.43711 7.08779 2.42935C6.95744 2.36194 6.81999 2.42542 6.54509 2.55239C6.08426 2.76522 5.55431 3.07265 4.90724 3.44803L3.6187 4.19551L3.61869 4.19552C3.15062 4.46703 2.75247 4.69798 2.44084 4.92301C2.10848 5.163 1.82705 5.42851 1.61998 5.79199C1.4134 6.1546 1.32728 6.53324 1.28746 6.94353C1.24997 7.32991 1.24999 7.79625 1.25 8.3474V8.34743V8.34745V16.5865V16.5865V16.5865C1.24999 17.3156 1.24997 17.9184 1.29639 18.3899C1.34327 18.866 1.44676 19.3443 1.75833 19.7309C2.09802 20.1523 2.57688 20.4388 3.11024 20.534C3.60335 20.622 4.0707 20.4741 4.5015 20.2796C4.92742 20.0873 5.49919 19.7556 6.11822 19.3965C6.40134 19.2323 6.65459 19.0853 6.89091 18.9632C7.07195 18.8697 7.16247 18.8229 7.20624 18.751C7.25 18.6792 7.25 18.5846 7.25 18.3954L7.25 3.04038ZM8.75 18.2668C8.75 18.4694 8.75 18.5707 8.7977 18.6448C8.84539 18.719 8.94451 18.7641 9.14275 18.8544C9.36402 18.9553 9.64479 19.0933 10.0237 19.2816L13.8376 21.178C14.0293 21.2735 14.25 21.134 14.25 20.9198L14.25 5.1628C14.25 4.98195 14.25 4.89152 14.205 4.81893C14.16 4.74633 14.0791 4.70607 13.9171 4.62555L11.1426 3.24596L11.1425 3.24594C10.4736 2.91329 9.92553 2.64079 9.45232 2.45821C9.16027 2.34553 9.01425 2.28919 8.88544 2.3737C8.88226 2.37578 8.87831 2.3785 8.87522 2.38071C8.75 2.47047 8.75 2.63946 8.75 2.97744L8.75 18.2668ZM15.9214 5.25158C15.8268 5.25158 15.75 5.32812 15.75 5.42265L15.75 21.5589C15.75 21.6194 15.799 21.6685 15.8595 21.6684L18.0529 21.6684C18.9506 21.6684 19.7008 21.6685 20.2966 21.5866C20.9275 21.4999 21.4955 21.309 21.9503 20.8442C22.4028 20.3817 22.5866 19.8078 22.6704 19.1709C22.7501 18.5652 22.75 17.8013 22.75 16.8814V10.0386C22.75 9.11868 22.7501 8.35482 22.6704 7.74908C22.5866 7.11221 22.4028 6.53831 21.9503 6.07579C21.4955 5.61098 20.9275 5.42008 20.2966 5.3334C19.7008 5.25152 18.9506 5.25154 18.0529 5.25157L15.9214 5.25158Z',
  d7: 'M7.25 3.04069C7.25 2.71316 7.25 2.5494 7.13415 2.45931C7.1208 2.44893 7.10282 2.43743 7.08779 2.42966C6.95744 2.36226 6.81999 2.42574 6.54509 2.5527C6.08426 2.76554 5.55432 3.07297 4.90724 3.44835L3.6187 4.19583C3.15062 4.46734 2.75247 4.69829 2.44084 4.92332C2.10848 5.16332 1.82705 5.42882 1.61998 5.7923C1.4134 6.15492 1.32728 6.53355 1.28746 6.94385C1.24997 7.33022 1.24999 7.79655 1.25 8.3477V16.5868C1.24999 17.3159 1.24998 17.9188 1.29639 18.3903C1.34327 18.8663 1.44676 19.3446 1.75833 19.7312C2.09802 20.1527 2.57688 20.4392 3.11024 20.5343C3.60335 20.6223 4.0707 20.4744 4.5015 20.2799C4.92742 20.0876 5.49919 19.7559 6.11822 19.3968C6.40134 19.2326 6.6546 19.0856 6.89091 18.9635C7.07195 18.87 7.16247 18.8232 7.20624 18.7514C7.25 18.6795 7.25 18.5849 7.25 18.3957L7.25 3.04069Z',
  d8: 'M15.9214 5.25189C15.8268 5.25189 15.75 5.32844 15.75 5.42296L15.75 21.5592C15.75 21.6197 15.799 21.6688 15.8595 21.6687L18.0529 21.6687C18.9506 21.6688 19.7008 21.6688 20.2966 21.5869C20.9275 21.5002 21.4955 21.3093 21.9503 20.8445C22.4028 20.382 22.5866 19.8081 22.6704 19.1712C22.7501 18.5655 22.75 17.8016 22.75 16.8817V10.039C22.75 9.119 22.7501 8.35513 22.6704 7.7494C22.5866 7.11252 22.4028 6.53863 21.9503 6.0761C21.4955 5.6113 20.9275 5.4204 20.2966 5.33371C19.7008 5.25183 18.9506 5.25186 18.0529 5.25189L15.9214 5.25189Z',
  d9: 'M8.75 18.2658C8.75 18.4684 8.75 18.5697 8.7977 18.6438C8.84539 18.718 8.94451 18.7631 9.14275 18.8535C9.36402 18.9543 9.64479 19.0923 10.0237 19.2807L13.8376 21.177C14.0293 21.2725 14.25 21.133 14.25 20.9189V5.16182C14.25 4.98097 14.25 4.89055 14.205 4.81795C14.16 4.74535 14.0791 4.70509 13.9171 4.62457L11.1426 3.24498C10.4736 2.91233 9.92553 2.63981 9.45232 2.45723C9.16027 2.34455 9.01425 2.28821 8.88544 2.37272C8.88226 2.37481 8.87831 2.37752 8.87522 2.37973C8.75 2.46949 8.75 2.63848 8.75 2.97647L8.75 18.2658Z',
  d10: 'M8.01272 3.00098L2.00098 6.08297V20L8.01272 18L15.001 20.9998H22.001V6H15.001L8.01272 3.00098Z',
  d11: 'M1.65785 5.16391L7.25 2.29703L7.25 19.044L2.23675 20.7118C2.00807 20.7879 1.75676 20.7495 1.56129 20.6085C1.36582 20.4675 1.25 20.2412 1.25 20.0002V5.83131C1.25 5.54995 1.40747 5.29226 1.65785 5.16391Z',
  d12: 'M14.25 21.4942L8.75 19.1333L8.75 2.25L14.25 4.61034V21.4942Z',
  d13: 'M15.75 21.75H22C22.4142 21.75 22.75 21.4142 22.75 21V5.74835C22.75 5.33413 22.4142 4.99835 22 4.99835H15.75V21.75Z',
};

export const IconMapsStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-stroke-rounded IconMapsStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMapsDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-duotone-rounded IconMapsDuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      </g>
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
    </TheIconWrapper>
  );
};

export const IconMapsTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-twotone-rounded IconMapsTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMapsSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-solid-rounded IconMapsSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-bulk-rounded IconMapsBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-stroke-sharp IconMapsStrokeSharp"
    >
      <path 
        d={d.d10} 
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
    </TheIconWrapper>
  );
};

export const IconMapsSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-solid-sharp IconMapsSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfMaps: TheIconSelfPack = {
  name: 'Maps',
  StrokeRounded: IconMapsStrokeRounded,
  DuotoneRounded: IconMapsDuotoneRounded,
  TwotoneRounded: IconMapsTwotoneRounded,
  SolidRounded: IconMapsSolidRounded,
  BulkRounded: IconMapsBulkRounded,
  StrokeSharp: IconMapsStrokeSharp,
  SolidSharp: IconMapsSolidSharp,
};