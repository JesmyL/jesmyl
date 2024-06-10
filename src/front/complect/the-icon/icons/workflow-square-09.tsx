import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 19C3 20.4142 3 21.1213 3.43934 21.5607C3.87868 22 4.58579 22 6 22C7.41421 22 8.12132 22 8.56066 21.5607C9 21.1213 9 20.4142 9 19C9 17.5858 9 16.8787 8.56066 16.4393C8.12132 16 7.41421 16 6 16C4.58579 16 3.87868 16 3.43934 16.4393C3 16.8787 3 17.5858 3 19Z',
  d2: 'M3 5C3 6.41421 3 7.12132 3.43934 7.56066C3.87868 8 4.58579 8 6 8C7.41421 8 8.12132 8 8.56066 7.56066C9 7.12132 9 6.41421 9 5C9 3.58579 9 2.87868 8.56066 2.43934C8.12132 2 7.41421 2 6 2C4.58579 2 3.87868 2 3.43934 2.43934C3 2.87868 3 3.58579 3 5Z',
  d3: 'M15 5C15 6.41421 15 7.12132 15.4393 7.56066C15.8787 8 16.5858 8 18 8C19.4142 8 20.1213 8 20.5607 7.56066C21 7.12132 21 6.41421 21 5C21 3.58579 21 2.87868 20.5607 2.43934C20.1213 2 19.4142 2 18 2C16.5858 2 15.8787 2 15.4393 2.43934C15 2.87868 15 3.58579 15 5Z',
  d4: 'M6 8V16',
  d5: 'M6 12H14C15.8856 12 16.8284 12 17.4142 11.4142C18 10.8284 18 9.88562 18 8',
  d6: 'M6.75 8C6.75 7.58579 6.41421 7.25 6 7.25C5.58579 7.25 5.25 7.58579 5.25 8H6.75ZM5.25 16C5.25 16.4142 5.58579 16.75 6 16.75C6.41421 16.75 6.75 16.4142 6.75 16H5.25ZM6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75V11.25ZM17.4142 11.4142L16.8839 10.8839L16.8839 10.8839L17.4142 11.4142ZM18.75 8C18.75 7.58579 18.4142 7.25 18 7.25C17.5858 7.25 17.25 7.58579 17.25 8H18.75ZM5.25 8V16H6.75V8H5.25ZM6 12.75H14V11.25H6V12.75ZM14 12.75C14.9216 12.75 15.6883 12.7516 16.2945 12.6701C16.9223 12.5857 17.4891 12.4 17.9445 11.9445L16.8839 10.8839C16.7536 11.0142 16.5561 11.1214 16.0946 11.1835C15.6116 11.2484 14.964 11.25 14 11.25V12.75ZM17.25 8C17.25 8.96401 17.2484 9.61157 17.1835 10.0946C17.1214 10.5561 17.0142 10.7536 16.8839 10.8839L17.9445 11.9445C18.4 11.4891 18.5857 10.9223 18.6701 10.2945C18.7516 9.68826 18.75 8.92161 18.75 8H17.25Z',
  d7: 'M5.95063 15.25L6 15.25L6.04938 15.25H6.04943C6.71427 15.25 7.28711 15.2499 7.74585 15.3116C8.23748 15.3777 8.70875 15.5268 9.09099 15.909C9.47324 16.2913 9.6223 16.7625 9.6884 17.2542C9.75007 17.7129 9.75004 18.2858 9.75001 18.9506V19.0494C9.75004 19.7142 9.75007 20.2871 9.6884 20.7458C9.6223 21.2375 9.47324 21.7087 9.09099 22.091C8.70875 22.4732 8.23748 22.6223 7.74585 22.6884C7.2871 22.7501 6.71424 22.75 6.04937 22.75H5.95064C5.28577 22.75 4.71291 22.7501 4.25416 22.6884C3.76252 22.6223 3.29126 22.4732 2.90901 22.091C2.52677 21.7087 2.37771 21.2375 2.31161 20.7458C2.24993 20.2871 2.24996 19.7143 2.25 19.0494V19.0494L2.25 19L2.25 18.9506V18.9506C2.24996 18.2857 2.24993 17.7129 2.31161 17.2542C2.37771 16.7625 2.52677 16.2913 2.90901 15.909C3.29126 15.5268 3.76252 15.3777 4.25416 15.3116C4.71289 15.2499 5.28574 15.25 5.95058 15.25H5.95063Z',
  d8: 'M5.95063 1.25L6 1.25L6.04938 1.25H6.04943C6.71427 1.24996 7.28711 1.24993 7.74585 1.31161C8.23748 1.37771 8.70875 1.52677 9.09099 1.90901C9.47324 2.29126 9.6223 2.76252 9.6884 3.25416C9.75007 3.71291 9.75004 4.28577 9.75001 4.95064V5.04937C9.75004 5.71424 9.75007 6.2871 9.6884 6.74585C9.6223 7.23748 9.47324 7.70875 9.09099 8.09099C8.70875 8.47324 8.23748 8.6223 7.74585 8.6884C7.2871 8.75007 6.71424 8.75004 6.04937 8.75001H5.95064C5.28577 8.75004 4.71291 8.75007 4.25416 8.6884C3.76252 8.6223 3.29126 8.47324 2.90901 8.09099C2.52677 7.70875 2.37771 7.23748 2.31161 6.74585C2.24993 6.28711 2.24996 5.71427 2.25 5.04943V5.04938L2.25 5L2.25 4.95063V4.95058C2.24996 4.28574 2.24993 3.71289 2.31161 3.25416C2.37771 2.76252 2.52677 2.29126 2.90901 1.90901C3.29126 1.52677 3.76252 1.37771 4.25416 1.31161C4.71289 1.24993 5.28574 1.24996 5.95058 1.25H5.95063Z',
  d9: 'M17.9506 1.25L18 1.25L18.0494 1.25H18.0494C18.7143 1.24996 19.2871 1.24993 19.7458 1.31161C20.2375 1.37771 20.7087 1.52677 21.091 1.90901C21.4732 2.29126 21.6223 2.76252 21.6884 3.25416C21.7501 3.71291 21.75 4.28577 21.75 4.95064V5.04937C21.75 5.71424 21.7501 6.2871 21.6884 6.74585C21.6223 7.23748 21.4732 7.70875 21.091 8.09099C20.7087 8.47324 20.2375 8.6223 19.7458 8.6884C19.2871 8.75007 18.7142 8.75004 18.0494 8.75001H17.9506C17.2858 8.75004 16.7129 8.75007 16.2542 8.6884C15.7625 8.6223 15.2913 8.47324 14.909 8.09099C14.5268 7.70875 14.3777 7.23748 14.3116 6.74585C14.2499 6.28711 14.25 5.71427 14.25 5.04943V5.04938L14.25 5L14.25 4.95063V4.95058C14.25 4.28574 14.2499 3.71289 14.3116 3.25416C14.3777 2.76252 14.5268 2.29126 14.909 1.90901C15.2913 1.52677 15.7625 1.37771 16.2542 1.31161C16.7129 1.24993 17.2857 1.24996 17.9506 1.25H17.9506Z',
  d10: 'M7 16C7 16.5523 6.55228 17 6 17C5.44772 17 5 16.5523 5 16V8C5 7.44771 5.44772 7 6 7C6.55228 7 7 7.44771 7 8V11H14C14.9711 11 15.5988 10.9979 16.0613 10.9357C16.495 10.8774 16.631 10.7832 16.7071 10.7071C16.7832 10.631 16.8774 10.495 16.9357 10.0613C16.9979 9.59879 17 8.97108 17 8C17 7.44771 17.4477 7 18 7C18.5523 7 19 7.44771 19 8L19 8.06583C19.0001 8.95232 19.0001 9.71613 18.9179 10.3278C18.8297 10.9833 18.631 11.6117 18.1213 12.1213C17.6117 12.631 16.9833 12.8297 16.3278 12.9179C15.7161 13.0001 14.9523 13.0001 14.0659 13L7 13V16Z',
  d11: 'M5.95063 15.2506H6.04938C6.39163 15.2506 6.70951 15.2506 7 15.259V13.0006L14.0659 13.0006C14.9523 13.0006 15.7161 13.0007 16.3278 12.9185C16.9833 12.8303 17.6117 12.6316 18.1213 12.1219C18.631 11.6123 18.8297 10.9839 18.9179 10.3284C18.9784 9.87819 18.9943 9.34557 18.9985 8.74228C18.7084 8.75064 18.3911 8.75062 18.0494 8.7506H17.9506C17.6077 8.75062 17.2892 8.75064 16.9982 8.74219C16.9941 9.31158 16.9804 9.72942 16.9357 10.0619C16.8774 10.4956 16.7832 10.6316 16.7071 10.7077C16.631 10.7838 16.495 10.878 16.0613 10.9363C15.5988 10.9985 14.9711 11.0006 14 11.0006H7V8.74224C6.70952 8.75064 6.39164 8.75062 6.04937 8.7506H5.95064C5.60837 8.75062 5.29049 8.75064 5 8.74224V15.259C5.29049 15.2506 5.60838 15.2506 5.95063 15.2506Z',
  d12: 'M9 8V2H3V8H9Z',
  d13: 'M9 22V16H3V22H9Z',
  d14: 'M21 8V2H15V8H21Z',
  d15: 'M6 12H18V8',
  d16: 'M2.25 2C2.25 1.58579 2.58579 1.25 3 1.25H9C9.41421 1.25 9.75 1.58579 9.75 2V8C9.75 8.41421 9.41421 8.75 9 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8V2Z',
  d17: 'M2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16V22C9.75 22.4142 9.41421 22.75 9 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22V16Z',
  d18: 'M14.25 2C14.25 1.58579 14.5858 1.25 15 1.25H21C21.4142 1.25 21.75 1.58579 21.75 2V8C21.75 8.41421 21.4142 8.75 21 8.75H15C14.5858 8.75 14.25 8.41421 14.25 8V2Z',
  d19: 'M7 16V8H5V16H7Z',
  d20: 'M17 11V8H19V12C19 12.5523 18.5523 13 18 13H6V11H17Z',
};

export const IconWorkflowSquare09StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-stroke-rounded IconWorkflowSquare09StrokeRounded"
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

export const IconWorkflowSquare09DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-duotone-rounded IconWorkflowSquare09DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
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

export const IconWorkflowSquare09TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-twotone-rounded IconWorkflowSquare09TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare09SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-solid-rounded IconWorkflowSquare09SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare09BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-bulk-rounded IconWorkflowSquare09BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare09StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-stroke-sharp IconWorkflowSquare09StrokeSharp"
    >
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
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
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare09SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-09-solid-sharp IconWorkflowSquare09SolidSharp"
    >
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWorkflowSquare09: TheIconSelfPack = {
  name: 'WorkflowSquare09',
  StrokeRounded: IconWorkflowSquare09StrokeRounded,
  DuotoneRounded: IconWorkflowSquare09DuotoneRounded,
  TwotoneRounded: IconWorkflowSquare09TwotoneRounded,
  SolidRounded: IconWorkflowSquare09SolidRounded,
  BulkRounded: IconWorkflowSquare09BulkRounded,
  StrokeSharp: IconWorkflowSquare09StrokeSharp,
  SolidSharp: IconWorkflowSquare09SolidSharp,
};