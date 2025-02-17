import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 22C12.2443 22 12.4714 21.8869 12.9256 21.6608L16.5766 19.8432C18.1922 19.039 19 18.6368 19 18V10M12 22C11.7557 22 11.5286 21.8869 11.0744 21.6608L7.42337 19.8432C5.80779 19.039 5 18.6368 5 18V10M12 22V14M19 10C19 9.36317 18.1922 8.96103 16.5766 8.15675L12.9256 6.33919C12.4714 6.11306 12.2443 6 12 6C11.7557 6 11.5286 6.11306 11.0744 6.33919L7.42337 8.15675C5.80779 8.96103 5 9.36317 5 10M19 10C19 10.6368 18.1922 11.039 16.5766 11.8432L12.9256 13.6608C12.4714 13.8869 12.2443 14 12 14M5 10C5 10.6368 5.80779 11.039 7.42337 11.8432L11.0744 13.6608C11.5286 13.8869 11.7557 14 12 14',
  d2: 'M22 21L19 18.5',
  d3: 'M12 2V6',
  d4: 'M2 21L5 18.5',
  d5: 'M12.9256 21.6608L16.5766 19.8432C18.1922 19.039 19 18.6368 19 18V10C19 9.36318 18.1922 8.96104 16.5766 8.15676L16.5766 8.15675L12.9256 6.33919L12.9256 6.33919C12.4714 6.11306 12.2443 6 12 6C11.7557 6 11.5286 6.11306 11.0744 6.33919L7.42337 8.15675L7.42336 8.15676C5.80779 8.96104 5 9.36317 5 10C5 10.6368 5.80779 11.039 7.42337 11.8432L11.0744 13.6608C11.5286 13.8869 11.7557 14 12 14V22C12.2443 22 12.4714 21.8869 12.9256 21.6608Z',
  d6: 'M19.75 18V10C19.75 9.29659 19.2768 8.84122 18.8222 8.52528C18.3729 8.21311 17.7266 7.8914 16.9652 7.51241L13.1716 5.62362C12.8103 5.44228 12.4271 5.25 12 5.25C11.5729 5.25 11.1897 5.44228 10.8284 5.62362L7.03478 7.5124C6.27339 7.89139 5.62707 8.21311 5.17785 8.52528C4.72321 8.84122 4.25 9.29659 4.25 10V18C4.25 18.7034 4.72321 19.1588 5.17785 19.4747C5.62708 19.7869 6.2734 20.1086 7.03478 20.4876L10.8284 22.3764C11.1897 22.5577 11.5729 22.75 12 22.75C12.4271 22.75 12.8103 22.5577 13.1717 22.3764L16.9652 20.4876C17.7266 20.1086 18.3729 19.7869 18.8222 19.4747C19.2768 19.1588 19.75 18.7034 19.75 18ZM11.25 14.5767V20.9109L7.75761 19.1723C6.92701 18.7588 6.38175 18.4851 6.03384 18.2434C5.86539 18.1263 5.75 17.9906 5.75 17.9906V11.8262C6.11852 12.032 6.60803 12.2756 7.08912 12.5151L10.8284 14.3768C10.9654 14.4456 11.1055 14.5159 11.25 14.5767ZM16.9652 12.488C17.4463 12.2486 17.8815 12.032 18.25 11.8262L18.2405 18.0049C18.2405 18.0049 18.1346 18.1263 17.9662 18.2434C17.6183 18.4851 17.073 18.7588 16.2424 19.1723L12.75 20.9109V14.5767C12.8945 14.5159 13.1229 14.4014 13.2599 14.3326L16.9652 12.488Z',
  d7: 'M18.4239 18.0199C18.689 17.7017 19.1619 17.6587 19.4802 17.9239L22.4802 20.4239C22.7984 20.689 22.8414 21.1619 22.5762 21.4802C22.311 21.7984 21.8381 21.8414 21.5199 21.5762L18.5199 19.0762C18.2017 18.811 18.1587 18.3381 18.4239 18.0199Z',
  d8: 'M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V6C12.75 6.41421 12.4142 6.75 12 6.75C11.5858 6.75 11.25 6.41421 11.25 6V2C11.25 1.58579 11.5858 1.25 12 1.25Z',
  d9: 'M5.57618 18.0199C5.84136 18.3381 5.79836 18.811 5.48016 19.0762L2.48016 21.5762C2.16195 21.8414 1.68903 21.7984 1.42385 21.4802C1.15868 21.1619 1.20167 20.689 1.51988 20.4239L4.51988 17.9239C4.83809 17.6587 5.31101 17.7017 5.57618 18.0199Z',
  d10: 'M12 14L18.7099 10.1658M12 14L5.31622 10.1807M12 14V21.6101M12 6L19 10V18L12 22L5 18V10L12 6Z',
  d11: 'M12.4801 5.0031C12.1823 4.8323 11.8167 4.8323 11.5189 5.0031L4.73763 8.89199C4.43579 9.06508 4.24951 9.38722 4.24951 9.73611V17.5139C4.24951 17.8628 4.43579 18.1849 4.73763 18.358L11.5189 22.2469C11.8167 22.4177 12.1823 22.4177 12.4801 22.2469L19.2614 18.358C19.5632 18.1849 19.7495 17.8628 19.7495 17.5139V9.73611C19.7495 9.38722 19.5632 9.06508 19.2614 8.89199L12.4801 5.0031ZM11.0308 14.1889L6.18701 11.4111V16.9494L11.0308 19.7272V14.1889ZM17.812 16.9494L12.9683 19.7272V14.1889L17.812 11.4111V16.9494Z',
  d12: 'M19.6402 17.3568L22.6402 19.8568L21.3599 21.3932L18.3599 18.8932L19.6402 17.3568Z',
  d13: 'M11 5.625V1.625H13V5.625H11Z',
  d14: 'M5.64023 18.8932L2.64023 21.3932L1.35986 19.8568L4.35986 17.3568L5.64023 18.8932Z',
};

export const IconBlockchain02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-stroke-rounded IconBlockchain02StrokeRounded"
    >
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockchain02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-duotone-rounded IconBlockchain02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockchain02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-twotone-rounded IconBlockchain02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockchain02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-solid-rounded IconBlockchain02SolidRounded"
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

export const IconBlockchain02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-bulk-rounded IconBlockchain02BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBlockchain02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-stroke-sharp IconBlockchain02StrokeSharp"
    >
      <path 
        d={d.d10} 
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
        d={d.d3} 
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
    </TheIconWrapper>
  );
};

export const IconBlockchain02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="blockchain-02-solid-sharp IconBlockchain02SolidSharp"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBlockchain02: TheIconSelfPack = {
  name: 'Blockchain02',
  StrokeRounded: IconBlockchain02StrokeRounded,
  DuotoneRounded: IconBlockchain02DuotoneRounded,
  TwotoneRounded: IconBlockchain02TwotoneRounded,
  SolidRounded: IconBlockchain02SolidRounded,
  BulkRounded: IconBlockchain02BulkRounded,
  StrokeSharp: IconBlockchain02StrokeSharp,
  SolidSharp: IconBlockchain02SolidSharp,
};