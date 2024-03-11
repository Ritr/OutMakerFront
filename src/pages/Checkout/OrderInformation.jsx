import React from "react";
import CustomOrderInformationMobile from "./OrderInformationMobile";
import CustomOrderInformationPC from "./OrderInformationPC";

const CustomOrderInformation = () => {
  // State to hold the width of the window
  const [isMobile, setIsMobile] = React.useState(false);

  // Effect hook to add event listener on mount and cleanup on unmount
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []); // Empty array ensures effect is only run on mount and unmount

  // Render the appropriate component based on the width
  return isMobile ? (
    <CustomOrderInformationMobile />
  ) : (
    <CustomOrderInformationPC />
  );
};

export default CustomOrderInformation;
