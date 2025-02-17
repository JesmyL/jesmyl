import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16 16L11.6667 21.6535C11.1282 22.356 10.1188 21.9188 10.1188 20.9829V14.0301C10.1188 13.4695 9.72302 13.015 9.23474 13.015H5.88582C5.12506 13.015 4.71954 11.9851 5.22212 11.3294L7.7741 8',
  d2: 'M10 5.72714L12.4969 2.35038C13.0221 1.63999 14.0067 2.08215 14.0067 3.02843V10.059C14.0067 10.6258 14.3928 11.0854 14.8691 11.0854H18.1359C18.878 11.0854 19.2736 12.1268 18.7833 12.7898L17.8885 14',
  d3: 'M2 2L22 22',
  d4: 'M9.3042 13.0153H5.90035C5.12711 13.0153 4.71494 11.9854 5.22576 11.3297L7.91872 7.87305L16.1355 16.0579L11.776 21.6538C11.2287 22.3563 10.2028 21.919 10.2028 20.9832V14.0303C10.2028 13.4697 9.80048 13.0153 9.3042 13.0153Z',
  d5: 'M8.47099 7.28312C8.26622 7.08398 7.98606 6.9819 7.70118 7.00264C7.4163 7.02338 7.15388 7.16496 6.98012 7.39166L4.42813 10.7211C3.93637 11.3627 3.90444 12.1623 4.14944 12.7845C4.39419 13.4061 4.99626 14.015 5.88551 14.015H9.11793C9.11831 14.0197 9.11853 14.0247 9.11853 14.0301V20.9829C9.11853 21.8278 9.58814 22.5448 10.293 22.8502C11.0246 23.1672 11.9058 22.9849 12.46 22.2618L16.7934 16.6083C17.1018 16.206 17.0603 15.6366 16.6969 15.2831L8.47099 7.28312Z',
  d6: 'M13.4771 3.73254C13.4771 3.63868 13.3595 3.59653 13.2999 3.66904L11.2726 6.1355C10.9219 6.56216 10.2917 6.62373 9.86504 6.27304C9.43839 5.92235 9.37681 5.29218 9.72751 4.86553L12.3204 1.71099C12.8344 1.0256 13.6743 0.826027 14.3899 1.15539C15.068 1.46752 15.4771 2.17291 15.4771 2.95524V9.23477C15.4771 9.34523 15.5667 9.43477 15.6771 9.43477H18.2173C19.0986 9.43477 19.6531 10.071 19.8668 10.6476C20.0835 11.2323 20.0591 11.9862 19.6147 12.6021C19.603 12.6184 19.5908 12.6343 19.5781 12.6498L18.7743 13.6333C18.4249 14.061 17.7949 14.1243 17.3672 13.7748C16.9396 13.4253 16.8762 12.7954 17.2257 12.3677L17.8547 11.5981C17.9081 11.5327 17.8616 11.4348 17.7773 11.4348H15.2583C14.098 11.4348 13.4771 10.3655 13.4771 9.48196V3.73254Z',
  d7: 'M2 2.43042L22 21.3956',
  d8: 'M9.89114 6.88688L14.0315 2.40039V10.4848H19.0406L16.8718 13.6059M15.5525 15.157L10.5142 21.3727V12.8966H4.96875L8.52012 8.53781',
  d9: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d10: 'M10 22.75V13.5H4L8.26966 8.26966L15.7303 15.7303L10 22.75Z',
  d11: 'M20 10.5L17.3193 13.7838L14.0355 10.5L14 10.4645L9.85867 6.32313L14 1.25V10.4645L14.0355 10.5H20Z',
};

export const IconFlashOffStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-stroke-rounded IconFlashOffStrokeRounded"
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

export const IconFlashOffDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-duotone-rounded IconFlashOffDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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

export const IconFlashOffTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-twotone-rounded IconFlashOffTwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashOffSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-solid-rounded IconFlashOffSolidRounded"
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
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashOffBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-bulk-rounded IconFlashOffBulkRounded"
    >
      <path 
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashOffStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-stroke-sharp IconFlashOffStrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFlashOffSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="flash-off-solid-sharp IconFlashOffSolidSharp"
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
    </TheIconWrapper>
  );
};

export const iconPackOfFlashOff: TheIconSelfPack = {
  name: 'FlashOff',
  StrokeRounded: IconFlashOffStrokeRounded,
  DuotoneRounded: IconFlashOffDuotoneRounded,
  TwotoneRounded: IconFlashOffTwotoneRounded,
  SolidRounded: IconFlashOffSolidRounded,
  BulkRounded: IconFlashOffBulkRounded,
  StrokeSharp: IconFlashOffStrokeSharp,
  SolidSharp: IconFlashOffSolidSharp,
};