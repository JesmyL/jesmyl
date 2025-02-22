import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M6.24997 10.4999C8.59718 10.4999 10.5 8.59709 10.5 6.24988C10.5 3.90267 8.59718 1.99988 6.24997 1.99988C3.90276 1.99988 1.99997 3.90267 1.99997 6.24988C1.99997 8.59709 3.90276 10.4999 6.24997 10.4999Z',
  d2: 'M17.75 21.9999C20.0972 21.9999 22 20.0971 22 17.7499C22 15.4027 20.0972 13.4999 17.75 13.4999C15.4028 13.4999 13.5 15.4027 13.5 17.7499C13.5 20.0971 15.4028 21.9999 17.75 21.9999Z',
  d3: 'M6.24997 21.9999C8.59718 21.9999 10.5 20.0971 10.5 17.7499C10.5 15.4027 8.59718 13.4999 6.24997 13.4999C3.90276 13.4999 1.99997 15.4027 1.99997 17.7499C1.99997 20.0971 3.90276 21.9999 6.24997 21.9999Z',
  d4: 'M20.8683 2.43897L21.5607 3.13134C22.1465 3.71712 22.1465 4.66687 21.5607 5.25266L17.9333 8.94832C17.6479 9.23367 17.2829 9.42603 16.8863 9.50012L14.6381 9.98817C14.2832 10.0652 13.9671 9.75005 14.0431 9.39488L14.5216 7.15956C14.5957 6.76287 14.7881 6.39787 15.0734 6.11252L18.747 2.43897C19.3328 1.85319 20.2825 1.85319 20.8683 2.43897Z',
  d5: 'M6.25 10.168C8.59721 10.168 10.5 8.26518 10.5 5.91797C10.5 3.57076 8.59721 1.66797 6.25 1.66797C3.90279 1.66797 2 3.57076 2 5.91797C2 8.26518 3.90279 10.168 6.25 10.168Z',
  d6: 'M17.75 21.668C20.0972 21.668 22 19.7652 22 17.418C22 15.0708 20.0972 13.168 17.75 13.168C15.4028 13.168 13.5 15.0708 13.5 17.418C13.5 19.7652 15.4028 21.668 17.75 21.668Z',
  d7: 'M6.25 21.668C8.59721 21.668 10.5 19.7652 10.5 17.418C10.5 15.0708 8.59721 13.168 6.25 13.168C3.90279 13.168 2 15.0708 2 17.418C2 19.7652 3.90279 21.668 6.25 21.668Z',
  d8: 'M20.8679 2.10731L21.5602 2.79968C22.146 3.38546 22.146 4.33521 21.5602 4.92099L17.9328 8.61666C17.6475 8.90201 17.2825 9.09437 16.8858 9.16845L14.6377 9.65646C14.2827 9.73356 13.9666 9.41839 14.0427 9.06322L14.5212 6.82789C14.5953 6.43121 14.7876 6.06621 15.073 5.78086L18.7466 2.10731C19.3323 1.52152 20.2821 1.52152 20.8679 2.10731Z',
  d9: 'M6.25 10.5C8.59721 10.5 10.5 8.59721 10.5 6.25C10.5 3.90279 8.59721 2 6.25 2C3.90279 2 2 3.90279 2 6.25C2 8.59721 3.90279 10.5 6.25 10.5Z',
  d10: 'M17.75 22C20.0972 22 22 20.0972 22 17.75C22 15.4028 20.0972 13.5 17.75 13.5C15.4028 13.5 13.5 15.4028 13.5 17.75C13.5 20.0972 15.4028 22 17.75 22Z',
  d11: 'M6.25 22C8.59721 22 10.5 20.0972 10.5 17.75C10.5 15.4028 8.59721 13.5 6.25 13.5C3.90279 13.5 2 15.4028 2 17.75C2 20.0972 3.90279 22 6.25 22Z',
  d12: 'M20.8679 2.43934L21.5602 3.13171C22.146 3.71749 22.146 4.66724 21.5602 5.25302L17.9328 8.94869C17.6475 9.23404 17.2825 9.4264 16.8858 9.50048L14.6376 9.98853C14.2827 10.0656 13.9666 9.75042 14.0427 9.39525L14.5212 7.15992C14.5953 6.76324 14.7876 6.39824 15.073 6.11289L18.7465 2.43934C19.3323 1.85355 20.2821 1.85355 20.8679 2.43934Z',
  d13: 'M18.344 2.03825C19.0096 1.65396 19.8297 1.65396 20.4953 2.03825C20.7431 2.18133 20.9651 2.40375 21.2238 2.66303L21.2804 2.71972L21.3371 2.77632L21.3371 2.77634C21.5964 3.03508 21.8188 3.25704 21.9619 3.50485C22.3462 4.17046 22.3462 4.99052 21.9619 5.65613C21.8188 5.90395 21.5964 6.12591 21.3371 6.38465L21.3371 6.38466L21.2804 6.44127L18.1467 9.57503C17.7058 10.0159 17.1735 10.2219 16.6953 10.3439C16.4565 10.4049 16.2166 10.4484 15.999 10.4859L15.8844 10.5056L15.8844 10.5056C15.7054 10.5363 15.5441 10.5639 15.386 10.5977L15.3439 10.6067L15.3439 10.6067C15.054 10.6688 14.764 10.7309 14.524 10.7461C14.2598 10.7629 13.8766 10.737 13.5698 10.4303C13.2631 10.1236 13.2372 9.74038 13.254 9.4761C13.2693 9.23617 13.3314 8.94612 13.3935 8.65623L13.4024 8.6142C13.4363 8.45607 13.4639 8.2947 13.4945 8.11575L13.5142 8.00113C13.5518 7.78352 13.5952 7.54366 13.6562 7.30488C13.7783 6.82667 13.9843 6.29431 14.4251 5.85348L17.5589 2.71972L17.6155 2.66304C17.8742 2.40375 18.0962 2.18133 18.344 2.03825Z',
  d14: 'M1.25012 6.00003C1.25012 3.37668 3.37677 1.25003 6.00012 1.25003C8.62347 1.25003 10.7501 3.37668 10.7501 6.00003C10.7501 8.62338 8.62347 10.75 6.00012 10.75C3.37677 10.75 1.25012 8.62338 1.25012 6.00003Z',
  d15: 'M1.25012 18C1.25012 15.3767 3.37677 13.25 6.00012 13.25C8.62347 13.25 10.7501 15.3767 10.7501 18C10.7501 20.6234 8.62347 22.75 6.00012 22.75C3.37677 22.75 1.25012 20.6234 1.25012 18Z',
  d16: 'M13.2501 18C13.2501 15.3767 15.3768 13.25 18.0001 13.25C20.6235 13.25 22.7501 15.3767 22.7501 18C22.7501 20.6234 20.6235 22.75 18.0001 22.75C15.3768 22.75 13.2501 20.6234 13.2501 18Z',
  d17: 'M19.4834 2.04571L14.0322 7.46532V9.98297H16.5886L21.939 4.584C21.9773 4.54537 21.9777 4.48285 21.9399 4.44374L19.6236 2.04712C19.5854 2.00752 19.5225 2.00688 19.4834 2.04571Z',
  d18: 'M1.25 6.25C1.25 3.48858 3.48858 1.25 6.25 1.25C9.01142 1.25 11.25 3.48858 11.25 6.25C11.25 9.01142 9.01142 11.25 6.25 11.25C3.48858 11.25 1.25 9.01142 1.25 6.25Z',
  d19: 'M12.75 17.75C12.75 14.9886 14.9886 12.75 17.75 12.75C20.5114 12.75 22.75 14.9886 22.75 17.75C22.75 20.5114 20.5114 22.75 17.75 22.75C14.9886 22.75 12.75 20.5114 12.75 17.75Z',
  d20: 'M1.25 17.75C1.25 14.9886 3.48858 12.75 6.25 12.75C9.01142 12.75 11.25 14.9886 11.25 17.75C11.25 20.5114 9.01142 22.75 6.25 22.75C3.48858 22.75 1.25 20.5114 1.25 17.75Z',
  d21: 'M18.9697 1.46967C19.2626 1.17678 19.7374 1.17678 20.0303 1.46967L22.5303 3.96967C22.8232 4.26256 22.8232 4.73744 22.5303 5.03033L16.8107 10.75H13.25V7.18934L18.9697 1.46967Z',
};

