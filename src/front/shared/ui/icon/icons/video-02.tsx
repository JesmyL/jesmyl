import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M11 8L13 8',
  d2: 'M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z',
  d3: 'M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941',
  d4: 'M17.9933 9.38334C17.9826 8.47732 17.9515 7.69419 17.8619 7.02777C17.8573 6.99366 17.8526 6.95971 17.8477 6.92591C18.3059 6.56563 18.7204 6.26203 19.0944 6.03609C19.7947 5.61301 20.6822 5.25874 21.5929 5.71019C22.4895 6.15463 22.7673 7.06553 22.8829 7.88282C22.9991 8.70445 22.9991 9.81011 22.999 11.1382V12.8645C22.9991 14.1926 22.9991 15.2982 22.8829 16.1198C22.7673 16.9371 22.4895 17.848 21.5929 18.2925C20.6822 18.7439 19.7947 18.3896 19.0944 17.9666C18.7204 17.7406 18.3059 17.437 17.8477 17.0768C17.8526 17.0431 17.8574 17.0092 17.8619 16.9752C17.9515 16.3087 17.9826 15.5255 17.9933 14.6193C18.951 15.4085 19.6124 15.9429 20.1285 16.2547C20.3999 16.4186 20.5637 16.4778 20.6531 16.4955C20.6728 16.4994 20.6863 16.5007 20.6942 16.5012C20.6982 16.5014 20.7027 16.5013 20.7027 16.5013L20.7047 16.5005C20.709 16.4984 20.7108 16.4966 20.7108 16.4966C20.7136 16.4936 20.7286 16.4774 20.7499 16.4358C20.7977 16.3422 20.8567 16.1641 20.9026 15.8397C20.9966 15.1754 20.999 14.2135 20.999 12.7832V11.2194C20.999 9.78915 20.9966 8.82725 20.9026 8.16294C20.8567 7.83855 20.7977 7.66044 20.7499 7.56691C20.7286 7.52522 20.714 7.50949 20.7112 7.50653C20.7112 7.50653 20.709 7.50427 20.7047 7.50211L20.7032 7.50139C20.7032 7.50139 20.6982 7.5013 20.6942 7.5015C20.6863 7.50191 20.6728 7.50322 20.6531 7.50713C20.5637 7.52483 20.3999 7.58402 20.1285 7.74796C19.6124 8.05977 18.951 8.59417 17.9933 9.38334Z',
  d5: 'M8.92797 3H10.072H10.0721C11.6607 2.99997 12.9539 2.99995 13.9737 3.13706C15.0377 3.28011 15.9527 3.58869 16.682 4.31802C17.4113 5.04735 17.7199 5.96232 17.8629 7.0263C18.0001 8.04616 18 9.33933 18 10.928V13.072C18 14.6607 18.0001 15.9538 17.8629 16.9737C17.7199 18.0377 17.4113 18.9527 16.682 19.682C15.9527 20.4113 15.0377 20.7199 13.9737 20.8629C12.9538 21.0001 11.6607 21 10.072 21H8.928C7.33933 21 6.04616 21.0001 5.0263 20.8629C3.96232 20.7199 3.04735 20.4113 2.31802 19.682C1.58869 18.9527 1.28011 18.0377 1.13706 16.9737C0.999947 15.9539 0.999971 14.6607 1 13.0721V13.072V10.9279V10.9279C0.999971 9.33929 0.999947 8.04614 1.13706 7.0263C1.28011 5.96232 1.58869 5.04735 2.31802 4.31802C3.04735 3.58869 3.96232 3.28011 5.0263 3.13706C6.04614 2.99995 7.33931 2.99997 8.92795 3H8.92797ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9L13 9C13.5523 9 14 8.55229 14 8C14 7.44772 13.5523 7 13 7L11 7Z',
  d6: 'M10.072 3H8.92797C7.33933 2.99997 6.04615 2.99995 5.0263 3.13706C3.96232 3.28011 3.04735 3.58869 2.31802 4.31802C1.58869 5.04735 1.28011 5.96232 1.13706 7.0263C0.999946 8.04615 0.999971 9.3393 1 10.9279V13.072C0.999971 14.6607 0.999946 15.9539 1.13706 16.9737C1.28011 18.0377 1.58869 18.9527 2.31802 19.682C3.04735 20.4113 3.96232 20.7199 5.0263 20.8629C6.04616 21.0001 7.33933 21 8.928 21H10.072C11.6607 21 12.9538 21.0001 13.9737 20.8629C15.0377 20.7199 15.9527 20.4113 16.682 19.682C17.4113 18.9527 17.7199 18.0377 17.8629 16.9737C18.0001 15.9538 18 14.6607 18 13.072V10.928C18 9.33933 18.0001 8.04616 17.8629 7.0263C17.7199 5.96232 17.4113 5.04735 16.682 4.31802C15.9527 3.58869 15.0377 3.28011 13.9737 3.13706C12.9539 2.99995 11.6607 2.99997 10.072 3Z',
  d7: 'M10 8C10 7.44772 10.4477 7 11 7L13 7C13.5523 7 14 7.44772 14 8C14 8.55229 13.5523 9 13 9L11 9C10.4477 9 10 8.55228 10 8Z',
  d8: 'M17 20V4H2V20H17Z',
  d9: 'M17 9.50018L22 6.5V17.5002L17 14.5002',
  d10: 'M10 8L14 8',
  d11: 'M1.25 4C1.25 3.58579 1.58579 3.25 2 3.25H17C17.4142 3.25 17.75 3.58579 17.75 4V8.14536L21.3551 5.88704C21.6396 5.7088 21.994 5.70413 22.2828 5.8748C22.5715 6.04547 22.75 6.36511 22.75 6.71152V17.2885C22.75 17.6349 22.5715 17.9545 22.2828 18.1252C21.994 18.2959 21.6397 18.2912 21.3551 18.113L17.75 15.8548V20C17.75 20.4142 17.4142 20.75 17 20.75H2C1.58579 20.75 1.25 20.4142 1.25 20V4ZM17.75 13.6121V10.388L20.908 8.40981V15.5902L17.75 13.6121ZM10 9L14 9V7H10V9Z',
};

export const IconVideo02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-stroke-rounded IconVideo02StrokeRounded"
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideo02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-duotone-rounded IconVideo02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideo02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-twotone-rounded IconVideo02TwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideo02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-solid-rounded IconVideo02SolidRounded"
    >
      <path 
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

export const IconVideo02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-bulk-rounded IconVideo02BulkRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
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
    </TheIconWrapper>
  );
};

export const IconVideo02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-stroke-sharp IconVideo02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
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
      />
    </TheIconWrapper>
  );
};

export const IconVideo02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-02-solid-sharp IconVideo02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfVideo02: TheIconSelfPack = {
  name: 'Video02',
  StrokeRounded: IconVideo02StrokeRounded,
  DuotoneRounded: IconVideo02DuotoneRounded,
  TwotoneRounded: IconVideo02TwotoneRounded,
  SolidRounded: IconVideo02SolidRounded,
  BulkRounded: IconVideo02BulkRounded,
  StrokeSharp: IconVideo02StrokeSharp,
  SolidSharp: IconVideo02SolidSharp,
};