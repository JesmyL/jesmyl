import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 9H7C5.13077 9 4.19615 9 3.5 9.44212C3.04394 9.73175 2.66523 10.1483 2.40192 10.65C2 11.4158 2 12.4438 2 14.5C2 16.5562 2 17.5842 2.40192 18.35C2.66523 18.8517 3.04394 19.2682 3.5 19.5579C4.19615 20 5.13077 20 7 20C7.61332 20 7.91998 20 8.21032 19.9529C8.98496 19.8272 9.70902 19.4541 10.2927 18.88C10.5115 18.6648 10.7078 18.4057 11.1005 17.8874L11.4346 17.4463C11.6334 17.1839 11.7328 17.0527 11.8543 17.0014C11.9552 16.9587 12.0659 16.9532 12.1699 16.9856C12.2951 17.0246 12.4049 17.1454 12.6245 17.3869L13.5858 18.4444C13.8243 18.7067 13.9435 18.8379 14.0676 18.9537C14.7056 19.5498 15.4976 19.9106 16.3319 19.9855C16.4941 20 16.6627 20 17 20C18.8692 20 19.8038 20 20.5 19.5579C20.9561 19.2682 21.3348 18.8517 21.5981 18.35C22 17.5842 22 16.5562 22 14.5C22 12.4438 22 11.4158 21.5981 10.65C21.3348 10.1483 20.9561 9.73175 20.5 9.44212C19.8038 9 18.8692 9 17 9Z',
  d2: 'M16 13H18',
  d3: 'M22 15V12.4522C22 11.4723 22 10.9823 21.9227 10.5086C21.8844 10.2743 21.8322 10.0438 21.7664 9.81888C21.6333 9.36411 21.427 8.94392 21.0145 8.1036C20.1876 6.41927 19.7742 5.5771 19.1715 5.01138C18.8756 4.73365 18.5493 4.50788 18.2022 4.34065C17.4952 4 16.6916 4 15.0845 4H8.91548C7.30836 4 6.5048 4 5.79779 4.34065C5.45069 4.50788 5.12444 4.73365 4.82853 5.01138C4.22579 5.5771 3.81236 6.41927 2.9855 8.1036C2.57298 8.94394 2.36671 9.3641 2.23364 9.81888C2.16781 10.0438 2.11557 10.2743 2.07733 10.5086C2 10.9823 2 11.4723 2 12.4522V15',
  d4: 'M8.71014 3.00009C10.9034 3.00164 13.0966 3.00164 15.2899 3.00009C16.9816 2.9989 18.5711 3.07657 19.8558 4.28243C20.5937 4.97498 21.083 5.97257 21.8189 7.47304C22.1496 8.14725 22.5143 8.8144 22.7261 9.53823C22.8036 9.80298 22.8649 10.0735 22.9096 10.3477C23.0002 10.9023 23.0001 11.4683 23 12.3663L23 15.0002C23 15.5525 22.5523 16.0002 22 16.0002C21.4477 16.0002 21 15.5525 21 15.0002V12.4524C21 11.4408 20.997 11.0451 20.9358 10.6699C20.904 10.4756 20.8608 10.285 20.8066 10.0999C20.7031 9.74629 20.5433 9.41325 20.1168 8.54446C19.252 6.78273 18.924 6.15076 18.4871 5.74072C17.5538 4.86472 16.287 5.00019 15.0845 5.00019H8.91549C7.71303 5.00019 6.44623 4.86472 5.5129 5.74072C5.07602 6.15076 4.74803 6.78273 3.88318 8.54446C3.45668 9.41326 3.29688 9.74629 3.1934 10.0999C3.13923 10.285 3.096 10.4756 3.06427 10.6699C3.00302 11.0451 3.00001 11.4408 3.00001 12.4524V15.0002C3.00001 15.5525 2.5523 16.0002 2.00001 16.0002C1.44773 16.0002 1.00001 15.5525 1.00001 15.0002V12.4524C1.00001 11.5041 0.997001 10.9198 1.0904 10.3477C1.13516 10.0735 1.19642 9.80297 1.27389 9.53823C1.48534 8.81563 1.85083 8.14642 2.18111 7.47302C2.91703 5.97257 3.40631 4.97498 4.14419 4.28243C5.42896 3.07657 7.01838 2.9989 8.71014 3.00009Z',
  d5: 'M6.94965 7.99981H17.0494C17.9415 7.99979 18.6844 7.99978 19.2886 8.06001C20.6801 8.19874 21.8253 8.93202 22.483 10.1851C22.773 10.7376 22.8906 11.3379 22.9459 12.0088C23.0044 12.7192 23.0023 13.4345 23.0003 14.1477C22.9999 14.2795 22.9995 14.4112 22.9995 14.5428C22.9995 15.5344 22.9995 16.3398 22.9459 16.9908C22.8906 17.6617 22.773 18.262 22.483 18.8146C22.1426 19.4632 21.6466 20.0138 21.0356 20.4018C20.5033 20.7399 19.9218 20.8765 19.2886 20.9396C18.2967 21.0385 17.2387 21.0706 16.2421 20.9813C15.1761 20.8857 14.1778 20.4255 13.3844 19.6843C13.09 19.4093 12.8178 19.1075 12.5493 18.8036C12.3317 18.5573 12.2229 18.4341 12.081 18.4393C11.9392 18.4445 11.8384 18.577 11.6368 18.8419L11.6367 18.8419C11.4366 19.105 11.2284 19.3617 10.9935 19.5927C10.2689 20.3054 9.35824 20.7794 8.37001 20.9398C7.2042 21.129 5.87624 21.0558 4.71039 20.9396C4.07722 20.8765 3.49574 20.7399 2.9634 20.4018C2.35242 20.0138 1.85644 19.4632 1.51598 18.8146C1.22596 18.262 1.1084 17.6617 1.05312 16.9908C0.999482 16.3398 0.999491 15.5344 0.999501 14.5428C0.999501 14.4112 0.999118 14.2795 0.998735 14.1477C0.996663 13.4345 0.994585 12.7192 1.05312 12.0088C1.1084 11.3379 1.22596 10.7376 1.51598 10.1851C2.17366 8.93202 3.31887 8.19874 4.71039 8.06001C5.31458 7.99978 6.05747 7.99979 6.94965 7.99981ZM16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14H18C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12H16Z',
  d6: 'M17.0494 8H6.94972C6.05755 7.99998 5.31466 7.99996 4.71047 8.0602C3.31895 8.19893 2.17374 8.93221 1.51606 10.1853C1.22604 10.7378 1.10848 11.3381 1.0532 12.009C0.983846 12.8507 0.99958 13.6992 0.99958 14.543C0.999569 15.5346 0.999561 16.34 1.0532 16.991C1.10848 17.6619 1.22604 18.2622 1.51606 18.8147C1.85651 19.4634 2.3525 20.014 2.96347 20.402C3.49582 20.7401 4.0773 20.8767 4.71047 20.9398C5.87632 21.056 7.20428 21.1292 8.37009 20.94C9.35832 20.7796 10.269 20.3056 10.9935 19.5929C11.2284 19.3619 11.4366 19.1052 11.6368 18.8421C11.8385 18.5772 11.9393 18.4447 12.0811 18.4395C12.2229 18.4343 12.3317 18.5575 12.5494 18.8038C12.8179 19.1077 13.0901 19.4095 13.3845 19.6845C14.1778 20.4256 15.1761 20.8859 16.2422 20.9815C17.2388 21.0708 18.2968 21.0387 19.2887 20.9398C19.9219 20.8767 20.5033 20.7401 21.0357 20.402C21.6467 20.014 22.1426 19.4634 22.4831 18.8147C22.7731 18.2622 22.8907 17.6619 22.946 16.991C22.9996 16.34 22.9996 15.5346 22.9996 14.543C22.9996 13.6992 23.0153 12.8507 22.946 12.009C22.8907 11.3381 22.7731 10.7378 22.4831 10.1853C21.8254 8.93221 20.6802 8.19893 19.2887 8.0602C18.6845 7.99996 17.9416 7.99998 17.0494 8Z',
  d7: 'M15.2899 3.00001C13.0966 3.00157 10.9034 3.00157 8.71014 3.00001C7.01838 2.99882 5.42896 3.07649 4.14419 4.28235C3.40631 4.9749 2.91703 5.97249 2.18111 7.47294C2.12459 7.58818 2.06705 7.70329 2.00941 7.81856C1.73026 8.37694 1.44916 8.9392 1.27389 9.53815C1.19642 9.80289 1.13516 10.0734 1.0904 10.3476C0.999861 10.9022 0.999917 11.4682 1.00001 12.3662C1.00001 12.3946 1.00001 12.4233 1.00001 12.4524V13.7137C1.00035 13.1447 1.00849 12.5753 1.05515 12.009C1.11043 11.3381 1.22799 10.7378 1.51801 10.1853C2.07083 9.13201 2.96809 8.44599 4.06656 8.17161C4.79715 6.69037 5.10834 6.12035 5.5129 5.74064C6.33618 4.96793 7.41893 4.98223 8.48811 4.99634C8.63103 4.99823 8.7737 5.00011 8.91549 5.00011H15.0845C15.2263 5.00011 15.369 4.99823 15.5119 4.99634C16.5811 4.98223 17.6638 4.96793 18.4871 5.74064C18.8916 6.12028 19.2027 6.69015 19.933 8.17074C21.0331 8.44454 21.9317 9.1309 22.4851 10.1853C22.7751 10.7378 22.8926 11.3381 22.9479 12.009C22.981 12.4103 22.9947 12.8132 23 13.2164L23 12.3663C23.0001 11.4683 23.0002 10.9022 22.9096 10.3476C22.8649 10.0734 22.8036 9.8029 22.7261 9.53815C22.5507 8.93865 22.2704 8.37803 21.9914 7.82008C21.9335 7.70436 21.8757 7.58877 21.8189 7.47296C21.083 5.97249 20.5937 4.9749 19.8558 4.28235C18.5711 3.07649 16.9816 2.99882 15.2899 3.00001ZM1.00184 15.0611C1.00153 14.8943 1.00153 14.7217 1.00153 14.543C1.00153 14.4114 1.00115 14.2796 1.00077 14.1479C1.00042 14.0291 1.00008 13.9102 1.00001 13.7913V15.0001C1.00001 15.0206 1.00063 15.0409 1.00184 15.0611Z',
  d8: 'M15 13C15 12.4477 15.4477 12 16 12H18C18.5523 12 19 12.4477 19 13C19 13.5523 18.5523 14 18 14H16C15.4477 14 15 13.5523 15 13Z',
  d9: 'M15 13H19',
  d10: 'M22 9L18 4H6L2 9',
  d11: 'M21.8 9H2.2C2.08954 9 2 9.08954 2 9.2V19.9C2 19.9552 2.04477 20 2.1 20H9L12 17L15 20H21.9C21.9552 20 22 19.9552 22 19.9V9.2C22 9.08954 21.9105 9 21.8 9Z',
  d12: 'M5.66666 3.25H18.3333L22.75 8.7423V20.75H14.5271L12 18.2371L9.47285 20.75H1.25V8.7423L5.66666 3.25ZM6.60717 5.19434L4.26172 8.111H19.7405L17.395 5.19434H6.60717ZM15 14H19V12H15V14Z',
};

