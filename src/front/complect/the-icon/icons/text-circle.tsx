import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M10.3175 16.9775H11.9657M11.9657 16.9775H13.6301M11.9657 16.9775V7.4986M7.00486 9.21775C6.86716 8.16066 7.14307 7.69382 8.11503 7.43245C10.6056 6.76269 13.3077 6.87472 15.8115 7.49286C16.7545 7.72567 17.0765 8.14056 16.9427 9.21775',
  d2: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  d3: 'M12.3516 22C17.8744 22 22.3516 17.5228 22.3516 12C22.3516 6.47715 17.8744 2 12.3516 2C6.82871 2 2.35156 6.47715 2.35156 12C2.35156 17.5228 6.82871 22 12.3516 22Z',
  d4: 'M10.6974 17H12.3456M12.3456 17H14.01M12.3456 17V7.52106M7.38474 9.24021C7.24704 8.18312 7.52295 7.71628 8.49491 7.45491C10.9855 6.78515 13.6876 6.89718 16.1914 7.51532C17.1344 7.74813 17.4564 8.16302 17.3226 9.24021',
  d5: 'M10.3458 17H11.994M11.994 17H13.6584M11.994 17V7.52106M7.03318 9.24021C6.89548 8.18312 7.17139 7.71628 8.14335 7.45491C10.6339 6.78515 13.336 6.89718 15.8398 7.51532C16.7828 7.74814 17.1048 8.16302 16.971 9.24021',
  d6: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.6219 7.81117C9.90948 7.87477 9.21378 7.98712 8.53904 8.14428C8.25817 8.20969 8.10468 8.24647 7.99185 8.28604C7.80663 8.33922 7.76317 8.50948 7.76459 8.58796C7.75087 8.72447 7.75 8.90654 7.75 9.22222C7.75 9.63644 7.41422 9.97222 7 9.97222C6.58579 9.97222 6.25 9.63644 6.25 9.22222L6.25 9.19204C6.24997 8.91704 6.24995 8.65853 6.2721 8.43802C6.29686 8.19151 6.35299 7.93992 6.49574 7.69044C6.5853 7.53391 6.71237 7.37385 6.8445 7.25112C7.21145 6.91027 7.66773 6.80546 8.10314 6.70545C9.31826 6.42244 10.6879 6.25 12 6.25C13.3121 6.25 14.6817 6.42244 15.8969 6.70545C16.3323 6.80546 16.7886 6.91027 17.1555 7.25112C17.2876 7.37385 17.4147 7.53391 17.5043 7.69044C17.647 7.93992 17.7031 8.19151 17.7279 8.43802C17.7501 8.65852 17.75 8.91707 17.75 9.19205L17.75 9.22222C17.75 9.63644 17.4142 9.97222 17 9.97222C16.5858 9.97222 16.25 9.63644 16.25 9.22222C16.25 8.90654 16.2491 8.72447 16.2354 8.58796C16.2356 8.50916 16.1903 8.33845 16.0082 8.28604C15.8953 8.24647 15.7418 8.20969 15.461 8.14428C14.7862 7.98712 14.0905 7.87477 13.3781 7.81117C13.0894 7.78539 12.945 7.77251 12.8475 7.86171C12.75 7.95091 12.75 8.09982 12.75 8.39765V15.65C12.75 15.9328 12.75 16.0743 12.8379 16.1621C12.9257 16.25 13.0672 16.25 13.35 16.25H13.6667C14.0809 16.25 14.4167 16.5858 14.4167 17C14.4167 17.4142 14.0809 17.75 13.6667 17.75H10.3333C9.91912 17.75 9.58334 17.4142 9.58334 17C9.58334 16.5858 9.91912 16.25 10.3333 16.25H10.65C10.9328 16.25 11.0743 16.25 11.1621 16.1621C11.25 16.0743 11.25 15.9328 11.25 15.65V8.39765C11.25 8.09982 11.25 7.95091 11.1525 7.86171C11.055 7.77251 10.9106 7.78539 10.6219 7.81117Z',
  d7: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z',
  d8: 'M8.53904 8.14428C9.21378 7.98712 9.90948 7.87477 10.6219 7.81117C10.9106 7.78539 11.055 7.77251 11.1525 7.86171C11.25 7.95091 11.25 8.09982 11.25 8.39765V15.65C11.25 15.9328 11.25 16.0743 11.1621 16.1621C11.0743 16.25 10.9328 16.25 10.65 16.25H10.3333C9.91912 16.25 9.58334 16.5858 9.58334 17C9.58334 17.4142 9.91912 17.75 10.3333 17.75H13.6667C14.0809 17.75 14.4167 17.4142 14.4167 17C14.4167 16.5858 14.0809 16.25 13.6667 16.25H13.35C13.0672 16.25 12.9257 16.25 12.8379 16.1621C12.75 16.0743 12.75 15.9328 12.75 15.65V8.39765C12.75 8.09982 12.75 7.95091 12.8475 7.86171C12.945 7.77251 13.0894 7.78539 13.3781 7.81117C14.0905 7.87477 14.7862 7.98712 15.461 8.14428C15.7418 8.20969 15.8953 8.24647 16.0082 8.28604C16.1903 8.33845 16.2356 8.50916 16.2354 8.58796C16.2491 8.72447 16.25 8.90654 16.25 9.22222C16.25 9.63644 16.5858 9.97222 17 9.97222C17.4142 9.97222 17.75 9.63644 17.75 9.22222L17.75 9.19205C17.75 8.91707 17.7501 8.65852 17.7279 8.43802C17.7031 8.19151 17.647 7.93992 17.5043 7.69044C17.4147 7.53391 17.2876 7.37385 17.1555 7.25112C16.7886 6.91027 16.3323 6.80546 15.8969 6.70545C14.6817 6.42244 13.3121 6.25 12 6.25C10.6879 6.25 9.31826 6.42244 8.10314 6.70545C7.66773 6.80546 7.21145 6.91027 6.8445 7.25112C6.71237 7.37385 6.5853 7.53391 6.49574 7.69044C6.35299 7.93992 6.29687 8.19151 6.2721 8.43802C6.24995 8.65853 6.24997 8.91704 6.25 9.19204L6.25 9.22222C6.25 9.63644 6.58579 9.97222 7 9.97222C7.41422 9.97222 7.75 9.63644 7.75 9.22222C7.75 8.90654 7.75087 8.72447 7.76459 8.58796C7.76317 8.50948 7.80663 8.33922 7.99184 8.28604C8.10468 8.24647 8.25818 8.20969 8.53904 8.14428Z',
  d9: 'M13.9371 18.0992H10.0667M17.0171 10.0088V8.03027H6.99609L6.99735 10.0088M12.0066 8.03027L12.0193 18.0987',
  d10: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7 7.25C6.58579 7.25 6.25 7.58579 6.25 8V10H7.75V8.75H11.2505V17.25H10V18.75H14V17.25H12.7505V8.75H16.2505V10H17.7505V8C17.7505 7.58579 17.4147 7.25 17.0005 7.25H7Z',
};

export const IconTextCircleStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-stroke-rounded IconTextCircleStrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconTextCircleDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-duotone-rounded IconTextCircleDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextCircleTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-twotone-rounded IconTextCircleTwotoneRounded"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconTextCircleSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-solid-rounded IconTextCircleSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTextCircleBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-bulk-rounded IconTextCircleBulkRounded"
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

export const IconTextCircleStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-stroke-sharp IconTextCircleStrokeSharp"
    >
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTextCircleSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="text-circle-solid-sharp IconTextCircleSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTextCircle: TheIconSelfPack = {
  name: 'TextCircle',
  StrokeRounded: IconTextCircleStrokeRounded,
  DuotoneRounded: IconTextCircleDuotoneRounded,
  TwotoneRounded: IconTextCircleTwotoneRounded,
  SolidRounded: IconTextCircleSolidRounded,
  BulkRounded: IconTextCircleBulkRounded,
  StrokeSharp: IconTextCircleStrokeSharp,
  SolidSharp: IconTextCircleSolidSharp,
};