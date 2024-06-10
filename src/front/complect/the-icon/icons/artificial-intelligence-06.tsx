import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.5 14.5L9.34189 8.97434C9.43631 8.69107 9.7014 8.5 10 8.5C10.2986 8.5 10.5637 8.69107 10.6581 8.97434L12.5 14.5M15.5 8.5V14.5M8.5 12.5H11.5',
  d2: 'M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z',
  d3: 'M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.93939 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z',
  d4: 'M8.70208 2.00964C8.41768 1.97156 8.17792 2.05383 8.01469 2.12505C7.86464 2.19053 7.69535 2.28612 7.53113 2.37884L5.28197 3.66735C5.13616 3.7705 4.93913 3.93471 4.82604 4.20043C4.70258 4.49052 4.74241 4.7829 4.77174 4.95201C4.80348 5.13501 4.86932 5.38696 4.93233 5.62806C5.32857 7.14488 4.36065 8.77659 2.79378 9.19652L2.76618 9.20391C2.52912 9.26742 2.30699 9.32693 2.13327 9.38956C1.97074 9.44815 1.69912 9.55815 1.50772 9.80648C1.33182 10.0347 1.28519 10.2848 1.26684 10.4618C1.24992 10.6251 1.24996 10.8204 1.25 11.0105V12.9896C1.24996 13.1797 1.24992 13.375 1.26684 13.5382C1.28519 13.7153 1.33181 13.9654 1.5077 14.1936C1.69909 14.4419 1.97071 14.5519 2.13322 14.6105C2.30694 14.6731 2.79374 14.8036 2.79374 14.8036C4.36003 15.2234 5.32731 16.8549 4.93082 18.3719C4.93082 18.3719 4.80192 18.8649 4.77017 19.0479C4.74082 19.217 4.70097 19.5094 4.82441 19.7995C4.93749 20.0652 5.13453 20.2295 5.28035 20.3326L7.52952 21.6211L7.52962 21.6212C7.6938 21.7139 7.86312 21.8095 8.01315 21.875C8.17639 21.9462 8.41618 22.0285 8.70059 21.9904C9.00977 21.9489 9.23894 21.7725 9.37072 21.6623C9.51065 21.5453 9.86249 21.1962 9.86249 21.1962C10.4459 20.6176 11.2229 20.3281 12 20.3279C12.7771 20.3281 13.5541 20.6176 14.1375 21.1962C14.1375 21.1962 14.4894 21.5453 14.6293 21.6623C14.7611 21.7725 14.9902 21.9489 15.2994 21.9904C15.5838 22.0285 15.8236 21.9462 15.9869 21.875C16.1369 21.8095 16.3062 21.7139 16.4704 21.6212L16.4705 21.6211L18.7196 20.3326C18.8655 20.2295 19.0625 20.0652 19.1756 19.7995C19.299 19.5094 19.2592 19.217 19.2298 19.0479C19.1981 18.8649 19.0692 18.3719 19.0692 18.3719C18.6727 16.8549 19.64 15.2234 21.2063 14.8036C21.2063 14.8036 21.6931 14.6731 21.8668 14.6105C22.0293 14.5519 22.3009 14.4419 22.4923 14.1936C22.6682 13.9654 22.7148 13.7153 22.7332 13.5382C22.7501 13.375 22.75 13.1797 22.75 12.9896V11.0105C22.75 10.8204 22.7501 10.6251 22.7332 10.4618C22.7148 10.2848 22.6682 10.0347 22.4923 9.80648C22.3009 9.55815 22.0293 9.44815 21.8667 9.38956C21.693 9.32693 21.4709 9.26742 21.2338 9.20391L21.2062 9.19652C19.6393 8.77659 18.6714 7.14488 19.0677 5.62806C19.1307 5.38696 19.1965 5.13501 19.2283 4.95201C19.2576 4.7829 19.2974 4.49052 19.174 4.20043C19.0609 3.93471 18.8638 3.7705 18.718 3.66735L16.4689 2.37884C16.3046 2.28612 16.1354 2.19053 15.9853 2.12505C15.8221 2.05383 15.5823 1.97156 15.2979 2.00964C14.9888 2.05104 14.7596 2.22749 14.6278 2.33765C14.4879 2.45463 14.136 2.80365 14.136 2.80365C13.5529 3.3818 12.7765 3.67098 12 3.6712C11.2235 3.67098 10.4471 3.3818 9.86405 2.80365C9.86405 2.80365 9.51213 2.45463 9.37221 2.33765C9.24043 2.22749 9.01124 2.05104 8.70208 2.00964ZM10.0002 7.75C9.37879 7.75 8.82709 8.14764 8.63058 8.73717L6.78869 14.2628C6.65771 14.6558 6.87008 15.0805 7.26303 15.2115C7.65599 15.3425 8.08073 15.1301 8.21172 14.7372L8.70744 13.25H11.293L11.7887 14.7372C11.9197 15.1301 12.3444 15.3425 12.7374 15.2115C13.1303 15.0805 13.3427 14.6558 13.2117 14.2628L11.3698 8.73717C11.1733 8.14764 10.6216 7.75 10.0002 7.75ZM10.0002 9.37171L10.793 11.75H9.20744L10.0002 9.37171ZM16.2502 8.5C16.2502 8.08579 15.9144 7.75 15.5002 7.75C15.086 7.75 14.7502 8.08579 14.7502 8.5V14.5C14.7502 14.9142 15.086 15.25 15.5002 15.25C15.9144 15.25 16.2502 14.9142 16.2502 14.5V8.5Z',
  d5: 'M8.01469 2.12505C8.17792 2.05383 8.41768 1.97156 8.70208 2.00964C9.01124 2.05104 9.24043 2.22749 9.37221 2.33765C9.51213 2.45463 9.86405 2.80365 9.86405 2.80365C10.4471 3.3818 11.2235 3.67098 12 3.6712C12.7765 3.67098 13.5529 3.3818 14.136 2.80365C14.136 2.80365 14.4879 2.45463 14.6278 2.33765C14.7596 2.22749 14.9888 2.05104 15.2979 2.00964C15.5823 1.97156 15.8221 2.05383 15.9853 2.12505C16.1354 2.19053 16.3046 2.28612 16.4689 2.37884L18.718 3.66735C18.8638 3.7705 19.0609 3.93471 19.174 4.20043C19.2974 4.49052 19.2576 4.7829 19.2283 4.95201C19.1965 5.13501 19.1307 5.38696 19.0677 5.62806C18.6714 7.14488 19.6393 8.77659 21.2062 9.19652L21.2338 9.20391C21.4709 9.26742 21.693 9.32693 21.8667 9.38956C22.0293 9.44815 22.3009 9.55815 22.4923 9.80648C22.6682 10.0347 22.7148 10.2848 22.7332 10.4618C22.7501 10.6251 22.75 10.8204 22.75 11.0105V12.9896C22.75 13.1797 22.7501 13.375 22.7332 13.5382C22.7148 13.7153 22.6682 13.9654 22.4923 14.1936C22.3009 14.4419 22.0293 14.5519 21.8668 14.6105C21.6931 14.6731 21.2063 14.8036 21.2063 14.8036C19.64 15.2234 18.6727 16.8549 19.0692 18.3719C19.0692 18.3719 19.1981 18.8649 19.2298 19.0479C19.2592 19.217 19.299 19.5094 19.1756 19.7995C19.0625 20.0652 18.8655 20.2295 18.7196 20.3326L16.4705 21.6211L16.4704 21.6212C16.3062 21.7139 16.1369 21.8095 15.9869 21.875C15.8236 21.9462 15.5838 22.0285 15.2994 21.9904C14.9902 21.9489 14.7611 21.7725 14.6293 21.6623C14.4894 21.5453 14.1375 21.1962 14.1375 21.1962C13.5541 20.6176 12.7771 20.3281 12 20.3279C11.2229 20.3281 10.4459 20.6176 9.86249 21.1962C9.86249 21.1962 9.51065 21.5453 9.37072 21.6623C9.23894 21.7725 9.00977 21.9489 8.70059 21.9904C8.41618 22.0285 8.17639 21.9462 8.01315 21.875C7.86312 21.8095 7.6938 21.7139 7.52962 21.6212L7.52952 21.6211L5.28035 20.3326C5.13453 20.2295 4.93749 20.0652 4.82441 19.7995C4.70097 19.5094 4.74082 19.217 4.77017 19.0479C4.80192 18.8649 4.93082 18.3719 4.93082 18.3719C5.32731 16.8549 4.36003 15.2234 2.79374 14.8036C2.79374 14.8036 2.30694 14.6731 2.13322 14.6105C1.97071 14.5519 1.69909 14.4419 1.5077 14.1936C1.33181 13.9654 1.28519 13.7153 1.26684 13.5382C1.24992 13.375 1.24996 13.1797 1.25 12.9896V11.0105C1.24996 10.8204 1.24992 10.6251 1.26684 10.4618C1.28519 10.2848 1.33182 10.0347 1.50772 9.80648C1.69912 9.55815 1.97074 9.44815 2.13327 9.38956C2.30699 9.32693 2.52912 9.26742 2.76618 9.20391L2.79378 9.19652C4.36065 8.77659 5.32857 7.14488 4.93233 5.62806C4.86932 5.38696 4.80348 5.13501 4.77174 4.95201C4.74241 4.7829 4.70258 4.49052 4.82604 4.20043C4.93913 3.93471 5.13616 3.7705 5.28197 3.66735L7.53113 2.37884C7.69535 2.28612 7.86464 2.19053 8.01469 2.12505Z',
  d6: 'M8.63058 8.73717C8.82709 8.14764 9.37879 7.75 10.0002 7.75C10.6216 7.75 11.1733 8.14764 11.3698 8.73717L10.6583 8.97434L11.3698 8.73717L13.2117 14.2628C13.3427 14.6558 13.1303 15.0805 12.7374 15.2115C12.3444 15.3425 11.9197 15.1301 11.7887 14.7372L11.293 13.25H8.70744L8.21172 14.7372C8.08073 15.1301 7.65599 15.3425 7.26303 15.2115C6.87008 15.0805 6.65771 14.6558 6.78869 14.2628L8.63058 8.73717ZM9.20744 11.75H10.793L10.0002 9.37171L9.20744 11.75ZM15.5002 7.75C15.9144 7.75 16.2502 8.08579 16.2502 8.5V14.5C16.2502 14.9142 15.9144 15.25 15.5002 15.25C15.086 15.25 14.7502 14.9142 14.7502 14.5V8.5C14.7502 8.08579 15.086 7.75 15.5002 7.75Z',
  d7: 'M10.3571 8.5L11.058 8.233L10.874 7.75H10.3571V8.5ZM11.942 14.767L12.209 15.4679L13.6107 14.9339L13.3437 14.233L11.942 14.767ZM16.25 8.5V7.75H14.75V8.5H16.25ZM14.75 14.5V15.25H16.25V14.5H14.75ZM9.78571 8.5V7.75H9.26885L9.08485 8.233L9.78571 8.5ZM6.79913 14.233L6.53214 14.9339L7.93387 15.4679L8.20087 14.767L6.79913 14.233ZM9.65628 8.767L11.942 14.767L13.3437 14.233L11.058 8.233L9.65628 8.767ZM14.75 8.5V14.5H16.25V8.5H14.75ZM9.08485 8.233L6.79913 14.233L8.20087 14.767L10.4866 8.767L9.08485 8.233ZM8.11538 13.45H12.0714V11.95H8.11538V13.45ZM10.3571 7.75H9.78571V9.25H10.3571V7.75Z',
  d8: 'M22 13.9669V10.0332C19.1433 10.0332 17.2857 6.93041 18.732 4.46691L15.2679 2.5001C13.8038 4.99405 10.1978 4.99395 8.73363 2.5L5.26953 4.46681C6.71586 6.93035 4.85673 10.0332 2 10.0332V13.9669C4.85668 13.9669 6.71425 17.0697 5.26795 19.5332L8.73205 21.5C10.1969 19.0048 13.8046 19.0047 15.2695 21.4999L18.7336 19.5331C17.2874 17.0696 19.1434 13.9669 22 13.9669Z',
  d9: 'M9.38041 2.13643L9.00615 1.5L4.2375 4.20307L4.62276 4.85822C5.76109 6.79398 4.30575 9.28768 2 9.28768H1.25V14.7124H2C4.30517 14.7124 5.75974 17.2056 4.62118 19.1418L4.23592 19.7969L9.00457 22.5L9.37882 21.8636C10.5539 19.8654 13.4477 19.8653 14.6228 21.8635L14.997 22.4999L19.7657 19.7968L19.3804 19.1417C18.2416 17.2051 19.6954 14.7124 22 14.7124H22.75V9.28768H22C19.6948 9.28768 18.2403 6.79448 19.3788 4.85831L19.7641 4.20317L14.9954 1.5001L14.6212 2.13652C13.4469 4.13346 10.5548 4.13343 9.38041 2.13643ZM10.8731 7.75H9.26796L6.53125 14.9339L7.93298 15.4679L8.70169 13.45H11.4394L12.2081 15.4679L13.6098 14.9339L10.8731 7.75ZM10.868 11.95H9.27312L10.0705 9.85677L10.868 11.95ZM16.2491 15.25V7.75H14.7491V15.25H16.2491Z',
};

