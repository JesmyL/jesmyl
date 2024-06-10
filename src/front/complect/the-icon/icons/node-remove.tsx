import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.5 19.5H12.5C9.67157 19.5 8.25736 19.5 7.37868 18.6213C6.5 17.7426 6.5 16.3284 6.5 13.5V11.5M6.5 9V11.5M6.5 11.5H13.5',
  d2: 'M13.5 11.5C13.5 10.3215 13.5 9.73223 13.8515 9.36612C14.2029 9 14.7686 9 15.9 9H17.1C18.2314 9 18.7971 9 19.1485 9.36612C19.5 9.73223 19.5 10.3215 19.5 11.5C19.5 12.6785 19.5 13.2678 19.1485 13.6339C18.7971 14 18.2314 14 17.1 14H15.9C14.7686 14 14.2029 14 13.8515 13.6339C13.5 13.2678 13.5 12.6785 13.5 11.5Z',
  d3: 'M13.5 19.5C13.5 18.3215 13.5 17.7322 13.8515 17.3661C14.2029 17 14.7686 17 15.9 17H17.1C18.2314 17 18.7971 17 19.1485 17.3661C19.5 17.7322 19.5 18.3215 19.5 19.5C19.5 20.6785 19.5 21.2678 19.1485 21.6339C18.7971 22 18.2314 22 17.1 22H15.9C14.7686 22 14.2029 22 13.8515 21.6339C13.5 21.2678 13.5 20.6785 13.5 19.5Z',
  d4: 'M9 2L6.5 4.5M6.5 4.5L4 7M6.5 4.5L9 7M6.5 4.5L4 2',
  d5: 'M6.875 8.125C7.42729 8.125 7.875 8.57272 7.875 9.125V10.625H13.875C14.4273 10.625 14.875 11.0727 14.875 11.625C14.875 12.1773 14.4273 12.625 13.875 12.625H7.875V13.625C7.875 15.0675 7.87713 16.0487 7.97592 16.7836C8.07085 17.4896 8.23822 17.8166 8.46079 18.0392C8.68336 18.2618 9.01038 18.4292 9.71643 18.5241C10.4513 18.6229 11.4325 18.625 12.875 18.625H13.875C14.4273 18.625 14.875 19.0727 14.875 19.625C14.875 20.1773 14.4273 20.625 13.875 20.625L12.8044 20.625C11.4503 20.625 10.3337 20.6251 9.44994 20.5062C8.52211 20.3815 7.70268 20.1095 7.04658 19.4534C6.39047 18.7973 6.1185 17.9779 5.99375 17.0501C5.87494 16.1663 5.87497 15.0497 5.875 13.6956L5.875 9.125C5.875 8.57272 6.32272 8.125 6.875 8.125Z',
  d6: 'M16.2266 8.375L16.275 8.37501H17.475L17.5234 8.375C18.0475 8.37495 18.5165 8.37491 18.8958 8.42802C19.3114 8.48623 19.7277 8.62078 20.0646 8.97172C20.3974 9.31837 20.5209 9.73928 20.5749 10.1574C20.6251 10.5462 20.625 11.0292 20.625 11.579V11.671C20.625 12.2208 20.6251 12.7038 20.5749 13.0926C20.5209 13.5107 20.3974 13.9316 20.0646 14.2783C19.7277 14.6292 19.3114 14.7638 18.8958 14.822C18.5165 14.8751 18.0475 14.8751 17.5234 14.875L17.475 14.875H16.275L16.2266 14.875C15.7025 14.8751 15.2335 14.8751 14.8543 14.822C14.4386 14.7638 14.0223 14.6292 13.6854 14.2783C13.3527 13.9316 13.2291 13.5107 13.1751 13.0926C13.1249 12.7038 13.125 12.2208 13.125 11.671L13.125 11.625L13.125 11.579C13.125 11.0292 13.1249 10.5462 13.1751 10.1574C13.2291 9.73928 13.3527 9.31837 13.6854 8.97172C14.0223 8.62078 14.4386 8.48623 14.8543 8.42802C15.2335 8.37491 15.7025 8.37495 16.2266 8.375L16.2266 8.375Z',
  d7: 'M16.2266 16.375L16.275 16.375H17.475L17.5234 16.375C18.0475 16.375 18.5165 16.3749 18.8958 16.428C19.3114 16.4862 19.7277 16.6208 20.0646 16.9717C20.3974 17.3184 20.5209 17.7393 20.5749 18.1574C20.6251 18.5462 20.625 19.0292 20.625 19.579V19.671C20.625 20.2208 20.6251 20.7038 20.5749 21.0926C20.5209 21.5107 20.3974 21.9316 20.0646 22.2783C19.7277 22.6292 19.3114 22.7638 18.8958 22.822C18.5165 22.8751 18.0475 22.8751 17.5234 22.875L17.475 22.875H16.275L16.2266 22.875C15.7025 22.8751 15.2335 22.8751 14.8543 22.822C14.4386 22.7638 14.0223 22.6292 13.6854 22.2783C13.3527 21.9316 13.2291 21.5107 13.1751 21.0926C13.1249 20.7038 13.125 20.2208 13.125 19.671L13.125 19.625L13.125 19.579C13.125 19.0292 13.1249 18.5462 13.1751 18.1574C13.2291 17.7393 13.3527 17.3184 13.6854 16.9717C14.0223 16.6208 14.4386 16.4862 14.8543 16.428C15.2335 16.3749 15.7025 16.375 16.2266 16.375L16.2266 16.375Z',
  d8: 'M3.66789 1.41789C4.05842 1.02737 4.69158 1.02737 5.08211 1.41789L6.875 3.21079L8.66789 1.41789C9.05842 1.02737 9.69158 1.02737 10.0821 1.41789C10.4726 1.80842 10.4726 2.44158 10.0821 2.83211L8.28921 4.625L10.0821 6.41789C10.4726 6.80842 10.4726 7.44158 10.0821 7.83211C9.69158 8.22263 9.05842 8.22263 8.66789 7.83211L6.875 6.03921L5.08211 7.83211C4.69158 8.22263 4.05842 8.22263 3.66789 7.83211C3.27737 7.44158 3.27737 6.80842 3.66789 6.41789L5.46079 4.625L3.66789 2.83211C3.27737 2.44158 3.27737 1.80842 3.66789 1.41789Z',
  d9: 'M7.875 9.125C7.875 8.57272 7.42729 8.125 6.875 8.125C6.32272 8.125 5.875 8.57272 5.875 9.125L5.875 13.6956C5.87497 15.0497 5.87494 16.1663 5.99376 17.0501C6.1185 17.9779 6.39047 18.7973 7.04658 19.4534C7.70269 20.1095 8.52211 20.3815 9.44994 20.5062C10.3337 20.6251 11.4503 20.625 12.8044 20.625L13.1375 20.625C13.125 20.3382 13.125 20.0179 13.125 19.6711V19.579C13.125 19.2321 13.125 18.9118 13.1375 18.625H12.875C11.4325 18.625 10.4513 18.6229 9.71644 18.5241C9.01038 18.4292 8.68336 18.2618 8.46079 18.0392C8.23822 17.8166 8.07085 17.4896 7.97592 16.7836C7.87713 16.0487 7.875 15.0675 7.875 13.625V12.625H13.1375C13.125 12.3382 13.125 12.0179 13.125 11.6711V11.579C13.125 11.2321 13.125 10.9118 13.1375 10.625H7.875V9.125Z',
  d10: 'M19.5 14V9H13.5V14H19.5Z',
  d11: 'M19.5 22V17H13.5V22H19.5Z',
  d12: 'M13.5 19.5H6.5V11.5M6.5 9V11.5M6.5 11.5H13.5',
  d13: 'M12.75 9C12.75 8.58579 13.0858 8.25 13.5 8.25H19.5C19.9142 8.25 20.25 8.58579 20.25 9V14C20.25 14.4142 19.9142 14.75 19.5 14.75H13.5C13.0858 14.75 12.75 14.4142 12.75 14V9Z',
  d14: 'M12.75 17C12.75 16.5858 13.0858 16.25 13.5 16.25H19.5C19.9142 16.25 20.25 16.5858 20.25 17V22C20.25 22.4142 19.9142 22.75 19.5 22.75H13.5C13.0858 22.75 12.75 22.4142 12.75 22V17Z',
  d15: 'M5.5 9H7.5V10.5H13.5V12.5H7.5V18.5H13.5V20.5H6.5C5.94772 20.5 5.5 20.0523 5.5 19.5V9Z',
  d16: 'M6.50008 5.91417L8.29297 7.70706L9.70718 6.29285L7.91429 4.49995L9.70718 2.70706L8.29297 1.29285L6.50008 3.08574L4.70718 1.29285L3.29297 2.70706L5.08586 4.49995L3.29297 6.29285L4.70718 7.70706L6.50008 5.91417Z',
};

export const IconNodeRemoveStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-stroke-rounded IconNodeRemoveStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-duotone-rounded IconNodeRemoveDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-twotone-rounded IconNodeRemoveTwotoneRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-solid-rounded IconNodeRemoveSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-bulk-rounded IconNodeRemoveBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-stroke-sharp IconNodeRemoveStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconNodeRemoveSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="node-remove-solid-sharp IconNodeRemoveSolidSharp"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfNodeRemove: TheIconSelfPack = {
  name: 'NodeRemove',
  StrokeRounded: IconNodeRemoveStrokeRounded,
  DuotoneRounded: IconNodeRemoveDuotoneRounded,
  TwotoneRounded: IconNodeRemoveTwotoneRounded,
  SolidRounded: IconNodeRemoveSolidRounded,
  BulkRounded: IconNodeRemoveBulkRounded,
  StrokeSharp: IconNodeRemoveStrokeSharp,
  SolidSharp: IconNodeRemoveSolidSharp,
};