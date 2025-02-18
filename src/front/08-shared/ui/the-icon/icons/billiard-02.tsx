import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 12C11.1716 12 10.5 12.5596 10.5 13.25C10.5 13.9404 11.1716 14.5 12 14.5C12.8284 14.5 13.5 13.9404 13.5 13.25C13.5 12.5596 12.8284 12 12 12ZM12 12C12.8284 12 13.5 11.4404 13.5 10.75C13.5 10.0596 12.8284 9.5 12 9.5C11.1716 9.5 10.5 10.0596 10.5 10.75C10.5 11.4404 11.1716 12 12 12Z',
  d2: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d3: 'M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 5.75C8.54822 5.75 5.75 8.54822 5.75 12C5.75 15.4518 8.54822 18.25 12 18.25C15.4518 18.25 18.25 15.4518 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75ZM4.25 12C4.25 7.71979 7.71979 4.25 12 4.25C16.2802 4.25 19.75 7.71979 19.75 12C19.75 16.2802 16.2802 19.75 12 19.75C7.71979 19.75 4.25 16.2802 4.25 12ZM11.25 10.75C11.25 10.5961 11.4519 10.25 12 10.25C12.5481 10.25 12.75 10.5961 12.75 10.75C12.75 10.9039 12.5481 11.25 12 11.25C11.4519 11.25 11.25 10.9039 11.25 10.75ZM13.7988 12C13.7988 12.0335 13.8257 12.0691 13.8794 12.1402C14.1096 12.4451 14.25 12.8197 14.25 13.25C14.25 14.4768 13.1088 15.25 12 15.25C10.8912 15.25 9.75 14.4768 9.75 13.25C9.75 12.8197 9.89043 12.4451 10.1206 12.1402L10.1206 12.1402C10.1743 12.0691 10.2012 12.0335 10.2012 12C10.2012 11.9665 10.1743 11.9309 10.1206 11.8598L10.1206 11.8598C9.89043 11.5549 9.75 11.1803 9.75 10.75C9.75 9.5232 10.8912 8.75 12 8.75C13.1088 8.75 14.25 9.5232 14.25 10.75C14.25 11.1803 14.1096 11.5549 13.8794 11.8598C13.8257 11.9309 13.7988 11.9665 13.7988 12ZM11.25 13.25C11.25 13.0961 11.4519 12.75 12 12.75C12.5481 12.75 12.75 13.0961 12.75 13.25C12.75 13.4039 12.5481 13.75 12 13.75C11.4519 13.75 11.25 13.4039 11.25 13.25Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M12 5.75C8.54822 5.75 5.75 8.54822 5.75 12C5.75 15.4518 8.54822 18.25 12 18.25C15.4518 18.25 18.25 15.4518 18.25 12C18.25 8.54822 15.4518 5.75 12 5.75ZM4.25 12C4.25 7.71979 7.71979 4.25 12 4.25C16.2802 4.25 19.75 7.71979 19.75 12C19.75 16.2802 16.2802 19.75 12 19.75C7.71979 19.75 4.25 16.2802 4.25 12Z',
  d7: 'M12 10.25C11.4519 10.25 11.25 10.5961 11.25 10.75C11.25 10.9039 11.4519 11.25 12 11.25C12.5481 11.25 12.75 10.9039 12.75 10.75C12.75 10.5961 12.5481 10.25 12 10.25ZM13.8794 12.1402C13.8257 12.0691 13.7988 12.0335 13.7988 12C13.7988 11.9665 13.8257 11.9309 13.8794 11.8598C14.1096 11.5549 14.25 11.1803 14.25 10.75C14.25 9.5232 13.1088 8.75 12 8.75C10.8912 8.75 9.75 9.5232 9.75 10.75C9.75 11.1803 9.89043 11.5549 10.1206 11.8598C10.1743 11.9309 10.2012 11.9665 10.2012 12C10.2012 12.0335 10.1743 12.0691 10.1206 12.1402C9.89043 12.4451 9.75 12.8197 9.75 13.25C9.75 14.4768 10.8912 15.25 12 15.25C13.1088 15.25 14.25 14.4768 14.25 13.25C14.25 12.8197 14.1096 12.4451 13.8794 12.1402ZM12 12.75C11.4519 12.75 11.25 13.0961 11.25 13.25C11.25 13.4039 11.4519 13.75 12 13.75C12.5481 13.75 12.75 13.4039 12.75 13.25C12.75 13.0961 12.5481 12.75 12 12.75Z',
  d8: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 10.25C11.4519 10.25 11.25 10.5961 11.25 10.75C11.25 10.9039 11.4519 11.25 12 11.25C12.5481 11.25 12.75 10.9039 12.75 10.75C12.75 10.5961 12.5481 10.25 12 10.25ZM13.7629 12C14.0613 11.6726 14.25 11.2488 14.25 10.75C14.25 9.5232 13.1088 8.75 12 8.75C10.8912 8.75 9.75 9.5232 9.75 10.75C9.75 11.2488 9.93867 11.6726 10.2371 12C9.93867 12.3274 9.75 12.7512 9.75 13.25C9.75 14.4768 10.8912 15.25 12 15.25C13.1088 15.25 14.25 14.4768 14.25 13.25C14.25 12.7512 14.0613 12.3274 13.7629 12ZM12 12.75C11.4519 12.75 11.25 13.0961 11.25 13.25C11.25 13.4039 11.4519 13.75 12 13.75C12.5481 13.75 12.75 13.4039 12.75 13.25C12.75 13.0961 12.5481 12.75 12 12.75ZM5.75 12C5.75 8.54822 8.54822 5.75 12 5.75C15.4518 5.75 18.25 8.54822 18.25 12C18.25 15.4518 15.4518 18.25 12 18.25C8.54822 18.25 5.75 15.4518 5.75 12ZM12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12C19.75 7.71979 16.2802 4.25 12 4.25Z',
};

export const IconBilliard02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-stroke-rounded IconBilliard02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconBilliard02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-duotone-rounded IconBilliard02DuotoneRounded"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBilliard02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-twotone-rounded IconBilliard02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBilliard02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-solid-rounded IconBilliard02SolidRounded"
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

export const IconBilliard02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-bulk-rounded IconBilliard02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBilliard02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-stroke-sharp IconBilliard02StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconBilliard02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="billiard-02-solid-sharp IconBilliard02SolidSharp"
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

export const iconPackOfBilliard02: TheIconSelfPack = {
  name: 'Billiard02',
  StrokeRounded: IconBilliard02StrokeRounded,
  DuotoneRounded: IconBilliard02DuotoneRounded,
  TwotoneRounded: IconBilliard02TwotoneRounded,
  SolidRounded: IconBilliard02SolidRounded,
  BulkRounded: IconBilliard02BulkRounded,
  StrokeSharp: IconBilliard02StrokeSharp,
  SolidSharp: IconBilliard02SolidSharp,
};