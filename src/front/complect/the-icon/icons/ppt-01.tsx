import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 13V12.1963C3.5 9.22889 3.5 7.7452 3.96894 6.56021C4.72281 4.65518 6.31714 3.15252 8.33836 2.44198C9.59563 2 11.1698 2 14.3182 2C16.1173 2 17.0168 2 17.7352 2.25256C18.8902 2.65858 19.8012 3.51725 20.232 4.60584C20.5 5.28297 20.5 6.13079 20.5 7.82643V12.0142V13',
  d2: 'M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2',
  d3: 'M3.5 22V16.7C3.5 16.3134 3.8134 16 4.2 16H5.23289C6.00653 16 6.79553 16.4316 6.89433 17.1989C6.92008 17.3989 6.91996 17.5936 6.89413 17.7937C6.79462 18.5645 6.00323 19 5.22608 19H4M10 22V16.7C10 16.3134 10.3134 16 10.7 16H11.8772C12.5745 16 13.2988 16.3418 13.455 17.0214C13.5227 17.3157 13.521 17.5982 13.4524 17.9019C13.2907 18.6179 12.5428 19 11.8088 19H11M16.5 16H18.5M18.5 16H20.5M18.5 16V22',
  d4: 'M9.49977 8.49792C5.89977 8.49792 3.50098 9.5 3.50098 12.1963V13H20.501V7.82643C20.501 6.13079 20.501 5.28297 20.233 4.60583C19.8022 3.51725 18.8912 2.65858 17.7362 2.25256C17.0178 2 16.1182 2 14.3192 2C13.9891 2 13.6763 2 13.3793 2.00051C9.49977 2.00051 10.5342 5.05948 10.5509 6.55167C10.5919 8.19467 9.80118 8.49792 9.49977 8.49792Z',
  d5: 'M3.50098 13V12.1963C3.50098 9.22889 3.50098 7.7452 3.96992 6.56021C4.72379 4.65518 6.31812 3.15252 8.33934 2.44198C9.59661 2 11.1708 2 14.3192 2C16.1183 2 17.0178 2 17.7362 2.25256C18.8912 2.65858 19.8022 3.51725 20.233 4.60584C20.501 5.28297 20.501 6.13079 20.501 7.82643V12.0142V13',
  d6: 'M3.50098 12C3.50098 10.1591 4.99336 8.66667 6.83431 8.66667C7.5001 8.66667 8.28502 8.78333 8.93235 8.60988C9.5075 8.45576 9.95674 8.00652 10.1109 7.43136C10.2843 6.78404 10.1677 5.99912 10.1677 5.33333C10.1677 3.49238 11.6601 2 13.501 2',
  d7: 'M3.50098 22V16.7C3.50098 16.3134 3.81438 16 4.20098 16H5.23387C6.00751 16 6.79651 16.4316 6.89531 17.1989C6.92106 17.3989 6.92094 17.5936 6.89511 17.7937C6.7956 18.5645 6.00421 19 5.22706 19H4.00098M10.001 22V16.7C10.001 16.3134 10.3144 16 10.701 16H11.8782C12.5755 16 13.2998 16.3418 13.456 17.0214C13.5237 17.3157 13.522 17.5982 13.4534 17.9019C13.2917 18.6179 12.5438 19 11.8098 19H11.001M16.501 16H18.501M18.501 16H20.501M18.501 16V22',
  d8: 'M3.5 22V16.7C3.5 16.3134 3.8134 16 4.2 16H5.23289C6.00653 16 6.79553 16.4316 6.89433 17.1989C6.92008 17.3989 6.91996 17.5936 6.89413 17.7937C6.79462 18.5645 6.00323 19 5.22608 19H4M10.0962 22V16.7C10.0962 16.3134 10.4096 16 10.7962 16H11.8772C12.5745 16 13.2988 16.3418 13.455 17.0214C13.5227 17.3157 13.521 17.5982 13.4524 17.9019C13.2907 18.6179 12.5428 19 11.8088 19H11M16.5 16H18.6094M18.6094 16H20.5M18.6094 16V22',
  d9: 'M3.72368 13.75C4.26144 13.75 4.69737 13.3195 4.69737 12.7885L4.69738 11.7652C4.69737 11.4982 4.69754 10.8596 4.97816 10.3875C5.15109 10.0965 5.37251 9.85337 5.59996 9.72955C5.96647 9.53003 6.38666 9.41667 6.83333 9.41667C6.98046 9.41667 7.13864 9.42314 7.31624 9.43138L7.38206 9.43446C7.53697 9.44174 7.70556 9.44966 7.8737 9.45315C8.25379 9.46105 8.69733 9.44904 9.12548 9.33432C9.95945 9.11086 10.6109 8.45945 10.8343 7.62548C10.949 7.19733 10.961 6.75379 10.9532 6.3737C10.9497 6.20562 10.9417 6.03692 10.9345 5.88206L10.9314 5.81624C10.9231 5.63864 10.9167 5.48046 10.9167 5.33333C10.9167 4.86564 11.0409 4.42698 11.2583 4.04857C11.385 3.82798 11.6057 3.62609 11.9105 3.44878C12.3726 3.17987 12.926 3.17738 13.2642 3.17585C13.6023 3.17433 13.9591 3.17316 14.2572 3.17316C16.0914 3.17316 16.7582 3.18692 17.2614 3.36158C18.1337 3.66441 18.7997 4.29659 19.11 5.07103C19.1878 5.26511 19.2427 5.52002 19.2721 5.96153C19.3021 6.41159 19.3026 6.98607 19.3026 7.81394V12.7885C19.3026 13.3195 19.7386 13.75 20.2763 13.75C20.8141 13.75 21.25 13.3195 21.25 12.7885V7.78121C21.25 6.99374 21.25 6.35586 21.2153 5.83514C21.1795 5.29867 21.1039 4.82043 20.9208 4.36341C20.3922 3.04443 19.2841 2.02533 17.9072 1.54735C17.0482 1.24915 16.0155 1.24951 14.4607 1.25005L13.5134 1.25012L13.5 1.25L13.4649 1.25015C10.9565 1.25185 9.40174 1.28168 8.1118 1.72949C5.8915 2.50027 4.11806 4.13859 3.27491 6.24261C2.99393 6.94378 2.86942 7.69695 2.80918 8.60017C2.74999 9.48756 2.75 10.5838 2.75 11.9814V12.7885C2.75 13.3195 3.18593 13.75 3.72368 13.75Z',
  d10: 'M4.63137 15.25C4.64391 15.25 4.65642 15.25 4.66889 15.25H5.44814C6.68775 15.25 7.65924 16.2761 7.65924 17.5C7.65924 18.724 6.68775 19.75 5.44814 19.75H4.25001V22C4.25001 22.4142 3.91423 22.75 3.50001 22.75C3.0858 22.75 2.75001 22.4142 2.75001 22V17.2C2.75001 17.1877 2.75001 17.1755 2.75001 17.1632C2.74994 16.9127 2.74987 16.6572 2.77776 16.4443C2.80959 16.2012 2.88931 15.9036 3.13394 15.6524C3.38125 15.3985 3.67908 15.313 3.92505 15.279C4.13646 15.2498 4.38892 15.2499 4.63137 15.25ZM4.25001 18.25H5.44814C5.82241 18.25 6.15924 17.9329 6.15924 17.5C6.15924 17.0671 5.82241 16.75 5.44814 16.75H4.66889C4.52827 16.75 4.41832 16.7501 4.32404 16.7525C4.29886 16.7532 4.27616 16.754 4.25565 16.7549C4.25436 16.7811 4.25329 16.8107 4.25246 16.8445C4.25006 16.9422 4.25001 17.0559 4.25001 17.2V18.25Z',
  d11: 'M11.2212 15.25C11.2338 15.25 11.2463 15.25 11.2587 15.25H12.038C13.2776 15.25 14.2491 16.2761 14.2491 17.5C14.2491 18.724 13.2776 19.75 12.038 19.75H10.8399V22C10.8399 22.4142 10.5041 22.75 10.0899 22.75C9.67564 22.75 9.33986 22.4142 9.33986 22V17.2C9.33986 17.1877 9.33985 17.1755 9.33985 17.1632C9.33978 16.9127 9.33971 16.6572 9.3676 16.4443C9.39943 16.2012 9.47916 15.9036 9.72378 15.6524C9.97109 15.3985 10.2689 15.313 10.5149 15.279C10.7263 15.2498 10.9788 15.2499 11.2212 15.25ZM10.8399 18.25H12.038C12.4123 18.25 12.7491 17.9329 12.7491 17.5C12.7491 17.0671 12.4123 16.75 12.038 16.75H11.2587C11.1181 16.75 11.0082 16.7501 10.9139 16.7525C10.8887 16.7532 10.866 16.754 10.8455 16.7549C10.8442 16.7811 10.8431 16.8107 10.8423 16.8445C10.8399 16.9422 10.8399 17.0559 10.8399 17.2V18.25Z',
  d12: 'M15.9297 16C15.9297 15.5858 16.2655 15.25 16.6797 15.25H20.5006C20.9148 15.25 21.2506 15.5858 21.2506 16C21.2506 16.4142 20.9148 16.75 20.5006 16.75H19.3401V22C19.3401 22.4142 19.0043 22.75 18.5901 22.75C18.1759 22.75 17.8401 22.4142 17.8401 22V16.75H16.6797C16.2655 16.75 15.9297 16.4142 15.9297 16Z',
  d13: 'M20.5015 12.9893V2.0833C20.5015 2.02813 20.4568 1.9834 20.4016 1.9834H10.5122L3.52051 8.98145V12.9697M10.5122 2.50461V8.96974L4.08826 8.98049',
  d14: 'M3.54724 18.9899L3.52939 15.9873L5.55882 16.0069C6.02879 16.0114 6.5152 16.1643 6.74497 16.5744C7.04928 17.1176 7.1099 17.8007 6.75542 18.4138C6.51851 18.8235 6.02512 18.9732 5.55196 18.9764L3.54724 18.9899ZM3.54724 18.9899L3.5293 21.9805M10.0266 18.9899L10.0088 15.9873L12.0382 16.0069C12.5082 16.0114 12.9946 16.1643 13.2244 16.5744C13.5287 17.1176 13.5893 17.8007 13.2348 18.4138C12.9979 18.8235 12.5045 18.9732 12.0314 18.9764L10.0266 18.9899ZM10.0266 18.9899L10.0087 21.9805M16.0097 15.9941H18.2627M18.2627 15.9941H20.5156M18.2627 15.9941V21.9735',
  d15: 'M20.2763 1.25C20.8141 1.25 21.25 1.68754 21.25 2.22727V13.0682H19.3026V3.20455L11.5132 3.20455L11.5132 10.0455H4.69737L4.69737 13.0682H2.75V8.66338L10.1362 1.25H20.2763Z',
  d16: 'M2.75 15.25H5.5389C6.77852 15.25 7.75 16.2761 7.75 17.5C7.75 18.7239 6.77852 19.75 5.5389 19.75H4.25V22.75H2.75V15.25ZM4.25 18.25H5.5389C5.91317 18.25 6.25 17.9329 6.25 17.5C6.25 17.0671 5.91317 16.75 5.5389 16.75H4.25V18.25ZM9.25 15.25H12.0377C13.2773 15.25 14.2488 16.2761 14.2488 17.5C14.2488 18.7239 13.2773 19.75 12.0377 19.75H10.75V22.75H9.25V15.25ZM10.75 18.25H12.0377C12.412 18.25 12.7488 17.9329 12.7488 17.5C12.7488 17.0671 12.412 16.75 12.0377 16.75H10.75V18.25ZM15.25 15.25H21.25V16.75H19V22.75H17.5V16.75H15.25V15.25Z',
};

export const IconPpt01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-stroke-rounded IconPpt01StrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-duotone-rounded IconPpt01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-twotone-rounded IconPpt01TwotoneRounded"
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
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-solid-rounded IconPpt01SolidRounded"
    >
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-bulk-rounded IconPpt01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-stroke-sharp IconPpt01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPpt01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ppt-01-solid-sharp IconPpt01SolidSharp"
    >
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPpt01: TheIconSelfPack = {
  name: 'Ppt01',
  StrokeRounded: IconPpt01StrokeRounded,
  DuotoneRounded: IconPpt01DuotoneRounded,
  TwotoneRounded: IconPpt01TwotoneRounded,
  SolidRounded: IconPpt01SolidRounded,
  BulkRounded: IconPpt01BulkRounded,
  StrokeSharp: IconPpt01StrokeSharp,
  SolidSharp: IconPpt01SolidSharp,
};