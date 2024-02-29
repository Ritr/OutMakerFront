import React from "react";
import TopSection from "../TopSection/TopSection";
import ProductSection from "../ProductSection/ProductSection";
import FeatureSection from "../FeatureSection/FeatureSection";
import IconSection from "../../../components/IconSection/IconSection";
import Chat from "../../../components/Chat/Chat";
import UserInitialization from "../../../components/UserInitialization/UserInitialization";

const CareGuide = () => {
  return (
    <div className="overflow-hidden">
      <TopSection />
      <ProductSection />
      <FeatureSection />
      <IconSection />
      <Chat/>
      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization/>
    </div>
  );
};

export default CareGuide;
