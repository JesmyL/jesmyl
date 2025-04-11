import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M18.952 8.60657L21.4622 8.45376C19.6629 3.70477 14.497 0.999914 9.4604 2.34474C4.09599 3.77711 0.909631 9.26107 2.34347 14.5935C3.77731 19.926 9.28839 23.0876 14.6528 21.6553C18.6358 20.5917 21.4181 17.2946 22 13.4844',
  d2: 'M12 8V12L14 14',
  d3: 'M9.77028 3.50853C5.04504 4.77023 2.24723 9.59639 3.50682 14.2808C4.76677 18.9666 9.61388 21.7536 14.3404 20.4915C17.8469 19.5552 20.2948 16.6541 20.8065 13.3031C20.888 12.7696 21.3866 12.4031 21.9201 12.4846C22.4537 12.5661 22.8201 13.0647 22.7387 13.5982C22.1131 17.6944 19.1229 21.2375 14.8446 22.3799C9.08626 23.9174 3.16187 20.525 1.61935 14.7883C0.0764713 9.05039 3.50646 3.15805 9.26606 1.62017C14.6734 0.176346 20.2251 3.07901 22.1609 8.1882C22.2709 8.47867 22.2363 8.80416 22.0677 9.06502C21.899 9.32587 21.6164 9.49102 21.3064 9.50989L18.8533 9.65923C18.3146 9.69203 17.8513 9.28189 17.8185 8.74316C17.8062 8.54137 17.8185 8.32125 17.9515 8.1882L18.9587 7.18099C19.132 7.00772 19.1553 6.7333 19.0027 6.54158C16.8809 3.87593 13.2915 2.56832 9.77028 3.50853Z',
  d4: 'M12 7C12.5523 7 13 7.44772 13 8V11.5858L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z',
  d5: 'M18.5 8.45376L21.4622 8.45376C19.6629 3.70477 14.497 0.999914 9.4604 2.34474C4.09599 3.77711 0.909631 9.26107 2.34347 14.5935C3.77731 19.926 9.28839 23.0876 14.6528 21.6553C18.6358 20.5917 21.4181 17.2946 22 13.4844',
  d6: 'M12 7V12L14.5 14.5',
  d7: 'M22.1719 8.1882C20.2351 3.07901 14.6806 0.176346 9.27042 1.62017C3.50783 3.15805 0.0760683 9.05039 1.61974 14.7883C3.16307 20.525 9.09052 23.9174 14.8518 22.3799C19.1324 21.2375 22.1241 17.6944 22.75 13.5982L20.8169 13.3031C20.3048 16.6541 17.8557 19.5553 14.3474 20.4915C9.61841 21.7536 4.7688 18.9666 3.5082 14.2808C2.24795 9.59639 5.0472 4.77023 9.77489 3.50853C13.7202 2.45562 17.7512 4.22172 19.7096 7.55718L18.3613 7.55718V9.5117L21.2576 9.5117C21.5788 9.5117 21.8796 9.35395 22.0621 9.08972C22.2447 8.82548 22.2857 8.48848 22.1719 8.1882Z',
  d8: 'M11 7H13V11.5858L15.2071 13.7929L13.7929 15.2071L11 12.4142V7Z',
};

export const IconClock03StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconClock03DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconClock03TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconClock03SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 SolidRounded"
    >
      <path 
        d={d.d3}
        i-c="f"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconClock03BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconClock03StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 StrokeSharp"
    >
      <path 
        d={d.d5}
        i-c="s sj sw"
      />
      <path 
        d={d.d6}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconClock03SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Clock03 SolidSharp"
    >
      <path 
        d={d.d7}
        i-c="c f fr"
      />
      <path 
        d={d.d8}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfClock03: TheIconSelfPack = [
  'Clock03',
  IconClock03StrokeRounded,
  IconClock03DuotoneRounded,
  IconClock03TwotoneRounded,
  IconClock03SolidRounded,
  IconClock03BulkRounded,
  IconClock03StrokeSharp,
  IconClock03SolidSharp,
];