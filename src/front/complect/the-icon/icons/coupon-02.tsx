import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.83152 21.3478L7.31312 20.6576C6.85764 20.0511 5.89044 20.1 5.50569 20.7488C4.96572 21.6595 3.5 21.2966 3.5 20.2523V3.74775C3.5 2.7034 4.96572 2.3405 5.50569 3.25115C5.89044 3.90003 6.85764 3.94888 7.31312 3.34244L7.83152 2.65222C8.48467 1.78259 9.84866 1.78259 10.5018 2.65222L10.5833 2.76076C11.2764 3.68348 12.7236 3.68348 13.4167 2.76076L13.4982 2.65222C14.1513 1.78259 15.5153 1.78259 16.1685 2.65222L16.6869 3.34244C17.1424 3.94888 18.1096 3.90003 18.4943 3.25115C19.0343 2.3405 20.5 2.7034 20.5 3.74774V20.2523C20.5 21.2966 19.0343 21.6595 18.4943 20.7488C18.1096 20.1 17.1424 20.0511 16.6869 20.6576L16.1685 21.3478C15.5153 22.2174 14.1513 22.2174 13.4982 21.3478L13.4167 21.2392C12.7236 20.3165 11.2764 20.3165 10.5833 21.2392L10.5018 21.3478C9.84866 22.2174 8.48467 22.2174 7.83152 21.3478Z',
  d2: 'M15 9L9 15',
  d3: 'M15 15H14.991M9.00897 9H9',
  d4: 'M11.1015 2.20193C11.2777 2.43653 11.6079 2.59439 12 2.59439C12.3921 2.59439 12.7223 2.43653 12.8985 2.20193C13.8517 0.932852 15.815 0.932852 16.7682 2.20193L17.2866 2.89215C17.3484 2.97448 17.4531 3.02499 17.5793 3.01861C17.7053 3.01225 17.7998 2.95211 17.8492 2.86875C18.3169 2.07995 19.1835 1.866 19.8799 2.03843C20.5785 2.2114 21.25 2.8137 21.25 3.74787V20.2524C21.25 21.1865 20.5785 21.7888 19.8799 21.9618C19.1835 22.1342 18.3169 21.9203 17.8492 21.1315C17.7998 21.0481 17.7053 20.988 17.5793 20.9816C17.4531 20.9753 17.3484 21.0258 17.2866 21.1081L16.7682 21.7983C15.815 23.0674 13.8517 23.0674 12.8985 21.7983C12.7223 21.5637 12.3921 21.4059 12 21.4059C11.6079 21.4059 11.2777 21.5637 11.1015 21.7983C10.1483 23.0674 8.18499 23.0674 7.23183 21.7983L6.71343 21.1081C6.65159 21.0258 6.54686 20.9753 6.42071 20.9816C6.29466 20.988 6.20024 21.0481 6.15081 21.1315C5.68309 21.9203 4.81652 22.1342 4.1201 21.9618C3.42148 21.7888 2.75 21.1865 2.75 20.2524V3.74787C2.75 2.8137 3.42148 2.2114 4.1201 2.03843C4.81652 1.866 5.68309 2.07995 6.15081 2.86875C6.20024 2.95211 6.29466 3.01225 6.42071 3.01861C6.54686 3.02499 6.65159 2.97448 6.71343 2.89215L7.23183 2.20193C8.18499 0.932852 10.1483 0.932852 11.1015 2.20193ZM8.29289 15.7072C7.90237 15.3167 7.90237 14.6835 8.29289 14.293L14.2929 8.29302C14.6834 7.90249 15.3166 7.90249 15.7071 8.29302C16.0976 8.68354 16.0976 9.3167 15.7071 9.70723L9.70711 15.7072C9.31658 16.0978 8.68342 16.0978 8.29289 15.7072ZM9.00897 8.00012H9C8.44772 8.00012 8 8.44784 8 9.00012C8 9.55241 8.44772 10.0001 9 10.0001H9.00897C9.56125 10.0001 10.009 9.55241 10.009 9.00012C10.009 8.44784 9.56125 8.00012 9.00897 8.00012ZM14.991 14.0001C14.4387 14.0001 13.991 14.4478 13.991 15.0001C13.991 15.5524 14.4387 16.0001 14.991 16.0001H15C15.5523 16.0001 16 15.5524 16 15.0001C16 14.4478 15.5523 14.0001 15 14.0001H14.991Z',
  d5: 'M11.1015 2.20181C11.2777 2.4364 11.6079 2.59426 12 2.59426C12.3921 2.59426 12.7223 2.4364 12.8985 2.20181C13.8517 0.93273 15.815 0.93273 16.7682 2.20181L17.2866 2.89203C17.3484 2.97435 17.4531 3.02486 17.5793 3.01849C17.7053 3.01213 17.7998 2.95199 17.8492 2.86863C18.3169 2.07982 19.1835 1.86588 19.8799 2.03831C20.5785 2.21128 21.25 2.81358 21.25 3.74774V20.2523C21.25 21.1864 20.5785 21.7887 19.8799 21.9617C19.1835 22.1341 18.3169 21.9202 17.8492 21.1314C17.7998 21.048 17.7053 20.9879 17.5793 20.9815C17.4531 20.9751 17.3484 21.0256 17.2866 21.108L16.7682 21.7982C15.815 23.0673 13.8517 23.0673 12.8985 21.7982C12.7223 21.5636 12.3921 21.4057 12 21.4057C11.6079 21.4057 11.2777 21.5636 11.1015 21.7982C10.1483 23.0673 8.18499 23.0673 7.23183 21.7982L6.71343 21.108C6.65159 21.0256 6.54686 20.9751 6.42071 20.9815C6.29466 20.9879 6.20024 21.048 6.15081 21.1314C5.68309 21.9202 4.81652 22.1341 4.1201 21.9617C3.42148 21.7887 2.75 21.1864 2.75 20.2523V3.74775C2.75 2.81358 3.42148 2.21128 4.1201 2.03831C4.81652 1.86588 5.68309 2.07982 6.15081 2.86863C6.20024 2.95199 6.29466 3.01213 6.42071 3.01849C6.54686 3.02486 6.65159 2.97435 6.71343 2.89203L7.23183 2.20181C8.18499 0.93273 10.1483 0.93273 11.1015 2.20181Z',
  d6: 'M8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071Z',
  d7: 'M8 9C8 8.44772 8.44772 8 9 8H9.00897C9.56125 8 10.009 8.44772 10.009 9C10.009 9.55228 9.56125 10 9.00897 10H9C8.44772 10 8 9.55228 8 9ZM13.991 15C13.991 14.4477 14.4387 14 14.991 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H14.991C14.4387 16 13.991 15.5523 13.991 15Z',
  d8: 'M15 9.00049L9 15.0005',
  d9: 'M15 15.0005H14.991M9.00897 9.00049H9',
  d10: 'M5.99043 4.01762L3.15673 2.0489C3.09039 2.00281 3 2.05071 3 2.13196V21.8985C3 21.9795 3.08998 22.0275 3.15636 21.9818L6.01515 20.0144L8.95085 21.9666C8.98413 21.9888 9.02727 21.9889 9.06063 21.9669L12.0209 20.0144L14.9561 21.9663C14.9896 21.9886 15.0331 21.9885 15.0665 21.9661L17.9771 20.0144L20.844 21.9707C20.9104 22.0161 21 21.9681 21 21.8872V2.11016C21 2.02882 20.9094 1.98094 20.8431 2.0272L17.9894 4.01762L15.055 2.01778C15.0212 1.99469 14.9767 1.99473 14.9429 2.01789L12.0208 4.01762L9.04816 2.06042C9.01483 2.03847 8.97177 2.03855 8.93852 2.06062L5.99043 4.01762Z',
  d11: 'M3.41603 1.37596C3.18588 1.22254 2.88997 1.20823 2.64611 1.33875C2.40224 1.46926 2.25 1.7234 2.25 2V22C2.25 22.2766 2.40224 22.5307 2.64611 22.6613C2.88997 22.7918 3.18588 22.7775 3.41603 22.624L6 20.9014L8.58397 22.624C8.8359 22.792 9.1641 22.792 9.41603 22.624L12 20.9014L14.584 22.624C14.8359 22.792 15.1641 22.792 15.416 22.624L18 20.9014L20.584 22.624C20.8141 22.7775 21.11 22.7918 21.3539 22.6613C21.5978 22.5307 21.75 22.2766 21.75 22V2C21.75 1.7234 21.5978 1.46926 21.3539 1.33875C21.11 1.20823 20.8141 1.22254 20.584 1.37596L18 3.09861L15.416 1.37596C15.1641 1.20801 14.8359 1.20801 14.584 1.37596L12 3.09861L9.41603 1.37596C9.1641 1.20801 8.8359 1.20801 8.58397 1.37596L6 3.09861L3.41603 1.37596ZM14.5856 8L8 14.5856L9.41421 15.9998L15.9998 9.41421L14.5856 8ZM10.009 8H8V10H10.009V8ZM16 14H13.991V16H16V14Z',
};

export const IconCoupon02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-stroke-rounded IconCoupon02StrokeRounded"
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

export const IconCoupon02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-duotone-rounded IconCoupon02DuotoneRounded"
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

export const IconCoupon02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-twotone-rounded IconCoupon02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCoupon02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-solid-rounded IconCoupon02SolidRounded"
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

export const IconCoupon02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-bulk-rounded IconCoupon02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCoupon02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-stroke-sharp IconCoupon02StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
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

export const IconCoupon02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="coupon-02-solid-sharp IconCoupon02SolidSharp"
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

export const iconPackOfCoupon02: TheIconSelfPack = {
  name: 'Coupon02',
  StrokeRounded: IconCoupon02StrokeRounded,
  DuotoneRounded: IconCoupon02DuotoneRounded,
  TwotoneRounded: IconCoupon02TwotoneRounded,
  SolidRounded: IconCoupon02SolidRounded,
  BulkRounded: IconCoupon02BulkRounded,
  StrokeSharp: IconCoupon02StrokeSharp,
  SolidSharp: IconCoupon02SolidSharp,
};