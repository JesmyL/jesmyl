import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15.1449 5.20762C14.5031 4.46785 13.5562 4 12.5 4C11.0033 4 9.72595 4.93951 9.22564 6.26097C8.85144 6.09327 8.43661 6 8 6C6.34315 6 5 7.34315 5 9C5 9.01673 5.00014 9.03343 5.00041 9.05009M15.1449 5.20762C15.5725 5.07274 16.0278 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.1296 20.8707 10.729 20.6372 11.273M15.1449 5.20762C13.7981 5.63239 12.7249 6.67345 12.2561 8C12.1435 8.31841 12.0658 8.65327 12.0275 9M9.05001 14C9.28164 15.1411 10.2905 16 11.5 16C11.7548 16 11.8823 16 11.9998 16.014C12.5855 16.0835 13.1107 16.4081 13.4348 16.9009C13.4999 16.9997 13.5569 17.1137 13.6708 17.3416L15 20M9.05001 14C9.01722 13.8384 9 13.6712 9 13.5C9 12.6822 9.39267 11.9561 9.99976 11.5M9.05001 14H4.5C3.11929 14 2 12.8807 2 11.5C2 10.1193 3.11929 9 4.5 9C4.67138 9 4.83873 9.01724 5.00041 9.05009M20.6372 11.273C20.2961 11.0985 19.9095 11 19.5 11C18.2905 11 17.2816 11.8589 17.05 13M20.6372 11.273C21.4462 11.687 22 12.5288 22 13.5C22 14.8807 20.8807 16 19.5 16C18.2904 16 17.4531 17.2082 17.8778 18.3408L18.5 20M5.00041 9.05009C5.01267 9.7988 5.2992 10.4808 5.76389 11',
  d2: 'M21 9.5C21 7.01472 18.9853 5 16.5 5C16.0278 5 15.5725 5.07274 15.1449 5.20762C14.5031 4.46785 13.5562 4 12.5 4C11.0033 4 9.72595 4.93951 9.22564 6.26097C8.85144 6.09327 8.43661 6 8 6C6.34315 6 5 7.34315 5 9C5 9.01673 5.00014 9.03343 5.00041 9.05009C4.83873 9.01724 4.67138 9 4.5 9C3.11929 9 2 10.1193 2 11.5C2 12.8807 3.11929 14 4.5 14H9.05001C9.28164 15.1411 10.2905 16 11.5 16C11.7548 16 11.8823 16 11.9998 16.014C12.5855 16.0835 13.1107 16.4081 13.4348 16.9009C13.4999 16.9997 13.5569 17.1137 13.6708 17.3416L13.6708 17.3416L15 20H18.5L17.8778 18.3408C17.4531 17.2082 18.2904 16 19.5 16C20.8807 16 22 14.8807 22 13.5C22 12.5288 21.4462 11.687 20.6372 11.273C20.8707 10.729 21 10.1296 21 9.5Z',
  d3: 'M15.1458 5.20762C14.5041 4.46785 13.5571 4 12.5009 4C11.0042 4 9.72687 4.93951 9.22656 6.26097M15.1458 5.20762C15.5735 5.07274 16.0287 5 16.5009 5C18.9862 5 21.0009 7.01472 21.0009 9.5C21.0009 10.1296 20.8716 10.729 20.6382 11.273M15.1458 5.20762C13.7991 5.63239 12.7258 6.67345 12.257 8C12.1444 8.31841 12.0667 8.65327 12.0284 9M20.6382 11.273C20.297 11.0985 19.9105 11 19.5009 11C18.2914 11 17.2826 11.8589 17.0509 13M20.6382 11.273C21.4472 11.687 22.0009 12.5288 22.0009 13.5C22.0009 14.8807 20.8816 16 19.5009 16C18.2913 16 17.454 17.2082 17.8787 18.3408L18.5009 20',
  d4: 'M12.4886 5.19442C11.4454 5.19442 10.5525 5.84535 10.2027 6.76458C10.1073 7.01509 9.9123 7.21537 9.66365 7.31814C9.415 7.42092 9.13474 7.41708 8.88902 7.30753C8.64657 7.19944 8.37717 7.13883 8.09091 7.13883C7.01144 7.13883 6.13636 8.00938 6.13636 9.08325L6.13663 9.11604C6.14462 9.60142 6.33043 10.0421 6.63382 10.3793C6.99378 10.7794 6.95955 11.394 6.55738 11.7521C6.15521 12.1102 5.53738 12.0761 5.17742 11.676C4.7771 11.2311 4.4778 10.6928 4.31653 10.0982C3.67791 10.2557 3.20455 10.8298 3.20455 11.5138C3.20455 12.3192 3.86086 12.9721 4.67045 12.9721H8.1256C8.25698 12.0595 8.75256 11.2639 9.45819 10.7365C9.88971 10.414 10.5023 10.5005 10.8265 10.9298C11.1507 11.3591 11.0638 11.9685 10.6322 12.291C10.2741 12.5587 10.0455 12.9818 10.0455 13.4582C10.0455 13.5593 10.0557 13.6571 10.0748 13.7509C10.2105 14.4161 10.8033 14.9165 11.5114 14.9165L12.115 14.9368C12.9737 15.0383 13.7435 15.5116 14.2187 16.2302L15.8059 19.3427C16.0473 19.823 15.8516 20.407 15.3689 20.6471C14.8861 20.8872 14.2991 20.6926 14.0577 20.2123L12.5858 17.2988C12.3739 16.8794 11.7812 16.8321 11.5114 16.8609C10.1463 16.8609 8.9693 16.066 8.42038 14.9165H4.67045C2.78139 14.9165 1.25 13.393 1.25 11.5138C1.25 9.75904 2.58513 8.31453 4.29992 8.13077C4.72693 6.44349 6.26229 5.19442 8.09091 5.19442C8.32935 5.19442 8.56324 5.21576 8.79059 5.2567C9.57287 4.05016 10.936 3.25 12.4886 3.25C13.5909 3.25 14.5991 3.65427 15.3702 4.31999C15.7033 4.25576 16.047 4.22221 16.3977 4.22221C19.3663 4.22221 21.7727 6.6162 21.7727 9.56935C21.7727 10.0331 21.7132 10.4839 21.601 10.9143C22.305 11.5369 22.75 12.4453 22.75 13.4582C22.75 15.3375 21.2186 16.8609 19.3295 16.8609C18.8297 16.8609 18.4838 17.3575 18.6593 17.8231L19.2673 19.4362C19.4568 19.9389 19.2008 20.4993 18.6954 20.6878C18.1901 20.8764 17.6267 20.6216 17.4372 20.1189L16.8292 18.5058C16.1745 16.7691 17.4651 14.9165 19.3295 14.9165C20.1391 14.9165 20.7955 14.2636 20.7955 13.4582C20.7955 12.8931 20.4726 12.4013 19.9958 12.1586C19.797 12.0574 19.5714 11.9999 19.3295 11.9999C18.6215 11.9999 18.0287 12.5002 17.893 13.1655C17.7856 13.6917 17.2698 14.0317 16.7408 13.9249C16.2119 13.818 15.8701 13.3049 15.9775 12.7787C16.2945 11.2251 17.6736 10.0555 19.3295 10.0555C19.4818 10.0555 19.632 10.0654 19.7793 10.0847C19.8049 9.91692 19.8182 9.74485 19.8182 9.56935C19.8182 7.69007 18.2868 6.16662 16.3977 6.16662C16.0371 6.16662 15.6913 6.22181 15.3674 6.32345C14.3449 6.64428 13.5279 7.43245 13.1717 8.43502C13.0863 8.67514 13.0273 8.92786 12.9982 9.19007C12.9389 9.72375 12.4559 10.1086 11.9195 10.0496C11.383 9.99057 10.9962 9.51011 11.0555 8.97642C11.1013 8.56444 11.1942 8.16606 11.3288 7.78705C11.6854 6.78345 12.3338 5.91786 13.1732 5.29093C12.956 5.22806 12.7263 5.19442 12.4886 5.19442Z',
  d5: 'M12.4886 5.19442C11.4454 5.19442 10.5525 5.84535 10.2027 6.76458C10.1073 7.01509 9.9123 7.21537 9.66365 7.31814C9.415 7.42092 9.13474 7.41708 8.88902 7.30753C8.64657 7.19944 8.37717 7.13883 8.09091 7.13883C7.01144 7.13883 6.13636 8.00938 6.13636 9.08325L6.13663 9.11604C6.14462 9.60142 6.33043 10.0421 6.63382 10.3793C6.99378 10.7794 6.95955 11.394 6.55738 11.7521C6.15521 12.1102 5.53738 12.0761 5.17742 11.676C4.7771 11.2311 4.4778 10.6928 4.31653 10.0982C3.67791 10.2557 3.20455 10.8298 3.20455 11.5138C3.20455 12.3192 3.86086 12.9721 4.67045 12.9721H8.1256C8.09843 13.3565 8.11936 14.2837 8.42038 14.9165H4.67045C2.78139 14.9165 1.25 13.393 1.25 11.5138C1.25 9.75904 2.58513 8.31453 4.29992 8.13077C4.72693 6.44349 6.26229 5.19442 8.09091 5.19442C8.32935 5.19442 8.56324 5.21576 8.79059 5.2567C9.57287 4.05016 10.936 3.25 12.4886 3.25C13.5909 3.25 14.5991 3.65427 15.3702 4.31999C14.4087 4.48804 13.5049 5.03731 13.1732 5.29093C12.956 5.22806 12.7263 5.19442 12.4886 5.19442Z',
  d6: 'M13.1735 5.29138C13.5052 5.03775 14.409 4.48849 15.3705 4.32044C15.7036 4.25621 16.0472 4.22266 16.398 4.22266C19.3665 4.22266 21.773 6.61665 21.773 9.5698C21.773 10.0335 21.7134 10.4844 21.6013 10.9147C22.3053 11.5373 22.7503 12.4458 22.7503 13.4586C22.7503 15.3379 21.2189 16.8614 19.3298 16.8614C18.83 16.8614 18.484 17.358 18.6595 17.8235L19.2676 19.4366C19.4571 19.9394 19.2011 20.4998 18.6957 20.6883C18.1903 20.8768 17.627 20.6221 17.4375 20.1193L16.8294 18.5063C16.1748 16.7695 17.4653 14.9169 19.3298 14.9169C20.1394 14.9169 20.7957 14.264 20.7957 13.4586C20.7957 12.8935 20.4728 12.4018 19.996 12.159C19.7972 12.0578 19.5717 12.0003 19.3298 12.0003C18.6218 12.0003 18.029 12.5007 17.8933 13.1659C17.7859 13.6921 17.27 14.0321 16.7411 13.9253C16.2122 13.8185 15.8704 13.3053 15.9778 12.7791C16.2948 11.2255 17.6739 10.0559 19.3298 10.0559C19.4821 10.0559 19.6323 10.0659 19.7796 10.0852C19.8052 9.91737 19.8185 9.74529 19.8185 9.5698C19.8185 7.69052 18.2871 6.16707 16.398 6.16707C16.0374 6.16707 15.6916 6.22226 15.3676 6.3239C14.3451 6.64473 13.5281 7.4329 13.1719 8.43547C13.0866 8.67559 13.0276 8.92831 12.9985 9.19052C12.9392 9.7242 12.4562 10.109 11.9197 10.05C11.3833 9.99102 10.9965 9.51056 11.0558 8.97687C11.1015 8.56489 11.1944 8.16651 11.3291 7.7875C11.6857 6.78389 12.3341 5.91831 13.1735 5.29138Z',
  d7: 'M9.45847 10.7369C8.75283 11.2644 8.25726 12.06 8.12587 12.9725C8.09871 13.357 8.11963 14.2841 8.42066 14.9169C8.96958 16.0665 10.1466 16.8614 11.5116 16.8614C11.7815 16.8326 12.3741 16.8798 12.586 17.2993L14.058 20.2128C14.2994 20.693 14.8864 20.8877 15.3691 20.6475C15.8519 20.4074 16.0476 19.8234 15.8062 19.3432L14.219 16.2307C13.7438 15.512 12.9739 15.0387 12.1153 14.9373L11.5116 14.9169C10.8036 14.9169 10.2108 14.4166 10.0751 13.7513C10.0559 13.6576 10.0457 13.5598 10.0457 13.4586C10.0457 12.9822 10.2743 12.5592 10.6325 12.2915C11.064 11.969 11.151 11.3595 10.8268 10.9302C10.5026 10.501 9.88998 10.4144 9.45847 10.7369Z',
  d8: 'M15.0055 19.9775L13.5076 17.0332C12.874 16.0736 12.7079 15.9697 11.0725 15.9697C10.3907 15.9697 9.24722 15.2052 9.0525 13.9778M9.0525 13.9778C8.93853 13.2595 9.11444 12.272 9.99151 11.4797M9.0525 13.9778H4.43748C3.52141 14.0067 1.74892 13.314 2.05575 10.9851C2.17726 10.2955 2.81744 8.92738 5.01448 8.92738M5.01448 8.92738C4.94084 9.50353 5.12577 10.2652 5.80079 10.9851M5.01448 8.92738C5.03441 7.69519 6.31552 5.14343 9.21219 6.27984C9.81361 4.7959 12.2134 2.61455 15.1896 5.12733M15.1896 5.12733C14.3075 5.40191 12.342 6.5801 12.0352 9.00096M15.1896 5.12733C17.2991 4.47072 22.1828 5.9366 20.7129 11.2933M20.7129 11.2933C19.7003 10.8096 17.6254 10.7084 17.0374 12.9842M20.7129 11.2933C21.3702 11.7157 22.6293 12.8159 21.6764 14.6523C21.4301 15.1269 21.029 15.515 20.536 15.7234C20.2057 15.8631 19.8155 15.9697 19.395 15.9697C18.6398 15.9697 18.0968 16.6244 17.9317 17.0332C17.8341 17.269 17.6975 17.889 17.9317 18.4826L18.4928 19.9775',
  d9: 'M12.4886 5.44874C11.4454 5.44874 10.5525 6.10112 10.2027 7.02239L9.83544 7.98943L8.88902 7.56654C8.64657 7.45821 8.37717 7.39747 8.09091 7.39747C7.01144 7.39747 6.13636 8.26995 6.13636 9.34621L6.13663 9.37907C6.14462 9.86553 6.33043 10.3071 6.63382 10.6451L5.17742 11.9448C4.7771 11.4988 4.4778 10.9593 4.31653 10.3635C3.67791 10.5213 3.20455 11.0966 3.20455 11.7821C3.20455 12.5893 3.86086 13.2437 4.67045 13.2437H8.1256C8.25698 12.3291 8.75256 11.5317 9.45819 11.0031L10.6322 12.5611C10.2741 12.8294 10.0455 13.2534 10.0455 13.7309C10.0455 13.8322 10.0557 13.9302 10.0748 14.0242C10.2105 14.6909 10.8033 15.1924 11.5114 15.1924C11.5259 15.1924 11.5403 15.1924 11.5546 15.1924C11.7609 15.1923 11.9411 15.1922 12.115 15.2128C12.9737 15.3145 13.7435 15.7888 14.2187 16.5091C14.3149 16.6549 14.3955 16.8157 14.4876 16.9997C14.494 17.0124 14.5004 17.0253 14.5069 17.0383L15.8059 19.6285L14.0577 20.5L12.7587 17.9098C12.6364 17.6658 12.6099 17.6167 12.5858 17.58C12.4274 17.34 12.1708 17.1818 11.8845 17.1479C11.8408 17.1428 11.785 17.1411 11.5114 17.1411C10.1463 17.1411 8.9693 16.3445 8.42038 15.1924H4.67045C2.78139 15.1924 1.25 13.6656 1.25 11.7821C1.25 10.0235 2.58513 8.57578 4.29992 8.39162C4.72693 6.70058 6.26229 5.44874 8.09091 5.44874C8.32935 5.44874 8.56324 5.47013 8.79059 5.51116C9.57287 4.30194 10.936 3.5 12.4886 3.5C13.5909 3.5 14.5991 3.90517 15.3702 4.57237C15.7033 4.508 16.047 4.47437 16.3977 4.47437C19.3663 4.47437 21.7727 6.87368 21.7727 9.83339C21.7727 10.2981 21.7132 10.75 21.601 11.1813C22.305 11.8053 22.75 12.7158 22.75 13.7309C22.75 15.6143 21.2186 17.1411 19.3295 17.1411C18.8297 17.1411 18.4838 17.6389 18.6593 18.1055L19.2673 19.7221L17.4372 20.4064L16.8292 18.7897C16.1745 17.0491 17.4651 15.1924 19.3295 15.1924C20.1391 15.1924 20.7955 14.5381 20.7955 13.7309C20.7955 13.1645 20.4726 12.6716 19.9958 12.4284C19.797 12.327 19.5714 12.2693 19.3295 12.2693C18.6215 12.2693 18.0287 12.7708 17.893 13.4375L15.9775 13.0498C16.2945 11.4928 17.6736 10.3206 19.3295 10.3206C19.4818 10.3206 19.632 10.3306 19.7793 10.3499C19.8049 10.1817 19.8182 10.0093 19.8182 9.83339C19.8182 7.94994 18.2868 6.4231 16.3977 6.4231C16.0371 6.4231 15.6913 6.47841 15.3674 6.58028C14.3449 6.90182 13.5279 7.69174 13.1717 8.69654C13.0863 8.93719 13.0273 9.19048 12.9982 9.45326L11.0555 9.23915C11.1013 8.82625 11.1942 8.42698 11.3288 8.04713C11.6854 7.0413 12.3338 6.17378 13.1732 5.54547C12.956 5.48245 12.7263 5.44874 12.4886 5.44874Z',
};

export const IconBrain01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-stroke-rounded IconBrain01StrokeRounded"
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

export const IconBrain01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-duotone-rounded IconBrain01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
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

export const IconBrain01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-twotone-rounded IconBrain01TwotoneRounded"
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
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBrain01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-solid-rounded IconBrain01SolidRounded"
    >
      <path 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBrain01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-bulk-rounded IconBrain01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBrain01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-stroke-sharp IconBrain01StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconBrain01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="brain-01-solid-sharp IconBrain01SolidSharp"
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

export const iconPackOfBrain01: TheIconSelfPack = {
  name: 'Brain01',
  StrokeRounded: IconBrain01StrokeRounded,
  DuotoneRounded: IconBrain01DuotoneRounded,
  TwotoneRounded: IconBrain01TwotoneRounded,
  SolidRounded: IconBrain01SolidRounded,
  BulkRounded: IconBrain01BulkRounded,
  StrokeSharp: IconBrain01StrokeSharp,
  SolidSharp: IconBrain01SolidSharp,
};