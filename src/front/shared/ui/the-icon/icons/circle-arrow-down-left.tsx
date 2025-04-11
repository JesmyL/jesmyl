import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M9.22687 14.7731L15 9M9.22687 14.7731C9.73219 15.2784 12.1154 14.7834 12.8351 14.7731M9.22687 14.7731C8.72156 14.2678 9.21665 11.8846 9.22687 11.1649',
  d2: 'M12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75ZM15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L11.0236 11.5622L10.909 11.4477C10.7037 11.2422 10.4865 11.0249 10.2945 10.874C10.1546 10.7639 9.63816 10.3603 8.99535 10.5787C8.35203 10.7972 8.21219 11.4249 8.17478 11.5947C8.12328 11.8286 8.09524 12.1296 8.06872 12.4143L8.06872 12.4143L8.06416 12.4632C8.02223 12.9117 7.9852 13.4329 8.00593 13.8976C8.01628 14.1298 8.04227 14.3842 8.10425 14.6267C8.16171 14.8515 8.27815 15.1808 8.54869 15.4513C8.81922 15.7218 9.14853 15.8383 9.37332 15.8958C9.6158 15.9577 9.87025 15.9837 10.1024 15.9941C10.5671 16.0148 11.0883 15.9778 11.5368 15.9358L11.5857 15.9313L11.5857 15.9313C11.8704 15.9048 12.1714 15.8767 12.4053 15.8252C12.5751 15.7878 13.2028 15.648 13.4213 15.0046C13.6397 14.3618 13.2361 13.8454 13.126 13.7055C12.9751 13.5135 12.7577 13.2963 12.5523 13.091L12.4378 12.9764L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289Z',
  d3: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12Z',
  d4: 'M14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L12.4378 12.9764L12.5523 13.091C12.7577 13.2963 12.9751 13.5135 13.126 13.7055C13.2361 13.8454 13.6397 14.3618 13.4213 15.0046C13.2028 15.648 12.5751 15.7878 12.4053 15.8252C12.1714 15.8767 11.8704 15.9048 11.5857 15.9313L11.5368 15.9358C11.0883 15.9778 10.5671 16.0148 10.1024 15.9941C9.87025 15.9837 9.6158 15.9577 9.37332 15.8958C9.14853 15.8383 8.81922 15.7218 8.54869 15.4513C8.27815 15.1808 8.16171 14.8515 8.10425 14.6267C8.04227 14.3842 8.01628 14.1298 8.00593 13.8977C7.9852 13.4329 8.02223 12.9117 8.06416 12.4632L8.06872 12.4143C8.09524 12.1296 8.12328 11.8286 8.17478 11.5947C8.21219 11.4249 8.35203 10.7972 8.99535 10.5787C9.63816 10.3603 10.1546 10.7639 10.2945 10.874C10.4865 11.0249 10.7037 11.2422 10.909 11.4477L11.0236 11.5622L14.2929 8.29289Z',
  d5: 'M15 9L9.24887 14.7511M14 15H9V10',
  d6: 'M22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12ZM14.1103 14.1406H10.921L15.6406 9.42096L14.58 8.36029L9.86029 13.08V9.89062H8.36029V15.6406H14.1103V14.1406Z',
};

export const IconCircleArrowDownLeftStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft StrokeRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft DuotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="f o7"
      />
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft TwotoneRounded"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sw"
      />
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft BulkRounded"
    >
      <path 
        d={d.d3}
        i-c="f o7"
      />
      <path 
        d={d.d4}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft StrokeSharp"
    >
      <circle 
        cx="12"
        cy="12"
        r="10"
        i-c="s sj sw"
      />
      <path 
        d={d.d5}
        i-c="s sw"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowDownLeftSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowDownLeft SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowDownLeft: TheIconSelfPack = [
  'CircleArrowDownLeft',
  IconCircleArrowDownLeftStrokeRounded,
  IconCircleArrowDownLeftDuotoneRounded,
  IconCircleArrowDownLeftTwotoneRounded,
  IconCircleArrowDownLeftSolidRounded,
  IconCircleArrowDownLeftBulkRounded,
  IconCircleArrowDownLeftStrokeSharp,
  IconCircleArrowDownLeftSolidSharp,
];