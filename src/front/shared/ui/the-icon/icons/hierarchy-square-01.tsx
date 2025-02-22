import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14 19.5H13C10.1716 19.5 8.75736 19.5 7.87868 18.6213C7 17.7426 7 16.3284 7 13.5V11.5M7 8V11.5M7 11.5H14',
  d2: 'M14 11.5C14 10.3215 14 9.73223 14.3515 9.36612C14.7029 9 15.2686 9 16.4 9H17.6C18.7314 9 19.2971 9 19.6485 9.36612C20 9.73223 20 10.3215 20 11.5C20 12.6785 20 13.2678 19.6485 13.6339C19.2971 14 18.7314 14 17.6 14H16.4C15.2686 14 14.7029 14 14.3515 13.6339C14 13.2678 14 12.6785 14 11.5Z',
  d3: 'M14 19.5C14 18.3215 14 17.7322 14.3515 17.3661C14.7029 17 15.2686 17 16.4 17H17.6C18.7314 17 19.2971 17 19.6485 17.3661C20 17.7322 20 18.3215 20 19.5C20 20.6785 20 21.2678 19.6485 21.6339C19.2971 22 18.7314 22 17.6 22H16.4C15.2686 22 14.7029 22 14.3515 21.6339C14 21.2678 14 20.6785 14 19.5Z',
  d4: 'M5.28571 2H8.71429C10.7888 2 11 3.10993 11 5C11 6.89007 10.7888 8 8.71429 8H5.28571C3.2112 8 3 6.89007 3 5C3 3.10993 3.2112 2 5.28571 2Z',
  d5: 'M7 7C7.55229 7 8 7.44772 8 8V10.5H14C14.5523 10.5 15 10.9477 15 11.5C15 12.0523 14.5523 12.5 14 12.5H8V13.5C8 14.9425 8.00213 15.9237 8.10092 16.6586C8.19585 17.3646 8.36322 17.6916 8.58579 17.9142C8.80836 18.1368 9.13538 18.3042 9.84143 18.3991C10.5763 18.4979 11.5575 18.5 13 18.5H14C14.5523 18.5 15 18.9477 15 19.5C15 20.0523 14.5523 20.5 14 20.5L12.9294 20.5C11.5753 20.5 10.4587 20.5001 9.57494 20.3812C8.64711 20.2565 7.82768 19.9845 7.17158 19.3284C6.51547 18.6723 6.2435 17.8529 6.11875 16.9251C5.99994 16.0413 5.99997 14.9247 6 13.5706L6 8C6 7.44772 6.44772 7 7 7Z',
  d6: 'M16.3516 8.25L16.4 8.25001H17.6L17.6484 8.25C18.1725 8.24995 18.6415 8.24991 19.0208 8.30302C19.4364 8.36123 19.8527 8.49578 20.1896 8.84672C20.5224 9.19337 20.6459 9.61428 20.6999 10.0324C20.7501 10.4212 20.75 10.9042 20.75 11.454V11.546C20.75 12.0958 20.7501 12.5788 20.6999 12.9676C20.6459 13.3857 20.5224 13.8066 20.1896 14.1533C19.8527 14.5042 19.4364 14.6388 19.0208 14.697C18.6415 14.7501 18.1725 14.7501 17.6484 14.75L17.6 14.75H16.4L16.3516 14.75C15.8275 14.7501 15.3585 14.7501 14.9793 14.697C14.5636 14.6388 14.1473 14.5042 13.8104 14.1533C13.4777 13.8066 13.3541 13.3857 13.3001 12.9676C13.2499 12.5788 13.25 12.0958 13.25 11.546L13.25 11.5L13.25 11.454C13.25 10.9042 13.2499 10.4212 13.3001 10.0324C13.3541 9.61428 13.4777 9.19337 13.8104 8.84672C14.1473 8.49578 14.5636 8.36123 14.9793 8.30302C15.3585 8.24991 15.8275 8.24995 16.3516 8.25L16.3516 8.25Z',
  d7: 'M16.3516 16.25L16.4 16.25H17.6L17.6484 16.25C18.1725 16.25 18.6415 16.2499 19.0208 16.303C19.4364 16.3612 19.8527 16.4958 20.1896 16.8467C20.5224 17.1934 20.6459 17.6143 20.6999 18.0324C20.7501 18.4212 20.75 18.9042 20.75 19.454V19.546C20.75 20.0958 20.7501 20.5788 20.6999 20.9676C20.6459 21.3857 20.5224 21.8066 20.1896 22.1533C19.8527 22.5042 19.4364 22.6388 19.0208 22.697C18.6415 22.7501 18.1725 22.7501 17.6484 22.75L17.6 22.75H16.4L16.3516 22.75C15.8275 22.7501 15.3585 22.7501 14.9793 22.697C14.5636 22.6388 14.1473 22.5042 13.8104 22.1533C13.4777 21.8066 13.3541 21.3857 13.3001 20.9676C13.2499 20.5788 13.25 20.0958 13.25 19.546L13.25 19.5L13.25 19.454C13.25 18.9042 13.2499 18.4212 13.3001 18.0324C13.3541 17.6143 13.4777 17.1934 13.8104 16.8467C14.1473 16.4958 14.5636 16.3612 14.9793 16.303C15.3585 16.2499 15.8275 16.25 16.3516 16.25L16.3516 16.25Z',
  d8: 'M2.72393 2.40181C3.22979 1.56916 4.12113 1.25 5.28571 1.25H8.71429C9.87887 1.25 10.7702 1.56916 11.2761 2.40181C11.7139 3.12249 11.75 4.08766 11.75 5C11.75 5.91234 11.7139 6.87751 11.2761 7.59819C10.7702 8.43084 9.87887 8.75 8.71429 8.75H5.28571C4.12113 8.75 3.22979 8.43084 2.72393 7.59819C2.2861 6.87751 2.25 5.91234 2.25 5C2.25 4.08766 2.2861 3.12249 2.72393 2.40181Z',
  d9: 'M16.3516 8.25H17.6484C18.1725 8.24995 18.6415 8.2499 19.0207 8.30301C19.4364 8.36123 19.8527 8.49578 20.1896 8.84672C20.5223 9.19336 20.6459 9.61428 20.6999 10.0324C20.7501 10.4212 20.75 10.9042 20.75 11.454V11.546C20.75 12.0958 20.7501 12.5788 20.6999 12.9676C20.6459 13.3857 20.5223 13.8066 20.1896 14.1533C19.8527 14.5042 19.4364 14.6388 19.0207 14.697C18.6415 14.7501 18.1725 14.7501 17.6484 14.75H16.3516C15.8275 14.7501 15.3585 14.7501 14.9793 14.697C14.5636 14.6388 14.1473 14.5042 13.8104 14.1533C13.4777 13.8066 13.3541 13.3857 13.3001 12.9676C13.2499 12.5788 13.25 12.0958 13.25 11.546V11.454C13.25 10.9042 13.2499 10.4212 13.3001 10.0324C13.3541 9.61428 13.4777 9.19336 13.8104 8.84672C14.1473 8.49578 14.5636 8.36123 14.9793 8.30301C15.3585 8.2499 15.8275 8.24995 16.3516 8.25Z',
  d10: 'M16.3516 16.25H17.6484C18.1725 16.2499 18.6415 16.2499 19.0207 16.303C19.4364 16.3612 19.8527 16.4958 20.1896 16.8467C20.5223 17.1934 20.6459 17.6143 20.6999 18.0324C20.7501 18.4212 20.75 18.9042 20.75 19.454V19.546C20.75 20.0958 20.7501 20.5788 20.6999 20.9676C20.6459 21.3857 20.5223 21.8066 20.1896 22.1533C19.8527 22.5042 19.4364 22.6388 19.0207 22.697C18.6415 22.7501 18.1725 22.7501 17.6484 22.75H16.3516C15.8275 22.7501 15.3585 22.7501 14.9793 22.697C14.5636 22.6388 14.1473 22.5042 13.8104 22.1533C13.4777 21.8066 13.3541 21.3857 13.3001 20.9676C13.2499 20.5788 13.25 20.0958 13.25 19.546V19.454C13.25 18.9042 13.2499 18.4212 13.3001 18.0324C13.3541 17.6143 13.4777 17.1934 13.8104 16.8467C14.1473 16.4958 14.5636 16.3612 14.9793 16.303C15.3585 16.2499 15.8275 16.2499 16.3516 16.25Z',
  d11: 'M6 8.75L6 13.5706C5.99997 14.9247 5.99994 16.0413 6.11876 16.9251C6.2435 17.8529 6.51547 18.6723 7.17158 19.3284C7.82769 19.9845 8.64711 20.2565 9.57494 20.3812C10.4587 20.5001 11.5753 20.5 12.9294 20.5L13.2625 20.5C13.25 20.2132 13.25 19.8929 13.25 19.546V19.454C13.25 19.1071 13.25 18.7868 13.2625 18.5H13C11.5575 18.5 10.5763 18.4979 9.84144 18.3991C9.13538 18.3042 8.80836 18.1368 8.58579 17.9142C8.36322 17.6916 8.19585 17.3646 8.10092 16.6586C8.00213 15.9237 8 14.9425 8 13.5V12.5H13.2625C13.25 12.2132 13.25 11.8929 13.25 11.546V11.454C13.25 11.1071 13.25 10.7868 13.2625 10.5H8V8.75H6Z',
  d12: 'M11 8V2H3V8H11Z',
  d13: 'M20 14V9H14V14H20Z',
  d14: 'M20 22V17H14V22H20Z',
  d15: 'M14 19.5H7V11.5M7 8V11.5M7 11.5H14',
  d16: 'M2.25 2C2.25 1.58579 2.58579 1.25 3 1.25H11C11.4142 1.25 11.75 1.58579 11.75 2V8C11.75 8.41421 11.4142 8.75 11 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8V2Z',
  d17: 'M13.25 9C13.25 8.58579 13.5858 8.25 14 8.25H20C20.4142 8.25 20.75 8.58579 20.75 9V14C20.75 14.4142 20.4142 14.75 20 14.75H14C13.5858 14.75 13.25 14.4142 13.25 14V9Z',
  d18: 'M13.25 17C13.25 16.5858 13.5858 16.25 14 16.25H20C20.4142 16.25 20.75 16.5858 20.75 17V22C20.75 22.4142 20.4142 22.75 20 22.75H14C13.5858 22.75 13.25 22.4142 13.25 22V17Z',
  d19: 'M6 8H8V10.5H14V12.5H8V18.5H14V20.5H7C6.44772 20.5 6 20.0523 6 19.5V8Z',
};

export const IconHierarchySquare01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-stroke-rounded IconHierarchySquare01StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-duotone-rounded IconHierarchySquare01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-twotone-rounded IconHierarchySquare01TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-solid-rounded IconHierarchySquare01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-bulk-rounded IconHierarchySquare01BulkRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-stroke-sharp IconHierarchySquare01StrokeSharp"
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
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHierarchySquare01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hierarchy-square-01-solid-sharp IconHierarchySquare01SolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfHierarchySquare01: TheIconSelfPack = {
  name: 'HierarchySquare01',
  StrokeRounded: IconHierarchySquare01StrokeRounded,
  DuotoneRounded: IconHierarchySquare01DuotoneRounded,
  TwotoneRounded: IconHierarchySquare01TwotoneRounded,
  SolidRounded: IconHierarchySquare01SolidRounded,
  BulkRounded: IconHierarchySquare01BulkRounded,
  StrokeSharp: IconHierarchySquare01StrokeSharp,
  SolidSharp: IconHierarchySquare01SolidSharp,
};