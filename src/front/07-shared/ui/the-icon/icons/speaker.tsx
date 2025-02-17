import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M20.5 13.5V10.5C20.5 6.74142 20.5 4.86213 19.4472 3.60746C19.2788 3.40678 19.0932 3.22119 18.8925 3.0528C17.6379 2 15.7586 2 12 2C8.24142 2 6.36213 2 5.10746 3.0528C4.90678 3.22119 4.72119 3.40678 4.5528 3.60746C3.5 4.86213 3.5 6.74142 3.5 10.5V13.5C3.5 17.2586 3.5 19.1379 4.5528 20.3925C4.72119 20.5932 4.90678 20.7788 5.10746 20.9472C6.36213 22 8.24142 22 12 22C15.7586 22 17.6379 22 18.8925 20.9472C19.0932 20.7788 19.2788 20.5932 19.4472 20.3925C20.5 19.1379 20.5 17.2586 20.5 13.5Z',
  d2: 'M15.5 15C15.5 16.933 13.933 18.5 12 18.5C10.067 18.5 8.5 16.933 8.5 15C8.5 13.067 10.067 11.5 12 11.5C13.933 11.5 15.5 13.067 15.5 15Z',
  d3: 'M13.5 7C13.5 7.82843 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.82843 10.5 7C10.5 6.17157 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.17157 13.5 7Z',
  d4: 'M20.5 13.5V10.5C20.5 6.74142 20.5 4.86213 19.4472 3.60746C19.2788 3.40678 19.0932 3.22119 18.8925 3.0528C17.6379 2 15.7586 2 12 2C8.24142 2 6.36213 2 5.10746 3.0528C4.90678 3.22119 4.72119 3.40678 4.5528 3.60746C3.5 4.86213 3.5 6.74142 3.5 10.5V13.5C3.5 17.2586 3.5 19.1379 4.5528 20.3925C4.72119 20.5932 4.90678 20.7788 5.10746 20.9472C6.36213 22 8.24142 22 12 22C15.7586 22 17.6379 22 18.8925 20.9472C19.0932 20.7788 19.2788 20.5932 19.4472 20.3925C20.5 19.1379 20.5 17.2586 20.5 13.5ZM15.5 15C15.5 16.933 13.933 18.5 12 18.5C10.067 18.5 8.5 16.933 8.5 15C8.5 13.067 10.067 11.5 12 11.5C13.933 11.5 15.5 13.067 15.5 15ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z',
  d5: 'M12.0502 1.25C13.8869 1.24999 15.3334 1.24998 16.4746 1.38694C17.6432 1.5272 18.5905 1.8203 19.3746 2.47827C19.6088 2.67472 19.8253 2.89124 20.0217 3.12537C20.6797 3.9095 20.9728 4.85678 21.1131 6.02539C21.25 7.16654 21.25 8.61298 21.25 10.4497V10.4497V10.4497V10.4497V13.5502V13.5502V13.5503V13.5503C21.25 15.387 21.25 16.8335 21.1131 17.9746C20.9728 19.1432 20.6797 20.0905 20.0217 20.8746C19.8253 21.1088 19.6088 21.3253 19.3746 21.5217C18.5905 22.1797 17.6432 22.4728 16.4746 22.6131C15.3335 22.75 13.887 22.75 12.0503 22.75H12.0503H12.0503H12.0503H11.9498H11.9498H11.9497H11.9497C10.113 22.75 8.66654 22.75 7.52539 22.6131C6.35678 22.4728 5.4095 22.1797 4.62537 21.5217C4.39124 21.3253 4.17472 21.1088 3.97827 20.8746C3.3203 20.0905 3.0272 19.1432 2.88694 17.9746C2.74998 16.8334 2.74999 15.3869 2.75 13.5502V10.4498C2.74999 8.61307 2.74998 7.16657 2.88694 6.02539C3.0272 4.85678 3.3203 3.9095 3.97827 3.12537C4.17472 2.89124 4.39124 2.67472 4.62537 2.47827C5.4095 1.8203 6.35678 1.5272 7.52539 1.38694C8.66657 1.24998 10.1131 1.24999 11.9498 1.25H12.0502ZM12 5C11.1716 5 10.5 5.67157 10.5 6.5C10.5 7.32843 11.1716 8 12 8C12.8284 8 13.5 7.32843 13.5 6.5C13.5 5.67157 12.8284 5 12 5ZM12 12C10.067 12 8.5 13.567 8.5 15.5C8.5 17.433 10.067 19 12 19C13.933 19 15.5 17.433 15.5 15.5C15.5 13.567 13.933 12 12 12Z',
  d6: 'M12.0502 1.25C13.8869 1.24999 15.3334 1.24998 16.4746 1.38694C17.6432 1.5272 18.5905 1.8203 19.3746 2.47827C19.6088 2.67472 19.8253 2.89124 20.0217 3.12537C20.6797 3.9095 20.9728 4.85678 21.1131 6.02539C21.25 7.16655 21.25 8.613 21.25 10.4497V10.4497V13.5502V13.5502C21.25 15.3869 21.25 16.8335 21.1131 17.9746C20.9728 19.1432 20.6797 20.0905 20.0217 20.8746C19.8253 21.1088 19.6088 21.3253 19.3746 21.5217C18.5905 22.1797 17.6432 22.4728 16.4746 22.6131C15.3335 22.75 13.887 22.75 12.0503 22.75H12.0503H11.9498H11.9498C10.1131 22.75 8.66655 22.75 7.52539 22.6131C6.35678 22.4728 5.4095 22.1797 4.62537 21.5217C4.39124 21.3253 4.17472 21.1088 3.97827 20.8746C3.3203 20.0905 3.0272 19.1432 2.88694 17.9746C2.74998 16.8334 2.74999 15.3869 2.75 13.5502V10.4498C2.74999 8.61307 2.74998 7.16657 2.88694 6.02539C3.0272 4.85678 3.3203 3.9095 3.97827 3.12537C4.17472 2.89124 4.39124 2.67472 4.62537 2.47827C5.4095 1.8203 6.35678 1.5272 7.52539 1.38694C8.66657 1.24998 10.1131 1.24999 11.9498 1.25H12.0502Z',
  d7: 'M12 5C11.1716 5 10.5 5.67157 10.5 6.5C10.5 7.32843 11.1716 8 12 8C12.8284 8 13.5 7.32843 13.5 6.5C13.5 5.67157 12.8284 5 12 5Z',
  d8: 'M8.5 15.5C8.5 13.567 10.067 12 12 12C13.933 12 15.5 13.567 15.5 15.5C15.5 17.433 13.933 19 12 19C10.067 19 8.5 17.433 8.5 15.5Z',
  d9: 'M3.5 2L3.5 22L20.5 22V2L3.5 2Z',
  d10: 'M3.5 1.25H20.5C20.6989 1.25 20.8897 1.32902 21.0303 1.46967C21.171 1.61032 21.25 1.80109 21.25 2V22C21.25 22.4142 20.9142 22.75 20.5 22.75L3.5 22.75C3.30109 22.75 3.11032 22.671 2.96967 22.5303C2.82902 22.3897 2.75 22.1989 2.75 22V2C2.75 1.58579 3.08579 1.25 3.5 1.25ZM7.75 15.5C7.75 13.1528 9.65279 11.25 12 11.25C14.3472 11.25 16.25 13.1528 16.25 15.5C16.25 17.8472 14.3472 19.75 12 19.75C9.65279 19.75 7.75 17.8472 7.75 15.5ZM12 4.25C10.7574 4.25 9.75 5.25736 9.75 6.5C9.75 7.74264 10.7574 8.75 12 8.75C13.2426 8.75 14.25 7.74264 14.25 6.5C14.25 5.25736 13.2426 4.25 12 4.25Z',
};

export const IconSpeakerStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-stroke-rounded IconSpeakerStrokeRounded"
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeakerDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-duotone-rounded IconSpeakerDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
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
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeakerTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-twotone-rounded IconSpeakerTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeakerSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-solid-rounded IconSpeakerSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeakerBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-bulk-rounded IconSpeakerBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
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

export const IconSpeakerStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-stroke-sharp IconSpeakerStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconSpeakerSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-solid-sharp IconSpeakerSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSpeaker: TheIconSelfPack = {
  name: 'Speaker',
  StrokeRounded: IconSpeakerStrokeRounded,
  DuotoneRounded: IconSpeakerDuotoneRounded,
  TwotoneRounded: IconSpeakerTwotoneRounded,
  SolidRounded: IconSpeakerSolidRounded,
  BulkRounded: IconSpeakerBulkRounded,
  StrokeSharp: IconSpeakerStrokeSharp,
  SolidSharp: IconSpeakerSolidSharp,
};