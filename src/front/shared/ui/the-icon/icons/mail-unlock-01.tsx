import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M2 5L8.91302 8.91697C11.4616 10.361 12.5384 10.361 15.087 8.91697L22 5',
  d2: 'M12 19.5C11.0345 19.5 10.0691 19.4878 9.09883 19.4634C5.95033 19.3843 4.37608 19.3448 3.24496 18.2094C2.11383 17.0739 2.08114 15.5412 2.01577 12.4756C1.99475 11.4899 1.99474 10.5101 2.01576 9.52438C2.08114 6.45885 2.11382 4.92608 3.24495 3.79065C4.37608 2.65521 5.95033 2.61566 9.09882 2.53656C11.0393 2.48781 12.9607 2.48781 14.9012 2.53657C18.0497 2.61568 19.6239 2.65523 20.7551 3.79066C21.8862 4.92609 21.9189 6.45886 21.9842 9.52439C21.9947 10.0172 22 10.0086 22 10.5',
  d3: 'M16.5312 15.86V14.4523C16.5312 13.3741 17.4127 12.5 18.5 12.5C18.9887 12.5 19.4359 12.6766 19.7801 12.969M17.8438 21.5H19.1562C20.1777 21.5 20.6884 21.5 21.0749 21.2951C21.3802 21.1333 21.6302 20.8854 21.7934 20.5827C22 20.1993 22 19.6929 22 18.68C22 17.6671 22 17.1607 21.7934 16.7773C21.6302 16.4746 21.3802 16.2267 21.0749 16.0649C20.6884 15.86 20.1777 15.86 19.1562 15.86H17.8438C16.8223 15.86 16.3116 15.86 15.9251 16.0649C15.6198 16.2267 15.3698 16.4746 15.2066 16.7773C15 17.1607 15 17.6671 15 18.68C15 19.6929 15 20.1993 15.2066 20.5827C15.3698 20.8854 15.6198 21.1333 15.9251 21.2951C16.3116 21.5 16.8223 21.5 17.8438 21.5Z',
  d4: 'M14.9012 19.4647C12.9607 19.5118 11.0393 19.5118 9.09883 19.4647C5.95033 19.3883 4.37608 19.3501 3.24496 18.2539C2.11383 17.1576 2.08114 15.6777 2.01577 12.7178C1.99475 11.7661 1.99474 10.8201 2.01576 9.86836C2.0608 7.82941 2.09032 6.49275 2.47411 5.5L12 10.3276L21.5259 5.5C21.9097 6.49275 21.9392 7.82941 21.9842 9.86838C22.0053 10.8201 22.0053 11.7661 21.9842 12.7178C21.9455 14.4722 21.9182 15.7067 21.6669 16.6495C21.4786 16.3713 21.2209 16.1514 20.9197 16.0177C20.5981 15.875 20.1904 15.875 19.375 15.875H17.625C16.8096 15.875 16.4019 15.875 16.0803 16.0177C15.6515 16.208 15.3108 16.573 15.1332 17.0325C15 17.377 15 17.8139 15 18.6875C15 18.9948 15 19.248 15.0058 19.4622C14.9711 19.463 14.9362 19.4638 14.9012 19.4647Z',
  d5: 'M15.5796 9.787L19.8154 7.38697C20.1764 7.18242 20.3569 7.08014 20.5037 7.16109C20.6506 7.24203 20.6603 7.4448 20.6796 7.8503C20.7057 8.39687 20.7198 8.03051 20.7358 8.7797C20.7433 9.13208 20.7481 9.82737 20.7502 9.97991C20.7577 10.5398 21.1962 10.9999 21.7562 10.9999C22.2995 10.9999 22.7542 10.5658 22.7494 10.0225C22.7479 9.85578 22.7428 9.15382 22.7339 8.73715L22.7323 8.66177C22.701 7.19628 22.6752 6.98537 22.5046 6.00416C22.3228 4.9586 21.9639 4.08311 21.2145 3.33174C20.7911 2.90728 20.3247 2.6077 19.8089 2.39389C19.7304 2.35104 19.6462 2.31873 19.5586 2.29811C19.2288 2.18184 18.8795 2.09616 18.5092 2.03176C17.5082 1.85765 16.2663 1.82652 14.757 1.78868L14.6821 1.78681C12.7264 1.73773 11.2733 1.73774 9.31755 1.78681L9.2427 1.78869C7.73334 1.82652 6.49146 1.85765 5.49049 2.03175C4.42812 2.21654 3.53861 2.57641 2.78521 3.33174C2.03575 4.08311 1.6769 4.9586 1.4951 6.00416C1.3245 6.98538 1.29868 8.19623 1.26743 9.66175L1.26582 9.73714C1.24451 10.7351 1.24453 11.265 1.26583 12.2629L1.26744 12.3383C1.29869 13.8038 1.32451 15.0146 1.49512 15.9959C1.67691 17.0414 2.03576 17.9169 2.78522 18.6683C3.53862 19.4236 4.42814 19.7835 5.49051 19.9683C6.49147 20.1424 7.73335 20.1735 9.2427 20.2113L9.31756 20.2132C9.99913 20.2303 10.1055 20.2414 11.0019 20.2466C11.5531 20.2498 11.9997 19.8032 11.9997 19.252C11.9997 18.7008 11.553 18.2538 11.0018 18.2506C10.1198 18.2454 10.0338 18.2345 9.36776 18.2178C7.76481 18.1776 6.67158 18.1476 5.8334 18.0018C5.04012 17.8638 4.57795 17.6374 4.20106 17.2595C3.82023 16.8777 3.5976 16.4218 3.46416 15.6543C3.32246 14.8393 3.2972 13.7803 3.26389 12.2203C3.24319 11.2508 3.24318 10.7492 3.26388 9.7797C3.27988 9.03061 3.29401 8.39704 3.32008 7.85053C3.33942 7.44501 3.34909 7.24225 3.49593 7.1613C3.64277 7.08035 3.82328 7.18263 4.1843 7.38719L8.4197 9.787C9.71931 10.5234 10.8184 11 11.9997 11C13.1809 11 14.28 10.5234 15.5796 9.787Z',
  d6: 'M20.9998 15.2492V14.1875C20.9998 12.8158 19.8546 11.75 18.4998 11.75C17.1451 11.75 15.9998 12.8158 15.9998 14.1875V15.2492C15.9247 15.272 15.8501 15.2993 15.7759 15.3322C15.1557 15.6074 14.6788 16.1277 14.4335 16.762C14.3276 17.036 14.2869 17.3173 14.268 17.6139C14.2498 17.8994 14.2498 18.2471 14.2498 18.6639V18.7111C14.2498 19.1278 14.2498 19.4756 14.268 19.7611C14.2869 20.0577 14.3276 20.339 14.4335 20.613C14.6788 21.2474 15.1557 21.7676 15.7759 22.0428C16.0482 22.1637 16.3271 22.2093 16.6126 22.2302C16.8843 22.25 17.2133 22.25 17.5987 22.25H19.401C19.7864 22.25 20.1154 22.25 20.3871 22.2302C20.6726 22.2093 20.9514 22.1637 21.2238 22.0428C21.844 21.7676 22.3209 21.2474 22.5662 20.613C22.6721 20.339 22.7128 20.0577 22.7317 19.7611C22.7499 19.4756 22.7499 19.1279 22.7498 18.7111V18.6639C22.7499 18.2472 22.7499 17.8994 22.7317 17.6139C22.7128 17.3173 22.6721 17.036 22.5662 16.762C22.3209 16.1277 21.844 15.6074 21.2238 15.3322C21.1496 15.2993 21.075 15.272 20.9998 15.2492ZM17.4998 14.1875C17.4998 13.6952 17.9216 13.25 18.4998 13.25C19.0781 13.25 19.4998 13.6952 19.4998 14.1875V15.125H17.4998V14.1875Z',
  d7: 'M22 11V2.5H2V19.5H12',
  d8: 'M16.5 16V14.5C16.5 13.3954 17.3954 12.5 18.5 12.5C19.0973 12.5 19.6335 12.7619 20 13.1771M15 16H22V21.5H15V16Z',
  d9: 'M2 6L12 11L22 6',
  d10: 'M15.75 14.5C15.75 12.9812 16.9812 11.75 18.5 11.75C19.3215 11.75 20.0595 12.1111 20.5623 12.6808L19.4377 13.6734C19.2076 13.4126 18.8732 13.25 18.5 13.25C17.8096 13.25 17.25 13.8096 17.25 14.5V15.25H22.75V22.25H14.25V15.25H15.75V14.5Z',
  d11: 'M1.25 2.72368C1.25 2.18593 1.68754 1.75 2.22727 1.75H21.7727C22.3125 1.75 22.75 2.18593 22.75 2.72368V10.5H20.796V7.60217L12.0003 12L3.20508 7.6024V18.3026H12V20.25H2.22727C1.68754 20.25 1.25 19.8141 1.25 19.2763V2.72368Z',
};

export const IconMailUnlock01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-stroke-rounded IconMailUnlock01StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconMailUnlock01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-duotone-rounded IconMailUnlock01DuotoneRounded"
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

export const IconMailUnlock01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-twotone-rounded IconMailUnlock01TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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

export const IconMailUnlock01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-solid-rounded IconMailUnlock01SolidRounded"
    >
      <path 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-bulk-rounded IconMailUnlock01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailUnlock01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-stroke-sharp IconMailUnlock01StrokeSharp"
    >
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d8} 
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

export const IconMailUnlock01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-unlock-01-solid-sharp IconMailUnlock01SolidSharp"
    >
      <path 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMailUnlock01: TheIconSelfPack = {
  name: 'MailUnlock01',
  StrokeRounded: IconMailUnlock01StrokeRounded,
  DuotoneRounded: IconMailUnlock01DuotoneRounded,
  TwotoneRounded: IconMailUnlock01TwotoneRounded,
  SolidRounded: IconMailUnlock01SolidRounded,
  BulkRounded: IconMailUnlock01BulkRounded,
  StrokeSharp: IconMailUnlock01StrokeSharp,
  SolidSharp: IconMailUnlock01SolidSharp,
};