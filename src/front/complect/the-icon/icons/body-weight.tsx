import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M12.0018 14.0034V12.3621M12.0018 14.0034C10.3356 14.0034 8.66947 13.821 7.00329 13.4565M12.0018 14.0034C13.6684 14.0034 15.3351 13.8212 17.0018 13.4565M7.00329 13.4565C5.7284 13.1776 4.45352 12.7918 3.17863 12.2995C2.66907 12.1026 2.41429 12.0042 2.23947 11.7788C1.94941 11.4049 2.00183 10.8841 2.00183 10.4387C2.00183 9.20572 2.00183 7.58804 2.30263 7.26609C2.87209 6.65661 3.95918 7.21761 4.59146 7.42272C9.53171 9.02529 14.4719 9.02529 19.4122 7.42272C20.0444 7.21761 21.1315 6.65661 21.701 7.26609C22.0018 7.58804 22.0018 9.20572 22.0018 10.4387C22.0018 11.0571 22.0018 11.3663 21.8658 11.6217C21.6568 12.0141 21.2154 12.1487 20.825 12.2995C19.5506 12.7916 18.2762 13.1776 17.0018 13.4565M7.00329 13.4565L7.00183 11.8149M17.0018 13.4565V11.8149',
  d2: 'M19.0021 19.0093C14.3354 20.3455 9.66871 20.3455 5.00204 19.0093',
  d3: 'M19.1906 2.99768C18.6137 4.30901 18.0835 6.55702 18.0835 7.58736M4.81504 2.99768C5.39198 4.30901 5.92213 6.55702 5.92213 7.58736M5.39873 15.5103C4.9599 16.8912 3.80011 19.6214 4.00386 21.0022M18.6138 15.5103C19.0527 16.8912 20.2125 19.6214 20.0087 21.0022',
  d4: 'M4.59451 7.42611C9.53475 9.02681 14.475 9.02681 19.4153 7.42611C20.0476 7.22124 21.1347 6.66091 21.7041 7.26967C22.0049 7.59125 22.0049 9.20702 22.0049 10.4386C22.0049 11.0562 22.0049 11.365 21.8689 11.6201C21.6599 12.0121 21.2185 12.1465 20.8281 12.2971C19.5537 12.7888 18.2793 13.1742 17.0049 13.4528C15.3383 13.8172 13.6716 13.999 12.0049 13.999C10.3387 13.999 8.67253 13.817 7.00634 13.4528C5.73146 13.1742 4.45657 12.7889 3.18169 12.2971C2.67212 12.1005 2.41733 12.0022 2.24251 11.7771C1.95246 11.4036 2.00489 10.8835 2.00489 10.4386C2.00489 9.20702 2.00488 7.59125 2.30568 7.26967C2.87513 6.66091 3.96223 7.22124 4.59451 7.42611Z',
  d5: 'M12.0049 13.9971V12.3578M12.0049 13.9971C10.3387 13.9971 8.67253 13.815 7.00634 13.4509M12.0049 13.9971C13.6716 13.9971 15.3383 13.8152 17.0049 13.4509M7.00634 13.4509C5.73146 13.1722 4.45657 12.787 3.18169 12.2952C2.67212 12.0986 2.41733 12.0003 2.24251 11.7752C1.95246 11.4016 2.00489 10.8815 2.00489 10.4366C2.00489 9.20507 2.00488 7.58929 2.30568 7.26772C2.87513 6.65895 3.96223 7.21929 4.59451 7.42416C9.53475 9.02486 14.475 9.02485 19.4153 7.42416C20.0476 7.21929 21.1347 6.65895 21.7041 7.26772C22.0049 7.58929 22.0049 9.20507 22.0049 10.4366C22.0049 11.0542 22.0049 11.363 21.8689 11.6182C21.6599 12.0101 21.2185 12.1445 20.8281 12.2952C19.5537 12.7868 18.2793 13.1722 17.0049 13.4509M7.00634 13.4509L7.00489 11.8112M17.0049 13.4509V11.8112',
  d6: 'M19.192 2.99805C18.6151 4.30938 18.0849 6.55739 18.0849 7.58773M4.81641 2.99805C5.39335 4.30938 5.9235 6.55739 5.9235 7.58773M5.4001 15.5107C4.96127 16.8916 3.80148 19.6218 4.00523 21.0026M18.6152 15.5107C19.0541 16.8916 20.2139 19.6218 20.0101 21.0026',
  d7: 'M19.0047 19C14.338 20.3333 9.67134 20.3333 5.00467 19',
  d8: 'M12.0039 13.999V12.3597M12.0039 13.999C10.3377 13.999 8.67155 13.817 7.00536 13.4528M12.0039 13.999C13.6706 13.999 15.3373 13.8172 17.0039 13.4528M7.00536 13.4528C5.73048 13.1742 4.45559 12.7889 3.18071 12.2971C2.67114 12.1005 2.41636 12.0022 2.24154 11.7771C1.95149 11.4036 2.00391 10.8835 2.00391 10.4386C2.00391 9.20702 2.00391 7.59125 2.30471 7.26967C2.87416 6.66091 3.96125 7.22124 4.59353 7.42611C9.53378 9.02681 14.474 9.02681 19.4143 7.42611C20.0466 7.22124 21.1337 6.66091 21.7031 7.26967C22.0039 7.59125 22.0039 9.20702 22.0039 10.4386C22.0039 11.0562 22.0039 11.365 21.8679 11.6201C21.6589 12.0121 21.2175 12.1465 20.8271 12.2971C19.5527 12.7888 18.2783 13.1742 17.0039 13.4528M7.00536 13.4528L7.00391 11.8132M17.0039 13.4528V11.8132',
  d9: 'M19.188 2.99768C18.6111 4.30901 18.0809 6.55702 18.0809 7.58736M4.81241 2.99768C5.38935 4.30901 5.91951 6.55702 5.91951 7.58736M5.3961 15.5103C4.95727 16.8912 3.79749 19.6214 4.00123 21.0022M18.6112 15.5103C19.0501 16.8912 20.2098 19.6214 20.0061 21.0022M18.802 19.0186C14.1353 20.3548 9.4687 20.3548 4.80203 19.0186',
  d10: 'M4.82151 6.71007C9.61148 8.26208 14.3899 8.26208 19.1799 6.71007C19.3889 6.6349 20.1617 6.36212 20.4233 6.30657C20.9117 6.20287 21.6816 6.14962 22.2476 6.75477C22.3824 6.89884 22.4577 7.06431 22.5021 7.18353C22.5499 7.3121 22.5841 7.44911 22.6098 7.58056C22.6613 7.84334 22.692 8.15122 22.7116 8.46326C22.7507 9.08488 22.7507 9.81559 22.7507 10.4226C22.7507 10.7068 22.7507 11.0101 22.7306 11.2309C22.7085 11.4733 22.6585 11.7229 22.5265 11.9704C22.3301 12.3388 22.0344 12.561 21.7725 12.7044C21.57 12.8153 21.2548 12.9339 21.0939 12.9943C20.2271 13.3287 19.3591 13.6157 18.49 13.8548C18.1547 13.9471 17.987 13.9932 17.8689 13.9031C17.7507 13.8131 17.7507 13.6363 17.7507 13.2828V11.8105C17.7507 11.3963 17.4149 11.0605 17.0007 11.0605C16.5865 11.0605 16.2507 11.3963 16.2507 11.8105V13.8627C16.2507 14.1036 16.2507 14.2241 16.1789 14.3082C16.1071 14.3924 15.9901 14.411 15.7561 14.4482C14.9609 14.5746 14.1653 14.6608 13.3694 14.7069C13.0824 14.7235 12.9389 14.7318 12.8448 14.643C12.7507 14.5542 12.7507 14.4079 12.7507 14.1153V12.3571C12.7507 11.9429 12.4149 11.6071 12.0007 11.6071C11.5865 11.6071 11.2507 11.9429 11.2507 12.3571V14.1152C11.2507 14.4079 11.2507 14.5542 11.1566 14.643C11.0625 14.7318 10.919 14.7235 10.632 14.7068C9.83643 14.6607 9.04122 14.5744 8.24645 14.4481C8.01259 14.4109 7.89566 14.3923 7.82385 14.3082C7.75204 14.2241 7.75197 14.1037 7.75184 13.8629L7.75071 11.8101C7.75048 11.3959 7.41451 11.0603 7.00029 11.0605C6.58608 11.0608 6.25048 11.3967 6.25071 11.811L6.25152 13.2825C6.25171 13.6361 6.25181 13.813 6.13364 13.9031C6.01547 13.9932 5.84775 13.9471 5.51229 13.8548C4.64293 13.6157 3.77467 13.3288 2.90756 12.9943C2.49659 12.8375 1.953 12.6299 1.64598 12.2346C1.3802 11.8923 1.29479 11.511 1.26445 11.2064C1.24259 10.987 1.24793 10.5985 1.2507 10.4227C1.2507 9.81569 1.2507 9.08492 1.28978 8.46326C1.3094 8.15122 1.34012 7.84334 1.39159 7.58056C1.41734 7.44911 1.45146 7.3121 1.49931 7.18353C1.54367 7.06431 1.61902 6.89884 1.75378 6.75477C2.31985 6.14962 3.08971 6.20287 3.57813 6.30657C3.83974 6.36212 4.6125 6.6349 4.82151 6.71007Z',
  d11: 'M4.48389 2.05147C5.00784 1.87682 5.57416 2.15998 5.7488 2.68392C6.0293 3.5254 6.6655 4.77481 6.92558 7.47733C6.97848 8.02708 6.57571 8.51562 6.02597 8.56853C5.47622 8.62143 4.98768 8.21866 4.93477 7.66892C4.70269 5.25727 4.18146 4.30643 3.85144 3.31638C3.67679 2.79243 3.95995 2.22611 4.48389 2.05147ZM19.5163 2.05147C20.0403 2.22611 20.3235 2.79243 20.1488 3.31638C19.8188 4.30643 19.2976 5.25727 19.0655 7.66892C19.0126 8.21866 18.524 8.62143 17.9743 8.56853C17.4245 8.51562 17.0218 8.02708 17.0747 7.47733C17.3347 4.77481 17.9709 3.5254 18.2514 2.68392C18.4261 2.15998 18.9924 1.87682 19.5163 2.05147ZM5.69887 14.5414C6.22837 14.6984 6.53034 15.2549 6.37334 15.7844C6.17967 16.4376 5.93418 17.0718 5.69781 17.7097C5.62766 17.8991 5.59259 17.9937 5.63388 18.0726C5.67517 18.1514 5.7725 18.1764 5.96714 18.2263C9.99172 19.2581 14.0085 19.2581 18.0331 18.2263C18.2277 18.1764 18.3251 18.1514 18.3664 18.0726C18.4077 17.9937 18.3726 17.8991 18.3024 17.7097C18.0661 17.0718 17.8206 16.4376 17.6269 15.7844C17.4699 15.2549 17.7719 14.6984 18.3014 14.5414C18.8309 14.3844 19.3874 14.6864 19.5444 15.2159C19.8058 16.0974 20.1715 16.9417 20.4626 17.813C20.7669 18.7234 21.0001 19.7099 21.0001 21.0001C21.0001 21.5524 20.5524 22.0001 20.0001 22.0001C19.4478 22.0001 19.0001 21.5524 19.0001 21.0001C19.0001 20.8317 18.9952 20.6701 18.986 20.5143C18.9736 20.3061 18.9674 20.202 18.8913 20.1464C18.8152 20.0908 18.7092 20.1179 18.4972 20.1719C14.1684 21.2762 9.83185 21.2762 5.503 20.1719C5.29105 20.1179 5.18507 20.0908 5.10898 20.1464C5.03289 20.202 5.02668 20.3061 5.01428 20.5143C5.00499 20.6701 5.00012 20.8317 5.00012 21.0001C5.00012 21.5524 4.55241 22.0001 4.00012 22.0001C3.44784 22.0001 3.00012 21.5524 3.00012 21.0001C3.00012 19.7099 3.23332 18.7234 3.5376 17.813C3.82877 16.9417 4.19448 16.0974 4.45585 15.2159C4.61285 14.6864 5.16937 14.3844 5.69887 14.5414Z',
  d12: 'M5.74868 2.68404C5.57404 2.1601 5.00772 1.87694 4.48377 2.05159C3.95983 2.22624 3.67667 2.79255 3.85132 3.3165C3.91653 3.51213 3.9892 3.70623 4.06564 3.91038C4.32 4.58971 4.616 5.38025 4.81706 6.70847C4.81857 6.70901 4.82005 6.70954 4.82151 6.71007C5.51667 6.93531 6.21159 7.12786 6.90634 7.28772C6.68526 5.1891 6.23647 3.99703 5.93002 3.18303C5.86092 2.9995 5.79907 2.83519 5.74868 2.68404ZM19.1829 6.70901C19.1819 6.70936 19.1809 6.70972 19.1799 6.71007C18.4843 6.93546 17.7889 7.12813 17.0936 7.28805C17.3147 5.18922 17.7635 3.99707 18.07 3.18303C18.1391 2.9995 18.2009 2.83519 18.2513 2.68404C18.426 2.1601 18.9923 1.87694 19.5162 2.05159C20.0402 2.22624 20.3233 2.79256 20.1487 3.3165C20.0835 3.51213 20.0108 3.70624 19.9344 3.91038C19.68 4.58981 19.3839 5.38047 19.1829 6.70901ZM6.37321 15.7845C6.53021 15.255 6.22825 14.6985 5.69875 14.5415C5.16925 14.3845 4.61273 14.6865 4.45573 15.216C4.30335 15.7299 4.11552 16.2312 3.92767 16.7325C3.79329 17.0911 3.6589 17.4498 3.53747 17.8131C3.2332 18.7235 3 19.7101 3 21.0003C3 21.5526 3.44772 22.0003 4 22.0003C4.55228 22.0003 5 21.5526 5 21.0003C5 20.8318 5.00487 20.6702 5.01416 20.5144C5.02656 20.3062 5.03277 20.2021 5.10886 20.1465C5.18495 20.091 5.29092 20.118 5.50288 20.1721C9.83173 21.2763 14.1683 21.2763 18.4971 20.1721C18.7091 20.118 18.8151 20.091 18.8911 20.1465C18.9672 20.2021 18.9734 20.3062 18.9858 20.5144C18.9951 20.6702 19 20.8318 19 21.0003C19 21.5526 19.4477 22.0003 20 22.0003C20.5523 22.0003 21 21.5526 21 21.0003C21 19.7101 20.7668 18.7235 20.4625 17.8131C20.3411 17.4498 20.2067 17.0911 20.0723 16.7325C19.8845 16.2312 19.6966 15.7299 19.5443 15.216C19.3873 14.6865 18.8308 14.3845 18.3013 14.5415C17.7718 14.6985 17.4698 15.255 17.6268 15.7845C17.7911 16.3388 17.9928 16.8794 18.1945 17.4202C18.2305 17.5167 18.2665 17.6132 18.3023 17.7099C18.3725 17.8992 18.4075 17.9939 18.3662 18.0727C18.325 18.1515 18.2276 18.1765 18.033 18.2264C14.0084 19.2582 9.9916 19.2582 5.96702 18.2264C5.77237 18.1765 5.67505 18.1515 5.63376 18.0727C5.59246 17.9939 5.62754 17.8992 5.69769 17.7099C5.73349 17.6132 5.7695 17.5167 5.80551 17.4202C6.00723 16.8794 6.20888 16.3388 6.37321 15.7845Z',
  d13: 'M12.0034 14.4649V11.965M7.00488 13.9186V11.465M17.0034 13.9186V11.465',
  d14: 'M12.0046 8.46472C15.727 8.46472 19.1761 7.72478 22.0046 6.46472V12.4647C19.1761 13.7248 15.727 14.4647 12.0046 14.4647C8.28229 14.4647 4.83313 13.7248 2.00464 12.4647V6.46472C4.83313 7.72478 8.28229 8.46472 12.0046 8.46472Z',
  d15: 'M19.0037 19.4648C14.337 20.7981 9.67035 20.7981 5.00368 19.4648',
  d16: 'M4.82471 3.46191C5.52476 5.38989 5.78588 6.42257 5.93886 8.04958M19.231 3.46191C18.5309 5.38989 18.2698 6.42257 18.1168 8.04958M5.41912 15.9523C4.88681 17.745 3.91698 19.6204 4.00346 21.4619M18.577 15.9523C19.1093 17.745 20.0791 19.6204 19.9926 21.4619',
  d17: 'M19.6881 4.22633C19.7645 4.02219 19.8372 3.82809 19.9024 3.63246L18.005 3C17.9546 3.15115 17.8928 3.31546 17.8237 3.49898C17.5081 4.3372 17.0416 5.57632 16.8282 7.79341L18.819 7.985C19.0053 6.04988 19.3777 5.05531 19.6881 4.22633ZM5.68371 3.49899C5.61462 3.31546 5.55276 3.15115 5.50238 3L3.60501 3.63246C3.67022 3.82809 3.7429 4.02219 3.81933 4.22634C4.12973 5.05532 4.50212 6.04989 4.68834 7.985L6.67915 7.79341C6.46579 5.57632 5.99929 4.33721 5.68371 3.49899ZM19.7458 17.0235C19.5879 16.6014 19.4354 16.1792 19.298 15.7155L17.3805 16.2841C17.5381 16.8157 17.71 17.2898 17.8726 17.7244C17.9065 17.8149 17.9396 17.9028 17.972 17.9889C18.0984 18.3244 18.2139 18.631 18.3194 18.9466C18.5748 19.7108 18.7537 20.4789 18.7537 21.4998H20.7537C20.7537 20.2096 20.5205 19.223 20.2162 18.3126C20.0976 17.9577 19.9653 17.6066 19.8375 17.2674C19.8066 17.1854 19.7759 17.1041 19.7458 17.0235ZM5.63475 17.7244C5.79734 17.2898 5.96928 16.8157 6.12691 16.2841L4.20942 15.7155C4.07194 16.1792 3.91951 16.6014 3.76156 17.0235C3.73144 17.1041 3.7008 17.1854 3.6699 17.2674C3.54209 17.6066 3.40979 17.9577 3.29117 18.3126C2.98689 19.223 2.75369 20.2096 2.75369 21.4998H4.75369C4.75369 20.4789 4.93262 19.7108 5.18803 18.9466C5.2935 18.631 5.40899 18.3244 5.53534 17.9889C5.56776 17.9028 5.60089 17.8149 5.63475 17.7244Z',
  d18: 'M4.47897 20.4614C9.32519 21.846 14.1822 21.846 19.0284 20.4614L18.479 18.5383C13.9919 19.8204 9.51552 19.8204 5.02841 18.5383L4.47897 20.4614Z',
  d19: 'M2.0552 5.81503C1.82319 5.71167 1.55462 5.73276 1.34159 5.87108C1.12855 6.00939 1 6.24613 1 6.50012V12.5001C1 12.7963 1.17427 13.0647 1.4448 13.1852C2.83749 13.8056 4.37044 14.3025 6.00536 14.6532V11.5001H7.50536V14.9291C8.63505 15.1033 9.80503 15.2093 11.0039 15.2404V12.0001H12.5039V15.2402C13.7033 15.2087 14.8738 15.1023 16.0039 14.9277V11.5001H17.5039V14.6512C19.1354 14.3006 20.6651 13.8045 22.0552 13.1852C22.3257 13.0647 22.5 12.7963 22.5 12.5001V6.50012C22.5 6.24613 22.3714 6.00939 22.1584 5.87108C21.9454 5.73276 21.6768 5.71167 21.4448 5.81503C18.7202 7.0288 15.3761 7.75012 11.75 7.75012C8.12387 7.75012 4.77979 7.0288 2.0552 5.81503Z',
};

