import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22V9',
  d2: 'M15 17.4836C16.6764 16.7687 18 15.2035 18 12.0195C18 7.60125 15 2.01953 12 2.01953C9 2.01953 6 7.60125 6 12.0195C6 15.2035 7.32362 16.7687 9 17.4836',
  d3: 'M12 15L14.5 12.5',
  d4: 'M12 13L9.5 10.5',
  d5: 'M10 22H14',
  d6: 'M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 2 12 2C15.3137 2 18 8.68629 18 12Z',
  d7: 'M12 1.25C10.8793 1.25 9.89456 1.77217 9.07995 2.51671C8.26675 3.25995 7.57724 4.26383 7.02077 5.34403C5.91274 7.49491 5.25 10.1119 5.25 12C5.25 13.8885 5.79087 15.5909 6.95385 16.8265C7.98525 17.9224 9.43966 18.5807 11.25 18.7215V13.3107L8.96967 11.0303C8.67678 10.7374 8.67678 10.2626 8.96967 9.96967C9.26256 9.67678 9.73744 9.67678 10.0303 9.96967L11.25 11.1893V9C11.25 8.58579 11.5858 8.25 12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.1893L13.9697 11.9697C14.2626 11.6768 14.7374 11.6768 15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L12.75 15.3107V18.7215C14.5603 18.5807 16.0148 17.9224 17.0462 16.8265C18.2091 15.5909 18.75 13.8885 18.75 12C18.75 10.1119 18.0873 7.49491 16.9792 5.34403C16.4228 4.26383 15.7332 3.25995 14.92 2.51671C14.1054 1.77217 13.1207 1.25 12 1.25Z',
  d8: 'M11.25 18.7215V21.25H10C9.58579 21.25 9.25 21.5858 9.25 22C9.25 22.4142 9.58579 22.75 10 22.75H14C14.4142 22.75 14.75 22.4142 14.75 22C14.75 21.5858 14.4142 21.25 14 21.25H12.75V18.7215C12.5064 18.7404 12.2563 18.75 12 18.75C11.7437 18.75 11.4936 18.7404 11.25 18.7215Z',
  d9: 'M9.07995 2.51671C9.89456 1.77217 10.8793 1.25 12 1.25C13.1207 1.25 14.1054 1.77217 14.92 2.51671C15.7332 3.25995 16.4228 4.26383 16.9792 5.34403C18.0873 7.49491 18.75 10.1119 18.75 12C18.75 13.8885 18.2091 15.5909 17.0462 16.8265C15.876 18.0698 14.1612 18.75 12 18.75C9.83875 18.75 8.12404 18.0698 6.95385 16.8265C5.79087 15.5909 5.25 13.8885 5.25 12C5.25 10.1119 5.91274 7.49491 7.02077 5.34403C7.57724 4.26383 8.26675 3.25995 9.07995 2.51671Z',
  d10: 'M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V13.1893L13.9697 11.9697C14.2626 11.6768 14.7374 11.6768 15.0303 11.9697C15.3232 12.2626 15.3232 12.7374 15.0303 13.0303L12.75 15.3107V21.25H14C14.4142 21.25 14.75 21.5858 14.75 22C14.75 22.4142 14.4142 22.75 14 22.75H10C9.58579 22.75 9.25 22.4142 9.25 22C9.25 21.5858 9.58579 21.25 10 21.25H11.25V13.3107L8.96967 11.0303C8.67678 10.7374 8.67678 10.2626 8.96967 9.96967C9.26256 9.67678 9.73744 9.67678 10.0303 9.96967L11.25 11.1893V9C11.25 8.58579 11.5858 8.25 12 8.25Z',
  d11: 'M10 22H12M12 22H14M12 22V15M12 15L14.5 12.5M12 15V13M12 13V9M12 13L9.5 10.5',
  d12: 'M12 1.25C10.909 1.25 9.94443 1.7998 9.14929 2.5515C8.35074 3.30644 7.65841 4.32318 7.0921 5.41105C5.96631 7.57368 5.25 10.1927 5.25 12C5.25 15.4745 7.8751 18.3358 11.2501 18.7088V13.3107L8.43945 10.5L9.50011 9.43934L11.2501 11.1893V8.25H12.7501V13.1893L14.5001 11.4393L15.5608 12.5L12.7501 15.3107V18.7088C16.125 18.3357 18.75 15.4744 18.75 12C18.75 10.1927 18.0337 7.57368 16.9079 5.41105C16.3416 4.32318 15.6493 3.30644 14.8507 2.5515C14.0556 1.7998 13.091 1.25 12 1.25Z',
  d13: 'M11.2501 18.7088V21.25H9.25012V22.75H14.7501V21.25H12.7501V18.7088C12.5038 18.736 12.2536 18.75 12 18.75C11.7465 18.75 11.4963 18.736 11.2501 18.7088Z',
};

export const IconTree05StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-stroke-rounded IconTree05StrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTree05DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-duotone-rounded IconTree05DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTree05TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-twotone-rounded IconTree05TwotoneRounded"
    >
      <path 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTree05SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-solid-rounded IconTree05SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconTree05BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-bulk-rounded IconTree05BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconTree05StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-stroke-sharp IconTree05StrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconTree05SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="tree-05-solid-sharp IconTree05SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTree05: TheIconSelfPack = {
  name: 'Tree05',
  StrokeRounded: IconTree05StrokeRounded,
  DuotoneRounded: IconTree05DuotoneRounded,
  TwotoneRounded: IconTree05TwotoneRounded,
  SolidRounded: IconTree05SolidRounded,
  BulkRounded: IconTree05BulkRounded,
  StrokeSharp: IconTree05StrokeSharp,
  SolidSharp: IconTree05SolidSharp,
};