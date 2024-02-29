import React from "react";
import Chat from "../../../components/Chat/Chat";
import IconSection from "../../../components/IconSection/IconSection";
import NewsLetter from "../../../components/NewsLetter/NewsLetter";
import Category from "../Category/Category";
import TopSection from "../TopSection/TopSection";
import UserInitialization from "../../../components/UserInitialization/UserInitialization";

const Sustainability = () => {
  return (
    <div className="relative overflow-hidden">
      <div>
        <TopSection />
      </div>
      <div>
        <Category />
      </div>
      <div>
        <NewsLetter />
      </div>
      <div>
        <IconSection />
      </div>
      <Chat />
      <UserInitialization/>
    </div>
  );
};

export default Sustainability;
