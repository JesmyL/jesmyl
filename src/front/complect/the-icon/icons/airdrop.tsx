import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4 17.001C2.74418 15.3295 2 13.2516 2 11C2 5.47715 6.47715 1 12 1C17.5228 1 22 5.47715 22 11C22 13.2516 21.2558 15.3295 20 17.001',
  d2: 'M7.52779 15C6.57771 13.9385 6 12.5367 6 11C6 7.68629 8.68629 5 12 5C15.3137 5 18 7.68629 18 11C18 12.5367 17.4223 13.9385 16.4722 15',
  d3: 'M9.95154 17.8759C10.7222 16.758 11.1076 16.199 11.6078 16.0553C11.8644 15.9816 12.1356 15.9816 12.3922 16.0553C12.8924 16.199 13.2778 16.758 14.0485 17.8759C15.074 19.3633 15.5867 20.1071 15.488 20.727C15.4379 21.0414 15.2938 21.3315 15.076 21.5565C14.6465 22 13.7643 22 12 22C10.2357 22 9.35352 22 8.92399 21.5565C8.70617 21.3315 8.56205 21.0414 8.512 20.727C8.4133 20.1071 8.92605 19.3633 9.95154 17.8759Z',
  d4: 'M9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12Z',
  d5: 'M12 3C7.02944 3 3 7.02944 3 12C3 14.0276 3.66932 15.8961 4.79949 17.4003C5.13124 17.8418 5.04222 18.4687 4.60067 18.8005C4.15913 19.1322 3.53225 19.0432 3.20051 18.6017C1.81903 16.7629 1 14.4757 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 14.4757 22.181 16.7629 20.7995 18.6017C20.4678 19.0432 19.8409 19.1322 19.3993 18.8005C18.9578 18.4687 18.8688 17.8418 19.2005 17.4003C20.3307 15.8961 21 14.0276 21 12C21 7.02944 16.9706 3 12 3Z',
  d6: 'M12 7C9.23858 7 7 9.23858 7 12C7 13.2812 7.48059 14.4478 8.27292 15.3331C8.64125 15.7446 8.60623 16.3768 8.1947 16.7451C7.78317 17.1135 7.15098 17.0784 6.78265 16.6669C5.67482 15.4291 5 13.7922 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 13.7922 18.3252 15.4291 17.2173 16.6669C16.849 17.0784 16.2168 17.1135 15.8053 16.7451C15.3938 16.3768 15.3588 15.7446 15.7271 15.3331C16.5194 14.4478 17 13.2812 17 12C17 9.23858 14.7614 7 12 7Z',
  d7: 'M11.4007 15.5845C11.7927 15.4718 12.2074 15.4718 12.5993 15.5845C13.0591 15.7166 13.3984 16.0242 13.6881 16.3619C13.9694 16.6897 14.2772 17.1362 14.6427 17.6664L14.6427 17.6664L14.6911 17.7366C15.1825 18.4493 15.5857 19.0342 15.8489 19.5188C16.1128 20.0048 16.3184 20.5314 16.2287 21.0949C16.1549 21.5587 15.9417 21.9906 15.6148 22.3282C15.2121 22.744 14.6616 22.8794 14.1221 22.9399C13.5854 23 12.8891 23 12.0463 23H11.9538C11.111 23 10.4147 23 9.87796 22.9399C9.33849 22.8794 8.78793 22.744 8.38525 22.3282C8.05835 21.9906 7.8452 21.5587 7.77136 21.0949C7.68164 20.5314 7.88726 20.0048 8.15115 19.5188C8.41433 19.0342 8.81757 18.4493 9.30898 17.7366L9.33409 17.7002L9.35734 17.6664L9.35735 17.6664C9.72284 17.1362 10.0307 16.6897 10.3119 16.3619C10.6016 16.0242 10.9409 15.7166 11.4007 15.5845Z',
  d8: 'M7.99805 22H15.998L11.998 16L7.99805 22Z',
  d9: 'M12 3.18164C7.1424 3.18164 3.20455 7.07334 3.20455 11.874C3.20455 13.8323 3.85866 15.6369 4.96314 17.0897L3.4005 18.25C2.05042 16.4741 1.25 14.265 1.25 11.874C1.25 6.00653 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.00653 22.75 11.874C22.75 14.265 21.9496 16.4741 20.5995 18.25L19.0369 17.0897C20.1413 15.6369 20.7955 13.8323 20.7955 11.874C20.7955 7.07334 16.8576 3.18164 12 3.18164Z',
  d10: 'M12 7.04491C9.30134 7.04491 7.11364 9.20697 7.11364 11.874C7.11364 13.1114 7.58331 14.2382 8.35763 15.0932L6.90123 16.3814C5.81857 15.1859 5.15909 13.6049 5.15909 11.874C5.15909 8.14016 8.22187 5.11327 12 5.11327C15.7781 5.11327 18.8409 8.14016 18.8409 11.874C18.8409 13.6049 18.1814 15.1859 17.0988 16.3814L15.6424 15.0932C16.4167 14.2382 16.8864 13.1114 16.8864 11.874C16.8864 9.20697 14.6987 7.04491 12 7.04491Z',
  d11: 'M9.06818 11.874C9.06818 10.2738 10.3808 8.97655 12 8.97655C13.6192 8.97655 14.9318 10.2738 14.9318 11.874C14.9318 13.4742 13.6192 14.7715 12 14.7715C10.3808 14.7715 9.06818 13.4742 9.06818 11.874Z',
  d12: 'M12 16.25C12.2508 16.25 12.4849 16.3586 12.624 16.5394L16.624 21.7394C16.7775 21.9389 16.7918 22.1954 16.6613 22.4067C16.5307 22.6181 16.2766 22.75 16 22.75H8C7.7234 22.75 7.46926 22.6181 7.33875 22.4067C7.20823 22.1954 7.22254 21.9389 7.37596 21.7394L11.376 16.5394C11.5151 16.3586 11.7492 16.25 12 16.25Z',
};

export const IconAirdropStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-stroke-rounded IconAirdropStrokeRounded"
    >
      <circle 
        cx="12" 
        cy="11" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAirdropDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-duotone-rounded IconAirdropDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="11" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAirdropTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-twotone-rounded IconAirdropTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="11" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
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

export const IconAirdropSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-solid-rounded IconAirdropSolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAirdropBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-bulk-rounded IconAirdropBulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconAirdropStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-stroke-sharp IconAirdropStrokeSharp"
    >
      <circle 
        cx="12" 
        cy="11" 
        r="2" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAirdropSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="airdrop-solid-sharp IconAirdropSolidSharp"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAirdrop: TheIconSelfPack = {
  name: 'Airdrop',
  StrokeRounded: IconAirdropStrokeRounded,
  DuotoneRounded: IconAirdropDuotoneRounded,
  TwotoneRounded: IconAirdropTwotoneRounded,
  SolidRounded: IconAirdropSolidRounded,
  BulkRounded: IconAirdropBulkRounded,
  StrokeSharp: IconAirdropStrokeSharp,
  SolidSharp: IconAirdropSolidSharp,
};