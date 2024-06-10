import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.8543 4H9.14613C6.6505 4 4.52893 5.96401 3.75315 8.7004C3.49773 9.6013 3.37003 10.0517 3.69086 10.5259C4.01169 11 4.53398 11 5.57854 11H18.4219C19.4664 11 19.9887 11 20.3096 10.5259C20.6304 10.0517 20.5027 9.6013 20.2473 8.7004C19.4715 5.96401 17.3499 4 14.8543 4Z',
  d2: 'M6 15H5.57833C4.53377 15 4.01149 15 3.69065 15.3387C3.36982 15.6773 3.49753 15.9991 3.75294 16.6426C4.52873 18.5971 6.65029 20 9.14593 20H14.8541C17.3497 20 19.4713 18.5971 20.2471 16.6426C20.5025 15.9991 20.6302 15.6773 20.3093 15.3387C19.9885 15 19.4662 15 18.4217 15H14',
  d3: 'M19 15H20C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11H12M5 15H4C2.89543 15 2 14.1046 2 13C2 11.8954 2.89543 11 4 11H6M6 11L7.48149 12.7284C8.18721 13.5517 8.54007 13.9634 9 13.9634C9.45993 13.9634 9.81279 13.5517 10.5185 12.7284L12 11M6 11H12',
  d4: 'M9.00781 8L8.99883 8',
  d5: 'M15 7L14 8',
  d6: 'M9.14593 20H14.8541C17.3497 20 19.4713 18.5971 20.2471 16.6426C20.5025 15.9991 20.6302 15.6773 20.3093 15.3387C19.9885 15 19.4662 15 18.4217 15H14H6H5.57833C4.53377 15 4.01149 15 3.69065 15.3387C3.36982 15.6773 3.49753 15.9991 3.75294 16.6426C4.52873 18.5971 6.65029 20 9.14593 20Z',
  d7: 'M1.25 13C1.25 11.4812 2.48122 10.25 4 10.25H20C21.5188 10.25 22.75 11.4812 22.75 13C22.75 14.5188 21.5188 15.75 20 15.75H19C18.5858 15.75 18.25 15.4142 18.25 15C18.25 14.5858 18.5858 14.25 19 14.25H20C20.6904 14.25 21.25 13.6904 21.25 13C21.25 12.3096 20.6904 11.75 20 11.75H12.345L11.056 13.2538C10.7307 13.6334 10.4367 13.9765 10.1625 14.2177C9.86362 14.4807 9.48957 14.7134 9 14.7134C8.51043 14.7134 8.13638 14.4807 7.83746 14.2177C7.56333 13.9765 7.26929 13.6334 6.94402 13.2538L5.65505 11.75H4C3.30964 11.75 2.75 12.3096 2.75 13C2.75 13.6904 3.30964 14.25 4 14.25H5C5.41421 14.25 5.75 14.5858 5.75 15C5.75 15.4142 5.41421 15.75 5 15.75H4C2.48122 15.75 1.25 14.5188 1.25 13Z',
  d8: 'M6.00245 14.4594C5.913 14.356 5.86827 14.3043 5.80887 14.2772C5.74947 14.25 5.68178 14.25 5.54639 14.25L5.53075 14.25C5.04945 14.25 4.61263 14.2499 4.25871 14.2996C3.86848 14.3545 3.46851 14.4826 3.14617 14.8229C3.00672 14.9701 2.88784 15.1459 2.81728 15.3585C2.74652 15.5718 2.73906 15.7776 2.76076 15.9634C2.79633 16.2677 2.92593 16.5931 3.03468 16.8661L3.05583 16.9193C3.95887 19.1944 6.38221 20.75 9.14591 20.75H14.8541C17.6178 20.75 20.0411 19.1944 20.9441 16.9193L20.9653 16.8661C21.074 16.5931 21.2037 16.2677 21.2392 15.9634C21.2609 15.7776 21.2535 15.5718 21.1827 15.3585C21.1121 15.1459 20.9933 14.9701 20.8538 14.8229C20.5315 14.4826 20.1315 14.3545 19.7413 14.2996C19.3873 14.2499 18.9505 14.25 18.4692 14.25L12.4541 14.25C12.3187 14.25 12.251 14.25 12.1916 14.2772C12.1322 14.3043 12.0875 14.356 11.998 14.4594C11.7388 14.7589 11.4397 15.0921 11.1537 15.3438C10.7263 15.7199 10.0104 16.2134 9.00023 16.2134C7.9901 16.2134 7.27414 15.7199 6.8468 15.3438C6.56074 15.0921 6.26161 14.7588 6.00245 14.4594Z',
  d9: 'M3.0313 8.49583C3.87047 5.53588 6.22189 3.25 9.14585 3.25H14.854C17.778 3.25 20.1294 5.53588 20.9686 8.49583C21.0835 8.90094 21.2117 9.35258 21.2416 9.71079C21.2775 10.1407 21.2 10.5478 20.9304 10.9462C20.6351 11.3827 20.2305 11.5883 19.7816 11.6766C19.4073 11.7503 18.9515 11.7501 18.4807 11.75H5.51913C5.04835 11.7501 4.59253 11.7503 4.21825 11.6766C3.76936 11.5883 3.36481 11.3827 3.06943 10.9462C2.79983 10.5478 2.72234 10.1407 2.75823 9.71079C2.78813 9.35259 2.91632 8.90093 3.0313 8.49583ZM10.0078 8C10.0078 8.55228 9.5601 9 9.00781 9H8.99883C8.44655 9 7.99883 8.55228 7.99883 8C7.99883 7.44771 8.44655 7 8.99883 7H9.00781C9.5601 7 10.0078 7.44772 10.0078 8ZM15.5303 7.53033C15.8232 7.23744 15.8232 6.76256 15.5303 6.46967C15.2374 6.17678 14.7626 6.17678 14.4697 6.46967L13.4697 7.46967C13.1768 7.76256 13.1768 8.23744 13.4697 8.53033C13.7626 8.82322 14.2374 8.82322 14.5303 8.53033L15.5303 7.53033Z',
  d10: 'M3.0313 8.49583C3.87047 5.53588 6.22189 3.25 9.14585 3.25H14.854C17.778 3.25 20.1294 5.53588 20.9686 8.49583C21.0835 8.90094 21.2117 9.35258 21.2416 9.71079C21.2775 10.1407 21.2 10.5478 20.9304 10.9462C20.6351 11.3827 20.2305 11.5883 19.7816 11.6766C19.4073 11.7503 18.9515 11.7501 18.4807 11.75H11.9999L8.96657 13.7305L5.51913 11.75C5.04835 11.7501 4.59253 11.7503 4.21825 11.6766C3.76936 11.5883 3.36481 11.3827 3.06943 10.9462C2.79983 10.5478 2.72234 10.1407 2.75823 9.71079C2.78813 9.35259 2.91632 8.90093 3.0313 8.49583Z',
  d11: 'M10.0078 8C10.0078 8.55228 9.5601 9 9.00781 9L8.99883 9C8.44655 9 7.99883 8.55228 7.99883 8C7.99883 7.44771 8.44655 7 8.99883 7L9.00781 7C9.5601 7 10.0078 7.44772 10.0078 8Z',
  d12: 'M15.5303 6.46967C15.8232 6.76256 15.8232 7.23744 15.5303 7.53033L14.5303 8.53033C14.2374 8.82322 13.7626 8.82322 13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967L14.4697 6.46967C14.7626 6.17678 15.2374 6.17678 15.5303 6.46967Z',
  d13: 'M6.3627 10.3491C6.157 10.25 5.92031 10.25 5.44691 10.25H4C2.48122 10.25 1.25 11.4812 1.25 13C1.25 14.5188 2.48122 15.75 4 15.75H5C5.0156 15.75 5.03109 15.7495 5.04645 15.7486L5.20515 15.7486C5.33879 15.7486 5.40562 15.7486 5.46406 15.7747C5.5225 15.8008 5.56809 15.8518 5.65928 15.9537C5.87231 16.1918 6.11188 16.4447 6.35135 16.6554C6.84207 17.0873 7.72911 17.712 9.00023 17.712C10.2713 17.712 11.1584 17.0873 11.6491 16.6554C11.8886 16.4447 12.1281 16.1918 12.3412 15.9537C12.4324 15.8518 12.478 15.8008 12.5364 15.7747C12.5948 15.7486 12.6617 15.7486 12.7953 15.7486H18.9533C18.9688 15.7495 18.9843 15.75 19 15.75H20C21.5188 15.75 22.75 14.5188 22.75 13C22.75 11.4812 21.5188 10.25 20 10.25H12.4615C11.9847 10.25 11.7464 10.25 11.5396 10.3503C11.3329 10.4507 11.1854 10.6379 10.8904 11.0124L9.74647 12.4645C9.38641 12.9216 9.20638 13.1501 8.96462 13.1508C8.72287 13.1515 8.54154 12.924 8.1789 12.469L7.01096 11.0035C6.71592 10.6333 6.5684 10.4482 6.3627 10.3491ZM19.3578 14.25H20C20.6904 14.25 21.25 13.6904 21.25 13C21.25 12.3096 20.6904 11.75 20 11.75H12.8049C12.5786 11.75 12.4654 11.75 12.366 11.7957C12.2665 11.8415 12.1929 11.9274 12.0456 12.0992L11.056 13.2538C10.7307 13.6334 10.4367 13.9765 10.1625 14.2177C9.86362 14.4807 9.48957 14.7134 9 14.7134C8.51043 14.7134 8.13638 14.4807 7.83746 14.2177C7.56333 13.9765 7.26929 13.6334 6.94402 13.2538L5.95437 12.0992C5.8071 11.9274 5.73347 11.8415 5.63401 11.7957C5.53455 11.75 5.42141 11.75 5.19511 11.75H4C3.30964 11.75 2.75 12.3096 2.75 13C2.75 13.6904 3.30964 14.25 4 14.25H4.26837C4.28361 14.2491 4.29896 14.2486 4.31443 14.2486C4.42464 14.2486 4.53494 14.2492 4.64526 14.25H5C5.02034 14.25 5.04049 14.2508 5.06042 14.2524C5.22561 14.2528 5.39076 14.2519 5.55571 14.2482C5.74986 14.2438 5.9414 14.2617 6.12066 14.3436C6.34157 14.4446 6.49562 14.6289 6.55476 14.6996C6.56066 14.7066 6.56561 14.7126 6.56959 14.7172C6.828 15.0158 7.09811 15.3145 7.34224 15.5293C7.70621 15.8496 8.25108 16.212 9.00023 16.212C9.74936 16.212 10.2942 15.8496 10.6582 15.5293C10.9023 15.3145 11.1724 15.0158 11.4309 14.7172C11.4348 14.7126 11.4398 14.7066 11.4457 14.6996C11.5048 14.6289 11.6589 14.4446 11.8798 14.3436C12.1006 14.2427 12.3396 14.2467 12.4313 14.2483C12.4404 14.2484 12.448 14.2486 12.4541 14.2486H19.3111C19.3268 14.2486 19.3424 14.2491 19.3578 14.25Z',
  d14: 'M20.5 11V10C20.5 6.68629 17.8137 4 14.5 4H9.5C6.18629 4 3.5 6.68629 3.5 10V11',
  d15: 'M20.5 15C20.5 17.7614 18.2614 20 15.5 20H8.5C5.73858 20 3.5 17.7614 3.5 15',
  d16: 'M11.5 15H20C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11H12M6.5 15H4C2.89543 15 2 14.1046 2 13C2 11.8954 2.89543 11 4 11H6M6 11L9 14L12 11M6 11H12',
  d17: 'M15.5 6.5L13.5 8.5',
  d18: 'M20.75 15C21.8546 15 22.75 14.1046 22.75 13C22.75 11.8954 21.8546 11 20.75 11L11.25 11L8.25 14L5.25 11H3.25C2.14543 11 1.25 11.8954 1.25 13C1.25 14.1046 2.14543 15 3.25 15H20.75Z',
  d19: 'M2.76758 9.5H21.2311C20.9752 6.00556 18.0591 3.25 14.4993 3.25H9.49934C5.93959 3.25 3.02344 6.00556 2.76758 9.5ZM10.0078 6.875C10.0078 7.42728 9.5601 7.875 9.00781 7.875H8.99883C8.44655 7.875 7.99883 7.42728 7.99883 6.875C7.99883 6.32271 8.44655 5.875 8.99883 5.875H9.00781C9.5601 5.875 10.0078 6.32272 10.0078 6.875ZM14.9688 4.84473L12.9688 6.84473L14.0294 7.90539L16.0294 5.90539L14.9688 4.84473Z',
  d20: 'M21.052 16.5H2.94727C3.60705 18.9482 5.84294 20.75 8.49965 20.75H15.4997C18.1564 20.75 20.3923 18.9482 21.052 16.5Z',
};

export const IconHamburger02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-stroke-rounded IconHamburger02StrokeRounded"
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
      <path 
        d={d.d3} 
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

export const IconHamburger02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-duotone-rounded IconHamburger02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
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

export const IconHamburger02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-twotone-rounded IconHamburger02TwotoneRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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

export const IconHamburger02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-solid-rounded IconHamburger02SolidRounded"
    >
      <path 
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

export const IconHamburger02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-bulk-rounded IconHamburger02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconHamburger02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-stroke-sharp IconHamburger02StrokeSharp"
    >
      <path 
        d={d.d14} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
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
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconHamburger02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="hamburger-02-solid-sharp IconHamburger02SolidSharp"
    >
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfHamburger02: TheIconSelfPack = {
  name: 'Hamburger02',
  StrokeRounded: IconHamburger02StrokeRounded,
  DuotoneRounded: IconHamburger02DuotoneRounded,
  TwotoneRounded: IconHamburger02TwotoneRounded,
  SolidRounded: IconHamburger02SolidRounded,
  BulkRounded: IconHamburger02BulkRounded,
  StrokeSharp: IconHamburger02StrokeSharp,
  SolidSharp: IconHamburger02SolidSharp,
};