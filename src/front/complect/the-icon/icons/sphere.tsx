import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5ZM12 10.5V2',
  d2: 'M15 8C19.0571 8.52165 22 10.0733 22 11.9063C22 14.1672 17.5228 16 12 16C6.47715 16 2 14.1672 2 11.9063C2 10.0733 4.94289 8.52165 9 8',
  d3: 'M12 2C17.5228 2 22 6.47715 22 12C21 13.5 19 15.5 12 16C6.4 16.4 3 13.5 2 12C2 6.47715 6.47715 2 12 2ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z',
  d4: 'M10.0375 8.07895C10.1063 8.59933 9.72814 9.07542 9.19281 9.14233C7.28824 9.38037 5.706 9.84762 4.63115 10.4212C3.49698 11.0264 3.20455 11.5848 3.20455 11.911C3.20455 12.1109 3.30221 12.3915 3.67492 12.7422C4.05053 13.0956 4.64521 13.4576 5.45988 13.7818C7.08446 14.4283 9.39624 14.85 12 14.85C14.6038 14.85 16.9155 14.4283 18.5401 13.7818C19.3548 13.4576 19.9495 13.0956 20.3251 12.7422C20.6978 12.3915 20.7955 12.1109 20.7955 11.911C20.7955 11.5848 20.503 11.0264 19.3689 10.4212C18.294 9.84762 16.7118 9.38037 14.8072 9.14233C14.2719 9.07542 13.8937 8.59933 13.9625 8.07895C14.0314 7.55856 14.5211 7.19095 15.0564 7.25786C17.1168 7.51537 18.955 8.03292 20.3094 8.75562C21.6044 9.44667 22.75 10.4959 22.75 11.911C22.75 12.7851 22.3007 13.5275 21.6844 14.1074C21.071 14.6846 20.2344 15.1606 19.2806 15.5401C17.3682 16.3012 14.7936 16.75 12 16.75C9.20644 16.75 6.63185 16.3012 4.71939 15.5401C3.76555 15.1606 2.92904 14.6846 2.3156 14.1074C1.69926 13.5275 1.25 12.7851 1.25 11.911C1.25 10.4959 2.39557 9.44667 3.69063 8.75562C5.04501 8.03292 6.88323 7.51537 8.94355 7.25786C9.47888 7.19095 9.96865 7.55856 10.0375 8.07895Z',
  d5: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12ZM11 3.26078C7.94264 3.60687 5.36038 5.52042 4.07614 8.17848C3.9797 8.37809 3.93148 8.4779 3.97991 8.52807C4.02835 8.57824 4.13317 8.53206 4.3428 8.43971C5.61063 7.88122 7.19744 7.47612 8.94381 7.25784C9.47914 7.19094 9.9689 7.55855 10.0377 8.07893C10.1066 8.59931 9.72839 9.0754 9.19307 9.14231C7.28849 9.38036 5.70626 9.8476 4.63141 10.4212C3.5308 11.0084 3.22285 11.5517 3.20558 11.8814L3.20508 11.9295C3.211 12.128 3.31381 12.4022 3.67518 12.7422C4.05079 13.0956 4.64547 13.4576 5.46014 13.7818C7.08472 14.4283 9.39649 14.85 12.0003 14.85C14.604 14.85 16.9158 14.4283 18.5404 13.7818C19.355 13.4576 19.9497 13.0956 20.3253 12.7422C20.6867 12.4022 20.7895 12.128 20.7954 11.9295L20.7949 11.8815C20.7777 11.5517 20.4697 11.0084 19.3691 10.4212C18.2943 9.8476 16.712 9.38036 14.8074 9.14231C14.2721 9.0754 13.894 8.59931 13.9628 8.07893C14.0316 7.55855 14.5214 7.19094 15.0567 7.25784C16.8031 7.47612 18.3899 7.88122 19.6577 8.43972C19.8673 8.53207 19.9722 8.57824 20.0206 8.52807C20.069 8.4779 20.0208 8.3781 19.9244 8.17849C18.6401 5.52027 16.0576 3.60666 13 3.26072V9.98388C13.7409 10.3521 14.25 11.1166 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 11.1166 10.2591 10.3521 11 9.98388V3.26078Z',
  d6: 'M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75ZM12.0003 3.20453C8.51214 3.20453 5.49827 5.23501 4.07614 8.17848C3.9797 8.37809 3.93148 8.4779 3.97991 8.52807C4.02835 8.57824 4.13317 8.53206 4.3428 8.43971C5.61063 7.88122 7.19744 7.47612 8.94381 7.25784C9.47914 7.19094 9.9689 7.55855 10.0377 8.07893C10.1066 8.59931 9.72839 9.0754 9.19307 9.14231C7.28849 9.38036 5.70626 9.8476 4.63141 10.4212C3.5308 11.0084 3.22285 11.5517 3.20558 11.8814L3.20508 11.9295C3.211 12.128 3.31381 12.4022 3.67518 12.7422C4.05079 13.0956 4.64547 13.4576 5.46014 13.7818C7.08472 14.4283 9.39649 14.85 12.0003 14.85C14.604 14.85 16.9158 14.4283 18.5404 13.7818C19.355 13.4576 19.9497 13.0956 20.3253 12.7422C20.6867 12.4022 20.7895 12.128 20.7954 11.9295L20.7949 11.8815C20.7777 11.5517 20.4697 11.0084 19.3691 10.4212C18.2943 9.8476 16.712 9.38036 14.8074 9.14231C14.2721 9.0754 13.894 8.59931 13.9628 8.07893C14.0316 7.55855 14.5214 7.19094 15.0567 7.25784C16.8031 7.47612 18.3899 7.88122 19.6577 8.43972C19.8673 8.53207 19.9722 8.57824 20.0206 8.52807C20.069 8.4779 20.0208 8.3781 19.9244 8.17849C18.5022 5.23501 15.4884 3.20453 12.0003 3.20453Z',
  d7: 'M20.0206 8.52807C21.3157 9.21912 22.75 10.5849 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 10.5849 2.68485 9.21912 3.97991 8.52807C3.93148 8.4779 3.9797 8.37809 4.07614 8.17848C5.36038 5.52042 7.94264 3.60687 11 3.26078V9.98388C10.2591 10.3521 9.75 11.1166 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 11.1166 13.7409 10.3521 13 9.98388V3.26072C16.0576 3.60666 18.6401 5.52027 19.9244 8.17849C20.0208 8.3781 20.069 8.4779 20.0206 8.52807Z',
  d8: 'M14.25 11C14.25 10.1166 13.7409 9.35206 13 8.98388V2H11V8.98388C10.2591 9.35206 9.75 10.1166 9.75 11C9.75 12.2426 10.7574 13.25 12 13.25C13.2426 13.25 14.25 12.2426 14.25 11Z',
  d9: 'M1.25744 11.5962C1.46978 5.84624 6.19813 1.25 12 1.25C17.802 1.25 22.5304 5.84639 22.7426 11.5965C22.7475 11.663 22.75 11.7304 22.75 11.7985C22.75 11.8209 22.7497 11.8431 22.7492 11.8653C22.7497 11.9101 22.75 11.955 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 11.955 1.25028 11.9101 1.25083 11.8653C1.25028 11.8431 1.25 11.8209 1.25 11.7985C1.25 11.7303 1.25252 11.6628 1.25744 11.5962ZM11.9991 3.2041C8.42345 3.2041 5.34612 5.33781 3.97094 8.40144C5.29364 7.73453 7.02162 7.25457 8.94269 7.00737L9.19194 8.94754C7.28737 9.19262 5.70514 9.67368 4.63028 10.2642C3.57244 10.8453 3.24685 11.3846 3.20782 11.7271C3.20666 11.765 3.20575 11.803 3.20508 11.841C3.21817 12.0433 3.32659 12.3172 3.67405 12.6538C4.04967 13.0176 4.64434 13.3904 5.45902 13.7241C7.08359 14.3897 9.39537 14.824 11.9991 14.824C14.6029 14.824 16.9147 14.3897 18.5392 13.7241C19.3539 13.3904 19.9486 13.0176 20.3242 12.6538C20.6717 12.3172 20.7801 12.0433 20.7932 11.841C20.7925 11.803 20.7916 11.765 20.7904 11.7271C20.7514 11.3846 20.4258 10.8453 19.368 10.2642C18.2931 9.67368 16.7109 9.19262 14.8063 8.94754L15.0556 7.00737C16.9767 7.25457 18.7046 7.73454 20.0273 8.40145C18.6521 5.33781 15.5748 3.2041 11.9991 3.2041Z',
};

export const IconSphereStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-stroke-rounded IconSphereStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSphereDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-duotone-rounded IconSphereDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
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
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSphereTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-twotone-rounded IconSphereTwotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)"></circle>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSphereSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-solid-rounded IconSphereSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconSphereBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-bulk-rounded IconSphereBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const IconSphereStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-stroke-sharp IconSphereStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round"></circle>
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconSphereSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="sphere-solid-sharp IconSphereSolidSharp"
    >
      <path 
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

export const iconPackOfSphere: TheIconSelfPack = {
  name: 'Sphere',
  StrokeRounded: IconSphereStrokeRounded,
  DuotoneRounded: IconSphereDuotoneRounded,
  TwotoneRounded: IconSphereTwotoneRounded,
  SolidRounded: IconSphereSolidRounded,
  BulkRounded: IconSphereBulkRounded,
  StrokeSharp: IconSphereStrokeSharp,
  SolidSharp: IconSphereSolidSharp,
};