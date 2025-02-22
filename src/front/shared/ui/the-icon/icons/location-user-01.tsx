import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M13.1977 8H10.8023C7.35836 8 5.03641 11.5806 6.39304 14.7994C6.58202 15.2477 7.0156 15.5385 7.49535 15.5385H8.33892C8.62326 15.5385 8.87111 15.7352 8.94007 16.0157L10.0261 20.4328C10.2525 21.3539 11.0663 22 12 22C12.9337 22 13.7475 21.3539 13.9739 20.4328L15.0599 16.0157C15.1289 15.7352 15.3767 15.5385 15.6611 15.5385H16.5047C16.9844 15.5385 17.418 15.2477 17.607 14.7994C18.9636 11.5806 16.6416 8 13.1977 8Z',
  d2: 'M5.93493 15.0907C4.43507 11.3953 6.99495 7.25 10.8466 7.25H13.1534C17.0051 7.25 19.5649 11.3953 18.0651 15.0907C17.7724 15.8118 17.0959 16.2885 16.338 16.2885H15.6259L14.6023 20.6119C14.3066 21.8606 13.2391 22.75 12 22.75C10.7609 22.75 9.69337 21.8606 9.39773 20.6119L8.37409 16.2885H7.66201C6.90411 16.2885 6.22763 15.8118 5.93493 15.0907Z',
  d3: 'M8.5 4.75C8.5 2.817 10.067 1.25 12 1.25C13.933 1.25 15.5 2.817 15.5 4.75C15.5 6.683 13.933 8.25 12 8.25C10.067 8.25 8.5 6.683 8.5 4.75Z',
  d4: 'M18 16V14C18 10.6863 15.3137 8 12 8C8.68629 8 6 10.6863 6 14V16H8.5L10 22H14L15.5 16H18Z',
  d5: 'M5.25 14C5.25 10.2721 8.27208 7.25 12 7.25C15.7279 7.25 18.75 10.2721 18.75 14V16.75H16.0856L14.5856 22.75H9.41442L7.91442 16.75H5.25V14Z',
  d6: 'M8.25 5C8.25 2.92893 9.92893 1.25 12 1.25C14.0711 1.25 15.75 2.92893 15.75 5C15.75 7.07107 14.0711 8.75 12 8.75C9.92893 8.75 8.25 7.07107 8.25 5Z',
};

export const IconLocationUser01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-stroke-rounded IconLocationUser01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLocationUser01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-duotone-rounded IconLocationUser01DuotoneRounded"
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
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLocationUser01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-twotone-rounded IconLocationUser01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        opacity="0.5" 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLocationUser01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-solid-rounded IconLocationUser01SolidRounded"
    >
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationUser01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-bulk-rounded IconLocationUser01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconLocationUser01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-stroke-sharp IconLocationUser01StrokeSharp"
    >
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="12" 
        cy="5" 
        r="3" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
    </TheIconWrapper>
  );
};

export const IconLocationUser01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="location-user-01-solid-sharp IconLocationUser01SolidSharp"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfLocationUser01: TheIconSelfPack = {
  name: 'LocationUser01',
  StrokeRounded: IconLocationUser01StrokeRounded,
  DuotoneRounded: IconLocationUser01DuotoneRounded,
  TwotoneRounded: IconLocationUser01TwotoneRounded,
  SolidRounded: IconLocationUser01SolidRounded,
  BulkRounded: IconLocationUser01BulkRounded,
  StrokeSharp: IconLocationUser01StrokeSharp,
  SolidSharp: IconLocationUser01SolidSharp,
};