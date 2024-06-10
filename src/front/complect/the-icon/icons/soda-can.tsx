import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5.92711 3.88746L6.90031 2.71963C7.1952 2.36576 7.34265 2.18882 7.54422 2.09441C7.74579 2 7.97611 2 8.43675 2H15.5633C16.0239 2 16.2542 2 16.4558 2.09441C16.6574 2.18882 16.8048 2.36576 17.0997 2.71963L18.0729 3.88746C18.5317 4.43802 18.7611 4.7133 18.8805 5.04325C19 5.3732 19 5.73153 19 6.4482V17.5518C19 18.2685 19 18.6268 18.8805 18.9568C18.7611 19.2867 18.5317 19.562 18.0729 20.1125L16.7998 21.6402C16.6524 21.8171 16.5787 21.9056 16.4779 21.9528C16.3771 22 16.2619 22 16.0316 22H7.96837C7.73805 22 7.6229 22 7.52211 21.9528C7.42132 21.9056 7.3476 21.8171 7.20015 21.6402L5.92711 20.1125C5.46831 19.562 5.23891 19.2867 5.11946 18.9568C5 18.6268 5 18.2685 5 17.5518V6.4482C5 5.73153 5 5.3732 5.11946 5.04325C5.23891 4.7133 5.46831 4.43802 5.92711 3.88746Z',
  d2: 'M5 5L19 5',
  d3: 'M5 19H19',
  d4: 'M6 2H18',
  d5: 'M5 6.45183V17.5554C5 18.2721 5 18.6304 5.11946 18.9604H18.8805C19 18.6304 19 18.2721 19 17.5554V6.45183C19 5.73516 19 5.37682 18.8805 5.04688H5.11946C5 5.37682 5 5.73516 5 6.45183ZM12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z',
  d6: 'M8.43697 1.00066H15.5635C15.9307 1.00066 16.4298 0.978569 16.8802 1.18948C17.2925 1.38261 17.5809 1.73222 17.8071 2.00643C18.1499 2.42188 18.4965 2.83418 18.8413 3.24794C19.255 3.74431 19.628 4.17042 19.821 4.70349C20.0019 5.20293 20.0011 5.73144 20.0003 6.32754C19.9952 10.1096 19.9952 13.8917 20.0003 17.6738C20.0011 18.2699 20.0019 18.7984 19.821 19.2978C19.628 19.8309 19.255 20.257 18.8413 20.7534L17.5683 22.281C17.4806 22.3862 17.2518 22.6953 16.9023 22.859C16.5527 23.0228 16.1688 23.0007 16.0318 23.0007H7.96859C7.83164 23.0007 7.4477 23.0228 7.09817 22.859C6.74865 22.6953 6.51981 22.3862 6.43215 22.281L5.15911 20.7534C4.74546 20.257 4.3724 19.8309 4.1794 19.2978C3.99858 18.7984 3.9993 18.2699 4.00011 17.6738C4.00524 13.8917 4.00524 10.1096 4.00011 6.32754C3.9993 5.73144 3.99858 5.20293 4.1794 4.70349C4.3724 4.17042 4.74547 3.74432 5.15911 3.24794C5.50391 2.83418 5.85054 2.42188 6.19329 2.00642C6.41952 1.73222 6.70796 1.38261 7.12028 1.18948C7.57059 0.978569 8.0697 1.00066 8.43697 1.00066ZM7.97266 3.00935L7.96936 3.01268C7.9067 3.0762 7.82664 3.171 7.66874 3.36048L6.69555 4.52831C6.1916 5.13306 6.10586 5.25751 6.05994 5.38434C6.01403 5.51116 6.00022 5.66166 6.00022 6.44886V17.5525C6.00022 18.3397 6.01403 18.4902 6.05995 18.617C6.10586 18.7438 6.1916 18.8683 6.69555 19.473L7.96859 21.0007H16.0318L17.3049 19.473C17.8088 18.8683 17.8946 18.7438 17.9405 18.617C17.9864 18.4902 18.0002 18.3397 18.0002 17.5525V6.44886C18.0002 5.66166 17.9864 5.51116 17.9405 5.38434C17.8946 5.25751 17.8088 5.13306 17.3049 4.52831L16.3317 3.36048C16.1738 3.171 16.0937 3.0762 16.0311 3.01268L16.0278 3.00935L16.0231 3.00895C15.9342 3.00147 15.8101 3.00066 15.5635 3.00066H8.43697C8.19032 3.00066 8.06624 3.00147 7.97734 3.00895L7.97266 3.00935Z',
  d7: 'M5 2C5 1.44772 5.44772 1 6 1H18C18.5523 1 19 1.44772 19 2C19 2.55228 18.5523 3 18 3H6C5.44772 3 5 2.55228 5 2Z',
  d8: 'M4.25 5C4.25 4.58579 4.58579 4.25 5 4.25L19 4.25C19.4142 4.25 19.75 4.58579 19.75 5V19C19.75 19.4142 19.4142 19.75 19 19.75L5 19.75C4.58579 19.75 4.25 19.4142 4.25 19L4.25 5ZM8.75 12C8.75 10.2051 10.2051 8.75 12 8.75C13.7949 8.75 15.25 10.2051 15.25 12C15.25 13.7949 13.7949 15.25 12 15.25C10.2051 15.25 8.75 13.7949 8.75 12Z',
  d9: 'M5 4.25C4.58579 4.25 4.25 4.58579 4.25 5V19C4.25 19.4142 4.58579 19.75 5 19.75H19C19.4142 19.75 19.75 19.4142 19.75 19V5C19.75 4.58579 19.4142 4.25 19 4.25H5Z',
  d10: 'M12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z',
  d11: 'M5 2H19',
  d12: 'M16.5 2L19 5V19L16.5 22',
  d13: 'M16.5 2L19 5V19L16.5 22H7.5L5 19V5L7.5 2',
  d14: 'M19 2.75H5V1.25H19V2.75Z',
  d15: 'M18.25 5.27145L15.9238 2.48005L17.0762 1.51978L19.5762 4.51978C19.6885 4.65456 19.75 4.82446 19.75 4.99991V18.9999C19.75 19.1754 19.6885 19.3453 19.5762 19.4801L17.0762 22.4801L15.9238 21.5198L18.25 18.7284V5.27145Z',
  d16: 'M10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12Z',
  d17: 'M4.42383 4.52002L6.92383 1.52002L8.07617 2.4803L5.75 5.2717H18.25L15.9238 2.4803L17.0762 1.52002L19.5762 4.52002C19.6885 4.65481 19.75 4.82471 19.75 5.00016V19.0002C19.75 19.1756 19.6885 19.3455 19.5762 19.4803L17.0762 22.4803C16.9337 22.6513 16.7226 22.7502 16.5 22.7502H7.5C7.27742 22.7502 7.06633 22.6513 6.92383 22.4803L4.42383 19.4803C4.31151 19.3455 4.25 19.1756 4.25 19.0002V5.00016C4.25 4.82471 4.31151 4.65481 4.42383 4.52002ZM5.75 18.7285L7.85128 21.2501H16.1487L18.25 18.7285H5.75ZM12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z',
};

export const IconSodaCanStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-stroke-rounded IconSodaCanStrokeRounded"
    >
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
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconSodaCanDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-duotone-rounded IconSodaCanDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
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
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconSodaCanTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-twotone-rounded IconSodaCanTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconSodaCanSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-solid-rounded IconSodaCanSolidRounded"
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
    </TheIconWrapper>
  );
};

export const IconSodaCanBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-bulk-rounded IconSodaCanBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
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
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSodaCanStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-stroke-sharp IconSodaCanStrokeSharp"
    >
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
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
      <circle 
        cx="12" 
        cy="12" 
        r="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
    </TheIconWrapper>
  );
};

export const IconSodaCanSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="soda-can-solid-sharp IconSodaCanSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSodaCan: TheIconSelfPack = {
  name: 'SodaCan',
  StrokeRounded: IconSodaCanStrokeRounded,
  DuotoneRounded: IconSodaCanDuotoneRounded,
  TwotoneRounded: IconSodaCanTwotoneRounded,
  SolidRounded: IconSodaCanSolidRounded,
  BulkRounded: IconSodaCanBulkRounded,
  StrokeSharp: IconSodaCanStrokeSharp,
  SolidSharp: IconSodaCanSolidSharp,
};