export const IconBodyWeightStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-stroke-rounded IconBodyWeightStrokeRounded"
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

export const IconBodyWeightDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-duotone-rounded IconBodyWeightDuotoneRounded"
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

export const IconBodyWeightTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-twotone-rounded IconBodyWeightTwotoneRounded"
    >
      <path 
        d={d.d8} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </TheIconWrapper>
  );
};

export const IconBodyWeightSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-solid-rounded IconBodyWeightSolidRounded"
    >
      <path 
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

export const IconBodyWeightBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-bulk-rounded IconBodyWeightBulkRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d12} 
        fill="var(--icon-fill)" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconBodyWeightStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-stroke-sharp IconBodyWeightStrokeSharp"
    >
      <path 
        d={d.d13} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
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
      />
    </TheIconWrapper>
  );
};

export const IconBodyWeightSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="body-weight-solid-sharp IconBodyWeightSolidSharp"
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

export const iconPackOfBodyWeight: TheIconSelfPack = {
  name: 'BodyWeight',
  StrokeRounded: IconBodyWeightStrokeRounded,
  DuotoneRounded: IconBodyWeightDuotoneRounded,
  TwotoneRounded: IconBodyWeightTwotoneRounded,
  SolidRounded: IconBodyWeightSolidRounded,
  BulkRounded: IconBodyWeightBulkRounded,
  StrokeSharp: IconBodyWeightStrokeSharp,
  SolidSharp: IconBodyWeightSolidSharp,
};