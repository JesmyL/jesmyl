import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 16L12 17M12 17L13 18M12 17L13 16M12 17L11 18M15 20L16 21M16 21L17 22M16 21L17 20M16 21L15 22M7 20L8 21M8 21L9 22M8 21L9 20M8 21L7 22',
  d2: 'M17.4776 11.0091C17.485 11.0091 17.4925 11.0091 17.5 11.0091C19.9853 11.0091 22 13.0269 22 15.5159C22 17.0602 21.2245 18.2581 20.0422 19M17.4776 11.0091C17.4924 10.8442 17.5 10.6772 17.5 10.5083C17.5 7.46617 15.0376 5 12 5C9.12324 5 6.76233 7.21197 6.52042 10.0303M17.4776 11.0091C17.3753 12.1453 16.9286 13.182 16.2428 14.0136M6.52042 10.0303C3.98398 10.2721 2 12.4116 2 15.0152C2 16.7032 2.83398 18.113 4.1118 19M6.52042 10.0303C6.67826 10.0153 6.83823 10.0076 7 10.0076C8.12582 10.0076 9.16474 10.3802 10.0005 11.0091',
  d3: 'M2.95939 9.19373C2.21865 6.47179 3.85922 3.67397 6.6237 2.94463M2.95939 9.19373L2 9.44684M2.95939 9.19373C3.14359 9.87059 3.4577 10.479 3.86823 11M6.6237 2.94463L6.36663 2M6.6237 2.94463C8.66673 2.40563 10.7518 3.14719 12 4.66961M3.4765 5.32297L2.4644 4.74628M11.1407 2.45725L10.557 3.45494',
  d4: 'M17.5 10.5C17.5 7.46243 15.0376 5 12 5C9.12324 5 6.76233 7.20862 6.52042 10.0227C3.98398 10.2641 2 12.4003 2 15C2 17.7614 4.23858 20 7 20H17.5C19.9853 20 22 17.9853 22 15.5C22 13.0147 19.9853 11 17.5 11L17.4776 11.0001C17.4924 10.8354 17.5 10.6686 17.5 10.5Z',
  d5: 'M10.4179 15.1679C10.8084 14.7774 11.4416 14.7774 11.8321 15.1679L12.125 15.4608L12.4179 15.1679C12.8084 14.7774 13.4416 14.7774 13.8321 15.1679C14.2226 15.5584 14.2226 16.1916 13.8321 16.5821L13.5392 16.875L13.8321 17.1679C14.2226 17.5584 14.2226 18.1916 13.8321 18.5821C13.4416 18.9726 12.8084 18.9726 12.4179 18.5821L12.125 18.2892L11.8321 18.5821C11.4416 18.9726 10.8084 18.9726 10.4179 18.5821C10.0274 18.1916 10.0274 17.5584 10.4179 17.1679L10.7108 16.875L10.4179 16.5821C10.0274 16.1916 10.0274 15.5584 10.4179 15.1679ZM6.41789 19.1679C6.80842 18.7774 7.44158 18.7774 7.83211 19.1679L8.125 19.4608L8.41789 19.1679C8.80842 18.7774 9.44158 18.7774 9.83211 19.1679C10.2226 19.5584 10.2226 20.1916 9.83211 20.5821L9.53921 20.875L9.83211 21.1679C10.2226 21.5584 10.2226 22.1916 9.83211 22.5821C9.44158 22.9726 8.80842 22.9726 8.41789 22.5821L8.125 22.2892L7.83211 22.5821C7.44158 22.9726 6.80842 22.9726 6.41789 22.5821C6.02737 22.1916 6.02737 21.5584 6.41789 21.1679L6.71079 20.875L6.41789 20.5821C6.02737 20.1916 6.02737 19.5584 6.41789 19.1679ZM14.4179 19.1679C14.8084 18.7774 15.4416 18.7774 15.8321 19.1679L16.125 19.4608L16.4179 19.1679C16.8084 18.7774 17.4416 18.7774 17.8321 19.1679C18.2226 19.5584 18.2226 20.1916 17.8321 20.5821L17.5392 20.875L17.8321 21.1679C18.2226 21.5584 18.2226 22.1916 17.8321 22.5821C17.4416 22.9726 16.8084 22.9726 16.4179 22.5821L16.125 22.2892L15.8321 22.5821C15.4416 22.9726 14.8084 22.9726 14.4179 22.5821C14.0274 22.1916 14.0274 21.5584 14.4179 21.1679L14.7108 20.875L14.4179 20.5821C14.0274 20.1916 14.0274 19.5584 14.4179 19.1679Z',
  d6: 'M1.375 15.125C1.375 12.4833 3.15606 10.2582 5.58325 9.58419C5.77924 9.52976 5.87724 9.50255 5.93372 9.4447C5.9902 9.38684 6.01491 9.28884 6.06431 9.09283C6.74772 6.38153 9.20171 4.375 12.125 4.375C15.3399 4.375 17.9878 6.80231 18.3362 9.92424C18.3635 10.1696 18.3772 10.2923 18.4397 10.3633C18.5022 10.4343 18.6239 10.4638 18.8673 10.5229C21.1672 11.0809 22.875 13.1535 22.875 15.625C22.875 17.4265 21.9676 19.0161 20.5849 19.9617C20.2299 20.2044 20.0524 20.3258 19.904 20.2668C19.7556 20.2077 19.693 19.9194 19.568 19.3428C19.4698 18.89 19.2447 18.4592 18.8928 18.1072C18.1998 17.4143 17.2012 17.2131 16.3308 17.5039C16.236 17.5356 16.1886 17.5515 16.1554 17.5548C16.1297 17.5574 16.1206 17.5574 16.0948 17.5548C16.0617 17.5515 16.0139 17.5355 15.9183 17.5036C15.7718 17.4547 15.6985 17.4303 15.6599 17.4016C15.6295 17.3789 15.6211 17.3705 15.5984 17.3401C15.5697 17.3015 15.5453 17.2282 15.4964 17.0817C15.4645 16.9861 15.4485 16.9383 15.4452 16.9052C15.4426 16.8795 15.4426 16.8703 15.4452 16.8446C15.4486 16.8115 15.4644 16.764 15.4961 16.6692C15.7869 15.7988 15.5858 14.8002 14.8928 14.1072C14.2101 13.4246 13.2309 13.2193 12.3699 13.4912C12.2375 13.533 12.1712 13.554 12.125 13.554C12.0788 13.554 12.0125 13.533 11.8801 13.4912C11.0191 13.2193 10.0399 13.4246 9.35723 14.1072C8.66425 14.8002 8.46314 15.7988 8.75392 16.6692C8.7856 16.764 8.80145 16.8114 8.80482 16.8446C8.80743 16.8703 8.80744 16.8795 8.80483 16.9052C8.80147 16.9383 8.78551 16.9861 8.75362 17.0817C8.70473 17.2282 8.68029 17.3015 8.65158 17.3401C8.62893 17.3705 8.62049 17.3789 8.59007 17.4016C8.55149 17.4303 8.47823 17.4547 8.33172 17.5036C8.23612 17.5355 8.1883 17.5515 8.15518 17.5548C8.12945 17.5574 8.12029 17.5574 8.09457 17.5548C8.06145 17.5514 8.014 17.5356 7.91918 17.5039C7.04881 17.2131 6.05022 17.4143 5.35723 18.1072C5.05107 18.4134 4.84092 18.7792 4.72678 19.1673C4.5619 19.7278 4.47946 20.0081 4.33021 20.0574C4.18096 20.1068 4.00973 19.9777 3.66727 19.7196C2.27505 18.6702 1.375 17.0027 1.375 15.125Z',
  d7: 'M6.22929 1.16034C6.76219 1.01532 7.31176 1.32976 7.45678 1.86266L7.47389 1.92553C8.44507 1.82839 9.40219 1.96263 10.2781 2.2906L10.4028 2.07756C10.6816 1.60085 11.2941 1.44048 11.7708 1.71935C12.2476 1.99823 12.4079 2.61074 12.1291 3.08745L12.0147 3.28289C12.3369 3.54372 12.6335 3.83747 12.8986 4.16085C13.2487 4.58794 13.1864 5.21803 12.7593 5.56818C12.3322 5.91834 11.7021 5.85596 11.3519 5.42887C11.0298 5.03591 10.6379 4.70712 10.1996 4.45603C10.1922 4.4519 10.1847 4.44768 10.1773 4.44335C10.1771 4.4432 10.1768 4.44305 10.1766 4.44291C9.25021 3.91983 8.12001 3.74237 7.00404 4.0368C5.88318 4.33251 4.99615 5.04484 4.46372 5.95517C3.93212 6.86407 3.754 7.97035 4.04955 9.05639C4.19767 9.60068 4.44963 10.0884 4.77892 10.5063C5.12075 10.9401 5.0462 11.5689 4.61241 11.9107C4.17862 12.2525 3.54986 12.178 3.20803 11.7442C2.91419 11.3713 2.6616 10.9609 2.45888 10.5183L2.38034 10.539C1.84633 10.6799 1.29922 10.3612 1.15833 9.82719C1.01744 9.29318 1.33614 8.74606 1.87015 8.60518L1.93583 8.58785C1.84135 7.64114 1.97547 6.71023 2.30013 5.85751L2.09458 5.74038C1.61472 5.46696 1.44737 4.85631 1.72079 4.37646C1.99421 3.8966 2.60486 3.72925 3.08472 4.00267L3.30852 4.1302C3.8993 3.41778 4.65648 2.83226 5.54068 2.43824L5.52697 2.38784C5.38194 1.85493 5.69638 1.30537 6.22929 1.16034Z',
  d8: 'M7.45678 1.86266C7.31176 1.32976 6.76219 1.01532 6.22929 1.16034C5.69638 1.30537 5.38194 1.85493 5.52697 2.38784L5.54068 2.43824C4.65648 2.83226 3.8993 3.41778 3.30852 4.1302L3.08472 4.00267C2.60486 3.72925 1.99421 3.8966 1.72079 4.37646C1.44737 4.85631 1.61472 5.46696 2.09458 5.74038L2.30013 5.85751C1.97547 6.71023 1.84135 7.64114 1.93583 8.58785L1.87015 8.60518C1.33614 8.74606 1.01744 9.29318 1.15833 9.82719C1.29922 10.3612 1.84633 10.6799 2.38034 10.539L2.45888 10.5183C2.57779 10.7779 2.71385 11.0264 2.86534 11.2628C3.31725 10.7648 3.85533 10.3464 4.45607 10.031C4.28246 9.73178 4.14462 9.40573 4.04955 9.05639C3.754 7.97035 3.93212 6.86407 4.46372 5.95517C4.99615 5.04484 5.88318 4.33251 7.00404 4.0368C8.12001 3.74237 9.25021 3.91983 10.1766 4.44291C10.184 4.44724 10.1922 4.4519 10.1996 4.45603C10.2815 4.50296 10.3618 4.55261 10.4404 4.60489C10.9763 4.45525 11.5413 4.37524 12.125 4.37524C12.4436 4.37524 12.7566 4.39908 13.0624 4.44507C13.0248 4.34457 12.9704 4.24844 12.8986 4.16085C12.6335 3.83747 12.3369 3.54372 12.0147 3.28289L12.1291 3.08745C12.4079 2.61074 12.2476 1.99823 11.7708 1.71935C11.2941 1.44048 10.6816 1.60085 10.4028 2.07756L10.2781 2.2906C9.40219 1.96263 8.44507 1.82839 7.47389 1.92553L7.45678 1.86266Z',
  d9: 'M11.302 15L12.502 16.1429M12.502 16.1429L13.702 17.2857M12.502 16.1429L13.702 15M12.502 16.1429L11.302 17.2857M15.102 19.7143L16.302 20.8571M16.302 20.8571L17.502 22M16.302 20.8571L17.502 19.7143M16.302 20.8571L15.102 22M7.50195 19.7143L8.70195 20.8571M8.70195 20.8571L9.90195 22M8.70195 20.8571L9.90195 19.7143M8.70195 20.8571L7.50195 22',
  d10: 'M17.9795 11.0091C17.987 11.0091 17.9945 11.0091 18.002 11.0091C20.4872 11.0091 22.502 13.0269 22.502 15.5159C22.502 17.0602 21.7264 18.2581 20.5441 19M17.9795 11.0091C17.9944 10.8442 18.002 10.6772 18.002 10.5083C18.002 7.46617 15.5395 5 12.502 5C9.62519 5 7.26428 7.21197 7.02238 10.0303M17.9795 11.0091C17.8773 12.1453 17.4306 13.182 16.7448 14.0136M7.02238 10.0303C4.48593 10.2721 2.50195 12.4116 2.50195 15.0152C2.50195 16.7032 3.33593 18.113 4.61375 19M7.02238 10.0303C7.18021 10.0153 7.34018 10.0076 7.50195 10.0076C8.62778 10.0076 9.6667 10.3802 10.5024 11.0091',
  d11: 'M7.45538 4V2M7.45538 4C5.26267 4 3.48513 5.79086 3.48513 8M7.45538 4C8.67809 4 9.7717 4.55686 10.5 5.43258M1.5 8H3.48513M3.48513 8C3.48513 9.19469 4.00499 10.2671 4.82923 11M3.24459 3.75766L4.64829 5.17188',
  d12: 'M6.353 8.36454C3.72664 8.89643 1.75 11.217 1.75 14C1.75 16.3076 3.10932 18.2977 5.07091 19.2132L10.8176 13.2734H14.1833L20.0407 19.3386C21.9265 18.5423 23.25 16.6757 23.25 14.5C23.25 11.8541 21.2927 9.66534 18.7469 9.30273C18.6428 5.94224 15.8858 3.25 12.5 3.25C9.43585 3.25 6.88731 5.45456 6.353 8.36454Z',
  d13: 'M5.70538 2.35111C5.07484 2.48056 4.48827 2.73001 3.96989 3.07449L3.20433 2.3032L1.78485 3.71212L2.55911 4.49218C2.21331 5.01742 1.96355 5.61191 1.83467 6.25H0.75V8.25H1.83468C2.05366 9.33422 2.62153 10.2919 3.41473 10.9973L4.74374 9.50272C4.1249 8.95242 3.73513 8.14859 3.73513 7.25C3.73513 5.5861 5.07198 4.25 6.70538 4.25C7.61697 4.25 8.4337 4.66374 8.98114 5.322L10.5189 4.04315C9.81277 3.19414 8.82841 2.5823 7.70538 2.35134V1.25H5.70538V2.35111Z',
  d14: 'M12.5002 14.9383L13.1169 14.3281L14.5236 15.7498L13.922 16.3451L14.5236 16.9404L13.1169 18.362L12.5002 17.7519L11.8836 18.362L10.4769 16.9404L11.0785 16.3451L10.4769 15.7498L11.8836 14.3281L12.5002 14.9383ZM6.89849 20.7328L6.29688 20.1375L7.7036 18.7159L8.32024 19.326L8.93688 18.7159L10.3436 20.1375L9.74198 20.7328L10.3436 21.3281L8.93688 22.7498L8.32024 22.1396L7.7036 22.7498L6.29688 21.3281L6.89849 20.7328ZM15.2585 20.7328L14.6569 20.1375L16.0636 18.7159L16.6802 19.326L17.2969 18.7159L18.7036 20.1375L18.102 20.7328L18.7036 21.3281L17.2969 22.7498L16.6802 22.1396L16.0636 22.7498L14.6569 21.3281L15.2585 20.7328Z',
};

