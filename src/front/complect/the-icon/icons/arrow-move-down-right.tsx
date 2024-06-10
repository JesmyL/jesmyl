import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 3V5.07692C4 7.07786 4 8.07833 4.14533 8.91545C4.94529 13.5235 8.90656 17.1376 13.9574 17.8674C14.8749 18 16.8068 18 19 18',
  d2: 'M17 21C17.6068 20.4102 20 18.8403 20 18C20 17.1597 17.6068 15.5898 17 15',
  d3: 'M4 3V5.07692C4 7.07786 4 8.07833 4.14533 8.91545C4.94529 13.5235 8.90656 17.1376 13.9574 17.8674C14.8749 18 16.8068 18 19 18M17 21C17.6068 20.4102 20 18.8403 20 18C20 17.1597 17.6068 15.5898 17 15',
  d4: 'M4 2C3.44772 2 3 2.44772 3 3L3 5.20428C2.99992 7.08446 2.99987 8.16375 3.16006 9.08649C4.04276 14.1711 8.38788 18.073 13.8143 18.8571C14.3224 18.9305 15.0896 18.9662 16 18.9836C16.0004 19.4971 16.0046 19.9701 16.0439 20.3387C16.0794 20.6702 16.1883 21.5004 16.8757 21.8623C17.5581 22.2217 18.1697 21.7854 18.4141 21.598C18.7116 21.37 19.0641 21.0199 19.4407 20.6457L19.4865 20.6003C19.816 20.273 20.1576 19.9055 20.4241 19.534C20.5578 19.3475 20.6916 19.134 20.7957 18.9012C20.8964 18.6756 21 18.3639 21 18C21 17.6361 20.8964 17.3244 20.7957 17.0988C20.6916 16.866 20.5578 16.6525 20.4241 16.4661C20.1576 16.0945 19.816 15.727 19.4865 15.3997L19.4407 15.3543C19.0641 14.9801 18.7116 14.63 18.4141 14.402C18.1697 14.2146 17.5581 13.7783 16.8757 14.1377C16.1883 14.4996 16.0794 15.3298 16.0439 15.6613C16.0054 16.022 16.0006 16.4825 16.0001 16.9832C15.1677 16.9675 14.5102 16.9369 14.1004 16.8777C9.42524 16.2021 5.84782 12.8759 5.13059 8.74441C5.00371 8.01354 5 7.11961 5 5.07692V3C5 2.44772 4.55228 2 4 2Z',
  d5: 'M3.99994 2C3.44766 2 2.99994 2.44772 2.99994 3L2.99994 5.20428C2.99986 7.08446 2.99981 8.16375 3.16 9.08649C4.04271 14.1711 8.38782 18.073 13.8143 18.8571C14.3223 18.9305 15.0896 18.9662 16 18.9836L16 16.9832C15.1677 16.9675 14.5102 16.9369 14.1003 16.8777C9.42518 16.2021 5.84776 12.8759 5.13053 8.74441C5.00365 8.01354 4.99994 7.11961 4.99994 5.07692V3C4.99994 2.44772 4.55223 2 3.99994 2Z',
  d6: 'M18.4141 14.402C18.1697 14.2146 17.5581 13.7783 16.8757 14.1377C16.1883 14.4996 16.0794 15.3298 16.0439 15.6613C16.0054 16.022 16.0006 18.4829 16 18.9836C16.0004 19.4971 16.0046 19.9701 16.0439 20.3387C16.0794 20.6702 16.1883 21.5004 16.8757 21.8623C17.5581 22.2217 18.1697 21.7854 18.4141 21.598C18.7116 21.37 19.0641 21.0199 19.4407 20.6457L19.4865 20.6003C19.816 20.273 20.1576 19.9055 20.4241 19.534C20.5578 19.3475 20.6916 19.134 20.7957 18.9012C20.8964 18.6756 21 18.3639 21 18C21 17.6361 20.8964 17.3244 20.7957 17.0988C20.6916 16.866 20.5578 16.6525 20.4241 16.4661C20.1576 16.0945 19.816 15.727 19.4865 15.3997L19.4407 15.3543C19.0641 14.9801 18.7116 14.63 18.4141 14.402Z',
  d7: 'M15.0173 13.059L19 17.0295L15.0173 21M5 3V16.9102C5 16.9655 5.04501 17.0295 5.10053 17.0295H18.5704',
  d8: 'M16.1717 17.2929L13.8787 19.586L15.2929 21.0001L20 16.2929L15.2929 11.5858L13.8787 13L16.1716 15.2929L6 15.2928L6.00014 3H4.00014L4 16.2928C4 16.8451 4.44771 17.2928 4.99999 17.2928L16.1717 17.2929Z',
};

export const IconArrowMoveDownRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-stroke-rounded IconArrowMoveDownRightStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-duotone-rounded IconArrowMoveDownRightDuotoneRounded"
    >
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

export const IconArrowMoveDownRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-twotone-rounded IconArrowMoveDownRightTwotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-solid-rounded IconArrowMoveDownRightSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-bulk-rounded IconArrowMoveDownRightBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-stroke-sharp IconArrowMoveDownRightStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-right-solid-sharp IconArrowMoveDownRightSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArrowMoveDownRight: TheIconSelfPack = {
  name: 'ArrowMoveDownRight',
  StrokeRounded: IconArrowMoveDownRightStrokeRounded,
  DuotoneRounded: IconArrowMoveDownRightDuotoneRounded,
  TwotoneRounded: IconArrowMoveDownRightTwotoneRounded,
  SolidRounded: IconArrowMoveDownRightSolidRounded,
  BulkRounded: IconArrowMoveDownRightBulkRounded,
  StrokeSharp: IconArrowMoveDownRightStrokeSharp,
  SolidSharp: IconArrowMoveDownRightSolidSharp,
};