export const IconDashboardCircleEditStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-stroke-rounded IconDashboardCircleEditStrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconDashboardCircleEditDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-duotone-rounded IconDashboardCircleEditDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleEditTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-twotone-rounded IconDashboardCircleEditTwotoneRounded"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleEditSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-solid-rounded IconDashboardCircleEditSolidRounded"
    >
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

export const IconDashboardCircleEditBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-bulk-rounded IconDashboardCircleEditBulkRounded"
    >
      <path 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
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
        opacity="var(--icon-opacity)" 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleEditStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-stroke-sharp IconDashboardCircleEditStrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconDashboardCircleEditSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="dashboard-circle-edit-solid-sharp IconDashboardCircleEditSolidSharp"
    >
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfDashboardCircleEdit: TheIconSelfPack = {
  name: 'DashboardCircleEdit',
  StrokeRounded: IconDashboardCircleEditStrokeRounded,
  DuotoneRounded: IconDashboardCircleEditDuotoneRounded,
  TwotoneRounded: IconDashboardCircleEditTwotoneRounded,
  SolidRounded: IconDashboardCircleEditSolidRounded,
  BulkRounded: IconDashboardCircleEditBulkRounded,
  StrokeSharp: IconDashboardCircleEditStrokeSharp,
  SolidSharp: IconDashboardCircleEditSolidSharp,
};