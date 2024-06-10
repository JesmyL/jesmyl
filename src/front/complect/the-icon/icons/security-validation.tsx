import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11.9982 2C8.99043 2 7.04018 4.01899 4.73371 4.7549C3.79589 5.05413 3.32697 5.20374 3.1372 5.41465C2.94743 5.62556 2.89186 5.93375 2.78072 6.55013C1.59143 13.146 4.1909 19.244 10.3903 21.6175C11.0564 21.8725 11.3894 22 12.0015 22C12.6135 22 12.9466 21.8725 13.6126 21.6175C19.8116 19.2439 22.4086 13.146 21.219 6.55013C21.1078 5.93364 21.0522 5.6254 20.8624 5.41449C20.6726 5.20358 20.2037 5.05405 19.2659 4.75499C16.9585 4.01915 15.0061 2 11.9982 2Z',
  d2: 'M10 12.5C10 12.5 10.5 12.5 11 13.5C11 13.5 12.5882 11 14 10.5',
  d3: 'M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z',
  d4: 'M7.16873 3.60618C8.59295 2.8206 10.0807 2 11.9982 2C13.9157 2 15.4043 2.8206 16.8294 3.60618C17.6397 4.05288 18.4295 4.48825 19.2659 4.75499C20.2037 5.05405 20.6726 5.20358 20.8624 5.41449C21.0522 5.62539 21.1078 5.93363 21.219 6.5501C22.4086 13.146 19.8116 19.2439 13.6126 21.6175C12.9466 21.8725 12.6135 22 12.0015 22C11.3894 22 11.0564 21.8725 10.3903 21.6175C4.1909 19.244 1.59143 13.146 2.78072 6.55013C2.89186 5.93375 2.94743 5.62556 3.1372 5.41465C3.32697 5.20374 3.79588 5.05413 4.73371 4.7549C5.56974 4.48816 6.35897 4.05283 7.16873 3.60618ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z',
  d5: 'M14.707 10.2498C14.8453 10.6403 14.6408 11.0689 14.2504 11.2072C14.0266 11.2864 13.7463 11.4666 13.4302 11.7438C13.1219 12.0142 12.8184 12.3422 12.5465 12.6681C12.276 12.9924 11.796 13.6715 11.6332 13.9021C11.4882 14.1302 11.2315 14.263 10.9616 14.2492C10.6917 14.2354 10.4501 14.0774 10.3292 13.8356C10.1237 13.4246 9.95217 13.2864 9.89647 13.2492C9.89166 13.246 9.88745 13.2434 9.88388 13.2413C9.52481 13.1855 9.25 12.8749 9.25 12.5002C9.25 12.086 9.58579 11.7502 10 11.7502C10.4142 11.7502 10.5696 11.8952 10.7285 12.0012C10.8162 12.0596 10.9046 12.1294 10.9928 12.2119C11.1135 12.0534 11.2485 11.8825 11.3947 11.7073C11.6963 11.3457 12.0546 10.955 12.4411 10.616C12.8199 10.2838 13.2675 9.96399 13.7496 9.79323C14.1401 9.65495 14.5687 9.85937 14.707 10.2498Z',
  d6: 'M11.9981 1.25C10.3168 1.25 8.94996 1.81794 7.75783 2.43555C7.39757 2.62219 7.06291 2.8068 6.74311 2.98322L6.7431 2.98322L6.7431 2.98322L6.74309 2.98323C5.96064 3.41486 5.26717 3.7974 4.50561 4.04039C4.05831 4.1831 3.6621 4.30951 3.38117 4.4196C3.11675 4.52321 2.8025 4.6652 2.57954 4.91299C2.37926 5.13558 2.27636 5.38547 2.20814 5.6245C2.14621 5.84148 2.09328 6.13523 2.04249 6.41705C0.804551 13.2827 3.51154 19.787 10.122 22.3179C10.7718 22.5667 11.2503 22.75 12.0014 22.75C12.7524 22.75 13.2309 22.5667 13.8807 22.3179C20.4909 19.7869 23.1952 13.2824 21.9569 6.417C21.9061 6.13515 21.8532 5.84133 21.7912 5.62433C21.723 5.38529 21.6201 5.13537 21.4197 4.91278C21.1967 4.66499 20.8825 4.52304 20.618 4.41946C20.3371 4.30942 19.9409 4.18307 19.4937 4.04045L19.4937 4.04044C18.7317 3.79744 18.0376 3.4148 17.2546 2.9831L17.2546 2.98309C16.9346 2.8067 16.5998 2.62213 16.2395 2.43554C15.0467 1.81795 13.6794 1.25 11.9981 1.25ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z',
  d7: 'M7.75783 2.43555C8.94996 1.81794 10.3168 1.25 11.9981 1.25C13.6794 1.25 15.0467 1.81795 16.2395 2.43554C16.5998 2.62213 16.9346 2.8067 17.2546 2.98309L17.2546 2.9831C18.0376 3.4148 18.7317 3.79744 19.4937 4.04044L19.4937 4.04045C19.9409 4.18307 20.3371 4.30942 20.618 4.41946C20.8825 4.52304 21.1967 4.66499 21.4197 4.91278C21.6201 5.13537 21.723 5.38529 21.7912 5.62433C21.8532 5.84133 21.9061 6.13515 21.9569 6.417C23.1952 13.2824 20.4909 19.7869 13.8807 22.3179C13.2309 22.5667 12.7524 22.75 12.0014 22.75C11.2503 22.75 10.7718 22.5667 10.122 22.3179C3.51154 19.787 0.804551 13.2827 2.04249 6.41705C2.09328 6.13523 2.14621 5.84148 2.20814 5.6245C2.27636 5.38547 2.37926 5.13558 2.57954 4.91299C2.8025 4.6652 3.11675 4.52321 3.38117 4.4196C3.6621 4.30951 4.05831 4.1831 4.50561 4.04039C5.26717 3.7974 5.96064 3.41486 6.74309 2.98323L6.7431 2.98322L6.7431 2.98322C7.0629 2.8068 7.39757 2.62219 7.75783 2.43555Z',
  d8: 'M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM14.2504 11.2072C14.6408 11.0689 14.8453 10.6403 14.707 10.2498C14.5687 9.85937 14.1401 9.65495 13.7496 9.79323C13.2675 9.96399 12.8199 10.2838 12.4411 10.616C12.0546 10.955 11.6963 11.3457 11.3947 11.7073C11.2485 11.8825 11.1135 12.0534 10.9928 12.2119C10.9046 12.1294 10.8162 12.0596 10.7285 12.0012C10.7105 11.9892 10.6926 11.9767 10.6743 11.9639C10.5311 11.8642 10.3673 11.7502 10 11.7502C9.58579 11.7502 9.25 12.086 9.25 12.5002C9.25 12.8749 9.52481 13.1855 9.88388 13.2413C9.88745 13.2434 9.89166 13.246 9.89647 13.2492C9.95217 13.2864 10.1237 13.4246 10.3292 13.8356C10.4501 14.0774 10.6917 14.2354 10.9616 14.2492C11.2315 14.263 11.4882 14.1302 11.6332 13.9021C11.796 13.6715 12.276 12.9924 12.5465 12.6681C12.8184 12.3422 13.1219 12.0142 13.4302 11.7438C13.7463 11.4666 14.0266 11.2864 14.2504 11.2072Z',
  d9: 'M9.75 12.0088L11.25 13.5088L14.25 10.5088M17 12.0088C17 14.7702 14.7614 17.0088 12 17.0088C9.23858 17.0088 7 14.7702 7 12.0088C7 9.24737 9.23858 7.00879 12 7.00879C14.7614 7.00879 17 9.24737 17 12.0088Z',
  d10: 'M11.9879 2C8.64529 2 6.28378 5.0609 2.99767 5.0519C1.16627 13.0548 4.55959 19.3799 10.3851 21.6175C11.0491 21.8725 11.3811 22 11.9912 22C12.6012 22 12.9332 21.8725 13.5971 21.6175C20.9133 18.8071 22.5199 11.9952 20.9534 5.03988C17.9148 5.03988 14.986 2 11.9879 2Z',
  d11: 'M11.9998 1.25C10.0574 1.25 8.53664 2.08074 7.19426 2.81405C5.80181 3.57454 4.53955 4.25 3.01383 4.25H2.4196L2.2837 4.82849C0.214124 13.6386 4.34934 21.1255 11.8424 22.7334L11.9997 22.7672L12.1571 22.7334C19.6501 21.1255 23.7855 13.6386 21.7159 4.82849L21.58 4.25H20.9857C19.4623 4.25 18.2092 3.57779 16.8176 2.81707C15.4742 2.08258 13.9514 1.25 11.9998 1.25ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z',
  d12: 'M13.7192 9.96973L14.7799 11.0304L11.2496 14.5607L9.21924 12.5304L10.2799 11.4697L11.2496 12.4394L13.7192 9.96973Z',
};

export const IconSecurityValidationStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-stroke-rounded IconSecurityValidationStrokeRounded"
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

export const IconSecurityValidationDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-duotone-rounded IconSecurityValidationDuotoneRounded"
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
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

export const IconSecurityValidationTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-twotone-rounded IconSecurityValidationTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSecurityValidationSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-solid-rounded IconSecurityValidationSolidRounded"
    >
      <path 
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

export const IconSecurityValidationBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-bulk-rounded IconSecurityValidationBulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconSecurityValidationStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-stroke-sharp IconSecurityValidationStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSecurityValidationSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="security-validation-solid-sharp IconSecurityValidationSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfSecurityValidation: TheIconSelfPack = {
  name: 'SecurityValidation',
  StrokeRounded: IconSecurityValidationStrokeRounded,
  DuotoneRounded: IconSecurityValidationDuotoneRounded,
  TwotoneRounded: IconSecurityValidationTwotoneRounded,
  SolidRounded: IconSecurityValidationSolidRounded,
  BulkRounded: IconSecurityValidationBulkRounded,
  StrokeSharp: IconSecurityValidationStrokeSharp,
  SolidSharp: IconSecurityValidationSolidSharp,
};