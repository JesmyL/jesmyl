import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.9981 7H11.0019C8.13196 7 6.19701 10.0691 7.32753 12.828C7.48501 13.2124 7.84633 13.4615 8.24612 13.4615H8.9491C9.18605 13.4615 9.39259 13.6302 9.45006 13.8706L10.3551 17.6567C10.5438 18.4462 11.222 19 12 19C12.778 19 13.4562 18.4462 13.6449 17.6567L14.5499 13.8706C14.6074 13.6302 14.814 13.4615 15.0509 13.4615H15.7539C16.1537 13.4615 16.515 13.2124 16.6725 12.828C17.803 10.0691 15.868 7 12.9981 7Z',
  d2: 'M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5Z',
  d3: 'M19 19C19 20.6569 15.866 22 12 22C8.13401 22 5 20.6569 5 19',
  d4: 'M12 1.25C10.3431 1.25 9 2.59315 9 4.25C9 5.32282 9.56313 6.26411 10.4099 6.79442C7.47495 7.21056 5.69103 10.4748 6.86508 13.3582C7.12056 13.9857 7.71969 14.4167 8.40809 14.4167H8.9002L9.72805 17.9022C9.98103 18.9673 10.9033 19.75 12 19.75C13.0967 19.75 14.019 18.9673 14.272 17.9022L15.0998 14.4167H15.5919C16.2803 14.4167 16.8794 13.9857 17.1349 13.3582C18.309 10.4748 16.525 7.21056 13.5901 6.79442C14.4369 6.26411 15 5.32282 15 4.25C15 2.59315 13.6569 1.25 12 1.25Z',
  d5: 'M5 17.75C5.55228 17.75 6 18.1977 6 18.75C6 18.826 6.03173 18.9821 6.26184 19.2153C6.4962 19.4528 6.8849 19.7125 7.44417 19.9522C8.55915 20.43 10.1692 20.75 12 20.75C13.8308 20.75 15.4409 20.43 16.5558 19.9522C17.1151 19.7125 17.5038 19.4528 17.7382 19.2153C17.9683 18.9821 18 18.826 18 18.75C18 18.1977 18.4477 17.75 19 17.75C19.5523 17.75 20 18.1977 20 18.75C20 19.5024 19.64 20.1355 19.1617 20.6202C18.6876 21.1005 18.0512 21.4873 17.3437 21.7905C15.9251 22.3984 14.0352 22.75 12 22.75C9.96482 22.75 8.07486 22.3984 6.65633 21.7905C5.94885 21.4873 5.31243 21.1005 4.83835 20.6202C4.36003 20.1355 4 19.5024 4 18.75C4 18.1977 4.44772 17.75 5 17.75Z',
  d6: 'M19 19.0254C19 20.6848 15.866 22.0299 12 22.0299C8.13401 22.0299 5 20.6848 5 19.0254',
  d7: 'M11.9998 7.11636C15.0373 7.11636 17.1493 9.60197 16.9989 12.5663V13.9318H14.9313L13.6909 19.0524H10.3074L9.08523 13.9318H7.01758V12.1291C7.13076 9.22546 9.08523 7.24469 11.9998 7.11636ZM11.9998 7.11636C13.5185 7.11636 14.509 5.84995 14.509 4.45402C14.509 3.24678 13.4648 2.02734 11.9998 2.02734C10.5347 2.02734 9.50439 3.19988 9.50439 4.53664C9.50439 5.87341 10.481 7.11636 11.9998 7.11636Z',
  d8: 'M7.44417 19.9522C8.55915 20.43 10.1692 20.75 12 20.75C13.8308 20.75 15.4409 20.43 16.5558 19.9522C17.1151 19.7125 17.5038 19.4528 17.7382 19.2153C17.9683 18.9821 18 18.826 18 18.75H20C20 19.5024 19.64 20.1355 19.1617 20.6202C18.6876 21.1005 18.0512 21.4873 17.3437 21.7905C15.9251 22.3984 14.0352 22.75 12 22.75C9.96482 22.75 8.07486 22.3984 6.65633 21.7905C5.94885 21.4873 5.31243 21.1005 4.83835 20.6202C4.36003 20.1355 4 19.5024 4 18.75H6C6 18.826 6.03173 18.9821 6.26184 19.2153C6.4962 19.4528 6.8849 19.7125 7.44417 19.9522Z',
  d9: 'M15.25 4.55C15.25 5.44011 14.9009 6.25343 14.3306 6.84994C16.3499 7.76165 17.75 9.82127 17.75 12.2V14.65H15.505L14.255 19.75H9.74496L8.49496 14.65H6.25V12.2C6.25 9.82127 7.6501 7.76165 9.66936 6.84994C9.09911 6.25343 8.75 5.44011 8.75 4.55C8.75 2.74153 10.1911 1.25 12 1.25C13.8089 1.25 15.25 2.74153 15.25 4.55Z',
};

export const IconLocationUser02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-stroke-rounded IconLocationUser02StrokeRounded"
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

export const IconLocationUser02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-duotone-rounded IconLocationUser02DuotoneRounded"
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

export const IconLocationUser02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-twotone-rounded IconLocationUser02TwotoneRounded"
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

export const IconLocationUser02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-solid-rounded IconLocationUser02SolidRounded"
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

export const IconLocationUser02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-bulk-rounded IconLocationUser02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconLocationUser02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-stroke-sharp IconLocationUser02StrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationUser02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-02-solid-sharp IconLocationUser02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocationUser02: TheIconSelfPack = {
  name: 'LocationUser02',
  StrokeRounded: IconLocationUser02StrokeRounded,
  DuotoneRounded: IconLocationUser02DuotoneRounded,
  TwotoneRounded: IconLocationUser02TwotoneRounded,
  SolidRounded: IconLocationUser02SolidRounded,
  BulkRounded: IconLocationUser02BulkRounded,
  StrokeSharp: IconLocationUser02StrokeSharp,
  SolidSharp: IconLocationUser02SolidSharp,
};