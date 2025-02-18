import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5',
  d2: 'M11.0005 19.4892C11.0005 19.4892 10.0696 19.5136 9.09925 19.4892C5.95057 19.4099 4.37623 19.3703 3.24503 18.2332C2.11384 17.096 2.08115 15.5609 2.01577 12.4907C1.99474 11.5036 1.99474 10.5222 2.01577 9.53502C2.08114 6.46485 2.11383 4.92976 3.24503 3.7926C4.37623 2.65545 5.95057 2.61584 9.09925 2.53662C11.0399 2.48779 12.9614 2.48779 14.902 2.53662C18.0506 2.61585 19.625 2.65547 20.7562 3.79262C21.8874 4.92977 21.9201 6.46486 21.9854 9.53504C21.993 9.89243 21.9979 10.5116 22 11.0129',
  d3: 'M18 20.2143V21.5M18 20.2143C16.8432 20.2143 15.8241 19.6461 15.2263 18.7833M18 20.2143C19.1568 20.2143 20.1759 19.6461 20.7737 18.7833M18 13.7857C19.1569 13.7857 20.1761 14.354 20.7738 15.2169M18 13.7857C16.8431 13.7857 15.8239 14.354 15.2262 15.2169M18 13.7857V12.5M22 14.4286L20.7738 15.2169M14.0004 19.5714L15.2263 18.7833M14 14.4286L15.2262 15.2169M21.9996 19.5714L20.7737 18.7833M20.7738 15.2169C21.1273 15.7271 21.3333 16.3403 21.3333 17C21.3333 17.6597 21.1272 18.273 20.7737 18.7833M15.2262 15.2169C14.8727 15.7271 14.6667 16.3403 14.6667 17C14.6667 17.6597 14.8728 18.273 15.2263 18.7833',
  d4: 'M14.9012 19.4647C12.9607 19.5118 11.0393 19.5118 9.09883 19.4647C5.95033 19.3883 4.37608 19.3501 3.24496 18.2539C2.11383 17.1576 2.08114 15.6777 2.01577 12.7178C1.99475 11.7661 1.99474 10.8201 2.01576 9.86836C2.0608 7.82941 2.09032 6.49275 2.47411 5.5L12 10.3276L21.5259 5.5C21.9097 6.49275 21.9392 7.82941 21.9842 9.86838C22.0053 10.8201 22.0053 11.7662 21.9842 12.7179C21.9308 15.137 21.8992 16.5676 21.2718 17.608C21.3105 17.4122 21.3307 17.21 21.3307 17.0033C21.3307 16.3437 21.1247 15.7305 20.7712 15.2202C20.1735 14.3574 19.1543 13.7891 17.9974 13.7891C16.8405 13.7891 15.8213 14.3574 15.2236 15.2202C14.8701 15.7305 14.6641 16.3437 14.6641 17.0033C14.6641 17.6631 14.8702 18.2764 15.2237 18.7867C15.3926 19.0304 15.595 19.2506 15.8248 19.4411C15.5328 19.4494 15.2253 19.4568 14.9012 19.4647Z',
  d5: 'M15.4548 9.662L19.6906 7.26197C20.0516 7.05742 20.2321 6.95514 20.379 7.03609C20.5258 7.11703 20.5355 7.3198 20.5548 7.7253C20.5809 8.27187 20.595 8.90551 20.611 9.6547C20.6186 10.0071 20.6233 10.7025 20.6254 10.855C20.633 11.4149 21.0714 11.875 21.6314 11.875C22.1747 11.875 22.6294 11.4409 22.6246 10.8976C22.6232 10.7309 22.618 10.0288 22.6091 9.61215L22.6075 9.53677C22.5762 8.07128 22.5504 6.86037 22.3798 5.87916C22.198 4.8336 21.8392 3.95811 21.0897 3.20674C20.6663 2.78228 20.2 2.4827 19.6841 2.26889C19.6056 2.22604 19.5215 2.19373 19.4338 2.17311C19.104 2.05684 18.7547 1.97116 18.3844 1.90676C17.3835 1.73265 16.1416 1.70152 14.6322 1.66368L14.5574 1.66181C12.6016 1.61273 11.1485 1.61274 9.19278 1.66181L9.11793 1.66369C7.60857 1.70152 6.36669 1.73265 5.36572 1.90675C4.30335 2.09154 3.41384 2.45141 2.66043 3.20674C1.91098 3.95811 1.55213 4.8336 1.37033 5.87916C1.19972 6.86038 1.17391 8.07123 1.14266 9.53675L1.14105 9.61214C1.11974 10.6101 1.11976 11.14 1.14106 12.1379L1.14267 12.2133C1.17392 13.6788 1.19974 14.8896 1.37035 15.8709C1.55214 16.9164 1.91099 17.7919 2.66045 18.5433C3.41385 19.2986 4.30337 19.6585 5.36574 19.8433C6.3667 20.0174 7.60857 20.0485 9.11793 20.0863L9.19279 20.0882C9.87436 20.1053 9.98074 20.1164 10.8771 20.1216C11.4283 20.1248 11.8749 19.6782 11.8749 19.127C11.8749 18.5758 11.4282 18.1288 10.8771 18.1256C9.99503 18.1204 9.90904 18.1095 9.24299 18.0928C7.64004 18.0526 6.54681 18.0226 5.70862 17.8768C4.91534 17.7388 4.45318 17.5124 4.07629 17.1345C3.69546 16.7527 3.47283 16.2968 3.33939 15.5293C3.19769 14.7143 3.17243 13.6553 3.13912 12.0953C3.11842 11.1258 3.11841 10.6242 3.13911 9.6547C3.1551 8.90561 3.16924 8.27204 3.19531 7.72553C3.21465 7.32001 3.22432 7.11725 3.37116 7.0363C3.518 6.95535 3.69851 7.05763 4.05953 7.26219L8.29493 9.662C9.59454 10.3984 10.6937 10.875 11.8749 10.875C13.0561 10.875 14.1552 10.3984 15.4548 9.662Z',
  d6: 'M17.8752 11.375C18.4275 11.375 18.8752 11.8227 18.8752 12.375V12.7736C19.6156 12.9438 20.2849 13.2991 20.8264 13.789L21.3344 13.4624C21.799 13.1637 22.4177 13.2982 22.7164 13.7628C23.015 14.2274 22.8805 14.8461 22.416 15.1447L21.9518 15.4432C22.1177 15.89 22.2085 16.3723 22.2085 16.875C22.2085 17.3778 22.1177 17.8602 21.9517 18.307L22.4156 18.6053C22.8801 18.9039 23.0146 19.5226 22.7159 19.9872C22.4173 20.4518 21.7986 20.5863 21.334 20.2876L20.8262 19.9612C20.2848 20.451 19.6155 20.8062 18.8752 20.9764V21.375C18.8752 21.9273 18.4275 22.375 17.8752 22.375C17.3229 22.375 16.8752 21.9273 16.8752 21.375V20.9764C16.1349 20.8062 15.4656 20.451 14.9241 19.9612L14.4164 20.2876C13.9518 20.5863 13.3331 20.4518 13.0345 19.9872C12.7358 19.5226 12.8703 18.9039 13.3348 18.6053L13.7987 18.307C13.6327 17.8602 13.5419 17.3778 13.5419 16.875C13.5419 16.3723 13.6327 15.89 13.7986 15.4432L13.3344 15.1447C12.8699 14.8461 12.7354 14.2274 13.034 13.7628C13.3327 13.2982 13.9514 13.1637 14.416 13.4624L14.924 13.789C15.4655 13.2991 16.1348 12.9438 16.8752 12.7736V12.375C16.8752 11.8227 17.3229 11.375 17.8752 11.375ZM17.8752 14.6607C17.0503 14.6607 16.3366 15.0648 15.9234 15.6613C15.6808 16.0116 15.5419 16.4276 15.5419 16.875C15.5419 17.3225 15.6808 17.7385 15.9235 18.0888C16.3367 18.6852 17.0504 19.0893 17.8752 19.0893C18.7 19.0893 19.4137 18.6852 19.8269 18.0888C20.0696 17.7385 20.2085 17.3225 20.2085 16.875C20.2085 16.4276 20.0696 16.0116 19.827 15.6613C19.4138 15.0648 18.7001 14.6607 17.8752 14.6607Z',
  d7: 'M22 11V2H2V19H10',
  d8: 'M2 5.5L12 10.5L22 5.5',
  d9: 'M17.5 20.2143V22M17.5 20.2143C16.3432 20.2143 15.3241 19.6461 14.7263 18.7833M17.5 20.2143C18.6568 20.2143 19.6759 19.6461 20.2737 18.7833M17.5 13.7857C18.6569 13.7857 19.6761 14.354 20.2738 15.2169M17.5 13.7857C16.3431 13.7857 15.3239 14.354 14.7262 15.2169M17.5 13.7857V12M22 14L20.2738 15.2169M13 20L14.7263 18.7833M13 14L14.7262 15.2169M22 20L20.2737 18.7833M20.2738 15.2169C20.6273 15.7271 20.8333 16.3403 20.8333 17C20.8333 17.6597 20.6272 18.273 20.2737 18.7833M14.7262 15.2169C14.3727 15.7271 14.1667 16.3403 14.1667 17C14.1667 17.6597 14.3728 18.273 14.7263 18.7833',
  d10: 'M1.25 2.72368C1.25 2.18593 1.68754 1.75 2.22727 1.75H21.7727C22.3125 1.75 22.75 2.18593 22.75 2.72368V11.5H20.796V7.60217L12.0003 12L3.20508 7.6024V18.3026H11V20.25H2.22727C1.68754 20.25 1.25 19.8141 1.25 19.2763V2.72368Z',
  d11: 'M17.0643 13.6037C16.3836 13.7626 15.767 14.0911 15.2651 14.544L14.3283 13.8735L13.25 15.4265L14.1982 16.1051C14.0348 16.5392 13.9451 17.0094 13.9451 17.5C13.9451 17.9907 14.0348 18.4609 14.1983 18.895L13.2501 19.5735L14.3282 21.1265L15.2652 20.4561C15.7671 20.9089 16.3836 21.2374 17.0643 21.3963V22.25H18.9357V21.3963C19.6164 21.2374 20.2329 20.9089 20.7348 20.4561L21.6718 21.1265L22.7499 19.5735L21.8017 18.895C21.9652 18.4609 22.0549 17.9907 22.0549 17.5C22.0549 17.0094 21.9652 16.5392 21.8018 16.1051L22.75 15.4265L21.6717 13.8735L20.7349 14.544C20.233 14.0911 19.6164 13.7626 18.9357 13.6037V12.75H17.0643V13.6037ZM18 15.3964C17.2281 15.3964 16.5603 15.7803 16.1736 16.347C15.9466 16.6798 15.8166 17.075 15.8166 17.5C15.8166 17.9251 15.9466 18.3203 16.1737 18.6531C16.5604 19.2197 17.2282 19.6036 18 19.6036C18.7718 19.6036 19.4396 19.2197 19.8263 18.6531C20.0534 18.3203 20.1834 17.9251 20.1834 17.5C20.1834 17.075 20.0534 16.6798 19.8264 16.347C19.4397 15.7803 18.7719 15.3964 18 15.3964Z',
};

export const IconMailSetting01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-stroke-rounded IconMailSetting01StrokeRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSetting01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-duotone-rounded IconMailSetting01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSetting01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-twotone-rounded IconMailSetting01TwotoneRounded"
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

export const IconMailSetting01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-solid-rounded IconMailSetting01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSetting01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-bulk-rounded IconMailSetting01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailSetting01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-stroke-sharp IconMailSetting01StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
    </TheIconWrapper>
  );
};

export const IconMailSetting01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-setting-01-solid-sharp IconMailSetting01SolidSharp"
    >
      <path 
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

export const iconPackOfMailSetting01: TheIconSelfPack = {
  name: 'MailSetting01',
  StrokeRounded: IconMailSetting01StrokeRounded,
  DuotoneRounded: IconMailSetting01DuotoneRounded,
  TwotoneRounded: IconMailSetting01TwotoneRounded,
  SolidRounded: IconMailSetting01SolidRounded,
  BulkRounded: IconMailSetting01BulkRounded,
  StrokeSharp: IconMailSetting01StrokeSharp,
  SolidSharp: IconMailSetting01SolidSharp,
};