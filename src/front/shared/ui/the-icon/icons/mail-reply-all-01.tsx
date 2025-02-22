import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.9999 11.026C21.9999 10.5331 21.9946 10.0403 21.9841 9.54591C21.9188 6.47099 21.8861 4.93353 20.755 3.79462C19.6238 2.65571 18.0496 2.61603 14.9011 2.53668C12.9606 2.48778 11.0392 2.48777 9.09871 2.53667C5.95022 2.61602 4.37597 2.65569 3.24484 3.7946C2.11371 4.93351 2.08103 6.47097 2.01565 9.5459C1.99463 10.5346 1.99464 11.5175 2.01566 12.5062C2.08103 15.5811 2.11372 17.1186 3.24485 18.2575C4.30187 19.3218 5.74586 19.4261 8.49989 19.5',
  d2: 'M1.99989 5L8.91291 8.92462C11.4386 10.3585 12.5612 10.3585 15.0869 8.92462L21.9999 5',
  d3: 'M13.4999 18.5C12.9942 18.0085 10.9999 16.7002 10.9999 16C10.9999 15.2998 12.9942 13.9915 13.4999 13.5',
  d4: 'M22.0001 21.5001C21.884 18.9755 21.9869 18.0571 20.3438 16.879C19.5362 16.3 17.9115 15.9186 15.7177 16.1245M17.4519 13.5925L15.1552 15.7462C14.9611 15.9404 14.9597 16.2558 15.1519 16.4518L17.4519 18.6399',
  d5: 'M9.09881 19.5485C11.0393 19.5959 12.9607 19.5959 14.9012 19.5485C18.0497 19.4717 19.6239 19.4333 20.755 18.3317C21.8862 17.2299 21.9189 15.7426 21.9842 12.768C22.0053 11.8116 22.0053 10.8607 21.9842 9.90425C21.9392 7.85509 21.9097 6.51175 21.5259 5.51404L12 10.3658L2.47409 5.51404C2.0903 6.51175 2.06078 7.85509 2.01574 9.90423C1.99472 10.8607 1.99473 11.8115 2.01575 12.7679C2.08112 15.7426 2.11381 17.2299 3.24494 18.3317C4.37606 19.4333 5.95031 19.4717 9.09881 19.5485Z',
  d6: 'M22 11.0675C22 10.5721 21.9947 10.0769 21.9842 9.58002C21.9189 6.48973 21.8862 4.94459 20.7551 3.79999C19.6239 2.65539 18.0497 2.61551 14.9012 2.53576C12.9607 2.48662 11.0393 2.48661 9.0988 2.53575C5.95031 2.6155 4.37606 2.65537 3.24493 3.79997C2.1138 4.94457 2.08112 6.48972 2.01574 9.58001C1.99472 10.5737 1.99473 11.5615 2.01575 12.5551C2.08112 15.6454 2.11381 17.1906 3.24494 18.3351C4.30196 19.4048 5.74595 19.5096 8.49998 19.5839',
  d7: 'M1.99998 5.0116L8.913 8.95583C11.4387 10.3969 12.5613 10.3969 15.087 8.95583L22 5.0116',
  d8: 'M21.9953 21.5011C21.8792 18.964 21.9821 18.0409 20.339 16.857C19.5314 16.2751 17.9067 15.8917 15.7129 16.0987M17.4471 13.5541L15.1504 15.7184C14.9563 15.9136 14.9549 16.2307 15.1471 16.4277L17.4471 18.6266',
  d9: 'M13.5 18.5791C12.9943 18.0851 11 16.7703 11 16.0666C11 15.3629 12.9943 14.048 13.5 13.5541',
  d10: 'M21.9872 11.026C21.9872 10.5331 21.9819 10.0403 21.9714 9.54591C21.9061 6.47099 21.8734 4.93353 20.743 3.79462C19.6124 2.65571 18.0391 2.61603 14.8923 2.53668C12.9529 2.48778 11.0326 2.48777 9.09319 2.53667C5.94645 2.61602 4.37308 2.65569 3.24258 3.7946C2.11209 4.93351 2.07942 6.47097 2.01408 9.5459C1.99307 10.5346 1.99308 11.5175 2.01409 12.5062C2.07942 15.5811 2.1121 17.1186 3.24259 18.2575C4.29902 19.3218 5.74221 19.4261 8.4947 19.5',
  d11: 'M1.99833 5L8.90749 8.92462C11.4318 10.3585 12.5537 10.3585 15.078 8.92462L21.9872 5',
  d12: 'M13.4921 18.5C12.9866 18.0085 10.9934 16.7002 10.9934 16C10.9934 15.2998 12.9866 13.9915 13.4921 13.5',
  d13: 'M21.9868 21.5001C22.0876 18.8419 21.6998 17.7467 20.0576 16.5686C19.2505 15.9896 17.1725 15.8646 14.9798 16.0706M17.4898 13.4883L15.1246 15.5597C14.9306 15.754 14.9324 16.3726 15.1246 16.5686L17.4629 18.5056',
  d14: 'M9.1927 1.66196C11.1485 1.61269 12.6015 1.61268 14.5573 1.66195L14.6321 1.66384C16.1415 1.70182 17.3834 1.73308 18.3843 1.90787C18.7546 1.97254 19.1039 2.05855 19.4337 2.17529C19.5214 2.19599 19.6055 2.22842 19.684 2.27145C20.1999 2.4861 20.6663 2.78687 21.0896 3.21302C21.8391 3.96738 22.1979 4.84635 22.3797 5.89605C22.5503 6.88117 22.5762 8.09688 22.6074 9.56819L22.609 9.64387C22.6221 10.2595 22.6272 10.6977 22.6242 11.1765C22.6207 11.7305 22.1618 12.17 21.6101 12.1582C21.0583 12.1464 20.6228 11.6878 20.6259 11.1337C20.6283 10.6852 20.6234 10.2704 20.611 9.68659C20.595 8.93443 20.5808 8.29826 20.5548 7.74953C20.5354 7.34242 20.5257 7.13885 20.3789 7.05758C20.2321 6.97631 20.0515 7.07899 19.6905 7.28436L15.4548 9.69392C14.1551 10.4332 13.056 10.9117 11.8748 10.9117C10.6936 10.9117 9.59446 10.4332 8.29485 9.69392L4.05945 7.28457C3.69843 7.07921 3.51792 6.97652 3.37108 7.05779C3.22424 7.13906 3.21457 7.34263 3.19523 7.74976C3.16916 8.29844 3.15503 8.93453 3.13903 9.68659C3.11833 10.66 3.11834 11.1635 3.13905 12.1369C3.17236 13.7031 3.19761 14.7663 3.33932 15.5846C3.47276 16.3551 3.69538 16.8128 4.07622 17.1961C4.4531 17.5755 4.91527 17.8028 5.70855 17.9414C6.29211 18.0433 6.99929 18.0888 7.91605 18.1207C8.45718 18.1395 8.88886 18.5825 8.88886 19.1259C8.88886 19.6894 8.4261 20.1438 7.86503 20.1244C6.90471 20.0912 6.07474 20.0394 5.36566 19.9156C4.30329 19.7301 3.41378 19.3688 2.66037 18.6105C1.91092 17.8561 1.55207 16.9771 1.37027 15.9274C1.19966 14.9423 1.17384 13.7266 1.1426 12.2553L1.14099 12.1796C1.11968 11.1777 1.11967 10.6457 1.14097 9.64386L1.14258 9.56817C1.17383 8.09683 1.19965 6.88118 1.37026 5.89605C1.55205 4.84634 1.9109 3.96737 2.66036 3.21302C3.41376 2.45469 4.30328 2.09339 5.36564 1.90787C6.36661 1.73308 7.60849 1.70182 9.11785 1.66384L9.1927 1.66196Z',
  d15: 'M14.0921 12.678C14.477 13.074 14.468 13.7071 14.072 14.0921L12.5818 15.3097C12.3305 15.5227 12.1248 15.7146 11.9831 15.875C12.1248 16.0354 12.3305 16.2273 12.5818 16.4403L14.072 17.6579C14.468 18.0429 14.477 18.676 14.0921 19.072C13.7071 19.468 13.074 19.477 12.678 19.0921C12.4364 18.9024 11.5638 18.1991 11.2889 17.9662C10.9951 17.7173 10.6811 17.4313 10.4332 17.1403C10.3089 16.9944 10.1809 16.8237 10.08 16.6351C9.98331 16.4545 9.875 16.1902 9.875 15.875C9.875 15.5598 9.98331 15.2955 10.08 15.1149C10.1809 14.9263 10.3089 14.7556 10.4332 14.6097C10.6811 14.3187 10.9951 14.0327 11.2889 13.7838C11.2889 13.7838 12.5985 12.7352 12.678 12.6579C13.074 12.273 13.7071 12.282 14.0921 12.678Z',
  d16: 'M22.875 19.875V21.375C22.875 21.9273 22.4273 22.375 21.875 22.375C21.3227 22.375 20.875 21.9273 20.875 21.375V19.875C20.875 18.3885 19.7939 17.1545 18.375 16.9165V18.3754C18.3749 18.6265 18.2809 18.8777 18.0921 19.072C17.7071 19.468 17.074 19.477 16.678 19.0921C16.4364 18.9024 15.5638 18.1991 15.2889 17.9662C14.9951 17.7173 14.6811 17.4313 14.4332 17.1403C14.3089 16.9944 14.1809 16.8237 14.08 16.6351C13.9833 16.4545 13.875 16.1902 13.875 15.875C13.875 15.5598 13.9833 15.2955 14.08 15.1149C14.1809 14.9263 14.3089 14.7556 14.4332 14.6097C14.6811 14.3187 14.9951 14.0327 15.2889 13.7838C15.5638 13.5509 16.4364 12.8476 16.678 12.6579C17.074 12.273 17.7071 12.282 18.0921 12.678C18.2809 12.8723 18.3749 13.1235 18.375 13.3746V14.8997C20.9017 15.1506 22.875 17.2823 22.875 19.875Z',
  d17: 'M22 13V2.5H2V19.5H9',
  d18: 'M2 6L12 11L22 6',
  d19: 'M13.5 18.5L11 16L13.5 13.5',
  d20: 'M21.9723 21.4996C21.9723 21.0635 22.2762 18.6275 20.8725 17.2087C19.3143 15.6337 16.7597 16.0644 15.4853 16.0573M17.5004 13.543L15.0029 16.0157L17.5004 18.5255',
  d21: 'M1.25006 3.22368C1.25006 2.68593 1.6876 2.25 2.22733 2.25H21.7728C22.3125 2.25 22.7501 2.68593 22.7501 3.22368V14H20.796V8.10217L12.0004 12.5L3.20514 8.1024V18.8026H8.00006V20.75H2.22733C1.6876 20.75 1.25006 20.3141 1.25006 19.7763V3.22368Z',
  d22: 'M13.9572 15.4571L12.543 14.0428L9.33591 17.25L12.543 20.4571L13.9572 19.0428L12.1643 17.25L13.9572 15.4571Z',
  d23: 'M17.9572 15.4571L16.543 14.0428L13.3359 17.25L16.543 20.4571L17.9572 19.0428L17.1643 18.25H17.7501C19.407 18.25 20.7501 19.5931 20.7501 21.25V21.75H22.7501V21.25C22.7501 18.4885 20.5115 16.25 17.7501 16.25H17.1643L17.9572 15.4571Z',
};

export const IconMailReplyAll01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-stroke-rounded IconMailReplyAll01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-duotone-rounded IconMailReplyAll01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d6} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-twotone-rounded IconMailReplyAll01TwotoneRounded"
    >
      <path 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d11} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d12} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-solid-rounded IconMailReplyAll01SolidRounded"
    >
      <path 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-bulk-rounded IconMailReplyAll01BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d14} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d15} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d16} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-stroke-sharp IconMailReplyAll01StrokeSharp"
    >
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d18} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d19} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d20} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMailReplyAll01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="mail-reply-all-01-solid-sharp IconMailReplyAll01SolidSharp"
    >
      <path 
        d={d.d21} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d22} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d23} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMailReplyAll01: TheIconSelfPack = {
  name: 'MailReplyAll01',
  StrokeRounded: IconMailReplyAll01StrokeRounded,
  DuotoneRounded: IconMailReplyAll01DuotoneRounded,
  TwotoneRounded: IconMailReplyAll01TwotoneRounded,
  SolidRounded: IconMailReplyAll01SolidRounded,
  BulkRounded: IconMailReplyAll01BulkRounded,
  StrokeSharp: IconMailReplyAll01StrokeSharp,
  SolidSharp: IconMailReplyAll01SolidSharp,
};