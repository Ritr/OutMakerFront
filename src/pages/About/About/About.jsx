import React from "react";
import TopSection from "../TopSection/TopSection";

import PhotoGallery from "../PhotoGallery/PhotoGallery";
import NewsLetter from "../../../components/NewsLetter/NewsLetter";
import IconSection from "../../../components/IconSection/IconSection";
import Chat from "../../../components/Chat/Chat";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import Navbar from "../../../components/Navbar/Navbar";
import UserInitialization from "../../../components/UserInitialization/UserInitialization";

const About = () => {
  return (
    <section>
      <TopSection />
      <WelcomeSection />
      <PhotoGallery/>
      <NewsLetter/>
      <IconSection/>
      <Chat/>
      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization/>
    </section>
  );
};

export default About;
