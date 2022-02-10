import React, { FC } from "react";

export interface BannerContainerProps {
  /**
   * Whether or not the banner should be shown
   */
  show?: boolean;
  /**
   * Whether or not to use the mobile id instead
   */
  mobile?: boolean;
}

/**
 * Banner container for the banner. Use in places where you need the banner to show
 */
export const BannerContainer: FC<BannerContainerProps> = ({
  mobile,
  show = true,
}) => {
  return (
    <div
      id={`banner-portal${mobile ? "-mobile" : ""}`}
      style={{ display: show ? "block" : "none" }}
    />
  );
};
