import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M16.5 21V15.5C16.5 15.0353 16.5 14.803 16.4616 14.6098C16.3038 13.8164 15.6836 13.1962 14.8902 13.0384C14.697 13 14 13 14 13C13.5 17.9993 9.5 19 9.5 19C9.5 19 5.5 18 5 13C5 13 4.30302 13 4.10982 13.0384C3.31644 13.1962 2.69624 13.8164 2.53843 14.6098C2.5 14.803 2.5 15.0353 2.5 15.5V21',
  d2: 'M9.5 13.4998L11.5 12.4998V14.4998L9.5 13.4998ZM9.5 13.4998L7.5 12.5V14.5L9.5 13.4998Z',
  d3: 'M12.5 6.9375V6.0625C12.5 4.37113 11.1569 3 9.5 3C7.84315 3 6.5 4.37113 6.5 6.0625V6.9375C6.5 8.62887 7.84315 10 9.5 10C11.1569 10 12.5 8.62887 12.5 6.9375Z',
  d4: 'M21.5 21V15.5C21.5 15.0353 21.5 14.803 21.4616 14.6098C21.3038 13.8164 20.6836 13.1962 19.8902 13.0384C19.697 13 19.4647 13 19 13',
  d5: 'M14.5 3.17426C14.8128 3.06141 15.1494 3 15.5 3C17.1569 3 18.5 4.37113 18.5 6.0625V6.9375C18.5 8.62887 17.1569 10 15.5 10C15.1494 10 14.8128 9.93859 14.5 9.82574',
  d6: 'M18.5 6.9375V6.0625C18.5 4.37113 17.1569 3 15.5 3C13.8431 3 12.5 4.37113 12.5 6.0625V6.9375C12.5 8.62887 13.8431 10 15.5 10C17.1569 10 18.5 8.62887 18.5 6.9375Z',
  d7: 'M16.5 21V15.5C16.5 15.0353 16.5 14.803 16.4615 14.6098C16.3037 13.8164 15.6835 13.1962 14.8901 13.0384L19 13C19.4646 13 19.6969 13 19.8901 13.0384C20.6835 13.1962 21.3037 13.8164 21.4615 14.6098C21.5 14.803 21.5 15.0353 21.5 15.5V21H16.5Z',
  d8: 'M5 12.25C5.38531 12.25 5.70798 12.542 5.74633 12.9254C5.97464 15.2085 6.98866 16.5337 7.91433 17.2961C8.38416 17.683 8.83976 17.9312 9.17443 18.0814C9.30429 18.1397 9.415 18.1829 9.49999 18.2133C9.58499 18.1828 9.69571 18.1397 9.82559 18.0814C10.1603 17.9311 10.6159 17.6828 11.0857 17.2958C12.0115 16.5334 13.0255 15.2081 13.2538 12.9254C13.2921 12.542 13.6147 12.25 14 12.25C14 12.25 14.862 12.2681 15.0365 12.3028C16.1274 12.5198 16.9802 13.3726 17.1972 14.4635C17.2504 14.731 17.2503 15.034 17.2501 15.4267V15.4267L17.25 21C17.25 21.4142 16.9143 21.75 16.5 21.75H2.50005C2.08583 21.75 1.75005 21.4142 1.75005 21L1.75002 15.4267C1.74983 15.034 1.74968 14.731 1.80289 14.4635C2.01988 13.3726 2.87265 12.5198 3.96355 12.3028C4.1381 12.2681 5 12.25 5 12.25Z',
  d9: 'M20.0364 12.3038C19.2038 12.0721 18.0073 12.0043 17.1332 11.9888C17.7837 12.5579 18.2471 13.3348 18.4231 14.2194C18.501 14.6111 18.5004 15.0258 18.5 15.3688L18.4999 20.9998C18.4999 21.2655 18.4481 21.5191 18.3541 21.751H21.4999C21.9141 21.751 22.2499 21.4152 22.2499 21.001L22.2499 15.4277C22.2501 15.035 22.2503 14.732 22.1971 14.4645C21.9801 13.3736 21.1273 12.5208 20.0364 12.3038Z',
  d10: 'M5.75 6.0625C5.75 3.97157 7.41443 2.25 9.5 2.25C11.5856 2.25 13.25 3.97157 13.25 6.0625V6.9375C13.25 9.02843 11.5856 10.75 9.5 10.75C7.41443 10.75 5.75 9.02843 5.75 6.9375V6.0625Z',
  d11: 'M11.8943 11.8618C12.1154 11.9984 12.25 12.2398 12.25 12.4998V14.4998C12.25 14.7597 12.1154 15.0011 11.8943 15.1377C11.6732 15.2744 11.3971 15.2868 11.1646 15.1706L9.50004 14.3383L7.83547 15.1708C7.60298 15.287 7.32686 15.2746 7.10573 15.138C6.8846 15.0013 6.75 14.7599 6.75 14.5V12.5C6.75 12.2401 6.88458 11.9987 7.10567 11.862C7.32677 11.7253 7.60286 11.7129 7.83535 11.8291L9.49996 12.6612L11.1646 11.8289C11.3971 11.7127 11.6732 11.7251 11.8943 11.8618Z',
  d12: 'M13.777 3.43927C14.237 4.20813 14.5 5.10752 14.5 6.06055V6.93555C14.5 7.88857 14.237 8.78797 13.777 9.55682C14.4582 10.2889 15.4229 10.748 16.5 10.748C18.5855 10.748 20.25 9.02648 20.25 6.93555V6.06055C20.25 3.96961 18.5855 2.24805 16.5 2.24805C15.4229 2.24805 14.4582 2.70721 13.777 3.43927Z',
  d13: 'M16.5 21V15.0079C16.5 13.9153 15.6232 13.025 14.5307 13.0082L14 13C14 18.5 9.5 19.5 9.5 19.5C9.5 19.5 5 18.5 5 13L4.46926 13.0082C3.37681 13.025 2.5 13.9153 2.5 15.0079V21',
  d14: 'M21.5 21V15C21.5 13.8954 20.6046 13 19.5 13H19',
  d15: 'M12.25 11.2864V15.7134L9.50004 14.3384L6.75 15.7138V11.2867L9.49996 12.6614L12.25 11.2864Z',
  d16: 'M5.75 12.2383V12.9999C5.75 15.5113 6.76342 16.9306 7.73014 17.7362C8.22436 18.1481 8.72001 18.4098 9.09077 18.5677C9.25895 18.6393 9.39956 18.6888 9.5 18.7208C9.60044 18.6888 9.74105 18.6393 9.90923 18.5677C10.28 18.4098 10.7756 18.1481 11.2699 17.7362C12.2366 16.9306 13.25 15.5113 13.25 12.9999V12.2383L14.5423 12.2581C16.0444 12.2812 17.25 13.5055 17.25 15.0078V21.7499H1.75V15.0078C1.75 13.5055 2.95561 12.2812 4.45773 12.2581L5.75 12.2383Z',
  d17: 'M13.4039 2.90017C14.0921 3.7721 14.5 4.87572 14.5 6.0625V6.9375C14.5 8.12428 14.0921 9.2279 13.4039 10.0998C14.0006 10.5098 14.7209 10.75 15.5 10.75C17.5856 10.75 19.25 9.02843 19.25 6.9375V6.0625C19.25 3.97157 17.5856 2.25 15.5 2.25C14.7209 2.25 14.0006 2.49022 13.4039 2.90017Z',
  d18: 'M17.3975 12.25H19.5C21.0188 12.25 22.25 13.4812 22.25 15V21.75H18.5V15.0077C18.5 13.9395 18.081 12.9681 17.3975 12.25Z',
};

export const IconWaitersStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-stroke-rounded IconWaitersStrokeRounded"
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-duotone-rounded IconWaitersDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d7} 
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
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-twotone-rounded IconWaitersTwotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-solid-rounded IconWaitersSolidRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-bulk-rounded IconWaitersBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-stroke-sharp IconWaitersStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
      />
    </TheIconWrapper>
  );
};

export const IconWaitersSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="waiters-solid-sharp IconWaitersSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfWaiters: TheIconSelfPack = {
  name: 'Waiters',
  StrokeRounded: IconWaitersStrokeRounded,
  DuotoneRounded: IconWaitersDuotoneRounded,
  TwotoneRounded: IconWaitersTwotoneRounded,
  SolidRounded: IconWaitersSolidRounded,
  BulkRounded: IconWaitersBulkRounded,
  StrokeSharp: IconWaitersStrokeSharp,
  SolidSharp: IconWaitersSolidSharp,
};