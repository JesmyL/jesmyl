import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  d2: 'M10 16V9C10 8.44772 10.4477 8 11 8H12.75C13.9926 8 15 9.00736 15 10.25C15 11.4926 13.9926 12.5 12.75 12.5H10M13 12.5L14.5 16',
  d3: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11 7C9.89543 7 9 7.89543 9 9V16C9 16.5523 9.44771 17 10 17C10.5523 17 11 16.5523 11 16V13.5H12.3406L13.5809 16.3939C13.7984 16.9015 14.3863 17.1367 14.8939 16.9191C15.4015 16.7016 15.6367 16.1137 15.4191 15.6061L14.339 13.0857C15.3302 12.5291 16 11.4678 16 10.25C16 8.45507 14.5449 7 12.75 7H11ZM12.75 11.5H11V9H12.75C13.4404 9 14 9.55964 14 10.25C14 10.9404 13.4404 11.5 12.75 11.5Z',
  d4: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d5: 'M9 9C9 7.89543 9.89543 7 11 7H12.75C14.5449 7 16 8.45507 16 10.25C16 11.4678 15.3302 12.5291 14.339 13.0857L15.4191 15.6061C15.6367 16.1137 15.4015 16.7016 14.8939 16.9191C14.3863 17.1367 13.7984 16.9015 13.5809 16.3939L12.3406 13.5H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V9ZM11 11.5H12.75C13.4404 11.5 14 10.9404 14 10.25C14 9.55964 13.4404 9 12.75 9H11V11.5Z',
  d6: 'M10 16V8H12.75C13.9926 8 15 9.00736 15 10.25C15 11.4926 13.9926 12.5 12.75 12.5M12.75 12.5H10M12.75 12.5L14.5 16',
  d7: 'M12.75 11.5H11V9H12.75C13.4404 9 14 9.55964 14 10.25C14 10.9404 13.4404 11.5 12.75 11.5Z',
  d8: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 7H9V16.4472H11V13.5H12.132L13.6056 16.4472L15.3944 15.5528L14.1982 13.1603C15.2663 12.6278 16 11.5246 16 10.25C16 8.45507 14.5449 7 12.75 7Z',
} as const;

export const IconRegisterStrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-stroke-rounded IconRegisterStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconRegisterDuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-duotone-rounded IconRegisterDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconRegisterTwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-twotone-rounded IconRegisterTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRegisterSolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-solid-rounded IconRegisterSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRegisterBulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-bulk-rounded IconRegisterBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRegisterStrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-stroke-sharp IconRegisterStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconRegisterSolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="register-solid-sharp IconRegisterSolidSharp"
    >
      <path 
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

export const iconPackOfRegister: TheIconSelfPack = {
  name: 'Register',
  StrokeRounded: IconRegisterStrokeRounded,
  DuotoneRounded: IconRegisterDuotoneRounded,
  TwotoneRounded: IconRegisterTwotoneRounded,
  SolidRounded: IconRegisterSolidRounded,
  BulkRounded: IconRegisterBulkRounded,
  StrokeSharp: IconRegisterStrokeSharp,
  SolidSharp: IconRegisterSolidSharp,
};