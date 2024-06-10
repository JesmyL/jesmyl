import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M5 7L6.7602 17.4048C7.06616 19.2134 7.21914 20.1177 7.76007 20.7417C9.21438 22.4194 14.7856 22.4194 16.2399 20.7417C16.7809 20.1177 16.9338 19.2134 17.2398 17.4048L19 7',
  d2: 'M5 7L5.74278 5.2876C6.35168 3.88385 6.65613 3.18197 7.29101 2.7856C8.88049 1.79324 14.9452 1.68444 16.709 2.7856C17.3439 3.18197 17.6483 3.88385 18.2572 5.2876L19 7',
  d3: 'M4 7H20',
  d4: 'M5 7L6.7602 17.4048C7.06616 19.2134 7.21914 20.1177 7.76007 20.7417C9.21438 22.4194 14.7856 22.4194 16.2399 20.7417C16.7809 20.1177 16.9338 19.2134 17.2398 17.4048L19 7H5ZM12 17C13.1046 17 14 15.8807 14 14.5C14 13.1193 13.1046 12 12 12C10.8954 12 10 13.1193 10 14.5C10 15.8807 10.8954 17 12 17Z',
  d5: 'M9.34474 3.32427C8.54702 3.45327 8.03879 3.62263 7.8206 3.75885C7.68735 3.84205 7.55432 3.97058 7.37284 4.28442C7.17677 4.6235 6.97374 5.08768 6.66019 5.81054L6.52379 6.125H17.4762L17.3398 5.81055C17.0263 5.08768 16.8232 4.6235 16.6272 4.28442C16.4457 3.97058 16.3127 3.84205 16.1794 3.75885C15.9176 3.59539 15.3755 3.41929 14.5652 3.29492C13.7874 3.17555 12.8688 3.11899 11.9417 3.1255C11.0148 3.13202 10.1047 3.20139 9.34474 3.32427ZM19.6563 6.125L19.1535 4.96587C18.8671 4.30563 18.6192 3.73407 18.3585 3.28324C18.0768 2.79612 17.7402 2.37552 17.2386 2.06234C16.6185 1.67522 15.7411 1.45199 14.8686 1.31807C13.9635 1.17916 12.9358 1.11847 11.9276 1.12555C10.9191 1.13264 9.90484 1.20772 9.02547 1.34992C8.18388 1.48601 7.33797 1.70239 6.76142 2.06234C6.2598 2.37552 5.92316 2.79612 5.64147 3.28324C5.38077 3.73408 5.13287 4.30565 4.84651 4.96591C4.83949 4.98211 4.83244 4.99836 4.82537 5.01466L4.34374 6.125H4C3.44772 6.125 3 6.57272 3 7.125C3 7.67728 3.44772 8.125 4 8.125H4.97702C4.99203 8.12534 5.00703 8.12534 5.02199 8.125H18.978C18.993 8.12534 19.008 8.12534 19.023 8.125H20C20.5523 8.125 21 7.67728 21 7.125C21 6.57272 20.5523 6.125 20 6.125H19.6563Z',
  d6: 'M17.5525 19.8392C17.7063 19.2734 17.8262 18.5649 17.9738 17.6924L19.8884 6.375L4.11328 6.375L6.02786 17.6924C6.17545 18.5649 6.29531 19.2734 6.4491 19.8392C6.60878 20.4266 6.82153 20.9281 7.19416 21.3579C7.69834 21.9396 8.48518 22.3067 9.2928 22.5327C10.1202 22.7642 11.0682 22.875 12.0008 22.875C12.9335 22.875 13.8814 22.7642 14.7088 22.5327C15.5165 22.3067 16.3033 21.9396 16.8075 21.3579C17.1801 20.9281 17.3929 20.4266 17.5525 19.8392ZM10.75 14.625C10.75 13.4937 11.4572 12.875 12 12.875C12.5428 12.875 13.25 13.4937 13.25 14.625C13.25 15.7563 12.5428 16.375 12 16.375C11.4572 16.375 10.75 15.7563 10.75 14.625ZM12 11.375C10.3337 11.375 9.25 12.9949 9.25 14.625C9.25 16.2551 10.3337 17.875 12 17.875C13.6663 17.875 14.75 16.2551 14.75 14.625C14.75 12.9949 13.6663 11.375 12 11.375Z',
  d7: 'M17.9738 17.6924C17.8262 18.5649 17.7063 19.2734 17.5525 19.8392C17.3929 20.4266 17.1801 20.9281 16.8075 21.3579C16.3033 21.9396 15.5165 22.3067 14.7088 22.5327C13.8814 22.7642 12.9335 22.875 12.0008 22.875C11.0682 22.875 10.1202 22.7642 9.2928 22.5327C8.48518 22.3067 7.69834 21.9396 7.19416 21.3579C6.82153 20.9281 6.60878 20.4266 6.4491 19.8392C6.29531 19.2734 6.17545 18.5649 6.02786 17.6924L4.11328 6.375H19.8884L17.9738 17.6924Z',
  d8: 'M12 12.875C11.4572 12.875 10.75 13.4937 10.75 14.625C10.75 15.7563 11.4572 16.375 12 16.375C12.5428 16.375 13.25 15.7563 13.25 14.625C13.25 13.4937 12.5428 12.875 12 12.875ZM9.25 14.625C9.25 12.9949 10.3337 11.375 12 11.375C13.6663 11.375 14.75 12.9949 14.75 14.625C14.75 16.2551 13.6663 17.875 12 17.875C10.3337 17.875 9.25 16.2551 9.25 14.625Z',
  d9: 'M19 7L17 22L7 22L5 7',
  d10: 'M19 7L18 3.5C15.7527 1.39747 8.02524 1.60522 6 3.5L5 7',
  d11: 'M3 7H21',
  d12: 'M6.65886 3.92558L5.72158 7.20604L4.2793 6.79396L5.2793 3.29396C5.31664 3.16327 5.38879 3.04518 5.48804 2.95232C6.13722 2.34497 7.15301 1.93879 8.23718 1.67607C9.34622 1.40732 10.63 1.26452 11.9093 1.25105C13.1883 1.23758 14.4889 1.3531 15.6303 1.61563C16.7519 1.87359 17.8085 2.2934 18.5128 2.95232C18.6121 3.04518 18.6842 3.16327 18.7216 3.29396L19.7216 6.79396L18.2793 7.20604L17.3412 3.92286C16.9038 3.58286 16.2067 3.28737 15.2941 3.07746C14.2912 2.84681 13.112 2.73847 11.9251 2.75097C10.7384 2.76347 9.57014 2.89647 8.59045 3.13388C7.70667 3.34804 7.05119 3.62946 6.65886 3.92558Z',
  d13: 'M19.6559 7.75L17.7427 22.0991C17.693 22.4717 17.3752 22.75 16.9993 22.75L6.99928 22.75C6.62338 22.75 6.30554 22.4717 6.25586 22.0991L4.34264 7.75H3L3 6.25L21 6.25V7.75H19.6559ZM10.75 14.5C10.75 13.3687 11.4572 12.75 12 12.75C12.5428 12.75 13.25 13.3687 13.25 14.5C13.25 15.6313 12.5428 16.25 12 16.25C11.4572 16.25 10.75 15.6313 10.75 14.5ZM12 11.25C10.3337 11.25 9.25 12.8699 9.25 14.5C9.25 16.1301 10.3337 17.75 12 17.75C13.6663 17.75 14.75 16.1301 14.75 14.5C14.75 12.8699 13.6663 11.25 12 11.25Z',
};

