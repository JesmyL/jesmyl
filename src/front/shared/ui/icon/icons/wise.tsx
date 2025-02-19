import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.9999 22L19 2H7.00002L9.49994 6.5L4.99994 11H11.9999',
  d2: 'M7.00002 2H19L15.4 11H4.99994L9.49994 6.5L7.00002 2Z',
  d3: 'M7.00002 2L9.49994 6.5L4.99994 11H11.9999',
  d4: 'M7.00011 1C6.6458 1 6.31793 1.18749 6.13825 1.49287C5.95856 1.79824 5.95388 2.1759 6.12595 2.48563L8.25956 6.32626L4.29292 10.2929C4.00692 10.5789 3.92137 11.009 4.07615 11.3827C4.23093 11.7564 4.59557 12 5.00003 12H13.923L10.0716 21.6286C9.86644 22.1414 10.1159 22.7234 10.6286 22.9285C11.1414 23.1336 11.7234 22.8842 11.9285 22.3714L19.9286 2.37139C20.0518 2.0633 20.0142 1.71415 19.8282 1.43937C19.6422 1.1646 19.3319 1 19.0001 1H7.00011Z',
  d5: 'M15.7716 10.0718C16.2844 10.2769 16.5338 10.8589 16.3287 11.3717L11.9286 22.3717C11.7235 22.8844 11.1415 23.1339 10.6287 22.9287C10.116 22.7236 9.86655 22.1417 10.0717 21.6289L14.4717 10.6289C14.6768 10.1161 15.2588 9.86668 15.7716 10.0718Z',
  d6: 'M7.00011 1C6.6458 1 6.31793 1.18749 6.13825 1.49287C5.95856 1.79824 5.95388 2.1759 6.12595 2.48563L8.25956 6.32626L4.29292 10.2929C4.00692 10.5789 3.92137 11.009 4.07615 11.3827C4.23093 11.7564 4.59557 12 5.00003 12H16.0771L19.9286 2.37139C20.0518 2.0633 20.0142 1.71415 19.8282 1.43937C19.6422 1.1646 19.3319 1 19.0001 1H7.00011Z',
  d7: 'M12.524 10.9731L5.01117 11.0308C5.00223 11.0309 4.99772 11.02 5.00407 11.0137L9.53406 6.50536L7.04273 2.0139C7.03903 2.00723 7.04383 1.99902 7.05144 1.99902L18.9889 1.99911C18.996 1.99911 19.0008 2.00626 18.9982 2.01284L11.0308 22.001',
  d8: 'M6.13806 1.99287C6.31775 1.68749 6.64561 1.5 6.99993 1.5H18.9999C19.3318 1.5 19.642 1.6646 19.828 1.93937C20.014 2.21415 20.0516 2.5633 19.9284 2.87139L11.9283 22.5L10.0714 21.7572L13.9229 12.5H4.99985C4.59538 12.5 4.23075 12.2564 4.07597 11.8827C3.92119 11.509 4.00674 11.0789 4.29274 10.7929L8.25938 6.82626L6.12577 2.98563C5.9537 2.6759 5.95838 2.29824 6.13806 1.99287Z',
};

export const IconWiseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-stroke-rounded IconWiseStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWiseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-duotone-rounded IconWiseDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWiseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-twotone-rounded IconWiseTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWiseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-solid-rounded IconWiseSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWiseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-bulk-rounded IconWiseBulkRounded"
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

export const IconWiseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-stroke-sharp IconWiseStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconWiseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="wise-solid-sharp IconWiseSolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWise: TheIconSelfPack = {
  name: 'Wise',
  StrokeRounded: IconWiseStrokeRounded,
  DuotoneRounded: IconWiseDuotoneRounded,
  TwotoneRounded: IconWiseTwotoneRounded,
  SolidRounded: IconWiseSolidRounded,
  BulkRounded: IconWiseBulkRounded,
  StrokeSharp: IconWiseStrokeSharp,
  SolidSharp: IconWiseSolidSharp,
};