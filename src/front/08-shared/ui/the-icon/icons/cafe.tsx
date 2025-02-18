import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18 7.79197C18.883 7.40618 19.5 6.52513 19.5 5.5L18 3H6L4.5 5.5C4.5 6.52513 5.11705 7.40618 6 7.79197M18 7.79197C17.6938 7.92577 17.3556 8 17 8C15.6193 8 14.5 6.88067 14.5 5.5C14.5 6.88067 13.3807 8 12 8C10.6193 8 9.5 6.88067 9.5 5.5C9.5 6.88067 8.38072 8 7 8C6.64445 8 6.30623 7.92577 6 7.79197M18 7.79197V11M6 7.79197V11',
  d2: 'M3 12V17M3 17H5C6.41421 17 7.12132 17 7.56066 17.4393C8 17.8787 8 18.5858 8 20V21M3 17V21',
  d3: 'M21 12V17M21 17H19C17.5858 17 16.8787 17 16.4393 17.4393C16 17.8787 16 18.5858 16 20V21M21 17V21',
  d4: 'M7 14H12M17 14H12M12 14V21M12 21H11M12 21H13',
  d5: 'M7 8C8.38072 8 9.5 6.88067 9.5 5.5C9.5 6.88067 10.6193 8 12 8C13.3807 8 14.5 6.88067 14.5 5.5C14.5 6.88067 15.6193 8 17 8C17.3556 8 17.6938 7.92577 18 7.79197C18.883 7.40618 19.5 6.52513 19.5 5.5L18 3H6L4.5 5.5C4.5 6.52513 5.11705 7.40618 6 7.79197C6.30623 7.92577 6.64445 8 7 8Z',
  d6: 'M5.31397 2.72312C5.49017 2.42945 5.80754 2.24976 6.15002 2.24976H17.85C18.1925 2.24976 18.5099 2.42945 18.6861 2.72312L20.1486 5.16062C20.2395 5.31215 20.2875 5.48554 20.2875 5.66226C20.2875 6.82296 19.7081 7.84687 18.825 8.46285V11.0248C18.825 11.5632 18.3885 11.9998 17.85 11.9998C17.3115 11.9998 16.875 11.5632 16.875 11.0248V9.07476C15.9202 9.07476 15.0569 8.68257 14.4375 8.05049C13.8182 8.68257 12.9549 9.07476 12 9.07476C11.0452 9.07476 10.1819 8.68257 9.56252 8.05049C8.94315 8.68257 8.07989 9.07476 7.12502 9.07476L7.12502 11.0248C7.12502 11.5632 6.6885 11.9998 6.15002 11.9998C5.61155 11.9998 5.17502 11.5632 5.17502 11.0248V8.46285C4.29193 7.84687 3.71252 6.82296 3.71252 5.66226C3.71252 5.48554 3.76055 5.31215 3.85147 5.16062L5.31397 2.72312Z',
  d7: 'M3.225 11.0251C3.76348 11.0251 4.2 11.4617 4.2 12.0001V15.9001H5.175C5.19509 15.9001 5.21511 15.9001 5.23507 15.9001C5.87284 15.9001 6.44586 15.9 6.90968 15.9624C7.41605 16.0305 7.93554 16.1885 8.36107 16.6141C8.7866 17.0396 8.94468 17.5591 9.01276 18.0655C9.07512 18.5293 9.07506 19.1023 9.075 19.7401C9.075 19.76 9.075 19.7801 9.075 19.8001V20.7751C9.075 21.3136 8.63848 21.7501 8.1 21.7501C7.56152 21.7501 7.125 21.3136 7.125 20.7751V19.8001C7.125 19.0832 7.12293 18.6435 7.08015 18.3253C7.04255 18.0456 6.98907 17.9989 6.98273 17.9934C6.98249 17.9932 6.98283 17.9935 6.98273 17.9934C6.98262 17.9933 6.98196 17.9927 6.98176 17.9924C6.97622 17.9861 6.92952 17.9326 6.64984 17.895C6.33165 17.8522 5.89199 17.8501 5.175 17.8501H4.2V20.7751C4.2 21.3136 3.76348 21.7501 3.225 21.7501C2.68652 21.7501 2.25 21.3136 2.25 20.7751V12.0001C2.25 11.4617 2.68652 11.0251 3.225 11.0251Z',
  d8: 'M20.775 11.0251C21.3135 11.0251 21.75 11.4617 21.75 12.0001V20.7751C21.75 21.3136 21.3135 21.7501 20.775 21.7501C20.2365 21.7501 19.8 21.3136 19.8 20.7751V17.8501H18.825C18.108 17.8501 17.6683 17.8522 17.3502 17.895C17.0705 17.9326 17.0238 17.9861 17.0182 17.9924C17.018 17.9927 17.0183 17.9923 17.0182 17.9924C17.0181 17.9925 17.0175 17.9932 17.0173 17.9934C17.0109 17.9989 16.9574 18.0456 16.9198 18.3253C16.8771 18.6435 16.875 19.0832 16.875 19.8001V20.7751C16.875 21.3136 16.4385 21.7501 15.9 21.7501C15.3615 21.7501 14.925 21.3136 14.925 20.7751V19.8001C14.925 19.7801 14.925 19.76 14.925 19.7401C14.9249 19.1023 14.9249 18.5293 14.9872 18.0655C15.0553 17.5591 15.2134 17.0396 15.6389 16.6141C16.0645 16.1885 16.5839 16.0305 17.0903 15.9624C17.5541 15.9 18.1272 15.9001 18.7649 15.9001C18.7849 15.9001 18.8049 15.9001 18.825 15.9001H19.8V12.0001C19.8 11.4617 20.2365 11.0251 20.775 11.0251Z',
  d9: 'M6.15002 13.9494C6.15002 13.4109 6.58655 12.9744 7.12502 12.9744H16.875C17.4135 12.9744 17.85 13.4109 17.85 13.9494C17.85 14.4878 17.4135 14.9244 16.875 14.9244H12.975V19.7994C13.5135 19.7994 13.95 20.2359 13.95 20.7744C13.95 21.3128 13.5135 21.7494 12.975 21.7494H11.025C10.4865 21.7494 10.05 21.3128 10.05 20.7744C10.05 20.2359 10.4865 19.7994 11.025 19.7994V14.9244H7.12502C6.58655 14.9244 6.15002 14.4878 6.15002 13.9494Z',
  d10: 'M3 12V17M3 17H8V21M3 17V21',
  d11: 'M21 12V17M21 17H16V21M21 17V21',
  d12: 'M20.2875 5.3922V5.66226C20.2875 6.82296 19.7081 7.84687 18.825 8.46285V11.9998H16.875V9.07476C15.9202 9.07476 15.0569 8.68257 14.4375 8.05049C13.8182 8.68257 12.9549 9.07476 12 9.07476C11.0452 9.07476 10.1819 8.68257 9.56252 8.05049C8.94315 8.68257 8.07989 9.07476 7.12502 9.07476L7.12502 11.9998H5.17502V8.46285C4.29193 7.84687 3.71252 6.82296 3.71252 5.66226V5.3922L5.59799 2.24976H18.4021L20.2875 5.3922Z',
  d13: 'M4.2 11.0251V15.9001H9.075V21.7501H7.125V17.8501H4.2V21.7501H2.25V11.0251H4.2Z',
  d14: 'M21.75 11.0251V21.7501H19.8V17.8501H16.875V21.7501H14.925V15.9001H19.8V11.0251H21.75Z',
  d15: 'M6.15002 12.9744H17.85V14.9244H12.975V19.7994H13.95V21.7494H10.05V19.7994H11.025V14.9244H6.15002V12.9744Z',
};

export const IconCafeStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-stroke-rounded IconCafeStrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-duotone-rounded IconCafeDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-twotone-rounded IconCafeTwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-solid-rounded IconCafeSolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-bulk-rounded IconCafeBulkRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-stroke-sharp IconCafeStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconCafeSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="cafe-solid-sharp IconCafeSolidSharp"
    >
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCafe: TheIconSelfPack = {
  name: 'Cafe',
  StrokeRounded: IconCafeStrokeRounded,
  DuotoneRounded: IconCafeDuotoneRounded,
  TwotoneRounded: IconCafeTwotoneRounded,
  SolidRounded: IconCafeSolidRounded,
  BulkRounded: IconCafeBulkRounded,
  StrokeSharp: IconCafeStrokeSharp,
  SolidSharp: IconCafeSolidSharp,
};