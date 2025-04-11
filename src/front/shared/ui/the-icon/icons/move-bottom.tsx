import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9999 22L11.9999 12M11.9999 22C12.5619 22 12.9891 21.5619 13.8436 20.6857L15.5 19.0294M11.9999 22C11.4378 22 11.0106 21.5619 10.1561 20.6857L8.5 19.0296',
  d2: 'M12 1.25C14.2091 1.25 16 3.04086 16 5.25C16 7.45914 14.2091 9.25 12 9.25C9.79086 9.25 8 7.45914 8 5.25C8 3.04086 9.79086 1.25 12 1.25Z',
  d3: 'M12.0331 10.75C12.5854 10.75 13.0331 11.1977 13.0331 11.75L13.0331 17.75L14.3633 17.75C14.5088 17.7498 14.7209 17.7495 14.9014 17.7754C15.0985 17.8038 15.6159 17.9119 15.8787 18.4273C16.1395 18.939 15.9137 19.3882 15.8129 19.5564C15.7226 19.7069 15.5912 19.864 15.5021 19.9705L15.4799 19.9971C15.1057 20.4458 14.5624 21.0713 14.0255 21.5923C13.7593 21.8506 13.4701 22.1074 13.1862 22.3067C13.0442 22.4064 12.8816 22.5074 12.706 22.5868C12.5412 22.6614 12.2934 22.75 12 22.75C11.7066 22.75 11.4589 22.6614 11.294 22.5868C11.1185 22.5074 10.9559 22.4065 10.8138 22.3067C10.53 22.1074 10.2408 21.8506 9.97451 21.5923C9.43763 21.0714 8.89438 20.4458 8.52016 19.9971L8.49794 19.9705C8.40882 19.864 8.27739 19.7069 8.18716 19.5564C8.08634 19.3882 7.86047 18.939 8.12132 18.4274C8.3841 17.9119 8.90145 17.8038 9.09864 17.7754C9.27913 17.7495 9.49118 17.7498 9.63672 17.75L11.0331 17.75L11.0331 11.75C11.0331 11.1977 11.4808 10.75 12.0331 10.75Z',
  d4: 'M12.0018 12L12.0018 21.6577M15.502 19.0294L12.0018 22L8.50195 19.0296',
  d5: 'M11.998 1.24951C9.92698 1.24951 8.24805 2.92844 8.24805 4.99951C8.24805 7.07058 9.92698 8.74951 11.998 8.74951C14.0691 8.74951 15.748 7.07058 15.748 4.99951C15.748 2.92844 14.0691 1.24951 11.998 1.24951Z',
  d6: 'M10.9999 10.7671L10.9999 19.2786L8.79417 17.3532L7.5 18.878L11.9999 22.7506L16.4999 18.878L15.2057 17.3532L12.9999 19.2787L12.9999 10.7671H10.9999Z',
};

export const IconMoveBottomStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="3"
        cy="3"
        r="3"
        i-c="s sw t"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom DuotoneRounded"
    >
      <circle 
        cx="3"
        cy="3"
        r="3"
        i-c="f o7 t8"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="3"
        cy="3"
        r="3"
        i-c="s sw t"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <circle 
        cx="3"
        cy="3"
        r="3"
        i-c="o7 s sw t"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom BulkRounded"
    >
      <path 
        d={d.d2}
        i-c="f"
      />
      <path 
        d={d.d3}
        i-c="f o7"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom StrokeSharp"
    >
      <path 
        d={d.d4}
        i-c="s sw"
      />
      <circle 
        cx="3"
        cy="3"
        r="3"
        i-c="s sj sw t"
      />
    </TheIconWrapper>
  );
};

export const IconMoveBottomSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="MoveBottom SolidSharp"
    >
      <path 
        d={d.d5}
        i-c="f"
      />
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMoveBottom: TheIconSelfPack = [
  'MoveBottom',
  IconMoveBottomStrokeRounded,
  IconMoveBottomDuotoneRounded,
  IconMoveBottomTwotoneRounded,
  IconMoveBottomSolidRounded,
  IconMoveBottomBulkRounded,
  IconMoveBottomStrokeSharp,
  IconMoveBottomSolidSharp,
];