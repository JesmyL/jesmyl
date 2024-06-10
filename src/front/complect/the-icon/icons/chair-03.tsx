import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7 12H17',
  d2: 'M7 15H17',
  d3: 'M7.5 6L6 22M16.5 6L18 22',
  d4: 'M12 2C10.4783 2 8.86931 2.29246 7.60803 2.68377C6.6583 2.97841 5.89434 4.32201 6.01199 5.41276C6.05558 5.81688 6.36877 6 6.69807 6H17.3019C17.6312 6 17.9444 5.81688 17.988 5.41276C18.1057 4.32202 17.3417 2.97841 16.392 2.68377C15.1307 2.29246 13.5217 2 12 2Z',
  d5: 'M6 22L6.65625 15M18 22L17.3438 15M6.9375 12L7.5 6H16.5L17.0625 12M6.9375 12H7H17H17.0625M6.9375 12L6.65625 15M6.65625 15H7H17H17.3438M17.3438 15L17.0625 12',
  d6: 'M7.59341 4.87931C8.14328 4.93086 8.54725 5.41841 8.4957 5.96829L8.0357 10.8749H15.9644L15.5044 5.96829C15.4529 5.41841 15.8569 4.93086 16.4067 4.87931C16.9566 4.82776 17.4442 5.23173 17.4957 5.7816L18.9957 21.7816C19.0473 22.3315 18.6433 22.819 18.0934 22.8706C17.5435 22.9221 17.056 22.5182 17.0044 21.9683L16.4332 15.8749H7.56695L6.9957 21.9683C6.94415 22.5182 6.4566 22.9221 5.90673 22.8706C5.35685 22.819 4.95288 22.3315 5.00443 21.7816L6.50443 5.7816C6.55598 5.23173 7.04353 4.82776 7.59341 4.87931Z',
  d7: 'M12.0001 1.125C13.6078 1.125 15.2919 1.43219 16.6143 1.84245C17.3289 2.06413 17.8868 2.64035 18.2393 3.24869C18.5962 3.86466 18.8132 4.6319 18.7338 5.3682C18.6911 5.76419 18.5042 6.10019 18.2101 6.32691C17.93 6.54286 17.5993 6.625 17.302 6.625H12.0001L6.69811 6.62507C6.40087 6.62507 6.07014 6.54293 5.79002 6.32698C5.49593 6.10026 5.30907 5.76425 5.26636 5.36826C5.18694 4.63196 5.40392 3.86473 5.76087 3.24876C6.11338 2.64042 6.67129 2.0642 7.38584 1.84251C8.70822 1.43226 10.3924 1.125 12.0001 1.125Z',
  d8: 'M7.56641 15.875H16.4326L15.9639 10.875H8.03516L7.56641 15.875Z',
  d9: 'M18.9957 21.781L17.5726 6.60156C17.481 6.6173 17.39 6.6245 17.302 6.6245H15.566L16.4332 15.8743L17.0044 21.9677C17.056 22.5175 17.5435 22.9215 18.0934 22.87C18.6433 22.8184 19.0473 22.3309 18.9957 21.781Z',
  d10: 'M6.9957 21.9677L8.0357 10.8743L8.43412 6.62454L6.69811 6.62457C6.61012 6.62457 6.51918 6.61737 6.4275 6.60163L5.00443 21.781C4.95288 22.3309 5.35685 22.8184 5.90673 22.87C6.4566 22.9215 6.94415 22.5175 6.9957 21.9677Z',
  d11: 'M6 6H18V5C18 3.34315 16.8487 2 15.4286 2H8.57143C7.15127 2 6 3.34315 6 5V6Z',
  d12: 'M7.00049 16.249V11.749H17.0005V16.249H7.00049Z',
  d13: 'M5 22.0642L6.50094 6.06421L8.49345 6.25089L6.99251 22.2509L5 22.0642ZM17.0075 22.2509L15.5066 6.25089L17.4991 6.06421L19 22.0642L17.0075 22.2509Z',
  d14: 'M5.25049 5.49927C5.25049 3.54083 6.63324 1.74927 8.57192 1.74927H15.4291C17.3677 1.74927 18.7505 3.54083 18.7505 5.49927V7.24927H5.25049V5.49927Z',
};

export const IconChair03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-stroke-rounded IconChair03StrokeRounded"
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
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChair03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-duotone-rounded IconChair03DuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChair03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-twotone-rounded IconChair03TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconChair03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-solid-rounded IconChair03SolidRounded"
    >
      <path 
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

export const IconChair03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-bulk-rounded IconChair03BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconChair03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-stroke-sharp IconChair03StrokeSharp"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconChair03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="chair-03-solid-sharp IconChair03SolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfChair03: TheIconSelfPack = {
  name: 'Chair03',
  StrokeRounded: IconChair03StrokeRounded,
  DuotoneRounded: IconChair03DuotoneRounded,
  TwotoneRounded: IconChair03TwotoneRounded,
  SolidRounded: IconChair03SolidRounded,
  BulkRounded: IconChair03BulkRounded,
  StrokeSharp: IconChair03StrokeSharp,
  SolidSharp: IconChair03SolidSharp,
};