import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 3H6.73259C9.34372 3 10.6493 3 11.8679 3.40119C13.0866 3.80239 14.1368 4.57795 16.2373 6.12907L19.9289 8.85517C19.9692 8.88495 19.9894 8.89984 20.0084 8.91416C21.2491 9.84877 21.985 11.307 21.9998 12.8603C22 12.8841 22 12.9091 22 12.9593C22 12.9971 22 13.016 21.9997 13.032C21.9825 14.1115 21.1115 14.9825 20.032 14.9997C20.016 15 19.9971 15 19.9593 15H2',
  d2: 'M2 8H3.89284C4.16278 8 4.29775 8 4.4256 8.0082C5.52021 8.07839 6.53798 8.595 7.24076 9.43715C7.32284 9.53551 7.40251 9.64446 7.56185 9.86235C7.61383 9.93344 7.63982 9.96899 7.66371 10.0048C7.86673 10.3091 7.98241 10.6633 7.99815 11.0287C8 11.0717 8 11.1158 8 11.2038V11.4157C8 11.5874 8 11.6732 7.9741 11.7416C7.93351 11.8488 7.84884 11.9335 7.74159 11.9741C7.67317 12 7.58735 12 7.41572 12H2',
  d3: 'M21 11H17.3333C14.3878 11 12 8.76142 12 6V4',
  d4: 'M2 19H22',
  d5: 'M18 19V21',
  d6: 'M12 19V21',
  d7: 'M6 19V21',
  d8: 'M6.73259 3H2V8H3.89284C4.16278 8 4.29775 8 4.4256 8.0082C5.52021 8.07839 6.53798 8.595 7.24076 9.43715C7.32284 9.53551 7.40251 9.64446 7.56185 9.86235C7.61382 9.93343 7.63982 9.96899 7.66371 10.0048C7.86673 10.3091 7.98241 10.6633 7.99815 11.0287C8 11.0717 8 11.1158 8 11.2038V11.4157C8 11.5874 8 11.6732 7.9741 11.7416C7.93351 11.8488 7.84884 11.9335 7.74159 11.9741C7.67317 12 7.58735 12 7.41572 12H2V15H19.9593C19.9971 15 20.016 15 20.032 14.9997C21.1115 14.9825 21.9825 14.1115 21.9997 13.032C22 13.016 22 12.9971 22 12.9593C22 12.9091 22 12.8841 21.9998 12.8603C21.985 11.307 21.2491 9.84877 20.0084 8.91416C19.9894 8.89984 19.9692 8.88495 19.9289 8.85517L16.2373 6.12907C14.1368 4.57795 13.0866 3.80239 11.8679 3.40119C10.6493 3 9.34372 3 6.73259 3ZM21 10.5L17.0526 11C14.2621 11 12 8.76142 12 6V4L21 10.5Z',
  d9: 'M2 19H22M18 19V21M12 19V21M6 19V21',
  d10: 'M12.1024 2.68882C10.7688 2.24976 9.35032 2.24985 6.87599 2.25001L2 2.25001C1.58579 2.25001 1.25 2.5858 1.25 3.00001V6.85C1.25 7.03856 1.25 7.13284 1.30858 7.19142C1.36716 7.25 1.46144 7.25 1.65 7.25L3.91891 7.25C4.16399 7.24999 4.32146 7.24998 4.47359 7.25974C5.77345 7.34308 6.98205 7.95656 7.8166 8.95662C7.98557 9.15911 8.1437 9.37286 8.2876 9.58855C8.65344 10.1369 8.7498 10.7835 8.75 11.4295C8.75005 11.6255 8.74593 11.8211 8.67554 12.0071C8.55884 12.3154 8.31542 12.5588 8.00708 12.6755C7.8167 12.7476 7.61193 12.75 7.41572 12.75H1.65C1.46144 12.75 1.36716 12.75 1.30858 12.8086C1.25 12.8672 1.25 12.9614 1.25 13.15V15C1.25 15.4142 1.58579 15.75 2 15.75H19.9652C19.9971 15.75 20.0219 15.75 20.044 15.7497C21.5283 15.7259 22.7259 14.5283 22.7496 13.044C22.75 13.0219 22.75 12.9973 22.75 12.9654V12.9554C22.75 12.909 22.75 12.8806 22.7497 12.8531C22.7327 11.0668 21.8865 9.38992 20.4596 8.31511C20.4377 8.29858 20.4148 8.28168 20.3774 8.25409L16.5675 5.44057C14.5771 3.97058 13.4361 3.12788 12.1024 2.68882ZM13.0254 5.14693C12.8372 4.98729 12.5777 4.9549 12.3586 5.0637C12.1395 5.17251 12 5.40309 12 5.65626V6.96875C12 9.78669 14.3226 12 17.1009 12H19.8711C20.1373 12 20.3747 11.8251 20.4637 11.5633C20.5528 11.3015 20.4743 11.0096 20.2677 10.8344L13.0254 5.14693Z',
  d11: 'M1.25 10.85C1.25 11.0386 1.25 11.1328 1.30858 11.1914C1.36716 11.25 1.46144 11.25 1.65 11.25H7.0407C7.13976 11.25 7.18929 11.25 7.21918 11.2157C7.24907 11.1814 7.24278 11.1356 7.23018 11.044C7.16952 10.6029 6.96303 10.2749 6.66493 9.91769C6.09392 9.23344 5.26698 8.81369 4.3776 8.75666C4.27937 8.75036 4.1726 8.75 3.89284 8.75H1.65C1.46144 8.75 1.36716 8.75 1.30858 8.80858C1.25 8.86716 1.25 8.96144 1.25 9.15V10.85Z',
  d12: 'M1 19C1 18.4477 1.44772 18 2 18H22C22.5523 18 23 18.4477 23 19C23 19.5523 22.5523 20 22 20H2C1.44772 20 1 19.5523 1 19Z',
  d13: 'M6 18C6.55228 18 7 18.4477 7 19V21C7 21.5523 6.55228 22 6 22C5.44772 22 5 21.5523 5 21V19C5 18.4477 5.44772 18 6 18ZM12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18ZM18 18C18.5523 18 19 18.4477 19 19V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V19C17 18.4477 17.4477 18 18 18Z',
  d14: 'M12.1024 2.68882C10.7688 2.24976 9.35032 2.24985 6.87599 2.25001L2 2.25001C1.58579 2.25001 1.25 2.5858 1.25 3.00001V15C1.25 15.4142 1.58579 15.75 2 15.75H19.9652C19.9972 15.75 20.0219 15.75 20.044 15.7497C21.5283 15.7259 22.7259 14.5283 22.7496 13.044C22.75 13.0219 22.75 12.9973 22.75 12.9654V12.9554C22.75 12.909 22.75 12.8806 22.7497 12.8531C22.7327 11.0668 21.8865 9.38992 20.4596 8.31511C20.4377 8.29858 20.4148 8.28168 20.3774 8.25409L16.5675 5.44057C14.5771 3.97058 13.4361 3.12788 12.1024 2.68882Z',
  d15: 'M13.0254 5.14693C12.8372 4.98729 12.5777 4.9549 12.3586 5.0637C12.1395 5.17251 12 5.40309 12 5.65626V6.96876C12 9.78669 14.3226 12 17.1009 12H19.8711C20.1373 12 20.3747 11.8251 20.4637 11.5633C20.5528 11.3015 20.4743 11.0096 20.2677 10.8344L13.0254 5.14693Z',
  d16: 'M1.25 12.75H7.41572C7.61193 12.75 7.8167 12.7476 8.00708 12.6755C8.31542 12.5588 8.55884 12.3154 8.67554 12.0071C8.74593 11.8211 8.75005 11.6255 8.75 11.4295C8.7498 10.7835 8.65344 10.1369 8.2876 9.58855C8.1437 9.37286 7.98557 9.15911 7.8166 8.95662C6.98205 7.95656 5.77345 7.34308 4.47359 7.25974C4.32146 7.24998 4.16399 7.24999 3.91891 7.25L1.25 7.25V8.75H3.89284C4.1726 8.75 4.27937 8.75036 4.3776 8.75666C5.26698 8.81369 6.09392 9.23344 6.66493 9.91769C6.96303 10.2749 7.16952 10.6029 7.23018 11.044C7.24278 11.1356 7.24907 11.1814 7.21918 11.2157C7.18929 11.25 7.13976 11.25 7.0407 11.25H1.25V12.75Z',
  d17: 'M2 3.00009L10 3L20.8395 10.2266C21.5644 10.7098 21.9997 11.5234 21.9997 12.3945C21.9997 13.8335 20.8332 15.0001 19.3942 15.0001H2',
  d18: 'M2 8.00002L4.99998 8C6.65684 7.99999 8 9.34314 8 11V12H2',
  d19: 'M21.5 11H15.3333C12.3878 11 10 8.76142 10 6V3',
  d20: 'M2 18H22',
  d21: 'M18 18V21M12 18V21M6 18V21',
  d22: 'M5 19.25H2V17.25H22V19.25H19V21.25H17V19.25H13V21.25H11V19.25H7V21.25H5V19.25Z',
  d23: 'M10.0455 2.75L2.22727 2.75008C1.68754 2.75009 1.25 3.18181 1.25 3.71436V7.75002L4.99998 7.75C7.07106 7.74999 8.75 9.42893 8.75 11.5V12.5C8.75 12.9142 8.41422 13.25 8 13.25H1.25V15.2857C1.25 15.8183 1.68754 16.25 2.22728 16.25H19.2263C21.1724 16.25 22.75 14.6934 22.75 12.7732C22.75 11.6108 22.1612 10.5252 21.181 9.8804L10.5877 2.91196C10.4271 2.80635 10.2385 2.75 10.0455 2.75ZM18.9793 10.7503L10.75 5.33691V6.50031C10.75 8.80266 12.7557 10.7503 15.3333 10.7503H18.9793Z',
  d24: 'M1.25 11.75H7.25V11.5C7.25 10.2574 6.24264 9.24999 4.99999 9.25L1.25 9.25002V11.75Z',
};

export const IconSpeedTrain01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-stroke-rounded IconSpeedTrain01StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeedTrain01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-duotone-rounded IconSpeedTrain01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeedTrain01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-twotone-rounded IconSpeedTrain01TwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeedTrain01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-solid-rounded IconSpeedTrain01SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
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

export const IconSpeedTrain01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-bulk-rounded IconSpeedTrain01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeedTrain01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-stroke-sharp IconSpeedTrain01StrokeSharp"
    >
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d21} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSpeedTrain01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="speed-train-01-solid-sharp IconSpeedTrain01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d24} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSpeedTrain01: TheIconSelfPack = {
  name: 'SpeedTrain01',
  StrokeRounded: IconSpeedTrain01StrokeRounded,
  DuotoneRounded: IconSpeedTrain01DuotoneRounded,
  TwotoneRounded: IconSpeedTrain01TwotoneRounded,
  SolidRounded: IconSpeedTrain01SolidRounded,
  BulkRounded: IconSpeedTrain01BulkRounded,
  StrokeSharp: IconSpeedTrain01StrokeSharp,
  SolidSharp: IconSpeedTrain01SolidSharp,
};