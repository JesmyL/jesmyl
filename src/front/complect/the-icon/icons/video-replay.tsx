import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17.7 21.3351C16.528 21.4998 14.9996 21.4998 12.95 21.4998H11.05C7.01949 21.4998 5.00424 21.4998 3.75212 20.2476C2.5 18.9955 2.5 16.9803 2.5 12.9498V11.0498C2.5 7.01925 2.5 5.00399 3.75212 3.75187C5.00424 2.49976 7.01949 2.49976 11.05 2.49976H12.95C16.9805 2.49976 18.9958 2.49976 20.2479 3.75187C21.5 5.00399 21.5 7.01925 21.5 11.0498V12.9498C21.5 14.158 21.5 15.1851 21.4663 16.0648C21.4392 16.7699 21.4257 17.1224 21.1587 17.2541C20.8917 17.3859 20.5931 17.1746 19.9958 16.752L18.65 15.7998',
  d2: 'M14.9453 12.3948C14.7686 13.0215 13.9333 13.4644 12.2629 14.3502C10.648 15.2064 9.8406 15.6346 9.18992 15.4625C8.9209 15.3913 8.6758 15.2562 8.47812 15.07C8 14.6198 8 13.7465 8 12C8 10.2535 8 9.38018 8.47812 8.92995C8.6758 8.74381 8.9209 8.60868 9.18992 8.53753C9.8406 8.36544 10.648 8.79357 12.2629 9.64983C13.9333 10.5356 14.7686 10.9785 14.9453 11.6052C15.0182 11.8639 15.0182 12.1361 14.9453 12.3948Z',
  d3: 'M3.89124 3.891C2.5 5.28224 2.5 7.52141 2.5 11.9998C2.5 16.4781 2.5 18.7173 3.89124 20.1085C5.28249 21.4998 7.52166 21.4998 12 21.4998C16.4783 21.4998 18.7175 21.4998 20.1088 20.1085C21.5 18.7173 21.5 16.4781 21.5 11.9998C21.5 7.52141 21.5 5.28224 20.1088 3.891C18.7175 2.49976 16.4783 2.49976 12 2.49976C7.52166 2.49976 5.28249 2.49976 3.89124 3.891ZM12.2629 14.3499C13.9333 13.4642 14.7686 13.0213 14.9453 12.3945C15.0182 12.1358 15.0182 11.8637 14.9453 11.605C14.7686 10.9782 13.9333 10.5353 12.2629 9.64959C10.648 8.79332 9.8406 8.36519 9.18992 8.53729C8.9209 8.60844 8.6758 8.74356 8.47812 8.92971C8 9.37994 8 10.2532 8 11.9998C8 13.7463 8 14.6196 8.47812 15.0698C8.6758 15.2559 8.9209 15.3911 9.18992 15.4622C9.8406 15.6343 10.648 15.2062 12.2629 14.3499Z',
  d4: 'M10.9763 1.49951H13.0237C14.9764 1.49949 16.5433 1.49947 17.7741 1.66495C19.0491 1.83637 20.1122 2.2017 20.955 3.04452C21.7978 3.88735 22.1631 4.9504 22.3346 6.22543C22.5 7.45624 22.5 9.02314 22.5 10.9758V12.9657C22.5 14.161 22.5 15.204 22.4655 16.1029C22.4648 16.1216 22.4641 16.1405 22.4634 16.1595C22.452 16.4608 22.4392 16.8009 22.3815 17.0781C22.3115 17.414 22.1287 17.8904 21.6012 18.1507C21.0633 18.4161 20.5651 18.2571 20.2624 18.1093C20.0048 17.9836 19.7214 17.7828 19.4648 17.601C19.4492 17.59 19.4336 17.579 19.4182 17.568L18.0724 16.6158C17.6216 16.2968 17.5147 15.6728 17.8337 15.2219C18.1527 14.7711 18.7767 14.6642 19.2276 14.9832L20.1696 15.6497C20.3033 15.7443 20.3701 15.7916 20.4238 15.7646C20.4775 15.7376 20.4793 15.6561 20.4831 15.4931C20.4999 14.7584 20.5 13.9206 20.5 12.9495V11.0495C20.5 9.00599 20.4979 7.57394 20.3524 6.49192C20.2108 5.43867 19.9501 4.86803 19.5408 4.45874C19.1315 4.04945 18.5608 3.78872 17.5076 3.64711C16.4256 3.50164 14.9935 3.49951 12.95 3.49951H11.05C9.00648 3.49951 7.57443 3.50164 6.49241 3.64711C5.43916 3.78872 4.86852 4.04945 4.45923 4.45874C4.04994 4.86803 3.78921 5.43867 3.6476 6.49192C3.50213 7.57394 3.5 9.00599 3.5 11.0495V12.9495C3.5 14.993 3.50213 16.4251 3.6476 17.5071C3.78921 18.5604 4.04994 19.131 4.45923 19.5403C4.86852 19.9496 5.43916 20.2103 6.49241 20.3519C7.57443 20.4974 9.00648 20.4995 11.05 20.4995H12.95C15.0294 20.4995 16.4747 20.4972 17.5609 20.3446C18.1078 20.2678 18.6134 20.6488 18.6903 21.1957C18.7671 21.7427 18.386 22.2483 17.8391 22.3251C16.5975 22.4996 15.0111 22.4995 13.0277 22.4995H10.9763C9.02362 22.4995 7.45673 22.4996 6.22592 22.3341C4.95089 22.1627 3.88784 21.7973 3.04501 20.9545C2.20218 20.1117 1.83686 19.0486 1.66543 17.7736C1.49995 16.5428 1.49997 14.9759 1.5 13.0232V10.9758C1.49997 9.02315 1.49995 7.45625 1.66543 6.22543C1.83686 4.9504 2.20218 3.88735 3.04501 3.04452C3.88784 2.2017 4.95089 1.83637 6.22592 1.66495C7.45674 1.49947 9.02364 1.49949 10.9763 1.49951Z',
  d5: 'M12.9054 9.00883L12.8244 8.96591C12.0509 8.5557 11.4151 8.2186 10.8916 8.01074C10.3592 7.79942 9.80872 7.66398 9.24815 7.81224C8.86157 7.91448 8.50485 8.10979 8.21396 8.38371C7.7826 8.78991 7.63215 9.33633 7.56522 9.88836C7.49996 10.4266 7.49998 11.1193 7.5 11.9509V12.0486C7.49998 12.8803 7.49996 13.5729 7.56522 14.1112C7.63215 14.6632 7.7826 15.2096 8.21396 15.6158C8.50485 15.8898 8.86157 16.0851 9.24815 16.1873C9.80872 16.3356 10.3592 16.2001 10.8916 15.9888C11.4152 15.781 12.0509 15.4439 12.8245 15.0336L12.9054 14.9907C13.7056 14.5664 14.3624 14.2182 14.8367 13.8948C15.3113 13.5712 15.7541 13.1762 15.9171 12.5981C16.0276 12.2063 16.0276 11.7932 15.9171 11.4015C15.7541 10.8234 15.3113 10.4283 14.8367 10.1047C14.3624 9.78135 13.7056 9.43312 12.9054 9.00883Z',
  d6: 'M17 20.9998H3V2.99976H21V17.9998L18 15.9998',
  d7: 'M10 15.4998V8.49976L15.5 11.9998L10 15.4998Z',
  d8: 'M2.25 3.22476C2.25 2.68628 2.68652 2.24976 3.225 2.24976H20.775C21.3135 2.24976 21.75 2.68628 21.75 3.22476V18.6966L17.3092 15.736L18.3908 14.1135L19.8 15.053V4.19976H4.2V19.7998H16.875V21.7498H3.225C2.68652 21.7498 2.25 21.3132 2.25 20.7748V3.22476Z',
  d9: 'M9.75 15.9998V7.99976L16.25 11.9998L9.75 15.9998Z',
};

export const IconVideoReplayStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-stroke-rounded IconVideoReplayStrokeRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplayDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-duotone-rounded IconVideoReplayDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplayTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-twotone-rounded IconVideoReplayTwotoneRounded"
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplaySolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-solid-rounded IconVideoReplaySolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplayBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-bulk-rounded IconVideoReplayBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplayStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-stroke-sharp IconVideoReplayStrokeSharp"
    >
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconVideoReplaySolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="video-replay-solid-sharp IconVideoReplaySolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfVideoReplay: TheIconSelfPack = {
  name: 'VideoReplay',
  StrokeRounded: IconVideoReplayStrokeRounded,
  DuotoneRounded: IconVideoReplayDuotoneRounded,
  TwotoneRounded: IconVideoReplayTwotoneRounded,
  SolidRounded: IconVideoReplaySolidRounded,
  BulkRounded: IconVideoReplayBulkRounded,
  StrokeSharp: IconVideoReplayStrokeSharp,
  SolidSharp: IconVideoReplaySolidSharp,
};