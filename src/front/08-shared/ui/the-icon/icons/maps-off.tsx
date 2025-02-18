import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M4.5 4.5C3.73931 4.94127 2.72098 5.45609 2.27164 6.24482C2 6.72165 2 7.30232 2 8.46367V16.6283C2 18.1542 2 18.9172 2.34226 19.3418C2.57001 19.6244 2.88916 19.8143 3.242 19.8773C3.77226 19.9719 4.42148 19.5953 5.71987 18.8421C6.60156 18.3306 7.45011 17.7994 8.50487 17.9435C8.98466 18.009 9.44231 18.2366 10.3576 18.6917L14.1715 20.588C14.9964 20.9982 15.004 21 15.9214 21H18C19.1298 21 19.9211 21 20.5 20.8712',
  d2: 'M22 17.9876V10.1657C22 8.22611 22 7.25631 21.4142 6.65374C20.8284 6.05118 19.8856 6.05118 18 6.05118H15.9214C15.004 6.05118 14.9964 6.0494 14.1715 5.63658L10.8399 3.96938C9.44885 3.2733 8.75329 2.92523 8.01236 2.94942C7.64015 2.96157 7.28518 3.06672 6.85352 3.26792M15 5.99585V11.0001',
  d3: 'M14.9998 15.0093V20.9379M8.01953 8.14258L8.01953 17.9197',
  d4: 'M2 2L22 22',
  d5: 'M2 8.49929V16.7163C2 18.252 2 19.0199 2.34226 19.4472C2.57001 19.7316 2.88916 19.9227 3.242 19.9861C3.77226 20.0814 4.4215 19.7023 5.71987 18.9443C6.60156 18.4296 7.45011 17.8949 8.50487 18.0399C9.38869 18.1614 10.21 18.719 11 19.1144L15 21.0006H21L4.63951 4.5625L4.02558 4.92093C3.03739 5.49786 2.54329 5.78632 2.27164 6.2662C2 6.74609 2 7.33049 2 8.49929Z',
  d6: 'M14.99 15.3893V20.7953M8.00977 8V17.7771',
  d7: 'M22 18.0198V10.1979C22 8.25834 22 7.28854 21.4142 6.68597C20.8284 6.08341 19.8856 6.08341 18 6.08341H15.9214C15.004 6.08341 14.9964 6.08163 14.1715 5.66881L10.8399 4.00161C9.44885 3.30553 8.75329 2.95746 8.01236 2.98165C7.64015 2.9938 7.28518 3.09895 6.85352 3.30015M15 6.02808V11.0323',
  d8: 'M7.25 17.5C7.25 17.9142 7.58579 18.25 8 18.25C8.41421 18.25 8.75 17.9142 8.75 17.5H7.25ZM15.75 15C15.75 14.5858 15.4142 14.25 15 14.25C14.5858 14.25 14.25 14.5858 14.25 15H15.75ZM14.25 20.5C14.25 20.9142 14.5858 21.25 15 21.25C15.4142 21.25 15.75 20.9142 15.75 20.5H14.25ZM7.25 8V17.5H8.75V8H7.25ZM14.25 15V20.5H15.75V15H14.25Z',
  d9: 'M14.1642 5.6712L14.4984 4.99978V4.99978L14.1642 5.6712ZM10.836 4.01463L11.1702 3.3432V3.3432L10.836 4.01463ZM8.01135 3.00117L7.98701 2.25157L8.01135 3.00117ZM6.70432 2.56301C6.32365 2.72631 6.14744 3.16728 6.31075 3.54795C6.47405 3.92861 6.91502 4.10482 7.29568 3.94152L6.70432 2.56301ZM21.2295 17.9876C21.2226 18.4018 21.5528 18.7431 21.967 18.7499C22.3811 18.7567 22.7224 18.4265 22.7293 18.0124L21.2295 17.9876ZM15.75 6.03015C15.75 5.61594 15.4142 5.28015 15 5.28015C14.5858 5.28015 14.25 5.61594 14.25 6.03015H15.75ZM14.25 11C14.25 11.4142 14.5858 11.75 15 11.75C15.4142 11.75 15.75 11.4142 15.75 11H14.25ZM14.4984 4.99978L11.1702 3.3432L10.5018 4.68606L13.83 6.34263L14.4984 4.99978ZM17.9888 5.33316H15.9123V6.83316H17.9888V5.33316ZM17.9888 6.83316C18.9523 6.83316 19.5978 6.83483 20.0789 6.90101C20.5366 6.96397 20.7324 7.07234 20.8632 7.20612L21.9359 6.15765C21.4815 5.69271 20.9137 5.50171 20.2833 5.415C19.6763 5.3315 18.909 5.33316 17.9888 5.33316V6.83316ZM22.7347 10.1715C22.7347 9.22859 22.7362 8.44766 22.6552 7.83076C22.5715 7.19402 22.388 6.6202 21.9359 6.15765L20.8632 7.20612C20.9963 7.34229 21.1053 7.54963 21.168 8.0262C21.2332 8.52261 21.2347 9.18712 21.2347 10.1715H22.7347ZM11.1702 3.3432C10.4877 3.00351 9.93046 2.72532 9.45033 2.53988C8.95576 2.34887 8.49251 2.23515 7.98701 2.25157L8.03569 3.75078C8.27037 3.74316 8.52462 3.79034 8.9099 3.93915C9.30963 4.09353 9.79463 4.33409 10.5018 4.68606L11.1702 3.3432ZM13.83 6.34263C14.2124 6.53295 14.5084 6.68485 14.8316 6.761C15.1551 6.83726 15.4871 6.83316 15.9123 6.83316V5.33316C15.421 5.33316 15.291 5.32818 15.1756 5.301C15.0599 5.27372 14.9401 5.21964 14.4984 4.99978L13.83 6.34263ZM7.29568 3.94152C7.60467 3.80897 7.82637 3.75757 8.03569 3.75078L7.98701 2.25157C7.53845 2.26613 7.12923 2.38073 6.70432 2.56301L7.29568 3.94152ZM22.7293 18.0124C22.7725 15.3962 22.7347 12.7652 22.7347 10.1715H21.2347C21.2347 12.7953 21.2724 15.3868 21.2295 17.9876L22.7293 18.0124ZM14.25 6.03015V11H15.75V6.03015H14.25Z',
  d10: 'M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z',
  d11: 'M7.13318 2.45802C7.24902 2.5481 7.24902 2.71187 7.24902 3.0394V3.71284L6.23742 2.70123C6.34315 2.64711 6.44522 2.59708 6.54411 2.55141C6.81901 2.42445 6.95646 2.36097 7.08682 2.42837C7.10184 2.43614 7.11983 2.44764 7.13318 2.45802Z',
  d12: 'M3.61772 4.19454L3.98318 3.98253L7.24902 7.24838L7.24903 18.3945C7.24903 18.5836 7.24903 18.6782 7.20526 18.7501C7.1615 18.8219 7.07098 18.8687 6.88994 18.9623C6.65362 19.0844 6.40036 19.2313 6.11724 19.3955C5.49821 19.7546 4.92644 20.0863 4.50052 20.2786C4.06973 20.4731 3.60237 20.6211 3.10926 20.5331C2.57591 20.4379 2.09705 20.1514 1.75736 19.7299C1.44578 19.3434 1.34229 18.8651 1.29542 18.389C1.249 17.9175 1.24901 17.3146 1.24902 16.5855V8.34641C1.24901 7.79526 1.249 7.32893 1.28649 6.94256C1.3263 6.53226 1.41242 6.15363 1.619 5.79101C1.82608 5.42753 2.10751 5.16203 2.43986 4.92203C2.75149 4.697 3.14965 4.46605 3.61772 4.19454Z',
  d13: 'M8.79672 18.6438C8.74903 18.5697 8.74903 18.4684 8.74903 18.2658L8.74902 8.74838L14.249 14.2484V20.9189C14.249 21.133 14.0283 21.2725 13.8366 21.177L10.0227 19.2807C9.64382 19.0923 9.36304 18.9543 9.14177 18.8535C8.94353 18.7631 8.84442 18.718 8.79672 18.6438Z',
  d14: 'M14.204 4.81795C14.249 4.89055 14.249 4.98097 14.249 5.16182L14.249 10.7128L8.74902 5.21284V2.97647C8.74902 2.63848 8.74902 2.46949 8.87424 2.37973L8.88446 2.37272C9.01328 2.28821 9.1593 2.34455 9.45134 2.45723C9.92455 2.63981 10.4726 2.91233 11.1416 3.24498L13.9162 4.62457C14.0781 4.70509 14.1591 4.74535 14.204 4.81795Z',
  d15: 'M15.749 5.42167C15.749 5.32714 15.8259 5.2506 15.9204 5.2506L18.0519 5.2506C18.9496 5.25057 19.6998 5.25054 20.2957 5.33242C20.9265 5.41911 21.4946 5.61 21.9493 6.07481C22.4019 6.53734 22.5856 7.11123 22.6694 7.74811C22.7491 8.35384 22.7491 9.11771 22.749 10.0377V16.8804C22.7491 17.7839 22.7491 18.5369 22.6736 19.1374L15.749 12.2128L15.749 5.42167Z',
  d16: 'M15.8586 21.6675C15.798 21.6675 15.749 21.6184 15.749 21.5579V15.7484L21.3046 21.304C20.995 21.4528 20.6556 21.5362 20.2957 21.5856C19.6998 21.6675 18.9496 21.6675 18.052 21.6674L15.8586 21.6675Z',
  d17: 'M3.61772 4.19638L3.98318 3.98438L7.24902 7.25022L7.24903 18.3963C7.24903 18.5855 7.24903 18.68 7.20526 18.7519C7.1615 18.8238 7.07098 18.8706 6.88994 18.9641C6.65362 19.0862 6.40036 19.2331 6.11724 19.3974C5.49821 19.7565 4.92644 20.0882 4.50052 20.2805C4.06973 20.475 3.60237 20.6229 3.10926 20.5349C2.57591 20.4397 2.09705 20.1532 1.75736 19.7318C1.44578 19.3452 1.34229 18.8669 1.29542 18.3908C1.249 17.9193 1.24901 17.3164 1.24902 16.5873V8.34825C1.24901 7.7971 1.249 7.33077 1.28649 6.9444C1.3263 6.5341 1.41242 6.15547 1.619 5.79285C1.82608 5.42937 2.10751 5.16387 2.43986 4.92387C2.75149 4.69884 3.14965 4.46789 3.61772 4.19638Z',
  d18: 'M8.79672 18.6457C8.74903 18.5715 8.74903 18.4702 8.74903 18.2677L8.74902 8.75022L14.249 14.2502V20.9207C14.249 21.1349 14.0283 21.2743 13.8366 21.1789L10.0227 19.2825C9.64382 19.0941 9.36304 18.9561 9.14177 18.8553C8.94353 18.765 8.84442 18.7198 8.79672 18.6457Z',
  d19: 'M15.8586 21.6693C15.798 21.6693 15.749 21.6203 15.749 21.5598V15.7502L21.3046 21.3058C20.995 21.4546 20.6556 21.538 20.2957 21.5875C19.6998 21.6693 18.9496 21.6693 18.052 21.6693L15.8586 21.6693Z',
  d20: 'M7.13306 2.45802C7.24891 2.5481 7.24891 2.71187 7.24891 3.0394V3.71284L6.2373 2.70123C6.34304 2.64711 6.44511 2.59708 6.544 2.55141C6.8189 2.42445 6.95635 2.36097 7.0867 2.42837C7.10173 2.43614 7.11971 2.44764 7.13306 2.45802Z',
  d21: 'M14.2039 4.81795C14.2489 4.89055 14.2489 4.98097 14.2489 5.16182L14.2489 10.7128L8.74891 5.21284V2.97647C8.74891 2.63848 8.74891 2.46949 8.87413 2.37973L8.88435 2.37272C9.01316 2.28821 9.15919 2.34455 9.45123 2.45723C9.92444 2.63981 10.4725 2.91233 11.1415 3.24498L13.916 4.62457C14.078 4.70509 14.159 4.74535 14.2039 4.81795Z',
  d22: 'M15.7489 5.42167C15.7489 5.32714 15.8257 5.2506 15.9203 5.2506L18.0518 5.2506C18.9495 5.25057 19.6997 5.25054 20.2956 5.33242C20.9264 5.41911 21.4944 5.61 21.9492 6.07481C22.4018 6.53734 22.5855 7.11123 22.6693 7.74811C22.749 8.35384 22.7489 9.11771 22.7489 10.0377V16.8804C22.7489 17.7839 22.749 18.5369 22.6735 19.1374L15.7489 12.2128L15.7489 5.42167Z',
  d23: 'M8 8V18M15 15V21',
  d24: 'M15 6V11.5',
  d25: 'M22 17.9974V6H15L8.01175 3.00098L6.80707 3.61857M21.0025 20.9947H15.0428L8.01175 18L2 20V6.08297L4.6992 4.69919',
  d26: 'M21.3358 22.75L1.25 2.66421L2.66421 1.25L22.75 21.3358L21.3358 22.75Z',
  d27: 'M7.25 18.044L2.23675 19.7118C2.00807 19.7879 1.75676 19.7495 1.56129 19.6085C1.36582 19.4675 1.25 19.2412 1.25 19.0002V4.83131C1.25 4.54995 1.40747 4.29226 1.65785 4.16391L3.31457 3.31457L7.25 7.25L7.25 18.044Z',
  d28: 'M14.25 20.4942L8.75 18.1333L8.75 8.75L14.25 14.25V20.4942Z',
  d29: 'M8.75 1.25L14.25 3.61034V10.7145L8.75 5.21447V1.25Z',
  d30: 'M22 3.99835C22.4142 3.99835 22.75 4.33413 22.75 4.74835V19.2145L15.75 12.2145V3.99835H22Z',
  d31: 'M20.75 20.75H15.75V15.75L20.75 20.75Z',
  d32: 'M5.65186 2.11633L7.25 1.29703V3.71447L5.65186 2.11633Z',
};

