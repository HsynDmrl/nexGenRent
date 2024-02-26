import { useEffect, useState } from "react";
import tokenService from "../../services/tokenService";
import Register from "../Register/Register";
import Hero from "../../components/hero/Hero";
import Featured from "../../components/featured/featured";
import Recent from "../../components/recent/Recent";
import CarsPage from "../../components/listing/Listing";
import Footer from "../../components/footer/Footer";

const Homepage = () => {
  return (
    <div>
    <Hero></Hero>
    <Featured></Featured>
    <CarsPage></CarsPage>
    <Footer></Footer>
    </div>
  );
};

export default Homepage;
