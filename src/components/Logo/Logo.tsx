import React from "react";

export interface TextProps {
  className?: string;
}

const Logo: React.FC<TextProps> = (props) => {
  return (
    <div>
      <svg
        width="88"
        height="30"
        viewBox="0 0 88 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.1985 8.84586H8.89256V6.59529C8.89256 5.38733 7.92873 4.39941 6.75039 4.39941H6.64362C5.46561 4.39941 4.50113 5.38733 4.50113 6.59529V8.84586H2.19588C0.987917 8.84586 0 9.81001 0 10.988V11.0951C0 12.2735 0.987917 13.2376 2.19588 13.2376H4.50113V15.5979C4.50113 16.8058 5.46561 17.7937 6.64362 17.7937H6.75039C7.92873 17.7937 8.89256 16.8058 8.89256 15.5979V13.2376H11.1985C12.4061 13.2376 13.394 12.2735 13.394 11.0951V10.988C13.394 9.81001 12.4061 8.84586 11.1985 8.84586Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.0327 8.95677C41.7167 8.53947 40.2705 9.20383 39.818 10.4333L36.1629 20.3749L32.6113 10.7168L32.5068 10.4333C32.1494 9.46065 31.1699 8.84219 30.1241 8.83275C29.0788 8.84219 28.0984 9.46065 27.741 10.4333L27.6365 10.7168L24.0856 20.3749L20.4301 10.4333C19.978 9.20383 18.5314 8.53947 17.2157 8.95677C15.8997 9.37407 15.1927 10.7217 15.6442 11.9508L21.6781 28.3606L21.6914 28.3977C22.0505 29.3736 23.0358 29.9927 24.0856 29.9983C25.1353 29.9927 26.1206 29.3736 26.4793 28.3977L26.4927 28.3603L30.1241 18.4854L33.7551 28.3606L33.7684 28.3977C34.1278 29.3736 35.1131 29.9927 36.1629 29.9983C37.212 29.9927 38.1976 29.3736 38.5563 28.3977L38.57 28.3603L44.6036 11.9508C45.0561 10.7217 44.3488 9.37407 43.0327 8.95677Z"
          fill="white"
        />
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="67"
          y="0"
          width="6"
          height="30"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M67.4922 0H72.5431V30H67.4922V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70.0956 0H69.9397C68.5934 0 67.4922 1.10119 67.4922 2.44684V27.553C67.4922 28.8989 68.5934 30.0001 69.9397 30.0001H70.0956C71.4416 30.0001 72.5431 28.8989 72.5431 27.553V2.44684C72.5431 1.10119 71.4416 0 70.0956 0Z"
            fill="white"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.0023 16.8796C59.9958 16.8522 59.9903 16.8281 59.9861 16.8109C59.9903 16.8281 59.9958 16.8522 60.0023 16.8796ZM50.7201 16.7705C50.8354 16.4405 50.9734 16.1273 51.1313 15.8337C51.3969 15.3008 51.7442 14.8429 52.1651 14.4708C52.9727 13.7547 54.053 13.3559 55.3515 13.3559C55.3778 13.3559 55.4036 13.3572 55.4299 13.3576C57.7241 13.3888 59.4021 14.7921 59.9766 16.7705H50.7201ZM65.6063 18.442C65.2241 12.6707 60.9691 8.58789 55.3515 8.58789C49.4614 8.58789 44.7402 13.4028 44.7402 19.2926C44.7402 25.1826 49.5086 29.9972 55.398 29.9972C55.6011 29.9972 55.8059 29.9923 56.0113 29.9835C59.0867 29.9578 61.4993 28.9872 63.3622 27.4439C63.5006 27.3215 63.6311 27.1799 63.745 27.0188C63.9957 26.6656 64.1656 26.2207 64.1656 25.6826C64.1656 24.3545 63.1611 23.3383 61.7956 23.3383C61.152 23.3383 60.7497 23.4942 60.3077 23.8064C59.1124 24.669 57.7674 25.1719 56.1678 25.2106C56.1018 25.2148 55.3844 25.2246 55.2629 25.2178C53.3682 25.112 51.8676 24.1918 51.1036 22.783C51.0375 22.6557 50.9747 22.5255 50.9158 22.3911C50.7491 22.0079 50.6153 21.5958 50.5154 21.1623H63.1692C65.4611 21.1623 65.6281 19.2294 65.6076 18.4817C65.6069 18.468 65.6063 18.455 65.6063 18.442Z"
          fill="white"
        />
        <mask
          id="mask1"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="74"
          y="0"
          width="6"
          height="30"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.7656 0H79.8165V30H74.7656V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M77.369 0H77.2131C75.8668 0 74.7656 1.10119 74.7656 2.44684V27.553C74.7656 28.8989 75.8668 30.0001 77.2131 30.0001H77.369C78.715 30.0001 79.8165 28.8989 79.8165 27.553V2.44684C79.8165 1.10119 78.715 0 77.369 0Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
