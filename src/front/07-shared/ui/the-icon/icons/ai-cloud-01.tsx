import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.4776 8.00005C17.485 8.00002 17.4925 8 17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.0602 21.206 15.435 20 16.2422M17.4776 8.00005C17.4924 7.83536 17.5 7.66856 17.5 7.5C17.5 4.46243 15.0376 2 12 2C9.12324 2 6.76233 4.20862 6.52042 7.0227M17.4776 8.00005C17.4131 8.71494 17.2119 9.39038 16.9003 10M6.52042 7.0227C3.98398 7.26407 2 9.40034 2 12C2 13.7891 2.93963 15.3587 4.35232 16.2422M6.52042 7.0227C6.67826 7.00768 6.83823 7 7 7C8.12582 7 9.16474 7.37209 10.0005 8',
  d2: 'M13 14H11C10.0572 14 9.58579 14 9.29289 14.2929C9 14.5858 9 15.0572 9 16V18C9 18.9428 9 19.4142 9.29289 19.7071C9.58579 20 10.0572 20 11 20H13C13.9428 20 14.4142 20 14.7071 19.7071C15 19.4142 15 18.9428 15 18V16C15 15.0572 15 14.5858 14.7071 14.2929C14.4142 14 13.9428 14 13 14Z',
  d3: 'M10.5 20V22M13.5 20V22M10.5 12V14M13.5 12V14M9 15.5H7M9 18.5H7M17 15.5H15M17 18.5H15',
  d4: 'M12 2C15.0376 2 17.5 4.46243 17.5 7.5C17.5 7.66856 17.4924 7.83536 17.4776 8.00005L17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.0602 21.206 15.435 20 16.2422H15V16C15 15.0572 15 14.5858 14.7071 14.2929C14.4142 14 13.9428 14 13 14H11C10.0572 14 9.58579 14 9.29289 14.2929C9 14.5858 9 15.0572 9 16V16.2422H4.35232C2.93963 15.3587 2 13.7891 2 12C2 9.40034 3.98398 7.26407 6.52042 7.0227C6.76233 4.20862 9.12324 2 12 2Z',
  d5: 'M17.4776 8.00103C17.485 8.001 17.4925 8.00098 17.5 8.00098C19.9853 8.00098 22 10.0157 22 12.501C22 14.0612 21.206 15.436 20 16.2432M17.4776 8.00103C17.4924 7.83634 17.5 7.66954 17.5 7.50098C17.5 4.46341 15.0376 2.00098 12 2.00098C9.12324 2.00098 6.76233 4.2096 6.52042 7.02368M17.4776 8.00103C17.4131 8.71592 17.2119 9.39136 16.9003 10.001M6.52042 7.02368C3.98398 7.26505 2 9.40132 2 12.001C2 13.7901 2.93963 15.3597 4.35232 16.2432M6.52042 7.02368C6.67826 7.00866 6.83823 7.00098 7 7.00098C8.12582 7.00098 9.16474 7.37307 10.0005 8.00098',
  d6: 'M10.4521 12.001V13.98M6.97168 15.5014H9.01981M14.9797 15.5014H17.0278M14.9797 18.4746H17.0278M6.97168 18.4746H9.01981M10.4521 20.0202V21.9992M13.4719 20.0202V21.9992M13.4612 12.001V13.98M10.0179 19.9685H13.9816C14.5328 19.9685 14.9797 19.5208 14.9797 18.9685V14.98C14.9797 14.4277 14.5328 13.98 13.9816 13.98H10.0179C9.46668 13.98 9.01981 14.4277 9.01981 14.98V18.9685C9.01981 19.5208 9.46668 19.9685 10.0179 19.9685Z',
  d7: 'M10.5 11.25C10.9142 11.25 11.25 11.5858 11.25 12V13.25H12.75V12C12.75 11.5858 13.0858 11.25 13.5 11.25C13.9142 11.25 14.25 11.5858 14.25 12V13.3009C14.5896 13.3527 14.9437 13.4688 15.2374 13.7626C15.5312 14.0563 15.6473 14.4104 15.6991 14.75H17C17.4142 14.75 17.75 15.0858 17.75 15.5C17.75 15.9142 17.4142 16.25 17 16.25H15.75V17.75H17C17.4142 17.75 17.75 18.0858 17.75 18.5C17.75 18.9142 17.4142 19.25 17 19.25H15.6991C15.6473 19.5896 15.5312 19.9437 15.2374 20.2374C14.9437 20.5312 14.5896 20.6473 14.25 20.6991V22C14.25 22.4142 13.9142 22.75 13.5 22.75C13.0858 22.75 12.75 22.4142 12.75 22V20.75H11.25V22C11.25 22.4142 10.9142 22.75 10.5 22.75C10.0858 22.75 9.75 22.4142 9.75 22V20.6991C9.41037 20.6473 9.05633 20.5312 8.76256 20.2374C8.4688 19.9437 8.35268 19.5896 8.30087 19.25H7C6.58579 19.25 6.25 18.9142 6.25 18.5C6.25 18.0858 6.58579 17.75 7 17.75H8.25V16.25H7C6.58579 16.25 6.25 15.9142 6.25 15.5C6.25 15.0858 6.58579 14.75 7 14.75H8.30087C8.35268 14.4104 8.4688 14.0563 8.76256 13.7626C9.05633 13.4688 9.41037 13.3527 9.75 13.3009V12C9.75 11.5858 10.0858 11.25 10.5 11.25Z',
  d8: 'M5.853 6.36454C3.22664 6.89643 1.25 9.21699 1.25 12C1.25 14.4851 2.82648 16.602 5.03391 17.4051C5.11527 17.2593 5.21237 17.1235 5.32292 17C4.96664 16.6019 4.75 16.0763 4.75 15.5C4.75 14.2574 6.02583 13.25 7.26847 13.25C7.38325 13.0635 7.52541 12.8784 7.7019 12.7019C7.87839 12.5254 8.06351 12.3833 8.25 12.2685C8.25 11.0258 9.25736 9.75 10.5 9.75C11.0763 9.75 11.6019 9.96664 12 10.3229C12.3981 9.96664 12.9237 9.75 13.5 9.75C14.7426 9.75 15.75 11.0258 15.75 12.2685C15.9365 12.3833 16.1216 12.5254 16.2981 12.7019C16.4746 12.8784 16.6167 13.0635 16.7315 13.25C17.9742 13.25 19.25 14.2574 19.25 15.5C19.25 16.0763 19.0334 16.6019 18.6771 17C18.8172 17.1566 18.9357 17.3328 19.028 17.5242C21.1822 16.8699 22.75 14.868 22.75 12.5C22.75 9.85409 20.7927 7.66534 18.2469 7.30273C18.1428 3.94224 15.3858 1.25 12 1.25C8.93585 1.25 6.38731 3.45456 5.853 6.36454Z',
  d9: 'M15 14H9V20H15V14Z',
  d10: 'M9.75 13.5V11.75H11.25V13.5H12.75V11.75H14.25V13.5H15.75V15H17.5V16.5H15.75V18H17.5V19.5H15.75V21H14.25V22.75H12.75V21H11.25V22.75H9.75V21H8.25V19.5H6.5V18H8.25V16.5H6.5V15H8.25V13.5H9.75Z',
  d11: 'M5.853 6.36454C3.22664 6.89643 1.25 9.21699 1.25 12C1.25 14.4723 2.81035 16.5802 5 17.3926V13.5H6.75V12H8.25V10.25H15.75V12H17.25V13.5H19V17.5326C21.1686 16.8872 22.75 14.8783 22.75 12.5C22.75 9.85409 20.7927 7.66534 18.2469 7.30273C18.1428 3.94224 15.3858 1.25 12 1.25C8.93585 1.25 6.38731 3.45456 5.853 6.36454Z',
};

export const IconAiCloud01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-stroke-rounded IconAiCloud01StrokeRounded"
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

export const IconAiCloud01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-duotone-rounded IconAiCloud01DuotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-twotone-rounded IconAiCloud01TwotoneRounded"
    >
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-solid-rounded IconAiCloud01SolidRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-bulk-rounded IconAiCloud01BulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-stroke-sharp IconAiCloud01StrokeSharp"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAiCloud01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ai-cloud-01-solid-sharp IconAiCloud01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAiCloud01: TheIconSelfPack = {
  name: 'AiCloud01',
  StrokeRounded: IconAiCloud01StrokeRounded,
  DuotoneRounded: IconAiCloud01DuotoneRounded,
  TwotoneRounded: IconAiCloud01TwotoneRounded,
  SolidRounded: IconAiCloud01SolidRounded,
  BulkRounded: IconAiCloud01BulkRounded,
  StrokeSharp: IconAiCloud01StrokeSharp,
  SolidSharp: IconAiCloud01SolidSharp,
};