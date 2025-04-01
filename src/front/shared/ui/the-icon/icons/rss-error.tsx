import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22.75 13.4937C22.75 13.0795 22.4142 12.7437 22 12.7437C21.5858 12.7437 21.25 13.0795 21.25 13.4937H22.75ZM20.5342 20.7543L21.0198 21.3258V21.3258L20.5342 20.7543ZM3.44705 6.23317L2.96137 5.66166H2.96137L3.44705 6.23317ZM12.9915 21.25C12.5773 21.25 12.2415 21.5858 12.2415 22C12.2415 22.4142 12.5773 22.75 12.9915 22.75V21.25ZM13.9925 21.9956L13.9871 21.2456L13.9806 21.2457L13.9925 21.9956ZM1.25025 10.9727C1.23966 11.3868 1.56675 11.731 1.98083 11.7416C2.39491 11.7522 2.73917 11.4251 2.74975 11.0111L1.25025 10.9727ZM9.26038 5.74991C9.67455 5.74352 10.0051 5.4026 9.99873 4.98844C9.99234 4.57427 9.65142 4.2437 9.23725 4.25009L9.26038 5.74991ZM21.25 13.4937C21.25 15.5235 21.2478 16.9573 21.076 18.0434C20.9098 19.0938 20.5995 19.7145 20.0485 20.1828L21.0198 21.3258C21.9347 20.5483 22.3573 19.5438 22.5576 18.2778C22.7522 17.0475 22.75 15.4739 22.75 13.4937H21.25ZM12.9915 22.75C13.3534 22.75 13.6053 22.7489 13.7674 22.7478C13.8485 22.7472 13.9071 22.7466 13.9457 22.7462C13.9651 22.746 13.9794 22.7458 13.9891 22.7457C13.9939 22.7456 13.9976 22.7456 14.0001 22.7455C14.0014 22.7455 14.0023 22.7455 14.0031 22.7455C14.0034 22.7455 14.0037 22.7455 14.0039 22.7455C14.004 22.7455 14.0041 22.7455 14.0042 22.7455C14.0042 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0044 22.7455 13.9925 21.9956C13.9806 21.2457 13.9806 21.2457 13.9806 21.2457C13.9806 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9806 21.2457C13.9806 21.2457 13.9805 21.2457 13.9803 21.2457C13.9799 21.2457 13.9792 21.2457 13.9782 21.2457C13.9763 21.2457 13.9732 21.2458 13.969 21.2458C13.9605 21.2459 13.9473 21.2461 13.9291 21.2463C13.8927 21.2467 13.8361 21.2473 13.757 21.2478C13.5988 21.2489 13.3503 21.25 12.9915 21.25V22.75ZM13.9979 22.7455C15.7037 22.7333 17.0832 22.6875 18.2019 22.5013C19.3334 22.313 20.2597 21.9718 21.0198 21.3258L20.0485 20.1828C19.5666 20.5923 18.9303 20.8594 17.9555 21.0217C16.9679 21.1861 15.6976 21.2333 13.9871 21.2456L13.9979 22.7455ZM2.74975 11.0111C2.81163 8.59113 3.08942 7.52134 3.93273 6.80467L2.96137 5.66166C1.55911 6.85335 1.31136 8.58282 1.25025 10.9727L2.74975 11.0111ZM9.23725 4.25009C6.33117 4.2949 4.34751 4.48368 2.96137 5.66166L3.93273 6.80467C4.84512 6.02929 6.25834 5.79621 9.26038 5.74991L9.23725 4.25009Z',
  d2: 'M2.98242 21H2.9914',
  d3: 'M17 9H17.009',
  d4: 'M17 6.5V4.5',
  d5: 'M2 17.2349C4.49328 17.2349 6.77053 19.5 6.77053 21.9996M10 21.9996C10 17.5 5.99511 14 2.04522 14',
  d6: 'M12.416 5.00003C12.2772 5 12.1363 5 11.9932 5C7.27471 5 4.91547 5 3.44963 6.2448C2.32684 7.19827 2.06407 8.59687 2.00258 11L2.00028 13.9909C1.99738 17.7661 1.99593 19.6536 3.16821 20.8264C4.34049 21.9991 6.22807 21.9984 10.0032 21.997L13.9951 21.9956C17.4114 21.971 19.2947 21.8099 20.5367 20.7552C22.0026 19.5104 22.0026 17.5069 22.0026 13.5C22.0026 11.311 22.0026 9.71987 21.7636 8.52377C21.1191 10.54 19.2301 12 17 12C14.2386 12 12 9.76142 12 7C12 6.28891 12.1484 5.61249 12.416 5.00003Z',
  d7: 'M6.73454 6.34305C5.48503 6.48519 4.77578 6.75347 4.27359 7.17836C3.54072 7.79844 3.20423 8.61834 3.20423 10.5865C3.19042 11.124 2.74183 11.5487 2.20228 11.5349C1.66272 11.5212 1.23652 11.0742 1.25033 10.5367C1.25033 8.71042 1.54676 6.9307 3.00843 5.694C3.93877 4.90686 5.09859 4.56913 6.51283 4.40825C6.98515 4.35452 7.50972 4.31909 8.0851 4.29572C8.62952 4.27361 9.0769 4.71442 9.0769 5.25929C9.0769 5.78963 8.65219 6.22006 8.12232 6.24231C7.61003 6.26382 7.15061 6.29572 6.73454 6.34305Z',
  d8: 'M22.7485 14.4779C22.7436 15.941 22.7156 17.2045 22.5585 18.1934C22.3571 19.4604 21.9258 20.5003 20.9723 21.3069C20.1841 21.9738 19.2317 22.3177 18.1005 22.5052C16.9868 22.6898 15.6221 22.7341 13.9575 22.7461C13.7985 22.7472 13.759 22.7505 13.4049 22.7505C12.8652 22.7505 12.4276 22.3145 12.4276 21.7768C12.4276 21.239 12.8652 20.8031 13.4049 20.8031C13.755 20.8031 13.7857 20.7998 13.9397 20.7988C15.6122 20.7868 16.8358 20.7407 17.7798 20.5842C18.7069 20.4306 19.2816 20.1826 19.7072 19.8226C20.1863 19.4172 20.4712 18.8756 20.628 17.8889C20.7637 17.0348 20.7892 15.949 20.7939 14.4782C20.7957 13.9384 21.2326 13.5005 21.7723 13.5005C22.312 13.5005 22.7503 13.9382 22.7485 14.4779Z',
  d9: 'M1.25 21.7991C1.25 21.2744 1.67493 20.8491 2.19912 20.8491H2.20764C2.73182 20.8491 3.15676 21.2744 3.15676 21.7991C3.15676 22.3238 2.73182 22.7491 2.20764 22.7491H2.19912C1.67493 22.7491 1.25 22.3238 1.25 21.7991Z',
  d10: 'M1.30175 14.2C1.30175 13.6753 1.72668 13.25 2.25087 13.25C6.48852 13.25 10.75 16.9657 10.75 21.7999C10.75 22.3246 10.3251 22.7499 9.80088 22.7499C9.2767 22.7499 8.85177 22.3246 8.85177 21.7999C8.85177 18.0846 5.51103 15.1501 2.25087 15.1501C1.72668 15.1501 1.30175 14.7247 1.30175 14.2ZM1.31934 17.6418C1.41978 17.1269 1.91826 16.7909 2.43273 16.8914C4.71641 17.3377 6.6405 19.3429 6.92317 21.686C6.98601 22.2069 6.61509 22.6802 6.09468 22.7431C5.57428 22.806 5.10147 22.4347 5.03863 21.9138C4.85742 20.4117 3.56772 19.0492 2.069 18.7563C1.55453 18.6557 1.2189 18.1568 1.31934 17.6418Z',
  d11: 'M11.25 7C11.25 3.82436 13.8244 1.25 17 1.25C20.1756 1.25 22.75 3.82436 22.75 7C22.75 10.1756 20.1756 12.75 17 12.75C13.8244 12.75 11.25 10.1756 11.25 7ZM16 9C16 8.44772 16.4477 8 17 8H17.009C17.5613 8 18.009 8.44772 18.009 9C18.009 9.55229 17.5613 10 17.009 10H17C16.4477 10 16 9.55229 16 9ZM17.75 4.5C17.75 4.08579 17.4142 3.75 17 3.75C16.5858 3.75 16.25 4.08579 16.25 4.5V6.5C16.25 6.91421 16.5858 7.25 17 7.25C17.4142 7.25 17.75 6.91421 17.75 6.5V4.5Z',
  d12: 'M11.25 7C11.25 3.82436 13.8244 1.25 17 1.25C20.1756 1.25 22.75 3.82436 22.75 7C22.75 10.1756 20.1756 12.75 17 12.75C13.8244 12.75 11.25 10.1756 11.25 7Z',
  d13: 'M16 9C16 8.44772 16.4477 8 17 8H17.009C17.5613 8 18.009 8.44772 18.009 9C18.009 9.55228 17.5613 10 17.009 10H17C16.4477 10 16 9.55228 16 9Z',
  d14: 'M17 3.75C17.4142 3.75 17.75 4.08579 17.75 4.5V6.5C17.75 6.91421 17.4142 7.25 17 7.25C16.5858 7.25 16.25 6.91421 16.25 6.5V4.5C16.25 4.08579 16.5858 3.75 17 3.75Z',
  d15: 'M12.5 21H22V13M3 11.5V6H9',
  d16: 'M17 6.5V5',
  d17: 'M1.5 6C1.5 5.44772 1.94772 5 2.5 5H9V7H3.5V11.5H1.5V6Z',
  d18: 'M22.5 21C22.5 21.5523 22.0523 22 21.5 22H12V20H20.5V14.5H22.5V21Z',
  d19: 'M1.54522 15C4.98016 15 8.5 18.0889 8.5 21.9996H10.5C10.5 16.9111 6.01006 13 1.54522 13V15Z',
  d20: 'M1.5 18.2349C3.4434 18.2349 5.27053 20.0547 5.27053 21.9996H7.27053C7.27053 18.9453 4.54316 16.2349 1.5 16.2349V18.2349Z',
  d21: 'M2.49553 20C1.94571 20 1.5 20.4477 1.5 21C1.5 21.5523 1.94571 22 2.49553 22H2.50447C3.05429 22 3.5 21.5523 3.5 21C3.5 20.4477 3.05429 20 2.50447 20H2.49553Z',
  d22: 'M16.75 2C13.5744 2 11 4.57436 11 7.75C11 10.9256 13.5744 13.5 16.75 13.5C19.9256 13.5 22.5 10.9256 22.5 7.75C22.5 4.57436 19.9256 2 16.75 2ZM17.5 8V4.5H16V8H17.5ZM17.509 9.5H16V11H17.509V9.5Z',
};

