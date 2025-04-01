import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.5 17.5L22 22',
  d2: 'M20 11C20 15.9706 15.9706 20 11 20C7.46628 20 4.40822 17.9634 2.93552 15M2 11C2 6.02944 6.02944 2 11 2C14.5337 2 17.5918 4.03656 19.0645 7M19.0645 7V2M19.0645 7H14.5M2.93552 15L2.93552 20M2.93552 15L7.5 15',
  d3: 'M20 11C20 15.9706 15.9706 20 11 20C7.46631 20 4.40825 17.9634 2.93555 15M2.93555 15L2.93555 20M2.93555 15L7.50003 15',
  d4: 'M2 11C2 6.02944 6.02944 2 11 2C14.5337 2 17.5918 4.03656 19.0645 7M19.0645 7V2M19.0645 7H14.5',
  d5: 'M16.6847 16.6847C17.0663 16.303 17.6851 16.303 18.0667 16.6847L22.4645 21.0824C22.8461 21.4641 22.8461 22.0828 22.4645 22.4645C22.0828 22.8461 21.464 22.8461 21.0824 22.4645L16.6847 18.0667C16.303 17.6851 16.303 17.0663 16.6847 16.6847Z',
  d6: 'M11.0227 3.20455C6.70486 3.20455 3.20455 6.70486 3.20455 11.0227C3.20455 11.5625 2.76701 12 2.22727 12C1.68754 12 1.25 11.5625 1.25 11.0227C1.25 5.6254 5.6254 1.25 11.0227 1.25C13.7189 1.25 16.1592 2.34193 17.9267 4.10615V2.22727C17.9267 1.68754 18.3642 1.25 18.9039 1.25C19.4437 1.25 19.8812 1.68754 19.8812 2.22727V7.11364C19.8812 7.65337 19.4437 8.09091 18.9039 8.09091H14.4432C13.9034 8.09091 13.4659 7.65337 13.4659 7.11364C13.4659 6.5739 13.9034 6.13636 14.4432 6.13636H17.1264C15.6928 4.34801 13.4907 3.20455 11.0227 3.20455ZM19.8182 10.0455C20.3579 10.0455 20.7955 10.483 20.7955 11.0227C20.7955 16.4201 16.4201 20.7955 11.0227 20.7955C8.32652 20.7955 5.88623 19.7035 4.1188 17.9393L4.1188 19.8182C4.1188 20.3579 3.68126 20.7955 3.14153 20.7955C2.6018 20.7955 2.16426 20.3579 2.16426 19.8182L2.16426 14.9318C2.16426 14.6726 2.26722 14.4241 2.45049 14.2408C2.63377 14.0575 2.88234 13.9545 3.14153 13.9545L7.60227 13.9545C8.14201 13.9545 8.57954 14.3921 8.57954 14.9318C8.57954 15.4716 8.142 15.9091 7.60227 15.9091L4.91909 15.9091C6.35265 17.6974 8.55473 18.8409 11.0227 18.8409C15.3406 18.8409 18.8409 15.3406 18.8409 11.0227C18.8409 10.483 19.2784 10.0455 19.8182 10.0455Z',
  d7: 'M11.0227 3.20455C6.70487 3.20455 3.20455 6.70486 3.20455 11.0227C3.20455 11.5625 2.76701 12 2.22727 12C1.68754 12 1.25 11.5625 1.25 11.0227C1.25 5.6254 5.6254 1.25 11.0227 1.25C13.7189 1.25 16.1592 2.34193 17.9267 4.10615V2.22727C17.9267 1.68754 18.3642 1.25 18.9039 1.25C19.4437 1.25 19.8812 1.68754 19.8812 2.22727V7.11364C19.8812 7.65337 19.4437 8.09091 18.9039 8.09091H14.4432C13.9034 8.09091 13.4659 7.65337 13.4659 7.11364C13.4659 6.5739 13.9034 6.13636 14.4432 6.13636H17.1264C15.6928 4.34801 13.4907 3.20455 11.0227 3.20455Z',
  d8: 'M19.818 10.0469C20.3577 10.0469 20.7953 10.4844 20.7953 11.0241C20.7953 16.4215 16.4199 20.7969 11.0225 20.7969C8.32632 20.7969 5.88603 19.7049 4.11861 17.9407L4.11861 19.8196C4.11861 20.3593 3.68107 20.7969 3.14134 20.7969C2.6016 20.7969 2.16406 20.3593 2.16406 19.8196L2.16406 14.9332C2.16406 14.674 2.26703 14.4255 2.4503 14.2422C2.63357 14.0589 2.88215 13.956 3.14134 13.956L7.60208 13.956C8.14181 13.956 8.57935 14.3935 8.57935 14.9332C8.57935 15.473 8.14181 15.9105 7.60208 15.9105L4.9189 15.9105C6.35246 17.6989 8.55454 18.8423 11.0225 18.8423C15.3404 18.8423 18.8407 15.342 18.8407 11.0241C18.8407 10.4844 19.2783 10.0469 19.818 10.0469Z',
  d9: 'M20 11C20 15.9706 15.9706 20 11 20C7.77075 20 4.93873 18.2993 3.35079 15.7447M2 11C2 6.02944 6.02944 2 11 2C14.2087 2 17.0253 3.67919 18.6188 6.20676M2.93552 20L2.93552 15L7.5 15M19.0645 2V7H14.5',
  d10: 'M21.3675 22.7496L16.6836 18.0657L18.0657 16.6836L22.7496 21.3675L21.3675 22.7496Z',
  d11: 'M11.0227 3.20455C6.70486 3.20455 3.20455 6.70486 3.20455 11.0227H1.25C1.25 5.6254 5.6254 1.25 11.0227 1.25C13.7189 1.25 16.1592 2.34193 17.9267 4.10615V2.22727H19.8812V8.09091H14.4432V6.13636H17.1264C15.6928 4.34801 13.4907 3.20455 11.0227 3.20455ZM11.0227 18.8409C15.3406 18.8409 18.8409 15.3406 18.8409 11.0227H20.7955C20.7955 16.4201 16.4201 20.7955 11.0227 20.7955C8.32652 20.7955 5.88623 19.7035 4.1188 17.9393L4.1188 19.8182H2.16426L2.16426 13.9545L7.60227 13.9545V15.9091L4.91909 15.9091C6.35265 17.6974 8.55473 18.8409 11.0227 18.8409Z',
};

