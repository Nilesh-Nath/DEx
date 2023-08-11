import React from "react";
import Image from "next/image";

// INTERNAL IMPORTS

import images from "../../public";
import Style from "../styles/Pool.module.css";

import { PoolAdd, PoolConnect } from "../../Components";

const Pool = () => {
  return (
    <div className={Style.Pool}>
      <PoolAdd />
      <PoolConnect />
    </div>
  );
};

export default Pool;
