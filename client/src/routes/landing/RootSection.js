import React, { useEffect } from "react";
import Header from "./Hero";
import ScrollButton from "../../components/ScrollBtn";
import ContactUsLanding from "./ContactUsLanding";
import WelcomeSection from "./WelcomeSection";
// import OurServices from "./OurServices";
import PizzaMenuPreview from "./PizzaMenuPreview";
import Gallery from "./Gallery";
// import StatsPreview from "./StatsPreview";
// import MenuSlider from "./MenuSlider";
import Newsletter from "./Newsletter";
import ResetLocation from "../../helpers/ResetLocation";
import ContactLanding from "./ContactLanding";

const RootSection = () => {
  useEffect(() => {
    document.title = "Pizza Time";
    ResetLocation();
  }, []);
  return (
    <React.Fragment>
      <Header />
      <WelcomeSection />
      <ContactUsLanding />
      {/* <OurServices /> */}
      <PizzaMenuPreview />
      <Gallery />
      {/* <StatsPreview /> */}
      {/* <MenuSlider /> */}
      <Newsletter />
      <ContactLanding />
      <ScrollButton />
    </React.Fragment>
  );
}

export default RootSection;