export const IconCoffee01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-stroke-rounded IconCoffee01StrokeRounded"
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
      <ellipse 
        cx="12" 
        cy="14.5" 
        rx="2" 
        ry="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconCoffee01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-duotone-rounded IconCoffee01DuotoneRounded"
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
        strokeLinecap="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <ellipse 
        cx="12" 
        cy="14.5" 
        rx="2" 
        ry="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconCoffee01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-twotone-rounded IconCoffee01TwotoneRounded"
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
      <ellipse 
        opacity="var(--icon-opacity)" 
        cx="12" 
        cy="14.5" 
        rx="2" 
        ry="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconCoffee01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-solid-rounded IconCoffee01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoffee01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-bulk-rounded IconCoffee01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
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

export const IconCoffee01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-stroke-sharp IconCoffee01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <ellipse 
        cx="12" 
        cy="14.5" 
        rx="2" 
        ry="2.5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></ellipse>
    </TheIconWrapper>
  );
};

export const IconCoffee01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coffee-01-solid-sharp IconCoffee01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCoffee01: TheIconSelfPack = {
  name: 'Coffee01',
  StrokeRounded: IconCoffee01StrokeRounded,
  DuotoneRounded: IconCoffee01DuotoneRounded,
  TwotoneRounded: IconCoffee01TwotoneRounded,
  SolidRounded: IconCoffee01SolidRounded,
  BulkRounded: IconCoffee01BulkRounded,
  StrokeSharp: IconCoffee01StrokeSharp,
  SolidSharp: IconCoffee01SolidSharp,
};