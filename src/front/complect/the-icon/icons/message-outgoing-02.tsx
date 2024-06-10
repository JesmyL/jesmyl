import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.7109 9.3871C21.8404 9.895 21.9249 10.4215 21.9598 10.9621C22.0134 11.7929 22.0134 12.6533 21.9598 13.4842C21.6856 17.7299 18.3536 21.1118 14.1706 21.3901C12.7435 21.485 11.2536 21.4848 9.8294 21.3901C9.33896 21.3574 8.8044 21.2403 8.34401 21.0505C7.83177 20.8394 7.5756 20.7338 7.44544 20.7498C7.31527 20.7659 7.1264 20.9052 6.74868 21.184C6.08268 21.6755 5.24367 22.0285 3.99943 21.9982C3.37026 21.9829 3.05568 21.9752 2.91484 21.7349C2.77401 21.4946 2.94941 21.1619 3.30021 20.4966C3.78674 19.5739 4.09501 18.5176 3.62791 17.6712C2.82343 16.4623 2.1401 15.0305 2.04024 13.4842C1.98659 12.6533 1.98659 11.7929 2.04024 10.9621C2.31441 6.71638 5.64639 3.33448 9.8294 3.05621C10.2156 3.03051 10.6067 3.01177 11 3',
  d2: 'M11.9953 12.5H12.0042M15.9908 12.5H15.9998M7.99976 12.5H8.00873',
  d3: 'M22 4.5L14 4.5M22 4.5C22 3.79977 20.0057 2.49153 19.5 2M22 4.5C22 5.20023 20.0057 6.50847 19.5 7',
  d4: 'M14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0134 12.6607 22.0134 11.8009 21.9598 10.9707C21.6856 6.72838 18.3536 3.34913 14.1706 3.07107C12.7435 2.97621 11.2536 2.97641 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905Z',
  d5: 'M13.875 5.50586C13.3227 5.50586 12.875 5.05814 12.875 4.50586C12.875 3.95357 13.3227 3.50586 13.875 3.50586L18.375 3.50586L18.375 2.9116C18.3749 2.73596 18.3747 2.52031 18.3968 2.34387L18.3972 2.34053C18.413 2.21408 18.4848 1.63804 19.0504 1.36368C19.6173 1.08872 20.1174 1.39065 20.2256 1.45597L20.2296 1.45841C20.3826 1.55062 20.5535 1.68477 20.6941 1.79511L20.7243 1.81885C21.1002 2.11348 21.5844 2.49545 21.9754 2.87588C22.1705 3.06571 22.3717 3.28297 22.5306 3.51388C22.6718 3.71914 22.875 4.06934 22.875 4.5C22.875 4.93067 22.6718 5.28086 22.5306 5.48612C22.3717 5.71703 22.1705 5.93429 21.9754 6.12412C21.5844 6.50455 21.1002 6.88652 20.7243 7.18115L20.6941 7.20488C20.5535 7.31523 20.3827 7.44938 20.2296 7.54159L20.2256 7.54403C20.1174 7.60935 19.6172 7.91128 19.0504 7.63632C18.4848 7.36196 18.413 6.78592 18.3972 6.65947L18.3968 6.65613C18.3747 6.47969 18.3749 6.26403 18.375 6.0884L18.375 5.50586L13.875 5.50586Z',
  d6: 'M22.5832 10.9214C22.5371 10.2078 22.4113 9.51641 22.2147 8.85625C22.1153 8.52256 22.0656 8.35572 21.9176 8.30633C21.7695 8.25694 21.6231 8.36529 21.3304 8.58201L20.9911 8.8331C20.8273 8.933 19.7026 9.61891 18.3957 8.98497C17.6044 8.60111 17.2351 7.97089 17.0617 7.49114C16.9709 7.23959 16.9254 7.11382 16.8478 7.05936C16.7703 7.00491 16.6561 7.00491 16.4278 7.00491L13.875 7.0049C12.4943 7.0049 11.375 5.88562 11.375 4.5049C11.375 4.38541 11.3834 4.26787 11.3996 4.15285C11.5604 3.01206 11.6408 2.44167 11.546 2.33745C11.4512 2.23323 11.081 2.24998 10.3406 2.28347C10.1107 2.29387 9.88185 2.30662 9.65463 2.32173C5.08798 2.62529 1.4647 6.31158 1.16678 10.9214C1.11105 11.7838 1.11105 12.6758 1.16678 13.5382C1.27771 15.2546 2.02646 16.803 2.85879 18.0594C3.10812 18.5409 2.97821 19.2631 2.51188 20.1468L2.4904 20.1875C2.33372 20.4842 2.18034 20.7747 2.09186 21.0224C1.99811 21.2848 1.90121 21.7015 2.14289 22.1135C2.36494 22.4921 2.71973 22.6308 3.0065 22.6863C3.24459 22.7324 3.53653 22.7393 3.81042 22.7459L3.85615 22.747C5.2759 22.7815 6.27635 22.3716 7.06878 21.7873L7.16405 21.7171C7.28357 21.6292 7.34334 21.5852 7.42103 21.5756C7.49872 21.566 7.56701 21.5938 7.70359 21.6495C7.77124 21.677 7.84731 21.7083 7.93337 21.7438C8.47476 21.9667 9.0897 22.1003 9.65463 22.1379C11.1119 22.2347 12.6351 22.2349 14.0953 22.1379C18.662 21.8343 22.2853 18.148 22.5832 13.5382C22.6389 12.6758 22.6389 11.7838 22.5832 10.9214ZM7.875 11.5C7.32272 11.5 6.875 11.9477 6.875 12.5C6.875 13.0523 7.32272 13.5 7.875 13.5H7.88397C8.43626 13.5 8.88397 13.0523 8.88397 12.5C8.88397 11.9477 8.43626 11.5 7.88397 11.5H7.875ZM11.8705 11.5C11.3182 11.5 10.8705 11.9477 10.8705 12.5C10.8705 13.0523 11.3182 13.5 11.8705 13.5H11.8795C12.4318 13.5 12.8795 13.0523 12.8795 12.5C12.8795 11.9477 12.4318 11.5 11.8795 11.5H11.8705ZM15.866 11.5C15.3137 11.5 14.866 11.9477 14.866 12.5C14.866 13.0523 15.3137 13.5 15.866 13.5H15.875C16.4273 13.5 16.875 13.0523 16.875 12.5C16.875 11.9477 16.4273 11.5 15.875 11.5H15.866Z',
  d7: 'M22.2147 8.85623C22.4113 9.51639 22.5371 10.2078 22.5832 10.9213C22.6389 11.7837 22.6389 12.6758 22.5832 13.5382C22.2853 18.148 18.662 21.8343 14.0954 22.1379C12.6351 22.2349 11.1119 22.2347 9.65465 22.1379C9.08972 22.1003 8.47478 21.9667 7.93339 21.7437C7.84733 21.7083 7.77126 21.677 7.70361 21.6494C7.56703 21.5938 7.49873 21.5659 7.42104 21.5756C7.34335 21.5852 7.28359 21.6292 7.16407 21.7171L7.0688 21.7872C6.27636 22.3716 5.27592 22.7815 3.85617 22.7469L3.81044 22.7458C3.53655 22.7393 3.24461 22.7323 3.00652 22.6863C2.71975 22.6308 2.36496 22.4921 2.14291 22.1135C1.90123 21.7015 1.99813 21.2848 2.09188 21.0224C2.18036 20.7747 2.33374 20.4842 2.49042 20.1875L2.5119 20.1468C2.97823 19.2631 3.10814 18.5409 2.85881 18.0594C2.02648 16.803 1.27772 15.2546 1.1668 13.5382C1.11107 12.6758 1.11107 11.7837 1.1668 10.9213C1.46472 6.31155 5.088 2.62526 9.65465 2.3217C9.88187 2.3066 10.1107 2.29384 10.3406 2.28344C11.081 2.24995 11.4512 2.2332 11.546 2.33742C11.6408 2.44164 11.5604 3.01203 11.3996 4.15282C11.3834 4.26784 11.375 4.38538 11.375 4.50488C11.375 5.88559 12.4943 7.00488 13.875 7.00488L16.4278 7.00488C16.6561 7.00488 16.7703 7.00488 16.8479 7.05934C16.9254 7.11379 16.9709 7.23956 17.0618 7.49111C17.2351 7.97086 17.6045 8.60109 18.3958 8.98494C19.7026 9.61889 20.8273 8.93297 20.9911 8.83307L21.3304 8.58199C21.6232 8.36527 21.7696 8.25691 21.9176 8.3063C22.0656 8.35569 22.1153 8.52254 22.2147 8.85623Z',
  d8: 'M6.875 12.5C6.875 11.9477 7.32272 11.5 7.875 11.5H7.88397C8.43626 11.5 8.88397 11.9477 8.88397 12.5C8.88397 13.0523 8.43626 13.5 7.88397 13.5H7.875C7.32272 13.5 6.875 13.0523 6.875 12.5ZM10.8705 12.5C10.8705 11.9477 11.3182 11.5 11.8705 11.5H11.8795C12.4318 11.5 12.8795 11.9477 12.8795 12.5C12.8795 13.0523 12.4318 13.5 11.8795 13.5H11.8705C11.3182 13.5 10.8705 13.0523 10.8705 12.5ZM14.866 12.5C14.866 11.9477 15.3137 11.5 15.866 11.5H15.875C16.4273 11.5 16.875 11.9477 16.875 12.5C16.875 13.0523 16.4273 13.5 15.875 13.5H15.866C15.3137 13.5 14.866 13.0523 14.866 12.5Z',
  d9: 'M9.91142 21.4796L9.96336 20.7314H9.96336L9.91142 21.4796ZM2.0204 13.5886L2.7686 13.5366L2.0204 13.5886ZM21.9796 13.5886L21.2314 13.5366V13.5366L21.9796 13.5886ZM14.0886 21.4796L14.0366 20.7314H14.0366L14.0886 21.4796ZM21.9796 10.9114L21.2314 10.9634V10.9634L21.9796 10.9114ZM9.91142 3.0204L9.96336 3.7686L9.91142 3.0204ZM2.0204 10.9114L2.7686 10.9634L2.0204 10.9114ZM3.62564 18L4.32168 18.2793L4.47628 17.8941L4.23193 17.5585L3.62564 18ZM2.0204 22L1.32436 21.7207C1.21546 21.992 1.27419 22.3019 1.47482 22.5146C1.67546 22.7273 1.98141 22.804 2.25865 22.7112L2.0204 22ZM6.49772 20.5L6.85114 19.8385L6.56601 19.6862L6.25947 19.7888L6.49772 20.5ZM12.75 20.75H11.25V22.25H12.75V20.75ZM11.25 20.75C10.541 20.75 10.2248 20.7495 9.96336 20.7314L9.85949 22.2278C10.1859 22.2505 10.5662 22.25 11.25 22.25V20.75ZM1.25 12.25C1.25 12.9338 1.24955 13.3141 1.2722 13.6405L2.7686 13.5366C2.75045 13.2752 2.75 12.959 2.75 12.25H1.25ZM21.25 12.25C21.25 12.959 21.2495 13.2752 21.2314 13.5366L22.7278 13.6405C22.7505 13.3141 22.75 12.9338 22.75 12.25H21.25ZM12.75 22.25C13.4338 22.25 13.8141 22.2505 14.1405 22.2278L14.0366 20.7314C13.7752 20.7495 13.459 20.75 12.75 20.75V22.25ZM21.2314 13.5366C20.9637 17.3939 17.8939 20.4637 14.0366 20.7314L14.1405 22.2278C18.7443 21.9082 22.4082 18.2443 22.7278 13.6405L21.2314 13.5366ZM22.75 12.25C22.75 11.5662 22.7505 11.1859 22.7278 10.8595L21.2314 10.9634C21.2495 11.2248 21.25 11.541 21.25 12.25H22.75ZM11.25 2.25C10.5662 2.25 10.1859 2.24955 9.85949 2.2722L9.96336 3.7686C10.2248 3.75045 10.541 3.75 11.25 3.75V2.25ZM2.75 12.25C2.75 11.541 2.75045 11.2248 2.7686 10.9634L1.2722 10.8595C1.24955 11.1859 1.25 11.5662 1.25 12.25H2.75ZM9.85949 2.2722C5.25571 2.59176 1.59176 6.25571 1.2722 10.8595L2.7686 10.9634C3.03634 7.10614 6.10614 4.03634 9.96336 3.7686L9.85949 2.2722ZM4.23193 17.5585C3.39979 16.4157 2.8727 15.0363 2.7686 13.5366L1.2722 13.6405C1.39635 15.4291 2.02589 17.0772 3.01935 18.4415L4.23193 17.5585ZM2.9296 17.7207L1.32436 21.7207L2.71645 22.2793L4.32168 18.2793L2.9296 17.7207ZM9.96336 20.7314C8.84212 20.6536 7.78869 20.3394 6.85114 19.8385L6.1443 21.1615C7.26463 21.7601 8.5231 22.135 9.85949 22.2278L9.96336 20.7314ZM2.25865 22.7112L6.73598 21.2112L6.25947 19.7888L1.78215 21.2888L2.25865 22.7112ZM21.1288 10.1318C21.1773 10.4041 21.2118 10.6815 21.2314 10.9634L22.7278 10.8595C22.7045 10.524 22.6634 10.1932 22.6054 9.86824L21.1288 10.1318Z',
  d10: 'M14 5L21.4988 5M19 2L22 5L19 8',
  d11: 'M11.2105 2.25H11.2105H11.2105H12L12.0859 7.20705H15.904L15.8611 7.24995L19.043 10.4319L21.8846 7.59033C22.3531 8.59431 22.6471 9.69693 22.7278 10.8595C22.75 11.1796 22.75 11.5514 22.75 12.2105V12.2895C22.75 12.9486 22.75 13.3204 22.7278 13.6405C22.4082 18.2443 18.7443 21.9082 14.1405 22.2278C13.8204 22.25 13.4486 22.25 12.7895 22.25H11.2105C10.5514 22.25 10.1796 22.25 9.85949 22.2278C8.63831 22.143 7.48219 21.8226 6.43709 21.3113L1.47483 22.75L2.77921 18.0954C1.92471 16.8022 1.38603 15.2804 1.2722 13.6405C1.24999 13.3205 1.24999 12.9486 1.25 12.2895V12.2895V12.2895V12.2105V12.2105V12.2104C1.24999 11.5514 1.24999 11.1795 1.2722 10.8595C1.59176 6.25571 5.25571 2.59176 9.85949 2.2722C10.1795 2.24999 10.5514 2.24999 11.2105 2.25ZM9.00897 11.4999H7V13.4999H9.00897V11.4999ZM13.0045 11.4999H10.9955V13.4999H13.0045V11.4999ZM17 11.4999H14.991V13.4999H17V11.4999Z',
  d12: 'M19.043 1.25L22.7502 4.95711L19.043 8.66421L17.6288 7.25L18.9217 5.95711H13.3359V3.95711L18.9217 3.95711L17.6288 2.66421L19.043 1.25Z',
};

export const IconMessageOutgoing02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-stroke-rounded IconMessageOutgoing02StrokeRounded"
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

export const IconMessageOutgoing02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-duotone-rounded IconMessageOutgoing02DuotoneRounded"
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

export const IconMessageOutgoing02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-twotone-rounded IconMessageOutgoing02TwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageOutgoing02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-solid-rounded IconMessageOutgoing02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconMessageOutgoing02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-bulk-rounded IconMessageOutgoing02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMessageOutgoing02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-stroke-sharp IconMessageOutgoing02StrokeSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageOutgoing02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-outgoing-02-solid-sharp IconMessageOutgoing02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMessageOutgoing02: TheIconSelfPack = {
  name: 'MessageOutgoing02',
  StrokeRounded: IconMessageOutgoing02StrokeRounded,
  DuotoneRounded: IconMessageOutgoing02DuotoneRounded,
  TwotoneRounded: IconMessageOutgoing02TwotoneRounded,
  SolidRounded: IconMessageOutgoing02SolidRounded,
  BulkRounded: IconMessageOutgoing02BulkRounded,
  StrokeSharp: IconMessageOutgoing02StrokeSharp,
  SolidSharp: IconMessageOutgoing02SolidSharp,
};