export const IconRssErrorStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-stroke-rounded IconRssErrorStrokeRounded"
    >
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-duotone-rounded IconRssErrorDuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-twotone-rounded IconRssErrorTwotoneRounded"
    >
      <circle 
        opacity="var(--icon-opacity)" 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d1} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-solid-rounded IconRssErrorSolidRounded"
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
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-bulk-rounded IconRssErrorBulkRounded"
    >
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <g 
        opacity="var(--icon-opacity)">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
      </g>
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d13} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-stroke-sharp IconRssErrorStrokeSharp"
    >
      <path 
        d={d.d15} 
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
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <circle 
        cx="17" 
        cy="7" 
        r="5" 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round"></circle>
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="square" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconRssErrorSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="rss-error-solid-sharp IconRssErrorSolidSharp"
    >
      <path 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d20} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfRssError: TheIconSelfPack = {
  name: 'RssError',
  StrokeRounded: IconRssErrorStrokeRounded,
  DuotoneRounded: IconRssErrorDuotoneRounded,
  TwotoneRounded: IconRssErrorTwotoneRounded,
  SolidRounded: IconRssErrorSolidRounded,
  BulkRounded: IconRssErrorBulkRounded,
  StrokeSharp: IconRssErrorStrokeSharp,
  SolidSharp: IconRssErrorSolidSharp,
};