export const IconVirtualRealityVr01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-stroke-rounded IconVirtualRealityVr01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconVirtualRealityVr01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-duotone-rounded IconVirtualRealityVr01DuotoneRounded"
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
    </TheIconWrapper>
  );
};

export const IconVirtualRealityVr01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-twotone-rounded IconVirtualRealityVr01TwotoneRounded"
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
        strokeLinecap="round" 
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

export const IconVirtualRealityVr01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-solid-rounded IconVirtualRealityVr01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconVirtualRealityVr01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-bulk-rounded IconVirtualRealityVr01BulkRounded"
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

export const IconVirtualRealityVr01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-stroke-sharp IconVirtualRealityVr01StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconVirtualRealityVr01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="virtual-reality-vr-01-solid-sharp IconVirtualRealityVr01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfVirtualRealityVr01: TheIconSelfPack = {
  name: 'VirtualRealityVr01',
  StrokeRounded: IconVirtualRealityVr01StrokeRounded,
  DuotoneRounded: IconVirtualRealityVr01DuotoneRounded,
  TwotoneRounded: IconVirtualRealityVr01TwotoneRounded,
  SolidRounded: IconVirtualRealityVr01SolidRounded,
  BulkRounded: IconVirtualRealityVr01BulkRounded,
  StrokeSharp: IconVirtualRealityVr01StrokeSharp,
  SolidSharp: IconVirtualRealityVr01SolidSharp,
};