export const IconSearchReplaceStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-stroke-rounded IconSearchReplaceStrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconSearchReplaceDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-duotone-rounded IconSearchReplaceDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="11" 
        cy="11" 
        r="9" 
        fill="var(--icon-fill)"></circle>
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

export const IconSearchReplaceTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-twotone-rounded IconSearchReplaceTwotoneRounded"
    >
      <path 
        d={d.d1} 
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

export const IconSearchReplaceSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-solid-rounded IconSearchReplaceSolidRounded"
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

export const IconSearchReplaceBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-bulk-rounded IconSearchReplaceBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSearchReplaceStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-stroke-sharp IconSearchReplaceStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSearchReplaceSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="search-replace-solid-sharp IconSearchReplaceSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfSearchReplace: TheIconSelfPack = {
  name: 'SearchReplace',
  StrokeRounded: IconSearchReplaceStrokeRounded,
  DuotoneRounded: IconSearchReplaceDuotoneRounded,
  TwotoneRounded: IconSearchReplaceTwotoneRounded,
  SolidRounded: IconSearchReplaceSolidRounded,
  BulkRounded: IconSearchReplaceBulkRounded,
  StrokeSharp: IconSearchReplaceStrokeSharp,
  SolidSharp: IconSearchReplaceSolidSharp,
};