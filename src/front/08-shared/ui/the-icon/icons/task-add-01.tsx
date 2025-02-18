import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 15L18 22M21.5 18.5L14.5 18.5',
  d2: 'M7 16H11M7 11H15',
  d3: 'M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H11.5M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12',
  d4: 'M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z',
  d5: 'M6.51382 3.5C6.50214 3.58165 6.49609 3.66512 6.49609 3.75C6.49609 4.7165 7.2796 5.5 8.24609 5.5H13.7461C14.7126 5.5 15.4961 4.7165 15.4961 3.75C15.4961 3.66512 15.4901 3.58165 15.4784 3.5H15.4922C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V15.9944C19.4961 18.8255 19.4961 20.241 18.6174 21.1205C17.7387 22 16.3245 22 13.4961 22L8.49609 22C5.66767 22 4.25345 22 3.37477 21.1205C2.49609 20.241 2.49609 18.8255 2.49609 15.9944V9.48836C2.49609 6.6573 2.49609 5.24177 3.37477 4.36227C4.01661 3.71984 4.9442 3.54667 6.5 3.5H6.51382Z',
  d6: 'M7 16H11',
  d7: 'M7 11H15',
  d8: 'M4.96123 2.7279C5.04903 2.71579 5.12494 2.7875 5.12494 2.87613C5.12494 4.53298 6.46809 5.87613 8.12494 5.87613L13.6249 5.87613C15.2818 5.87613 16.6249 4.53298 16.6249 2.87613C16.6249 2.7875 16.7009 2.71579 16.7887 2.7279C17.6888 2.85205 18.4364 3.11736 19.0268 3.70832C19.6286 4.31067 19.8874 5.06903 20.0084 5.96977C20.125 6.83746 20.125 7.94074 20.1249 9.30969L20.1249 12.9156C20.1249 13.2429 20.1249 13.4065 20.0638 13.4323C20.0027 13.4581 19.8745 13.3334 19.6181 13.0839C19.1677 12.6458 18.5528 12.376 17.8749 12.376C16.4942 12.376 15.3749 13.4953 15.3749 14.876V15.276C15.3749 15.5588 15.3749 15.7002 15.2871 15.7881C15.1992 15.876 15.0578 15.876 14.7749 15.876H14.7749H14.3749C12.9942 15.876 11.8749 16.9953 11.8749 18.376C11.8749 19.7567 12.9942 20.876 14.3749 20.876H14.7749C15.0578 20.876 15.1992 20.876 15.2871 20.9638C15.3749 21.0517 15.3749 21.1931 15.3749 21.476V21.876C15.3749 22.243 15.3749 22.4266 15.305 22.5101C15.2925 22.5251 15.2849 22.5328 15.2701 22.5455C15.1873 22.6164 15.0392 22.6181 14.743 22.6215C14.3356 22.6261 13.8983 22.6261 13.4299 22.6261L8.32 22.6261C6.95246 22.6261 5.85011 22.6262 4.9831 22.5095C4.08287 22.3883 3.32494 22.1292 2.72305 21.5267C2.12125 20.9244 1.86244 20.166 1.74145 19.2653C1.62491 18.3976 1.62492 17.2943 1.62494 15.9255V15.9254L1.62494 9.30963V9.3096C1.62492 7.94071 1.62491 6.83743 1.74145 5.96977C1.86244 5.06903 2.12125 4.31067 2.72305 3.70832C3.31346 3.11736 4.06113 2.85205 4.96123 2.7279ZM6.87494 10.125C6.46073 10.125 6.12494 10.4608 6.12494 10.875C6.12494 11.2892 6.46073 11.625 6.87494 11.625L14.8749 11.625C15.2892 11.625 15.6249 11.2892 15.6249 10.875C15.6249 10.4608 15.2892 10.125 14.8749 10.125L6.87494 10.125ZM6.87494 15.125C6.46073 15.125 6.12494 15.4608 6.12494 15.875C6.12494 16.2892 6.46073 16.625 6.87494 16.625H10.8749C11.2892 16.625 11.6249 16.2892 11.6249 15.875C11.6249 15.4608 11.2892 15.125 10.8749 15.125H6.87494Z',
  d9: 'M6.37494 2.875C6.37494 1.9085 7.15844 1.125 8.12494 1.125H13.6249C14.5914 1.125 15.3749 1.9085 15.3749 2.875C15.3749 3.8415 14.5914 4.625 13.6249 4.625H8.12494C7.15844 4.625 6.37494 3.8415 6.37494 2.875Z',
  d10: 'M17.875 13.875C18.4273 13.875 18.875 14.3227 18.875 14.875V17.375L21.375 17.375C21.9273 17.375 22.375 17.8227 22.375 18.375C22.375 18.9273 21.9273 19.375 21.375 19.375L18.875 19.375V21.875C18.875 22.4273 18.4273 22.875 17.875 22.875C17.3227 22.875 16.875 22.4273 16.875 21.875V19.375L14.375 19.375C13.8227 19.375 13.375 18.9273 13.375 18.375C13.375 17.8227 13.8227 17.375 14.375 17.375L16.875 17.375V14.875C16.875 14.3227 17.3227 13.875 17.875 13.875Z',
  d11: 'M5.12494 2.87613C5.12494 2.7875 5.04903 2.71579 4.96123 2.7279C4.06112 2.85205 3.31346 3.11736 2.72305 3.70832C2.12125 4.31067 1.86244 5.06903 1.74145 5.96977C1.62491 6.83743 1.62492 7.94072 1.62494 9.30963V15.9254C1.62492 17.2943 1.62491 18.3976 1.74145 19.2653C1.86244 20.166 2.12125 20.9244 2.72305 21.5267C3.32493 22.1292 4.08286 22.3883 4.9831 22.5095C5.85011 22.6262 6.95246 22.6261 8.32 22.6261L13.4299 22.6261C13.8983 22.6261 14.3356 22.6261 14.743 22.6215C15.0392 22.6181 15.1873 22.6164 15.2701 22.5455C15.2849 22.5328 15.2925 22.5251 15.305 22.5101C15.3749 22.4266 15.3749 22.243 15.3749 21.876V21.476C15.3749 21.1931 15.3749 21.0517 15.2871 20.9638C15.1992 20.876 15.0578 20.876 14.7749 20.876H14.3749C12.9942 20.876 11.8749 19.7567 11.8749 18.376C11.8749 16.9953 12.9942 15.876 14.3749 15.876H14.7749C15.0578 15.876 15.1992 15.876 15.2871 15.7881C15.3749 15.7002 15.3749 15.5588 15.3749 15.276V14.876C15.3749 13.4953 16.4942 12.376 17.8749 12.376C18.5528 12.376 19.1677 12.6458 19.6181 13.0839C19.8745 13.3334 20.0027 13.4581 20.0638 13.4323C20.1249 13.4065 20.1249 13.2429 20.1249 12.9156V9.30969C20.125 7.94074 20.125 6.83746 20.0084 5.96977C19.8874 5.06903 19.6286 4.31067 19.0268 3.70832C18.4364 3.11736 17.6888 2.85205 16.7887 2.7279C16.7009 2.71579 16.6249 2.7875 16.6249 2.87613C16.6249 4.53298 15.2818 5.87613 13.6249 5.87613H8.12494C6.46809 5.87613 5.12494 4.53298 5.12494 2.87613Z',
  d12: 'M6.12494 10.875C6.12494 10.4608 6.46073 10.125 6.87494 10.125H14.8749C15.2892 10.125 15.6249 10.4608 15.6249 10.875C15.6249 11.2892 15.2892 11.625 14.8749 11.625H6.87494C6.46073 11.625 6.12494 11.2892 6.12494 10.875ZM6.12494 15.875C6.12494 15.4608 6.46073 15.125 6.87494 15.125H10.8749C11.2892 15.125 11.6249 15.4608 11.6249 15.875C11.6249 16.2892 11.2892 16.625 10.8749 16.625H6.87494C6.46073 16.625 6.12494 16.2892 6.12494 15.875Z',
  d13: 'M15 3.5H19.5V13M7 3.5H2.5V22H13',
  d14: 'M15 2H7V5H15V2Z',
  d15: 'M6.5 16H11.5M6.5 11H15.5',
  d16: 'M17.75 18.25V15.75H19.75V18.25L22.25 18.25V20.25L19.75 20.25V22.75H17.75V20.25L15.25 20.25V18.25L17.75 18.25Z',
  d17: 'M7 1.25H15V4.75H7V1.25Z',
  d18: 'M5.75 3H2.5C2.08579 3 1.75 3.33579 1.75 3.75V22C1.75 22.4142 2.08579 22.75 2.5 22.75L16.25 22.75V21.75L13.75 21.75V16.75L16.25 16.75V14.25H20.25V3.75C20.25 3.33579 19.9142 3 19.5 3H16.25V6H5.75L5.75 3ZM6.5 11.75H15.5V10.25H6.5V11.75ZM6.5 16.75H11.5V15.25H6.5V16.75Z',
};

export const IconTaskAdd01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-stroke-rounded IconTaskAdd01StrokeRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskAdd01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-duotone-rounded IconTaskAdd01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskAdd01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-twotone-rounded IconTaskAdd01TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskAdd01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-solid-rounded IconTaskAdd01SolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskAdd01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-bulk-rounded IconTaskAdd01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconTaskAdd01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-stroke-sharp IconTaskAdd01StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskAdd01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-add-01-solid-sharp IconTaskAdd01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskAdd01: TheIconSelfPack = {
  name: 'TaskAdd01',
  StrokeRounded: IconTaskAdd01StrokeRounded,
  DuotoneRounded: IconTaskAdd01DuotoneRounded,
  TwotoneRounded: IconTaskAdd01TwotoneRounded,
  SolidRounded: IconTaskAdd01SolidRounded,
  BulkRounded: IconTaskAdd01BulkRounded,
  StrokeSharp: IconTaskAdd01StrokeSharp,
  SolidSharp: IconTaskAdd01SolidSharp,
};