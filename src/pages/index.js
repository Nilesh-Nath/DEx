import React, { useEffect, useState, useContext } from "react";

import { HeroSection } from "../../Components";

const Home = () => {
  return (
    <div>
      <HeroSection accounts="hey" tokenData="Data" />
    </div>
  );
};

export default Home;
