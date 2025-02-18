import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20 15C20 13.8954 18.8807 13 17.5 13H6.5C5.11929 13 4 13.8954 4 15',
  d2: 'M12 11L12 15',
  d3: 'M20 15C20 13.8954 18.8807 13 17.5 13H6.5C5.11929 13 4 13.8954 4 15M12 11V15',
  d4: 'M8.5 5C8.5 3.067 10.067 1.5 12 1.5C13.933 1.5 15.5 3.067 15.5 5C15.5 6.933 13.933 8.5 12 8.5C10.067 8.5 8.5 6.933 8.5 5Z',
  d5: 'M12 10.5C12.5523 10.5 13 10.9477 13 11.5V12.5H17.5C19.2132 12.5 21 13.6464 21 15.5C21 16.0523 20.5523 16.5 20 16.5C19.4477 16.5 19 16.0523 19 15.5C19 15.1444 18.5482 14.5 17.5 14.5H13V15.5C13 16.0523 12.5523 16.5 12 16.5C11.4477 16.5 11 16.0523 11 15.5V14.5H6.5C5.45181 14.5 5 15.1444 5 15.5C5 16.0523 4.55228 16.5 4 16.5C3.44772 16.5 3 16.0523 3 15.5C3 13.6464 4.78677 12.5 6.5 12.5H11V11.5C11 10.9477 11.4477 10.5 12 10.5Z',
  d6: 'M20 15.5V13H4V15.5',
  d7: 'M12 10.5L12 15.5',
  d8: 'M8.25 5C8.25 2.92893 9.92893 1.25 12 1.25C14.0711 1.25 15.75 2.92893 15.75 5C15.75 7.07107 14.0711 8.75 12 8.75C9.92893 8.75 8.25 7.07107 8.25 5Z',
  d9: 'M9.25 20C9.25 18.4812 10.4812 17.25 12 17.25C13.5188 17.25 14.75 18.4812 14.75 20C14.75 21.5188 13.5188 22.75 12 22.75C10.4812 22.75 9.25 21.5188 9.25 20Z',
  d10: 'M17.25 20C17.25 18.4812 18.4812 17.25 20 17.25C21.5188 17.25 22.75 18.4812 22.75 20C22.75 21.5188 21.5188 22.75 20 22.75C18.4812 22.75 17.25 21.5188 17.25 20Z',
  d11: 'M1.25 20C1.25 18.4812 2.48122 17.25 4 17.25C5.51878 17.25 6.75 18.4812 6.75 20C6.75 21.5188 5.51878 22.75 4 22.75C2.48122 22.75 1.25 21.5188 1.25 20Z',
  d12: 'M11 12V10.5H13V12H20C20.5523 12 21 12.4477 21 13V15.5H19V14H13V15.5H11V14H5V15.5H3V13C3 12.4477 3.44772 12 4 12H11Z',
};

export const IconCrowdfundingStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-stroke-rounded IconCrowdfundingStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="4" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
    </TheIconWrapper>
  );
};

export const IconCrowdfundingDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-duotone-rounded IconCrowdfundingDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="5" 
        r="3" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="20" 
        cy="20" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        opacity="var(--icon-opacity)" 
        cx="4" 
        cy="20" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="4" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
    </TheIconWrapper>
  );
};

export const IconCrowdfundingTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-twotone-rounded IconCrowdfundingTwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <circle 
        cx="4" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCrowdfundingSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-solid-rounded IconCrowdfundingSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="20" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="4" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCrowdfundingBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-bulk-rounded IconCrowdfundingBulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="20" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="4" 
        cy="20.5" 
        r="2" 
        fill="var(--icon-fill)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCrowdfundingStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-stroke-sharp IconCrowdfundingStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="12" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <circle 
        cx="4" 
        cy="20" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCrowdfundingSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="crowdfunding-solid-sharp IconCrowdfundingSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const iconPackOfCrowdfunding: TheIconSelfPack = {
  name: 'Crowdfunding',
  StrokeRounded: IconCrowdfundingStrokeRounded,
  DuotoneRounded: IconCrowdfundingDuotoneRounded,
  TwotoneRounded: IconCrowdfundingTwotoneRounded,
  SolidRounded: IconCrowdfundingSolidRounded,
  BulkRounded: IconCrowdfundingBulkRounded,
  StrokeSharp: IconCrowdfundingStrokeSharp,
  SolidSharp: IconCrowdfundingSolidSharp,
};