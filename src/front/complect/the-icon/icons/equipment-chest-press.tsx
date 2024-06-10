import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.9107 8.36842C14.212 8.60058 14.2745 8.98921 14.3995 9.76646L14.8575 12.6146C15.0197 13.623 15.1008 14.1271 14.7812 14.4545C14.0248 15.2293 9.88108 15.1328 9.21883 14.4545C8.89925 14.1271 8.98033 13.6229 9.14248 12.6146L9.60049 9.76647C9.72548 8.98921 9.78798 8.60058 10.0893 8.36842C10.7104 7.88989 13.2569 7.86466 13.9107 8.36842Z',
  d2: 'M7.5 19C7.54219 18.8734 7.56329 18.8101 7.58586 18.754C7.87405 18.0371 8.54939 17.5504 9.32061 17.5037C9.38101 17.5 9.44772 17.5 9.58114 17.5H14.4189C14.5523 17.5 14.619 17.5 14.6794 17.5037C15.4506 17.5504 16.126 18.0371 16.4141 18.754C16.4367 18.8101 16.4578 18.8734 16.5 19',
  d3: 'M12 17.5V22M12 22H19M12 22H5',
  d4: 'M21 14V10.4031C21 9.70834 21 9.36095 20.8873 9.03955C20.7745 8.71814 20.5575 8.44688 20.1235 7.90434L18.201 5.50122C17.6109 4.7636 17.3158 4.39479 16.9051 4.19739C16.4944 4 16.0221 4 15.0775 4H8.9225C7.97788 4 7.50557 4 7.09487 4.19739C6.68417 4.39479 6.38912 4.7636 5.79902 5.50122L3.87653 7.90434C3.4425 8.44688 3.22549 8.71814 3.11274 9.03955C3 9.36095 3 9.70834 3 10.4031V14',
  d5: 'M3 12H6M21 12H18',
  d6: 'M12 8V2',
  d7: 'M12 17.5V22',
  d8: 'M19 22H5',
  d9: 'M21 14V10.4031C21 9.70834 21 9.36095 20.8873 9.03955C20.7745 8.71814 20.5575 8.44688 20.1235 7.90434L18.201 5.50122C17.6109 4.7636 17.3158 4.39479 16.9051 4.19739C16.4944 4 16.0221 4 15.0775 4H8.9225C7.97788 4 7.50557 4 7.09487 4.19739C6.68417 4.39479 6.38912 4.7636 5.79902 5.50122L3.87653 7.90434C3.4425 8.44688 3.22549 8.71814 3.11274 9.03955C3 9.36095 3 9.70834 3 10.4031V14M3 12H6M21 12H18',
  d10: 'M13.2574 7.35036C13.6207 7.41548 14.0546 7.53252 14.3684 7.77431C14.6825 8.01626 14.8412 8.32844 14.9379 8.64189C15.0226 8.9163 15.0767 9.25311 15.1332 9.60525L15.1332 9.60526L15.14 9.64739L15.598 12.4955L15.6063 12.5473C15.6803 13.0066 15.7493 13.4352 15.75 13.7884C15.7508 14.1871 15.6672 14.6206 15.3178 14.9784C15.1126 15.1886 14.8479 15.3198 14.6157 15.4069C14.3721 15.4984 14.0977 15.5656 13.8166 15.6153C13.2538 15.7148 12.596 15.7557 11.9572 15.7494C11.318 15.743 10.6692 15.689 10.123 15.5868C9.85061 15.5358 9.58718 15.4699 9.35626 15.3843C9.14198 15.3048 8.88089 15.182 8.68217 14.9784C8.33282 14.6206 8.2492 14.1871 8.25001 13.7884C8.25072 13.4352 8.31972 13.0066 8.39366 12.5473L8.402 12.4955L8.86 9.64739L8.86677 9.60526C8.92334 9.25312 8.97744 8.91631 9.06211 8.64189C9.15883 8.32844 9.31752 8.01626 9.63156 7.7743C9.93739 7.53867 10.366 7.42327 10.7209 7.35805C11.1097 7.28662 11.5522 7.25178 11.9847 7.25007C12.4172 7.24835 12.8628 7.27965 13.2574 7.35036Z',
  d11: 'M14.4184 16.5H9.58065C9.46051 16.5 9.35759 16.4996 9.25968 16.5055C8.10284 16.5756 7.08983 17.3057 6.65754 18.381C6.62095 18.472 6.58883 18.5698 6.55083 18.6838C6.37618 19.2077 6.65934 19.774 7.18329 19.9487C7.70723 20.1233 8.27355 19.8402 8.4482 19.3162C8.49459 19.1771 8.50465 19.1483 8.5132 19.127C8.6573 18.7686 8.99497 18.5252 9.38058 18.5018C9.40346 18.5005 9.43395 18.5 9.58065 18.5H14.4184C14.5651 18.5 14.5956 18.5005 14.6184 18.5018C15.0041 18.5252 15.3417 18.7686 15.4858 19.127C15.4944 19.1483 15.5044 19.1771 15.5508 19.3162C15.7255 19.8402 16.2918 20.1233 16.8157 19.9487C17.3397 19.774 17.6228 19.2077 17.4482 18.6838C17.4102 18.5698 17.3781 18.472 17.3415 18.381C16.9092 17.3057 15.8962 16.5756 14.7394 16.5055C14.6414 16.4996 14.5385 16.5 14.4184 16.5Z',
  d12: 'M12 16.5C11.4477 16.5 11 16.9477 11 17.5V21H5C4.44771 21 4 21.4477 4 22C4 22.5523 4.44771 23 5 23H19C19.5523 23 20 22.5523 20 22C20 21.4477 19.5523 21 19 21H13V17.5C13 16.9477 12.5523 16.5 12 16.5Z',
  d13: 'M8.76139 3.00018C8.81468 3.00028 8.86838 3.00037 8.92249 3.00037H15.0775C15.1316 3.00037 15.1853 3.00028 15.2386 3.00018C16.0211 2.99881 16.7165 2.99759 17.3383 3.29646C17.9601 3.59533 18.3936 4.13909 18.8813 4.75098C18.9146 4.79265 18.948 4.83464 18.9818 4.8769L20.9043 7.28002C20.929 7.31086 20.9535 7.34142 20.9779 7.37175C21.3396 7.82269 21.6602 8.22241 21.8309 8.70891C22.0015 9.19542 22.0009 9.70785 22.0001 10.286C22 10.3248 22 10.364 22 10.4035V14.0004C22 14.5527 21.5523 15.0004 21 15.0004C20.4477 15.0004 20 14.5527 20 14.0004V10.4035C20 9.64053 19.987 9.49451 19.9436 9.37093C19.9003 9.24734 19.8192 9.12519 19.3426 8.52941L17.4201 6.12629C16.77 5.31364 16.6292 5.17463 16.4719 5.09907C16.3147 5.0235 16.1182 5.00037 15.0775 5.00037H8.92249C7.8818 5.00037 7.68527 5.0235 7.52805 5.09907C7.37083 5.17463 7.23 5.31364 6.57988 6.12629L4.65738 8.52941C4.18076 9.12518 4.09971 9.24734 4.05636 9.37093C4.01301 9.49451 3.99999 9.64053 3.99999 10.4035V14.0004C3.99999 14.5527 3.55227 15.0004 2.99999 15.0004C2.44771 15.0004 1.99999 14.5527 1.99999 14.0004V10.4035C1.99999 10.364 1.99994 10.3248 1.99989 10.286C1.99912 9.70785 1.99845 9.19542 2.16911 8.70891C2.33976 8.2224 2.66041 7.82268 3.02214 7.37173C3.04647 7.34141 3.07098 7.31085 3.09565 7.28002L5.01815 4.8769C5.05195 4.83464 5.08542 4.79265 5.11864 4.75098C5.6064 4.13909 6.03985 3.59533 6.66167 3.29646C7.2835 2.99759 7.97888 2.99881 8.76139 3.00018Z',
  d14: 'M22 12C22 11.4477 21.5523 11 21 11H18C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13H21C21.5523 13 22 12.5523 22 12ZM7 12C7 11.4477 6.55229 11 6 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H6C6.55229 13 7 12.5523 7 12Z',
  d15: 'M12 1C11.4477 1 11 1.44772 11 2V8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V2C13 1.44772 12.5523 1 12 1Z',
  d16: 'M11.9998 16.5C11.4475 16.5 10.9998 16.9477 10.9998 17.5V21H12.9998V17.5C12.9998 16.9477 12.5521 16.5 11.9998 16.5Z',
  d17: 'M5 21C4.44771 21 4 21.4477 4 22C4 22.5523 4.44771 23 5 23H19C19.5523 23 20 22.5523 20 22C20 21.4477 19.5523 21 19 21C12.1001 21 12.2616 21 5 21Z',
  d18: 'M10.9998 2C10.9998 1.44772 11.4475 1 11.9998 1C12.5521 1 12.9998 1.44772 12.9998 2V7.31062C12.6741 7.26786 12.3253 7.24872 11.9845 7.25007C11.6525 7.25138 11.3147 7.27221 10.9998 7.31412V2Z',
  d19: 'M8.50015 14.9998L10.0002 7.99976H14.0002L15.5002 14.9998H8.50015Z',
  d20: 'M7.5 19L9 17.5H15L16.5 19',
  d21: 'M21 14V9L17 4L7 4L3 9V14',
  d22: 'M9.26681 7.84261C9.34091 7.49681 9.64651 7.24976 10.0002 7.24976H14.0002C14.3538 7.24976 14.6594 7.49681 14.7335 7.84261L16.2335 14.8426C16.281 15.0641 16.2258 15.2951 16.0834 15.4713C15.941 15.6474 15.7267 15.7498 15.5002 15.7498H8.50016C8.27367 15.7498 8.0593 15.6474 7.91691 15.4713C7.77452 15.2951 7.71935 15.0641 7.76681 14.8426L9.26681 7.84261Z',
  d23: 'M8.29289 16.7929C8.48043 16.6054 8.73478 16.5 9 16.5H15C15.2652 16.5 15.5196 16.6054 15.7071 16.7929L17.2071 18.2929L15.7929 19.7071L14.5858 18.5H9.41421L8.20711 19.7071L6.79289 18.2929L8.29289 16.7929Z',
  d24: 'M13 21V17.5H11V21H5V23H19V21H13Z',
  d25: 'M6.21913 3.3753C6.4089 3.13809 6.69622 3 7 3H17C17.3038 3 17.5911 3.13809 17.7809 3.3753L21.7809 8.37531C21.9227 8.55262 22 8.77293 22 9V14H20V9.35078L16.5194 5H7.48063L4 9.35078V14H2V9C2 8.77293 2.07728 8.55262 2.21913 8.37531L6.21913 3.3753Z',
  d26: 'M18 13H21V11H18V13ZM6 11H3V13H6V11Z',
  d27: 'M11 1V8H13V1L11 1Z',
};

