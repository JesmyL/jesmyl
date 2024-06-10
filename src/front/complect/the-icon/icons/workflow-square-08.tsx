import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 19C3 20.4142 3 21.1213 3.43934 21.5607C3.87868 22 4.58579 22 6 22C7.41421 22 8.12132 22 8.56066 21.5607C9 21.1213 9 20.4142 9 19C9 17.5858 9 16.8787 8.56066 16.4393C8.12132 16 7.41421 16 6 16C4.58579 16 3.87868 16 3.43934 16.4393C3 16.8787 3 17.5858 3 19Z',
  d2: 'M3 5C3 6.41421 3 7.12132 3.43934 7.56066C3.87868 8 4.58579 8 6 8C7.41421 8 8.12132 8 8.56066 7.56066C9 7.12132 9 6.41421 9 5C9 3.58579 9 2.87868 8.56066 2.43934C8.12132 2 7.41421 2 6 2C4.58579 2 3.87868 2 3.43934 2.43934C3 2.87868 3 3.58579 3 5Z',
  d3: 'M15 14C15 15.4142 15 16.1213 15.4393 16.5607C15.8787 17 16.5858 17 18 17C19.4142 17 20.1213 17 20.5607 16.5607C21 16.1213 21 15.4142 21 14C21 12.5858 21 11.8787 20.5607 11.4393C20.1213 11 19.4142 11 18 11C16.5858 11 15.8787 11 15.4393 11.4393C15 11.8787 15 12.5858 15 14Z',
  d4: 'M6 8V16',
  d5: 'M15 14H12C8.68629 14 6 11.3137 6 8',
  d6: 'M6.75 8C6.75 7.58579 6.41421 7.25 6 7.25C5.58579 7.25 5.25 7.58579 5.25 8H6.75ZM5.25 16C5.25 16.4142 5.58579 16.75 6 16.75C6.41421 16.75 6.75 16.4142 6.75 16H5.25ZM15 14.75C15.4142 14.75 15.75 14.4142 15.75 14C15.75 13.5858 15.4142 13.25 15 13.25V14.75ZM5.25 8V16H6.75V8H5.25ZM12 14.75H15V13.25H12V14.75ZM5.25 8C5.25 11.7279 8.27208 14.75 12 14.75V13.25C9.10051 13.25 6.75 10.8995 6.75 8H5.25Z',
  d7: 'M6 7C6.55228 7 7 7.44772 7 8C7 10.7614 9.23858 13 12 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H12C10.0413 15 8.27052 14.1955 7 12.899V16C7 16.5523 6.55228 17 6 17C5.44772 17 5 16.5523 5 16V8C5 7.44772 5.44772 7 6 7Z',
  d8: 'M5.95063 15.25L6 15.25L6.04938 15.25H6.04943C6.71427 15.25 7.28711 15.2499 7.74585 15.3116C8.23748 15.3777 8.70875 15.5268 9.09099 15.909C9.47324 16.2913 9.6223 16.7625 9.6884 17.2542C9.75007 17.7129 9.75004 18.2858 9.75001 18.9506V19.0494C9.75004 19.7142 9.75007 20.2871 9.6884 20.7458C9.6223 21.2375 9.47324 21.7087 9.09099 22.091C8.70875 22.4732 8.23748 22.6223 7.74585 22.6884C7.2871 22.7501 6.71424 22.75 6.04937 22.75H5.95064C5.28577 22.75 4.71291 22.7501 4.25416 22.6884C3.76252 22.6223 3.29126 22.4732 2.90901 22.091C2.52677 21.7087 2.37771 21.2375 2.31161 20.7458C2.24993 20.2871 2.24996 19.7143 2.25 19.0494V19.0494L2.25 19L2.25 18.9506V18.9506C2.24996 18.2857 2.24993 17.7129 2.31161 17.2542C2.37771 16.7625 2.52677 16.2913 2.90901 15.909C3.29126 15.5268 3.76252 15.3777 4.25416 15.3116C4.71289 15.2499 5.28574 15.25 5.95058 15.25H5.95063Z',
  d9: 'M5.95063 1.25L6 1.25L6.04938 1.25H6.04943C6.71427 1.24996 7.28711 1.24993 7.74585 1.31161C8.23748 1.37771 8.70875 1.52677 9.09099 1.90901C9.47324 2.29126 9.6223 2.76252 9.6884 3.25416C9.75007 3.71291 9.75004 4.28577 9.75001 4.95064V5.04937C9.75004 5.71424 9.75007 6.2871 9.6884 6.74585C9.6223 7.23748 9.47324 7.70875 9.09099 8.09099C8.70875 8.47324 8.23748 8.6223 7.74585 8.6884C7.2871 8.75007 6.71424 8.75004 6.04937 8.75001H5.95064C5.28577 8.75004 4.71291 8.75007 4.25416 8.6884C3.76252 8.6223 3.29126 8.47324 2.90901 8.09099C2.52677 7.70875 2.37771 7.23748 2.31161 6.74585C2.24993 6.28711 2.24996 5.71427 2.25 5.04943V5.04938L2.25 5L2.25 4.95063V4.95058C2.24996 4.28574 2.24993 3.71289 2.31161 3.25416C2.37771 2.76252 2.52677 2.29126 2.90901 1.90901C3.29126 1.52677 3.76252 1.37771 4.25416 1.31161C4.71289 1.24993 5.28574 1.24996 5.95058 1.25H5.95063Z',
  d10: 'M17.9506 10.25L18 10.25L18.0494 10.25H18.0494C18.7143 10.25 19.2871 10.2499 19.7458 10.3116C20.2375 10.3777 20.7087 10.5268 21.091 10.909C21.4732 11.2913 21.6223 11.7625 21.6884 12.2542C21.7501 12.7129 21.75 13.2858 21.75 13.9506V14.0494C21.75 14.7142 21.7501 15.2871 21.6884 15.7458C21.6223 16.2375 21.4732 16.7087 21.091 17.091C20.7087 17.4732 20.2375 17.6223 19.7458 17.6884C19.2871 17.7501 18.7142 17.75 18.0494 17.75H17.9506C17.2858 17.75 16.7129 17.7501 16.2542 17.6884C15.7625 17.6223 15.2913 17.4732 14.909 17.091C14.5268 16.7087 14.3777 16.2375 14.3116 15.7458C14.2499 15.2871 14.25 14.7143 14.25 14.0494V14.0494L14.25 14L14.25 13.9506V13.9506C14.25 13.2857 14.2499 12.7129 14.3116 12.2542C14.3777 11.7625 14.5268 11.2913 14.909 10.909C15.2913 10.5268 15.7625 10.3777 16.2542 10.3116C16.7129 10.2499 17.2857 10.25 17.9506 10.25H17.9506Z',
  d11: 'M5.95063 15.2483H6.04938C6.39163 15.2483 6.70951 15.2483 7 15.2567V12.8973C8.27052 14.1939 10.0413 14.9983 12 14.9983H14.2584C14.25 14.7078 14.25 14.39 14.25 14.0477V13.949C14.25 13.6067 14.25 13.2888 14.2584 12.9983H12C9.49 12.9983 7.41197 11.1488 7.05438 8.73828C6.74933 8.74837 6.41312 8.74835 6.04937 8.74833H5.95064C5.60837 8.74835 5.29049 8.74837 5 8.73996V15.2567C5.29049 15.2483 5.60838 15.2483 5.95063 15.2483Z',
  d12: 'M9 8V2H3V8H9Z',
  d13: 'M9 22V16H3V22H9Z',
  d14: 'M21 17V11H15V17H21Z',
  d15: 'M2.25 2C2.25 1.58579 2.58579 1.25 3 1.25H9C9.41421 1.25 9.75 1.58579 9.75 2V8C9.75 8.41421 9.41421 8.75 9 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8V2Z',
  d16: 'M2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16V22C9.75 22.4142 9.41421 22.75 9 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22V16Z',
  d17: 'M14.25 11C14.25 10.5858 14.5858 10.25 15 10.25H21C21.4142 10.25 21.75 10.5858 21.75 11V17C21.75 17.4142 21.4142 17.75 21 17.75H15C14.5858 17.75 14.25 17.4142 14.25 17V11Z',
  d18: 'M6 7C6.55228 7 7 7.44772 7 8C7 10.7614 9.23858 13 12 13H15V15H12C10.0413 15 8.27052 14.1955 7 12.899V16H5V8C5 7.44772 5.44772 7 6 7Z',
};

