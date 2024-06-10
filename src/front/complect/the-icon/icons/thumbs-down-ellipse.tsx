import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
  d2: 'M13.1525 15.2136L12.975 14.6571C12.8295 14.201 12.7567 13.973 12.8127 13.793C12.8579 13.6473 12.9573 13.5217 13.0927 13.4391C13.26 13.3369 13.5131 13.3369 14.0194 13.3369H14.2887C16.0021 13.3369 16.8588 13.3369 17.2634 12.8447C17.3097 12.7884 17.3508 12.7286 17.3864 12.6659C17.6977 12.1168 17.3438 11.3773 16.636 9.89811C15.9865 8.54072 15.6617 7.86203 15.0587 7.46255C15.0003 7.42387 14.9403 7.3874 14.8789 7.3532C14.244 7 13.4574 7 11.8843 7H11.5431C9.63715 7 8.68419 7 8.09209 7.55681C7.5 8.11363 7.5 9.00981 7.5 10.8022V11.4321C7.5 12.3741 7.5 12.845 7.67223 13.2761C7.84445 13.7071 8.17424 14.0616 8.8338 14.7705L11.5614 17.702C11.6298 17.7755 11.664 17.8123 11.6942 17.8378C11.9757 18.0755 12.4102 18.0488 12.6563 17.7785C12.6826 17.7495 12.7115 17.7089 12.7691 17.6276C12.8592 17.5004 12.9043 17.4369 12.9436 17.3739C13.2952 16.81 13.4016 16.1401 13.2405 15.5042C13.2225 15.4332 13.1992 15.3599 13.1525 15.2136Z',
  d3: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.975 14.6571L13.1525 15.2136C13.1992 15.3599 13.2225 15.4332 13.2405 15.5042C13.4016 16.1401 13.2952 16.81 12.9436 17.3739C12.9043 17.4369 12.8592 17.5004 12.7691 17.6276C12.7115 17.7089 12.6826 17.7495 12.6563 17.7785C12.4102 18.0488 11.9757 18.0755 11.6942 17.8378C11.664 17.8123 11.6298 17.7755 11.5614 17.702L8.8338 14.7705C8.17423 14.0616 7.84445 13.7071 7.67223 13.2761C7.5 12.845 7.5 12.3741 7.5 11.4321V10.8022C7.5 9.00981 7.5 8.11363 8.09209 7.55681C8.68419 7 9.63714 7 11.5431 7H11.8843C13.4574 7 14.244 7 14.8789 7.3532C14.9403 7.3874 15.0003 7.42387 15.0587 7.46255C15.6617 7.86203 15.9865 8.54072 16.636 9.89811C17.3438 11.3773 17.6977 12.1168 17.3864 12.6659C17.3508 12.7286 17.3097 12.7884 17.2634 12.8447C16.8588 13.3369 16.0021 13.3369 14.2887 13.3369H14.0194C13.5132 13.3369 13.26 13.3369 13.0927 13.4391C12.9573 13.5217 12.8579 13.6473 12.8127 13.793C12.7567 13.973 12.8295 14.201 12.975 14.6571Z',
  d4: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM12.975 14.6571L13.1525 15.2136L13.1525 15.2137C13.1992 15.36 13.2225 15.4332 13.2405 15.5042C13.4016 16.1401 13.2952 16.81 12.9436 17.3739C12.9043 17.4369 12.8592 17.5004 12.7691 17.6276C12.7115 17.7089 12.6826 17.7495 12.6563 17.7785C12.4102 18.0488 11.9757 18.0755 11.6942 17.8378C11.664 17.8123 11.6298 17.7755 11.5614 17.702L11.5614 17.702L8.8338 14.7705C8.17423 14.0616 7.84445 13.7071 7.67223 13.2761C7.5 12.845 7.5 12.3741 7.5 11.4321V10.8022C7.5 9.00981 7.5 8.11363 8.09209 7.55681C8.68419 7 9.63714 7 11.5431 7H11.5431H11.8843C13.4574 7 14.244 7 14.8789 7.3532C14.9403 7.3874 15.0003 7.42387 15.0587 7.46255C15.6617 7.86203 15.9865 8.54072 16.636 9.89811C17.3438 11.3773 17.6977 12.1168 17.3864 12.6659C17.3508 12.7286 17.3097 12.7884 17.2634 12.8447C16.8588 13.3369 16.0021 13.3369 14.2887 13.3369H14.0194H14.0194C13.5131 13.3369 13.26 13.3369 13.0927 13.4391C12.9573 13.5217 12.8579 13.6473 12.8127 13.793C12.7567 13.973 12.8295 14.201 12.975 14.6571Z',
  d5: 'M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z',
  d6: 'M7.5 13.5L12 18L13.5 16L12.5 13.5H17.5L15.5 7H7.5V13.5Z',
  d7: 'M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75ZM12 18L7.5 13.5V7H15.5L17.5 13.5H12.5L13.5 16L12 18Z',
};

export const IconThumbsDownEllipseStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-stroke-rounded IconThumbsDownEllipseStrokeRounded"
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownEllipseDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-duotone-rounded IconThumbsDownEllipseDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d3} 
        fill="var(--icon-fill)" 
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

export const IconThumbsDownEllipseTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-twotone-rounded IconThumbsDownEllipseTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownEllipseSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-solid-rounded IconThumbsDownEllipseSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownEllipseBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-bulk-rounded IconThumbsDownEllipseBulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d2} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownEllipseStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-stroke-sharp IconThumbsDownEllipseStrokeSharp"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconThumbsDownEllipseSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="thumbs-down-ellipse-solid-sharp IconThumbsDownEllipseSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfThumbsDownEllipse: TheIconSelfPack = {
  name: 'ThumbsDownEllipse',
  StrokeRounded: IconThumbsDownEllipseStrokeRounded,
  DuotoneRounded: IconThumbsDownEllipseDuotoneRounded,
  TwotoneRounded: IconThumbsDownEllipseTwotoneRounded,
  SolidRounded: IconThumbsDownEllipseSolidRounded,
  BulkRounded: IconThumbsDownEllipseBulkRounded,
  StrokeSharp: IconThumbsDownEllipseStrokeSharp,
  SolidSharp: IconThumbsDownEllipseSolidSharp,
};