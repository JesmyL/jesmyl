import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19.5 13V9.36842C19.5 5.89491 19.5 4.15816 18.4749 3.07908C17.4497 2 15.7998 2 12.5 2H9.5C6.20017 2 4.55025 2 3.52513 3.07908C2.5 4.15816 2.5 5.89491 2.5 9.36842V14.6316C2.5 18.1051 2.5 19.8418 3.52513 20.9209C4.55025 22 6.20017 22 9.5 22H11',
  d2: 'M13.5 20C13.5 20 14.5 20 15.5 22C15.5 22 18.6765 17 21.5 16',
  d3: 'M7 2L7.0822 2.4932C7.28174 3.69044 7.38151 4.28906 7.80113 4.64453C8.22075 5 8.82762 5 10.0414 5H11.9586C13.1724 5 13.7793 5 14.1989 4.64453C14.6185 4.28906 14.7183 3.69044 14.9178 2.4932L15 2',
  d4: 'M7 16H11M7 11H15',
  d5: 'M3.52513 3.07908C2.5 4.15816 2.5 5.89491 2.5 9.36842V14.6316C2.5 18.1051 2.5 19.8418 3.52513 20.9209C4.55025 22 6.20016 22 9.49998 22H12.5C15.7998 22 17.4497 22 18.4749 20.9209C19.5 19.8418 19.5 18.1051 19.5 14.6316V9.36842C19.5 5.89491 19.5 4.15816 18.4749 3.07908C17.6968 2.26008 16.5589 2.06268 14.6128 2.01511C14.816 2.07093 14.9544 2.2737 14.9178 2.4932C14.7183 3.69043 14.6185 4.28906 14.1989 4.64453C13.7793 5 13.1724 5 11.9586 5H10.0414C8.82762 5 8.22075 5 7.80113 4.64453C7.38151 4.28906 7.28174 3.69044 7.0822 2.4932C7.04562 2.27369 7.18405 2.07093 7.38721 2.01511C5.44114 2.06268 4.30318 2.26008 3.52513 3.07908Z',
  d6: 'M7 16H11',
  d7: 'M7 11H15',
  d8: 'M14.0762 1.23065C14.1651 1.33181 14.146 1.48664 14.1077 1.79629L14.0504 2.26053C13.9489 2.86919 13.8822 3.25947 13.7971 3.54553C13.7171 3.81395 13.6457 3.89928 13.5891 3.94726C13.5325 3.99525 13.4366 4.05165 13.1586 4.08634C12.8599 4.12364 12.4598 4.125 11.8336 4.125H9.91639C9.29025 4.125 8.89007 4.12364 8.59138 4.08634C8.31347 4.05165 8.21756 3.99525 8.16092 3.94726C8.10428 3.89928 8.03288 3.81395 7.95297 3.54552C7.86791 3.25984 7.80125 2.87018 7.7 2.26286L7.64493 1.79259C7.60885 1.48443 7.5908 1.33036 7.67969 1.2299C7.76858 1.12944 7.92274 1.12859 8.23107 1.12689C8.5753 1.12499 8.93715 1.125 9.31671 1.125H12.4336C12.8141 1.125 13.1771 1.12499 13.5221 1.1269C13.8322 1.12862 13.9872 1.12948 14.0762 1.23065Z',
  d9: 'M6.13218 1.77506C6.09992 1.49956 6.08378 1.3618 5.98444 1.28466C5.88509 1.20752 5.753 1.2253 5.48883 1.26086L5.42946 1.26905C4.38594 1.41673 3.52969 1.73054 2.85638 2.43928C2.18822 3.14261 1.89709 4.02793 1.75919 5.10759C1.62498 6.15836 1.62499 7.50029 1.625 9.19159V9.19161V14.5619V14.5619C1.62499 16.2532 1.62498 17.5952 1.75919 18.6459C1.89709 19.7256 2.18822 20.6109 2.85638 21.3142C3.52969 22.023 4.38594 22.3368 5.42946 22.4845C6.4351 22.6268 7.71629 22.6268 9.31669 22.6268H12.5628C12.7201 22.6268 12.8051 22.4308 12.7086 22.3067C12.6883 22.2806 12.6715 22.2755 12.6429 22.2669C12.6395 22.2658 12.636 22.2648 12.6322 22.2636C11.6148 21.9464 10.877 20.9984 10.877 19.8767C10.877 18.496 11.9962 17.3767 13.377 17.3767C13.7861 17.3767 14.1991 17.4936 14.2333 17.5035L14.2372 17.5046L14.2382 17.5049C14.4409 17.563 14.6556 17.6436 14.8778 17.7522C14.9629 17.7938 15.0054 17.8146 15.0375 17.8223C15.132 17.845 15.2136 17.8276 15.2906 17.7683C15.3167 17.7482 15.344 17.7155 15.3984 17.6502C16.0214 16.9035 16.7747 16.0802 17.5999 15.3565C18.2126 14.8191 18.947 14.2633 19.7681 13.8517C19.9461 13.7625 20.035 13.7179 20.0798 13.6455C20.1245 13.573 20.1245 13.4792 20.1245 13.2915L20.125 9.19164C20.125 7.50031 20.125 6.15838 19.9908 5.10759C19.8529 4.02793 19.5618 3.14261 18.8936 2.43928C18.2203 1.73054 17.3641 1.41673 16.3205 1.26905L16.2653 1.26142C16.0026 1.22593 15.8712 1.20819 15.772 1.28468C15.6728 1.36117 15.6559 1.49809 15.6221 1.77194L15.5369 2.46188L15.5333 2.48365C15.441 3.03761 15.3487 3.59142 15.2344 3.97529C15.1097 4.39435 14.9214 4.78607 14.5584 5.09356C14.1954 5.40104 13.7781 5.52238 13.3442 5.57655C12.9415 5.62683 12.4466 5.6268 11.8776 5.62677H9.87188C9.30289 5.6268 8.80798 5.62683 8.4053 5.57655C7.97143 5.52238 7.55409 5.40104 7.19111 5.09356C6.82813 4.78607 6.63984 4.39435 6.51508 3.97529C6.40125 3.59295 6.30874 3.03763 6.21681 2.48572L6.2168 2.48571L6.21205 2.45719L6.13218 1.77506ZM6.87695 10.125C6.46274 10.125 6.12695 10.4608 6.12695 10.875C6.12695 11.2892 6.46274 11.625 6.87695 11.625H14.877C15.2912 11.625 15.627 11.2892 15.627 10.875C15.627 10.4608 15.2912 10.125 14.877 10.125H6.87695ZM6.87695 15.125C6.46274 15.125 6.12695 15.4608 6.12695 15.875C6.12695 16.2892 6.46274 16.625 6.87695 16.625H10.877C11.2912 16.625 11.627 16.2892 11.627 15.875C11.627 15.4608 11.2912 15.125 10.877 15.125H6.87695Z',
  d10: 'M22.3176 15.5414C22.502 16.062 22.2294 16.6335 21.7088 16.8179C21.1752 17.0069 20.5587 17.4138 19.9057 17.9865C19.263 18.5501 18.6378 19.2271 18.0841 19.8909C17.5322 20.5524 17.0635 21.1861 16.7324 21.6551C16.5672 21.8891 16.307 22.2794 16.2191 22.4115C16.0258 22.7156 15.6837 22.8924 15.3239 22.874C14.9639 22.8555 14.6418 22.6448 14.4806 22.3225C14.0399 21.4411 13.6446 21.0902 13.4453 20.9573C13.361 20.9011 13.304 20.8786 13.2814 20.8709C12.773 20.8237 12.375 20.396 12.375 19.8753C12.375 19.323 12.8227 18.8753 13.375 18.8753C13.6094 18.8753 13.7184 18.9155 13.8216 18.945C14.0295 19.0044 14.2803 19.1103 14.5547 19.2932C14.829 19.4761 15.1166 19.7288 15.4054 20.0747C15.7206 19.6439 16.109 19.1363 16.5483 18.6097C17.1416 17.8985 17.84 17.1379 18.587 16.4828C19.3236 15.8368 20.163 15.2436 21.0412 14.9326C21.5618 14.7483 22.1332 15.0208 22.3176 15.5414Z',
  d11: 'M5.98444 1.28466C6.08378 1.3618 6.09991 1.49956 6.13218 1.77506L6.21205 2.45719L6.2168 2.48571C6.30874 3.03762 6.40125 3.59295 6.51508 3.97529C6.63984 4.39435 6.82813 4.78607 7.19111 5.09356C7.55408 5.40104 7.97143 5.52238 8.4053 5.57655C8.80798 5.62683 9.30288 5.6268 9.87188 5.62677H11.8776C12.4466 5.6268 12.9415 5.62683 13.3442 5.57655C13.7781 5.52238 14.1954 5.40104 14.5584 5.09356C14.9214 4.78607 15.1097 4.39435 15.2344 3.97529C15.3487 3.59142 15.441 3.03761 15.5333 2.48365L15.5369 2.46188L15.6221 1.77194C15.6559 1.49809 15.6728 1.36117 15.772 1.28468C15.8712 1.20819 16.0026 1.22593 16.2653 1.26142L16.3205 1.26905C17.3641 1.41673 18.2203 1.73054 18.8936 2.43928C19.5618 3.14261 19.8529 4.02793 19.9908 5.10759C20.125 6.15838 20.125 7.50031 20.125 9.19164L20.1245 13.2915C20.1245 13.4792 20.1245 13.573 20.0798 13.6455C20.035 13.7179 19.9461 13.7625 19.7681 13.8517C18.947 14.2633 18.2126 14.8191 17.5999 15.3565C16.7747 16.0802 16.0214 16.9035 15.3984 17.6502C15.344 17.7155 15.3167 17.7482 15.2906 17.7683C15.2136 17.8276 15.132 17.845 15.0375 17.8223C15.0054 17.8146 14.9629 17.7938 14.8778 17.7522C14.6556 17.6436 14.4409 17.563 14.2382 17.5049L14.2372 17.5046L14.2333 17.5035C14.1991 17.4936 13.7861 17.3767 13.377 17.3767C11.9962 17.3767 10.877 18.496 10.877 19.8767C10.877 20.9984 11.6148 21.9464 12.6322 22.2636C12.6675 22.2746 12.6859 22.2775 12.7086 22.3067C12.8051 22.4308 12.7201 22.6268 12.5628 22.6268H9.31669C7.71629 22.6268 6.4351 22.6268 5.42946 22.4845C4.38594 22.3368 3.52969 22.023 2.85638 21.3142C2.18822 20.6109 1.89708 19.7256 1.75919 18.6459C1.62498 17.5952 1.62499 16.2532 1.625 14.5619V9.19161C1.62499 7.5003 1.62498 6.15837 1.75919 5.10759C1.89708 4.02793 2.18822 3.14261 2.85638 2.43928C3.52968 1.73054 4.38594 1.41673 5.42946 1.26905L5.48883 1.26086C5.753 1.2253 5.88509 1.20752 5.98444 1.28466Z',
  d12: 'M6.12695 10.875C6.12695 10.4608 6.46274 10.125 6.87695 10.125H14.877C15.2912 10.125 15.627 10.4608 15.627 10.875C15.627 11.2892 15.2912 11.625 14.877 11.625H6.87695C6.46274 11.625 6.12695 11.2892 6.12695 10.875ZM6.12695 15.875C6.12695 15.4608 6.46274 15.125 6.87695 15.125H10.877C11.2912 15.125 11.627 15.4608 11.627 15.875C11.627 16.2892 11.2912 16.625 10.877 16.625H6.87695C6.46274 16.625 6.12695 16.2892 6.12695 15.875Z',
  d13: 'M13.5 20L15.5 22L21.5 16',
  d14: 'M19.5 13V2H2.5V22H10.5',
  d15: 'M15 2H7V5H15V2Z',
  d16: 'M6.5 16H11.5M6.5 11H15.5',
  d17: 'M22.7501 16.043L16.043 22.7501L13.3359 20.043L14.7501 18.6288L16.043 19.9217L21.3359 14.6288L22.7501 16.043Z',
  d18: 'M5.74982 1.24976H1.99982C1.5856 1.24976 1.24982 1.58554 1.24982 1.99976V21.9998C1.24982 22.414 1.5856 22.7498 1.99982 22.7498L13.9213 22.7498L11.2147 20.0431L14.7502 16.5076L16.0431 17.8005L19.7498 14.0937V1.99976C19.7498 1.58554 19.414 1.24976 18.9998 1.24976H15.2498V4.74976C15.2498 5.16397 14.914 5.49976 14.4998 5.49976H6.49982C6.0856 5.49976 5.74982 5.16397 5.74982 4.74976V1.24976ZM5.99982 10.7498H14.9998V9.24976H5.99982V10.7498ZM5.99982 15.7498H10.9998V14.2498H5.99982V15.7498Z',
  d19: 'M13.7498 1.24976H7.24982V3.99976H13.7498V1.24976Z',
};

export const IconTaskDone02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-stroke-rounded IconTaskDone02StrokeRounded"
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-duotone-rounded IconTaskDone02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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
        strokeLinejoin="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-twotone-rounded IconTaskDone02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d7} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-solid-rounded IconTaskDone02SolidRounded"
    >
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-bulk-rounded IconTaskDone02BulkRounded"
    >
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-stroke-sharp IconTaskDone02StrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
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
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconTaskDone02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="task-done-02-solid-sharp IconTaskDone02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d17} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfTaskDone02: TheIconSelfPack = {
  name: 'TaskDone02',
  StrokeRounded: IconTaskDone02StrokeRounded,
  DuotoneRounded: IconTaskDone02DuotoneRounded,
  TwotoneRounded: IconTaskDone02TwotoneRounded,
  SolidRounded: IconTaskDone02SolidRounded,
  BulkRounded: IconTaskDone02BulkRounded,
  StrokeSharp: IconTaskDone02StrokeSharp,
  SolidSharp: IconTaskDone02SolidSharp,
};