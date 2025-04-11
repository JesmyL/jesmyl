import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 11L12 20',
  d2: 'M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z',
  d3: 'M16.9588 6C17.6186 6.86961 18 7.89801 18 9C18 10.102 17.6186 11.1304 16.9588 12M7.04117 6C6.38143 6.86961 6 7.89801 6 9C6 10.102 6.38143 11.1304 7.04117 12',
  d4: 'M20.3159 4C21.3796 5.43008 22 7.14984 22 9C22 10.8502 21.3796 12.5699 20.3159 14M3.68409 4C2.62036 5.43008 2 7.14984 2 9C2 10.8502 2.62036 12.5699 3.68409 14',
  d5: 'M12 6.25C10.4812 6.25 9.25 7.48122 9.25 9C9.25 10.166 9.97566 11.1625 11 11.5625L11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20L13 11.5625C14.0243 11.1625 14.75 10.166 14.75 9C14.75 7.48122 13.5188 6.25 12 6.25Z',
  d6: 'M4.48646 4.59689C4.81607 4.15375 4.72405 3.52731 4.28091 3.19769C3.83777 2.86807 3.21133 2.9601 2.88171 3.40324C1.69869 4.99371 1 6.92024 1 9.00006C1 11.0799 1.69869 13.0064 2.88171 14.5969C3.21133 15.04 3.83777 15.1321 4.28091 14.8024C4.72405 14.4728 4.81607 13.8464 4.48646 13.4032C3.54203 12.1335 3 10.6206 3 9.00006C3 7.37957 3.54203 5.86658 4.48646 4.59689Z',
  d7: 'M21.1183 3.40324C20.7887 2.9601 20.1622 2.86807 19.7191 3.19769C19.276 3.52731 19.1839 4.15375 19.5135 4.59689C20.458 5.86658 21 7.37957 21 9.00006C21 10.6206 20.458 12.1335 19.5135 13.4032C19.1839 13.8464 19.276 14.4728 19.7191 14.8024C20.1622 15.1321 20.7887 15.04 21.1183 14.5969C22.3013 13.0064 23 11.0799 23 9.00006C23 6.92024 22.3013 4.99371 21.1183 3.40324Z',
  d8: 'M17.7555 5.39565C17.4217 4.95565 16.7944 4.86957 16.3544 5.20338C15.9144 5.53719 15.8283 6.16447 16.1622 6.60446C16.703 7.31733 17 8.1369 17 9.00005C17 9.86321 16.703 10.6828 16.1622 11.3956C15.8283 11.8356 15.9144 12.4629 16.3544 12.7967C16.7944 13.1305 17.4217 13.0445 17.7555 12.6045C18.5342 11.5781 19 10.3409 19 9.00005C19 7.65922 18.5342 6.422 17.7555 5.39565Z',
  d9: 'M7.83785 6.60446C8.17165 6.16447 8.08557 5.53719 7.64558 5.20338C7.20559 4.86957 6.57831 4.95565 6.2445 5.39565C5.46584 6.422 5 7.65922 5 9.00005C5 10.3409 5.46584 11.5781 6.2445 12.6045C6.57831 13.0445 7.20559 13.1305 7.64558 12.7967C8.08557 12.4629 8.17165 11.8356 7.83785 11.3956C7.29702 10.6828 7 9.86321 7 9.00005C7 8.1369 7.29702 7.31733 7.83785 6.60446Z',
  d10: 'M3 9.34682C3 7.72633 3.54203 6.21334 4.48646 4.94365L2.88171 3.75C1.69869 5.34047 1 7.267 1 9.34682C1 11.4266 1.69869 13.3532 2.88171 14.9436L4.48646 13.75C3.54203 12.4803 3 10.9673 3 9.34682Z',
  d11: 'M19.5135 4.94365C20.458 6.21334 21 7.72633 21 9.34682C21 10.9673 20.458 12.4803 19.5135 13.75L21.1183 14.9436C22.3013 13.3532 23 11.4266 23 9.34682C23 7.267 22.3013 5.34047 21.1183 3.75L19.5135 4.94365Z',
  d12: 'M17 9.3466C17 8.48344 16.703 7.66387 16.1622 6.95101L17.7555 5.74219C18.5342 6.76854 19 8.00576 19 9.3466C19 10.6874 18.5342 11.9247 17.7555 12.951L16.1622 11.7422C16.703 11.0293 17 10.2098 17 9.3466Z',
  d13: 'M7.83785 6.95101C7.29702 7.66387 7 8.48344 7 9.3466C7 10.2098 7.29702 11.0293 7.83785 11.7422L6.2445 12.951C5.46584 11.9247 5 10.6874 5 9.3466C5 8.00576 5.46584 6.76854 6.2445 5.74219L7.83785 6.95101Z',
  d14: 'M12 6.34668C10.3431 6.34668 9 7.68983 9 9.34668C9 10.6529 9.83481 11.7641 11 12.176V20.25H13V12.176C14.1652 11.7641 15 10.6529 15 9.34668C15 7.68983 13.6569 6.34668 12 6.34668Z',
};

export const IconCellularNetworkStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCellularNetworkDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork DuotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCellularNetworkTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCellularNetworkSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork SolidRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCellularNetworkBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <g    i-c="o7">
      <path 
        d={d.d6}
        i-c="f"
      />
      <path 
        d={d.d7}
        i-c="f"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
      <path 
        d={d.d9}
        i-c="f"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconCellularNetworkStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork StrokeSharp"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sw"
      />
      <path 
        d={d.d4}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconCellularNetworkSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CellularNetwork SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="f"
      />
      <path 
        d={d.d11}
        i-c="f"
      />
      <path 
        d={d.d12}
        i-c="f"
      />
      <path 
        d={d.d13}
        i-c="f"
      />
      <path 
        d={d.d14}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCellularNetwork: TheIconSelfPack = [
  'CellularNetwork',
  IconCellularNetworkStrokeRounded,
  IconCellularNetworkDuotoneRounded,
  IconCellularNetworkTwotoneRounded,
  IconCellularNetworkSolidRounded,
  IconCellularNetworkBulkRounded,
  IconCellularNetworkStrokeSharp,
  IconCellularNetworkSolidSharp,
];