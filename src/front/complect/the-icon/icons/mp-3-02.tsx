import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M15 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 9.21865 3 7.73706 3.46894 6.55375C4.22281 4.65142 5.81714 3.15088 7.83836 2.44135C9.09563 2 10.6698 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V10',
  d2: 'M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2',
  d3: 'M13 18V15.5M13 15.5V14C13 13.5286 13 13.2929 13.1406 13.1464C13.2812 13 13.5075 13 13.96 13H14.6C15.2627 13 15.8 13.5596 15.8 14.25C15.8 14.9404 15.2627 15.5 14.6 15.5H13ZM7 18L7.33193 13.6001C7.36008 13.2268 7.37416 13.0402 7.47797 13.0054C7.58178 12.9706 7.68809 13.1168 7.90071 13.4092L8.74856 14.5754C8.86388 14.734 8.92154 14.8133 8.99844 14.8133C9.07534 14.8133 9.133 14.734 9.24832 14.5754L10.0966 13.4086C10.3091 13.1164 10.4153 12.9703 10.5191 13.005C10.6229 13.0398 10.6371 13.2263 10.6654 13.5992L11 18M17.8 13.9316C17.8857 13.2771 18.448 13 19.0347 13H19.7454C20.3321 13 20.8944 13.2771 20.9801 13.9316C21.0066 14.134 21.0066 14.366 20.9801 14.5684C20.9094 15.108 20.436 15.5 19.9231 15.5M17.8 17.0684C17.8857 17.7229 18.448 18 19.0347 18L19.7454 18C20.3321 18 20.8944 17.7229 20.9801 17.0684C21.0066 16.866 21.0066 16.634 20.9801 16.4316C20.9094 15.892 20.436 15.5 19.9231 15.5M19.9231 15.5H19.8597',
  d4: 'M3.0014 10.9896C3.34179 10.1536 4.90998 8.49792 8.49805 8.49792C8.79946 8.49792 9.59012 8.19468 9.5492 6.55168C9.53252 5.06667 10.0738 2.12886 12.3445 2.00216C12.7945 2 13.2836 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V17C20 17.9293 20 18.394 19.9231 18.7804C19.6075 20.3671 18.3671 21.6075 16.7804 21.9231C16.394 22 15.9293 22 15 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 11.7548 3 11.3586 3.0014 10.9896Z',
  d5: 'M13.0039 18V15.5M13.0039 15.5V14C13.0039 13.5286 13.0039 13.2929 13.1445 13.1464C13.2851 13 13.5114 13 13.9639 13H14.6039C15.2666 13 15.8039 13.5596 15.8039 14.25C15.8039 14.9404 15.2666 15.5 14.6039 15.5H13.0039ZM7.00391 18L7.33583 13.6001C7.36399 13.2268 7.37807 13.0402 7.48187 13.0054C7.58568 12.9706 7.69199 13.1168 7.90461 13.4092L8.75247 14.5754C8.86778 14.734 8.92544 14.8133 9.00234 14.8133C9.07924 14.8133 9.1369 14.734 9.25222 14.5754L10.1005 13.4086C10.313 13.1164 10.4192 12.9703 10.523 13.005C10.6268 13.0398 10.641 13.2263 10.6693 13.5992L11.0039 18M17.8039 13.9316C17.8896 13.2771 18.452 13 19.0386 13H19.7493C20.336 13 20.8983 13.2771 20.984 13.9316C21.0105 14.134 21.0105 14.366 20.984 14.5684C20.9133 15.108 20.4399 15.5 19.927 15.5M17.8039 17.0684C17.8896 17.7229 18.452 18 19.0386 18L19.7493 18C20.336 18 20.8983 17.7229 20.984 17.0684C21.0105 16.866 21.0105 16.634 20.984 16.4316C20.9133 15.892 20.4399 15.5 19.927 15.5M19.927 15.5H19.8636',
  d6: 'M7.51341 20.7033C8.38286 20.7942 9.51399 20.7955 11.1226 20.7955H15.2829C15.8206 20.7955 16.2566 21.233 16.2566 21.7727C16.2566 22.3125 15.8206 22.75 15.2829 22.75H11.0677C9.52659 22.75 8.29379 22.75 7.31154 22.6473C6.30212 22.5417 5.4409 22.3186 4.69613 21.7919C4.30577 21.5159 3.95722 21.1871 3.66204 20.8146C3.09221 20.0956 2.84896 19.2577 2.73485 18.2843C2.62496 17.3469 2.62498 16.1743 2.625 14.7262V12.1428V12.1427C2.625 10.7244 2.62499 9.61179 2.68419 8.71107C2.74444 7.79422 2.86898 7.02952 3.15009 6.31755C3.99348 4.1815 5.76721 2.51875 7.98721 1.73658C9.36965 1.2495 11.0563 1.24971 13.8959 1.25007L14.1322 1.25009L14.3355 1.25004L14.3356 1.25004C15.8906 1.2495 16.923 1.24914 17.7818 1.55172C19.1584 2.03673 20.2668 3.071 20.7956 4.41031C20.9789 4.87447 21.0545 5.36014 21.0903 5.90477C21.125 6.43335 21.125 7.08083 21.125 7.87999V7.88006V10.0455C21.125 10.5852 20.6891 11.0228 20.1513 11.0228C19.6136 11.0228 19.1776 10.5852 19.1776 10.0455V7.91329C19.1776 7.07303 19.1771 6.49008 19.1471 6.03341C19.1177 5.58546 19.0629 5.32704 18.9852 5.1304C18.6751 4.34503 18.0094 3.70339 17.1368 3.39593C16.6334 3.21858 15.9663 3.20463 14.1322 3.20463C13.8341 3.20463 13.4773 3.2058 13.1391 3.20732C12.801 3.20885 12.2476 3.21134 11.7854 3.48025C11.4807 3.65756 11.2599 3.85945 11.1332 4.08004C10.9159 4.45845 10.7916 4.89711 10.7916 5.3648C10.7916 5.51193 10.8012 5.70446 10.8094 5.88206L10.8094 5.88212C10.8167 6.03696 10.8246 6.20566 10.8281 6.3737C10.836 6.75379 10.824 7.19733 10.7093 7.62548C10.4858 8.45945 9.8344 9.11086 9.00043 9.33432C8.57228 9.44904 8.12874 9.46105 7.74865 9.45315C7.58051 9.44966 7.41193 9.44174 7.25701 9.43446C7.07941 9.42622 6.85541 9.41667 6.70828 9.41667C6.26161 9.41667 5.84142 9.53003 5.47491 9.72955C5.24746 9.85337 5.02604 10.0965 4.85311 10.3875C4.57249 10.8596 4.57232 11.4982 4.57234 11.7652L4.57237 14.6653C4.57237 16.1888 4.57394 17.2461 4.66887 18.0559C4.76111 18.8427 4.93055 19.2754 5.18611 19.5979C5.3639 19.8223 5.57628 20.0234 5.81774 20.1941C6.17557 20.4472 6.65949 20.6139 7.51341 20.7033Z',
  d7: 'M10.0358 15.1589C9.92469 15.2652 9.70466 15.4367 9.37738 15.4367C9.05011 15.4367 8.83008 15.2652 8.719 15.1589L8.37622 14.7486L8.12682 18.0546C8.09566 18.4676 7.73556 18.7772 7.32252 18.746C6.90948 18.7149 6.59991 18.3548 6.63107 17.9417L6.9654 13.5097C6.97716 13.3526 6.99087 13.1694 7.02079 13.0234L7.02122 13.0213C7.04197 12.9199 7.13738 12.4539 7.61834 12.2925C8.13766 12.1183 8.49699 12.489 8.56803 12.5628C8.67129 12.6702 8.7788 12.8183 8.86703 12.9399L9.37737 13.5938L9.8882 12.9392L9.8882 12.9392C9.97634 12.8178 10.0838 12.6697 10.187 12.5624C10.2582 12.4885 10.6173 12.1181 11.1364 12.2921C11.6172 12.4532 11.7129 12.919 11.7337 13.0204L11.7341 13.0224C11.7641 13.1683 11.7779 13.3514 11.7898 13.5084V13.5084L12.1268 17.9413C12.1582 18.3543 11.8488 18.7146 11.4358 18.746C11.0228 18.7774 10.6625 18.468 10.6311 18.055L10.3796 14.7472L10.0358 15.1589Z',
  d8: 'M13.3789 18V15.5M13.3789 15.5V14C13.3789 13.5286 13.3789 13.2929 13.5195 13.1464C13.6601 13 13.8864 13 14.3389 13H14.9789C15.6416 13 16.1789 13.5596 16.1789 14.25C16.1789 14.9404 15.6416 15.5 14.9789 15.5H13.3789Z',
  d9: 'M18.1797 13.9316C18.2654 13.2771 18.8277 13 19.4144 13H20.1251C20.7118 13 21.2741 13.2771 21.3598 13.9316C21.3863 14.134 21.3863 14.366 21.3598 14.5684C21.2891 15.108 20.8157 15.5 20.3028 15.5M18.1797 17.0684C18.2654 17.7229 18.8277 18 19.4144 18L20.1251 18C20.7118 18 21.2741 17.7229 21.3598 17.0684C21.3863 16.866 21.3863 16.634 21.3598 16.4316C21.2891 15.892 20.8157 15.5 20.3028 15.5M20.3028 15.5H20.2394',
  d10: 'M20.0018 10.0157V2.08424C20.0018 2.02909 19.957 1.98438 19.9018 1.98438H10.0026L3.00391 8.9798V21.9883H19.9954M10.0026 2.52165V8.9681L3.57474 8.97884',
  d11: 'M7.01817 18.4872L6.98242 13.1692C6.9818 13.076 7.09787 13.0328 7.15842 13.1036L8.7613 14.9787L10.3598 13.1046C10.4204 13.0336 10.5367 13.0769 10.5359 13.1702L10.4928 18.504M13.0095 18.5042L13.0105 15.4853M13.0105 15.4853V12.9766H14.5477C14.9469 12.9766 15.3586 13.0763 15.6242 13.3741C16.1684 13.9843 16.0983 14.6776 15.5338 15.1891C15.2833 15.4161 14.9357 15.4853 14.5975 15.4853H13.0105ZM18.0023 14.289V13.0764C18.0023 13.0213 18.047 12.9766 18.1023 12.9766H20.9082C20.9634 12.9766 21.0081 13.0213 21.0081 13.0764V15.49M18.0024 16.735V17.8835C18.0024 17.9387 18.0471 17.9834 18.1024 17.9834H20.9082C20.9634 17.9834 21.0081 17.9387 21.0081 17.8835V15.49M21.0081 15.49H18.9435',
  d12: 'M20.75 2.22727C20.75 1.68754 20.3141 1.25 19.7763 1.25H9.63616L2.25 8.66338V21.7727C2.25 22.3125 2.68593 22.75 3.22368 22.75H20.75V20.7955H4.19727V10.0455H11.0131L11.0131 3.20459H18.8025V10H20.75V2.22727Z',
  d13: 'M10.7638 12.298C11.0563 12.4079 11.25 12.6876 11.25 13V18.75H9.75V14.9961L8.75 16.139L7.75 14.9961V18.75H6.25V13C6.25 12.6876 6.44371 12.4079 6.7362 12.298C7.0287 12.1881 7.35868 12.271 7.56443 12.5062L8.75 13.8611L9.93557 12.5062C10.1413 12.271 10.4713 12.1881 10.7638 12.298ZM17.25 13C17.25 12.5858 17.5858 12.25 18 12.25H21C21.4142 12.25 21.75 12.5858 21.75 13V18C21.75 18.4142 21.4142 18.75 21 18.75H18C17.5858 18.75 17.25 18.4142 17.25 18V16.75H18.75V17.25H20.25V16.25H18.9412V14.75H20.25V13.75H18.75V14.25H17.25V13ZM13.75 13.75V14.75L14.7647 14.75C15.0244 14.75 15.25 14.5346 15.25 14.25C15.25 13.9655 15.0244 13.75 14.7647 13.75L13.75 13.75ZM13.75 16.25L14.7647 16.25C15.8695 16.25 16.75 15.3462 16.75 14.25C16.75 13.1538 15.8695 12.25 14.7647 12.25L12.25 12.25V18.75H13.75V16.25Z',
};

export const IconMp302StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-stroke-rounded IconMp302StrokeRounded"
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

export const IconMp302DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-duotone-rounded IconMp302DuotoneRounded"
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMp302TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-twotone-rounded IconMp302TwotoneRounded"
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

export const IconMp302SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-solid-rounded IconMp302SolidRounded"
    >
      <path 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMp302BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-bulk-rounded IconMp302BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMp302StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-stroke-sharp IconMp302StrokeSharp"
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
      />
    </TheIconWrapper>
  );
};

export const IconMp302SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mp-3-02-solid-sharp IconMp302SolidSharp"
    >
      <path 
        d={d.d12} 
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

export const iconPackOfMp302: TheIconSelfPack = {
  name: 'Mp302',
  StrokeRounded: IconMp302StrokeRounded,
  DuotoneRounded: IconMp302DuotoneRounded,
  TwotoneRounded: IconMp302TwotoneRounded,
  SolidRounded: IconMp302SolidRounded,
  BulkRounded: IconMp302BulkRounded,
  StrokeSharp: IconMp302StrokeSharp,
  SolidSharp: IconMp302SolidSharp,
};