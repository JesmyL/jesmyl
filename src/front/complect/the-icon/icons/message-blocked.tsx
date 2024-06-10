import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 19.6543C16.8738 20.3575 15.5698 20.7975 14.1706 20.8905C12.7435 20.9854 11.2536 20.9852 9.8294 20.8905C9.33896 20.8579 8.8044 20.7409 8.34401 20.5513C7.83177 20.3403 7.5756 20.2348 7.44544 20.2508C7.31527 20.2668 7.1264 20.4061 6.74868 20.6846C6.08268 21.1757 5.24367 21.5285 3.99943 21.4982C3.37026 21.4829 3.05568 21.4752 2.91484 21.2351C2.77401 20.995 2.94941 20.6626 3.30021 19.9978C3.78674 19.0758 4.09501 18.0203 3.62791 17.1746C2.82343 15.9666 2.1401 14.536 2.04024 12.9909C1.98659 12.1607 1.98659 11.3009 2.04024 10.4707C2.16123 8.5986 2.8777 6.84362 4 5.5',
  d2: 'M6.5 3.51873C7.5057 2.98397 8.63273 2.65062 9.8294 2.57107C11.2536 2.47641 12.7435 2.47621 14.1706 2.57107C18.3536 2.84913 21.6856 6.22838 21.9598 10.4707C22.0134 11.3009 22.0134 12.1607 21.9598 12.9909C21.8508 14.6771 21.2587 16.227 20.3221 17.5',
  d3: 'M2 3L22 23',
  d4: 'M14.1706 20.8905C12.7435 20.9854 11.2536 20.9852 9.8294 20.8905C9.33896 20.8579 8.8044 20.7409 8.34401 20.5513L8.34392 20.5512C7.83174 20.3403 7.5756 20.2348 7.44544 20.2508C7.31527 20.2668 7.1264 20.4061 6.74868 20.6846C6.08268 21.1757 5.24367 21.5285 3.99943 21.4982H3.99941C3.37025 21.4829 3.05567 21.4752 2.91484 21.2351C2.77401 20.995 2.94941 20.6626 3.30021 19.9978C3.78674 19.0758 4.09501 18.0203 3.62791 17.1746C2.82343 15.9666 2.1401 14.536 2.04024 12.9909C1.98659 12.1607 1.98659 11.3009 2.04024 10.4707C2.16123 8.5986 2.8777 6.84362 4 5.5L18 19.6543C16.8738 20.3575 15.5698 20.7975 14.1706 20.8905Z',
  d5: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d6: 'M9.77965 1.82273C11.2369 1.72586 12.7601 1.72566 14.2204 1.82273C18.787 2.12629 22.4103 5.81258 22.7082 10.4224C22.7639 11.2848 22.7639 12.1768 22.7082 13.0392C22.6155 14.4729 22.2013 15.8172 21.537 16.9982C21.3768 17.283 21.2967 17.4254 21.1491 17.4457C21.0015 17.466 20.8807 17.3451 20.6389 17.1034L6.8939 3.35837C6.62304 3.0875 6.4876 2.95206 6.52046 2.79353C6.55331 2.635 6.7233 2.56776 7.06327 2.43328C7.9131 2.09712 8.8258 1.88613 9.77965 1.82273Z',
  d7: 'M14.2204 21.6389C12.7601 21.7359 11.2369 21.7357 9.77965 21.6389C9.21472 21.6013 8.59978 21.4677 8.05839 21.2448C7.97233 21.2093 7.89626 21.178 7.82861 21.1505C7.69203 21.0948 7.62373 21.067 7.54604 21.0766C7.46835 21.0862 7.40859 21.1302 7.28907 21.2181L7.1938 21.2883C6.40136 21.8726 5.40092 22.2825 3.98117 22.248L3.93544 22.2469C3.66155 22.2403 3.36961 22.2334 3.13152 22.1873C2.84475 22.1318 2.48996 21.9931 2.26791 21.6145C2.02623 21.2025 2.12313 20.7858 2.21688 20.5234C2.30536 20.2757 2.45874 19.9852 2.61542 19.6885L2.6369 19.6478C3.10323 18.7641 3.23314 18.0419 2.98381 17.5604C2.15148 16.304 1.40272 14.7556 1.2918 13.0392C1.23607 12.1768 1.23607 11.2848 1.2918 10.4224C1.43677 8.17916 2.36917 6.15465 3.81453 4.63218C3.99677 4.44023 4.08788 4.34425 4.21443 4.34261C4.34097 4.34097 4.4388 4.4388 4.63448 4.63448L19.0308 19.0307C19.2482 19.2482 19.357 19.357 19.3467 19.4942C19.3365 19.6314 19.2182 19.7188 18.9817 19.8934C17.6309 20.8907 15.997 21.5208 14.2204 21.6389Z',
  d8: 'M14.2204 21.64C15.997 21.5219 17.6309 20.8918 18.9817 19.8945C19.2182 19.7199 19.3365 19.6326 19.3467 19.4954C19.357 19.3582 19.2482 19.2494 19.0308 19.0319L4.63448 4.63564C4.4388 4.43996 4.34097 4.34213 4.21443 4.34377C4.08788 4.34541 3.99677 4.44139 3.81453 4.63334C2.36917 6.15581 1.43677 8.18032 1.2918 10.4235C1.23607 11.2859 1.23607 12.178 1.2918 13.0404C1.40272 14.7568 2.15148 16.3052 2.98381 17.5616C3.23314 18.0431 3.10323 18.7653 2.6369 19.649L2.61542 19.6896C2.45874 19.9864 2.30536 20.2769 2.21688 20.5245C2.12313 20.787 2.02623 21.2036 2.26791 21.6157C2.48996 21.9943 2.84475 22.133 3.13152 22.1884C3.36961 22.2345 3.66155 22.2415 3.93544 22.248L3.98117 22.2491C5.40092 22.2837 6.40136 21.8738 7.1938 21.2894L7.28907 21.2192C7.40859 21.1313 7.46835 21.0874 7.54604 21.0778C7.62373 21.0681 7.69203 21.0959 7.82861 21.1516C7.89626 21.1792 7.97233 21.2105 8.05839 21.2459C8.59978 21.4689 9.21472 21.6025 9.77965 21.64C11.2369 21.7369 12.7601 21.7371 14.2204 21.64Z',
  d9: 'M14.2204 1.82273C12.7601 1.72566 11.2369 1.72586 9.77966 1.82273C8.82581 1.88613 7.91311 2.09712 7.06328 2.43328C6.72331 2.56776 6.55332 2.635 6.52047 2.79353C6.48761 2.95206 6.62304 3.0875 6.89391 3.35837L20.6389 17.1034C20.8807 17.3451 21.0015 17.466 21.1491 17.4457C21.2967 17.4254 21.3768 17.283 21.537 16.9982C22.2013 15.8172 22.6156 14.4729 22.7082 13.0392C22.7639 12.1768 22.7639 11.2848 22.7082 10.4224C22.4103 5.81258 18.787 2.12629 14.2204 1.82273Z',
  d10: 'M2 3L22 22.9943',
  d11: 'M4.74844 4.76912C2.75223 6.55817 2.00244 9.22476 2.00244 12.0689C2.00244 13.7728 2.34977 15.8587 3.6039 17.4975L2.0163 21.4734C2.01316 21.4812 2.02058 21.4892 2.02864 21.4866L6.58405 20.0255C8.08541 20.8555 9.78752 21.0382 11.6732 21.0382C14.7244 21.2517 17.1857 20.4389 18.9386 19.0009M6.02005 3.85186C7.41846 3.04662 9.24099 2.56098 11.576 2.51949C19.9134 2.13061 22.1032 7.3526 21.9963 12.3072C21.9963 14.4004 21.3216 16.3561 20.0573 17.8866',
  d12: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d13: 'M12.7893 1.75C13.4484 1.74999 13.8202 1.74999 14.1403 1.7722C18.744 2.09176 22.408 5.75571 22.7276 10.3595C22.7498 10.6796 22.7498 11.0514 22.7498 11.7105V11.7895C22.7498 12.4486 22.7498 12.8204 22.7276 13.1405C22.6121 14.804 22.06 16.3448 21.1847 17.6494L6.29487 2.75958C7.37635 2.20714 8.58161 1.86089 9.85925 1.7722C10.1793 1.74999 10.5512 1.74999 11.2102 1.75H11.2103H12.7893H12.7893Z',
  d14: 'M14.1403 21.7278C13.8202 21.75 13.4484 21.75 12.7893 21.75H11.2102C10.5512 21.75 10.1793 21.75 9.85925 21.7278C8.63806 21.643 7.48195 21.3226 6.43685 20.8113L1.47458 22.25L2.77896 17.5954C1.92447 16.3022 1.38579 14.7804 1.27196 13.1405C1.24974 12.8204 1.24975 12.4486 1.24976 11.7895V11.7895V11.7105V11.7105C1.24975 11.0514 1.24974 10.6796 1.27196 10.3595C1.44043 7.93232 2.53849 5.76637 4.21378 4.21402L19.5214 19.5217C18.0561 20.7792 16.1914 21.5854 14.1403 21.7278Z',
};

export const IconMessageBlockedStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-stroke-rounded IconMessageBlockedStrokeRounded"
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
        strokeLinejoin="round" 
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

export const IconMessageBlockedDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-duotone-rounded IconMessageBlockedDuotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconMessageBlockedTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-twotone-rounded IconMessageBlockedTwotoneRounded"
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
        strokeLinejoin="round" 
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

export const IconMessageBlockedSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-solid-rounded IconMessageBlockedSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageBlockedBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-bulk-rounded IconMessageBlockedBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageBlockedStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-stroke-sharp IconMessageBlockedStrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageBlockedSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-blocked-solid-sharp IconMessageBlockedSolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMessageBlocked: TheIconSelfPack = {
  name: 'MessageBlocked',
  StrokeRounded: IconMessageBlockedStrokeRounded,
  DuotoneRounded: IconMessageBlockedDuotoneRounded,
  TwotoneRounded: IconMessageBlockedTwotoneRounded,
  SolidRounded: IconMessageBlockedSolidRounded,
  BulkRounded: IconMessageBlockedBulkRounded,
  StrokeSharp: IconMessageBlockedStrokeSharp,
  SolidSharp: IconMessageBlockedSolidSharp,
};