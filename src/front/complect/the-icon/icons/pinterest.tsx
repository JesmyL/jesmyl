import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M12 11L8 21',
  d2: 'M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5',
  d3: 'M8 21.0001L12 11.0001M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5',
  d4: 'M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C11.6822 16 11.3738 15.9631 11.0786 15.8936L12.9255 11.3787C13.1347 10.8675 12.8898 10.2836 12.3786 10.0745C11.8675 9.86541 11.2836 10.1103 11.0745 10.6214L6.68663 21.3472C3.43949 19.4974 1.25 16.0044 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.7786 22.75 9.60469 22.5463 8.51052 22.171L10.3151 17.7599C10.8504 17.9163 11.416 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 12.8516 6.17813 13.6642 6.49997 14.4005C6.72116 14.9066 7.31072 15.1375 7.81677 14.9163C8.32282 14.6951 8.55375 14.1055 8.33255 13.5995C8.11899 13.1109 8 12.5707 8 12Z',
  d5: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d6: 'M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C11.6822 16 11.3738 15.9631 11.0786 15.8936L12.9255 11.3787C13.1347 10.8675 12.8898 10.2836 12.3786 10.0745C11.8675 9.86541 11.2836 10.1103 11.0745 10.6214L6.68663 21.3472C7.26335 21.6758 7.87342 21.9525 8.51052 22.171L10.3151 17.7599C10.8504 17.9163 11.416 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 12.8516 6.17813 13.6642 6.49997 14.4005C6.72116 14.9066 7.31072 15.1375 7.81677 14.9163C8.32282 14.6951 8.55375 14.1055 8.33255 13.5995C8.11899 13.1109 8 12.5707 8 12Z',
  d7: 'M8 11.9998C8 9.79062 9.79086 7.99976 12 7.99976C14.2091 7.99976 16 9.79062 16 11.9998C16 14.2089 14.2091 15.9998 12 15.9998C11.7058 15.9998 11.4197 15.9682 11.1446 15.9083L12.9307 11.3657L11.0693 10.6339L6.82639 21.4255C3.50247 19.5971 1.25 16.0616 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.8349 22.75 9.713 22.5646 8.66232 22.2218L10.4065 17.7856C10.9146 17.9253 11.4492 17.9998 12 17.9998C15.3137 17.9998 18 15.3135 18 11.9998C18 8.68605 15.3137 5.99976 12 5.99976C8.68629 5.99976 6 8.68605 6 11.9998C6 13.0912 6.29247 14.1171 6.80367 15.0006L8.53476 13.9989C8.19488 13.4115 8 12.7299 8 11.9998Z',
} as const;

export const IconPinterestStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-stroke-rounded IconPinterestStrokeRounded"
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
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconPinterestDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-duotone-rounded IconPinterestDuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
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
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconPinterestTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-twotone-rounded IconPinterestTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconPinterestSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-solid-rounded IconPinterestSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPinterestBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-bulk-rounded IconPinterestBulkRounded"
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

export const IconPinterestStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-stroke-sharp IconPinterestStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconPinterestSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="pinterest-solid-sharp IconPinterestSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPinterest: TheIconSelfPack = {
  name: 'Pinterest',
  StrokeRounded: IconPinterestStrokeRounded,
  DuotoneRounded: IconPinterestDuotoneRounded,
  TwotoneRounded: IconPinterestTwotoneRounded,
  SolidRounded: IconPinterestSolidRounded,
  BulkRounded: IconPinterestBulkRounded,
  StrokeSharp: IconPinterestStrokeSharp,
  SolidSharp: IconPinterestSolidSharp,
};