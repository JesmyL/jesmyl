import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14Z',
  d2: 'M4.5 3L5.825 5.12C6.3994 6.03905 6.68661 6.49857 7.13896 6.74928C7.59131 7 8.1332 7 9.21699 7H14.783C15.8668 7 16.4087 7 16.861 6.74928C17.3134 6.49857 17.6006 6.03905 18.175 5.12L19.5 3',
  d3: 'M11.75 15.25C12.9368 16.4368 14.5 17.6429 14.5 17.6429L16.6429 15.5C16.6429 15.5 15.4368 13.9368 14.25 12.75C13.0632 11.5632 11.5 10.3571 11.5 10.3571L9.35714 12.5C9.35714 12.5 10.5632 14.0632 11.75 15.25ZM11.75 15.25L8 19M17 15.1429L14.1429 18M11.8571 10L9 12.8571',
  d4: 'M3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22876 21 4.34315 19.8284 3.17157C19.7805 3.12361 19.7164 3.09941 19.6523 3.07521C19.5985 3.05485 19.5446 3.03449 19.5003 3L18.1753 5.12C17.6009 6.03905 17.3137 6.49857 16.8613 6.74928C16.409 7 15.8671 7 14.7833 7H9.21729C8.13351 7 7.59161 7 7.13926 6.74928C6.68691 6.49857 6.39971 6.03905 5.8253 5.12L4.5003 3L4.17157 3.17157C3 4.34315 3 6.22876 3 10ZM11.5003 10.3572C11.5003 10.3572 13.0635 11.5632 14.2503 12.75C15.4371 13.9368 16.6431 15.5 16.6431 15.5L14.5003 17.6429C14.5003 17.6429 12.9371 16.4368 11.7503 15.25C10.5635 14.0632 9.35742 12.5 9.35742 12.5L11.5003 10.3572Z',
  d5: 'M13.0463 1.25H10.9537H10.9536C9.17581 1.24998 7.74277 1.24996 6.61573 1.40184C5.44559 1.55952 4.46035 1.89687 3.67786 2.68119C2.89537 3.4655 2.5588 4.45303 2.40148 5.6259C2.24996 6.75557 2.24998 8.19193 2.25 9.97392V9.97394V14.0261V14.0261C2.24998 15.8081 2.24996 17.2444 2.40148 18.3741C2.5588 19.547 2.89537 20.5345 3.67786 21.3188C4.46035 22.1031 5.44559 22.4405 6.61573 22.5982C7.74279 22.75 9.17581 22.75 10.9537 22.75H13.0463C14.8242 22.75 16.2572 22.75 17.3843 22.5982C18.5544 22.4405 19.5397 22.1031 20.3221 21.3188C21.1046 20.5345 21.4412 19.547 21.5985 18.3741C21.75 17.2444 21.75 15.808 21.75 14.026V9.97398C21.75 8.19196 21.75 6.75559 21.5985 5.6259C21.4412 4.45303 21.1046 3.4655 20.3221 2.68119C19.5397 1.89687 18.5544 1.55952 17.3843 1.40184C16.2572 1.24996 14.8242 1.24998 13.0464 1.25H13.0463ZM6.4503 3.40917C6.58149 3.38299 6.72299 3.35962 6.87603 3.33899C7.85798 3.20667 9.15943 3.20459 11.0255 3.20459H12.9755C14.8415 3.20459 16.143 3.20667 17.1249 3.33899C17.278 3.35963 17.4196 3.38301 17.5509 3.40922C17.8497 3.46889 17.9992 3.49873 18.0616 3.6432C18.1239 3.78767 18.0354 3.92934 17.8583 4.21267L17.5396 4.72264C17.2449 5.19413 17.0509 5.50303 16.8776 5.72913C16.714 5.94256 16.6029 6.03534 16.498 6.09345C16.3932 6.15155 16.2556 6.1966 15.9879 6.22222C15.7043 6.24935 15.3396 6.25014 14.7836 6.25014H9.21756C8.66156 6.25014 8.2968 6.24935 8.0132 6.22222C7.74551 6.1966 7.60794 6.15155 7.50311 6.09345C7.39827 6.03534 7.28716 5.94256 7.12356 5.72913C6.95024 5.50303 6.75625 5.19413 6.46157 4.72264L6.14282 4.21265C5.96573 3.9293 5.87718 3.78762 5.93956 3.64315C6.00194 3.49868 6.15139 3.46884 6.4503 3.40917ZM17.5303 14.6125C17.8232 14.9054 17.8232 15.3803 17.5303 15.6732L14.6732 18.5303C14.3803 18.8232 13.9054 18.8232 13.6125 18.5303C13.4021 18.3199 13.3428 18.0155 13.4348 17.7522C13.3292 17.6661 13.2132 17.5705 13.0896 17.4673C12.7496 17.1837 12.3476 16.8387 11.944 16.4702L8.95711 19.4571C8.56658 19.8476 7.93342 19.8476 7.54289 19.4571C7.15237 19.0666 7.15237 18.4334 7.54289 18.0429L10.5298 15.056C10.1613 14.6524 9.81631 14.2504 9.53265 13.9104C9.42947 13.7868 9.33394 13.6708 9.24782 13.5652C8.98449 13.6572 8.68011 13.5979 8.46967 13.3875C8.17678 13.0946 8.17678 12.6197 8.46967 12.3268L11.3268 9.46967C11.6197 9.17678 12.0946 9.17678 12.3875 9.46967C12.5979 9.68011 12.6572 9.98449 12.5652 10.2478C12.6708 10.3339 12.7868 10.4295 12.9104 10.5327C13.4571 10.9887 14.164 11.6033 14.7803 12.2197C15.3967 12.836 16.0113 13.5429 16.4673 14.0896C16.5705 14.2132 16.6661 14.3292 16.7522 14.4348C17.0155 14.3428 17.3199 14.4021 17.5303 14.6125Z',
  d6: 'M10.9537 1.25H13.0463H13.0464C14.8242 1.24998 16.2572 1.24996 17.3843 1.40184C18.5544 1.55952 19.5397 1.89687 20.3221 2.68119C21.1046 3.4655 21.4412 4.45303 21.5985 5.6259C21.75 6.75559 21.75 8.19196 21.75 9.97398V14.026C21.75 15.808 21.75 17.2444 21.5985 18.3741C21.4412 19.547 21.1046 20.5345 20.3221 21.3188C19.5397 22.1031 18.5544 22.4405 17.3843 22.5982C16.2572 22.75 14.8242 22.75 13.0463 22.75H10.9537C9.17581 22.75 7.74279 22.75 6.61573 22.5982C5.44559 22.4405 4.46035 22.1031 3.67786 21.3188C2.89537 20.5345 2.5588 19.547 2.40148 18.3741C2.24996 17.2444 2.24998 15.8081 2.25 14.0261V14.0261V9.97394V9.97392C2.24998 8.19193 2.24996 6.75557 2.40148 5.6259C2.5588 4.45303 2.89537 3.4655 3.67786 2.68119C4.46035 1.89687 5.44559 1.55952 6.61573 1.40184C7.74277 1.24996 9.17581 1.24998 10.9536 1.25H10.9537Z',
  d7: 'M6.87632 3.33753C6.72327 3.35815 6.58178 3.38152 6.45059 3.40771C6.15168 3.46738 6.00222 3.49721 5.93985 3.64168C5.87747 3.78616 5.96602 3.92783 6.14311 4.21118L6.46185 4.72118C6.75654 5.19267 6.95053 5.50156 7.12385 5.72767C7.28745 5.94109 7.39855 6.03387 7.50339 6.09198C7.60823 6.15009 7.7458 6.19513 8.01349 6.22075C8.29709 6.24789 8.66184 6.24868 9.21785 6.24868H14.7839C15.3399 6.24868 15.7046 6.24789 15.9882 6.22075C16.2559 6.19513 16.3935 6.15009 16.4983 6.09198C16.6032 6.03388 16.7143 5.94109 16.8779 5.72767C17.0512 5.50156 17.2452 5.19267 17.5399 4.72118L17.8586 4.21121C18.0357 3.92787 18.1242 3.78621 18.0618 3.64174C17.9995 3.49727 17.85 3.46743 17.5511 3.40775C17.4199 3.38155 17.2783 3.35816 17.1252 3.33753C16.1432 3.2052 14.8418 3.20312 12.9758 3.20312H11.0258C9.15972 3.20312 7.85827 3.2052 6.87632 3.33753Z',
  d8: 'M17.5303 15.6732C17.8232 15.3803 17.8232 14.9054 17.5303 14.6125C17.3199 14.4021 17.0155 14.3428 16.7522 14.4348C16.6661 14.3292 16.5705 14.2132 16.4673 14.0896C16.0113 13.5429 15.3967 12.836 14.7803 12.2197C14.164 11.6033 13.4571 10.9887 12.9104 10.5327C12.7868 10.4295 12.6708 10.3339 12.5652 10.2478C12.6572 9.98449 12.5979 9.68011 12.3875 9.46967C12.0946 9.17678 11.6197 9.17678 11.3268 9.46967L8.46967 12.3268C8.17678 12.6197 8.17678 13.0946 8.46967 13.3875C8.68011 13.5979 8.98449 13.6572 9.24782 13.5652C9.33394 13.6708 9.42947 13.7868 9.53265 13.9104C9.81631 14.2504 10.1613 14.6524 10.5298 15.056L7.54289 18.0429C7.15237 18.4334 7.15237 19.0666 7.54289 19.4571C7.93342 19.8476 8.56658 19.8476 8.95711 19.4571L11.944 16.4702C12.3476 16.8387 12.7496 17.1837 13.0896 17.4673C13.2132 17.5705 13.3292 17.6661 13.4348 17.7522C13.3428 18.0155 13.4021 18.3199 13.6125 18.5303C13.9054 18.8232 14.3803 18.8232 14.6732 18.5303L17.5303 15.6732Z',
  d9: 'M3 2V22H21V2H3Z',
  d10: 'M3 2L7 7H17L21 2',
  d11: 'M11.499 14.9998L7.99902 18.4999M11.9992 10.4994L15.9995 14.4998L13.4994 17L9.49902 12.9996L11.9992 10.4994Z',
  d12: 'M3.225 1.25C2.96641 1.25 2.71842 1.35296 2.53557 1.53624C2.35272 1.71951 2.25 1.96808 2.25 2.22727V21.7727C2.25 22.3125 2.68652 22.75 3.225 22.75H20.775C21.3135 22.75 21.75 22.3125 21.75 21.7727V2.22727C21.75 1.68754 21.3135 1.25 20.775 1.25H3.225ZM19.0772 3.20459H4.92578L7.36196 6.24982H16.641L19.0772 3.20459ZM12.5296 9.96919C12.3889 9.82853 12.1982 9.74951 11.9993 9.74951C11.8003 9.74951 11.6096 9.82853 11.4689 9.96919L8.96875 12.4694C8.67587 12.7623 8.67587 13.2372 8.96875 13.5301L10.4385 14.9999L7.46875 17.9697L8.52943 19.0304L11.4992 16.0605L12.9691 17.5305C13.1098 17.6711 13.3005 17.7501 13.4994 17.7501C13.6984 17.7501 13.8891 17.6711 14.0298 17.5305L16.5299 15.0303C16.8228 14.7374 16.8228 14.2625 16.5299 13.9696L12.5296 9.96919Z',
};

export const IconSubpoenaStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-stroke-rounded IconSubpoenaStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSubpoenaDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-duotone-rounded IconSubpoenaDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
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
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconSubpoenaTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-twotone-rounded IconSubpoenaTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSubpoenaSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-solid-rounded IconSubpoenaSolidRounded"
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

export const IconSubpoenaBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-bulk-rounded IconSubpoenaBulkRounded"
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
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSubpoenaStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-stroke-sharp IconSubpoenaStrokeSharp"
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
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSubpoenaSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="subpoena-solid-sharp IconSubpoenaSolidSharp"
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

export const iconPackOfSubpoena: TheIconSelfPack = {
  name: 'Subpoena',
  StrokeRounded: IconSubpoenaStrokeRounded,
  DuotoneRounded: IconSubpoenaDuotoneRounded,
  TwotoneRounded: IconSubpoenaTwotoneRounded,
  SolidRounded: IconSubpoenaSolidRounded,
  BulkRounded: IconSubpoenaBulkRounded,
  StrokeSharp: IconSubpoenaStrokeSharp,
  SolidSharp: IconSubpoenaSolidSharp,
};