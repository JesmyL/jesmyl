import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d = {
  d1: 'M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z',
  d2: 'M7.5 9.5V6.5C7.5 4.01472 9.51472 2 12 2C13.5602 2 14.935 2.79401 15.7422 4',
  d3: 'M12 15H12.009',
  d4: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C13.9079 1.25 15.5883 2.22228 16.5732 3.69374C16.8804 4.15269 16.7574 4.77379 16.2985 5.08101C15.8395 5.38822 15.2184 5.26521 14.9112 4.80626C14.2817 3.86575 13.2125 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75C8.5 10.3023 8.05228 10.75 7.5 10.75C6.94772 10.75 6.5 10.3023 6.5 9.75V6.75Z',
  d5: 'M12 7.25C7.71979 7.25 4.25 10.7198 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 10.7198 16.2802 7.25 12 7.25ZM11.9933 13.5C11.1686 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1686 16.5 11.9933 16.5H12.0067C12.8314 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8314 13.5 12.0067 13.5H11.9933Z',
  d6: 'M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15Z',
  d7: 'M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C7.08168 8.95401 7.75634 8.46054 8.5 8.08347V6.75C8.5 4.817 10.067 3.25 12 3.25C13.2125 3.25 14.2817 3.86575 14.9112 4.80626C15.2184 5.26521 15.8395 5.38822 16.2985 5.08101C16.7574 4.77379 16.8804 4.15269 16.5732 3.69374C15.5883 2.22228 13.9079 1.25 12 1.25Z',
  d8: 'M10.5 15C10.5 14.1716 11.1686 13.5 11.9933 13.5H12.0067C12.8314 13.5 13.5 14.1716 13.5 15C13.5 15.8284 12.8314 16.5 12.0067 16.5H11.9933C11.1686 16.5 10.5 15.8284 10.5 15Z',
  d9: 'M6.5 6.75C6.5 3.71243 8.96243 1.25 12 1.25C13.9079 1.25 15.5883 2.22228 16.5732 3.69374L14.9112 4.80626C14.2817 3.86575 13.2125 3.25 12 3.25C10.067 3.25 8.5 4.817 8.5 6.75V9.75H6.5V6.75Z',
  d10: 'M12 7.25C7.71979 7.25 4.25 10.7198 4.25 15C4.25 19.2802 7.71979 22.75 12 22.75C16.2802 22.75 19.75 19.2802 19.75 15C19.75 10.7198 16.2802 7.25 12 7.25ZM13.5 13.5H10.5V16.5H13.5V13.5Z',
} as const;

export const IconCircleUnlock01StrokeRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-stroke-rounded IconCircleUnlock01StrokeRounded"
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

export const IconCircleUnlock01DuotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-duotone-rounded IconCircleUnlock01DuotoneRounded"
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

export const IconCircleUnlock01TwotoneRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-twotone-rounded IconCircleUnlock01TwotoneRounded"
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

export const IconCircleUnlock01SolidRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-solid-rounded IconCircleUnlock01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconCircleUnlock01BulkRounded = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-bulk-rounded IconCircleUnlock01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
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

export const IconCircleUnlock01StrokeSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-stroke-sharp IconCircleUnlock01StrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCircleUnlock01SolidSharp = (props: TheIconProps) => {
  return (
    <TheIconWrapper
      {...props}
      name="circle-unlock-01-solid-sharp IconCircleUnlock01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleUnlock01: TheIconSelfPack = {
  name: 'CircleUnlock01',
  StrokeRounded: IconCircleUnlock01StrokeRounded,
  DuotoneRounded: IconCircleUnlock01DuotoneRounded,
  TwotoneRounded: IconCircleUnlock01TwotoneRounded,
  SolidRounded: IconCircleUnlock01SolidRounded,
  BulkRounded: IconCircleUnlock01BulkRounded,
  StrokeSharp: IconCircleUnlock01StrokeSharp,
  SolidSharp: IconCircleUnlock01SolidSharp,
};