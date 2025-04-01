import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.5 2C15.7998 2 17.4497 2 18.4749 3.02513C19.5 4.05025 19.5 5.70017 19.5 9V15C19.5 18.2998 19.5 19.9497 18.4749 20.9749C17.4497 22 15.7998 22 12.5 22H11.5C8.20017 22 6.55025 22 5.52513 20.9749C4.5 19.9497 4.5 18.2998 4.5 15L4.5 9C4.5 5.70017 4.5 4.05025 5.52513 3.02513C6.55025 2 8.20017 2 11.5 2L12.5 2Z',
  d2: 'M8 15H10',
  d3: 'M8 18H10',
  d4: 'M14 15H16',
  d5: 'M14 18H16',
  d6: 'M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z',
  d7: 'M18.4749 3.02513C17.4497 2 15.7998 2 12.5 2H11.5C8.20017 2 6.55025 2 5.52513 3.02513C4.5 4.05025 4.5 5.70017 4.5 9V15C4.5 18.2998 4.5 19.9497 5.52513 20.9749C6.55025 22 8.20017 22 11.5 22H12.5C15.7998 22 17.4497 22 18.4749 20.9749C19.5 19.9497 19.5 18.2998 19.5 15V9C19.5 5.70017 19.5 4.05025 18.4749 3.02513ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z',
  d8: 'M16.4404 1.38483C15.4373 1.24997 14.1584 1.24998 12.5558 1.25H12.5558H11.4443H11.4442C9.84166 1.24998 8.5627 1.24997 7.55961 1.38483C6.52335 1.52415 5.66994 1.81966 4.9948 2.4948C4.31966 3.16994 4.02415 4.02335 3.88483 5.05961C3.74997 6.06269 3.74998 7.34165 3.75 8.94423V8.94424V15.0557V15.0558C3.74998 16.6583 3.74997 17.9373 3.88483 18.9404C4.02415 19.9767 4.31966 20.8301 4.9948 21.5052C5.66994 22.1803 6.52335 22.4758 7.55961 22.6152C8.5627 22.75 9.84166 22.75 11.4443 22.75H12.5557C14.1583 22.75 15.4373 22.75 16.4404 22.6152C17.4767 22.4758 18.3301 22.1803 19.0052 21.5052C19.6803 20.8301 19.9758 19.9767 20.1152 18.9404C20.25 17.9373 20.25 16.6583 20.25 15.0557V8.94426C20.25 7.34166 20.25 6.0627 20.1152 5.05961C19.9758 4.02335 19.6803 3.16994 19.0052 2.4948C18.3301 1.81966 17.4767 1.52415 16.4404 1.38483ZM7.92332 14.2539C7.54513 14.2923 7.25 14.6117 7.25 15C7.25 15.4142 7.58579 15.75 8 15.75H10C10.4142 15.75 10.75 15.4142 10.75 15C10.75 14.5858 10.4142 14.25 10 14.25H8C7.97411 14.25 7.94853 14.2513 7.92332 14.2539ZM7.25 18C7.25 17.5858 7.58579 17.25 8 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H8C7.97411 18.75 7.94853 18.7487 7.92332 18.7461C7.54513 18.7077 7.25 18.3883 7.25 18ZM14 14.25C13.5858 14.25 13.25 14.5858 13.25 15C13.25 15.4142 13.5858 15.75 14 15.75H16C16.4142 15.75 16.75 15.4142 16.75 15C16.75 14.5858 16.4142 14.25 16 14.25H14ZM13.25 18C13.25 17.5858 13.5858 17.25 14 17.25H16C16.4142 17.25 16.75 17.5858 16.75 18C16.75 18.4142 16.4142 18.75 16 18.75H14C13.5858 18.75 13.25 18.4142 13.25 18ZM12 4.25C10.0584 4.25 8.4614 5.72562 8.26936 7.61658C8.25656 7.74265 8.25 7.87056 8.25 8C8.25 10.0711 9.92893 11.75 12 11.75C14.0711 11.75 15.75 10.0711 15.75 8C15.75 5.92893 14.0711 4.25 12 4.25ZM9.75 8C9.75 6.75736 10.7574 5.75 12 5.75C13.2378 5.75 14.2421 6.74951 14.25 7.98545L14.25 8C14.25 9.24264 13.2426 10.25 12 10.25C10.7574 10.25 9.75 9.24264 9.75 8Z',
  d9: 'M9.75 8C9.75 6.75736 10.7574 5.75 12 5.75C13.2426 5.75 14.25 6.75736 14.25 8C14.25 9.24264 13.2426 10.25 12 10.25C10.7574 10.25 9.75 9.24264 9.75 8Z',
  d10: 'M16.4404 1.38483C15.4373 1.24997 14.1583 1.24998 12.5558 1.25H11.4443C9.84167 1.24998 8.5627 1.24997 7.55961 1.38483C6.52335 1.52415 5.66994 1.81966 4.9948 2.4948C4.31966 3.16994 4.02415 4.02335 3.88483 5.05961C3.74997 6.0627 3.74998 7.34165 3.75 8.94424V15.0557C3.74998 16.6583 3.74997 17.9373 3.88483 18.9404C4.02415 19.9767 4.31966 20.8301 4.9948 21.5052C5.66994 22.1803 6.52335 22.4758 7.55961 22.6152C8.5627 22.75 9.84166 22.75 11.4443 22.75H12.5557C14.1583 22.75 15.4373 22.75 16.4404 22.6152C17.4767 22.4758 18.3301 22.1803 19.0052 21.5052C19.6803 20.8301 19.9758 19.9767 20.1152 18.9404C20.25 17.9373 20.25 16.6583 20.25 15.0557V8.94426C20.25 7.34166 20.25 6.0627 20.1152 5.05961C19.9758 4.02335 19.6803 3.16994 19.0052 2.4948C18.3301 1.81966 17.4767 1.52415 16.4404 1.38483ZM8 14.25C7.58579 14.25 7.25 14.5858 7.25 15C7.25 15.4142 7.58579 15.75 8 15.75H10C10.4142 15.75 10.75 15.4142 10.75 15C10.75 14.5858 10.4142 14.25 10 14.25H8ZM7.25 18C7.25 17.5858 7.58579 17.25 8 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H8C7.58579 18.75 7.25 18.4142 7.25 18ZM14 14.25C13.5858 14.25 13.25 14.5858 13.25 15C13.25 15.4142 13.5858 15.75 14 15.75H16C16.4142 15.75 16.75 15.4142 16.75 15C16.75 14.5858 16.4142 14.25 16 14.25H14ZM13.25 18C13.25 17.5858 13.5858 17.25 14 17.25H16C16.4142 17.25 16.75 17.5858 16.75 18C16.75 18.4142 16.4142 18.75 16 18.75H14C13.5858 18.75 13.25 18.4142 13.25 18ZM12 4.25C9.92893 4.25 8.25 5.92893 8.25 8C8.25 10.0711 9.92893 11.75 12 11.75C14.0711 11.75 15.75 10.0711 15.75 8C15.75 5.92893 14.0711 4.25 12 4.25Z',
  d11: 'M8.25 8C8.25 5.92893 9.92893 4.25 12 4.25C14.0711 4.25 15.75 5.92893 15.75 8C15.75 10.0711 14.0711 11.75 12 11.75C9.92893 11.75 8.25 10.0711 8.25 8ZM12 5.75C10.7574 5.75 9.75 6.75736 9.75 8C9.75 9.24264 10.7574 10.25 12 10.25C13.2426 10.25 14.25 9.24264 14.25 8C14.25 6.75736 13.2426 5.75 12 5.75Z',
  d12: 'M8 14.25C7.58579 14.25 7.25 14.5858 7.25 15C7.25 15.4142 7.58579 15.75 8 15.75H10C10.4142 15.75 10.75 15.4142 10.75 15C10.75 14.5858 10.4142 14.25 10 14.25H8ZM7.25 18C7.25 17.5858 7.58579 17.25 8 17.25H10C10.4142 17.25 10.75 17.5858 10.75 18C10.75 18.4142 10.4142 18.75 10 18.75H8C7.58579 18.75 7.25 18.4142 7.25 18ZM14 14.25C13.5858 14.25 13.25 14.5858 13.25 15C13.25 15.4142 13.5858 15.75 14 15.75H16C16.4142 15.75 16.75 15.4142 16.75 15C16.75 14.5858 16.4142 14.25 16 14.25H14ZM13.25 18C13.25 17.5858 13.5858 17.25 14 17.25H16C16.4142 17.25 16.75 17.5858 16.75 18C16.75 18.4142 16.4142 18.75 16 18.75H14C13.5858 18.75 13.25 18.4142 13.25 18Z',
  d13: 'M19.5 2H4.5V22H19.5V2Z',
  d14: 'M7.5 15H10.5M7.5 18H10.5M13.5 15H16.5M13.5 18H16.5',
  d15: 'M3.75 2C3.75 1.58579 4.08579 1.25 4.5 1.25H19.5C19.9142 1.25 20.25 1.58579 20.25 2V22C20.25 22.4142 19.9142 22.75 19.5 22.75H4.5C4.08579 22.75 3.75 22.4142 3.75 22V2ZM10.5 15.75H7.5V14.25H10.5V15.75ZM16.5 15.75H13.5V14.25H16.5V15.75ZM10.5 18.75H7.5V17.25H10.5V18.75ZM16.5 18.75H13.5V17.25H16.5V18.75ZM9.75 8C9.75 6.75736 10.7574 5.75 12 5.75C13.2426 5.75 14.25 6.75736 14.25 8C14.25 9.24264 13.2426 10.25 12 10.25C10.7574 10.25 9.75 9.24264 9.75 8ZM12 4.25C9.92893 4.25 8.25 5.92893 8.25 8C8.25 10.0711 9.92893 11.75 12 11.75C14.0711 11.75 15.75 10.0711 15.75 8C15.75 5.92893 14.0711 4.25 12 4.25Z',
};

export const IconRemoteControlStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-stroke-rounded IconRemoteControlStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconRemoteControlDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-duotone-rounded IconRemoteControlDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconRemoteControlTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-twotone-rounded IconRemoteControlTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconRemoteControlSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-solid-rounded IconRemoteControlSolidRounded"
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

export const IconRemoteControlBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-bulk-rounded IconRemoteControlBulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      </g>
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

export const IconRemoteControlStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-stroke-sharp IconRemoteControlStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconRemoteControlSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="remote-control-solid-sharp IconRemoteControlSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRemoteControl: TheIconSelfPack = {
  name: 'RemoteControl',
  StrokeRounded: IconRemoteControlStrokeRounded,
  DuotoneRounded: IconRemoteControlDuotoneRounded,
  TwotoneRounded: IconRemoteControlTwotoneRounded,
  SolidRounded: IconRemoteControlSolidRounded,
  BulkRounded: IconRemoteControlBulkRounded,
  StrokeSharp: IconRemoteControlStrokeSharp,
  SolidSharp: IconRemoteControlSolidSharp,
};