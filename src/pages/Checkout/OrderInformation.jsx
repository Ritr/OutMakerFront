import React from "react";
import CustomOrderInformationMobile from "./OrderInformationMobile";
import CustomOrderInformationPC from "./OrderInformationPC";

const CustomOrderInformation = () => {
  // Define a breakpoint for mobile devices
  const mobileBreakpoint = 768; // You can adjust this value

  // State to hold the width of the window
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < mobileBreakpoint
  );

  // Effect hook to add event listener on mount and cleanup on unmount
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]); // Empty array ensures effect is only run on mount and unmount

  // Render the appropriate component based on the width
  return isMobile ? (
    <CustomOrderInformationMobile />
  ) : (
    <CustomOrderInformationPC />
  );
};

export default CustomOrderInformation;
