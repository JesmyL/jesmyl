import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 9L18 15H6V10C6 9.17267 6.17267 9 7 9H12ZM12 9L6 3H17C17.8273 3 18 3.17267 18 4V8C18 8.82733 17.8273 9 17 9H12Z',
  d2: 'M12 21L6 15H12V21Z',
  d3: 'M6 3L12 9H17C17.8273 9 18 8.82733 18 8V4C18 3.17267 17.8273 3 17 3H6Z',
  d4: 'M17.9998 15.7334C18.3032 15.7334 18.5766 15.5511 18.6927 15.2716C18.8088 14.992 18.7447 14.6702 18.5302 14.4562L12.4998 9L15.7498 9C17.1641 9 17.8712 9 18.3105 8.56066C18.7498 8.12132 18.7498 7.41421 18.7498 6V4C18.7498 3.77694 18.7392 3.54648 18.6925 3.3338C18.6439 3.11261 18.5466 2.86564 18.3404 2.65942C18.1342 2.4532 17.8872 2.35596 17.6661 2.30737C17.4534 2.26065 17.2229 2.25 16.9998 2.25H5.99985C5.6965 2.25 5.42302 2.43273 5.30694 2.71299C5.19085 2.99324 5.25502 3.31583 5.46952 3.53033L11.4998 9H8.24982C6.83561 9 6.1285 9 5.68916 9.43826C5.24982 9.87652 5.24982 10.5819 5.24982 11.9926V14.864C5.24982 15.4185 5.48115 15.9479 5.88831 16.3254L10.2794 20.718L10.2794 20.718C11.0089 21.474 11.3737 21.852 11.6868 21.7262C11.9998 21.6003 11.9998 21.0756 11.9998 20.0262V17.7285C11.9998 16.788 11.9998 16.3178 12.2927 16.0256C12.5856 15.7334 13.057 15.7334 13.9998 15.7334L17.9998 15.7334Z',
  d5: 'M18.6927 15.2716C18.5766 15.5511 18.3032 15.7334 17.9998 15.7334H13.9998C13.057 15.7334 12.5856 15.7334 12.2927 16.0256C11.9998 16.3178 11.9998 16.788 11.9998 17.7285V20.0262C11.9998 21.0756 11.9998 21.6003 11.6868 21.7262C11.3737 21.852 11.0089 21.474 10.2794 20.718L5.88831 16.3254C5.48115 15.9479 5.24982 15.4185 5.24982 14.864V11.9926C5.24982 10.5819 5.24982 9.87652 5.68916 9.43826C6.1285 9 6.83561 9 8.24982 9H12.4998L18.5302 14.4562C18.7447 14.6702 18.8088 14.992 18.6927 15.2716Z',
  d6: 'M5.30694 2.71299C5.42302 2.43273 5.6965 2.25 5.99985 2.25H16.9998C17.2229 2.25 17.4534 2.26065 17.6661 2.30737C17.8872 2.35596 18.1342 2.4532 18.3404 2.65942C18.5466 2.86564 18.6439 3.11261 18.6925 3.3338C18.7392 3.54648 18.7498 3.77694 18.7498 4V6C18.7498 7.41421 18.7498 8.12132 18.3105 8.56066C17.8712 9 17.1641 9 15.7498 9H11.4998L5.46952 3.53033C5.25502 3.31583 5.19085 2.99324 5.30694 2.71299Z',
  d7: 'M11.9963 20.9976L6.00558 14.9976H11.9963V20.9976Z',
  d8: 'M11.9612 8.9518L17.9852 15.0027C17.9915 15.009 17.9871 15.0198 17.9782 15.0198H6.00775C6.00223 15.0198 5.99776 15.0153 5.99776 15.0098V8.9518H11.9612ZM11.9612 8.9518L6.05515 3.0195C6.04887 3.0132 6.05333 3.00244 6.06222 3.00244H18.0022V8.9518H11.9612Z',
  d9: 'M12 9L18 15H6V9H12L6 3H18V9H12Z',
};

export const IconFramerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconFramerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer DuotoneRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d2}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconFramerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sw"
      />
    </TheIconWrapper>
  );
};

export const IconFramerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer SolidRounded"
    >
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconFramerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer BulkRounded"
    >
      <path 
        d={d.d5}
        i-c="f o7"
      />
      <path 
        d={d.d6}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconFramerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer StrokeSharp"
    >
      <path 
        d={d.d7}
        i-c="s sj sw"
      />
      <path 
        d={d.d8}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconFramerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Framer SolidSharp"
    >
      <path 
        d={d.d9}
        i-c="f"
      />
      <path 
        d={d.d2}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFramer: TheIconSelfPack = [
  'Framer',
  IconFramerStrokeRounded,
  IconFramerDuotoneRounded,
  IconFramerTwotoneRounded,
  IconFramerSolidRounded,
  IconFramerBulkRounded,
  IconFramerStrokeSharp,
  IconFramerSolidSharp,
];