import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.5269 15.9771H18.7662C20.0454 15.9555 21.9996 16.6288 21.9996 19.057C21.9996 21.5765 19.5881 21.9989 18.7662 21.9989C17.9443 21.9989 10.1825 21.9989 7.94527 21.9989C5.43927 21.9989 2.00096 21.4913 2.00098 17.1681L2.00098 8.00273H21.9996V12.5197M15.5269 15.9771C15.5323 15.7633 15.6233 15.5511 15.8001 15.397L17.5019 13.9767M15.5269 15.9771C15.5212 16.2053 15.613 16.4356 15.8023 16.5995L17.5019 17.9831',
  d2: 'M2.00586 7.9911L2.92739 5.69019C3.67517 3.90202 4.04906 3.00794 4.80692 2.50454C5.56477 2.00113 6.53689 2.00113 8.48112 2.00113H15.5004C17.4447 2.00113 18.4167 2.00113 19.1746 2.50454C19.9325 3.00794 20.3063 3.90202 21.0542 5.69019L22 7.99466',
  d3: 'M11.9634 8.00113V2.00113',
  d4: 'M9.96338 12.0011H13.9634',
  d5: 'M2.19043 13.6513V8.22266H22.1904V13.6513C22.1904 17.6919 22.1904 19.7122 20.8887 20.9674C19.5869 22.2227 17.4918 22.2227 13.3015 22.2227H11.0793C6.88906 22.2227 4.79393 22.2227 3.49218 20.9674C2.19043 19.7122 2.19043 17.6919 2.19043 13.6513Z',
  d6: 'M15.7173 16.197H18.9566C20.2358 16.1754 22.19 16.8487 22.19 19.2769C22.19 21.7964 19.7785 22.2188 18.9566 22.2188C18.1347 22.2188 10.3729 22.2188 8.1357 22.2188C5.6297 22.2188 2.19139 21.7112 2.19141 17.3879V8.22266H22.19V12.7396M15.7173 16.197C15.7227 15.9831 15.8137 15.771 15.9905 15.6169L17.6923 14.1966M15.7173 16.197C15.7116 16.4252 15.8034 16.6555 15.9927 16.8194L17.6923 18.203',
  d7: 'M2.19043 8.22266L3.15197 5.91497C3.89769 4.12523 4.27056 3.23036 5.02633 2.72651C5.7821 2.22266 6.75155 2.22266 8.69043 2.22266H15.6904C17.6293 2.22266 18.5987 2.22266 19.3545 2.72651C20.1103 3.23036 20.4831 4.12523 21.2289 5.91497L22.1904 8.22266',
  d8: 'M12.1904 8.22266V2.22266',
  d9: 'M10.1904 12.2227H14.1904',
  d10: 'M2 8.00095L2.96154 5.69326C3.70726 3.90352 4.08013 3.00865 4.8359 2.5048C5.59167 2.00095 6.56112 2.00095 8.5 2.00095H15.5C17.4389 2.00095 18.4083 2.00095 19.1641 2.5048C19.9199 3.00865 20.2927 3.90352 21.0385 5.69326L22 8.00095',
  d11: 'M12 8.00095V2.00095',
  d12: 'M10 12.0009H14',
  d13: 'M15.5269 15.9773H18.7662C20.0454 15.9557 21.9996 16.629 21.9996 19.0572C21.9996 21.5767 19.5881 21.999 18.7662 21.999C17.9443 21.999 10.1825 21.999 7.94527 21.999C5.43927 21.999 2.00096 21.4915 2.00098 17.1682L2.00098 8.0029H21.9996V12.5199M15.5269 15.9773C15.5323 15.7634 15.6233 15.5513 15.8001 15.3971L17.5019 13.9769M15.5269 15.9773C15.5212 16.2055 15.613 16.4358 15.8023 16.5996L17.5019 17.9833',
  d14: 'M8.52755 1.25006L15.4724 1.25006H15.4725C16.3755 1.25004 17.1309 1.25002 17.75 1.3146C18.4047 1.3829 18.9966 1.53029 19.5432 1.87985C20.0898 2.22942 20.4593 2.69687 20.7768 3.25036C21.0771 3.77374 21.3676 4.44262 21.7149 5.24228L22.6746 7.45178C22.7397 7.60165 22.7612 7.75849 22.7447 7.90933C22.7483 7.93907 22.7501 7.96935 22.7501 8.00006V13.4872V15.6563C22.7308 15.9723 22.7124 16.2722 22.6938 16.5562C22.6477 17.2608 22.6246 17.6131 22.4932 17.6538C22.3618 17.6945 22.1186 17.3851 21.6322 16.7663C20.8225 15.7361 19.6796 15.0458 16.1676 15.0458L16.1677 13.8396C16.1686 13.3493 16.0391 12.8559 15.5632 12.6146C14.9214 12.2892 14.4271 12.7013 13.9648 13.0866C13.9396 13.1077 13.9144 13.1286 13.8894 13.1494C13.8294 13.199 13.7691 13.2487 13.7086 13.2985C13.1269 13.7774 12.5276 14.2708 12.0856 14.8824C11.9181 15.114 11.6676 15.5149 11.6676 16.0001C11.6676 16.4853 11.9181 16.8862 12.0856 17.1179C12.5276 17.7294 13.1269 18.2228 13.7086 18.7017C13.7691 18.7516 13.8294 18.8012 13.8893 18.8508C13.9076 18.8659 13.9258 18.8811 13.9442 18.8964C14.4104 19.2837 14.9234 19.71 15.5632 19.3856C16.0501 19.1388 16.1683 18.6361 16.1676 18.1384V17.0459C19.4677 17.0459 20.9019 18.5144 20.631 20.2297C20.4075 21.6445 19.4759 22.4522 18.0844 22.5869C16.8259 22.7501 15.2148 22.7501 13.1663 22.7501H10.8339C8.78549 22.7501 7.1743 22.7501 5.91582 22.5869C4.62722 22.4199 3.59564 22.07 2.78127 21.2847C1.96308 20.4957 1.59505 19.4901 1.42003 18.2348C1.25009 17.016 1.25011 15.4578 1.25012 13.4872V13.4872L1.25012 8.00006C1.25012 7.96972 1.25192 7.93979 1.25543 7.91039C1.23872 7.75922 1.26018 7.602 1.32543 7.45178L2.28512 5.24229C2.63242 4.44262 2.92293 3.77374 3.22319 3.25036C3.54072 2.69687 3.91021 2.22942 4.45681 1.87985C5.0034 1.53029 5.59532 1.3829 6.25004 1.3146C6.86914 1.25002 7.62449 1.25004 8.52753 1.25006H8.52755ZM3.53042 7.25006L11.0001 7.25006V3.125H8.57963C7.61098 3.125 6.96239 3.12628 6.46133 3.17855C5.98402 3.22834 5.73295 3.31712 5.54097 3.4399C5.34898 3.56268 5.16699 3.75085 4.9355 4.15436C4.69249 4.57795 4.4418 5.15179 4.06924 6.00952L3.53042 7.25006ZM13.0001 7.25006L20.4696 7.25006L19.9308 6.00952C19.5582 5.15179 19.3075 4.57795 19.0645 4.15436C18.833 3.75085 18.651 3.56268 18.459 3.4399C18.2671 3.31712 18.016 3.22834 17.5387 3.17855C17.0376 3.12628 16.389 3.125 15.4204 3.125L13.0001 3.125V7.25006Z',
  d15: 'M1.99976 7.25C1.58554 7.25 1.24976 7.58579 1.24976 8V13.4872V13.4872C1.24974 15.4578 1.24973 17.0159 1.41966 18.2347C1.59469 19.4901 1.96271 20.4957 2.7809 21.2846C3.59527 22.0699 4.62686 22.4198 5.91546 22.5869C7.17393 22.75 8.78513 22.75 10.8336 22.75H13.1659C15.2144 22.75 16.8256 22.75 18.0841 22.5869C19.3727 22.4198 20.4042 22.0699 21.2186 21.2846C22.0368 20.4957 22.4048 19.4901 22.5799 18.2347C22.7498 17.0159 22.7498 15.4578 22.7498 13.4872V8C22.7498 7.58579 22.414 7.25 21.9998 7.25H1.99976Z',
  d16: 'M22.5746 18.2718C22.3978 17.8949 22.102 17.3629 21.6324 16.7655C20.8227 15.7353 19.6798 15.045 16.1678 15.045L16.1679 13.8388C16.1688 13.3485 16.0393 12.8551 15.5634 12.6138C14.9216 12.2885 14.4273 12.7005 13.965 13.0858C13.9398 13.1069 13.9146 13.1278 13.8896 13.1486C13.8296 13.1982 13.7693 13.2479 13.7088 13.2977C13.1271 13.7766 12.5278 14.27 12.0858 14.8816C11.9183 15.1132 11.6678 15.5142 11.6678 15.9993C11.6678 16.4845 11.9183 16.8854 12.0858 17.1171C12.5278 17.7286 13.1271 18.222 13.7088 18.701C13.7693 18.7508 13.8296 18.8004 13.8895 18.85C13.9078 18.8651 13.926 18.8803 13.9444 18.8956C14.4106 19.2829 14.9236 19.7092 15.5634 19.3848C16.0503 19.138 16.1685 18.6353 16.1678 18.1376V17.0451C19.4679 17.0451 20.9021 18.5136 20.6312 20.2289C20.4753 21.2157 19.7193 22.0229 18.804 22.4667C19.764 22.2673 20.562 21.9172 21.2187 21.2839C22.0287 20.5029 22.3975 19.5095 22.5746 18.2718Z',
  d17: 'M8.52743 1.25H15.4723C16.3754 1.24998 17.1307 1.24996 17.7498 1.31454C18.4046 1.38284 18.9965 1.53023 19.5431 1.87979C20.0897 2.22936 20.4592 2.69681 20.7767 3.2503C21.077 3.77368 21.3675 4.44256 21.7148 5.24222L22.6745 7.45172C22.7396 7.60176 22.7611 7.75879 22.7445 7.9098C22.7 7.53812 22.3836 7.25 21.9999 7.25H20.4695L19.9306 6.00946C19.5581 5.15173 19.3074 4.57789 19.0644 4.1543C18.8329 3.75079 18.6509 3.56262 18.4589 3.43984C18.2669 3.31706 18.0159 3.22828 17.5386 3.17849C17.0375 3.12622 16.3889 3.12494 15.4203 3.12494H12.9999V7.25H10.9999V3.12494H8.5795C7.61086 3.12494 6.96227 3.12622 6.4612 3.17849C5.9839 3.22828 5.73283 3.31706 5.54084 3.43984C5.34886 3.56262 5.16687 3.75079 4.93538 4.1543C4.69237 4.57789 4.44168 5.15173 4.06912 6.00946L3.5303 7.25H1.99988C1.61619 7.25 1.2998 7.53811 1.25525 7.90979C1.23865 7.75879 1.26014 7.60176 1.32531 7.45172L2.28499 5.24223C2.6323 4.44256 2.9228 3.77368 3.22306 3.2503C3.5406 2.69681 3.91009 2.22936 4.45668 1.87979C5.00328 1.53023 5.59519 1.38284 6.24992 1.31454C6.86901 1.24996 7.62441 1.24998 8.52743 1.25Z',
  d18: 'M2 8L5 2L19 2.00001L22 8',
  d19: 'M12 8V2',
  d20: 'M9 12H15',
  d21: 'M22 13V8H2V22H19C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16L15.5 16',
  d22: 'M18 13.5L15.5 16L18 18.5',
  d23: 'M19.5131 1.2501L4.47905 1.25009L1.25 7.80288V22.0001C1.25 22.4143 1.58579 22.7501 2 22.7501H16.0208C17.6681 22.7389 19 21.4001 19 19.7502C19 18.0933 17.6569 16.7502 16 16.7502H13.9142L15.5056 18.3416L14.0914 19.7558L10.0858 15.7502L14.0914 11.7445L15.5056 13.1587L13.9142 14.7502H16C18.7614 14.7502 21 16.9887 21 19.7502C21 20.8757 20.6281 21.9144 20.0004 22.7501H22C22.4142 22.7501 22.75 22.4143 22.75 22.0001V7.80288L19.5131 1.2501ZM20.2683 7.25009L18.2948 3.2501L12.9842 3.25009V7.25009H20.2683ZM11.0107 7.25009V3.25009L5.70005 3.25009L3.72656 7.25009H11.0107Z',
};

export const IconDeliveryReturn01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-stroke-rounded IconDeliveryReturn01StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-duotone-rounded IconDeliveryReturn01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
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
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-twotone-rounded IconDeliveryReturn01TwotoneRounded"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-solid-rounded IconDeliveryReturn01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-bulk-rounded IconDeliveryReturn01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-stroke-sharp IconDeliveryReturn01StrokeSharp"
    >
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d22} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDeliveryReturn01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="delivery-return-01-solid-sharp IconDeliveryReturn01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDeliveryReturn01: TheIconSelfPack = {
  name: 'DeliveryReturn01',
  StrokeRounded: IconDeliveryReturn01StrokeRounded,
  DuotoneRounded: IconDeliveryReturn01DuotoneRounded,
  TwotoneRounded: IconDeliveryReturn01TwotoneRounded,
  SolidRounded: IconDeliveryReturn01SolidRounded,
  BulkRounded: IconDeliveryReturn01BulkRounded,
  StrokeSharp: IconDeliveryReturn01StrokeSharp,
  SolidSharp: IconDeliveryReturn01SolidSharp,
};