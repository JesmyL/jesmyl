import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M7.84051 13.4813V4.98823C7.84051 4.1585 8.50582 3.48586 9.32652 3.48586C10.1472 3.48586 10.8125 4.15828 10.8125 4.98802M10.8125 9.97422V3.50238C10.8125 2.67264 11.4778 2 12.2986 2C13.1193 2 13.7846 2.67264 13.7846 3.50238V11.0057M13.7846 5.47656C13.7846 4.64306 14.4836 3.9678 15.308 3.9678C16.1324 3.9678 16.8008 4.64348 16.8008 5.47699V11.9989M16.8008 7.51562C16.8008 6.69224 17.461 6.02157 18.2754 6.02157C19.0898 6.02157 19.75 6.68905 19.75 7.51243V16.1246C19.75 17.1574 19.3743 18.3101 18.2322 19.6845C17.9015 20.0825 17.6958 20.5766 17.6958 21.0964V22M7.84051 8.85627C7.00785 9.63725 4.99016 11.6991 4.43639 12.8432C3.88262 13.9873 4.7059 15.3388 5.05201 15.8682L7.84008 19.5755C8.10344 19.9257 8.24603 20.3535 8.24603 20.7935V22',
  d2: 'M19.75 7.5C19.75 6.67157 19.0784 6 18.25 6C17.4216 6 16.7498 6.67548 16.7498 7.50391V5.5C16.7498 4.67157 16.0782 4 15.2498 4C14.4214 4 13.75 4.67157 13.75 5.5L13.7498 3.5C13.7498 2.67157 13.0782 2 12.2498 2C11.4214 2 10.7498 2.67157 10.7498 3.5L10.75 5C10.7497 4.17187 10.0782 3.50064 9.25 3.50064C8.42157 3.50064 7.75 4.17221 7.75 5.00064L7.7499 9L6.2843 10.3747C5.07555 11.71 4.47118 12.3776 4.30904 13.1756C4.25813 13.4262 4.24003 13.6821 4.25519 13.9372C4.30345 14.7495 4.80807 15.4928 5.81729 16.9792L7.81252 19.4764C8.09573 19.8309 8.25 20.2711 8.25 20.7248V22H17.6804V21.0449C17.6804 20.4036 18.0081 19.8188 18.4416 19.3462C18.8842 18.8637 19.2322 18.2953 19.4583 17.668C19.75 16.8586 19.75 15.8506 19.75 13.8347V7.5Z',
  d3: 'M10.8125 9.97422V3.50238C10.8125 2.67264 11.4778 2 12.2986 2C13.1193 2 13.7846 2.67264 13.7846 3.50238V11.0057M13.7846 5.47656C13.7846 4.64306 14.4836 3.9678 15.308 3.9678C16.1324 3.9678 16.8008 4.64348 16.8008 5.47699V11.9989M16.8008 7.51562C16.8008 6.69224 17.461 6.02157 18.2754 6.02157C19.0898 6.02157 19.75 6.68905 19.75 7.51243V16.1246C19.75 17.1574 19.3743 18.3101 18.2322 19.6845C17.9015 20.0825 17.6958 20.5766 17.6958 21.0964V22',
  d4: 'M7.84051 13.4813V4.98821C7.84051 4.15848 8.50582 3.48584 9.32652 3.48584C10.1472 3.48584 10.8125 4.15826 10.8125 4.988M7.84051 8.85625C7.00785 9.63723 4.99016 11.6991 4.43639 12.8432C3.88262 13.9873 4.7059 15.3388 5.05201 15.8682L7.84008 19.5755C8.10344 19.9257 8.24603 20.3535 8.24603 20.7935V22',
  d5: 'M14.4491 10.883V4.54642C14.4491 3.83032 15.0296 3.24981 15.7457 3.24981C16.4618 3.24981 17.0423 3.83032 17.0423 4.54642V11.9999C17.0423 12.2312 17.2358 12.4187 17.4745 12.4187C17.7132 12.4187 17.9067 12.2312 17.9067 11.9999V6.57248C17.9067 5.85636 18.4873 5.27583 19.2034 5.27583C19.9195 5.27583 20.5 5.85636 20.5 6.57248V14.0117C20.5003 15.8576 20.5005 16.9879 20.1639 17.9221C19.9035 18.6447 19.5029 19.2985 18.9942 19.853C18.6291 20.251 18.4304 20.6628 18.4304 21.0447C18.4304 21.9864 17.667 22.7498 16.7253 22.7498L9.47222 22.7499C9.27199 22.7502 9.06349 22.7505 8.87474 22.7091C8.20791 22.5627 7.6871 22.0419 7.54071 21.3751C7.49927 21.1863 7.49967 20.9249 7.5 20.7246C7.5 20.4411 7.40358 20.1659 7.22657 19.9444L5.17578 17.3693C4.689 16.6524 4.29344 16.0698 4.01761 15.5646C3.73104 15.0398 3.53969 14.54 3.50651 13.9815C3.48749 13.6614 3.5102 13.3403 3.57406 13.026C3.68545 12.4778 3.94502 12.0093 4.30239 11.5288C4.64652 11.0661 5.12016 10.5429 5.70329 9.8988C6.09321 9.52543 6.28817 9.33874 6.45557 9.38892C6.47711 9.39538 6.49786 9.40424 6.51742 9.41533C6.66943 9.50153 6.66943 9.77146 6.66943 10.3113V13.6333C6.66943 13.8646 6.86293 14.0521 7.10163 14.0521C7.34033 14.0521 7.53383 13.8646 7.53384 13.6333L7.53403 4.04706C7.53404 3.33096 8.11456 2.75045 8.83066 2.75045C9.54678 2.75045 10.1273 3.33097 10.1273 4.04708V9.76614C10.1273 9.99745 10.3208 10.185 10.5595 10.185C10.7982 10.185 10.9917 9.99745 10.9917 9.76614V2.54649C10.9917 1.83046 11.5722 1.25 12.2882 1.25C13.0042 1.25 13.5847 1.83046 13.5847 2.54649V10.883C13.5847 11.1143 13.7782 11.3019 14.0169 11.3019C14.2556 11.3019 14.4491 11.1143 14.4491 10.883Z',
  d6: 'M5.61785 16.8522L5.00367 17.2826L5.02138 17.3079L5.04111 17.3316L5.61785 16.8522ZM8.12903 19.873H8.87903V19.602L8.70578 19.3936L8.12903 19.873ZM17.8636 19.873L17.319 19.3573L17.1136 19.5742V19.873H17.8636ZM5.04111 17.3316L7.55229 20.3524L8.70578 19.3936L6.19459 16.3728L5.04111 17.3316ZM6.23202 16.4217C5.7026 15.6664 5.33736 15.1438 5.09299 14.7102C4.85546 14.2887 4.76922 14.0134 4.75395 13.7643L3.25676 13.8561C3.29131 14.4194 3.49043 14.9218 3.78625 15.4467C4.07522 15.9594 4.49131 16.5516 5.00367 17.2826L6.23202 16.4217ZM4.75395 13.7643C4.74242 13.5763 4.75617 13.3876 4.79498 13.2025L3.32692 12.8946C3.26061 13.2107 3.237 13.5339 3.25676 13.8561L4.75395 13.7643ZM19.25 13.7077C19.25 14.725 19.2497 15.4538 19.2138 16.0302C19.1783 16.6006 19.1101 16.9726 18.996 17.2795L20.4018 17.8025C20.5888 17.3 20.6711 16.7633 20.7109 16.1234C20.7503 15.4895 20.75 14.7064 20.75 13.7077H19.25ZM8.36291 13.373V5.37305H6.86291V13.373H8.36291ZM9.16129 4.62305C9.62485 4.62305 9.95968 4.9811 9.95968 5.37305H11.4597C11.4597 4.10814 10.408 3.12305 9.16129 3.12305V4.62305ZM8.36291 5.37305C8.36291 4.9811 8.69773 4.62305 9.16129 4.62305V3.12305C7.91455 3.12305 6.86291 4.10814 6.86291 5.37305H8.36291ZM7.37903 19.873V21.873H8.87903V19.873H7.37903ZM18.996 17.2795C18.9718 17.3444 18.9013 17.4753 18.7636 17.6719C18.6333 17.8579 18.469 18.0664 18.2904 18.2794C17.9334 18.7051 17.5463 19.1173 17.319 19.3573L18.4082 20.3887C18.6379 20.1461 19.0517 19.706 19.4398 19.2432C19.6337 19.012 19.8279 18.7671 19.9923 18.5324C20.1492 18.3084 20.3093 18.0512 20.4018 17.8025L18.996 17.2795ZM17.1136 19.873V21.873H18.6136V19.873H17.1136ZM19.25 7.42144V13.7077H20.75V7.42144H19.25ZM4.79498 13.2025C4.92668 12.5746 5.37518 11.9408 6.0334 11.2765C6.35503 10.9519 6.70689 10.6392 7.06429 10.3297C7.41361 10.0271 7.78165 9.71656 8.09844 9.42426L7.08126 8.32184C6.7876 8.5928 6.45367 8.87421 6.08231 9.1958C5.71904 9.5104 5.33153 9.85381 4.9679 10.2207C4.25563 10.9395 3.55014 11.8303 3.32692 12.8946L4.79498 13.2025ZM9.95968 5.37305V10.873H11.4597V5.37305H9.95968ZM9.95968 3.42144V5.37305H11.4597V3.42144H9.95968ZM12.2581 1.12305C10.9887 1.12305 9.95968 2.15207 9.95968 3.42144H11.4597C11.4597 2.9805 11.8171 2.62305 12.2581 2.62305V1.12305ZM14.5565 3.42144C14.5565 2.15207 13.5274 1.12305 12.2581 1.12305V2.62305C12.699 2.62305 13.0565 2.9805 13.0565 3.42144H14.5565ZM13.0565 5.42144V11.873H14.5565V5.42144H13.0565ZM14.5565 5.42144C14.5565 4.9805 14.9139 4.62305 15.3548 4.62305V3.12305C14.0855 3.12305 13.0565 4.15207 13.0565 5.42144H14.5565ZM17.6532 5.42144C17.6532 4.15207 16.6242 3.12305 15.3548 3.12305V4.62305C15.7958 4.62305 16.1532 4.9805 16.1532 5.42144H17.6532ZM13.0565 3.42144V5.42144H14.5565V3.42144H13.0565ZM16.1532 7.42144V12.873H17.6532V7.42144H16.1532ZM17.6532 7.42144C17.6532 6.9805 18.0107 6.62305 18.4516 6.62305V5.12305C17.1823 5.12305 16.1532 6.15207 16.1532 7.42144H17.6532ZM20.75 7.42144C20.75 6.15207 19.721 5.12305 18.4516 5.12305V6.62305C18.8926 6.62305 19.25 6.9805 19.25 7.42144H20.75ZM16.1532 5.42144V7.42144H17.6532V5.42144H16.1532Z',
  d7: 'M7.62688 13.3921L7.62701 5.40659C7.62702 4.56938 8.30536 3.89069 9.14214 3.89069H9.18987C10.0267 3.89069 10.705 4.56939 10.705 5.40662V10.8798M10.705 5.4979L10.7051 3.40159C10.7052 2.5644 11.3835 1.88574 12.2203 1.88574H12.2722C13.1073 1.88574 13.785 2.56192 13.7873 3.39753L13.8105 11.8841M13.8105 7.50285L13.8106 5.40654C13.8106 4.56935 14.489 3.89069 15.3257 3.89069H15.3735C16.2103 3.89069 16.8886 4.56939 16.8886 5.40662V12.8758M16.8886 9.50584L16.8887 7.40953C16.8888 6.57234 17.5671 5.89369 18.4038 5.89369H18.4907C19.3274 5.89369 20.0058 6.57239 20.0058 7.40961V14.8788M7.49805 8.94081C4.74353 11.2948 4.01761 12.2715 4.01018 13.7142C3.98761 14.7313 4.87849 16.066 8.12286 19.8473V21.8867M20.0059 14.8311C20.0684 17.8756 19.3613 18.2274 17.8716 19.8651V21.8733',
  d8: 'M12.2952 1.25C11.5382 1.25 10.9245 1.8477 10.9245 2.58499V10.886H10.1238V4.75907C10.1238 4.06312 9.52221 3.47798 8.75311 3.47798C7.98402 3.47798 7.38241 4.06312 7.38241 4.75907V13.671H6.58175V9.50164C6.17117 9.84794 5.23115 10.6477 4.85047 11.0219C4.08112 11.7781 3.48974 12.5604 3.31119 13.3896C3.25841 13.6347 3.23967 13.8849 3.25537 14.1342C3.27872 14.505 3.41179 14.8792 3.70125 15.3794C3.99283 15.8832 4.42309 16.4824 5.01853 17.3099L7.97275 20.771V22.75H18.3064V20.7566C18.5671 20.4885 19.1277 19.9082 19.5455 19.423C19.7544 19.1802 19.9515 18.9372 20.1109 18.7156C20.2742 18.4884 20.3822 18.3051 20.4307 18.1781C20.5835 17.7782 20.6658 17.3148 20.7077 16.6588C20.7498 15.9996 20.75 15.1716 20.75 14.0439V7.04095C20.75 6.30365 20.1363 5.70596 19.3793 5.70596C18.6223 5.70596 18.0086 6.30365 18.0086 7.04095V13.114H17.2079V4.81297C17.2079 4.07568 16.5943 3.47798 15.8372 3.47798C15.0802 3.47798 14.4665 4.07568 14.4665 4.81297V12H13.6659V2.58499C13.6659 1.8477 13.0522 1.25 12.2952 1.25Z',
};

export const IconFourFinger02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-stroke-rounded IconFourFinger02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-duotone-rounded IconFourFinger02DuotoneRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-twotone-rounded IconFourFinger02TwotoneRounded"
    >
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-solid-rounded IconFourFinger02SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-bulk-rounded IconFourFinger02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-stroke-sharp IconFourFinger02StrokeSharp"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconFourFinger02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="four-finger-02-solid-sharp IconFourFinger02SolidSharp"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfFourFinger02: TheIconSelfPack = {
  name: 'FourFinger02',
  StrokeRounded: IconFourFinger02StrokeRounded,
  DuotoneRounded: IconFourFinger02DuotoneRounded,
  TwotoneRounded: IconFourFinger02TwotoneRounded,
  SolidRounded: IconFourFinger02SolidRounded,
  BulkRounded: IconFourFinger02BulkRounded,
  StrokeSharp: IconFourFinger02StrokeSharp,
  SolidSharp: IconFourFinger02SolidSharp,
};