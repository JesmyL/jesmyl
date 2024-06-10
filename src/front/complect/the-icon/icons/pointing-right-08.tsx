import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 4.5H16M22 4.5C22 3.79977 20.0057 2.49153 19.5 2M22 4.5C22 5.20023 20.0057 6.50847 19.5 7',
  d2: 'M12.985 13.0054L15.9892 13.0054M15.9892 13.0054H19.4954C20.3264 13.0054 21 12.333 21 11.5036C21 10.6742 20.3264 10.0018 19.4954 10.0018L14.031 10.0018M15.9892 13.0054L15.9624 14.0598C15.9443 14.7708 15.556 15.3874 14.9844 15.7277M14.031 10.0018L9.46807 10.0018M14.031 10.0018L11.2712 7.4084C9.40362 5.83594 8.04219 6.66226 7.28577 7.24251L4.84841 8.85739C2.78085 10.0822 2 11.4996 2 12.6918V17.5726C2 19.8386 4.38227 21.9517 6.56579 21.9517L11.7657 21.9997C12.7759 22.0091 13.635 21.2664 13.77 20.2671L13.9593 18.7267M12.9552 16.0089H13.9593C14.3335 16.0089 14.6842 15.9064 14.9844 15.7277M14.9844 15.7277L14.9297 17.0633C14.9021 18.1477 14.0134 19.0125 12.9266 19.0125H11.9226',
  d3: 'M11.8057 22H11.8077C12.7845 21.9991 13.6179 21.2925 13.7785 20.3288L14 19H13C14.1046 19 15 18.1046 15 17V16H14C15.1046 16 16 15.1046 16 14V13H19.5C20.3284 13 21 12.3284 21 11.5C21 10.6716 20.3284 10 19.5 10H14L12.6253 8.5343C11.29 7.32555 10.6224 6.72118 9.82445 6.55904C9.57385 6.50813 9.31789 6.49003 9.06279 6.50519C8.25046 6.55345 7.50724 7.05806 6.0208 8.06729L5.19069 8.6309C4.25168 9.26844 3.78217 9.58722 3.41042 9.97767C2.75974 10.6611 2.31019 11.5166 2.11279 12.447C2 12.9786 2 13.5533 2 14.7027C2 16.7557 2 17.7823 2.28643 18.6066C2.78992 20.0556 3.90918 21.1955 5.332 21.7083C6.14141 22 7.14936 22 9.16527 22H11H11.8057Z',
  d4: 'M12.985 13.0052H15.9892M15.9892 13.0052H19.4954C20.3264 13.0052 21 12.3328 21 11.5034C21 10.674 20.3264 10.0016 19.4954 10.0016H14.031M15.9892 13.0052L15.9624 14.0596C15.9443 14.7706 15.556 15.3872 14.9844 15.7275M14.031 10.0016H9.46807M14.031 10.0016L11.2712 7.40816C9.40362 5.8357 8.04219 6.66202 7.28577 7.24227L4.84841 8.85715C2.78085 10.082 2 11.4994 2 12.6916V17.5724C2 19.8384 4.38227 21.9515 6.56579 21.9515L11.7657 21.9995C12.7759 22.0089 13.635 21.2662 13.77 20.2669L13.9593 18.7265M14.9844 15.7275C14.6842 15.9062 14.3335 16.0087 13.9593 16.0087H12.9552M14.9844 15.7275L14.9297 17.0631C14.9021 18.1475 14.0134 19.0123 12.9266 19.0123H11.9226',
  d5: 'M12.985 13.0056H15.9892M15.9892 13.0056H19.4954C20.3264 13.0056 21 12.3332 21 11.5038C21 10.6744 20.3264 10.002 19.4954 10.002H14.031M15.9892 13.0056L15.9624 14.06C15.9443 14.771 15.556 15.3876 14.9844 15.7279M14.031 10.002H9.46807M14.031 10.002L11.2712 7.40864C9.40362 5.83618 8.04219 6.6625 7.28577 7.24275L4.84841 8.85763C2.78085 10.0824 2 11.4998 2 12.692V17.5728C2 19.8388 4.38227 21.9519 6.56579 21.9519L11.7657 21.9999C12.7759 22.0093 13.635 21.2666 13.77 20.2673L13.9593 18.7269M14.9844 15.7279C14.6842 15.9066 14.3335 16.0091 13.9593 16.0091H12.9552M14.9844 15.7279L14.9297 17.0635C14.9021 18.1479 14.0134 19.0127 12.9266 19.0127H11.9226',
  d6: 'M12.6884 8.91968C13.2286 8.91968 13.4987 8.91968 13.5848 8.76751C13.5959 8.74805 13.6047 8.72741 13.6111 8.70598C13.6614 8.5385 13.4746 8.34343 13.101 7.95329C12.4569 7.37016 11.9337 6.89652 11.471 6.55239C10.9905 6.19502 10.522 5.93545 9.97382 5.82406C9.65952 5.7602 9.33841 5.73749 9.01834 5.75651C8.45982 5.78969 7.96005 5.98104 7.43521 6.26761C6.93002 6.54344 6.34744 6.939 5.6305 7.42578L4.69294 8.06233C3.82688 8.65022 3.29502 9.01124 2.86728 9.46051C2.12006 10.2453 1.60513 11.2262 1.37915 12.2914C1.24986 12.9007 1.24992 13.815 1.25002 14.8768C1.24972 16.763 1.24954 17.9074 1.57801 18.8527C2.15457 20.5121 3.43845 21.8231 5.07775 22.4139C6.01194 22.7505 7.14223 22.7503 8.98816 22.75L11 22.75C11.2655 22.75 11.9166 22.7303 12.209 22.7205C13.2116 22.7205 14.1899 21.886 14.4509 20.7521C14.5075 20.5062 14.5357 20.3833 14.4457 20.2701C14.3556 20.157 14.2098 20.157 13.9184 20.157H12.0617C11.8291 20.157 11.6405 19.9635 11.6405 19.7248C11.6405 19.4861 11.8291 19.2926 12.0617 19.2926H14.4977C14.607 19.2926 14.6616 19.2926 14.7157 19.2706C14.7699 19.2487 14.8037 19.216 14.8714 19.1504C15.3031 18.7323 15.6153 18.1307 15.7156 17.2983C15.7475 17.0336 15.7634 16.9013 15.6739 16.8003C15.5844 16.6993 15.4396 16.6993 15.15 16.6993H13.185C12.9524 16.6993 12.7638 16.5058 12.7638 16.2671C12.7638 16.0284 12.9524 15.8349 13.185 15.8349H15.7804C15.9163 15.8349 15.9843 15.8349 16.0481 15.8026C16.112 15.7703 16.1471 15.7226 16.2173 15.6271C16.5522 15.1715 16.75 14.6088 16.75 14C16.7496 13.9176 16.7398 13.769 16.7106 13.6096C16.6828 13.4571 16.6688 13.3809 16.5854 13.3113C16.5019 13.2417 16.4071 13.2417 16.2173 13.2417L13.185 13.2417C12.9524 13.2417 12.7638 13.0482 12.7638 12.8095C12.7638 12.5708 12.9524 12.3773 13.185 12.3773L20.4535 12.3773C21.1696 12.3773 21.7501 11.7968 21.7501 11.0807C21.7501 10.3646 21.1696 9.78409 20.4535 9.78409L9.25349 9.78409C9.02085 9.78409 8.83225 9.59058 8.83225 9.35188C8.83225 9.11319 9.02085 8.91968 9.25349 8.91968L12.6884 8.91968Z',
  d7: 'M15.75 3.49414C15.1977 3.49414 14.75 3.94186 14.75 4.49414C14.75 5.04643 15.1977 5.49414 15.75 5.49414L18.25 5.49414L18.25 6.0884C18.2499 6.26404 18.2497 6.47969 18.2718 6.65613L18.2722 6.65947C18.288 6.78592 18.3598 7.36196 18.9254 7.63632C19.4923 7.91128 19.9924 7.60935 20.1006 7.54403L20.5691 7.20489C20.9449 6.91025 21.4594 6.50455 21.8504 6.12412C22.0455 5.93429 22.2467 5.71703 22.4056 5.48612C22.5468 5.28086 22.75 4.93067 22.75 4.5C22.75 4.06933 22.5468 3.71914 22.4056 3.51388C22.2467 3.28297 22.0455 3.06571 21.8504 2.87588C21.4594 2.49545 20.9449 2.08975 20.5691 1.79512L20.1006 1.45597C19.9924 1.39065 19.4922 1.08872 18.9254 1.36368C18.3598 1.63804 18.288 2.21408 18.2722 2.34053L18.2718 2.34387C18.2497 2.52031 18.2499 2.73597 18.25 2.9116L18.25 3.49414L15.75 3.49414Z',
  d8: 'M11.4926 15.7974H13.3959C13.5695 15.7974 13.8507 15.7696 14.0056 15.7167M14.0056 15.7167C14.5828 15.5197 14.9983 15.0316 14.9983 14.4065V12.6962M14.0056 15.7167V17.4998C14.0056 18.1248 13.5739 18.6175 12.9967 18.8146M10.8079 18.8972H12.3738C12.5475 18.8972 12.8418 18.8675 12.9967 18.8146M12.9967 18.8146V20.5279C12.9107 21.5163 12.2217 21.9995 11.4144 21.9995H4.97464C3.33317 21.9995 2.11506 20.6957 2.00244 19.1285V10.1024L7.55076 6.50634C9.8236 5.16489 11.4529 6.77384 14.0156 9.6128M14.9983 12.6962H12.007M14.9983 12.6962H20.2528C20.5251 12.6962 20.7711 12.6634 20.9961 12.5959C21.9809 12.3003 22.3085 10.9982 21.6661 10.1956C21.3935 9.85501 21.0407 9.61303 20.6554 9.61303H9.49124',
  d9: 'M15.9976 4.50049H21.4603M19.4976 2.00049L21.9976 4.50049L19.4976 7.00049',
  d10: 'M9.49643 5.31119C9.25134 5.25841 9.00115 5.23967 8.75184 5.25537C7.97636 5.30421 7.21662 5.74191 5.53984 6.94853L5.52759 6.95734L1.25 9.79056V19.6083C1.25 21.3555 2.58326 22.75 4.20207 22.75H11.443C12.1505 22.75 12.7241 22.1611 12.7241 21.4346V20.0017L10.6696 20.0086V19.2079H12.557C12.7074 19.2079 12.851 19.1815 12.9841 19.1332C13.4822 18.9524 13.8381 18.4647 13.8381 17.8926V16.4597L11.443 16.4665V15.6659H13.671C13.8214 15.6659 13.965 15.6394 14.098 15.5911C14.5961 15.4104 14.9521 14.9226 14.9521 14.3505V12.9245L12 12.9245V12.1238L21.4689 12.1238C22.1649 12.1238 22.75 11.5222 22.75 10.7531C22.75 9.98402 22.1649 9.38241 21.4689 9.38241L9.21503 9.38241V8.58175L13.3614 8.58175L10.6746 5.93961C10.2157 5.57783 9.86133 5.38977 9.49643 5.31119Z',
  d11: 'M19.543 1.25L22.7502 4.45711L19.543 7.66421L18.1288 6.25L18.9217 5.45711L15.3359 5.45711V3.45711L18.9217 3.45711L18.1288 2.66421L19.543 1.25Z',
};

export const IconPointingRight08StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-stroke-rounded IconPointingRight08StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconPointingRight08DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-duotone-rounded IconPointingRight08DuotoneRounded"
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
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight08TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-twotone-rounded IconPointingRight08TwotoneRounded"
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight08SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-solid-rounded IconPointingRight08SolidRounded"
    >
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

export const IconPointingRight08BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-bulk-rounded IconPointingRight08BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconPointingRight08StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-stroke-sharp IconPointingRight08StrokeSharp"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconPointingRight08SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="pointing-right-08-solid-sharp IconPointingRight08SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfPointingRight08: TheIconSelfPack = {
  name: 'PointingRight08',
  StrokeRounded: IconPointingRight08StrokeRounded,
  DuotoneRounded: IconPointingRight08DuotoneRounded,
  TwotoneRounded: IconPointingRight08TwotoneRounded,
  SolidRounded: IconPointingRight08SolidRounded,
  BulkRounded: IconPointingRight08BulkRounded,
  StrokeSharp: IconPointingRight08StrokeSharp,
  SolidSharp: IconPointingRight08SolidSharp,
};