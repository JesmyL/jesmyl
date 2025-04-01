import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.874 12C17.5826 13.037 18 14.3093 18 15.6842C18 16.5017 17.8524 17.2829 17.5838 18M7.12605 12C6.41738 13.037 6 14.3093 6 15.6842C6 19.1723 8.68629 22 12 22C14.5371 22 16.7064 20.3424 17.5838 18M17.5838 18C14.8509 16.8 12.0559 14.8333 11 14',
  d2: 'M12.0002 2C11.0061 2 10.2002 2.7835 10.2002 3.75C10.2002 4.7165 11.0061 5.5 12.0002 5.5C12.4612 5.5 12.8817 5.3315 13.2002 5.0544',
  d3: 'M10 8H10.0081M14 8H14.0081',
  d4: 'M7.52779 12H7.12605C6.41738 13.037 6 14.3093 6 15.6842C6 19.1723 8.68629 22 12 22C14.5371 22 16.7064 20.3424 17.5838 18C17.8524 17.2829 18 16.5017 18 15.6842C18 14.3093 17.5826 13.037 16.874 12H16.4722C15.3736 13.2275 13.777 14 12 14C10.223 14 8.62643 13.2275 7.52779 12Z',
  d5: 'M9.30582 4.0036C8.02465 4.87025 7.18248 6.33678 7.18248 8C7.18248 10.6628 9.3411 12.8214 12.0039 12.8214C14.6667 12.8214 16.8253 10.6628 16.8253 8C16.8253 5.3372 14.6667 3.17857 12.0039 3.17857C11.5521 3.17857 11.2325 3.5278 11.2325 3.90179C11.2325 4.27578 11.5521 4.625 12.0039 4.625C12.2101 4.625 12.3921 4.55043 12.528 4.43216C12.9298 4.08256 13.5389 4.12485 13.8885 4.5266C14.2381 4.92836 14.1958 5.53744 13.794 5.88704C13.3158 6.30318 12.6868 6.55357 12.0039 6.55357C10.5721 6.55357 9.36055 5.44435 9.30582 4.0036ZM12.0039 1.25C8.27598 1.25 5.25391 4.27208 5.25391 8C5.25391 11.7279 8.27598 14.75 12.0039 14.75C15.7318 14.75 18.7539 11.7279 18.7539 8C18.7539 4.27208 15.7318 1.25 12.0039 1.25Z',
  d6: 'M9.25 8C9.25 7.58579 9.58579 7.25 10 7.25H10.0081C10.4223 7.25 10.7581 7.58579 10.7581 8C10.7581 8.41421 10.4223 8.75 10.0081 8.75H10C9.58579 8.75 9.25 8.41421 9.25 8ZM13.25 8C13.25 7.58579 13.5858 7.25 14 7.25H14.0081C14.4223 7.25 14.7581 7.58579 14.7581 8C14.7581 8.41421 14.4223 8.75 14.0081 8.75H14C13.5858 8.75 13.25 8.41421 13.25 8Z',
  d7: 'M10.0727 12.8257C9.25675 12.5831 8.42799 12.1442 7.62034 11.4364L6.98413 10.8789L6.50683 11.5773C5.71422 12.7371 5.25 14.1565 5.25 15.6847C5.25 19.5503 8.23629 22.7505 12 22.7505C14.6194 22.7505 16.868 21.1942 17.9876 18.9496C16.4713 18.291 14.8272 17.3477 13.3318 16.1767C12.1109 15.2207 10.966 14.0946 10.0727 12.8257ZM18.5141 17.5427C18.668 16.9498 18.75 16.3267 18.75 15.6847C18.75 14.1565 18.2858 12.7371 17.4932 11.5773L17.0321 10.9027L16.3994 11.4197C15.6479 12.0339 14.2774 12.7904 12.6789 13.0093C12.5127 13.032 12.3441 13.049 12.1733 13.0594C12.7918 13.7533 13.4985 14.4021 14.2566 14.9957C15.6278 16.0694 17.1339 16.9362 18.5141 17.5427Z',
  d8: 'M6.39161 11.7515C5.66942 12.8779 5.25 14.2323 5.25 15.6848C5.25 19.5504 8.23629 22.7506 12 22.7506C14.6194 22.7506 16.868 21.1943 17.9876 18.9497C16.4713 18.2911 14.8272 17.3478 13.3318 16.1768C12.767 15.7345 12.2184 15.2559 11.7035 14.7435C9.48843 14.6465 7.5505 13.4819 6.39161 11.7515Z',
  d9: 'M13.694 14.5368C13.8779 14.6932 14.0656 14.8463 14.2566 14.9958C15.6278 16.0695 17.1339 16.9363 18.5141 17.5428C18.668 16.9499 18.75 16.3268 18.75 15.6848C18.75 14.2349 18.3321 12.8829 17.6123 11.7576C16.7033 13.1117 15.3168 14.1185 13.694 14.5368Z',
  d10: 'M10.0727 12.8252C9.25675 12.5826 8.42799 12.1437 7.62034 11.4359L6.98413 10.8784L6.50683 11.5768C5.71422 12.7366 5.25 14.1561 5.25 15.6842C5.25 19.5498 8.23629 22.75 12 22.75C14.6194 22.75 16.868 21.1937 17.9876 18.9491C16.4713 18.2905 14.8272 17.3472 13.3318 16.1762C12.1109 15.2202 10.966 14.0942 10.0727 12.8252ZM18.5141 17.5422C18.668 16.9493 18.75 16.3262 18.75 15.6842C18.75 14.1561 18.2858 12.7366 17.4932 11.5768L17.0321 10.9022L16.3994 11.4193C15.6479 12.0334 14.2774 12.79 12.6789 13.0088C12.5127 13.0315 12.3441 13.0485 12.1733 13.0589C12.7918 13.7528 13.4985 14.4016 14.2566 14.9952C15.6278 16.0689 17.1339 16.9357 18.5141 17.5422Z',
  d11: 'M9.30192 4.0036C8.02074 4.87025 7.17857 6.33678 7.17857 8C7.17857 10.6628 9.3372 12.8214 12 12.8214C14.6628 12.8214 16.8214 10.6628 16.8214 8C16.8214 5.3372 14.6628 3.17857 12 3.17857C11.5482 3.17857 11.2286 3.5278 11.2286 3.90179C11.2286 4.27578 11.5482 4.625 12 4.625C12.2062 4.625 12.3882 4.55043 12.5241 4.43216L13.7901 5.88704C13.3119 6.30318 12.6829 6.55357 12 6.55357C10.5682 6.55357 9.35664 5.44435 9.30192 4.0036ZM12 1.25C8.27208 1.25 5.25 4.27208 5.25 8C5.25 11.7279 8.27208 14.75 12 14.75C15.7279 14.75 18.75 11.7279 18.75 8C18.75 4.27208 15.7279 1.25 12 1.25Z',
  d12: 'M9.25 7.25H10.7581V8.75H9.25V7.25ZM13.25 7.25H14.7581V8.75H13.25V7.25Z',
};

export const IconBaby02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-stroke-rounded IconBaby02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconBaby02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-duotone-rounded IconBaby02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconBaby02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-twotone-rounded IconBaby02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconBaby02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-solid-rounded IconBaby02SolidRounded"
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

export const IconBaby02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-bulk-rounded IconBaby02BulkRounded"
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
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconBaby02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-stroke-sharp IconBaby02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="8" 
        r="6" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconBaby02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="baby-02-solid-sharp IconBaby02SolidSharp"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBaby02: TheIconSelfPack = {
  name: 'Baby02',
  StrokeRounded: IconBaby02StrokeRounded,
  DuotoneRounded: IconBaby02DuotoneRounded,
  TwotoneRounded: IconBaby02TwotoneRounded,
  SolidRounded: IconBaby02SolidRounded,
  BulkRounded: IconBaby02BulkRounded,
  StrokeSharp: IconBaby02StrokeSharp,
  SolidSharp: IconBaby02SolidSharp,
};