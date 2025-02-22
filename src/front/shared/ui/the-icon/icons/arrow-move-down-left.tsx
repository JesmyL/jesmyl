import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18',
  d2: 'M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15',
  d3: 'M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15',
  d4: 'M20 2C20.5523 2 21 2.44772 21 3L21 5.20428C21.0001 7.08446 21.0001 8.16375 20.8399 9.08649C19.9572 14.1711 15.6121 18.073 10.1857 18.8571C9.67764 18.9305 8.91037 18.9662 7.99997 18.9836C7.99958 19.4971 7.99543 19.9701 7.95605 20.3387C7.92065 20.6702 7.8117 21.5004 7.12434 21.8623C6.44192 22.2217 5.83032 21.7854 5.58587 21.598C5.28839 21.37 4.93593 21.0199 4.55929 20.6457L4.51352 20.6003C4.18398 20.273 3.84245 19.9055 3.57595 19.534C3.44219 19.3475 3.30836 19.134 3.20433 18.9012C3.10358 18.6756 3 18.3639 3 18C3 17.6361 3.10358 17.3244 3.20433 17.0988C3.30836 16.866 3.44219 16.6525 3.57594 16.4661C3.84245 16.0945 4.18398 15.727 4.51351 15.3997L4.55928 15.3543C4.93593 14.9801 5.28838 14.63 5.58587 14.402C5.83032 14.2146 6.44192 13.7783 7.12434 14.1377C7.8117 14.4996 7.92065 15.3298 7.95605 15.6613C7.99458 16.022 7.99939 16.4825 7.99994 16.9832C8.83226 16.9675 9.48977 16.9369 9.89963 16.8777C14.5748 16.2021 18.1522 12.8759 18.8694 8.74441C18.9963 8.01354 19 7.11961 19 5.07692V3C19 2.44772 19.4477 2 20 2Z',
  d5: 'M20.0001 2C20.5523 2 21.0001 2.44772 21.0001 3L21.0001 5.20428C21.0001 7.08446 21.0002 8.16375 20.84 9.08649C19.9573 14.1711 15.6122 18.073 10.1857 18.8571C9.6777 18.9305 8.91043 18.9662 8.00003 18.9836L8 16.9832C8.83232 16.9675 9.48983 16.9369 9.89968 16.8777C14.5748 16.2021 18.1522 12.8759 18.8695 8.74441C18.9963 8.01354 19.0001 7.11961 19.0001 5.07692V3C19.0001 2.44772 19.4478 2 20.0001 2Z',
  d6: 'M5.58587 14.402C5.83032 14.2146 6.44192 13.7783 7.12434 14.1377C7.8117 14.4996 7.92065 15.3298 7.95605 15.6613C7.99458 16.022 7.99942 18.4829 7.99997 18.9836C7.99958 19.4971 7.99543 19.9701 7.95605 20.3387C7.92065 20.6702 7.8117 21.5004 7.12434 21.8623C6.44192 22.2217 5.83032 21.7854 5.58587 21.598C5.28839 21.37 4.93593 21.0199 4.55929 20.6457L4.51352 20.6003C4.18398 20.273 3.84245 19.9055 3.57595 19.534C3.44219 19.3475 3.30836 19.134 3.20433 18.9012C3.10358 18.6756 3 18.3639 3 18C3 17.6361 3.10358 17.3244 3.20433 17.0988C3.30836 16.866 3.44219 16.6525 3.57594 16.4661C3.84245 16.0945 4.18398 15.727 4.51351 15.3997L4.55928 15.3543C4.93593 14.9801 5.28838 14.63 5.58587 14.402Z',
  d7: 'M8.98267 13.059L5 17.0295L8.98267 21M19 3V16.9102C19 16.9655 18.955 17.0295 18.8995 17.0295H5.35254',
  d8: 'M7.82834 17.2929L10.1213 19.586L8.70709 21.0001L4 16.2929L8.7071 11.5858L10.1213 13L7.82844 15.2929L18 15.2928L17.9999 3H19.9999L20 16.2928C20 16.8451 19.5523 17.2928 19 17.2928L7.82834 17.2929Z',
};

export const IconArrowMoveDownLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-stroke-rounded IconArrowMoveDownLeftStrokeRounded"
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

export const IconArrowMoveDownLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-duotone-rounded IconArrowMoveDownLeftDuotoneRounded"
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

export const IconArrowMoveDownLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-twotone-rounded IconArrowMoveDownLeftTwotoneRounded"
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

export const IconArrowMoveDownLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-solid-rounded IconArrowMoveDownLeftSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-bulk-rounded IconArrowMoveDownLeftBulkRounded"
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

export const IconArrowMoveDownLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-stroke-sharp IconArrowMoveDownLeftStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconArrowMoveDownLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="arrow-move-down-left-solid-sharp IconArrowMoveDownLeftSolidSharp"
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

export const iconPackOfArrowMoveDownLeft: TheIconSelfPack = {
  name: 'ArrowMoveDownLeft',
  StrokeRounded: IconArrowMoveDownLeftStrokeRounded,
  DuotoneRounded: IconArrowMoveDownLeftDuotoneRounded,
  TwotoneRounded: IconArrowMoveDownLeftTwotoneRounded,
  SolidRounded: IconArrowMoveDownLeftSolidRounded,
  BulkRounded: IconArrowMoveDownLeftBulkRounded,
  StrokeSharp: IconArrowMoveDownLeftStrokeSharp,
  SolidSharp: IconArrowMoveDownLeftSolidSharp,
};