export const IconEquipmentChestPressStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-stroke-rounded IconEquipmentChestPressStrokeRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentChestPressDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-duotone-rounded IconEquipmentChestPressDuotoneRounded"
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
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentChestPressTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-twotone-rounded IconEquipmentChestPressTwotoneRounded"
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
        d={d.d7} 
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
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentChestPressSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-solid-rounded IconEquipmentChestPressSolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentChestPressBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-bulk-rounded IconEquipmentChestPressBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
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
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconEquipmentChestPressStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-stroke-sharp IconEquipmentChestPressStrokeSharp"
    >
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconEquipmentChestPressSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="equipment-chest-press-solid-sharp IconEquipmentChestPressSolidSharp"
    >
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d25} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfEquipmentChestPress: TheIconSelfPack = {
  name: 'EquipmentChestPress',
  StrokeRounded: IconEquipmentChestPressStrokeRounded,
  DuotoneRounded: IconEquipmentChestPressDuotoneRounded,
  TwotoneRounded: IconEquipmentChestPressTwotoneRounded,
  SolidRounded: IconEquipmentChestPressSolidRounded,
  BulkRounded: IconEquipmentChestPressBulkRounded,
  StrokeSharp: IconEquipmentChestPressStrokeSharp,
  SolidSharp: IconEquipmentChestPressSolidSharp,
};