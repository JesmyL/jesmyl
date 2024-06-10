import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.9598 10.9707C22.0134 11.8009 22.0134 12.6607 21.9598 13.4909C21.6856 17.7332 18.3536 21.1125 14.1706 21.3905C12.7435 21.4854 11.2536 21.4852 9.8294 21.3905C9.33896 21.3579 8.8044 21.2409 8.34401 21.0513C7.83177 20.8403 7.5756 20.7348 7.44544 20.7508C7.31527 20.7668 7.1264 20.9061 6.74868 21.1846C6.08268 21.6757 5.24367 22.0285 3.99943 21.9982C3.37026 21.9829 3.05568 21.9752 2.91484 21.7351C2.77401 21.495 2.94941 21.1626 3.30021 20.4978C3.78674 19.5758 4.09501 18.5203 3.62791 17.6746C2.82343 16.4666 2.1401 15.036 2.04024 13.4909C1.98659 12.6607 1.98659 11.8009 2.04024 10.9707C2.31441 6.72838 5.64639 3.34913 9.8294 3.07107C11.0318 2.99114 11.2812 2.97856 12.5 3.03368',
  d2: 'M11.9953 12.5H12.0042M15.9908 12.5H15.9998M7.99976 12.5H8.00873',
  d3: 'M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z',
  d4: 'M15.7526 3.33145C15.2428 3.19562 14.7139 3.10719 14.1706 3.07107C12.7435 2.97621 11.2536 2.97641 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05567 21.9752 3.37025 21.9829 3.99941 21.9982C5.24365 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83174 20.8403 8.34392 21.0512C8.80432 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0134 12.6607 22.0134 11.8009 21.9598 10.9707C21.8867 9.84096 21.5969 8.77241 21.1318 7.80734C20.4903 8.53845 19.5491 9 18.5 9C16.567 9 15 7.433 15 5.5C15 4.681 15.2813 3.9277 15.7526 3.33145Z',
  d5: 'M13.4274 2.40402C13.3408 2.26956 13.1159 2.26519 12.6661 2.25646C11.6997 2.23769 10.7258 2.25983 9.77965 2.32273C5.213 2.62629 1.58972 6.31258 1.2918 10.9224C1.23607 11.7848 1.23607 12.6768 1.2918 13.5392C1.40272 15.2556 2.15148 16.804 2.98381 18.0604C3.23314 18.5419 3.10323 19.2641 2.6369 20.1478L2.61542 20.1885C2.45874 20.4852 2.30536 20.7757 2.21688 21.0234C2.12313 21.2858 2.02623 21.7025 2.26791 22.1145C2.48996 22.4931 2.84475 22.6318 3.13152 22.6873C3.36961 22.7334 3.66155 22.7403 3.93544 22.7469L3.98117 22.748C5.40092 22.7825 6.40136 22.3726 7.1938 21.7883L7.28907 21.7181C7.40859 21.6302 7.46835 21.5862 7.54604 21.5766C7.62373 21.567 7.69203 21.5948 7.82861 21.6505C7.89626 21.678 7.97233 21.7093 8.05839 21.7448C8.59978 21.9677 9.21472 22.1013 9.77965 22.1389C11.2369 22.2357 12.7601 22.2359 14.2204 22.1389C18.787 21.8353 22.4103 18.149 22.7082 13.5392C22.7639 12.6768 22.7639 11.7848 22.7082 10.9224C22.7031 10.8437 22.6971 10.7653 22.6901 10.6872C22.6497 10.2373 22.6295 10.0124 22.4758 9.93863C22.322 9.86484 22.1073 10.0075 21.6779 10.2928C20.7675 10.8976 19.6749 11.25 18.5 11.25C15.3244 11.25 12.75 8.67564 12.75 5.5C12.75 4.69125 12.917 3.92149 13.2183 3.22332C13.4154 2.76676 13.5139 2.53847 13.4274 2.40402ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H8.00897C8.56126 13.5 9.00897 13.0523 9.00897 12.5C9.00897 11.9477 8.56126 11.5 8.00897 11.5H8ZM11.9955 11.5C11.4432 11.5 10.9955 11.9477 10.9955 12.5C10.9955 13.0523 11.4432 13.5 11.9955 13.5H12.0045C12.5568 13.5 13.0045 13.0523 13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5H11.9955ZM15.991 11.5C15.4387 11.5 14.991 11.9477 14.991 12.5C14.991 13.0523 15.4387 13.5 15.991 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H15.991Z',
  d6: 'M14.25 5.5C14.25 3.15279 16.1528 1.25 18.5 1.25C20.8472 1.25 22.75 3.15279 22.75 5.5C22.75 7.84721 20.8472 9.75 18.5 9.75C16.1528 9.75 14.25 7.84721 14.25 5.5Z',
  d7: 'M12.6661 2.25646C13.1159 2.26519 13.3408 2.26956 13.4274 2.40402C13.5139 2.53847 13.4154 2.76676 13.2183 3.22332C12.917 3.92149 12.75 4.69125 12.75 5.5C12.75 8.67564 15.3244 11.25 18.5 11.25C19.6749 11.25 20.7675 10.8976 21.6779 10.2928C22.1073 10.0075 22.322 9.86484 22.4758 9.93863C22.6295 10.0124 22.6497 10.2373 22.6901 10.6872C22.6971 10.7653 22.7031 10.8437 22.7082 10.9224C22.7639 11.7848 22.7639 12.6768 22.7082 13.5392C22.4103 18.149 18.787 21.8353 14.2204 22.1389C12.7601 22.2359 11.2369 22.2357 9.77965 22.1389C9.21472 22.1013 8.59978 21.9677 8.05839 21.7448C7.97233 21.7093 7.89626 21.678 7.82861 21.6505C7.69203 21.5948 7.62373 21.567 7.54604 21.5766C7.46835 21.5862 7.40859 21.6302 7.28907 21.7181C7.25946 21.7399 7.22778 21.7632 7.1938 21.7883C6.40136 22.3726 5.40092 22.7825 3.98117 22.748L3.93544 22.7469C3.66155 22.7403 3.36961 22.7334 3.13152 22.6873C2.84475 22.6318 2.48996 22.4931 2.26791 22.1145C2.02623 21.7025 2.12313 21.2858 2.21688 21.0234C2.30536 20.7757 2.45874 20.4852 2.61542 20.1885L2.6369 20.1478C3.10323 19.2641 3.23314 18.5419 2.98381 18.0604C2.15148 16.804 1.40272 15.2556 1.2918 13.5392C1.23607 12.6768 1.23607 11.7848 1.2918 10.9224C1.58972 6.31258 5.213 2.62629 9.77965 2.32273C10.7258 2.25983 11.6997 2.23769 12.6661 2.25646Z',
  d8: 'M7 12.5C7 11.9477 7.44772 11.5 8 11.5H8.00897C8.56126 11.5 9.00897 11.9477 9.00897 12.5C9.00897 13.0523 8.56126 13.5 8.00897 13.5H8C7.44772 13.5 7 13.0523 7 12.5ZM10.9955 12.5C10.9955 11.9477 11.4432 11.5 11.9955 11.5H12.0045C12.5568 11.5 13.0045 11.9477 13.0045 12.5C13.0045 13.0523 12.5568 13.5 12.0045 13.5H11.9955C11.4432 13.5 10.9955 13.0523 10.9955 12.5ZM14.991 12.5C14.991 11.9477 15.4387 11.5 15.991 11.5H16C16.5523 11.5 17 11.9477 17 12.5C17 13.0523 16.5523 13.5 16 13.5H15.991C15.4387 13.5 14.991 13.0523 14.991 12.5Z',
  d9: 'M11.907 12.4727H11.9158M15.8676 12.4727H15.8765M7.94629 12.4727H7.95518',
  d10: 'M21.8244 5.49096C21.8244 7.41897 20.2711 8.98192 18.355 8.98192C16.4388 8.98192 14.8855 7.41897 14.8855 5.49096C14.8855 3.56295 16.4388 2 18.355 2C20.2711 2 21.8244 3.56295 21.8244 5.49096Z',
  d11: 'M9.81852 3.0128C2.56375 3.61233 -0.285294 12.274 3.62657 17.9489L2.01303 21.8644C1.97995 21.9447 2.05757 22.0261 2.13866 21.9963L6.4016 20.4267C8.1944 21.7477 14.9467 22.0765 17.2394 20.5036C19.7928 19.0465 22.2754 16.7399 21.8158 10.9087M9.81852 3.0128C9.97924 3.00366 10.1417 2.99902 10.3059 2.99902M9.81852 3.0128H12.6684',
  d12: 'M13 5.5C13 4.29156 13.3897 3.17415 14.0503 2.2666C13.7493 2.24999 13.3877 2.24999 12.7895 2.25H12.7895H11.2105H11.2104C10.5514 2.24999 10.1795 2.24999 9.85949 2.2722C5.25571 2.59176 1.59176 6.25571 1.2722 10.8595C1.24999 11.1795 1.24999 11.5514 1.25 12.2105V12.2105V12.2895V12.2896C1.24999 12.9486 1.24999 13.3205 1.2722 13.6405C1.38603 15.2804 1.92471 16.8022 2.77921 18.0954L1.47483 22.75L6.43709 21.3113C7.48219 21.8226 8.63831 22.143 9.85949 22.2278C10.1796 22.25 10.5514 22.25 11.2105 22.25H12.7895C13.4486 22.25 13.8204 22.25 14.1405 22.2278C18.7443 21.9082 22.4082 18.2443 22.7278 13.6405C22.75 13.3204 22.75 12.9486 22.75 12.2895V12.2105C22.75 11.5514 22.75 11.1796 22.7278 10.8595C22.6906 10.323 22.6079 9.79932 22.4837 9.29218C21.4818 10.3443 20.0675 11 18.5 11C15.4624 11 13 8.53757 13 5.5ZM9.00897 11.5H7V13.5H9.00897V11.5ZM13.0045 11.5H10.9955V13.5H13.0045V11.5Z',
};

export const IconMessageNotification02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-stroke-rounded IconMessageNotification02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMessageNotification02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-duotone-rounded IconMessageNotification02DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMessageNotification02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-twotone-rounded IconMessageNotification02TwotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMessageNotification02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-solid-rounded IconMessageNotification02SolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageNotification02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-bulk-rounded IconMessageNotification02BulkRounded"
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
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageNotification02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-stroke-sharp IconMessageNotification02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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

export const IconMessageNotification02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-notification-02-solid-sharp IconMessageNotification02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMessageNotification02: TheIconSelfPack = {
  name: 'MessageNotification02',
  StrokeRounded: IconMessageNotification02StrokeRounded,
  DuotoneRounded: IconMessageNotification02DuotoneRounded,
  TwotoneRounded: IconMessageNotification02TwotoneRounded,
  SolidRounded: IconMessageNotification02SolidRounded,
  BulkRounded: IconMessageNotification02BulkRounded,
  StrokeSharp: IconMessageNotification02StrokeSharp,
  SolidSharp: IconMessageNotification02SolidSharp,
};