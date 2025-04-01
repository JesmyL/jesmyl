import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.40882 17.1182C5.05045 15.6022 4.87126 14.8442 5.1059 14.26C5.25187 13.8966 5.50214 13.5836 5.82571 13.3598C6.34581 13 7.13106 13 8.70154 13H15.2985C16.8689 13 17.6542 13 18.1743 13.3598C18.4979 13.5836 18.7481 13.8966 18.8941 14.26C19.1287 14.8442 18.9496 15.6022 18.5912 17.1182C18.2381 18.6117 18.0616 19.3584 17.6207 19.8949C17.3433 20.2325 16.9952 20.5061 16.6004 20.6968C15.9729 21 15.1993 21 13.6521 21H10.3479C8.8007 21 8.0271 21 7.39959 20.6968C7.00485 20.5061 6.6567 20.2325 6.37933 19.8949C5.9384 19.3584 5.76188 18.6117 5.40882 17.1182Z',
  d2: 'M3 21H21',
  d3: 'M11 16H13',
  d4: 'M8 11C9.83846 8.40464 14.1188 8.26296 16 11',
  d5: 'M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z',
  d6: 'M2.55078 21C2.55078 20.4477 2.9985 20 3.55078 20H21.5508C22.1031 20 22.5508 20.4477 22.5508 21C22.5508 21.5523 22.1031 22 21.5508 22H3.55078C2.9985 22 2.55078 21.5523 2.55078 21Z',
  d7: 'M9.2138 12.25H15.8878H15.8878C16.6403 12.25 17.26 12.25 17.7544 12.2986C18.2646 12.3487 18.739 12.4575 19.1518 12.743C19.5956 13.05 19.9398 13.48 20.1409 13.9805C20.3283 14.4471 20.3267 14.9332 20.2593 15.4388C20.194 15.9281 20.0524 16.5271 19.8809 17.2527L19.8809 17.2527L19.8646 17.3214C19.6943 18.0421 19.5559 18.6275 19.4029 19.0976C19.2441 19.5851 19.0535 20.003 18.7509 20.3711C18.4043 20.7929 17.9697 21.1343 17.4775 21.3721C17.0484 21.5794 16.5964 21.6678 16.0828 21.7096C15.587 21.75 14.9812 21.75 14.2342 21.75H10.8674C10.1204 21.75 9.51458 21.75 9.01878 21.7096C8.50518 21.6678 8.05319 21.5794 7.62412 21.3721C7.13192 21.1343 6.69729 20.7929 6.3507 20.3711C6.04814 20.003 5.85749 19.5851 5.69877 19.0976C5.54574 18.6275 5.40737 18.0421 5.23702 17.3215L5.23702 17.3215L5.22075 17.2527C5.0492 16.527 4.90761 15.9281 4.84237 15.4388C4.77496 14.9332 4.77333 14.4471 4.96075 13.9805C5.16177 13.48 5.506 13.05 5.94983 12.743C6.36259 12.4575 6.83702 12.3487 7.34719 12.2986C7.84167 12.25 8.46136 12.25 9.21378 12.25H9.2138ZM11.5508 15.25C11.1366 15.25 10.8008 15.5858 10.8008 16C10.8008 16.4142 11.1366 16.75 11.5508 16.75H13.5508C13.965 16.75 14.3008 16.4142 14.3008 16C14.3008 15.5858 13.965 15.25 13.5508 15.25H11.5508Z',
  d8: 'M15.9328 11.4248C14.3653 9.14427 10.7187 9.23709 9.16285 11.4335C8.92342 11.7715 8.45532 11.8514 8.11732 11.612C7.77931 11.3726 7.6994 10.9045 7.93883 10.5665C10.0599 7.5722 14.9739 7.38166 17.1689 10.5752C17.4035 10.9165 17.317 11.3835 16.9757 11.6181C16.6343 11.8527 16.1674 11.7662 15.9328 11.4248Z',
  d9: 'M12.5508 3.75C11.8605 3.75 11.3008 4.30964 11.3008 5C11.3008 5.69036 11.8605 6.25 12.5508 6.25C13.2412 6.25 13.8008 5.69036 13.8008 5C13.8008 4.30964 13.2412 3.75 12.5508 3.75ZM9.80084 5C9.80084 3.48122 11.0321 2.25 12.5508 2.25C14.0696 2.25 15.3008 3.48122 15.3008 5C15.3008 6.51878 14.0696 7.75 12.5508 7.75C11.0321 7.75 9.80084 6.51878 9.80084 5Z',
  d10: 'M2.27539 21C2.27539 20.4477 2.72311 20 3.27539 20H21.2754C21.8277 20 22.2754 20.4477 22.2754 21C22.2754 21.5523 21.8277 22 21.2754 22H3.27539C2.72311 22 2.27539 21.5523 2.27539 21Z',
  d11: 'M8.93841 12.25H15.6124H15.6124C16.3649 12.25 16.9846 12.25 17.479 12.2986C17.9892 12.3487 18.4636 12.4575 18.8764 12.743C19.3202 13.05 19.6645 13.48 19.8655 13.9805C20.0529 14.4471 20.0513 14.9332 19.9839 15.4388C19.9186 15.9281 19.777 16.5271 19.6055 17.2527L19.6055 17.2527L19.5892 17.3214C19.4189 18.0421 19.2805 18.6275 19.1275 19.0976C18.9687 19.5851 18.7781 20.003 18.4755 20.3711C18.1289 20.7929 17.6943 21.1343 17.2021 21.3721C16.773 21.5794 16.321 21.6678 15.8074 21.7096C15.3116 21.75 14.7058 21.75 13.9588 21.75H10.592C9.84497 21.75 9.23919 21.75 8.74339 21.7096C8.22979 21.6678 7.7778 21.5794 7.34873 21.3721C6.85653 21.1343 6.4219 20.7929 6.07531 20.3711C5.77275 20.003 5.5821 19.5851 5.42338 19.0976C5.27035 18.6275 5.13197 18.0421 4.96163 17.3215L4.96163 17.3215L4.94536 17.2527C4.77381 16.527 4.63222 15.9281 4.56698 15.4388C4.49957 14.9332 4.49794 14.4471 4.68536 13.9805C4.88638 13.48 5.23061 13.05 5.67444 12.743C6.0872 12.4575 6.56163 12.3487 7.0718 12.2986C7.56627 12.25 8.18597 12.25 8.93839 12.25H8.93841ZM11.2754 15.25C10.8612 15.25 10.5254 15.5858 10.5254 16C10.5254 16.4142 10.8612 16.75 11.2754 16.75H13.2754C13.6896 16.75 14.0254 16.4142 14.0254 16C14.0254 15.5858 13.6896 15.25 13.2754 15.25H11.2754Z',
  d12: 'M15.6574 11.4248C14.0899 9.14427 10.4433 9.23709 8.88746 11.4335C8.64803 11.7715 8.17993 11.8514 7.84193 11.612C7.50392 11.3726 7.42401 10.9045 7.66344 10.5665C9.78448 7.5722 14.6985 7.38166 16.8935 10.5752C17.1282 10.9165 17.0416 11.3835 16.7003 11.6181C16.3589 11.8527 15.892 11.7662 15.6574 11.4248Z',
  d13: 'M12.2755 3.75C11.5851 3.75 11.0255 4.30964 11.0255 5C11.0255 5.69036 11.5851 6.25 12.2755 6.25C12.9658 6.25 13.5255 5.69036 13.5255 5C13.5255 4.30964 12.9658 3.75 12.2755 3.75ZM9.52545 5C9.52545 3.48122 10.7567 2.25 12.2755 2.25C13.7942 2.25 15.0255 3.48122 15.0255 5C15.0255 6.51878 13.7942 7.75 12.2755 7.75C10.7567 7.75 9.52545 6.51878 9.52545 5Z',
  d14: 'M19 13.5H5L6 21H18L19 13.5Z',
  d15: 'M10.5 16.5H13.5',
  d16: 'M16 13.5C16 11.2909 14.2091 9.5 12 9.5C9.79086 9.5 8 11.2909 8 13.5',
  d17: 'M21 21.75H3V19.75H21V21.75Z',
  d18: 'M5 12.75C4.78381 12.75 4.57813 12.8433 4.43572 13.006C4.2933 13.1686 4.22801 13.3848 4.25658 13.5991L5.25658 21.0991C5.30626 21.4717 5.6241 21.75 6 21.75H18C18.3759 21.75 18.6937 21.4717 18.7434 21.0991L19.7434 13.5991C19.772 13.3848 19.7067 13.1686 19.5643 13.006C19.4219 12.8433 19.2162 12.75 19 12.75H5ZM10.5 17.25H13.5V15.75H10.5V17.25Z',
  d19: 'M9.25011 5C9.25011 3.48122 10.4813 2.25 12.0001 2.25C13.5189 2.25 14.7501 3.48122 14.7501 5C14.7501 6.51878 13.5189 7.75 12.0001 7.75C10.4813 7.75 9.25011 6.51878 9.25011 5Z',
  d20: 'M12.0001 8.75C13.909 8.75 15.5548 9.87598 16.3098 11.5H7.69043C8.44537 9.87598 10.0912 8.75 12.0001 8.75Z',
};

export const IconPresentationOnlineStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-stroke-rounded IconPresentationOnlineStrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-duotone-rounded IconPresentationOnlineDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-twotone-rounded IconPresentationOnlineTwotoneRounded"
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
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-solid-rounded IconPresentationOnlineSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-bulk-rounded IconPresentationOnlineBulkRounded"
    >
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
      <g 
        opacity="var(--icon-opacity)">
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
      </g>
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-stroke-sharp IconPresentationOnlineStrokeSharp"
    >
      <path 
        d={d.d14} 
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
        d={d.d15} 
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
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPresentationOnlineSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="presentation-online-solid-sharp IconPresentationOnlineSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPresentationOnline: TheIconSelfPack = {
  name: 'PresentationOnline',
  StrokeRounded: IconPresentationOnlineStrokeRounded,
  DuotoneRounded: IconPresentationOnlineDuotoneRounded,
  TwotoneRounded: IconPresentationOnlineTwotoneRounded,
  SolidRounded: IconPresentationOnlineSolidRounded,
  BulkRounded: IconPresentationOnlineBulkRounded,
  StrokeSharp: IconPresentationOnlineStrokeSharp,
  SolidSharp: IconPresentationOnlineSolidSharp,
};