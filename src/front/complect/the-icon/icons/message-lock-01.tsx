import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M22 13.4905C21.7253 17.7328 18.3866 21.1121 14.1951 21.3901C12.7652 21.485 11.2722 21.4848 9.84518 21.3901C9.35376 21.3575 8.81812 21.2405 8.3568 21.0509C7.84352 20.8399 7.58684 20.7344 7.45641 20.7504C7.32598 20.7664 7.13674 20.9057 6.75825 21.1842C6.09091 21.6753 5.25021 22.0281 4.00346 21.9978C3.37302 21.9825 3.0578 21.9748 2.91669 21.7347C2.77557 21.4946 2.95132 21.1622 3.30283 20.4974C3.79035 19.5754 4.09923 18.5199 3.63119 17.6742C2.82509 16.4662 2.14038 15.0356 2.04032 13.4905C1.98656 12.6603 1.98656 11.8005 2.04032 10.9703C2.31504 6.72801 5.65374 3.34876 9.84518 3.0707C10.7223 3.01252 11.6242 2.99002 12.5212 3.00335',
  d2: 'M8.5 14.9996H15.5M8.5 9.99963H12',
  d3: 'M16.7374 5.17553L16.7374 3.78517C16.7374 3.5798 16.746 3.37188 16.8196 3.1801C17.0155 2.66962 17.5346 2.00085 18.4795 2.00085C19.4245 2.00085 19.9639 2.66962 20.1598 3.1801C20.2335 3.37188 20.242 3.5798 20.242 3.78517L20.242 5.17553M16.8069 10.9984H20.1929C21.1898 10.9984 21.9979 10.1918 21.9979 9.19686V7.19551C21.9979 6.20053 21.1898 5.39394 20.1929 5.39394H16.8069C15.8101 5.39394 15.002 6.20053 15.002 7.19551V9.19686C15.002 10.1918 15.8101 10.9984 16.8069 10.9984Z',
  d4: 'M16.75 3.46111V5.16164C16.4637 5.17734 16.2587 5.2126 16.0803 5.29181C15.6515 5.48216 15.3108 5.84726 15.1332 6.30681C15 6.65147 15 7.0884 15 7.96226C15 8.83613 15 9.27306 15.1332 9.61772C15.3108 10.0773 15.6515 10.4424 16.0803 10.6327C16.4019 10.7755 16.8096 10.7755 17.625 10.7755H19.375C20.1904 10.7755 20.5981 10.7755 20.9197 10.6327C21.3201 10.455 21.6437 10.1248 21.8294 9.70775C21.8931 10.0471 21.937 10.3937 21.9598 10.7462C22.0134 11.5766 22.0134 12.4366 21.9598 13.267C21.6856 17.5104 18.3536 20.8906 14.1706 21.1686C12.7435 21.2636 11.2536 21.2634 9.8294 21.1686C9.33896 21.136 8.8044 21.019 8.34401 20.8294C7.83182 20.6183 7.5756 20.5128 7.44544 20.5288C7.31527 20.5448 7.1264 20.6841 6.74868 20.9627C6.08268 21.4539 5.24367 21.8068 3.99943 21.7765C3.37027 21.7612 3.05567 21.7535 2.91484 21.5133C2.77401 21.2732 2.94941 20.9407 3.30021 20.2757C3.78674 19.3535 4.09501 18.2977 3.62791 17.4518C2.82343 16.2435 2.1401 14.8125 2.04024 13.267C1.98659 12.4366 1.98659 11.5766 2.04024 10.7462C2.31441 6.50277 5.64639 3.12266 9.8294 2.84453C11.2536 2.74984 12.7435 2.74964 14.1706 2.84453C15.078 2.90486 15.9453 3.11116 16.7501 3.44058C16.75 3.44741 16.75 3.45426 16.75 3.46111Z',
  d5: 'M22 13.267C21.7253 17.5104 18.3866 20.8906 14.1951 21.1686C12.7652 21.2636 11.2722 21.2634 9.84518 21.1686C9.35376 21.136 8.81812 21.019 8.3568 20.8294C7.84352 20.6183 7.58684 20.5128 7.45641 20.5288C7.32598 20.5448 7.13674 20.6841 6.75825 20.9627C6.09091 21.4539 5.25021 21.8068 4.00346 21.7765C3.37302 21.7612 3.0578 21.7535 2.91669 21.5133C2.77557 21.2732 2.95132 20.9407 3.30283 20.2757C3.79035 19.3535 4.09923 18.2977 3.63119 17.4518C2.82509 16.2435 2.14038 14.8125 2.04032 13.267C1.98656 12.4366 1.98656 11.5766 2.04032 10.7462C2.31504 6.50277 5.65374 3.12266 9.84518 2.84453C10.7223 2.78633 11.6242 2.76383 12.5212 2.77716',
  d6: 'M16.7541 4.95104V3.56154C16.7541 3.35629 16.7627 3.1485 16.8361 2.95684C17.0315 2.44667 17.5491 1.77832 18.4914 1.77832C19.4338 1.77832 19.9717 2.44667 20.1671 2.95684C20.2405 3.1485 20.2491 3.35629 20.2491 3.56154V4.95104M16.8234 10.7704H20.2001C21.1942 10.7704 22.0001 9.96426 22.0001 8.9699V6.96978C22.0001 5.97541 21.1942 5.16932 20.2001 5.16932H16.8234C15.8293 5.16932 15.0234 5.97541 15.0234 6.96978V8.9699C15.0234 9.96426 15.8293 10.7704 16.8234 10.7704Z',
  d7: 'M8.5 14.7765H15.5M8.5 9.77527H12',
  d8: 'M22 13.4904C21.7253 17.7327 18.3866 21.112 14.1951 21.39C12.7652 21.4849 11.2722 21.4847 9.84518 21.39C9.35376 21.3574 8.81812 21.2404 8.3568 21.0508C7.84352 20.8398 7.58684 20.7343 7.45641 20.7503C7.32598 20.7663 7.13674 20.9056 6.75825 21.1841C6.09091 21.6752 5.25021 22.028 4.00346 21.9977C3.37302 21.9824 3.0578 21.9747 2.91669 21.7346C2.77557 21.4945 2.95132 21.1621 3.30283 20.4973C3.79035 19.5753 4.09923 18.5198 3.63119 17.6741C2.82509 16.4661 2.14038 15.0355 2.04032 13.4904C1.98656 12.6602 1.98656 11.8004 2.04032 10.9702C2.31504 6.72789 5.65374 3.34864 9.84518 3.07058C10.7223 3.0124 11.6242 2.9899 12.5212 3.00323',
  d9: 'M8.5 14.9995H15.5M8.5 9.99951H12',
  d10: 'M16.7374 5.17516L16.7374 3.7848C16.7374 3.57943 16.746 3.37151 16.8196 3.17974C17.0155 2.66925 17.5346 2.00049 18.4795 2.00049C19.4245 2.00049 19.9639 2.66925 20.1598 3.17974C20.2335 3.37151 20.242 3.57943 20.242 3.7848L20.242 5.17516M16.8069 10.9981H20.1929C21.1898 10.9981 21.9979 10.1915 21.9979 9.19649V7.19514C21.9979 6.20016 21.1898 5.39358 20.1929 5.39358H16.8069C15.8101 5.39358 15.002 6.20016 15.002 7.19514V9.19649C15.002 10.1915 15.8101 10.9981 16.8069 10.9981Z',
  d11: 'M21 4.74918V3.6875C21 2.31583 19.8548 1.25 18.5 1.25C17.1452 1.25 16 2.31583 16 3.6875V4.74918C15.9249 4.77196 15.8502 4.79929 15.7761 4.8322C15.1559 5.10744 14.6789 5.62765 14.4337 6.26203C14.3278 6.53595 14.2871 6.81726 14.2682 7.11392C14.25 7.39939 14.25 7.74715 14.25 8.16389V8.2111C14.25 8.62784 14.25 8.97561 14.2682 9.26108C14.2871 9.55774 14.3278 9.83905 14.4337 10.113C14.6789 10.7474 15.1559 11.2676 15.7761 11.5428C16.0484 11.6637 16.3272 11.7093 16.6128 11.7302C16.8844 11.75 17.2134 11.75 17.5989 11.75H19.4011C19.7866 11.75 20.1156 11.75 20.3872 11.7302C20.6728 11.7093 20.9516 11.6637 21.2239 11.5428C21.8441 11.2676 22.3211 10.7474 22.5663 10.113C22.6722 9.83905 22.7129 9.55774 22.7318 9.26108C22.75 8.97561 22.75 8.62785 22.75 8.2111V8.16392C22.75 7.74717 22.75 7.39939 22.7318 7.11392C22.7129 6.81726 22.6722 6.53595 22.5663 6.26203C22.3211 5.62765 21.8441 5.10744 21.2239 4.8322C21.1498 4.79929 21.0751 4.77196 21 4.74918ZM17.5 3.6875C17.5 3.19521 17.9218 2.75 18.5 2.75C19.0782 2.75 19.5 3.19521 19.5 3.6875V4.62501H17.5V3.6875Z',
  d12: 'M14.5654 2.45249C14.481 2.35159 14.2983 2.34287 13.933 2.32544C12.5888 2.26129 10.9877 2.24228 9.77965 2.32258C5.213 2.62614 1.58972 6.31243 1.2918 10.9222C1.23607 11.7846 1.23607 12.6767 1.2918 13.5391C1.40272 15.2555 2.15148 16.8039 2.98381 18.0603C3.23314 18.5418 3.10323 19.2639 2.6369 20.1476L2.61542 20.1883C2.45874 20.4851 2.30536 20.7756 2.21688 21.0232C2.12313 21.2857 2.02623 21.7023 2.26791 22.1144C2.48996 22.493 2.84475 22.6316 3.13152 22.6871C3.36961 22.7332 3.66155 22.7402 3.93544 22.7467L3.98117 22.7478C5.40092 22.7824 6.40136 22.3725 7.1938 21.7881L7.28907 21.7179C7.40859 21.63 7.46835 21.5861 7.54604 21.5765C7.62373 21.5668 7.69203 21.5946 7.82861 21.6503C7.89626 21.6779 7.97233 21.7092 8.05839 21.7446C8.59978 21.9676 9.21472 22.1012 9.77965 22.1387C11.2369 22.2356 12.7601 22.2358 14.2204 22.1387C18.787 21.8352 22.4103 18.1489 22.7082 13.5391C22.7106 13.5019 22.7129 13.4647 22.7151 13.4275C22.7366 13.062 22.7474 12.8793 22.6812 12.7913C22.6381 12.7341 22.5947 12.704 22.5261 12.6838C22.4204 12.6527 22.2244 12.7397 21.8324 12.9137C21.3373 13.1334 20.8656 13.199 20.4966 13.226C20.1695 13.2499 19.7934 13.2499 19.4375 13.2499H17.5625C17.2066 13.2499 16.8305 13.2499 16.5034 13.226C16.1344 13.199 15.6627 13.1334 15.1676 12.9137C14.1643 12.4684 13.415 11.6376 13.0346 10.6537C12.8502 10.1768 12.7946 9.72376 12.7712 9.35626C12.75 9.02257 12.75 8.63396 12.75 8.24566V8.12895C12.75 7.74066 12.75 7.35213 12.7712 7.01844C12.7946 6.65095 12.8502 6.19792 13.0346 5.72099C13.2913 5.05698 13.7161 4.46268 14.2735 4.00957C14.3899 3.91501 14.448 3.86773 14.4764 3.81497C14.5049 3.76221 14.5117 3.69351 14.5255 3.55612V3.55611C14.5371 3.43952 14.5527 3.29708 14.572 3.14905C14.6239 2.75194 14.6498 2.55339 14.5654 2.45249ZM8.5 15.75C8.08579 15.75 7.75 15.4142 7.75 15C7.75 14.5858 8.08579 14.25 8.5 14.25H15.5C15.9142 14.25 16.25 14.5858 16.25 15C16.25 15.4142 15.9142 15.75 15.5 15.75H8.5ZM8.5 10.75C8.08579 10.75 7.75 10.4142 7.75 10C7.75 9.58578 8.08579 9.25 8.5 9.25H11C11.4142 9.25 11.75 9.58578 11.75 10C11.75 10.4142 11.4142 10.75 11 10.75H8.5Z',
  d13: 'M13.933 2.32544C14.2983 2.34287 14.481 2.35159 14.5654 2.45249C14.6498 2.55339 14.6239 2.75194 14.572 3.14905C14.5527 3.29708 14.5371 3.43952 14.5255 3.55611C14.5117 3.69351 14.5049 3.76221 14.4764 3.81497C14.448 3.86773 14.3899 3.91501 14.2735 4.00957C13.7161 4.46268 13.2913 5.05698 13.0346 5.72099C12.8502 6.19792 12.7946 6.65095 12.7712 7.01844C12.75 7.35213 12.75 7.74066 12.75 8.12895V8.24566C12.75 8.63396 12.75 9.02257 12.7712 9.35626C12.7946 9.72376 12.8502 10.1768 13.0346 10.6537C13.415 11.6376 14.1643 12.4684 15.1676 12.9137C15.6627 13.1334 16.1344 13.199 16.5034 13.226C16.8305 13.2499 17.2066 13.2499 17.5625 13.2499H19.4375C19.7934 13.2499 20.1695 13.2499 20.4966 13.226C20.8656 13.199 21.3373 13.1334 21.8324 12.9137C22.2244 12.7397 22.4204 12.6527 22.5261 12.6838C22.5947 12.704 22.6381 12.7341 22.6812 12.7913C22.7474 12.8793 22.7366 13.062 22.7151 13.4275C22.7129 13.4647 22.7106 13.5019 22.7082 13.5391C22.4103 18.1489 18.787 21.8352 14.2204 22.1387C12.7601 22.2358 11.2369 22.2356 9.77965 22.1387C9.21472 22.1012 8.59978 21.9676 8.05839 21.7446C7.97233 21.7092 7.89626 21.6779 7.82861 21.6503C7.69203 21.5946 7.62373 21.5668 7.54604 21.5765C7.46835 21.5861 7.40859 21.63 7.28907 21.7179C7.25946 21.7397 7.22778 21.7631 7.1938 21.7881C6.40136 22.3725 5.40092 22.7824 3.98117 22.7478L3.93544 22.7467C3.66155 22.7402 3.36961 22.7332 3.13152 22.6871C2.84475 22.6316 2.48996 22.493 2.26791 22.1144C2.02623 21.7023 2.12313 21.2857 2.21688 21.0232C2.30536 20.7756 2.45874 20.4851 2.61542 20.1883L2.6369 20.1476C3.10323 19.2639 3.23314 18.5418 2.98381 18.0603C2.15148 16.8039 1.40272 15.2555 1.2918 13.5391C1.23607 12.6767 1.23607 11.7846 1.2918 10.9222C1.58972 6.31243 5.213 2.62614 9.77965 2.32258C10.9877 2.24228 12.5888 2.26129 13.933 2.32544Z',
  d14: 'M7.75 15C7.75 15.4142 8.08579 15.75 8.5 15.75H15.5C15.9142 15.75 16.25 15.4142 16.25 15C16.25 14.5858 15.9142 14.25 15.5 14.25H8.5C8.08579 14.25 7.75 14.5858 7.75 15ZM7.75 10C7.75 10.4142 8.08579 10.75 8.5 10.75H11C11.4142 10.75 11.75 10.4142 11.75 10C11.75 9.58579 11.4142 9.25 11 9.25H8.5C8.08579 9.25 7.75 9.58579 7.75 10Z',
  d15: 'M20.4026 5.49035V3.99448C20.4026 2.89296 19.5119 2 18.4131 2C17.3143 2 16.4235 2.89296 16.4235 3.99448V5.49035M14.9314 5.49035H21.8948V10.9752H14.9314V5.49035Z',
  d16: 'M7.47064 14.9637H16.4235M7.47064 9.97754H11.9471',
  d17: 'M9.74819 2.98729C2.13647 3.91011 -0.0376155 12.9591 3.63408 17.9493L2.03535 21.8632C2.00347 21.9436 2.08134 22.024 2.16145 21.9933L6.45301 20.4807C9.24503 21.8632 13.7988 21.961 17.0362 20.6544C18.4973 19.7568 21.327 18.4659 21.8862 13.5605M9.74819 2.98729C9.90094 2.97839 10.0554 2.97388 10.2114 2.97388M9.74819 2.98729L11.0996 2.9824L12.688 2.98729',
  d18: 'M13 13H22.7482C22.7459 13.2593 22.7404 13.4583 22.7278 13.6405C22.4082 18.2443 18.7443 21.9082 14.1405 22.2278C13.8204 22.25 13.4486 22.25 12.7895 22.25H11.2105C10.5514 22.25 10.1796 22.25 9.85949 22.2278C8.63831 22.143 7.48219 21.8226 6.43709 21.3113L1.47483 22.75L2.77921 18.0954C1.92471 16.8022 1.38603 15.2804 1.2722 13.6405C1.24999 13.3205 1.24999 12.9486 1.25 12.2895V12.2895V12.2105V12.2104C1.24999 11.5514 1.24999 11.1795 1.2722 10.8595C1.59176 6.25571 5.25571 2.59176 9.85949 2.2722C10.1795 2.24999 10.5514 2.24999 11.2105 2.25H11.2105H12.7895H12.7896C13.4486 2.24999 13.8204 2.24999 14.1405 2.2722C14.3815 2.28893 14.6198 2.31482 14.8553 2.34952C14.6928 2.70792 14.5815 3.09454 14.5309 3.5H13V13ZM7.5 14.25H16.5V15.75H7.5V14.25ZM7.5 9.25H11V10.75H7.5V9.25Z',
  d19: 'M18.5 1.25C16.9812 1.25 15.75 2.48122 15.75 4V4.75H14.25V11.75H22.75V4.75H21.25V4C21.25 2.48122 20.0188 1.25 18.5 1.25ZM19.75 4V4.75H17.25V4C17.25 3.30964 17.8096 2.75 18.5 2.75C19.1904 2.75 19.75 3.30964 19.75 4Z',
};

