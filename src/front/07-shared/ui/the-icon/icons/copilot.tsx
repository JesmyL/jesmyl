import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.8461 4C14.6683 4 15.3801 4.62364 15.5584 5.50016L15.7715 6.54763C16.0037 7.68837 16.93 8.5 18 8.5H11.3827M13.8461 4C13.0551 4 12.362 4.57821 12.1539 5.41168L11.3827 8.5M13.8461 4H7.97888C6.32731 4 4.88008 5.20729 4.44552 6.94753L3.06556 12.9738C2.74786 14.246 3.62479 15.5 4.83224 15.5H7.66156C8.90024 15.5 9.98567 14.5945 10.3116 13.2894L11.3827 8.5',
  d2: 'M10.1539 20C9.33175 20 8.61992 19.3764 8.44158 18.4998L8.22845 17.4524C7.99635 16.3116 7.06995 15.5 6 15.5L12.6173 15.5M10.1539 20C10.9449 20 11.638 19.4218 11.8461 18.5883L12.6173 15.5M10.1539 20L16.0211 20C17.6727 20 19.1199 18.7927 19.5545 17.0525L20.9344 11.0262C21.2521 9.75395 20.3752 8.5 19.1678 8.5L16.3384 8.5C15.0998 8.5 14.0143 9.40546 13.6884 10.7106L12.6173 15.5',
  d3: 'M8.22844 17.4524L8.44157 18.4998C8.61991 19.3764 9.33174 20 10.1539 20C10.9449 20 11.638 19.4218 11.8461 18.5883L12.6173 15.5L5.99999 15.5C7.06994 15.5 7.99634 16.3116 8.22844 17.4524Z',
  d4: 'M15.7716 6.54763L15.5584 5.50016C15.3801 4.62364 14.6683 4 13.8461 4C13.0551 4 12.362 4.57821 12.1539 5.41168L11.3827 8.5H18C16.9301 8.5 16.0037 7.68837 15.7716 6.54763Z',
  d5: 'M7.66156 15.5H4.83224C3.62479 15.5 2.74786 14.246 3.06556 12.9738L4.44552 6.94753C4.88008 5.20729 6.32731 4 7.97888 4H13.8461C13.0551 4 12.362 4.57821 12.1539 5.41168L11.3827 8.5L10.3116 13.2894C9.98567 14.5945 8.90024 15.5 7.66156 15.5Z',
  d6: 'M16.3384 8.5L19.1678 8.5C20.3752 8.5 21.2521 9.75395 20.9344 11.0262L19.5545 17.0525C19.1199 18.7927 17.6727 20 16.0211 20L10.1539 20C10.9449 20 11.638 19.4218 11.8461 18.5883L12.6173 15.5L13.6884 10.7106C14.0143 9.40546 15.0998 8.5 16.3384 8.5Z',
  d7: 'M14.1184 3.25C13.505 3.25 12.9166 3.71086 12.7339 4.45495L12.0273 7.33333H16.5014C16.1425 6.89301 15.8842 6.35249 15.7647 5.7552L15.5203 4.53317C15.3632 3.74773 14.7554 3.25 14.1184 3.25Z',
  d8: 'M3.89358 6.2414L2.30971 13.2774C2.01951 14.4596 2.83179 15.5 3.77943 15.5H7.02432C8.14997 15.5 9.18731 14.6591 9.50623 13.367L11.62 4.17229C11.7026 3.83616 11.8405 3.52453 12.0227 3.25H7.38825C5.78947 3.25 4.33749 4.44241 3.89358 6.2414Z',
  d9: 'M20.1064 17.7586L21.6903 10.7226C21.9805 9.5404 21.1682 8.5 20.2206 8.5L16.9757 8.5C15.85 8.5 14.8127 9.34089 14.4938 10.633L12.38 19.8277C12.2974 20.1638 12.1595 20.4755 11.9773 20.75L16.6117 20.75C18.2105 20.75 19.6625 19.5576 20.1064 17.7586Z',
  d10: 'M9.88162 20.75C10.495 20.75 11.0834 20.2891 11.2661 19.545L11.9727 16.6667L7.4986 16.6667C7.85746 17.107 8.11585 17.6475 8.23531 18.2448L8.47974 19.4668C8.63684 20.2523 9.24463 20.75 9.88162 20.75Z',
  d11: 'M7.30002 15.8281H4.23493C2.92686 15.8281 1.97685 14.4566 2.32102 13.0651L3.81598 6.47386C4.28675 4.57047 5.85459 3.25 7.64379 3.25H14C13.1431 3.25 12.3922 3.88242 12.1667 4.79403L11.3312 8.17188L10.1709 13.4102C9.81781 14.8378 8.64193 15.8281 7.30002 15.8281Z',
  d12: 'M16.0866 6.03647L15.8558 4.8908C15.6625 3.9321 14.8914 3.25 14.0008 3.25C13.1438 3.25 12.393 3.88242 12.1675 4.79403L11.332 8.17188H18.5008C17.3417 8.17188 16.3381 7.28416 16.0866 6.03647Z',
  d13: 'M7.91336 17.9635L8.14425 19.1092C8.33746 20.0679 9.1086 20.75 9.99924 20.75C10.8562 20.75 11.607 20.1176 11.8325 19.206L12.668 15.8281L5.49921 15.8281C6.65832 15.8281 7.66192 16.7158 7.91336 17.9635Z',
  d14: 'M16.7 8.17187L19.7651 8.17187C21.0731 8.17187 22.0232 9.54339 21.679 10.9349L20.184 17.5261C19.7133 19.4295 18.1454 20.75 16.3562 20.75L10 20.75C10.8569 20.75 11.6078 20.1176 11.8333 19.206L12.6688 15.8281L13.8291 10.5898C14.1822 9.16223 15.3581 8.17187 16.7 8.17187Z',
  d15: 'M13.8447 4C14.6668 4 15.3786 4.62364 15.557 5.50016L15.7701 6.54763C16.0022 7.68837 16.9286 8.5 17.9986 8.5H11.3812M13.8447 4C13.0537 4 12.3606 4.57821 12.1524 5.41168L11.3812 8.5M13.8447 4H7.97744C6.32587 4 4.87864 5.20729 4.44408 6.94753L2.5 15.5H9.5L11.3812 8.5',
  d16: 'M10.1531 20C9.33098 20 8.61916 19.3764 8.44081 18.4998L8.22769 17.4524C7.99558 16.3116 7.06919 15.5 5.99923 15.5L12.6166 15.5M10.1531 20C10.9441 20 11.6372 19.4218 11.8454 18.5883L12.6166 15.5M10.1531 20L16.0203 20C17.6719 20 19.1192 18.7927 19.5537 17.0525L21.5001 8.5L14.5001 8.5L12.6166 15.5',
  d17: 'M4.23025 6.24096L2.24805 15.5H8.82993L10.7864 7.7703L11.6326 4.1723C11.7116 3.83617 11.8437 3.52453 12.0182 3.25H7.57823C6.04664 3.25 4.65567 4.44221 4.23025 6.24096ZM16.308 7.33333C15.9642 6.89301 15.7167 6.35249 15.6022 5.7552L15.3681 4.53317C15.2175 3.74773 14.6353 3.25 14.025 3.25C13.4373 3.25 12.8736 3.71086 12.6986 4.45495L12.0217 7.33333H16.308Z',
  d18: 'M19.7655 17.759L21.75 8.5L15.1682 8.5L13.2093 16.2298L12.3632 19.8277C12.2841 20.1638 12.152 20.4755 11.9775 20.75L16.4175 20.75C17.9491 20.75 19.3401 19.5578 19.7655 17.759Z',
  d19: 'M7.68768 16.6667C8.03149 17.107 8.27903 17.6475 8.39349 18.2448L8.62766 19.4668C8.77818 20.2523 9.36047 20.75 9.97073 20.75C10.5584 20.75 11.1221 20.2891 11.2971 19.545L11.9741 16.6667L7.68768 16.6667Z',
};

export const IconCopilotStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-stroke-rounded IconCopilotStrokeRounded"
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

export const IconCopilotDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-duotone-rounded IconCopilotDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconCopilotTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-twotone-rounded IconCopilotTwotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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

export const IconCopilotSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-solid-rounded IconCopilotSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCopilotBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-bulk-rounded IconCopilotBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCopilotStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-stroke-sharp IconCopilotStrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCopilotSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="copilot-solid-sharp IconCopilotSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCopilot: TheIconSelfPack = {
  name: 'Copilot',
  StrokeRounded: IconCopilotStrokeRounded,
  DuotoneRounded: IconCopilotDuotoneRounded,
  TwotoneRounded: IconCopilotTwotoneRounded,
  SolidRounded: IconCopilotSolidRounded,
  BulkRounded: IconCopilotBulkRounded,
  StrokeSharp: IconCopilotStrokeSharp,
  SolidSharp: IconCopilotSolidSharp,
};