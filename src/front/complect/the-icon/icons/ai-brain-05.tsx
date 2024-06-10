import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 8.06866 4.65822 8.60037 4.93304 9.0535C3.54727 9.31855 2.5 10.537 2.5 12C2.5 13.463 3.54727 14.6814 4.93304 14.9465M7.5 4.5C7.5 3.11929 8.61929 2 10 2C11.3807 2 12.5 3.11929 12.5 4.5V6M7.5 4.5C7.5 5.31791 7.89278 6.04408 8.5 6.50018M4.93304 14.9465C4.65822 15.3996 4.5 15.9313 4.5 16.5C4.5 18.1569 5.84315 19.5 7.5 19.5C7.5 20.8807 8.61929 22 10 22C11.3807 22 12.5 20.8807 12.5 19.5V18M4.93304 14.9465C5.28948 14.3588 5.84207 13.9032 6.5 13.6707',
  d2: 'M17.5 9H15.5C14.5572 9 14.0858 9 13.7929 9.29289C13.5 9.58579 13.5 10.0572 13.5 11V13C13.5 13.9428 13.5 14.4142 13.7929 14.7071C14.0858 15 14.5572 15 15.5 15H17.5C18.4428 15 18.9142 15 19.2071 14.7071C19.5 14.4142 19.5 13.9428 19.5 13V11C19.5 10.0572 19.5 9.58579 19.2071 9.29289C18.9142 9 18.4428 9 17.5 9Z',
  d3: 'M15 15V17M18 15V17M15 7V9M18 7V9M13.5 10.5H11.5M13.5 13.5H11.5M21.5 10.5H19.5M21.5 13.5H19.5',
  d4: 'M4.5 16.5C4.5 18.1569 5.84315 19.5 7.5 19.5C7.5 20.8807 8.61929 22 10 22C11.3807 22 12.5 20.8807 12.5 19.5V4.5C12.5 3.11929 11.3807 2 10 2C8.61929 2 7.5 3.11929 7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 8.06866 4.65822 8.60037 4.93304 9.0535C3.54727 9.31855 2.5 10.537 2.5 12C2.5 13.463 3.54727 14.6814 4.93304 14.9465C4.65822 15.3996 4.5 15.9313 4.5 16.5Z',
  d5: 'M7.49013 4.5C5.83639 4.5 4.49576 5.84315 4.49576 7.5C4.49576 8.06866 4.65368 8.60037 4.92798 9.0535C3.54482 9.31855 2.49951 10.537 2.49951 12C2.49951 13.463 3.54482 14.6814 4.92798 14.9465M7.49013 4.5C7.49013 3.11929 8.60732 2 9.98543 2C11.3635 2 12.4807 3.11929 12.4807 4.5V6M7.49013 4.5C7.49013 5.31791 7.88217 6.04408 8.48825 6.50018M4.92798 14.9465C4.65368 15.3996 4.49576 15.9313 4.49576 16.5C4.49576 18.1569 5.83639 19.5 7.49013 19.5C7.49013 20.8807 8.60732 22 9.98543 22C11.3635 22 12.4807 20.8807 12.4807 19.5V18M4.92798 14.9465C5.28376 14.3588 5.83531 13.9032 6.492 13.6707',
  d6: 'M14.9253 7.00098V8.98M11.4448 10.5014H13.493M19.4528 10.5014H21.501M19.4528 13.4746H21.501M11.4448 13.4746H13.493M14.9253 15.0202V16.9992M17.9451 15.0202V16.9992M17.9344 7.00098V8.98M14.4911 14.9685H18.4547C19.006 14.9685 19.4528 14.5208 19.4528 13.9685V9.98C19.4528 9.42771 19.006 8.98 18.4547 8.98H14.4911C13.9398 8.98 13.493 9.42771 13.493 9.98V13.9685C13.493 14.5208 13.9398 14.9685 14.4911 14.9685Z',
  d7: 'M15.75 7C15.75 6.58579 15.4142 6.25 15 6.25C14.5858 6.25 14.25 6.58579 14.25 7V8.30088C13.9104 8.35268 13.5563 8.46881 13.2626 8.76257C12.9688 9.05633 12.8527 9.41037 12.8009 9.75H11.5C11.0858 9.75 10.75 10.0858 10.75 10.5C10.75 10.9142 11.0858 11.25 11.5 11.25H12.75V12.75H11.5C11.0858 12.75 10.75 13.0858 10.75 13.5C10.75 13.9142 11.0858 14.25 11.5 14.25H12.8009C12.8527 14.5896 12.9688 14.9437 13.2626 15.2374C13.5563 15.5312 13.9104 15.6473 14.25 15.6991V17C14.25 17.4142 14.5858 17.75 15 17.75C15.4142 17.75 15.75 17.4142 15.75 17V15.75H17.25V17C17.25 17.4142 17.5858 17.75 18 17.75C18.4142 17.75 18.75 17.4142 18.75 17V15.6991C19.0896 15.6473 19.4437 15.5312 19.7374 15.2374C20.0312 14.9437 20.1473 14.5896 20.1991 14.25H21.5C21.9142 14.25 22.25 13.9142 22.25 13.5C22.25 13.0858 21.9142 12.75 21.5 12.75H20.25V11.25H21.5C21.9142 11.25 22.25 10.9142 22.25 10.5C22.25 10.0858 21.9142 9.75 21.5 9.75H20.1991C20.1473 9.41037 20.0312 9.05633 19.7374 8.76257C19.4437 8.4688 19.0896 8.35268 18.75 8.30087V7C18.75 6.58579 18.4142 6.25 18 6.25C17.5858 6.25 17.25 6.58579 17.25 7V8.25001H15.75V7Z',
  d8: 'M1.75 12C1.75 13.5048 2.63588 14.8017 3.91442 15.399C3.80751 15.7476 3.75 16.1174 3.75 16.5C3.75 18.34 5.07518 19.8705 6.8232 20.1891C7.13925 21.653 8.44152 22.75 10 22.75C11.7949 22.75 13.25 21.2949 13.25 19.5V16.9487C12.9925 16.847 12.549 16.6455 12.2019 16.2984C12.0254 16.1219 11.8833 15.9367 11.7685 15.7503H11.5C10.2574 15.7503 9.25 14.7429 9.25 13.5003C9.25 12.924 9.46664 12.3983 9.82292 12.0003C9.46664 11.6022 9.25 11.0765 9.25 10.5003C9.25 9.25761 10.2574 8.25025 11.5 8.25025H11.7685C11.8833 8.06376 12.0254 7.87865 12.2019 7.70216C12.549 7.35504 12.9925 7.1535 13.25 7.0518V4.5C13.25 2.70507 11.7949 1.25 10 1.25C8.44152 1.25 7.13925 2.34698 6.8232 3.81091C5.07518 4.12953 3.75 5.66001 3.75 7.5C3.75 7.88261 3.80751 8.25245 3.91442 8.60095C2.63588 9.19833 1.75 10.4952 1.75 12Z',
  d9: 'M19.5 9H13.5V15H19.5V9Z',
  d10: 'M14.5 8.25V6.5H16V8.25H17.5V6.5H19V8.25H20.5V9.75H22.25V11.25H20.5V12.75H22.25V14.25H20.5V15.75H19V17.5H17.5V15.75H16V17.5H14.5V15.75H13V14.25H11.25V12.75H13V11.25H11.25V9.75H13V8.25H14.5Z',
  d11: 'M13.25 6.75V4.5C13.25 2.70507 11.7949 1.25 10 1.25C8.44152 1.25 7.13925 2.34698 6.8232 3.81091C5.07518 4.12953 3.75 5.66001 3.75 7.5C3.75 7.88261 3.80751 8.25245 3.91442 8.60095C2.63588 9.19833 1.75 10.4952 1.75 12C1.75 13.5048 2.63588 14.8017 3.91442 15.399C3.80751 15.7476 3.75 16.1174 3.75 16.5C3.75 18.34 5.07518 19.8705 6.8232 20.1891C7.13925 21.653 8.44152 22.75 10 22.75C11.7949 22.75 13.25 21.2949 13.25 19.5V17.25H11.5V15.75H9.75V8.25H11.5V6.75H13.25Z',
};

export const IconAiBrain05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-stroke-rounded IconAiBrain05StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconAiBrain05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-duotone-rounded IconAiBrain05DuotoneRounded"
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

export const IconAiBrain05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-twotone-rounded IconAiBrain05TwotoneRounded"
    >
      <path 
        d={d.d5} 
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
      />
    </TheIconWrapper>
  );
};

export const IconAiBrain05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-solid-rounded IconAiBrain05SolidRounded"
    >
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

export const IconAiBrain05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-bulk-rounded IconAiBrain05BulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconAiBrain05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-stroke-sharp IconAiBrain05StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiBrain05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-brain-05-solid-sharp IconAiBrain05SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAiBrain05: TheIconSelfPack = {
  name: 'AiBrain05',
  StrokeRounded: IconAiBrain05StrokeRounded,
  DuotoneRounded: IconAiBrain05DuotoneRounded,
  TwotoneRounded: IconAiBrain05TwotoneRounded,
  SolidRounded: IconAiBrain05SolidRounded,
  BulkRounded: IconAiBrain05BulkRounded,
  StrokeSharp: IconAiBrain05StrokeSharp,
  SolidSharp: IconAiBrain05SolidSharp,
};