export const IconMessageLock01StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-stroke-rounded IconMessageLock01StrokeRounded"
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
    </TheIconWrapper>
  );
};

export const IconMessageLock01DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-duotone-rounded IconMessageLock01DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d4} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d5} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
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
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageLock01TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-twotone-rounded IconMessageLock01TwotoneRounded"
    >
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
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageLock01SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-solid-rounded IconMessageLock01SolidRounded"
    >
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
    </TheIconWrapper>
  );
};

export const IconMessageLock01BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-bulk-rounded IconMessageLock01BulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d11} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
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

export const IconMessageLock01StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-stroke-sharp IconMessageLock01StrokeSharp"
    >
      <path 
        d={d.d15} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
      <path 
        d={d.d16} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d17} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconMessageLock01SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="message-lock-01-solid-sharp IconMessageLock01SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d18} 
        fill="var(--icon-fill)" 
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d19} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfMessageLock01: TheIconSelfPack = {
  name: 'MessageLock01',
  StrokeRounded: IconMessageLock01StrokeRounded,
  DuotoneRounded: IconMessageLock01DuotoneRounded,
  TwotoneRounded: IconMessageLock01TwotoneRounded,
  SolidRounded: IconMessageLock01SolidRounded,
  BulkRounded: IconMessageLock01BulkRounded,
  StrokeSharp: IconMessageLock01StrokeSharp,
  SolidSharp: IconMessageLock01SolidSharp,
};