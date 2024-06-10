import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M19 9.5V8.3C18.992 5.49713 18.9051 4.0112 17.967 3.05442C16.9332 2 15.2694 2 11.9416 2L10.0592 2C6.73147 2 5.0676 2 4.0338 3.05442C3 4.10883 3 5.80589 3 9.2L3 13.8C3 17.1941 3 18.8912 4.0338 19.9456C4.95155 20.8816 6.36586 20.9867 9 20.9985',
  d2: 'M18.6753 19.6886L21 22M20 16.5C20 14.0147 17.9853 12 15.5 12C13.0147 12 11 14.0147 11 16.5C11 18.9853 13.0147 21 15.5 21C17.9853 21 20 18.9853 20 16.5Z',
  d3: 'M7 7H15',
  d4: 'M7 11H10',
  d5: 'M3.96482 3.02513C3 4.05025 3 5.70017 3 9V14C3 17.2998 3 18.9497 3.96482 19.9749C4.92965 21 6.48251 21 9.58823 21H12.4118C13.4055 21 14.2402 21 14.9475 20.9664C12.7229 20.6941 11 18.7982 11 16.5C11 14.0147 13.0147 12 15.5 12C16.9136 12 18.175 12.6518 19 13.6713V9C19 5.70017 19 4.05025 18.0352 3.02513C17.0704 2 15.5175 2 12.4118 2H9.58824C6.48251 2 4.92965 2 3.96482 3.02513Z',
  d6: 'M11.25 16.8C11.25 14.011 13.511 11.75 16.3 11.75C19.089 11.75 21.35 14.011 21.35 16.8C21.35 17.8351 21.0386 18.7974 20.5043 19.5985L21.9551 21.0409C22.3467 21.4303 22.3485 22.0634 21.9591 22.4551C21.5697 22.8467 20.9366 22.8485 20.5449 22.4591L19.0884 21.011C18.2894 21.5412 17.3308 21.85 16.3 21.85C13.511 21.85 11.25 19.589 11.25 16.8ZM16.3 13.75C14.6155 13.75 13.25 15.1155 13.25 16.8C13.25 18.4845 14.6155 19.85 16.3 19.85C17.9845 19.85 19.35 18.4845 19.35 16.8C19.35 15.1155 17.9845 13.75 16.3 13.75Z',
  d7: 'M15.4164 1.38876C14.4043 1.24997 13.1141 1.24998 11.4984 1.25H11.4984H9.50245H9.50244C7.88677 1.24998 6.5965 1.24997 5.58438 1.38876C4.53732 1.53234 3.6771 1.83697 2.99826 2.52935C2.32143 3.21967 2.02549 4.09098 1.88566 5.15181C1.74997 6.18116 1.74998 7.49461 1.75 9.14504V9.14505V13.8535V13.8535C1.74998 15.5039 1.74997 16.8174 1.88566 17.8467C2.02549 18.9076 2.32143 19.7789 2.99826 20.4692C3.6771 21.1616 4.53732 21.4662 5.58438 21.6098C6.5965 21.7486 7.88677 21.7486 9.50246 21.7485H11.4416C11.5457 21.7485 11.5978 21.7485 11.6578 21.672C11.6744 21.6509 11.6944 21.6043 11.6983 21.5778C11.7126 21.4816 11.6566 21.4225 11.5445 21.3042C10.4322 20.1303 9.75 18.5448 9.75 16.8C9.75 13.1825 12.6825 10.25 16.3 10.25C17.1305 10.25 17.9249 10.4046 18.6559 10.6865C18.9362 10.7945 19.0763 10.8486 19.1632 10.789C19.25 10.7294 19.25 10.5863 19.25 10.3001L19.25 8.3L19.25 8.29785C19.246 6.90628 19.2237 5.7732 19.0721 4.86185C18.9171 3.92993 18.6159 3.15491 18.0026 2.52935C17.3237 1.83697 16.4635 1.53234 15.4164 1.38876ZM5.75 6C5.75 5.58579 6.08579 5.25 6.5 5.25H14.5C14.9142 5.25 15.25 5.58579 15.25 6C15.25 6.41421 14.9142 6.75 14.5 6.75H6.5C6.08579 6.75 5.75 6.41421 5.75 6ZM6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10C5.75 10.4142 6.08579 10.75 6.5 10.75H9.5C9.91421 10.75 10.25 10.4142 10.25 10C10.25 9.58579 9.91421 9.25 9.5 9.25H6.5Z',
  d8: 'M15.4164 1.38876C14.4043 1.24997 13.1141 1.24998 11.4984 1.25H9.50245C7.88678 1.24998 6.5965 1.24997 5.58438 1.38876C4.53732 1.53234 3.6771 1.83697 2.99826 2.52935C2.32143 3.21967 2.02549 4.09098 1.88566 5.15181C1.74997 6.18116 1.74998 7.49462 1.75 9.14505V13.8535C1.74998 15.5039 1.74997 16.8174 1.88566 17.8467C2.02549 18.9076 2.32143 19.7789 2.99826 20.4692C3.6771 21.1616 4.53732 21.4662 5.58438 21.6098C6.5965 21.7486 7.88677 21.7486 9.50246 21.7485H11.4416C11.5457 21.7485 11.5978 21.7485 11.6578 21.672C11.6744 21.6509 11.6944 21.6043 11.6983 21.5778C11.7126 21.4816 11.6566 21.4225 11.5445 21.3042C10.4322 20.1303 9.75 18.5448 9.75 16.8C9.75 13.1825 12.6825 10.25 16.3 10.25C17.1305 10.25 17.9249 10.4046 18.6559 10.6865C18.9362 10.7945 19.0763 10.8486 19.1632 10.789C19.25 10.7294 19.25 10.5863 19.25 10.3001L19.25 8.3L19.25 8.29785C19.246 6.90628 19.2237 5.7732 19.0721 4.86185C18.9171 3.92993 18.6159 3.15491 18.0026 2.52935C17.3237 1.83697 16.4635 1.53234 15.4164 1.38876Z',
  d9: 'M5.75 6C5.75 5.58579 6.08579 5.25 6.5 5.25H14.5C14.9142 5.25 15.25 5.58579 15.25 6C15.25 6.41421 14.9142 6.75 14.5 6.75H6.5C6.08579 6.75 5.75 6.41421 5.75 6Z',
  d10: 'M5.75 10C5.75 9.58579 6.08579 9.25 6.5 9.25H9.5C9.91421 9.25 10.25 9.58579 10.25 10C10.25 10.4142 9.91421 10.75 9.5 10.75H6.5C6.08579 10.75 5.75 10.4142 5.75 10Z',
  d11: 'M19 9.5V2L3 2V20.9985H9',
  d12: 'M9.75391 16.6512C9.75391 13.6678 12.1724 11.2494 15.1557 11.2494C18.139 11.2494 20.5574 13.6678 20.5574 16.6512C20.5574 17.7904 20.2048 18.8473 19.6026 19.7186L21.2499 21.3564L19.865 22.7494L18.2119 21.1058C17.3428 21.7032 16.2901 22.0529 15.1557 22.0529C12.1724 22.0529 9.75391 19.6345 9.75391 16.6512ZM15.1557 13.2137C13.2572 13.2137 11.7182 14.7527 11.7182 16.6512C11.7182 18.5496 13.2572 20.0886 15.1557 20.0886C17.0541 20.0886 18.5932 18.5496 18.5932 16.6512C18.5932 14.7527 17.0541 13.2137 15.1557 13.2137Z',
  d13: 'M2.96967 1.47028C3.11032 1.32963 3.30109 1.25061 3.5 1.25061H19.5C19.9142 1.25061 20.25 1.5864 20.25 2.00061V11.9944C18.9881 10.6146 17.1729 9.74915 15.1557 9.74915C11.3439 9.74915 8.25391 12.8392 8.25391 16.6509C8.25391 18.6702 9.12112 20.487 10.5034 21.7491H3.5C3.08579 21.7491 2.75 21.4133 2.75 20.9991V2.00061C2.75 1.8017 2.82902 1.61093 2.96967 1.47028ZM7.5 6.7511H15.5V5.2511H7.5V6.7511ZM7.5 10.7511H9.51145V9.2511H7.5V10.7511Z',
};

export const IconInvestigationStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-stroke-rounded IconInvestigationStrokeRounded"
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
        strokeLinecap="round" 
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

export const IconInvestigationDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-duotone-rounded IconInvestigationDuotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
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

export const IconInvestigationTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-twotone-rounded IconInvestigationTwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
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

export const IconInvestigationSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-solid-rounded IconInvestigationSolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInvestigationBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-bulk-rounded IconInvestigationBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d6} 
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
        d={d.d9} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconInvestigationStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-stroke-sharp IconInvestigationStrokeSharp"
    >
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
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
      />
    </TheIconWrapper>
  );
};

export const IconInvestigationSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="investigation-solid-sharp IconInvestigationSolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
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

export const iconPackOfInvestigation: TheIconSelfPack = {
  name: 'Investigation',
  StrokeRounded: IconInvestigationStrokeRounded,
  DuotoneRounded: IconInvestigationDuotoneRounded,
  TwotoneRounded: IconInvestigationTwotoneRounded,
  SolidRounded: IconInvestigationSolidRounded,
  BulkRounded: IconInvestigationBulkRounded,
  StrokeSharp: IconInvestigationStrokeSharp,
  SolidSharp: IconInvestigationSolidSharp,
};