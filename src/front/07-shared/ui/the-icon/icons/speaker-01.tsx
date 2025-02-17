import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 10C3.5 6.22876 3.5 4.34315 4.7448 3.17157C5.98959 2 7.99306 2 12 2C16.0069 2 18.0104 2 19.2552 3.17157C20.5 4.34315 20.5 6.22876 20.5 10V14C20.5 17.7712 20.5 19.6569 19.2552 20.8284C18.0104 22 16.0069 22 12 22C7.99306 22 5.98959 22 4.7448 20.8284C3.5 19.6569 3.5 17.7712 3.5 14V10Z',
  d2: 'M10 6H14',
  d3: 'M4.7448 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V14C3.5 17.7712 3.5 19.6569 4.7448 20.8284C5.98959 22 7.99306 22 12 22C16.0069 22 18.0104 22 19.2552 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V10C20.5 6.22876 20.5 4.34315 19.2552 3.17157C18.0104 2 16.0069 2 12 2C7.99306 2 5.98959 2 4.7448 3.17157ZM12 18C13.933 18 15.5 16.433 15.5 14.5C15.5 12.567 13.933 11 12 11C10.067 11 8.5 12.567 8.5 14.5C8.5 16.433 10.067 18 12 18Z',
  d4: 'M12.0537 1.25C14.0117 1.24999 15.5532 1.24998 16.7576 1.40238C17.9901 1.55834 18.9829 1.88535 19.7692 2.62542C20.562 3.37155 20.9182 4.32381 21.0869 5.50485C21.25 6.6471 21.25 8.10537 21.25 9.94047V14.0595C21.25 15.8946 21.25 17.3529 21.0869 18.4951C20.9182 19.6762 20.562 20.6284 19.7692 21.3746C18.9829 22.1147 17.9901 22.4417 16.7576 22.5976C15.5532 22.75 14.0116 22.75 12.0537 22.75H11.9463C9.98836 22.75 8.44685 22.75 7.24244 22.5976C6.0099 22.4417 5.01711 22.1147 4.23077 21.3746C3.43801 20.6284 3.08185 19.6762 2.91314 18.4951C2.74997 17.3529 2.74998 15.8946 2.75 14.0595V14.0595V9.9405V9.94049C2.74998 8.10538 2.74997 6.64711 2.91314 5.50485C3.08185 4.32381 3.43801 3.37155 4.23077 2.62542C5.01711 1.88535 6.0099 1.55834 7.24244 1.40238C8.44685 1.24998 9.98835 1.24999 11.9463 1.25H12.0537ZM7.75 14.5C7.75 12.1528 9.65279 10.25 12 10.25C14.3472 10.25 16.25 12.1528 16.25 14.5C16.25 16.8472 14.3472 18.75 12 18.75C9.65279 18.75 7.75 16.8472 7.75 14.5ZM10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5H10Z',
  d5: 'M12.0537 1.25C14.0117 1.24999 15.5532 1.24998 16.7576 1.40238C17.9901 1.55834 18.9829 1.88535 19.7692 2.62542C20.562 3.37155 20.9182 4.32381 21.0869 5.50485C21.25 6.6471 21.25 8.10537 21.25 9.94047V14.0595C21.25 15.8946 21.25 17.3529 21.0869 18.4951C20.9182 19.6762 20.562 20.6284 19.7692 21.3746C18.9829 22.1147 17.9901 22.4417 16.7576 22.5976C15.5532 22.75 14.0116 22.75 12.0537 22.75H11.9463C9.98836 22.75 8.44685 22.75 7.24244 22.5976C6.0099 22.4417 5.01711 22.1147 4.23077 21.3746C3.43801 20.6284 3.08185 19.6762 2.91314 18.4951C2.74997 17.3529 2.74998 15.8946 2.75 14.0595V14.0595V9.9405V9.94049C2.74998 8.10538 2.74997 6.64711 2.91314 5.50485C3.08185 4.32381 3.43801 3.37155 4.23077 2.62542C5.01711 1.88535 6.0099 1.55834 7.24244 1.40238C8.44685 1.24998 9.98835 1.24999 11.9463 1.25H12.0537Z',
  d6: 'M7.75 14.5C7.75 12.1528 9.65279 10.25 12 10.25C14.3472 10.25 16.25 12.1528 16.25 14.5C16.25 16.8472 14.3472 18.75 12 18.75C9.65279 18.75 7.75 16.8472 7.75 14.5Z',
  d7: 'M9 6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772 15 6C15 6.55228 14.5523 7 14 7H10C9.44772 7 9 6.55228 9 6Z',
  d8: 'M4 22H20V2H4V22Z',
  d9: 'M9 6H15',
  d10: 'M3.25 2C3.25 1.58579 3.58579 1.25 4 1.25H20C20.4142 1.25 20.75 1.58579 20.75 2V22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22V2ZM7.75 14.5C7.75 12.1528 9.65279 10.25 12 10.25C14.3472 10.25 16.25 12.1528 16.25 14.5C16.25 16.8472 14.3472 18.75 12 18.75C9.65279 18.75 7.75 16.8472 7.75 14.5ZM9 7H15V5H9V7Z',
};

export const IconSpeaker01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-stroke-rounded IconSpeaker01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="14.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-duotone-rounded IconSpeaker01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="14.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-twotone-rounded IconSpeaker01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="14.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-solid-rounded IconSpeaker01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-bulk-rounded IconSpeaker01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-stroke-sharp IconSpeaker01StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="14.5" 
        r="3.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeaker01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speaker-01-solid-sharp IconSpeaker01SolidSharp"
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

export const iconPackOfSpeaker01: TheIconSelfPack = {
  name: 'Speaker01',
  StrokeRounded: IconSpeaker01StrokeRounded,
  DuotoneRounded: IconSpeaker01DuotoneRounded,
  TwotoneRounded: IconSpeaker01TwotoneRounded,
  SolidRounded: IconSpeaker01SolidRounded,
  BulkRounded: IconSpeaker01BulkRounded,
  StrokeSharp: IconSpeaker01StrokeSharp,
  SolidSharp: IconSpeaker01SolidSharp,
};