export const IconWorkflowSquare08StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-stroke-rounded IconWorkflowSquare08StrokeRounded"
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

export const IconWorkflowSquare08DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-duotone-rounded IconWorkflowSquare08DuotoneRounded"
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

export const IconWorkflowSquare08TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-twotone-rounded IconWorkflowSquare08TwotoneRounded"
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

export const IconWorkflowSquare08SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-solid-rounded IconWorkflowSquare08SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconWorkflowSquare08BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-bulk-rounded IconWorkflowSquare08BulkRounded"
    >
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
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare08StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-stroke-sharp IconWorkflowSquare08StrokeSharp"
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWorkflowSquare08SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="workflow-square-08-solid-sharp IconWorkflowSquare08SolidSharp"
    >
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWorkflowSquare08: TheIconSelfPack = {
  name: 'WorkflowSquare08',
  StrokeRounded: IconWorkflowSquare08StrokeRounded,
  DuotoneRounded: IconWorkflowSquare08DuotoneRounded,
  TwotoneRounded: IconWorkflowSquare08TwotoneRounded,
  SolidRounded: IconWorkflowSquare08SolidRounded,
  BulkRounded: IconWorkflowSquare08BulkRounded,
  StrokeSharp: IconWorkflowSquare08StrokeSharp,
  SolidSharp: IconWorkflowSquare08SolidSharp,
};