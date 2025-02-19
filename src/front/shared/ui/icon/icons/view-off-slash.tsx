import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526',
  d2: 'M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421',
  d3: 'M3 3L21 21',
  d4: 'M12 19.0006C7.31078 19.0006 3.8221 14.8712 2.45604 12.9556C2.15201 12.5293 2 12.3162 2 12.0006C2 11.6851 2.15201 11.4719 2.45604 11.0456C3.24215 9.94329 4.73118 8.10782 6.74742 6.74805L9.92862 9.92925L9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421L14.0708 14.0714L17.2526 17.2532C15.7651 18.2564 13.9908 19.0006 12 19.0006Z',
  d5: 'M12 4.25C11.0058 4.25 10.0648 4.41965 9.18654 4.70497C8.93836 4.78559 8.74992 4.98943 8.689 5.24317C8.62807 5.49691 8.70342 5.76408 8.88794 5.9486L18.9086 15.9693C19.2008 16.2614 19.6741 16.2623 19.9673 15.9713C20.9298 15.016 21.7239 13.9948 22.2078 13.3163C22.461 12.9642 22.75 12.5622 22.75 12C22.75 11.4378 22.4077 10.9616 22.1546 10.6095C21.4487 9.61974 20.1869 8.04576 18.4797 6.71298C16.774 5.38141 14.5706 4.25 12 4.25ZM7.27775 6.21709C7.02388 5.96322 6.62572 5.92487 6.32806 6.12561C4.20574 7.55694 2.60227 9.54781 1.79219 10.6837C1.53904 11.0358 1.25 11.4378 1.25 12C1.25 12.5622 1.59226 13.0384 1.84541 13.3905C2.55126 14.3803 3.81313 15.9542 5.52031 17.287C7.22595 18.6186 9.42944 19.75 12 19.75C14.1829 19.75 16.1016 18.9335 17.6719 17.8744C17.8576 17.7491 17.9776 17.5475 17.9991 17.3245C18.0206 17.1015 17.9413 16.8806 17.7829 16.7223L7.27775 6.21709ZM9.52944 9.5C8.8934 10.136 8.5 11.0147 8.5 11.9853C8.5 13.9264 10.0736 15.5 12.0147 15.5C12.9853 15.5 13.864 15.1066 14.5 14.4706L9.52944 9.5Z',
  d6: 'M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z',
  d7: 'M7.27775 6.21773C7.02388 5.96386 6.62572 5.92551 6.32806 6.12625C4.20574 7.55758 2.60227 9.54845 1.79219 10.6844C1.53904 11.0365 1.25 11.4384 1.25 12.0006C1.25 12.5628 1.59226 13.039 1.84541 13.3911C2.55126 14.3809 3.81313 15.9549 5.52031 17.2877C7.22595 18.6192 9.42944 19.7506 12 19.7506C14.1829 19.7506 16.1016 18.9341 17.6719 17.875C17.8576 17.7498 17.9776 17.5481 17.9991 17.3251C18.0206 17.1022 17.9413 16.8813 17.7829 16.7229L15.0153 13.9553L14.5 14.4706C13.864 15.1066 12.9853 15.5 12.0147 15.5C10.0736 15.5 8.5 13.9264 8.5 11.9853C8.5 11.0147 8.8934 10.136 9.52944 9.5L10.0447 8.98471L7.27775 6.21773Z',
  d8: 'M9.18626 4.70497C10.0645 4.41965 11.0055 4.25 11.9997 4.25C14.5703 4.25 16.7738 5.38141 18.4794 6.71298C20.1866 8.04576 21.4485 9.61974 22.1543 10.6095C22.4075 10.9616 22.7497 11.4378 22.7497 12C22.7497 12.5622 22.4607 12.9642 22.2075 13.3163L22.2075 13.3163C21.7236 13.9948 20.9295 15.016 19.967 15.9713C19.6738 16.2623 19.2005 16.2614 18.9084 15.9693L8.88765 5.9486C8.70313 5.76408 8.62779 5.49691 8.68871 5.24317C8.74964 4.98943 8.93807 4.78559 9.18626 4.70497Z',
  d9: 'M19.439 15.439C21 14 22 12 22 12C20.5 9 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M17 17.4186C15.5657 18.3368 13.8793 19 12 19C7.31078 19 3.5 15 2 12C2 12 3.5 9 6.5 6.91847',
  d10: 'M3.41421 2L22 20.5858L20.5858 22L2 3.41421L3.41421 2Z',
  d11: 'M21.6798 13.5517C21.1723 14.2185 20.4399 15.1062 19.533 15.9996L8.57638 5.04298C9.63744 4.55851 10.7876 4.25 11.998 4.25C15.0225 4.25 17.671 6.17619 19.4927 7.96086C20.4182 8.86758 21.1648 9.77169 21.6798 10.4483C21.8777 10.7083 22.3199 11.365 22.5771 11.747C22.6551 11.8628 22.716 11.9534 22.748 12C22.716 12.0466 22.6551 12.1372 22.5771 12.253C22.3199 12.635 21.8777 13.2917 21.6798 13.5517Z',
  d12: 'M4.50341 7.96086C5.0524 7.42304 5.67647 6.87236 6.36328 6.36542L9.51272 9.51486C8.88536 10.1497 8.49805 11.0223 8.49805 11.9853C8.49805 13.9264 10.0716 15.5 12.0128 15.5C12.9758 15.5 13.8484 15.1127 14.4832 14.4853L17.6326 17.6347C16.0404 18.8099 14.111 19.75 11.998 19.75C8.97355 19.75 6.32513 17.8238 4.50341 16.0391C3.57786 15.1324 2.8313 14.2283 2.31631 13.5517C2.11838 13.2917 1.67628 12.6351 1.41908 12.2531C1.34106 12.1372 1.28006 12.0466 1.24805 12C1.28006 11.9534 1.34109 11.8628 1.41911 11.7469C1.67632 11.3649 2.1184 10.7083 2.31631 10.4483C2.8313 9.77169 3.57786 8.86758 4.50341 7.96086Z',
};

export const IconViewOffSlashStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-stroke-rounded IconViewOffSlashStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconViewOffSlashDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-duotone-rounded IconViewOffSlashDuotoneRounded"
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

export const IconViewOffSlashTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-twotone-rounded IconViewOffSlashTwotoneRounded"
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

export const IconViewOffSlashSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-solid-rounded IconViewOffSlashSolidRounded"
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

export const IconViewOffSlashBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-bulk-rounded IconViewOffSlashBulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconViewOffSlashStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-stroke-sharp IconViewOffSlashStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconViewOffSlashSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="view-off-slash-solid-sharp IconViewOffSlashSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
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

export const iconPackOfViewOffSlash: TheIconSelfPack = {
  name: 'ViewOffSlash',
  StrokeRounded: IconViewOffSlashStrokeRounded,
  DuotoneRounded: IconViewOffSlashDuotoneRounded,
  TwotoneRounded: IconViewOffSlashTwotoneRounded,
  SolidRounded: IconViewOffSlashSolidRounded,
  BulkRounded: IconViewOffSlashBulkRounded,
  StrokeSharp: IconViewOffSlashStrokeSharp,
  SolidSharp: IconViewOffSlashSolidSharp,
};