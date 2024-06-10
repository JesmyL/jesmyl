import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 6C19.3456 6 20.0184 6 20.8263 6.61994C21.0343 6.77954 21.2205 6.96572 21.3801 7.17372C22 7.98164 22 9.15442 22 11.5V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16V11.5C2 9.15442 2 7.98164 2.61994 7.17372C2.77954 6.96572 2.96572 6.77954 3.17372 6.61994C3.98164 6 4.65442 6 7 6',
  d2: 'M17 7L16.1142 4.78543C15.732 3.82996 15.3994 2.7461 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.6006 2.7461 8.26801 3.82996 7.88583 4.78543L7 7',
  d3: 'M15.5 14C15.5 15.933 13.933 17.5 12 17.5C10.067 17.5 8.5 15.933 8.5 14C8.5 12.067 10.067 10.5 12 10.5C13.933 10.5 15.5 12.067 15.5 14Z',
  d4: 'M11.9998 6H12.0088',
  d5: 'M2 11.5V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16V11.5C22 9.15442 22 7.98164 21.3801 7.17372C21.2205 6.96572 21.0343 6.77954 20.8263 6.61994C20.0184 6 19.3456 6 17 6H16.6L16.1142 4.78543C16.0754 4.68856 16.0372 4.59037 15.9987 4.49162C15.6579 3.61633 15.2998 2.69677 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.70024 2.69677 8.34214 3.61633 8.00127 4.49162C7.96281 4.59037 7.92458 4.68856 7.88583 4.78543L7.4 6H7C4.65442 6 3.98164 6 3.17372 6.61994C2.96572 6.77954 2.77954 6.96572 2.61994 7.17372C2 7.98164 2 9.15442 2 11.5ZM12 17.5C13.933 17.5 15.5 15.933 15.5 14C15.5 12.067 13.933 10.5 12 10.5C10.067 10.5 8.5 12.067 8.5 14C8.5 15.933 10.067 17.5 12 17.5Z',
  d6: 'M11.9686 1.25H12.0314H12.0314C12.6355 1.24999 13.1356 1.24998 13.5485 1.28515C13.9812 1.32201 14.3723 1.40069 14.7494 1.58742C15.4214 1.92009 15.8461 2.44877 16.1443 2.979C16.3755 3.39004 16.555 3.85182 16.7071 4.24318C16.743 4.33553 16.7774 4.42396 16.8105 4.50689L16.9569 4.87283C17.0299 5.05536 17.0664 5.14662 17.1425 5.19819C17.2185 5.24975 17.317 5.24991 17.5141 5.25022C18.3986 5.2516 19.0637 5.26171 19.5921 5.33452C20.2753 5.42866 20.7694 5.63092 21.2829 6.02493C21.5429 6.22443 21.7756 6.45715 21.9751 6.71715C22.4019 7.27343 22.5828 7.92195 22.6678 8.67622C22.75 9.40571 22.75 10.3204 22.75 11.4548V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6517C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6517C1.74644 21.0497 1.48754 20.2919 1.36653 19.3918C1.24997 18.5248 1.24998 17.4225 1.25 16.0549V16.0549V11.4548V11.4548C1.24999 10.3204 1.24998 9.4057 1.33222 8.67622C1.41725 7.92195 1.59808 7.27343 2.02493 6.71715C2.22443 6.45715 2.45715 6.22443 2.71715 6.02493C3.23063 5.63092 3.72467 5.42866 4.40786 5.33452C4.93626 5.26171 5.60137 5.2516 6.48592 5.25022C6.68297 5.24991 6.7815 5.24975 6.85754 5.19819C6.93358 5.14662 6.97009 5.05536 7.0431 4.87283L7.18947 4.50689C7.22264 4.42397 7.25701 4.33554 7.2929 4.2432C7.44502 3.85184 7.62451 3.39004 7.85567 2.979C8.15388 2.44877 8.57866 1.92009 9.25059 1.58742C9.62775 1.40069 10.0188 1.32201 10.4515 1.28515C10.8644 1.24998 11.3645 1.24999 11.9686 1.25H11.9686ZM8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14ZM11.9955 5C11.4457 5 11 5.44772 11 6C11 6.55019 11.4567 7 12.0045 7C12.5543 7 13 6.55228 13 6C13 5.44981 12.5433 5 11.9955 5Z',
  d7: 'M11.9686 1.25H12.0314C12.6355 1.24999 13.1356 1.24998 13.5485 1.28515C13.9812 1.32201 14.3723 1.40069 14.7494 1.58742C15.4214 1.92009 15.8461 2.44877 16.1443 2.979C16.3755 3.39004 16.555 3.85182 16.7071 4.24318C16.743 4.33553 16.7774 4.42396 16.8105 4.50689L16.9569 4.87283C17.0299 5.05536 17.0664 5.14662 17.1425 5.19819C17.2185 5.24975 17.317 5.24991 17.5141 5.25022C18.3986 5.2516 19.0637 5.26171 19.5921 5.33452C20.2753 5.42866 20.7694 5.63092 21.2829 6.02493C21.5429 6.22443 21.7756 6.45715 21.9751 6.71715C22.4019 7.27343 22.5828 7.92195 22.6678 8.67622C22.75 9.40571 22.75 10.3204 22.75 11.4548V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6517C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6517C1.74644 21.0497 1.48754 20.2919 1.36653 19.3918C1.24997 18.5248 1.24998 17.4225 1.25 16.0549V11.4548C1.24999 10.3204 1.24998 9.4057 1.33222 8.67622C1.41725 7.92195 1.59808 7.27343 2.02493 6.71715C2.22443 6.45715 2.45715 6.22443 2.71715 6.02493C3.23063 5.63092 3.72467 5.42866 4.40786 5.33452C4.93626 5.26171 5.60137 5.2516 6.48592 5.25022C6.68297 5.24991 6.7815 5.24975 6.85754 5.19819C6.93358 5.14662 6.97009 5.05536 7.0431 4.87283L7.18947 4.50689C7.22264 4.42397 7.25701 4.33554 7.2929 4.2432C7.44502 3.85184 7.62451 3.39004 7.85567 2.979C8.15388 2.44877 8.57866 1.92009 9.25059 1.58742C9.62775 1.40069 10.0188 1.32201 10.4515 1.28515C10.8644 1.24998 11.3645 1.24999 11.9686 1.25Z',
  d8: 'M8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14Z',
  d9: 'M11 6C11 5.44772 11.4457 5 11.9955 5C12.5433 5 13 5.44981 13 6C13 6.55228 12.5543 7 12.0045 7C11.4567 7 11 6.55019 11 6Z',
  d10: 'M15.5059 13.9822C15.5059 15.9125 13.9382 17.4772 12.0044 17.4772C10.0706 17.4772 8.50293 15.9125 8.50293 13.9822C8.50293 12.052 10.0706 10.4873 12.0044 10.4873C13.9382 10.4873 15.5059 12.052 15.5059 13.9822Z',
  d11: 'M12.0039 5.99414H12.0129',
  d12: 'M16.5138 6.00899C16.7723 5.95716 20.1128 5.98739 21.4916 6.00899L22.0166 21.9724L12.0723 21.9824H2.01855L2.49337 6.05265C2.49513 5.99941 2.48362 6.01772 2.55837 6.01772C3.96288 5.99627 7.24241 5.95832 7.49518 6.00899M17.0078 7.99395L15.5116 1.98242H12.0981L8.5007 1.98271L6.99821 7.99894',
  d13: 'M8.32915 1.66465C8.45618 1.41053 8.7159 1.25 9 1.25H15C15.2841 1.25 15.5438 1.4105 15.6708 1.66459L17.4635 5.25H22.0009C22.4152 5.25 22.7509 5.58579 22.7509 6V22.0003C22.7509 22.4145 22.4152 22.7503 22.0009 22.7503H2C1.58579 22.7503 1.25 22.4145 1.25 22.0003V6.00083C1.25 5.58662 1.58579 5.25083 2 5.25083H6.53643L8.32915 1.66465ZM16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14ZM13 5H11V7H13V5Z',
};

export const IconCamera02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-stroke-rounded IconCamera02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
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

export const IconCamera02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-duotone-rounded IconCamera02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
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

export const IconCamera02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-twotone-rounded IconCamera02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconCamera02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-solid-rounded IconCamera02SolidRounded"
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

export const IconCamera02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-bulk-rounded IconCamera02BulkRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconCamera02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-stroke-sharp IconCamera02StrokeSharp"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconCamera02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="camera-02-solid-sharp IconCamera02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCamera02: TheIconSelfPack = {
  name: 'Camera02',
  StrokeRounded: IconCamera02StrokeRounded,
  DuotoneRounded: IconCamera02DuotoneRounded,
  TwotoneRounded: IconCamera02TwotoneRounded,
  SolidRounded: IconCamera02SolidRounded,
  BulkRounded: IconCamera02BulkRounded,
  StrokeSharp: IconCamera02StrokeSharp,
  SolidSharp: IconCamera02SolidSharp,
};