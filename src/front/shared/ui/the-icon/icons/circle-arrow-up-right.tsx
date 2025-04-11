import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M14.7731 9.22687L9 15M14.7731 9.22687C14.2678 8.72156 11.8846 9.21665 11.1649 9.22687M14.7731 9.22687C15.2784 9.73219 14.7834 12.1154 14.7731 12.8351',
  d2: 'M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12.9764 12.4378L13.091 12.5523C13.2963 12.7578 13.5135 12.9751 13.7055 13.126C13.8454 13.2361 14.3618 13.6397 15.0046 13.4213C15.648 13.2028 15.7878 12.5751 15.8252 12.4053C15.8767 12.1714 15.9048 11.8704 15.9313 11.5857L15.9313 11.5857L15.9358 11.5368C15.9778 11.0883 16.0148 10.5671 15.9941 10.1024C15.9837 9.87025 15.9577 9.6158 15.8958 9.37332C15.8383 9.14853 15.7218 8.81922 15.4513 8.54869C15.1808 8.27815 14.8515 8.16171 14.6267 8.10425C14.3842 8.04226 14.1298 8.01628 13.8976 8.00593C13.4329 7.9852 12.9117 8.02223 12.4632 8.06416L12.4143 8.06872L12.4143 8.06872C12.1296 8.09524 11.8286 8.12328 11.5947 8.17478C11.4249 8.21219 10.7972 8.35203 10.5787 8.99535C10.3603 9.63816 10.7639 10.1546 10.874 10.2945C11.0249 10.4865 11.2423 10.7037 11.4477 10.909L11.5622 11.0236L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071Z',
  d3: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z',
  d4: 'M9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L11.5622 11.0236L11.4477 10.909C11.2423 10.7037 11.0249 10.4865 10.874 10.2945C10.7639 10.1546 10.3603 9.63816 10.5787 8.99535C10.7972 8.35203 11.4249 8.21219 11.5947 8.17478C11.8286 8.12327 12.1296 8.09524 12.4143 8.06872L12.4632 8.06416C12.9117 8.02223 13.4329 7.9852 13.8976 8.00593C14.1298 8.01628 14.3842 8.04227 14.6267 8.10425C14.8515 8.16171 15.1808 8.27815 15.4513 8.54869C15.7218 8.81922 15.8383 9.14853 15.8958 9.37332C15.9577 9.6158 15.9837 9.87025 15.9941 10.1023C16.0148 10.5671 15.9778 11.0883 15.9358 11.5368L15.9313 11.5857C15.9048 11.8704 15.8767 12.1714 15.8252 12.4053C15.7878 12.5751 15.648 13.2028 15.0046 13.4213C14.3618 13.6397 13.8454 13.2361 13.7055 13.126C13.5135 12.9751 13.2963 12.7578 13.091 12.5523L12.9764 12.4378L9.70711 15.7071Z',
  d5: 'M9 15L14.7339 9.26613M10 9H15V14',
  d6: 'M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM9.88971 9.85938H13.079L8.35938 14.579L9.42004 15.6397L14.1397 10.92V14.1094H15.6397V8.35938H9.88971V9.85938Z',
};

export const IconCircleArrowUpRightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight StrokeRounded"
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

export const IconCircleArrowUpRightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight DuotoneRounded"
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

export const IconCircleArrowUpRightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight TwotoneRounded"
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

export const IconCircleArrowUpRightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight SolidRounded"
    >
      <path 
        d={d.d2}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconCircleArrowUpRightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight BulkRounded"
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

export const IconCircleArrowUpRightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight StrokeSharp"
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

export const IconCircleArrowUpRightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="CircleArrowUpRight SolidSharp"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfCircleArrowUpRight: TheIconSelfPack = [
  'CircleArrowUpRight',
  IconCircleArrowUpRightStrokeRounded,
  IconCircleArrowUpRightDuotoneRounded,
  IconCircleArrowUpRightTwotoneRounded,
  IconCircleArrowUpRightSolidRounded,
  IconCircleArrowUpRightBulkRounded,
  IconCircleArrowUpRightStrokeSharp,
  IconCircleArrowUpRightSolidSharp,
];