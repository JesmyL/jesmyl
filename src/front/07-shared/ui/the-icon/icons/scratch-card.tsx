import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 5H9C5.70017 5 4.05025 5 3.02513 6.02513C2 7.05025 2 8.70017 2 12V14C2 17.2998 2 18.9497 3.02513 19.9749C4.05025 21 5.70017 21 9 21H15C18.2998 21 19.9497 21 20.9749 19.9749C22 18.9497 22 17.2998 22 14V12C22 8.70017 22 7.05025 20.9749 6.02513C19.9497 5 18.2998 5 15 5Z',
  d2: 'M21.5 9H11.5L12.5 10.5H21.5V9Z',
  d3: 'M10 12.5C10 13.8807 8.88072 15 7.5 15C6.11928 15 5 13.8807 5 12.5C5 11.1193 6.11928 10 7.5 10C8.88072 10 10 11.1193 10 12.5Z',
  d4: 'M9 5H15C18.2998 5 19.9497 5 20.9749 6.02513C22 7.05025 22 8.70017 22 12V14C22 17.2998 22 18.9497 20.9749 19.9749C19.9497 21 18.2998 21 15 21H9C5.70017 21 4.05025 21 3.02513 19.9749C2 18.9497 2 17.2998 2 14V12C2 8.70017 2 7.05025 3.02513 6.02513C4.05025 5 5.70017 5 9 5ZM7.5 15C8.88072 15 10 13.8807 10 12.5C10 11.1193 8.88072 10 7.5 10C6.11928 10 5 11.1193 5 12.5C5 13.8807 6.11928 15 7.5 15Z',
  d5: 'M15.0558 4.25C16.6584 4.24998 17.9373 4.24997 18.9404 4.38483C19.9767 4.52415 20.8301 4.81966 21.5052 5.4948C22.1803 6.16994 22.4758 7.02335 22.6152 8.05961C22.6236 8.122 22.6314 8.18546 22.6388 8.25H11.5C11.2234 8.25 10.9693 8.40224 10.8387 8.64611C10.7082 8.88998 10.7225 9.18588 10.876 9.41603L11.876 10.916C12.0151 11.1247 12.2492 11.25 12.5 11.25H22.7496C22.75 11.4715 22.75 11.6999 22.75 11.9352V14.0557C22.75 15.6583 22.75 16.9373 22.6152 17.9404C22.4758 18.9767 22.1803 19.8301 21.5052 20.5052C20.8301 21.1803 19.9767 21.4758 18.9404 21.6152C17.9373 21.75 16.6583 21.75 15.0557 21.75H8.94426C7.34166 21.75 6.0627 21.75 5.05961 21.6152C4.02335 21.4758 3.16994 21.1803 2.4948 20.5052C1.81966 19.8301 1.52415 18.9767 1.38483 17.9404C1.24997 16.9373 1.24998 15.6583 1.25 14.0558V11.9443C1.24998 10.3417 1.24997 9.0627 1.38483 8.05961C1.52415 7.02335 1.81966 6.16994 2.4948 5.4948C3.16994 4.81966 4.02335 4.52415 5.05961 4.38483C6.06269 4.24997 7.34163 4.24998 8.94419 4.25H15.0558ZM7.5 9.25C5.70507 9.25 4.25 10.7051 4.25 12.5C4.25 14.2949 5.70506 15.75 7.5 15.75C9.29494 15.75 10.75 14.2949 10.75 12.5C10.75 10.7051 9.29493 9.25 7.5 9.25Z',
  d6: 'M15.0558 4.25C16.6583 4.24998 17.9373 4.24997 18.9404 4.38483C19.9767 4.52415 20.8301 4.81966 21.5052 5.4948C22.1803 6.16994 22.4758 7.02335 22.6152 8.05961C22.75 9.0627 22.75 10.3417 22.75 11.9443V14.0557C22.75 15.6583 22.75 16.9373 22.6152 17.9404C22.4758 18.9767 22.1803 19.8301 21.5052 20.5052C20.8301 21.1803 19.9767 21.4758 18.9404 21.6152C17.9373 21.75 16.6583 21.75 15.0557 21.75H8.94426C7.34166 21.75 6.0627 21.75 5.05961 21.6152C4.02335 21.4758 3.16994 21.1803 2.4948 20.5052C1.81966 19.8301 1.52415 18.9767 1.38483 17.9404C1.24997 16.9373 1.24998 15.6583 1.25 14.0558V14.0557V11.9443V11.9442C1.24998 10.3417 1.24997 9.0627 1.38483 8.05961C1.52415 7.02335 1.81966 6.16994 2.4948 5.4948C3.16994 4.81966 4.02335 4.52415 5.05961 4.38483C6.0627 4.24997 7.34166 4.24998 8.94425 4.25H8.94425H15.0557H15.0558Z',
  d7: 'M22.7496 11.25H12.5C12.2492 11.25 12.0151 11.1247 11.876 10.916L10.876 9.41603C10.7225 9.18588 10.7082 8.88997 10.8387 8.64611C10.9693 8.40224 11.2234 8.25 11.5 8.25H22.6388C22.7324 9.06861 22.7472 10.0608 22.7496 11.25Z',
  d8: 'M4.25 12.5C4.25 10.7051 5.70507 9.25 7.5 9.25C9.29493 9.25 10.75 10.7051 10.75 12.5C10.75 14.2949 9.29494 15.75 7.5 15.75C5.70506 15.75 4.25 14.2949 4.25 12.5Z',
  d9: 'M22 5H2V21H22V5Z',
  d10: 'M1.25 4.25H22.75V8.25H10.0977L12.0977 11.25H22.75V21.75H1.25V4.25ZM7.5 9.25C5.70507 9.25 4.25 10.7051 4.25 12.5C4.25 14.2949 5.70506 15.75 7.5 15.75C9.29494 15.75 10.75 14.2949 10.75 12.5C10.75 10.7051 9.29493 9.25 7.5 9.25Z',
};

export const IconScratchCardStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-stroke-rounded IconScratchCardStrokeRounded"
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

export const IconScratchCardDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-duotone-rounded IconScratchCardDuotoneRounded"
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
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconScratchCardTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-twotone-rounded IconScratchCardTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconScratchCardSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-solid-rounded IconScratchCardSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconScratchCardBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-bulk-rounded IconScratchCardBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconScratchCardStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-stroke-sharp IconScratchCardStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconScratchCardSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="scratch-card-solid-sharp IconScratchCardSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfScratchCard: TheIconSelfPack = {
  name: 'ScratchCard',
  StrokeRounded: IconScratchCardStrokeRounded,
  DuotoneRounded: IconScratchCardDuotoneRounded,
  TwotoneRounded: IconScratchCardTwotoneRounded,
  SolidRounded: IconScratchCardSolidRounded,
  BulkRounded: IconScratchCardBulkRounded,
  StrokeSharp: IconScratchCardStrokeSharp,
  SolidSharp: IconScratchCardSolidSharp,
};