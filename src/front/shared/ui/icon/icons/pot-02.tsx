import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10H22',
  d2: 'M4 10L4.50393 15.5432C4.73952 18.1348 4.85732 19.4305 5.71663 20.2153C6.57594 21 7.87705 21 10.4793 21H13.5207C16.1229 21 17.4241 21 18.2834 20.2153C19.1427 19.4305 19.2605 18.1348 19.4961 15.5432L20 10',
  d3: 'M4 8L9 6.64955M9 6.64955L15 5.02901M9 6.64955L9.20561 4.9118C9.28082 4.27624 9.73232 3.75086 10.3457 3.5852L12.3146 3.05342C12.9279 2.88776 13.5796 3.11519 13.9599 3.62771L15 5.02901M15 5.02901L20 3.67856',
  d4: 'M20 10H4L4.50393 15.5432C4.73952 18.1348 4.85732 19.4305 5.71663 20.2153C6.57594 21 7.87705 21 10.4793 21H13.5207C16.1229 21 17.4241 21 18.2834 20.2153C19.1427 19.4305 19.2605 18.1348 19.4961 15.5432L20 10Z',
  d5: 'M14.6861 3.20806L15.3025 4.00125L19.5241 2.91227C20.0424 2.77855 20.5761 3.07149 20.7161 3.56656C20.8561 4.06163 20.5494 4.57136 20.0311 4.70508L4.47593 8.71765C3.95758 8.85136 3.42388 8.55842 3.28387 8.06335C3.14387 7.56828 3.45059 7.05855 3.96894 6.92484L8.19521 5.83464L8.31785 4.84467C8.43717 3.88151 9.15473 3.07926 10.1382 2.82558L12.0523 2.3318C13.0368 2.07786 14.0796 2.4276 14.6861 3.20806Z',
  d6: 'M2.5 9.25C1.94772 9.25 1.5 9.69771 1.5 10.25C1.5 10.8023 1.94772 11.25 2.5 11.25H2.81266C3.07288 11.25 3.20299 11.25 3.28892 11.3285C3.37485 11.4069 3.38663 11.5365 3.41019 11.7957L3.76176 15.6629C3.87554 16.9147 3.96752 17.9266 4.14441 18.72C4.3284 19.5453 4.62354 20.2327 5.21092 20.7691C5.7983 21.3055 6.50961 21.5372 7.34815 21.6458C8.15433 21.7501 9.17041 21.7501 10.4274 21.75H13.5727C14.8297 21.7501 15.8458 21.7501 16.6519 21.6458C17.4905 21.5372 18.2018 21.3055 18.7892 20.7691C19.3766 20.2327 19.6717 19.5453 19.8557 18.72C20.0326 17.9267 20.1245 16.9147 20.2383 15.663L20.5899 11.7957C20.6135 11.5365 20.6252 11.4069 20.7112 11.3285C20.7971 11.25 20.9272 11.25 21.1874 11.25H21.5C22.0523 11.25 22.5 10.8023 22.5 10.25C22.5 9.69771 22.0523 9.25 21.5 9.25H2.5Z',
  d7: 'M4 10L5 21H19L20 10',
  d8: 'M2 7L9 5.79602M9 5.79602L15 4.76404M9 5.79602L9.47277 2.68799L13.4728 2L15 4.76404M15 4.76404L22 3.56006',
  d9: 'M3.35746 11.75L4.25 21.5679C4.28512 21.9542 4.60902 22.25 4.99692 22.25H18.9969C19.3848 22.25 19.7087 21.9542 19.7438 21.5679L20.6364 11.75H21.9961V9.75H1.99609V11.75H3.35746Z',
  d10: 'M13.3136 1.76455C13.7365 1.69223 14.1591 1.89407 14.3666 2.26749L15.5593 4.4135L21.9083 3.32784L22.25 5.30296L2.0917 8.75L1.75 6.77487L8.0891 5.6909L8.45631 3.29083C8.52158 2.86425 8.85419 2.5271 9.28192 2.45396L13.3136 1.76455Z',
};

export const IconPot02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-stroke-rounded IconPot02StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPot02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-duotone-rounded IconPot02DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconPot02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-twotone-rounded IconPot02TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPot02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-solid-rounded IconPot02SolidRounded"
    >
      <path 
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

export const IconPot02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-bulk-rounded IconPot02BulkRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPot02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-stroke-sharp IconPot02StrokeSharp"
    >
      <path 
        d={d.d1} 
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
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPot02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pot-02-solid-sharp IconPot02SolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPot02: TheIconSelfPack = {
  name: 'Pot02',
  StrokeRounded: IconPot02StrokeRounded,
  DuotoneRounded: IconPot02DuotoneRounded,
  TwotoneRounded: IconPot02TwotoneRounded,
  SolidRounded: IconPot02SolidRounded,
  BulkRounded: IconPot02BulkRounded,
  StrokeSharp: IconPot02StrokeSharp,
  SolidSharp: IconPot02SolidSharp,
};