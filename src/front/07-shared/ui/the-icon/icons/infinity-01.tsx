import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 12C12 12 9.26142 17 6.5 17C3.73858 17 2 14.7614 2 12C2 9.23858 3.73858 7 6.5 7C9.26142 7 12 12 12 12ZM12 12C12 12 14.7386 17 17.5 17C20.2614 17 22 14.7614 22 12C22 9.23858 20.2614 7 17.5 7C14.7386 7 12 12 12 12Z',
  d2: 'M12 12C12 12 9.26142 17 6.5 17C3.73858 17 2 14.7614 2 12C2 9.23858 3.73858 7 6.5 7C9.26142 7 12 12 12 12Z',
  d3: 'M12 12C12 12 14.7386 17 17.5 17C20.2614 17 22 14.7614 22 12C22 9.23858 20.2614 7 17.5 7C14.7386 7 12 12 12 12Z',
  d4: 'M2 12C2 9.23858 3.73858 7 6.5 7C9.26142 7 12 12 12 12C12 12 14.7386 17 17.5 17C20.2614 17 22 14.7614 22 12',
  d5: 'M6.5 8C4.42522 8 3 9.64616 3 12C3 14.3538 4.42522 16 6.5 16C6.89277 16 7.37581 15.8172 7.9365 15.4098C8.48745 15.0094 9.02767 14.4541 9.51373 13.8641C9.99579 13.279 10.4009 12.6889 10.6866 12.2423C10.7422 12.1554 10.7931 12.0742 10.8389 12C10.7931 11.9258 10.7422 11.8446 10.6866 11.7577C10.4009 11.3111 9.99579 10.721 9.51373 10.1359C9.02767 9.54588 8.48745 8.99058 7.9365 8.59022C7.37581 8.18279 6.89277 8 6.5 8ZM13.1611 12C13.2069 12.0742 13.2578 12.1554 13.3134 12.2423C13.5991 12.6889 14.0042 13.279 14.4863 13.8641C14.9723 14.4541 15.5125 15.0094 16.0635 15.4098C16.6242 15.8172 17.1072 16 17.5 16C19.5748 16 21 14.3538 21 12C21 9.64616 19.5748 8 17.5 8C17.1072 8 16.6242 8.18279 16.0635 8.59022C15.5125 8.99058 14.9723 9.54588 14.4863 10.1359C14.0042 10.721 13.5991 11.3111 13.3134 11.7577C13.2578 11.8446 13.2069 11.9258 13.1611 12ZM12 13.88C11.7349 14.2656 11.4167 14.6996 11.0573 15.1359C10.5136 15.7959 9.85138 16.4906 9.1122 17.0277C8.38275 17.5578 7.48794 18 6.5 18C3.05193 18 1 15.169 1 12C1 8.83099 3.05193 6 6.5 6C7.48794 6 8.38275 6.44221 9.1122 6.97228C9.85138 7.50942 10.5136 8.20412 11.0573 8.86414C11.4167 9.30035 11.7349 9.73442 12 10.12C12.2651 9.73442 12.5833 9.30035 12.9427 8.86414C13.4864 8.20412 14.1486 7.50942 14.8878 6.97228C15.6172 6.44221 16.5121 6 17.5 6C20.9481 6 23 8.83099 23 12C23 15.169 20.9481 18 17.5 18C16.5121 18 15.6172 17.5578 14.8878 17.0277C14.1486 16.4906 13.4864 15.7959 12.9427 15.1359C12.5833 14.6996 12.2651 14.2656 12 13.88Z',
  d6: 'M3.09301 12.9948C3.43774 14.8047 4.73405 16 6.50202 16C6.89479 16 7.37783 15.8172 7.93852 15.4098C8.48947 15.0094 9.02969 14.4541 9.51575 13.8641C9.99781 13.279 10.4029 12.6889 10.6886 12.2423C10.7442 12.1554 10.7951 12.0742 10.8409 12L12.002 10.12C12.2671 9.73442 12.5853 9.30035 12.9447 8.86414C13.4884 8.20412 14.1506 7.50942 14.8898 6.97228C15.6193 6.44221 16.5141 6 17.502 6C20.5832 6 22.5495 8.26058 22.9331 11.0029C23.0096 11.5498 22.5543 12 22.002 12C21.4497 12 21.0144 11.5478 20.911 11.0052C20.5663 9.1953 19.27 8 17.502 8C17.1092 8 16.6262 8.18279 16.0655 8.59022C15.5146 8.99058 14.9743 9.54588 14.4883 10.1359C14.0062 10.721 13.6011 11.3111 13.3154 11.7577C13.2598 11.8446 13.2089 11.9258 13.1631 12L12.002 13.88C11.7369 14.2656 11.4187 14.6996 11.0594 15.1359C10.5156 15.7959 9.8534 16.4906 9.11422 17.0277C8.38477 17.5578 7.48996 18 6.50202 18C3.42084 18 1.4545 15.7394 1.07092 12.9971C0.994419 12.4502 1.44973 12 2.00202 12C2.5543 12 2.98967 12.4522 3.09301 12.9948Z',
};

export const IconInfinity01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-stroke-rounded IconInfinity01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-duotone-rounded IconInfinity01DuotoneRounded"
    >
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-twotone-rounded IconInfinity01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-solid-rounded IconInfinity01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-bulk-rounded IconInfinity01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-stroke-sharp IconInfinity01StrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconInfinity01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="infinity-01-solid-sharp IconInfinity01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfInfinity01: TheIconSelfPack = {
  name: 'Infinity01',
  StrokeRounded: IconInfinity01StrokeRounded,
  DuotoneRounded: IconInfinity01DuotoneRounded,
  TwotoneRounded: IconInfinity01TwotoneRounded,
  SolidRounded: IconInfinity01SolidRounded,
  BulkRounded: IconInfinity01BulkRounded,
  StrokeSharp: IconInfinity01StrokeSharp,
  SolidSharp: IconInfinity01SolidSharp,
};