export const IconArtificialIntelligence06StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-stroke-rounded IconArtificialIntelligence06StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconArtificialIntelligence06DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-duotone-rounded IconArtificialIntelligence06DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
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
      />
    </TheIconWrapper>
  );
};

export const IconArtificialIntelligence06TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-twotone-rounded IconArtificialIntelligence06TwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArtificialIntelligence06SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-solid-rounded IconArtificialIntelligence06SolidRounded"
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

export const IconArtificialIntelligence06BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-bulk-rounded IconArtificialIntelligence06BulkRounded"
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
    </TheIconWrapper>
  );
};

export const IconArtificialIntelligence06StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-stroke-sharp IconArtificialIntelligence06StrokeSharp"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconArtificialIntelligence06SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="artificial-intelligence-06-solid-sharp IconArtificialIntelligence06SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfArtificialIntelligence06: TheIconSelfPack = {
  name: 'ArtificialIntelligence06',
  StrokeRounded: IconArtificialIntelligence06StrokeRounded,
  DuotoneRounded: IconArtificialIntelligence06DuotoneRounded,
  TwotoneRounded: IconArtificialIntelligence06TwotoneRounded,
  SolidRounded: IconArtificialIntelligence06SolidRounded,
  BulkRounded: IconArtificialIntelligence06BulkRounded,
  StrokeSharp: IconArtificialIntelligence06StrokeSharp,
  SolidSharp: IconArtificialIntelligence06SolidSharp,
};