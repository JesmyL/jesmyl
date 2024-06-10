import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.04824 11.5858L5.09649 10.5858C5.39946 10.2968 5.55095 10.1522 5.74359 10.0761C5.93622 10 6.15046 10 6.57893 10H17.4211C17.8495 10 18.0638 10 18.2564 10.0761C18.449 10.1522 18.6005 10.2968 18.9035 10.5858L19.9518 11.5858C20.6506 12.2525 21 12.5858 21 13C21 13.4142 20.6506 13.7475 19.9518 14.4142L18.9035 15.4142C18.6005 15.7032 18.449 15.8478 18.2564 15.9239C18.0638 16 17.8495 16 17.4211 16H6.57893C6.15046 16 5.93622 16 5.74359 15.9239C5.55095 15.8478 5.39946 15.7032 5.09649 15.4142L4.04824 14.4142C3.34941 13.7475 3 13.4142 3 13C3 12.5858 3.34941 12.2525 4.04824 11.5858Z',
  d2: 'M8.01193 13H8M12.006 13H11.994M16 13H15.9881',
  d3: 'M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10',
  d4: 'M6 16L5.31623 18.0513C5.23173 18.3048 5.18948 18.4316 5.12452 18.5343C4.98656 18.7526 4.76952 18.909 4.51884 18.9709C4.40081 19 4.26721 19 4 19',
  d5: 'M18 16L18.6838 18.0513C18.7683 18.3048 18.8105 18.4316 18.8755 18.5343C19.0134 18.7526 19.2305 18.909 19.4812 18.9709C19.5992 19 19.7328 19 20 19',
  d6: 'M17.5091 9.50024H6.49091C6.15671 9.49898 5.75339 9.49747 5.37609 9.64655C4.99422 9.79745 4.70392 10.0766 4.468 10.3034L3.31784 11.401C3.00329 11.7009 2.69864 11.9914 2.48111 12.2634C2.23759 12.5679 2 12.972 2 13.5005C2 14.0289 2.23759 14.433 2.48111 14.7375C2.69864 15.0095 3.00329 15.3 3.31784 15.5999L4.468 16.6975C4.70392 16.9243 4.99422 17.2035 5.37609 17.3544C5.75339 17.5035 6.15671 17.5019 6.49091 17.5007H17.5091C17.8433 17.5019 18.2466 17.5035 18.6239 17.3544C19.0058 17.2035 19.2961 16.9243 19.532 16.6975L20.6821 15.6C20.9967 15.3 21.3014 15.0095 21.5189 14.7375C21.7624 14.433 22 14.0289 22 13.5005C22 12.972 21.7624 12.5679 21.5189 12.2634C21.3014 11.9914 20.9967 11.7009 20.6822 11.401L19.532 10.3034C19.2961 10.0766 19.0058 9.79745 18.6239 9.64655C18.2466 9.49747 17.8433 9.49898 17.5091 9.50024ZM8 12.5C7.44772 12.5 7 12.9477 7 13.5C7 14.0523 7.44772 14.5 8 14.5H8.01193C8.56422 14.5 9.01193 14.0523 9.01193 13.5C9.01193 12.9477 8.56422 12.5 8.01193 12.5H8ZM11.994 12.5C11.4417 12.5 10.994 12.9477 10.994 13.5C10.994 14.0523 11.4417 14.5 11.994 14.5H12.006C12.5583 14.5 13.006 14.0523 13.006 13.5C13.006 12.9477 12.5583 12.5 12.006 12.5H11.994ZM15.9881 12.5C15.4358 12.5 14.9881 12.9477 14.9881 13.5C14.9881 14.0523 15.4358 14.5 15.9881 14.5H16C16.5523 14.5 17 14.0523 17 13.5C17 12.9477 16.5523 12.5 16 12.5H15.9881Z',
  d7: 'M12 5.5C9.23858 5.5 7 7.73858 7 10.5C7 11.0523 6.55228 11.5 6 11.5C5.44772 11.5 5 11.0523 5 10.5C5 6.63401 8.13401 3.5 12 3.5C15.866 3.5 19 6.63401 19 10.5C19 11.0523 18.5523 11.5 18 11.5C17.4477 11.5 17 11.0523 17 10.5C17 7.73858 14.7614 5.5 12 5.5Z',
  d8: 'M6.31623 15.5516C6.84017 15.7262 7.12333 16.2926 6.94868 16.8165L6.26491 18.8678C6.25906 18.8854 6.2531 18.9034 6.247 18.9219C6.18276 19.1164 6.10282 19.3585 5.9698 19.5689C5.69388 20.0054 5.25981 20.3183 4.75845 20.442C4.51675 20.5017 4.26183 20.501 4.05696 20.5004C4.0375 20.5003 4.0185 20.5003 4 20.5003C3.44772 20.5003 3 20.0526 3 19.5003C3 18.948 3.44772 18.5003 4 18.5003C4.14228 18.5003 4.21663 18.5 4.27076 18.4976C4.27301 18.4975 4.27512 18.4974 4.27712 18.4973C4.27784 18.4955 4.27861 18.4935 4.27941 18.4914C4.29882 18.4408 4.32255 18.3703 4.36754 18.2354L5.05132 16.184C5.22596 15.6601 5.79228 15.3769 6.31623 15.5516ZM17.6838 15.5516C18.2077 15.3769 18.774 15.6601 18.9487 16.184L19.6325 18.2354C19.6774 18.3703 19.7012 18.4408 19.7206 18.4914C19.7214 18.4935 19.7222 18.4955 19.7229 18.4973C19.7249 18.4974 19.727 18.4975 19.7292 18.4976C19.7834 18.5 19.8577 18.5003 20 18.5003C20.5523 18.5003 21 18.948 21 19.5003C21 20.0526 20.5523 20.5003 20 20.5003C19.9815 20.5003 19.9625 20.5003 19.943 20.5004C19.7382 20.501 19.4833 20.5017 19.2416 20.442C18.7402 20.3183 18.3061 20.0054 18.0302 19.5689C17.8972 19.3585 17.8172 19.1164 17.753 18.9219C17.7469 18.9034 17.7409 18.8854 17.7351 18.8678L17.0513 16.8165C16.8767 16.2926 17.1598 15.7262 17.6838 15.5516Z',
  d9: 'M6.49091 9.50024H17.5091C17.8433 9.49898 18.2466 9.49747 18.6239 9.64655C19.0058 9.79745 19.2961 10.0766 19.532 10.3034L20.6822 11.401C20.9967 11.7009 21.3014 11.9914 21.5189 12.2634C21.7624 12.5679 22 12.972 22 13.5005C22 14.0289 21.7624 14.433 21.5189 14.7375C21.3014 15.0095 20.9967 15.3 20.6821 15.6L19.532 16.6975C19.2961 16.9243 19.0058 17.2035 18.6239 17.3544C18.2466 17.5035 17.8433 17.5019 17.5091 17.5007H6.49091C6.15671 17.5019 5.75339 17.5035 5.37609 17.3544C4.99422 17.2035 4.70392 16.9243 4.468 16.6975L3.31784 15.5999C3.00329 15.3 2.69864 15.0095 2.48111 14.7375C2.23759 14.433 2 14.0289 2 13.5005C2 12.972 2.23759 12.5679 2.48111 12.2634C2.69864 11.9914 3.00329 11.7009 3.31784 11.401L4.468 10.3034C4.70392 10.0766 4.99422 9.79745 5.37609 9.64655C5.75339 9.49747 6.15671 9.49898 6.49091 9.50024Z',
  d10: 'M7 13.5C7 12.9477 7.44772 12.5 8 12.5H8.01193C8.56422 12.5 9.01193 12.9477 9.01193 13.5C9.01193 14.0523 8.56422 14.5 8.01193 14.5H8C7.44772 14.5 7 14.0523 7 13.5ZM10.994 13.5C10.994 12.9477 11.4418 12.5 11.994 12.5H12.006C12.5583 12.5 13.006 12.9477 13.006 13.5C13.006 14.0523 12.5583 14.5 12.006 14.5H11.994C11.4418 14.5 10.994 14.0523 10.994 13.5ZM14.9881 13.5C14.9881 12.9477 15.4358 12.5 15.9881 12.5H16C16.5523 12.5 17 12.9477 17 13.5C17 14.0523 16.5523 14.5 16 14.5H15.9881C15.4358 14.5 14.9881 14.0523 14.9881 13.5Z',
  d11: 'M4.78375 16.9844L4.36754 18.233C4.32255 18.368 4.29882 18.4384 4.27941 18.489L4.27712 18.495L4.27076 18.4953C4.21663 18.4977 4.14228 18.4979 4 18.4979C3.44772 18.4979 3 18.9456 3 19.4979C3 20.0502 3.44772 20.4979 4 20.4979L4.05696 20.498C4.26183 20.4986 4.51675 20.4993 4.75845 20.4397C5.25981 20.3159 5.69388 20.0031 5.9698 19.5666C6.10282 19.3561 6.18276 19.1141 6.247 18.9195L6.26491 18.8655L6.72062 17.4983H6.49091C6.15671 17.4996 5.75339 17.5011 5.37609 17.352C5.14883 17.2622 4.95399 17.127 4.78375 16.9844Z',
  d12: 'M17.2794 17.4983L17.7351 18.8655L17.753 18.9195C17.8172 19.1141 17.8972 19.3561 18.0302 19.5666C18.3061 20.0031 18.7402 20.3159 19.2416 20.4397C19.4833 20.4993 19.7382 20.4986 19.943 20.498L20 20.4979C20.5523 20.4979 21 20.0502 21 19.4979C21 18.9456 20.5523 18.4979 20 18.4979C19.8577 18.4979 19.7834 18.4977 19.7292 18.4953L19.7229 18.495L19.7206 18.489C19.7012 18.4384 19.6774 18.368 19.6325 18.233L19.2162 16.9844C19.046 17.127 18.8512 17.2622 18.6239 17.352C18.2466 17.5011 17.8433 17.4996 17.5091 17.4983H17.2794Z',
  d13: 'M7.09937 9.50024C7.56255 7.21788 9.58036 5.5 11.9994 5.5C14.4184 5.5 16.4363 7.21788 16.8994 9.50024H17.5085C17.8427 9.49898 18.246 9.49747 18.6233 9.64655C18.7473 9.69554 18.8616 9.75805 18.9676 9.8279C18.6293 6.27721 15.6387 3.5 11.9994 3.5C8.36012 3.5 5.3695 6.27721 5.03125 9.82789C5.13719 9.75805 5.25152 9.69554 5.37549 9.64655C5.75279 9.49747 6.15611 9.49898 6.49031 9.50024H7.09937Z',
  d14: 'M3 13L6 10H18L21 13L18 16H6L3 13Z',
  d15: 'M18 16L19 19H21',
  d16: 'M6 16L5 19H3',
  d17: 'M5.5 9.75C5.30109 9.75 5.11032 9.82902 4.96967 9.96967L1.96967 12.9697C1.67678 13.2626 1.67678 13.7374 1.96967 14.0303L4.96967 17.0303C5.11032 17.171 5.30109 17.25 5.5 17.25H18.5C18.6989 17.25 18.8897 17.171 19.0303 17.0303L22.0303 14.0303C22.3232 13.7374 22.3232 13.2626 22.0303 12.9697L19.0303 9.96967C18.8897 9.82902 18.6989 9.75 18.5 9.75H5.5ZM9.01193 12.5H7V14.5H9.01193V12.5ZM13.006 12.5H10.994V14.5H13.006V12.5ZM17 12.5H14.9881V14.5H17V12.5Z',
  d18: 'M12.0005 5.5C9.23906 5.5 7.00049 7.73858 7.00049 10.5H5.00049C5.00049 6.63401 8.1345 3.5 12.0005 3.5C15.8665 3.5 19.0005 6.63401 19.0005 10.5H17.0005C17.0005 7.73858 14.7619 5.5 12.0005 5.5Z',
  d19: 'M18.0518 19.816L17.0518 16.816L18.9491 16.1836L19.7212 18.4998H21.0004V20.4998H19.0004C18.57 20.4998 18.1879 20.2244 18.0518 19.816Z',
  d20: 'M4.27973 18.4998L5.05181 16.1836L6.94917 16.816L5.94917 19.816C5.81306 20.2244 5.43092 20.4998 5.00049 20.4998H3.00049V18.4998H4.27973Z',
};

export const IconUfo01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-stroke-rounded IconUfo01StrokeRounded"
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

export const IconUfo01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-duotone-rounded IconUfo01DuotoneRounded"
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

export const IconUfo01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-twotone-rounded IconUfo01TwotoneRounded"
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUfo01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-solid-rounded IconUfo01SolidRounded"
    >
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUfo01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-bulk-rounded IconUfo01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
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
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconUfo01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-stroke-sharp IconUfo01StrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconUfo01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="ufo-01-solid-sharp IconUfo01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfUfo01: TheIconSelfPack = {
  name: 'Ufo01',
  StrokeRounded: IconUfo01StrokeRounded,
  DuotoneRounded: IconUfo01DuotoneRounded,
  TwotoneRounded: IconUfo01TwotoneRounded,
  SolidRounded: IconUfo01SolidRounded,
  BulkRounded: IconUfo01BulkRounded,
  StrokeSharp: IconUfo01StrokeSharp,
  SolidSharp: IconUfo01SolidSharp,
};