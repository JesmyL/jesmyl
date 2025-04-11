import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 21.001H9',
  d2: 'M12 3.00001V21.0008M12 3.00001C13.3874 3.00001 15.1695 3.03055 16.5884 3.17649C17.1885 3.2382 17.4886 3.26906 17.7541 3.37791C18.3066 3.60429 18.7518 4.10063 18.9194 4.67681C19 4.95382 19 5.26992 19 5.90215M12 3.00001C10.6126 3.00001 8.83047 3.03055 7.41161 3.17649C6.8115 3.2382 6.51144 3.26906 6.24586 3.37791C5.69344 3.60429 5.24816 4.10063 5.08057 4.67681C5 4.95382 5 5.26992 5 5.90215',
  d3: 'M15.3516 21H9.35156',
  d4: 'M12.3516 2.99902V20.9998M12.3516 2.99902C13.739 2.99902 15.5211 3.02956 16.94 3.1755C17.5401 3.23721 17.8402 3.26807 18.1057 3.37692C18.6582 3.6033 19.1034 4.09964 19.271 4.67582C19.3516 4.95283 19.3516 5.26893 19.3516 5.90116M12.3516 2.99902C10.9642 2.99902 9.18203 3.02956 7.76317 3.1755C7.16306 3.23721 6.863 3.26807 6.59742 3.37692C6.045 3.6033 5.59972 4.09964 5.43213 4.67582C5.35156 4.95283 5.35156 5.26893 5.35156 5.90116',
  d5: 'M15 21H9',
  d6: 'M12.043 3V20.9826',
  d7: 'M19 6.01551C19 5.38805 19 5.07433 18.9194 4.79941C18.7518 4.22758 18.3066 3.73499 17.7541 3.51031C17.4886 3.40229 17.1885 3.37167 16.5884 3.31042C15.1695 3.16559 13.3874 3.01855 12 3.01855C10.6126 3.01855 8.83047 3.16559 7.41161 3.31042C6.8115 3.37167 6.51144 3.40229 6.24586 3.51031C5.69344 3.73499 5.24816 4.22758 5.08057 4.79941C5 5.07433 5 5.38805 5 6.01551',
  d8: 'M8 21C8 20.4477 8.44772 20 9 20H15C15.5523 20 16 20.4477 16 21C16 21.5523 15.5523 22 15 22H9C8.44772 22 8 21.5523 8 21Z',
  d9: 'M12 2C12.5523 2 13 2.44772 13 3V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V3C11 2.44772 11.4477 2 12 2Z',
  d10: 'M12.0002 4C10.6665 4 8.92654 4.14259 7.51342 4.28698C6.85381 4.35437 6.72459 4.37712 6.62309 4.41844C6.35311 4.52836 6.12235 4.78389 6.04045 5.06365C6.00991 5.16796 6.00016 5.30827 6.00016 6C6.00016 6.55228 5.55245 7 5.00016 7C4.44788 7 4.00016 6.55228 4.00016 6L4.00008 5.89007C3.99949 5.37184 3.99897 4.91856 4.12102 4.50169C4.37429 3.63663 5.03411 2.90596 5.86895 2.56607C6.27109 2.40235 6.70933 2.35808 7.20703 2.30779L7.31013 2.29733C8.73474 2.15178 10.5591 2 12.0002 2C13.4412 2 15.2656 2.15178 16.6902 2.29733L16.7933 2.30779C17.291 2.35808 17.7292 2.40235 18.1314 2.56607C18.9662 2.90596 19.626 3.63663 19.8793 4.50169C20.0014 4.91856 20.0008 5.37184 20.0002 5.89007L20.0002 6C20.0002 6.55228 19.5524 7 19.0002 7C18.4479 7 18.0002 6.55228 18.0002 6C18.0002 5.30827 17.9904 5.16796 17.9599 5.06365C17.878 4.78389 17.6472 4.52836 17.3772 4.41844C17.2757 4.37712 17.1465 4.35437 16.4869 4.28698C15.0738 4.14259 13.3339 4 12.0002 4Z',
  d11: 'M18.9998 5.99998V3H4.99805L4.99981 5.99998',
  d12: 'M12.0273 3.70508V20.999',
  d13: 'M9 20H15V22H9V20Z',
  d14: 'M11 21V3H13V21H11Z',
  d15: 'M4.29073 2.2931C4.47829 2.10544 4.73273 2 4.99805 2L18.9998 2C19.5521 2 19.9998 2.44772 19.9998 3V5.99998H17.9998V4L5.99864 4L5.99981 5.99939L3.99981 6.00057L3.99805 3.00059C3.99789 2.73527 4.10318 2.48077 4.29073 2.2931Z',
};

export const IconTextStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text DuotoneRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d4}
        i-c="s sr sw"
      />
      </g>
    </TheIconWrapper>
  );
};

export const IconTextTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text TwotoneRounded"
    >
      <path 
        d={d.d5}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d6}
        i-c="o7 s sr sw"
      />
      <path 
        d={d.d7}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text SolidRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTextBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text BulkRounded"
    >
      <path 
        d={d.d8}
        i-c="c f fr"
      />
      <path 
        d={d.d9}
        i-c="c f fr o7"
      />
      <path 
        d={d.d10}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconTextStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
      <path 
        d={d.d11}
        i-c="s sj sw"
      />
      <path 
        d={d.d12}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconTextSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Text SolidSharp"
    >
      <path 
        d={d.d13}
        i-c="c f fr"
      />
      <path 
        d={d.d14}
        i-c="c f fr"
      />
      <path 
        d={d.d15}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfText: TheIconSelfPack = [
  'Text',
  IconTextStrokeRounded,
  IconTextDuotoneRounded,
  IconTextTwotoneRounded,
  IconTextSolidRounded,
  IconTextBulkRounded,
  IconTextStrokeSharp,
  IconTextSolidSharp,
];