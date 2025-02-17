import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 9C7.20949 9.5826 7.77476 10 8.43922 10C9.10367 10 9.66894 9.5826 9.87843 9M14.1216 9C14.3311 9.5826 14.8963 10 15.5608 10C16.2252 10 16.7905 9.5826 17 9',
  d2: 'M12 17.5C10 17.5 8 16 7.5 14',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.43942 9.25C8.09461 9.25 7.80952 9.0342 7.70596 8.74622C7.5658 8.35644 7.1362 8.15408 6.74642 8.29424C6.35664 8.4344 6.15429 8.864 6.29445 9.25378C6.60988 10.131 7.45533 10.75 8.43942 10.75C9.42351 10.75 10.269 10.131 10.5844 9.25378C10.7246 8.864 10.5222 8.4344 10.1324 8.29424C9.74264 8.15408 9.31304 8.35644 9.17288 8.74622C9.06932 9.0342 8.78423 9.25 8.43942 9.25ZM15.561 9.25C15.2162 9.25 14.9311 9.0342 14.8275 8.74622C14.6874 8.35644 14.2578 8.15408 13.868 8.29424C13.4782 8.4344 13.2759 8.864 13.416 9.25378C13.7314 10.131 14.5769 10.75 15.561 10.75C16.5451 10.75 17.3905 10.131 17.706 9.25378C17.8461 8.864 17.6438 8.4344 17.254 8.29424C16.8642 8.15408 16.4346 8.35644 16.2944 8.74622C16.1909 9.0342 15.9058 9.25 15.561 9.25ZM8.17301 13.8309C8.07999 13.4588 7.70295 13.2326 7.33087 13.3256C6.95879 13.4186 6.73257 13.7956 6.82559 14.1677C7.40492 16.4851 9.68915 18.1937 11.9993 18.1937C12.3828 18.1937 12.6937 17.8828 12.6937 17.4993C12.6937 17.1158 12.3828 16.8049 11.9993 16.8049C10.3094 16.8049 8.59368 15.5135 8.17301 13.8309Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M8.43942 9.25C8.09461 9.25 7.80952 9.0342 7.70596 8.74622C7.5658 8.35644 7.1362 8.15408 6.74642 8.29424C6.35664 8.4344 6.15429 8.864 6.29445 9.25378C6.60988 10.131 7.45533 10.75 8.43942 10.75C9.42351 10.75 10.269 10.131 10.5844 9.25378C10.7246 8.864 10.5222 8.4344 10.1324 8.29424C9.74264 8.15408 9.31304 8.35644 9.17288 8.74622C9.06932 9.0342 8.78423 9.25 8.43942 9.25ZM15.561 9.25C15.2162 9.25 14.9311 9.0342 14.8275 8.74622C14.6874 8.35644 14.2578 8.15408 13.868 8.29424C13.4782 8.4344 13.2759 8.864 13.416 9.25378C13.7314 10.131 14.5769 10.75 15.561 10.75C16.5451 10.75 17.3905 10.131 17.706 9.25378C17.8461 8.864 17.6438 8.4344 17.254 8.29424C16.8642 8.15408 16.4346 8.35644 16.2944 8.74622C16.1909 9.0342 15.9058 9.25 15.561 9.25Z',
  d6: 'M7.33087 13.3256C7.70295 13.2326 8.07999 13.4588 8.17301 13.8309C8.59368 15.5135 10.3094 16.8049 11.9993 16.8049C12.3828 16.8049 12.6937 17.1158 12.6937 17.4993C12.6937 17.8828 12.3828 18.1937 11.9993 18.1937C9.68915 18.1937 7.40492 16.4851 6.82559 14.1677C6.73257 13.7956 6.95879 13.4186 7.33087 13.3256Z',
  d7: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.4399 9.25C8.09508 9.25 7.80999 9.0342 7.70644 8.74622L6.29492 9.25378C6.61035 10.131 7.45581 10.75 8.4399 10.75C9.42399 10.75 10.2694 10.131 10.5849 9.25378L9.17335 8.74622C9.0698 9.0342 8.78471 9.25 8.4399 9.25ZM15.5615 9.25C15.2167 9.25 14.9316 9.0342 14.828 8.74622L13.4165 9.25378C13.7319 10.131 14.5774 10.75 15.5615 10.75C16.5456 10.75 17.391 10.131 17.7064 9.25378L16.2949 8.74622C16.1914 9.0342 15.9063 9.25 15.5615 9.25ZM11.9991 16.7503C10.334 16.7503 8.64102 15.4756 8.2267 13.8184L6.77148 14.1822C7.35716 16.5249 9.66413 18.2503 11.9991 18.2503V16.7503Z',
};

export const IconRelieved02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-stroke-rounded IconRelieved02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconRelieved02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-duotone-rounded IconRelieved02DuotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="12" 
        r="10" 
        fill="var(--icon-fill)"></circle>
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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

export const IconRelieved02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-twotone-rounded IconRelieved02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round"></circle>
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
    </TheIconWrapper>
  );
};

export const IconRelieved02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-solid-rounded IconRelieved02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRelieved02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-bulk-rounded IconRelieved02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRelieved02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-stroke-sharp IconRelieved02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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
    </TheIconWrapper>
  );
};

export const IconRelieved02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="relieved-02-solid-sharp IconRelieved02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRelieved02: TheIconSelfPack = {
  name: 'Relieved02',
  StrokeRounded: IconRelieved02StrokeRounded,
  DuotoneRounded: IconRelieved02DuotoneRounded,
  TwotoneRounded: IconRelieved02TwotoneRounded,
  SolidRounded: IconRelieved02SolidRounded,
  BulkRounded: IconRelieved02BulkRounded,
  StrokeSharp: IconRelieved02StrokeSharp,
  SolidSharp: IconRelieved02SolidSharp,
};