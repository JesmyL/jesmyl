import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 2L18.5 5.5M18.5 5.5L22 9M18.5 5.5L22 2M18.5 5.5L15 9',
  d2: 'M6.09881 19.5C4.7987 19.3721 3.82475 18.9816 3.17157 18.3284C2 17.1569 2 15.2712 2 11.5V11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H11.5M6.5 18C6.29454 19.0019 5.37769 21.1665 6.31569 21.8651C6.806 22.2218 7.58729 21.8408 9.14987 21.0789C10.2465 20.5441 11.3562 19.9309 12.5546 19.655C12.9931 19.5551 13.4395 19.5125 14 19.5C17.7712 19.5 19.6569 19.5 20.8284 18.3284C21.947 17.2098 21.9976 15.4403 21.9999 12',
  d3: 'M14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2 5.34315 2 7.22876 2 11V11.5C2 15.2712 2 17.1569 3.17157 18.3284C3.82475 18.9816 4.7987 19.3721 6.09881 19.5C5.86573 20.4342 5.7338 21.4317 6.31569 21.8651C6.806 22.2218 7.58729 21.8408 9.14987 21.0789C10.2465 20.5441 11.3562 19.9309 12.5546 19.655C12.9931 19.5551 13.4395 19.5125 14 19.5C17.7712 19.5 19.6569 19.5 20.8284 18.3284C22 17.1569 22 15.2712 22 11.5V11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3Z',
  d4: 'M14.1679 1.41789C14.5584 1.02737 15.1916 1.02737 15.5821 1.41789L18.375 4.21079L21.1679 1.41789C21.5584 1.02737 22.1916 1.02737 22.5821 1.41789C22.9726 1.80842 22.9726 2.44158 22.5821 2.83211L19.7892 5.625L22.5821 8.41789C22.9726 8.80842 22.9726 9.44158 22.5821 9.83211C22.1916 10.2226 21.5584 10.2226 21.1679 9.83211L18.375 7.03921L15.5821 9.83211C15.1916 10.2226 14.5584 10.2226 14.1679 9.83211C13.7774 9.44158 13.7774 8.80842 14.1679 8.41789L16.9608 5.625L14.1679 2.83211C13.7774 2.44158 13.7774 1.80842 14.1679 1.41789Z',
  d5: 'M12.4993 2.90531C12.4085 2.62788 12.363 2.48917 12.2842 2.43208C12.2055 2.375 12.0851 2.375 11.8444 2.375H9.725C5.67092 2.375 3.64388 2.375 2.38444 3.63907C1.125 4.90313 1.125 6.93761 1.125 11.0066V11.5461C1.125 15.615 1.125 17.6495 2.38444 18.9136C2.96538 19.4966 3.78236 19.8857 4.83865 20.0808C5.16308 20.1408 5.32529 20.1707 5.39574 20.2724C5.4662 20.3742 5.43726 20.5362 5.3794 20.8601C5.23931 21.6444 5.26144 22.3535 5.76437 22.7295C6.29145 23.1143 7.13133 22.7032 8.81111 21.8812C8.99744 21.79 9.18412 21.6967 9.37148 21.603L9.3735 21.602C10.3708 21.1035 11.3874 20.5953 12.4712 20.3449C12.9426 20.2371 13.4225 20.1911 14.025 20.1776C18.0791 20.1776 20.1061 20.1776 21.3656 18.9136C22.5377 17.7371 22.6189 15.8625 22.6246 12.3282C22.6251 11.9851 22.6254 11.8136 22.5398 11.726C22.4542 11.6383 22.2427 11.6337 21.8197 11.6244C21.1985 11.6107 20.5813 11.3669 20.1072 10.8928L18.7993 9.5848C18.5993 9.3848 18.4993 9.2848 18.375 9.2848C18.2507 9.2848 18.1507 9.3848 17.9507 9.5848L16.6428 10.8928C15.6665 11.8691 14.0835 11.8691 13.1072 10.8928C12.1309 9.91646 12.1309 8.33354 13.1072 7.35723L14.4152 6.04926C14.6152 5.84926 14.7152 5.74926 14.7152 5.625C14.7152 5.50074 14.6152 5.40074 14.4152 5.20074L13.1072 3.89277C12.8202 3.60576 12.6176 3.26633 12.4993 2.90531Z',
  d6: 'M15.9995 2L18.9995 5M18.9995 5L21.9995 8M18.9995 5L21.9995 2M18.9995 5L15.9995 8',
  d7: 'M11.9886 2.00049H2.00049V17.9587H6.00255V21.9895C6.00255 21.9979 6.0123 22.0026 6.01885 21.9973L11.014 17.9587H21.9988V11.9677',
  d8: 'M17.6288 4.95711L15.3359 2.66421L16.7502 1.25L19.043 3.54289L21.3359 1.25L22.7502 2.66421L20.4573 4.95711L22.7502 7.25L21.3359 8.66421L19.043 6.37132L16.7502 8.66421L15.3359 7.25L17.6288 4.95711Z',
  d9: 'M14.9825 1.25L1.25 1.25V18.75H5.25V22.75L11.2631 18.75L22.75 18.75V9.01805L21.3361 10.4319L19.0432 8.13903L16.7503 10.4319L13.5684 7.24994L15.8613 4.95705L13.5684 2.66416L14.9825 1.25Z',
};

export const IconCommentRemove02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-stroke-rounded IconCommentRemove02StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconCommentRemove02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-duotone-rounded IconCommentRemove02DuotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCommentRemove02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-twotone-rounded IconCommentRemove02TwotoneRounded"
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
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCommentRemove02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-solid-rounded IconCommentRemove02SolidRounded"
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

export const IconCommentRemove02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-bulk-rounded IconCommentRemove02BulkRounded"
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

export const IconCommentRemove02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-stroke-sharp IconCommentRemove02StrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconCommentRemove02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="comment-remove-02-solid-sharp IconCommentRemove02SolidSharp"
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

export const iconPackOfCommentRemove02: TheIconSelfPack = {
  name: 'CommentRemove02',
  StrokeRounded: IconCommentRemove02StrokeRounded,
  DuotoneRounded: IconCommentRemove02DuotoneRounded,
  TwotoneRounded: IconCommentRemove02TwotoneRounded,
  SolidRounded: IconCommentRemove02SolidRounded,
  BulkRounded: IconCommentRemove02BulkRounded,
  StrokeSharp: IconCommentRemove02StrokeSharp,
  SolidSharp: IconCommentRemove02SolidSharp,
};