import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z',
  d2: 'M21 15H3',
  d3: 'M21 9H3',
  d4: 'M7.24926 12.0005C7.24926 12.7785 7.29421 13.5292 7.37472 14.25H1.48584C1.33131 13.5244 1.25 12.7717 1.25 12C1.25 11.2283 1.33131 10.4756 1.48584 9.75H7.37484C7.29425 10.4711 7.24926 11.2222 7.24926 12.0005ZM7.5989 8.25H1.92217C3.22621 4.7469 6.30452 2.10734 10.0647 1.42374C9.89594 1.76674 9.7199 2.13864 9.5418 2.51487L9.54158 2.51535L9.54151 2.5155L9.54147 2.51558C9.46858 2.66957 9.39534 2.8243 9.32212 2.97806C8.65698 4.37486 7.99021 6.15965 7.5989 8.25ZM9.12706 8.25H14.8715C14.5031 6.42901 13.9133 4.86448 13.3221 3.62296C13.2333 3.43639 13.1445 3.24779 13.0565 3.06088L13.0564 3.06085L13.0564 3.06081C12.7325 2.37283 12.4193 1.70775 12.155 1.25109C12.1034 1.25037 12.0517 1.25 12 1.25C11.9478 1.25 11.8956 1.25037 11.8436 1.25112C11.5792 1.70778 11.2661 2.37287 10.9421 3.06087C10.8541 3.24778 10.7653 3.43638 10.6764 3.62296C10.0852 4.86448 9.49547 6.42901 9.12706 8.25ZM15.1136 9.75H8.88495C8.79815 10.4689 8.74926 11.2202 8.74926 12.0005C8.74926 12.7805 8.79811 13.5314 8.88483 14.25H15.1137C15.2004 13.5314 15.2493 12.7805 15.2493 12.0005C15.2493 11.2202 15.2004 10.4689 15.1136 9.75ZM16.3996 8.25C16.0083 6.15965 15.3416 4.37486 14.6764 2.97806C14.6032 2.8243 14.53 2.66957 14.4571 2.51558L14.457 2.5155L14.4569 2.51534L14.4569 2.51516C14.2787 2.13872 14.1025 1.76661 13.9337 1.42345C17.6946 2.10658 20.7736 4.7464 22.0778 8.25H16.3996ZM22.5142 9.75H16.6237C16.7043 10.4711 16.7493 11.2222 16.7493 12.0005C16.7493 12.7785 16.7043 13.5292 16.6238 14.25H22.5142C22.6687 13.5244 22.75 12.7717 22.75 12C22.75 11.2283 22.6687 10.4756 22.5142 9.75ZM9.12686 15.75H14.8717C14.5033 17.5714 13.9134 19.1363 13.3221 20.3781C13.2342 20.5626 13.1464 20.7492 13.0593 20.9341C12.7343 21.624 12.4201 22.2911 12.155 22.7489C12.1034 22.7496 12.0517 22.75 12 22.75C11.9478 22.75 11.8956 22.7496 11.8435 22.7489C11.5785 22.2911 11.2642 21.6239 10.9393 20.934C10.8522 20.7492 10.7643 20.5626 10.6764 20.3781C10.0851 19.1363 9.49525 17.5714 9.12686 15.75ZM16.3998 15.75H22.0778C20.7736 19.2535 17.6947 21.8933 13.934 22.5765C14.1039 22.2313 14.2812 21.8567 14.4606 21.4779C14.5323 21.3264 14.6044 21.1742 14.6764 21.023C15.3417 19.6259 16.0085 17.8408 16.3998 15.75ZM1.92217 15.75H7.59871C7.99 17.8408 8.65687 19.6259 9.32212 21.023C9.39416 21.1742 9.46622 21.3264 9.53795 21.4779L9.53799 21.478L9.53806 21.4782C9.71733 21.8568 9.89456 22.2311 10.0644 22.5762C6.30437 21.8925 3.22618 19.253 1.92217 15.75Z',
  d5: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d6: 'M7.25 12.0004C7.25 15.7396 8.28839 18.8505 9.32285 21.0228C9.3948 21.1739 9.46676 21.3259 9.53839 21.4772C9.7177 21.8559 9.89525 22.2309 10.0651 22.576C10.6433 22.6812 11.2377 22.7401 11.8443 22.7488C11.5792 22.2909 11.265 21.6238 10.94 20.9339C10.8529 20.7491 10.765 20.5625 10.6771 20.3779C9.71161 18.3503 8.75 15.4612 8.75 12.0004C8.75 8.53959 9.71161 5.65046 10.6771 3.62284C10.766 3.43627 10.8548 3.24767 10.9428 3.06075C11.2668 2.37276 11.58 1.70767 11.8443 1.25101C11.2378 1.25967 10.6436 1.31855 10.0654 1.42368C9.89656 1.76686 9.72042 2.13898 9.54222 2.51543C9.46933 2.66943 9.39608 2.82418 9.32285 2.97794C8.28839 5.15032 7.25 8.26119 7.25 12.0004Z',
  d7: 'M13.9344 1.42329C13.3563 1.31829 12.7621 1.25953 12.1557 1.25098C12.42 1.70764 12.7332 2.37274 13.0572 3.06075L13.0578 3.06196C13.1456 3.24848 13.2342 3.43667 13.3229 3.62284C14.2884 5.65046 15.25 8.53959 15.25 12.0004C15.25 15.4612 14.2884 18.3503 13.3229 20.3779C13.235 20.5625 13.1471 20.749 13.06 20.9339C12.735 21.6238 12.4208 22.291 12.1557 22.7488C12.7622 22.7402 13.3565 22.6815 13.9347 22.5764C14.1046 22.2312 14.2819 21.8567 14.4613 21.4778C14.533 21.3263 14.6051 21.1741 14.6771 21.0228C15.7116 18.8505 16.75 15.7396 16.75 12.0004C16.75 8.26119 15.7116 5.15032 14.6771 2.97794C14.604 2.82443 14.5309 2.66996 14.4581 2.51621C14.2799 2.13961 14.1033 1.76659 13.9344 1.42329Z',
  d8: 'M22.0783 8.25C22.2587 8.73445 22.4051 9.23541 22.5147 9.75H1.48633C1.59591 9.23541 1.74232 8.73445 1.92266 8.25H22.0783Z',
  d9: 'M22.5147 14.25C22.4051 14.7646 22.2587 15.2656 22.0783 15.75H1.92266C1.74232 15.2656 1.59591 14.7646 1.48633 14.25H22.5147Z',
};

export const IconGlobe02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-stroke-rounded IconGlobe02StrokeRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGlobe02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-duotone-rounded IconGlobe02DuotoneRounded"
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
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
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

export const IconGlobe02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-twotone-rounded IconGlobe02TwotoneRounded"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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

export const IconGlobe02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-solid-rounded IconGlobe02SolidRounded"
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

export const IconGlobe02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-bulk-rounded IconGlobe02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconGlobe02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-stroke-sharp IconGlobe02StrokeSharp"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconGlobe02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="globe-02-solid-sharp IconGlobe02SolidSharp"
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

export const iconPackOfGlobe02: TheIconSelfPack = {
  name: 'Globe02',
  StrokeRounded: IconGlobe02StrokeRounded,
  DuotoneRounded: IconGlobe02DuotoneRounded,
  TwotoneRounded: IconGlobe02TwotoneRounded,
  SolidRounded: IconGlobe02SolidRounded,
  BulkRounded: IconGlobe02BulkRounded,
  StrokeSharp: IconGlobe02StrokeSharp,
  SolidSharp: IconGlobe02SolidSharp,
};