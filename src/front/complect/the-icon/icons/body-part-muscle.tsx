import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2.01743 20.3048C3.14608 21.9194 8.05893 23.1868 10.3792 20.1642C12.8889 21.3647 17.0284 20.9925 20.3986 19.1132C20.8674 18.8518 21.3107 18.522 21.5822 18.0591C22.1952 17.014 22.2098 15.5642 21.0915 13.4249C19.2269 8.77048 15.8735 4.68488 14.5196 3.04188C14.2416 2.78841 12.4682 2.42843 11.3867 2.08254C10.909 1.93452 10.0195 1.8364 8.95564 3.23838C8.45127 3.90305 6.1601 5.53546 9.06718 6.63322C9.51756 6.74782 9.84863 6.95914 11.9033 6.5838C12.1709 6.53736 12.839 6.5838 13.3098 7.41016L14.2931 8.81637C14.3846 8.94728 14.444 9.09789 14.4622 9.25658C14.6345 10.7555 14.6289 12.6321 15.4646 13.5823C14.1739 12.6489 10.8006 11.5403 8.25901 14.6948M2.0014 12.9398C3.20961 11.7907 6.71148 9.97568 10.4174 12.5213',
  d2: 'M13.8176 2.75014L11.4309 2.08436C10.0853 1.70901 9.46543 2.65607 8.64395 3.54775C7.88554 4.37096 7.50634 4.78257 7.60814 5.36638C7.8244 6.60652 9.9046 6.8997 10.8818 6.73838C11.7658 6.59244 12.2078 6.51946 12.462 6.62413C13.0097 6.84963 13.3808 7.59447 13.7358 8.05688C14.1222 8.56019 14.3155 8.81192 14.3749 8.96136C14.4343 9.11081 14.5274 9.95187 14.7136 11.6339C14.792 12.3419 15.0139 13.0795 15.4646 13.5687C14.5256 12.9317 12.6605 12.2253 10.7815 12.8284C8.62595 10.7954 4.56838 10.7372 2.30428 12.6543C2.10255 12.8251 2.00098 13.0824 2.00098 13.3467V19.9233C2.00098 20.1744 2.09241 20.4198 2.27737 20.5895C4.39359 22.5316 8.19958 22.4681 10.2055 20.3993C10.2599 20.3432 10.3064 20.2798 10.3462 20.2125L10.3806 20.1545C12.9094 21.1432 15.0678 21.0588 17.5373 20.2457C19.9839 19.4401 21.2072 19.0374 21.7792 17.6039C22.3511 16.1704 21.7671 14.8872 20.5991 12.3209C19.155 9.14794 17.4562 6.65193 14.8478 3.43407C14.4376 2.92806 14.4266 2.92001 13.8176 2.75014Z',
  d3: 'M2.01798 20.305C3.14663 21.9196 8.05948 23.187 10.3798 20.1644C12.8895 21.3649 17.029 20.9927 20.3992 19.1134C20.868 18.852 21.3113 18.5222 21.5828 18.0593C22.1958 17.0142 22.2104 15.5644 21.0921 13.4251C19.2275 8.77073 15.8741 4.68512 14.5202 3.04212C14.2422 2.78865 12.4688 2.42868 11.3873 2.08279C10.9096 1.93477 10.0201 1.83665 8.95619 3.23863C8.45182 3.9033 6.16065 5.53571 9.06773 6.63347C9.51811 6.74807 9.84918 6.95938 11.9039 6.58404C12.1715 6.5376 12.8396 6.58405 13.3104 7.41041L14.2937 8.81662C14.3852 8.94753 14.4446 9.09814 14.4628 9.25683C14.6351 10.7557 14.6295 12.6323 15.4652 13.5825C14.1745 12.6491 10.8012 11.5405 8.25956 14.695M2.00195 12.94C3.21016 11.7909 6.71203 9.97593 10.418 12.5215',
  d4: 'M2.01758 12.8539C3.22578 11.7049 6.72766 9.88983 10.4335 12.4355',
  d5: 'M2.01749 20.3048C3.14613 21.9194 8.05899 23.1868 10.3793 20.1642C12.889 21.3647 17.0285 20.9925 20.3987 19.1132C20.8674 18.8518 21.3107 18.522 21.5823 18.0591C22.1952 17.014 22.2098 15.5642 21.0915 13.4249C19.2269 8.77048 15.8736 4.68488 14.5196 3.04188C14.2417 2.78841 12.4682 2.42843 11.3867 2.08254C10.909 1.93452 10.0195 1.8364 8.95569 3.23838C8.45133 3.90305 6.16015 5.53546 9.06723 6.63322C9.51761 6.74782 9.84868 6.95914 11.9034 6.5838C12.171 6.53736 12.8391 6.5838 13.3098 7.41016L14.2931 8.81637C14.3847 8.94728 14.444 9.09789 14.4623 9.25658C14.6345 10.7555 14.6289 12.6321 15.4647 13.5823C14.1739 12.6489 10.8007 11.5403 8.25906 14.6948',
  d6: 'M9.22109 1.7795C9.81481 1.35942 10.537 1.15927 11.4458 1.41276L13.8325 2.07854C13.8416 2.08106 13.8506 2.08358 13.8597 2.08609C14.1284 2.16063 14.4011 2.23626 14.6358 2.39226C14.867 2.54596 15.0426 2.76342 15.2154 2.9775C15.2249 2.98922 15.2343 3.00093 15.2438 3.01262C17.8746 6.25803 19.6151 8.80922 21.0951 12.0611L21.1211 12.1182C21.683 13.3527 22.1427 14.3625 22.3793 15.2434C22.6309 16.1796 22.6492 17.0304 22.2892 17.9326C21.9294 18.8342 21.3484 19.4157 20.5396 19.8663C19.7935 20.2819 18.8183 20.603 17.6512 20.9872L17.5853 21.0089C15.2202 21.7876 13.0748 21.9411 10.669 21.1702C10.5552 21.1337 10.4982 21.1155 10.4464 21.1264C10.3947 21.1373 10.3486 21.178 10.2565 21.2596C9.06157 22.3173 7.4536 22.815 5.89022 22.8005C4.19129 22.7847 2.45145 22.163 1.26278 20.8727C1.13521 20.7342 1.06439 20.5528 1.06439 20.3646V12.9848C1.06439 12.7866 1.14288 12.5964 1.28271 12.4558C2.54574 11.1863 4.3828 10.5793 6.17075 10.5601C7.07432 10.5504 7.99408 10.6905 8.85058 10.9896C9.09937 11.0765 9.22377 11.1199 9.25055 11.2234C9.27734 11.3268 9.18115 11.4347 8.98877 11.6505C8.81557 11.8448 8.65173 12.0526 8.50132 12.2661C8.02966 12.9357 7.62678 13.7512 7.47666 14.5559C7.4007 14.9631 7.66922 15.3548 8.07641 15.4308C8.48359 15.5067 8.87526 15.2382 8.95122 14.831C9.05076 14.2974 9.33981 13.6805 9.72762 13.1299C9.9928 12.7535 10.2755 12.4484 10.5287 12.2379C10.6157 12.1656 10.6592 12.1294 10.7768 12.0747C10.8943 12.02 10.9654 12.0072 11.1075 11.9817C11.9594 11.8286 12.7693 11.8715 13.5199 12.0602C13.6645 12.0966 13.7368 12.1147 13.7764 12.0789C13.816 12.0432 13.8054 11.9704 13.7842 11.8248C13.7289 11.4458 13.691 11.0636 13.6531 10.6817C13.6261 10.409 13.599 10.1364 13.5657 9.86524C13.5521 9.75498 13.5276 9.58286 13.5087 9.45334C13.4918 9.33746 13.4511 9.22589 13.3827 9.13085C13.2693 8.97333 13.1508 8.81947 13.0323 8.6657C13.0046 8.62974 12.9769 8.59379 12.9492 8.5578C12.877 8.46331 12.8063 8.36863 12.7358 8.27426C12.5251 7.9923 12.3166 7.7131 12.0766 7.45006C12.0344 7.40383 11.9727 7.38127 11.9105 7.38829C11.6833 7.41395 11.1191 7.47937 10.8177 7.52912C10.211 7.62929 9.32818 7.58686 8.55028 7.34492C7.81153 7.11515 6.86673 6.60136 6.6827 5.54605C6.5917 5.02417 6.73502 4.58765 6.98359 4.19587C7.19713 3.8593 7.5213 3.50757 7.86712 3.13234C7.95854 3.03313 8.04841 2.93256 8.13787 2.83158C8.44701 2.48267 8.8162 2.06598 9.22109 1.7795Z',
  d7: 'M11.4458 1.41276C10.5371 1.15927 9.81484 1.35942 9.22112 1.7795C8.81623 2.06598 8.44704 2.48267 8.1379 2.83158C8.04844 2.93256 7.95857 3.03313 7.86715 3.13234C7.52133 3.50757 7.19716 3.8593 6.98362 4.19587C6.73505 4.58765 6.59173 5.02417 6.68274 5.54605C6.86676 6.60136 7.81157 7.11515 8.55031 7.34492C9.32821 7.58686 10.211 7.62929 10.8178 7.52912C11.1191 7.47937 11.6833 7.41395 11.9105 7.38829C11.9727 7.38127 12.0345 7.40383 12.0766 7.45006C12.3969 7.80115 12.6613 8.18102 12.9493 8.5578C13.0951 8.74772 13.2428 8.93649 13.3828 9.13085C13.4512 9.22589 13.4918 9.33746 13.5087 9.45334C13.5276 9.58286 13.5522 9.75498 13.5657 9.86524C13.6526 10.572 13.6968 11.2885 13.8098 11.992C13.8215 12.0649 13.7538 12.1261 13.6823 12.1076C12.817 11.8837 11.815 11.8057 10.7835 12.049C9.51103 11.0203 7.81413 10.5425 6.17078 10.5601C4.38283 10.5793 2.54577 11.1863 1.28274 12.4558C1.14291 12.5964 1.06442 12.7866 1.06442 12.9848V20.3646C1.06442 20.5528 1.13524 20.7342 1.26281 20.8727C2.45148 22.163 4.19132 22.7847 5.89025 22.8005C7.49362 22.8154 9.14389 22.2915 10.3474 21.1773C10.4025 21.1263 10.4815 21.1087 10.5529 21.1324C13.006 21.9459 15.1823 21.8001 17.5853 21.0089L17.6512 20.9872C18.8183 20.603 19.7935 20.2819 20.5397 19.8663C21.3484 19.4157 21.9295 18.8342 22.2892 17.9326C22.6492 17.0304 22.6309 16.1796 22.3794 15.2434C22.1427 14.3625 21.6831 13.3527 21.1211 12.1182L21.0952 12.0611C19.6151 8.80922 17.8746 6.25803 15.2438 3.01262C15.0617 2.78742 14.8797 2.55437 14.6358 2.39226C14.3932 2.231 14.11 2.15561 13.8326 2.07854L11.4458 1.41276Z',
  d8: 'M10.7825 12.048C10.3672 11.7122 9.90668 11.4352 9.41754 11.2148C9.0842 11.5164 8.77063 11.8815 8.5004 12.2651C8.02874 12.9347 7.62586 13.7502 7.47574 14.5549C7.39978 14.9621 7.6683 15.3538 8.07549 15.4298C8.48268 15.5057 8.87435 15.2372 8.95031 14.83C9.04985 14.2964 9.33889 13.6795 9.72671 13.1289C10.0881 12.6159 10.4753 12.237 10.7825 12.048Z',
  d9: 'M2 12.6657C4.30605 10.4467 8.466 10.615 10.5026 12.3533M8.195 14.4445C10.1666 11.944 13.1641 11.8629 15.4013 13.2814C14.5617 12.176 14.6727 10.7687 14.3626 8.75873L12.5337 6.18944C10.0652 6.67478 9.12871 6.60036 8.0116 5.79634C7.31938 5.24995 7.5552 4.45332 8.16674 3.79351C9.0608 2.81048 9.62961 2.02057 10.3881 1.7772C10.6559 1.69129 10.9435 1.72242 11.2196 1.77522C12.5549 2.03052 13.5448 2.40822 15.0039 2.72366C17.329 6.70837 18.8616 9.14459 20.9229 12.7837C21.6594 14.084 22.2706 15.6011 21.8765 17.0434C21.7157 17.6317 21.3263 18.0827 20.808 18.402C16.7372 20.9091 13.083 21.3607 10.2125 20.1351C7.68363 22.6709 3.4645 21.8045 2.01269 20.0819',
  d10: 'M11.4108 2.08436L14.9737 3L20.5605 12.3209C21.9596 15 22.309 16.1704 21.7382 17.6039C21.1674 19.0374 17.5049 20.2457 17.5049 20.2457C15.0404 21.0588 12.7116 21.388 10.1879 20.3993C8.09555 22.5617 4.04059 22.5333 2 20.3137V12.934C3.76305 11.1583 6.9277 10.7943 9.26546 11.8419C8.46322 12.2721 7.70311 12.9019 7.02344 13.7644L8.20181 14.6928C8.99547 13.6858 9.88083 13.1121 10.7631 12.8284C12.6382 12.2254 14.4993 12.9317 15.4364 13.5687C14.9866 13.0795 14.7652 12.3419 14.6869 11.6339L14.3489 8.96136L12.5 6.5L10.8628 6.73838C9.88764 6.8997 7.81164 6.60652 7.59583 5.36638C7.49423 4.78257 7.87267 4.37096 8.62954 3.54775C8.72512 3.4438 8.81796 3.33909 8.90953 3.23581C9.60345 2.45322 10.2245 1.75277 11.4108 2.08436Z',
};

export const IconBodyPartMuscleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-stroke-rounded IconBodyPartMuscleStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBodyPartMuscleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-duotone-rounded IconBodyPartMuscleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
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

export const IconBodyPartMuscleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-twotone-rounded IconBodyPartMuscleTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBodyPartMuscleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-solid-rounded IconBodyPartMuscleSolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBodyPartMuscleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-bulk-rounded IconBodyPartMuscleBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconBodyPartMuscleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-stroke-sharp IconBodyPartMuscleStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBodyPartMuscleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-part-muscle-solid-sharp IconBodyPartMuscleSolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfBodyPartMuscle: TheIconSelfPack = {
  name: 'BodyPartMuscle',
  StrokeRounded: IconBodyPartMuscleStrokeRounded,
  DuotoneRounded: IconBodyPartMuscleDuotoneRounded,
  TwotoneRounded: IconBodyPartMuscleTwotoneRounded,
  SolidRounded: IconBodyPartMuscleSolidRounded,
  BulkRounded: IconBodyPartMuscleBulkRounded,
  StrokeSharp: IconBodyPartMuscleStrokeSharp,
  SolidSharp: IconBodyPartMuscleSolidSharp,
};