export const IconSunCloudLittleSnow02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-stroke-rounded IconSunCloudLittleSnow02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloudLittleSnow02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-duotone-rounded IconSunCloudLittleSnow02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
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
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSunCloudLittleSnow02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-twotone-rounded IconSunCloudLittleSnow02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconSunCloudLittleSnow02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-solid-rounded IconSunCloudLittleSnow02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconSunCloudLittleSnow02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-bulk-rounded IconSunCloudLittleSnow02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSunCloudLittleSnow02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-stroke-sharp IconSunCloudLittleSnow02StrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSunCloudLittleSnow02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sun-cloud-little-snow-02-solid-sharp IconSunCloudLittleSnow02SolidSharp"
    >
      <path 
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

export const iconPackOfSunCloudLittleSnow02: TheIconSelfPack = {
  name: 'SunCloudLittleSnow02',
  StrokeRounded: IconSunCloudLittleSnow02StrokeRounded,
  DuotoneRounded: IconSunCloudLittleSnow02DuotoneRounded,
  TwotoneRounded: IconSunCloudLittleSnow02TwotoneRounded,
  SolidRounded: IconSunCloudLittleSnow02SolidRounded,
  BulkRounded: IconSunCloudLittleSnow02BulkRounded,
  StrokeSharp: IconSunCloudLittleSnow02StrokeSharp,
  SolidSharp: IconSunCloudLittleSnow02SolidSharp,
};