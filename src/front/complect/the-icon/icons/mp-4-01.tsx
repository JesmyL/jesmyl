import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M3.5 13V12.1963C3.5 9.22892 3.5 7.74523 3.96894 6.56024C4.72281 4.65521 6.31714 3.15255 8.33836 2.44201C9.59563 2.00003 11.1698 2.00003 14.3182 2.00003C16.1173 2.00003 17.0168 2.00003 17.7352 2.25259C18.8902 2.65861 19.8012 3.51728 20.232 4.60587C20.5 5.283 20.5 6.13082 20.5 7.82646V12.0142V13',
  d2: 'M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2',
  d3: 'M11.0588 22V19M11.0588 19V17.2C11.0588 16.6343 11.0588 16.3515 11.2242 16.1757C11.3896 16 11.6558 16 12.1882 16H12.9412C13.7209 16 14.3529 16.6716 14.3529 17.5C14.3529 18.3284 13.7209 19 12.9412 19H11.0588ZM3.5 22L3.8905 16.7201C3.92363 16.2722 3.94019 16.0483 4.06232 16.0065C4.18444 15.9647 4.30951 16.1401 4.55966 16.4911L5.55713 17.8904C5.6928 18.0808 5.76063 18.176 5.8511 18.176C5.94157 18.176 6.00941 18.0808 6.14508 17.8904L7.14311 16.4903C7.39304 16.1396 7.51801 15.9643 7.64011 16.0061C7.76221 16.0478 7.77888 16.2715 7.81224 16.719L8.20588 22M20.5 16V19M20.5 19V22M20.5 19H19.0882C18.2009 19 17.7572 19 17.4815 18.7071C17.2059 18.4142 17.2059 17.9428 17.2059 17V16',
  d4: 'M9.49879 8.49792C5.89879 8.49792 3.5 9.5 3.5 12.1963V13H20.5V7.82643C20.5 6.13079 20.5 5.28297 20.232 4.60583C19.8012 3.51725 18.8902 2.65858 17.7352 2.25256C17.0168 2 16.1172 2 14.3182 2C13.9881 2 13.6753 2 13.3783 2.00051C9.49879 2.00051 10.5332 5.05948 10.5499 6.55167C10.5909 8.19467 9.8002 8.49792 9.49879 8.49792Z',
  d5: 'M3.72368 13.75C4.26144 13.75 4.69737 13.3195 4.69737 12.7885L4.69738 11.7652C4.69737 11.4982 4.69754 10.8596 4.97816 10.3875C5.15109 10.0965 5.37251 9.85337 5.59996 9.72955C5.96647 9.53003 6.38666 9.41667 6.83333 9.41667C6.98046 9.41667 7.13864 9.42314 7.31624 9.43138L7.38206 9.43446C7.53697 9.44174 7.70556 9.44966 7.8737 9.45315C8.25379 9.46105 8.69733 9.44904 9.12548 9.33432C9.95945 9.11086 10.6109 8.45945 10.8343 7.62548C10.949 7.19733 10.961 6.75379 10.9532 6.3737C10.9497 6.20562 10.9417 6.03692 10.9345 5.88206L10.9314 5.81624C10.9231 5.63864 10.9167 5.48046 10.9167 5.33333C10.9167 4.86564 11.0409 4.42698 11.2583 4.04857C11.385 3.82798 11.6057 3.62609 11.9105 3.44878C12.3726 3.17987 12.926 3.17738 13.2642 3.17585C13.6023 3.17433 13.9591 3.17316 14.2572 3.17316C16.0914 3.17316 16.7582 3.18692 17.2614 3.36158C18.1337 3.66441 18.7997 4.29659 19.11 5.07103C19.1878 5.26511 19.2427 5.52002 19.2721 5.96153C19.3021 6.41159 19.3026 6.98607 19.3026 7.81394V12.7885C19.3026 13.3195 19.7386 13.75 20.2763 13.75C20.8141 13.75 21.25 13.3195 21.25 12.7885V7.78121C21.25 6.99374 21.25 6.35586 21.2153 5.83514C21.1795 5.29867 21.1039 4.82043 20.9208 4.36341C20.3922 3.04443 19.2841 2.02533 17.9072 1.54735C17.0482 1.24915 16.0155 1.24951 14.4607 1.25005L13.5134 1.25012L13.5 1.25L13.4649 1.25015C10.9565 1.25185 9.40174 1.28168 8.1118 1.72949C5.8915 2.50027 4.11806 4.13859 3.27491 6.24261C2.99393 6.94378 2.86942 7.69695 2.80918 8.60017C2.74999 9.48756 2.75 10.5838 2.75 11.9814V12.7885C2.75 13.3195 3.18593 13.75 3.72368 13.75Z',
  d6: 'M7.31731 22.0542L7.0126 17.8405L6.67 18.336C6.61733 18.4124 6.53967 18.525 6.45844 18.6131C6.36532 18.7141 6.14018 18.9261 5.78091 18.9261C5.42164 18.9261 5.19651 18.7141 5.10338 18.6131C5.02215 18.525 4.9445 18.4124 4.89182 18.336L4.5503 17.8421L4.24811 22.0538C4.21847 22.467 3.85951 22.7779 3.44636 22.7482C3.03321 22.7186 2.72231 22.3596 2.75196 21.9465L3.13328 16.6317C3.14703 16.439 3.1619 16.2307 3.19369 16.0676C3.21091 15.9793 3.24329 15.8448 3.31722 15.7107C3.39986 15.5608 3.54981 15.3862 3.79605 15.2993C4.05156 15.2092 4.2943 15.2548 4.47459 15.3457C4.62673 15.4225 4.73342 15.5296 4.79361 15.5954C4.90474 15.7169 5.02192 15.8866 5.1243 16.0348L5.78091 16.9844L6.43805 16.034C6.54034 15.8859 6.65746 15.7163 6.76855 15.5949C6.82873 15.5291 6.93539 15.422 7.0875 15.3453C7.26775 15.2544 7.51034 15.2088 7.76573 15.2988C8.01186 15.3855 8.16186 15.5599 8.24459 15.7098C8.3186 15.8439 8.35105 15.9783 8.36832 16.0666C8.40019 16.2296 8.41516 16.4377 8.42901 16.6302L8.8134 21.946C8.84328 22.3592 8.53259 22.7183 8.11945 22.7482C7.70632 22.7781 7.34719 22.4674 7.31731 22.0542Z',
  d7: 'M12.1504 15.25C12.163 15.25 12.1755 15.25 12.188 15.25H12.941C14.1771 15.25 15.1027 16.3009 15.1027 17.5C15.1027 18.6992 14.1771 19.75 12.941 19.75H11.8086V22C11.8086 22.4142 11.4728 22.75 11.0586 22.75C10.6444 22.75 10.3086 22.4142 10.3086 22V17.2C10.3086 17.188 10.3086 17.1759 10.3086 17.1639C10.3085 16.9127 10.3085 16.6588 10.3352 16.4475C10.3654 16.2089 10.4409 15.9135 10.6779 15.6617C10.9209 15.4035 11.2168 15.3146 11.4623 15.2795C11.6702 15.2498 11.9175 15.2499 12.1504 15.25ZM11.8086 18.25H12.941C13.2643 18.25 13.6027 17.9577 13.6027 17.5C13.6027 17.0423 13.2643 16.75 12.941 16.75H12.188C12.052 16.75 11.9464 16.7501 11.8561 16.7525C11.8412 16.7529 11.8272 16.7534 11.8141 16.7539C11.8128 16.7803 11.8118 16.8101 11.811 16.8439C11.8086 16.9419 11.8086 17.056 11.8086 17.2V18.25Z',
  d8: 'M17.207 15.25C17.6213 15.25 17.957 15.5858 17.957 16V17C17.957 17.4914 17.9585 17.7889 17.9856 18.0031C17.9981 18.1021 18.0131 18.1537 18.0227 18.1786C18.0247 18.1838 18.0264 18.1875 18.0276 18.1901C18.0423 18.1962 18.0809 18.2092 18.1627 18.2209C18.3537 18.2482 18.6232 18.25 19.0894 18.25H19.7512V16C19.7512 15.5858 20.0869 15.25 20.5012 15.25C20.9154 15.25 21.2512 15.5858 21.2512 16V22C21.2512 22.4142 20.9154 22.75 20.5012 22.75C20.0869 22.75 19.7512 22.4142 19.7512 22V19.75H19.0894C19.0741 19.75 19.0588 19.75 19.0436 19.75C18.6396 19.7501 18.2605 19.7501 17.9506 19.7059C17.6025 19.6561 17.2347 19.5379 16.9366 19.2211C16.6444 18.9107 16.5414 18.5389 16.4974 18.1914C16.457 17.8715 16.457 17.4774 16.457 17.0429C16.457 17.0286 16.457 17.0143 16.457 17V16C16.457 15.5858 16.7928 15.25 17.207 15.25Z',
  d9: 'M20.501 12.9856V2.08327C20.501 2.02811 20.4562 1.9834 20.401 1.9834H10.5023L3.50391 8.97914V12.9661M10.5023 2.4788V8.96743L4.1028 8.97813',
  d10: 'M3.50391 21.9844V16.1711C3.50391 16.0744 3.62762 16.0341 3.68463 16.1122L5.75505 18.9476L7.84574 16.1097C7.90296 16.032 8.02622 16.0725 8.02622 16.1689V21.9844M11.0072 21.9739L11.0081 18.9867M11.0081 18.9867L11.0082 16.0032H12.4927C12.9245 16.0032 13.3692 16.1233 13.6389 16.4601C14.1516 17.1002 14.1367 17.8397 13.6041 18.5058C13.3249 18.855 12.8673 18.9867 12.4199 18.9867H11.0081ZM17.0022 15.4902V18.8798C17.0022 18.935 17.0469 18.9797 17.1022 18.9797H20.5076M20.5076 18.9797V15.4785M20.5076 18.9797V21.971',
  d11: 'M20.2763 1.25C20.8141 1.25 21.25 1.68754 21.25 2.22727V13.0682H19.3026V3.20455L11.5132 3.20455L11.5132 10.0455H4.69737L4.69737 13.0682H2.75V8.66338L10.1362 1.25H20.2763Z',
  d12: 'M8.23717 15.2885C8.54343 15.3906 8.75 15.6772 8.75 16V22.75H7.25V18.2501L5.75 20.2501L4.25 18.2501V22.75H2.75V16.0001C2.75 15.6772 2.95657 15.3906 3.26283 15.2885C3.56909 15.1865 3.90631 15.2918 4.1 15.5501L5.75 17.7501L7.4 15.55C7.59369 15.2918 7.93091 15.1865 8.23717 15.2885ZM11.75 16.75V18.25L12.5 18.25C12.9142 18.25 13.25 17.9143 13.25 17.5C13.25 17.0858 12.9142 16.75 12.5 16.75L11.75 16.75ZM11.75 19.75L12.5 19.75C13.7426 19.75 14.75 18.7427 14.75 17.5C14.75 16.2574 13.7426 15.25 12.5 15.25L10.25 15.2501V22.75H11.75V19.75ZM17.7489 15.25V18.25H19.75V15.25H21.25V22.75H19.75V19.75H16.9989C16.5846 19.75 16.2489 19.4143 16.2489 19V15.25H17.7489Z',
};

export const IconMp401StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-stroke-rounded IconMp401StrokeRounded"
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
      />
    </TheIconWrapper>
  );
};

export const IconMp401DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-duotone-rounded IconMp401DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
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
      />
    </TheIconWrapper>
  );
};

export const IconMp401TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-twotone-rounded IconMp401TwotoneRounded"
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
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMp401SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-solid-rounded IconMp401SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMp401BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-bulk-rounded IconMp401BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMp401StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-stroke-sharp IconMp401StrokeSharp"
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
    </TheIconWrapper>
  );
};

export const IconMp401SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-4-01-solid-sharp IconMp401SolidSharp"
    >
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMp401: TheIconSelfPack = {
  name: 'Mp401',
  StrokeRounded: IconMp401StrokeRounded,
  DuotoneRounded: IconMp401DuotoneRounded,
  TwotoneRounded: IconMp401TwotoneRounded,
  SolidRounded: IconMp401SolidRounded,
  BulkRounded: IconMp401BulkRounded,
  StrokeSharp: IconMp401StrokeSharp,
  SolidSharp: IconMp401SolidSharp,
};