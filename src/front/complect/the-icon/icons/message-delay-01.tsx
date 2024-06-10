import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M8.5 15H15.5M8.5 10H10.5',
  d2: 'M12 3C11.2707 3 10.5418 3.02372 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C21.9915 13.0002 22.0044 12.4991 21.9987 12',
  d3: 'M18 6L19 5M22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z',
  d4: 'M21.3214 8.22975C20.6031 9.29751 19.3836 10 18 10C15.7909 10 14 8.20914 14 6C14 4.90711 14.4383 3.9166 15.1487 3.19464C14.8288 3.13469 14.5024 3.09313 14.1706 3.07107C12.7435 2.97621 11.2536 2.97641 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05567 21.9752 3.37025 21.9829 3.99941 21.9982C5.24365 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83174 20.8403 8.34392 21.0512C8.80432 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0134 12.6607 22.0134 11.8009 21.9598 10.9707C21.8972 10.0033 21.6757 9.08084 21.3214 8.22975Z',
  d5: 'M12.651 2.38848C12.5623 2.24691 12.3196 2.24808 11.8341 2.25043C11.1437 2.25376 10.4546 2.27789 9.77965 2.32275C5.213 2.62631 1.58972 6.3126 1.2918 10.9224C1.23607 11.7848 1.23607 12.6769 1.2918 13.5393C1.40272 15.2556 2.15148 16.804 2.98381 18.0605C3.23314 18.542 3.10323 19.2641 2.6369 20.1478L2.61542 20.1885C2.45874 20.4853 2.30536 20.7757 2.21688 21.0234C2.12313 21.2858 2.02623 21.7025 2.26791 22.1146C2.48996 22.4932 2.84475 22.6318 3.13152 22.6873C3.36961 22.7334 3.66155 22.7404 3.93544 22.7469L3.98117 22.748C5.40092 22.7825 6.40136 22.3726 7.1938 21.7883L7.28907 21.7181C7.40859 21.6302 7.46835 21.5863 7.54604 21.5766C7.62373 21.567 7.69203 21.5948 7.82861 21.6505C7.89626 21.678 7.97233 21.7093 8.05839 21.7448C8.59978 21.9678 9.21472 22.1013 9.77965 22.1389C11.2369 22.2358 12.7601 22.236 14.2204 22.1389C18.787 21.8353 22.4103 18.1491 22.7082 13.5393C22.7639 12.6769 22.7639 11.7848 22.7082 10.9224L22.7082 10.9223C22.7032 10.8458 22.7008 10.8075 22.6953 10.7839C22.6483 10.5791 22.4227 10.4853 22.2444 10.5964C22.2238 10.6092 22.1864 10.6419 22.1115 10.7073L22.1115 10.7074C21.0126 11.668 19.5743 12.25 18 12.25C14.5482 12.25 11.75 9.45181 11.75 6.00003C11.75 5.01242 11.9791 4.07832 12.387 3.24796C12.6221 2.76936 12.7396 2.53006 12.651 2.38848ZM8.5 15.7499C8.08579 15.7499 7.75 15.4141 7.75 14.9999C7.75 14.5857 8.08579 14.2499 8.5 14.2499H15.5C15.9142 14.2499 16.25 14.5857 16.25 14.9999C16.25 15.4141 15.9142 15.7499 15.5 15.7499H8.5ZM8.5 10.7499C8.08579 10.7499 7.75 10.4141 7.75 9.99993C7.75 9.58571 8.08579 9.24993 8.5 9.24993H10.5C10.9142 9.24993 11.25 9.58571 11.25 9.99993C11.25 10.4141 10.9142 10.7499 10.5 10.7499H8.5Z',
  d6: 'M18 1.25C15.3766 1.25 13.25 3.37665 13.25 6C13.25 8.62335 15.3766 10.75 18 10.75C20.6234 10.75 22.75 8.62335 22.75 6C22.75 3.37665 20.6234 1.25 18 1.25ZM19.5303 5.53033C19.8232 5.23744 19.8232 4.76256 19.5303 4.46967C19.2374 4.17678 18.7626 4.17678 18.4697 4.46967L17.4697 5.46967C17.1768 5.76256 17.1768 6.23744 17.4697 6.53033C17.7626 6.82322 18.2374 6.82322 18.5303 6.53033L19.5303 5.53033Z',
  d7: 'M11.8341 2.25043C12.3196 2.24808 12.5623 2.24691 12.651 2.38848C12.7396 2.53006 12.6221 2.76936 12.387 3.24796C11.9791 4.07832 11.75 5.01242 11.75 6.00003C11.75 9.45181 14.5482 12.25 18 12.25C19.5743 12.25 21.0126 11.668 22.1115 10.7074C22.1863 10.642 22.2238 10.6092 22.2444 10.5964C22.4227 10.4853 22.6483 10.5791 22.6953 10.7839C22.7008 10.8075 22.7032 10.8458 22.7082 10.9224C22.7639 11.7848 22.7639 12.6769 22.7082 13.5393C22.4103 18.1491 18.787 21.8353 14.2204 22.1389C12.7601 22.236 11.2369 22.2358 9.77965 22.1389C9.21472 22.1013 8.59978 21.9678 8.05839 21.7448C7.97233 21.7093 7.89626 21.678 7.82861 21.6505C7.69203 21.5948 7.62373 21.567 7.54604 21.5766C7.46835 21.5863 7.40859 21.6302 7.28907 21.7181C7.25946 21.7399 7.22778 21.7632 7.1938 21.7883C6.40136 22.3726 5.40092 22.7825 3.98117 22.748L3.93544 22.7469C3.66155 22.7404 3.36961 22.7334 3.13152 22.6873C2.84475 22.6318 2.48996 22.4932 2.26791 22.1146C2.02623 21.7025 2.12313 21.2858 2.21688 21.0234C2.30536 20.7757 2.45874 20.4853 2.61542 20.1885L2.6369 20.1478C3.10323 19.2641 3.23314 18.542 2.98381 18.0605C2.15148 16.804 1.40272 15.2556 1.2918 13.5393C1.23607 12.6769 1.23607 11.7848 1.2918 10.9224C1.58972 6.3126 5.213 2.62631 9.77965 2.32275C10.4546 2.27789 11.1437 2.25376 11.8341 2.25043Z',
  d8: 'M7.75 15C7.75 15.4142 8.08579 15.75 8.5 15.75H15.5C15.9142 15.75 16.25 15.4142 16.25 15C16.25 14.5858 15.9142 14.25 15.5 14.25H8.5C8.08579 14.25 7.75 14.5858 7.75 15ZM7.75 10C7.75 10.4142 8.08579 10.75 8.5 10.75H10.5C10.9142 10.75 11.25 10.4142 11.25 10C11.25 9.58579 10.9142 9.25 10.5 9.25H8.5C8.08579 9.25 7.75 9.58579 7.75 10Z',
  d9: 'M7.43268 14.8354H16.3252M7.43268 9.89941H11.3849',
  d10: 'M17.3132 6.44238L19.2893 4.46799M21.7595 5.94878C21.7595 8.12964 19.99 9.89757 17.8073 9.89757C15.6245 9.89757 13.855 8.12964 13.855 5.94878C13.855 3.76793 15.6245 2 17.8073 2C19.99 2 21.7595 3.76793 21.7595 5.94878Z',
  d11: 'M9.71063 3.00484C2.72159 3.72553 -0.18721 11.6493 3.61973 17.8719L2.03597 21.7947C2.00346 21.8752 2.08198 21.9561 2.16341 21.9259L6.41789 20.3512C8.21116 21.5625 14.2804 21.9164 17.0099 20.5645C19.5593 19.3019 22.2262 17.2926 21.9047 11.4985M9.71063 3.00484C9.86915 2.9958 10.0294 2.99121 10.1914 2.99121M9.71063 3.00484L11.1132 2.99987L12.4087 2.99121',
  d12: 'M18 1.25C15.3766 1.25 13.25 3.37665 13.25 6C13.25 8.62335 15.3766 10.75 18 10.75C20.6234 10.75 22.75 8.62335 22.75 6C22.75 3.37665 20.6234 1.25 18 1.25ZM18.0294 7.03039L20.0294 5.03039L18.9688 3.96973L16.9688 5.96973L18.0294 7.03039Z',
  d13: 'M12 6C12 4.58136 12.4923 3.27771 13.3155 2.25061C13.1622 2.25 12.9891 2.25 12.7898 2.25H12.7895H11.2105H11.2104C10.5514 2.24999 10.1795 2.24999 9.85949 2.2722C5.25571 2.59176 1.59176 6.25571 1.2722 10.8595C1.24999 11.1795 1.24999 11.5514 1.25 12.2105V12.2105V12.2895V12.2896C1.24999 12.9486 1.24999 13.3205 1.2722 13.6405C1.38603 15.2804 1.92471 16.8022 2.77921 18.0954L1.47483 22.75L6.43709 21.3113C7.48219 21.8226 8.63831 22.143 9.85949 22.2278C10.1796 22.25 10.5514 22.25 11.2105 22.25H12.7895C13.4486 22.25 13.8204 22.25 14.1405 22.2278C18.7443 21.9082 22.4082 18.2443 22.7278 13.6405C22.75 13.3204 22.75 12.9486 22.75 12.2895V12.2105C22.75 11.5514 22.75 11.1796 22.7278 10.8595C22.7041 10.5174 22.6618 10.1806 22.6022 9.8499C21.5015 11.1642 19.8484 12 18 12C14.6863 12 12 9.31371 12 6ZM7.5 15.75V14.25H16.5V15.75H7.5ZM7.5 9.25H11V10.75H7.5V9.25Z',
};

export const IconMessageDelay01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-stroke-rounded IconMessageDelay01StrokeRounded"
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

export const IconMessageDelay01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-duotone-rounded IconMessageDelay01DuotoneRounded"
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

export const IconMessageDelay01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-twotone-rounded IconMessageDelay01TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageDelay01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-solid-rounded IconMessageDelay01SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageDelay01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-bulk-rounded IconMessageDelay01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageDelay01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-stroke-sharp IconMessageDelay01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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

export const IconMessageDelay01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-delay-01-solid-sharp IconMessageDelay01SolidSharp"
    >
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
    </TheIconWrapper>
  );
};

export const iconPackOfMessageDelay01: TheIconSelfPack = {
  name: 'MessageDelay01',
  StrokeRounded: IconMessageDelay01StrokeRounded,
  DuotoneRounded: IconMessageDelay01DuotoneRounded,
  TwotoneRounded: IconMessageDelay01TwotoneRounded,
  SolidRounded: IconMessageDelay01SolidRounded,
  BulkRounded: IconMessageDelay01BulkRounded,
  StrokeSharp: IconMessageDelay01StrokeSharp,
  SolidSharp: IconMessageDelay01SolidSharp,
};