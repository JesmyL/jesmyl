import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 10V18',
  d2: 'M12 16L12 20',
  d3: 'M22 10V18',
  d4: 'M12 3.125C9.12602 3.125 6.4878 3.8224 4.54306 4.98924C2.61325 6.14713 1.25 7.8512 1.25 9.875V17.875C1.25 18.4273 1.69772 18.875 2.25 18.875C2.80228 18.875 3.25 18.4273 3.25 17.875V13.8249C3.6401 14.1668 4.07491 14.4799 4.54306 14.7608C6.25988 15.7909 8.51717 16.4551 11 16.5966V19.875C11 20.4273 11.4477 20.875 12 20.875C12.5523 20.875 13 20.4273 13 19.875V16.5966C15.4828 16.4551 17.7401 15.7909 19.4569 14.7608C19.9251 14.4799 20.3599 14.1668 20.75 13.8249V17.875C20.75 18.4273 21.1977 18.875 21.75 18.875C22.3023 18.875 22.75 18.4273 22.75 17.875V9.875C22.75 7.8512 21.3867 6.14713 19.4569 4.98924C17.5122 3.8224 14.874 3.125 12 3.125Z',
  d5: 'M1.25 9.875V17.875C1.25 18.4273 1.69772 18.875 2.25 18.875C2.80228 18.875 3.25 18.4273 3.25 17.875V13.8249C2.03206 12.7573 1.25 11.4078 1.25 9.875ZM11 16.5966V19.875C11 20.4273 11.4477 20.875 12 20.875C12.5523 20.875 13 20.4273 13 19.875V16.5966C12.6704 16.6154 12.3368 16.625 12 16.625C11.6632 16.625 11.3296 16.6154 11 16.5966ZM20.75 13.8249V17.875C20.75 18.4273 21.1977 18.875 21.75 18.875C22.3023 18.875 22.75 18.4273 22.75 17.875V9.875C22.75 11.4078 21.9679 12.7573 20.75 13.8249Z',
  d6: 'M4.54306 4.98924C6.4878 3.8224 9.12602 3.125 12 3.125C14.874 3.125 17.5122 3.8224 19.4569 4.98924C21.3867 6.14713 22.75 7.8512 22.75 9.875C22.75 11.8988 21.3867 13.6029 19.4569 14.7608C17.5122 15.9276 14.874 16.625 12 16.625C9.12602 16.625 6.4878 15.9276 4.54306 14.7608C2.61325 13.6029 1.25 11.8988 1.25 9.875C1.25 7.8512 2.61325 6.14713 4.54306 4.98924Z',
  d7: 'M4.54306 5.61424C2.61325 6.77213 1.25 8.4762 1.25 10.5V18.5H3.25V14.4499C3.6401 14.7918 4.07491 15.1049 4.54306 15.3858C6.25988 16.4159 8.51717 17.0801 11 17.2216V20.25H13V17.2216C15.4828 17.0801 17.7401 16.4159 19.4569 15.3858C19.9251 15.1049 20.3599 14.7918 20.75 14.4499V18.5H22.75V10.5C22.75 8.4762 21.3867 6.77213 19.4569 5.61424C17.5122 4.4474 14.874 3.75 12 3.75C9.12602 3.75 6.4878 4.4474 4.54306 5.61424Z',
};

export const IconTrampolineStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-stroke-rounded IconTrampolineStrokeRounded"
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
      <ellipse 
        cx="12" 
        cy="10" 
        rx="10" 
        ry="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconTrampolineDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-duotone-rounded IconTrampolineDuotoneRounded"
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
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="10" 
        rx="10" 
        ry="6" 
        fill="var(--icon-fill)"></ellipse>
      <ellipse 
        cx="12" 
        cy="10" 
        rx="10" 
        ry="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconTrampolineTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-twotone-rounded IconTrampolineTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
      <ellipse 
        cx="12" 
        cy="10" 
        rx="10" 
        ry="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconTrampolineSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-solid-rounded IconTrampolineSolidRounded"
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

export const IconTrampolineBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-bulk-rounded IconTrampolineBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconTrampolineStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-stroke-sharp IconTrampolineStrokeSharp"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <ellipse 
        cx="12" 
        cy="10" 
        rx="10" 
        ry="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconTrampolineSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="trampoline-solid-sharp IconTrampolineSolidSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTrampoline: TheIconSelfPack = {
  name: 'Trampoline',
  StrokeRounded: IconTrampolineStrokeRounded,
  DuotoneRounded: IconTrampolineDuotoneRounded,
  TwotoneRounded: IconTrampolineTwotoneRounded,
  SolidRounded: IconTrampolineSolidRounded,
  BulkRounded: IconTrampolineBulkRounded,
  StrokeSharp: IconTrampolineStrokeSharp,
  SolidSharp: IconTrampolineSolidSharp,
};