export const IconMapsOffStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-stroke-rounded IconMapsOffStrokeRounded"
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

export const IconMapsOffDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-duotone-rounded IconMapsOffDuotoneRounded"
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
        d={d.d4} 
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

export const IconMapsOffTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-twotone-rounded IconMapsOffTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        fill="var(--icon-fill)" 
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

export const IconMapsOffSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-solid-rounded IconMapsOffSolidRounded"
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
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
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
    </TheIconWrapper>
  );
};

export const IconMapsOffBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-bulk-rounded IconMapsOffBulkRounded"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsOffStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-stroke-sharp IconMapsOffStrokeSharp"
    >
      <path 
        d={d.d23} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d24} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d25} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMapsOffSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="maps-off-solid-sharp IconMapsOffSolidSharp"
    >
      <path 
        d={d.d26} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d27} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d28} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d29} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d30} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d31} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d32} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMapsOff: TheIconSelfPack = {
  name: 'MapsOff',
  StrokeRounded: IconMapsOffStrokeRounded,
  DuotoneRounded: IconMapsOffDuotoneRounded,
  TwotoneRounded: IconMapsOffTwotoneRounded,
  SolidRounded: IconMapsOffSolidRounded,
  BulkRounded: IconMapsOffBulkRounded,
  StrokeSharp: IconMapsOffStrokeSharp,
  SolidSharp: IconMapsOffSolidSharp,
};