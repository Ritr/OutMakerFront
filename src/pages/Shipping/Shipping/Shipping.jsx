import React from "react";
import Chat from "../../../components/Chat/Chat";
import IconSection from "../../../components/IconSection/IconSection";
import DeliveryDetails from "../DeliveryDetails/DeliveryDetails";
import ParcelDetails from "../ParcelDetails/ParcelDetails";
import ScheduledDetails from "../ScheduledDetails/ScheduledDetails";
import ShippingDetails from "../ShippingDetails/ShippingDetails";
import TopSection from "../TopSection/TopSection";
import Menu from "../Menu/Menu";
import UserInitialization from "../../../components/UserInitialization/UserInitialization";

const Shipping = () => {
  return (
    <section className="relative overflow-x-hidden">
      <TopSection />
      <Menu />
      <ShippingDetails />
      <DeliveryDetails />
      <ScheduledDetails />
      <ParcelDetails />
      <IconSection />
      <Chat />
      <UserInitialization/>
    </section>
  );
};

export default Shipping; 
