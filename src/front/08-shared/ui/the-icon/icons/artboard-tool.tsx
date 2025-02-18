import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9 7H15C18.2998 7 19.9497 7 20.9749 8.02513C22 9.05025 22 10.7002 22 14V15C22 18.2998 22 19.9497 20.9749 20.9749C19.9497 22 18.2998 22 15 22H14C10.7002 22 9.05025 22 8.02513 20.9749C7 19.9497 7 18.2998 7 15V9',
  d2: 'M2 7L5 7',
  d3: 'M7 5L7 2',
  d4: 'M15 7H9C7.4 7 7 8.33333 7 9V15C7 18.2998 7 19.9497 8.02513 20.9749C9.05025 22 10.7002 22 14 22H15C18.2998 22 19.9497 22 20.9749 20.9749C22 19.9497 22 18.2998 22 15V14C22 10.7002 22 9.05025 20.9749 8.02513C19.9497 7 18.2998 7 15 7Z',
  d5: 'M18.7072 8.11923C17.8362 8.00213 16.6782 8 15 8H9.5C8.94772 8 8.5 7.55229 8.5 7C8.5 6.44772 8.94772 6 9.5 6L15.072 6C16.6607 5.99997 17.9539 5.99994 18.9737 6.13706C20.0377 6.28011 20.9527 6.58869 21.682 7.31802C22.4113 8.04735 22.7199 8.96232 22.8629 10.0263C23.0001 11.0462 23 12.3393 23 13.928V15.072C23 16.6607 23.0001 17.9538 22.8629 18.9737C22.7199 20.0377 22.4113 20.9527 21.682 21.682C20.9527 22.4113 20.0377 22.7199 18.9737 22.8629C17.9538 23.0001 16.6607 23 15.072 23H13.928C12.3393 23 11.0462 23.0001 10.0263 22.8629C8.96232 22.7199 8.04735 22.4113 7.31802 21.682C6.58869 20.9527 6.28011 20.0377 6.13706 18.9737C5.99994 17.9539 5.99997 16.6607 6 15.072L6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55229 8.5 8 8.94772 8 9.5V15C8 16.6782 8.00213 17.8362 8.11923 18.7072C8.23246 19.5494 8.43644 19.972 8.73223 20.2678C9.02803 20.5636 9.45059 20.7675 10.2928 20.8808C11.1638 20.9979 12.3218 21 14 21H15C16.6782 21 17.8362 20.9979 18.7072 20.8808C19.5494 20.7675 19.972 20.5636 20.2678 20.2678C20.5636 19.972 20.7675 19.5494 20.8808 18.7072C20.9979 17.8362 21 16.6782 21 15V14C21 12.3218 20.9979 11.1638 20.8808 10.2928C20.7675 9.45059 20.5636 9.02803 20.2678 8.73223C19.972 8.43644 19.5494 8.23246 18.7072 8.11923Z',
  d6: 'M1 7C1 6.44772 1.44772 6 2 6L4.5 6C5.05228 6 5.5 6.44772 5.5 7C5.5 7.55228 5.05228 8 4.5 8L2 8C1.44772 8 1 7.55228 1 7Z',
  d7: 'M7 5.5C6.44772 5.5 6 5.05228 6 4.5L6 2C6 1.44772 6.44771 1 7 1C7.55228 1 8 1.44772 8 2L8 4.5C8 5.05228 7.55228 5.5 7 5.5Z',
  d8: 'M9 7H22V22H7V9',
  d9: 'M20.5 7.5H8.5V5.5H22.5V22.5H5.5V8.5H7.5V20.5H20.5V7.5Z',
  d10: 'M4.5 7.5L1.5 7.5L1.5 5.5L4.5 5.5V7.5Z',
  d11: 'M7.5 1.5L7.5 4.5L5.5 4.5L5.5 1.5L7.5 1.5Z',
};

export const IconArtboardToolStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-stroke-rounded IconArtboardToolStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconArtboardToolDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-duotone-rounded IconArtboardToolDuotoneRounded"
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

export const IconArtboardToolTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-twotone-rounded IconArtboardToolTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardToolSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-solid-rounded IconArtboardToolSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardToolBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-bulk-rounded IconArtboardToolBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconArtboardToolStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-stroke-sharp IconArtboardToolStrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
    </TheIconWrapper>
  );
};

export const IconArtboardToolSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artboard-tool-solid-sharp IconArtboardToolSolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArtboardTool: TheIconSelfPack = {
  name: 'ArtboardTool',
  StrokeRounded: IconArtboardToolStrokeRounded,
  DuotoneRounded: IconArtboardToolDuotoneRounded,
  TwotoneRounded: IconArtboardToolTwotoneRounded,
  SolidRounded: IconArtboardToolSolidRounded,
  BulkRounded: IconArtboardToolBulkRounded,
  StrokeSharp: IconArtboardToolStrokeSharp,
  SolidSharp: IconArtboardToolSolidSharp,
};